// import "@babel/polyfill" //es6 7 8 index到了1M 体积变大 去优化 ，用哪些打包哪些
import './index.less';
// import logo from './logo.png';
// import counter from "../../counter";
// import number from "../../number";
//
// counter()
// number()
//
// //hmr是否开启 要监控哪一个模块
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
// import "./index.css";

// var img = new Image();
// img.src = logo;
// img.classList.add('logo');
//
// var root = document.getElementById('root');
// root.append(img);
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

// npm i babel-loader @babel/core @babel/preset-env -D

//babel-loader是webpack 与 babel的通信桥梁，不会做把es6转成es5的⼯作
// 这部分⼯作需要⽤到@babel/preset-env来做 @babel/preset-env⾥包含了es6转es5的转换规则

const arr = [new Promise(() => {
}), new Promise(() => {
})];
arr.map(item => {
    console.log(item);
});

// 通过上⾯的⼏步 还不够，Promise等⼀些还有转换过来，这时候需要借助
// @babel/polyfill，把es的新特性都装进来，来弥补低版本浏览器中缺失的特性以全局变量的⽅式注⼊进来的。windows.Promise，它会造成全局对象的污染


// 会发现打包的体积⼤了很多，这是因为polyfill默认会把所有特性注⼊进
// 来，假如我想我⽤到的es6+，才会注⼊，没⽤到的不注⼊，从⽽减少打包
// 的体积，可不可以呢


// 当我们开发的是组件库，⼯具库这些场景的时候，polyfill就不适合了，因
// 为polyfill是注⼊到全局变量，window下的，会污染全局环境，所以推荐闭
// 包⽅式：@babel/plugin-transform-runtime


// @babel/plugin-transform-runtime  它不会造成全局污染
//
// npm install --save-dev @babel/plugin-transform-runtime
// npm install --save @babel/runtime