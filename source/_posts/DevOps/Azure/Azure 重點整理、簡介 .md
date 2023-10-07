---
title: Azure 重點整理、簡介 
date: 2022-12-10
categories: 
  - 雲端平台
  - Azure
tags: 
  - Azure
description:
keyword: 'Cloud  ,Azure'
cover: /image/20230310_08-44-55.png
---

# Azure
Microsoft Azure 是微軟所打造的一個公有雲端服務平台，過去稱為 Windows Azure。Azure 一開始是以 IaaS 來提供基礎雲端服務，到現在Azure 已經橫跨 IaaS 到 PaaS 甚至是 SaaS 的豐富雲端服務。

目前全球有54座資料中心以及44個CDN跳躍點 (POP)，並且於2015年時被 Gartner 列為雲端運算的領先者。Microsoft Azure 已包含 30 餘種服務，數百項功能，並且為微軟帶來了12億美元的獲利 (2015年度) 


## 特色
Azure特色之一是他有更快的部署次數，客戶端採用時間可以大幅縮短，開發資源庫也相當豐富，能大幅的降低應用程序生命周期成本。當你的伺服器有季節性的流量時，Azure也可以針對不同的需求做調整。
Azure 的服務可以分為以下七大類：
1. 計算與網路
2. 網路與行動
3. 資料與分析
4. 儲存體與備份
5. 媒體與 CDN
6. 混合式整合
7. 身份識別與存取管理

## 提供服務
- 基礎設施即服務 / IaaS ( Infrastructure as a Service ) :
當購買、安裝、設定及管理軟體 (包括作業系統、中介軟體與應用程式) 時，可由Azure 來管理基礎結構，相當節省時間也很方便。而IaaS 也可視公司或個人需求快速增加與減少，每個資源都是獨立服務元件。

- 平台即服務 / PaaS ( Platform as a Service ) :
Azure 負責提供並管理大部分的基礎設施，讓使用者只需要負責管理自己的資料以及應用程式，把使用者從繁複的基礎設施管理解放出來，就可以專注在應用程式優化以及精進商業邏輯。

- 軟體即服務 / SaaS ( Software as a Service ) :
Microsoft Azure 提供從硬體到上層應用程式一整套的服務，使用者可以直接透過 Azure 所提供的軟體，像是常見的線上郵件 Outlook 都是大眾平時都有在使用的 SaaS。

## 運算服務
執行應用程式是在雲端平台中最重要也是最基本的一項作業，在 Azure 中依照服務的彈性程度不同提供了三種主要的選擇：虛擬機器 (Virtual Machines)、雲端服務 (Cloud Services) 以及網站服務 (Websites)。

1. 虛擬機器 (Virtual Machines) 
虛擬機器 (Virtual Machines) 是一種 IaaS 服務，提供了最高度彈性的服務，您可以透過 Azure Gallery 組件庫使用預先建立好的作業系統映像檔，其中包括了各個版本的 Windows Server 甚至是 Ubuntu、CentOS 等開源的作業系統環境，或是您也可以自行上傳預先準備好的 VHD 檔，將原本的本地環境部署至虛擬機器服務。在虛擬機器服務中，您擁有了 100% 的主控權，可以透過 SSH 或是遠端桌面連線的方式管理您的伺服器。其中很特別的是，微軟也預先準備好了許多預載好像 SQL Server 或 Visual Studio 的映像檔，您可以在數分鐘之內就部署好一台裝有 Visual Studio 14 CTP 的開發測試環境。

2. 雲端服務 (Cloud Services) 
雲端服務 (Cloud Services) 是一種介於前兩者之間的 PaaS 服務，它提供了比網站服務更高的彈性，但其背後的虛擬機器是由微軟資料中心所代管，您可以專注在您的應用程式及服務本身。而依照應用程式不同的需求，雲端服務提供了兩種運轉模式，分別是 Worker Role 及 Web Role，並且也提供了對 .NET 以外程式語言的支援。


3. 網站服務 (Websites)。
網站服務 (Websites) 是一種最容易部署網站的服務，他是建構在微軟自家的 IIS 服務之上，除了過去熟悉的 ASP.NET 之外，也同時提供了對 PHP、Python 及 node.js 等語言的支援，讓您可以在數分鐘之內就將一個網站應用程式部署至雲端。同時，網站服務也提供了高度延展的設定，您可以依照需求選擇不同大小/價位的服務，並且可以依照流量及 CPU 運算資源做 auto-scaling。最重要的是，每個 Azure 帳戶擁有 10 個免費 (Free) 量級的網站服務，您可以不需花費任何金錢就將輕量級的網站服務部署在雲端資料中心


