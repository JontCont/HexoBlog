---
title: 【筆記】VSC - 將 OhMyPosh 加入終端機內
date: 2023-12-31 18:50:10
categories: 
  - 筆記 
  - 生活雜記
tags: 
  - vsc
  - OhMyPosh
  - PowerShell
cover: /image/20231223_18-48-56.png
---

## 前言
近期為了要解決終端機的問題，因為 VSC 讀出來的OhMyPosh的字體都是亂碼，所以我就想說要解決這個問題，所以就找到了解決方案，這邊就紀錄一下。

相關文章 : https://blog.miniasp.com/post/2021/11/24/PowerShell-prompt-with-Oh-My-Posh-and-Windows-Terminal

## 亂碼原因
從保哥的文章中，可以看到原因是因為字體的問題，原初是使用指令方式下載字體，實際上沒有到字體的地方，所以就會出現亂碼的問題。

#### 解決方式
從Github 社群上已經有人提供了解決方式，可以用這裡的下載點下載字體。
1. [Caskaydia NF](/upload/zip/Caskaydia Cove Nerd Font Complete Windows Compatible Regular.otf)
2. [Github Issue](https://github.com/ryanoasis/nerd-fonts/issues/785)

若按裝好字體後與下圖一樣動作即可，就可以解決亂碼問題了。
![](/image/20231231_18-46-41.png)
