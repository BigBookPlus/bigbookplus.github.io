---
title: "MMOCR安装与使用自己的数据训练"
description: "根据维基百科，OCR指的是光学字符识别或光学字符阅读器，是将打字、手写或印刷文本的图像电子或机械转换为机器编码文本。"
date: 2022-03-04
lang: zh
slug: "MMOCR-Installation-Training-with-own-Data"
tags: ["MMOCR", "OCR", "Pytorch"]
featured: false
draft: false
---

## 什么是OCR？

根据维基百科，OCR指的是**光学字符识别**或**光学字符阅读器**，是将打字、手写或印刷文本的图像电子或机械转换为机器编码文本。

## 为什么选择MMOCR？

- Pytorch
- 由Openmmlab维护
- 易于训练自己的数据
- 可以部署到C++代码

Pytorch很棒，它似乎吸收了当前深度学习框架的大部分优势。它由OpenMMLab维护，隶属于商汤科技，这意味着这个仓库可以长期存在并保持更新。MMOCR像MMDetection一样有清晰的结构。它也有实验性的部署代码。

## 安装

[mmocr文档](https://mmocr.readthedocs.io/en/latest/install.html)中的安装指南相当详细。我将展示在我机器上的设置过程。

```bash
conda create -n open-mmlab python=3.8
conda activate open-mmlab
```

现在我们有了一个隔离的虚拟环境。然后我安装带CUDA 10.2的PyTorch 1.10。

```bash
conda install pytorch=1.10.0 torchvision cudatoolkit=10.2 -c pytorch
```

然后安装mmcv、mmdet。

```bash
pip install mmcv-full -f https://download.openmmlab.com/mmcv/dist/cu102/torch1.10.0/index.html
pip install mmdet
```

克隆MMOCR仓库

```bash
git clone https://github.com/open-mmlab/mmocr.git
cd mmocr
```

最后一步，构建和安装。

```bash
pip install -r requirements.txt
pip install -v -e . # 或 "python setup.py develop"
```

在mmocr文档网站上有一个额外的步骤，即将仓库路径导出到系统环境变量PYTHONPATH中。在我的情况下，我总是在仓库路径内工作，所以我没有执行这一步。如果您需要从其他项目导入mmocr，您可能需要这样做。

## 简单测试

我们可以运行一个简单的命令来测试我们的仓库，这个命令将自动下载权重文件并进行端到端的检测和识别。

```bash
python mmocr/utils/ocr.py demo/demo_text_ocr.jpg --print-result --imshow
```

此外，我们可以只运行文本检测。通过指定'det'选项，我们使用TextSnake算法进行测试。

```bash
python mmocr/utils/ocr.py demo/demo_text_det.jpg --output demo/det_out.jpg --det TextSnake --recog None --export demo/
```

## 使用自己的数据训练

我正在尝试训练我们自己的文本检测模型。下载准备好的数据文件并按照文档页面进行训练对我来说显然是不够的。我的训练数据标注为PASCAL_VOC格式，这意味着我们需要做更多工作。在仓库中创建一个名为data的文件夹，然后将数据集文件夹放入其中，或通过命令ln -s创建链接。

我们首先创建一个名为gen_ids.py的python脚本来生成训练和测试文件ID。

```python
import os
import argparse

def parse_args():
    parser = argparse.ArgumentParser(description='generate id list file.')
    parser.add_argument('--path', type=str, default=None, help= 'path to annotation files dir.')
    #parser.add_argument('--output', type=str, default='./ids.txt', help= 'path to output.')
    return parser.parse_args()

def generate_ids(anno_path ):
    with open("./train_ids.txt", 'w') as ftrain, open("./test_ids.txt", 'w') as ftest:
        cntr=0
        for path, folders, files in os.walk(anno_path):
            for file_name in files:
                if cntr %10 == 0:
                    ftest.write(file_name.split('.')[0]+'\n')
                else:
                    ftrain.write(file_name.split('.')[0]+'\n')
                cntr+=1
                
def main():
    args = parse_args()
    generate_ids(args.path)
    
if __name__ == '__main__':
    main()
```

假设我们在数据集路径中工作，比如data/dataset/，Pascal_voc格式将其标注放在Annotation文件夹中。我们运行这个脚本。

```bash
python gen_ids.py --path ./Annotations/
```

这样我在数据集文件夹中就有了train_ids.txt和test_ids.txt。

我们采用ICDAR格式进行训练。ICDAR数据集遵循coco格式，所以我们需要将pascal_voc格式转换为coco格式。我们需要创建另一个名为voc2coco.py的python脚本来完成它。（这是从其他地方修改的）

```python
import os
import argparse
import json
import xml.etree.ElementTree as ET
from typing import Dict, List
from tqdm import tqdm
import re

def get_label2id(labels_path: str) -> Dict[str, int]:
    """id is 1 start"""
    with open(labels_path, 'r') as f:
        labels_str = f.read().split()
    labels_ids = list(range(1, len(labels_str)+1))
    return dict(zip(labels_str, labels_ids))

def get_annpaths(ann_dir_path: str = None,
                 ann_ids_path: str = None,
                 ext: str = '',
                 annpaths_list_path: str = None) -> List[str]:
    # If use annotation paths list
    if annpaths_list_path is not None:
        with open(annpaths_list_path, 'r') as f:
            ann_paths = f.read().split()
        return ann_paths

    # If use annotaion ids list
    ext_with_dot = '.' + ext if ext != '' else ''
    with open(ann_ids_path, 'r') as f:
        ann_ids = f.read().split()
    ann_paths = [os.path.join(ann_dir_path, aid+ext_with_dot) for aid in ann_ids]
    return ann_paths

def get_image_info(annotation_root, extract_num_from_imgid=True):
    path = annotation_root.findtext('path')
    
    if path is None:
        filename = annotation_root.findtext('filename')
    else:
        path = path.split('\\')[-1]
        filename = os.path.basename(path)
    img_name = os.path.basename(filename)
    img_id = os.path.splitext(img_name)[0]
    if extract_num_from_imgid and isinstance(img_id, str):
        img_id = int(re.findall(r'\d+', img_id)[0])

    size = annotation_root.find('size')
    width = int(size.findtext('width'))
    height = int(size.findtext('height'))

    image_info = {
        'file_name': filename,
        'height': height,
        'width': width,
        'id': img_id
    }
    return image_info

def get_coco_annotation_from_obj(obj, label2id):
    label = obj.findtext('name')
    assert label in label2id, f"Error: {label} is not in label2id !"
    category_id = label2id[label]
    bndbox = obj.find('bndbox')
    xmin = int(float(bndbox.findtext('xmin'))) - 1
    ymin = int(float(bndbox.findtext('ymin'))) - 1
    xmax = int(float(bndbox.findtext('xmax')))
    ymax = int(float(bndbox.findtext('ymax')))
    assert xmax > xmin and ymax > ymin, f"Box size error !: (xmin, ymin, xmax, ymax): {xmin, ymin, xmax, ymax}"
    o_width = xmax - xmin
    o_height = ymax - ymin
    ann = {
        'area': o_width * o_height,
        'iscrowd': 0,
        'bbox': [xmin, ymin, o_width, o_height],
        'category_id': category_id,
        'ignore': 0,
        'segmentation': [ [xmin, ymin, xmax, ymin, xmax, ymax, xmin, ymax] ]  # This script is not for segmentation
    }
    return ann

def convert_xmls_to_cocojson(annotation_paths: List[str],
                             label2id: Dict[str, int],
                             output_jsonpath: str,
                             extract_num_from_imgid: bool = True):
    output_json_dict = {
        "images": [],
        "type": "instances",
        "annotations": [],
        "categories": []
    }
    bnd_id = 1  # START_BOUNDING_BOX_ID, TODO input as args ?
    print('Start converting !')
    for a_path in tqdm(annotation_paths):
        # Read annotation xml
        ann_tree = ET.parse(a_path)
        ann_root = ann_tree.getroot()

        img_info = get_image_info(annotation_root=ann_root,
                                  extract_num_from_imgid=extract_num_from_imgid)
        img_id = img_info['id']
        #print(img_id+' ')
        output_json_dict['images'].append(img_info)

        for obj in ann_root.findall('object'):
            ann = get_coco_annotation_from_obj(obj=obj, label2id=label2id)
            ann.update({'image_id': img_id, 'id': bnd_id})
            output_json_dict['annotations'].append(ann)
            bnd_id = bnd_id + 1

    for label, label_id in label2id.items():
        category_info = {'supercategory': 'none', 'id': label_id, 'name': label}
        output_json_dict['categories'].append(category_info)

    with open(output_jsonpath, 'w') as f:
        output_json = json.dumps(output_json_dict)
        f.write(output_json)

def main():
    parser = argparse.ArgumentParser(
        description='This script support converting voc format xmls to coco format json')
    parser.add_argument('--ann_dir', type=str, default=None,
                        help='path to annotation files directory. It is not need when use --ann_paths_list')
    parser.add_argument('--ann_ids', type=str, default=None,
                        help='path to annotation files ids list. It is not need when use --ann_paths_list')
    parser.add_argument('--ann_paths_list', type=str, default=None,
                        help='path of annotation paths list. It is not need when use --ann_dir and --ann_ids')
    parser.add_argument('--labels', type=str, default=None,
                        help='path to label list.')
    parser.add_argument('--output', type=str, default='output.json', help='path to output json file')
    parser.add_argument('--ext', type=str, default='', help='additional extension of annotation file')
    parser.add_argument('--extract_num_from_imgid', action="store_true",
                        help='Extract image number from the image filename')
    args = parser.parse_args()
    label2id = get_label2id(labels_path=args.labels)
    ann_paths = get_annpaths(
        ann_dir_path=args.ann_dir,
        ann_ids_path=args.ann_ids,
        ext=args.ext,
        annpaths_list_path=args.ann_paths_list
    )
    convert_xmls_to_cocojson(
        annotation_paths=ann_paths,
        label2id=label2id,
        output_jsonpath=args.output,
        extract_num_from_imgid=args.extract_num_from_imgid
    )

if __name__ == '__main__':
    main()
```

我们需要创建一个名为coco.names的txt文件，在我的情况下只包含一行。

```
text
```

然后我们可以开始转换。

```python
python voc2coco.py  --ann_dir ./Annotations/ --ann_ids ./train_ids.txt --labels ./coco.names  --output ./annotations/instances_training.json --ext xml
python voc2coco.py  --ann_dir ./Annotations/ --ann_ids ./test_ids.txt --labels ./coco.names  --output ./annotations/instances_test.json --ext xml
```

现在我们在数据集文件夹中有了coco格式的标注文件。我们准备开始训练了。

在configs/_base_/det_datasets/new_dataset.py中创建一个新脚本，可以从configs/_base_/det_datasets/icdar2015.py采用并更改几个路径变量。然后从configs/textdet/dbnet/dbnet_r50dcnv2_fpnc_1200e_icdar2015.py创建另一个脚本，命名为configs/textdet/dbnet/dbnet_r50dcnv2_fpnc_1200e_new_dataset.py，只需更改数据集配置行。

```
_base_ = [
		...
    '../../_base_/det_datasets/new_dataset.py', #'../../_base_/det_datasets/icdar2015.py',
		...
]
```

然后我们就可以开始使用多个GPU进行训练了。MMOCR提供了一个方便的shell脚本来使用多个GPU进行训练，tools/dist_train.sh。

```
./tools/dist_train.sh configs/textdet/dbnet/dbnet_r50dcnv2_fpnc_1200e_new_dataset.py work_dirs/dbnet_r50dcnv2_fpnc_1200e_new_dataset 8
```

完成。我使用8个GPU来训练我的模型。

## 备注

我觉得MMOCR易于配置且非常稳定。它会自动记录训练日志。部署代码虽然是实验性的，但可以使用。我已经成功将模型转换为onnx并使用C++代码运行。
