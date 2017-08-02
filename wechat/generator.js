const sha1 = require('sha1')
const getRawBody = require('raw-body')
const util = require('../libs/util')

const fs = require('fs')
const path = require('path')
const err_log = path.join(__dirname,'../logs/error.log')
const acc_log = path.join(__dirname,'../logs/access.log')

module.exports = (opt) => {
    return async(ctx, next) => {
        const rq = (ctx.method === 'GET') ? ctx.query : ctx.request.body;
        const token = opt.token;
        const { signature, nonce, timestamp, echostr } = rq;
        let str = [token, timestamp, nonce].sort().join('');
        let sha = sha1(str);

        // 请求处理
        if (ctx.method === 'GET') {
            ctx.type = 'text/json';
            ctx.body = (sha === signature) ? echostr + '' : "failed";
        } else if (ctx.method === 'POST') {
            if (sha !== signature) {
                ctx.body = "failed";
                return false;
            }
            // xml
            let data = getRawBody(this.req,{
                limit: '1MB',
                encoding: this.charset
            })
            let d = util.parseXML(data)
// console.log('this is content:',d)
            let msg = util.formatMessage(d)
// console.log('this is message:',msg)
fs.writeFileSync(err_log,d+'\n',{flag:'a'})

            if (msg.MsgType === 'event') {
fs.writeFileSync(err_log,'event\n',{flag:'a'})
                if (msg.Event === 'subscribe') {
fs.writeFileSync(err_log,'subscribe\n',{flag:'a'})
                    let now = Date.now()
                    ctx.status = 200;
                    ctx.type = 'application/xml';
                    ctx.body = `<xml>
                    <ToUserName><![CDATA[${msg.FromUserName}]]</ToUserName>
                    <FromUserName><![CDATA[${msg.FromUserName}]]</FromUserName>
                    <CreateTime>${now}</CreateTime>
                    <MsgType><![CDATA[text]]</MsgType>
                    <Content><![CDATA[HEY!Nooldey]]</Content>
                    </xml>`;
fs.writeFileSync(err_log,'body:'+ctx.body+'\n',{flag:'a'})                 
                }
            }
        }

        // 请求日志记录
        let log_content = {
            log_time: new Date(),
            url: ctx.request.url,
            argument: rq,
            method: ctx.method,
            response: ctx.response,
            body: ctx.body
        };
        let log = JSON.stringify(log_content) + "\n";

        if (ctx.response.status!==200) {
            fs.writeFileSync(err_log,log,{flag:'a'})
        } else {
            fs.writeFileSync(acc_log,log,{flag:'a'})
        }
        
        await next();
    }
}