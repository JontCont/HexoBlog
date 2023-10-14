---
title: 【Windows】出現警告「找不到該資料夾路徑」，文件內容都是顯示0KB，無論如何無法刪除
date: 2023-04-02 19:54:58
categories: 
  - 筆記 
  - 生活雜記
tags: 
  - C#
description:
cover: /image/20230402_19-54-58.png
---
## 問題
"引用3C硬炫風強尼圖片"
![](/image/20230402_19-54-58.png)

遇到問題是 永久刪除、重新開機、系統管理刪除等無法正常刪除，需要用以下作法有機會解決。

## 解決方式
1. 創建 "文件文件.txt"
2. 內容輸入
```bat
DEL /F /A /Q \\?\%1
RD /S /Q \\?\%1
```
3. 另存新檔為 "刪除工具.bat"
4. 將要刪除的檔案拖曳到"刪除工具.bat"


相關文件 : [https://www.e-show.tw/module/pageinfo/3.html](https://www.e-show.tw/module/pageinfo/3.html)