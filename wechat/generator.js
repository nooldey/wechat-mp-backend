const sha1 = require('sha1')

module.exports = (opt) => {
    return async(ctx, next) => {
        const rq = (ctx.method === 'GET') ? ctx.query : ctx.request.body;
        const token = opt.token;
        const { signature, nonce, timestamp, echostr } = rq;
        let str = [token, timestamp, nonce].sort().join('');
        let sha = sha1(str);
        ctx.type = 'text/xml';
        
        if (ctx.method === 'GET') {
            ctx.body = (sha === signature) ? echostr + '' : "failed";
        }
        else if (ctx.method === 'POST') {
            if (sha !== signature) {
                ctx.body = "failed";
                return false;
            }
            // xml
            // TODO
        }
        await next();
    }
}