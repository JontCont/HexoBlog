---
title: Angular (五) - @Input、@Output 使用方式
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
@Input 、@Output 用於公用模組時最常見的一個功能，透過 @Input 來接收父元件傳遞的資料，並且在子元件中使用。本篇就來簡單介紹 @Input、@Oupt 的使用方式。

### @Input vs @Output
`@Input` 和 `@Output` 是 Angular 中用於實現父子組件之間通信的重要裝飾器，它們用於在組件之間傳遞資料和觸發事件。以下是它們的使用時機和主要差異：

#### **1. @Input**：
- **使用時機**：`@Input` 主要用於從父組件向子組件傳遞資料。當你需要將資料從父組件傳遞到子組件以供子組件使用時，通常會使用 `@Input`。
- **主要作用**：`@Input` 用於聲明子組件的屬性，以允許外部傳遞資料給這些屬性。子組件可以讀取這些屬性的值並在其模板中使用。
- **示例**：通過 `@Input`，可以將父組件的資料傳遞到子組件，例如傳遞文本、配置選項，或任何需要在子組件中顯示或使用的資料。

```typescript
// 子組件
@Input() inputData: string;
```

```html
<!-- 父組件模板 -->
<app-child [inputData]="parentData"></app-child>
```

#### **2. @Output**：
- **使用時機**：`@Output` 主要用於從子組件向父組件傳遞事件。當子組件需要通知父組件發生了某些事件或需要與父組件進行通信時，通常會使用 `@Output`。
- **主要作用**：`@Output` 用於聲明自訂事件，並通過 `EventEmitter` 觸發這些事件。父組件可以監聽這些事件並執行相應的操作。
- **示例**：通過 `@Output`，子組件可以觸發自訂事件，例如按鈕點擊、表單提交，或其他使用者交互事件，以便父組件可以捕獲這些事件並作出回應。

```typescript
// 子組件
@Output() buttonClicked = new EventEmitter<void>();

onClick() {
  this.buttonClicked.emit();
}
```
```html
<!-- 子組件模板 -->
<button (click)="onClick()">點擊按鈕</button>
```

```html
<!-- 父組件模板 -->
<app-child (buttonClicked)="handleButtonClick()"></app-child>
```

### @Input 、 @Output 差異
1. **資料流向**：
   - `@Input`：資料由父組件傳遞給子組件。
   - `@Output`：事件由子組件傳遞給父組件。

2. **用途**：
   - `@Input` 用於傳遞靜態或動態資料給子組件。
   - `@Output` 用於觸發和傳遞事件，以便子組件可以與父組件進行通信。

3. **通信方向**：
   - `@Input` 是單向通信，從父組件到子組件。
   - `@Output` 是單向通信，從子組件到父組件。

---
## @Input
@Input 是一個用來在子組件中接收父組件傳遞資料的裝飾器。它允許你將資料從父組件傳遞到子組件，以便在子組件中使用這些資料來顯示或操作。

### 一、使用方式
#### 1-1 單一屬性綁定
這是最基本的用法，用於將單一的屬性值從父組件傳遞到子組件。示例如下：
```ts
// 子組件
@Input() inputData: string;
```

```html
<!-- 父組件 -->
<app-child [inputData]="parentData"></app-child>
```

#### 1-2 物件或複雜資料結構：
如果需要將複雜的物件或資料結構傳遞給子組件，你可以使用 @Input 來傳遞整個物件，如下所示：

```ts
// 子組件
@Input() complexData: SomeInterface;
```

```html
<!-- 父組件 -->
<app-child [complexData]="parentComplexData"></app-child>
```


#### 1-3 多個 @Input 屬性:
一個子組件可以聲明多個 @Input 屬性，父組件可以分別傳遞這些屬性，每個屬性有自己的綁定，如下

```ts
// 子組件
@Input() input1: string;
@Input() input2: number;
```

```html
<!-- 父組件 -->
<app-child [input1]="data1" [input2]="data2"></app-child>
```

