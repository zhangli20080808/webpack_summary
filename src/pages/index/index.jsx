// import "@babel/polyfill" //es6 7 8 index到了1M 体积变大 去优化 ，用哪些打包哪些
// 这里我们引入了less但是 不是es module的那种形似 而且我们还开启了 tree shaking 会默认为我们的 less文件没用到
import './index.less'
import logo from './logo.png';
// import counter from "../../counter";
// import number from "../../number";
//
// counter()
// number()
//
// //hmr是否开启 要监控哪一个模块  注意开启之后 contenthash chunkhash要注意规避
// if (module.hot) {
//     module.hot.accept("../../number", function () {
//         document.body.removeChild(document.getElementById("number"
//         ));
//         number();
//     });
// }
// import axios from 'axios';
// axios.get('/api/banner').then((res) => {
//   console.log(res.data);
// });
// import "./index.less";

var img = new Image();
img.src = logo;
img.classList.add('logo');

var root = document.getElementById('root');
root.append(img);
document.body.appendChild(root)
//
// document.write('hello webpack!!!，今天的心情有点起伏');
// console.log('hello');

// var btn = document.createElement("button");
// btn.innerHTML = "新增";
// document.body.appendChild(btn);
// btn.onclick = function() {
//   var div = document.createElement("div");
//   div.innerHTML = "item";
//   document.body.appendChild(div);
// };


// const arr = [new Promise(() => {
// }), new Promise(() => {
// })];
// arr.map(item => {
//     console.log(item);
// });

// import React, {Component} from "react";
// import ReactDom from "react-dom";
// import _ from 'lodash'
//
// // import $ from 'jquery'
//
// class App extends Component {
//     handle = () => {
//         // $('#div').html('123')
//     }
//
//     render() {
//         return <div id='div' onClick={this.handle}>{_.join(['this', 'is', 'zl'])}</div>;
//     }
// }
//
// ReactDom.render(<App/>, document.getElementById("root"));
//

// import { add } from "../../counter";
// add(1, 2);

// btn.onclick = function() {
//   import(/* webpackPrefetch: true */ "LoginModal");
// };
//当用户点击的时候才动态加载这个loginmodal模块，那么会不会这个模块开始的时候是没有内容的呢？

//当前网络清闲的时候，自己加载

//webpack推荐的代码方式就是异步的，这里面的异步是指动态加载，合理的使用模块组件

// prefetch 会在父 chunk 加载结束后开始加载。

//
// async function getComponent() {
//     //魔法注释
//     const {default: _} = await import(/* webpackChunkName:"lodash" */'lodash')
//     const element = document.createElement('div');
//     element.innerHTML = _.join(['z', 'l'], '-');
//     return element;
// }
// getComponent().then(element => {
//     document.body.appendChild(element);
// });
