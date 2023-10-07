---
title: '[學習] Golang 基本使用(三) - 判斷式、迴圈'
date: 2022-10-29
categories:
  - 後端技術
  - Go
tags: 
  - Go
description:
keyword: 'Go'
cover: /image/20221207_21-26-48.png
---

# 判斷式
在分支判斷的控制上，Go 提供了 if...else、switch 語法，相較於其他提供類似語法的語言，例如 : c、c# 、java 等。
題外話 python 是沒有switch case必須要自己手動創建出來。

## 輸入方式
這章節會需要用到輸入，請各位參考下方輸入方法：
```go
var number int
fmt.Scanln(&number)
```

## IF 敘述
GO語言當中是無法使用單行可捨棄括號的敘述，優點會知道if範圍在哪。
go特性是此判斷式可以*不用使用括號*。
```go
package main
import "fmt"

func main() {
	var x int16
	fmt.Scanln(&x)
	fmt.Print("if Statement")
	if x > 10 {
		fmt.Printf("x = %d  is greater than 10\n", x)
	}
}
```

## IF ELSE敘述
Go語言對IF...ELSE敘述中，看出ELSE前面必須要有{} 相對嚴謹。對於IF....ELSE IF ...ELSE也是相同意思。
```go
package main
import "fmt"
func main() {
	var x int16
	fmt.Scanln(&x) //go 的輸入方式
	if x%2 == 0 {
		fmt.Printf("x = %d  is even\n", x)
	} else {
		fmt.Printf("x = %d is odd", x)
	}
}
```

## switch 語法
```go
package main
import "fmt"

func main() {
	var level rune
	var score = 88

	switch score / 10 {
	case 10, 9:
		level = 'A'
	case 8:
		level = 'B'
	case 7:
		level = 'C'
	case 6:
		level = 'D'
	default:
		level = 'E'
	}
	fmt.Printf("得分等級：%c\n", level)
}
```

注意，與 C/C++ 或 Java 等語言不同的是，Go 的 switch 比對成功後，不會自動往下執行，因而不用撰寫 break，有多個條件想符合時，在同一 case 中使用逗號區隔。如果真的想在比對成功後，往下一個 case 中的陳述執行，可以使用 fallthrough，例如 ：
```go
package main
import "fmt"

func main() {
    var level rune
    switch score := 100; score / 10 {
    case 10:
        fmt.Println("滿分喔！")
        fallthrough
    case 9:
        level = 'A'
    case 8:
        level = 'B'
    case 7:
        level = 'C'
    case 6:
        level = 'D'
    default:
        level = 'E'
    }
    fmt.Printf("得分等級：%c\n", level)
```
在上面的例子中，如果沒有 fallthrough，那麼只會顯示 “滿分喔！“，而不會執行 case 9 中的 level = 'A'，因此最後顯示得分等級時，不會有 A 的字眼。在上頭也可以看到，switch 中也可以使用 := 宣告與初始變數。
實際上，Go 的 switch 中， case 不用是常數，只要 switch 的值型態與 case 比對的型態符合，也可以是個變數或運算式，甚至還可以接受布林運算式，例如：

```go
package main
import "fmt"

func main() {
    var level rune
    score := 88
    switch {
    case score >= 90:
        level = 'A'
    case score >= 80 && score < 90:
        level = 'B'
    case score >= 70 && score < 80:
        level = 'C'
    case score >= 60 && score < 70:
        level = 'D'
    default:
        level = 'E'
    }
    fmt.Printf("得分等級：%c\n", level)
}
```

---

# 迴圈
使用迭代控制結構 (iteration control structure) 來達成反覆 (repeating) 或循環 (looping) 的行為，省下重覆的程式碼。

## 條件句 (conditional) 
做為迴圈終止條件。在這個 for 迴圈中，只要 cond 為真，for 區塊內的程式碼就會不間斷地反覆執行。
當 cond 不為真時，則 for 區塊會終止。我們會透過改變程式的狀態，讓 for 迴圈執行一定次數後停止。
使用方式如同 while 一樣 。

### 🧙‍♂️ 使用方式: 
```go
for conditional {
	// Run code here repeatedly.
}
```

### 使用範例 
```go
package main

func main() {
	rangeNum := 10
	index := 0
	for index < rangeNum {
		index++
	}
	println(index)

}
```
## 計數器 (counter loop)
for 迴圈使用計數器 (counter) 來做為迴圈的中止條件。當執行迴圈結構開端時，會檢查判斷是否是對的，就會去做執行。

### 🧙‍♂️ 使用方式: 
```go
for 初始值; 範圍 ; 動作 {
	// Run code here repeatedly.
}
```
### 使用範例
```go
package main

func main() {
	sum := 0
	rangeNum := 10
	for i := 0; i < rangeNum; i++ {
		sum++
	}
	println(sum)
}

```

## 無限迴圈 Infinite loop

其中範例除外[無限迴圈]，以下範例為infinite loop

### 🧙‍♂️ 使用方式: 
```go
for {
    //無限迴圈 (infinite loop)
}
```
例子中，for 迴圈會無限次地執行。這樣的迴圈稱為無限迴圈 (infinite loop)。
在 Go 語言使用無限迴圈時，會搭配 break 來終止迴圈。若要繼續執行就會使用 continue。


## For 範圍迴圈 For range loop
使用陣列時候，可以使用range 取得陣列的長度。

### 🧙‍♂️ 使用方式: 
```go
package main

func main() {
	strings := []string{"hello", "world"}
	for i, s := range strings {
		println(i, s)
	}
}

```


# Break、Continue、goto
一般情況是會在違反進入迴圈的限制條件時候，才會結束迴圈運作，若問題是重複執行特定某些的敘述特性外，包刮例外特性必須加上break 或是continue 之敘述，可以方便撰寫程式。

## break 敘述功能使用方式 
break 敘述除了在 switch 的選擇結構外，可以使用在迴圈結構。當執行到break 時候，會跳出程式迴圈結構，並在迴圈外層第一行敘述去做執行。
```go
package main

func main() {
	sum := 0
	i := 1
	for i < 5 {
		i++
		if i%2 != 0 { // skip odd numbers
			break
		}
		sum += i
	}
	println(sum)
}
```

## continue 敘述功能使用方式
continue 是不執行迴圈內部某些敘述。
在 for 迴圈結構內使用continue 執行到continue 會跳到該層的for迴圈內的第三部分，做迴圈變數增/減量。
```go
func main() {
	sum := 0
	i := 1
	for i < 5 {
		i++
		if i%2 != 0 { // skip odd numbers
			continue
		}
		sum += i
	}
	println(sum)
}
```
## goto 敘述功能使用方式

可以使用 goto 任意移動到同函式中其他位置。像是以下範例用 goto 模擬 break：
```go 
package main

func main() {
	sum := 0
	i := 5
	for i < 10 {
		i++
		if i%2 == 0 { // skip odd numbers
			goto END
		}
		sum += i
	}
END:
	println(sum)
}

```
當 i % 2 餘數為 0 ，會觸發 goto 敘述，跳到 END 標籤所在的位置。goto也可以當continue 如以下範例。

```go
package main

func main() {
	sum := 0
	i := 5
LOOP:
	for i < 10 {
		i++
		if i%2 == 0 { // skip odd numbers
			goto LOOP
		} else {
			sum += i
			break
		}
	}
	println(sum)
}

```
有些程式人視 goto 為邪惡的語法特性，甚至有些程式語言直接封印 goto。但適當地使用 goto，會讓程式碼更簡潔。


