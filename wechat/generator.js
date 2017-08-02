const sha1 = require('sha1')

const fs = require('fs')
const path = require('path')
const err_log = path.join(__dirname, '../logs/error.log')
const acc_log = path.join(__dirname, '../logs/access.log')

module.exports = (opt) => {
    return async(ctx, next) => {
        const rq = ctx.query;
        const token = opt.token;
        const { signature, nonce, timestamp } = rq;
        let str = [token, timestamp, nonce].sort().join('');
        let sha = sha1(str);

        if (ctx.method === 'GET') {
            const { echostr } = rq;
            ctx.body = (sha === signature) ? echostr + '' : "failed";
        }
        if (ctx.method === 'POST') {
            if (sha !== signature) {
                ctx.body = "success";
                return false;
            } else {
console.log(ctx.req)
                // 处理xml
                // 设置响应内文
                let now = Date.now()
                ctx.status = 200;
                ctx.type = 'application/xml';

                if (msg.MsgType === 'event') {
                    if (msg.Event === 'subscribe') {
                        ctx.body = `<xml>
                    <ToUserName><![CDATA[${msg.FromUserName}]]</ToUserName>
                    <FromUserName><![CDATA[${msg.ToUserName}]]</FromUserName>
                    <CreateTime>${now}</CreateTime>
                    <MsgType><![CDATA[text]]</MsgType>
                    <Content><![CDATA[HEY!Nooldey]]</Content>
                    </xml>`;
                    }
                } else {
                    ctx.body = `<xml>
                    <ToUserName><![CDATA[${msg.FromUserName}]]</ToUserName>
                    <FromUserName><![CDATA[${msg.ToUserName}]]</FromUserName>
                    <CreateTime>${now}</CreateTime>
                    <MsgType><![CDATA[text]]</MsgType>
                    <Content><![CDATA[test]]</Content>
                    </xml>`;
                }
            }
        }

        // 请求日志记录
        let log_content = {
            log_time: new Date(),
            url: ctx.request.url,
            argument: rq,
            method: ctx.method,
            response: ctx.response
        };
        let log = JSON.stringify(log_content) + "\n";

        if (ctx.response.status !== 200) {
            fs.writeFileSync(err_log, log, {
                flag: 'a'
            })
        } else {
            fs.writeFileSync(acc_log, log, {
                flag: 'a'
            })
        }

        await next();
    }
}