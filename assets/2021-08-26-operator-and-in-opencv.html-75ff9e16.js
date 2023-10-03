import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as p}from"./app-98c592fe.js";const t={},o=p(`<h3 id="给定roi的图像裁剪" tabindex="-1"><a class="header-anchor" href="#给定roi的图像裁剪" aria-hidden="true">#</a> 给定ROI的图像裁剪</h3><p>假设需要按照既定的ROI对图像进行取窗裁剪，用<code>cv::Rect</code>给定ROI区域，裁剪可以按照如下方式：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>cv<span class="token double-colon punctuation">::</span>Mat image <span class="token operator">=</span> cv<span class="token double-colon punctuation">::</span><span class="token function">imread</span><span class="token punctuation">(</span><span class="token string">&quot;/path/to/image.jpg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
cv<span class="token double-colon punctuation">::</span>Rect roi <span class="token operator">=</span> cv<span class="token double-colon punctuation">::</span><span class="token function">Rect</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> width<span class="token punctuation">,</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>
cv<span class="token double-colon punctuation">::</span>Mat crop <span class="token operator">=</span> <span class="token function">image</span><span class="token punctuation">(</span>roi<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="限制边界" tabindex="-1"><a class="header-anchor" href="#限制边界" aria-hidden="true">#</a> 限制边界</h3><p>如果roi的坐标超出了图像的合法区域，会引发运行时错误，导致程序崩溃。此时一般要提前进行边界检查和规范，比如这样：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">if</span><span class="token punctuation">(</span>roi<span class="token punctuation">.</span>x<span class="token operator">&lt;</span><span class="token number">0</span><span class="token punctuation">)</span> roi<span class="token punctuation">.</span>x<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>roi<span class="token punctuation">.</span>y<span class="token operator">&lt;</span><span class="token number">0</span><span class="token punctuation">)</span> roi<span class="token punctuation">.</span>y<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>roi<span class="token punctuation">.</span>x<span class="token operator">+</span>roi<span class="token punctuation">.</span>width <span class="token operator">&gt;=</span> image<span class="token punctuation">.</span>cols<span class="token punctuation">)</span> roi<span class="token punctuation">.</span>width <span class="token operator">=</span> image<span class="token punctuation">.</span>cols<span class="token operator">-</span>roi<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>roi<span class="token punctuation">.</span>y<span class="token operator">+</span>roi<span class="token punctuation">.</span>height <span class="token operator">&gt;=</span> image<span class="token punctuation">.</span>rows<span class="token punctuation">)</span> roi<span class="token punctuation">.</span>heigth <span class="token operator">=</span> image<span class="token punctuation">.</span>rows<span class="token operator">-</span>roi<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样写代码，看上去不太直观，而且有些冗长，更谈不上优雅或者可读性。</p><p>或者这样：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> w <span class="token operator">=</span> image<span class="token punctuation">.</span>cols<span class="token punctuation">;</span>
<span class="token keyword">int</span> h <span class="token operator">=</span> image<span class="token punctuation">.</span>rows<span class="token punctuation">;</span>

<span class="token keyword">int</span> x0 <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">max</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> roi<span class="token punctuation">.</span><span class="token function">tl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> y0 <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">max</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> roi<span class="token punctuation">.</span><span class="token function">tl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> x1 <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">min</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> roi<span class="token punctuation">.</span><span class="token function">br</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> y1 <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">min</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>h<span class="token punctuation">,</span> roi<span class="token punctuation">.</span><span class="token function">br</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>

roi <span class="token operator">=</span> cv<span class="token double-colon punctuation">::</span><span class="token function">Rect</span><span class="token punctuation">(</span>cv<span class="token double-colon punctuation">::</span><span class="token function">Point</span><span class="token punctuation">(</span>x0<span class="token punctuation">,</span> y0<span class="token punctuation">)</span><span class="token punctuation">,</span> cv<span class="token double-colon punctuation">::</span><span class="token function">Point</span><span class="token punctuation">(</span>x1<span class="token punctuation">,</span> y1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>稍微增加了些可读性，特别是如果习惯于使用stl的max/min函数进行边界检查。但是仍然冗长，不够优雅。冗长有什么坏处？一般来讲，冗长的代码不易于维护，可读性不会太强。另外以上面这段实现为例，由于反复使用同一变量，仅仅为了对其不同的成员做类似的操作，非常容易导致低级错误。</p><h3 id="operator-get-intersection-of-cv-rect" tabindex="-1"><a class="header-anchor" href="#operator-get-intersection-of-cv-rect" aria-hidden="true">#</a> Operator &amp; : Get Intersection of cv::Rect</h3><p>这个运算符<code>&amp;</code>比较直观。在C/C++语法中，<code>&amp;</code>属于位运算，是按位与的功能。cv::Rect类型重载了它，可以想象它的功能就是取矩形的相交区域。所以要对图像ROI的cv::Rect进行边界限制，那么将ROI和表示图像区域的Bounding Box求相交区域即可。代码实现如下：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>cv<span class="token double-colon punctuation">::</span>Rect <span class="token function">bbox</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> mat<span class="token punctuation">.</span>cols<span class="token punctuation">,</span> mat<span class="token punctuation">.</span>rows<span class="token punctuation">)</span><span class="token punctuation">;</span>
cv<span class="token double-colon punctuation">::</span>Rect roi <span class="token operator">=</span> roi <span class="token operator">&amp;</span> bbox<span class="token punctuation">;</span> <span class="token comment">// that&#39;s all</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样基本上就一句话完成了边界限制。</p><h3 id="what-s-more-verify-if-rect-is-inside-image" tabindex="-1"><a class="header-anchor" href="#what-s-more-verify-if-rect-is-inside-image" aria-hidden="true">#</a> What&#39;s More: verify if rect is inside image</h3><p>进一步说，如果要检查一个rect是否在图像区域内，不用Operator的话，一般按照以下思路实现：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">bool</span> <span class="token function">rectIsInside</span><span class="token punctuation">(</span><span class="token keyword">const</span> cv<span class="token double-colon punctuation">::</span>Rect<span class="token operator">&amp;</span> rect<span class="token punctuation">,</span> <span class="token keyword">const</span> cv<span class="token double-colon punctuation">::</span>Mat<span class="token operator">&amp;</span> image<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        rect<span class="token punctuation">.</span>x<span class="token operator">&gt;=</span><span class="token number">0</span> <span class="token operator">&amp;&amp;</span> 
        rect<span class="token punctuation">.</span>y<span class="token operator">&gt;=</span><span class="token number">0</span> <span class="token operator">&amp;&amp;</span> 
        rect<span class="token punctuation">.</span>x <span class="token operator">+</span> rect<span class="token punctuation">.</span>width <span class="token operator">&lt;</span> m<span class="token punctuation">.</span>cols <span class="token operator">&amp;&amp;</span> 
        rect<span class="token punctuation">.</span>x <span class="token operator">+</span> rect<span class="token punctuation">.</span>width <span class="token operator">&lt;</span> m<span class="token punctuation">.</span>rows<span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是如果使用了<code>&amp;</code>运算符，life will be much easier.</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">bool</span> <span class="token function">rectIsInside</span><span class="token punctuation">(</span><span class="token keyword">const</span> cv<span class="token double-colon punctuation">::</span>Rect<span class="token operator">&amp;</span> rect<span class="token punctuation">,</span> <span class="token keyword">const</span> cv<span class="token double-colon punctuation">::</span>Mat<span class="token operator">&amp;</span> image<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    cv<span class="token double-colon punctuation">::</span>Rect <span class="token function">bbox</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> image<span class="token punctuation">.</span>cols<span class="token punctuation">,</span> image<span class="token punctuation">.</span>rows<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>rect <span class="token operator">&amp;</span> bbox<span class="token punctuation">)</span> <span class="token operator">==</span> rect<span class="token punctuation">;</span> <span class="token comment">// elegent and efficient</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简洁、优雅、可读性强的实现方式。</p>`,20),e=[o];function c(i,l){return s(),a("div",null,e)}const k=n(t,[["render",c],["__file","2021-08-26-operator-and-in-opencv.html.vue"]]);export{k as default};