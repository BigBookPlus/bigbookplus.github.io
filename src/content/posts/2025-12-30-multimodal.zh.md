---
title: "multimodal"
description: "Yusuf Dalva 等人的 [Canvas-to-Image: Compositional Image Generation with Multimodal Controls](http://arxiv.org/abs/2511.21691v1 ) 提出了一个统一的框架，将文本提示、主题参考、空间布局、姿势约束等多种控制信号整合到单一画布界面中。**关键创新**是通过将多模态控制信号编码为复合画布图像，使模型能够直接进行视觉-空间推理。该方法通过多任务数据集和联合训练策略，显著提升了生成图像的身份保持和控制遵从性，在多人合成、姿势控制合成等任务上优于现有方法。"
date: 2025-12-30
lang: zh
slug: "multimodal"
tags: []
featured: false
draft: false
---

Yusuf Dalva 等人的 [Canvas-to-Image: Compositional Image Generation with Multimodal Controls](http://arxiv.org/abs/2511.21691v1 ) 提出了一个统一的框架，将文本提示、主题参考、空间布局、姿势约束等多种控制信号整合到单一画布界面中。**关键创新**是通过将多模态控制信号编码为复合画布图像，使模型能够直接进行视觉-空间推理。该方法通过多任务数据集和联合训练策略，显著提升了生成图像的身份保持和控制遵从性，在多人合成、姿势控制合成等任务上优于现有方法。

Weihao Bo 等人的 [Agentic Learner with Grow-and-Refine Multimodal Semantic Memory](http://arxiv.org/abs/2511.21678v1 ) 提出了一种双流记忆框架ViLoMem，**分别编码视觉干扰模式和逻辑推理错误**，使多模态大模型能够从成功和失败的经验中学习。该系统遵循渐进式积累和更新原则，在六个多模态基准测试中显著减少了重复的视觉和逻辑错误，证明了错误感知多模态记忆在终身学习中的价值。

Xiang Gu 等人的 [Multimodal Robust Prompt Distillation for 3D Point Cloud Models](http://arxiv.org/abs/2511.21574v1 ) 提出了一种高效的师生框架MRPD，通过将学生点云模型的特征与来自三个不同教师的鲁棒嵌入对齐来学习轻量级提示。**创新点**是引入置信门控机制动态平衡所有输入模态的贡献，在训练阶段完成蒸馏，推理时无额外计算成本。实验表明，MRPD在白盒和黑盒攻击下均优于现有防御方法。

Qian Hong 等人的 [Lost in Time? A Meta-Learning Framework for Time-Shift-Tolerant Physiological Signal Transformation](http://arxiv.org/abs/2511.21500v1 ) 提出了ShiftSyncNet，一个基于元学习的双级优化框架，用于自动缓解时间错位导致的性能下降。该成果于2026年发表于AAAI会议。**核心贡献**是通过傅里叶相位移动对齐监督信号，在工业数据集和公开数据集上分别比基线方法提升9.4%、6.0%和12.8%，有效解决了多模态生理信号转换中的时间不一致问题。

Fei Tian 等人的 [Step-Audio-R1 Technical Report](http://arxiv.org/abs/2511.15848v2 ) 介绍了首个音频推理模型Step-Audio-R1，通过提出的模态接地推理蒸馏(MGRD)框架，成功解锁音频领域的推理能力。**关键突破**是模型能够生成与声学特征真实接地的推理链，在语音、环境音和音乐的综合性理解基准上超越Gemini 2.5 Pro，性能接近最先进的Gemini 3 Pro，证明了跨模态推理的可迁移性。

Adeela Islam 等人的 [E-M3RF: An Equivariant Multimodal 3D Re-assembly Framework](http://arxiv.org/abs/2511.21422v1 ) 提出了一种**基于等变多模态特征的3D碎片重组框架**。该研究通过结合几何与颜色特征，并利用SE(3)流匹配预测碎片的变换参数，在合成和真实文化遗产数据集上显著降低了旋转误差（23.1%）和平移误差（13.2%）。**创新点**在于引入旋转等变编码器和颜色Transformer的多模态表示，解决了传统方法仅依赖几何特征导致的对称碎片重组难题。

Jiyun Bae 等人的 [Do Reasoning Vision-Language Models Inversely Scale in Test-Time Compute? A Distractor-centric Empirical Analysis](http://arxiv.org/abs/2511.21397v1 ) 通过视觉问答数据集Idis系统研究了**视觉干扰物对多模态模型推理的影响**。研究发现，与文本干扰不同，视觉干扰会直接降低模型准确率而不增加推理长度。**关键结论**表明，通过追踪推理轨迹中的属性计数可揭示干扰物与模型性能的相互作用机制。

Qixun Wang 等人的 [Monet: Reasoning in Latent Visual Space Beyond Images and Language](http://arxiv.org/abs/2511.21395v1 ) 提出了一种**潜在视觉空间推理框架**Monet。该框架通过三阶段蒸馏流程和新型VLPO强化学习方法，使多模态大模型能直接生成连续嵌入作为中间视觉思维。在包含12.5万条跨模态推理链的Monet-SFT-125K数据集上，模型在抽象视觉推理任务中展现出强泛化能力。

Ariful Islam 等人的 [BanglaMM-Disaster: A Multimodal Transformer-Based Deep Learning Framework for Multiclass Disaster Classification in Bangla](http://arxiv.org/abs/2511.21364v1 ) 开发了**孟加拉语多模态灾难分类系统**。结合BanglaBERT文本编码器与ResNet50视觉编码器，该模型在5037条社交媒体数据上达到83.76%准确率，较单模态基线提升16.91%。该成果于2025年11月发表于IEEE SPICSCON会议。

Stefanos Koutoupis 等人的 [The More, the Merrier: Contrastive Fusion for Higher-Order Multimodal Alignment](http://arxiv.org/abs/2511.21331v1 ) 提出**对比融合框架ConFu**，通过扩展传统对比目标引入融合模态对比项，在统一表示空间中同时对齐单模态和多模态组合。**创新性**体现在能捕获XOR类高阶依赖关系，并在检索和分类任务中保持一对一与多对一检索的兼容性。

Qiwei Ma 等人的 [SARVLM: A Vision Language Foundation Model for Semantic Understanding and Target Recognition in SAR Imagery](http://arxiv.org/abs/2510.22665v2 ) 提出了一种针对合成孔径雷达（SAR）图像的视觉语言基础模型SARVLM。该模型通过构建包含100万图像-文本对的SARVLM-1M数据集，并采用**领域迁移训练策略**来缩小自然图像与SAR图像的差距。SARVLM由SARCLIP和SARCap组成，通过视觉-语言对比学习目标实现SAR图像与文本描述的语义对齐。实验表明，SARVLM在图像文本检索、零样本分类、语义定位和图像描述等任务上优于现有VLM模型，显著提升了SAR图像的语义理解能力。

Selene Cerna 等人的 [BotaCLIP: Contrastive Learning for Botany-Aware Representation of Earth Observation Data](http://arxiv.org/abs/2511.21194v1 ) 提出了一种轻量级多模态对比学习框架BotaCLIP，用于将预训练的地球观测基础模型（DOFA）适配到植物学领域。该框架通过**对齐高分辨率航拍图像与植物群落数据**，结合正则化策略避免灾难性遗忘，生成具有生态结构感知的嵌入表示。在植物存在预测、蝴蝶分布建模和土壤营养群评估等任务中，BotaCLIP的表现优于DOFA和监督基线，证明了其在数据稀缺场景下注入领域知识的有效性。

Xinyue Guo 等人的 [AV-Edit: Multimodal Generative Sound Effect Editing via Audio-Visual Semantic Joint Control](http://arxiv.org/abs/2511.21146v1 ) 提出了一个生成式音效编辑框架AV-Edit，通过**联合视觉、音频和文本语义**实现对视频中现有音轨的细粒度编辑。该框架采用对比音频-视觉掩码自编码器（CAV-MAE-Edit）进行多模态预训练，并训练多模态扩散Transformer（MM-DiT）来去除视觉无关声音或生成与视频内容一致的缺失音频元素。实验表明，AV-Edit在音效编辑和音频生成领域达到最先进性能。

Mengran Li 等人的 [Learning Cell-Aware Hierarchical Multi-Modal Representations for Robust Molecular Modeling](http://arxiv.org/abs/2511.21120v1 ) 提出了CHMR框架，通过**联合建模分子与细胞响应的局部-全局依赖关系**，并利用树结构向量量化模块捕获潜在生物层次结构。在9个公开基准测试的728项任务中，CHMR在分类和回归任务上分别平均提升3.6%和17.2%，展示了层次感知的多模态学习在生物医学建模中的优势。该成果将于AAAI 2026进行口头报告。

Zhihang Liu 等人的 [CAPability: A Comprehensive Visual Caption Benchmark for Evaluating Both Correctness and Thoroughness](http://arxiv.org/abs/2502.14914v4 ) 提出了CAPability基准测试，通过**12个维度覆盖6个关键视角**来评估视觉描述生成。该基准包含近1.1万张人工标注的图像和视频，采用精确度和命中率指标稳定评估描述的正确性和全面性。此外，通过将标注转换为QA对，提出了启发式指标"知道但无法表达"（K¯T），揭示了多模态大模型在问答与描述能力间的显著差距。该成果已被NeurIPS 2025接收。

Long Li 等人的 [Saliency-R1: Incentivizing Unified Saliency Reasoning Capability in MLLM with Confidence-Guided Reinforcement Learning](http://arxiv.org/abs/2511.00396v3 ) 提出Saliency-R1框架，首次在MLLM中**统一处理显著目标检测（SOD）、显著实例分割（SIS）和共显著目标检测（CoSOD）**三项任务。通过结构化标签（<rg>, <ins>）编码区域和实例级指代表达，并设计置信度引导策略优化（CGPO）算法替代组归一化优势，减少计算浪费并提升训练效率。实验表明该模型在三项任务上均达到或超过专业state-of-the-art方法的性能。

Zhaolong Su 等人的 [UniGame: Turning a Unified Multimodal Model Into Its Own Adversary](http://arxiv.org/abs/2511.19413v2 ) 提出了 **UniGame**，一种针对统一多模态模型（UMMs）的自对抗训练框架。该研究指出，UMMs在理解（需要紧凑嵌入）和生成（需要丰富重建表示）之间存在结构矛盾，导致决策边界错位和跨模态一致性下降。**UniGame通过在共享令牌接口引入轻量级扰动器，使生成分支主动挑战脆弱的理解能力，形成自我对抗机制**。实验表明，该方法显著提升了一致性（+4.6%）、理解（+3.6%）、生成质量及对抗鲁棒性（在NaturalBench和AdVQA上分别提升+4.8%和+6.2%），且仅增加不到1%的参数量。该成果于2024年9月发表于 IEEE INFOCOM。

Chujie Wang 等人的 [OVOD-Agent: A Markov-Bandit Framework for Proactive Visual Reasoning and Self-Evolving Detection](http://arxiv.org/abs/2511.21064v1 ) 提出了一种基于**马尔可夫-多臂老虎机**的开词汇目标检测框架OVOD-Agent。该方法将传统被动类别匹配转化为**主动视觉推理链（Visual-CoT）**，通过弱马尔可夫决策过程（w-MDP）建模八种状态空间的视觉上下文转移，结合Bandit模块生成探索信号以聚焦不确定区域。实验显示，该框架在COCO和LVIS数据集上对稀有类别检测效果显著，验证了其自演进检测策略的有效性。

Eunjee Choi 等人的 [CroMe: Multimodal Fake News Detection using Cross-Modal Tri-Transformer and Metric Learning](http://arxiv.org/abs/2501.12422v2 ) 开发了**CroMe模型**，用于多模态假新闻检测。该模型利用BLIP2编码器捕获文本、图像及图文联合表征，通过**度量学习模块（代理锚方法）**增强模态内关系建模，并采用跨模态三Transformer融合特征。实验表明，CroMe在假新闻检测任务中表现优异，尤其在跨模态一致性建模方面具有优势。该成果发表于IEEE Access 2025。

Yolo Y. Tang 等人的 [Video-R4: Reinforcing Text-Rich Video Reasoning with Visual Rumination](http://arxiv.org/abs/2511.17490v3 ) 提出了**视觉反刍（Visual Rumination）**机制，通过迭代选择帧、局部放大和重编码像素来强化文本密集视频的推理能力。研究构建了包含17k监督数据和30k强化学习轨迹的数据集（Video-R4-CoT-17k和Video-R4-RL-30k），采用多阶段训练框架（SFT和GRPO-RL）优化7B参数的LMM。该方法在M4-ViteVQA上达到SOTA，并泛化至文档、幻灯片等场景，**证明了像素级迭代推理的有效性**。

Changjiang Jiang 等人的 [IVY-FAKE: A Unified Explainable Framework and Benchmark for Image and Video AIGC Detection](http://arxiv.org/abs/2506.00979v3 ) 发布了首个大规模可解释AIGC检测基准**Ivy-Fake**，包含106K多维标注样本和5K人工验证数据。同时提出**Ivy-xDetector**，基于GRPO强化学习生成可解释推理链，在GenImage数据集上将检测准确率从86.88%提升至96.32%。**该工作填补了现有数据缺乏细粒度解释的空白**，为合成内容检测提供了更可靠的定位与分析工具。

Yuxiao Xiang 等人的 [GuardTrace-VL: Detecting Unsafe Multimodel Reasoning via Iterative Safety Supervision](http://arxiv.org/abs/2511.20994v1 ) 提出了一种针对多模态大型推理模型（MLRMs）的安全审计方法GuardTrace-VL。**该模型通过联合图像-文本分析监控"问题-思考-答案"（QTA）全流程，首次实现了对推理过程中不安全内容的实时检测**。研究团队构建了GuardTrace数据集，并提出三阶段渐进式训练方案，使模型能够根据不同风险级别学习上下文相关的安全偏好。实验显示，该模型在不安全推理检测任务上的F1分数达到93.1%，比现有最强多模态安全防御方法提升13.5%。该成果于2024年9月发表于 IEEE INFOCOM。

Meishan Zhang 等人的 [On The Role of Pretrained Language Models in General-Purpose Text Embeddings: A Survey](http://arxiv.org/abs/2507.20783v2 ) 系统综述了预训练语言模型（PLMs）在通用文本嵌入（GPTE）中的关键作用。**研究揭示了PLMs通过嵌入提取、表达增强、训练策略等基础角色推动GPTE发展**，并探讨了其在多语言支持、多模态整合等高级应用中的潜力。论文还提出了超越传统改进目标的未来研究方向，包括安全考量、认知扩展等。

Jiaxin Liu 等人的 [ReasonAct: Progressive Training for Fine-Grained Video Reasoning in Small Models](http://arxiv.org/abs/2508.01533v2 ) 提出了一种增强小规模模型视频推理能力的三阶段训练框架ReasonAct。**该方法通过文本预训练、视频微调和时序感知强化学习，结合创新的生物力学启发的子动作分解机制**，在HMDB51等基准上实现最高94.1%的准确率，较基线提升17.9个百分点。

Wilson Chango 等人的 [A review on data fusion in multimodal learning analytics and educational data mining](http://arxiv.org/abs/2511.20871v1 ) 全面综述了教育数据挖掘（EDM）和学习分析（LA）领域中的多模态数据融合技术。**研究系统分析了音频、眼动追踪等异构教育数据的融合方法**，并指出当前智能学习环境中数据融合面临的开放性挑战。该综述发表于WIREs Data Mining and Knowledge Discovery期刊。

Thanh-Dat Truong 等人的 [MANGO: Multimodal Attention-based Normalizing Flow Approach to Fusion Learning](http://arxiv.org/abs/2508.10133v2 ) 提出了一种新型可逆跨注意力（ICA）层架构。**通过三种创新注意力机制（MMCA/IMCA/LICA）显式建模多模态数据的复杂关联**，在语义分割等任务中达到SOTA性能。该成果被NeurIPS'25接收。

Thanh-Dat Truong 等人的 [Directed-Tokens: A Robust Multi-Modality Alignment Approach to Large Language-Vision Models](http://arxiv.org/abs/2508.14264v2 ) 针对多模态模型模态对齐问题提出创新解决方案。**通过图像/文本顺序重建任务和新颖的定向标记（directed-token）机制**，显著提升了模型的视觉理解和跨模态推理能力。该方法在指令跟随型LMM基准测试中保持SOTA性能，已被NeurIPS'25接收。


Zuhao Yang 等人的 [LongVT: Incentivizing "Thinking with Long Videos" via Native Tool Calling](http://arxiv.org/abs/2511.20785v1 ) 提出了一个名为LongVT的端到端代理框架，通过**交错的多模态工具链思维**（Multimodal Chain-of-Tool-Thought）实现长视频理解。该框架利用大模型固有的时间定位能力作为原生视频裁剪工具，通过全局到局部的推理循环逐步细化视觉证据。研究还发布了数据集VideoSIAH（含24.7万训练样本和1280个评估QA对），实验表明LongVT在多个长视频理解基准上显著优于基线模型。

Xuelu Feng 等人的 [RubricRL: Simple Generalizable Rewards for Text-to-Image Generation](http://arxiv.org/abs/2511.20651v1 ) 提出了一种基于量规的强化学习框架，通过**结构化量规**动态构建可分解的视觉标准清单（如物体准确性、OCR保真度等）。与传统的黑盒标量奖励不同，该方法采用提示自适应加权机制，为策略优化（如GRPO/PPO）提供可解释的模块化监督信号，实验证明其在提升生成图像的提示忠实度和细节表现方面具有优势。

Jing Bi 等人的 [Why Reasoning Matters? A Survey of Advancements in Multimodal Reasoning (v1)](http://arxiv.org/abs/2504.03151v2 ) 系统梳理了文本和多模态大模型的推理技术进展。文章提出多模态推理的核心挑战包括跨模态冲突信息处理，并通过最新方法对比阐明了**后训练优化**和**测试时推理**的实用解决方案，为未来研究提供了理论框架与实践指导。

Xin Wang 等人的 [Towards Multimodal Graph Large Language Model](http://arxiv.org/abs/2506.09738v2 ) 探讨了多模态图大语言模型（MG-LLM）的统一框架，提出应具备**五类关键特性**：多模态结构/属性的统一空间、多任务处理能力、情境学习、自然语言交互和推理能力。该成果于2025年发表于《Science China Information Sciences》。

Yuwei Niu 等人的 [Does Understanding Inform Generation in Unified Multimodal Models? From Analysis to Path Forward](http://arxiv.org/abs/2511.20561v1 ) 通过可控合成数据集和UniSandbox评估框架，揭示了统一多模态模型中**理解与生成的鸿沟**。研究发现思维链（CoT）能有效桥接推理生成任务中的差距，并通过自训练将显式推理内化为隐式能力；在知识迁移任务中，CoT辅助新知识检索，同时发现查询式架构具有潜在的类CoT特性。

Shamima Hossain 等人的 [Beyond Generation: Multi-Hop Reasoning for Factual Accuracy in Vision-Language Models](http://arxiv.org/abs/2511.20531v1 ) 提出了一种针对视觉语言模型（VLMs）的知识引导推理框架，旨在解决VLMs生成内容事实准确性不足的问题。该框架通过结合**结构化知识图谱**，实现了多步骤推理，包括视觉实体识别、知识图谱遍历和基于事实的标题修正。实验表明，该方法在混合数据集（Google Landmarks v2、Conceptual Captions和COCO Captions）上显著提升了事实准确性约31%。该成果于2025年11月发表于 NewInML Workshop ICML。

Kiril Vasilev 等人的 [MTBBench: A Multimodal Sequential Clinical Decision-Making Benchmark in Oncology](http://arxiv.org/abs/2511.20490v1 ) 提出了一个模拟分子肿瘤委员会（MTB）多模态临床决策的基准测试MTBBench。该基准通过**纵向多模态肿瘤学问题**评估多模态大语言模型（LLMs）在复杂临床环境中的表现。研究发现，现有LLMs在时间序列数据处理、证据冲突调和及多模态整合方面存在显著缺陷。为解决这些问题，作者开发了一个基于基础模型的工具框架，将任务性能提升最高达11.2%。该成果于2025年11月发表于 NeurIPS。


### 主要研究方向

1. **多模态控制与图像生成**
  - 研究方向概述：研究如何整合多种控制信号（如文本、空间布局、姿势约束等）到统一的框架中，以实现更可控的图像生成。
  - 代表性研究：
    - *[Canvas-to-Image: Compositional Image Generation with Multimodal Controls](http://arxiv.org/abs/2511.21691v1 )* (2025年11月发表于arXiv)
    - *[AV-Edit: Multimodal Generative Sound Effect Editing via Audio-Visual Semantic Joint Control](http://arxiv.org/abs/2511.21146v1 )* (2025年11月发表于arXiv)

2. **多模态记忆与终身学习**
  - 研究方向概述：探索多模态大模型如何通过记忆框架从成功和失败的经验中学习，提升终身学习能力。
  - 代表性研究：
    - *[Agentic Learner with Grow-and-Refine Multimodal Semantic Memory](http://arxiv.org/abs/2511.21678v1 )* (2025年11月发表于arXiv)

3. **多模态鲁棒性与对抗训练**
  - 研究方向概述：研究如何提升多模态模型在对抗攻击下的鲁棒性，以及通过自对抗训练优化模型性能。
  - 代表性研究：
    - *[Multimodal Robust Prompt Distillation for 3D Point Cloud Models](http://arxiv.org/abs/2511.21574v1 )* (2025年11月发表于arXiv)
    - *[UniGame: Turning a Unified Multimodal Model Into Its Own Adversary](http://arxiv.org/abs/2511.19413v2 )* (2024年9月发表于IEEE INFOCOM)

4. **多模态推理与视觉语言模型**
  - 研究方向概述：研究多模态模型在视觉问答、跨模态推理等任务中的表现，以及如何通过推理框架提升性能。
  - 代表性研究：
    - *[Do Reasoning Vision-Language Models Inversely Scale in Test-Time Compute? A Distractor-centric Empirical Analysis](http://arxiv.org/abs/2511.21397v1 )* (2025年11月发表于arXiv)
    - *[Video-R4: Reinforcing Text-Rich Video Reasoning with Visual Rumination](http://arxiv.org/abs/2511.17490v3 )* (2025年11月发表于arXiv)

5. **多模态安全与内容检测**
  - 研究方向概述：研究多模态模型在安全领域的应用，包括不安全内容检测和假新闻识别。
  - 代表性研究：
    - *[GuardTrace-VL: Detecting Unsafe Multimodel Reasoning via Iterative Safety Supervision](http://arxiv.org/abs/2511.20994v1 )* (2024年9月发表于IEEE INFOCOM)
    - *[CroMe: Multimodal Fake News Detection using Cross-Modal Tri-Transformer and Metric Learning](http://arxiv.org/abs/2501.12422v2 )* (2025年发表于IEEE Access)

6. **多模态数据融合与表示学习**
  - 研究方向概述：研究如何通过多模态数据融合和表示学习提升模型在特定领域（如医学、植物学）的性能。
  - 代表性研究：
    - *[BotaCLIP: Contrastive Learning for Botany-Aware Representation of Earth Observation Data](http://arxiv.org/abs/2511.21194v1 )* (2025年11月发表于arXiv)
    - *[Learning Cell-Aware Hierarchical Multi-Modal Representations for Robust Molecular Modeling](http://arxiv.org/abs/2511.21120v1 )* (2026年发表于AAAI)

7. **多模态基准测试与评估**
  - 研究方向概述：构建多模态基准测试数据集，评估模型在不同任务中的表现。
  - 代表性研究：
    - *[CAPability: A Comprehensive Visual Caption Benchmark for Evaluating Both Correctness and Thoroughness](http://arxiv.org/abs/2502.14914v4 )* (2025年发表于NeurIPS)
    - *[MTBBench: A Multimodal Sequential Clinical Decision-Making Benchmark in Oncology](http://arxiv.org/abs/2511.20490v1 )* (2025年11月发表于NeurIPS)

### 研究趋势分析

过去几年，多模态学习的研究呈现出以下趋势：
1. **从单一模态到多模态融合**：研究重点从单一模态（如文本或图像）转向多模态的联合建模，强调跨模态的交互与对齐。
2. **从静态任务到动态推理**：越来越多的研究关注多模态模型的动态推理能力，如视觉问答、多步骤推理等。
3. **从通用模型到领域适配**：研究开始聚焦于特定领域（如医学、植物学）的多模态应用，通过领域适配提升性能。
4. **从模型性能到安全与鲁棒性**：随着多模态模型的广泛应用，安全和鲁棒性成为重要研究方向，包括对抗训练和内容检测。
5. **从黑盒模型到可解释性**：研究开始关注多模态模型的可解释性，如通过推理链或结构化量规提供透明化的决策过程。
