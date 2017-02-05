slate的元素分为三大类

### Block
如Header和List，这类元素的自动format，可以利用空格和回车触发，实现起来最简单

### Inline
如link，这类节点较为复杂
1. 通过regex，从text中找到符合的代码，用Inline节点包裹
2. selection进入Inline节点的时候，将Inline节点的**内容**替换成源码
3. selection离开Inline节点的时候，或者保存的时候，将Inline节点的源码替换成实际内容

### Mark
包括bold和italic等，逻辑和Inline节点不太相同。为了易于实现，假定不会出现多个mark嵌套的情况
1. 通过regex，从text中找到符合的代码，用相应的Mark标记
2. selection进入某一Mark的范围的时候，如果Mark的内容不是源码，替换成源码
3. selection离开某一Mark的时候，或者保存的时候，将Mark节点的源码替换成实际内容

当然，这些只是思路，实现时会遇到各种tricky的问题。
