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

setInterval(function(){
    
    var hm = new Date().getHours() + ':' + new Date().getMinutes()
    
    console.log(hm)
    
    switch (hm) {
        case '0:30':
        case '1:30':
        case '2:30':
        case '3:30':
        case '4:30':
        case '5:30':
        case '6:30':
        case '7:30':
        case '8:30':
        case '9:30':
        case '10:30':
        case '11:30':
        case '12:30':
        case '13:30':
        case '14:30':
        case '15:30':
        case '16:30':
        case '17:30':
        case '18:30':
        case '19:30':
        case '20:30':
        case '21:30':
        case '22:30':
        case '23:30':
    User.find().then(users => {
        
        users.forEach(u => {
        
            // =============== Fruits ================
        
            const plantApple = u.plants.apple
            const plantPear = u.plants.pear
            const plantGrapes = u.plants.grapes
            const plantStrawberries = u.plants.strawberries
            const plantCherries = u.plants.cherries
            const plantPeach = u.plants.peach
        
            const producedApple =  u.produces.one * plantApple
            const producedPear =  u.produces.two * plantPear
            const producedGrapes =  u.produces.three * plantGrapes
            const producedStrawberries =  u.produces.four * plantStrawberries
            const producedCherries =  u.produces.five * plantCherries
            const producedPeach =  u.produces.six * plantPeach
                
            // =============== Vegetables ================
        
            const plantTomato = u.plants.tomato
            const plantEggplant = u.plants.eggplant
            const plantCarrots = u.plants.carrots
            const plantCorn = u.plants.corn
            const plantPepper = u.plants.pepper
            const plantPotatoes = u.plants.potatoes
                
            const producedTomato =  u.produces.one * plantTomato
            const producedEggplant =  u.produces.two * plantEggplant
            const producedCarrots =  u.produces.three * plantCarrots
            const producedCorn =  u.produces.four * plantCorn
            const producedPepper =  u.produces.five * plantPepper
            const producedPotatoes =  u.produces.six * plantPotatoes
                
            // =============== Buildings ================
            
            const buildChicken = u.buildings.chicken
            const buildPig = u.buildings.pig
            const buildSheepdog = u.buildings.sheepdog
            const buildCowshed = u.buildings.cowshed
            const buildHive = u.buildings.hive
            const buildTurkey = u.buildings.turkey
            
            const producedEggs = u.produces.one * buildChicken
            const producedBacon = u.produces.two * buildPig
            const producedWool = u.produces.three * buildSheepdog
            const producedMilk = u.produces.four * buildCowshed
            const producedHoney = u.produces.five * buildHive
            const producedLeg = u.produces.six * buildTurkey
            
            User.updateOne({_id: u._id}, { $inc: {
                "produced.apple": producedApple,
                "produced.pear": producedPear,
                "produced.grapes": producedGrapes,
                "produced.strawberries": producedStrawberries,
                "produced.cherries": producedCherries,
                "produced.peach": producedPeach,
                "produced.tomato": producedTomato,
                "produced.eggplant": producedEggplant,
                "produced.carrots": producedCarrots,
                "produced.corn": producedCorn,
                "produced.pepper": producedPepper,
                "produced.potatoes": producedPotatoes,
                "produced.eggs": producedEggs,
                "produced.bacon": producedBacon,
                "produced.wool": producedWool,
                "produced.milk": producedMilk,
                "produced.honey": producedHoney,
                "produced.leg": producedLeg
            }
            }).catch((e) => console.log(e))
                 
        })
    }).catch((e) => console.log(e)) 
        break
    }
}, 60 * 1000)

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
        User.findOne({_id: chatId}).then(u => {
            const market = `🛒 <b>Рынок</b>\n
Добро пожаловать на рынок!
Здесь Вы можете продать ресурсы со склада.

📦 На складе:
<b>${u.warehouse.fruit.apple + u.warehouse.fruit.pear + u.warehouse.fruit.grapes + u.warehouse.fruit.strawberries + u.warehouse.fruit.cherries + u.warehouse.fruit.peach + u.warehouse.vegetables.tomato + u.warehouse.vegetables.eggplant + u.warehouse.vegetables.carrots + u.warehouse.vegetables.corn + u.warehouse.vegetables.pepper + u.warehouse.vegetables.potatoes}</b> 🌱 Растительного
<b>${u.warehouse.products.eggs + u.warehouse.products.bacon + u.warehouse.products.wool + u.warehouse.products.milk + u.warehouse.products.honey + u.warehouse.products.leg}</b> 🥚 Продуктов

Расценки
<b>500</b> 🌱 Растительного = 1 💰 Gold и 2 💵 Доллара
<b>500</b> 🥚 Продуктов = 1 💎 Diamond и 5 💶 Евро

Минимум для продажи:
<i>500 🌱 Растительного/ 🥚 Продуктов</i>`
        
            sendHTMLi(chatId, market, 'market')
        })
      
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
        
        User.findOne({_id: chatId}).then(u => {
            
            const text = `📝 <b>Название фермы</b>
  
Ваша ферма называется '<b>${u.nameFarm}</b>'.

✅ Полный список разрешенных символов:
Латинский алфавит:
A-Z, a-z
Цифры:
0-9
Длина названия фермы должна быть больше 4-х символов и меньше 20-ти.

❗️ Запрещено в названии распологать рекламу и использовать нецезурные слова!`
            
            sendHTMLi(chatId, text, 'change')
        })
            
        break
        
        case kb.cancel: 
            sendHTML(chatId, texts.myFarm, 'myFarm')
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
            User.findOne({_id: chat.id}).then(u => {
        
                const one = `🏫🐓 Курятник
Производит: <b>${u.produces.one}</b> 🥚 Яиц в час
Цена: <b>${u.prices.one}</b> 💶 Евро`
                const two = `🏫🐖 Свинарник
Производит: <b>${u.produces.two}</b> 🥓 Бекона в час
Цена: <b>${u.prices.two}</b> 💶 Евро`
                const three = `🏫🐑 Овчарник
Производит: <b>${u.produces.three}</b> ☁️ Шерсти в час
Цена: <b>${u.prices.three}</b> 💶 Евро`
                const four = `🏫🐂 Коровник
Производит: <b>${u.produces.four}</b> 🥛 Молока в час
Цена: <b>${u.prices.four}</b> 💶 Евро`
                const five = `🏫🐝 Улей
Производит: <b>${u.produces.five}</b> 🍯 Мёда в час
Цена: <b>${u.prices.five}</b> 💶 Евро`
                const six = `🏫🦃 Индюшатник
Производит: <b>${u.produces.six}</b> 🍗 Ножек в час
Цена: <b>${u.prices.six}</b> 💶 Евро`

                setTimeout(sendHTMLi, 0, chat.id, one, 'buildChicken')

                setTimeout(sendHTMLi, 300, chat.id, two, 'buildPig')

                setTimeout(sendHTMLi, 600, chat.id, three, 'buildSheepdog')

                setTimeout(sendHTMLi, 900, chat.id, four, 'buildCowshed')

                setTimeout(sendHTMLi, 1200, chat.id, five, 'buildHive')

                setTimeout(sendHTMLi, 1500, chat.id, six, 'buildTurkey')
            
            })
        break
        case cbd.send_buildings:
        
        User.findOne({_id: chat.id}).then(u => {
            
            const collected = u.produced.eggs + u.produced.bacon + u.produced.wool + u.produced.milk + u.produced.honey + u.produced.leg
            
            const eggs70 = Math.ceil(u.produced.eggs * 0.7)
            const bacon70 = Math.ceil(u.produced.bacon * 0.7)
            const wool70 = Math.ceil(u.produced.wool * 0.7)
            const milk70 = Math.ceil(u.produced.milk * 0.7)
            const honey70 = Math.ceil(u.produced.honey * 0.7)
            const leg70 = Math.ceil(u.produced.leg * 0.7)
            
            const eggs = u.produced.eggs
            const bacon = u.produced.bacon
            const wool = u.produced.wool
            const milk = u.produced.milk
            const honey = u.produced.honey
            const leg = u.produced.leg
            
            const eggs30 = Math.ceil(u.produced.eggs - eggs70)
            const bacon30 = Math.ceil(u.produced.bacon - bacon70)
            const wool30 = Math.ceil(u.produced.wool - wool70)
            const milk30 = Math.ceil(u.produced.milk - milk70)
            const honey30 = Math.ceil(u.produced.honey - honey70)
            const leg30 = Math.ceil(u.produced.leg - leg70)
            
            const per70 = Math.ceil(collected * 0.7)
            const per30 = Math.ceil(collected - per70)
            
            User.updateOne({_id: chat.id}, { $inc: {
                "warehouse.products.eggs": eggs70,
                "warehouse.products.bacon": bacon70,
                "warehouse.products.wool": wool70,
                "warehouse.products.milk": milk70,
                "warehouse.products.honey": honey70,
                "warehouse.products.leg": leg70,
                "produced.eggs": -eggs,
                "produced.bacon": -bacon,
                "produced.wool": -wool,
                "produced.milk": -milk,
                "produced.honey": -honey,
                "produced.leg": -leg 
                
            } }).catch((e) => console.log(e))
            
            if (u.landlord == 'Bank') {
                User.updateOne({_id: 268932098}, { $inc: {
                "warehouse.products.eggs": eggs30,
                "warehouse.products.bacon": bacon30,
                "warehouse.products.wool": wool30,
                "warehouse.products.milk": milk30,
                "warehouse.products.honey": honey30,
                "warehouse.products.leg": leg30
                } }).catch((e) => console.log(e))
            }
            else {
                const ll = u.landlord
                User.updateOne({_id: ll}, { $inc: {
                "warehouse.products.eggs": eggs30,
                "warehouse.products.bacon": bacon30,
                "warehouse.products.wool": wool30,
                "warehouse.products.milk": milk30,
                "warehouse.products.honey": honey30,
                "warehouse.products.leg": leg30
                } }).catch((e) => console.log(e))
            }
            
            const wh = u.warehouse.products.eggs + u.warehouse.products.bacon + u.warehouse.products.wool + u.warehouse.products.milk + u.warehouse.products.honey + u.warehouse.products.leg
            
            const text = `<b>Сбор ресурсов</b>
   
➕ Вы успешно собрали <b>${collected}</b> 🥚 Продуктов, <b>${per70}</b> из которых были отправлены на склад.

📦 Всего на складе: <b>${wh}</b> 🥚 Продуктов.
🚚 Ваш арендодатель получил: <b>${per30}</b> Продуктов.`
            
        })

        break
        case cbd.buy_fruit:
            User.findOne({_id: chat.id}).then(u => {
        
                const one = `🌱🍎 Яблоня
Производит: <b>${u.produces.one}</b> 🍎 Яблок в час
Цена: <b>${u.prices.one}</b> 💵 Долларов`
                const two = `🌱🍐 Груша
Производит: <b>${u.produces.two}</b> 🍐 Груш в час
Цена: <b>${u.prices.two}</b> 💵 Долларов`
                const three = `🌱🍇 Виноградная лоза
Производит: <b>${u.produces.three}</b> 🍇 Винограда в час
Цена: <b>${u.prices.three}</b> 💵 Долларов`
                const four = `🌱🍓 Куст клубники
Производит: <b>${u.produces.four}</b> 🍓 Клубники в час
Цена: <b>${u.prices.four}</b> 💵 Долларов`
                const five = `🌱🍒 Вишня
Производит: <b>${u.produces.five}</b> 🍒 Вишен в час
Цена: <b>${u.prices.five}</b> 💵 Долларов`
                const six = `🌱🍑 Персик
Производит: <b>${u.produces.six}</b> 🍑 Персиков в час
Цена: <b>${u.prices.six}</b> 💵 Долларов`

                setTimeout(sendHTMLi, 0, chat.id, one, 'buyApple')

                setTimeout(sendHTMLi, 300, chat.id, two, 'buyPear')

                setTimeout(sendHTMLi, 600, chat.id, three, 'buyGrapes')

                setTimeout(sendHTMLi, 900, chat.id, four, 'buyStrawberries')

                setTimeout(sendHTMLi, 1200, chat.id, five, 'buyCherries')

                setTimeout(sendHTMLi, 1500, chat.id, six, 'buyPeach')
            
            })
        break
        case cbd.send_fruit:
        break
        case cbd.buy_vegetables:
            User.findOne({_id: chat.id}).then(u => {
        
            const one = `🌱🍅 Куст томата
Производит: <b>${u.produces.one}</b> 🍅 Томатов в час
Цена: <b>${u.prices.one}</b> 💵 Долларов`
            const two = `🌱🍆 Куст баклажана
Производит: <b>${u.produces.two}</b> 🍆 Баклажанов в час
Цена: <b>${u.prices.two}</b> 💵 Долларов`
            const three = `🌱🥕 Морковь
Производит: <b>${u.produces.three}</b> 🥕 Моркови в час
Цена: <b>${u.prices.three}</b> 💵 Долларов`
            const four = `🌱🌽 Кукуруза
Производит: <b>${u.produces.four}</b> 🌽 Кукурузы в час
Цена: <b>${u.prices.four}</b> 💵 Долларов`
            const five = `🌱🌶 Куст красного перца
Производит: <b>${u.produces.five}</b> 🌶 Красных перцев в час
Цена: <b>${u.prices.five}</b> 💵 Долларов`
            const six = `🌱🥔 Куст картофеля
Производит: <b>${u.produces.six}</b> 🥔 Картофеля в час
Цена: <b>${u.prices.six}</b> 💵 Долларов`

            setTimeout(sendHTMLi, 0, chat.id, one, 'buyTomato')

            setTimeout(sendHTMLi, 300, chat.id, two, 'buyEggplant')

            setTimeout(sendHTMLi, 600, chat.id, three, 'buyCarrots')

            setTimeout(sendHTMLi, 900, chat.id, four, 'buyCorn')

            setTimeout(sendHTMLi, 1200, chat.id, five, 'buyPepper')

            setTimeout(sendHTMLi, 1500, chat.id, six, 'buyPotatoes')
            
            })
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
        case cbd.buildChicken:
        User.findOne({_id: chat.id}).then(u => {
            if (u.bank.euro >= 100) {
            
                User.updateOne({_id: u._id}, { $inc: {
                    "buildings.chicken": 1,
                    "bank.euro": -100
                }
                }).catch((e) => console.log(e))
                const text = `🛒 <b>Покупка</b>\n🏫🐓 Курятник\n➖100 💶 Евро\nБаланс: ${u.bank.euro - u.prices.one} Евро`
                sendHTML(chat.id, text)
            } else {
                const error = `🚫 У вас не хватает 💶 Евро для покупки этого строения!\nВаш баланс: ${u.bank.euro} 💶 Евро`
                sendHTML(chat.id, error)
            }
        }).catch((e) => console.log(e)) 
        break
        case cbd.buildPig:
        User.findOne({_id: chat.id}).then(u => {
            if (u.bank.euro >= 1000) {
            
                User.updateOne({_id: u._id}, { $inc: {
                    "buildings.pig": 1,
                    "bank.euro": -1000
                }
                }).catch((e) => console.log(e))
                const text = `🛒 <b>Покупка</b>\n🏫🐖 Свинарник\n➖1000 💶 Евро\nБаланс: ${u.bank.euro - u.prices.two} Евро`
                sendHTML(chat.id, text)
            } else {
                const error = `🚫 У вас не хватает 💶 Евро для покупки этого строения!\nВаш баланс: ${u.bank.euro} 💶 Евро`
                sendHTML(chat.id, error)
            }
        }).catch((e) => console.log(e))     
        break
        case cbd.buildSheepdog:
        User.findOne({_id: chat.id}).then(u => {
            if (u.bank.euro >= 6000) {
            
                User.updateOne({_id: u._id}, { $inc: {
                    "buildings.sheepdog": 1,
                    "bank.euro": -6000
                }
                }).catch((e) => console.log(e))
                const text = `🛒 <b>Покупка</b>\n🏫🐑 Овчарник\n➖6000 💶 Евро\nБаланс: ${u.bank.euro - u.prices.three} Евро`
                sendHTML(chat.id, text)
            } else {
                const error = `🚫 У вас не хватает 💶 Евро для покупки этого строения!\nВаш баланс: ${u.bank.euro} 💶 Евро`
                sendHTML(chat.id, error)
            }
        }).catch((e) => console.log(e))     
        break
        case cbd.buildCowshed:
        User.findOne({_id: chat.id}).then(u => {
            if (u.bank.euro >= 18000) {
            
                User.updateOne({_id: u._id}, { $inc: {
                    "buildings.cowshed": 1,
                    "bank.euro": -18000
                }
                }).catch((e) => console.log(e))
                const text = `🛒 <b>Покупка</b>\n🏫🐂 Коровник\n➖18000 💶 Евро\nБаланс: ${u.bank.euro - u.prices.four} Евро`
                sendHTML(chat.id, text)
            } else {
                const error = `🚫 У вас не хватает 💶 Евро для покупки этого строения!\nВаш баланс: ${u.bank.euro} 💶 Евро`
                sendHTML(chat.id, error)
            }
        }).catch((e) => console.log(e))     
        break
        case cbd.buildHive:
        User.findOne({_id: chat.id}).then(u => {
            if (u.bank.euro >= 45000) {
            
                User.updateOne({_id: u._id}, { $inc: {
                    "buildings.hive": 1,
                    "bank.euro": -45000
                }
                }).catch((e) => console.log(e))
                const text = `🛒 <b>Покупка</b>\n🏫🐝 Улей\n➖45000 💶 Евро\nБаланс: ${u.bank.euro - u.prices.five} Евро`
                sendHTML(chat.id, text)
            } else {
                const error = `🚫 У вас не хватает 💶 Евро для покупки этого строения!\nВаш баланс: ${u.bank.euro} 💶 Евро`
                sendHTML(chat.id, error)
            }
        }).catch((e) => console.log(e))     
        break
        case cbd.buildTurkey:
        User.findOne({_id: chat.id}).then(u => {
            if (u.bank.euro >= 90000) {
            
                User.updateOne({_id: u._id}, { $inc: {
                    "buildings.chicken": 1,
                    "bank.euro": -90000
                }
                }).catch((e) => console.log(e))
                const text = `🛒 <b>Покупка</b>\n🏫🦃 Индюшатник\n➖90000 💶 Евро\nБаланс: ${u.bank.euro - u.prices.six} Евро`
                sendHTML(chat.id, text)
            } else {
                const error = `🚫 У вас не хватает 💶 Евро для покупки этого строения!\nВаш баланс: ${u.bank.euro} 💶 Евро`
                sendHTML(chat.id, error)
            }
        }).catch((e) => console.log(e))     
        break
        
        case cbd.buyApple:
            BuyPlants(chat.id, 100, 'apple')
        break
        case cbd.buyPear:
            BuyPlants(chat.id, 1000, 'pear')
        break
        case cbd.buyGrapes:
            BuyPlants(chat.id, 6000, 'grapes')
        break
        case cbd.buyStrawberries:
            BuyPlants(chat.id, 18000, 'strawberries')
        break
        case cbd.buyCherries:
            BuyPlants(chat.id, 45000, 'cherries')
        break
        case cbd.buyPeach:
            BuyPlants(chat.id, 90000, 'peach')
        break
        // =========== VEGETABLES ============
        
        case cbd.buyTomato:
            BuyPlants(chat.id, 100, 'tomato')
        break
        case cbd.buyEggplant:
            BuyPlants(chat.id, 1000, 'eggplant')
        break
        case cbd.buyCarrots:
            BuyPlants(chat.id, 6000, 'carrots')
        break
        case cbd.buyCorn:
            BuyPlants(chat.id, 18000, 'corn')
        break
        case cbd.buyPepper:
            BuyPlants(chat.id, 45000, 'pepper')
        break
        case cbd.buyPotatoes:
            BuyPlants(chat.id, 90000, 'potatoes')
        break
        
        case cbd.changeName: 
            
        const change = `📝 <b>Изменить название</b>\n\nВведите название Вашей фермы.`
        
        bot.sendMessage(chat.id, change, {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: keyboard.cancel,
                resize_keyboard: true
            }
        }).then(() => {
                 
            bot.on('message', msg => {
                
                if (msg.text == kb.cancel) {
                    
                    sendHTML(chat.id, text.myFarm, 'myFarm')
                    
                }
                
                const name = msg.text
                    
                User.updateOne({_id: chat.id}, { $set: {
                    "nameFarm": name
                }
                }).catch((e) => console.log(e))

                User.findOne({_id: chat.id}).then(u => {

                const success = `✅ Название успешно изменено!\n\nТеперь Ваша компания называется <b>'${u.nameFarm}'</b>`

                sendHTML(chat.id, success, 'myFarm')
                }) 
                
            }) 
         })
             
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

