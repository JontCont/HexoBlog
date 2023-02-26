---
title: C# ORM 物件關係映像
categories: 
  - 後端技術
  - C# 
  - 筆記
tags: 
  - C#
description:
keyword: 'C#'
cover: /image/20230226_20-11-47.png
---
## 物件關係映像 Object Relational Mapping
是一種軟體開發技術，它將關聯式資料庫中的資料表映射到物件導向程式語言中的物件，從而實現程式語言與資料庫之間的無縫集成。

ORM 框架通常提供以下功能：
1. 對象映射：ORM 框架會自動將資料庫表格映射到物件，開發人員可以像使用任何物件一樣使用這些物件。
2. 關聯性映射：ORM 框架可以處理表格之間的關係，使開發人員可以輕鬆地編寫與關聯性相關的程式碼。
3. 資料庫操作：ORM 框架提供了一套 API，使開發人員可以方便地對資料庫進行 CRUD 操作。
4. 查詢語言支持：ORM 框架通常提供了一套自己的查詢語言，開發人員可以使用這些查詢語言方便地查詢資料庫。

ORM 框架的好處是可以減少對於 SQL 的依賴，減少了對於資料庫的複雜性，讓開發人員可以更專注於物件導向程式設計，並且可以提高開發效率。但是使用 ORM 框架也存在一些缺點，比如在效能上可能會有些影響，需要仔細選擇適合的 ORM 框架並進行優化。


### 結論
物件關係映像是 "物件"與"資料庫"之間對應的一種技術，例如 : "Entity Framework"。特色是資料透過【物件方式】 呈現，也可以使用 CRUD 方式。

ORM 與 資料庫由抽象關係，程式與資料庫沒有直接相依性，資料庫具有可抽換性，即使變更資料庫平台，ORM 資料存取可以正常運作。

![](https://2.bp.blogspot.com/-4ABOoATNbag/V0vUgXqBAEI/AAAAAAAADHY/o61wN5yv2cMDX0lwGghkvzACQcU1YOOaQCLcB/s1600/object_relational_mapping.JPG)