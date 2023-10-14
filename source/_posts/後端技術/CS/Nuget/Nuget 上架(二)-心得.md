---
title: Nuget 上架使用心得
date: 2022-03-10 19:48:57
categories: 
  - 雲端平台
  - Nuget
tags: 
  - Nuget
description:
keyword: 'Nuget, C# ,.Net'
cover: /image/20230310_19-48-57.png
---

## 起因
不少人跟我說未什麼讓專案發佈到 Nuget ，主要以下原因 :
1. 如何使用 Nuget 發佈
2. 初期時建置專案
3. 讓 Source 可以讓其他人看見，並排除、回饋問題 

畢竟，是對外公開可以展現自己撰寫能力。

## 架構
期初想法透過一個 repository 底下有多個Class Library ，提前是必須要符合 repository 定義之下，目前是用來擴充使用(懶人包)。

路徑 : [https://github.com/JontCont/StartFMS](https://github.com/JontCont/StartFMS)

## 開發方向
既然是懶人包會偏向於提升開發為主，例如 轉換型別、LineBot 縮短架構及定義、Config 取得管道。後續會持續以這方向開發。

若有擴充以外的功能，目前會以條列清單形式記錄。
