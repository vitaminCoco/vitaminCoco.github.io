浅复制 —-只是拷贝了基本类型的数据，而引用类型数据，复制后也是会发生引用，我们把这种拷贝叫做“（浅复制）浅拷贝”，换句话说，浅复制仅仅是指向被复制的内存地址，如果原地址中对象被改变了，那么浅复制出来的对象也会相应改变。

深复制 —-在计算机中开辟了一块新的内存地址用于存放复制的对象。

### 数组
#### 浅拷贝
```js
 let a = [1,2,3,4];
 let b = a;
```
#### 深拷贝
**1.for 循环**
```js
var arr = [1,2,3,4,5]
var arr2 = copyArr(arr)
function copyArr(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
     res.push(arr[i])
    }
    return res
}
```
**2.slice 方法**
```js
var arr = [1,2,3,4,5]
var arr2 = arr.slice(0)
```
**3.concat 方法**
```js
var arr = [1,2,3,4,5]
var arr2 = arr.concat()
```
**4.ES6扩展运算符**
```js
var arr = [1,2,3,4,5]
var [ ...arr2 ] = arr
```
---
### 对象
#### 浅拷贝
**1. = 赋值**
```js
let obj1 = {id: 1,value: 1,steps:[]};
let obj2 = obj1;
```
**2. Object.assign(target,source)**
```js
 let obj1 = {id: 1,value: 1,steps:[]};
 let obj2=Object.assign({},obj1) 
```
```js
 let obj2 = {};
 Object.assign(obj2,obj1)
```
**3.jQuery.extend( target [, object1 ] [, objectN ] )**
```js
 let obj1 = {id: 1,value: 1,steps:[]};
 let obj2 = $.extend({},obj1);
```

#### 深拷贝
**1.for 循环**
```js
var obj = {
  name: 'FungLeo',
  sex: 'man',
  old: '18'
}
var obj2 = copyObj(obj)
function copyObj(obj) {
  let res = {}
  for (var key in obj) {
    res[key] = obj[key]
  }
  return res
}
```
**复杂对象，利用递归来实现深拷贝**

**2.用JSON.stringify把对象转成字符串，再用JSON.parse把字符串转成新的对象**
```js
var obj = {
  name: 'FungLeo',
  sex: 'man',
  old: '18'
}
var obj2 = JSON.parse(JSON.stringify(obj))
```
**3.jquery.extend( [deep ], target, object1 [, objectN ] )**
```js
let obj1 = {id: 1,value: 1,steps:[]};
 let obj2 = $.extend(true,{},obj1);
```
**4.ES6扩展运算符**
```js
var obj = {
  name: 'FungLeo',
  sex: 'man',
  old: '18'
}
var { ...obj2 } = obj
```


