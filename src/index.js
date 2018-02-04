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

//setInterval(function(){
//    bot.sendMessage(268932098, 'Гыгыгы')
//}, 5000)

bot.on('message', msg => {
    const chatId = helper.gCI(msg)
    
//    console.log(chatId)
    
    switch (msg.text) {
        // Начало экрана главного меню
            
        case kb.home.myFarm:
            sendHTML(chatId, texts.myFarm, 'myFarm')
        break
        case kb.home.friends:
        break
        case kb.home.market:
            sendHTMLi(chatId, texts.market, 'market')
        break
        case kb.home.bank:
            DisplayBank(chatId)
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
            sendHTML(chatId, texts.mainMenu, 'home')
        break
        // Конец экрана главного меню
        // Начало экрана Моя ферма
        
        case kb.myFarm.plants:
            sendHTML(chatId, texts.plants, 'plants')
        break
        
        case kb.plants.fruit:
            DisplayFruit(chatId)
        break
        case kb.plants.vegetables:
            DisplayVegetables(chatId)
        break
        
        
        case kb.myFarm.buildings:
            DisplayBuildings(chatId)
        break
        
        case kb.myFarm.warehouse:
            DisplayWarehouse(chatId)
        break
        case kb.myFarm.statistics:
        break
        case kb.myFarm.referals:
        break
        case kb.myFarm.name:
        break
        
        
        case kb.back_farm: 
            sendHTML(chatId, texts.myFarm, 'myFarm')
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
            
            sendHTML(chatId, texts.mainMenu, 'home')
            
        }
        else if (u == null) {
            u = new User({
                _id: chatId
            })
        
            u.save()
                .catch((e) => console.log(e))
            
            sendHTMLi(chatId, texts.firstStarting, 'firstMessage')
            
            
        }
    })
    
})

bot.onText(/\/menu/, msg => {
    sendHTML(helper.gCI(msg), texts.mainMenu, 'home')
})

bot.on('callback_query', query => {
    const {chat, message_id } = query.message
//    bot.answerCallbackQuery(query.id, `${query.data}`)
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
            editText(texts.step2, chat.id, message_id, 'step2')
        break
        case cbd.step3: 
            editText(texts.step3, chat.id, message_id, 'step3')
        break
        case cbd.step4: 
            editText(texts.step4, chat.id, message_id, 'step4')
        break
        
        case cbd.step5:
            editText(texts.step5, chat.id, message_id, 'step5')
        break
        case cbd.finish:
            sendHTML(chat.id, texts.finish, 'home')
        break
        
        case cbd.skip:
            sendHTML(chat.id, texts.mainMenu, 'home')
        break
    }
})

bot.onText(/\/setfruit (.+)/, (msg, [source, match]) => {
    
    const fruits = match.split(' ')
    
    console.log(fruits)
    
    const id = fruits[0]
    
    console.log(id)
  
    User.updateOne({_id: id}, { $set: {
        "warehouse.fruit.apple": fruits[1],
        "warehouse.fruit.pear": fruits[2],
        "warehouse.fruit.grapes": fruits[3],
        "warehouse.fruit.strawberries": fruits[4],
        "warehouse.fruit.cherries": fruits[5],
        "warehouse.fruit.peach": fruits[6]
            }
        }).catch((e) => console.log(e))
    
})

bot.onText(/\/setvegetables (.+)/, (msg, [source, match]) => {
    
    const vegetables = match.split(' ')
    
    const id = vegetables[0]
    
    User.updateOne({_id: id}, { $set: {
        "warehouse.vegetables.tomato": vegetables[1],
        "warehouse.vegetables.eggplant": vegetables[2],
        "warehouse.vegetables.carrots": vegetables[3],
        "warehouse.vegetables.corn": vegetables[4],
        "warehouse.vegetables.pepper": vegetables[5],
        "warehouse.vegetables.potatoes": vegetables[6]
        }
    }).catch((e) => console.log(e))
    
})

bot.onText(/\/setproducts (.+)/, (msg, [source, match]) => {
    
    const prod = match.split(' ')
    
    const id = prod[0]
    
    User.updateOne({_id: id}, { $set: {
        "warehouse.products.eggs": prod[1],
        "warehouse.products.bacon": prod[2],
        "warehouse.products.wool": prod[3],
        "warehouse.products.milk": prod[4],
        "warehouse.products.honey": prod[5],
        "warehouse.products.leg": prod[6]
        }
    }).catch((e) => console.log(e))
    
})

