const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const sha1 = require('sha1')

const app = new Koa()
const router = new Router()
const port = 80

const wechat = require('./wechat/generator')

const config = {
	wechat: {
		appID: process.env.APP_ID,
		appSecret: process.env.APP_KEY,
		token: process.env.APP_TOKEN
	}
}

router.use(bodyParser())

router.get('/', async ctx => {
	ctx.type = 'text/html';
	ctx.body = "Hello Nooldey";
})

router.get('/wx', wechat(config.wechat))

// app.use(wechat(config.wechat))
app.use(router.routes()).use(router.allowedMethods())
app.listen(port)