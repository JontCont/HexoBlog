---
title: 【筆記】VSC套件 文件格式化 prettier (程式碼排序)
date: 2023-10-15 19:54:58
categories: 
  - 筆記 
  - 生活雜記
tags: 
  - C#
description:
cover: /image/20231017_22-43-37.png
---
## 問題
以前遇到排版時候，預設排版無法對參數方式排版，例如
```html

<ngx-card [title]="'title'" [subtitle]="'subtitle'" [content]="'content'"></ngx-card>
```
這時候就需要 prettier 這個套件來幫忙排版。

### 解決方式
1. 安裝工具: [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. 開啟 settings.json 後，輸入以下指令 
```json
{
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "editor.formatOnSave": false
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "editor.formatOnSave": false
  },
}
```
3. vsc 搜尋列輸入 format document with... 選擇 prettier 讓他成為預設排版工具
![](/image/20231015_22-49-38.png)


之後排版就可以美美排版了。

---
## 參考資料
1. [Configure Prettier and ESLint with Angular](https://dev.to/this-is-angular/configure-prettier-and-eslint-with-angular-526c)