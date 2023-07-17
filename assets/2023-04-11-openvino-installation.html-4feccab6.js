import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,f as a}from"./app-69c59381.js";const o={},l=a(`<h2 id="从代码安装" tabindex="-1"><a class="header-anchor" href="#从代码安装" aria-hidden="true">#</a> 从代码安装</h2><p>官方推荐从代码安装</p><h3 id="开局不利" tabindex="-1"><a class="header-anchor" href="#开局不利" aria-hidden="true">#</a> 开局不利</h3><p>选择通过gitee clone安装，但是反复clone失败。报错如下：</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code># git clone -b 2022.3.0 https://gitee.com/openvinotoolkit-prc/openvino.git
Cloning into &#39;openvino&#39;...
remote: Enumerating objects: 345561, done.
remote: Counting objects: 100% (59023/59023), done.
remote: Compressing objects: 100% (33490/33490), done.
error: RPC failed; curl 56 GnuTLS recv error (-9): Error decoding the received TLS packet.
fatal: the remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法" aria-hidden="true">#</a> 解决方法</h3><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>git config --global http.postBuffer 500M
git config --global http.maxRequestBuffer 100M
git config --global core.compression 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),s=[l];function d(r,c){return n(),i("div",null,s)}const u=e(o,[["render",d],["__file","2023-04-11-openvino-installation.html.vue"]]);export{u as default};
