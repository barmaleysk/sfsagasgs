const TelegramBot = require('node-telegram-bot-api')
const mongoose = require('mongoose')

const config = require('./config')
const helper = require('./helper')
const cbd = require('./callbacks')
let kb = require('./keyboard-buttons-ru')
let lang

module.exports = {
    lang   
}

let keyboard = require('./keyboard')
let ikb = require('./inline-keyboard')
let texts = require('./texts-ru')


const PAYMENT_WALL_TEST = '361519591:TEST:5c1110cb8fd8c126b7cbc329a53b0afa'
const CLICK_TEST = '398062629:TEST:999999999_F91D8F69C042267444B74CC0B3C747757EB0E065'
const PAYCOM_TEST = '371317599:TEST:268932098'

mongoose.connect(config.DB_URL)
.then (() => {
      console.log('MogoDB Connected: ' + config.DB_URL)
})
.catch((e) => console.log(e))

require('./models/users.model')
require('./models/general.model')

const User = mongoose.model('users')
const Gen = mongoose.model('general')


var name = ''
var dep = 0
var nameFlag = false
var sellFlag = false
// ===========================================
const bot = new TelegramBot(config.TOKEN, {
    polling: true
})
helper.logStart()
setInterval(function(){
    var hm = new Date().getHours() + ':' + new Date().getMinutes()
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
            Gen.findOne({_id: 1}).then(g => {
            // =============== Fruits ================
            const plantApple = u.plants.apple
            const plantPear = u.plants.pear
            const plantGrapes = u.plants.grapes
            const plantStrawberries = u.plants.strawberries
            const plantCherries = u.plants.cherries
            const plantPeach = u.plants.peach
        
            const producedApple =  (g.produces.one / 2) * plantApple
            const producedPear =  (g.produces.two / 2) * plantPear
            const producedGrapes =  (g.produces.three / 2) * plantGrapes
            const producedStrawberries =  (g.produces.four / 2) * plantStrawberries
            const producedCherries =  (g.produces.five / 2) * plantCherries
            const producedPeach =  (g.produces.six / 2) * plantPeach
                
            // =============== Vegetables ================
        
            const plantTomato = u.plants.tomato
            const plantEggplant = u.plants.eggplant
            const plantCarrots = u.plants.carrots
            const plantCorn = u.plants.corn
            const plantPepper = u.plants.pepper
            const plantPotatoes = u.plants.potatoes
                
            const producedTomato =  (g.produces.one / 2) * plantTomato
            const producedEggplant =  (g.produces.two / 2) * plantEggplant
            const producedCarrots =  (g.produces.three / 2) * plantCarrots
            const producedCorn =  (g.produces.four / 2) * plantCorn
            const producedPepper =  (g.produces.five / 2) * plantPepper
            const producedPotatoes =  (g.produces.six / 2) * plantPotatoes
                
            // =============== Buildings ================
            
            const buildChicken = u.buildings.chicken
            const buildPig = u.buildings.pig
            const buildSheepdog = u.buildings.sheepdog
            const buildCowshed = u.buildings.cowshed
            const buildHive = u.buildings.hive
            const buildTurkey = u.buildings.turkey
            
            const producedEggs = g.produces.one * buildChicken
            const producedBacon = g.produces.two * buildPig
            const producedWool = g.produces.three * buildSheepdog
            const producedMilk = g.produces.four * buildCowshed
            const producedHoney = g.produces.five * buildHive
            const producedLeg = g.produces.six * buildTurkey
            
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
        })
    }).catch((e) => console.log(e)) 
        break
    }
}, 60 * 1000)

bot.on('message', msg => {
    const chatId = helper.gCI(msg)
    
    switch (msg.text) {
        // ======= HOME ==========
            
        case kb.home.myFarm: case kb.back_farm:
            sendHTML(chatId, texts.myFarm, 'myFarm')
        break
        case kb.home.friends:
        break
        
        // ======= CITY =======
        case kb.home.city: case kb.back_city: case kb.cancel_dep:
            sendHTML(chatId, texts.city, 'city')
        break
        
        case kb.city.market:
            User.findOne({_id: chatId}).then(u => {
            const market = `🛒 <b>Рынок</b>\n
Добро пожаловать на рынок!
Здесь Вы можете продать ресурсы со склада.

📦 На складе:
<b>${u.warehouse.fruit.apple + u.warehouse.fruit.pear + u.warehouse.fruit.grapes + u.warehouse.fruit.strawberries + u.warehouse.fruit.cherries + u.warehouse.fruit.peach + u.warehouse.vegetables.tomato + u.warehouse.vegetables.eggplant + u.warehouse.vegetables.carrots + u.warehouse.vegetables.corn + u.warehouse.vegetables.pepper + u.warehouse.vegetables.potatoes}</b> 🌱 Растительного
<b>${u.warehouse.products.eggs + u.warehouse.products.bacon + u.warehouse.products.wool + u.warehouse.products.milk + u.warehouse.products.honey + u.warehouse.products.leg}</b> 🥚 Продуктов

Расценки
<b>500</b> 🌱 Растительных продуктов = 1 💰 Gold и 2 💵 Доллара
<b>500</b> 🥚 Животных продуктов = 1 💎 Diamond и 2 💶 Евро

Минимум для продажи:
<i>500 🌱/🥚 продуктов</i>`
        
            sendHTMLi(chatId, market, 'market')
        })
        break
        case kb.city.bank:
            DisplayBank(chatId)
        break
        case kb.city.casino:
            sendHTML(chatId, texts.casino, 'casino')
        break
        
        case kb.city.townHall: case kb.no: case kb.cancel:
            sendHTML(chatId, texts.townHall, 'townHall')
        break
        case kb.townHall.name:
        User.findOne({_id: chatId}).then(u => {
            if (u.nameFarm == '') {
                const text = `📝 <b>Название фермы</b>\n
Ваша ферма пока никак не назывется. Вы можете придумать для нее абсолютно любое название состоящее из латинских букв и цифр.
\nНазвание для фермы - это её лицо. По нему Вас смогут находить другие игроки и именно оно в первую очередь будет отображаться при взаимоотношениях с другими игроками.\n
✅ Полный список разрешенных символов:
Латинский алфавит:\nA-Z, a-z\nЦифры:\n0-9\n
Длина названия фермы должна быть больше 4-х символов и меньше 20-ти.\n
❗️ Запрещено в названии распологать рекламу и использовать нецезурные слова!`
            
            sendHTMLi(chatId, text, 'change')
            }
            else {
                const text = `📝 <b>Название фермы</b>\n
Ваша ферма называется '<b>${u.nameFarm}</b>'.\n
✅ Полный список разрешенных символов:
Латинский алфавит:\nA-Z, a-z\nЦифры:\n0-9\n
Длина названия фермы должна быть больше 4-х символов и меньше 20-ти.\n
❗️ Запрещено в названии распологать рекламу и использовать нецезурные слова!`
            
            sendHTMLi(chatId, text, 'change')
            }
        
        })
        break
        
        case kb.townHall.statistics:
            getStat(chatId)
        break
        
        // ========== CASINO ==============
        case kb.casino.bonus:
            User.findOne({_id: chatId}).then(u => {
                
                const time = msg.date
                const utime = u.lastBonus
                
                if (utime != null) {
                    
                    const delta = new Date(time - utime).getHours()
                    
                    if (delta <= '18') {
                        getBonus(chatId, time)
                    }
                    else {
                        const error = `🕐 Вы уже получали бонус сегодня. Приходите завтра.`
                        sendHTML(chatId, error)
                    }
                }
                else {
                    const iso = new Date(time * 1000)
                    getBonus(chatId, time)
                }
            })
        break
        // ========== MY FARM =============
        case kb.myFarm.plants:
            sendHTMLi(chatId, texts.plants, 'plants')
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
        
        case kb.myFarm.referals:
        User.findOne({_id: chatId}).then(u => {
        const text = `👥 <b>Реферальная ссылка</b>\n 
За каждую регистрацию по Вашей реферальной ссылке, Вы будете получать <b>40</b> 💵 Долларов и <b>20</b> 💶 Евро.
Также, каждый, кто регистрируется по Вашей реферальной ссылке автоматически передает Вам 30% своих ресурсов со сборов.\n
Вы привели: <b>${u.referals.length}</b> реферала(ов).\n
Ссылка:`
        const link = `https://t.me/FarmerGameBot?start=${u._id}`
        sendHTML(chatId, text)
        setTimeout(sendHTML, 300, chatId, link)
        })
        break
        
        // ======= OTHER =======
        case kb.home.other:
            sendHTML(chatId, texts.other, 'other')
        break
        case kb.other.tasks:
            User.findOne({_id: chatId}).then(u => {
                
                switch (u.successTasks) {
                    case 0: 
                    sendHTMLi(chatId, texts.tasks.task1, 'task1')
                    break
                    case 1: 
                    sendHTMLi(chatId, texts.tasks.task2, 'task2')
                    break
                    case 2: 
                    sendHTMLi(chatId, texts.tasks.task3, 'task3')
                    break
                    case 3: 
                    sendHTMLi(chatId, texts.tasks.task4, 'task4')
                    break
                    case 4: 
                    sendHTMLi(chatId, texts.tasks.task5, 'task5')
                    break
                    case 5: 
                    sendHTMLi(chatId, texts.tasks.task6, 'task6')
                    break
                    case 6: 
                    sendHTMLi(chatId, texts.tasks.task7, 'task7')
                    break
                    case 7: 
                    sendHTMLi(chatId, texts.tasks.task8, 'task8')
                    break
                    case 8: 
                    sendHTMLi(chatId, texts.tasks.task9, 'task9')
                    break
                    case 9: 
                    sendHTMLi(chatId, texts.tasks.task10, 'task10')
                    break
                    case 10: 
                    sendHTML(chatId, texts.tasks.no_task)
                    break
                }
                
            })
        break
        case kb.other.settings:
        break
        case kb.other.help:
            sendHTMLi(chatId, texts.help, 'help')
        break
        case kb.other.community:
            sendHTML(chatId, texts.community)
        break
        
        
        
        case kb.back: 
            sendHTML(chatId, texts.mainMenu, 'home')
        break
        case kb.yes: 
            if (nameFlag) {
            User.findOne({_id: chatId}).then(u => {

                User.updateOne({_id: u.landlord}, { $inc: {
                    "bank.dollars": 40,
                    "bank.euro": 20
                }}).catch((e) => console.log(e))

                User.updateOne({_id: chatId}, { $set: {
                    "nameFarm": name
                }
                }).catch((e) => console.log(e))

                const ref = `👤 По вашей реферальной ссылке реферал успешно получил лицензию фермера, его ферма называется:\n<b>${name}</b>\nТеперь Вы сдаете в аренду 30% участка этой фермы и Вы так же получаете награду:\n <b>40</b> 💵 Долларов и <b>20</b> 💶 Евро.`
                
                sendHTML(u.landlord, ref)

            })
            }
            else {
                User.updateOne({_id: chatId}, { $set: {
                    "nameFarm": name
                }
                }).catch((e) => console.log(e))
            }

            User.findOne({_id: chatId}).then(u => {

            const success = `✅ Название успешно изменено!\n\nТеперь Ваша компания называется <b>'${name}'</b>`

            sendHTML(chatId, success, 'townHall')
            }) 
        break
    } 
})

