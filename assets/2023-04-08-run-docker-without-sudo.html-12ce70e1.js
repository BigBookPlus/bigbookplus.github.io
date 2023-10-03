const e=JSON.parse(`{"key":"v-c2df815c","path":"/linux/2023-04-08-run-docker-without-sudo.html","title":"无需sudo运行docker命令","lang":"en-US","frontmatter":{"title":"无需sudo运行docker命令","subtitle":"docker.sock permission denied. Run Docker commands without sudo","author":"BigBook","header-style":"text","tag":["Docker","GPU Docker"],"description":"Run Docker commands without sudo 新安装的Docker，有可能需要使用sudo才能运行docker命令。 比如，运行一个GPU docker镜像，需要使用sudo，否则会报错： 报错信息就是说，没有权限访问docker daemon。这是因为docker默认情况下是不允许普通用户使用的，需要使用sudo才能运行docke...","head":[["meta",{"property":"og:url","content":"https://bigbookplus.github.io/linux/2023-04-08-run-docker-without-sudo.html"}],["meta",{"property":"og:site_name","content":"Learning BigBook"}],["meta",{"property":"og:title","content":"无需sudo运行docker命令"}],["meta",{"property":"og:description","content":"Run Docker commands without sudo 新安装的Docker，有可能需要使用sudo才能运行docker命令。 比如，运行一个GPU docker镜像，需要使用sudo，否则会报错： 报错信息就是说，没有权限访问docker daemon。这是因为docker默认情况下是不允许普通用户使用的，需要使用sudo才能运行docke..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"article:author","content":"BigBook"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:tag","content":"GPU Docker"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"无需sudo运行docker命令\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"BigBook\\"}]}"]]},"headers":[{"level":2,"title":"Run Docker commands without sudo","slug":"run-docker-commands-without-sudo","link":"#run-docker-commands-without-sudo","children":[{"level":3,"title":"1. Add the docker group if it doesn't already exist","slug":"_1-add-the-docker-group-if-it-doesn-t-already-exist","link":"#_1-add-the-docker-group-if-it-doesn-t-already-exist","children":[]},{"level":3,"title":"2. Add the connected user $USER to the docker group","slug":"_2-add-the-connected-user-user-to-the-docker-group","link":"#_2-add-the-connected-user-user-to-the-docker-group","children":[]},{"level":3,"title":"3. Restart the docker daemon","slug":"_3-restart-the-docker-daemon","link":"#_3-restart-the-docker-daemon","children":[]}]},{"level":2,"title":"另外一种情况","slug":"另外一种情况","link":"#另外一种情况","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":1.5,"words":449},"filePathRelative":"linux/2023-04-08-run-docker-without-sudo.md","autoDesc":true}`);export{e as data};
