---
title: 【Azure DevOps】 - Boards 
date: 2023-08-10 08:44:55
categories: 
  - 雲端平台
  - Azure
tags: 
  - Azure
keyword: 'Cloud  ,Azure , DevOps , Azure DevOps'
cover: /image/20230310_08-44-55.png
---
## Azure DevOps - Boards
Azure DevOps - Boards 提供了工作項目追蹤系統，讓團隊可以計畫、追蹤工作項目。

### 1. 工作模式
Azure Devops 起始時候預設Basic模式可以自行設定為其他模式。Boards 提供了4種工作模式：
- Agile : 敏捷開發模式
- Scrum : Scrum 開發模式
- Basic : 基本開發模式
- CMMI (Capability Maturity Model Integration) : CMMI 開發模式

### 2. 工作項目
Azure DevOps - Boards 提供了4種工作項目：
- Epic : 史詩
- Feature : 功能
- User Story : 使用者描述
- Task : 工作項目

{% tabs temp %}
<!-- tab Agile 敏捷開發模式 -->
敏捷式程式會使用各種工作專案類型，例如使用者劇本、工作、Bug、功能和 Epic 來規劃和追蹤工作。 首先，新增使用者劇本，並視需要將它們分組至功能。 您可以將工作新增至使用者劇本，以追蹤更多詳細資料。

![](/image/20230810_20-57-19.png)
![](/image/20230810_20-57-34.png)
<!-- endtab -->

<!-- tab Basic 開發模式 -->
基本程式提供三種工作專案類型：Epic、問題和工作，用於規劃和追蹤工作。 首先，新增問題以追蹤使用者劇本、Bug 或功能專案。
![](/image/20230810_20-58-43.png)
![](/image/20230810_20-58-50.png)
<!-- endtab -->

<!-- tab CMMI 開發模式 -->
CMMI 程式會使用工作專案類型，例如需求、工作、Bug、功能和 Epic 來規劃和追蹤工作。
![](/image/20230810_20-59-39.png)
![](/image/20230810_20-59-43.png)
<!-- endtab -->


<!-- tab Scrum 開發模式 -->
Scrum 程式會使用各種工作專案類型，包括產品待辦專案、工作、Bug、功能和 Epic，來規劃和追蹤工作。

在每個工作專案表單中，描述工作、指派參與者、追蹤狀態，以及在討論區段中共同作業。 我們會示範如何在入口網站上新增產品待辦專案、子工作和工作專案詳細資料
![](/image/20230810_20-58-16.png)
![](/image/20230810_20-58-20.png)
<!-- endtab -->

{% endtabs %}

## 關聯工作項目
- 關聯工作項目可以讓工作項目之間建立關聯，例如：關聯工作項目之間的相依性、關聯工作項目之間的父子關係。
- 關聯工作項目可以在工作項目的右上角選單中選擇關聯工作項目。

![](/image/20230810_21-05-36.png)


## Bug 沒出現在 Backlog
- Bug 預設是不會出現在 Backlog 中，只會出現在 Board 中。 
- 如果要讓 Bug 出現在 Backlog 中，可以在 Project Settings -> Boards -> Bugs -> Bugs are managed with requirements  或是  Bugs are managed with task -> On
![](/image/20230810_21-11-07.png)
![](/image/20230810_21-13-05.png)
![](/image/20230810_21-11-48.png)


## 參考文件
- [Azure DevOps Documentation](https://docs.microsoft.com/en-us/azure/devops/?view=azure-devops)