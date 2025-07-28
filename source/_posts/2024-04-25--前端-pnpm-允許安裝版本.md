---
title: 【前端】pnpm 允許安裝版本
date: 2024-04-25 21:23:36
categories: 
  - 前端技術
tags: 
  - pnpm
  - npm
description:
keyword: 'npm, pnpm, package manager'
---

## 前言
最近使用 pnpm 時候看了一下官方文件後，驚覺之前寫的 [pnpm vs npm] 有一個錯誤的地方，因此決定來做一個補充。

---

### 安裝版本
官方有特別指出，Node 版本會依據下面版本決定要安裝的 pnpm 版本，如下：
![](/image/20240425_11-36-40.png)


因此，之前所說只能使用 node 16是錯誤訊息，事實上是可以使用 node 14 以上版本，只是只能使用 pnpm 7 版本。

---

### 安裝方式
npm 官網 : [點選我](https://www.npmjs.com/package/pnpm/v/7.30.0-0?activeTab=versions)

到npm 位置後，選擇你要的板號後，複製指令，如下：
(建議自行補一個 -g 來全域安裝)
```cmd
npm i pnpm@7.30.0-0 -g
```

---

### 如果使用 nvm 管理 node 版本
如果你使用 nvm 來管理 node 版本，可以使用下面指令來安裝 pnpm：
```cmd
nvm install 14
nvm use 14
npm i pnpm@7.30.0-0 -g
```

