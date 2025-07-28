---
title: '[Benchmarks] Database Connect 效能差異'
date: 2024-12-22 15:45:00
categories:
  - 後端技術
  - C#
tags: 
  - C#
  - 筆記
  - Benchmarks
description: 比較不同資料庫連線方式的效能差異，包括 DI 注入、直接建立 DbContext 以及使用連線池等方式
cover: /image/20250318_23-37-06.png
---

## 前言

在 .NET 專案中，連接資料庫的方式有多種選擇。本文將透過 BenchmarkDotNet 來比較三種常見的資料庫連線方式的效能差異：
1. 使用相依注入(DI)的 DbContext
2. 每次建立新的 DbContext
3. 使用連線池的新 DbContext

## 測試環境設定

測試程式使用以下配置：
- 測試資料量：1000 筆
- 啟動次數：1 次
- 預熱次數：3 次
- 迭代次數：50 次
- 每次迭代的調用次數：3 次

### 測試程式說明

1. **使用 DI 注入的 DbContext**
   - 使用單一 DbContext 實例
   - 適合於 Web 應用程式的 Scope 生命週期
   - 效能較好，但需注意 Change Tracker 的記憶體使用

2. **每次建立新的 DbContext**
   - 每次查詢都建立新的連線
   - 適合較簡單的查詢場景
   - 可能造成較多的資源消耗

3. **使用連線池的 DbContext**
   - 啟用 SQL Server 的連線池功能
   - 包含重試機制和查詢分割
   - 在高併發場景下較有優勢

### 程式碼架構

```csharp
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Engines;
using BenchmarkDotNet.Order;

namespace 資料庫連線.Benchmarks;

[MemoryDiagnoser]
[Orderer(SummaryOrderPolicy.FastestToSlowest)]
[RankColumn]
[SimpleJob(RunStrategy.ColdStart, 
    launchCount: 1,     // 啟動次數
    warmupCount: 3,     // 預熱次數
    iterationCount: 50, // 迭代次數
    invocationCount: 3  // 每次迭代中的調用次數
)]
public class DbConnectionBenchmarks
{
    private TestContext _context;
    private IConfiguration _configuration;
    private string _connectionString;
    private const int TestDataCount = 1000;

    [GlobalSetup]
    public void Setup()
    {
        // Setup configuration
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json");
        _configuration = builder.Build();
        _connectionString = _configuration.GetConnectionString("DefaultConnection");

        // Setup DbContext
        var options = new DbContextOptionsBuilder<TestContext>()
            .UseSqlServer(_connectionString)
            .Options;
        _context = new TestContext(options);

        // Ensure database exists and setup test data
        EnsureDatabaseExists();
    }

    private void EnsureDatabaseExists()
    {
        _context.Database.EnsureCreated();
        
        // 清空現有資料
        _context.TestEntities.RemoveRange(_context.TestEntities);
        _context.SaveChanges();

        // 添加測試資料
        var random = new Random(42); // 使用固定的種子以確保測試資料一致性
        var testData = Enumerable.Range(1, TestDataCount).Select(i => new TestEntity
        {
            Name = $"Test Entity {i}",
            CreateTime = DateTime.Today.AddDays(-random.Next(30)),
            Value = random.Next(1, 1000)
        });
        
        _context.TestEntities.AddRange(testData);
        _context.SaveChanges();
    }

    [Benchmark(Baseline = true, Description = "使用 DI 注入的 DbContext")]
    public async Task<(int count, decimal average)> WithDI()
    {
        var result = await _context.TestEntities
            .Where(x => x.CreateTime >= DateTime.Today.AddDays(-7))
            .ToListAsync();

        return (result.Count, result.Average(x => x.Value));
    }

    [Benchmark(Description = "每次建立新的 DbContext")]
    public async Task<(int count, decimal average)> WithoutDI()
    {
        var optionsBuilder = new DbContextOptionsBuilder<TestContext>();
        optionsBuilder.UseSqlServer(_connectionString);
        
        using var context = new TestContext(optionsBuilder.Options);
        var result = await context.TestEntities
            .Where(x => x.CreateTime >= DateTime.Today.AddDays(-7))
            .ToListAsync();

        return (result.Count, result.Average(x => x.Value));
    }

    [Benchmark(Description = "使用連線池的新 DbContext")]
    public async Task<(int count, decimal average)> WithConnectionPool()
    {
        var optionsBuilder = new DbContextOptionsBuilder<TestContext>();
        optionsBuilder.UseSqlServer(_connectionString, options => 
            options.EnableRetryOnFailure()
                   .UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
        
        using var context = new TestContext(optionsBuilder.Options);
        var result = await context.TestEntities
            .Where(x => x.CreateTime >= DateTime.Today.AddDays(-7))
            .ToListAsync();

        return (result.Count, result.Average(x => x.Value));
    }

    [GlobalCleanup]
    public void Cleanup()
    {
        _context.Dispose();
    }
}
```

## 效能比較結果

以下是三種連線方式的效能比較結果：

| Connection Method | Average Execution Time | Memory Allocation | Relative Benchmark | Rank |
|-------------------|------------------------|-------------------|--------------------|------|
| 使用 DI 注入的 DbContext | 4.105 ms               | 180.19 KB         | 1.00               | 1    |
| 每次建立新的 DbContext | 7.148 ms          | 421.16 KB         | 1.85               | 2    |
| 使用連線池的新 DbContext | 7.231 ms | 466.43 KB | 1.80 | 2 |

## 結論

1. DI 注入的方式效能最好，適合大多數應用場景
2. 連線池的方式效能接近 DI，且更適合高併發場景
3. 直接建立新 DbContext 的方式效能較差，但實作最簡單

## 使用建議

1. Web 應用程式建議使用 DI 注入方式
2. 批次處理或背景工作可考慮使用連線池
3. 簡單的工具程式可使用直接建立 DbContext 的方式

## 注意事項

1. 效能測試結果可能因環境而異
2. 需考慮實際應用場景選擇適合的連線方式
3. 記得適當釋放資源避免記憶體洩漏