bot.onText(/\/start/, msg => {
    const chatId = helper.gCI(msg)
    User.find({}).then(u => {
        var count = 0
        u.forEach(i => {
            count++
        })
        console.log(count)
    })
    User.findOne({_id: chatId}).then(u => {
        
        if (u != null) {
            sendHTML(chatId, texts.mainMenu, 'home')
        }
        else 
            if (u == null) {
            u = new User({
                _id: chatId,
                registerDate: new Date()
            })
        
            u.save()
                .catch((e) => console.log(e))
            
            sendHTMLi(chatId, texts.firstStarting, 'firstMessage')
            
        }
    })
    
})
bot.onText(/\/start (\d+)/, (msg, [, match]) => {
    const chatId = helper.gCI(msg)
    
    User.findOne({_id: chatId}).then(u => {
        
        if (u != null) {
            console.log(`Пользователь ${chatId} существует`)
        }
        else 
            if (u == null) {
            
            u = new User({
                _id: chatId,
                landlord: match,
                registerDate: new Date()
            })
                
            u.save().catch((e) => console.log('Дублирование индекса'))
                
            if (chatId != match) {
                User.updateOne({_id: match}, {
                    $push: {
                        "referals": chatId
                    }
                }).catch(e => console.log('Ошибка добавления реферала'))   
            }
            
            const text = `🌐 <b>Новая регистрация по Вашей реферальной ссылке</b>\nИмя вашего реферала: ${msg.from.first_name}\n<i>Вы получите награду за реферала, как только он получит Лицензию Фермера.</i>`
            
            sendHTML(match, text)    
            
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
        // =========== BANK =============
        case cbd.deposit:
        const dep = `💸 Введите желаемую сумму пополнения 💵 Долларов.\nТекущий курс:\n<code>100 💵 Долларов = $1</code>\nМинимальный внос - <b>300 💵 Долларов</b> или <b>$3</b>`
        
        bot.sendMessage(chat.id, dep, {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: keyboard.cancel_dep,
                resize_keyboard: true
            }
        }).then(() => {
            deposit(chat.id, query.id)
        })
        break
        case cbd.withdraw:
            
        break
        case cbd.exchange:
            
        break
        case cbd.redeem:
            redeem(chat.id, query.id)
        break
        
        
        
        
        case cbd.build:
            User.findOne({_id: chat.id}).then(u => {
                Gen.findOne({_id: 1}).then(g => {
                    
                const one = `🏫🐓 Курятник
Производит: <b>${g.produces.one}</b> 🥚 Яиц в час
Цена: <b>${g.prices.one}</b> 💶 Евро`
                const two = `🏫🐖 Свинарник
Производит: <b>${g.produces.two}</b> 🥓 Бекона в час
Цена: <b>${g.prices.two}</b> 💶 Евро`
                const three = `🏫🐑 Овчарник
Производит: <b>${g.produces.three}</b> ☁️ Шерсти в час
Цена: <b>${g.prices.three}</b> 💶 Евро`
                const four = `🏫🐂 Коровник
Производит: <b>${g.produces.four}</b> 🥛 Молока в час
Цена: <b>${g.prices.four}</b> 💶 Евро`
                const five = `🏫🐝 Улей
Производит: <b>${g.produces.five}</b> 🍯 Мёда в час
Цена: <b>${g.prices.five}</b> 💶 Евро`
                const six = `🏫🦃 Индюшатник
Производит: <b>${g.produces.six}</b> 🍗 Ножек в час
Цена: <b>${g.prices.six}</b> 💶 Евро`

                setTimeout(sendHTMLi, 0, chat.id, one, 'buildChicken')

                setTimeout(sendHTMLi, 300, chat.id, two, 'buildPig')

                setTimeout(sendHTMLi, 600, chat.id, three, 'buildSheepdog')

                setTimeout(sendHTMLi, 900, chat.id, four, 'buildCowshed')

                setTimeout(sendHTMLi, 1200, chat.id, five, 'buildHive')

                setTimeout(sendHTMLi, 1500, chat.id, six, 'buildTurkey')
            
                })
            })
        break
        case cbd.send_buildings:
        sendProducts(chat.id, query.id, message_id)
        break
        case cbd.buy_fruit:
            User.findOne({_id: chat.id}).then(u => {
            Gen.findOne({_id: 1}).then(g => {
                const one = `🌱🍎 Яблоня
Производит: <b>${g.produces.one / 2}</b> 🍎 Яблок в час
Цена: <b>${g.prices.one / 2}</b> 💵 Долларов`
                const two = `🌱🍐 Груша
Производит: <b>${g.produces.two / 2}</b> 🍐 Груш в час
Цена: <b>${g.prices.two / 2}</b> 💵 Долларов`
                const three = `🌱🍇 Виноградная лоза
Производит: <b>${g.produces.three / 2}</b> 🍇 Винограда в час
Цена: <b>${g.prices.three / 2}</b> 💵 Долларов`
                const four = `🌱🍓 Куст клубники
Производит: <b>${g.produces.four / 2}</b> 🍓 Клубники в час
Цена: <b>${g.prices.four / 2}</b> 💵 Долларов`
                const five = `🌱🍒 Вишня
Производит: <b>${g.produces.five / 2}</b> 🍒 Вишен в час
Цена: <b>${g.prices.five / 2}</b> 💵 Долларов`
                const six = `🌱🍑 Персик
Производит: <b>${g.produces.six / 2}</b> 🍑 Персиков в час
Цена: <b>${g.prices.six / 2}</b> 💵 Долларов`

                setTimeout(sendHTMLi, 0, chat.id, one, 'buyApple')

                setTimeout(sendHTMLi, 300, chat.id, two, 'buyPear')

                setTimeout(sendHTMLi, 600, chat.id, three, 'buyGrapes')

                setTimeout(sendHTMLi, 900, chat.id, four, 'buyStrawberries')

                setTimeout(sendHTMLi, 1200, chat.id, five, 'buyCherries')

                setTimeout(sendHTMLi, 1500, chat.id, six, 'buyPeach')
                })
            })
        break
        case cbd.send_fruit:
            sendFruit(chat.id, query.id, message_id)
        break
        case cbd.buy_vegetables:
            User.findOne({_id: chat.id}).then(u => {
            Gen.findOne({_id: 1}).then(g => {
            const one = `🌱🍅 Куст томата
Производит: <b>${g.produces.one / 2}</b> 🍅 Томатов в час
Цена: <b>${g.prices.one / 2}</b> 💵 Долларов`
            const two = `🌱🍆 Куст баклажана
Производит: <b>${g.produces.two / 2}</b> 🍆 Баклажанов в час
Цена: <b>${g.prices.two / 2}</b> 💵 Долларов`
            const three = `🌱🥕 Морковь
Производит: <b>${g.produces.three / 2}</b> 🥕 Моркови в час
Цена: <b>${g.prices.three / 2}</b> 💵 Долларов`
            const four = `🌱🌽 Кукуруза
Производит: <b>${g.produces.four / 2}</b> 🌽 Кукурузы в час
Цена: <b>${g.prices.four / 2}</b> 💵 Долларов`
            const five = `🌱🌶 Куст красного перца
Производит: <b>${g.produces.five / 2}</b> 🌶 Красных перцев в час
Цена: <b>${g.prices.five / 2}</b> 💵 Долларов`
            const six = `🌱🥔 Куст картофеля
Производит: <b>${g.produces.six / 2}</b> 🥔 Картофеля в час
Цена: <b>${g.prices.six / 2}</b> 💵 Долларов`

            setTimeout(sendHTMLi, 0, chat.id, one, 'buyTomato')

            setTimeout(sendHTMLi, 300, chat.id, two, 'buyEggplant')

            setTimeout(sendHTMLi, 600, chat.id, three, 'buyCarrots')

            setTimeout(sendHTMLi, 900, chat.id, four, 'buyCorn')

            setTimeout(sendHTMLi, 1200, chat.id, five, 'buyPepper')

            setTimeout(sendHTMLi, 1500, chat.id, six, 'buyPotatoes')
                })
            })
        break
        case cbd.send_vegetables:
            sendVegetables(chat.id, query.id, message_id)
        break
        case cbd.sell_plants:
            sell(chat.id, query.id)
        break
        case cbd.sell_products:
            sell(chat.id, query.id, false)
        break
        
        case cbd.fruit: case cbd.back_f:
            DisplayFruit(chat.id, message_id)
        break
        case cbd.vegetables: case cbd.back_v:
            DisplayVegetables(chat.id, message_id)
        break
        case cbd.back_plants: 
            editText(texts.plants, chat.id, message_id, 'plants')
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
        case cbd.skip: case cbd.finish:
            sendHTML(chat.id, texts.skip, 'home')
        break
        
        
        case cbd.buildChicken:
            Build(chat.id, 100, 'chicken', query.id)
        break
        case cbd.buildPig:
            Build(chat.id, 1000, 'pig', query.id)
        break
        case cbd.buildSheepdog:
            Build(chat.id, 6000, 'sheepdog', query.id)
        break
        case cbd.buildCowshed:
            Build(chat.id, 18000, 'cowshed', query.id)
        break
        case cbd.buildHive:
            Build(chat.id, 45000, 'hive', query.id)
        break
        case cbd.buildTurkey:
            Build(chat.id, 90000, 'turkey', query.id)
        break
        
        case cbd.buyApple:
            BuyPlants(chat.id, 100 / 2, 'apple', query.id)
        break
        case cbd.buyPear:
            BuyPlants(chat.id, 1000 / 2, 'pear', query.id)
        break
        case cbd.buyGrapes:
            BuyPlants(chat.id, 6000 / 2, 'grapes', query.id)
        break
        case cbd.buyStrawberries:
            BuyPlants(chat.id, 18000 / 2, 'strawberries', query.id)
        break
        case cbd.buyCherries:
            BuyPlants(chat.id, 45000 / 2, 'cherries', query.id)
        break
        case cbd.buyPeach:
            BuyPlants(chat.id, 90000 / 2, 'peach', query.id)
        break
        // =========== VEGETABLES ============
        
        case cbd.buyTomato:
            BuyPlants(chat.id, 100 / 2, 'tomato', query.id)
        break
        case cbd.buyEggplant:
            BuyPlants(chat.id, 1000 / 2, 'eggplant', query.id)
        break
        case cbd.buyCarrots:
            BuyPlants(chat.id, 6000 / 2, 'carrots', query.id)
        break
        case cbd.buyCorn:
            BuyPlants(chat.id, 18000 / 2, 'corn', query.id)
        break
        case cbd.buyPepper:
            BuyPlants(chat.id, 45000 / 2, 'pepper', query.id)
        break
        case cbd.buyPotatoes:
            BuyPlants(chat.id, 90000 / 2, 'potatoes', query.id)
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
            changeName(chat.id)
        })
        break
        
        // ========== HELP ===============
        case cbd.training:
            sendHTMLi(chat.id, texts.firstStarting, 'firstMessage')
        break
        
        
        // ========== TASKS ==============
        case cbd.check1: 
            checkTask(chat.id, 1, query.id)
        break
        case cbd.check2: 
            checkTask(chat.id, 2, query.id)
        break
        case cbd.check3: 
            checkTask(chat.id, 3, query.id)
        break
        case cbd.check4: 
            checkTask(chat.id, 4, query.id)
        break
        case cbd.check5: 
            checkTask(chat.id, 5, query.id)
        break
        case cbd.check6: 
            checkTask(chat.id, 6, query.id)
        break
        case cbd.check7: 
            checkTask(chat.id, 7, query.id)
        break
    }
})

