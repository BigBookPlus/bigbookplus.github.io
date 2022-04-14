---
layout: post
title: "Curved Text Detection by PaddleOCR"
subtitle: ''
author: "BigBook"
header-style: text
tags:
  - Deep Learning Inference
  - OCR
  - Curved Text Detection
  - PaddleOCR
---

![Detection Result](/img/in-post/curved_text_paddleocr/det_res_img623.jpg)

Text Detection Task is an old topic of Detction tasks. Curved text is much more free form. in this Post, we show you how to run the curved text detection by PaddleOCR.

## Configuration & Installation

Create a virtual environment named paddle_env.

```bash
conda create --name paddle_env python=3.8
```

Then activate it.

```bash
conda activate paddle_env 
```

Install paddlepaddle and paddle ocr packages through pip.

```bash
python -m pip install paddlepaddle
pip install "paddleocr>=2.0.1" # Recommend to use version 2.0.1+
```

Test the installations.

```bash
wget https://paddleocr.bj.bcebos.com/dygraph_v2.1/ppocr_img.zip
unzip ppocr_img.zip
paddleocr --image_dir ./ppocr_img/imgs_en/img_12.jpg --use_angle_cls true --lang en --use_gpu false
```

## Do Curved Text Detection with SAST

Clone PaddleOCR repo from github. Checkout the dynamic graph branch.

```bash
git clone https://github.com/PaddlePaddle/PaddleOCR.git
cd PaddleOCR
git checkout dygraph
```

Download the training model of SAST.

```bash
mkdir models
cd models
wget https://paddleocr.bj.bcebos.com/dygraph_v2.0/en/det_r50_vd_sast_totaltext_v2.0_train.tar
tar -xvf det_r50_vd_sast_totaltext_v2.0_train.tar
cd - #return to PaddleOCR repo path
```

The training model of SAST need to be converted into inference model.

```bash
python tools/export_model.py -c configs/det/det_r50_vd_sast_totaltext.yml -o Global.pretrained_model=./models/det_r50_vd_sast_totaltext_v2.0_train/best_accuracy  Global.save_inference_dir=./inference/det_sast_tt
```

After convertion succeed, a new folder named inference will be created. 

Now we are good to run the curved text detction.

```bash
python tools/infer/predict_det.py --det_algorithm="SAST" --image_dir="./doc/imgs_en/img623.jpg" --det_model_dir="./inference/det_sast_tt/" --det_sast_polygon=True
```

![Detection Result](/img/in-post/curved_text_paddleocr/det_res_img623.jpg)
