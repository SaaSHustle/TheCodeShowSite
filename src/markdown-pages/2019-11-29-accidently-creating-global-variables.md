---
title: Accidentally Creating Global Variables
date: "2019-11-29"
thumbnail: "../thumbnails/js.png"
subject: JavaScript
topic: Javascript Global Variables
topicIndex: 1
keywords:
  - JavaScript Variables
  - JavaScript Global Variables   
slug: accidently-creating-global-variables
---

## What `typeof a` and `typeof b` evaluates ?

```js
function foo() { 
let a = b = 0;
 a++;
 return a;
 } 
 foo(); 
 typeof a; // => ???
 typeof b; // => ???
```

## Output:

typeof a; // => `undefined`

typeof b; // => `number`


## Explanation:

Let a=b=0;  `This statement declares a and b in different way.`

`typeof a;  evaluates undefined` because a is accessed out of its scope. a is declared in function scope foo(). So scope of a is within function foo itself. 

`typeof b; evaluates number` because b is neither declared in function foo scope or global scope. So JavaScript interprets b =0 as window.b =0. So Typeof b is number.

So in other words b is an *implicit global variable created accidently.*


**Above snippet is equivalent to :**

```js
function foo() {

 let a;
 window.b = 0;
 a = window.b;
 a++;
  return a;
}

foo();
typeof a;        // => 'undefined'
typeof window.b; // => 'number'
```





-----------------------------------------------------------------------------------------------------------------------------


## What is the Output of following code snippet?

```js
function foo() {
    var variable1, variable2;

    variable1 = 5;
    varaible2 = 6;
    return variable1 + variable2;
}

foo();
```

## Output:

NaN

## Explanation: 

It output NaN not 11. Because of typo varaible2 = 6. And it creates a global variable with the typo'd name.

```js
function foo() {
    var variable1, variable2;

    variable1 = 5;
    varaible2 = 6;
    return variable1 + variable2;
}
console.log(foo());     // NaN
console.log(varaible2); // 6
console.log(window.varaible2);
```


Since `varaible2` is not declared anywhere (See line *varaible2 =6;*) javascript add new property on the global window object. That's just a "feature" of loose-mode JavaScript, assigning to a completely undeclared identifier isn't an error; instead, it creates a property on the global object, and properties on the global object are global variables. 

To avoid this user strict mode. Strict mode makes assigning to an undeclared identifier an error rather than silently creating a global variable.


```js
"use strict"; // Turns on strict mode for this compilation unit

function foo() {
    var variable1, variable2;

    variable1 = 5;
    varaible2 = 6;                 // <=== Uncaught ReferenceError: varaible2 is not defined
    return variable1 + variable2;
}
console.log(foo());
```


The scope chain is how JavaScript resolves unqualified references. In any given execution context (e.g., global code or function), there is a chain of objects that the JavaScript engine looks to when resolving an unqualified reference: It first checks to see if the top object has a property with the given name, and uses that property if it does; if not, it checks the next object in the chain, etc. The global object is always the last object in the chain. If the engine gets all the way down to the global object and we're assigning a value to the unqualified reference, the reference is assigned as a property of the global object. And since properties don't have to be declared in advance, voilá, implicit globals.