bot.onText(/\/setfruit (.+)/, (msg, [source, match]) => {
    const fruits = match.split(' ')
    const id = fruits[0]
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
    const buil = match.split(' ')
    const id = buil[0]
    User.updateOne({_id: id}, { $set: {
        "buildings.chicken": buil[1],
        "buildings.pig": buil[2],
        "buildings.sheepdog": buil[3],
        "buildings.cowshed": buil[4],
        "buildings.hive": buil[5],
        "buildings.turkey": buil[6]
        }
    }).catch((e) => console.log(e))
})
bot.onText(/\/info/, msg => {
    User.findOne({_id: msg.chat.id}).then(u => {
        sendHTML(msg.chat.id, u._id)
        console.log(u._id)
    })
})
bot.onText(/\/clear (\d+)/, (msg, [, match]) => {
    User.updateOne({_id: match}, {$set: {
        "buildings.chicken": 0,
        "buildings.pig": 0,
        "buildings.sheepdog": 0,
        "buildings.cowshed": 0,
        "buildings.hive": 0,
        "buildings.turkey": 0,
        "bank.dollars": 0,
        "bank.euro": 0,
        "bank.gold": 0,
        "bank.diamond": 0,
        "bank.points": 0,
        "bank.token": 0,
        "warehouse.products.eggs": 0,
        "warehouse.products.bacon": 0,
        "warehouse.products.wool": 0,
        "warehouse.products.milk": 0,
        "warehouse.products.honey": 0,
        "warehouse.products.leg": 0,
        "warehouse.vegetables.tomato": 0,
        "warehouse.vegetables.eggplant": 0,
        "warehouse.vegetables.carrots": 0,
        "warehouse.vegetables.corn": 0,
        "warehouse.vegetables.pepper": 0,
        "warehouse.vegetables.potatoes": 0,
        "warehouse.fruit.apple": 0,
        "warehouse.fruit.pear": 0,
        "warehouse.fruit.grapes": 0,
        "warehouse.fruit.strawberries": 0,
        "warehouse.fruit.cherries": 0,
        "warehouse.fruit.peach": 0,
        "lastBonus": '',
        "landlord": ''
    }})
})
bot.onText(/\/admins/, msg => {
    const chatId = helper.gCI(msg)
    const text = `/setfruit - устаналивает количество фруктов на складе\n/setvegetables - устаналивает количество овощей на складе\n/setproducts - устаналивает количество продуктов на складе\n/setbalance - устаналивает баланс в банке\n/info - ID\n/setbuild - устанавливает количество построек\n/clear - очищает всё у ID\n\n/clear ${chatId}\n\n/setfruit ${chatId} 128 256 0 0 0 0\n/setvegetables ${chatId} 128 256 0 0 0 0\n/setproducts ${chatId} 128 256 0 0 0 0\n/setbalance ${chatId} 10000 3000 0 0 0 0\n\n/setbuild ${chatId} 2 2 0 0 0 0`
    
    sendHTML(chatId, text)
})

