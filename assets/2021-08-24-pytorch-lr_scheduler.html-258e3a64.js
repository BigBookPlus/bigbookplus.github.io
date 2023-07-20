import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as i,c as s,a as e,b as t,d as l,f as c}from"./app-d4e9035c.js";const d={},a=e("p",null,"几种常见的LR_Scheduler:",-1),p={href:"https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.StepLR.html#torch.optim.lr_scheduler.StepLR",target:"_blank",rel:"noopener noreferrer"},u={href:"https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.MultiStepLR.html#torch.optim.lr_scheduler.MultiStepLR",target:"_blank",rel:"noopener noreferrer"},h={href:"https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.ExponentialLR.html#torch.optim.lr_scheduler.ExponentialLR",target:"_blank",rel:"noopener noreferrer"},m=c(`<p>对于一个基本的训练流程，LR_Scheduler可能不是必须的。但是对于一个完整的训练流程，LR_Scheduler就是必须存在的。LR_Scheduler跟在Optimizer之后，利用对Optim变量的跟踪，在Optim执行Update后，检查lr是否满足预设条件并对学习率learning_rate进行更新。</p><p>以StepLR为例，StepLR每隔N个epoch改变<code>lr</code>学习率为<code>lr=lr*gamma</code>。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>import torch.optim.lr_scheduler as lr_scheduler

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function _(v,b){const r=o("ExternalLinkIcon");return i(),s("div",null,[a,e("ul",null,[e("li",null,[e("a",p,[t("StepLR"),l(r)])]),e("li",null,[e("a",u,[t("MultiStepLR"),l(r)])]),e("li",null,[e("a",h,[t("ExponentialLR"),l(r)])])]),m])}const f=n(d,[["render",_],["__file","2021-08-24-pytorch-lr_scheduler.html.vue"]]);export{f as default};
