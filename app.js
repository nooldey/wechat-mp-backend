const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const sha1 = require('sha1')

const app = new Koa()
const router = new Router()
const port = 80

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

router.get('/wxapi', async (ctx) => {
	// const rq = ctx.request.body;
	const rq = ctx.query;
	const token = config.wechat.token;
	const {signature,nonce,timestamp,echostr} = rq;
	let str = [token,timestamp,nonce].sort().join('');
	let sha = sha1(str);
	ctx.type = 'text/json';
	ctx.body = (sha===signature) ? echostr + '' : "failed";
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(port)