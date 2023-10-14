---
title: C# 實體化與抽象化
date: 2023-02-19 22:54:19
categories: 
  - 後端技術
  - C# 
  - 筆記
tags: 
  - C#
description:
keyword: 'C#'
cover: /image/20230219_22-54-19.png
---

## 實體類別
實體類別是具體的類別，可以直接實例化為物件，並對其進行操作。實體類別可以包含屬性、方法、事件等成員，並且可以被其他類別繼承。以下是一個示例：

```cs
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public void SayHello()
    {
        Console.WriteLine("Hello, my name is " + Name + " and I am " + Age + " years old.");
    }
}

// 實例化一個Person物件
Person p = new Person();
p.Name = "John";
p.Age = 30;

// 呼叫方法
p.SayHello();
```

## 抽象類別
抽象類別是一種特殊的類別，它不能直接實例化為物件，而是必須被其他類別繼承。抽象類別可以包含抽象方法、虛方法、屬性等成員，並且必須被子類實現。以下是一個示例：

```cs
public abstract class Shape
{
    public abstract double GetArea();

    public virtual void Draw()
    {
        Console.WriteLine("Drawing shape...");
    }
}

public class Circle : Shape
{
    private double radius;

    public Circle(double radius)
    {
        this.radius = radius;
    }

    public override double GetArea()
    {
        return Math.PI * radius * radius;
    }
}

// 實例化一個Circle物件
Circle c = new Circle(5.0);

// 呼叫方法
double area = c.GetArea();
Console.WriteLine("The area of the circle is: " + area);
```

在上面的例子中，Shape 是一個抽象類別，它包含一個抽象方法 GetArea() 和一個虛方法 Draw()，而 Circle 是一個實體類別，它繼承自 Shape 並實現了 GetArea() 方法。