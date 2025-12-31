---
title: "使用Qt6在Python中显示CNN AI图像处理结果的最简示例"
description: "import sys # PySide6所需"
date: 2022-03-09
lang: zh
slug: "easiest-demo-Displaying-CNN-AI-Image-Processing-Results-by-Qt6-in-Python"
tags: ["Python", "Qt", "OpenCV", "Image Processing", "PySide6"]
featured: false
draft: false
---

深度学习算法应用，特别是图像处理算法，其结果总是需要可视化显示。原始的OpenCV `imshow`方法虽然简单但不够用，在可扩展性和可维护性方面表现不佳。另一方面，`Qt`库是一个成熟的UI框架，从C/C++发展而来，现在在Python中也可使用。`PyQt4/PyQt5`包来自社区，而`PySide2/PySide6`包则来自`Qt`官方。我们将在这里使用PySide6，因为它更新且是官方版本。用于图像数据的数据包装器通常是OpenCV Mat。工作流程如下：图像从相机设备或视频流/文件中捕获并逐帧解码为OpenCV mat，然后交给算法进行进一步处理。最后，UI框架`Qt`接管结果显示工作。

导入包：

```python
import sys # PySide6所需

from PySide6 import QtWidgets
from PySide6 import QtGui, QtCore
from PySide6.QtCore import * 
from PySide6.QtGui import *
from PySide6.QtWidgets import QFileDialog, QMainWindow, QMessageBox

from generated_files.uic.mainwindow import Ui_MainWindow

import cv2
import numpy as np # cv2 mat由numpy包装
```

从`Qt QMainWindow`创建主窗口类：

```python
class MainWindow(QMainWindow):

    def __init__(self):
        #QWidget.__init__(self)
        super(MainWindow, self).__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
```

创建主函数：

```python
if __name__ == '__main__':
    app = QtWidgets.QApplication(sys.argv)
    win = MainWindow()
    win.show()
    sys.exit(app.exec_())
```

现在创建了一个空白窗口。

使用Designer创建qt表单文件：

![image](/assets/image/in-post/pyside6_opencv/0.png)

在窗口上添加label控件：

![image](/assets/image/in-post/pyside6_opencv/1.png)

清除label中的文本并将label的对象名称更改为`image_label`：

![image](/assets/image/in-post/pyside6_opencv/2.png)

添加数据捕获代码。我们使用OpenCV打开相机设备，并添加一个定时器以持续从相机获取图像。我们定义一个名为`display_video_stream`的方法来从相机读取图像并在MainWindow上显示它。定时器对象将连接到此方法并每30毫秒调用一次。

```python
class MainWindow(QMainWindow):

    def __init__(self):
        #QWidget.__init__(self)
        super(MainWindow, self).__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.timer=QTimer()
        self.timer.timeout.connect(self.display_video_stream)
        self.cap = cv2.VideoCapture(0) # 调用默认相机设备
        self.timer.start()

    def display_video_stream(self):
        '''从usb相机显示视频流'''
        ret, frame = self.cap.read() # 获取状态和帧
        self.display(frame) 
```

OpenCV捕获的图像数据格式需要转换才能在Qt Label控件上正确显示。我们定义一个名为`display`的方法来完成这项工作：

```python
def display(self, frame):
    '''从opencv显示帧'''
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    image = QImage(frame, frame.shape[1], frame.shape[0], 
                    frame.strides[0], QImage.Format_RGB888)
    
    self.ui.image_label.setPixmap(QPixmap.fromImage(image))
```

完成。

完整文件如下：

```python
import sys

from PySide6 import QtWidgets
from PySide6 import QtGui, QtCore
from PySide6.QtCore import * 
from PySide6.QtGui import *
from PySide6.QtWidgets import QFileDialog, QMainWindow, QMessageBox

from generated_files.uic.mainwindow import Ui_MainWindow

import cv2
import numpy as np

class MainWindow(QMainWindow):

    def __init__(self):
        #QWidget.__init__(self)
        super(MainWindow, self).__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.timer=QTimer()
        self.timer.timeout.connect(self.display_video_stream)
        self.cap = cv2.VideoCapture(0) # 调用默认相机设备
        self.timer.start()
    
    def display(self, frame):
        '''从opencv显示帧'''
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        image = QImage(frame, frame.shape[1], frame.shape[0], 
                        frame.strides[0], QImage.Format_RGB888)
        
        self.ui.image_label.setPixmap(QPixmap.fromImage(image))

    def display_video_stream(self):
        '''从usb相机显示视频流'''
        ret, frame = self.cap.read() # 获取状态和帧
        self.display(frame)

if __name__ == '__main__':
    app = QtWidgets.QApplication(sys.argv)
    win = MainWindow()
    win.show()
    sys.exit(app.exec_())
```

简单。😊

完整项目在这里[https://github.com/BigBookPlus/PythonQtWithOpenCV.git](https://github.com/BigBookPlus/PythonQtWithOpenCV.git)。
