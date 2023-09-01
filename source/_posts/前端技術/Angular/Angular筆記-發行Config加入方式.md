---
title: Angular筆記-發行到IIS時，Config加入方式
categories: 
  - 前端技術
  - Angular
tags: 
  - Angular
description:
keyword: 'ES6, Angular  ,網頁'
cover: /img/Web/bg/Angular-bg-01.png
---

近期在開發Angular專案都會需要發行專案檔案，往往 Windows 都會使用IIS來發行，但是在發行後架站會出現404錯誤，這時候就需要在Config加入路由設定。
(如果放置Config時候，發現網站掛掉或是其他原因可以參考以下做法。)

## 安裝  URL Rewrite 2.0
下載連結 : [點選我](https://www.iis.net/downloads/microsoft/url-rewrite)
一開始需要安裝 URL Rewrite 2.0，安裝完後，就可以開始設定Config。(如果已經安裝過，可以跳過這步驟。)
![](/image/20230901_22-32-39.png)

## 設定 Config
選擇 IIS 管理員，選擇網站，點選 URL Rewrite。點選右邊新增規則，選擇空白規則。
![](/image/20230901_22-33-25.png)

從編輯輸入規則修改以下內容。若修改完可以直接套用即可，詳細內容可以參考下方參考文件。
![](/image/20230901_22-34-53.png)
![](/image/20230901_22-36-22.png)
![](/image/20230901_22-37-20.png)

## 參考文件

- [Tips for Running an Angular app in IIS](https://devblogs.microsoft.com/premier-developer/tips-for-running-an-angular-app-in-iis/)
- [如何將 Angular 含有路由機制的 SPA 網頁應用程式部署到 IIS 網站伺服器](https://blog.miniasp.com/post/2017/01/17/Angular-2-deploy-on-IIS)
