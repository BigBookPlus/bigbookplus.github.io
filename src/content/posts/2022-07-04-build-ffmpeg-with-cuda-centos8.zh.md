---
title: "在CentOS 8上编译支持CUDA的FFmpeg"
description: "需要安装CUDA工具包。"
date: 2022-07-04
lang: zh
slug: "build-ffmpeg-with-cuda-centos8"
tags: ["FFMepeg", "CUDA", "CentOS 8"]
featured: false
draft: false
---

## 准备工作

需要安装CUDA工具包。
然后还需要安装以下列出的软件包。

```bash
dnf -y install   automake autoconf libtool make gcc gcc-c++
dnf --enablerepo=powertools -y install giflib-devel
dnf --enablerepo=powertools -y install libexif-devel
dnf -y install bison pkgconfig glib2-devel gettext make libpng-devel libjpeg-devel libtiff-devel libexif-devel giflib-devel libX11-devel freetype-devel fontconfig-devel  cairo-devel fribidi-devel
dnf -y install openssl openssl-devel
```

注意，根据不同的配置，`powertools`可能是`PowerTools`，只需替换名称即可。

要启用powertools频道，运行以下命令

```bash
yum install dnf-plugins-core
yum config-manager --set-enabled powertools
```

## yasm

```bash
   cd /tmp
   wget http://www.tortall.net/projects/yasm/releases/yasm-1.3.0.tar.gz
   tar zxvf yasm-1.3.0.tar.gz
   cd  yasm-1.3.0
   ./configure 
   make 
   make install
```

## nasm

```bash
  cd /tmp
  wget https://www.nasm.us/pub/nasm/releasebuilds/2.15/nasm-2.15.tar.gz
  tar xvf nasm-2.15.tar.gz
  cd nasm-2.15
  ./configure 
  make 
  make install
```

## libx264

```bash
   cd /tmp
   yum install git (可选)
   git clone https://code.videolan.org/videolan/x264.git
   cd x264
   ./configure  --enable-shared
   make 
   make install
```

## libmp3lame

```bash
   cd /tmp
   wget https://sourceforge.net/projects/lame/files/lame/3.100/lame-3.100.tar.gz
   tar zxvf lame-3.100.tar.gz
   cd lame-3.100
   ./configure --enable-shared
   make 
   make install
```

## libgdiplus

```bash
  cd /tmp
  wget http://download.mono-project.com/sources/libgdiplus/libgdiplus0-6.0.5.tar.gz
  tar zxvf libgdiplus0-6.0.5.tar.gz
  cd libgdiplus-6.0.5
  ./configure
  make 
  make install
```

## ffnvcodec

```bash
    cd /tmp
    git clone https://git.videolan.org/git/ffmpeg/nv-codec-headers.git
    cd nv-codec-headers && sudo make install && cd –

```
或

```bash
sudo dnf -y install nv-codec-headers
```

## 刷新和更新

```bash
  echo "/usr/local/lib" >> /etc/ld.so.conf
  ldconfig
```

## 编译支持CUDA的FFmpeg

```bash
git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg/
./configure --enable-cuda-nvcc --enable-cuda --enable-cuvid --enable-nvdec --enable-nvenc --enable-nonfree --enable-libnpp --disable-static --enable-shared --extra-cflags=-I/usr/local/cuda/include --extra-ldflags=-L/usr/local/cuda/lib64
make -j8
sudo make install
```

## 测试

```bash
ffmepg
```
