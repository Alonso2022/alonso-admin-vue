const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',  
    chainWebpack: (config)=>{
        // config.externals({
        //     'vue': 'Vue',
        //     'vue-router': 'VueRouter',
        //     'vuex': 'Vuex',
        //     'axios': 'axios',
        //     'element-ui': 'ELEMENT',
        // })
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
    }
}