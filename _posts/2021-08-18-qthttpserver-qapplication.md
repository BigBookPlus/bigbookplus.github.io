---
layout: post
title: "在子线程中调用Qt组件并启动HttpServer"
subtitle: 'Using Qt Moudules and Running a HttpServer inside Subthreads'
author: "BigBook"
header-style: text
hidden: true
tags:
  - C/C++
  - Qt
  - QtHttpServer
---

### 最简单的Qt代码

如果想构建一个最简单的Qt程序，那么大概就是一个没有UI、控制台下运行的HelloWorld程序，它的代码大概是这个样子：

```cpp
#include <QtCore>

int main(int argc, char **argv) {
    QCoreApplication app(argc, argv);

    // qDebug()<<"Hello World";

    return app.exec();
}
```

### 怎样构建（编译）

构建Qt项目的方法有很多，可以是Visual Studio + Qt插件，也可以用QtCreator。不过我更喜欢CMake的方式进行构建。基本的方法可以参考Qt官方关于CMake的指南[cmake-get-started](https://doc.qt.io/qt-5/cmake-get-started.html)。Qt项目编译中的关键步骤:MOC、UIC、RCC都可以通过添加一行指令，让CMake自动完成。用CMake管理Qt项目，基本和普通的C++项目感觉不到太大区别。

```cpp
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)
```

### 在动态链接库中使用Qt组件

如果在动态库中直接调用了qt的组件实现功能，而调用它的C++工程不是Qt工程，大概率会出现一条和QApplication有关的报错信息，大概意思就是该模块必须要QCoreApplication才能运行。