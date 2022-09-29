---
title: xcrun error invalid active developer path
date: "2021-03-08"
thumbnail: "../thumbnails/command-window.png"
subject: Command Line
topic: Command Line xcrun error
topicIndex: 1
keywords:
  - Command Line xcrun error
  - Command Line active developer path  
slug: xcrun-error-invalid-active-developer-path
---

```js
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

After my Mac updated to BigSur OS, I tried to check status of one of my git project using `git status` on command line. 

Once I hit `git status` command I got this error that says

`xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun`


Actually problem is that the Xcode Command-line Tools needs to be updated.

## Solution

Go back to your terminal and enter:
```js
xcode-select --install
```
this will install latest Xcode Command-Line Tools.

You'll then receive the following output:

`xcode-select: note: install requested for command line developer tools`

Try now hitting `git status`. 
## Volla! It worked!
