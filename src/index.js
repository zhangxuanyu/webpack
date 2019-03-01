import a from './data.js'
import './css/a.css'

console.log(10)

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
    // 实现热更新
    module.hot.accept();
}