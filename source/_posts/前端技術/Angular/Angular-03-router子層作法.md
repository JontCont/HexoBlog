---
title: Angular (三) - router子層作法
date: 2023-07-26
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

---

## module 製作 router
module 不但可以放置版面的模組以外，也可以製作一個routing環境。

### 一、創建一個 module
首先要創建一個 module ，名稱建議要加入routing 才會知道這個 module 作用。
```cmd
ng g m children-routing
```

### 二、設定 app-module
這動作是告訴讀取app-module 需要讀到我們的 module 才會到這裡面的頁面。
```ts
  const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'other', component: OtherComponent, children: 
    [
      { path: 'book', component: BookComponent, },
    ]
  },
  {
    path: 'children', loadChildren: () => ChildrenRoutingModule
  }
];
```
到目前為止，app-routing 就完成設定了。
(備註 : angular 創建文件時候會寫入 app.module.ts ，若有發生錯誤記得在那看看有沒有imports)

### 三、設定 children 預設頁面
接下來，創建一個 children 預設畫面。並開始設定我們的 children-routing。
```cmd
ng g c page1
```

設定 children-routing 環境。
這邊要留意，如果沒有 exports ```RouterModule``` 會造成無法轉入頁面。 

```ts
const routes: Routes = [
  { path: '', component: Page1Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
```

設定完成後，就可以將 ```http://localhost:4200/children``` 打開。


---
## 總結
為了製作子層 router時候，比較多人會創建兩個 module，一個是放 routing 、一個是放模組或是擴充的 module 這樣來使用。 事實上可以直接使用一個routing 唯一缺點會比較亂一些。若要加入第二個module 下面的補充可以參考。


### 補充
若有第二個module 需要改以下內容就可以正常使用了。
1. children.module
```ts
@NgModule({
  declarations: [

  ],
  imports: [
    ChildrenRoutingModule,
  ]
})
```
2. app-routing.module
```ts
  const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'other', component: OtherComponent, children: 
    [
      { path: 'book', component: BookComponent, },
    ]
  },
  {
    path: 'children', loadChildren: () => ChildrenModule
  }
];
```