# Refs



Refs 知识点

https://mp.weixin.qq.com/s?__biz=MzIxNjgwMDIzMA==&mid=2247484399&idx=1&sn=e865eb3f967639477a05262d0ddf09af&chksm=9782cd66a0f544700894ede3a1b02882585a738a0b3c31a56a8b297bd4b878d6f57d8c790fea&mpshare=1&scene=1&srcid=&sharer_sharetime=1572998605426&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd





```tsx
import React, { forwardRef } from 'react';

// Refs 的使用
// 什么是 Refs, Refs 提供了一种方法，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素
// 有什么用？可以通过Dom操作节点
// 怎么说？怎么操作，具体的案例有吗
// 例如在 MyComponent 里，我使用 React.createRef() 创建了一个 ref（myRef），在render时挂载到
// div 元素上，这是我们可以通过DOM操作来控制这个元素，
// 使用方法是 this.myRef.current ,如例2 MyComponent1，
// 截图可得，我们已经取到了class为myref的div节点。当我们得到这个节点后，就可以通过Dom操作（像
// Jquery那样操作）来改变组件中的值
// 一种在 class 情况下使用 this.myRef = React.createRef()
// 但是在 hook 中也可以使用

class MyComponent extends React.Component {
    myRef: any;
    constructor(props: any) {
        super(props);
        this.myRef = React.createRef();
    }
    render() {
        return <div ref={this.myRef} />;
    }
}

class MyComponent1 extends React.Component {
    myRef: any;
    constructor(props: any) {
        super(props);
        this.myRef = React.createRef();
    }
    componentDidMount() {
        const node = this.myRef.current;
        console.log('node', node);
    }
    render() {
        return <div className="myref" ref={this.myRef}>1111</div>;
    }
}


class TestClassButton extends React.Component {
    buttonRef: any;
    textRef: any;
    constructor(props: any) {
        super(props)
        this.buttonRef = React.createRef();
        this.textRef = React.createRef();
    }

    render() {
        return (
            <div>
                <span>111</span>
                <button ref={this.buttonRef}>点击按钮</button>
                {/* <MyFunctionComponent ref={this.textRef} /> */}
            </div>
        )
    }
}

// 默认情况下，你不能在函数组件上使用 ref 属性，因为它们没有实例
// function MyFunctionComponent() {
//     return <input />;
// }

// class Parent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.textInput = React.createRef();
//     }
//     render() {
//         // 代码不能运行
//         return (
//             <MyFunctionComponent ref={this.textInput} />
//         );
//     }
// }
// 如上代码所示，函数式组件没有实例
// 如果要在函数组件中使用 ref ，可以使用 forwardRef（转发）
const MyFunctionComponent = forwardRef((props: any, ref: any) => {
    return <input ref={ref} value={props.value} />;
})

class Parent extends React.Component {
    textInput: any
    constructor(props: any) {
        super(props);
        this.textInput = React.createRef();
    }
    render() {
        // 代码不能运行
        return (
            <MyFunctionComponent ref={this.textInput} value={'11111'} />
        );
    }
}
// 也就是说如果你要在外部通过ref控制函数组件ref的话，就可以用 forwwardRef 来实现，它一般与
//  useImperativeHandle 结合（ref能做的事情很多， useImperativeHandle 限制暴露的api）
// 不管怎么样，在函数组件内部使用 ref 属性是都可以的 (useRef)

export default React.memo(Parent);
```



react-ref

https://www.robinwieruch.de/react-ref