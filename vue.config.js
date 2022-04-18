module.exports={
    devServer:{
        proxy:{
            //把/api直接定義給其他檔案call api用
            '/api':{
                target:'http://localhost:3000',
                pathRewrite:{'^/api':''},
                changeOrigin:true,
                ws:true
            }
        }
    }
}