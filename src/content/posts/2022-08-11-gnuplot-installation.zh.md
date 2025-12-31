---
title: "GNUPlot安装教程"
description: "在编译gnuplot-5.4.3之前，我们需要安装libpng和libgd"
date: 2022-08-11
lang: zh
slug: "gnuplot-installation"
tags: ["GNUPlot", "CentOS 8", "aws-linux-2"]
featured: false
draft: false
---

在编译gnuplot-5.4.3之前，我们需要安装libpng和libgd

我们可以使用yum install来安装libpng

```bash
yum install libpng-devel
```

yum提供的libgd-devel包在aws-linux-2上与gnuplot-5.4.3不兼容，
我们下载并编译官方新版本。
```bash
wget https://github.com/libgd/libgd/releases/download/gd-2.3.3/libgd-2.3.3.tar.gz 
tar zxvf ./libgd-2.3.3.tar.gz
cd libgd-2.3.3
./configure
make
sudo make install
```

然后编译gnuplot。
```bash
cd libs
wget https://sourceforge.net/projects/gnuplot/files/gnuplot/5.4.3/gnuplot-5.4.3.tar.gz
tar zxvf ./gnuplot-5.4.3.tar.gz
cd gnuplot-5.4.3
./configure
make
sudo make install
```
