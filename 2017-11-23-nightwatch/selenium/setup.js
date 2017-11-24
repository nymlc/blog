const selenium = require('selenium-standalone')
const seleniumConfig = require('./selenium-conf.js')
// 从网络下载selenium
selenium.install({
    version: seleniumConfig.version,
    baseURL: seleniumConfig.baseURL,
    drivers: seleniumConfig.drivers,
    logger: function (message) { console.log(message) },
    progressCb: function (totalLength, progressLength, chunkLength) { }
}, function (err) {
    if (err) throw new Error(`Selenium 安装错误: ${err}`)
    console.log('Selenium 安装完成.')
})