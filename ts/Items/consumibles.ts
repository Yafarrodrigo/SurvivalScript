import Item from "../Classes/Item.js"

interface ItemsDict {
    [key:string]: Item
    
}

const consumibles: ItemsDict = {
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
    cons_food_rawFish:{
        id:"cons_food_rawFish",
        type: "consumible",
        name: "Raw Fish",
        desc: "A raw fish. Maybe I should cock it before eating it",
        reqMats: [],
        reqCons: [],
        qty: 0,
        crafted: false,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "eatRawFish", name: "Eat Raw", desc: "eats raw fish", singleTime: true},
            {actionCode: "dropItem", name: "Drop", desc: "drops item", singleTime: true}
        ]
    },
    cons_food_cookedFish:{
        id:"cons_food_cookedFish",
        type: "consumible",
        name: "Cooked Fish",
        desc: "A cooked fish. A delicious fish, ready to eat",
        reqMats: [],
        reqCons: [],
        qty: 0,
        crafted: false,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "dropItem", name: "Drop", desc: "drops item", singleTime: true},
            {actionCode: "eatCookedFish", name: "Eat", desc: "eats fish", singleTime: true}
        ]
    }
}

export default consumibles