---
title: 【VB】VBA 基本語法 03 - 錯誤處理、偵錯、其他
date: 2023-12-03 15:12:53
categories: 
  - 後端技術
  - VB
tags: 
  - Excel
  - VBA
description:
keyword: 'Excel,VBA'
cover: /image/20231203_13-19-27.png
# sticky: 1
---

## 如何開啟 VBA 編輯器
首先按下```Alt + F11```，進入VBA編輯器，然後在左側的專案總管中，選擇```這台電腦```，右鍵選擇```插入```，選擇```模組```，即可進入VBA編輯器。

## VBA 基本語法 - 錯誤處理、偵錯、其他
### 一. 錯誤處理
VBA中的錯誤處理有兩種，一種是On Error Resume Next，一種是On Error GoTo。
```vb
' On Error Resume Next
On Error Resume Next
    ' 可能會發生錯誤的程式
On Error GoTo 0
```
```vb
' On Error GoTo
On Error GoTo 錯誤標籤
    ' 可能會發生錯誤的程式
Exit Sub
錯誤標籤:
    ' 錯誤處理程式
End Sub
```
### 二、偵錯
VBA中的偵錯有兩種，一種是設置斷點，一種是使用Debug.Print。
```vb
' 使用Debug.Print
Debug.Print "輸出文字"
```

點選程式碼指定行數【設置斷點】即可
![](/image/20231203_14-01-08.png)

### 三、其他
VBA中的其他有兩種，一種是設置變數類型，一種是設置變數作用域。
```vb
' 設置變數類型
Option Explicit
```
```vb
' 設置變數作用域
Private 變數名稱 As 變數類型
```

--- 

## VBA 常用函數
#### 1. 字串函數
```vb
' 字串長度
Len(字串)
```
```vb
' 字串截取
Mid(字串, 開始位置, 長度)
```
```vb
' 字串替換
Replace(字串, 要替換的字串, 替換後的字串)
```
```vb
' 字串分割
Split(字串, 分割符號)
```
```vb
' 字串轉小寫
LCase(字串)
```
```vb
' 字串轉大寫
UCase(字串)
```
```vb
' 字串去空格
Trim(字串)
```
```vb
' 字串去左空格
LTrim(字串)
```
```vb
' 字串去右空格
RTrim(字串)
```
```vb
' 字串取代
StrConv(字串, vbProperCase)
```
