---
title: C# NPOI (二) - 使用NPOI 處理 word 套版
categories: 
  - 後端技術
  - C#
  - Package
tags: 
  - C#
description:
cover: /image/20230207_22-55-25.png
---
# 使用NPOI
目前使用npoi功能延伸使用方式，套版是最多人需要使用的部分，這邊只有簡述如何使用。
如果有需要詳細使用方式，歡迎在下方留言。
環境部分 ，我使用 Asp.Net Core Mvc ，這位可以自行使用自己的環境測試。

## Install
請各位讀者自行取用，這部分可以用NuGet找到NPOI。
https://www.nuget.org/packages/NPOI/

## 創建Word
[下載點](/upload/template/word_npoi_temp.docx)

這邊範例使用table以及一般輸入行數。
 
## 讀取、下載
功能未齊全狀況下，我們先把讀取文件、下載部分做出來。
```cs
public async Task<IActionResult> Index()
{
    string docxPath = _env.WebRootPath + "\\upload\\template.docx";
    if (System.IO.File.Exists(docxPath))
    {
        return await Download(docxPath); 
    }
    return View();
}

public async Task<IActionResult> DownloadAsync(string filePath)
{
    var memoryStream = new MemoryStream();
    using (var stream = new FileStream(filePath, FileMode.Open))
    {
        await stream.CopyToAsync(memoryStream);
    }
    memoryStream.Seek(0, SeekOrigin.Begin);
    return new FileStreamResult(memoryStream, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
}
```

## 抓取方式

### 抓取一般的行數
NPOI在這function中不會是有table，所以可以觀察到table是沒有執行成功。
```cs
FileStream fs = new (docxPath, FileMode.Open, FileAccess.Read);
XWPFDocument docx = new (fs);
foreach (var para in docx.Paragraphs)
{
    string oldtext = para.ParagraphText;
    string newText = "測試欄位";
    if (oldtext == "") continue;

    string temptext = para.ParagraphText;
    //以下為替換文件模版中的關鍵字
    if (temptext.Contains("[$name$]"))
        temptext = temptext.Replace("[$name$]", newText);
    para.ReplaceText(oldtext, temptext);
}
```

### 抓取TABLE
這邊先用很簡單方式使用，請各位不要按照這暴力方式直接使用他。
```cs
FileStream fs = new (docxPath, FileMode.Open, FileAccess.Read);
XWPFDocument docx = new (fs);
foreach (XWPFTable dt in docx.Tables)
{
    foreach (XWPFTableRow dr in dt.Rows)
    {
        foreach (XWPFTableCell dc in dr.GetTableICells())
        {
            foreach (var para in dc.Paragraphs)
            {
                string oldtext = para.ParagraphText;
                string newText = "測試欄位";
                if (oldtext == "")
                    continue;
                string temptext = para.ParagraphText;
                //以下為替換文件模版中的關鍵字
                if (temptext.Contains("[$name$]"))
                    temptext = temptext.Replace("[$name$]", newText);
                para.ReplaceText(oldtext, temptext);
            }
        }
    }
}
```

###  使用type方式取用
當然可以不用一個一個把Index function寫一堆迴圈，可以使用```docx.BodyElements```取出，可以直接得知body裡面是TABLE、PARAGRAPH、CONTENTCONTROL。

```cs
public IActionResult Index()
{
    string docxPath = _env.WebRootPath + "\\upload\\template.docx";
    if (System.IO.File.Exists(docxPath))
    {
        FileStream fs = new (docxPath, FileMode.Open, FileAccess.Read);
        XWPFDocument docx = new (fs);
        foreach (var bodyItem in docx.BodyElements)
        {
            switch (bodyItem.ElementType)
            {
                case BodyElementType.TABLE:
                    Set_DocxTableText(bodyItem.Body);
                    break;
                case BodyElementType.PARAGRAPH:
                    Set_DocxText(bodyItem.Body);
                    break;
                case BodyElementType.CONTENTCONTROL:break;
                default:break;
            }
        }
        return Download(docx); 
    }
    return View();
}

public void Set_DocxText(IBody docx)
{
    foreach (var para in docx.Paragraphs)
    {
        string oldtext = para.ParagraphText;
        string newText = "測試欄位";
        if (oldtext == "")
            continue;
        string temptext = para.ParagraphText;
        //以下為替換文件模版中的關鍵字
        if (temptext.Contains("[$name$]"))
            temptext = temptext.Replace("[$name$]", newText);
        para.ReplaceText(oldtext, temptext);
    }
}

public void Set_DocxTableText(IBody docx)
{
    foreach (XWPFTable dt in docx.Tables)
    {
        foreach (XWPFTableRow dr in dt.Rows)
        {
            foreach (XWPFTableCell dc in dr.GetTableICells())
            {
                foreach (var para in dc.Paragraphs)
                {
                    string oldtext = para.ParagraphText;
                    string newText = "測試欄位";
                    if (oldtext == "")
                        continue;
                    string temptext = para.ParagraphText;
                    //以下為替換文件模版中的關鍵字
                    if (temptext.Contains("[$name$]"))
                        temptext = temptext.Replace("[$name$]", newText);
                    para.ReplaceText(oldtext, temptext);
                }
            }
        }
    }
}

public IActionResult Download(XWPFDocument fs)
{
    var memoryStream = new MemoryStream();
    fs.Write(memoryStream);
    memoryStream.Seek(0, SeekOrigin.Begin);
    // 回傳檔案到 Client 需要附上 Content Type，否則瀏覽器會解析失敗。
    return new FileStreamResult(memoryStream, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
}
```

