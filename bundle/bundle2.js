//找到入口文件，分析内容，有依赖的话，拿到依赖路径,转换代码（浏览器里可以运行的）
const path = require("path");
const fs = require("fs");

//借助 babel/parser 会将文件内容转成抽象语法树
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

const entry = entryFile => {
  const content = fs.readFileSync(entryFile, "utf-8");
  const ast = parser.parse(content, {
    sourceType: "module"
  });

  const dependecies = {};
  traverse(ast, {
    //以函数的方式

    ImportDeclaration({ node }) {
      const dirname = path.dirname(entryFile);
      const newPath = "./" + path.join(dirname, node.source.value);
      dependecies[node.source.value] = newPath;
    }
  });

  const { code } = transformFromAst(ast, null, {
    presets: ["@babel/preset-env"]
  });

  return {
    entryFile,
    dependecies,
    code
  };
};

// //分析出所有依赖关系
//
// const Dependecies = entryFile => {
//   const info = entry(entryFile);
//
//   const modules = [];
//   modules.push(info);
//
//   for (let i = 0; i < modules.length; i++) {
//     const item = modules[i];
//     const { dependecies } = item;
//     if (dependecies) {
//       for (let j in dependecies) {
//         modules.push(entry(dependecies[j]));
//       }
//     }
//   }
//
//   const obj = {};
//   modules.forEach(item => {
//     obj[item.entryFile] = {
//       dependecies: item.dependecies,
//       code: item.code
//     };
//   });
//   return obj;
// };
//
// //生成代码
//
// const genCode = entryFile => {
//   const obj = Dependecies("./src/index.js");
//   const graph = JSON.stringify(obj);
//   const bundle = `(function(graph){
//     function require(module){
//         function localRequire(relativePath){
//           return require(graph[module].dependecies[relativePath])
//         }
//         var exports = {};
//         (function(require,exports,code){
//             eval(code)
//         })(localRequire,exports,graph[module].code);
//         return exports;
//     }
//     require('${entryFile}')
//   })(${graph})`;
//
//   fs.writeFileSync(path.resolve(__dirname, "./dist/main.js"), bundle, "utf-8");
// };
//
// genCode("./src/index.js");
