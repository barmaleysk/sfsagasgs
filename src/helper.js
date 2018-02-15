let lang
module.exports = {
    logStart() {
        console.log('Bot has been started...')
    },
    
    gCI(msg) {
        return msg.chat.id
    }
    
    setLanguage(l) {
        lang = l
    }
    getLanguage() {
        return lang
    }
}
