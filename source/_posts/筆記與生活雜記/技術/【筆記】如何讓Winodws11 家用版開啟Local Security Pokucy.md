---
title: 【筆記】如何讓Winodws11 家用版開啟本機群組原則編輯器 (Local Group Policy Editor)
date: 2024-06-22 22:54:19
categories: 
  - 筆記 
  - 生活雜記
description:
keyword: 'C#'
cover: /image/20240622_22-55-00.png
---

## 前言
原本我需要把 **檔案總管** 左側icon 移除，發現 Windows 11 家用版沒有 Local Group Policy，需要使用指令列的方式來開啟。

### 一、打開記事本
複製下面的指令列，貼到記事本，存檔為 `LocalGroupPolicy.bat`。
```cmd
@echo off
pushd "%~dp0"
dir /b %SystemRoot%\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientExtensions-Package~3*.mum >List.txt
dir /b %SystemRoot%\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientTools-Package~3*.mum >>List.txt
for /f %%i in ('findstr /i . List.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
del List.txt
pause
```

### 二、以系統管理員身分執行
右鍵 `LocalGroupPolicy.bat` 選擇 `以系統管理員身分執行`，等待安裝完成。

### 三、開啟 Local Security Policy
開啟 `執行` (Windows + R) 輸入 `gpedit.msc`，即可開啟 Local Group Policy Editor。