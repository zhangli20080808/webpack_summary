// import logo from './logo.png';
import './index.less';
import counter from "../../counter";
import number from "../../number";

counter()
number()

//hmr是否开启 要监控哪一个模块
if (module.hot) {
    module.hot.accept("../../number", function () {
        document.body.removeChild(document.getElementById("number"
        ));
        number();
    });
}
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

