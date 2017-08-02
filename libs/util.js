const formatMessage = (xml) => {
    let msg = {}
    for (let k in xml) {
        msg[k] = xml[k][0]
    }
    return msg
}

module.exports = {
    formatMessage
}