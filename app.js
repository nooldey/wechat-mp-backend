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

const config = {
	wechat: {
		appID: process.env.APP_ID,
		appSecret: process.env.APP_KEY,
		token: process.env.APP_TOKEN,
		getAccessToken: () => fs.readFileSync(key_file),
		saveAccessToken: () => fs.writeFileSync(key_file)
	}
}

router.use(bodyParser())

router.get('/', async ctx => {
	ctx.type = 'text/html';
	ctx.body = "Hello Nooldey";
})

router.use('/wx', wechat(config.wechat))

app.use(router.routes()).use(router.allowedMethods())

app.listen(port)