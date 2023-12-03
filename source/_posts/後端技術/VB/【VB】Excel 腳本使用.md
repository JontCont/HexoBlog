---
title: 【VB】VBA 腳本使用 - 加入SHA 加密
date: 2023-12-03 16:34:53
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

## 一、VBA 腳本使用
### 1. 啟動Excel並打開VBA
首先按下```Alt + F11```，進入VBA編輯器，然後在左側的專案總管中，選擇```這台電腦```，右鍵選擇```插入```，選擇```模組```，即可進入VBA編輯器。

---

## 二、使用 SHA 加密製作
### 1. 加入SHA 加密Function 
```vb
Public Function SHA1Hash(sIn As String, Optional bB64 As Boolean = 0) As String
    Dim oT As Object, oSHA1 As Object
    Dim TextToHash() As Byte
    Dim bytes() As Byte
            
    Set oT = CreateObject("System.Text.UTF8Encoding")
    Set oSHA1 = CreateObject("System.Security.Cryptography.SHA1Managed")
    
    TextToHash = oT.Getbytes_4(sIn)
    bytes = oSHA1.ComputeHash_2((TextToHash))
        
    If bB64 = True Then
       SHA1Hash = ConvToBase64String(bytes)
    Else
       SHA1Hash = ConvToHexString(bytes)
    End If
            
    Set oT = Nothing
    Set oSHA1 = Nothing
End Function
```

### 2. 加入巨集測試
```vb
Sub Test()
    Dim sIn As String, b64 As Boolean
    Dim sH As String
    sIn = "123456"
    b64 = True   'output base-64
    sH = SHA1Hash(sIn, b64)
    Debug.Print vbNewLine & vbNewLine & sH & vbNewLine & Len(sH) & " characters in length"
End Sub
```
![](/image/20231203_14-15-22.png)
![](/image/20231203_14-15-37.png)

### 3. 加入在 Excel 中使用
```=SHA1Hash(D2,C2)``` 加入在 Excel 中使用
![](/image/20231203_14-19-54.png)