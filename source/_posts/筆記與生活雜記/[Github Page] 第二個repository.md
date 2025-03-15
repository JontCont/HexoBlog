---
title: '[Github Pages] 如何建立多個專案網站'
categories: 
  - Github
  - Github Pages
tags:
  - Github
description: 本文說明如何在 Github Pages 建立多個專案網站。除了預設的使用者網站(username.github.io)外，每個 repository 都可以設定專屬的 Github Pages，適合用來展示專案成果或建立靜態網站。
cover: /image/20250211_11-34-00.png
---

## 前言

Github Pages 不僅可以建立個人的使用者網站，也支援在不同的 repository 中建立專案網站。本文將介紹如何建立及設定額外的 Github Pages 專案網站。

## Github Pages 設定步驟
### 1. 建立 repository 並使用 Codespace 新增網頁內容

首先建立一個新的 repository，然後使用 Codespace 來編輯網頁內容：

![](/image/20250315_20-18-23.png)
![](/image/20250315_20-19-29.png)

在 Codespace 中，建立一個基本的 index.html 檔案：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Github Pages - Demo</title>
</head>
<body>
    測試畫面
</body>
</html>
```

### 2. 設定 Github Pages

在 repository 的設定中啟用 Github Pages：
1. 前往 repository 的 `Settings` 頁面
2. 在左側選單中找到 `Pages` 選項
3. 在 `Branch` 設定中選擇 `main` 分支
4. 將 `root` 設為網站根目錄
5. 儲存設定

![](/image/20250315_20-21-56.png)
![](/image/20250315_20-24-28.png)

注意事項：
- 設定完成後需要等待幾分鐘，Github 才會完成網站部署
- 您可以在 Pages 設定頁面查看網站部署狀態

![](/image/20250315_20-25-36.png)

### 3. custom domain 設定（選擇性）

如果您有自己的網域，可以透過 custom domain 設定來將網站指向自己的網域。在 repository 的 `Settings` 頁面中，找到 `Custom domain` 選項，輸入您的網域名稱即可。
可以透過 noip.com 來設定免費的網域名稱。

