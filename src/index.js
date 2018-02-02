const TelegramBot = require('node-telegram-bot-api')

const config = require('./config')
const helper = require('./helper')
const texts = require('./texts')
const keyboard = require('./keyboard')
const kb = require('./keyboard-buttons')
const ikb = require('./inline-keyboard')



const bot = new TelegramBot(config.TOKEN, {
    polling: true
})

helper.logStart()
console.log('hello')

bot.on('message', msg => {
    const chatId = helper.gCI(msg)
    
    console.log(JSON.stringify(msg,null,2))
    
    switch (msg.text) {
        // Начало экрана главного меню
            
        case kb.home.myFarm:
            bot.sendMessage(chatId, texts.myFarm, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: keyboard.myFarm
                }
            })
        break
        case kb.home.friends:
        break
        case kb.home.market:
            bot.sendMessage(chatId, texts.market, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: ikb.market
                }
            })
        break
        case kb.home.bank:
            bot.sendMessage(chatId, texts.bankMenu, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: ikb.bank
                }
            })
        break
        case kb.home.games:
        break
        case kb.home.tasks:
        break
        case kb.home.settings:
        break
        case kb.home.help:
        break
        
        
        case kb.back: 
            bot.sendMessage(chatId, texts.mainMenu, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: keyboard.home
                }
            })
        break
        // Конец экрана главного меню
        // Начало экрана Моя ферма
        
        case kb.myFarm.plants:
            bot.sendMessage(chatId, texts.plants, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: keyboard.plants
                }
            })
        break
        
        case kb.plants.fruit:
            bot.sendMessage(chatId, texts.fruit, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: ikb.fruit
                }
            })
        break
        case kb.plants.vegetables:
            bot.sendMessage(chatId, texts.vegetables, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: ikb.vegetables
                }
            })
        break
        
        
        case kb.myFarm.buildings:
            bot.sendMessage(chatId, texts.buildings, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: ikb.buildings
                }
            })
        break
        
        case kb.myFarm.warehouse:
            bot.sendMessage(chatId, texts.warehouse, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: ikb.warehouse
                }
            })
        break
        case kb.myFarm.statistics:
        break
        case kb.myFarm.referals:
        break
        case kb.myFarm.name:
        break
        
        
        case kb.back_farm: 
            bot.sendMessage(chatId, texts.myFarm, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: keyboard.myFarm
                }
            })
        break
        
        // Конец экрана Моя ферма
        // Начало экрана
        
        
        
        // Конец экрана
        // Начало экрана
        
        
        
        // Конец экрана
        // Начало экрана
        
        
        
        // Конец экрана
        // Начало экрана
        
        
        
        // Конец экрана
    } 
})

bot.onText(/\/start/, msg => {
    
    bot.sendMessage(helper.gCI(msg), texts.firstStarting, {
        reply_markup: {
            keyboard: keyboard.home
        }
    })
    
})


bot.on('callback_query', query => {
    
    //bot.answerCallbackQuery(query.id, `${query.data}`)
    bot.sendMessage(query.message.chat.id, query.data)
})