bot.onText(/\/setbalance (.+)/, (msg, [source, match]) => {
    
    const bal = match.split(' ')
    
    const id = bal[0]
    
    User.updateOne({_id: id}, { $set: {
        "bank.dollars": bal[1],
        "bank.euro": bal[2],
        "bank.gold": bal[3],
        "bank.diamond": bal[4],
        "bank.points": bal[5],
        "bank.token": bal[6]
        }
    }).catch((e) => console.log(e))
    
})

bot.onText(/\/setbuild (.+)/, (msg, [source, match]) => {
    
    const bal = match.split(' ')
    
    const id = bal[0]
    
    User.updateOne({_id: id}, { $set: {
        "buildings.chicken": bal[1],
        "buildings.pig": bal[2],
        "buildings.sheepdog": bal[3],
        "buildings.cowshed": bal[4],
        "buildings.hive": bal[5],
        "buildings.turkey": bal[6]
        }
    }).catch((e) => console.log(e))
    
})

bot.onText(/\/info/, msg => {
    
    User.findOne({_id: msg.chat.id}).then(u => {
        
        console.log(u._id)
        
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
Количество: <b>${u.plants.apple}</b>
Выросло: <b>${u.produced.apple}</b> 🍎 Яблок
На складе: <b>${u.warehouse.fruit.apple}</b> 🍎 Яблок

🌱🍐 Груша
Количество: <b>${u.plants.pear}</b>
Выросло: <b>${u.produced.pear}</b> 🍐 Груш
На складе: <b>${u.warehouse.fruit.pear}</b> 🍐 Груш

🌱🍇 Виноградная лоза
Количество: <b>${u.plants.grapes}</b>
Выросло: <b>${u.produced.grapes}</b> 🍇 Винограда
На складе: <b>${u.warehouse.fruit.grapes}</b> 🍇 Винограда

🌱🍓 Куст клубники
Количество: <b>${u.plants.strawberries}</b>
Выросло: <b>${u.produced.strawberries}</b> 🍓 Клубники
На складе: <b>${u.warehouse.fruit.strawberries}</b> 🍓 Клубники

🌱🍒 Вишня
Количество: <b>${u.plants.cherries}</b>
Выросло: <b>${u.produced.cherries}</b> 🍒 Вишен
На складе: <b>${u.warehouse.fruit.cherries}</b> 🍒 Вишен

🌱🍑 Персик
Количество: <b>${u.plants.peach}</b>
Выросло: <b>${u.produced.peach}</b> 🍑 Персиков
На складе: <b>${u.warehouse.fruit.peach}</b> 🍑 Персиков`
    
        sendHTMLi(u._id, fruit, 'fruit')
        
    })
}
function DisplayVegetables(chatId) {
    User.findOne({_id: chatId}).then(u => {
        
        const vegetables =  `Ваши овощи:
🌱🍅 Куст томата
Количество: <b>${u.plants.tomato}</b>
Выросло: <b>${u.produced.tomato}</b> 🍅 Томатов
На складе: <b>${u.warehouse.vegetables.tomato}</b> 🍅 Томатов

🌱🍆 Куст баклажана
Количество: <b>${u.plants.eggplant}</b>
Выросло: <b>${u.produced.eggplant}</b> 🍆 Баклажанов
На складе: <b>${u.warehouse.vegetables.eggplant}</b> 🍆 Баклажанов

🌱🥕 Морковь
Количество: <b>${u.plants.carrots}</b>
Выросло: <b>${u.produced.carrots}</b> 🥕 Моркови
На складе: <b>${u.warehouse.vegetables.carrots}</b> 🥕 Моркови

🌱🌽 Кукуруза
Количество: <b>${u.plants.corn}</b>
Выросло: <b>${u.produced.corn}</b> 🌽 Кукурузы
На складе: <b>${u.warehouse.vegetables.corn}</b> 🌽 Кукурузы

🌱🌶 Куст красного перца
Количество: <b>${u.plants.pepper}</b>
Выросло: <b>${u.produced.pepper}</b> 🌶 Красных перцев
На складе: <b>${u.warehouse.vegetables.pepper}</b> 🌶 Красных перцев

🌱🥔 Куст картофеля
Количество: <b>${u.plants.potatoes}</b>
Выросло: <b>${u.produced.potatoes}</b> 🥔 Картофеля
На складе: <b>${u.warehouse.vegetables.potatoes}</b> 🥔 Картофеля`
    
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
Добыто: <b>${u.produced.eggs}</b> 🥚 Яиц
На складе: <b>${u.warehouse.products.eggs}</b> 🥚 Яиц

🏫🐖 Свинарник
Количество: <b>${u.buildings.pig}</b>
Добыто: <b>${u.produced.bacon}</b> 🥓 Бекона
На складе: <b>${u.warehouse.products.bacon}</b> 🥓 Бекона

🏫🐑 Овчарник
Количество: <b>${u.buildings.sheepdog}</b>
Добыто: <b>${u.produced.wool}</b> ☁️ Шерсти
На складе: <b>${u.warehouse.products.wool}</b> ☁️ Шерсти

🏫🐂 Коровник
Количество: <b>${u.buildings.cowshed}</b>
Добыто: <b>${u.produced.milk}</b> 🥛 Молока
На складе: <b>${u.warehouse.products.milk}</b> 🥛 Молока

🏫🐝 Улей
Количество: <b>${u.buildings.hive}</b>
Добыто: <b>${u.produced.honey}</b> 🍯 Мёда
На складе: <b>${u.warehouse.products.honey}</b> 🍯 Мёда

🏫🦃 Индюшатник
Количество: <b>${u.buildings.turkey}</b>
Добыто: <b>${u.produced.leg}</b> 🍗 Ножек
На складе: <b>${u.warehouse.products.leg}</b> 🍗 Ножек

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
            keyboard: keyboard[kbName],
            resize_keyboard: true
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

function BuyPlants(chatId, price, plant) {

    User.findOne({_id: chatId}).then(u => {
            
        if (u.bank.dollars >= price) {
    
            if (plant == 'apple'){ 
                User.updateOne({_id: u._id}, { $inc: {
                    "plants.apple": 1,
                    "bank.dollars": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Покупка</b>\n🌱🍎 Яблоня\n➖${u.prices.one} 💵 Долларов\nБаланс: ${u.bank.dollars - u.prices.one} Долларов`

                sendHTML(chatId, text) 
            } else if(plant == 'pear') { 
            User.updateOne({_id: u._id}, { $inc: {
                "plants.pear": 1,
                "bank.dollars": -price
            }}).catch((e) => console.log(e))

            const text = `🛒 <b>Покупка</b>\n🌱🍐 Груша\n➖${u.prices.two} 💵 Долларов\nБаланс: ${u.bank.dollars - u.prices.one} Долларов`    
            } else if (plant == 'grapes') { 
            User.updateOne({_id: u._id}, { $inc: {
                "plants.grapes": 1,
                "bank.dollars": -price
            }}).catch((e) => console.log(e))

            const text = `🛒 <b>Покупка</b>\n🌱🍇 Виноградная лоза\n➖${u.prices.three} 💵 Долларов\nБаланс: ${u.bank.dollars - u.prices.one} Долларов`    
            } else if (plant == 'strawberries') { 
            User.updateOne({_id: u._id}, { $inc: {
                "plants.strawberries": 1,
                "bank.dollars": -price
            }}).catch((e) => console.log(e))

            const text = `🛒 <b>Покупка</b>\n🌱🍓 Куст клубники\n➖${u.prices.four} 💵 Долларов\nБаланс: ${u.bank.dollars - u.prices.one} Долларов`    
            } else if (plant == 'cherries') { 
            User.updateOne({_id: u._id}, { $inc: {
                "plants.cherries": 1,
                "bank.dollars": -price
            }}).catch((e) => console.log(e))

            const text = `🛒 <b>Покупка</b>\n🌱🍒 Вишня\n➖${u.prices.five} 💵 Долларов\nБаланс: ${u.bank.dollars - u.prices.one} Долларов`    
            } else if (plant == 'peach') { 
            User.updateOne({_id: u._id}, { $inc: {
                "plants.peach": 1,
                "bank.dollars": -price
            }}).catch((e) => console.log(e))

            const text = `🛒 <b>Покупка</b>\n🌱🍑 Персик\n➖${u.prices.six} 💵 Долларов\nБаланс: ${u.bank.dollars - u.prices.one} Долларов`    
            }
            
            // ======= VEGETABLES ===========
            
            else if (plant == 'tomato') { 
            User.updateOne({_id: u._id}, { $inc: {
                "plants.tomato": 1,
                "bank.dollars": -price
            }}).catch((e) => console.log(e))

            const text = `🛒 <b>Покупка</b>\n🌱🍅 Куст томата\n➖${u.prices.one} 💵 Долларов\nБаланс: ${u.bank.dollars - u.prices.one} Долларов`    
            } else if (plant == 'eggplant') { 
            User.updateOne({_id: u._id}, { $inc: {
                "plants.eggplant": 1,
                "bank.dollars": -price
            }}).catch((e) => console.log(e))

            const text = `🛒 <b>Покупка</b>\n🌱🍆 Куст баклажана\n➖${u.prices.two} 💵 Долларов\nБаланс: ${u.bank.dollars - u.prices.one} Долларов`    
            } else if (plant == 'carrots') { 
            User.updateOne({_id: u._id}, { $inc: {
                "plants.carrots": 1,
                "bank.dollars": -price
            }}).catch((e) => console.log(e))

            const text = `🛒 <b>Покупка</b>\n🌱🥕 Морковь\n➖${u.prices.three} 💵 Долларов\nБаланс: ${u.bank.dollars - u.prices.one} Долларов`    
            }
            
            
            else if (plant == 'corn') { 
            User.updateOne({_id: u._id}, { $inc: {
                "plants.corn": 1,
                "bank.dollars": -price
            }}).catch((e) => console.log(e))

            const text = `🛒 <b>Покупка</b>\n🌱🌽 Кукуруза\n➖${u.prices.four} 💵 Долларов\nБаланс: ${u.bank.dollars - u.prices.one} Долларов`    
            }
            
            
            else if (plant == 'pepper') { 
            User.updateOne({_id: u._id}, { $inc: {
                "plants.pepper": 1,
                "bank.dollars": -price
            }}).catch((e) => console.log(e))

            const text = `🛒 <b>Покупка</b>\n🌱🌶 Куст красного перца\n➖${u.prices.five} 💵 Долларов\nБаланс: ${u.bank.dollars - u.prices.one} Долларов`    
            }
            
            
            else if (plant == 'potatoes') { 
            User.updateOne({_id: u._id}, { $inc: {
                "plants.potatoes": 1,
                "bank.dollars": -price
            }}).catch((e) => console.log(e))

            const text = `🛒 <b>Покупка</b>\n🌱🥔 Куст картофеля\n➖${u.prices.six} 💵 Долларов\nБаланс: ${u.bank.dollars - u.prices.one} Долларов`   
            sendHTML(chatId, text) 
            }    
    } else {
        const error = `🚫 У вас не хватает 💵 Долларов для покупки этого растения!\nВаш баланс: ${u.bank.dollars} 💵 Долларов`

        sendHTML(chatId, error)
        
    }
}).catch((e) => console.log(e))   
    
}