function DisplayBank (Id) {
    
    User.findOne({_id: Id}).then(u => {
        
        const bank =  `🏦 <b>Банк</b>\n\nДобро пожаловать в банк!\nЗдесь Вы можете купить, обменять, вывести валюту и выкупить свой участок.\n\nВаш счет:
<b>${u.bank.dollars}</b> 💵 Долларов
<b>${u.bank.euro}</b> 💶 Евро
<b>${u.bank.gold}</b> 💰 Gold
<b>${u.bank.diamond}</b> 💎 Diamond
<b>${u.bank.points}</b> ⚜️ Баллы
<b>${u.bank.token}</b> 💠 Токены`
        
        if (u.landlord == '') {
            sendHTMLi(Id, bank, 'bank_w')
        } else {
            sendHTMLi(Id, bank, 'bank')
        }
        
    })
}
function DisplayFruit(chatId, mId) {
    User.findOne({_id: chatId}).then(u => {
        const fruit = `Ваши фрукты:
🌱🍎 Яблоня
Количество: <b>${u.plants.apple}</b>
Выросло: <b>${u.produced.apple}</b> 🍎
На складе: <b>${u.warehouse.fruit.apple}</b> 🍎\n
🌱🍐 Груша
Количество: <b>${u.plants.pear}</b>
Выросло: <b>${u.produced.pear}</b> 🍐 
На складе: <b>${u.warehouse.fruit.pear}</b> 🍐\n
🌱🍇 Виноградная лоза
Количество: <b>${u.plants.grapes}</b>
Выросло: <b>${u.produced.grapes}</b> 🍇
На складе: <b>${u.warehouse.fruit.grapes}</b> 🍇\n
🌱🍓 Куст клубники
Количество: <b>${u.plants.strawberries}</b>
Выросло: <b>${u.produced.strawberries}</b> 🍓
На складе: <b>${u.warehouse.fruit.strawberries}</b> 🍓\n
🌱🍒 Вишня
Количество: <b>${u.plants.cherries}</b>
Выросло: <b>${u.produced.cherries}</b> 🍒
На складе: <b>${u.warehouse.fruit.cherries}</b> 🍒\n
🌱🍑 Персик
Количество: <b>${u.plants.peach}</b>
Выросло: <b>${u.produced.peach}</b> 🍑
На складе: <b>${u.warehouse.fruit.peach}</b> 🍑`
    
        editText(fruit, chatId, mId, 'fruit')  
        
    })
}
function DisplayVegetables(chatId, mId) {
    User.findOne({_id: chatId}).then(u => {
        
        const vegetables =  `Ваши овощи:
🌱🍅 Куст томата
Количество: <b>${u.plants.tomato}</b>
Выросло: <b>${u.produced.tomato}</b> 🍅
На складе: <b>${u.warehouse.vegetables.tomato}</b> 🍅

🌱🍆 Куст баклажана
Количество: <b>${u.plants.eggplant}</b>
Выросло: <b>${u.produced.eggplant}</b> 🍆
На складе: <b>${u.warehouse.vegetables.eggplant}</b> 🍆

🌱🥕 Морковь
Количество: <b>${u.plants.carrots}</b>
Выросло: <b>${u.produced.carrots}</b> 🥕
На складе: <b>${u.warehouse.vegetables.carrots}</b> 🥕

🌱🌽 Кукуруза
Количество: <b>${u.plants.corn}</b>
Выросло: <b>${u.produced.corn}</b> 🌽
На складе: <b>${u.warehouse.vegetables.corn}</b> 🌽

🌱🌶 Куст красного перца
Количество: <b>${u.plants.pepper}</b>
Выросло: <b>${u.produced.pepper}</b> 🌶
На складе: <b>${u.warehouse.vegetables.pepper}</b> 🌶

🌱🥔 Куст картофеля
Количество: <b>${u.plants.potatoes}</b>
Выросло: <b>${u.produced.potatoes}</b> 🥔
На складе: <b>${u.warehouse.vegetables.potatoes}</b> 🥔`
    
//        sendHTMLi(u._id, vegetables, 'vegetables')
        editText(vegetables, chatId, mId, 'vegetables')  
        
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

function BuyPlants(chatId, price, plant, queryId) {
    User.findOne({_id: chatId}).then(u => {
        Gen.findOne({_id: 1}).then(g => {
        if (u.bank.dollars >= price) {
    
            if (plant == 'apple'){ 
                User.updateOne({_id: u._id}, { $inc: {
                    "plants.apple": 1,
                    "bank.dollars": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Покупка</b>\n🌱🍎 Яблоня\n➖${price} 💵 Долларов\nБаланс: ${u.bank.dollars - price} Долларов`
                sendHTML(chatId, text) 
            } 
            
            else if(plant == 'pear') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "plants.pear": 1,
                    "bank.dollars": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Покупка</b>\n🌱🍐 Груша\n➖${price} 💵 Долларов\nБаланс: ${u.bank.dollars - price} Долларов`
                sendHTML(chatId, text)    
            } 
            
            else if (plant == 'grapes') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "plants.grapes": 1,
                    "bank.dollars": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Покупка</b>\n🌱🍇 Виноградная лоза\n➖${price} 💵 Долларов\nБаланс: ${u.bank.dollars - price} Долларов`
                sendHTML(chatId, text)    
            } 
            
            else if (plant == 'strawberries') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "plants.strawberries": 1,
                    "bank.dollars": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Покупка</b>\n🌱🍓 Куст клубники\n➖${price} 💵 Долларов\nБаланс: ${u.bank.dollars - price} Долларов`
                sendHTML(chatId, text)  
            } 
            
            else if (plant == 'cherries') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "plants.cherries": 1,
                    "bank.dollars": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Покупка</b>\n🌱🍒 Вишня\n➖${price} 💵 Долларов\nБаланс: ${u.bank.dollars - price} Долларов`
                sendHTML(chatId, text)    
            } 
            
            else if (plant == 'peach') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "plants.peach": 1,
                    "bank.dollars": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Покупка</b>\n🌱🍑 Персик\n➖${price} 💵 Долларов\nБаланс: ${u.bank.dollars - price} Долларов`
                sendHTML(chatId, text)    
            }
            
            // ======= VEGETABLES ===========
            
            else if (plant == 'tomato') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "plants.tomato": 1,
                    "bank.dollars": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Покупка</b>\n🌱🍅 Куст томата\n➖${price} 💵 Долларов\nБаланс: ${u.bank.dollars - price} Долларов`
                sendHTML(chatId, text)       
            } 
            
            else if (plant == 'eggplant') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "plants.eggplant": 1,
                    "bank.dollars": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Покупка</b>\n🌱🍆 Куст баклажана\n➖${price} 💵 Долларов\nБаланс: ${u.bank.dollars - price} Долларов`
                sendHTML(chatId, text)    
            } 
            
            else if (plant == 'carrots') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "plants.carrots": 1,
                    "bank.dollars": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Покупка</b>\n🌱🥕 Морковь\n➖${price} 💵 Долларов\nБаланс: ${u.bank.dollars - price} Долларов`
                sendHTML(chatId, text)    
            }
            
            
            else if (plant == 'corn') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "plants.corn": 1,
                    "bank.dollars": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Покупка</b>\n🌱🌽 Кукуруза\n➖${price} 💵 Долларов\nБаланс: ${u.bank.dollars - price} Долларов`
                sendHTML(chatId, text)    
            }
            
            
            else if (plant == 'pepper') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "plants.pepper": 1,
                    "bank.dollars": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Покупка</b>\n🌱🌶 Куст красного перца\n➖${price} 💵 Долларов\nБаланс: ${u.bank.dollars - price} Долларов`
                sendHTML(chatId, text)    
            }
            
            
            else if (plant == 'potatoes') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "plants.potatoes": 1,
                    "bank.dollars": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Покупка</b>\n🌱🥔 Куст картофеля\n➖${price} 💵 Долларов\nБаланс: ${u.bank.dollars - price} Долларов`
                sendHTML(chatId, text) 
            }    
    } else {
        const error = `🚫 У вас не хватает 💵 Долларов для покупки этого растения!\nВаш баланс: ${u.bank.dollars} 💵 Долларов`
        bot.answerCallbackQuery(queryId, error, true)
    }
    })
}).catch((e) => console.log(e))   
}
function Build(chatId, price, build, queryId) {
    User.findOne({_id: chatId}).then(u => {
        Gen.findOne({_id: 1}).then(g => {
            
        if (u.bank.euro >= price) {
    
            if (build == 'chicken'){ 
                User.updateOne({_id: u._id}, { $inc: {
                    "buildings.chicken": 1,
                    "bank.euro": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Постройка</b>\n🏫🐓 Курятник\n➖${g.prices.one} 💶 Евро\nБаланс: ${u.bank.euro - g.prices.one} Евро`
                sendHTML(chatId, text) 
            } 
            
            else if(build == 'pig') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "buildings.pig": 1,
                    "bank.euro": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Постройка</b>\n🏫🐖 Свинарник\n➖${g.prices.two} 💶 Евро\nБаланс: ${u.bank.euro - g.prices.two} Евро`
                sendHTML(chatId, text)     
            } 
            
            else if (build == 'sheepdog') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "buildings.sheepdog": 1,
                    "bank.euro": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Постройка</b>\n🏫🐑 Овчарник\n➖${g.prices.three} 💶 Евро\nБаланс: ${u.bank.euro - g.prices.three} Евро`
                sendHTML(chatId, text)     
            } 
            
            else if (build == 'cowshed') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "buildings.cowshed": 1,
                    "bank.euro": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Постройка</b>\n🏫🐂 Коровник\n➖${g.prices.four} 💶 Евро\nБаланс: ${u.bank.euro - g.prices.four} Евро` 
                sendHTML(chatId, text)    
            } 
            
            else if (build == 'hive') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "buildings.hive": 1,
                    "bank.euro": -price
                }}).catch((e) => console.log(e))

                const text = `🛒 <b>Постройка</b>\n🏫🐝 Улей\n➖${g.prices.five} 💶 Евро\nБаланс: ${u.bank.euro - g.prices.five} Евро`
                sendHTML(chatId, text)     
            } 
            
            else if (build == 'turkey') { 
                User.updateOne({_id: u._id}, { $inc: {
                    "buildings.turkey": 1,
                    "bank.euro": -price
                }}).catch((e) => console.log(e))
                const text = `🛒 <b>Постройка</b>\n🏫🦃 Индюшатник\n➖${g.prices.six} 💶 Евро\nБаланс: ${u.bank.euro - g.prices.six} Евро`
                sendHTML(chatId, text)     
            }
    } else {
        const error = `🚫 У вас не хватает 💶 Евро для постройки этого строения!\nВаш баланс: ${u.bank.euro} 💶 Евро`
        bot.answerCallbackQuery(queryId, error, true)
    }
    })
}).catch((e) => console.log(e))
}

