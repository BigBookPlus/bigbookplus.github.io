---
title: "OpenCV DNN批量推理：图像分类实战指南"
description: "OpenCV的DNN模块功能强大、高效且易于使用。要实现DNN推理应用，我们只需调用OpenCV DNN模块提供的几个API。使用OpenCV实现DNN推理代码的基本流程如下。"
date: 2021-08-23
lang: zh
slug: "OpenCV-DNN-Batch-Inference"
tags: ["C-Cpp", "OpenCV", "Image Classification", "Batch Inference", "OpenCV DNN"]
featured: false
draft: false
---

OpenCV的DNN模块功能强大、高效且易于使用。要实现DNN推理应用，我们只需调用OpenCV DNN模块提供的几个API。使用OpenCV实现DNN推理代码的基本流程如下：

> - 初始化。通过读取网络权重创建cv::dnn::Net对象。（caffe/onnx...）
> - 预处理。确定网络输入数据的形状。将原始输入图像重塑以匹配输入数据形状。此步骤通常结合其他操作，如归一化。
> - 推理。通过创建的cv::dnn::Net对象调用推理方法。
> - 后处理。解码输出数据并进行进一步的数据处理。

在我看来，由于网络权重已经确定，部署中最重要的部分是预处理和后处理。你需要弄清楚输入数据的确切形状，以及归一化方法（均值/标准差值）。在后处理中，事情可能会复杂得多。有些任务很容易实现，例如分类任务。有些任务则要困难得多，例如目标检测/分割任务。你需要做大量工作来解决数据处理问题，有时可能需要从头重写一些操作，因为C++中没有与原始Python实现相对应的方法。

在本文中，我将描述使用OpenCV DNN模块实现图像分类的简单实现，并快速介绍批量推理。

## 重要的API

要将权重加载到设备并创建DNN Net对象，OpenCV DNN模块提供了readNet方法。它支持ONNX/Caffe/TF/OpenVINO...

在本文中，我们使用Caffe模型作为示例。

```cpp
Net cv::dnn::readNetFromCaffe(  const String & prototxt, \
                                const String & caffeModel = String())
```
>此API将读取Caffe格式的网络权重。
>
>参数
> - `prototxt`	包含网络架构文本描述的.prototxt文件的路径。
> - `caffeModel` 包含学习网络的.caffemodel文件的路径。
> 
> 返回值
> Net对象。

我们还需要调用`blobFromImage`对输入的cv::Mat图像进行一些预处理。

```cpp
Mat cv::dnn::blobFromImage( InputArray image,
                            double scalefactor = 1.0,
                            const Size & size = Size(),
                            const Scalar & mean = Scalar(),
                            bool swapRB = false,
                            bool crop = false,
                            int ddepth = CV_32F)

```

>从图像创建4维blob。可选地调整大小并从中心裁剪图像、减去均值、按scalefactor缩放值、交换蓝色和红色通道。
>
>参数
> - `image`	输入图像（具有1、3或4个通道）。
> - `size`	输出图像的空间大小
> - `mean`	从通道中减去的均值标量。如果图像具有BGR顺序且swapRB为true，则值应按(mean-R, mean-G, mean-B)顺序排列。
> - `scalefactor`	图像值的乘数。
> - `swapRB`	指示是否需要交换3通道图像中的第一个和最后一个通道的标志。
> - `crop`	指示调整大小后是否裁剪图像的标志
> - `ddepth`	输出blob的深度。选择CV_32F或CV_8U。
> 如果crop为true，则调整输入图像的大小，使调整大小后的一侧等于size中的相应维度，另一侧等于或更大。然后从中心执行裁剪。如果crop为false，则执行直接调整大小而不裁剪并保持宽高比。
>
>返回值
>具有NCHW维度顺序的4维Mat。

## cv::Mat图像和Blob之间的区别

主要区别在于数据格式。在普通的cv::Mat图像中，数据以HWC格式排列，如`RGBRGB...RGB`。但当转换为blob时，它变成NCHW格式，就像大多数神经网络一样。

