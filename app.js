const http = require('http')
const qs = require('querystring')
const axios = require('axios')

const port = 80

const app = http.createServer((req,res) => {
	res.writeHead(200,{
		'Content-Type': 'text/json;charset=utf-8',
		'Access-Control-Allow-Origin': '*'
	})

	// 豆瓣电影
	if (!req.url.indexOf('/api/in_theaters')) {
		const city = qs.parse(req.url.split("?")[1])
		axios.get('http://api.douban.com/v2/movie/in_theaters?city=杭州').then(o => {
			res.end(JSON.stringify(o.data))
		}).catch( e => {
			res.end('api error:'+e)
		})
	}
	else if (!req.url.indexOf('/api/coming_soon')) {
		const args = qs.parse(req.url.split("?")[1])
		axios.get('http://api.douban.com/v2/movie/coming_soon',{
			params: {args}
		}).then(o => {
			res.end(JSON.stringify(o.data))
		}).catch( e => {
			res.end('api error:'+e)
		})
	}
	else if (!req.url.indexOf('/api/top250')) {
		const args = qs.parse(req.url.split("?")[1])
		axios.get('http://api.douban.com/v2/movie/top250',{
			params: {args}
		}).then(o => {
			res.end(JSON.stringify(o.data))
		}).catch( e => {
			res.end('api error:'+e)
		})
	}

	// 新闻接口
	else if (!req.url.indexOf('/api/news')){
		const { num = 1, page = 1 } = qs.parse(req.url.split('?')[1])

		axios.get(`http://api.dagoogle.cn/news/get-news?pagesize=10&tableNum=${ num }&page=${ page }`)
		.then(o => {
			res.end(JSON.stringify(o.data.data))
		})
		.catch(o => {
			res.end('get news fail')
		})
	}
	else if (!req.url.indexOf('/api/detail')){
		const { num, id } = qs.parse(req.url.split('?')[1])

		axios.get(`http://api.dagoogle.cn/news/single-news?tableNum=${ num }&news_id=${ id }`)
		.then(o => {
			res.end(JSON.stringify(o.data.data))
		})
		.catch(o => {
			res.end('get detail fail')
		})
	}
	else {
		res.end('request no exist!')
	}
})

app.listen(port)