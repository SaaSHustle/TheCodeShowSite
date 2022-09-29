---
title: How to convert NSString to NSDate and back again using NSDateFormatter in any format - Objective C ?
date: "2021-03-09"
thumbnail: "../thumbnails/xcode.png"
subject: IOS
topic: IOS NSDateFormatter
topicIndex: 1
keywords:
  - IOS NSString
  - IOS NSDate
  - IOS NSDateFormatter
slug: convert-NSString-to-NSDate-and-back-again-using-NSDateFormatter
---

How to convert NSString to NSDate and back again using NSDateFormatter in any format - Objective C ?

## Convert NSString to NSDate

```js
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    formatter.dateFormat = @"MMMM dd, yyyy";
    formatter.locale = [NSLocale localeWithLocaleIdentifier: @"en_US_POSIX"];
    NSString *dateString = @"April 15, 2021";
    NSDate *date = [formatter dateFromString:dateString];
```


While using fixed format dates we need to set the date formatter locale to “en_US_POSIX”

**en_US_POSIX** is a locale designed to yield US English results regardless of both user and system preferences.


en_US_POSIX will be **invariant** with time and platforms.

 If en_US might change in future it will not impact how en_US_POSIX format dates. So it's safe to use en_US_POSIX while working on fixed format dates.



## convert NSDate to NSString

```js
     formatter.locale = [NSLocale currentLocale];
     NSString *newString =  [formatter stringFromDate:date];
```
