---
title: "MNIST-ROT数据集使用指南"
description: "数据集下载链接：[MNIST-ROT](http://www.iro.umontreal.ca/~lisa/icml2007data/mnist_rotation_new.zip)"
date: 2021-08-24
lang: zh
slug: "minst-rot-how-to"
tags: ["PyTorch", "MNIST-ROT", "Deep Learning", "Neural Network Training"]
featured: false
draft: false
---

![mnist-rot示例图像](https://sites.google.com/a/lisa.iro.umontreal.ca/public_static_twiki/_/rsrc/1392048843662/variations-on-the-mnist-digits/rotation_examples.png)

数据集下载链接：[MNIST-ROT](http://www.iro.umontreal.ca/~lisa/icml2007data/mnist_rotation_new.zip)

## 简介

正如论文[PDO-eConvs](https://arxiv.org/pdf/2007.10408.pdf)中所描述的，MNIST-rot-12k是验证旋转等变算法最常用的数据集。因此，如果你对旋转等变算法研究感兴趣，这个数据集可能会有所帮助。

## 转换为DataLoader代码
