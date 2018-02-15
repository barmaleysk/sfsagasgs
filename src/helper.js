module.exports = {
    logStart() {
        console.log('Bot has been started...')
    },
    
    gCI(msg) {
        return msg.chat.id
    }
    
    setLanguage(lang) {
        switch (lang) {
        case 'ru':
            texts = require('./texts-ru')    
        break
        case 'en':
            texts = require('./texts-en')    
        break
        case 'de':
            texts = require('./texts-de')    
        break
        case 'fr':
            texts = require('./texts-fr')    
        break
        case 'es':
            texts = require('./texts-es')    
        break
        case 'pt':
            texts = require('./texts-pt')    
        break
        default: kb = require('./texts-ru')  
        }
        return {kb, ikb, texts}
    }
}
