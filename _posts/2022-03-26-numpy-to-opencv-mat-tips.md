---
layout: post
title: "Tips of Migrating Numpy to C++ by OpenCV"
subtitle: ''
author: "BigBook"
header-style: text
tags:
  - Numpy to C++
  - cv::Mat
---




## Sigmoid


``` text
A sigmoid function is a mathematical function having a characteristic "S"-shaped curve or sigmoid curve.
```
From wikipedia: [Sigmoid_function](https://en.wikipedia.org/wiki/Sigmoid_function)

It's formula: $S(t)=\frac {1}{1+e^{-t}}$

We can implement sigmoid function with python and numpy like this:

```python
import numpy as np
z = 1/(1 + np.exp(-x))
```

Now let's implement it in OpenCV with cpp. Suppose we've got a output from a neural network as a [1, h, w] cv::Mat named `pred`. We then do something like `pred = sigmoid(pred)`.

```cpp
cv::Mat sigmoid(const cv::Mat& pred)
{
  cv::Mat z;
  cv::exp(-pred, z);
  z = 1.f/(1.f+z);
  return z;
}  
	
```

Done. Simple. 😊 

## Channels split and merge

In numpy or other numpy like apis, we can do a slice operation like this,

```python
  temp = preds[:2, :, :]
```

This operation will create a snap shot variable of the first two channels. In OpenCV, we can simulate the operations through channels split and merge.

```cpp
  std::vector<cv::Mat> preds_split;
  cv::split(preds, preds_split);
  // assert(preds_channels.size() == preds.channels())
  
  std::vector<cv::Mat> preds_temp = {preds_split[0], preds_split[1]};
  cv::Mat temp;
  cv::merge(preds_temp, temp);
```

## Conditioning Filter Elements of Numpy matrice

Suppose we have a numpy 2d array, which the first channel is the score map of input image. Now we need to filter the pixels greater than the threshold. 

```python
  pred_score = preds[0] #extract the first channel of preds output
  pred_mask = pred_score > min_confidence 
```

The implementation in c++

```cpp
  std::vector<cv::Mat> preds;
  cv::split(output, preds);
  cv::Mat pred_score = preds[0];

  cv::threshold(pred_score, pred_mask, min_confidence, 1.f, cv::THRESH_BINARY);
  cv::multiply(pred_mask, 255, pred_mask);
  pred_mask.convertTo(pred_mask, CV_8U);
```


## Not finished.