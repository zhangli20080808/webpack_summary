import logo from "./logo.png";
import "./index.less";

var img = new Image();
img.src = logo;
img.classList.add("logo");

var root = document.getElementById("root");
root.append(img);

document.write("hello webpack!!!，今天的心情有点起伏");
console.log("hello");