function changeName(chatId) {
    User.findOne({_id: chatId}).then(u => {
        if (u.nameFarm == '')
            nameFlag = true
        else nameFlag = false
    })
    bot.once('message', msg => {
        if (msg.text == kb.cancel)
            sendHTML(chatId, texts.townHall, 'townHall')
        name = msg.text
        const error = `⛔️'<b>${name}</b>' - некорректное название. Используйте другое название.\nЧтобы открыть главное меню, введите команду /menu`
        if (name.length >= 4 && name.length <= 20) {
            if (name.search(/[А-я-Ё-ё]/) === -1) {
            const {message_id} = msg
            const text = `❓ Подтверждение действия
Вы уверены, что хотите изменить название компании на <b>'${name}'</b>?`
            sendHTML(chatId, text, 'yesno')
            }
            else {
                sendHTML(chatId, error)
                changeName(chatId)
            }
        }
        else {
            sendHTML(chatId, error)
            changeName(chatId)
        }
    })
}
function getStat(Id) {
    User.findOne({_id: Id}).then(u => {
        Gen.findOne({_id: 1}).then(g => {
            
        const days = Math.floor((new Date() - u.registerDate.getTime()) / (1000*60*60*24))
        let percent 
        
        if (u.landlord == null) {
            percent = 100
        }
        else {
            percent = 70
        }
        
        const producPlants = (u.plants.apple + u.plants.tomato) * (g.produces.one / 2) + (u.plants.pear + u.plants.eggplant) * (g.produces.two / 2) + (u.plants.grapes + u.plants.carrots) * (g.produces.three / 2) + (u.plants.strawberries + u.plants.corn) * (g.produces.four / 2) + (u.plants.cherries + u.plants.pepper) * (g.produces.five / 2) + (u.plants.peach + u.plants.potatoes) * (g.produces.six / 2)
              
        const producProd = u.buildings.chicken * g.produces.one + u.buildings.pig * g.produces.two + u.buildings.sheepdog * g.produces.three + u.buildings.cowshed * g.produces.four + u.buildings.hive * g.produces.five + u.buildings.turkey * g.produces.six
            
        console.log(producPlants)
        
        const text = `📊 <b>Статистика вашей компании</b>\n
📝 Название Вашей компании:\n<b>'${u.nameFarm}'</b>

📅 Возраст компании (дней):\n<b>${days}</b>

На данный момент Ваша ферма выращивает:
<b>${producPlants}</b> 🌱 Растительных продуктов в час
<b>${producProd}</b> 🥚 Животных продуктов в час
 
🌱 Всего выросло Растительных продуктов:\n<b>${u.total.plants}</b>

🥚 Всего было собрано Животных продуктов:\n<b>${u.total.products}</b>

👤 Компаний зарегистрировавшихся по Вашей реферальной ссылке:\n<b>${u.referals.lenght}</b>

✅ Выполнено заданий:\n<b>${u.successTasks}</b>

📑 Доля Вашей компании, принадлежащая Вам:\n<b>${percent}%</b>`
        
        sendHTML(Id, text)
        
        })
    })
}

