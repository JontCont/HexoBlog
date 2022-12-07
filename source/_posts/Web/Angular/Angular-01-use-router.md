---
title: Angular (一) - 使用Angular Router 
categories: 
  - 前端技術
  - Angular
tags: 
  - Angular
description:
keyword: 'ES6, Angular  ,網頁'
cover: /img/Web/bg/Angular-bg-01.png
---

# 前言
Angular 近期蠻多公司願意使用的一項框架，他使用Type-Script 來開發是一個好的選擇，後期其他前台框架陸續更近所以差異就不會太大。PS: 目前不介紹TS使用方式。


# Angular
Angular 是基於 TypeScript 的開發平台。通常是指 "Angular 2+" 或 "Angular v2 及更高版本，框架由 Google 的 Angular 團隊以及社群共同領導。

![](/img/Web/angular/Architecture_of_an_Angular_2_application.png)

上圖。Angular 應用的架構。其主要的構造塊是模組、組件、模板、元資料、資料繫結、指令、服務和依賴注入。

## 前置作業
- [NodeJs](https://nodejs.org/en/)
- [VSC](https://code.visualstudio.com/)
- [VSC Marketplace](https://marketplace.visualstudio.com/items?itemName=doggy8088.angular-extension-pack)
- 安裝指令: 
必須要先安裝NodeJs才能執行。``` npm install @angular/cli ```


## 創建專案
創建專案也是相對簡單，本篇範例是用 version 14 如果不知道自己版本可以使用```ng v```。

指令為 ``` ng new [source name]``` 即可，14版本會詢問是否要routing 以及css，記得要把routing 允許以及選擇自己比較熟悉的css。 

```cmd
ng new useAngular
```
![](/img/Web/angular/Snipaste_2022-06-12_09-50-37.png)


## 創建Pages
第一次使用會不知道如何開始使用Angular，進入專案只有用到App資料夾。這邊範例使用VSC套件用[Angular Extension Pack](https://marketplace.visualstudio.com/items?itemName=doggy8088.angular-extension-pack)。

![](/img/Web/angular/Snipaste_2022-06-12_09-51-47.png)


下圖可以使用右鍵點選就可以快速道終端機，並幫你下好```ng g c ```指令。這邊我們創建一個Pages 為About。

![](/img/Web/angular/Snipaste_2022-06-12_10-00-48.png)
![](/img/Web/angular/Snipaste_2022-06-12_10-01-03.png)
![](/img/Web/angular/Snipaste_2022-06-12_10-03-25.png)

## 設定router
router 在Angular為app-Routing.module.ts，如果有使用dotnet MVC 會比較熟悉一點。
![](/img/Web/angular/Snipaste_2022-06-12_10-05-06.png)

Angular routing 是設定頁面位置。這邊我們用app-routing.module 加入我們剛才的pages，如下方寫法。
```ts
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//本篇重點
const routes: Routes = [
  { path:'about' ,component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

需要留意上router是不可以遺漏掉，如果忘記寫上router 會無法連上pages 。path是指頁面路徑，可以指定那些component存放路徑。

## 首頁選單
上方完成後，可以到app.component.html中加上選單，撰寫方式很簡單只需要加入```<a routerLink="/about">about</a>```即可完成。但是別忘了需要加入```<router-outlet></router-outlet>```，這個東西會呈現component畫面，就會有畫面轉換的效果。

```html
<div>
  <h3>{{title}}</h3>
</div>

<div>
  <ul>
    <li><a routerLink="/about">about</a></li>
  </ul>
</div>

<router-outlet></router-outlet>
```