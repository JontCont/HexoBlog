---
title: C# .NET 與 Net Framework
date: 2023-03-04 21:23:36
categories: 
  - 後端技術
  - C# 
  - 筆記
tags: 
  - C#
description:
keyword: 'C#'
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Microsoft_.NET_logo.svg/150px-Microsoft_.NET_logo.svg.png
---
## .Net 
.NET 是一個由 Microsoft 開發的跨平台框架，用於開發和執行各種應用程式。它提供了一個統一的編程模型，使開發人員可以使用不同的語言（例如 C#、VB.NET、F# 等）和工具（例如 Visual Studio、Visual Studio Code 等）來開發應用程式。.NET 還提供了各種庫和工具，使開發人員可以輕鬆地開發高品質、高效和安全的應用程式。

.NET 包括兩個主要部分：.NET Framework 和 .NET Core。.NET Framework 是 .NET 的最初版本，它運行在 Windows 平台上，支持使用 C#、VB.NET 等語言開發各種應用程式。.NET Core 是 .NET 的新一代版本，它是跨平台的，支持在 Windows、Linux 和 macOS 等平台上運行，同時也支持使用 C#、VB.NET、F# 等語言開發各種應用程式。.NET Core 還支持微服務架構、容器化部署和現代 Web 開發等新特性。

### 特色
1. 跨平台支持：.NET Core 可以在 Windows、Linux 和 macOS 等多種平台上運行，這使得開發人員可以使用相同的代碼庫在不同的平台上開發和部署應用程式。

2. 開源：.NET Core 是開源的，這意味著開發人員可以自由地訪問和修改 .NET Core 的源代碼，進行定制和優化。

3. 高效：.NET Core 通過優化運行時、編譯器和庫等多個方面來實現高效性能，使得應用程式可以更快地執行。

4. 輕量級：.NET Core 是一個輕量級的框架，它只包含必要的庫和工具，這使得應用程式可以更小、更快地部署和運行。

5. 支持現代 Web 開發：.NET Core 提供了強大的支持現代 Web 開發的功能，包括 Razor Pages、MVC、Web API 等，開發人員可以使用這些功能開發高品質、高效的 Web 應用程式。

6. 支持微服務架構：.NET Core 提供了豐富的支持微服務架構的功能，包括輕量級的、可互換的容器化部署、健康檢查、熱插拔等，使得開發人員可以輕鬆地開發和部署微服務應用程式。

### 與其他平台的關係
NET Core 經常會拿來與其他平台做類比，尤其是它的源頭 .NET Framework 以及另一個相似性質的開源平台 Mono。

---

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

---
## .NET vs NET Framework 
### 差異
.NET本身是一個跨平台的開發框架，它提供了一個統一的開發環境和庫，開發人員可以使用不同的編程語言，如C#、VB.NET和F#等來編寫應用程序，並且可以在Windows、Linux和macOS等操作系統上運行。

.NET Framework是.NET框架的一個特定實現，它只能運行在Windows操作系統上。.NET Framework提供了一個完整的開發環境和庫，包括Windows Forms、WPF、ASP.NET等等。.NET Framework的版本是固定的，開發人員需要安裝對應的版本才能開發和運行應用程序。

### 優點 & 缺點
#### .NET 的優點：
跨平台：.NET支援在多種作業系統上運行，包括Windows、Linux和macOS等，使開發人員可以開發跨平台應用程序。
開放原始碼：.NET是一個開源的開發框架，開發人員可以查看和修改庫的源代碼。
支援多種編程語言：.NET支援多種編程語言，如C#、VB.NET和F#等。
輕量級：.NET運行時庫是輕量級的，可在資源有限的設備上運行。

#### .NET 的缺點：
開發環境和庫相對較少：由於.NET是一個相對較新的開發框架，開發環境和庫相對較少。
運行速度較慢：由於.NET需要運行在運行時環境中，因此運行速度可能較慢。
---
#### .NET Framework 的優點：
強大的開發環境和庫：.NET Framework提供了豐富的開發環境和庫，包括Windows Forms、WPF、ASP.NET等等，使開發人員可以輕鬆地開發各種應用程序。
支援多種開發工具：.NET Framework支援多種開發工具，如Visual Studio、Visual Basic等。
穩定性和可靠性：.NET Framework經過了多年的發展和驗證，已經被廣泛使用，因此非常穩定和可靠。

#### .NET Framework 的缺點：
只能在Windows上運行：.NET Framework只能在Windows操作系統上運行，對於其他操作系統沒有支援。
安裝和升級困難：由於.NET Framework的版本是固定的，因此安裝和升級可能比較困難。