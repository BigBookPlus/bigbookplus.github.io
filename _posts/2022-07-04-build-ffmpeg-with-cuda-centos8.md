---
layout: post
title: "Build FFMpeg with CUDA on CentOS 8"
subtitle: 'a building note'
author: "BigBook"
header-style: text
tags:
  - FFMepeg
  - CUDA
  - CentOS 8
---

## Prepareing

CUDA toolkits need to be installed. 
Then the following listed packages should be installed too.

```bash
dnf -y install   automake autoconf libtool make gcc gcc-c++
dnf --enablerepo=powertools -y install giflib-devel
dnf --enablerepo=powertools -y install libexif-devel
dnf -y install bison pkgconfig glib2-devel gettext make libpng-devel libjpeg-devel libtiff-devel libexif-devel giflib-devel libX11-devel freetype-devel fontconfig-devel  cairo-devel fribidi-devel
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

## refresh && update

```bash
  echo "/usr/local/lib" >> /etc/ld.so.conf
  ldconfig
```

## FFMpeg with CUDA

```bash
git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg/
./configure --enable-nonfree --enable-cuda-nvcc --enable-libnpp --extra-cflags=-I/usr/local/cuda/include --extra-ldflags=-L/usr/local/cuda/lib64 --disable-static --enable-shared
make -j8
sudo make install
```

## test

```bash
ffmepg
```