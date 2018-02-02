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
    warehouse: [
        {
            fruit: [
                {
                    name: String,
                    count: {
                        type: Number,
                        default: 0
                    },
                    _id: false
                }
            ],
            vegetables: [
                {
                    name: String,
                    count: {
                        type: Number,
                        default: 0
                    }
                }
            ],
            products: [
                {
                    name: String,
                    count: {
                        type: Number,
                        default: 0
                    }
                }
            ]    
        }     
    ],
    buildings: [
        {
            name: String,
            count: {
                type: Number,
                default: 0
            }
        }
    ],
    plants: [
        {
            fruit: [
                {
                    name: String,
                    count: {
                        type: Number,
                        default: 0
                    }
                }
            ],

            vegetables: [
                {
                    name: String,
                    count: {
                        type: Number,
                        default: 0
                    }
                }
            ]
        }       
    ],
    bank: [
        {
            name: String,
            count: {
                type: Number,
                default: 0
            }
        }
    ],
    referals: {
        type: [String],
        default: []
    },
    friends: [
        {
            id_friend: String,
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
    settings: [
        {
            name: String,
            active: {
                type: Boolean,
                default: true
            }
        }
    ],
    garage: [
        {
            name: String,
            availability: {
                type: Boolean,
                default: false
            },
            inc_per: Number
        }
    ],
    incidents: [
        {
            name: String,
            chance: {
                type: Number,
                default: 0
            }
        }
    ]
})

mongoose.model('users', UsersSchema)
