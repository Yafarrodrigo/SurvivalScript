interface ItemsDict {
    [key:string]: {
        id: string
        type: "material" | "consumible" | "tool"
        name: string
        reqMats: {
            id: string,
            qty: number
        }[],
        reqCons: {
            id: string,
            qty: number
        }[]
    }
    
}

const _ITEMS: ItemsDict =  {

    mat_wood_small_stick:{
        id:"mat_wood_small_stick",
        type: "material",
        name: "small stick",
        reqMats: [],
        reqCons: []
    },
    mat_wood_stick:{
        id:"mat_wood_stick",
        type: "material",
        name: "stick",
        reqMats: [],
        reqCons: []
    },
    mat_stone_small_rock:{
        id:"mat_stone_small_rock",
        type: "material",
        name: "small rock",
        reqMats: [],
        reqCons: []
    },
    mat_stone_rock:{
        id:"mat_stone_rock",
        type: "material",
        name: "rock",
        reqMats: [],
        reqCons: []
    },
    mat_grass_fiber:{
        id:"mat_grass_fiber",
        type: "material",
        name: "grass fiber",
        reqMats: [],
        reqCons: []
    },
    mat_crafted_string:{
        id:"mat_crafted_string",
        type: "material",
        name: "string",
        reqMats:[{id:"mat_grass_fiber", qty: 5}],
        reqCons: []
    },
    mat_crafted_rope:{
        id:"mat_crafted_rope",
        type: "material",
        name: "rope",
        reqMats:[{id:"mat_crafted_string", qty: 3}],
        reqCons: []
    },
    mat_crafted_hook:{
        id:"mat_crafted_hook",
        type: "material",
        name: "hook",
        reqMats:[{id:"mat_stone_small_rock", qty: 1}],
        reqCons: []
    },
    cons_bait_worm:{
        id:"cons_bait_worm",
        type: "consumible",
        name: "worm",
        reqMats: [],
        reqCons: []
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
        ]
    }

}

export default _ITEMS