---
title: 三大前端框架 (一) - 安裝/環境設定 
date: 2022-03-02
categories: 
  - 前端技術
tags: 
  - ReactJs
  - Angular
  - Vue
description:
keyword: 'ES6, ReactJs  ,網頁'
cover: /image/20230210_18-16-58.png
---
## 前言
近期安排特殊的行程，我會把 React、Vue 、Angular 三大架框玩過一輪，在分析各式的架框使用的方式。我們就直接先從React先下手。
本篇教學如何安裝 三大架框環境，後續再針對架構探討。

---
## 基本安裝
以下我會使用的工具，依據讀者的習慣分配自己的工具。
1. [Node.js](https://nodejs.org/en/) (必)
2. [Git](https://git-scm.com/)
3. [VS Code](https://code.visualstudio.com/)

安裝環境時，請確認 node 版本在進行下方作業。 
```command
  npm -v
```

# 一、React
官方網連結：[ https://zh-hant.reactjs.org/ ]
## 1 安裝/創建 React
安裝 React 請輸入```npx create-react-app [名稱]``` ，如果有遇到下方錯誤訊息，請參考下方處理方式。
![](/image/20230210_18-18-30.png)

- [解决npm安装时出现run `npm audit fix` to fix them, or `npm audit` for details](https://blog.csdn.net/weixin_38610651/article/details/107021204)

安裝完畢後，請移動到指定PATH，指令 :```cd [名稱]```，再來進行```npm start```開啟網站。 
![](/image/20230210_18-18-53.png)

## 2 結果畫面
![](/image/20230210_18-19-09.png)
---

# 二、Angular 
官方網連結：[ https://angular.io/ ]
## 1 安裝/創建 Angular
安裝方式需要注意。 Angular需要安裝 Angular-cli套件，尚未安裝會影響創建問題。
```command
  npm i -g @angular/cli
```
接下來，再用創建專案如同React一樣，如果未輸入名稱會系統會自動帶入名稱。
安裝需要一些時間，請各位耐心等候。
```command
  ng new [Angular-name]
```
![](/image/20230210_18-21-39.png)
![](/image/20230210_18-22-01.png)

## 2 執行 Angular
完成後，移動創好的專案並執行他。官方網有提到 --open 可以改為 -o 。
```command
 cd [Angular-name]
 ng serve --open 
```
![](/image/20230210_18-22-17.png)

## 3 結果畫面
![](/image/20230210_18-22-30.png)

# 三、VueJs 
官方網連結： [ https://vuejs.org/ ]

## 1 安裝 VueJs
vueJs 需要安裝 Vue-Cli 套件，如同Angular一樣。
```command
  npm i -g @vue/cli
```
安裝完畢後，創建 vue 專案並進入vue專案內中，並直接執行即可。 
```command
  vue create [vue-name]
  cd [vue-name]
  npm run serve
```
![](/image/20230210_18-23-11.png)
![](/image/20230210_18-23-22.png)
![](/image/20230210_18-23-36.png)

## 2 結果畫面
![](/image/20230210_18-23-58.png)
---

# 結論
操作下來，安裝部分常常遇到版本需要更新才能進行使用或是創建專案，
近年來 angular 、 react 、vue 開始很多人使用，文件參考也慢慢變多
，也歡迎大家來嘗試這幾些架框。

後續會先介紹 Electron + MVC 環境安裝，才正式慢慢進入[三大架框]使用方式。


