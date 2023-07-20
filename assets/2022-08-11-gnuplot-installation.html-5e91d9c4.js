import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-d4e9035c.js";const i={},l=e(`<p>We need to install libpng and libgd before the compilation of gnuplot-5.4.3</p><p>We can install libpng using yum install</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> libpng-devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>The libgd-devel package provided by yum is not compatable with gnuplot-5.4.3 on the aws-linux-2,<br> we download and compile the officially new version.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://github.com/libgd/libgd/releases/download/gd-2.3.3/libgd-2.3.3.tar.gz 
<span class="token function">tar</span> zxvf ./libgd-2.3.3.tar.gz
<span class="token builtin class-name">cd</span> libgd-2.3.3
./configure
<span class="token function">make</span>
<span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Then compile gnuplot.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> libs
<span class="token function">wget</span> https://sourceforge.net/projects/gnuplot/files/gnuplot/5.4.3/gnuplot-5.4.3.tar.gz
<span class="token function">tar</span> zxvf ./gnuplot-5.4.3.tar.gz
<span class="token builtin class-name">cd</span> gnuplot-5.4.3
./configure
<span class="token function">make</span>
<span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),t=[l];function c(o,d){return s(),a("div",null,t)}const r=n(i,[["render",c],["__file","2022-08-11-gnuplot-installation.html.vue"]]);export{r as default};
