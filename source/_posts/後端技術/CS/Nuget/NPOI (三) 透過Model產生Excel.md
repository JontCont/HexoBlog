---
title: 【C#】NPOI (三) 寫入 Excel
date: 2023-10-15 22:55:25
categories: 
  - 後端技術
  - C#
  - Package
tags: 
  - C#
description:
cover: /img/dotnet/cs_package_npoi/bg.png
---

近期會去整理一下歷經多年的NPOI文章，意外露寫了一小段章節。因此，我這邊特別把這段章節補完整一點，讓Excel的讀寫可以更加完整。


## Excel 寫入
Excel 在 NPOI 時候，必須知道自己的Excel 版本需要使用哪個版本、Sheet 頁面要用幾個、畫面樣式之類問題。這篇只著重Excel 匯出Table 方式，如果要參考寫入哪個Sheet 歡迎參考```【C#】NPOI (一) 如何使用NPOI Excel```。


### 設定情境
創建 table 方式有很多種，這邊設計我會依據 list 泛型的方式，來解決table 的問題。

首先，我們先創建一個 class，裡面有一些屬性，用來存放資料。因為只需要簡單例子就不用創太多了。
```cs
    public class Demo
    {
        [DisplayName("名稱")]
        public string name { get; set; }

        [DisplayName("日期")]
        public DateTime date { get; set; }
    }
```

上面我利用 DisplayName 方式命名欄位名稱，最主要用意是讓他當table title (columns)，這樣就不用再另外寫一個title list 了。

### Function 寫法
method 用簡單的 row 以及 columns 來源即可，row 代表為 ```List<T>``` columns ```T```就好。這裡依據需求做調整。
```cs
void ExportExcel<T>(List<T> data)
{

}
```

### 創建 Table Columns 
首先，我們要設定出 Sheet 在處理 columns ，columns 直接使用 T 裡面的 ```GetProperties()``` 可以取出 Attribute。
```cs
  //建立excel檔案物件
  IWorkbook workbook = new XSSFWorkbook();
  ISheet sheet = (XSSFSheet)workbook.CreateSheet("Default");
  Type header = typeof(T);

```

下方作法是沒有取得到 DisplayName 就直接取得本身屬性名稱。
```cs
  //製作header
  IRow headers = (XSSFRow)sheet.CreateRow(0);
  if (header.GetType().GetProperties().Any())
  {
      int index = 0;
      foreach (var propertyInfo in header.GetProperties())
      {
          var colName = propertyInfo.GetCustomAttribute<DisplayNameAttribute>()?.DisplayName ?? propertyInfo.Name;
          headers.CreateCell(index).SetCellValue(colName);
          index++;
      }
  }
```

### 創建 Table Rows
創建完成columns後，list 只要處理資料面問題就好。

下方範例當中，我使用```Select``` 來取得資料，並且使用```index``` 來當作 row 的位置，這樣就不用再另外寫一個```for```迴圈了。留意一下```CreateRow(items.index + 1)``` 這段問題，若columns 不是 0 情況下要記得調整。

> 備註 : 不論是 foreach 或是 ForEach 之類的迴圈，之前需要從Select 取得index 才會出現。
```cs
if (data.Any())
{
    foreach (var items in data.Select((row, index) => new { row, index }))
    {
        var item = items.row;
        IRow row = (XSSFRow)sheet.CreateRow(items.index + 1);
        foreach (var prop in item.GetType().GetProperties().Select((data, index) => new { data, index }))
        {
            var values = prop.data.GetValue(item);
            row.CreateCell(prop.index).SetCellValue(values.ToString());
        }
    }
}
```

### 下載動作
```cs
using (var fs = new FileStream("Sample.xlsx", FileMode.Create, FileAccess.Write))
{
    workbook.Write(fs);
}
```

---
## 結論
以上作法為簡單寫入到Excel，這問題會因 model 而有所不同，若需要客製化可以考慮多加入Attribute 來處理。

---
## 參考文件
1. [Github 範例](https://github.com/JontCont/NPOI-ExportDemo)
