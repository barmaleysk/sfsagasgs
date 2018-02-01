const kb = require('./keyboard-buttons')

module.exports = {
    bank: [
        [
            {
                text: kb.bank.deposit,
                callback_data: 'deposit'
            },
            {
                text: kb.bank.withdraw,
                callback_data: 'withdraw'
            }
        ],
        [
            {
                text: kb.bank.exchange,
                callback_data: 'exchange'
            },
            {
                text: kb.bank.redeem,
                callback_data: 'redeem'
            }
        ]
    ],
    buildings: [
        [
            {
                text: kb.buildings.build,
                callback_data: 'build'
            }
        ],
        [
            {
                text: kb.buildings.send,
                callback_data: 'send_buildings'
            }
        ]
    ],
    fruit: [
        [
            {
                text: kb.fruit.buy,
                callback_data: 'buy_fruit'    
            }
        ],
        [
            {
                text: kb.fruit.send,
                callback_data: 'send_fruit'    
            }
        ]
    ],
    vegetables: [
        [
            {
                text: kb.vegetables.buy,
                callback_data: 'buy_vegetables'    
            }
        ],
        [
            {
                text: kb.vegetables.send,
                callback_data: 'send_vegetables'    
            }
        ] 
    ],
    market: [
        [
            {
                text: kb.market.plants,
                callback_data: 'sell_plants'
            }
        ],
        [
            {
                text: kb.market.products,
                callback_data: 'sell_products'
            }
        ]
    ],
    warehouse: [
        [
            {
                text: kb.warehouse.fruit,
                callback_data: 'det_fruit'
            },
            {
                text: kb.warehouse.vegetables,
                callback_data: 'det_vegetables'
            }
        ],
        [
            {
                text: kb.warehouse.products,
                callback_data: 'det_products'
            }
        ]
    ]
}