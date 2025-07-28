---
title: 【Git】活用Git與Azure DevOps(二) - DevOps 權限
date: 2024-02-02 23:00:30
categories:
  - DevOps
tags:
  - DevOps
cover: /image/20230310_08-44-55.png
---

## DevOps 權限
DevOps 有兩個地方設定權限。
1. 組織權限
2. 專案權限

### 一、組織權限
#### 1-1 進入方式
1. 進入組織入口，點選左下角組織設定。
2. 點選使用者並點選加入使用者

![](/image/20240202_23-16-39.png)
![](/image/20240202_23-07-04.png)

#### 1-2 [權限定義 access-level](https://learn.microsoft.com/en-us/azure/devops/organizations/security/access-levels?view=azure-devops)
1. 基本 Basic : 提供對大部分功能的存取，包括專案、存儲庫、建立和管理工作項目、建立和管理管道、建立和管理組織。
2. 專案關係人 Stakeholder : 可指派給無數多個使用者免費使用。此權限不會造成任何費用，但是功能有限。
3. Visual Studio 訂閱者 : 指派給已經有 Visual Studio 訂用帳戶的使用者。
  
詳細內容 : [Azure DevOps 服務的訪問層級](https://learn.microsoft.com/zh-tw/azure/devops/organizations/security/access-levels?view=azure-devops)

---

### 二、專案權限
#### 2-1 進入方式
1. 進入專案入口，點選左下角專案設定。
2. 點選加入團隊(Teams)並且新增團隊
![](/image/20240202_23-24-04.png)

#### 2-2 設定群組權限
設定群組類別位於 【Permissions】位置，可以設定群組的權限。可以設定群組的權限，例如：建立工作項目、建立管道、建立存儲庫等等。
![](/image/20240202_23-26-33.png)

#### 2-3 設定個人權限
設定個人權限類別位於 【Users】位置，可以設定個人的權限。可以設定個人的權限，例如：建立工作項目、建立管道、建立存儲庫等等。
![](/image/20240202_23-26-55.png)
![](/image/20240202_23-27-55.png)
