---
title: "Installation of GNUPlot 5.4.3 on Linux with png/jpg export support"
subtitle: 'Building GNUPlot on CentOS 8 and aws-linux-2'
author: "BigBook"
header-style: text
tag:
  - GNUPlot
  - CentOS 8
  - aws-linux-2
---

We need to install libpng and libgd before the compilation of gnuplot-5.4.3

We can install libpng using yum install

```bash
yum install libpng-devel
```

The libgd-devel package provided by yum is not compatable with gnuplot-5.4.3 on the aws-linux-2,
we download and compile the officially new version.
```bash
wget https://github.com/libgd/libgd/releases/download/gd-2.3.3/libgd-2.3.3.tar.gz 
tar zxvf ./libgd-2.3.3.tar.gz
cd libgd-2.3.3
./configure
make
sudo make install
```

Then compile gnuplot.
```bash
cd libs
wget https://sourceforge.net/projects/gnuplot/files/gnuplot/5.4.3/gnuplot-5.4.3.tar.gz
tar zxvf ./gnuplot-5.4.3.tar.gz
cd gnuplot-5.4.3
./configure
make
sudo make install
```