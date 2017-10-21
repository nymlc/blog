const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const fs = require('fs');
const path = require('path');

const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
var devMiddleware = require('koa-webpack-dev-middleware');
var hotMiddleware = require('koa-webpack-hot-middleware');

const compiler = webpack(webpackConfig);
let data = require('./data');
// fs.watch(require.resolve('./data'), function () {  
//     cleanCache(require.resolve('./data'));    //清除该路径模块的缓存  
//     try {  
//         data = require('./data');  
//     } catch (ex) {  
//         console.error('module update failed');  
//     }  
// });
function cleanCache(modulePath) {
    var module = require.cache[modulePath];
    // remove reference in module.parent  
    if (module.parent) {
        module.parent.children.splice(module.parent.children.indexOf(module), 1);    //释放老模块的资源  
    }
    require.cache[modulePath] = null;    //缓存置空  
}
app.use(devMiddleware(compiler));
app.use(hotMiddleware(compiler, {
    log: function () {
        cleanCache(require.resolve('./data'));    //清除该路径模块的缓存  
        try {
            data = require('./data');
        } catch (ex) {
            console.error('module update failed');
        }
    }
}));

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    // ctx.response.body = fs.readFileSync(path.join(__dirname, './html.html'));
    ctx.response.body = data;
});
app.use(serve(__dirname + "/dist/", { extensions: ['html'] }));

app.listen(3000, () => {
    console.log('app listen at 3000')
});