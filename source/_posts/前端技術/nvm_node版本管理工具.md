---
title: nvm-node版本管理工具
date: 2023-07-18
categories: 
  - 前端技術
tags: 
  - Node
description:
keyword: 'node, js  ,Node Version Manager'
cover: /image/20230725_21-23-36.png
---

## 前言
在開發Node.js的過程中，我們經常會面臨版本管理的問題。不同的專案可能需要使用不同的Node.js版本，這時候我們可以使用一個稱為Node Version Manager（nvm）的工具來管理Node.js版本，輕鬆在不同的專案中切換所需的Node.js版本。

## 一、Node Version Manager (nvm)
### 1-1 簡介
Node Version Manager (nvm) 是一個功能強大的Node.js版本管理工具，它可以讓我們在同一台電腦上安裝並管理多個Node.js版本。這意味著你可以在不同的專案中使用不同的Node.js版本，而無需全局改變你的系統環境。


### 1-2 前置作業
在開始使用nvm之前，請確保你已經安裝了Git。你可以在 Node Version Manager 的 GitHub 頁面 上找到相關資訊。
- Github : [Node Version Manager](https://github.com/nvm-sh/nvm)

如果你使用的是Linux系統，可以從 Node Version Manager 的 Linux Release 頁面 下載nvm。
- Release (Linux) : [Node Version Manager](https://github.com/nvm-sh/nvm/releases)
對於Windows用戶，可以從 Node Version Manager 的 Windows Release 頁面 下載nvm。
- Release (Windows) : [Node Version Manager](https://github.com/coreybutler/nvm-windows/releases)

## 二、安裝
在開始安裝之前，如果你已經安裝了全局的Node.js版本，建議先將其移除，以免產生衝突。

### 2-1 下載nvm-setup.exe並安裝
下載並運行 nvm-setup.exe 安裝程式，安裝完成後，你需要記住以下兩個重要的路徑：

```cmd
//--- nvm ---//
C:\Users\你的用戶名\AppData\Roaming\nvm

//--- node ---//
C:\Program Files\nodejs
```

![](/image/20230725_21-42-42.png)

### 2-2 開啟 nvm 、查看版本
安裝完成後，你可以在命令提示符號（Command Prompt）中輸入以下指令來查看 nvm 的版本：

```cmd
//--- 查看版本 ---//
nvm version
```

## 三、使用 nvm
### 3-1 安裝最新版本
```cmd
//--- 安裝最新版本 ---//
nvm install latest
```

### 3-2 安裝指定版本
```cmd
//--- 安裝指定版本 ---//
nvm install 14.17.3
```

### 3-3 查看已安裝版本以及使用版本
```cmd
//--- 查看已安裝版本 ---//
nvm list
```
![](/image/20230725_21-50-32.png)

現在，你已經學會了如何使用 Node Version Manager（nvm）來管理你的 Node.js 版本。這將使你在開發不同專案時更加靈活和方便，並確保你能夠使用最新的Node.js功能和修復錯誤。快樂地開發吧！