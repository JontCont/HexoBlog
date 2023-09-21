---
title: Angular (四) - component生命週期
categories: 
  - 前端技術
  - Angular
tags: 
  - Angular
description:
keyword: 'ES6, Angular ,網頁'
cover: /img/Web/bg/Angular-bg-01.png
---
本篇主要備註、紀錄 Angular component 的生命週期，方便之後查詢。

## component生命週期
Angular 元件生命週期中從 建立、渲染、更新、銷毀過程中，會觸發一些事件，這些事件可以讓我們在元件生命週期中做一些事情，例如：在元件建立時，可以做一些初始化的動作，或是在元件銷毀時，可以做一些清除的動作。

參考下圖生命週期以及程式範例。
![](/image/20230827_20-01-12.png)

- [Will保哥-範例程式](https://stackblitz.com/edit/angular-lifecycle-hooks) 

---
### 一、生命週期階段
元件的生命週期在Angular中被分為八種主要階段，每個階段都對應著特定的生命週期鉤子方法。這些階段按照順序依次發生，從元件的創建到銷毀。

#### 1-1 建立階段（Creation Phase）
- constructor: 元件類的建構子。通常是當元件被建立時，會先執行建構子，並且只會執行一次。

#### 1-2 渲染階段（Render Phase）
- ngOnChanges: 當元件的輸入屬性發生變化時，會觸發此鉤子方法。
- ngOnInit: 當元件初始化完成時，會觸發此鉤子方法。通常是當元件初始化完成後，會執行一些初始化的動作，例如：呼叫API取得資料、訂閱事件等等。

#### 1-3 更新階段（Update Phase）
- ngDoCheck: 當元件的變更偵測機制被觸發時，會觸發此鉤子方法。通常是當元件的輸入屬性發生變化時，會觸發此鉤子方法。

#### 1-4 銷毀階段（Destruction Phase）
- ngOnDestroy: 當元件被銷毀時，會觸發此鉤子方法。通常是當元件被銷毀時，會執行一些清除的動作，例如：取消訂閱事件、清除計時器等等。

---
### 二、生命週期鉤子方法
#### 2-1 constructor
元件類的建構子。通常是當元件被建立時，會先執行建構子，並且只會執行一次。這裡不會有任何狀態可以取得，唯一可以取得是class當中預設的屬性(property)。

#### 2-2 ngOnChanges
當元件的輸入屬性發生變化時，會觸發此鉤子方法。這裡觸發事件會比 OnInit 早，所以通常不會在這裡做初始化的動作。

```ts
ngOnChanges(changes: SimpleChanges) {
  console.log('ngOnChanges');
  console.log(changes);
}
```

#### 2-3 ngOnInit
當元件初始化完成時，會觸發此鉤子方法。通常是當元件初始化完成後，會執行一些初始化的動作，例如：呼叫API取得資料、訂閱事件等等。

```ts
ngOnInit() {
  console.log('ngOnInit');
}
```

#### 2-4 ngDoCheck
當元件的變更偵測機制被觸發時，會觸發此鉤子方法。通常是當元件的輸入屬性發生變化時，會觸發此鉤子方法。
   
```ts
ngDoCheck() {
  console.log('ngDoCheck');
}
```

#### 2-5 ngAfterContentInit
當元件內容初始化完成時，會觸發此鉤子方法。通常是當元件內容初始化完成後，會執行一些初始化的動作，例如：呼叫API取得資料、訂閱事件等等。

```ts
ngAfterContentInit() {
  console.log('ngAfterContentInit');
}
```

#### 2-6 ngAfterContentChecked
當元件內容變更偵測機制被觸發時，會觸發此鉤子方法。通常是當元件內容發生變化時，會觸發此鉤子方法。

```ts
ngAfterContentChecked() {
  console.log('ngAfterContentChecked');
}
```

#### 2-7 ngAfterViewInit
當元件視圖初始化完成時，會觸發此鉤子方法。通常是當元件視圖初始化完成後，會執行一些初始化的動作，例如：呼叫API取得資料、訂閱事件等等。

```ts
ngAfterViewInit() {
  console.log('ngAfterViewInit');
}
```

#### 2-8 ngAfterViewChecked
當元件視圖變更偵測機制被觸發時，會觸發此鉤子方法。通常是當元件視圖發生變化時，會觸發此鉤子方法。

```ts
ngAfterViewChecked() {
  console.log('ngAfterViewChecked');
}
```

#### 2-9 ngOnDestroy
當元件被銷毀時，會觸發此鉤子方法。通常是當元件被銷毀時，會執行一些清除的動作，例如：取消訂閱事件、清除計時器等等。

```ts
ngOnDestroy() {
  console.log('ngOnDestroy');
}
```

---
### 三、子元件與內容元件事件
#### 3-1 子元件
- ngAfterViewInit : 當 View 裡面所有元件都初始化完成後，才會觸發。
- ngAfterViewChecked : 當 View 裡面所有文件都完成變更偵測後，才會觸發。
#### 3-2 內容元件
- ngAfterContentInit : 當 Content 裡面所有元件都初始化完成後，才會觸發。
- ngAfterContentChecked : 當 Content 裡面所有文件都完成變更偵測後，才會觸發。

---
## 參考文件
1. [[學習筆記] 淺談 Angular 元件生命週期](https://hackmd.io/@Heidi-Liu/angular-lifecycle)
2. [Angular 完整元件生命週期介紹](https://www.youtube.com/watch?v=-HoKK2KyurQ)