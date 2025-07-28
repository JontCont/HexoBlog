---
title: 【Azure】Pipeline-使用nodejs遇到的問題
date: 2024-07-26 23:51:23
categories: 
  - 雲端平台
  - Azure
tags: 
  - Azure
description:
cover: /image/20230310_08-44-55.png
---

## 前言
為了回顧之前保留的技術避免再次遺忘，這次要把npm build 動作也記錄在當中。

---

## 一、切換node版本
近期需要加入DevOps 中Pipeline 來做自動化部屬，但是發現在Pipeline 中的node版本是8.10.0，而我們的專案需要使用node 14.15.1，所以需要在Pipeline 中切換node版本。

備註 : 這段很多網站上有一些做法會無法正常切換，依據下方作法可以正常切換node版本。

### 解決方式
加入版本時候，需要加入【Node.Js tools install】才會把node版本加入到Pipeline 中，如下圖所示。
![](/image/20231127_22-29-14.png)
![](/image/20231127_22-29-22.png)



---
## 二、執行npm腳本
## 解決方式
pipeline 中的npm build 動作，如果使用 npm run build 會發生錯誤，所以需要使用npm run-script build 來執行。

因為本章是使用 Angular 14 之前版本可以支援 --prod 參數，所以可以使用下方指令來執行。

```bash
run-script build --prod
```

![](/image/20231127_22-34-12.png)