import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,f as e}from"./app-69c59381.js";const i={},l=e(`<h2 id="prepareing" tabindex="-1"><a class="header-anchor" href="#prepareing" aria-hidden="true">#</a> Prepareing</h2><p>CUDA toolkits need to be installed.<br> Then the following listed packages should be installed too.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>dnf <span class="token parameter variable">-y</span> <span class="token function">install</span>   automake autoconf libtool <span class="token function">make</span> gcc gcc-c++
dnf <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span>powertools <span class="token parameter variable">-y</span> <span class="token function">install</span> giflib-devel
dnf <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span>powertools <span class="token parameter variable">-y</span> <span class="token function">install</span> libexif-devel
dnf <span class="token parameter variable">-y</span> <span class="token function">install</span> bison pkgconfig glib2-devel gettext <span class="token function">make</span> libpng-devel libjpeg-devel libtiff-devel libexif-devel giflib-devel libX11-devel freetype-devel fontconfig-devel  cairo-devel fribidi-devel
dnf <span class="token parameter variable">-y</span> <span class="token function">install</span> openssl openssl-devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Note that, <code>powertools</code> might be <code>PowerTools</code> according to different configurations, just replace the name.</p><p>To enable the powertools channel, run the following command</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> dnf-plugins-core
yum config-manager --set-enabled powertools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="yasm" tabindex="-1"><a class="header-anchor" href="#yasm" aria-hidden="true">#</a> yasm</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>   <span class="token builtin class-name">cd</span> /tmp
   <span class="token function">wget</span> http://www.tortall.net/projects/yasm/releases/yasm-1.3.0.tar.gz
   <span class="token function">tar</span> zxvf yasm-1.3.0.tar.gz
   <span class="token builtin class-name">cd</span>  yasm-1.3.0
   ./configure 
   <span class="token function">make</span> 
   <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nasm" tabindex="-1"><a class="header-anchor" href="#nasm" aria-hidden="true">#</a> nasm</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  <span class="token builtin class-name">cd</span> /tmp
  <span class="token function">wget</span> https://www.nasm.us/pub/nasm/releasebuilds/2.15/nasm-2.15.tar.gz
  <span class="token function">tar</span> xvf nasm-2.15.tar.gz
  <span class="token builtin class-name">cd</span> nasm-2.15
  ./configure 
  <span class="token function">make</span> 
  <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="libx264" tabindex="-1"><a class="header-anchor" href="#libx264" aria-hidden="true">#</a> libx264</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>   <span class="token builtin class-name">cd</span> /tmp
   yum <span class="token function">install</span> <span class="token function">git</span> <span class="token punctuation">(</span>可选<span class="token punctuation">)</span>
   <span class="token function">git</span> clone https://code.videolan.org/videolan/x264.git
   <span class="token builtin class-name">cd</span> x264
   ./configure  --enable-shared
   <span class="token function">make</span> 
   <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="libmp3lame" tabindex="-1"><a class="header-anchor" href="#libmp3lame" aria-hidden="true">#</a> libmp3lame</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>   <span class="token builtin class-name">cd</span> /tmp
   <span class="token function">wget</span> https://sourceforge.net/projects/lame/files/lame/3.100/lame-3.100.tar.gz
   <span class="token function">tar</span> zxvf lame-3.100.tar.gz
   <span class="token builtin class-name">cd</span> lame-3.100
   ./configure --enable-shared
   <span class="token function">make</span> 
   <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="libgdiplus" tabindex="-1"><a class="header-anchor" href="#libgdiplus" aria-hidden="true">#</a> libgdiplus</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  <span class="token builtin class-name">cd</span> /tmp
  <span class="token function">wget</span> http://download.mono-project.com/sources/libgdiplus/libgdiplus0-6.0.5.tar.gz
  <span class="token function">tar</span> zxvf libgdiplus0-6.0.5.tar.gz
  <span class="token builtin class-name">cd</span> libgdiplus-6.0.5
  ./configure
  <span class="token function">make</span> 
  <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ffnvcodec" tabindex="-1"><a class="header-anchor" href="#ffnvcodec" aria-hidden="true">#</a> ffnvcodec</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>    <span class="token builtin class-name">cd</span> /tmp
    <span class="token function">git</span> clone https://git.videolan.org/git/ffmpeg/nv-codec-headers.git
    <span class="token builtin class-name">cd</span> nv-codec-headers <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> –

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>or</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> dnf <span class="token parameter variable">-y</span> <span class="token function">install</span> nv-codec-headers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="refresh-update" tabindex="-1"><a class="header-anchor" href="#refresh-update" aria-hidden="true">#</a> refresh &amp;&amp; update</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  <span class="token builtin class-name">echo</span> <span class="token string">&quot;/usr/local/lib&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/ld.so.conf
  ldconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ffmpeg-with-cuda" tabindex="-1"><a class="header-anchor" href="#ffmpeg-with-cuda" aria-hidden="true">#</a> FFMpeg with CUDA</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://git.ffmpeg.org/ffmpeg.git ffmpeg/
./configure --enable-cuda-nvcc --enable-cuda --enable-cuvid --enable-nvdec --enable-nvenc --enable-nonfree --enable-libnpp --disable-static --enable-shared --extra-cflags<span class="token operator">=</span>-I/usr/local/cuda/include --extra-ldflags<span class="token operator">=</span>-L/usr/local/cuda/lib64
<span class="token function">make</span> <span class="token parameter variable">-j8</span>
<span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="test" tabindex="-1"><a class="header-anchor" href="#test" aria-hidden="true">#</a> test</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ffmepg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,26),d=[l];function c(t,o){return a(),s("div",null,d)}const u=n(i,[["render",c],["__file","2022-07-04-build-ffmpeg-with-cuda-centos8.html.vue"]]);export{u as default};
