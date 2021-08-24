---
layout: post
title: "PyTorch中的lr_scheduler的用法"
subtitle: 'lr_scheduler in PyTorch'
author: "BigBook"
header-style: text
tags:
  - C/C++
  - OpenCV
  - Image Classification
  - Batch Inference
  - OpenCV DNN
---

今天写一个关于Vision Transformer的实验代码，复习了一下几种常见的LR_Scheduler:

- [StepLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.StepLR.html#torch.optim.lr_scheduler.StepLR)
- [MultiStepLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.MultiStepLR.html#torch.optim.lr_scheduler.MultiStepLR)
- [ExponentialLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.ExponentialLR.html#torch.optim.lr_scheduler.ExponentialLR)


对于一个基本的训练流程，LR_Scheduler可能不是必须的。但是对于一个完整的训练流程，LR_Scheduler就是必须存在的。LR_Scheduler跟在Optimizer之后，利用对Optim变量的跟踪，在Optim执行Update后，检查lr是否满足预设条件并对学习率learning_rate进行更新。

以StepLR为例，StepLR每隔N个epoch改变`lr`学习率为`lr=lr*gamma`。

```Python
import torch.optim.lr_scheduler as lr_scheduler

optimizer = SGD(model, 0.1)
scheduler = lr_scheduler.StepLR(optimizer, step_size=10, gamma=0.1)

for epoch in range(20):
    for input, target in dataset:
        optimizer.zero_grad()
        output = model(input)
        loss = loss_fn(output, target)
        loss.backward()
        optimizer.step()
    scheduler.step()
```

