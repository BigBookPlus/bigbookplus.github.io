
Simon Perrin 等人的 [Weighted Mean Frequencies: a handcraft Fourier feature for 4D Flow MRI segmentation](http://arxiv.org/abs/2506.20614v1 ) 提出了一种名为**加权平均频率（WMF）**的新型手工特征，用于改善4D Flow MRI图像的分割效果。该特征通过傅里叶分析揭示了三维空间中脉动血流经过的区域，显著提升了分割任务的性能（IoU和Dice分别提高0.12和0.13），并在深度学习和传统阈值分割方法中验证了其有效性。

Moushumi Medhi 等人的 [Dark Channel-Assisted Depth-from-Defocus from a Single Image](http://arxiv.org/abs/2506.06643v2 ) 提出了一种利用**暗通道先验**辅助的单图像离焦深度估计方法。通过结合局部离焦模糊与对比度变化作为深度线索，该方法在对抗学习框架下实现了端到端训练，并在真实数据上验证了其有效性。

Mariano Tepper 等人的 [The kernel of graph indices for vector search](http://arxiv.org/abs/2506.20584v1 ) 提出了一种基于核方法的支持向量图（SVG）索引，用于度量或非度量向量空间中的向量搜索。该方法通过**核函数建立图连接性**，并引入带L0稀疏约束的SVG-L0变体，以有界出度构建图结构，同时具备自调整特性，避免了传统启发式方法的局限性。

Ivan Lopes 等人的 [MatSwap: Light-aware material transfers in images](http://arxiv.org/abs/2502.07784v2 ) 提出了一种基于扩散模型的材质替换方法MatSwap，通过**光照和几何感知的合成数据微调预训练模型**，实现了无需显式UV映射的逼真材质迁移。该成果被EGSR期刊录用，发表于Computer Graphics Forum。

Guikun Chen 等人的 [Chemical knowledge-informed framework for privacy-aware retrosynthesis learning](http://arxiv.org/abs/2502.19119v2 ) 提出了一种**隐私保护的逆合成学习框架（CKIF）**，通过化学性质驱动的模型参数聚合实现分布式训练，避免了原始反应数据的共享。该方法在多个数据集上显著优于基线模型，解决了制药等领域中数据敏感性问题。

Lorenzo Bini 等人的 [Self-Supervised Graph Learning via Spectral Bootstrapping and Laplacian-Based Augmentations](http://arxiv.org/abs/2506.20362v1 ) 提出了LaplaceGNN框架，通过**谱引导增强和对抗性自举训练**，无需负采样即可学习图结构表示。该方法在多个基准数据集上优于当前最先进的图自监督学习方法，并具备线性计算复杂度。

Changliang Xia 等人的 [From Ideal to Real: Unified and Data-Efficient Dense Prediction for Real-World Scenarios](http://arxiv.org/abs/2506.20279v1 ) 提出了DenseDiT，这是一种通过统一策略利用生成模型的视觉先验来执行多样化真实世界密集预测任务的方法。**该方法结合了参数重用机制和两个轻量级分支，自适应地整合多尺度上下文，仅需增加不到0.1%的参数**。在DenseWorld基准测试中，现有基线的性能显著下降，而DenseDiT仅使用基线0.01%的训练数据就取得了优越结果，突显了其在真实世界部署中的实用价值。

Yuyang Zhang 等人的 [Directed Link Prediction using GNN with Local and Global Feature Fusion](http://arxiv.org/abs/2506.20235v1 ) 提出了一种新颖的图神经网络框架，**通过融合特征嵌入与社区信息来改进有向链接预测性能**。该方法通过将输入图转换为有向线图，使节点在卷积过程中能聚合更多信息。在基准数据集上的实验表明，当使用30%-60%的连接作为训练数据时，该方法在大多数情况下优于现有技术。

Jingnan Wang 等人的 [Supporting renewable energy planning and operation with data-driven high-resolution ensemble weather forecast](http://arxiv.org/abs/2505.04396v2 ) 提出了一种通过学习目标风电场高分辨率数值模拟的气候学分布的方法。**该方法将学习到的高分辨率气候先验与粗网格大尺度预报最优结合，生成了高度准确、细粒度、全变量的大集合天气模式预报**。与现有数值/统计预报-降尺度流程相比，该方法在确定性/概率性技能或经济收益方面均显示出优势，且计算成本大幅降低。

Yongle Yuan 等人的 [A Siamese Network to Detect If Two Iris Images Are Monozygotic](http://arxiv.org/abs/2503.09749v3 ) 提出了首个自动分类器，用于确定一对虹膜图像是否来自同卵个体。**该方法采用连体网络架构和对比学习，将虹膜图像对分类为同卵或非同卵**。通过使用原始输入图像、仅虹膜图像和非虹膜图像三种变体训练模型，发现虹膜纹理和周围眼部结构都包含对分类有用的信息。该方法在使用完整虹膜图像时的准确率超过了先前报道的人类对同卵虹膜对的分类水平。

Jiaying He 等人的 [C3S3: Complementary Competition and Contrastive Selection for Semi-Supervised Medical Image Segmentation](http://arxiv.org/abs/2506.07368v2 ) 提出了一种新型半监督分割模型C3S3，**通过协同整合互补竞争和对比选择来显著改善边界描绘和整体精度**。该方法包含一个结果驱动的对比学习模块用于细化边界定位，以及一个动态互补竞争模块生成伪标签以提高分割质量。在两个公开数据集上的验证表明，该方法在95HD和ASD指标上至少提高了6%，显著优于现有技术。该成果于2025年发表于ICME。

Wang Bill Zhu 等人的 [PSALM-V: Automating Symbolic Planning in Interactive Visual Environments with Large Language Models](http://arxiv.org/abs/2506.20097v1 ) 提出了PSALM-V，这是第一个能够在视觉环境中通过交互诱导符号动作语义（即前置条件和后置条件）的自主神经符号学习系统。**该系统利用大型语言模型（LLMs）生成启发式计划和候选符号语义，无需专家定义动作即可实现可靠的符号规划**。与之前主要关注文本领域或依赖不现实假设（如预定义问题文件、完全可观察性或显式错误消息）的方法不同，PSALM-V通过分析执行结果和合成可能的错误解释，动态推断PDDL问题文件和领域动作语义。实验表明，在部分可观察的设置中，PSALM-V将计划成功率从37%（Claude-3.7）提高到74%，并在多智能体设置中提升了步骤效率和领域归纳能力。

Benjamin R. Ecclestone 等人的 [Photon Absorption Remote Sensing (PARS): Comprehensive Absorption Imaging Enabling Label-Free Biomolecule Characterization and Mapping](http://arxiv.org/abs/2506.20069v1 ) 提出了一种新的吸收显微镜模态PARS，**能够同时捕获吸收事件后的主要去激发过程**，包括辐射（自发荧光）和非辐射（光热和光声）松弛过程。通过应用高斯混合模型（GMM）和非负最小二乘法（NNLS），PARS能够在复杂组织样本中直接表征、区分和解混临床相关的生物分子。实验表明，PARS在人类皮肤和小鼠脑组织样本中提供了丰富且独特的对比，能够实现无标记的分子病理学表征，为AI和机器学习方法在诊断和可视化中的应用提供了新的数据来源。

Zelin Xiao 等人的 [Identifying Heterogeneity in Distributed Learning](http://arxiv.org/abs/2506.16394v3 ) 研究了在分布式M估计中识别异质性参数组件的方法。**提出了一种基于重新归一化的Wald检验和极端对比检验（ECT）的方法**，前者在异质性密集时表现出一致性，后者在异质性稀疏时能够处理更大的数据块数量。通过结合这两种检验，该方法能够在不同异质性稀疏水平下实现更稳健的检测能力。数值实验和案例研究验证了所提方法的家族错误率（FWER）和检测能力。

Hang Zhang 等人的 [VoxelOpt: Voxel-Adaptive Message Passing for Discrete Optimization in Deformable Abdominal CT Registration](http://arxiv.org/abs/2506.19975v1 ) 提出了一种基于离散优化的变形图像注册框架VoxelOpt，**结合了学习方法和迭代方法的优势**。VoxelOpt通过局部成本体积中的位移熵测量每个体素的位移信号强度，并引入体素自适应消息传递机制。实验表明，在腹部CT注册中，VoxelOpt在效率和准确性上均优于领先的迭代方法，并与基于监督学习的方法性能相当。该成果将于2025年在MICCAI上发表。

Tiffany Tianhui Cai 等人的 [C-Learner: Constrained Learning for Causal Inference](http://arxiv.org/abs/2405.09493v4 ) 提出了一种新的去偏估计方法，**通过约束学习框架在保持稳定性的同时实现理想的渐近性质**。该方法在治疗和控制重叠有限的情况下表现出优于传统一步估计和目标估计的性能，并在处理文本协变量时通过微调语言模型进一步提升了效果。理论分析表明，在逆倾向得分重尾分布的情况下，该方法比其他去偏估计器收敛更快。

Xin Fan Guo 等人的 [KnowML: Improving Generalization of ML-NIDS with Attack Knowledge Graphs](http://arxiv.org/abs/2506.19802v1 ) 提出了一种知识引导的机器学习框架KnowML，用于提升基于机器学习的网络入侵检测系统（ML-NIDS）的泛化能力。该框架**利用大型语言模型（LLMs）自动分析攻击实现**，构建攻击策略的统一知识图谱（KG），并通过符号推理生成KG增强输入，将领域知识直接嵌入ML-NIDS设计过程。实验表明，基线ML-NIDS模型对某些攻击变体的检测F1得分低至0%，而KnowML的F1得分高达99%，同时保持误报率低于0.1%。

Teng Wang 等人的 [SAGE: Strategy-Adaptive Generation Engine for Query Rewriting](http://arxiv.org/abs/2506.19783v1 ) 提出了一种策略自适应的查询重写引擎SAGE。该工作发现，**通过专家策略（如语义扩展和实体消歧）引导大型语言模型（LLMs）能显著提升检索效果**。SAGE结合强化学习框架，引入两种新型奖励机制——策略信用塑形（SCS）和对比奖励塑形（CRS），在HotpotQA等基准测试中取得了最优NDCG@10结果，同时**展现出智能策略选择和降低推理成本的能力**。

[The Shape of Consumer Behavior: A Symbolic and Topological Analysis of Time Series](http://arxiv.org/abs/2506.19759v1 ) 研究了Google Trends时间序列数据的无监督聚类方法，比较了符号聚合近似（SAX）、增强SAX（eSAX）和拓扑数据分析（TDA）。**研究发现TDA通过持久同源性捕捉全局结构特征**，在消费者分析中生成更平衡且有意义的分组，而SAX/eSAX对复杂时间序列的聚类效果较差。该研究为消费者行为分析提供了混合方法的实践指导。

Sjoerd Dirksen 等人的 [Near-optimal estimates for the $\ell^p$-Lipschitz constants of deep random ReLU neural networks](http://arxiv.org/abs/2506.19695v1 ) 对随机参数ReLU网络的$\ell^p$-Lipschitz常数进行了高概率上下界分析。**研究发现$p\in[2,\infty]$时Lipschitz常数行为类似高斯向量的$p'$范数**，而$p\in[1,2)$时则接近$\ell^2$范数。该结果为深度随机网络的稳定性分析提供了理论支持。

Ahmad Mustafa 等人的 [ReCoGNet: Recurrent Context-Guided Network for 3D MRI Prostate Segmentation](http://arxiv.org/abs/2506.19687v1 ) 提出了一种混合架构用于前列腺MRI分割。该模型**结合DeepLabV3的语义特征提取和ConvLSTM的跨切片信息整合能力**，在PROMISE12基准测试中表现出优于2D/3D模型的性能，尤其在对比度退化的临床场景中具有鲁棒性。

Shuncheng He 等人的 [Unsupervised Data Generation for Offline Reinforcement Learning: A Perspective from Model](http://arxiv.org/abs/2506.19643v1 ) 从理论角度分析了批量数据对离线强化学习性能的影响。研究提出**无监督数据生成方法UDG**，通过任务无关设置生成数据并筛选优化，在未知任务解决上超越了监督数据生成方法，为离线RL的分布偏移问题提供了新思路。

Gencer Sumbul 等人的 [SMARTIES: Spectrum-Aware Multi-Sensor Auto-Encoder for Remote Sensing Images](http://arxiv.org/abs/2506.19585v1 ) 提出了一种通用的遥感图像基础模型SMARTIES，通过**跨传感器令牌混合**和**频谱感知空间投影**，将异构传感器数据映射到共享特征空间。该模型无需针对特定传感器重新训练，即可处理任意波段组合，在单模态和多模态任务中均优于传感器专用模型。

QinZhe Wang 等人的 [ConCM: Consistency-Driven Calibration and Matching for Few-Shot Class-Incremental Learning](http://arxiv.org/abs/2506.19558v1 ) 提出了一种基于**特征-结构双重一致性**的少样本类增量学习框架。通过**记忆感知原型校准**和**动态流形空间匹配**，该方法在mini-ImageNet和CUB200基准上实现了SOTA性能，相比现有最优方法在增量会话谐波准确率上分别提升3.20%和3.68%。

Riccardo Zamboni 等人的 [Towards Unsupervised Multi-Agent Reinforcement Learning via Task-Agnostic Exploration](http://arxiv.org/abs/2502.08365v3 ) 研究了多智能体强化学习中的无监督预训练问题，提出通过**最大化状态分布熵**实现任务无关探索。理论分析表明该问题在实践中的复杂性，并设计了**去中心化信任域策略搜索算法**，实验验证了混合熵目标在可处理性与性能间的平衡优势。

Nasa Matsumoto 等人的 [Iterative Quantum Feature Maps](http://arxiv.org/abs/2506.19461v1 ) 提出了一种混合量子-经典架构IQFMs，通过**迭代连接浅层量子特征映射**和经典增强权重，结合**对比学习**和分层训练机制，显著降低了量子运行时需求。在噪声量子数据处理任务中，IQFMs表现优于量子卷积神经网络，且无需变分量子参数优化。

Jaeyoo Park 等人的 [Emergence of Text Readability in Vision Language Models](http://arxiv.org/abs/2506.19389v1 ) 发现视觉语言模型训练中**文本可读性能力会突然涌现**，而语义理解能力则是渐进发展的。该成果揭示了对比学习优先发展通用语义理解、后期才出现符号处理能力的特性，为优化多模态学习提供了新见解。该成果发表于EVAL-FoMo Workshop @ CVPR 2025。

Ye Tian 等人的 [WebGuard++:Interpretable Malicious URL Detection via Bidirectional Fusion of HTML Subgraphs and Multi-Scale Convolutional BERT](http://arxiv.org/abs/2506.19356v1 ) 提出了一种新型恶意URL检测框架。该研究通过**双向融合HTML子图和BERT多尺度卷积**解决了现有方法的四个关键缺陷：URL建模不完整、HTML图稀疏性、单向分析以及决策不透明。**创新点**包括跨尺度URL编码器、子图感知HTML编码器、双向耦合模块和投票模块，实验显示其TPR比现有方法高1.1-7.9倍（FPR固定为0.001和0.0001）。

Vineet Punyamoorty 等人的 [Contrastive Cross-Modal Learning for Infusing Chest X-ray Knowledge into ECGs](http://arxiv.org/abs/2506.19329v1 ) 提出了一种名为CroMoTEX的对比学习框架，**利用胸部X光（CXR）知识增强心电图（ECG）的临床表征**。该方法通过**自适应硬负样本加权的跨模态对比目标**对齐ECG和CXR表征，在仅使用ECG输入时仍能有效诊断心脏肥大、胸腔积液和水肿，最高AUROC达78.31（水肿检测）。

Heng Zhang 等人的 [SycnMapV2: Robust and Adaptive Unsupervised Segmentation](http://arxiv.org/abs/2506.16297v2 ) 提出了一种**无需训练的鲁棒无监督分割方法**。基于自组织动态方程和随机网络概念，SyncMapV2在数字噪声下仅出现0.01%的mIoU下降（SOTA方法下降23.8%），并能在线适应输入变化。**关键优势**包括对噪声（7.3% vs 37.7%）、天气（7.5% vs 33.8%）和模糊（7.0% vs 29.5%）的强鲁棒性。

Galen Reeves 等人的 [Information-Theoretic Proofs for Diffusion Sampling](http://arxiv.org/abs/2502.02305v2 ) 提出了一种**基于信息论的扩散采样分析框架**。通过离散时间随机过程耦合和I-MMSE关系等工具，该研究为生成模型的扩散采样提供了非渐进收敛保证，并揭示了**通过匹配高阶矩加速收敛**的机制。

Julian Junyan Wang 等人的 [Leveraging Large Language Models to Democratize Access to Costly Datasets for Academic Research](http://arxiv.org/abs/2412.02065v2 ) 开发了一种基于GPT-4o-mini和RAG框架的自动化数据收集方法。该方法以低于10美元的成本在9-40分钟内完成CEO薪酬比（10,000份代理声明）和关键审计事项（12,000份10-K文件）的收集，**准确率接近人工水平**，显著降低了学术研究的数据获取门槛。

Junjie Chen 等人的 [Overlap-Aware Feature Learning for Robust Unsupervised Domain Adaptation for 3D Semantic Segmentation](http://arxiv.org/abs/2504.01668v3 ) 针对3D点云语义分割的域适应问题，提出**三重框架**：鲁棒性评估模型、可逆注意力对齐模块（IAAM）和质量感知对比记忆库。在SynLiDAR-to-SemanticPOSS任务中，该方法在对抗攻击下mIoU最高提升14.3%。该成果已被**IROS 2025**录用。

Yuntao Ma 等人的 [Learning Accurate Whole-body Throwing with High-frequency Residual Policy and Pullback Tube Acceleration](http://arxiv.org/abs/2506.16986v3 ) 提出了一种结合学习和基于模型控制的方法，用于实现有腿移动机械手的预抓取全身投掷。该框架由三部分组成：**末端执行器的名义跟踪策略**、**高频残差策略以提高跟踪精度**，以及**基于优化的模块以改善末端执行器加速度控制**。实验结果表明，该控制器在6米距离投掷目标时的平均着陆误差为0.28米。在与大学生的对比研究中，该系统在投掷速度为6米/秒时，速度跟踪误差为0.398米/秒，成功率为56.8%，而人类的成功率仅为15.2%。该成果于2025年9月发表于 IROS 2025。


### 主要研究方向

1. **医学图像分割与增强**
  - 研究方向概述：利用手工特征或深度学习技术提升医学图像分割性能，尤其在4D Flow MRI等复杂场景中的应用。
  - 代表性研究
    - *[Weighted Mean Frequencies: a handcraft Fourier feature for 4D Flow MRI segmentation](http://arxiv.org/abs/2506.20614v1 )* (2025年6月发表于arXiv)
    - *[ReCoGNet: Recurrent Context-Guided Network for 3D MRI Prostate Segmentation](http://arxiv.org/abs/2506.19687v1 )* (2025年6月发表于arXiv)

2. **跨模态对比学习与知识迁移**
  - 研究方向概述：通过对比学习框架实现跨模态（如ECG与CXR）的知识迁移，提升下游任务的性能。
  - 代表性研究
    - *[Contrastive Cross-Modal Learning for Infusing Chest X-ray Knowledge into ECGs](http://arxiv.org/abs/2506.19329v1 )* (2025年6月发表于arXiv)
    - *[Iterative Quantum Feature Maps](http://arxiv.org/abs/2506.19461v1 )* (2025年6月发表于arXiv)

3. **无监督与鲁棒分割方法**
  - 研究方向概述：开发无需监督训练或具备强鲁棒性的分割技术，适应噪声和动态环境。
  - 代表性研究
    - *[SycnMapV2: Robust and Adaptive Unsupervised Segmentation](http://arxiv.org/abs/2506.16297v2 )* (2025年6月发表于arXiv)
    - *[Overlap-Aware Feature Learning for Robust Unsupervised Domain Adaptation for 3D Semantic Segmentation](http://arxiv.org/abs/2504.01668v3 )* (2025年4月发表于arXiv)

4. **图神经网络与链接预测**
  - 研究方向概述：改进图神经网络架构，提升有向链接预测或异构图学习的性能。
  - 代表性研究
    - *[Directed Link Prediction using GNN with Local and Global Feature Fusion](http://arxiv.org/abs/2506.20235v1 )* (2025年6月发表于arXiv)
    - *[Self-Supervised Graph Learning via Spectral Bootstrapping and Laplacian-Based Augmentations](http://arxiv.org/abs/2506.20362v1 )* (2025年6月发表于arXiv)

5. **生成模型与数据增强**
  - 研究方向概述：利用生成模型（如扩散模型）实现数据合成或增强，支持下游任务如材质替换或强化学习。
  - 代表性研究
    - *[MatSwap: Light-aware material transfers in images](http://arxiv.org/abs/2502.07784v2 )* (2025年2月发表于Computer Graphics Forum)
    - *[Unsupervised Data Generation for Offline Reinforcement Learning: A Perspective from Model](http://arxiv.org/abs/2506.19643v1 )* (2025年6月发表于arXiv)

### 研究趋势分析

过去几年，对比学习在跨模态和跨领域任务中的应用显著增加，尤其在医学图像分析（如ECG与CXR的联合表征）和图数据学习（如自监督图神经网络）中展现出强大潜力。同时，无监督方法的鲁棒性成为研究热点，例如通过动态方程或域适应技术应对噪声和分布偏移。生成模型（如扩散模型）与对比学习的结合进一步推动了数据增强和跨模态合成的进展。此外，轻量化设计（如参数重用机制）和理论分析（如Lipschitz常数估计）逐渐受到重视，反映了从纯应用向理论与工程并重的趋势转变。