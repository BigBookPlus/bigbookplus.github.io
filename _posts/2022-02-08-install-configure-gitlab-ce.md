---
layout: post
title: "Setup GitLab Sevice on Ubuntu 16.04 in Local LAN"
subtitle: 'a simple&easy way to setup gitlab service'
author: "BigBook"
header-style: text
tags:
  - GitLab
  - Git
  - Ubuntu 16.04
---

# Setup GitLab Sevice on Ubuntu 16.04 in Local LAN


GitLab is as powerful as GitHub. We decide to change the version control system from SVN to Git. We run the GitLab server in our local LAN. I found the blogs for GitLab installation are all too long to read and too complicated for using GitLab in local LAN with no domain name, so I wrote this one.

Before installing GitLab, please update the Ubuntu repository.

```bash
sudo apt-get update
```


Install the prerequisites packages.
```bash
sudo apt install curl openssh-server ca-certificates postfix
```

select 'Internet Site' during postfix installation, and type in a server domain name for sending email. If you don't have one, just type something you like.

Add GitLab repository with the curl command. 

```bash
curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
```

This step is important. I think it's one of the best way for installing the GitLab. Bacause after the repository added, we can install the gitlab packages by a simple command.

```bash
sudo apt install gitlab-ce
```

Then we update the configuration.

```bash
sudo vim /etc/gitlab/gitlab.rb
```

Since We don't have a domain name for my GitLab server , we use ip address and keep using `http` protocal.

```text
external_url 'http://your_ipaddress'
```

Then we run reconfiguration.
```bash
sudo gitlab-ctl reconfigure
```
That's it. 

For users who want to setup the GitLab service in Local LAN, just like me, the installation is completed here. There are a bunch of other things needed to be done if you have a domain name and you want to enable the HTTPS protocol for GitLab. By now, we are able to visit GitLab through ip address in local LAN.

### 502 Whoops, GitLab is taking too much time to respond.

One more thing, if you keep receiving the error message '502 Whoops, GitLab is taking too much time to respond.' when you visiting GitLab, you need to check ports on your server. In my situation, my server is running another service on port 8080, which is needed by puma in GitLab. Change the Puma port in /etc/gitlab/gitlab.rb and run reconfiguration.

```text
puma['port'] = some_port_here
```

It works for me, hope it helpful.

## reference

[how-to-install-and-configure-gitlab-on-ubuntu-16-04 [digitalocean]](https://www.howtoforge.com/tutorial/how-to-install-and-configure-gitlab-on-ubuntu-16-04/)

[how-to-install-and-configure-gitlab-on-ubuntu-16-04 [howtoforge]](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-gitlab-on-ubuntu-16-04)

[502-whoops-gitlab-is-taking-too-much-time-to-respond](https://forum.gitlab.com/t/502-whoops-gitlab-is-taking-too-much-time-to-respond/52522/11)