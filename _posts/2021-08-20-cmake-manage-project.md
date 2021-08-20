---
layout: post
title: "利用CMake管理C/C++工程的一点心得"
subtitle: 'Tips for Managing C/C++ Projects By CMake'
author: "BigBook"
header-style: text
hidden: false
tags:
  - C/C++
  - CMake
  - Qt
  - OpenCV
---

现在我个人负责的所有项目均使用CMake管理，CMake语法简洁功能强大，并且大部分主流C/C++ Lib库都内建了对CMake的支持。我在工作中主要使用到比较有代表性的Lib库：

- OpenCV
    
    OpenCV是Intel维护的开源库，图像处理必备

- Boost
  
    Boost是对C++语言最重要的扩展库，提供了对标注库的扩展、标准编译器尚未支持的新特性和一些语法糖

- Qt

    强大的UI库

- CUDA

    NVIDIA显卡并行加速支持

下面从一个最简单的`Hello CMake`程序开始，介绍CMake在实际使用中的一些方式。

### Nearly Empty C/C++ Project

最简单的CMakeLists文件，可以参考[hello-cmake](https://github.com/ttroy50/cmake-examples/tree/master/01-basic/A-hello-cmake)，非常的简洁，这里我略加修改引用一下。假设我们的项目里面只有这么一个代码文件，它的内容是这样的：

```cpp
#include <iostream>

int main(int argc, char *argv[])
{
   std::cout << "Hello CMake!" << std::endl;
   return 0;
}
```

没有外部依赖，甚至也没有多余的逻辑，这基本就是C++的HelloWorld代码，只不过打印输出变成了`Hello CMake`。在项目路径下，添加CMakeLists.txt文件，写入如下内容：

```cmake
cmake_minimum_required(VERSION 3.5)

# Set the project name
project (hello_cmake)

# Add an executable
add_executable(hello_cmake main.cpp)
```

在项目路径下执行如下命令，即可完成编译：

```bash
mkdir build && cd build
cmake ..
make
```

执行

```bash
./hello_cmake
```

输出`Hello CMake`，编译成功。

### CMake with OpenCV

那么如果想在项目中调用OpenCV，该怎么做呢？

写一个简单的程序`cv-test.cpp`，调用OpenCV进行读图像和显示：

```cpp
#include <iostream>
#include <opencv2/opencv.hpp>
#include <opencv2/highgui.hpp>

int main(int argc, char** argv )
{
    if ( argc != 2 )
    {
        std::cout<<"usage: DisplayImage.out <Image_Path>"<<std::endl;
        return -1;
    }
    cv::Mat image;
    image = cv::imread( argv[1] );
    if ( image.empty() )
    {
        std::cout<<"No image data"<<std::endl;
        return -1;
    }
    cv::imshow("Display Image", image);
    cv::waitKey(0);
    return 0;
}
```

对应的`CMakeLists.txt`文件：

```cmake
cmake_minimum_required(VERSION 2.8)
project( DisplayImage )

find_package( OpenCV REQUIRED )
include_directories( ${OpenCV_INCLUDE_DIRS} )

add_executable( cv-test cv-test.cpp )
target_link_libraries( cv-test ${OpenCV_LIBS} )
```

这样就OK了。其实关键内容主要是这3行：

```cmake
find_package( OpenCV REQUIRED ) 
include_directories( ${OpenCV_INCLUDE_DIRS} )
target_link_libraries( cv-test ${OpenCV_LIBS} )
```

当然前提是你的OpenCV正确安装了，并且环境变量`OpenCV_DIR`没问题。如果没有设置环境变量，或者系统中有多个版本的OpenCV，想指定某一个版本的OpenCV，比如这里我想指定我自己编译的支持了CUDA11的`OpenCV 4.5.2`，可以增加如下一行：


```cmake
set(OpenCV_DIR D:/WORK/opencv-github/opencv452/build-cuda11/install)
```

### CMake with Boost

同上，对Boost的支持似乎更容易，只需要搞定这两个环境变量: `Boost_INCLUDE_DIR`、`Boost_LIBRARY_DIRS`。为了使用简便，我们开启了`Boost_USE_STATIC_LIBS`变量支持静态链接，这也是Boost库的常用方法。又出于Debug的目的，我们先执行了几个unset对变量执行清除，再根据自己的路径，对Boost的变量进行设置，最后加入find_package等指令。这里只列举需要新增的内容：

```cmake
set(Boost_USE_STATIC_LIBS ON)
set(Boost_USE_MULTITHREADED ON)

unset(Boost_LIBRARIES)
unset(Boost_INCLUDE_DIR CACHE)
unset(Boost_LIBRARY_DIRS CACHE)

set(Boost_INCLUDE_DIR D:/Lib/boost_1_76_0)
set(Boost_LIBRARY_DIRS D:/Lib/boost_1_76_0/lib64-msvc-14.2)

find_package(Boost COMPONENTS system filesystem json REQUIRED) # for example

if(NOT Boost_FOUND)
    message("Not found Boost")
endif()
 
include_directories(${Boost_INCLUDE_DIRS})
```


### CMake with Qt

Qt也内建了对CMake的支持。Qt的编译流程比较复杂，因为是GUI的框架，涉及到组织资源文件、生成UI代码等步骤，似乎离不开QtCreator或者VS+Qt Plugin。但是如果尝试使用CMake进行组织Qt项目，life will be much easier.

```cmake
cmake_minimum_required(VERSION 3.1.0)

project(helloworld VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

if(CMAKE_VERSION VERSION_LESS "3.7.0")
    set(CMAKE_INCLUDE_CURRENT_DIR ON)
endif()

find_package(Qt5 COMPONENTS Widgets REQUIRED)

add_executable(helloworld
    mainwindow.ui
    mainwindow.cpp
    main.cpp
    resources.qrc
)

target_link_libraries(helloworld Qt5::Widgets)
```

### CMake with CUDA

对CUDA的支持更为简洁，只需要在文件开头的`project`指令加些参数：

```cmake
project(cuda-demo VERSION 0.1.0 LANGUAGES CXX CUDA)
```

### 控制编译生成文件的输出路径

有时候一个项目中的多个子项目互相依赖，但是代码往往是分开的。即使上层用`add_subdirectory`指令进行组织，cmake也会默认按照项目的目录层次进行编译生成，这样会导致互相依赖的可执行文件和动态库生成在不同的子目录，互相访问不到。为了调试方便，可以令所有生成的可执行文件在指定目录下：

```cmake
set(EXECUTABLE_OUTPUT_PATH ${PROJECT_BINARY_DIR}/bin)   # set executable file output dir 
set(LIBRARY_OUTPUT_PATH ${PROJECT_BINARY_DIR}/bin)      # set library file output dir 
```

### Reference

[cmake-examples](https://github.com/ttroy50/cmake-examples)

[Using OpenCV with gcc and CMake](https://docs.opencv.org/4.5.2/db/df5/tutorial_linux_gcc_cmake.html)