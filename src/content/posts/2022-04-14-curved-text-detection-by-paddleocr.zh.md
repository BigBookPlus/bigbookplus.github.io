---
title: "使用PaddleOCR进行曲线文本检测"
description: "文本检测任务是检测任务中的一个老话题。曲线文本更加自由形式。在本文中，我们向您展示如何使用PaddleOCR运行曲线文本检测。"
date: 2022-04-14
lang: zh
slug: "curved-text-detection-by-paddleocr"
tags: ["Deep Learning Inference", "OCR", "Curved Text Detection", "PaddleOCR"]
featured: false
draft: false
---

![检测结果](/assets/image/in-post/curved_text_paddleocr/det_res_img623.jpg)

文本检测任务是检测任务中的一个老话题。曲线文本更加自由形式。在本文中，我们向您展示如何使用PaddleOCR运行曲线文本检测。

## 设置环境

创建一个名为paddle_env的虚拟环境。

```bash
conda create --name paddle_env python=3.8
```

然后激活它。

```bash
conda activate paddle_env 
```

通过pip安装paddlepaddle和paddle ocr包。

```bash
python -m pip install paddlepaddle
pip install "paddleocr>=2.0.1" # 推荐使用2.0.1+版本
```

## 测试环境

测试安装。

```bash
wget https://paddleocr.bj.bcebos.com/dygraph_v2.1/ppocr_img.zip
unzip ppocr_img.zip
paddleocr --image_dir ./ppocr_img/imgs_en/img_12.jpg \
        --use_angle_cls true --lang en --use_gpu false
```

## 使用SAST进行曲线文本检测

从github克隆PaddleOCR仓库。切换到动态图分支。

```bash
git clone https://github.com/PaddlePaddle/PaddleOCR.git
cd PaddleOCR
git checkout dygraph
```

下载SAST的训练模型。

```bash
mkdir models
cd models
wget https://paddleocr.bj.bcebos.com/dygraph_v2.0/en/det_r50_vd_sast_totaltext_v2.0_train.tar
tar -xvf det_r50_vd_sast_totaltext_v2.0_train.tar
cd - # 返回PaddleOCR仓库路径
```

SAST的训练模型需要转换为推理模型。

```bash
python tools/export_model.py -c configs/det/det_r50_vd_sast_totaltext.yml \
        -o Global.pretrained_model=./models/det_r50_vd_sast_totaltext_v2.0_train/best_accuracy \
        Global.save_inference_dir=./inference/det_sast_tt
```

转换成功后，将创建一个名为inference的新文件夹。

现在我们可以运行曲线文本检测了。

```bash
python tools/infer/predict_det.py --det_algorithm="SAST" \
        --image_dir="./doc/imgs_en/img623.jpg" \
        --det_model_dir="./inference/det_sast_tt/" \
        --det_sast_polygon=True
```

![检测结果](/assets/image/in-post/curved_text_paddleocr/det_res_img623.jpg)
