---
title: Angular 架構
date: 2024-04-25 15:21:30
categories: 
  - 前端技術
  - Angular
tags: 
  - Angular
description:
keyword: 'ES6, Angular  ,網頁'
cover: /img/Web/bg/Angular-bg-01.png
---


## 一、什麼是 Angular 
Angular 是一個開源的前端框架，由 Google 開發，用於構建 Web 應用程序。Angular 是一個基於 TypeScript 的前端框架，它的目標是簡化 Web 應用程序的開發和測試。Angular 提供了一個完整的解決方案，包括數據管理、路由、測試、動畫、表單等功能。

## 二、Angular 特點
Angular 具有以下幾個特點：
1. **模塊化**：Angular 應用程序是由多個模塊組成的，每個模塊都有自己的功能和職責。這樣可以使代碼更加模塊化，易於維護和擴展。
2. **組件化**：Angular 應用程序是由多個組件組成的，每個組件都有自己的模板、邏輯和樣式。這樣可以使代碼更加組件化，易於重用和測試。
3. **雙向數據綁定**：Angular 提供了雙向數據綁定功能，可以實現模型和視圖之間的數據同步。這樣可以使應用程序的開發更加高效和方便。
4. **依賴注入**：Angular 提供了依賴注入功能，可以實現組件之間的解耦。這樣可以使代碼更加模塊化、可測試和可維護。
5. **路由管理**：Angular 提供了路由功能，可以實現單頁應用程序（SPA）的開發。這樣可以使應用程序的性能更好、用戶體驗更好。
6. **全面測試工具**：Angular 提供了測試功能，可以實現單元測試、集成測試和端到端測試。這樣可以使應用程序的質量更高、開發效率更高。

## 三、Angular 架構
Angular 應用程序的架構主要由以下幾個部分組成：
1. **模塊（Module）**：Angular 應用程序是由多個模塊組成的，每個模塊都有自己的功能和職責。模塊可以包含組件、指令、管道、服務等。
2. **組件（Component）**：Angular 應用程序是由多個組件組成的，每個組件都有自己的模板、邏輯和樣式。組件可以包含其他組件，形成組件樹。
3. **指令（Directive）**：Angular 提供了多種指令，用於擴展 HTML 的功能。指令可以用於修改 DOM、添加事件處理程序、設置屬性等。
4. **服務（Service）**：Angular 提供了服務功能，用於實現業務邏輯、數據處理、網絡請求等。服務可以在組件之間共享數據和功能。
5. **模板（Template）**：Angular 使用模板來定義組件的視圖。模板是一個 HTML 文件，包含組件的樣式和結構。
6. **元數據（Metadata）**：Angular 使用元數據來描述組件、指令、服務等的屬性和行為。元數據是一個 JavaScript 對象，包含一些特殊的屬性和方法。

### 3-1 Angular 架構圖
![](/image/20240425_09-47-53.png)

---


## 四、架構內容補充
### 1. 模塊（Module）
每個 Angular 應用程序至少包含一個根模塊，用於啟動應用程序。模塊可以包含組件、指令、管道、服務等。模塊使用 @NgModule 裝飾器來定義，包含一個元數據對象，用於描述模塊的屬性和行為。上圖中 module 為 【Component】、【Value】、【Service】、【Functions】，這些都是模塊的一部分。

### 2. 組件（Component）
Component 中會引入 Service 以外，有關 propety binding 、Evnet binding 都會跟 Template 有管。

### 3. 指令（Directive）
Directive 是 Angular 提供的一種擴展 HTML 的功能，用於修改 DOM、添加事件處理程序、設置屬性等。Angular 提供了兩種類型的指令：結構型指令和屬性型指令。結構型指令用於修改 DOM 的結構，如 ngIf、ngFor；屬性型指令用於修改 DOM 的屬性，如 ngStyle、ngClass。


### 4. 服務（Service）
Service 是 Angular 提供的一種用於實現業務邏輯、數據處理、網絡請求等的功能。Service 可以在組件之間共享數據和功能，使代碼更加模塊化、可測試和可維護。Service 使用 @Injectable 裝飾器來定義，包含一個元數據對象，用於描述服務的屬性和行為。


### 5. 模板（Template）
Template 是 Angular 使用的一種定義組件視圖的方式，是一個 HTML 文件，包含組件的樣式和結構。Template 使用 Angular 的模板語法來實現數據綁定、事件綁定、條件渲染、循環渲染等功能。Template 中可以使用 Angular 的指令、管道、表達式等功能。

### 6. 元數據（Metadata）
在 Angular 中，元數據（Metadata）是用來描述組件、指令、服務等的屬性和行為的。元數據可以看作是模板（Template）與組件（Component）之間的媒介，負責資料的處理。元數據使用 Angular 的裝飾器（Decorator）語法來定義，並包含一個元數據對象，該對象用於描述對象的屬性和行為。元數據中可以包含一些特殊的屬性和方法，用於描述對象的屬性和行為。