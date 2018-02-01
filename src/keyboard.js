const kb = require('./keyboard-buttons')

module.exports = {
    home: [
        [kb.home.myFarm, kb.home.friends],
        [kb.home.market, kb.home.bank],
        [kb.home.games, kb.home.tasks],
        [kb.home.settings, kb.home.help]
    ],
    myFarm: [
        [kb.myFarm.plants, kb.myFarm.buildings],
        [kb.myFarm.warehouse, kb.myFarm.statistics],
        [kb.myFarm.referals, kb.myFarm.name],
        [kb.back]
    ],
    plants: [
        [kb.plants.fruit, kb.plants.vegetables],
        [kb.back_farm]
    ],
    friends: [
        
    ],
    settings: [
        
    ],
    help: [
        
    ],
    games: [
        
    ],
    languages: [
        
    ]
}