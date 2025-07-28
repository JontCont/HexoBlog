---
title: Angular (二) - component 與 router 介紹與實作
date: 2023-07-25
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

由於近期到公司使用Angular框架開發，本人使用次數不會超過10次，所以會有些許不正確的地方，如果有錯誤的地方歡迎指正。
(本文目的: 學習專用)


### Typescript
Angular 當初與三個框架當中，最早使用Ts來當作開發語言，之後Vue、React也跟進使用Ts，所以如果有使用過Vue、React的人，會比較熟悉。

### VSCode
初學者如果要快速建立環境可以使用下方套件:
1. [設定檔案](https://gist.github.com/doggy8088/6539a140f28924d3a1f053a8d3a9f49e)

2. [Angular Extension Pack](https://marketplace.visualstudio.com/items?itemName=doggy8088.angular-extension-pack)

### 其餘工具
有時候因為版本問題，會需要安裝其他工具，這邊我們建議使用nvm 來管控版本，可以參考下方連結。

1. [nvm-node版本管理工具](../nvm_node版本管理工具.md)
2. [nvm：安裝、切換不同 Node.js 版本的管理器](https://titangene.github.io/article/nvm.html)
--- 
## Component

在 Angular 中，組件（Component）是應用程式的基本構建塊之一，用於將使用者界面分解成獨立且可重用的部分。

組件是 Angular 應用程式的基本單位，每個組件代表一個特定的使用者界面區域或元素。每個組件擁有自己的 HTML 模板、CSS 樣式和 TypeScript 代碼，這使得組件能夠獨立運作並與其他組件協同工作。

以下是 Angular 組件的一些主要特點和組成部分：

1. 模板（Template）： 模板是組件的視覺表示，使用 HTML 標記和 Angular 樣板語法結合，來定義組件的外觀。模板中可以使用變數、指令和事件處理器來實現動態的內容呈現。

2. 類別（Class）： 每個組件都對應一個 TypeScript 類，這個類用於處理組件的邏輯和行為。它包含了各種方法和屬性，用於處理數據、事件處理、生命週期鉤子等。

3. 元數據（Metadata）： 元數據是一個由裝飾器（Decorator）提供的對象，用於指定組件的元信息，例如組件的選擇器、模板、樣式、生命週期鉤子等。

4. 樣式（Styles）： 每個組件可以有自己的 CSS 樣式，用於定義組件的外觀和風格。這些樣式可以直接寫在組件文件中，也可以引用外部的樣式文件。

5. 數據繫結（Data Binding）： Angular 支援多種數據繫結方式，包括插值表達式、屬性繫結、事件繫結和雙向繫結，這使得數據在組件和模板之間能夠流動並保持同步。

6. 生命週期鉤子（Lifecycle Hooks）： Angular 提供一系列生命週期鉤子方法，允許你在組件生命週期的不同階段執行自定義的程式碼，例如初始化數據、訂閱事件、銷毀資源等。

### 實作

首先我們先創建一個Component，這邊我們創建一個Pages 為 Home。
![](/image/20230823_22-50-11.png)

開始前，請到 app-routing.module.ts 設定 router設定位置。
```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './@Views/home/home.component';

const routes: Routes = [
  {path:'home', component: HomeComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

之後將 app.component.html 的內容刪除，並加入下方程式碼。就完成簡易版本的component。與上篇 ```<router-outlet></router-outlet>```使用方式不相同。

```html
<!-- <router-outlet></router-outlet> -->
<div>app component<div>
<div>
  <app-home></app-home>
</div>
```

Component 很多人會誤解為是一個頁面，其實不是，Component是一個頁面的一部分，可以想像成是一個頁面的區塊。因此，我們可以在一個頁面中使用多個Component，也可以在一個Component中使用多個Component。

### 什麼是 .spec

在 Angular 開發中，```.spec.ts``` 檔案通常是用來撰寫測試的文件。這些測試文件被稱為「測試規格」（Test Spec），通常用來驗證你的程式碼是否按照預期工作。
具體來說，每個 Angular 組件和服務都可以有相對應的測試規格，這些測試規格會測試該組件或服務的行為和功能，以確保它們正常運作並符合預期行為。

以下是一些常見的 Angular 測試規格概念：

1. 單元測試（Unit Testing）： 單元測試是針對應用程式的最小單元進行測試，例如組件、服務、指令等。在 .spec.ts 檔案中，你可以使用測試框架（如 Jasmine）提供的函式來定義和執行這些測試。

2. 測試套件（Test Suite）： 測試套件是一組相關的測試用例，通常與一個組件或服務相關聯。你可以使用 Jasmine 提供的 describe 函式來定義測試套件。

3. 測試用例（Test Case）： 測試用例是單一的測試單元，用來驗證一個特定的行為或功能。你可以使用 it 函式來定義測試用例，並在其中斷言（assert）預期的結果。

4. 斷言（Assertion）： 斷言是在測試用例中使用的語句，用於比較實際結果和預期結果是否一致。常見的斷言函式包括 expect、toBe、toEqual 等。

5. 測試替身（Test Double）： 測試雙是在測試中替代真實依賴項的模擬對象，包括測試假的服務、假的 HTTP 請求等。這有助於隔離單元測試，避免對外部資源造成影響。

在 Angular 項目中，通常會在每個組件或服務的同名文件夾中創建對應的 .spec.ts 檔案，然後使用測試框架（如 Jasmine）和測試工具（如 TestBed）來撰寫和執行測試。這有助於確保你的程式碼在修改或擴展時仍然保持預期的行為，同時提高程式碼的品質和穩定性。


## router
Router 是一個核心的功能，用於處理應用程式中不同視圖之間的導航和狀態管理。Angular 的路由模組提供了一種方式來定義應用程式的不同路由，並根據 URL 的變化來顯示對應的組件內容。以下是 Angular 路由的介紹：

1. 路由配置（Route Configuration）： 路由配置是指定應用程式中不同路由的設定。你可以在應用程式的路由模組中定義路由配置，每個路由都包括一個 URL 路徑和對應的組件。路由配置也可以包含路由參數、子路由、守門員（Guards）、解析器（Resolvers）等。

2. Router Outlet： <router-outlet> 是 Angular 提供的指令，用於在畫面中顯示當前路由對應的組件內容。當 URL 路徑改變時，路由器會根據路由配置從對應的組件中渲染內容，並將其插入到 <router-outlet> 中。

3. 路由導航（Router Navigation）： 路由導航是通過改變 URL 路徑來切換不同路由的過程。你可以在組件中使用 Angular 提供的 Router 服務的方法來進行路由導航，例如 router.navigate()。

4. 路由參數（Route Parameters）： 路由參數是 URL 中的變數部分，用於傳遞給特定路由的資訊。你可以在路由配置中定義路由參數，並在路由導航時傳遞參數值。

5. 子路由（Child Routes）： 子路由允許你在一個父路由中定義子路由，這樣你可以在同一個父路由下顯示多個相關聯的子組件。子路由可以在父組件的 <router-outlet> 中顯示。

6. 守門員（Guards）： 守門員是用於保護特定路由的功能，例如驗證使用者權限、確保使用者已登入等。你可以使用守門員在路由導航之前進行身份驗證或授權檢查。

6. 解析器（Resolvers）： 解析器用於在路由導航之前獲取需要的數據，並將這些數據提供給目標組件。這可以確保在顯示組件之前，所需的數據已經可用。

7. 延遲載入（Lazy Loading）： 延遲載入是一種優化技術，允許你在需要時才動態載入特定模組和相關的路由。這可以改善初始載入時間，僅在需要時載入所需的代碼。

Angular 的路由模組提供了一個強大的機制，用於管理應用程式中不同視圖之間的導航和狀態。通過定義路由配置，使用路由導航來切換路由，以及利用守門員、解析器等功能，你可以建立出結構良好且功能豐富的單頁應用程式。