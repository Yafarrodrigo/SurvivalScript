import Item from "./Classes/Item.js"

interface ItemsDict {
    [key:string]: Item
    
}

const _ITEMS: ItemsDict =  {

    mat_wood_small_stick:{
        id:"mat_wood_small_stick",
        type: "material",
        name: "small stick",
        desc: "A small wooden stick. Can be used for crafting",
        reqMats: [],
        reqCons: [],
        qty: 0,
        crafted: false,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    mat_wood_stick:{
        id:"mat_wood_stick",
        type: "material",
        name: "stick",
        desc: "A long wooden stick. Can be used for crafting",
        reqMats: [],
        reqCons: [],
        qty: 0,
        crafted: false,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    mat_wood_log:{
        id:"mat_wood_log",
        type: "material",
        name: "log",
        desc: "A big wooden log. Can be used for crafting",
        reqMats: [],
        reqCons: [],
        qty: 0,
        crafted: false,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    mat_stone_small_rock:{
        id:"mat_stone_small_rock",
        type: "material",
        name: "small rock",
        desc: "A small rock. Can be used for crafting",
        reqMats: [],
        reqCons: [],
        qty: 0,
        crafted: false,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    mat_stone_rock:{
        id:"mat_stone_rock",
        type: "material",
        name: "rock",
        desc: "A rock. Can be used for crafting",
        reqMats: [],
        reqCons: [],
        qty: 0,
        crafted: false,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    mat_grass_fiber:{
        id:"mat_grass_fiber",
        type: "material",
        name: "grass fiber",
        desc: "Plant fibers. Can be used for crafting",
        reqMats: [],
        reqCons: [],
        qty: 0,
        crafted: false,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    mat_dirt:{
        id:"mat_dirt",
        type: "material",
        name: "dirt",
        desc: "Just dirt. Can be used for crafting",
        reqMats: [],
        reqCons: [],
        qty: 0,
        crafted: false,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    mat_sand:{
        id:"mat_sand",
        type: "material",
        name: "sand",
        desc: "Just sand. Can be used for crafting",
        reqMats: [],
        reqCons: [],
        qty: 0,
        crafted: false,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    mat_sea_shell:{
        id:"mat_sea_shell",
        type: "material",
        name: "sea shell",
        desc: "sea shells. Can be used for crafting",
        reqMats: [],
        reqCons: [],
        qty: 0,
        crafted: false,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    mat_crafted_string:{
        id:"mat_crafted_string",
        type: "material",
        name: "string",
        desc: "A string made of grass. Can be used for crafting",
        reqMats:[{id:"mat_grass_fiber", qty: 5}],
        reqCons: [],
        qty: 0,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    mat_crafted_rope:{
        id:"mat_crafted_rope",
        type: "material",
        name: "rope",
        desc: "A strong rope. Can be used for crafting",
        reqMats:[{id:"mat_crafted_string", qty: 3}],
        reqCons: [],
        qty: 0,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    mat_crafted_hook:{
        id:"mat_crafted_hook",
        type: "material",
        name: "hook",
        desc: "A hook made of rock. Can be used with a fishing rod",
        reqMats:[{id:"mat_stone_small_rock", qty: 1}],
        reqCons: [],
        qty: 0,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    cons_bait_worm:{
        id:"cons_bait_worm",
        type: "consumible",
        name: "worm",
        desc: "A worm. Can be used as a bait for fishing",
        reqMats: [],
        reqCons: [],
        qty: 0,
        crafted: false,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    cons_arrow:{
        id:"cons_arrow",
        type: "consumible",
        name: "arrow",
        desc: "An arrow, used to hunt with the bow",
        reqMats: [
            {id:"mat_wood_small_stick", qty: 1},
            {id:"mat_stone_small_rock", qty: 1}
        ],
        reqCons: [],
        qty: 0,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    cons_food_fish:{
        id:"cons_food_fish",
        type: "consumible",
        name: "fish",
        desc: "A fish. Can be eaten",
        reqMats: [],
        reqCons: [],
        qty: 0,
        crafted: false,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "Drop", desc: "drops item", singleTime: true},
            {actionCode: "eatFish", name: "Eat", desc: "eats fish", singleTime: true}
        ]
    },
    tool_fishingRod:{
        id:"tool_fishingRod",
        type: "tool",
        name: "fishing rod",
        desc: "A fishing rod to catch some fishes. Needs a bait",
        reqMats:[
            {id:"mat_crafted_hook", qty: 1},
            {id:"mat_wood_stick", qty: 1},
            {id:"mat_crafted_string", qty: 1}
        ],
        reqCons:[
            {id:"cons_bait_worm", qty: 1}
        ],
        qty: 0,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true},
            {actionCode: "equipFishingRod", name: "Equip", desc: "equips fishing rod", singleTime: true}
        ]
    },
    tool_woodenBow:{
        id:"tool_woodenBow",
        type: "tool",
        name: "Wooden Bow",
        desc: "A bow made of wood, used to hunt. Needs arrows",
        reqMats:[
            {id:"mat_wood_stick", qty: 1},
            {id:"mat_crafted_rope", qty: 1}
        ],
        reqCons:[
            {id:"cons_arrow", qty: 1}
        ],
        qty: 0,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true},
            {actionCode: "equipWoodenBow", name: "Equip", desc: "equips wooden bow", singleTime: true}
        ]
    },
    tool_hatchet:{
        id:"tool_hatchet",
        type: "tool",
        name: "Hatchet",
        desc: "A small hatchet. Used to chop down trees",
        reqMats:[
            {id:"mat_stone_rock", qty: 1},
            {id:"mat_wood_stick", qty: 1},
            {id:"mat_crafted_rope", qty: 1}
        ],
        reqCons:[],
        qty: 0,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true},
            {actionCode: "equipHatchet", name: "Equip", desc: "equips hatchet", singleTime: true}
        ]
    },
    tool_shovel:{
        id:"tool_shovel",
        type: "tool",
        name: "Shovel",
        desc: "A small shovel. Used to gather dirt",
        reqMats:[
            {id:"mat_stone_rock", qty: 1},
            {id:"mat_wood_stick", qty: 1},
            {id:"mat_crafted_rope", qty: 1}
        ],
        reqCons:[],
        qty: 0,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true},
            {actionCode: "equipShovel", name: "Equip", desc: "equips shovel", singleTime: true}
        ]
    },
    tool_stoneKnife:{
        id:"tool_stoneKnife",
        type: "tool",
        name: "Stone knife",
        desc: "A sharpened stone to use as a knife",
        reqMats:[
            {id:"mat_stone_small_rock", qty: 1},
            {id:"mat_stone_rock", qty: 1}
        ],
        reqCons:[],
        qty: 0,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true},
            {actionCode: "equipStoneKnife", name: "Equip", desc: "equips stone knife", singleTime: true}
        ]
    },
    tool_sharpenedShell:{
        id:"tool_sharpenedShell",
        type: "tool",
        name: "Sharpened Shell",
        desc: "A sharpened shell can be used as a knife",
        reqMats:[
            {id:"mat_stone_small_rock", qty: 1},
            {id:"mat_sea_shell", qty: 1}
        ],
        reqCons:[],
        qty: 0,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true},
            {actionCode: "equipStoneKnife", name: "Equip", desc: "equips stone knife", singleTime: true}
        ]
    },
    building_torch:{
        id:"building_torch",
        type: "building",
        name: "Torch",
        desc: "A torch made of a stick and strings",
        reqMats:[
            {id:"mat_crafted_string", qty: 3},
            {id:"mat_wood_stick", qty: 1}
        ],
        reqCons:[],
        qty: 0,
        crafted: true,
        relatedTile: "torchTile",
        weight: 1000,
        options:[
            {actionCode: "equipTorch", name: "Equip", desc: "equips torch", singleTime: true},
            {actionCode: "placeTorch", name: "Place", desc: "places a torch", singleTime: true},
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    building_campfire:{
        id:"building_campfire",
        type: "building",
        name: "Campfire",
        desc: "A campfire",
        reqMats:[
            {id:"mat_stone_rock", qty: 5},
            {id:"mat_wood_small_stick", qty: 5},
            {id:"mat_grass_fiber", qty: 5}

        ],
        reqCons:[],
        qty: 0,
        crafted: true,
        relatedTile: "campfireTile",
        weight: 1000,
        options:[
            {actionCode: "placeCampfire", name: "Place", desc: "places a campfire", singleTime: true},
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    building_farmPlot:{
        id:"building_farmPlot",
        type: "building",
        name: "Farm Plot",
        desc: "A plot to grow vegetables",
        reqMats:[
            {id:"mat_dirt", qty: 5}
        ],
        reqCons:[],
        qty: 0,
        crafted: true,
        relatedTile: "emptyFarmPlot",
        weight: 1000,
        options:[
            {actionCode: "placeFarmPlot", name: "Place", desc: "places a farm plot", singleTime: true},
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    building_wooden_floor:{
        id:"building_wooden_floor",
        type: "building",
        name: "Wooden Floor",
        desc: "A wooden floor made of logs",
        reqMats:[
            {id:"mat_wood_log", qty: 5},
            {id:"mat_crafted_rope", qty: 2}
        ],
        reqCons:[],
        qty: 0,
        crafted: true,
        relatedTile: "woodenFloor",
        weight: 1000,
        options:[
            {actionCode: "placeWoodenFloor", name: "Place", desc: "places a wooden floor", singleTime: true},
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    }

}

export default _ITEMS