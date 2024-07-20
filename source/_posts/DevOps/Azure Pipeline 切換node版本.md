---
title: 【Azure】Pipeline 切換node版本
date: 2023-11-27 11:51:23
categories: 
  - 雲端平台
  - Azure
tags: 
  - Azure
description:
keyword: 'Cloud  ,Azure'
cover: /image/20230310_08-44-55.png
---

## 前言
近期需要加入DevOps 中Pipeline 來做自動化部屬，但是發現在Pipeline 中的node版本是8.10.0，而我們的專案需要使用node 14.15.1，所以需要在Pipeline 中切換node版本。

備註 : 這段很多網站上有一些做法會無法正常切換，依據下方作法可以正常切換node版本。

## 解決方式
加入版本時候，需要加入【Node.Js tools install】才會把node版本加入到Pipeline 中，如下圖所示。
![](/image/20231127_22-29-14.png)
![](/image/20231127_22-29-22.png)


