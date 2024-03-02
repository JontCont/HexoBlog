---
title: 【Git】活用Git與Azure DevOps(三) - Board 讓Issue、Task、Bug更有條理
date: 2024-02-03 09:10:30
categories:
  - DevOps
tags:
  - DevOps
cover: /image/20230310_08-44-55.png
---

## 一、DevOps Board

使用 DevOps Board 可以針對 Task、Issue、Bug 進行管理，並且可以進行排序、篩選、分類等等的操作，讓開發流程更有條理。這工具不但可以免費也包含 Test Case 管理、Dashboard 等等功能，是一個非常好用的工具。

### 1-1 Backlog 看資料

很多時候為了看重點資料，通常會使用 Backlog 進行篩選，從圖片利用 User Story 往下展出 Task、Bug、Issue 進行篩選，可以看到不同的資料。如果利用 User Story 當作開發功能模組，底下 User、QA 等可以進行 Task 的分配，這樣就可以讓開發流程更有條理。
![](/image/20240219_21-37-15.png)

### 1-2 Board 設定工作項目

從看板我們可以設定 Task、Bug、Issue 以外還可以設定 Test 。Test 創建後可以轉變成 Test Case 進行管理。
![](/image/20240219_21-55-50.png)

#### 1-3 Test Case

Test Case 從 Boards 創建一個 User Story > 加入 Test > 創建測試案例，點選案例名稱就會導入在編輯畫面。透過編輯畫面可以設定測試案例的步驟、預期結果、備註等等。
![](/image/20240219_22-48-34.png)
![](/image/20240219_22-45-39.png)

當設定好測試腳本後，可以進入 Run Test 可以把剛才的腳本一筆筆測試、執行，若遇到錯誤可以直接在此畫面進行錯誤回報。
![](/image/20240219_22-33-29.png)
![](/image/20240219_22-46-23.png)

回報錯誤可以透過上面選項選擇 Create Bug，上面有其他上傳只有檔案可以使用其餘功能需要付費方式才能解決需求。
![](/image/20240219_22-56-04.png)

## 二、Test Plan

### 2-1 Test Plans

從這裡面清單當中可以看到所有測試案例，可以透過這個畫面進行測試案例的管理。
![](/image/20240219_22-59-57.png)

### 2-2 Progress report

不單只有清單可以看內建功能還有報表可以觀看，可以透過案例知道 Bug 遇到的問題，進行修正。
![](/image/20240219_23-03-00.png)