---
title: Kotlin Arithmetic Operators
date: "2021-03-13"
thumbnail: "../thumbnails/kotlin.png"
subject: Kotlin
topic: Kotlin Arithmetic Operators
topicIndex: 2
keywords:
  - Kotlin Operators
  - Kotlin Arithmetic Operators    
slug: kotlin-arithmetic-operators
---

Kotlin has different set of operators for each of Arithmetic, Assignment and Comparison operations. Here in this article we will look at Arithmetic Operators.

## What are Operators ??

`Operators are special symbols or charactors that perform operation on operands.` Like `+ - * /` these all are operators. 

Operands can be values or variables.

```js
Example: 1 + 2 
```

`+` : here + is operator

`1 & 2` : here 1 & 2 are called operands on which addition operation would take place.



## 1. Arithmetic Operators


```js
fun main(args: Array<String>) {
    
    val x = 5.0
    val y = 2.0
    var result: Double

    result = x - y
    println("x - y = $result")

    result = x + y
    println("x + y = $result")

    result = x * y
    println("x * y = $result")

    result = x / y
    println("x / y = $result")
}
```


Output for above code will be:

```js
x - y = 3.0
x + y = 7.0
x * y = 10.0
x / y = 2.5
```

We can use corresponding function for each arithmetic operations.

```js
fun main(args: Array<String>) {

    val x = 5.0
    val y = 2.0
   
    println("x - y = ${x.minus(y)}")

    println("x + y = ${x.plus(y)}")
    
    println("x * y = ${x.times(y)}")
    
    println("x / y = ${x.div(y)}")
}

```

