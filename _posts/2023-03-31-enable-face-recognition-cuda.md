---
layout: post
title: "开启face_recognition的CUDA支持以及人脸识别package的一点讨论"
subtitle: 'Enable face_ecognition CUDA surpport and some discussion about face recognition packages'
author: "BigBook"
header-style: text
tags:
  - Docker
  - GPU Docker
  - Web Camera
  - face_recogntion
  - Face Recogntion
  - insightface
---

## 开启face_recognition的CUDA支持的方法

face_recognition是一个python包，用于人脸识别。属于基础的人脸识别包，支持人脸检测、人脸编码、人脸比对等功能。
face_recognition包支持使用GPU进行加速，但是默认情况下是不开启的。
也就是说，直接用Pip或这conda方式进行安装，装上的包基本上是不支持GPU计算的。
face_recognition的核心计算部分依赖dlib，所以需要安装dlib的GPU版本。如需要使用GPU进行加速的时候，需要安装CUDA和cuDNN。安装dlib的GPU版本，需要下载代码，开启cuda和cudnn支持，然后编译安装。
下面介绍一下安装过程。

### 核心：编译安装dlib with CUDA

官方文档介绍开启cuda支持的dlib的安装过程如下：

## Installing dlib using `conda` with CUDA enabled

Prerequisite: `conda` and/or `miniconda` are already installed

1. Create a conda environment.

```console
$ conda create -n dlib python=3.8 cmake ipython
```

2. Activate the environment.

```console
$ conda activate dlib
```

3. Install CUDA and cuDNN with `conda` using nvidia channel

```console
$ conda install cuda cudnn -c nvidia
```

Then find the path to the `nvcc` of this environment. We will use this path for the build step below

```console
$which nvcc
/path/to/your/miniconda3/envs/dlib/bin/
```

4. Install dlib.
Clone and build dlib from source

```console
$ git clone https://github.com/davisking/dlib.git
$ cd dlib
$ mkdir build
$ cd build
$ cmake .. -DDLIB_USE_CUDA=1 -DUSE_AVX_INSTRUCTIONS=1 -DCUDAToolkit_ROOT=/path/to/your/miniconda3/envs/dlib/bin/
$ cmake --build .
$ cd ..
$ python setup.py install --set DLIB_USE_CUDA=1
```

5. Test dlib

```console
(dlib) $ ipython
Python 3.8.12 (default, Oct 12 2021, 13:49:34)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.27.0 -- An enhanced Interactive Python. Type '?' for help.

In [1]: import dlib

In [2]: dlib.DLIB_USE_CUDA
Out[2]: True

In [3]: print(dlib.cuda.get_num_devices())
1
```

这样测试dlib如果成功支持了cuda，那么face_recognition也就支持了cuda。我在docker内做了测试，我的系统配置是
- ubuntu 20.04
- cuda 11.3
- cudnn 8.2.1
- python 3.8
  
## 一点讨论

### 简洁性

如果纯粹为了调包实现人脸识别，face_recognition是最佳选择。因为它的封装和逻辑足够简单。这里看一下官方文档的例子：

```python
import face_recognition
image = face_recognition.load_image_file("your_file.jpg")
face_locations = face_recognition.face_locations(image)
```

仅需要这样几行代码，就可以实现人脸检测。如果需要更多的功能，比如人脸比对，人脸编码等，也是非常简单的。

如果做人脸识别，识别拜登和陌生人，那么可以这样做：

```python
import face_recognition
known_image = face_recognition.load_image_file("biden.jpg")
unknown_image = face_recognition.load_image_file("unknown.jpg")

biden_encoding = face_recognition.face_encodings(known_image)[0]
unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

results = face_recognition.compare_faces([biden_encoding], unknown_encoding)
```

或者另外一个例子，识别我自己和陌生人：

```python
import face_recognition

picture_of_me = face_recognition.load_image_file("me.jpg")
my_face_encoding = face_recognition.face_encodings(picture_of_me)[0]

# my_face_encoding now contains a universal 'encoding' of my facial features that can be compared to any other picture of a face!

unknown_picture = face_recognition.load_image_file("unknown.jpg")
unknown_face_encoding = face_recognition.face_encodings(unknown_picture)[0]

# Now we can see the two face encodings are of the same person with `compare_faces`!

results = face_recognition.compare_faces([my_face_encoding], unknown_face_encoding)

if results[0] == True:
    print("It's a picture of me!")
else:
    print("It's not a picture of me!")

```

文档推荐了一个例子[example](https://github.com/ageitgey/face_recognition/blob/master/examples/recognize_faces_in_pictures.py)，可以参考。


### 准确性

在pypi的[文档](https://pypi.org/project/face-recognition/)中，明确写了face_recognition是全世界最简单的人脸识别库(`the world’s simplest face recognition library`)，但是人脸识别依赖dlib，model准确率在lfw是99.38%。这个准确率只能说是马马虎虎，不是很高。如果需要更高的准确率，可以考虑使用其他的人脸识别库，比如[insightface](https://pypi.org/project/insightface/)。看一下目前insightface 提供的人脸识别模型，在lfw上都在99.7%以上。


## 总结

face_recognition是一个非常简单的人脸识别库，但是准确率不高，并且默认安装并不支持CUDA计算，完全采用cpu计算。当一帧图像中人脸数目增加，计算负载是与人脸数目线性相关，对应其每帧消耗的人脸特征提取时间线性增加。如果完全依赖cpu，会引起操作系统卡顿。这样的负载，会让cpu不堪重负，尤其对于实时性要求高的程序来说。把计算负载转移到GPU是一个不错的方案，即令face_re cognition支持cuda计算。由于face_recognition核心计算部分依赖dlib，所以重新编译安装dlib，使其支持cuda计算，就可以实现face_recognition支持cuda计算。
如果需要更高的准确率，可以考虑使用其他的人脸识别库，比如[insightface](https://pypi.org/project/insightface/)。

推荐使用linux测试新的技术和方案，如果担心对自己的环境有损坏，可以像我一样，使用docker。Docker可以支持GPU，甚至可以访问您的网络相机和usb相机，进行实时图像处理功能测试。使用docker唯一一个无法避免的问题可能是，它需要更多的磁盘空间。

参考(References)：

[Installing dlib using conda with CUDA enabled](https://gist.github.com/nguyenhoan1988/ed92d58054b985a1b45a521fcf8fa781)

[python-real-time-facial-recognition-identification-with-cuda-enabled](https://wsthub.medium.com/python-real-time-facial-recognition-identification-with-cuda-enabled-4819844ffc80)

[pypi/face-recognition](https://pypi.org/project/face-recognition/)

[insightface](https://pypi.org/project/insightface/)