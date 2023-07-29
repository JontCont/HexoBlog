---
title: nvm-node版本管理工具
categories: 
  - 前端技術
tags: 
  - Node
description:
keyword: 'node, js  ,Node Version Manager'
cover: /image/20230725_21-23-36.png
---

# 前言
在開發Node.js的時候，常常會遇到版本不同的問題，這時，我們可以使用nvm來管理Node.js的版本，讓我們可以在不同的專案中使用不同的版本。

# Node Version Manager
## 簡介
Node Version Manager (nvm) 是一個 Node.js 版本管理工具，可以讓你在同一台電腦上安裝多個 Node.js 版本，並且可以隨意切換使用的版本。

## 前置作業
Github : [Node Version Manager](https://github.com/nvm-sh/nvm)
Release (Linux) : [Node Version Manager](https://github.com/nvm-sh/nvm/releases)
Release (Windows) : [Node Version Manager](https://github.com/coreybutler/nvm-windows/releases)

## 安裝
備註 : 如果本身有安裝 node.js 請先移除。

### 1. 下載nvm-setup.exe並安裝
下方資訊紀錄 nvm 、node版本路徑務必記住。
```cmd
//--- nvm ---//
C:\Users\UserName\AppData\Roaming\nvm

//--- node ---//
C:\Program Files\nodejs
```
![](/image/20230725_21-42-42.png)

### 2. 開啟 nvm 、查看版本
```cmd
//--- 查看版本 ---//
nvm version
```

## 使用 nvm
### 安裝最新版本
```cmd
//--- 安裝最新版本 ---//
nvm install latest
```

### 安裝指定版本
```cmd
//--- 安裝指定版本 ---//
nvm install 14.17.3
```

### 查看已安裝版本以及使用版本
```cmd
//--- 查看已安裝版本 ---//
nvm list
```
![](/image/20230725_21-50-32.png)