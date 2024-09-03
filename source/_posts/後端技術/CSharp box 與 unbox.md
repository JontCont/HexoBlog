---
title: '[筆記]C# - Box 與 Unbox'
date: 2024-09-03 20:13:00
categories: 
  - 後端技術
  - C# 
  - 筆記
tags: 
  - C#
description:
keyword: 'C#'
cover: /image/20230226_20-12-36.png
---

## Box 與 Unbox
Boxing 和 Unboxing 是在程式設計中處理實值型別（Value Type）和參考型別（Reference Type）之間轉換的過程。

- Boxing : 將實值型別轉換為參考型別的過程，
- Unboxing : 將參考型別轉換為實值型別的過程。

### 1-1 認識 C# 資料型態
C# 中的資料型態分為兩種，分別是實質型別 Value Type 和 參考型別 Reference Type。這兩種型別在記憶體中的存放位置不同，Value Type 存放在 Stack 中，而 Reference Type 存放在 Heap 中。

下圖是 Value Type 和 Reference Type 變數/類別清單
![](/image/20240903_22-50-54.png)

### 1-2 Box
Boxing 過程會在堆積（Heap）中創建一個新的物件，並將實值型別的值複製到這個新物件中。例如：

```csharp
int i = 123;
object o = i; // 這裡發生了 Boxing

// 明確轉換
// object o = (object)i; // 這裡發生了 Boxing
```

在這個例子中，整數 i 被轉換為物件 o，這樣 i 的值就被包裝成一個參考型別
![](/image/20240903_23-17-52.png)

### 1-3 Unbox

Unboxing 過程需要從堆積中的物件中提取出原始的實值型別或將介面類型明確轉換為實作介面之實值型別的程序。例如：

```csharp
object o = 123;
int i = (int)o; // 這裡發生了 Unboxing
```

在這個例子中，物件 o 被轉換為整數 i，這樣 o 中的值就被提取出來，轉換為實值型別。

#### Unboxing 動作：
- 檢查物件執行個體，確定它是所指定實值類型經過 Box 處理的值。
- 將值從執行個體複製到實值類型變數。

![](/image/20240903_23-16-08.png)
---
## 驗證是否是參考型別
需要驗證一個物件是否是參考型別，可以使用 `GetType().IsClass` 方法或是 ```typeof()```方式，如果是參考型別，則會回傳 `True`。

- `dynamic`  : 它是一個編譯時期不知道型別的變數，它的型別會在執行時期決定。因此，使用上如果直接用實體型別會有 False 機會。
- `string` : 具有一些實值型別的特性（如不可變性），但本質上仍是參考型別
- `object` : 是所有類型的基類，因此它是參考型別

```csharp
object obj = new object();
string str = "hello";
dynamic dyn = new object();

Console.WriteLine(obj.GetType().IsClass);  // True (也可以使用 obj is object 取得狀態)
// Console.WriteLine(obj is object);  // True
Console.WriteLine(str.GetType().IsClass);  // True
Console.WriteLine(dyn.GetType().IsClass);  // True
```


---

## 參考資料
- [C# 中的 Box 和 Unbox](https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/types/boxing-and-unboxing)
- [Value Type and Reference Type in C#](https://www.shekhali.com/value-type-and-reference-type-in-c/)