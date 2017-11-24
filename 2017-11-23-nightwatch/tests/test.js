module.exports = {
    'Search by baidu': function (client) {
        // 定义页面元素
        const searchInput = '#kw';
        const searchBtn = '#su';
        const resultContainer = '#container';
        // 启动浏览器并打开www.baidu.com
        client.url('http://baidu.com').pause(1000).maximizeWindow()
            // 确保输入框可以使用.
            .waitForElementVisible(searchInput, 5000)
            // 输入"nightwatch"然后搜索.
            .setValue(searchInput, 'nightwatch')
            .click(searchBtn)
            .waitForElementVisible(resultContainer, 1000)
            // 截屏 
            .saveScreenshot('reports/answers.png')
            .end()
    }
}