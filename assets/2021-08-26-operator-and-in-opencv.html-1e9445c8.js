const e=JSON.parse('{"key":"v-390c5bd8","path":"/opencv/2021-08-26-operator-and-in-opencv.html","title":"使用&运算符在OpenCV图像裁剪时进行边界检查","lang":"en-US","frontmatter":{"title":"使用&运算符在OpenCV图像裁剪时进行边界检查","subtitle":"Operator & in OpenCV ROI Bounds Checking","author":"BigBook","header-style":"text","tag":["C/C++","Operator &","OpenCV","Image Processing","边界检查"],"description":"给定ROI的图像裁剪 假设需要按照既定的ROI对图像进行取窗裁剪，用cv::Rect给定ROI区域，裁剪可以按照如下方式： ```cpp cv::Mat image = cv::imread(\\"/path/to/image.jpg\\"); cv::Rect roi = cv::Rect(x, y, width, height); cv::Mat crop...","head":[["meta",{"property":"og:url","content":"https://bigbookplus.github.io/opencv/2021-08-26-operator-and-in-opencv.html"}],["meta",{"property":"og:site_name","content":"Learning BigBook"}],["meta",{"property":"og:title","content":"使用&运算符在OpenCV图像裁剪时进行边界检查"}],["meta",{"property":"og:description","content":"给定ROI的图像裁剪 假设需要按照既定的ROI对图像进行取窗裁剪，用cv::Rect给定ROI区域，裁剪可以按照如下方式： ```cpp cv::Mat image = cv::imread(\\"/path/to/image.jpg\\"); cv::Rect roi = cv::Rect(x, y, width, height); cv::Mat crop..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"article:author","content":"BigBook"}],["meta",{"property":"article:tag","content":"C/C++"}],["meta",{"property":"article:tag","content":"Operator &"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"Image Processing"}],["meta",{"property":"article:tag","content":"边界检查"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用&运算符在OpenCV图像裁剪时进行边界检查\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"BigBook\\"}]}"]]},"headers":[{"level":3,"title":"给定ROI的图像裁剪","slug":"给定roi的图像裁剪","link":"#给定roi的图像裁剪","children":[]},{"level":3,"title":"限制边界","slug":"限制边界","link":"#限制边界","children":[]},{"level":3,"title":"Operator & : Get Intersection of cv::Rect","slug":"operator-get-intersection-of-cv-rect","link":"#operator-get-intersection-of-cv-rect","children":[]},{"level":3,"title":"What\'s More: verify if rect is inside image","slug":"what-s-more-verify-if-rect-is-inside-image","link":"#what-s-more-verify-if-rect-is-inside-image","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":2.13,"words":639},"filePathRelative":"opencv/2021-08-26-operator-and-in-opencv.md","autoDesc":true}');export{e as data};
