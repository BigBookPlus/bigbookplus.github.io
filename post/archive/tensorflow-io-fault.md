---
title: "在kaggle的notebook 执行 import tensorflow-io 报错 undefined symbol"
#subtitle: 'Installation of OpenVino 2022.3 in Docker'
author: "BigBook"
header-style: text
tag:
  - Kaggle
  - tensorflow-io
  - Python
---


最近尝试在kaggle的ipython notebook搞事情，在尝试一个新方案的时候，被动执行了import tensorflow-io，代码如下：

```python
import tensorflow-io 
```

这时提示一个错误，核心内容主要是这段：

```text
libtensorflow_io.so undefined symbol:
_ZN10tensorflow0pKernel11TraceStringEPNS_150pKernelContextEb'
```

对tensorflow-io不是很熟，直接google,一个简单的error,搜出来一堆看上去不那么靠谱的答案，

例如这个问题下面：[unable-to-open-file-libtensorflow-io-so-caused-by-undefined-symbol](https://stackoverflow.com/questions/65623468/unable-to-open-file-libtensorflow-io-so-caused-by-undefined-symbol)

好几个答案让卸掉tensorflow和tensorflow-io，重新安装tensorflow-gpu和tensorflow-io。

But WHY??

真正的错误原因很简单，就是tensorflow-io和tensorflow版本要适配，或者说兼容。tensorflow-io官方的git repo提供了版本号对应关系的表格。我按照表格检查了一下，kaggle笔记本环境提供的默认tensorflow版本是2.12，但是安装的tensorflow-io是0.31.0。根据表格信息，我应该安装tensorflow-io 0.32.0版本。笔记本中执行安装命令

```console
!pip install tensorflow-io==0.32.0
```

错误消失。

看来官方的笔记本也不是那么靠谱的喔。


表格链接[tensorflow-version-compatibility](https://github.com/tensorflow/io#tensorflow-version-compatibility)

| TensorFlow I/O Version | TensorFlow Compatibility | Release Date |
| --- | --- | --- |
| 0.32.0 | 2.12.x | Mar 28, 2023 |
| 0.31.0 | 2.11.x | Feb 25, 2023 |
| 0.30.0 | 2.11.x | Jan 20, 2023 |
| 0.29.0 | 2.11.x | Dec 18, 2022 |
| 0.28.0 | 2.11.x | Nov 21, 2022 |
| 0.27.0 | 2.10.x | Sep 08, 2022 |
| 0.26.0 | 2.9.x | May 17, 2022 |
| 0.25.0 | 2.8.x | Apr 19, 2022 |
| 0.24.0 | 2.8.x | Feb 04, 2022 |
| 0.23.1 | 2.7.x | Dec 15, 2021 |
| 0.23.0 | 2.7.x | Dec 14, 2021 |
| 0.22.0 | 2.7.x | Nov 10, 2021 |
| 0.21.0 | 2.6.x | Sep 12, 2021 |
| 0.20.0 | 2.6.x | Aug 11, 2021 |
| 0.19.1 | 2.5.x | Jul 25, 2021 |
| 0.19.0 | 2.5.x | Jun 25, 2021 |
| 0.18.0 | 2.5.x | May 13, 2021 |
| 0.17.1 | 2.4.x | Apr 16, 2021 |
| 0.17.0 | 2.4.x | Dec 14, 2020 |
| 0.16.0 | 2.3.x | Oct 23, 2020 |
| 0.15.0 | 2.3.x | Aug 03, 2020 |
| 0.14.0 | 2.2.x | Jul 08, 2020 |
| 0.13.0 | 2.2.x | May 10, 2020 |
| 0.12.0 | 2.1.x | Feb 28, 2020 |
| 0.11.0 | 2.1.x | Jan 10, 2020 |
| 0.10.0 | 2.0.x | Dec 05, 2019 |
| 0.9.1 | 2.0.x | Nov 15, 2019 |
| 0.9.0 | 2.0.x | Oct 18, 2019 |
| 0.8.1 | 1.15.x | Nov 15, 2019 |
| 0.8.0 | 1.15.x | Oct 17, 2019 |
| 0.7.2 | 1.14.x | Nov 15, 2019 |
| 0.7.1 | 1.14.x | Oct 18, 2019 |
| 0.7.0 | 1.14.x | Jul 14, 2019 |
| 0.6.0 | 1.13.x | May 29, 2019 |
| 0.5.0 | 1.13.x | Apr 12, 2019 |
| 0.4.0 | 1.13.x | Mar 01, 2019 |
| 0.3.0 | 1.12.0 | Feb 15, 2019 |
| 0.2.0 | 1.12.0 | Jan 29, 2019 |
| 0.1.0 | 1.12.0 | Dec 16, 2018 |