---
title: (筆記) VSC - Markdown PasteImage
categories: 
  - 筆記 
  - 生活雜記
tags: 
  - VSC
description:
cover: /img/Note/other/20221001_11-35-37.png
---

VSC MarkDown 有提供截圖工具 Markdown PasteImage，近期需要即時貼上圖片會方便許多，簡單簡述Markdown PasteImage 使用方式。

## [Markdown PasteImage](https://marketplace.visualstudio.com/items?itemName=telesoho.vscode-markdown-paste-image)
Markdown PasteImage 與其他Paste Images 不同可以快速貼上圖片(無提示視窗ex: path 存放位置)。

## 使用方式
通過按"Ctrl+Alt+V"或是指令方式 ``` markdown paste``` (備註 Mac: "Cmd+Alt+V")

## 配置
### 預定義變量
- ${workspaceRoot} : 在 VS Code 中打開的文件夾的路徑
- ${fileWorkspaceFolder} : 當前打開文件的工作區文件夾
- ${fileBasename} : 當前打開文件的基本名稱
- ${fileBasenameNoExtension} : 當前打開的文件的基本名稱，沒有文件擴展名
- ${fileExtname} : 當前打開文件的擴展名
- ${fileDirname} : 當前打開文件的目錄名
- ${datetime} : 當前日期和時間格式化為"yyyyMMDDHHmmss"

### 設定清單
- MarkdownPaste.path 
- MarkdownPaste.nameBase
- MarkdownPaste.namePrefix
- MarkdownPaste.nameSuffix
- MarkdownPaste.silence
- MarkdownPaste.enableImgTag
- MarkdownPaste.encodePath
- MarkdownPaste.rules
- MarkdownPaste.lang_rules

詳細內容請參閱 [vscode-markdown-paste-image](https://github.com/telesoho/vscode-markdown-paste-image)


## 使用方式
MarkdownPaste.path 是儲存路徑，必須要指向你要指定的位置。pasteImage.insertPattern 則是呈現路徑，意思是可以變更Markdown Image Path 。參考如下
```json
{
    "pasteImage.defaultName": "YYYYMMDD_HH-mm-ss",
    "pasteImage.path": "${currentFileDir}../../../img/Note/other/",
    "pasteImage.insertPattern": "${imageSyntaxPrefix}/img/Note/other/${imageFileName}${imageSyntaxSuffix}",
}
```

---
### 參考文件
-[VSCode Paste Image 设置](https://blog.51cto.com/u_15127700/4163443)



