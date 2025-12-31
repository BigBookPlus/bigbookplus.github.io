---
title: "在Ubuntu 16.04局域网环境下搭建GitLab服务"
description: "GitLab和GitHub一样强大。我们决定将版本控制系统从SVN更改为Git。我们在局域网中运行GitLab服务器。我发现有关GitLab安装的博客都太长且太复杂，不适合在没有域名的局域网中使用GitLab，所以我写了这篇文章。"
date: 2022-02-08
lang: zh
slug: "install-configure-gitlab-ce"
tags: ["GitLab", "Git", "Ubuntu 16.04"]
featured: false
draft: false
---

# 在Ubuntu 16.04局域网环境下搭建GitLab服务

GitLab和GitHub一样强大。我们决定将版本控制系统从SVN更改为Git。我们在局域网中运行GitLab服务器。我发现有关GitLab安装的博客都太长且太复杂，不适合在没有域名的局域网中使用GitLab，所以我写了这篇文章。

在安装GitLab之前，请先更新Ubuntu仓库。

```bash
sudo apt-get update
```

安装前置软件包。
```bash
sudo apt install curl openssh-server ca-certificates postfix
```

在postfix安装过程中选择"Internet Site"，并输入用于发送邮件的服务器域名。如果你没有域名，只需输入你喜欢的任何内容。

使用curl命令添加GitLab仓库。

```bash
curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
```

这一步很重要。我认为这是安装GitLab的最佳方法之一。因为添加仓库后，我们可以通过一个简单的命令安装gitlab软件包。

```bash
sudo apt install gitlab-ce
```

然后我们更新配置。

```bash
sudo vim /etc/gitlab/gitlab.rb
```

由于我们没有GitLab服务器的域名，我们使用IP地址并继续使用`http`协议。

```text
external_url 'http://your_ipaddress'
```

然后运行重新配置。
```bash
sudo gitlab-ctl reconfigure
```
就这样。

对于像我一样想在局域网中设置GitLab服务的用户，安装到这里就完成了。如果你有域名并且想为GitLab启用HTTPS协议，还需要做很多其他事情。到目前为止，我们已经能够在局域网中通过IP地址访问GitLab了。

### 502 Whoops, GitLab is taking too much time to respond.

还有一件事，如果你在访问GitLab时一直收到错误消息"502 Whoops, GitLab is taking too much time to respond."，你需要检查服务器上的端口。在我的情况下，我的服务器在8080端口上运行另一个服务，而这个端口是GitLab中的puma所需要的。在/etc/gitlab/gitlab.rb中更改Puma端口并运行重新配置。

```text
puma['port'] = some_port_here
```

这对我有效，希望对你有帮助。

## 参考资料

[how-to-install-and-configure-gitlab-on-ubuntu-16-04 [digitalocean]](https://www.howtoforge.com/tutorial/how-to-install-and-configure-gitlab-on-ubuntu-16-04/)

[how-to-install-and-configure-gitlab-on-ubuntu-16-04 [howtoforge]](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-gitlab-on-ubuntu-16-04)

[502-whoops-gitlab-is-taking-too-much-time-to-respond](https://forum.gitlab.com/t/502-whoops-gitlab-is-taking-too-much-time-to-respond/52522/11)
