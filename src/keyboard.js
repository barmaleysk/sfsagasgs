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
    home: [
        [kb.home.myFarm, kb.home.friends],
        [kb.home.city, kb.home.other]
    ],
    myFarm: [
        [kb.myFarm.plants, kb.myFarm.buildings],
        [kb.myFarm.referals, kb.back]
    ],
    city: [
        [kb.city.market, kb.city.bank],
        [kb.city.casino, kb.city.townHall],
        [kb.back]
    ],
    townHall: [
        [kb.townHall.name, kb.townHall.statistics],
        [kb.back_city]
    ],
    plants: [
        [kb.plants.fruit, kb.plants.vegetables],
        [kb.back_farm]
    ],
    other: [
        [kb.other.settings, kb.other.help],
        [kb.other.tasks, kb.other.community],
        [kb.back]
    ],
    casino: [
//        [kb.casino.bowling, kb.casino.lottery],
//        [kb.casino.dice, kb.casino.darts],
//        [kb.casino.slot_machine, kb.casino.guess_suit],
        [kb.casino.bonus, kb.back_city]
    ],
    friends: [
        
    ],
    settings: [
        
    ],
    languages: [
        [kb.languages.english, kb.languages.russian],
        [kb.languages.german, kb.languages.french],
        [kb.languages.portuguese, kb.languages.spanish]
    ],
    cancel: [
        [kb.cancel]
    ],
    cancel_dep: [
        [kb.cancel_dep]
    ],
    yesno: [
        [kb.yes, kb.no]
    ]
}
