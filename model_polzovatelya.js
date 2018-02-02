id: 'id пользователя',
Название фермы: 'Название',
Арендодатель: 'id реферера', // null/0 когда человек выкупил
Склад: [
   Фрукты: [{
      название: 'Яблоки',
      количество: 0
},
{
      название: 'Груши',
      количество: 0
},
{
      название: 'Виноград',
      количество: 0
},
{
      название: 'Клубника',
      количество: 0
},
{
      название: 'Вишня',
      количество: 0
},
{
      название: 'Персик',
      количество: 0
}],

  Овощи: [{
      название: 'Помидоры',
      количество: 0
},
{
      название: 'Баклажаны',
      количество: 0
},
{
      название: 'Морковь',
      количество: 0
},
{
      название: 'Кукуруза',
      количество: 0
},
{
      название: 'Перец Чили',
      количество: 0
},
{
      название: 'Картофель',
      количество: 0
}],

  Продукты: [{
      название: 'Яйцо',
      количество: 0
},
{
      название: 'Бекон',
      количество: 0
},
{
      название: 'Стейк',
      количество: 0
},
{
      название: 'Молоко',
      количество: 0
},
{
      название: 'Мёд',
      количество: 0
},
{
      название: 'Ножка',
      количество: 0
}]
],

Постройки: [
{
  название: 'Курятник',
  количество: 0  
},
{
  название: 'Свинарник',
  количество: 0  
},
{
  название: 'Козлятник',
  количество: 0  
},
{
  название: 'Коровник',
  количество: 0  
},
{
  название: 'Улей',
  количество: 0  
},
{
  название: 'Индюшатник',
  количество: 0  
}
],

Банк: [
{
   название: 'Доллары',
   количество: 0   
},
{
   название: 'Евро',
   количество: 0  
},
{
   название: 'Золото',
   количество: 0
},
{
   название: 'Алмазы',
   количество: 0
},
{
   название: 'Топазы', // ???
   количество: 0   
},
{
   название: 'Токены',
   количество: 0   
}
      ],

Рефералы: ['рефid1', 'рефid2', 'рефid3', ... ],

Друзья: [{
   id друга: 'id',
   сотрудничество: true/false
}],

Настройки: [
{
   название: 'Язык',
   значение: '' // RU/EN/GE/FR/BR
},
{
   название: 'Уведомления о регистрации реферала',
   значение: true/false
},
{
   название: 'Уведомления о сборе ресурсов',
   значение: true/false
},
{
   название: 'Уведомление о донате реферала',
   значение: true/false
},
{
   название: 'Новости/Акции и т.д.',
   значение: true/false
},
{
   название: 'Уведомление о ежедневном бонусе',
   значение: true/false
},
{
   название: 'Уведомление о выигрыше в лотереи',
   значение: true/false
}
]



/////////////////////////////////////
Гараж: [
{
   название: 'Легкий грузовик',
   есть в наличии: true/false
},
{
   название: 'Машина',
   есть в наличии: true/false
},
{
   название: 'Трактор',
   есть в наличии: true/false
},
{
   название: 'Мопед',
   есть в наличии: true/false
}
]

/////////////////////////////

Происшедствия: [
{
   название: 'Солнечно',
   шанс: 80%
}, // 80
{
   название: 'Гроза',
   шанс: 5%
}, // 85
{
   название: 'Сухая гроза',
   шанс: 2%
}, // 87
{
   название: 'Сильный ветер',
   шанс: 3%
}, // 90
{
   название: 'Ураган',
   шанс: 3%
}, // 93
{
   название: 'Короткое замыкание',
   шанс: 4%
}, // 97
{
   название: 'Пожар',
   шанс: 3%
}
] // 100
// ========================================   
    
    warehouse: [
        {
            fruit: [
                {
                    name: 'apple',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'pear',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'grapes',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'strawberries',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'cherries',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'peach',
                    count: {
                        type: Number,
                        default: 0
                    }
                }
            ]
        },
        {
            vegetables: [
                {
                    name: 'tomato',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'eggplant',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'carrots',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'corn',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'pepper',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'potatoes',
                    count: {
                        type: Number,
                        default: 0
                    }
                }
            ]
        },
        {
            products: [
                {
                    name: 'eggs',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'bacon',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'wool',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'milk',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'honey',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'leg',
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
            name: 'chicken',
            count: {
                type: Number,
                default: 0
            }
        },
        {
            name: 'pig',
            count: {
                type: Number,
                default: 0
            }
        },
        {
            name: 'sheepdog',
            count: {
                type: Number,
                default: 0
            }
        },
        {
            name: 'cowshed',
            count: {
                type: Number,
                default: 0
            }
        },
        {
            name: 'hive',
            count: {
                type: Number,
                default: 0
            }
        },
        {
            name: 'turkey',
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
                    name: 'apple',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'pear',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'grapes',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'strawberries',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'cherries',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'peach',
                    count: {
                        type: Number,
                        default: 0
                    }
                }
            ]
        },
        {
            vegetables: [
                {
                    name: 'tomato',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'eggplant',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'carrots',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'corn',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'pepper',
                    count: {
                        type: Number,
                        default: 0
                    }
                },
                {
                    name: 'potatoes',
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
            name: 'dollars',
            count: {
                type: Number,
                default: 0
            }
        },
        {
            name: 'euro',
            count: {
                type: Number,
                default: 0
            }
        },
        {
            name: 'gold',
            count: {
                type: Number,
                default: 0
            }
        },
        {
            name: 'diamond',
            count: {
                type: Number,
                default: 0
            }
        },
        {
            name: 'topaz',
            count: {
                type: Number,
                default: 0
            }
        },
        {
            name: 'token',
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
                    name: '',
                    active: {
                        type: Boolean,
                        default: true
                    }
                }
    ],
    garage: [
        {
            name: 'moped',
            availability: {
                type: Boolean,
                default: false
            },
            inc_per: 0.03
        },
        {
            name: 'car',
            availability: {
                type: Boolean,
                default: false
            },
            inc_per: 0.075
        },
        {
            name: 'tractor',
            availability: {
                type: Boolean,
                default: false
            },
            inc_per: 0.1
        },
        {
            name: 'track',
            availability: {
                type: Boolean,
                default: false
            },
            inc_per: 0.15
        }
    ],
    incidents: [
        {
            name: 'sunny',
            chance: {
                type: Number,
                min: 0,
                max: 80
            }
        },
        {
            name: 'thunder',
            chance: {
                type: Number,
                min: 81,
                max: 85
            }
        },
        {
            name: 'dry_thunder',
            chance: {
                type: Number,
                min: 86,
                max: 87
            }
        },
        {
            name: 'wind',
            chance: {
                type: Number,
                min: 88,
                max: 90
            }
        },
        {
            name: 'hurricane',
            chance: {
                type: Number,
                default: 3,
                min: 91,
                max: 93
            }
        },
        {
            name: 'short_circuit',
            chance: {
                type: Number,
                min: 94,
                max: 97
            }
        },
        {
            name: 'fire',
            chance: {
                type: Number,
                min: 98,
                max: 100
            }
        }
    ]
    
    
    
    
    
    
    
    
    
    
    
    
    


 