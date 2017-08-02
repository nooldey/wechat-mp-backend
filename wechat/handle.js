const getRawBody = require('raw-body')
const util = require('../libs/util')

const handleReq = (ctx) => {
    // xml
    let data = getRawBody(ctx.req, {
        limit: '1MB',
        encoding: this.charset
    })
    let d = util.parseXML(data)
    let msg = util.formatMessage(d)

    if (msg.MsgType === 'event') {
        if (msg.Event === 'subscribe') {
            let now = Date.now()
            ctx.status = 200;
            ctx.type = 'application/xml';
            ctx.body = `<xml>
                    <ToUserName><![CDATA[${msg.FromUserName}]]</ToUserName>
                    <FromUserName><![CDATA[${msg.ToUserName}]]</FromUserName>
                    <CreateTime>${now}</CreateTime>
                    <MsgType><![CDATA[text]]</MsgType>
                    <Content><![CDATA[HEY!Nooldey]]</Content>
                    </xml>`;
        }
    } else {
        let now = Date.now()
        ctx.status = 200;
        ctx.type = 'application/xml';
        ctx.body = `<xml>
                    <ToUserName><![CDATA[${msg.FromUserName}]]</ToUserName>
                    <FromUserName><![CDATA[${msg.ToUserName}]]</FromUserName>
                    <CreateTime>${now}</CreateTime>
                    <MsgType><![CDATA[text]]</MsgType>
                    <Content><![CDATA[test]]</Content>
                    </xml>`;
    }
    return ctx
}

module.exports = {
    handleReq
}