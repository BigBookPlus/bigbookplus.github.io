import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as i,c as o,d as s,e as n,b as t,f as a}from"./app-98c592fe.js";const l={},u=a(`<h3 id="编译-qthttpserver-模块" tabindex="-1"><a class="header-anchor" href="#编译-qthttpserver-模块" aria-hidden="true">#</a> 编译 QtHttpServer 模块</h3><p>首先拉去代码</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/qt-labs/qthttpserver.git
<span class="token builtin class-name">cd</span> qthttpserver
<span class="token function">git</span> checkout <span class="token number">5.15</span>
<span class="token function">git</span> submodule update <span class="token parameter variable">--init</span> <span class="token parameter variable">--recursive</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后用qtcreator打开工程，编译</p><h3 id="最简单的qt代码" tabindex="-1"><a class="header-anchor" href="#最简单的qt代码" aria-hidden="true">#</a> 最简单的Qt代码</h3><p>如果想构建一个最简单的Qt程序，那么大概就是一个没有UI、控制台下运行的HelloWorld程序，它的代码大概是这个样子：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;QtCore&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    QCoreApplication <span class="token function">app</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// qDebug()&lt;&lt;&quot;Hello World&quot;;</span>

    <span class="token keyword">return</span> app<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用qthttpserver" tabindex="-1"><a class="header-anchor" href="#使用qthttpserver" aria-hidden="true">#</a> 使用QtHttpServer</h3>`,8),r={href:"https://github.com/qt-labs/qthttpserver",target:"_blank",rel:"noopener noreferrer"},d=a(`<h4 id="编译qthttpserver" tabindex="-1"><a class="header-anchor" href="#编译qthttpserver" aria-hidden="true">#</a> 编译QtHttpServer</h4><p>我使用的是Qt5，牵出5.15分支，并自己使用QtCreator编译：</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>git clone https://github.com/qt-labs/qthttpserver.git
git checkout 5.15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>编译成功后，将头文件和动态库拷贝到所使用的Qt安装路径下的对应目录内即可。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> build-qthttpserver-Desktop_Qt_5_12_6_GCC_64bit-Release/
<span class="token function">mv</span> ./* /opt/Qt5.12.6/5.12.6/gcc_64/lib/

<span class="token builtin class-name">cd</span> cmake/
<span class="token function">mv</span> ./* /opt/Qt5.12.6/5.12.6/gcc_64/lib/cmake/

<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>
<span class="token builtin class-name">cd</span> pkgconfig/
<span class="token function">mv</span> ./* /opt/Qt5.12.6/5.12.6/gcc_64/lib/pkgconfig/

<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>
<span class="token builtin class-name">cd</span> include/
<span class="token function">mv</span> ./* /opt/Qt5.12.6/5.12.6/gcc_64/include/

<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>
<span class="token builtin class-name">cd</span> mkspecs
<span class="token builtin class-name">cd</span> modules
<span class="token function">mv</span> ./* /opt/Qt5.12.6/5.12.6/gcc_64/mkspecs/modules/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="启动qthttpserver" tabindex="-1"><a class="header-anchor" href="#启动qthttpserver" aria-hidden="true">#</a> 启动QtHttpServer</h4>`,6),k={href:"https://www.qt.io/blog/2019/01/25/introducing-qt-http-server",target:"_blank",rel:"noopener noreferrer"},v=a(`<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;QtCore&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;QtHttpServer&gt;</span></span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  QCoreApplication <span class="token function">app</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
  QHttpServer httpServer<span class="token punctuation">;</span>
  httpServer<span class="token punctuation">.</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Hello world&quot;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  httpServer<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span>QHostAddress<span class="token double-colon punctuation">::</span>Any<span class="token punctuation">,</span> <span class="token number">9527</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> app<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),m={href:"http://127.0.0.1:9527",target:"_blank",rel:"noopener noreferrer"},b=a(`<p>加入如下代码即可:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>  httpserver<span class="token punctuation">.</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string">&quot;/post-body&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;POST&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token keyword">const</span> QHttpServerRequest <span class="token operator">&amp;</span>request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> request<span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),h={href:"https://www.qt.io/blog/2019/02/01/qhttpserver-routing-api",target:"_blank",rel:"noopener noreferrer"},g=a(`<h3 id="封装主服务类" tabindex="-1"><a class="header-anchor" href="#封装主服务类" aria-hidden="true">#</a> 封装主服务类</h3><p>在MainSVC中，对HttpServer进行管理。实际使用时MainSVC还可以封装了其他功能，作为整体服务的入口。</p><h4 id="mainsvc头文件" tabindex="-1"><a class="header-anchor" href="#mainsvc头文件" aria-hidden="true">#</a> MainSVC头文件</h4><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// FileName: mainsvc.h</span>
<span class="token comment">// Author: BigBookPlus</span>
<span class="token comment">// Reference: http://bigbookplus.github.io</span>

<span class="token keyword">class</span> <span class="token class-name">MainSVC</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">QObject</span></span>
<span class="token punctuation">{</span>
	Q_OBJECT

<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">MainSVC</span><span class="token punctuation">(</span>QObject <span class="token operator">*</span>parent<span class="token operator">=</span><span class="token keyword">nullptr</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token operator">~</span><span class="token function">MainSVC</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实现文件-加入qthttpserver功能" tabindex="-1"><a class="header-anchor" href="#实现文件-加入qthttpserver功能" aria-hidden="true">#</a> 实现文件，加入QtHttpServer功能</h4><p>MainSVC类的实现文件。这里要保证QtHttpServer是全局变量，否则Server无法正常运行。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// FileName: mainsvc.cpp</span>
<span class="token comment">// Author: BigBookPlus</span>
<span class="token comment">// Reference: http://bigbookplus.github.io</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;QHttpServer&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;mainsvc.h&quot;</span></span>
 
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token keyword">static</span> QtHttpServer http_server<span class="token punctuation">;</span>

<span class="token class-name">MainSVC</span><span class="token double-colon punctuation">::</span><span class="token function">MainSVC</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  http_server<span class="token punctuation">.</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;BigBookPlus Server Test.&quot;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">MainSVC</span><span class="token double-colon punctuation">::</span><span class="token operator">~</span><span class="token function">MainSVC</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token class-name">MainSVC</span><span class="token double-colon punctuation">::</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>

  <span class="token keyword">int</span> port <span class="token operator">=</span> <span class="token number">9527</span><span class="token punctuation">;</span>
	http_server<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span>QHostAddress<span class="token double-colon punctuation">::</span>Any<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在动态链接库中使用qt组件并提供c语言形式api" tabindex="-1"><a class="header-anchor" href="#在动态链接库中使用qt组件并提供c语言形式api" aria-hidden="true">#</a> 在动态链接库中使用Qt组件并提供C语言形式API</h3><h4 id="关于qapplication-qcoreapplication" tabindex="-1"><a class="header-anchor" href="#关于qapplication-qcoreapplication" aria-hidden="true">#</a> 关于QApplication/QCoreApplication</h4><p>如果在动态库中直接调用了qt的组件实现功能，而调用它的C++工程不是Qt工程，大概率会出现一条和QApplication/QCoreApplication有关的报错信息，大概意思就是某些模块必须要QApplication/QCoreApplication才能运行。</p><p>具体来说，Non-GUI的QCore组件只需要依赖QCoreApplication对象；而涉及到GUI的例如QWidget组件则依赖QApplication对象。QApplication类其实继承自QCoreApplication。Qt主程序执行了它们的exec()方法，该Qt程序的EventLoop和EventDispatcher等功能才能正确运行，这样进而保证了信号和槽等机制的正常运转。实际使用时，应当令QApplication/QCoreApplication的对象变量位于主线程空间，而事件循环可以在其他线程执行，即exec()方法可以在子线程运行。因为exec()是个阻塞的方法，所以放在其他线程执行不会影响主线程，方便很多。</p><p>显而易见，不是所有的组件都需要必须有个QApplication/QCoreApplication，进一步说，即使需要QApplication/QCoreApplication对象，其实也可以只定义一个全局变量，而不需要真的执行它的exec方法。</p><p>在我的业务场景中，要给UI端以动态链接库的形式提供功能，除了一些一般的实时处理功能，还要在动态库的生命周期开启一个HttpServer，而不巧的是，QtHttpServer需要QCoreApplication对象。谨慎起见，同时我也决定在子线程中执行exec运行事件循环。最后，用户需要提供的是C接口，所以我将主服务接口以MainSVC对象进行封装完毕后，又定义了一套C形式的API。</p><h4 id="qcoreapplication全局对象" tabindex="-1"><a class="header-anchor" href="#qcoreapplication全局对象" aria-hidden="true">#</a> QCoreApplication全局对象</h4><p>首先在动态链接库的入口实现文件里，定义QCoreApplication全局对象，为了让对象正确初始化，我在这里定义了假的argc/argv参数变量：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> argc <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">char</span> param<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span> param <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> QCoreApplication <span class="token function">a</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="服务初始化" tabindex="-1"><a class="header-anchor" href="#服务初始化" aria-hidden="true">#</a> 服务初始化</h4><p>然后定义一个init函数，函数内new了一个我封装的主服务类的对象，并开启了事件循环。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  main_svc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">MainSVC</span><span class="token punctuation">(</span>Q_NULLPTR<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> a<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个函数将在动态链接库的导出的初始化函数svc_init中，开启一个子线程来执行。使用时，用户调用svc_init，即可完成服务的初始化。下面是svc_init的定义：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> <span class="token function">svc_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  QFuture<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> future <span class="token operator">=</span> <span class="token class-name">QtConcurrent</span><span class="token double-colon punctuation">::</span><span class="token function">run</span><span class="token punctuation">(</span>init<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实现文件" tabindex="-1"><a class="header-anchor" href="#实现文件" aria-hidden="true">#</a> 实现文件</h4><p>但是有个新问题，用户直接调用svc_init进行测试，由于后面没有其他操作很快就退出了，因为初始化都是在线程中异步执行的。不能让用户在主线程中等待，简单的方法是在全局变量中增加一个QMutex对象进行控制，再再init和svc_init中访问此变量，即可简单达到同步的功能。初始化该动态库，会提供一个HttpServer供所有人调用。该动态库提供的服务在初始化阶段保证初始化完成后退出，提供给用户调用svc_start方法，启动服务，用户如需要服务一直运行，则后续自行控制主线程生命周期即可。完整实现如下：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// FileName: svc_c_api.cpp</span>
<span class="token comment">// Author: BigBookPlus</span>
<span class="token comment">// Reference: http://bigbookplus.github.io</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;QtCore&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;QtCore/QVariant&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;QtConcurrent&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;svc_c_api.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;mainsvc.h&quot;</span></span>

<span class="token keyword">int</span> argc <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">char</span> param<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">;</span>    <span class="token comment">// magic string. nonsense.</span>
<span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span> param <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> QCoreApplication <span class="token function">a</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> QMutex init_lock<span class="token punctuation">;</span>

MainSVC<span class="token operator">*</span> main_svc <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  init_lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	main_svc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">MainSVC</span><span class="token punctuation">(</span>Q_NULLPTR<span class="token punctuation">)</span><span class="token punctuation">;</span>
  init_lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> a<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">svc_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	QFuture<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> future <span class="token operator">=</span> <span class="token class-name">QtConcurrent</span><span class="token double-colon punctuation">::</span><span class="token function">run</span><span class="token punctuation">(</span>init<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token class-name">QThread</span><span class="token double-colon punctuation">::</span><span class="token function">msleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ensure init_lock mutex has been locked.</span>
  init_lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// ensure main_svc initilizition finished.</span>
  init_lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// unlock</span>
  
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">bool</span> <span class="token function">svc_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>main_svc <span class="token operator">!=</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		main_svc<span class="token operator">-&gt;</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="接口文件" tabindex="-1"><a class="header-anchor" href="#接口文件" aria-hidden="true">#</a> 接口文件</h4><p>C语言形式的API的头文件实现如下：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// FileName: svc_c_api.h</span>
<span class="token comment">// Author: BigBookPlus</span>
<span class="token comment">// Reference: http://bigbookplus.github.io</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">SVC_C_API_H_</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">SVC_C_API_H_</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token function">defined</span><span class="token punctuation">(</span>_MSC_VER<span class="token punctuation">)</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span> <span class="token directive keyword">if</span> <span class="token expression"><span class="token function">defined</span><span class="token punctuation">(</span>SVC_LIB<span class="token punctuation">)</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span>  <span class="token directive keyword">define</span> <span class="token macro-name">SVC_QTLIB_EXPORT</span> <span class="token expression"><span class="token function">__declspec</span><span class="token punctuation">(</span>dllexport<span class="token punctuation">)</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span> <span class="token directive keyword">else</span></span>
<span class="token macro property"><span class="token directive-hash">#</span>  <span class="token directive keyword">define</span> <span class="token macro-name">SVC_QTLIB_EXPORT</span> <span class="token expression"><span class="token function">__declspec</span><span class="token punctuation">(</span>dllimport<span class="token punctuation">)</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span> <span class="token directive keyword">endif</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
<span class="token macro property"><span class="token directive-hash">#</span> <span class="token directive keyword">define</span> <span class="token macro-name">SVC_QTLIB_EXPORT</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdbool.h&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">__cplusplus</span></span>
<span class="token keyword">extern</span> <span class="token string">&quot;C&quot;</span> <span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
  SVC_QTLIB_EXPORT <span class="token keyword">int</span> <span class="token function">svc_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//before init</span>
	SVC_QTLIB_EXPORT <span class="token keyword">bool</span> <span class="token function">svc_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">__cplusplus</span></span>
<span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="后记-怎样构建-编译" tabindex="-1"><a class="header-anchor" href="#后记-怎样构建-编译" aria-hidden="true">#</a> 后记：怎样构建（编译）</h3>`,28),_={href:"https://doc.qt.io/qt-5/cmake-get-started.html",target:"_blank",rel:"noopener noreferrer"},f=a(`<p>这里提供一个我写的示例：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token function">cmake_minimum_required</span><span class="token punctuation">(</span>VERSION <span class="token number">3.8</span><span class="token punctuation">.</span><span class="token number">0</span><span class="token punctuation">)</span>

<span class="token function">project</span><span class="token punctuation">(</span>test<span class="token operator">-</span>svc VERSION <span class="token number">0.1</span><span class="token punctuation">.</span><span class="token number">0</span> LANGUAGES CXX<span class="token punctuation">)</span>

<span class="token function">set</span><span class="token punctuation">(</span>Qt5_DIR D<span class="token operator">:</span><span class="token operator">/</span>Qt<span class="token operator">/</span>Qt5<span class="token punctuation">.</span><span class="token number">12.6</span><span class="token operator">/</span><span class="token number">5.12</span><span class="token punctuation">.</span><span class="token number">6</span><span class="token operator">/</span>msvc2017_64<span class="token operator">/</span>lib<span class="token operator">/</span>cmake<span class="token operator">/</span>Qt5<span class="token punctuation">)</span> # replace with path to your own version of Qt<span class="token punctuation">.</span>

<span class="token function">set</span><span class="token punctuation">(</span>CMAKE_CXX_STANDARD <span class="token number">11</span><span class="token punctuation">)</span>
<span class="token function">set</span><span class="token punctuation">(</span>CMAKE_CXX_STANDARD_REQUIRED ON<span class="token punctuation">)</span>

<span class="token function">set</span><span class="token punctuation">(</span>CMAKE_AUTOMOC ON<span class="token punctuation">)</span>
<span class="token function">set</span><span class="token punctuation">(</span>CMAKE_AUTORCC ON<span class="token punctuation">)</span>
<span class="token function">set</span><span class="token punctuation">(</span>CMAKE_AUTOUIC ON<span class="token punctuation">)</span>

<span class="token function">add_definitions</span><span class="token punctuation">(</span><span class="token operator">-</span>D SVC_LIB<span class="token punctuation">)</span>

<span class="token function">find_package</span><span class="token punctuation">(</span>Qt5 COMPONENTS Core Network Concurrent HttpServer REQUIRED<span class="token punctuation">)</span>

<span class="token function">set</span><span class="token punctuation">(</span>USED_QT_LIBRARYS Qt5<span class="token double-colon punctuation">::</span>Core Qt5<span class="token double-colon punctuation">::</span>Network  Qt5<span class="token double-colon punctuation">::</span>Concurrent  Qt5<span class="token double-colon punctuation">::</span>HttpServer<span class="token punctuation">)</span>

<span class="token function">aux_source_directory</span><span class="token punctuation">(</span>src SVC_SRCS<span class="token punctuation">)</span>

<span class="token function">add_library</span><span class="token punctuation">(</span>snn<span class="token operator">-</span>svc SHARED $<span class="token punctuation">{</span>SVC_SRCS<span class="token punctuation">}</span> <span class="token punctuation">)</span>
<span class="token function">target_link_libraries</span><span class="token punctuation">(</span>snn<span class="token operator">-</span>svc  $<span class="token punctuation">{</span>USED_QT_LIBRARYS<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="end" tabindex="-1"><a class="header-anchor" href="#end" aria-hidden="true">#</a> END</h3><p>欢迎留言探讨。</p>`,4);function y(Q,w){const e=c("ExternalLinkIcon");return i(),o("div",null,[u,s("p",null,[n("QtHttpServer目前不在Qt的主lib中，据说Qt6会正式加入。所以需要自行下载编译。"),s("a",r,[t(e)])]),d,s("p",null,[n("在Qt官方blog "),s("a",k,[n("introducing-qt-http-server"),t(e)]),n("，介绍了一个最基本的QHttpServer用法：")]),v,s("p",null,[n("程序启动后，浏览器打开 "),s("a",m,[t(e)]),n(" 就可以看到HelloWorld了，所以这里Server提供了Get方法。那么如果想提供POST方法并接受一段数据呢？")]),b,s("p",null,[n("body中可以传入json等并进行解析。其他用法，推荐一篇详细介绍QtHttpServer接口routing方法的blog "),s("a",h,[n("qhttpserver-routing-api"),t(e)]),n("。")]),g,s("p",null,[n("构建Qt项目的方法有很多，可以是Visual Studio + Qt插件，也可以用QtCreator。不过我更喜欢CMake的方式进行构建。基本的方法可以参考Qt官方关于CMake的指南"),s("a",_,[n("cmake-get-started"),t(e)]),n("。Qt项目编译中的关键步骤:MOC、UIC、RCC都可以通过添加一行指令，让CMake自动完成。用CMake管理Qt项目，基本和普通的C++项目感觉不到太大区别。")]),f])}const q=p(l,[["render",y],["__file","2021-08-18-qthttpserver-qapplication.html.vue"]]);export{q as default};
