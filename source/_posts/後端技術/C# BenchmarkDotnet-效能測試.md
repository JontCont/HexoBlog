---
title: C# BenchmarkDotnet-效能測試
date: 2023-10-29 22:55:25
categories: 
  - 後端技術
  - C#
  - BenchmarkDotnet
tags: 
  - C#
description:
cover: /image/20231029_19-06-30.png
---

近期為了整理先前技術，部分有很多功能沒有完全優化或是method不確定對效能有什麼問題。有一個不錯的套件能夠提供效能、執行時間檢視耗損，對於想要測試效能的工程師來說，這是一個不錯的選擇。

## [BenchmarkDotnet](https://github.com/dotnet/BenchmarkDotNet)
![](/image/20231029_19-06-30.png)

雖然說這工具是一個檢視效能、執行結果的工具。同時，也能將method 進行比較哪個做法比較好~~(破壞友情工具)~~。實際上不需要比較就可以使用，k6與這功能有點類似，但是這個工具是針對 C# 進行效能測試。


### 使用方式
這邊展示就使用 filter 作法，來比較哪個做法效果比較好。
備註 : 如果要使用 net8 時候，切記 native Aot 不能使用，會出現錯誤。

#### 1. 創建 Filter 比較類別
以下範例可以參考。這裡用 array、List、IEnumerable 來做比較，看哪個取得資料以及記憶體耗損會比較低。
MemoryDiagnoser => 這個是用來檢視記憶體耗損。

```cs
    [MemoryDiagnoser]
    public class TestFilter()
    {
        [Benchmark]
        public void ArrayFiler()
        {
            var values = new[] { "John", "OvO", "Eric", "Conte" };
            values.Where(x => x == "Eric");
        }

        [Benchmark]
        public void ListFiler()
        {
            var values = new List<string>() { "John", "OvO", "Eric", "Conte" };
            values.Where(x => x == "Eric");
        }

        [Benchmark]
        public void IEnumerableFiler()
        {
            var values = new[] { "John", "OvO", "Eric", "Conte" }.AsEnumerable();
            values.Where(x => x == "Eric");
        }
    }
```

#### 2. 設定 Program.cs
將Main 輸入```BenchmarkRunner.Run<T>();``` 這裡就會把 TestFilter 類別跑一次，並且顯示結果。
```cs
    class Program
    {
        static void Main(string[] args)
        {
            var summary = BenchmarkRunner.Run<TestFilter>();
            Console.ReadKey();
        }
    }
```

#### 3. dotnet cli
使用這個工具是能使用 release 方式執行，若要執行 debug 是無法正常執行。
```cmd
dotnet run -c release

//若要輸出到記事本可以使用這個語法
dotnet run -c release > report.txt
```
![](/image/20231029_19-30-46.png)

### Job - 不同環境驗證
目前可以針對不同環境進行測試，這邊可以參考官方文件，這邊就不多做介紹。
```cs
[SimpleJob(RuntimeMoniker.Net472, baseline: true)]
[SimpleJob(RuntimeMoniker.NetCoreApp30)]
[SimpleJob(RuntimeMoniker.NativeAot70)]
[SimpleJob(RuntimeMoniker.Mono)]
```

### Export - 輸出報告
還有一個功能是可以將報告輸出，這邊可以參考官方文件，這邊就不多做介紹。如果是使用在CI/CD可以將測試報告在CI/CD上面顯示，這樣就能夠知道哪個方法效能比較好。

```cs
[HtmlExporter]
[AsciiDocExporter]
[CsvExporter]
[CsvMeasurementsExporter]
[PlainExporter]
[RPlotExporter]
```

備註 : 輸出位置會在 release 資料夾底下，如果要輸出到其他位置可以使用```--artifacts``` 語法。
![](/image/20231029_19-53-14.png)


## 結論
這工具花樣會相當多樣性，對於懶得寫 console.writeLine 來檢視效能的工程師來說，這是一個不錯的選擇。

依據上使用filter 可以證明，IEnumerable 執行與 array 差異不大外，可以多觀察list部分，不但記憶體上有差異，執行時間也有差異。專案處理上可能需要再評估處理。
---
## 參考文件
1. [C#: BenchmarkDotnet —— 效能測試好簡單](https://igouist.github.io/post/2021/06/benchmarkdotnet/)
2. [Github-BenchmarkDotNet](https://github.com/dotnet/BenchmarkDotNet/blob/master/docs/articles/guides/console-args.md)
