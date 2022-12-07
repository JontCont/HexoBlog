---
title: '[學習] Golang 基本使用(二) - 資料型態、運算式'
categories:
  - 後端技術 
  - Go
tags: 
  - Go
description:
keyword: 'Go,Golang'
cover: /image/20221207_21-26-48.png
---
## 前言
接續 Go 安裝後，介紹 資料型態、運算式 功能、內容吧!!
內容會比較多，請慢慢觀看!!

# Golang特性
- 開放原始碼 (open source)
- 靜態型別的編譯語言；但語法類似於腳本語言 (scripting language)
- 跨平台 (cross-platform)
- 內建垃圾回收 (garbage collection)，可手動調整觸發時機
- 內建平行處理 (concurrency) 的語法
- 內建函式程式設計 (functional programming)
- 輕量級物件 (lightweight object) 系統
- 程式風格強制統一
- 快速編譯
- 內建開發相關工具
- 豐富的標準函式庫
- 成長中的社群資源

## 型態
Go 預先定義型態（Pre-declared Type），內建資料型態有布林(Boolean)、數字(Number)與字串(String)型態。
```go
//宣告方式
var <name> <type> //var <變數名稱> <資料型態>
var <name> <type> = expreesion//var <變數名稱> <資料型態> = 值
```
---
# 型態種類
## 布林(Boolean)
預定義型態也是具有名稱的型態（Named Type），布林型態名稱為 bool，只有兩個預先定義的常數 true 與 false，由於只有兩個值，因此在 Go 的規格書 中，並沒有明確提及 bool 的大小，雖然在 Go 官方網站的 The Go Playground 執行以下程式碼，會告訴你 bool 大小是 1：
```go
package main
import (
	"fmt"
	"unsafe"
)
func main() {
	//宣告方式
	var bo_T bool = true
	var bo_F = false
	
	fmt.Println("Boolean DataType Size >> ")
	fmt.Printf("True Size : %d , False Size : %d", 
	unsafe.Sizeof(bo_T), unsafe.Sizeof(bo_F))
}
```

## 數字(Number)
數字型態為整數與浮點數的集合，整數部份支援無號與有號整數，名稱分別為 uint 與 int，int 長度會與 uint 相同，而 uint 長度視平台實作而異，可能是 32 位元或是 64 位元。
 有號整數的型態名稱為 int8、int16、int32、int64，顧名思義，使用的長度分別為 8 位元、16 位元、32 位元與 64 位元，舉例來說，int32 可儲存的整數範圍為 -2147483648 到 2147483647，而 rune 為 int32 的別名，可用來儲存 Unicode 碼點（code point）。
![](/image/20221207_21-24-41.png)

 如果想要長度固定，無號整數的型態名稱為 uint8、uint16、uint32、uint64，顧名思義，使用的長度分別為 8 位元、16 位元、32 位元與 64 位元，舉例來說，uint8 可儲存的整數範圍為 0 到 255，這也是開發者熟悉的位元組型態，而在 Go 中，byte 正是　uint8 的別名。
![](/image/20221207_21-24-49.png)

### 範例 - 數字型態大小
```go
    fmt.Printf("uint8  : 0 ~ %d\n", math.MaxUint8)
	fmt.Printf("uint16 : 0 ~ %d\n", math.MaxUint16)
	fmt.Printf("uint32 : 0 ~ %d\n", math.MaxUint32)
	fmt.Printf("uint64 : 0 ~ %d\n", uint64(math.MaxUint64))
	fmt.Printf("int8   : %d ~ %d\n", math.MinInt8, math.MaxInt8)
	fmt.Printf("int16  : %d ~ %d\n", math.MinInt16, math.MaxInt16)
	fmt.Printf("int32  : %d ~ %d\n", math.MinInt32, math.MaxInt32)
	fmt.Printf("int64  : %d ~ %d\n", math.MinInt64, math.MaxInt64)
	fmt.Printf("整數預設型態: %s\n", reflect.TypeOf(1))
```
## 字串(String)
Go 的字串在實作上使用 UTF-8，就目前必須先知道的是，當使用雙引號包裹一系列文字，會產生字串型態，預設型態為 string，例如，"Justin" 會建立一個字串。
如果對字串使用 len 函式，傳回的會是位元組數量，而不是 Unicode 碼點的數量；如果使用 [] 搭配索引，取得特定索引位置的值，那麼傳回的會是 byte（uint8）型態。

