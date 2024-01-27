---
title: 【C#】今晚想來點 Clone Object
date: 2024-01-27 11:11:47
categories:
  - 後端技術
  - C#
  - 筆記
tags:
  - C#
description:
keyword: "C#"
cover: /image/20240128_00-05-59.png
---

## 前言

近期因為工作上關係 Blog 產量逐日下降，稍微少許時間來探討一些主題。近期遇到非常有趣的問題，因此想要來分享一下。

### 事情經過

發生在近期我為了要將 Object 複製一份到變數當中，並修改 temp 變數發現 EF 無法正常運作，但是我卻不知道為什麼，因此我就開始了我的 Debug 之旅。事件如下範例

程式碼初學者教導有個觀念就是，若要有變更變數的話，就要先複製一份出來，然後再進行變更，如下方範例

```cs
int a = 1;
int temp = a ;
temp = 2;
```

因此我就照著這個觀念，將 Object 複製一份出來，然後再進行變更發現不是預期的結果，如下方範例

```cs
    var A = new Person() { Name = "A", Age = 10 };
    var temp = A;
    temp.Age = 20;
    Console.WriteLine($"{A.Name} - {A.Age}");
    Console.WriteLine($"{temp.Name} - {temp.Age}");

    //output
    //A - 20
    //A - 20
```

他會因為 temp 變數的 Age 變更，而導致 A 變數的 Age 也跟著變更，這時候我就開始思考，為什麼會這樣呢？我不是複製一份出來嗎？為什麼會變成這樣呢？

### 為什麼會這樣呢？

為什麼會這樣呢？我們先來看看 C# 的變數型態，C# 的變數型態分為兩種，一種是 Value Type，一種是 Reference Type，Value Type 代表的是值型別，Reference Type 代表的是參考型別，Value Type 會將資料存放在 Stack 中，Reference Type 會將資料存放在 Heap 中，如下圖

![](/image/20240128_00-05-59.png)

因此我們可以知道，Value Type 是將資料存放在 Stack 中，因此當我們將變數複製一份出來，就會將資料複製一份出來，因此我們可以看到下方範例，當我們將 a 變數複製一份出來，並且修改 temp 變數，a 變數並不會跟著變更，因為他們是分開存放的，因此我們可以知道 Value Type 是將資料複製一份出來，並且存放在 Stack 中，因此當我們修改 temp 變數，a 變數並不會跟著變更，如下方範例

```cs
int a = 1;
int temp = a ;
temp = 2;
Console.WriteLine($"{a} - {temp}");
//output
//1 - 2
```

但是 Reference Type 會將資料存放在 Heap 中，因此當我們將變數複製一份出來，並且修改 temp 變數，a 變數會跟著變更，因為他們是存放在同一個記憶體位置，因此我們可以知道 Reference Type 是將資料存放在 Heap 中，因此當我們修改 temp 變數，a 變數會跟著變更。因此我們可以知道，當我們將 Object 複製一份出來，並且修改 temp 變數，a 變數會跟著變更，因為他們是存放在同一個記憶體位置，因此我們可以知道，當我們將 Object 複製一份出來，並且修改 temp 變數，a 變數會跟著變更

### 如何解決呢？

為了要解決萬惡的問題，我們可以使用 Clone 的方式，將 Object 複製一份出來。

#### 一、 Class 加入 Clone 方法
```cs
var A = new Person() { Name = "A", Age = 10 };
var temp = A.Clone();
temp.Age = 20;
Console.WriteLine($"{A.Name} - {A.Age}");

class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Person Clone()
    {
        return new Person() { Name = this.Name, Age = this.Age };
    }
}
```

#### 二、實作 ICloneable
```cs
//var temp = A.Clone(); <-使用方式一樣
class Person: ICloneable
{
    public string Name { get; set; }
    public int Age { get; set; }

    public object Clone()
    {
        return new Person() { Name = this.Name, Age = this.Age };
    }
}
```


#### 三、使用序列化
```cs
//var temp = A.Clone(); <-使用方式一樣
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Person Clone()
    {
        return JsonConvert.DeserializeObject<Person>(JsonConvert.SerializeObject(this));
    }
}
```

#### 四、使用 Reflection
```cs
//var temp = A.Clone(); <-使用方式一樣
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Person Clone()
    {
        var clone = new Person();
        var properties = this.GetType().GetProperties();
        foreach (var property in properties)
        {
            property.SetValue(clone, property.GetValue(this));
        }
        return clone;
    }
}
```

#### 五、使用 MemberwiseClone
```cs
//var temp = A.Clone(); <-使用方式一樣
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Person Clone()
    {
        return (Person)this.MemberwiseClone();
    }
}
```

---
### 結論
其實這問題觀念都是基礎觀念，但是我們在實作上，很容易忽略這些觀念，因此我們在實作上，一定要注意這些觀念，才不會發生離奇的問題。
