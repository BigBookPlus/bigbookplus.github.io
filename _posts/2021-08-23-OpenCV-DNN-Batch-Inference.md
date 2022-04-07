---
layout: post
title: "Image Classification Batch Inference By OpenCV DNN Module in C++"
subtitle: 'OpenCV DNN Batch Inference'
author: "BigBook"
header-style: text
tags:
  - C/C++
  - OpenCV
  - Image Classification
  - Batch Inference
  - OpenCV DNN
---

OpenCV has a DNN module, which is powerful, efficient, and easy to use. To Implement a image classification inference, we need only to call a couple of APIs by DNN module. The basic routine of DNN inference code written though OpenCV is as below. 

> - Create the dnn Net object by reading in the network weight. (caffe/onnx...)
> - determine the input data shape of network 
> - rearrange the raw input image(s) to match the input data shape. This step always combined with Preprocessing.
> - invoke inference method from the dnn net object.
> - decode the output data. which is also called postprocessing.

In my opinion, as the network weights are already determined, the most important parts in the deployment are pre/post processing. You need to figure out exactly what shape of input data is, and what the mean value/std values are. For post processing, things may be much more complicated. Some tasks are easy to implement, classification tasks for instance. Some tasks like object detection/segmentation will be much harder to implement. You need to do a lot of work to crack the data wrangling problems, and sometimes  may need to rewrite some operatations from scratch, just because there is no corresponding method in C++ with the original python code.

## Important APIs

To load the weights into device and create the DNN Net object, Opencv DNN module provided a readNet method. It supports ONNX/Caffe/TF/OpenVINO...

In this article, we use Caffe model as the example.

```cpp
Net cv::dnn::readNetFromCaffe(  const String & prototxt, \
                                const String & caffeModel = String())
```
>This API will read the network weights in Caffe format.
>
>Parameters
> - `prototxt`	path to the .prototxt file with text description of the network architecture.
> - `caffeModel` path to the .caffemodel file with learned network.
> 
> Returns
> Net object.

We also need to call `blobFromImage` to do some preprocessing on the input cv::Mat image.

```cpp
Mat cv::dnn::blobFromImage( InputArray image,
                            double scalefactor = 1.0,
                            const Size & size = Size(),
                            const Scalar & mean = Scalar(),
                            bool swapRB = false,
                            bool crop = false,
                            int ddepth = CV_32F)

```

>Creates 4-dimensional blob from image. Optionally resizes and crops image from center, subtract mean values, scales values by scalefactor, swap Blue and Red channels.
>
>Parameters
> - `image`	input image (with 1-, 3- or 4-channels).
> - `size`	spatial size for output image
> - `mean`	scalar with mean values which are subtracted from channels. Values are intended to be in (mean-R, mean-G, mean-B) order if image has BGR ordering and swapRB is true.
> - `scalefactor`	multiplier for image values.
> - `swapRB`	flag which indicates that swap first and last channels in 3-channel image is necessary.
> - `crop`	flag which indicates whether image will be cropped after resize or not
> - `ddepth`	Depth of output blob. Choose CV_32F or CV_8U.
> if crop is true, input image is resized so one side after resize is equal to corresponding dimension in size and another one is equal or larger. Then, crop from the center is performed. If crop is false, direct resize without cropping and preserving aspect ratio is performed.
>
>Returns
>4-dimensional Mat with NCHW dimensions order.

## Difference Between cv::Mat Image and Blob

The mainly difference is the data format. In normal cv::Mat image, the data is arranged in HWC format, like `RGBRGB...RGB`. But when turned into blobs, it becomes NCHW format, as most neural networks does.

In normal cv::Mat image, we get width and height by member `cols` and `rows`, but in blob, these two vars is -1. We get blob size by `blob.size(0)` `blob.size(1)` etc. This is useful when we need to decompose the result mat from batch inference.

## Include stuffs we need

We firstly include all the stuffs to use OpenCV DNN. Then we  declare a Global cv::dnn:Net Variable. This var will load net weights from your disk and do nearly all the nn calculation tasks.

```cpp
#include <iostream>
#include <string>
#include <vector>

#include "opencv2/core.hpp"
#include "opencv2/dnn.hpp"
#include "opencv2/core/cuda.hpp"

// Global net variable.
cv::dnn::Net net;
```

Suppose we have a caffe model, we pass the `.prototxt` file name to the var `model_deploy`, and `.caffemodel` file to var `model_bin`. We do the init works in this `init` function:

Note that, we open the cuda support for faster inference. If you want to add CUDA support too, please refer to [Build OpenCV 4.5.2 with CUDA support](http://bigbook.plus/2021/08/16/opencv-cmake-vs2019/). 

```cpp
void init(const std::string& model_deploy, const std::string& model_bin)
{
    net = cv::dnn::readNetFromCaffe(model_deploy, model_bin);

    // Let CUDA be the calculation device.
    cv::cuda::setDevice(cuda_id);
    this->net.setPreferableBackend(cv::dnn::DNN_BACKEND_CUDA);
    this->net.setPreferableTarget(cv::dnn::DNN_TARGET_CUDA);
}

```

## Single Image Inference

Now we try to do the single image inference.

It's simple. Call `blobFromImage` method to turn the image into a blob, then set this blob as the input to `net` by `net.setInput`, finally we got the output `cv::Mat` by `net.forward()`.

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

After we got the original output by neural network, we need to do the post-processing. In this sample, we assume that the final layer of model is just softmax layer, which as most model does, and we only use the `cv::minMaxLoc` to get the biggest score and position.

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

Now we can do the calculation in the main function.

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

## Batch Inference

Batch inference swallowed multiple images in one forward pass. So we call `blobFromImages` to turn multiple images into a blob. Dimension `N` in `NCHW` is the image count.

```cpp
Mat cv::dnn::blobFromImages(InputArrayOfArrays images,
                            double scalefactor = 1.0,
                            Size size = Size(),
                            const Scalar & mean = Scalar(),
                            bool swapRB = false,
                            bool crop = false,
                            int ddepth = CV_32F)
```

>Creates 4-dimensional blob from series of images. Optionally resizes and crops images from center, subtract mean values, scales values by scalefactor, swap Blue and Red channels.
>
>Parameters
> - `images`	input images (all with 1-, 3- or 4-channels).
> - `size`	spatial size for output image
> - `mean`	scalar with mean values which are subtracted from channels. Values are intended to be in (mean-R, mean-G, mean-B) order if image has BGR ordering and swapRB is true.
> - `scalefactor`	multiplier for images values.
> - `swapRB`	flag which indicates that swap first and last channels in 3-channel image is necessary.
> - `crop`	flag which indicates whether image will be cropped after resize or not
> - `ddepth`	Depth of output blob. Choose CV_32F or CV_8U.
>
>if crop is true, input image is resized so one side after resize is equal to corresponding dimension in size and another one is equal or larger. Then, crop from the center is performed. If crop is false, direct resize without cropping and preserving aspect ratio is performed

The output need to be decomposed. In this model, every single image output is a 1-d softmax results. After Batch Inference, we got N times 1-d softmax arrays, which is a 2-d cv::Mat. Every line represents a single image softmax results. We use the `rowRange` method to cut the cv::Mat result.

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