## 其他型態
![](/image/20221207_21-25-01.png)

```go
package main
import "fmt"
func main() {
	var varByte byte = 'a'
	var varRun rune = '🧨'
	fmt.Printf("%c = %d and %c =%U\n", varByte, varByte, varRun, varRun)
}
```
---
# 運算子Operators
## 代數運算子 (Arithmetic Operators)
代數運算子用來進行基本的四則運算。以下是代數運算子：
- +：相加 
- -：相減
- *：相乘
- /：相除
- %：取餘數
![](/image/20221207_21-25-12.png)

由於四則運算的原理相當簡單，讀者可試著自行閱讀程式碼。要注意在進行除法運算時，整數 (integer) 和浮點數 (floating point number) 會有不同的行為。
由於浮點數內部儲存數字的方式和整數相異，浮點數運算可能會產生誤差，故我們在比較浮點數的運算結果時，不會直接用相等 == 來比較，而會確認運算結果的誤差在許可範圍內。我們使用 math 套件的 [Abs](https://pkg.go.dev/math#Abs) 函式取得誤差的絕對值 (absolute value)，以消除正負號所帶來的誤判。

```go
package main
import (
	"fmt"
	"math"
	"os"
	"runtime"
)
func main() {
	assert(4+3 == 7, "4 + 3 should be 7")
	assert(4-3 == 1, "4 - 3 should be 1")
	assert(4*3 == 12, "4 * 3 should be 12")
	assert(4/3 == 1, "4 / 3 should be 1")
	assert(math.Abs(4.0/3.0-1.333333) < 0.00001, "4.0 / 3.0 should be 1.333333")
	assert(4%3 == 1, "4 % 3 should be 1")
}
func assert(cond bool, msg string) {
	_, f, l, _ := runtime.Caller(1)
	if !cond {
		fmt.Fprintf(os.Stderr, "Failed on (%s:%d): %s", f, l, msg)
		os.Exit(1)
	}
}
```

## 二元運算子 (Bitwise Operators)
二元運算子也是代數運算子。但二元運算的概念和一般的代數運算有一些差異，故我們將其分開。以下是二元運算子：
- &：bitwise AND
- |：bitwise OR
- ^：bitwise XOR
- &^：bit clear
- <<：左移 (left shift)
- (>>)：右移 (right shift)
![](/image/20221207_21-25-22.png)

由於二元運算在日常生活中不會接觸到，我們把運算過程寫在註解中，供讀者參考。
```go
import (
	"fmt"
	"os"
	"runtime"
)
func main() {	
	/* 3 is 0011
	   5 is 0101 */
	/*    0011
	   &) 0101
	  ---------
	      0001  */
	assert((3 & 5) == 1, "3 & 5 should be 1")	

    /*    0011
	   |) 0101
	  ---------
	      0111  */
    assert((3 | 5) == 7, "3 | 5 should be 7")	

    /*    0011
	   ^) 0101
	  ---------
	      0110  */	
    assert((3 ^ 5) == 6, "3 ^ 5 should be 6")		
    
    /* <<) 0000 0101
	  ---------------
	       0000 1010  */	
    assert((5 << 1) == 10, "5 << 1 should be 10")		

    /* >>) 0000 0101
	  ---------------
	       0000 0010  */
    assert((5 >> 1) == 2, "5 >> 1 should be 2")
}

func assert(cond bool, msg string) {
    _, f, l, _ := runtime.Caller(1)
    if !cond {
        fmt.Fprintf(os.Stderr, "Failed on (%s:%d): %s", f, l, msg)
        os.Exit(1)
    }
}
```

## 比較運算子 (Comparison(Relational) Operators) 
比較運算子用來比較兩項資料的大小，比較後會回傳布林值。以下是比較運算子：
- ==：相等
- !=：不相等
- <：小於
- <=：小於等於
- (>)：大於
- (>=)：大於等於
 ![](/image/20221207_21-25-33.png)

以下是簡短的實例：
```go
package main
import (
	"fmt"
	"os"
	"runtime"
)
func main() {
	assert(4 == 4, "4 should be equal to 4")
	assert(4 != 3, "4 should not be equal to 3")
	assert(4 > 3, "4 should be greater than 3")
	assert(4 >= 3, "4 should be greater than or equal to 3")
	assert(4 < 5, "4 should be less than 5")
	assert(4 <= 5, "4 should be less than or equal to 5")
}
func assert(cond bool, msg string) {
	_, f, l, _ := runtime.Caller(1)
	if !cond {
		fmt.Fprintf(os.Stderr, "Failed on (%s:%d): %s", f, l, msg)
		os.Exit(1)
	}
}
```
## 邏輯運算子 (Logical Operators)  
邏輯運算子用於布林運算，包括以下三種運算子：
- &&：且 (and)
- ||：或 (or)
- !：非 (not)
![](/image/20221207_21-25-46.png)

以下是簡短的實例：
```go
package main
import (
	"fmt"
	"os"
	"runtime"
)
func main() {
	assert((true && true) == true, "Wrong logic")
	assert((true && false) == false, "Wrong logic")
	assert((false && true) == false, "Wrong logic")
	assert((false && false) == false, "Wrong logic")
	assert((true || true) == true, "Wrong logic")
	assert((true || false) == true, "Wrong logic")
	assert((false || true) == true, "Wrong logic")
	assert((false || false) == false, "Wrong logic")
	assert((!true) == false, "Wrong logic")
	assert((!false) == true, "Wrong logic")
}
func assert(cond bool, msg string) {
	_, f, l, _ := runtime.Caller(1)
	if !cond {
		fmt.Fprintf(os.Stderr, "Failed on (%s:%d): %s", f, l, msg)
		os.Exit(1)
	}
}
```
# 其他運算子

## 位址運算子 (Address Operators
位址運算子有以下兩種：
- *
- &
在不同情境，位址運算子有不同的意義。基礎的財經運算用不到位址運算子，日後有機會時會在介紹指標時用到位址運算子。

## 接收運算子 (Receive Operator)
接收運算子有以下符號：
- <-
接收運算子用在通道。基礎的財經運算用不到共時性程式，故不會用到接收運算子。
![](/image/20221207_21-25-57.png)

# 運算子-補充
## 型別轉換
Go 語言為了避免不經意的錯誤，不能直接把不同型別的資料相結合。例如，在 Go 程式中不能把整數和浮點數直接相加。轉換型別的方式是用 T(x)；像是 float(3) 會把整數 3 轉為浮點數 3.0。

## 運算子優先順序 

為了處理在單一敘述中出現多個運算子的情境，程式語言有內建的運算子優先順序。像是 Golang 官方提供了一份運算子優先順序的[清單](https://golang.org/ref/spec#Operators)。
但程式設計者甚少背誦運算子優先順序。因為：
- 運算子的優先順序和數學的概念相同
- 可藉由簡化敘述來簡化運算子的使用
- 可使用括號來改變運算子優先順序
---

# 常數
## 常數特性
常數試紙不能更便的數值(value)，執行的期間是不能做更改。常數與變數宣告都是相同，但不是使用var關鍵字，則是使用const關鍵字，依據宣告常數名稱記得設為大寫。
宣告常數的好處在於常數宣告後即不能修改。若我們試圖修改常數，會在程式編譯時引發錯誤，提醒我們必需改掉錯誤的動作。
```go
//常數使用方式
const <constant_name> = value
```
## 跳脫序列 Escape Sequence 
![](/image/20221207_21-26-09.png)