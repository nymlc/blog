const path = require('path')

const seleniumConfig = require('./selenium/selenium-conf')
module.exports = (function (settings) {
    // 动态设置selenium jar以及驱动路径
   // settings.selenium.server_path = `${path.resolve()}/node_modules/selenium-standalone/.selenium/selenium-server/${seleniumConfig.version}-server.jar`;
   // settings.selenium.cli_args['webdriver.chrome.driver'] = `${path.resolve()}/node_modules/selenium-standalone/.selenium/chromedriver/${seleniumConfig.drivers.chrome.version}-${seleniumConfig.drivers.chrome.arch}-chromedriver`;
    return settings;
})(require('./nightwatch.json'))