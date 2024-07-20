---
title: C# 單元測試 (2) - Assert method
date: 2023-03-05 10:16:07
categories: 
  - 後端技術
  - C#
tags: 
  - UnitTest
  - 單元測試
  - C#
description:
keyword: 'UnitTest  , C#'
cover: /img/UnitTest/unit.png
---

## 前言
上次使用 Unit Test 有注意到Assert的字眼，使用下來Assert主要判斷回傳值結果進行比較跟驗證，比較簡易的方式。
這次就來大概說幾個Assert method。

---

# 前置作業
## 使用方式
目前我寫以下方式是取得自定義連線字串，記得去 ```appsettings.json``` 新增連線資訊。
繼上次使用新增專案方式，這次使用的是 ```右鍵``` > ```建立單元測試```方式。
```cs
public class Comm
{
    public string ConnectionString(string Connect)
    {
        IConfiguration config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .Build();
        return config.GetConnectionString(Connect);
    }
}
```

下圖可以看到 [Project]Tests，[Project]會自動帶入你當前的Project名稱也相當的方便，其他欄位同等意思。

![](/img/UnitTest/Test09.jpg)

進行測試內容
```cs
    [TestMethod()]
    public void ConnectionStringTest()
    {
        Comm comm = new Comm();
        string str = comm.ConnectionString("Dev");
        string result = "Data Source=***;Initial Catalog=***;Persist Security Info=True;User ID=***;Password=***";
        Assert.AreEqual(result, str);
    }
```
# Assert method
Assert 類別目的驗證特定功能。單元測試方法會執行應用程式程式碼中方法的程式碼，但只有在包含 Assert 時，才會報告程式碼行為的正確性。

## Assert.AreEqual
這function是用來比較 str 、 result 是否相符，也是上次使用第一個method。
```cs
    [TestMethod()]
    public void ConnectionStringTest()
    {
        Comm comm = new Comm();
        string str = comm.ConnectionString("Dev");
        string result = "Data Source=***;Initial Catalog=***;Persist Security Info=True;User ID=***;Password=***";
        Assert.AreEqual(result, str);
    }
```

## Assert.AreNotEqual
剛好是AreEqual的相反意思，可以用來測試有沒有null或是""。
```cs
    [TestMethod()]
    public void ConnectionStringTest()
    {
        Comm comm = new Comm();
        string str = comm.ConnectionString("Dev");
        string result = "Data Source=***;Initial Catalog=***;Persist Security Info=True;User ID=***;Password=***";
        Assert.AreNotEqual(result, str);
    }
```

## Assert.AreSame
這邊AreSame比較物件屬性，但如果分別Option、Result一起比較會發生錯誤。
這邊特點是物件相同外、記憶體位置也必須要相同才可以。
```cs

        [TestMethod()]
        public void TestSame()
        {
            List<string> option = new List<string>() { "Hello", "UnitTest" };
            List<string> Result = new List<string>() { "Hello", "UnitTest" };
            Assert.AreSame(option, option);
        }
```

## Assert.AreNoSame
這邊如同上面一樣，當初以為會以物件屬性以及內值比較差異o(￣┰￣*)ゞ。
```cs
        [TestMethod()]
        public void TestSame()
        {
            List<string> option = new List<string>() { "Hello", "UnitTest" };
            List<string> Result = new List<string>() { "Hello", "UnitTest" };
            Assert.AreNotSame(option, Result);
        }
```

## Assert.Fail
Fail 為失敗意思。使用這方發可能遇到null或是Exception使用，可以配合try{}catch{}使用。


## Assert.Inconclusive
這邊主要是忽略功能，如果從Test Explorer 打開，可以發現有驚嘆號，代表已經被忽略過了。

## Assert.IsFalse && Assert.IsTrue
下方範例判斷為是否為False。當然也會有IsTrue。
```cs
    [TestMethod()]
    public void ConnectionStringTest()
    {
        Comm comm = new Comm();
        string str = comm.ConnectionString("Dev");
        string result = "Data Source=***;Initial Catalog=***;Persist Security Info=True;User ID=***;Password=***";
        Assert.IsFalse((str!=result));
    }
```

## Assert.IsInstanceOfType
這邊主要驗證對方預期類型的執行個體。
```cs
    [TestClass()]
    public class CommTests
    {
        [TestMethod()]
        public void ConnectionStringTest()
        {
            Comm comm = new Comm();
            string str = comm.ConnectionString("Dev");
            string result = "Data Source=***;Initial Catalog=***;Persist Security Info=True;User ID=***;Password=***";
            Assert.IsInstanceOfType(str,typeof(string));
        }
    }
```

## Assert.IsNotInstanceOfType
這與上方相反，這兩種反而比較常會用到。
```cs
    [TestClass()]
    public class CommTests
    {
        [TestMethod()]
        public void ConnectionStringTest()
        {
            Comm comm = new Comm();
            string str = comm.ConnectionString("Dev");
            string result = "Data Source=***;Initial Catalog=***;Persist Security Info=True;User ID=***;Password=***";
            Assert.IsNotInstanceOfType(str,typeof(int)));
        }
    }
```

## Assert.IsNotNull && Assert.IsNull
這邊主要判斷使否為Null狀況，這也常常會用上。


## Assert.ThrowsException
測試委派 action 所指定的程式碼會擲回 T 類型的確切指定例外狀況


## Assert.ReferenceEquals
判斷指定的 Object 執行個體是否為相同的執行個體。
別懷疑內值並不會去做檢查。
```cs
    [TestMethod()]
    public void ExceptionReuslt()
    {
        object a_obj = new List<string>() { "1","5"};
        List<string> b_obj =new List<string>() { "3", "5" };
        object c_obj = new object();
        Assert.ReferenceEquals(a_obj, b_obj);
    }
```


