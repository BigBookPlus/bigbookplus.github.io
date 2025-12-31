---
title: "执行git pull并忽略本地文件修改"
author: "BigBook"
header-style: text
tag:
  - Git
---

## 问题

在一个很久没有同步过的测试机上面试图将代码仓库更新到最新版本，提示报错：

```log
error: Your local changes to the following files would be overwritten by merge:
        app/client.py
        ...
        configs/file.yml
Please commit your changes or stash them before you merge.
Aborting
```

这台机器的仓库是很久之前的版本；但是因为调试的缘故，直接在该机器上改过几行代码，导致存在本地修改，这就是不能直接git pull的原因。

似乎可以直接通过意念，无视本地修改，强行更新到仓库的最新版本。直觉上来讲，这个功能一定也是存在的，只是在git上体现的更加理性一些。

## 解决方案

想要达成此种效果，执行以下命令即可

```bash
git fetch
git branch backup-master
git reset --hard origin/master
```

第一行是更新所有远程修改到本地，第二行是把当前修改作为分支备份，第三行就开始了强行git pull。

一般来讲，这样就可以达到强行更新到最新的版本的目的。如果还不放心，或者确实不够新，可以再补充执行以下两条命令

```bash
git reset --hard HEAD
git pull
```

## 总结

测试机上的更新一般就是改些常量，比如服务器地址或者线程数之类。如果影响到了新版版本的测试，直接无视覆盖就好，所以这里备份也比较潦草。

如果非常重视本地改动，说明本地修改比较重要，可以在切换到origin/master之前，执行一步merge,

例如

```bash
git fetch
git stash
git merge '@{u}'
git stash pop
```

更多内容可参考

[how-do-i-force-git-pull-to-overwrite-local-files](https://stackoverflow.com/questions/1125968/how-do-i-force-git-pull-to-overwrite-local-files)
[git-pull-force-how-to-overwrite-local-changes-with-git](https://www.freecodecamp.org/news/git-pull-force-how-to-overwrite-local-changes-with-git/)