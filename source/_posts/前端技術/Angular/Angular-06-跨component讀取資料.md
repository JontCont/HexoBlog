---
title: Angular (六) - 跨越 component 讀取資料
date: 2023-10-17 19:54:58
categories: 
  - 前端技術
  - Angular
tags: 
  - Angular
description:
keyword: 'ES6, Angular ,網頁'
cover: /img/Web/bg/Angular-bg-01.png
---

## 前言
近期專案遇到一個當不是使用公用的component情況下，如何把 component 的資料傳遞到其他 component 中，確保已經有加入到暫存檔中。遇到這問題不用讓chatGpt 詢問答案，只需要執行方向就可以解決問題。

### 解決方向
1. BehaviorSubject : 這個是一個可以讓資料傳遞的方式，可以讓資料傳遞到其他 component 中，也是在創建angular 會產生的 rsjx 套件。
2. localstorage : 這個是瀏覽器的暫存檔，可以讓資料傳遞到其他 component 中，但是這個方式會有一個問題，就是當資料量大的時候，會造成瀏覽器的效能問題 (備註 : 預設為5 ~ 10 MB 範圍大小)。
3. IndexedDB : 這是 網頁瀏覽器 提供的資料暫緩區，不會遇到資料太大無法存檔的問題 (因為時間問題之後再研究)。


### 最終解決方案
因為專案時程關係，我會選擇比較能確認可行性的做法執行，BehaviorSubject + localstorage 是我最後選擇的方案。

BehaviorSubject 會因為瀏覽器關閉、重新整理會造成資料消失，因此需要 localstorage 來做資料儲存，這樣就可以確保資料不會消失問題，但是需要定期清除 localstorage 才不會讓暫存爆掉。

---

## 實作
首先，我們起手專案就簡單創建一個專案，並且創建兩個 component，一個是傳遞資料的 component，一個是接收資料的 component。

```bash
ng new angular-app
ng g @schematics/angular:component @View/PageOne
ng g @schematics/angular:component @View/PageTwo
ng g @schematics/angular:service @Service/GlobalData
```

### 一、設定 app.module.ts
因為我們專案會用到部分 formmodule，所以需要先引入進來。

```typescript
@NgModule({
  declarations: [
    AppComponent,
    PageOneComponent,
    PageTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 二、設定 app-routing.module.ts
```typescript
const routes: Routes = [
  { path: 'page-one', component: PageOneComponent },
  { path: 'page-two', component: PageTwoComponent },
  { path: '', redirectTo: '/page-one', pathMatch: 'full' },
  { path: '**', redirectTo: '/page-one', pathMatch: 'full' }
];
```

### 三、設定 GlobalData
這邊我就用 ```setData``` 、 ```getData``` 來做資料傳遞，並且在初始化時，會先去 localstorage 中讀取資料，確保資料不會消失。

```ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  private dataSubject = new BehaviorSubject<any>({});
  data = this.dataSubject.asObservable();

  constructor() {
    // 在服務初始化時，嘗試從本地存儲中讀取數據
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      this.dataSubject.next(JSON.parse(storedData));
    }
  }

  setData(name: string, value: any) {
    const currentData = this.dataSubject.value;
    const updatedData = { ...currentData, [name]: value };
    this.dataSubject.next(updatedData);
    // 同時保存到本地存儲
    localStorage.setItem('myData', JSON.stringify(updatedData));
  }

  getData(name: string) {
    const currentData = this.dataSubject.value;
    return currentData[name] ?? null;
  }
}
```

### 設定 PageOneComponent、PageTwoComponent
1. PageOneComponent

```html
<div>
  <label for="">測試傳值</label>
  <input type="text" [ngModel]="testValue" (ngModelChange)="onChangeValue($event)" >

  <div>
    <button type="button" [routerLink]="'/page-two'">傳至 page two</button>
  </div>
</div>
```

```ts
  testValue:string = "";
  onChangeValue(event: any | null) {
    this.globalDataService.setData('testValue', event);
  }
```

1. PageTwoComponent

```html
<p>page-two works!</p>
<div>
  {{testValue}}}
</div>

<div>
  <button type="button" [routerLink]="'/page-one'">傳至 page one</button>
</div>
```

```ts
  testValue:string = "";
  constructor(
    private globalDataService: GlobalDataService
  ) { }

  ngOnInit(): void {
    this.testValue = this.globalDataService.getData('testValue');
  }
```

完成以下動作後，可以利用 console.log 來確認資料是否有傳遞成功，功能相當簡單但是需要記得要將多餘資料清掉。
若使用 IndexedDB 或者情況就會變成更單純一點，之後有機會再來研究 ~。

---
## 範例程式碼
1. [Github](https://github.com/JontCont/angular-storage)
