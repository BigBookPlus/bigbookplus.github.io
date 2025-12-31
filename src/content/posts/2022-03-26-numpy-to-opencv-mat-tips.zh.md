---
title: "NumPy到OpenCV Mat转换技巧"
description: "sigmoid函数是一个具有特征性S形曲线的数学函数。"
date: 2022-03-26
lang: zh
slug: "numpy-to-opencv-mat-tips"
tags: ["Numpy to C++", "cv::Mat"]
featured: false
draft: false
---

## Sigmoid函数

``` text
sigmoid函数是一个具有特征性"S"形曲线或sigmoid曲线的数学函数。
```
来自维基百科：[Sigmoid_function](https://en.wikipedia.org/wiki/Sigmoid_function)

其公式：$S(t)=\frac {1}{1+e^{-t}}$

我们可以使用python和numpy这样实现sigmoid函数：

```python
import numpy as np
z = 1/(1 + np.exp(-x))
```

现在让我们用cpp在OpenCV中实现它。假设我们从神经网络获得了一个输出，作为名为`pred`的[1, h, w] cv::Mat。然后我们做类似`pred = sigmoid(pred)`的操作。

```cpp
cv::Mat sigmoid(const cv::Mat& pred)
{
  cv::Mat z;
  cv::exp(-pred, z);
  z = 1.f/(1.f+z);
  return z;
}  
	
```

完成。简单。😊

## 通道分离和合并

在numpy或其他类似numpy的api中，我们可以执行这样的切片操作：

```python
  temp = preds[:2, :, :]
```

此操作将创建前两个通道的快照变量。在OpenCV中，我们可以通过通道分离和合并来模拟这些操作。

```cpp
  std::vector<cv::Mat> preds_split;
  cv::split(preds, preds_split);
  // assert(preds_channels.size() == preds.channels())
  
  std::vector<cv::Mat> preds_temp = {preds_split[0], preds_split[1]};
  cv::Mat temp;
  cv::merge(preds_temp, temp);
```

## NumPy矩阵元素的条件过滤

假设我们有一个numpy二维数组，其中第一个通道是输入图像的分数图。现在我们需要过滤大于阈值的像素。

```python
  pred_score = preds[0] # 提取preds输出的第一个通道
  pred_mask = pred_score > min_confidence 
```

在C++中的实现：

```cpp
  std::vector<cv::Mat> preds;
  cv::split(output, preds);
  cv::Mat pred_score = preds[0];

  cv::threshold(pred_score, pred_mask, min_confidence, 1.f, cv::THRESH_BINARY);
  cv::multiply(pred_mask, 255, pred_mask);
  pred_mask.convertTo(pred_mask, CV_8U);
```

## 未完待续
