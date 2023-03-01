---
title: C# 委派(delegate)、Action<T>、Func<T,TResult>
categories: 
  - 後端技術
  - C# 
  - 筆記
tags: 
  - C#
description:
keyword: 'C#'
cover: /image/20230219_22-54-19.png
---

## 什麼是委託（delegate）
委託是一種特殊的類型，它可以代表一個或多個方法。可以將委託視為一個可以存儲對方法的引用的變量。委託提供了一種方便的方式來傳遞方法作為參數，以及在運行時動態地執行方法。

委託定義了方法的簽名，其中包括方法的返回值類型和參數列表。委託可以指向具有相同簽名的任何方法。委託是一種類型安全的方式來傳遞方法參數，因為它只能存儲與簽名匹配的方法。

總的來說，Delegate是一種C#中的類型，而Callback是一種編程模式。Delegate通常用於實現Callback。

### (1) Delegate
是一種C#中的類型，它可以用來定義一個方法的指針，並且可以將其當做一個參數傳遞給其他方法。通過Delegate，可以實現將方法當做一個參數傳遞給其他方法，並在需要的時候動態調用這個方法。

### (2) Callback
是一種編程模式，用於當一個方法執行完畢後，通知其他方法。在C#中，Callback通常是通過委託（Delegate）來實現的。當一個方法完成任務後，它會調用一個Delegate，並且將結果作為參數傳遞給Delegate所引用的方法，這個方法就是Callback。

## Delegate 三種類型
### 一、delegate
```cs 
delegate int Calculate(int x, int y);
```
上面的定義表示委託可以代表一個具有兩個int參數和int返回值的方法。可以使用委託變量來存儲對此類方法的引用，例如：
```cs 
int Add(int x, int y)
{
    return x + y;
}

Calculate calc = Add;
int result = calc(1, 2);  // result = 3
```
在上面的例子中，定義了一個Add方法，它與Calculate委託的簽名匹配。然後將Add方法的引用存儲在委託變量calc中，可以通過調用calc變量來調用Add方法。

### 二、Func<T,TResult>
是一個泛型委派，可以接受任何數量的參數，其中最後一個參數為返回值類型。例如，Func<int, int, int> 表示一個方法，該方法有兩個 int 參數並返回一個 int 值。

定義一個接受 Func<> 委派的方法
```cs
public static void DoSomething(Func<int, int, int> operation, int x, int y)
{
    int result = operation(x, y);
    Console.WriteLine(result);
}
```
使用 Func<> 委派來傳遞方法：
```cs
DoSomething((a, b) => a + b, 2, 3); // 輸出：5
```
在這個例子中， DoSomething 方法接受一個 Func<> 委派，可以將兩個數字相加並返回結果。

### 三、Action <T>
是一個類似的泛型委派，但沒有返回值，它也可以接受任何數量的參數。例如，Action<int, string> 表示一個方法，該方法有一個 int 參數和一個 string 參數，但沒有返回值。

定義一個接受 Action 委派的方法
```cs
public static void DoSomething(Action<int, string> operation, int x, string y)
{
    operation(x, y);
}
```
使用 Action 委派來傳遞方法：
```cs
DoSomething((a, b) => Console.WriteLine($"{a} {b}"), 2, "Hello"); // 輸出：2 Hello
```

在這個例子中，DoSomething 方法接受一個 Action 委派，可以將一個 int 值和一個字符串輸出到控制台。通過使用這些委派，可以讓方法更加靈活，可以動態地決定要執行哪個方法。

## Func<>與 Action 差異
1. Func<> : 具有輸入參數和返回值的方法。它的最後一個類型參數表示方法的返回值類型，前面的類型參數表示方法的輸入參數的數量和類型。例如，Func<int, string>表示一個具有一個int型輸入參數和一個string型返回值的方法，而Func<int, string, bool>表示一個具有兩個輸入參數（一個int型和一個string型）和一個bool型返回值的方法。

2. Action : 不具有返回值的方法。它的類型參數表示方法的輸入參數的數量和類型。例如，Action<int>表示一個具有一個int型輸入參數和沒有返回值的方法，而Action<int, string>表示一個具有兩個輸入參數（一個int型和一個string型）和沒有返回值的方法。