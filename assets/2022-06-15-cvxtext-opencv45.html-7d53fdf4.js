import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as e,c as o,a as n,b as s,d as c,f as l}from"./app-d4e9035c.js";const i={},u=n("p",null,"最近又需要在图像上实时绘制汉字。一般来讲如果绘制汉字的需求绕不过的话，直接绘制在图片总归是最easy的实现方式。因为不然的话可能要额外调用GUI组件来实现。一般都是用freetype+cvxtext，老生常谈。且不说实际实现起来是否最easy，主要是这种方法多年来实践了无数次了，不过今次切换到OpenCV4.5，突然发现可能又要修改CvxText代码才可以，因为直接使用，不work。",-1),r=n("h2",{id:"准备",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#准备","aria-hidden":"true"},"#"),s(" 准备")],-1),k=n("p",null,"需要的依赖有：",-1),d=n("li",null,"C/C++ 编译环境（似乎是废话）",-1),v=n("li",null,"OpenCV (仍然废话)",-1),m={href:"https://freetype.org/%EF%BC%8C%E6%88%91%E4%BD%BF%E7%94%A8%E7%9A%84%E7%89%88%E6%9C%AC%E6%98%AF2.9.1",target:"_blank",rel:"noopener noreferrer"},b=n("li",null,[s("字体文件，一般用"),n("code",null,"simhei.ttf"),s("。在操作系统的字体里面哦。")],-1),y=l(`<h2 id="修改-cvxtext-代码" tabindex="-1"><a class="header-anchor" href="#修改-cvxtext-代码" aria-hidden="true">#</a> 修改 CvxText 代码</h2><p>我这里有一份CvxText代码，在旧版本的OpenCV下可以使用（OpenCV3.X)。如今更换到了OpenCV4.5，这份代码直接使用会有些小问题，不过都很容易修改。</p><h3 id="opencv头文件包含方式" tabindex="-1"><a class="header-anchor" href="#opencv头文件包含方式" aria-hidden="true">#</a> OpenCV头文件包含方式</h3><p>首先需要重写头文件包含方法。在OpenCV4以前，include下有两个子目录，分别是opencv，和opencv2。在OpenCV4.X后，include下只剩一个opencv2文件夹了。涉及到opencv的头文件包含代码，改为如下形式：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;opencv2/core/core.hpp&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;opencv2/core/core_c.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;opencv2/highgui/highgui.hpp&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;opencv2/imgproc/imgproc.hpp&quot;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里特别说明，引入<code>core_c.h</code>这个头文件很重要。因为我手里这份CvxText代码类型都是基于旧式的C类型，<code>core_c.h</code> 提供了对C类型的兼容。</p><h3 id="cvscalar类型问题" tabindex="-1"><a class="header-anchor" href="#cvscalar类型问题" aria-hidden="true">#</a> CvScalar类型问题</h3><p>下一处需要修改的是和CvScalar相关的代码。尽管我们重新写了头文件包含，引入了C类型，但是有些代码仍然不能直接编译通过， 因为CvScalar不能隐式的转为C++类型的cv::Scalar。下面的<code>puttext</code>函数代码中，我修改了显式的手工转换替代了注释中的代码。样子很丑，但是简单好用（总共花费了不到1分钟）。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>
<span class="token keyword">int</span> <span class="token class-name">CvxText</span><span class="token double-colon punctuation">::</span><span class="token function">putText</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span>Mat <span class="token operator">&amp;</span>frame<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span>    <span class="token operator">*</span>text<span class="token punctuation">,</span> CvPoint pos<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">//return putText(frame, text, pos, CV_RGB(255, 255, 255));</span>
	CvScalar s <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token function">putText</span><span class="token punctuation">(</span>frame<span class="token punctuation">,</span> text<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">int</span> <span class="token class-name">CvxText</span><span class="token double-colon punctuation">::</span><span class="token function">putText</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span>Mat <span class="token operator">&amp;</span>frame<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">wchar_t</span> <span class="token operator">*</span>text<span class="token punctuation">,</span> CvPoint pos<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">//return putText(frame, text, pos, CV_RGB(255, 255, 255));</span>
	CvScalar s <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token function">putText</span><span class="token punctuation">(</span>frame<span class="token punctuation">,</span> text<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cv-mat转为iplimage" tabindex="-1"><a class="header-anchor" href="#cv-mat转为iplimage" aria-hidden="true">#</a> cv::Mat转为IplImage</h3><p>另一处就是比较老生常谈的问题，cv::Mat转为IplImage。这里之前的实现是直接采用C形式的强制转换，如下所示：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">void</span> <span class="token class-name">CvxText</span><span class="token double-colon punctuation">::</span><span class="token function">putWChar</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span>Mat <span class="token operator">&amp;</span>frame<span class="token punctuation">,</span> <span class="token keyword">wchar_t</span> wc<span class="token punctuation">,</span> CvPoint <span class="token operator">&amp;</span>pos<span class="token punctuation">,</span> CvScalar color<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	IplImage<span class="token operator">*</span> img <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
	img <span class="token operator">=</span> <span class="token operator">&amp;</span><span class="token punctuation">(</span>IplImage<span class="token punctuation">)</span>frame<span class="token punctuation">;</span>

    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很不幸，现在这样做在似乎不work了。好在cv::Mat转IplImage仍然有提供接口可用。打开core_c.h文件，可以看到一个很显眼的函数声明，</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>CV_EXPORTS _IplImage <span class="token function">cvIplImage</span><span class="token punctuation">(</span><span class="token keyword">const</span> cv<span class="token double-colon punctuation">::</span>Mat<span class="token operator">&amp;</span> m<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>所以调用该接口，传入cv::Mat对象会返回转换好的IplImage类型的对象。直接修改代码如下</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>	IplImage<span class="token operator">*</span> img <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
	img <span class="token operator">=</span> <span class="token operator">&amp;</span><span class="token punctuation">(</span><span class="token function">cvIplImage</span><span class="token punctuation">(</span>frame<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，代码就可以正常工作了。</p><h2 id="调用方法" tabindex="-1"><a class="header-anchor" href="#调用方法" aria-hidden="true">#</a> 调用方法</h2><p>初始化</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>    CvxText text<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>调用接口</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> <span class="token function">putText</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span>Mat <span class="token operator">&amp;</span>frame<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span>    <span class="token operator">*</span>text<span class="token punctuation">,</span> CvPoint pos<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="cvxtext代码" tabindex="-1"><a class="header-anchor" href="#cvxtext代码" aria-hidden="true">#</a> CvxText代码</h2><p>把我改后的代码分享一下。在OpenCV 4.5下亲测可用。理论上4.X的OpenCV应该都可使用。</p><h3 id="头文件-cvxtext-h" tabindex="-1"><a class="header-anchor" href="#头文件-cvxtext-h" aria-hidden="true">#</a> 头文件 CvxText.h</h3><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">CVX_TEXT_H</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">CVX_TEXT_H</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;ft2build.h&gt;</span>  </span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token expression">FT_FREETYPE_H  </span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;opencv2/core/core.hpp&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;opencv2/core/core_c.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;opencv2/highgui/highgui.hpp&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;opencv2/imgproc/imgproc.hpp&quot;</span></span>
<span class="token keyword">class</span> <span class="token class-name">CvxText</span>
<span class="token punctuation">{</span>
	<span class="token comment">// ��ֹcopy  </span>
	CvxText<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> CvxText<span class="token operator">&amp;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">CvxText</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>freeType<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">CvxText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	* ��ȡ���塣Ŀǰ��Щ�����в�֧�֡�
	*
	* \\param font        ��������, Ŀǰ��֧��
	* \\param size        �����С/�հױ���/�������/��ת�Ƕ�
	* \\param underline   �»���
	* \\param diaphaneity ͸����
	*
	* \\sa setFont, restoreFont
	*/</span>

	<span class="token keyword">void</span> <span class="token function">getFont</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span>type<span class="token punctuation">,</span>
		CvScalar <span class="token operator">*</span>size <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token keyword">bool</span> <span class="token operator">*</span>underline <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token keyword">float</span> <span class="token operator">*</span>diaphaneity <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	* �������塣Ŀǰ��Щ�����в�֧�֡�
	*
	* \\param font        ��������, Ŀǰ��֧��
	* \\param size        �����С/�հױ���/�������/��ת�Ƕ�
	* \\param underline   �»���
	* \\param diaphaneity ͸����
	*
	* \\sa getFont, restoreFont
	*/</span>

	<span class="token keyword">void</span> <span class="token function">setFont</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span>type<span class="token punctuation">,</span>
		CvScalar <span class="token operator">*</span>size <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token keyword">bool</span> <span class="token operator">*</span>underline <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token keyword">float</span> <span class="token operator">*</span>diaphaneity <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	* �ָ�ԭʼ���������á�
	*
	* \\sa getFont, setFont
	*/</span>

	<span class="token keyword">void</span> <span class="token function">restoreFont</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">//================================================================  </span>
	<span class="token comment">//================================================================  </span>

	<span class="token comment">/**
	* �������(��ɫĬ��Ϊ��ɫ)����������������ַ���ֹͣ��
	*
	* \\param img  �����Ӱ��
	* \\param text �ı�����
	* \\param pos  �ı�λ��
	*
	* \\return ���سɹ�������ַ����ȣ�ʧ�ܷ���-1��
	*/</span>

	<span class="token keyword">int</span> <span class="token function">putText</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span>Mat <span class="token operator">&amp;</span>frame<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span>    <span class="token operator">*</span>text<span class="token punctuation">,</span> CvPoint pos<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	* �������(��ɫĬ��Ϊ��ɫ)����������������ַ���ֹͣ��
	*
	* \\param img  �����Ӱ��
	* \\param text �ı�����
	* \\param pos  �ı�λ��
	*
	* \\return ���سɹ�������ַ����ȣ�ʧ�ܷ���-1��
	*/</span>

	<span class="token keyword">int</span> <span class="token function">putText</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span>Mat <span class="token operator">&amp;</span>frame<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">wchar_t</span> <span class="token operator">*</span>text<span class="token punctuation">,</span> CvPoint pos<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	* ������֡���������������ַ���ֹͣ��
	*
	* \\param img   �����Ӱ��
	* \\param text  �ı�����
	* \\param pos   �ı�λ��
	* \\param color �ı���ɫ
	*
	* \\return ���سɹ�������ַ����ȣ�ʧ�ܷ���-1��
	*/</span>

	<span class="token keyword">int</span> <span class="token function">putText</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span>Mat <span class="token operator">&amp;</span>frame<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span>    <span class="token operator">*</span>text<span class="token punctuation">,</span> CvPoint pos<span class="token punctuation">,</span> CvScalar color<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	* ������֡���������������ַ���ֹͣ��
	*
	* \\param img   �����Ӱ��
	* \\param text  �ı�����
	* \\param pos   �ı�λ��
	* \\param color �ı���ɫ
	*
	* \\return ���سɹ�������ַ����ȣ�ʧ�ܷ���-1��
	*/</span>
	<span class="token keyword">int</span> <span class="token function">putText</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span>Mat <span class="token operator">&amp;</span>frame<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">wchar_t</span> <span class="token operator">*</span>text<span class="token punctuation">,</span> CvPoint pos<span class="token punctuation">,</span> CvScalar color<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">//================================================================  </span>
	<span class="token comment">//================================================================  </span>

<span class="token keyword">private</span><span class="token operator">:</span>

	<span class="token comment">// �����ǰ�ַ�, ����m_posλ��  </span>

	<span class="token keyword">void</span> <span class="token function">putWChar</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span>Mat <span class="token operator">&amp;</span>frame<span class="token punctuation">,</span> <span class="token keyword">wchar_t</span> wc<span class="token punctuation">,</span> CvPoint <span class="token operator">&amp;</span>pos<span class="token punctuation">,</span> CvScalar color<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">//================================================================  </span>
	<span class="token comment">//================================================================  </span>

<span class="token keyword">private</span><span class="token operator">:</span>

	FT_Library   m_library<span class="token punctuation">;</span>   <span class="token comment">// �ֿ�  </span>
	FT_Face      m_face<span class="token punctuation">;</span>      <span class="token comment">// ����  </span>

	<span class="token comment">//================================================================  </span>
	<span class="token comment">//================================================================  </span>

	<span class="token comment">// Ĭ�ϵ������������  </span>

	<span class="token keyword">int</span>         m_fontType<span class="token punctuation">;</span>
	CvScalar   m_fontSize<span class="token punctuation">;</span>
	<span class="token keyword">bool</span>      m_fontUnderline<span class="token punctuation">;</span>
	<span class="token keyword">float</span>      m_fontDiaphaneity<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实现文件-cvxtext-cpp" tabindex="-1"><a class="header-anchor" href="#实现文件-cvxtext-cpp" aria-hidden="true">#</a> 实现文件 CvxText.cpp</h3><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;CvxText.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;wchar.h&gt;</span>  </span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;assert.h&gt;</span>  </span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;locale.h&gt;</span>  </span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;ctype.h&gt;</span> </span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;opencv2/core/core.hpp&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;opencv2/highgui/highgui.hpp&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;opencv2/imgproc/imgproc.hpp&quot;</span></span>

<span class="token keyword">using</span> <span class="token keyword">namespace</span> cv<span class="token punctuation">;</span>
<span class="token comment">// ���ֿ�  </span>

<span class="token class-name">CvxText</span><span class="token double-colon punctuation">::</span><span class="token function">CvxText</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>freeType<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token function">assert</span><span class="token punctuation">(</span>freeType <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// ���ֿ��ļ�, ����һ������  </span>

	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">FT_Init_FreeType</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_library<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
	<span class="token comment">//result = FT_New_Face(m_library, freeType, 0, &amp;m_face);</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">=</span> <span class="token function">FT_New_Face</span><span class="token punctuation">(</span>m_library<span class="token punctuation">,</span> freeType<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>m_face<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">;</span>
	

	<span class="token comment">// ���������������  </span>

	<span class="token function">restoreFont</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// ����C���Ե��ַ�������  </span>

	<span class="token function">setlocale</span><span class="token punctuation">(</span>LC_ALL<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// �ͷ�FreeType��Դ  </span>

<span class="token class-name">CvxText</span><span class="token double-colon punctuation">::</span><span class="token operator">~</span><span class="token function">CvxText</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token function">FT_Done_Face</span><span class="token punctuation">(</span>m_face<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">FT_Done_FreeType</span><span class="token punctuation">(</span>m_library<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// �����������:  </span>
<span class="token comment">//  </span>
<span class="token comment">// font         - ��������, Ŀǰ��֧��  </span>
<span class="token comment">// size         - �����С/�հױ���/�������/��ת�Ƕ�  </span>
<span class="token comment">// underline   - �»���  </span>
<span class="token comment">// diaphaneity   - ͸����  </span>

<span class="token keyword">void</span> <span class="token class-name">CvxText</span><span class="token double-colon punctuation">::</span><span class="token function">getFont</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span>type<span class="token punctuation">,</span> CvScalar <span class="token operator">*</span>size<span class="token punctuation">,</span> <span class="token keyword">bool</span> <span class="token operator">*</span>underline<span class="token punctuation">,</span> <span class="token keyword">float</span> <span class="token operator">*</span>diaphaneity<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token operator">*</span>type <span class="token operator">=</span> m_fontType<span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>size<span class="token punctuation">)</span> <span class="token operator">*</span>size <span class="token operator">=</span> m_fontSize<span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>underline<span class="token punctuation">)</span> <span class="token operator">*</span>underline <span class="token operator">=</span> m_fontUnderline<span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>diaphaneity<span class="token punctuation">)</span> <span class="token operator">*</span>diaphaneity <span class="token operator">=</span> m_fontDiaphaneity<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token class-name">CvxText</span><span class="token double-colon punctuation">::</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span>type<span class="token punctuation">,</span> CvScalar <span class="token operator">*</span>size<span class="token punctuation">,</span> <span class="token keyword">bool</span> <span class="token operator">*</span>underline<span class="token punctuation">,</span> <span class="token keyword">float</span> <span class="token operator">*</span>diaphaneity<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">// �����Ϸ��Լ��  </span>

	<span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> m_fontType <span class="token operator">=</span> <span class="token operator">*</span>type<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>size<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		m_fontSize<span class="token punctuation">.</span>val<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">fabs</span><span class="token punctuation">(</span>size<span class="token operator">-&gt;</span>val<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		m_fontSize<span class="token punctuation">.</span>val<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">fabs</span><span class="token punctuation">(</span>size<span class="token operator">-&gt;</span>val<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		m_fontSize<span class="token punctuation">.</span>val<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">fabs</span><span class="token punctuation">(</span>size<span class="token operator">-&gt;</span>val<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		m_fontSize<span class="token punctuation">.</span>val<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">fabs</span><span class="token punctuation">(</span>size<span class="token operator">-&gt;</span>val<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>underline<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		m_fontUnderline <span class="token operator">=</span> <span class="token operator">*</span>underline<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>diaphaneity<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		m_fontDiaphaneity <span class="token operator">=</span> <span class="token operator">*</span>diaphaneity<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// �ָ�ԭʼ����������  </span>

<span class="token keyword">void</span> <span class="token class-name">CvxText</span><span class="token double-colon punctuation">::</span><span class="token function">restoreFont</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	m_fontType <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>            <span class="token comment">// ��������(��֧��)  </span>

	m_fontSize<span class="token punctuation">.</span>val<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">40</span><span class="token punctuation">;</span>      <span class="token comment">// �����С  </span>
	m_fontSize<span class="token punctuation">.</span>val<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0.5</span><span class="token punctuation">;</span>   <span class="token comment">// �հ��ַ���С����  </span>
	m_fontSize<span class="token punctuation">.</span>val<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0.1</span><span class="token punctuation">;</span>   <span class="token comment">// �����С����  </span>
	m_fontSize<span class="token punctuation">.</span>val<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>      <span class="token comment">// ��ת�Ƕ�(��֧��)  </span>

	m_fontUnderline <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>   <span class="token comment">// �»���(��֧��)  </span>

	m_fontDiaphaneity <span class="token operator">=</span> <span class="token number">1.0</span><span class="token punctuation">;</span>   <span class="token comment">// ɫ�ʱ���(�ɲ���͸��Ч��)  </span>

	<span class="token comment">// �����ַ���С  </span>

	<span class="token function">FT_Set_Pixel_Sizes</span><span class="token punctuation">(</span>m_face<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>m_fontSize<span class="token punctuation">.</span>val<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// �������(��ɫĬ��Ϊ��ɫ)  </span>

<span class="token keyword">int</span> <span class="token class-name">CvxText</span><span class="token double-colon punctuation">::</span><span class="token function">putText</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span>Mat <span class="token operator">&amp;</span>frame<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span>    <span class="token operator">*</span>text<span class="token punctuation">,</span> CvPoint pos<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">//return putText(frame, text, pos, CV_RGB(255, 255, 255));</span>
	CvScalar s <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token function">putText</span><span class="token punctuation">(</span>frame<span class="token punctuation">,</span> text<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">int</span> <span class="token class-name">CvxText</span><span class="token double-colon punctuation">::</span><span class="token function">putText</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span>Mat <span class="token operator">&amp;</span>frame<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">wchar_t</span> <span class="token operator">*</span>text<span class="token punctuation">,</span> CvPoint pos<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">//return putText(frame, text, pos, CV_RGB(255, 255, 255));</span>
	CvScalar s <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token function">putText</span><span class="token punctuation">(</span>frame<span class="token punctuation">,</span> text<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//  </span>

<span class="token keyword">int</span> <span class="token class-name">CvxText</span><span class="token double-colon punctuation">::</span><span class="token function">putText</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span>Mat <span class="token operator">&amp;</span>frame<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span>    <span class="token operator">*</span>text<span class="token punctuation">,</span> CvPoint pos<span class="token punctuation">,</span> CvScalar color<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>frame<span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>text <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

	<span class="token comment">//  </span>

	<span class="token keyword">int</span> i<span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> text<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token char">&#39;\\0&#39;</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">wchar_t</span> wc <span class="token operator">=</span> text<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>

		<span class="token comment">// ����˫�ֽڷ���  </span>

		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isascii</span><span class="token punctuation">(</span>wc<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function">mbtowc</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>wc<span class="token punctuation">,</span> <span class="token operator">&amp;</span>text<span class="token punctuation">[</span>i<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// �����ǰ���ַ�  </span>

		<span class="token function">putWChar</span><span class="token punctuation">(</span>frame<span class="token punctuation">,</span> wc<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> color<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> i<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">int</span> <span class="token class-name">CvxText</span><span class="token double-colon punctuation">::</span><span class="token function">putText</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span>Mat <span class="token operator">&amp;</span>frame<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">wchar_t</span> <span class="token operator">*</span>text<span class="token punctuation">,</span> CvPoint pos<span class="token punctuation">,</span> CvScalar color<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>frame<span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>text <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

	<span class="token comment">//  </span>

	<span class="token keyword">int</span> i<span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> text<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token char">&#39;\\0&#39;</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">// �����ǰ���ַ�  </span>

		<span class="token function">putWChar</span><span class="token punctuation">(</span>frame<span class="token punctuation">,</span> text<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> pos<span class="token punctuation">,</span> color<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> i<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// �����ǰ�ַ�, ����m_posλ��  </span>

<span class="token keyword">void</span> <span class="token class-name">CvxText</span><span class="token double-colon punctuation">::</span><span class="token function">putWChar</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span>Mat <span class="token operator">&amp;</span>frame<span class="token punctuation">,</span> <span class="token keyword">wchar_t</span> wc<span class="token punctuation">,</span> CvPoint <span class="token operator">&amp;</span>pos<span class="token punctuation">,</span> CvScalar color<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	IplImage<span class="token operator">*</span> img <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
	img <span class="token operator">=</span> <span class="token operator">&amp;</span><span class="token punctuation">(</span><span class="token function">cvIplImage</span><span class="token punctuation">(</span>frame<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// ����unicode��������Ķ�ֵλͼ  </span>

	FT_UInt glyph_index <span class="token operator">=</span> <span class="token function">FT_Get_Char_Index</span><span class="token punctuation">(</span>m_face<span class="token punctuation">,</span> wc<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">FT_Load_Glyph</span><span class="token punctuation">(</span>m_face<span class="token punctuation">,</span> glyph_index<span class="token punctuation">,</span> FT_LOAD_DEFAULT<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">FT_Render_Glyph</span><span class="token punctuation">(</span>m_face<span class="token operator">-&gt;</span>glyph<span class="token punctuation">,</span> FT_RENDER_MODE_MONO<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">//  </span>

	FT_GlyphSlot slot <span class="token operator">=</span> m_face<span class="token operator">-&gt;</span>glyph<span class="token punctuation">;</span>

	<span class="token comment">// ������  </span>

	<span class="token keyword">int</span> rows <span class="token operator">=</span> slot<span class="token operator">-&gt;</span>bitmap<span class="token punctuation">.</span>rows<span class="token punctuation">;</span>
	<span class="token keyword">int</span> cols <span class="token operator">=</span> slot<span class="token operator">-&gt;</span>bitmap<span class="token punctuation">.</span>width<span class="token punctuation">;</span>

	<span class="token comment">//  </span>

	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> rows<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> cols<span class="token punctuation">;</span> <span class="token operator">++</span>j<span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token keyword">int</span> off <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>img<span class="token operator">-&gt;</span>origin <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">?</span> i <span class="token operator">:</span> <span class="token punctuation">(</span>rows <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">-</span> i<span class="token punctuation">)</span><span class="token punctuation">)</span>
				<span class="token operator">*</span> slot<span class="token operator">-&gt;</span>bitmap<span class="token punctuation">.</span>pitch <span class="token operator">+</span> j <span class="token operator">/</span> <span class="token number">8</span><span class="token punctuation">;</span>

			<span class="token keyword">if</span> <span class="token punctuation">(</span>slot<span class="token operator">-&gt;</span>bitmap<span class="token punctuation">.</span>buffer<span class="token punctuation">[</span>off<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token number">0xC0</span> <span class="token operator">&gt;&gt;</span> <span class="token punctuation">(</span>j <span class="token operator">%</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token punctuation">{</span>
				<span class="token keyword">int</span> r <span class="token operator">=</span> <span class="token punctuation">(</span>img<span class="token operator">-&gt;</span>origin <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">?</span> pos<span class="token punctuation">.</span>y <span class="token operator">-</span> <span class="token punctuation">(</span>rows <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">-</span> i<span class="token punctuation">)</span> <span class="token operator">:</span> pos<span class="token punctuation">.</span>y <span class="token operator">+</span> i<span class="token punctuation">;</span><span class="token punctuation">;</span>
				<span class="token keyword">int</span> c <span class="token operator">=</span> pos<span class="token punctuation">.</span>x <span class="token operator">+</span> j<span class="token punctuation">;</span>

				<span class="token keyword">if</span> <span class="token punctuation">(</span>r <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> r <span class="token operator">&lt;</span> img<span class="token operator">-&gt;</span>height
					<span class="token operator">&amp;&amp;</span> c <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> c <span class="token operator">&lt;</span> img<span class="token operator">-&gt;</span>width<span class="token punctuation">)</span>
				<span class="token punctuation">{</span>
					CvScalar scalar <span class="token operator">=</span> <span class="token function">cvGet2D</span><span class="token punctuation">(</span>img<span class="token punctuation">,</span> r<span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>

					<span class="token comment">// ����ɫ���ں�  </span>

					<span class="token keyword">float</span> p <span class="token operator">=</span> m_fontDiaphaneity<span class="token punctuation">;</span>
					<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> k <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> k <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> <span class="token operator">++</span>k<span class="token punctuation">)</span>
					<span class="token punctuation">{</span>
						scalar<span class="token punctuation">.</span>val<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> scalar<span class="token punctuation">.</span>val<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> p<span class="token punctuation">)</span> <span class="token operator">+</span> color<span class="token punctuation">.</span>val<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">*</span> p<span class="token punctuation">;</span>
					<span class="token punctuation">}</span>

					<span class="token function">cvSet2D</span><span class="token punctuation">(</span>img<span class="token punctuation">,</span> r<span class="token punctuation">,</span> c<span class="token punctuation">,</span> scalar<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span> <span class="token comment">// end for  </span>
	<span class="token punctuation">}</span> <span class="token comment">// end for  </span>

	<span class="token comment">// �޸���һ���ֵ����λ��  </span>

	<span class="token keyword">double</span> space <span class="token operator">=</span> m_fontSize<span class="token punctuation">.</span>val<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span> m_fontSize<span class="token punctuation">.</span>val<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token keyword">double</span> sep <span class="token operator">=</span> m_fontSize<span class="token punctuation">.</span>val<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span> m_fontSize<span class="token punctuation">.</span>val<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

	pos<span class="token punctuation">.</span>x <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span>cols <span class="token operator">?</span> cols <span class="token operator">:</span> space<span class="token punctuation">)</span> <span class="token operator">+</span> sep<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28);function h(f,w){const a=p("ExternalLinkIcon");return e(),o("div",null,[u,r,k,n("ul",null,[d,v,n("li",null,[s("freetype的lib： 提前编译好，官网是 "),n("a",m,[s("https://freetype.org/，我使用的版本是2.9.1"),c(a)])]),b]),y])}const _=t(i,[["render",h],["__file","2022-06-15-cvxtext-opencv45.html.vue"]]);export{_ as default};
