---
title: Playwright 自動化腳本無寫程式碼使用方式 (三) - Inspector 功能
date: 2024-07-26 10:51:23
categories: 
  - DevOps
  - Playwright
tags: 
  - Playwright
description:
keyword: 'Playwright'
cover: /image/20240720_23-44-39.png
---

## 前言

上篇已經教導 Playwright 基礎使用方式，包含 VS Code 內的功能，接下來會簡單介紹 Inspector 功能。

---

### 一、Inspector 功能

Playwright Inspector 是一個 GUI 工具，專門用來幫助開發人員調試 Playwright 測試。它提供了以下功能

1. 步過測試: 可以逐步執行測試，查看每一步的執行情況。
2. 即時編輯locator: 允許開發人員在調試過程中即時編輯locator。
3. 選擇target: 可以直接選擇頁面上的target，有不同語言產生內容。
4. 查看行為日誌: 顯示每個操作的行為日誌，幫助分析和辨識問題。

![Inspector 介面](/image/20240725_22-30-34.png)

#### 1-1 Inspector 開啟方式

開啟方式有兩種，一種是透過 CLI 開啟，另一種是透過 VS Code 開啟。
![](/image/20240725_23-34-56.png)

---
### 二、 Inspector 介面/使用方式

這邊功能其實與上一章節的功能相同，不同處是他可以改 Target 更改語言，並且可以即時編輯 Locator。

#### 2-1 Target 選擇

以下為 Inspector Target 選擇語言功能，可以選擇這幾些語言產生內容。
![](/image/20240725_23-29-25.png)

#### 2-2 Debug Tools

Inspector 有提供 Debug Tools 功能，可以查看 Log。
![](/image/20240725_23-31-37.png)

---

### 三、 Inspector CLI
1. 開啟 Inspector 介面 : ```npx playwright test "test-1.spec.ts"  --debug```
2. 指定 test function : ```npx playwright test "test-1.spec.ts" -g "sample$" --debug```
3. 不開啟報告 : ```npx playwright test "test-1.spec.ts" -g "sample$" --debug --reporter=null```

