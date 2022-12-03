---
title: Angular (三) - 發佈 (error Unknow argument prod) 
categories: 
  - 前端技術
  - 三大前端框架
  - Angular
tags: 
  - Angular
description:
keyword: 'ES6, Angular  ,網頁'
cover: /img/Web/bg/Angular-bg-01.png
---

## Error Unknow argument prod
當初使用時， ```ng build --prod```已經無法使用這指令，請使用下方指令排除現狀。

```cli
ng build --configuration production
```

## Angular Cli
![](/imgage/20221201_16-10-33.png)


## 參考文件
- ithome : https://ithelp.ithome.com.tw/articles/10195372
- stackoverflow : https://stackoverflow.com/questions/73156911/ng-build-prod-error-unknown-argument-prod