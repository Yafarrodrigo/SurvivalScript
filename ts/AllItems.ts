import Item from "./Classes/Item.js"

interface ItemsDict {
    [key:string]: Item
    
}

const _ITEMS: ItemsDict =  {

    mat_wood_small_stick:{
        id:"mat_wood_small_stick",
        type: "material",
        name: "small stick",
        reqMats: [],
        reqCons: [],
        qty: 0
    },
    mat_wood_stick:{
        id:"mat_wood_stick",
        type: "material",
        name: "stick",
        reqMats: [],
        reqCons: [],
        qty: 0
    },
    mat_stone_small_rock:{
        id:"mat_stone_small_rock",
        type: "material",
        name: "small rock",
        reqMats: [],
        reqCons: [],
        qty: 0
    },
    mat_stone_rock:{
        id:"mat_stone_rock",
        type: "material",
        name: "rock",
        reqMats: [],
        reqCons: [],
        qty: 0
    },
    mat_grass_fiber:{
        id:"mat_grass_fiber",
        type: "material",
        name: "grass fiber",
        reqMats: [],
        reqCons: [],
        qty: 0
    },
    mat_crafted_string:{
        id:"mat_crafted_string",
        type: "material",
        name: "string",
        reqMats:[{id:"mat_grass_fiber", qty: 5}],
        reqCons: [],
        qty: 0
    },
    mat_crafted_rope:{
        id:"mat_crafted_rope",
        type: "material",
        name: "rope",
        reqMats:[{id:"mat_crafted_string", qty: 3}],
        reqCons: [],
        qty: 0
    },
    mat_crafted_hook:{
        id:"mat_crafted_hook",
        type: "material",
        name: "hook",
        reqMats:[{id:"mat_stone_small_rock", qty: 1}],
        reqCons: [],
        qty: 0
    },
    cons_bait_worm:{
        id:"cons_bait_worm",
        type: "consumible",
        name: "worm",
        reqMats: [],
        reqCons: [],
        qty: 0
    },
    cons_food_fish:{
        id:"cons_food_fish",
        type: "consumible",
        name: "fish",
        reqMats: [],
        reqCons: [],
        qty: 0
    },
    tool_fishingRod:{
        id:"tool_fishingRod",
        type: "tool",
        name: "fishing rod",
        reqMats:[
            {id:"mat_crafted_hook", qty: 1},
            {id:"mat_wood_stick", qty: 1},
            {id:"mat_crafted_rope", qty: 1}
        ],
        reqCons:[
            {id:"cons_bait_worm", qty: 1}
        ],
        qty: 0
    }

}

export default _ITEMS