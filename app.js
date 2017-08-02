const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()
const port = 80

const wechat = require('./wechat/generator')
const key_file = path.join(__dirname,'./config/wechat.txt')

// 基本设置
const config = {
	wechat: {
		appID: process.env.APP_ID || 'wxbbb0c73cb780403a',
		appSecret: process.env.APP_KEY || '083c35e0515675405584177b9ea7d93f',
		token: process.env.APP_TOKEN || 'codenooldey',
		// getAccessToken: () => fs.readFileSync(key_file),
		// saveAccessToken: (data) => {
		// 	data = JSON.stringify(data)
		// 	return fs.writeFileSync(key_file,data)
		// }
	}
}

router.use(bodyParser())

router.get('/', async ctx => {
	ctx.type = 'text/html';
	ctx.body = "Hello Nooldey";
})

router.all('/wx', wechat(config.wechat))

app.use(router.routes()).use(router.allowedMethods())

app.listen(port)