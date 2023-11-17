---
title: Github Pages - 包含檔案發行
date: 2023-11-17 12:12:45
categories: 
  - 筆記 
  - 生活雜記
tags: 
  - github
description:
cover: /image/20230302_10-12-45.png
---

## 問題
github page 使用上會遇到txt檔案要上傳時候，會有幾個檔案沒辦法正常上傳，建置時候build /publish都不會出現想要上傳的檔案。

## 解決方式
在 ```_config.yml``` 檔案中加入以下設定，就會正常引入在public裡面了 (public 是 build 輸出檔案)。
```yml
include:
  - '_xxx.txt'
```
