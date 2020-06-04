//找到入口文件，分析内容，有依赖的话，拿到依赖路径,转换代码（浏览器里可以运行的）
const path = require("path");
const fs = require("fs");

//借助 babel/parser 会将文件内容转成抽象语法树 分析出文件右哪些节点 每个节点都是什么类型
//我们最想拿到的就是这个文件路径
const parser = require("@babel/parser");
//接受一个抽象语法树
const traverse = require("@babel/traverse").default;
const {transformFromAstSync} = require("@babel/core");


const entry = entryFile => {
    // 读取内容
    const content = fs.readFileSync(entryFile, "utf-8");
    // console.log(content)
    // 抽象语法树
    const ast = parser.parse(content, {
        sourceType: "module"
    });
    // console.log(ast.program) //ImportDeclaration import引入 ExpressionStatement 表达式  两个节点
    //提取路径  node.source.value

    const dependecies = {}   //存储依赖路径 {入口文件:项目文件路径}
    traverse(ast, {
        ImportDeclaration({node}) {
            const dirname = path.dirname(entryFile);
            // console.log(node.source.value)
            const newPath = './' + path.join(dirname, node.source.value)
            //  拿到现对于src的路径  入口文件路径
            dependecies[node.source.value] = newPath
        }
    })
    // console.log(dependecies)
    //code, map, ast
    const {code} = transformFromAstSync(ast, null, {
        //分析ast 将其转化成js代码 规则参考 babel/preset-env
        presets: [
            "@babel/preset-env"
        ]
    })
    // console.log(code) //var _hello = require("./hello.js"); var _word = require("./word");

    return {
        entryFile,
        dependecies,
        code
    }
}

// const info = entry('./src/index.js')
// console.log(info)
//前面我们分析了入口文件的依赖  现在我们需要找到其他文件中的依赖
//分析出所有依赖关系


const Dependecies = entryFile => {
    const info = entry(entryFile)
    const modules = [];
    modules.push(info);
    // 通过循环尾递归找出所有文件依赖
    for (let i = 0; i < modules.length; i++) {
        const item = modules[i]
        const {dependecies} = item
        if (dependecies) {
            for (let j in dependecies) {
                modules.push(entry(dependecies[j]))
            }
        }
    }
    // console.log(modules)
    // webpack 接受key value的一个对象 我们需要格式转化 {key:value}
    const obj = {}
    modules.forEach(item => {
        obj[item.entryFile] = {
            dependecies: item.dependecies,
            code: item.code
        }
    })
    console.log(obj)
    return obj
}
// Dependecies('./src/index.js')

//生成代码

const genCode = entryFile => {
    const obj = Dependecies('./src/index.js')
    //生成浏览器中能够运行的代码 注意处理  //require的是当前路径 替换成项目中的路径 export
    const graph = JSON.stringify(obj)
    const bundle = `(function(graph){
    function require(module){
        function localRequire(relativePath){
          return require(graph[module].dependecies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
            eval(code)
        })(localRequire,exports,graph[module].code);
        return exports;
    }
    require('${entryFile}')
  })(${graph})`;
    fs.writeFileSync(path.resolve(__dirname, './dist/main.js'), bundle, 'utf-8')
}

genCode('./src/index.js')

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


