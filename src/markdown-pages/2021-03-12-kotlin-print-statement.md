---
title: Kotlin Print Statement
date: "2021-03-12"
thumbnail: "../thumbnails/kotlin.png"
subject: Kotlin
topic: Kotlin Print Statement
topicIndex: 1
keywords:
  - Kotlin Print
  - Kotlin Print Statement    
slug: kotlin-print-statement
---

In Kotlin you can use println() and print() to print something. Lets take an example. To print something we need write below statement - 

```typescript
fun main(args: Array<String>) {

    //print something
    print("something!")
}
```

After printing "something" the execution will be on the same line. 


If you want to move execution to the next line after printing then use below statement - 

```js
fun main(args: Array<String>) {

    //print something
    println("something!")
}
```

Notice in above statement that instead of just `print()` we used `println()`. 
After printing the output the execution will go to the next line.


Variable parameters or function call outputs can also be printed like below -
```js
 //print string with variable paramteres
    println("count is ${count}")
```

```js
fun main(args: Array<String>) {
    System.out.println("Hello & ${getGreeting()}")
}

fun getGreeting(): String {
    return "Welcome"
}
```
