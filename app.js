const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()
const port = process.env.HTTP_PORT || 80
router.use(bodyParser())

router.get('/wxapi', async (ctx) => {
	const rq = ctx.request.body;
	ctx.type = 'text/json';
	ctx.body = rq.echostr;
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(port)