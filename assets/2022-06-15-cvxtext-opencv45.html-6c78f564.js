const e=JSON.parse('{"key":"v-6f9f4070","path":"/opencv/2022-06-15-cvxtext-opencv45.html","title":"OpenCV 4.X 使用CvxText在图片显示汉字","lang":"en-US","frontmatter":{"title":"OpenCV 4.X 使用CvxText在图片显示汉字","subtitle":"","author":"BigBook","header-style":"text","tag":["CvxText","OpenCV 4.5","C/C++"],"description":"最近又需要在图像上实时绘制汉字。一般来讲如果绘制汉字的需求绕不过的话，直接绘制在图片总归是最easy的实现方式。因为不然的话可能要额外调用GUI组件来实现。一般都是用freetype+cvxtext，老生常谈。且不说实际实现起来是否最easy，主要是这种方法多年来实践了无数次了，不过今次切换到OpenCV4.5，突然发现可能又要修改CvxText代码才...","head":[["meta",{"property":"og:url","content":"https://bigbookplus.github.io/opencv/2022-06-15-cvxtext-opencv45.html"}],["meta",{"property":"og:site_name","content":"Learning BigBook"}],["meta",{"property":"og:title","content":"OpenCV 4.X 使用CvxText在图片显示汉字"}],["meta",{"property":"og:description","content":"最近又需要在图像上实时绘制汉字。一般来讲如果绘制汉字的需求绕不过的话，直接绘制在图片总归是最easy的实现方式。因为不然的话可能要额外调用GUI组件来实现。一般都是用freetype+cvxtext，老生常谈。且不说实际实现起来是否最easy，主要是这种方法多年来实践了无数次了，不过今次切换到OpenCV4.5，突然发现可能又要修改CvxText代码才..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"article:author","content":"BigBook"}],["meta",{"property":"article:tag","content":"CvxText"}],["meta",{"property":"article:tag","content":"OpenCV 4.5"}],["meta",{"property":"article:tag","content":"C/C++"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"OpenCV 4.X 使用CvxText在图片显示汉字\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"BigBook\\"}]}"]]},"headers":[{"level":2,"title":"准备","slug":"准备","link":"#准备","children":[]},{"level":2,"title":"修改 CvxText 代码","slug":"修改-cvxtext-代码","link":"#修改-cvxtext-代码","children":[{"level":3,"title":"OpenCV头文件包含方式","slug":"opencv头文件包含方式","link":"#opencv头文件包含方式","children":[]},{"level":3,"title":"CvScalar类型问题","slug":"cvscalar类型问题","link":"#cvscalar类型问题","children":[]},{"level":3,"title":"cv::Mat转为IplImage","slug":"cv-mat转为iplimage","link":"#cv-mat转为iplimage","children":[]}]},{"level":2,"title":"调用方法","slug":"调用方法","link":"#调用方法","children":[]},{"level":2,"title":"CvxText代码","slug":"cvxtext代码","link":"#cvxtext代码","children":[{"level":3,"title":"头文件 CvxText.h","slug":"头文件-cvxtext-h","link":"#头文件-cvxtext-h","children":[]},{"level":3,"title":"实现文件 CvxText.cpp","slug":"实现文件-cvxtext-cpp","link":"#实现文件-cvxtext-cpp","children":[]}]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":5.46,"words":1639},"filePathRelative":"opencv/2022-06-15-cvxtext-opencv45.md","autoDesc":true}');export{e as data};
