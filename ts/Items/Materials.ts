import Item from "../Classes/Item.js"

interface ItemsDict {
    [key:string]: Item
    
}

const materials: ItemsDict = {
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
    }
}

export default materials