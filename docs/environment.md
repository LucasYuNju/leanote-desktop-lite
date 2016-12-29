# 环境搭建

### render process可以做什么

对于刚开始使用electron的同学来说，最神奇的莫过于能够在render process中执行node代码了。在通常的浏览器环境中，js代码在沙盒中运行，不允许访问任何本地的资源，但是对electron而言，web页面能够访问node的API，和底层的操作系统进行交互。

处于安全和稳定性的考虑，GUI相关的组件，render process不可以直接访问，必须借助remote对象。

webpack的target需要设置为electron-renderer。否则require("electron")的时候，真的会把node_modules/electron的代码给链接进去了。我们实际上要访问的是electron运行时生成的remote。
