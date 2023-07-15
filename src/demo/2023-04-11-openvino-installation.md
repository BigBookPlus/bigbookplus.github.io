---
title: "在Docker中安装和配置OpenVino 2022.3"
subtitle: 'Installation of OpenVino 2022.3 in Docker'
author: "BigBook"
header-style: text
tag:
  - OpenVino
  - Docker
  - GPU Docker
---

## 从代码安装

官方推荐从代码安装

### 开局不利

选择通过gitee clone安装，但是反复clone失败。报错如下：

```console
# git clone -b 2022.3.0 https://gitee.com/openvinotoolkit-prc/openvino.git
Cloning into 'openvino'...
remote: Enumerating objects: 345561, done.
remote: Counting objects: 100% (59023/59023), done.
remote: Compressing objects: 100% (33490/33490), done.
error: RPC failed; curl 56 GnuTLS recv error (-9): Error decoding the received TLS packet.
fatal: the remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
```


### 解决方法


```console
git config --global http.postBuffer 500M
git config --global http.maxRequestBuffer 100M
git config --global core.compression 0
```