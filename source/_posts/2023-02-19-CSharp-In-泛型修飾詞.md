---
title: '[筆記]C# In 泛型修飾詞'
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

## 泛型修飾詞 
泛型修飾詞用於指定泛型類型參數，以便在編譯時使用具體的類型。泛型修飾詞使用尖括號"< >"表示，放置在類型名稱的後面。可以定義一個泛型類型List，其中T是一個類型參數：
```cs
public class List<T>
{
    private T[] items;
    
    public List()
    {
        items = new T[0];
    }
    
    public void Add(T item)
    {
        // Add item to the list
    }
    
    // Other methods here
}

```
在上面的示例中，T是一個泛型類型參數，可以代表任何類型。當創建List物件時，必須指定T的具體類型，例如：
```cs

List<int> intList = new List<int>();
List<string> stringList = new List<string>();

```
在上面的代碼中，intList是一個List物件，其T類型參數為int。stringList是一個List物件，其T類型參數為string。在編譯時，T將被替換為具體的類型，使得編譯器能夠在編譯時檢查類型相容性，進而提高代碼的可靠性和效率。


## 使用泛型的時機
1. 創建通用類型：當需要創建能夠適用於多種類型的類型時，可以使用泛型來實現。例如 List<T>、Dictionary<TKey, TValue> 等都是通用類型。
2. 創建可重用的方法：當需要寫一個方法，且方法參數或返回值的類型不確定時，可以使用泛型方法。這樣可以實現方法的通用性，讓方法可以適用於不同的類型。
3. 創建泛型接口：當需要創建可用於多種不同類型的類的接口時，可以使用泛型接口。例如，IEnumerable<T> 接口用於表示任何可列舉的序列，而不關心序列包含的實際類型。

由於泛型在編譯時需要產生額外的程式碼來支援不同的類型，因此在執行時可能會比使用非泛型的方法稍慢。此外，在使用泛型時，還需要注意以下幾點：

1. 泛型類型的實例化可能需要額外的記憶體和執行時間，這可能會導致效能下降。
2. 過度使用泛型可能會導致代碼複雜性增加，進而降低代碼的可讀性和可維護性。
3. 當需要在多個執行緒中使用泛型時，需要注意同步的問題，以避免可能的資料競爭和併發問題。

使用泛型可以幫助開發人員撰寫更具有彈性和可重用性的程式碼。但是，在使用泛型時，還需要根據具體情況來權衡效能和可維護性等因素。


## 泛型 / 非泛型範例

### 泛型
以下是一個使用泛型的例子，該例子創建一個通用的 Stack<T> 類型，用於存儲任何類型的物件：
```cs
public class Stack<T>
{
    private List<T> items;

    public Stack()
    {
        items = new List<T>();
    }

    public void Push(T item)
    {
        items.Add(item);
    }

    public T Pop()
    {
        if (items.Count == 0)
        {
            throw new InvalidOperationException("Stack is empty");
        }

        T item = items[items.Count - 1];
        items.RemoveAt(items.Count - 1);
        return item;
    }
}

```
在這個例子中，泛型類型 T 可以代表任何類型，因此這個 Stack<T> 類型可以存儲任何類型的物件，包括整數、字符串、自定義類型等。以下是一個使用這個 Stack<T> 類型的例子：
```cs
Stack<int> intStack = new Stack<int>();
intStack.Push(1);
intStack.Push(2);
intStack.Push(3);

int x = intStack.Pop(); // x = 3

```

###0 非泛型
```cs
public class IntStack
{
    private List<int> items;

    public IntStack()
    {
        items = new List<int>();
    }

    public void Push(int item)
    {
        items.Add(item);
    }

    public int Pop()
    {
        if (items.Count == 0)
        {
            throw new InvalidOperationException("Stack is empty");
        }

        int item = items[items.Count - 1];
        items.RemoveAt(items.Count - 1);
        return item;
    }
}

```
在這個例子中，Stack 類型只能存儲整數，無法存儲其他類型的物件。以下是一個使用這個 IntStack 類型的例子：
```cs
IntStack intStack = new IntStack();
intStack.Push(1);
intStack.Push(2);
intStack.Push(3);

int x = intStack.Pop(); // x = 3

```
這兩個例子展示了泛型和非泛型類型的不同之處。使用泛型可以創建更通用、可重用的類型，而非泛型類型則具有更具體的限制。