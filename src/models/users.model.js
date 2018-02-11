const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = new Schema({
    _id: Number,
    nameFarm: {
        type: String,
        default: ''
    },
    landlord: {
        type: String,
        default: 'Bank'
    },
    warehouse: {
        fruit: {
            apple: {
                type: Number,
                default: 0
            },
            pear: {
                type: Number,
                default: 0
            },
            grapes: {
                type: Number,
                default: 0
            },
            strawberries: {
                type: Number,
                default: 0
            },
            cherries: {
                type: Number,
                default: 0
            },
            peach: {
                type: Number,
                default: 0
            },
        },
        vegetables: {
            tomato: {
                type: Number,
                default: 0
            },
            eggplant: {
                type: Number,
                default: 0
            },
            carrots: {
                type: Number,
                default: 0
            },
            corn: {
                type: Number,
                default: 0
            },
            pepper: {
                type: Number,
                default: 0
            },
            potatoes: {
                type: Number,
                default: 0
            },
        },
        products: {
            eggs: {
                type: Number,
                default: 0
            },
            bacon: {
                type: Number,
                default: 0
            },
            wool: {
                type: Number,
                default: 0
            },
            milk: {
                type: Number,
                default: 0
            },
            honey: {
                type: Number,
                default: 0
            },
            leg: {
                type: Number,
                default: 0
            }
        } 
    },
    prices: {
        one: {
            type: Number,
            default: 100
        },
        two: {
            type: Number,
            default: 1000
        },
        three: {
            type: Number,
            default: 6000
        },
        four: {
            type: Number,
            default: 18000
        },
        five: {
            type: Number,
            default: 45000
        },
        six: {
            type: Number,
            default: 90000
        }
    },
    produces: {
        one: {
            type: Number,
            default: 16
        },
        two: {
            type: Number,
            default: 180
        },
        three: {
            type: Number,
            default: 1250
        },
        four: {
            type: Number,
            default: 4850
        },
        five: {
            type: Number,
            default: 13000
        },
        six: {
            type: Number,
            default: 31250
        }
    },
    produced: {
        apple: {
            type: Number,
            default: 0
        },
        pear: {
            type: Number,
            default: 0
        },
        grapes: {
            type: Number,
            default: 0
        },
        strawberries: {
            type: Number,
            default: 0
        },
        cherries: {
            type: Number,
            default: 0
        },
        peach: {
            type: Number,
            default: 0
        },
        tomato: {
            type: Number,
            default: 0
        },
        eggplant: {
            type: Number,
            default: 0
        },
        carrots: {
            type: Number,
            default: 0
        },
        corn: {
            type: Number,
            default: 0
        },
        pepper: {
            type: Number,
            default: 0
        },
        potatoes: {
            type: Number,
            default: 0
        },
        eggs: {
            type: Number,
            default: 0
        },
        bacon: {
            type: Number,
            default: 0
        },
        wool: {
            type: Number,
            default: 0
        },
        milk: {
            type: Number,
            default: 0
        },
        honey: {
            type: Number,
            default: 0
        },
        leg: {
            type: Number,
            default: 0
        }
    },
    buildings: {
        chicken: {
            type: Number,
            default: 0
        },
        pig: {
            type: Number,
            default: 0
        },
        sheepdog: {
            type: Number,
            default: 0
        },
        cowshed: {
            type: Number,
            default: 0
        },
        hive: {
            type: Number,
            default: 0
        },
        turkey: {
            type: Number,
            default: 0
        },
    },
    plants: {
        apple: {
            type: Number,
            default: 0
        },
        pear: {
            type: Number,
            default: 0
        },
        grapes: {
            type: Number,
            default: 0
        },
        strawberries: {
            type: Number,
            default: 0
        },
        cherries: {
            type: Number,
            default: 0
        },
        peach: {
            type: Number,
            default: 0
        },
        tomato: {
            type: Number,
            default: 0
        },
        eggplant: {
            type: Number,
            default: 0
        },
        carrots: {
            type: Number,
            default: 0
        },
        corn: {
            type: Number,
            default: 0
        },
        pepper: {
            type: Number,
            default: 0
        },
        potatoes: {
            type: Number,
            default: 0
        }
    },
    bank: {
        dollars: {
            type: Number,
            default: 0
        },
        euro: {
            type: Number,
            default: 0
        },
        gold: {
            type: Number,
            default: 0
        },
        diamond: {
            type: Number,
            default: 0
        },
        points: {
            type: Number,
            default: 0
        },
        token: {
            type: Number,
            default: 0
        }
    },
    referals: {
        type: [String],
        default: []
    },
    friends: [
        {
            id_friend: Number,
            coop: {
                type: Boolean,
                default: false
            },
            name_company: {
                type: String,
                default: ''
            }
        }
    ],
    settings: {
        language: {
            type: String,
            default: 'RU'
        }
    },
    garage: {
        moped: {
            type: Boolean,
            default: false
        },
        car: {
            type: Boolean,
            default: false
        },
        tractor: {
            type: Boolean,
            default: false
        },
        track: {
            type: Boolean,
            default: false
        }    
    },
    incidents: {
        sunny: {
            type: Number,
            default: 0
        },
        thunder: {
            type: Number,
            default: 0
        },
        dry_thunder: {
            type: Number,
            default: 0
        },
        wind: {
            type: Number,
            default: 0
        },
        hurricane: {
            type: Number,
            default: 0
        },
        short_circuit: {
            type: Number,
            default: 0
        },
        fire: {
            type: Number,
            default: 0
        }    
    }
})

mongoose.model('users', UsersSchema)