在普通的cv::Mat图像中，我们通过成员`cols`和`rows`获取宽度和高度，但在blob中，这两个变量为-1。我们通过`blob.size(0)` `blob.size(1)`等获取blob大小。这在我们需要从批量推理中分解结果mat时很有用。

## 包含我们需要的内容

我们首先包含使用OpenCV DNN所需的所有内容。然后我们声明一个全局cv::dnn::Net变量。这个变量将从磁盘加载网络权重并执行几乎所有的神经网络计算任务。

```cpp
#include <iostream>
#include <string>
#include <vector>

#include "opencv2/core.hpp"
#include "opencv2/dnn.hpp"
#include "opencv2/core/cuda.hpp"

// 全局net变量。
cv::dnn::Net net;
```

假设我们有一个caffe模型，我们将`.prototxt`文件名传递给变量`model_deploy`，将`.caffemodel`文件传递给变量`model_bin`。我们在这个`init`函数中进行初始化工作：

注意，我们开启了cuda支持以加快推理速度。如果你也想添加CUDA支持，请参考[使用CUDA支持构建OpenCV 4.5.2](http://bigbook.plus/2021/08/16/opencv-cmake-vs2019/)。

```cpp
void init(const std::string& model_deploy, const std::string& model_bin)
{
    net = cv::dnn::readNetFromCaffe(model_deploy, model_bin);

    // 让CUDA成为计算设备。
    cv::cuda::setDevice(cuda_id);
    this->net.setPreferableBackend(cv::dnn::DNN_BACKEND_CUDA);
    this->net.setPreferableTarget(cv::dnn::DNN_TARGET_CUDA);
}

```

## 单图像推理

现在我们尝试进行单图像推理。

这很简单。调用`blobFromImage`方法将图像转换为blob，然后通过`net.setInput`将此blob设置为`net`的输入，最后通过`net.forward()`获得输出`cv::Mat`。

```cpp
void single_inference(const cv::Mat& image)
{
    if (image.empty()) 
    {
        std::cout << "empty image!!!" << std::endl;
        return;
    }

    cv::Mat blob = cv::dnn::blobFromImage(image, 1, cv::Size(224, 224), \
    cv::Scalar(0, 0, 0), false, false);

    net.setInput(blob);

    cv::Mat out = net.forward();

    post_process(out);
}
```

在我们通过神经网络获得原始输出后，我们需要进行后处理。在这个示例中，我们假设模型的最后一层只是softmax层，就像大多数模型一样，我们只使用`cv::minMaxLoc`来获取最大分数和位置。

```cpp
void post_process(const cv::Mat& out)
{
    int _size = out.cols * out.rows;

    double min_val;
    double max_val;
    cv::Point min_pos;
    cv::Point max_pos;
    cv::minMaxLoc(out, &min_val, &max_val, &min_pos, &max_pos);

    int label = max_pos.x;
    std::cout<<"result: "<<label<<std::endl;
}
```

现在我们可以在main函数中进行计算。

```cpp
int main(int argc, char **argv)
{
    if (argc!=4)
    {
        std::cout << "Usage: ./cv-dnn-test /path/to/prototxt /path/to/caffemodel /path/to/image.jpg";
        exit(1);
    }

    cv::Mat image = cv::imread(argv[3]);

    init(argv[1], argv[2]);

    single_inference(image);

    return 0;
}
```

## 批量推理

批量推理在一次前向传递中处理多个图像。因此我们调用`blobFromImages`将多个图像转换为blob。`NCHW`中的维度`N`是图像数量。

```cpp
Mat cv::dnn::blobFromImages(InputArrayOfArrays images,
                            double scalefactor = 1.0,
                            Size size = Size(),
                            const Scalar & mean = Scalar(),
                            bool swapRB = false,
                            bool crop = false,
                            int ddepth = CV_32F)
```

>从一系列图像创建4维blob。可选地调整大小并从中心裁剪图像、减去均值、按scalefactor缩放值、交换蓝色和红色通道。
>
>参数
> - `images`	输入图像（全部具有1、3或4个通道）。
> - `size`	输出图像的空间大小
> - `mean`	从通道中减去的均值标量。如果图像具有BGR顺序且swapRB为true，则值应按(mean-R, mean-G, mean-B)顺序排列。
> - `scalefactor`	图像值的乘数。
> - `swapRB`	指示是否需要交换3通道图像中的第一个和最后一个通道的标志。
> - `crop`	指示调整大小后是否裁剪图像的标志
> - `ddepth`	输出blob的深度。选择CV_32F或CV_8U。
>
>如果crop为true，则调整输入图像的大小，使调整大小后的一侧等于size中的相应维度，另一侧等于或更大。然后从中心执行裁剪。如果crop为false，则执行直接调整大小而不裁剪并保持宽高比

输出需要分解。在这个模型中，每个单图像输出都是一维softmax结果。批量推理后，我们得到N倍的一维softmax数组，这是一个二维cv::Mat。每一行代表一个单图像的softmax结果。我们使用`rowRange`方法来切割cv::Mat结果。

```cpp
void batch_inference(const std::vector<cv::Mat>& images)
{
    cv::Mat blob = cv::dnn::blobFromImages(images, 1, cv::Size(224, 224), cv::Scalar(0, 0, 0), false, false);
    net.setInput(blob);
    cv::Mat out = net.forward();

    for (int i = 0; i < out.rows; ++i)
    {
        cv::Mat out_single = out.rowRange(i, i + 1);
        post_process(out_single);
    }
}

```

## 完整示例

我们在这里演示一个完整的实现代码，以说明我们在前面文本中讨论的内容。我们从()[https://github.com/cvjena/cnn-models/releases/download/v1.0/cnn-models_cvgj.zip]获取ImageNet的caffe模型。

```cpp
#include <iostream>
#include <string>
#include <vector>

#include "opencv2/core.hpp"
#include "opencv2/dnn.hpp"
#include "opencv2/highgui.hpp"
#include "opencv2/imgproc.hpp"

typedef std::pair<int, float> Result;

Result post_process(const cv::Mat& out)
{
    double min_val, max_val;
    cv::Point min_loc, max_loc;
    cv::minMaxLoc(out, &min_val, &max_val, &min_loc, &max_loc);
    std::cout << max_val << " " << max_loc.x << std::endl;
    return std::make_pair(max_loc.x, max_val);
}

std::vector<Result> batch_post_process(const cv::Mat& outs)
{
    std::vector<Result> ret;
    for(int i = 0; i < outs.rows; i++)
    {
        cv::Mat out = outs.rowRange(i, i + 1);
        auto result = post_process(out);
        ret.push_back(result);
    }
    return ret;
}

int main()
{
    cv::dnn::Net net = cv::dnn::readNetFromCaffe("models/deploy.prototxt", "models/resnet50_cvgj_iter_320000.caffemodel");
    std::vector<std::string> image_files = {"data/a.jpeg", "data/b.jpeg", "data/c.jpeg"};
    std::vector<cv::Mat> images;
    for (int i = 0; i < image_files.size(); i++)
    {
        cv::Mat img = cv::imread(image_files[i]);
        images.push_back(img);
    }

    cv::Mat blobs = cv::dnn::blobFromImages(images, 1.0, cv::Size(224, 224), cv::Scalar(104, 117, 123), false, false);
    net.setInput(blobs);
    cv::Mat outs = net.forward();
    std::cout<<outs.size[0] << " " << outs.size[1] << " " << std::endl;
    auto results = batch_post_process(outs);
    for (int i = 0;i<results.size();++i)
    {
        auto result = results[i];
        char result_text[10];
        sprintf(result_text, "%d %.2f", result.first, result.second);
        cv::putText(images[i], result_text, cv::Point(10, 20), cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(0, 0, 255), 2);
        char window_name[10];
        sprintf(window_name, "image %d", i);
        cv::imshow(window_name, images[i]);

    }
    cv::waitKey(0);
    return 0;
}
```
