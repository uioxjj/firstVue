const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  pwa: {
    iconPaths: {
        favicon32: 'favicon.ico',
        favicon16: 'favicon.ico',
        appleTouchIcon: 'favicon.ico',
        maskIcon: 'favicon.ico',
        msTileImage: 'favicon.ico'
        }
      },
	  outputDir: '../dist', //打包后输出文件名称（以及位置）
	  lintOnSave:true, //设置是否在开发环境下每次保存代码时都启用eslint验证
	  productionSourceMap: false, // 生产环境是否生成sourceMap文件，设置为false，打包后体积可缩小一半
	  //重点配置
	  devServer:{
      open:true, //启动服务后是否打开浏览器
	    host:'0.0.0.0', // 运行的域名主机，地址栏看得到的地址
	    port: 80, //指定要监听请求的端口号，可以用window.location.port获取到;
	    https: false, //false为http访问，true为https访问，默认false
		  proxy:{
			'/api':{
				target: 'http://111.230.199.85/:3000', //代理的服务器，也就是api要访问的服务器，这里写真实的请求url
				ws:true,    //是否启用websockets
				changOrigin: true, //true，将主机头的来源更改为目标URL，也就是是否允许跨域。开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
				pathRewrite: {    //重写代理路径
 					'^/api': ''  //如果你访问的是'http://192.168.1.1:8070/api/shop/car' ,则变为 'http://192.168.1.1:8070/shop/car'。浏览器控制台虽然看到的还是带有/api的，但是实际发给后端的地址是没有包含/api的
 			 	}
			},
			//有时候系统有多个不同的代理地址，我们可以加一份代理即可！
			'/test':{
				target: 'http://192.168.1.1:8092',   //这里写真实的请求url
				ws:true,    //是否启用websockets
				changOrigin: true, //允许跨域 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
				pathRewrite: {    //重写代理路径
 					'^/test': ''  //如果你访问的是'http://192.168.1.1:8092/api/shop/car' ,则变为 'http://192.168.1.1:8092/shop/car'。浏览器控制台虽然看到的还是带有/test的，但是实际发给后端的地址是没有包含/test的
 			 	}
			}
		}
	},
	//其他一些配置
}