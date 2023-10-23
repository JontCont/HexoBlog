---
title: 何謂 IndexedDb
date: 2023-10-22 18:16:58
categories: 
  - 前端技術
tags: 
  - IndexedDb
description:
keyword: 'ES6, 網頁'
cover: /image/20231022_22-47-29.png
---
IndexedDB 是一個強大的瀏覽器內本地資料庫技術，它允許網頁應用程式在客戶端存儲和檢索大量資料，而無需依賴傳統的伺服器資料庫。在本文中，我們將深入瞭解 IndexedDB，包括它的特點、用途以及如何使用它來增強網頁應用程式的功能。

## 什麼是 IndexedDB？

IndexedDB 是一個 Web API，用於在瀏覽器中存儲大量結構化資料。它提供了一個類似於資料庫的環境，允許網頁應用程式創建、讀取、更新和刪除資料。這種資料庫是基於 JavaScript 的，不依賴於任何伺服器端資料庫，因此可以在離線狀態下工作。

### IndexedDB 的特點

1. **非同步操作**：IndexedDB 是一個非同步資料庫，這意味著它可以在後台執行長時間運行的操作而不會阻止網頁應用程式的其他部分。這有助於保持應用程式的反應性。

2. **支援索引**：IndexedDB 允許您為資料建立索引，這有助於快速查詢資料，而無需掃描整個資料庫。

3. **大容量資料儲存**：您可以存儲大量資料（通常以兆字節為單位），這對於需要離線存儲或高性能本地資料庫的應用程式非常有用。

4. **跨瀏覽器支援**：IndexedDB 是一個標準的 Web API，支援大多數現代瀏覽器，包括 Chrome、Firefox、Edge 和 Safari。

### IndexedDB 的應用

IndexedDB 可以應用於各種場景，包括：

1. **離線應用程式**：當網絡連接不穩定或斷開時，IndexedDB 允許應用程式繼續運行並訪問先前存儲的資料。

2. **快取資源**：瀏覽器可以使用 IndexedDB 來快取資源，例如圖像、CSS 檔案和 JavaScript 檔案，以減少網絡請求並提高網頁載入速度。

3. **資料同步**：IndexedDB 可以用於將資料在多個設備之間同步，以實現跨設備的一致性。

4. **離線遊戲**：遊戲開發者可以使用 IndexedDB 來存儲遊戲數據、進度和成就，從而實現離線遊玩體驗。

### 使用 IndexedDB

使用 IndexedDB 通常需要編寫一些 JavaScript 代碼。以下是一個簡單的 IndexedDB 應用程式示例：

```javascript
// 開啟或創建一個 IndexedDB 數據庫
var request = indexedDB.open("myDatabase", 1);

request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("customers", { keyPath: "id" });
    objectStore.createIndex("name", "name", { unique: false });
};

request.onsuccess = function(event) {
    var db = event.target.result;
    // 在這裡進行資料存取操作
};

request.onerror = function(event) {
    console.log("錯誤：" + event.target.errorCode);
};
```

這個示例演示了如何打開或創建一個 IndexedDB 數據庫，以及如何設定數據庫結構。然後，您可以使用該數據庫來存儲和檢索資料。

---

## **補充：瞭解不同瀏覽器的 IndexedDB 容量限制**

在前面的文章中，我們已經深入瞭解了 IndexedDB 的基本原則和功能，並討論了它在瀏覽器中的應用。然而，值得注意的是，不同瀏覽器可能對 IndexedDB 的容量限制和使用者互動方式有所不同。在這個補充部分，我們將更詳細地討論這些差異，特別是針對 Firefox 瀏覽器的情況。

**Firefox 瀏覽器的容量限制**

在 Firefox 中，IndexedDB 資料庫的容量並無特定上限。這意味著您可以儲存大量資料，而無需擔心超出容量限制。然而，當您嘗試儲存大型 Blob（二進制大型對象）數據，並且這些 Blob 數據的大小超過 50 MB 時，Firefox 將觸發使用者介面提示，要求用戶授權儲存這些大型數據。這是 Firefox 的一種保護機制，用於確保用戶了解並同意儲存大型數據。

**自訂容量警告閾值**

值得一提的是，Firefox 允許開發者自訂容量警告閾值。這可以通過 `dom.indexedDB.warningQuota` 屬性進行設置。開發者可以根據應用程式的需求，提高或降低容量警告閾值，以確保最佳用戶體驗。

**其他瀏覽器的限制**

不同瀏覽器可能會有不同的 IndexedDB 容量限制。請注意，這些限制通常是瀏覽器的實現的一部分，因此可能會因為瀏覽器的版本和設定而有所不同。開發者在開發和測試 IndexedDB 應用程式時，應該注意這些限制，以確保應用程式在不同瀏覽器中的一致性運行。


---
## 結論
IndexedDB 是一個強大的本地資料庫技術，但容量限制是開發者需要考慮的重要因素之一。了解不同瀏覽器的容量限制和使用者互動方式，以及如何自訂這些限制，對於確保應用程式的穩定性和性能非常重要。