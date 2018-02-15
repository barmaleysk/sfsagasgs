const kb = require('./keyboard-buttons-pt')
const cbd = require('./callbacks')

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
    warehouse: [
        [
            {
                text: kb.warehouse.fruit,
                callback_data: cbd.det_fruit
            },
            {
                text: kb.warehouse.vegetables,
                callback_data: cbd.det_vegetables
            }
        ],
        [
            {
                text: kb.warehouse.products,
                callback_data: cbd.det_products
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
    ]
    
    
}
