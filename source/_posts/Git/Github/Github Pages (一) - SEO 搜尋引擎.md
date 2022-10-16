---
title: 'Github Pages (一) - SEO 搜尋引擎'
categories: 
  - Git
  - Github
tags: 
  - Github
keyword: 'Github Pages, SEO, 搜尋引擎'
cover: https://blog.moli.rocks/content/images/2018/07/-----2018-07-11---2.12.56.png
---

Blog 目前已經經營快要過完半年，近期發現Google 搜尋引擎找不到我的Blog，原本以為Github Pages 會加入在搜尋引擎當中，測試下來結論是沒有出現。目前想到原因是 SEO 無法辨認出網站，於是，目前得知每個Browser會有搜尋引擎運算，如果沒有出現可能要留意了。

## [Google Search Console](https://search.google.com/search-console/about)

Google Search Console 是 Google 提供監控、維持網站在 Google 搜尋結果中的排名，並排解相關問題。網站上未申請 Search Console 還是有機會在Google 排名當中，如果要改善SEO 就需要使用。


## [hexo-generator-sitemap](https://www.npmjs.com/package/hexo-generator-sitemap)

這個Plugin 是為了產生 Sitemap.xml 使用，需要加入在_config.yml設定檔。

```
sitemap
  path:
    - sitemap.xml
```

## sitemap 網站地圖
Google Search 搜尋引擎有兩種模式。第一種搜尋引擎自己抓取、第二種使用Sitemap 讓搜尋引擎提早發現哪些頁面是被收錄。Sitemap 主要用意是收錄、存取Google引擎當中，可以讓 Google 提早收錄到你想要的網站、頁面。

如果要使用網站上產生 Sitemap 可以使用 [XML Sitemap Online](https://www.xml-sitemaps.com/)。


## 總結
Googel Search Console 使用需要設定幾個動作才會被搜尋得到，目前設定完畢後第二天就可以搜尋到網站，後續會補上操作章節。

主要設定大綱為這兩項。
1. 網站審查
2. Sitemap

## 補充
### 如何測試自己網站是否有加入
只要在 Browser Url 輸入以下方式就可以看得到了。

```browser
site:<url>

// example
site:https://jontcont.github.io/
```

## 參考文件
- [什麼是SEO？ - GitHub Pages x Jekyll x Blog](https://ktinglee.github.io/what-is-seo/)
- [為了SEO！我離開了Medium，改在GitHub 上自架個人網站](https://kucw.github.io/blog/2021/1/from-medium-to-github/)
- [如何讓 Google 搜尋到自己的部落格](https://annkuoq.github.io/blog/2020-03-15-how-to-find-my-blog-on-google-search/)
