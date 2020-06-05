# webpack_summary-
# 概念

  Webpack可以看做是模块打包机：它做的事情是，分析你的项⽬结构，找
   到JavaScript模块以及其它的⼀些浏览器不能直接运⾏的拓展语⾔（Scss，
   TypeScript等），并将其打包为合适的格式以供浏览器使⽤。
   
# 安装

* npm install webpack webpack-cli --save-dev //-D
* npm info webpack//查看webpack的历史发布信息
* npm install webpack@x.xx webpack-cli -D
   
npx webpack -v// npx帮助我们在项⽬中的node_modules⾥查找webpack
./node_modules/.bin/webpack -v//到当前的node_modules模块⾥指定
webpack

# 小结
webpack 是⼀个模块打包⼯具，可以识别出引⼊模块的语法 ，早期
的webpack只是个js模块的打包⼯具，现在可以是css，png，vue的模块打
包⼯具

# 核⼼概念

1. entry
指定webpack打包⼊⼝⽂件:Webpack 执⾏构建的第⼀步将从 Entry 开
始，可抽象成输⼊

2. output
打包转换后的⽂件输出到磁盘位置:输出结果，在 Webpack 经过⼀系列处
理并得出最终想要的代码后输出结果。

3. mode
⽤来指定当前的构建环境
开发阶段的开启会有利于热更新的处理，识别哪个模块变化
⽣产阶段的开启会有帮助模块压缩，处理副作⽤等⼀些功能

4. loader
模块解析，模块转换器，⽤于把模块原内容按照需求转换成新内容。
webpack是模块打包⼯具，⽽模块不仅仅是js，还可以是css，图⽚或者其
他格式
但是webpack默认只知道如何处理js和JSON模块，那么其他格式的模块处
理，和处理⽅式就需要loader了

5. moudle
模块，在 Webpack ⾥⼀切皆模块，⼀个模块对应着⼀个⽂件。Webpack
会从配置的 Entry 开始递归找出所有依赖的模块。
当webpack处理到不认识的模块时，需要在webpack中的module处进⾏
配置，当检测到是什么格式的模块，使⽤什么loader来处理。

