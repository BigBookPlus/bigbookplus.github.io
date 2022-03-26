---
layout: post
title: "How To Implement Sigmoid Using OpenCV Mat"
subtitle: ''
author: "BigBook"
header-style: text
tags:
  - Deep Learning
  - Sigmoid
  - OpenCV
  - cv::Mat
---

``` text
A sigmoid function is a mathematical function having a characteristic "S"-shaped curve or sigmoid curve.
```
From wikipedia: https://en.wikipedia.org/wiki/Sigmoid_function

It's formula: ${\displaystyle S(t)={\frac {1}{1+e^{-t}}}.}$

Now let's implement it in OpenCV with cpp. Suppose we've got a output from a neural network as a [1, h, w] cv::Mat named `pred`. We then do something like `pred = sigmoid(pred)`.

```cpp

    cv::exp(-pred, pred);
    pred = 1.f/(1.f+pred);
	
```

Done. Simple. 😊 
