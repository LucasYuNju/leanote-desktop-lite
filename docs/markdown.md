### markdown编辑器的实现思路

**Block元素**
Block元素实现最为简单，可以在输入回车和空格时做判断

**Inline元素**
包括Link、Bold等
1. Selection脱离Inline源码时，转成Inline元素。（输入源码时，不会有任何变化）
2. Selection进入Inlin元素时，转成Inline源码
3. 保存时，将所有的Inline源码替换成Inline元素
