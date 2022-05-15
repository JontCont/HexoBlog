---
title: Microsoft Azure AD - 創建 SQL 資料庫
categories: 
  - Cloud
  - Azure
tags: 
  - Azure
description:
keyword: 'Cloud  ,Azure'
cover: /img/dotnet/bg/cs_bg_003.png
---

# SQL 資料庫
- Azure 入口 : https://portal.azure.com/#home

## 創建SQL Server
Azure 可以設定 Server 、DataBase 細項，主要是介面上會看到兩個Icons ，如果你只需要SQL Server 就可以不用理會 SQL資料庫。

![](/img/dotnet/cs/cs_azure_004.png)

這邊我使用[SQL資料庫]，需要先自定義一個資源群組。接下來會創建SQL Server ，創建需要注意每個地區會有所謂延遲，如我不知道如何選擇可以參考下方網址。
- [Azure Regions](https://www.azurespeed.com/Information/AzureRegions)
![](/img/dotnet/cs/cs_azure_006.png)
![](/img/dotnet/cs/cs_azure_005.png)

創建兩項完成後，可以點開設定資料庫，上面有10個DTU並包含250GB儲存體，目前他上面沒寫價格可以點選設定資料庫即可看到資料庫設定內容，並包含其他使用費用。

目前預設版本是DTU 1 個 1.5 USD，目前是沒有地方讓你向下條整DTU，如果是簡易版試用版本就會是2GB。
![](/img/dotnet/cs/cs_azure_007.png)
![](/img/dotnet/cs/cs_azure_008.png)
![](/img/dotnet/cs/cs_azure_009.png)


另一種是 vCore 可以去做調整， 實際落差、性能沒有實際驗證方式，但是如果要讓價格便宜一點可以考慮使用這個。
![](/img/dotnet/cs/cs_azure_010.png)
![](/img/dotnet/cs/cs_azure_011.png)
![](/img/dotnet/cs/cs_azure_012.png)

## 其他設定
### 網路
Azure 最特別是可以設定防火牆，可以鎖定ip不讓外來人連線至該位置、Server。
![](/img/dotnet/cs/cs_azure_013.png)

### 資料庫定序
SQL Server 必須要注意定序設定，如果按照預設值可能會遇到亂碼的問題。
![](/img/dotnet/cs/cs_azure_014.png)


### 已刪除的資料庫
Azure 有還原資料庫功能會還原特定時間點的DB，所以不小心刪除可以不用再害怕了。
![](/img/dotnet/cs/cs_azure_014.png)




## 資料庫傳送量單元 DTU (Database Throughput Unit)
DTU是由CPU、記憶體、實際讀取和交易記錄寫入合併成一個單位，也就是一種綜合效能評價的方式，應用這種評價方式，將伺服器規模分為BASIC、STANDARD和PREMIUM三種不同等級。






## 參考文件

- [定價(MAU)](https://azure.microsoft.com/zh-tw/pricing/details/active-directory/external-identities/)

- [什麼是 Azure Active Directory？](https://docs.microsoft.com/zh-tw/azure/active-directory/fundamentals/active-directory-whatis)

- [Azure AD Multi-Factor Authentication 的功能與授權](https://docs.microsoft.com/zh-tw/azure/active-directory/authentication/concept-mfa-licensing)
  
- [dotnet連線方式](https://docs.microsoft.com/zh-tw/sql/connect/ado-net/sql/azure-active-directory-authentication?view=sql-server-ver15) 

- [Azure Regions](https://www.azurespeed.com/Information/AzureRegions)