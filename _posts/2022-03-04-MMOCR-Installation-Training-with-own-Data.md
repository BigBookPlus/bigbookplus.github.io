---
layout: post
title: "Using MMOCR: Installation and Training with my own Data"
subtitle: ''
author: "BigBook"
header-style: text
tags:
  - MMOCR
  - OCR
  - Pytorch
---


## What is OCR?

According to the wikipedia, OCR, which refers to **Optical character recognition** or **optical character reader,** is the electronic  or mechanical  conversion of images  of typed, handwritten or printed text into machine-encoded text.

## Why MMOCR?

- Pytorch
- Maintained by Openmmlab
- Easy to train your own data
- Can be deployed into C++ code

Pytorch is sweet, it seems to have absorbed most of the advantages of current deep learning frameworks. It is maintained by the OpenMMLab, belongs to SenseTime, which means that this repo can live long and keep updating. MMOCR has a clear structure just like MMDetection. It has the experimental deployment code too.

## Installation

The installation guide in  [mmocr doc]([https://mmocr.readthedocs.io/en/latest/install.html](https://mmocr.readthedocs.io/en/latest/install.html)) is quite in great detail. I will show the setup process on my machine.

```bash
conda create -n open-mmlab python=3.8
conda activate open-mmlab
```

Now we have an isolated virtual environment. Then I install PyTorch 1.10 with CUDA 10.2.

```bash
conda install pytorch=1.10.0 torchvision cudatoolkit=10.2 -c pytorch
```

Then install mmcv, mmdet.

```bash
pip install mmcv-full -f https://download.openmmlab.com/mmcv/dist/cu102/torch1.10.0/index.html
pip install mmdet
```

Clone MMOCR repo

```bash
git clone https://github.com/open-mmlab/mmocr.git
cd mmocr
```

Final step, build and install.

```bash
pip install -r requirements.txt
pip install -v -e . # or "python setup.py develop"
```

There is an extra step in the mmocr doc website, which export the repo path into system env var  PYTHONPATH. In my case, I always works inside the repo path, so I didn’t go with this step. If you need to import mmocr from other projects, you may need to do it.

## Simple test

We can run a simple command to test our repo, this command will automatically downloads the weights file and do detection & recognition end-to-end.

```bash
python mmocr/utils/ocr.py demo/demo_text_ocr.jpg --print-result --imshow
```

Also, we can run text detection only. By specifying ‘det’ option, we test with the TextSnake algorithm.

```bash
python mmocr/utils/ocr.py demo/demo_text_det.jpg --output demo/det_out.jpg --det TextSnake --recog None --export demo/
```

## Training with my own data

I’m trying to train our own text detection model.  Download the prepared data file and train following the doc page is obviously not enough for me. My training data is labeled in PASCAL_VOC format, which means we need more work to do. Create a folder in repo named data, then put dataset folder in it or create a link by command ln -s into it.

We first create a python scripts named gen_ids.py to generate the training and testing file ids.

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

Suppose we are working in dataset path, say, data/dataset/, Pascal_voc format puts its annotations in the Annotation folder. We run this script.

```bash
python gen_ids.py --path ./Annotations/
```

Thus I have the train_ids.txt and test_ids.txt in my dataset folder. 

We adopt from ICDAR format to train. ICDAR Dataset follows coco format, so we need to convert our pascal_voc format to coco format. We need to create another python script named voc2coco.py to do it. (Which is modified from others)

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

We need to create a file named coco.names txt file, which contains only one line in my case.  

```
text
```

Then we can start converting. 

```python
python voc2coco.py  --ann_dir ./Annotations/ --ann_ids ./train_ids.txt --labels ./coco.names  --output ./annotations/instances_training.json --ext xml
python voc2coco.py  --ann_dir ./Annotations/ --ann_ids ./test_ids.txt --labels ./coco.names  --output ./annotations/instances_test.json --ext xml
```

Now we have the coco format annotation file in dataset folder. We are ready to train.

Create a new script in configs/_base_/det_datasets/new_dataset.py which can be adopted from configs/_base_/det_datasets/icdar2015.py and change several path variables. Then create another script from configs/textdet/dbnet/dbnet_r50dcnv2_fpnc_1200e_icdar2015.py, named configs/textdet/dbnet/dbnet_r50dcnv2_fpnc_1200e_new_dataset.py, just change the line for dataset configuration.

```
_base_ = [
		...
    '../../_base_/det_datasets/new_dataset.py', #'../../_base_/det_datasets/icdar2015.py',
		...
]
```

Then we are ready to start training with multiple gpus. MMOCR provided a handy shell script to train with multiple gpus, tools/dist_train.sh.

```
./tools/dist_train.sh configs/textdet/dbnet/dbnet_r50dcnv2_fpnc_1200e_new_dataset.py work_dirs/dbnet_r50dcnv2_fpnc_1200e_new_dataset 8
```

Done. I use 8 gpus to train my model.

## P.S.

I feel MMOCR is easy to configure and very stable. It record training logs automatically. The deployment code is ok to use, though is experimental. I have successfully transformed model to onnx and run with c++ code.