---
title: C# NPOI (一) - 如何使用NPOI Excel 
categories: 
  - dotnet
  - C#
  - package
tags: 
  - C#
  - core
description:
cover: /img/dotnet/cs_package_npoi/bg.png
---


# NPOI  
NPOI中N指代的是.Net，POI是一個完全開源的Java寫成的庫，能夠在沒有安裝微軟Office或者相應環境的情況下讀寫Excel、Word等微軟OLE2元件文件，幾乎支援所有的Office97~Office2007的檔案格式。所以NPOI就是POI專案的.Net版本。目前NPOI的最新版本是今年5月份釋出的V2.2.1，包含了.Net Framework2和.Net Framework4兩個版本。

## 特點
NPOI 是一個能夠快速讀取與產生Excel檔案的第三方套件，幫助程式開發人員在無安裝Microsoft Office的環境下讀寫Office 97-2003的文件，對於需要產生Excel報表非常好用。NPOI支援的檔案格式處理xls、xlsx外，還包括doc、ppt、vsd等，功能強大。

---

# 使用方式
NPOI可透過兩種方式匯出Excel，一是使用Template，將Excel格式拉好存檔，透過NPOI讀取格式後，再將資料填入並另存新檔。
## EXCEL 分頁
使用前，請引用以下內容
 
```cs
using NPOI.SS.UserModel;
using NPOI.HSSF.UserModel;
using NPOI.XSSF.UserModel;
using System.IO;
```

{% note info flat %}
## HSSF  vs  XSSF 
HSSF中，是使用於2007之前的xls版本。XSSF中，適用於2007及其之後的xlsx版本。
雖然HSSF 只能使用(.xls) ，但可以得知XSSF 是可以使用(.xls)，但可能因為版本問題格式、內容有可能會被損毀。
{% endnote %}

以下程式新建一個Excel 2003 xls和一個2007 xlsx檔案，跟用Office建立的標準Excel格式一樣，每一個Excel檔案初始包含了3個工作表。
以下範例針對顯示分頁內容作排序，當然可以做自訂選擇排序，請讀者自行測試。

```cs
class Page
{
    public string Name { get; set; }
    public int Order { get; set; }
}

public void NPOIprintf()
{
    //自訂 Excel 工作分頁
    List<Page> pages = new List<Page> { 
        new Page { Name = "Sheet1", Order= 1 },
        new Page { Name = "Sheet2", Order= 2 },
        new Page { Name = "Sheet3", Order= 3 },
    };

    //建立分頁
    HSSFWorkbook workbook2003 = HSSFCreateSheet(pages);
    XSSFWorkbook workbook2007 = XSSFCreateSheet(pages);

    //寫入檔案
    Write(workbook2003, @"F:\NPOI_Excel\Excel2003.xls");
    Write(workbook2007, @"F:\NPOI_Excel\Excel2007.xls");
}
```

以下函示範例請自行取用
```cs
/*以下函示*/
private static XSSFWorkbook XSSFCreateSheet(List<Page> datas)
{
    //如果是空值，直接剔除執行
    if (datas == null) { return null; }
    //設定 HSSF
    XSSFWorkbook _XSSF = new();
    //LINQ 排序
    IEnumerable<Page> pages = datas.OrderBy(row => row.Order);
    //設定分頁
    foreach (Page result in pages)
    {
        _XSSF.CreateSheet(result.Name);
    }
    //回傳 HSSFWorkbook
    return _XSSF;
}

private static HSSFWorkbook HSSFCreateSheet(List<Page> datas)
{
    //如果是空值，直接剔除執行
    if (datas == null ) { return null; }
    //設定 HSSF
    HSSFWorkbook _HSSF = new();
    //LINQ 排序
    IEnumerable<Page> pages = datas.OrderBy(row => row.Order);
    //設定分頁
    foreach(Page result in pages)
    {
        _HSSF.CreateSheet(result.Name);
    }
    //回傳 HSSFWorkbook
    return _HSSF;
}

private static void Write(HSSFWorkbook HSSF,string FilePath , string Data="")
{
    FileStream file = new (FilePath, FileMode.Create);
    HSSF.Write(file);
    file.Close();  //關閉檔案流
    HSSF.Close();
}

private static void Write(XSSFWorkbook XSSF, string FilePath, string Data = "")
{
    FileStream file = new(FilePath, FileMode.Create);
    XSSF.Write(file);
    file.Close();  //關閉檔案流
    XSSF.Close();
}
/*以上函示*/
```

## 取得Sheet 名稱
如果要往回抓Sheet 名稱，又不想從 List抓取可以從XSSFWorkbook 、HSSFWorkbook抓取裡面的Sheet Name。
```cs
private static void Get_SheetName(XSSFWorkbook Workbook)
{
    int index = 0;
    while (index < Workbook.NumberOfSheets)
    {
        string sheet =  Workbook.GetSheetName(index);
        Console.WriteLine("Sheet Name : " + sheet.ToString());
        index++;
    }
}
```

## 寫入Excel檔案資料
寫資料要遵循一定的順序，可以概括為：

1. 讀取（或新建一個工作簿）
2. 獲取工作表
3. 對工作表新增行
4. 對每一行新增單元格
5. 對單元格賦值

```cs
public void NPOIRead()
{
    ISheet sheet = ReadSheetAt(@"F:\NPOI_Excel\Excel2007.xlsx", 0);  //獲取第一個工作表
    for (int i = 0; i <= sheet.LastRowNum; i++)  //對工作表每一行
    {
        if (sheet.GetRow(i) == null) { continue; } //若有空就跳過以下執行
        foreach (ICell cell in sheet.GetRow(i))//
        {
            Console.WriteLine(cell);
        }
    }
}

```

ReadSheetAt 內容主要決定使用哪種版本(xls、xlsx)，再回傳Sheet 內容。方法可以使用(.NumberOfSheets)將所有Sheet 取出。

```cs
/*以下函示*/
private static ISheet ReadSheetAt(string fileName, int index)
{
    FileStream fileStream = new(fileName, FileMode.Open, FileAccess.Read);

    IWorkbook workbook = fileName.IndexOf(".xls") > 0 
        ? new HSSFWorkbook(fileStream)// 2003版本 xls資料讀入workbook
        : new XSSFWorkbook(fileStream);// 2007版本xlsx資料讀入workbook

    fileStream.Close();
    return workbook.GetSheetAt(index);
}
/*以上函示*/
```

## 隱藏工作表
如果要隱藏工作表，需要對XSSFWorkbook抓取哪個是要隱藏的工作表。
以下範例只針對最後一比工作表進行隱藏。
```cs
//隱藏最後一個工作表
Workbook.SetSheetHidden(Workbook.NumberOfSheets -1 , true);
```
