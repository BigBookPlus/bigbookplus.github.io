---
layout: post
title: "在动态链接库中以非GUI形式调用Qt组件并提供C语言形式API"
subtitle: 'Using Non-GUI Qt Modules Inside the Dynamic Linking Library and Encapsulating C APIs'
author: "BigBook"
header-style: text
hidden: false
tags:
  - C/C++
  - Qt
  - QtHttpServer
  - CMake
  - System Design
---

### 编译 QtHttpServer 模块

首先拉去代码

```bash
git clone https://github.com/qt-labs/qthttpserver.git
cd qthttpserver
git checkout 5.15
git submodule update --init --recursive
```

然后用qtcreator打开工程，编译

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

### 使用QtHttpServer

QtHttpServer目前不在Qt的主lib中，据说Qt6会正式加入。所以需要自行下载编译。[](https://github.com/qt-labs/qthttpserver)

#### 编译QtHttpServer

我使用的是Qt5，牵出5.15分支，并自己使用QtCreator编译：

```console
git clone https://github.com/qt-labs/qthttpserver.git
git checkout 5.15
```

编译成功后，将头文件和动态库拷贝到所使用的Qt安装路径下的对应目录内即可。


```bash
cd build-qthttpserver-Desktop_Qt_5_12_6_GCC_64bit-Release/
mv ./* /opt/Qt5.12.6/5.12.6/gcc_64/lib/

cd cmake/
mv ./* /opt/Qt5.12.6/5.12.6/gcc_64/lib/cmake/

cd ..
cd pkgconfig/
mv ./* /opt/Qt5.12.6/5.12.6/gcc_64/lib/pkgconfig/

cd ..
cd ..
cd include/
mv ./* /opt/Qt5.12.6/5.12.6/gcc_64/include/

cd ..
cd mkspecs
cd modules
mv ./* /opt/Qt5.12.6/5.12.6/gcc_64/mkspecs/modules/
```

#### 启动QtHttpServer

在Qt官方blog [introducing-qt-http-server](https://www.qt.io/blog/2019/01/25/introducing-qt-http-server)，介绍了一个最基本的QHttpServer用法：

```cpp
#include <QtCore>
#include <QtHttpServer>
int main(int argc, char **argv) {
  QCoreApplication app(argc, argv);
  QHttpServer httpServer;
  httpServer.route("/", []() {
    return "Hello world";
  });
  httpServer.listen(QHostAddress::Any, 9527);
  return app.exec();
}

```

程序启动后，浏览器打开 [](http://127.0.0.1:9527) 就可以看到HelloWorld了，所以这里Server提供了Get方法。那么如果想提供POST方法并接受一段数据呢？

加入如下代码即可:

```cpp
  httpserver.route("/post-body", "POST", [] (const QHttpServerRequest &request) {
        return request.body();
    });
```

body中可以传入json等并进行解析。其他用法，推荐一篇详细介绍QtHttpServer接口routing方法的blog [qhttpserver-routing-api](https://www.qt.io/blog/2019/02/01/qhttpserver-routing-api)。


### 封装主服务类

在MainSVC中，对HttpServer进行管理。实际使用时MainSVC还可以封装了其他功能，作为整体服务的入口。

#### MainSVC头文件

```cpp
// FileName: mainsvc.h
// Author: BigBookPlus
// Reference: http://bigbookplus.github.io

class MainSVC : public QObject
{
	Q_OBJECT

public:
	MainSVC(QObject *parent=nullptr);
	~MainSVC();
	void start();
};
```

#### 实现文件，加入QtHttpServer功能

MainSVC类的实现文件。这里要保证QtHttpServer是全局变量，否则Server无法正常运行。

```cpp
// FileName: mainsvc.cpp
// Author: BigBookPlus
// Reference: http://bigbookplus.github.io

#include <QHttpServer>
#include "mainsvc.h"
 
...

static QtHttpServer http_server;

MainSVC::MainSVC()
{
  http_server.route("/", []() {
    return "BigBookPlus Server Test.";
  });
}

MainSVC::~MainSVC()
{
}

void MainSVC::start()
{

  int port = 9527;
	http_server.listen(QHostAddress::Any, port);
}

...

```

### 在动态链接库中使用Qt组件并提供C语言形式API

#### 关于QApplication/QCoreApplication

如果在动态库中直接调用了qt的组件实现功能，而调用它的C++工程不是Qt工程，大概率会出现一条和QApplication/QCoreApplication有关的报错信息，大概意思就是某些模块必须要QApplication/QCoreApplication才能运行。

具体来说，Non-GUI的QCore组件只需要依赖QCoreApplication对象；而涉及到GUI的例如QWidget组件则依赖QApplication对象。QApplication类其实继承自QCoreApplication。Qt主程序执行了它们的exec()方法，该Qt程序的EventLoop和EventDispatcher等功能才能正确运行，这样进而保证了信号和槽等机制的正常运转。实际使用时，应当令QApplication/QCoreApplication的对象变量位于主线程空间，而事件循环可以在其他线程执行，即exec()方法可以在子线程运行。因为exec()是个阻塞的方法，所以放在其他线程执行不会影响主线程，方便很多。

显而易见，不是所有的组件都需要必须有个QApplication/QCoreApplication，进一步说，即使需要QApplication/QCoreApplication对象，其实也可以只定义一个全局变量，而不需要真的执行它的exec方法。

在我的业务场景中，要给UI端以动态链接库的形式提供功能，除了一些一般的实时处理功能，还要在动态库的生命周期开启一个HttpServer，而不巧的是，QtHttpServer需要QCoreApplication对象。谨慎起见，同时我也决定在子线程中执行exec运行事件循环。最后，用户需要提供的是C接口，所以我将主服务接口以MainSVC对象进行封装完毕后，又定义了一套C形式的API。

#### QCoreApplication全局对象

首先在动态链接库的入口实现文件里，定义QCoreApplication全局对象，为了让对象正确初始化，我在这里定义了假的argc/argv参数变量：

```cpp
int argc = 1;
char param[] = "test";
char *argv[1] = { param };
static QCoreApplication a(argc, argv);
```

#### 服务初始化
然后定义一个init函数，函数内new了一个我封装的主服务类的对象，并开启了事件循环。

```cpp
static int init(void)
{
  main_svc = new MainSVC(Q_NULLPTR);
  return a.exec();
}
```

这个函数将在动态链接库的导出的初始化函数svc_init中，开启一个子线程来执行。使用时，用户调用svc_init，即可完成服务的初始化。下面是svc_init的定义：

```cpp
int svc_init(void)
{
  QFuture<void> future = QtConcurrent::run(init);
  return 0;
}
```

#### 实现文件

但是有个新问题，用户直接调用svc_init进行测试，由于后面没有其他操作很快就退出了，因为初始化都是在线程中异步执行的。不能让用户在主线程中等待，简单的方法是在全局变量中增加一个QMutex对象进行控制，再再init和svc_init中访问此变量，即可简单达到同步的功能。初始化该动态库，会提供一个HttpServer供所有人调用。该动态库提供的服务在初始化阶段保证初始化完成后退出，提供给用户调用svc_start方法，启动服务，用户如需要服务一直运行，则后续自行控制主线程生命周期即可。完整实现如下：

```cpp
// FileName: svc_c_api.cpp
// Author: BigBookPlus
// Reference: http://bigbookplus.github.io

#include <QtCore>
#include <QtCore/QVariant>
#include <QtConcurrent>

#include "svc_c_api.h"
#include "mainsvc.h"

int argc = 1;
char param[] = "test";    // magic string. nonsense.
char *argv[1] = { param };

static QCoreApplication a(argc, argv);
static QMutex init_lock;

MainSVC* main_svc = nullptr;

static int init(void)
{
  init_lock.lock();
	main_svc = new MainSVC(Q_NULLPTR);
  init_lock.unlock();
	return a.exec();
}

int svc_init(void)
{
	QFuture<void> future = QtConcurrent::run(init);
  
  QThread::msleep(100); // ensure init_lock mutex has been locked.
  init_lock.lock();     // ensure main_svc initilizition finished.
  init_lock.unlock();   // unlock
  
  return 0;
}

bool svc_start()
{
	if (main_svc != nullptr)
	{
		main_svc->start();
		return true;
	}

	return false;
}

```

#### 接口文件

C语言形式的API的头文件实现如下：


```cpp
// FileName: svc_c_api.h
// Author: BigBookPlus
// Reference: http://bigbookplus.github.io

#ifndef SVC_C_API_H_
#define SVC_C_API_H_

#if defined(_MSC_VER)
# if defined(SVC_LIB)
#  define SVC_QTLIB_EXPORT __declspec(dllexport)
# else
#  define SVC_QTLIB_EXPORT __declspec(dllimport)
# endif
#else
# define SVC_QTLIB_EXPORT
#endif

#include <stdbool.h>

#ifdef __cplusplus
extern "C" {
#endif
  SVC_QTLIB_EXPORT int svc_init(); //before init
	SVC_QTLIB_EXPORT bool svc_start();
#ifdef __cplusplus
}
#endif

#endif
```


### 后记：怎样构建（编译）

构建Qt项目的方法有很多，可以是Visual Studio + Qt插件，也可以用QtCreator。不过我更喜欢CMake的方式进行构建。基本的方法可以参考Qt官方关于CMake的指南[cmake-get-started](https://doc.qt.io/qt-5/cmake-get-started.html)。Qt项目编译中的关键步骤:MOC、UIC、RCC都可以通过添加一行指令，让CMake自动完成。用CMake管理Qt项目，基本和普通的C++项目感觉不到太大区别。

这里提供一个我写的示例：

```cpp
cmake_minimum_required(VERSION 3.8.0)

project(test-svc VERSION 0.1.0 LANGUAGES CXX)

set(Qt5_DIR D:/Qt/Qt5.12.6/5.12.6/msvc2017_64/lib/cmake/Qt5) # replace with path to your own version of Qt.

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

add_definitions(-D SVC_LIB)

find_package(Qt5 COMPONENTS Core Network Concurrent HttpServer REQUIRED)

set(USED_QT_LIBRARYS Qt5::Core Qt5::Network  Qt5::Concurrent  Qt5::HttpServer)

aux_source_directory(src SVC_SRCS)

add_library(snn-svc SHARED ${SVC_SRCS} )
target_link_libraries(snn-svc  ${USED_QT_LIBRARYS})
```

### END

欢迎留言探讨。