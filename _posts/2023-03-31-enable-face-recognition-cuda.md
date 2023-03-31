---
layout: post
title: "开启face_recognition的CUDA支持"
subtitle: 'enable-face-recognition-cuda-surpport'
author: "BigBook"
header-style: text
tags:
  - Docker
  - GPU Docker
  - Web Camera
---

face_recognition是一个python包，用于人脸识别。属于基础的人脸识别包，支持人脸检测、人脸编码、人脸比对等功能。
face_recognition包支持使用GPU进行加速，但是默认情况下是不开启的。
也就是说，直接用Pip或这conda方式进行安装，装上的包基本上是不支持GPU计算的。
face_recognition的核心计算部分依赖dlib，所以需要安装dlib的GPU版本。如需要使用GPU进行加速的时候，需要安装CUDA和cuDNN。安装dlib的GPU版本，需要下载代码，开启cuda和cudnn支持，然后编译安装。
下面介绍一下安装过程。

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

这样测试dlib如果成功支持了cuda，那么face_recognition也就支持了cuda。我在docker内做了测试，系统是
- ubuntu 20.04
- cuda 11.3
- cudnn 8.2.1
- python 3.8
- 



参考(References)：

[Installing dlib using conda with CUDA enabled](https://gist.github.com/nguyenhoan1988/ed92d58054b985a1b45a521fcf8fa781)

[python-real-time-facial-recognition-identification-with-cuda-enabled](https://wsthub.medium.com/python-real-time-facial-recognition-identification-with-cuda-enabled-4819844ffc80)