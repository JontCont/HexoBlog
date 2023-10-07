---
title: 【筆記】Azure - 使用 Node 18 LTS 發行
date: 2023-05-12
categories: 
  - 雲端平台
  - Azure
tags: 
  - Azure
description:
keyword: 'Cloud  ,Azure ,Angular, 發行'
cover: /image/20230310_08-44-55.png
---

## 前言
如果使用 Azure Node 版本更新前端，遇到無法顯示問題。請參考下方做法。

## 組態設定
請到 【Web 應用程式】  > 【組態】 > 【一般設定】進行設定。指令如下 : 

```js
npmx serve -s 
```

![](/image/20230310_08-56-01.png)