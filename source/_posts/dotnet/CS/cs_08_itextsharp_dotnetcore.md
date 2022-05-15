---
title: C# itextsharp 套件 - 創建PDF 神器
categories: 
  - dotnet
  - C#
  - package
tags: 
  - C#
  - VSC
description:
keyword: 'C#,Net5,VSC'
cover: /img/dotnet/bg/cs_bg_002.png
---

## 前言 
PDF 不論甚麼場合都需要使用，包含公司都會需要有PDF轉出轉入的工具，這邊使用PDF轉檔進行作業。


# iTextSharp
本函式庫原名是iText，主要是支援Java程式語言。之後針對Microsoft .NET C # 做了一個版本。

## 一、 初始設定
製作方式需要新增 ```Document ```內部內容都會以Document 才新增、寫入。
以下就是初始化設定。
```cs
    //設定PageSize
    //Margin: left, right, top, bottom
    Document doc = new Document(PageSize.A4, 20, 20, 50, 50); 

    //設定 Stream
    MemoryStream ms = new MemoryStream();
    PdfWriter.GetInstance(doc, ms).CloseStream = false;

    doc.Open();
    //內容
    doc.Close();

```
如果少掉 ```CloseStream``` 會遇到 ```cannot access a closed Stream```問題，所以必須要小心。

## 二、 設定文字內容
一般輸出文字會需要有標題、內容，這便需要使用 Paragraph 儲存文字。以下使用方式。

```cs
  //註冊Encode
  Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

  //設定 Font
  BaseFont bfChinese = BaseFont.CreateFont(_hostEnvironment.WebRootPath + "\\font\\KAIU.TTF", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
  //設定 Font (給粗體用)
  BaseFont chBaseFont = BaseFont.CreateFont(_hostEnvironment.WebRootPath + "\\font\\KAIU.TTF", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
  Font ChFont = new Font(bfChinese, 12);
```

iTextSharp 提供兩個類別 ```  Paragraph``` 、``` Chunk```，如果要單獨設定Font內容也可以。
### 2-1 Font
```cs
  //粗體
  Font CbFont = new Font(bfChinese, 12,1);
  //斜體
  Font CbFont = new Font(bfChinese, 12,2);

```

### 2-2 Paragraph
```cs
  Paragraph title = new Paragraph("This Title Area",ChFont);

  //字行位置
  title.Alignment = Element.ALIGN_CENTER;
  //行距
  title.Leading = 10;
  //上下空白
  title.SpacingAfter =50;
  title.SpacingBefore =50;

  //左右
  title.IndentationLeft=50;
  title.IndentationRight=50;

  //第一個空白
  title.FirstLineIndent =50;
```

### 2-3 Chunk
```cs
  Chunk chunk = new Chunk("測試底線文字", CbFont);
  chunk.SetUnderline(0.2f, -2f);
  doc.Add(chunk);
```

### 2-4 Error : 'windows-1252' is not a supported encoding name.
[System.Text.Encoding.CodePages v5.0.0 ] : https://www.nuget.org/packages/System.Text.Encoding.CodePages/5.0.0



## 三、 設定表格 
創建表格是常常需要再Pdf 去設定，如何去使用這個必須要先知道你要幾個table欄位。

### 3-1 一般表格
下方用很簡單範例執行。
```cs
//創建3行
PdfPTable pt = new PdfPTable(3);
pt.AddCell(new PdfPCell(new Phrase($" 第三欄 ",ChFont)){ Colspan=3 });
//產生 table
for(int i = 1 ; i <= 3;++i){
    for(int j = 1 ; j <= 3;++j){
        Phrase text =  new Phrase($"line{i},cell{j}");
        PdfPCell cell= new PdfPCell(text);
        pt.AddCell(cell);
    }
}
doc.Add(new Paragraph(){pt});
``` 

使用概念:
1. Phrase : 儲存文字，如果有中文字眼記得要加入剛才的```Font```。
2. PdfPCell : 這邊是儲存cell方式(單欄)。後面可以細項設定，目前不用設定時候就會比較單存一點。
3. AddCell : 加入單欄內容。

![](/img/dotnet/cs/cs_itext_001.png)

### 3-2 客製表格
如果要自定義方式，可以參考下方。設定table 一定會用到
1. Colspan : 行合併 
2. Rowspan : 列合併

```cs
  PdfPTable pt = new PdfPTable(3);
  pt.AddCell(new PdfPCell(new Phrase($" 所有第三欄合併 ",ChFont)){ Colspan=3 });
  for(int i = 1 ; i <= 3;++i){
      for(int j = 1 ; j <= 3;++j){
          Phrase text =  new Phrase($"line{i},cell{j}");
          PdfPCell cell= new PdfPCell(text);
          //防止有重複設定
          if(i != 1 && j == 3 ) { continue;}
          //第三欄全部合併
          if(j == 3 ){
              pt.AddCell(new PdfPCell(new Phrase($"cell{j}")){ Rowspan=3 });
              continue;
          }
          //font
          pt.AddCell(cell);
      }
  }
  doc.Add(new Paragraph(){pt});
```
![](/img/dotnet/cs/cs_itext_002.png)

### 3-3 使用建議
如果第一次使用可以使用下方方式，一行一行創建可以知道使用方式。按照上方範例呈現方式會像下方一樣，概念是合併不能出現下一行，不然就會有多個 Rows畫面。

```cs
    pt.AddCell(new PdfPCell(new Phrase($"line 1,cell 1")));
    pt.AddCell(new PdfPCell(new Phrase($"line 1,cell 2")));
    pt.AddCell(new PdfPCell(new Phrase($"line 1,cell 3")){ Rowspan=3 });

    pt.AddCell(new PdfPCell(new Phrase($"line 2,cell 1")));
    pt.AddCell(new PdfPCell(new Phrase($"line 2,cell 2")));

    pt.AddCell(new PdfPCell(new Phrase($"line 3,cell 1")));
    pt.AddCell(new PdfPCell(new Phrase($"line 3,cell 2")));
```

## 四、 預覽效果
下方為預覽效果，僅供參閱。
```cs
  public IActionResult Preview(){
    Document doc = new Document(PageSize.A4);
    MemoryStream ms = new MemoryStream();
    PdfWriter.GetInstance(doc, ms).CloseStream = false;

    doc.Open();
    ...
    ...
    doc.Close();
            
    ms.Seek(0, SeekOrigin.Begin);
    return new FileStreamResult(ms, "application/pdf");
  }
```


---


# 結論
使用 iTextSharp 就到這邊，目前遇到只有這幾些，使用 tables 還沒搞清楚先後順序，可能會卡非常久。






