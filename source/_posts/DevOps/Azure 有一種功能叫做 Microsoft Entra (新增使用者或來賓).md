---
title: 【Azure】有一種功能叫做 Microsoft Entra (新增使用者或來賓)
date: 2024-07-27 15:45:23
categories: 
  - 雲端平台
  - Azure
tags: 
  - Azure
description:
cover: /image/20230310_08-44-55.png
---

## 前言
最近在身旁的同事們說 Micorsoft 沒有製作創建來賓跟使用者的功能，可以讓 DevOps 其他來賓或使用者可以自己創建，這樣就不用一直找管理員來幫忙創建。因此，我要幫微軟澄清這個問題，其實是有的，只是在不起眼的地方而已。


### Microsoft Entra 
Microsoft Entra 是一個為企業提供的服務，可以讓企業的使用者自己創建來賓或使用者，而不用一直找管理員來幫忙創建。這樣可以節省管理員的時間，也可以讓使用者自己管理自己的帳號。

- 入口 : [https://entra.microsoft.com/](https://entra.microsoft.com/)

---

#### 一、免費版限制
在 Microsoft Entra ID（以前稱為 Azure Active Directory）免費版中，您可以創建的使用者數量是有限的。以下是與使用者相關的主要限制和詳細資訊：

##### 1-1 使用者數量限制
- **最大使用者數量**：
  - **免費版**：單個租戶中最多可以創建 **50,000 個使用者和資源**[4](4)[8](8)[11](11)。
  - 如果需要更多資源，您可以考慮升級到付費版本（如 Premium P1 或 P2），這些版本提供更高的資源上限及更多的功能。

##### 1-2 免費版的其他限制
除了使用者數量的限制外，免費版還有一些其他的限制：

##### 1-3 功能和服務
- **單一登入 (SSO)**：支援跨 Azure、Microsoft 365 和許多流行的 SaaS 應用程式的單一登入[3](3)。
- **條件式存取 (Conditional Access)**：不支援此功能，僅在 Premium P1 和 P2 訂閱中提供[7](7)。
- **多重身份驗證 (MFA)**：僅支持基本的多重身份驗證，不包括高級 MFA 設定[7](7)。
- **報告和監控**：提供基本的安全報告和監視功能[3](3)。

##### 1-4 如何避免產生額外費用
為了確保在免費版使用過程中不會產生額外費用，請遵循以下建議：

1. **定期監控用戶和資源數量**：
   - 確保您的租戶中創建的總使用者和資源數量不超過 50,000 個的上限[11](11)。

2. **避免使用高級功能**：
   - 僅使用免費版提供的基本功能，避免使用需要付費的高級功能，例如條件式存取和高級 MFA[7](7)。

3. **管理外部身份驗證用戶**：
   - 如果使用 Microsoft Entra 外部 ID，請監控和管理每月活躍用戶 (MAU) 數量，確保不超過前 50,000 名 MAU 的免費限額[10](10)。

##### 1-5 參考文件
[1] https://learn.microsoft.com/zh-tw/entra/identity/users/directory-service-limits-restrictions
[2] https://learn.microsoft.com/en-us/entra/identity/users/directory-service-limits-restrictions
[3] https://learn.microsoft.com/zh-cn/azure/azure-resource-manager/management/azure-subscription-service-limits
[4] https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits
[5] https://support.google.com/cloudidentity/answer/7295541?hl=zh-Hans
[6] https://learn.microsoft.com/en-us/answers/questions/1646297/i-want-to-add-500k-users-to-my-microsoft-entra-id
[7] https://www.azure.cn/pricing/details/active-directory/index.html
[8] https://blog.sonnes.cloud/entra-id-quota-limit-learn-to-manage-your-usage-to-avoid-maxing-it-out-and-extend-it-before-its-too-late/
[9] https://learn.microsoft.com/zh-cn/entra/identity/domain-services/faqs
[10] https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-licensing
[11] https://learn.microsoft.com/en-us/mem/intune/enrollment/device-limit-intune-azure
[12] https://jumpcloud.com/blog/understanding-aad-pricing-free
[13] https://learn.microsoft.com/en-us/entra/external-id/external-identities-pricing

- 來源取至於[Felo Search](https://felo.ai/search/28C5Ywx3qhVkjGNPm3wvMq)


---

#### 二、如何使用
這個功能其實跟 Microsoft365 admin 一樣，可以把創建使用者/來賓的權限給予其他使用者，讓他們不必自行創建。

![](/image/20240726_23-50-21.png)


##### 2-1 新的使用者/外部使用者

- **新的使用者**：自行創建帳號密碼給對方 (DNS如果要自動要自行申請)。
- **外部使用者**：這個就是要求對方的email提供後，我們可以用他的email創建身分給他。

![](/image/20240726_23-51-24.png)
![](/image/20240726_23-53-54.png)
![](/image/20240726_23-54-18.png)


##### 2-2 邀請 DevOps 使用者
Azure DevOps 邀請規則要注意是 Organization Setting 創建使用者後才能指定對方 Project 的權限，如果直接邀 Project 可能會遇到靈異事件。除了這件事以外，Azure 必須要加入訂閱帳戶才能邀請其他使用者。


###### 2-2-1 訂用帳戶
![](/image/20240727_00-01-40.png)

###### 2-2-2 邀請 DevOps 使用者
![](/image/20240727_00-02-58.png)


---

#### 三、結論
這邊是給認為 DevOps 不能給幫對方創建帳號的人看，其實很多東西要自己摸索才會知道的東西，因為微軟的功能太多了，不可能每個人都知道。以上就是簡單的介紹，希望對大家有幫助。