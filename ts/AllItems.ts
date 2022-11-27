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
        icon: "./assets/items/small-stick.png"
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
        icon: "./assets/items/stick.png"
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
        icon: "./assets/items/log.png"
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
        icon: "./assets/items/small-rock.png"
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
        icon: "./assets/items/rock.png"
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
        icon: "./assets/items/grass-fiber.png"
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
        icon: "./assets/items/string.png"
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
        icon: "./assets/items/rope.png"
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
        icon: "./assets/items/hook.png"
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
        icon: "./assets/items/bait-worm.png"
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
        icon: "./assets/items/fish.png"
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
        icon: "./assets/items/fishing-rod.png"
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
        icon: "./assets/items/hatchet.png"
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
        icon: "./assets/items/stone-knife.png"
    },
    tool_torch:{
        id:"tool_torch",
        type: "tool",
        name: "Torch",
        desc: "A torch made of a stick and strings",
        reqMats:[
            {id:"mat_crafted_string", qty: 3},
            {id:"mat_wood_stick", qty: 1}
        ],
        reqCons:[],
        qty: 0,
        crafted: true,
        icon: "./assets/items/stick.png"    // TODO (cambiar img)
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
        icon: "./assets/items/log.png"
    }

}

export default _ITEMS