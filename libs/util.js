const xml2js = require('xml2js')

const parseXML = (xml) => {
    return new Promise((resolve,reject)=>{
        xml2js.parseString(xml,{
            trim: true
        },(err,content) => {
            if (err) {
                reject(err)
            } else {
                resolve(content.xml)
            }
        })
    })
}

const formatMessage = (res) => {
    let msg = {}
    if (typeof res === 'object') {
        let keys = Object.keys(res)
        for(let i = 0; i < keys.length; i++) {
            let k = keys[i]
            let item = res[i]
            if (!(item instanceof Array) || item.length === 0) {
                continue
            }
            if (item.length === 1) {
                let val = item[0]
                if (typeof val === 'object') {
                    msg[k] = formatMessage(val)
                } else {
                    msg[k] = (val || '').trim()
                }
            } else {
                msg[k] = []
                item.forEach(t => {
                    msg[k].push(formatMessage(t))
                })
            }
        }
    }
    return msg
}

module.exports = {
    parseXML,
    formatMessage
}