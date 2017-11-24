const process = require('process')
module.exports = {
    // selenium版本与下载地址
    // check for more recent versions of selenium here:
    // https://selenium-release.storage.googleapis.com/index.html
    version: '3.7.1',
    baseURL: 'https://selenium-release.storage.googleapis.com',
    // Driver看情况配置，比如只需要chrome就止血chrome 即可
    drivers: {
        chrome: {
            // check for more recent versions of chrome driver here:
            // https://chromedriver.storage.googleapis.com/index.html
            version: '2.33.2',
            arch: process.arch,
            baseURL: 'https://chromedriver.storage.googleapis.com'
        },
        ie: {
            // check for more recent versions of internet explorer driver here:
            // https://selenium-release.storage.googleapis.com/index.html
            version: '3.0.1',
            arch: process.arch,
            baseURL: 'https://selenium-release.storage.googleapis.com'
        }
    }
}
