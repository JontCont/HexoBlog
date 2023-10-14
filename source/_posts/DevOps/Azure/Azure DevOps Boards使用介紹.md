---
title: 【Azure DevOps】 - Boards 功能介紹
date: 2023-08-26 08:44:55
categories: 
  - 雲端平台
  - Azure
tags: 
  - Azure
keyword: 'Cloud  ,Azure , DevOps , Azure DevOps'
cover: /image/20230310_08-44-55.png
---

## Boards vs notion boards
notion boards 是一個很好用的工具，可以用來管理專案進度，但是在團隊合作上，就顯得不太方便，因為沒有辦法知道其他人的進度，也沒有辦法知道其他人的進度是否會影響到自己的進度，所以在團隊合作上，還是需要一個專門的工具來管理專案進度，而 Azure DevOps Boards 就是一個很好用的工具。

Azure DevOps 可以針對 Repos 、 Pipelines 、 Boards 、 Test Plans 、 Artifacts 進行管理，而 Boards 就是專門用來管理專案進度的工具，可以針對專案進度進行管理，並且可以針對專案進度進行分析，讓團隊可以更好的管理專案進度。

## Boards 功能介紹
Azure DevOps 提供以下八種功能，方便管理專案進度業界最常使用功能之一。
1. Work Item
2. Boards
3. Backlogs
4. Sprints
5. Queries
6. Charts
7. Dashboards
8. Analytics view

### 一、Work Item 工作項目
工作項目是只要給目前需要做的事情，可以是一個功能、一個需求、一個 bug、一個測試案例等等，可以針對工作項目進行分類，並且可以針對工作項目進行分配，讓團隊可以更好的管理專案進度。(可以透過 filter 來進行篩選)

![](/image/20230826_11-15-34.png)


### 二、Boards 看板
看板是一個可以針對工作項目進行管理的介面，可以針對工作項目進行分類，並且可以針對工作項目進行分配，讓團隊可以更好的管理專案進度。
![](/image/20230826_11-18-42.png)

這邊我使用規則為 
1. feature : 開法功能功能名稱
2. User Story : 當前要製作方向、功能
3. Task : 當前要製作的工作項目

Task 命名會使用 [名字 + 工作項目名稱] 這樣的方式，例如：[小明] - [製作登入頁面]，這樣的方式可以讓其他人知道這個工作項目是由誰負責的，並且可以知道這個工作項目是要做什麼的。

Git 部分就用 Task ID 標示對應的工作項目，這樣可以讓其他人知道這個 commit 是要做什麼的，同時，也可以追蹤 Task ID 。時間部分可已透過下方客製化方式加入。
![](/image/20230826_11-36-47.png)
下圖管理方式可以參照。
![](/image/20230810_20-57-19.png)

### 三、Backlogs 待辦事項
與[Work Item 工作項目]會比較直覺，可以選擇需要看得階層。內容用Group 方式顯示，相當直覺。

![](/image/20230826_11-39-59.png)

### 四、Sprints 短期衝刺
這功能可以讓團隊可以針對短期內要做的事情進行管理，並且可以針對短期內要做的事情進行分配，讓團隊可以更好的管理專案進度，依據專案緊急項目可以做歸類。

![](/image/20230826_11-47-46.png)
![](/image/20230826_14-07-57.png)
### 五、Queries 查詢
Queries 可以針對工作項目進行查詢，能夠在當中創建 Chart 來進行分析，讓團隊可以更好的管理專案進度。同時，可以把Chart放置在 Dashboard 上，透過 Effort (Hours) 可以查詢工時。

![](/image/20230826_14-14-03.png)
![](/image/20230826_14-15-18.png)
### 六、Delivery Plans 傳遞計畫
傳遞計畫著重於 Sprints、Team 衝刺計畫，可以管控 Feature 專案進度，比較偏向是 googel 日曆呈現。
![](/image/20230826_14-20-36.png)

### 七、Analytics view 分析檢視
分析檢視提供簡化的方式，可根據分析資料指定 Power BI 報表的篩選準則。 分析檢視僅支援Azure Boards資料 (工作專案) 。 分析檢視不支援其他資料類型，例如管線和測試。 每個檢視都會對應至工作專案的一般清單。 不支援工作專案階層。

![](/image/20230826_17-13-26.png)

當您使用 Power BI 資料連線器時，這些相同的預設檢視會出現在 [導覽器] 對話方塊中。 您選取的檢視會決定載入 Power BI 的記錄、欄位和歷程記錄集。 您可以使用 [導覽器] 對話方塊中的 [編輯查詢] 按鈕來編輯檢視，或是使用 [Power BI Desktop] 來編輯檢視。
![](/image/20230826_17-13-35.png)


## 參考文件
1. [[DAY28] 用Azure DevOps Boards管理專案進度：Agile團隊的好工具](https://ithelp.ithome.com.tw/articles/10209547)
2. [Scrum 和最佳做法](https://learn.microsoft.com/zh-tw/azure/devops/boards/sprints/best-practices-scrum?view=azure-devops#sprint-retrospective-meetings)
3. [檢閱 Azure Boards 中的小組傳遞計畫](https://learn.microsoft.com/zh-tw/azure/devops/boards/plans/review-team-plans?view=azure-devops)
4. [關於分析檢視](https://learn.microsoft.com/zh-tw/azure/devops/report/powerbi/what-are-analytics-views?view=azure-devops)