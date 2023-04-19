---
title: DI依賴注入生命週期
categories: 
  - 筆記 
  - 生活雜記
description:
keyword: 'C#'
cover: /image/20230219_22-54-19.png
---


## DI 依賴注入（Dependency Injection）
DI（Dependency Injection）是一種設計模式，它的主要目的是降低軟體元件之間的耦合度，讓程式更容易測試和維護。DI 透過將類別所需的相依物件，由外部傳入，讓類別不需要知道相依物件的實作細節，只需要知道相依物件所提供的介面（interface），就可以正常運作。

## 生命週期
在 DI 中，相依物件的生命週期通常由 DI 容器來管理。一般來說，每個類別在 DI 容器中都會有一個對應的生命週期。常見的生命週期有以下幾種：

- Transient：每次注入都會創建一個新的實例。
- Singleton：整個應用程序只會創建一個實例。
- Scoped：在同一個作用域中只會創建一個實例。

## 使用規則

使用 DI 時，有幾個重要的使用規則：

- 盡量避免在程式碼中直接 new 物件，應該使用 DI 容器來管理物件的生命週期。
- 相依物件的注入應該使用介面（interface）而不是具體類別（concrete class）。
- 相依物件的注入應該在建構子（constructor）中完成，而不是在類別的方法中完成。
- 相依物件的注入應該由 DI 容器負責，而不是由使用者負責。

以下是一個簡單的使用 DI 的範例：
```cs
public interface IService
{
    void DoSomething();
}

public class Service : IService
{
    public void DoSomething()
    {
        Console.WriteLine("Do something");
    }
}

public class Consumer
{
    private readonly IService _service;

    public Consumer(IService service)
    {
        _service = service;
    }

    public void DoWork()
    {
        _service.DoSomething();
    }
}

// 使用 DI 容器來註冊並解析相依物件
var services = new ServiceCollection();
services.AddTransient<IService, Service>();
services.AddTransient<Consumer>();

var serviceProvider = services.BuildServiceProvider();

// 解析 Consumer 並呼叫 DoWork 方法
var consumer = serviceProvider.GetService<Consumer>();
consumer.DoWork();
```
在上面的範例中，IService 是一個介面，Service 是一個實現該介面的類別。Consumer 類別有一個建構子，該建構子需要一個 IService 的實例。在使用 DI 容器時，我們使用 ServiceCollection 類別來註冊 IService 和 Consumer 類別，然後使用 BuildServiceProvider 方法

