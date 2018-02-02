const TelegramBot = require('node-telegram-bot-api')
const mongoose = require('mongoose')


const config = require('./config')
const helper = require('./helper')
const texts = require('./texts')
const keyboard = require('./keyboard')
const kb = require('./keyboard-buttons')
const ikb = require('./inline-keyboard')
const arr = require('./arrays')
const cbd = require('./callbacks')


mongoose.connect(config.DB_URL)
.then (() => console.log('mogodb connected'))
.catch((e) => console.log(e))

require('./models/users.model')

const User = mongoose.model('users')



// ===========================================
const bot = new TelegramBot(config.TOKEN, {
    polling: true
})

helper.logStart()

bot.on('message', msg => {
    const chatId = helper.gCI(msg)
    
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
    
    const chatId = helper.gCI(msg)
    
    User.findOne({_id: chatId}).then(u => {
        
        if (u != null) {
            bot.sendMessage(helper.gCI(msg), texts.mainMenu, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: keyboard.home
                }
            })
            
        }
        else if (u == null) {
            u = new User({
                _id: chatId,
                warehouse: [{
                    fruit: arr.fruit,
                    vegetables: arr.vegetables,
                    products: arr.products,
                }],
                buildings: arr.buildings,
                plants: [{
                    fruit: arr.fruit,
                    vegetables: arr.vegetables
                }],
                bank: arr.bank,
                garage: arr.garage,
                incidents: arr.incidents
            })
        
            u.save()
                .catch((e) => console.log(e))

            bot.sendMessage(helper.gCI(msg), texts.firstStarting, {
                reply_markup: {
                    inline_keyboard: ikb.firstMessage
                }
            })
            
        }
    })
    
})

bot.on('callback_query', query => {
    
    const {chat, message_id } = query.message
    
    bot.answerCallbackQuery(query.id, `${query.data}`)
    
    
    switch (query.data) {
        
        case cbd.deposit:
        break
        case cbd.withdraw:
        break
        case cbd.exchange:
        break
        case cbd.redeem:
        break
        case cbd.build:
        break
        case cbd.send_buildings:
        break
        case cbd.buy_fruit:
        break
        case cbd.send_fruit:
        break
        case cbd.buy_vegetables:
        break
        case cbd.send_vegetables:
        break
        case cbd.sell_plants:
        break
        case cbd.sell_products:
        break
        case cbd.det_fruit:
        break
        case cbd.det_vegetables:
        break
        case cbd.det_products:
        break
        case cbd.next_step:
            bot.editMessageText(texts.step2, {
                chat_id: chat.id,
                message_id: message_id,
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: ikb.step2
                }
            })
        break
        case cbd.skip:
            bot.sendMessage(chat.id, texts.mainMenu, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: keyboard.home
                }
            })
        break
        case cbd.step3: 
            bot.editMessageText(texts.step3, {
                chat_id: chat.id,
                message_id: message_id,
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: ikb.step4
                }
            })
        break
        case cbd.step4: 
            bot.editMessageText(texts.step4, {
                chat_id: chat.id,
                message_id: message_id,
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: ikb.step5
                }
            })
        break
    }
    
})



