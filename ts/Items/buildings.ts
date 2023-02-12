import Item from "../Classes/Item.js"

interface ItemsDict {
    [key:string]: Item
    
}

const buildings: ItemsDict = {
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

export default buildings