function getBonus(chatId, time) {
    
    const dollars = getRand(10, 101)
    const euro = getRand(10, 81)
    
    const success = `🎁 <b>Ежедневный бонус</b>\n➕ Вам зачислен бонус:\n<b>${dollars}</b> 💵 Долларов\n<b>${euro}</b> 💶 Евро`
    
    const iso = new Date(time * 1000)
    
    User.updateOne({_id: chatId}, {
        $set: {
            "lastBonus": iso
        },
        $inc: {
            "bank.dollars": dollars,
            "bank.euro": euro
        }
    })
    .catch(e => console.log(e))
    sendHTML(chatId, success)
}
function getRand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function sendFruit(Id, qId, mId) {
    User.findOne({_id: Id}).then(u => {
            
            const collected = u.produced.apple + u.produced.pear + u.produced.grapes + u.produced.strawberries + u.produced.cherries + u.produced.peach
            
            
            if (collected != 0) {
                const eggs70 = Math.ceil(u.produced.apple * 0.7)
            const bacon70 = Math.ceil(u.produced.pear * 0.7)
            const wool70 = Math.ceil(u.produced.grapes * 0.7)
            const milk70 = Math.ceil(u.produced.strawberries * 0.7)
            const honey70 = Math.ceil(u.produced.cherries * 0.7)
            const leg70 = Math.ceil(u.produced.peach * 0.7)
            
            const eggs = u.produced.apple
            const bacon = u.produced.pear
            const wool = u.produced.grapes
            const milk = u.produced.strawberries
            const honey = u.produced.cherries
            const leg = u.produced.peach
            
            const eggs30 = Math.ceil(u.produced.apple - eggs70)
            const bacon30 = Math.ceil(u.produced.pear - bacon70)
            const wool30 = Math.ceil(u.produced.grapes - wool70)
            const milk30 = Math.ceil(u.produced.strawberries - milk70)
            const honey30 = Math.ceil(u.produced.cherries - honey70)
            const leg30 = Math.ceil(u.produced.peach - leg70)
            
            const per70 = Math.ceil(collected * 0.7)
            const per30 = Math.ceil(collected - per70)
            
            if (u.landlord == null) {
                User.updateOne({_id: Id}, { $inc: {
                "warehouse.fruit.apple": eggs70,
                "warehouse.fruit.pear": bacon70,
                "warehouse.fruit.grapes": wool70,
                "warehouse.fruit.strawberries": milk70,
                "warehouse.fruit.cherries": honey70,
                "warehouse.fruit.peach": leg70,
                "produced.apple": -eggs,
                "produced.pear": -bacon,
                "produced.grapes": -wool,
                "produced.strawberries": -milk,
                "produced.cherries": -honey,
                "produced.peach": -leg 
                
            } }).catch((e) => console.log(e))
            
            const wh = u.warehouse.fruit.apple + u.warehouse.fruit.pear + u.warehouse.fruit.grapes + u.warehouse.fruit.strawberries + u.warehouse.fruit.cherries + u.warehouse.fruit.peach
                
            const text = `<b>Сбор ресурсов</b>
   
➕ Вы успешно собрали <b>${collected}</b> 🍎 Фруктов и они были отправлены на склад.

📦 Всего на складе: <b>${wh + collected}</b> 🍎 Фруктов.`
            
            editText(text, Id, mId, 'back_f')
                
            }
            else {
            User.updateOne({_id: Id}, { $inc: {
                "warehouse.fruit.apple": eggs70,
                "warehouse.fruit.pear": bacon70,
                "warehouse.fruit.grapes": wool70,
                "warehouse.fruit.strawberries": milk70,
                "warehouse.fruit.cherries": honey70,
                "warehouse.fruit.peach": leg70,
                "produced.apple": -eggs,
                "produced.pear": -bacon,
                "produced.grapes": -wool,
                "produced.strawberries": -milk,
                "produced.cherries": -honey,
                "produced.peach": -leg 
                
            } }).catch((e) => console.log(e))
            
            const ll = u.landlord
            User.updateOne({_id: ll}, { $inc: {
            "warehouse.fruit.apple": eggs30,
            "warehouse.fruit.pear": bacon30,
            "warehouse.fruit.grapes": wool30,
            "warehouse.fruit.strawberries": milk30,
            "warehouse.fruit.cherries": honey30,
            "warehouse.fruit.peach": leg30
            } }).catch((e) => console.log(e))

            User.findOne({_id: ll}).then(us => {
                const text = `🚚 Вы получили <b>${per30}</b> 🍎 фруктов от фермы 
<b>'${u.nameFarm}'</b>, которой Вы владеете на 30%.
Ресурсы перемещены на 📦 склад`

                sendHTML(ll, text)
            })
            
            const wh = u.warehouse.fruit.apple + u.warehouse.fruit.pear + u.warehouse.fruit.grapes + u.warehouse.fruit.strawberries + u.warehouse.fruit.cherries + u.warehouse.fruit.peach
                
            const text = `<b>Сбор ресурсов</b>
   
➕ Вы успешно собрали <b>${collected}</b> 🍎 Фруктов, <b>${per70}</b> из которых были отправлены на склад.

📦 Всего на складе: <b>${wh + per70}</b> 🍎 Фруктов.
🚚 Ваш арендодатель получил: <b>${per30}</b> Фруктов.`
            
            editText(text, Id, mId, 'back_f')
            }
            }
            else {
                
                const error = `У Вас нет фруктов, которые можно было бы собрать.`
                
                bot.answerCallbackQuery(qId, error, true)
                
            }
        })
}
function sendVegetables(Id, qId, mId) {
    User.findOne({_id: Id}).then(u => {
        
            const collected = u.produced.tomato + u.produced.eggplant + u.produced.carrots + u.produced.corn + u.produced.pepper + u.produced.potatoes
            
            
            if (collected != 0) {
                const eggs70 = Math.ceil(u.produced.tomato * 0.7)
            const bacon70 = Math.ceil(u.produced.eggplant * 0.7)
            const wool70 = Math.ceil(u.produced.carrots * 0.7)
            const milk70 = Math.ceil(u.produced.corn * 0.7)
            const honey70 = Math.ceil(u.produced.pepper * 0.7)
            const leg70 = Math.ceil(u.produced.potatoes * 0.7)
            
            const eggs = u.produced.tomato
            const bacon = u.produced.eggplant
            const wool = u.produced.carrots
            const milk = u.produced.corn
            const honey = u.produced.pepper
            const leg = u.produced.potatoes
            
            const eggs30 = Math.ceil(u.produced.tomato - eggs70)
            const bacon30 = Math.ceil(u.produced.eggplant - bacon70)
            const wool30 = Math.ceil(u.produced.carrots - wool70)
            const milk30 = Math.ceil(u.produced.corn - milk70)
            const honey30 = Math.ceil(u.produced.pepper - honey70)
            const leg30 = Math.ceil(u.produced.potatoes - leg70)
            
            const per70 = Math.ceil(collected * 0.7)
            const per30 = Math.ceil(collected - per70)
            
            if (u.landlord == null) {
            User.updateOne({_id: Id}, { $inc: {
                "warehouse.vegetables.tomato": eggs,
                "warehouse.vegetables.eggplant": bacon,
                "warehouse.vegetables.carrots": wool,
                "warehouse.vegetables.corn": milk,
                "warehouse.vegetables.pepper": honey,
                "warehouse.vegetables.potatoes": leg,
                "produced.tomato": -eggs,
                "produced.eggplant": -bacon,
                "produced.carrots": -wool,
                "produced.corn": -milk,
                "produced.pepper": -honey,
                "produced.potatoes": -leg 
                
            } }).catch((e) => console.log(e))
                
            const wh = u.warehouse.vegetables.tomato + u.warehouse.vegetables.eggplant + u.warehouse.vegetables.carrots + u.warehouse.vegetables.corn + u.warehouse.vegetables.pepper + u.warehouse.vegetables.potatoes
                
            const text = `<b>Сбор ресурсов</b>\n
➕ Вы успешно собрали <b>${collected}</b> 🌽 Овощей и они были отправлены на склад.

📦 Всего на складе: <b>${wh + collected}</b> 🌽 Овощей.`
            
            editText(text, Id, mId, 'back_v')
                
            }
            else {
            User.updateOne({_id: Id}, { $inc: {
                "warehouse.vegetables.tomato": eggs70,
                "warehouse.vegetables.eggplant": bacon70,
                "warehouse.vegetables.carrots": wool70,
                "warehouse.vegetables.corn": milk70,
                "warehouse.vegetables.pepper": honey70,
                "warehouse.vegetables.potatoes": leg70,
                "produced.tomato": -eggs,
                "produced.eggplant": -bacon,
                "produced.carrots": -wool,
                "produced.corn": -milk,
                "produced.pepper": -honey,
                "produced.potatoes": -leg 
                
            } }).catch((e) => console.log(e))
            
            const ll = u.landlord
            
            User.updateOne({_id: ll}, { $inc: {
            "warehouse.vegetables.tomato": eggs30,
            "warehouse.vegetables.eggplant": bacon30,
            "warehouse.vegetables.carrots": wool30,
            "warehouse.vegetables.corn": milk30,
            "warehouse.vegetables.pepper": honey30,
            "warehouse.vegetables.potatoes": leg30
            } }).catch((e) => console.log(e))

            User.findOne({_id: ll}).then(us => {
                const text = `🚚 Вы получили <b>${per30}</b> 🌽 овощей от фермы 
<b>'${u.nameFarm}'</b>, которой Вы владеете на 30%.
Ресурсы перемещены на 📦 склад`

                sendHTML(ll, text)
                })
            
            const wh = u.warehouse.vegetables.tomato + u.warehouse.vegetables.eggplant + u.warehouse.vegetables.carrots + u.warehouse.vegetables.corn + u.warehouse.vegetables.pepper + u.warehouse.vegetables.potatoes
            
            const text = `<b>Сбор ресурсов</b>\n
➕ Вы успешно собрали <b>${collected}</b> 🌽 Овощей, <b>${per70}</b> из которых были отправлены на склад.

📦 Всего на складе: <b>${wh + per70}</b> 🌽 Овощей.
🚚 Ваш арендодатель получил: <b>${per30}</b> Овощей.`
            editText(text, Id, mId, 'back_v')
            }
            }
            else {
                
                const error = `У Вас нет овощей, которые можно было бы собрать.`
                
                bot.answerCallbackQuery(qId, error, true)
                
            }
        })
}
function sendProducts(Id, qId) {
    User.findOne({_id: Id}).then(u => {
            const collected = u.produced.eggs + u.produced.bacon + u.produced.wool + u.produced.milk + u.produced.honey + u.produced.leg
            
            if (collected != 0) {
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
            
            if (u.landlord == null) {
            User.updateOne({_id: Id}, { $inc: {
                "warehouse.products.eggs": eggs,
                "warehouse.products.bacon": bacon,
                "warehouse.products.wool": wool,
                "warehouse.products.milk": milk,
                "warehouse.products.honey": honey,
                "warehouse.products.leg": leg,
                "produced.eggs": -eggs,
                "produced.bacon": -bacon,
                "produced.wool": -wool,
                "produced.milk": -milk,
                "produced.honey": -honey,
                "produced.leg": -leg 
            } }).catch((e) => console.log(e))
                
            const wh = u.warehouse.products.eggs + u.warehouse.products.bacon + u.warehouse.products.wool + u.warehouse.products.milk + u.warehouse.products.honey + u.warehouse.products.leg  
            const text = `<b>Сбор ресурсов</b>\n
➕ Вы успешно собрали <b>${collected}</b> 🥚 Продуктов и они были отправлены на склад.\n
📦 Всего на складе: <b>${wh + collected}</b> 🥚 Продуктов.`
            sendHTML(Id, text)
            }
            else {
            User.updateOne({_id: Id}, { $inc: {
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
                
            const ll = u.landlord
            
            User.updateOne({_id: ll}, { $inc: {
            "warehouse.products.eggs": eggs30,
            "warehouse.products.bacon": bacon30,
            "warehouse.products.wool": wool30,
            "warehouse.products.milk": milk30,
            "warehouse.products.honey": honey30,
            "warehouse.products.leg": leg30
            } }).catch((e) => console.log(e))

            User.findOne({_id: ll}).then(us => {
                const text = `🚚 Вы получили <b>${per30}</b> 🥚 продуктов от фермы 
<b>'${u.nameFarm}'</b>, которой Вы владеете на 30%.
Ресурсы перемещены на 📦 склад`

                sendHTML(ll, text)
            })
            
            const wh = u.warehouse.products.eggs + u.warehouse.products.bacon + u.warehouse.products.wool + u.warehouse.products.milk + u.warehouse.products.honey + u.warehouse.products.leg
            
            const text = `<b>Сбор ресурсов</b>\n
➕ Вы успешно собрали <b>${collected}</b> 🥚 Продуктов, <b>${per70}</b> из которых были отправлены на склад.\n
📦 Всего на складе: <b>${wh + per70}</b> 🥚 Продуктов.
🚚 Ваш арендодатель получил: <b>${per30}</b> Продуктов.`
            sendHTML(Id, text)
            }
            }
            else {
                const error = `У Вас нет продуктов, которые можно было бы собрать.`
                bot.answerCallbackQuery(qId, error, true)
            }
        })
}

function sell(Id, qId, plants = true) {
    const price = 2
    const price2 = 1
    User.findOne({_id: Id}).then(u => {
        let rounded, delta
        if (plants) {
            const apple = u.warehouse.fruit.apple
            const pear = u.warehouse.fruit.pear
            const grapes = u.warehouse.fruit.grapes
            const strawberries = u.warehouse.fruit.strawberries
            const cherries = u.warehouse.fruit.cherries
            const peach = u.warehouse.fruit.peach
            const tomato = u.warehouse.vegetables.tomato
            const eggplant = u.warehouse.vegetables.eggplant
            const carrots = u.warehouse.vegetables.carrots
            const corn = u.warehouse.vegetables.corn
            const pepper = u.warehouse.vegetables.pepper
            const potatoes = u.warehouse.vegetables.potatoes
            
            const plants = apple + pear + grapes + strawberries + cherries + peach + tomato + eggplant + carrots + corn + pepper + potatoes
            
            rounded = Math.floor(plants / 500)
            delta = plants - (Math.floor(plants / 500) * 500)
            
            if (rounded >= 1) {
                
            if (!sellFlag) {
                sellFlag = true
            }    
                
            const appleRound = round(apple)
            const pearRound = round(pear)
            const grapesRound = round(grapes)
            const strawberriesRound = round(strawberries)
            const cherriesRound = round(cherries)
            const peachRound = round(peach)
            const tomatoRound = round(tomato)
            const eggplantRound = round(eggplant)
            const carrotsRound = round(carrots)
            const cornRound = round(corn)
            const pepperRound = round(pepper)
            const potatoesRound = round(potatoes)
            
            User.updateOne({_id: Id}, { $inc: {
                "bank.dollars": price * rounded,
                "bank.gold": price2,
                "warehouse.fruit.apple": -appleRound,
                "warehouse.fruit.pear": -pearRound,
                "warehouse.fruit.grapes": -grapesRound,
                "warehouse.fruit.strawberries": -strawberriesRound,
                "warehouse.fruit.cherries": -cherriesRound,
                "warehouse.fruit.peach": -peachRound,
                "warehouse.vegetables.tomato": -tomatoRound,
                "warehouse.vegetables.eggplant": -eggplantRound,
                "warehouse.vegetables.carrots": -carrotsRound,
                "warehouse.vegetables.corn": -cornRound,
                "warehouse.vegetables.pepper": -pepperRound,
                "warehouse.vegetables.potatoes": -potatoesRound
            }}).catch(e => console.log(e))
            
            const text = `🛒 <b>Рынок</b>\n\nВы продали\n${plants - delta} 🌱 Растительных продуктов\nза ${rounded * price} 💵 Долларов и ${price2} 💰 Gold`
            
            sendHTML(Id, text)
            } else {
                const error = `🚫 Минимум для продажи 500 🌱 Растительных продуктов, у Вас только ${plants} 🌱 продуктов(а)`
                bot.answerCallbackQuery(qId, error, true)
            }
        }
        else {
            const eggs = u.warehouse.products.eggs
            const bacon = u.warehouse.products.bacon
            const wool = u.warehouse.products.wool
            const milk = u.warehouse.products.milk
            const honey = u.warehouse.products.honey
            const leg = u.warehouse.products.leg
            
            const products = eggs + bacon + wool + milk + honey + leg
            
            rounded = Math.floor(products / 500)
            delta = products - (Math.floor(products / 500) * 500)
            
            if (rounded >= 1) {
                
            const eggsRound = round(eggs)
            const baconRound = round(bacon)
            const woolRound = round(wool)
            const milkRound = round(milk)
            const honeyRound = round(honey)
            const legRound = round(leg)
            
            User.updateOne({_id: Id}, { $inc: {
                "bank.euro": price * rounded,
                "bank.diamond": price2,
                "warehouse.products.eggs": -eggsRound,
                "warehouse.products.bacon": -baconRound,
                "warehouse.products.wool": -woolRound,
                "warehouse.products.milk": -milkRound,
                "warehouse.products.honey": -honeyRound,
                "warehouse.products.leg": -legRound
            }}).catch(e => console.log(e))
            
            const text = `🛒 <b>Рынок</b>\n\nВы продали\n${products - delta} 🥚 Животных продуктов\nза ${rounded * price} 💶 Евро и ${price2} 💎 Diamond`
            
            sendHTML(Id, text)
            } else {
                const error = `🚫 Минимум для продажи 500 🥚 Животных продуктов, у Вас только ${products} 🥚 продуктов(а)`
                bot.answerCallbackQuery(qId, error, true)
            }
        }   
    })
}

function round(i) {
    let main
    let delta
    if (i < 1000) {
        main = Math.floor(i / 100)
        delta = i - (Math.floor(i / 100) * 100)
    }
    else if (i >= 1000) {
        main = Math.floor(i / 1000)
        delta = i - (Math.floor(i / 1000) * 1000)
    }
    return (i - delta)
}

function checkTask(Id, task, qId) {

    User.findOne({_id: Id}).then(u => {
        if (u.successTasks >= task) {
            console.log('ошибка номера')
            failureTask(qId)
        }
        else {
    switch (task) {
        case 1:
            if (u.nameFarm != '') {
                successTask(Id, 100)
            }
        break
        case 2:
            if (u.plants.apple >= 1 && u.plants.tomato >= 1) {
                successTask(Id, 0, 25)
            }
        break
        case 3:
            if (u.warehouse.fruit.apple >= 6 && u.warehouse.vegetables.tomato >= 6) {
                successTask(Id, 0, 25)
            }
        break
        case 4:
            if (sellFlag) {
                successTask(Id, 0, 50)
            }
        break
        case 5:
            if (u.buildings.chicken >= 1) {
                successTask(Id, 50, 30)
            }
        break
        case 6:
            if (u.warehouse.products.eggs >= 16) {
                successTask(Id, 40, 40)
            }
        break
        case 7:
            if (u.referals.lenght >= 4) {
                successTask(Id, 125, 75)
            }
        break
        default: 
        failureTask(qId) 
    }
        }
    })
}
function successTask(Id, dollars = 0, euro = 0) {
    
    User.updateOne({_id: Id}, { $inc: {
            "bank.dollars": dollars,
            "bank.euro": euro,
            "successTasks": 1
        } 
    })
        .catch((e) => console.log(e))
    
    if (euro == 0 && dollars != 0) {
        const success = `✅ Задание успешно выполнено!\n
🏆 Получена награда:  ${dollars} 💵 Долларов`
        sendHTML(Id, success)
    } 
    if (dollars == 0 && euro != 0) {
        const success = `✅ Задание успешно выполнено!\n
🏆 Получена награда:  ${euro} 💶 Евро`
        sendHTML(Id, success)
    } 
    else if (dollars != 0 && euro != 0) {
        const success = `✅ Задание успешно выполнено!\n
🏆 Получена награда:  ${dollars} 💵 Долларов и ${euro} 💶 Евро`
        sendHTML(Id, success)
    }
}
function failureTask(qId) {
    bot.answerCallbackQuery(qId, texts.tasks.failureTask, true)
}

function redeem(Id, qId) {
    
    User.findOne({_id: Id}).then(u => {
        
        if (u.landlord == null) {
            const error = `🚫 У вас нет арендодателя для того чтобы выкупить свой участок.`
            bot.answerCallbackQuery(qId, error, true)
        } else {
            const ll = u.landlord
            if (u.bank.points >= 20) {
                
                User.updateOne({_id: Id}, { $inc: {
                    "bank.points": -20
                }, 
                $set: {
                    "landlord": null
                }
                }).catch((e) => console.log(e))
                
                User.updateOne({_id: ll}, { 
                $inc: {
                    "bank.points": 20
                }
                }).catch((e) => console.log(e))
                
                const success = `Вы выкупили участок`
                sendHTML(Id, success)
                
            }
            else {
                const error = `🚫 У вас недостаточно ⚜️ Баллов для того чтобы выкупить свой участок.`
                bot.answerCallbackQuery(qId, error, true)
            }
        }
        
    })
    
}

function deposit(chatId, qId) {
    bot.once('message', msg => {
        
        if (msg.text == kb.cancel_dep) {
            return
        }
        
        dep = msg.text
        
        const error = `⛔️ ${dep} - некорректная сумма. Напишите другую сумму.\nЧтобы открыть главное меню, введите команду /menu`
        
        if (dep >= 300) {
            if (+dep != NaN) {
                console.log('оплата')
                bot.sendInvoice( 
                    chatId,
                    `${dep} 💵 Долларов`,
                    `Получите на ваш счет ${dep} 💵 Долларов для покупки фруктов и овощей.`,
                    'payload',
                    PAYMENT_WALL_TEST,
//                    CLICK_TEST,
//                    PAYCOM_TEST,
                    'SOME_RANDOM_STRING_KEY',
                    'USD',
                    [
                        {
                            label: `dollars${dep}`,
                            amount: dep
                        }
                    ],
                    {
                        need_name: false,
                        need_shipping_address: false,
                        need_email: true,
                        need_phone_number: false,
                        is_flexible: false,
                        send_email_to_provider: true
                    }
                ).then((inv) => {
                    console.log(inv)
                })
            }
            else {
                bot.answerCallbackQuery(qId, error, true)
                deposit(chatId, qId)
            }
        }
        else {
            bot.answerCallbackQuery(qId, error, true)
            deposit(chatId, qId)
        }
    })
}

// function setLang(lang) {
//     switch (lang) {
//     case 'ru':
//         texts = require('./texts-ru')    
//     break
//     case 'en':
//         texts = require('./texts-en')    
//     break
//     case 'de':
//         texts = require('./texts-de')    
//     break
//     case 'fr':
//         texts = require('./texts-fr')    
//     break
//     case 'es':
//         texts = require('./texts-es')    
//     break
//     case 'pt':
//         texts = require('./texts-pt')    
//     break
//     default: kb = require('./texts-ru')  
//     }
// }
