module.exports = {
    logStart() {
        console.log('Bot has been started...')
    },
    
    gCI(msg) {
        return msg.chat.id
    }//,
    
//     setLang(lang) {
//         switch (lang) {
//         case 'ru':
//             kb = require('./keyboard-buttons-ru')    
//             texts = require('./texts-ru')    
//         break
//         case 'en':
//             kb = require('./keyboard-buttons-en')    
//             texts = require('./texts-en')    
//         break
//         case 'de':
//             kb = require('./keyboard-buttons-de')    
//             texts = require('./texts-de')    
//         break
//         case 'fr':
//             kb = require('./keyboard-buttons-fr')    
//             texts = require('./texts-fr')    
//         break
//         case 'es':
//             kb = require('./keyboard-buttons-es')    
//             texts = require('./texts-es')    
//         break
//         case 'pt':
//             kb = require('./keyboard-buttons-pt')    
//             texts = require('./texts-pt')    
//         break
//         default: 
//             kb = require('./keyboard-buttons-ru')
//             texts = require('./texts-ru')   
//         }
//         return {kb, ikb, texts}
//     }
}
