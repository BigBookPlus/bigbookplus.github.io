---
title: "无需sudo运行docker命令"
subtitle: 'docker.sock permission denied. Run Docker commands without sudo'
author: "BigBook"
header-style: text
tag:
  - Docker
  - GPU Docker
---
## Run Docker commands without sudo

新安装的Docker，有可能需要使用sudo才能运行docker命令。

比如，运行一个GPU docker镜像，需要使用sudo，否则会报错：

```console
$ docker run --rm --runtime=nvidia --gpus all nvidia/cuda:11.6.2-base-ubuntu20.04 nvidia-smi

docker: permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/create": dial unix /var/run/docker.sock: connect: permission denied.
See 'docker run --help'.

```

报错信息就是说，没有权限访问docker daemon。这是因为docker默认情况下是不允许普通用户使用的，需要使用sudo才能运行docker命令。

这样很不方便，下面介绍一下如何让docker不需要sudo就能运行。

### 1. Add the `docker` group if it doesn't already exist

首先创建一个Docker 用户组，如果用户组已经存在，可以跳过这一步。

```console
$ sudo groupadd docker
```

### 2. Add the connected user `$USER` to the docker group

然后把当前用户加入到docker用户组中。

Optionally change the username to match your preferred user.

```console
$ sudo gpasswd -a $USER docker
```

**IMPORTANT**: Log out and log back in so that your group membership is re-evaluated.
提示：退出当前用户，重新登录，这样用户组的权限才会生效。

### 3. Restart the `docker` daemon

重启docker服务。

```console
$ sudo service docker restart
```


## 另外一种情况

如果是在root安装且运行过docker，然后切换到普通用户，并且按照上述操作将当前用户加入到docker用户组，可能仍会报错。

```console

docker: permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/create": dial unix /var/run/docker.sock: connect: permission denied.
```

这是因为docker的socket文件的权限问题，需要修改一下。

```console
sudo chown $USER /var/run/docker.sock```console
```




参考 referecne: 

https://docs.docker.com/engine/install/linux-postinstall/

https://docs.docker.com/engine/security/rootless/

https://raw.githubusercontent.com/sindresorhus/guides/main/docker-without-sudo.md

https://stackoverflow.com/questions/48568172/docker-sock-permission-denied