---
title: C# Where 泛型類別條件約束
date: 2023-02-19 22:54:19
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

## 泛型類別條件約束（generic class constraint）
用來指定泛型型別參數的約束條件，限制它必須是特定的型別或符合某些條件。

1. 指定泛型型別參數必須繼承自特定的基底類別或介面
```cs
public class MyClass<T> where T : MyBaseClass
{
    // MyClass<T> 的程式碼
}
```
MyClass<T> 泛型類別指定了泛型型別參數 T 必須繼承自 MyBaseClass 基底類別。這樣一來，在定義 MyClass<T> 物件時，T 的型別必須符合這個條件，否則就會編譯錯誤。


2. 指定泛型型別參數必須是值型別或可為空的值型別
```cs
public class MyClass<T> where T : struct
{
    // MyClass<T> 的程式碼
}

```
MyClass<T> 泛型類別指定了泛型型別參數 T 必須是值型別或可為空的值型別。這樣一來，在定義 MyClass<T> 物件時，T 的型別必須符合這個條件，否則就會編譯錯誤。

3. 指定泛型型別參數必須有預設的建構函式
```cs
public class MyClass<T> where T : new()
{
    // MyClass<T> 的程式碼
}

```
MyClass<T> 泛型類別指定了泛型型別參數 T 必須有預設的建構函式。這樣一來，在定義 MyClass<T> 物件時，T 的型別必須符合這個條件，否則就會編譯錯誤。


---
## 實際例子
1. LINQ 擴充方法
在 LINQ 擴展方法中，常常需要使用 IEnumerable<T> 接口的功能。但是有些類型並沒有實現 IEnumerable<T> 接口，這時就可以使用泛型類約束來保證傳入的類型必須實現該接口：
```cs
public static class MyExtension
{
    public static int Count<T>(this T[] arr) where T : IEnumerable
    {
        int count = 0;
        foreach (var item in arr)
        {
            count += item.Count();
        }
        return count;
    }
}
```
上方範例要統計數組中所有元素的數量，因為無法確定傳入的數組類型是否實現 IEnumerable 接口，所以使用泛型類約束來限制傳入類型必須實現該接口。

2. 資料庫操作

在資料庫操作中，有時需要使用泛型類來表示數據表，這時就需要使用泛型類約束來保證傳入的泛型類型必須是類類型：

```cs
public class DBManager<T> where T : class
{
    public List<T> GetAllData()
    {
        // 获取数据的代码
    }

    public void UpdateData(T data)
    {
        // 更新数据的代码
    }

    public void DeleteData(T data)
    {
        // 删除数据的代码
    }
}
```

使用泛型類 DBManager<T> 來表示Data Table，T 必須是 class 類型。這樣一來，在使用 DBManager<T> 類的時候，就可以保證傳入的泛型類型必須是類類型，否則就會編譯錯誤。


3. 重載
有時需要使用泛型類來表示某種類型，這時就需要使用泛型類約束來保證傳入的泛型類型必須實現某種接口或者是某個基類：

```cs
public class Vector<T> where T : struct, IComparable<T>
{
    public T X { get; set; }
    public T Y { get; set; }

    public Vector(T x, T y)
    {
        X = x;
        Y = y;
    }

    public static Vector<T> operator +(Vector<T> a, Vector<T> b)
    {
        return new Vector<T>(a.X + b.X, a.Y + b.Y);
    }

    public static bool operator >(Vector<T> a, Vector<T> b)
    {
        return a.X.CompareTo(b.X) > 0 && a.Y.CompareTo(b.Y) > 0;
    }

    public static bool operator <(Vector<T> a, Vector<T> b)
    {
        return a.X.CompareTo(b.X) < 0 && a.Y.CompareTo(b.Y) < 0;
    }
}
```

在上面的例子中，我們定義了一個泛型類 Vector<T>，它包含了兩個泛型類型的成員變量 X 和 Y，同時定義了加法運算符和比較運算符。在定義加法運算符時，我們使用了泛型類約束 where T : struct, IComparable<T>，表示傳入的泛型類型必須是值類型，並且實現了 IComparable<T> 接口。這樣一來，就可以保證在進行加法運算時，泛型類型可以進行數值相加的操作。在定義比較運算符時，我們使用了泛型類約束 where T : struct, IComparable<T>，表示傳入的泛型類型必須是值類型，並且實現了 IComparable<T> 接口，這樣一來，就可以保證泛型類型可以進行大小比較的操作。