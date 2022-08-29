---
title: (筆記) IIS - 排除 "APK檔案無法下載"
categories: 
  - other
tags: 
  - iis
description:
cover: /img/Note/IIS/bg_2_0.png

---


## 紀錄目的
若遇到APK檔案無法下載時候，先確認IIS中的MIME是否有設定。
![](/img/Note/IIS/bg_2_0.png)


## 使用方式
按下新增按鈕後，打下方提供的字輸入在MIME類型中，記得副檔名要打.apk 才會生效。
```MIME
application/vnd.android.package-archive
```
![](/img/Note/IIS/2_1.png)

## 備註 
網際網路媒體型別(Internet media type)

原名叫“Type MIME”或“MIME”或在頭資訊中各種協議之後的內容種類(Content-type),他有兩部分用來在Internet上鑑別資料格式。
一個Type MIME至少包括兩個部分:一個型別和一個子型別和一個或多個其他需要的引數。
引數要求一個Uri 和一個網際網路媒體型別,返回一個Intent物件。通過setDataAndType  就可以實現更新,下載,開啟新應用等功能。
P.S. APK 檔案基於 ZIP 檔案格式，它與JAR檔案的構造方式相似。它的網際網路媒體類型是：application/vnd.android.package-archive
