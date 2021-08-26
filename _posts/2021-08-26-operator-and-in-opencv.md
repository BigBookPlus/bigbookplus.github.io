---
layout: post
title: "使用&运算符在OpenCV图像裁剪时进行边界检查"
subtitle: 'Operator & in OpenCV ROI Bounds Checking'
author: "BigBook"
header-style: text
tags:
  - C/C++
  - Operator &
  - OpenCV
  - Image Processing
  - 边界检查
---

### 给定ROI的图像裁剪

假设需要按照既定的ROI对图像进行取窗裁剪，用`cv::Rect`给定ROI区域，裁剪可以按照如下方式：

```cpp
cv::Mat image = cv::imread("/path/to/image.jpg");
cv::Rect roi = cv::Rect(x, y, width, height);
cv::Mat crop = image(roi);
```

### 限制边界

如果roi的坐标超出了图像的合法区域，会引发运行时错误，导致程序崩溃。此时一般要提前进行边界检查和规范，比如这样：

```cpp
if(roi.x<0) roi.x=0;
if(roi.y<0) roi.y=0;
if(roi.x+roi.width >= image.cols) roi.width = image.cols-roi.x;
if(roi.y+roi.height >= image.rows) roi.heigth = image.rows-roi.y;
```

这样写代码，看上去不太直观，而且有些冗长，更谈不上优雅或者可读性。

或者这样：

```cpp
int w = image.cols;
int h = image.rows;

int x0 = std::max<int>(0, roi.tl().x);
int y0 = std::max<int>(0, roi.tl().y);
int x1 = std::min<int>(w, roi.br().x);
int y1 = std::min<int>(h, roi.br().y);

roi = cv::Rect(cv::Point(x0, y0), cv::Point(x1, y1));
```
稍微增加了些可读性，特别是如果习惯于使用stl的max/min函数进行边界检查。但是仍然冗长，不够优雅。冗长有什么坏处？一般来讲，冗长的代码不易于维护，可读性不会太强。另外以上面这段实现为例，由于反复使用同一变量，仅仅为了对其不同的成员做类似的操作，非常容易导致低级错误。

### Operator & : Get Intersection of cv::Rect

这个运算符`&`比较直观。在C/C++语法中，`&`属于位运算，是按位与的功能。cv::Rect类型重载了它，可以想象它的功能就是取矩形的相交区域。所以要对图像ROI的cv::Rect进行边界限制，那么将ROI和表示图像区域的Bounding Box求相交区域即可。代码实现如下：

```cpp
cv::Rect bbox(0, 0, mat.cols, mat.rows);
cv::Rect roi = roi & bbox; // that's all
```

这样基本上就一句话完成了边界限制。

### What's More: verify if rect is inside image

进一步说，如果要检查一个rect是否在图像区域内，不用Operator的话，一般按照以下思路实现：

```cpp
bool rectIsInside(const cv::Rect& rect, const cv::Mat& image)
{
    return (
        rect.x>=0 && 
        rect.y>=0 && 
        rect.x + rect.width < m.cols && 
        rect.x + rect.width < m.rows) ;
}

```

但是如果使用了`&`运算符，life will be much easier.

```cpp
bool rectIsInside(const cv::Rect& rect, const cv::Mat& image)
{
    cv::Rect bbox(0, 0, image.cols, image.rows);
    return (roi & bbox) == rect; // elegent and efficient
}
```

简洁、优雅、可读性强的实现方式。
