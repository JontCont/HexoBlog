---
title: C# Class與Struct差異(使用LinqPad)
date: 2024-07-27 18:08:47
categories: 
  - 後端技術
  - C# 
  - 筆記
tags: 
  - C#
description:
cover: /image/20240727_01-42-16.png
# sticky: 1
---

近期要學習 C# reocrd，因此想要先了解一下 Class 與 Struct 的差異，以下是筆記。

## Class 與 Struct 差異
在程式設計中，Class（類別）和 Struct（結構）是兩種用來定義資料型別的基本構造。了解兩者之間的差異有助於在不同的情境下選擇適當的資料型別。以下將從多個角度來探討它們的不同之處。
![](/image/20240727_01-42-16.png)

### 1. 基本概念與核心差異
- **類別 (Class)：**
  - 參考型別 (Reference Type)
  - 使用堆積記憶體 (Heap Memory)
  - 可以繼承 (支持繼承)
  - 可包含複雜物件與方法

- **結構 (Struct)：**
  - 實值型別 (Value Type)
  - 使用堆疊記憶體 (Stack Memory)
  - 不可以繼承 (不支持繼承)
  - 適合較簡單的資料結構

---

### 2. 記憶體分配
- **類別 (Class)：**
  - 透過 `new` 關鍵字創建實例，分配在堆積上。
  - 擁有較長的生命周期，直到沒有引用指向它們時才會被垃圾回收機制清理。
  
- **結構 (Struct)：**
  - 可以直接創建實例，不需要 `new` 關鍵字，分配在堆疊上。
  - 生命週期較短，當超出作用域時就會被清理。

#### 2-1 創建實例變化
當兩者創建實例時，可以看到他們效果會是一樣內容。
```csharp
var s1 = new sampleClass();
var s3 = new sampleStruct();
s1.Dump("use initial");
s3.Dump("use initial");

class sampleClass
{
	public string name { get; set; } = "conte";
	public int score { get; set; }
}

struct sampleStruct
{
	public sampleStruct() {}
	
	public string name { get; set; }  ="conte";
	public int score { get; set; }
}
```
![](/image/20240727_01-16-05.png)


#### 2-2 default 變化
當使用 default 時，可以看到類別會是 null，結構則是包含者屬性內容，但不會包含著預設參數。
```csharp
sampleClass s2 = default;
sampleStruct s4 = default;
s2.Dump("use default");
s4.Dump("use default");

class sampleClass
{
	public string name { get; set; } = "conte";
	public int score { get; set; }
}

struct sampleStruct
{
	public sampleStruct() {}
	
	public string name { get; set; }  ="conte";
	public int score { get; set; }
}
```

![](/image/20240727_01-18-09.png)


#### 2-3 陣列變化
陣列便會就會比較有趣一點，可以看到類別的陣列會是 null，結構則是包含者屬性內容，但不會包含著預設參數。
```csharp
var s1 = new sampleClass[5];
var s3 = new sampleStruct[5];
s1.Dump("use initial");
s3.Dump("use initial");
```
![](/image/20240727_01-23-15.png)

#### 2-4 變數 Equals 比較
以下結果可以讓各位讀者知道什麼叫做參考型別和實值型別。

- 參考型別 : 會比較記憶體位置，因此兩個變數會是相等。
- 實質型別 : 會比較內容，因此兩個變數會是不相等。

因此可以看到類別的 s1 和 s2 是相等的，結構的 s3 和 s4 是不相等的。

```csharp
var s1 = new sampleClass();
var s3 = new sampleStruct();

var s2 = s1;
s2.name = "json";

var s4 = s3;
s4.name = "joh";

("use class. state:" + (s1.Equals(s2))).Dump();
s1.Dump();
s2.Dump();
("use struct.  state:" + (s3.Equals(s4))).Dump();
s3.Dump();
s4.Dump();
```

![](/image/20240727_01-35-08.png)

---

### 3. 性能與應用場合
- **類別 (Class)：**
  - 適合處理複雜的資料結構和需要大量屬性及方法的物件。
  - 因為是參考型別，引用的傳遞成本較低，但需注意多執行緒下的同步問題。

- **結構 (Struct)：**
  - 適合簡單且頻繁使用的小型資料結構，如數值類型、座標點等。
  - 因為是實值型別，拷貝操作較常見，因此在大型結構體的情況下可能導致性能問題。

### 4. 繼承與多態
- **類別 (Class)：**
  - 支持繼承，可以實現多態和抽象概念的繼承體系。
  - 成員可以是虛擬函數 (virtual function) 或抽象函數 (abstract function)。

- **結構 (Struct)：**
  - 不支持繼承，無法形成繼承體系。
  - 成員不能是虛擬函數或抽象函數。

### 5. 預設存取修飾
- **類別 (Class)：**
  - 成員預設為私有 (private)，需顯式聲明為公共 (public) 才能被外部訪問。

- **結構 (Struct)：**
  - 成員預設為公共 (public)，無需特別聲明即能被外部訪問。

### 6. 使用情境
- **類別 (Class)：**
  - 當需要管理複雜的狀態或行為時，如人、車輛等。
  - 需要使用繼承和多態時。

- **結構 (Struct)：**
  - 當需要高效的頻繁資料操作時，如數學計算中的向量、矩陣等。
  - 簡單且邏輯上表示單一值的資料結構，如座標點、顏色值等。

### 比較表
| 特性           | 類別 (Class)                             | 結構 (Struct)                      |
| -------------- | --------------------------------------- | ---------------------------------- |
| 型別           | 參考型別 (Reference Type)               | 實值型別 (Value Type)              |
| 記憶體分配     | 堆積 (Heap)                             | 堆疊 (Stack)                       |
| 支持繼承       | 是                                      | 否                                 |
| 預設存取修飾   | 私有 (Private)                          | 公共 (Public)                      |
| 使用場景       | 複雜物件、需要繼承/多態的情況          | 短期存在、頻繁操作的簡單資料結構  |