#### 1-4 使用 Getter 和 Setter:
一個子組件可以聲明多個 @Input 屬性，父組件可以分別傳遞這些屬性，每個屬性有自己的綁定，如下

```ts
// 子組件
private _inputData: string;

@Input()
set inputData(value: string) {
  // 在資料設置前可進行自定邏輯
  this._inputData = value;
}

get inputData(): string {
  return this._inputData;
}
```

---

## @Output
@Output 用於子元件與父元件溝通，子元件透過 @Output 來觸發父元件的事件，並且將資料傳遞給父元件。儘管在本質上只有一種 @Output 的使用方式，但可以根據事件的具體需求和用例採用不同的模式和技巧來使用它，以滿足不同的情況。以下是幾種常見的 @Output 使用方式：

### 一、使用方式
#### 1-1 基本的事件綁定：
最常見的用法是將一個自定義事件綁定到子組件，然後在子組件中觸發該事件。父組件可以監聽這個事件並採取相應的行動。示例如下
```ts
// 子組件
@Output() myEvent = new EventEmitter<string>();

triggerEvent() {
  this.myEvent.emit('從子組件傳來的資料');
}
```

```html
<!-- 子組件模板 -->
<button (click)="triggerEvent()">觸發事件</button>
```

```html
<!-- 父組件模板 -->
<app-child (myEvent)="handleChildEvent($event)"></app-child>
```

#### 1-2 使用 $event 物件：
在父組件中，可以通過 $event 物件來訪問從子組件傳遞過來的資料。這是一種常見的方式，用於在事件處理程序中獲取子組件傳遞的資料。

```ts
// 父組件
handleChildEvent(data: string) {
  console.log('從子組件收到的資料：', data);
}
```

#### 1-3. 自訂事件物件：
你可以創建一個自訂的事件物件，將多個資料字段傳遞給父組件。這對於需要傳遞多個資料值的情況非常有用。

```typescript
// 子組件
@Output() customEvent = new EventEmitter<{ value1: string, value2: number }>();

triggerCustomEvent() {
  this.customEvent.emit({ value1: '你好', value2: 42 });
}
```

```html
<!-- 子組件模板 -->
<button (click)="triggerCustomEvent()">觸發自訂事件</button>
```

```html
<!-- 父組件模板 -->
<app-child (customEvent)="handleCustomEvent($event)"></app-child>
```

#### 1-4. 透過 ViewChild 和子組件方法：
有時，父組件可以使用 `@ViewChild` 來引用子組件的實例，並直接調用子組件的方法來實現與子組件的通信。這種方式不涉及 `@Output`。

```typescript
// 父組件
@ViewChild(ChildComponent) childComponent: ChildComponent;

triggerChildMethod() {
  this.childComponent.someMethod();
}
```

---

### 本篇重點整理
這個表格總結了 `@Input` 和 `@Output` 的主要特性和用途，可以方便理解它們之間的差異。

| 特性             | @Input                                | @Output                               |
|-----------------|--------------------------------------|---------------------------------------|
| 用途             | 從父元件向子元件傳遞資料               | 從子元件向父元件傳遞事件               |
| 資料流向         | 父元件到子元件                        | 子元件到父元件                        |
| 聲明方式         | 在子元件中使用`@Input()`裝飾器聲明屬性  | 在子元件中使用`@Output()`裝飾器聲明事件 |
| 事件類型         | 不適用                                 | 使用 `EventEmitter` 觸發自定義事件      |
| 資料類型         | 可以傳遞任何類型的資料（原始類型、物件、陣列等） | 通常用於觸發無資料或自定義事件的 void 類型 |
| 與模板綁定的方式 | 使用方括號`[inputProperty]="data"`  | 使用圓括號`(outputEvent)="handler()"`  |
| 觸發事件         | 不適用                                 | 子元件透過調用`emit()`觸發事件         |
| 監聽事件         | 不適用                                 | 父元件可以監聽子元件的事件並執行相應操作 |
| 多個屬性或事件   | 可以在子元件中聲明多個 `@Input` 屬性 | 可以在子元件中聲明多個 `@Output` 事件  |

