# Docker 的基本使用

## 引言

## 安装和配置



## 启动支持GUI的docker镜像


配置xhost

```bash
xhost +local:docker
```

或者

```bash
xhost +
```

```bash
docker run --name snn-server --gpus all --shm-size=1g --ulimit memlock=-1 -it -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=$DISPLAY snn-server:basic
```

## 在Docker中访问usb相机

```bash
docker run --name snn-server -p 8080:8080 -p 8081:8081 -p 8082:8082 -p 9527:9527 -p 8083:8083 --gpus all --shm-size=1g --ulimit memlock=-1 -v /dev/video0:/dev/video0 --device=/dev/video0 -it -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=$DISPLAY snn-server:latest
```

## 创建本地镜像中心

开发中和开发好的镜像都可以选择在dockerhub上暂存，不同阶段或者用途的docker则以不同的tag或仓库名称来区分管理。免费的dockerhub账号有一个私有仓库和无限的公共仓库可供使用。不管是用来开发的镜像，还是准备分发的镜像，体积都比较大，一般要以GB为单位，因特网直接上传下载可能需要等待较长时间；因此，也可以在局域网中配置一台硬盘空间较大的主机，做为内网的镜像中心。

选好机器后，在机器上做好docker的基本配置，然后在联网状态下，执行以下命令：

```bash
docker run -d -p 5000:5000 --restart=always --name xy-registry -v /home/centos/registry:/registry  registry:latest
```
可以看到，内网镜像中心，其实也是一个docker镜像的形式，把registry镜像拉下来，自动启动服务运行在机器上。需要配置的仅是完成端口映射和目录绑定。

### 一些可选参数

- -d，后台运行容器
- -p 5000:5000 ，映射容器5000端口至宿主机5000端口。
- --restart always，设置重新启动策略，在docker重新启动时自动重新启动容器my-registry。
- --name 给容器命名。my-registry，
- -v /registry:/registry，把docker容器中/registry目录的数据加载到宿主机的/registry目录，宿主机的/registry目录如果不存在会自动创建。目的是为了防止docker私有仓库这个容器被删除时，仓库里的镜像也会被删除。宿主机查看到的私有仓库镜像就在这个目录中。
- -e REGISTRY_STORAGE_DELETE_ENABLED，设置是否允许删除仓库存储的镜像。
- -e REGISTRY_HTTP_ADDR=0.0.0.0:5000，设置镜像仓库地址。

### 上传镜像

```bash
docker commit container_id ip:port/image_name:tag
docker push ip:port/image_name:tag
```

## 回收空间

首先查看docker的磁盘空间占用情况

```bash
docker system df
```

## Reference

https://blog.csdn.net/renfeigui0/article/details/103755823

https://cloud.tencent.com/developer/article/1581147

https://medium.com/better-programming/docker-tips-clean-up-your-local-machine-35f370a01a78

