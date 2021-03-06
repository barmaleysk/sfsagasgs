const cbd = require('./callbacks')
const index = require('./index')
let kb

switch (index.lang) {
    case 'ru':
        kb = require('./keyboard-buttons-ru')    
    break
    case 'en':
        kb = require('./keyboard-buttons-en')    
    break
    case 'de':
        kb = require('./keyboard-buttons-de')    
    break
    case 'fr':
        kb = require('./keyboard-buttons-fr')    
    break
    case 'es':
        kb = require('./keyboard-buttons-es')    
    break
    case 'pt':
        kb = require('./keyboard-buttons-pt')    
    break
    default: kb = require('./keyboard-buttons-ru')  
}

module.exports = {
    bank: [
        [
            {
                text: kb.bank.deposit,
                callback_data: cbd.deposit
            },
            {
                text: kb.bank.withdraw,
                callback_data: cbd.withdraw
            }
        ],
        [
            {
                text: kb.bank.exchange,
                callback_data: cbd.exchange
            },
            {
                text: kb.bank.redeem,
                callback_data: cbd.redeem
            }
        ]
    ],
    buildings: [
        [
            {
                text: kb.buildings.build,
                callback_data: cbd.build
            }
        ],
        [
            {
                text: kb.buildings.send,
                callback_data: cbd.send_buildings
            }
        ]
    ],
    fruit: [
        [
            {
                text: kb.fruit.buy,
                callback_data: cbd.buy_fruit    
            }
        ],
        [
            {
                text: kb.fruit.send,
                callback_data: cbd.send_fruit    
            }
        ]
    ],
    vegetables: [
        [
            {
                text: kb.vegetables.buy,
                callback_data: cbd.buy_vegetables    
            }
        ],
        [
            {
                text: kb.vegetables.send,
                callback_data: cbd.send_vegetables    
            }
        ] 
    ],
    market: [
        [
            {
                text: kb.market.plants,
                callback_data: cbd.sell_plants
            }
        ],
        [
            {
                text: kb.market.products,
                callback_data: cbd.sell_products
            }
        ]
    ],
    firstMessage: [
        [
            {
                text: kb.continue,
                callback_data: cbd.next_step
            },
            {
                text: kb.skip,
                callback_data: cbd.skip
            }
        ]
    ],
    step2: [
        [
            {
                text: kb.step,
                callback_data: cbd.step3
            }
        ]
    ],
    step3: [
        [
            {
                text: kb.step,
                callback_data: cbd.step4
            }
        ]
    ],
    step4: [
        [
            {
                text: kb.step,
                callback_data: cbd.step5
            }
        ]
    ],
    step5: [
        [
            {
                text: kb.step,
                callback_data: cbd.finish
            }
        ]
    ],
    buildChicken: [
        [
            {
                text: kb.buildings.buildOne,
                callback_data: cbd.buildChicken
            }
        ]
    ],
    buildPig: [
        [
            {
                text: kb.buildings.buildOne,
                callback_data: cbd.buildPig
            }
        ]
    ],
    buildSheepdog: [
        [
            {
                text: kb.buildings.buildOne,
                callback_data: cbd.buildSheepdog
            }
        ]
    ],
    buildCowshed: [
        [
            {
                text: kb.buildings.buildOne,
                callback_data: cbd.buildCowshed
            }
        ]
    ],
    buildHive: [
        [
            {
                text: kb.buildings.buildOne,
                callback_data: cbd.buildHive
            }
        ]
    ],
    buildTurkey: [
        [
            {
                text: kb.buildings.buildOne,
                callback_data: cbd.buildTurkey
            }
        ]
    ],
    
    buyApple: [
      [
          {
              text: kb.plants.buy,
              callback_data: cbd.buyApple
          }
      ]  
    ],
    buyPear: [
      [
          {
              text: kb.plants.buy,
              callback_data: cbd.buyPear
          }
      ]  
    ],
    buyGrapes: [
      [
          {
              text: kb.plants.buy,
              callback_data: cbd.buyGrapes
          }
      ]  
    ],
    buyStrawberries: [
      [
          {
              text: kb.plants.buy,
              callback_data: cbd.buyStrawberries
          }
      ]  
    ],
    buyCherries: [
      [
          {
              text: kb.plants.buy,
              callback_data: cbd.buyCherries
          }
      ]  
    ],
    buyPeach: [
      [
          {
              text: kb.plants.buy,
              callback_data: cbd.buyPeach
          }
      ]  
    ],
    
    help: [
        [
            {
                text: kb.help.feedback,
                callback_data: cbd.feedback
            },
            {
                text: kb.help.training,
                callback_data: cbd.training
            }
        ],
        [
            {
                text: kb.help.faq,
                callback_data: cbd.faq
            },
            {
                text: kb.help.idea,
                callback_data: cbd.idea
            }
        ]
    ],
    
    buyTomato: [
      [
          {
              text: kb.plants.buy,
              callback_data: cbd.buyTomato
          }
      ]  
    ],
    buyEggplant: [
      [
          {
              text: kb.plants.buy,
              callback_data: cbd.buyEggplant
          }
      ]  
    ],
    buyCarrots: [
      [
          {
              text: kb.plants.buy,
              callback_data: cbd.buyCarrots
          }
      ]  
    ],
    buyCorn: [
      [
          {
              text: kb.plants.buy,
              callback_data: cbd.buyCorn
          }
      ]  
    ],
    buyPepper: [
      [
          {
              text: kb.plants.buy,
              callback_data: cbd.buyPepper
          }
      ]  
    ],
    buyPotatoes: [
      [
          {
              text: kb.plants.buy,
              callback_data: cbd.buyPotatoes
          }
      ]  
    ],
    change: [
        [
            {
                text: kb.changeName,
                callback_data: cbd.changeName
            }
        ]
    ],
    task1: [
        [
            {
                text: kb.check,
                callback_data: cbd.check1
            }
        ]
    ],
    task2: [
        [
            {
                text: kb.check,
                callback_data: cbd.check2
            }
        ]
    ],
    task3: [
        [
            {
                text: kb.check,
                callback_data: cbd.check3
            }
        ]
    ],
    task4: [
        [
            {
                text: kb.check,
                callback_data: cbd.check4
            }
        ]
    ],
    task5: [
        [
            {
                text: kb.check,
                callback_data: cbd.check5
            }
        ]
    ]
    
}
