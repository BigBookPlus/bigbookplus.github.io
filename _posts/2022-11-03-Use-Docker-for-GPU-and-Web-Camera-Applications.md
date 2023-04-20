---
layout: post
title: "使用Docker辅助图像识别程序开发：在Docker中访问GPU和、USB相机以及网络"
subtitle: 'Using Docker for Improving Image Recogntion Applications Development : Docker  with GPU and USB Camera and network'
author: "BigBook"
header-style: text
tags:
  - Docker
  - Image Recognition
  - GPU Docker
  - Web Camera
  - USB Camera
---


## 引言

在操作系统中发行应用程序，尤其是python应用程序，其环境配置常常是分发过程中的重要一环。如果像开发的时候那样手动构建，一方面工作量难以承受，另一方面经常会出现各种各样的问题。在不同的目标主机上手动构建环境，会受到目标操作系统的版本、文件系统、所安装软件包的情况影响。而且开发时所使用的一些默认安装包，到了发布的时候可能已经都被更新过，所以手动构建要求使用的包版本号也精确记录。



## 安装和配置

安装GPU docker，首先需要安装docker，然后在docker的基础上安装nvidia-docker。

### 安装docker

参考链接 [https://docs.docker.com/engine/install/ubuntu](https://docs.docker.com/engine/install/ubuntu)

### 安装nvidia-docker

参考链接 [https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#docker](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#docker)

## 启动支持GUI的docker镜像

如果在Docker中开发的是带有GUI的应用程序，需要在docker中显示GUI。


首先配置一下xhost

```bash
xhost +local:docker
```

或者

```bash
xhost +
```

启动docker，由于需要docker中显示GUI，所以加入参数

```bash
-v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=$DISPLAY
```

注意，这里是启动了GPU docker，--gpus all是指定使用所有的GPU，如果只使用一块GPU，可以指定为--gpus 0。

完整指令如下：

```bash
docker run --name mydocker --gpus all --shm-size=1g --ulimit memlock=-1 -it -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=$DISPLAY snn-server:basic
```

## 在Docker中访问usb相机

如果需要在docker中访问usb相机，需要在启动docker的时候，追加以下参数

```bash
-v /dev/video0:/dev/video0 --device=/dev/video0
```

这样就把宿主机的/dev/video0映射到docker中的/dev/video0，然后在docker中就可以访问到相机了。

```bash
docker run --name mydocker --gpus all --shm-size=1g --ulimit memlock=-1 -v /dev/video0:/dev/video0 --device=/dev/video0 -it -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=$DISPLAY myimage:latest
```

## 在Docker镜像中开放端口

如果需要从docker中对外提供服务，需要在docker中向宿主机进行端口映射，才可以从宿主机访问到docker中的服务。

Docker中的端口映射，需要在启动docker的时候，加入参数

```bash
-p 8080:8080  
```
这样，宿主机的8080端口就映射到docker中的8080端口了。

```bash
docker run --name mydocker -p 8080:8080  --gpus all --shm-size=1g --ulimit memlock=-1 -v /dev/video0:/dev/video0 --device=/dev/video0 -it -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=$DISPLAY myimage:latest
```

## 开启更多的GPU功能支持

我的程序后面用到了GPU的一些高级功能，比如GPU的nvcuvid解码，这需要做更多的设置，否则在程序启动对应解码库的时候，报错如下：

```console
[h264_cuvid @ 0x7f2d48048580] Cannot load libnvcuvid.so.1
```

这是因为docker中的GPU环境，没有开启nvcuvid的支持，需要在启动docker的时候，加入参数

```bash
--runtime=nvidia -e NVIDIA_VISIBLE_DEVICES=all -e NVIDIA_DRIVER_CAPABILITIES=compute,utility,video 
```

当然，这需要可能需要您的宿主机本身可以支持这方面的功能

## 创建本地镜像中心

开发中和开发好的镜像都可以选择在dockerhub上暂存，不同阶段或者用途的docker则以不同的tag或仓库名称来区分管理。免费的dockerhub账号有一个私有仓库和无限的公共仓库可供使用。不管是用来开发的镜像，还是准备分发的镜像，体积都比较大，一般要以GB为单位，因特网直接上传下载可能需要等待较长时间；因此，也可以在局域网中配置一台硬盘空间较大的主机，做为内网的镜像中心。

选好机器后，在机器上做好docker的基本配置，然后在联网状态下，执行以下命令：

```bash
docker run -d -p 5000:5000 --restart=always --name xy-registry -v /home/centos/registry:/registry  registry:latest
```

可以看到，内网镜像中心，其实也是一个docker镜像的形式，把registry镜像拉下来，自动启动服务运行在机器上。需要配置的仅是完成端口映射和目录绑定。

### 一些可选参数

- -d，后台运行容器
- -p 5000:5000 ，映射容器5000端口至宿主机5000端口。
- --restart always，设置重新启动策略，在docker重新启动时自动重新启动容器my-registry。
- --name 给容器命名。my-registry，
- -v /registry:/registry，把docker容器中/registry目录的数据加载到宿主机的/registry目录，宿主机的/registry目录如果不存在会自动创建。目的是为了防止docker私有仓库这个容器被删除时，仓库里的镜像也会被删除。宿主机查看到的私有仓库镜像就在这个目录中。
- -e REGISTRY_STORAGE_DELETE_ENABLED，设置是否允许删除仓库存储的镜像。
- -e REGISTRY_HTTP_ADDR=0.0.0.0:5000，设置镜像仓库地址。

### 上传镜像

```bash
docker commit container_id ip:port/image_name:tag
docker push ip:port/image_name:tag
```

## 回收空间

首先查看docker的磁盘空间占用情况

```bash
docker system df
```

您可以看到，docker的磁盘空间占用情况，包括镜像、容器、卷和网络的占用情况。
清理的方式有两种，一种是清理所有的无用镜像，一种是清理指定的镜像。

### 清理所有的无用镜像

```bash
docker image prune
```

### 清理指定的镜像

首先列出所有的镜像

```bash
docker images
```

删除指定的镜像

```bash
docker rmi image_id
```

## GPU Docker with Anaconda

再进一步，如果想要一个GPU docker，又想要在docker中安装anaconda，那么就需要在docker中安装cuda和anaconda了。
cuda的docker可以直接从docker hub拉取，anaconda的docker需要自己构建。 
也是可以考虑两种方式，一种是构建DockerFile，一种是直接手动构建镜像。

### 第一种方式:构建DockerFile

```DockerFile
FROM nvidia/cuda:11.3.0-devel-ubuntu20.04

# Add some dependencies
RUN apt-get clean && apt-get update -y -qq
RUN apt-get install -y curl git build-essential

ENV PATH="/root/anaconda2/bin:${PATH}"

RUN curl --silent -O https://repo.anaconda.com/archive/Anaconda3-2023.03-Linux-x86_64.sh \
    && bash Anaconda3-2023.03-Linux-x86_64.sh -b -p /root/anaconda3

RUN pip install keras && conda install pygpu
RUN /bin/bash

```

### 第二种方式:直接手动构建镜像

首先选择一个GPU docker拉取，这里我们选择的是配备有cuda11.3的ubuntu 20.04版本的镜像。当前时间是2023年，cuda已经更新到了12，ubuntu也已经发行到了版本号22，可以看出所选的版本是比较次新的版本，算是对兼容性的一个折衷。

```bash
docker pull nvidia/cuda:11.3.0-devel-ubuntu20.04
```

然后参照上一节的DockerFile安装anaconda。

## Reference

https://blog.csdn.net/renfeigui0/article/details/103755823

https://cloud.tencent.com/developer/article/1581147

https://medium.com/better-programming/docker-tips-clean-up-your-local-machine-35f370a01a78

[https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#docker](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#docker)

[https://docs.docker.com/engine/install/ubuntu](https://docs.docker.com/engine/install/ubuntu)

https://github.com/NVIDIA/nvidia-docker/issues/766