---
title: 'Github Pages (二) - Google Search Console'
categories: 
  - DevOps
  - Github
tags: 
  - Github
keyword: 'Github Pages, SEO, 搜尋引擎'
cover: https://miro.medium.com/max/500/1*GCVYwFnJKmbmcgnTkGdPuA.jpeg
---

# 使用 [Google Search Console](https://search.google.com/search-console/about)

Google Search Console 近期有新增[網域]資源類型，因為我們是使用 Github Pages 所以要使用 [網址前置字元] 來設定 。
![](/img/Note/Github_Pages/Snipaste_2022-08-31_12-18-49.png)

驗證擁有權部分只需要將它提供的載點放入網在中即可。
![](/img/Note/Github_Pages/Snipaste_2022-08-31_14-34-21.png)

## Sitemap
上一篇有簡單帶過 Sitemap 使用方式。這邊初始使用時候會使用上 [XML Sitemap Online](https://www.xml-sitemaps.com/)，可以快速鍵至到 Github 到上面。接下來，放置root底下路徑並等待Github Pages 上去到頁面當中。
![](/img/Note/Github_Pages/Snipaste_2022-08-31_14-33-01.png)

以上準備完成就只要加入剛才的  ```sitemap.xml``` 即可。
![](/img/Note/Github_Pages/Snipaste_2022-08-31_14-25-33.png)


## 網址審查
網址審查功能主要是單頁驗證，意思是sitemap 是讓所有網站可以被 Google 搜尋得到，如果沒有編入索引內容當中是沒辦法查詢到這個內容，這裡可以使用[網址審查]排除這問題。
![](/img/Note/Github_Pages/Snipaste_2022-08-31_14-43-13.png)

網址審查部分比較特別地方，需要由 Google 判定這個網址是否符合網址規範才會加入成功，第一次驗證可能需要等到明天才會達到效果。
![](/img/Note/Github_Pages/Snipaste_2022-08-31_14-46-40.png)

## 結論
Google Search Console 有這兩種功能可以快速加入到Google Search 裡面，如果使用[網址審查]方式，可能是最快呈現效果。如果使用 [hexo-generator-sitemap](https://www.npmjs.com/package/hexo-generator-sitemap)就只需要特別指定sitemap.xml 相當方便。