bot.onText(/\/info/, msg => {
    
    User.findOne({_id: msg.chat.id}).then(u => {
        
        console.log(u)
        
    })
})

function DisplayBank (chatId) {
    
    User.findOne({_id: chatId}).then(u => {
        
        const bank =  `🏦 <b>Банк</b>\n\nДобро пожаловать в банк!\nЗдесь Вы можете купить, обменять, вывести валюту и выкупить свой участок.\n\nВаш счет:
<b>${u.bank.dollars}</b> 💵 Долларов
<b>${u.bank.euro}</b> 💶 Евро
<b>${u.bank.gold}</b> 💰 Gold
<b>${u.bank.diamond}</b> 💎 Diamond
<b>${u.bank.points}</b> ⚜️ Баллы
<b>${u.bank.token}</b> 💠 Токены`
    
        sendHTMLi(u._id, bank, 'bank')
        
    })
}
function DisplayFruit(chatId) {
    User.findOne({_id: chatId}).then(u => {
        const fruit = `Ваши фрукты:
🌱🍎 Яблоня
Количество: <b>${u.plants.fruit.apple}</b>
Выросло: <b>${u.produced.fruit.apple}</b> 🍎 Яблок
На складе: <b>${u.warehouse.fruit.apple}</b> 🍎

🌱🍐 Груша
Количество: <b>${u.plants.fruit.pear}</b>
Выросло: <b>${u.produced.fruit.pear}</b> 🍐 Груш
На складе: <b>${u.warehouse.fruit.pear}</b> 🍐

🌱🍇 Виноградная лоза
Количество: <b>${u.plants.fruit.grapes}</b>
Выросло: <b>${u.produced.fruit.grapes}</b> 🍇 Винограда
На складе: <b>${u.warehouse.fruit.grapes}</b> 🍇

🌱🍓 Куст клубники
Количество: <b>${u.plants.fruit.strawberries}</b>
Выросло: <b>${u.produced.fruit.strawberries}</b> 🍓 Клубники
На складе: <b>${u.warehouse.fruit.strawberries}</b> 🍓

🌱🍒 Вишня
Количество: <b>${u.plants.fruit.cherries}</b>
Выросло: <b>${u.produced.fruit.cherries}</b> 🍒 Вишен
На складе: <b>${u.warehouse.fruit.cherries}</b> 🍒

🌱🍑 Персик
Количество: <b>${u.plants.fruit.peach}</b>
Выросло: <b>${u.produced.fruit.peach}</b> 🍑 Персиков
На складе: <b>${u.warehouse.fruit.peach}</b> 🍑`
    
        sendHTMLi(u._id, fruit, 'fruit')
        
    })
}
function DisplayVegetables(chatId) {
    User.findOne({_id: chatId}).then(u => {
        
        const vegetables =  `Ваши овощи:
🌱🍅 Куст томата
Количество: <b>${u.plants.vegetables.tomato}</b>
Выросло: <b>${u.produced.vegetables.tomato}</b> 🍅 Томатов
На складе: <b>${u.warehouse.vegetables.tomato}</b> 🍅

🌱🍆 Куст баклажана
Количество: <b>${u.plants.vegetables.eggplant}</b>
Выросло: <b>${u.produced.vegetables.eggplant}</b> 🍆 Баклажанов
На складе: <b>${u.warehouse.vegetables.eggplant}</b> 🍆

🌱🥕 Морковь
Количество: <b>${u.plants.vegetables.carrots}</b>
Выросло: <b>${u.produced.vegetables.carrots}</b> 🥕 Моркови
На складе: <b>${u.warehouse.vegetables.carrots}</b> 🥕

🌱🌽 Кукуруза
Количество: <b>${u.plants.vegetables.corn}</b>
Выросло: <b>${u.produced.vegetables.corn}</b> 🌽 Кукурузы
На складе: <b>${u.warehouse.vegetables.corn}</b> 🌽

🌱🌶 Куст красного перца
Количество: <b>${u.plants.vegetables.pepper}</b>
Выросло: <b>${u.produced.vegetables.pepper}</b> 🌶 Красных перцев
На складе: <b>${u.warehouse.vegetables.pepper}</b> 🌶

🌱🥔 Куст картофеля
Количество: <b>${u.plants.vegetables.potatoes}</b>
Выросло: <b>${u.produced.vegetables.potatoes}</b> 🥔 Картофеля
На складе: <b>${u.warehouse.vegetables.potatoes}</b> 🥔`
    
        sendHTMLi(u._id, vegetables, 'vegetables')
        
    })
}
function DisplayProducts(chatId) {
    User.findOne({_id: chatId}).then(u => {
        const products =  ``
        
        sendHTMLi(u._id, products, 'products')
        
    })
}
function DisplayBuildings(chatId) {
    User.findOne({_id: chatId}).then(u => {
        const buildings =  `🏫 <b>Постройки</b>
  
Здесь Вы можете купить различные постройки. Постройки содержат животных с которых производятся продукты и ресурсы, которые Вы в последствии можете отправить на склад и продать на рынке за 💶 Евро и 💎 Diamond, которые в последствиии можно вывести как реальные деньги!

Ваши постройки:
🏫🐓 Курятник
Количество: <b>${u.buildings.chicken}</b>
Добыто: <b>${u.produced.products.eggs}</b> 🥚 Яиц
На складе: <b>${u.warehouse.products.eggs}</b>

🏫🐖 Свинарник
Количество: <b>${u.buildings.pig}</b>
Добыто: <b>${u.produced.products.bacon}</b> 🥓 Бекона
На складе: <b>${u.warehouse.products.bacon}</b>

🏫🐑 Овчарник
Количество: <b>${u.buildings.sheepdog}</b>
Добыто: <b>${u.produced.products.wool}</b> ☁️ Шерсти
На складе: <b>${u.warehouse.products.wool}</b>

🏫🐂 Коровник
Количество: <b>${u.buildings.cowshed}</b>
Добыто: <b>${u.produced.products.milk}</b> 🥛 Молока
На складе: <b>${u.warehouse.products.milk}</b>

🏫🐝 Улей
Количество: <b>${u.buildings.hive}</b>
Добыто: <b>${u.produced.products.honey}</b> 🍯 Мёда
На складе: <b>${u.warehouse.products.honey}</b>

🏫🦃 Индюшатник
Количество: <b>${u.buildings.turkey}</b>
Добыто: <b>${u.produced.products.leg}</b> 🍗 Ножек
На складе: <b>${u.warehouse.products.leg}</b>

<i>Вы отдаете 30% всей добываемых Вами ресурсов вашему арендодателю.</i>`
    
        sendHTMLi(u._id, buildings, 'buildings')
        
    })
}
function DisplayWarehouse(chatId) {
    User.findOne({_id: chatId}).then(u => {
        const warehouse =  `📦 <b>Склад</b>\nУ вас на складе:\n
<b>${u.warehouse.fruit.apple + u.warehouse.fruit.pear + u.warehouse.fruit.grapes + u.warehouse.fruit.strawberries + u.warehouse.fruit.cherries + u.warehouse.fruit.peach}</b> 🍎 Фруктов
<b>${u.warehouse.vegetables.tomato + u.warehouse.vegetables.eggplant + u.warehouse.vegetables.carrots + u.warehouse.vegetables.corn + u.warehouse.vegetables.pepper + u.warehouse.vegetables.potatoes}</b> 🌽 Овощей
<b>${u.warehouse.products.eggs + u.warehouse.products.bacon + u.warehouse.products.wool + u.warehouse.products.milk + u.warehouse.products.honey + u.warehouse.products.leg}</b> 🥚 Продуктов
\nРесурсы со склада Вы можете продать на 🛒 <b>Рынке</b>`
    
        sendHTMLi(u._id, warehouse, 'warehouse')
        
    })
}
function sendHTML(chatId, html, kbName = null) {
    
    const options = {
        parse_mode: 'HTML'
    }
    
    if (kbName) {
        options['reply_markup'] = {
            keyboard: keyboard[kbName]
        }
    }
    
    bot.sendMessage(chatId, html, options)
    
}
function sendHTMLi(chatId, html, ikbName = null) {
    const options = {
        parse_mode: 'HTML'
    }
    
    if (ikbName) {
        options['reply_markup'] = {
            inline_keyboard: ikb[ikbName]
        }
    }
    
    bot.sendMessage(chatId, html, options)
}
function editText(text, chatId, messageId, ikbName = null) {
    
    const options = {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML'
    }
    
    if (ikbName) {
        options['reply_markup'] = {
            inline_keyboard: ikb[ikbName]
        }
    }
    
    bot.editMessageText(text, options)
}