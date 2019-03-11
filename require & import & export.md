# require与import和export   

为什么会出现模块概念？因为有了模块，理想情况下，开发者只需要实现核心的业务逻辑，其他的可以加载别人已经谐号的模块。但是，Javascript不是一种模块化编程语言，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。js社区做了很多努力，在ES6之前，在现有的环境中，制定了一些模块加载方案。


**前端模块规范：**`CommonJs` ,`AMD`, `CMD`
+ *CommonJs*用在服务器端，由`Node`推广使用，*AMD*和*CMD*用在浏览器环境
+ CommonJS通过`module.exports`和`exports`暴露模块，用过全局性方法require()加载模块
+ AMD和CMD都是采用特定的define（）函数来定义，用require()来引用模块,但是不用于CommonJS,它要求两个参数

> require([module], callback); 第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数.  

+ *AMD*是`RequireJS`在推广过程中对模块定义的规范化产出
+ *CMD*是`SeaJS`在推广过程中对模块定义的规范化产出
+ *AMD*：依赖前置，js可以方便知道依赖模块是谁，立即加载
+ *CMD*：就近依赖，运行到需加载，根据顺序执行

> define(id?, dependencies?, factory)
+ id:字符串，模块名称(可选)
+ dependencies: 是我们要载入的依赖模块(可选)，使用相对路径。,注意是数组格式
+ factory: 工厂方法，返回一个模块函数

---

## require
```
//CommonJS规范
math.js
exports.add = function () {
      var sum = 0, i = 0, args = arguments, l = args.length;
      while (i < l) {
         sum += args[i++];
      }
      return sum;
}
index.js
var math = require('math'); //加载一个数学模块math.js
math.add(2,3); //然后就可以调用模块提供的方法
```

```
//AMD规范
// math.js
　　define(function (){
　　　　var add = function (x,y){
　　　　　　return x+y;
　　　　};
　　　　return {
　　　　　　add: add
　　　　};
　　});
//index.js
      require(['math'], function (math) {
　 math.add(2, 3);
      });
```
### module.exports与exports的区别
从API文档上面的可以看出，从require导入方式去理解，关键有两个变量（全局变量module.exports,局部变量exports），一个返回值（module.exports)

> 注意：
1.每个js文件一创建，都有一个var exports = module.exports = {},使exports和module.exports都指向一个空对象；
2.module.exports和exports所指向的内存地址相同

```
function require(...) {
     var module = { exports: {} };
    ((module, exports) => {
          // 你的被引入代码 Start
         // var exports = module.exports = {}; (默认都有的)
          function some_func() {};
          exports = some_func; // 此时，exports不再挂载到module.exports，
          //注意：不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系
         // export将导出{}默认对象
        module.exports = some_func; // 此时，这个模块将导出some_func对象，覆盖exports上的some_func
     // 你的被引入代码 End
    })(module, module.exports);
      // 不管是exports还是module.exports，最后返回的还是module.exports
      return module.exports;
}
```
---

_ES6_标准发布后，module成为标准，标准使用是以`export`指令导出接口，以`import`引入模块，但是在我们一贯的node模块中，我们依然采用的是CommonJS规范，使用require引入模块，使用module.exports导出模块。
> ES6模块的设计思想是尽量的静态化，是的编译时就能确认模块的依赖关系，以及输入和输出的变量。CommonJS和AMD模块，都只能在运行时确定这些东西。

## export
export语法声明用于导出函数、对象、指定文件（或模块）的原始值
> 注意：在node中使用的时exports，不要混淆了

export有两种模块导出方式：命名式导出（名称导出）和默认导出（定义式导出），命名式导出每个模块可以多个，而默认导出每个模块仅一个。export在导出接口的时候，必须与模块内部的变量具有一一对应的关系。
```
  export { name1, name2, …, nameN }; //命名式导出
  export default expression; //默认导出
```
---

## import
import语法用于从已导出的模块、脚本中导入函数、对象、指定文件（或模块）的原始值。
import模块导入与export模块导出功能相对应，也存在两种模块导入方式：命名式导入（名称导入）和默认导入（定义式导入）。
> import的语法跟require不同，而且import必须放在文件的最开始，且前面不允许有其他逻辑代码

```
import defaultMember from "module-name"; //默认导入
import { member } from "module-name"; //命名式导入（花括号里面的变量与export后面的变量一一对应）
import "module-name"; //导入一个模块，但不进行任何绑定
```

### import()
+ import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行,导致无法在运行时加载模块,因此引入import()函数，完成动态加载。
+ import命令能够接受什么参数，import()函数就能接受什么参数，两者区别主要是后者为动态加载。
+ import()返回一个 Promise 对象

```
const main = document.querySelector('main');
import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```

> import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。另外，import()函数与所加载的模块没有静态连接关系，这点也是与import语句不相同。import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。

适用场合：
 1. 按需加载
 2. 条件加载
 3. 动态的模块路径












