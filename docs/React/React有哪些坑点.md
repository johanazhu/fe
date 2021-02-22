# React有哪些坑点？



1、JSX做表达式判断时，需要强转未boolean类型，如：

```jsx
render() {
    const b = 0;
    return (
    	<div>
        	{
                !!b && <div>这是一段文字</div>
            }
        </div>
    )
}
```

如果不使用!!b 进行强转数据类型，会在页面里面输出 0

https://github.com/yacan8/blog/issues/18



2. 如果key不变，数据就不会变，如果两列数据为[1, 2, 3] ,[1, 2, 3, 4, 5, 6]点击第一组数据中的任意项，此数据标红，且展示第二组数据，如果展示UI时，key为index，那么前三是不会被替换的，你看的会是数据标红了且是第二条数据