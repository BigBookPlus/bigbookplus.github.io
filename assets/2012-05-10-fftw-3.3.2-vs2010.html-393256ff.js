import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o,c as i,a as s,b as n,d as c,f as a}from"./app-69c59381.js";const l={},u=a('<h2 id="〇、前言" tabindex="-1"><a class="header-anchor" href="#〇、前言" aria-hidden="true">#</a> 〇、前言</h2><p>我需要使用一个快速傅里叶变换的编程库。在网上参考了一些方案，各个阶段的问题均有解，可惜不完整，零星散落。 现在整理如下。</p><h3 id="约定" tabindex="-1"><a class="header-anchor" href="#约定" aria-hidden="true">#</a> 约定：</h3><p>路径1：解压编译好的dll包，生成lib文件，的位置。</p><p>路径2：VS2010程序路径。</p><h2 id="一、概念" tabindex="-1"><a class="header-anchor" href="#一、概念" aria-hidden="true">#</a> 一、概念</h2><h3 id="_1-fftw3-3-2" tabindex="-1"><a class="header-anchor" href="#_1-fftw3-3-2" aria-hidden="true">#</a> 1.FFTW3.3.2</h3><p>FFTW ( the Faster Fourier Transform in the West) 是一个快速计算离散傅里叶变换的标准C语言程序集，其由MIT的M.Frigo 和S. Johnson 开发。可计算一维或多维实和复数据以及任意规模的DFT。FFTW 还包含对共享和分布式存储系统的并行变换，它可自动适应你的机器， 缓存，存储器大小，寄存器个数。</p><p>FFTW 通常比目前其它开源Fourier变换程序都要快，最新版本为fftw-3.2.2。</p><h3 id="_2-vs2010" tabindex="-1"><a class="header-anchor" href="#_2-vs2010" aria-hidden="true">#</a> 2.VS2010</h3><p>Visual Studio 2010 集成开发环境。</p><h2 id="二、搭建" tabindex="-1"><a class="header-anchor" href="#二、搭建" aria-hidden="true">#</a> 二、搭建</h2>',12),r={href:"http://www.fftw.org/install/windows.html",target:"_blank",rel:"noopener noreferrer"},d=a(`<p>2.cmd定向到刚下好的dll包解压后的目录（记录为路径1）中，执行以下三组命令</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>lib /machine:ix86 /def:libfftw3-3.def
lib /machine:ix86 /def:libfftw3f-3.def 
lib /machine:ix86 /def:libfftw3l-3.def 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意最后一个命令：是3L（小写）。</p><p>执行成功后，在路径1下生成三个.lib文件。这样，路径1下就拥有了：三个.dll文件，三个.lib文件，fftw3.h。</p><h3 id="_2-1-问题一" tabindex="-1"><a class="header-anchor" href="#_2-1-问题一" aria-hidden="true">#</a> 2.1 问题一</h3><p>这期间可能会遇到这个问题：lib不能执行，即，所谓命令不存在。</p><p>解决：定向至vs2010安装目录下，获取……\\vc\\bin路径（……代表vs2010路径，记录为路径2），然后配置环境变量，将此路径添加至系统环境变量的path中。重启cmd，直接打入lib，若出现英文提示（类似于usage），则配置成功。</p><h3 id="_2-2-问题二" tabindex="-1"><a class="header-anchor" href="#_2-2-问题二" aria-hidden="true">#</a> 2.2 问题二</h3><p>有人说 路径2\\vc\\bin下的lib默认是不能运行的,缺少几个文件，要把 路径2 \\Common7\\IDE 里面的（……代表vs2010路径）mspdb80.dll,mspdbcore.dll,mspdbsrv.exe,msobj80.dll复制到上面的bin文件夹里.</p><p>我没有探究是否正确，而是直接其按照要求添加，没有问题。不确定是否一定需要。</p><h3 id="_3-启动vs2010-建立win32控制台空项目。" tabindex="-1"><a class="header-anchor" href="#_3-启动vs2010-建立win32控制台空项目。" aria-hidden="true">#</a> 3.启动vs2010，建立win32控制台空项目。</h3><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>Alt+F7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在Configuration Property-&gt;VC++ Directories下Include Directories和Library Directories下分别加入路径1。</p><p>再在Configuration Property-&gt;linker-&gt;Input中的Addtional Dependencies中加入</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>libfftw3<span class="token operator">-</span><span class="token number">3.l</span>ib
libfftw3f<span class="token operator">-</span><span class="token number">3.l</span>ib
libfftw3l<span class="token operator">-</span><span class="token number">3.l</span>ib
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意每行一个。</p><p>至此，环境搭建成功。</p><h2 id="三、测试" tabindex="-1"><a class="header-anchor" href="#三、测试" aria-hidden="true">#</a> 三、测试</h2><p>在空项目的Source Files下添加代码文件，main.cpp，帖入如下代码测试</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;fftw3.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">N</span> <span class="token expression"><span class="token number">8</span></span></span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">int</span> i<span class="token punctuation">;</span>

	fftw_complex <span class="token operator">*</span>in<span class="token punctuation">,</span><span class="token operator">*</span>out<span class="token punctuation">;</span>
	fftw_plan p<span class="token punctuation">;</span>
	in <span class="token operator">=</span> <span class="token punctuation">(</span>fftw_complex<span class="token operator">*</span><span class="token punctuation">)</span> <span class="token function">fftw_malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>fftw_complex<span class="token punctuation">)</span> <span class="token operator">*</span> N<span class="token punctuation">)</span><span class="token punctuation">;</span>
	out <span class="token operator">=</span> <span class="token punctuation">(</span>fftw_complex<span class="token operator">*</span><span class="token punctuation">)</span> <span class="token function">fftw_malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>fftw_complex<span class="token punctuation">)</span> <span class="token operator">*</span> N<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token punctuation">(</span>in<span class="token operator">==</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token operator">||</span><span class="token punctuation">(</span>out<span class="token operator">==</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Error:insufficient available memory\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">else</span>
	<span class="token punctuation">{</span>

		<span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>N<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token comment">/*测试数据 */</span>
		<span class="token punctuation">{</span>
			in<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
			in<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	p <span class="token operator">=</span> <span class="token function">fftw_plan_dft_1d</span><span class="token punctuation">(</span>N<span class="token punctuation">,</span> in<span class="token punctuation">,</span> out<span class="token punctuation">,</span> FFTW_FORWARD<span class="token punctuation">,</span>FFTW_ESTIMATE<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token function">fftw_execute</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* repeat as needed */</span>
	<span class="token function">fftw_destroy_plan</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">fftw_cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>N<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token comment">/*OUTPUT*/</span>
	<span class="token punctuation">{</span>
		<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%f,%fi\\n&quot;</span><span class="token punctuation">,</span>in<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>in<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>N<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token comment">/*OUTPUT*/</span>
	<span class="token punctuation">{</span>
		<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%f,%fi\\n&quot;</span><span class="token punctuation">,</span>out<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>out<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span><span class="token punctuation">(</span>in<span class="token operator">!=</span><span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token function">fftw_free</span><span class="token punctuation">(</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span>out<span class="token operator">!=</span><span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token function">fftw_free</span><span class="token punctuation">(</span>out<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">getchar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果执行成功，它的输出是这样的：</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>1.000000,0.000000i
2.000000,0.000000i
3.000000,0.000000i
4.000000,0.000000i
5.000000,0.000000i
6.000000,0.000000i
7.000000,0.000000i
8.000000,0.000000i

36.000000,0.000000i
-4.000000,9.656854i
-4.000000,4.000000i
-4.000000,1.656854i
-4.000000,0.000000i
-4.000000,-1.656854i
-4.000000,-4.000000i
-4.000000,-9.656854i
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>over.</p>`,23);function k(v,m){const t=p("ExternalLinkIcon");return o(),i("div",null,[u,s("p",null,[n("1.首先到"),s("a",r,[n("FFTW download page - Windows"),c(t)]),n("下载最新的已编译好的dll包。")]),d])}const h=e(l,[["render",k],["__file","2012-05-10-fftw-3.3.2-vs2010.html.vue"]]);export{h as default};
