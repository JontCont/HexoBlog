---
title: Angular (三) - router子層作法
categories: 
  - 前端技術
  - Angular
tags: 
  - Angular
description:
keyword: 'ES6, Angular  ,網頁'
cover: /img/Web/bg/Angular-bg-01.png
---

## 前言
上篇有簡單帶過 router 使用方式，若需要底下有階層需要怎麼做。這次會使用子層方式展示。

## router 子層作法
### 一、 設定 app-routing.module.ts
設定路由，這邊會有兩層，一層是 home，一層是 other，other 下面有 book。
```ts
const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'other', component: OtherComponent,children:[
    { path: 'book', component: BookComponent, },
  ]}
];
```

### 二、 設定 app.component.html
```html
<div>
  <router-outlet></router-outlet>
</div>
```

### 三、 設定 home.component.html
這邊目的需要有一個連結可以連到 other，所以會有一個 routerLink。
```html
<div>
  <p>home works!</p>

  <div>
    <ul>
      <li> <a [routerLink]="'/other'">其他 other</a></li>
      <li> <a [routerLink]="'/other/book'">書籍 book</a></li>
    </ul>
  </div>
</div>
```

## 四、設定 other.component.html
這邊提示一下，因為 other 下面有子層，所以需要有一個 router-outlet，這樣才能顯示子層的內容。若沒有加入會發生 book 連結過去，會沒有顯示內容。
```html
<div class="bg">
  <p>other works!</p>
  <router-outlet></router-outlet>
</div>
```

以上完成後效果如下，背景部分可以透過 css 設定。
![](/image/20230826_20-48-36.png)
![](/image/20230826_20-48-22.png)