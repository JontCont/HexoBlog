---
title: (筆記) IIS - 排除 "必須使用Localhost或是127.0.0.1問題"
categories: 
  - 筆記 
  - 生活雜記
tags: 
  - iis
description:
cover: /img/Note/IIS/bg.png

---


## 紀錄目的
架設網站時若連線出現下圖問題，可以參考以下作法。
![](/img/Note/IIS/bg.png)


## 使用方式
請打開 [服務] 後找尋下圖的ASP.NET State service，將它設為自動後並啟動，完成後網站將可連線
![](/img/Note/IIS/01.png)

