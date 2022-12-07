---
title: Angular (二) - 錯誤問題排解
categories: 
  - 前端技術
  - Angular
tags: 
  - Angular
description:
keyword: 'ES6, Angular  ,網頁'
cover: /img/Web/bg/Angular-bg-01.png
---

# 疑難排解
## Q1. npm WARN config global `--global`, --local are deprecated. Use --location=global instead

處理方式 :  
1. 需要到\nodejs 資料夾底下打開下方兩個檔案
   - npm.cmd
   - npm 
2. 將 ```prefix -g```換成 ```prefix --location=global```即可。

## Q2. updating angular-cli 1.0.0-beta 28.3 to @angular/cli@latest failed
原則上處理完下方command 會完成。
```cmd
npm uninstall angular-cli -g
npm cache clear
npm install @angular/cli -g
```

如果無法正常 clear cache 
1. ```npm cache clean --force ```
(可能會出現 npm WARN using --force Recommended protections disabled.)
2. ```npm cache verify```

排除完畢後，記得把node_modules 刪除。如果不再prject 裡面可以無需處理。
```rd /s /q node_modules```

最後一步重新載入 npm package 就輸入 ```npm install```

## Q3. 初始angular專案，如何download node_module
只要輸入 ```npm install``` 就會幫你把所有相關檔案 download下載。


## Q4. PowerShell 無法使用 ng.ps1
設定方式為
1. 打開powershell
2. 輸入 ```set-ExecutionPolicy RemoteSigned -Scope CurrentUser ```
3. 確認是否改變 ，請輸入 ```Get-ExecutionPolicy```如果要看清單加入 ```--list```即可。