## 資料管理
大部份的應用程式都需要存取資料，您除了可以在 IaaS 服務上自行建立資料庫的儲存環境外，在 Azure 中也依照不同的需求提供了幾種主要的選擇：SQL Database、資料表 (Table) 以及 Blob。

1. [SQL Database](https://azure.microsoft.com/zh-tw/products/azure-sql/database/)
SQL Database (過去稱為 SQL Azure) 是一個針對雲端環境優化的 SQL Server 服務，提供了關聯式資料庫的所有重要功能，而且如同過去熟悉的 SQL Server，您可以使用 Entity Framework、ADO.NET 或是其他熟悉的資料存取技術來存取 SQL Databse。如果您過去的服務是建立在 SQL Server 上，SQL Database 會是一個您很好的雲端化選擇，透過 SQL Management Studio 就可以輕鬆的將資料放上雲端

2. [資料表](https://azure.microsoft.com/zh-tw/product-categories/storage/)
資料表 (Table) 是一種提供大量儲存 key/value 型式的 NoSQL 服務，它不提供關聯式資料庫的功能，但如果您所要存的資料量相當龐大，或是不需要對這些資料執行複雜的 SQL 查詢，那麼它會是一個簡單明瞭而且成本遠低於 SQL Database 的選擇。

3. [Blob](https://azure.microsoft.com/zh-tw/product-categories/storage/)
Blob 是設計用來儲存非結構化二進位資料的服務，而且單一個 Blob 就有多達 1 TB 的容量，適合用來儲存視訊或備份資料等等，您可以使用 Blob 作為簡單而且成本低廉的儲存體服務。


## 網路
Azure 目前在亞洲、歐洲及美洲數個資料中心內運行，您除了可以在 Azure 上部署您的雲端應用程式之外，也可以用來作為本地資料中心或網路的延伸，透過虛擬網路 (Virtual Network) 以及流量管理員 (Traffic Manager) 的服務來達成。

## 行動裝置
過去撰寫行動應用程式時，您可能會需要使用到資料存取、身份驗證、推播通知等功能，往往需要自行建構 API 來提供行動裝置端呼叫各項服務。而在 Azure 上，針對 Mobile App 的各種基本需求，提供了包括各式基本服務的行動服務 (Mobile Services) 以及可以大量將訊息推送至用戶端的通知中樞 (Notification Hubs)，大幅降低了開發 App 後端所需的時間，而且透過單一的服務就可以提供 Android、iOS 以及 Windows Phone 各個平台所需的服務。


## 訊息服務
1. 佇列 (Queues)
佇列 (Queues) 是一種 FIFO (First-In-First-Out) 的設計概念，一個應用程式將訊息放入佇列中，而另一個應用程式來讀取該訊息並進行進一步的處理。舉一個簡單的例子，目前最熱門的相簿服務 Flickr 在使用者將照片上傳後，會自動將照片做各種尺寸的縮圖，這種服務變可以透過佇列來達成，在網頁應用程式接收到上傳的照片後，便將該照片資訊放入佇列當中，而在背景工作的另一個角色便不停的從佇列中讀取新上傳的照片，並進行一些需要較長時間的縮圖處理。

2. 服務匯流排 (Service Bus)
服務匯流排 (Service Bus) 與上面所提到的佇列不同的地方在於，服務匯流排的目的是讓應用程式在任何地方都能交換資料。除了佇列所能提供的一對一通訊之外，服務匯流排還提供了發佈與訂閱 (pub/sub) 的機制，應用程式可以將訊息傳送到某個主題，而有訂閱該主題的多位收件者可以同時讀取相同訊息，達成一對多的通訊。此外，服務匯流排也提供了轉送 (Relay) 的機制，提供通過防火牆的安全通訊方式。


## 快取
應用程式可能會一再存取相同的資料，若要提升服務的效能，最直覺的做法就是將大量被取用的資料就近保留一份，這就是快取的概念。Azure 提供了兩種不同的快取架構，分別是針對應用程式記憶體的內部快取以及針對 Blob 資料的內容傳遞網路 (CDN)。

## 參考資源
1. [Azure是什麼？想進入IT產業的你不能不知道的雲端技術](https://www.pcschool.com.tw/blog/it/what-is-azure)
2. [認識 Microsoft Azure](https://ithelp.ithome.com.tw/articles/10157344)
3. [Azure 簡介](http://azure.microsoft.com/zh-tw/documentation/articles/fundamentals-introduction-to-azure/)
4. [Introducing Microsoft Azure](http://azure.microsoft.com/en-us/documentation/articles/fundamentals-introduction-to-azure/)