6. ⽂件监听
轮询判断⽂件的最后编辑时间是否变化，某个⽂件发⽣了变化，并不会⽴
刻告诉监听者，先缓存起来
webpack开启监听模式，有两种
 * .启动webpack命令式 带上--watch 参数，启动监听后，需要⼿动刷新浏览
   器
   
 * 在配置⽂件⾥设置 watch:true  
 
 7. Plugins
 plugin 可以在webpack运⾏到某个阶段的时候，帮你做⼀些事情，类似于
 ⽣命周期的概念
 扩展插件，在 Webpack 构建流程中的特定时机注⼊扩展逻辑来改变构建结
 果或做你想要的事情。
 作⽤于整个构建过程
 
 8. sourceMap
 源代码与打包后的代码的映射关系
 
     devtool:"cheap-module-eval-source-map",// 开发环境配置
     devtool:"cheap-module-source-map", // 线上⽣成配置
     
 9. WebpackDevServer
 每次改完代码都需要重新打包⼀次，打开浏览器，刷新⼀次，很麻烦
 我们可以安装使⽤webpackdevserver来改善这块的体验
 启动服务后，会发现dist⽬录没有了，这是因为devServer把打包后的模块
 不会放在dist⽬录下，⽽是放到内存中，从⽽提升速度    
 
 10. Hot Module Replacement (HMR:热模块替换)
 注意启动HMR后，css抽离会不⽣效，还有不⽀持contenthash，
 chunkhash
 
 * 需要使⽤module.hot.accept来观察模块更新 从⽽更新
 
 11. Babel处理ES6
 
  * npm i babel-loader @babel/core @babel/preset-env -D
  * babel-loader是webpack 与 babel的通信桥梁，不会做把es6转成es5的
  ⼯作，这部分⼯作需要⽤到@babel/preset-env来做
  
  * @babel/preset-env⾥包含了es6转es5的转换规则
  
  通过上⾯的⼏步 还不够，Promise等⼀些还有转换过来，这时候需要借助
  @babel/polyfill，把es的新特性都装进来，来弥补低版本浏览器中缺失的
  特性
  
  @babel/polyfill
  
  以全局变量的⽅式注⼊进来的。windows.Promise，它会造成全局对象的
  污染
  
  npm install --save @babel/polyfill
  
  会发现打包的体积⼤了很多，这是因为polyfill默认会把所有特性注⼊进
  来，假如我想我⽤到的es6+，才会注⼊，没⽤到的不注⼊，从⽽减少打包
  的体积，
  
  如果开发组件库
  开发的是组件库，⼯具库这些场景的时候，polyfill就不适合了，因
  为polyfill是注⼊到全局变量，window下的，会污染全局环境，所以推荐闭
  包⽅式：@babel/plugin-transform-runtime
  
  * @babel/plugin-transform-runtime
  * npm install --save-dev @babel/plugin-transform-runtime 
  * npm install --save @babel/runtime
  
  修改配置⽂件：注释掉之前的presets，添加plugins
  
  useBuiltIns 选项是 babel 7 的新功能，这个选项告诉 babel 如何配
  置 @babel/polyfill 。
  
  * entry: 需要
    在webpack 的⼊⼝⽂件⾥ import "@babel/polyfill" ⼀次。 babel 会根
    据你的使⽤情况导⼊垫⽚，没有使⽤的功能不会被导⼊相应的垫⽚。
  
  * usage: 不需要 import ，全⾃动检测，但是要安装 @babel/polyfill 。
    （试验阶段）
  
  * false: 如果你import "@babel/polyfill" ，它不会排除
    掉没有使⽤的垫⽚，程序体积会庞⼤。(不推荐)    
  
  注意  usage 的⾏为类似 babel-transform-runtime，不会造成全局污
     染，因此也会不会对类似 Array.prototype.includes() 进⾏ polyfill。
 
 12. tree Shaking
 webpack2.x开始⽀持 tree shaking概念，顾名思义，"摇树"，只⽀持ES
 module的引⼊⽅式
 
 optimization: {
  usedExports: true
  }
  
 开发模式设置后，不会帮助我们把没有引⽤的代码去掉
 
 * "sideEffects":false 正常对所有模块进⾏tree shaking
 * "sideEffects":['*.css','@babel/polyfill'] 这样会避免摇掉.css文件
 
 13. 代码分割 code Splitting
 
 假如我们引⼊⼀个第三⽅的⼯具库，体积为1mb，⽽我们的业务逻辑代码也有
 1mb，那么打包出来的体积⼤⼩会在2mb
 
 能不能剥离出去？形成单一的链接？
 
 导致问题：
 体积⼤，加载时间⻓
 业务逻辑会变化，第三⽅⼯具库不会，所以业务逻辑⼀变更，第三⽅⼯具库也
 要跟着变。
 
 其实code Splitting概念 与 webpack并没有直接的关系，只不过webpack
 中提供了⼀种更加⽅便的⽅法供我们实现代码分割
 
 https://webpack.js.org/plugins/split-chunks-plugin/
 
 14 优化
 
 * 合理使用插件
 * resolve参数合理配置(一般js jsx就行 css 图片会有性能损耗)
   resolve: {
         extensions: ['.js', '.jsx']
   },
 * 第三方模块 只在第一次打包的时候去分析 之后再去打包的话我们直接用
 上一次分析好的结果，理想的优化方式
 1. 打包一次ok
 2. 使用？我们引入第三方文件的时候 要使用dll.js文件做映射
 分析我们打包的库 把库里面第三方的映射关系我们放到mainfest.json汇总
 
 当webpack打包的时候，有了这个文件 [name].mainfest.json 我们再结合
  全局变量 vendors 对我们的源代码进行分析 ，一旦分析出来我们使用的内容实在
  dll中，就会直接使用vendors.dll.js中的内容，就不回去node_m
  中引入我们的模块了
 
 15. 多核打包
 parallel-webpack thread-loader happypack 
 
 
### 懒加载 
 
 Lazy Loading 其实就是通过import 来异步的加载一个模块 但是实际上什么时候去加载
 是不一定的，真正执行import的时候，可以让我们的页面加载速度更快 
 
 是ES中的一个概念 webpack只是识别这种代码 对代码进行分割
 
 代码分割，和webpack无关
 
 // webpack中实现代码分割，两种方式
 // 1. 同步代码： 只需要在webpack.common.js中做optimization的配置即可
 // 2. 异步代码(import): 异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中

  
 ### chunk
 
 打包生成的每一个js文件的就是一个chunk 
 意义？ minChunks:2 这个chunk被引入了几次 就是有两个以上的文件依赖lodash
 我们就需要对lodash进行代码分割
 
 ### 打包分析
 
 c shift p coverage
 
 ### prefetch preload
 比如我们的登录弹窗 异步加载可能会慢点 如何快点呢？
 页面js加载完成 登录网络有空闲的时候 会帮我们预先加载好
 注意: 书写 webpackPrefetch
 
 import(/* webpackPrefetch:"lodash" */'./a.js')
 我们再次点击触发弹窗的时候还会加载一次 但已经拿的是缓存了 看加载时间
 
 区别  preload 和主业务逻辑一起加载
 
 优化 ？ 考虑我们js代码利用率，有些交互之后才能用到的代码，写到异步组件中去
 通过懒加载的形式让我们的代码加载进来 注意兼容性问题
 
 前端缓存能优化的点是局限的，我们的重点应该放在代码利用率上面
 
 
 