---
title: C# .NET 筆記
categories: 
  - dotnet
  - C#
tags: 
  - core
  - C#
description:
keyword: 'core  , C# ,API'
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Microsoft_.NET_logo.svg/150px-Microsoft_.NET_logo.svg.png
---
## .Net 
.NET是.NET Framework的新一代版本，是微軟開發的第一個跨平台 (Windows、Mac OSX、Linux）的應用程式開發框架（Application Framework），未來也將會支援FreeBSD與Alpine 平台。

由於 .NET Core 的開發目標是跨平台的 .NET 平台，因此 .NET Core 會包含 .NET Framework 的類別庫，但與 .NET Framework 不同的是 .NET Core 採用套件化 (Packages) 的管理方式，應用程式只需要取得需要的組件即可，與 .NET Framework 大包式安裝的作法截然不同，同時各套件亦有獨立的版本線 (Version line)，不再硬性要求應用程式跟隨主線版本。

### 核心功能
.NET Core 是由許多專案所組成，除了基本的類別庫 (Core FX) 之外，也包含採用 RyuJIT 編譯的執行平台 Core CLR、編譯器平台 .NET Compiler Platform、採用 AOT 編譯技術運行最佳化的套件 Core RT (.NET Core Runtime)，以及跨平台的 MSIL 編譯器 LLILC (LLVM-based MSIL Compiler) 等專案。
同時，微軟也發展了一個建置技術檔案的平台 docfx ，並運用於 .NET Core 的檔案網站。

### 與其他平台的關係
NET Core 經常會拿來與其他平台做類比，尤其是它的源頭 .NET Framework 以及另一個相似性質的開源平台 Mono。

## Framework
### .NET Framework
據微軟的說明，.NET Core 和 .NET Framework 是子集 (Subset) 與超集 (Superset) 的關係，.NET Core 將會實作出部份的 .NET Framework 功能 (基本上是不含使用者介面的部份)，例如 JIT (.NET Core 採用 RyuJIT)、垃圾收集器 (GC) 以及型別 (包含基本型別以及泛型型別等)。未來 .NET Framework 和 .NET Core 也將會是各自發展，但它們也會同時使用彼此的功能，例如 .NET Compiler Platform 與 RyuJIT 等技術。

### Mono
Mono 是另一個已發展許久的 .NET Framework 跨平台開源版本，基本上並不隸屬微軟官方，而是由社群的力量所主導，自成一個生態系統，也開發出了像Xamarin這樣的跨平台.NET行動應用，.NET Core 與 Mono 未來會是合作的關係，Mono 仍會維持社群力量的維護與發展，而 .NET Core 則會以官方角度來進行發展，兩邊也會一起進行彼此功能上的增進。

### .NET CLI
.NET CLI (Command-Line Interface) 指令列工具是 .NET Core 處理建造、執行與編輯工作的主要工具 ，有幾個主要的動作：

### ASP.net Core
ASP.NET Core 是一種跨平台且高效能的開放原始碼架構
建置現代化、雲端式、網際網路連線的應用程式、 Web 應用程式和服務、IoT 應用程式、以及行動後端
可以在 Windows、macOS 和 Linux 上使用慣用的開發工具
部署到雲端或在內部部署。
在 .NET Core 或 .NET Framework 上執行。

ASP.NET 5的Stack，為了開放原始碼與跨平台(Linux、iOS)，擺脫了對 System.Web 的依賴

## 優點分析
Microsoft 在 Windows、macOS 與 Linux上 都支援 .NET Core
每年都為它推出安全性與品質更新數次
.NET Core 二進位發行版本是在 Azure 中由 Microsoft 維護的服務上建置及測試，享有與任何 Microsoft 產品一樣的支援
應用程式介面區較小，包括更嚴密的安全性、減少維護工作，以及提升效能
完美整合常用的用戶端架構和程式庫，包括 Angular、React 與 Bootstrap