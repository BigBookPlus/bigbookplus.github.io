import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as a,c,d as e,e as r,b as n,f as t}from"./app-98c592fe.js";const i={},l=t(`<h2 id="run-docker-commands-without-sudo" tabindex="-1"><a class="header-anchor" href="#run-docker-commands-without-sudo" aria-hidden="true">#</a> Run Docker commands without sudo</h2><p>新安装的Docker，有可能需要使用sudo才能运行docker命令。</p><p>比如，运行一个GPU docker镜像，需要使用sudo，否则会报错：</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>$ docker run --rm --runtime=nvidia --gpus all nvidia/cuda:11.6.2-base-ubuntu20.04 nvidia-smi

docker: permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post &quot;http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/create&quot;: dial unix /var/run/docker.sock: connect: permission denied.
See &#39;docker run --help&#39;.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>报错信息就是说，没有权限访问docker daemon。这是因为docker默认情况下是不允许普通用户使用的，需要使用sudo才能运行docker命令。</p><p>这样很不方便，下面介绍一下如何让docker不需要sudo就能运行。</p><h3 id="_1-add-the-docker-group-if-it-doesn-t-already-exist" tabindex="-1"><a class="header-anchor" href="#_1-add-the-docker-group-if-it-doesn-t-already-exist" aria-hidden="true">#</a> 1. Add the <code>docker</code> group if it doesn&#39;t already exist</h3><p>首先创建一个Docker 用户组，如果用户组已经存在，可以跳过这一步。</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>$ sudo groupadd docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-add-the-connected-user-user-to-the-docker-group" tabindex="-1"><a class="header-anchor" href="#_2-add-the-connected-user-user-to-the-docker-group" aria-hidden="true">#</a> 2. Add the connected user <code>$USER</code> to the docker group</h3><p>然后把当前用户加入到docker用户组中。</p><p>Optionally change the username to match your preferred user.</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>$ sudo gpasswd -a $USER docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>IMPORTANT</strong>: Log out and log back in so that your group membership is re-evaluated.<br> 提示：退出当前用户，重新登录，这样用户组的权限才会生效。</p><h3 id="_3-restart-the-docker-daemon" tabindex="-1"><a class="header-anchor" href="#_3-restart-the-docker-daemon" aria-hidden="true">#</a> 3. Restart the <code>docker</code> daemon</h3><p>重启docker服务。</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>$ sudo service docker restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="另外一种情况" tabindex="-1"><a class="header-anchor" href="#另外一种情况" aria-hidden="true">#</a> 另外一种情况</h2><p>如果是在root安装且运行过docker，然后切换到普通用户，并且按照上述操作将当前用户加入到docker用户组，可能仍会报错。</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>
docker: permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post &quot;http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/create&quot;: dial unix /var/run/docker.sock: connect: permission denied.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为docker的socket文件的权限问题，需要修改一下。</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>sudo chown $USER /var/run/docker.sock\`\`\`console
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参考 referecne:</p>`,23),u={href:"https://docs.docker.com/engine/install/linux-postinstall/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://docs.docker.com/engine/security/rootless/",target:"_blank",rel:"noopener noreferrer"},p={href:"https://raw.githubusercontent.com/sindresorhus/guides/main/docker-without-sudo.md",target:"_blank",rel:"noopener noreferrer"},m={href:"https://stackoverflow.com/questions/48568172/docker-sock-permission-denied",target:"_blank",rel:"noopener noreferrer"};function k(v,g){const o=s("ExternalLinkIcon");return a(),c("div",null,[l,e("p",null,[e("a",u,[r("https://docs.docker.com/engine/install/linux-postinstall/"),n(o)])]),e("p",null,[e("a",h,[r("https://docs.docker.com/engine/security/rootless/"),n(o)])]),e("p",null,[e("a",p,[r("https://raw.githubusercontent.com/sindresorhus/guides/main/docker-without-sudo.md"),n(o)])]),e("p",null,[e("a",m,[r("https://stackoverflow.com/questions/48568172/docker-sock-permission-denied"),n(o)])])])}const f=d(i,[["render",k],["__file","2023-04-08-run-docker-without-sudo.html.vue"]]);export{f as default};