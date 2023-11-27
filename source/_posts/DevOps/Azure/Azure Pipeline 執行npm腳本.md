---
title: 【Azure】Azure Pipeline 執行npm腳本
date: 2023-11-27 15:45:23
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
為了回顧之前保留的技術避免再次遺忘，這次要把npm build 動作也記錄在當中。


## 解決方式
pipeline 中的npm build 動作，如果使用 npm run build 會發生錯誤，所以需要使用npm run-script build 來執行。

因為本章是使用 Angular 14 之前版本可以支援 --prod 參數，所以可以使用下方指令來執行。

```bash
run-script build --prod
```

![](/image/20231127_22-34-12.png)