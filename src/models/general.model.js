const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GeneralSchema = new Schema({
_id: Number,
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
}
    
})

mongoose.model('general', GeneralSchema)