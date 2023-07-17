---
title: "Build OpenCV 4.5.2 with CUDA support | CMake+VS2019+Win10+CUDA"
subtitle: 'Build Your Own OpenCV Library'
author: "BigBook"
header-style: text
tag:
  - C/C++
  - CMake
  - Win10
  - OpenCV
  - VS2019
  - Visual Studio 2019
---

使用C++进行计算机图像处理方向的开发，OpenCV是最常使用的Lib之一。个人对OpenCV的使用，大概从2.4版本开始，一直到现在的Release版4.5.2[现在是2021.06.08]。

OpenCV功能比较丰富，包含了传统图像处理的绝大部分经典算法，其基本矩阵类型Mat简单强大，现在还加入了DNN模块支持深度学习模型推理，这两部分都可以单独深入讨论。最近决定使用DNN模块进行算法部署，需要用到GPU加速,而官方提供的标准编译安装包不满足需求了，遂决定自己动手编译，定制符合自己需求的OpenCV Lib。这对自己日常的开发工作来说，其实是一本万利的。

由于业务需求，本文实践在Windows 10操作系统下进行。在Linux下进行此类编译更为便捷，问题也更少，步骤基本类似。好在Windows平台下的Visual Stuido对CMake的支持也越做越好了。

按照自己的习惯，我在自己的work目录下建立了一个名为opencv-github的文件夹，随后从git上把最新的opencv和opencv-contrib牵下来。opencv-contrib一般包含非release组件以及nonfree组件。

```console
git clone https://github.com/opencv/opencv.git
```

![image](/assets/image/in-post/opencv_cmake_vs2019/0.png)

```console
git clone https://github.com/opencv/opencv_contrib.git
```

![image](/assets/image/in-post/opencv_cmake_vs2019/1.png)

如果安装了visual stuido 2019，cmake-gui大概率可以从cmd控制台直接呼出来。打开cmake-gui后，配置一下源码路径和编译路径。我的配置如下:

源码路径 D:/WORK/opencv-github/opencv

编译路径 D:/WORK/opencv-github/opencv/build

![image](/assets/image/in-post/opencv_cmake_vs2019/2.png)

点击Configure，选择vs2019 x64编译

![image](/assets/image/in-post/opencv_cmake_vs2019/3.png)

![image](/assets/image/in-post/opencv_cmake_vs2019/4.png)

第一次Configure，ippicv依赖包下载失败，重新configure了一次，这次成功了。

![image](/assets/image/in-post/opencv_cmake_vs2019/5.png)

搜索OPENCV_EXTRA_MODULES_PATH选型，填入OpenCV Contrib的路径

```console
D:/WORK/opencv-github/opencv_contrib/modules
```

![image](/assets/image/in-post/opencv_cmake_vs2019/6.png)

搜索cuda，勾选OPENCV DNN CUDA和WITH CUDA。不要勾选 BUILD CUDA STUBS。

cuda是要提前安装的，cudnn最好也安装上，注意cuda和cudnn版本的对应。

再次点击configure。

![image](/assets/image/in-post/opencv_cmake_vs2019/7.png)

选中BUILD opencv world选项。这里主要是为了使用便捷，一个胜过你所有，不必单独一个个去链接。当然，单独选择链接组件的方式更有利于控制release程序的体积，有利有弊吧。

![image](/assets/image/in-post/opencv_cmake_vs2019/8.png)

选中 enable nonfree选项，打开这个选项会把一些不能免费商用的算法编译进去，做些研究和实验还是可以的。之前的nonfree算法中最著名的当属sift，不过现在sift已经免费啦。

![image](/assets/image/in-post/opencv_cmake_vs2019/9.png)

现在点击generate

![image](/assets/image/in-post/opencv_cmake_vs2019/10.png)

Generate结束。可以点击Open Project了。

![image](/assets/image/in-post/opencv_cmake_vs2019/11.png)

这样就呼出了宇宙第一IDE 2019。然后就可以开始编译啦~

![image](/assets/image/in-post/opencv_cmake_vs2019/12.png)

展开CMakeTargets，选择ALL BUILD

![image](/assets/image/in-post/opencv_cmake_vs2019/13.png)

右键菜单选择build或者直接f7键，即可开始编译。ALL BUILD编译结束后，再选中INSTALL执行编译，这样编译出来的头文件、lib文件、dll文件和cmake文件就在开头提到的build目录下的install目录下面了。其实这里的ALL BUILD和INSTALL，相当于linux下面常见的make和make install。

现在已经有了头文件、lib文件、dll文件和cmake文件，就可以开始愉快的开发了哦。