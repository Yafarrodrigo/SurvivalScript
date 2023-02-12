import Item from "../Classes/Item.js"

interface ItemsDict {[key:string]: Item}

const tools: ItemsDict = {
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
        reqTools: [],
        qty: 1,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "equipFishingRod", name: "Equip", desc: "equips fishing rod", singleTime: true},
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
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
        reqTools: [],
        qty: 1,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "equipWoodenBow", name: "Equip", desc: "equips wooden bow", singleTime: true},
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
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
        reqTools: [],
        qty: 1,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "equipHatchet", name: "Equip", desc: "equips hatchet", singleTime: true},
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
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
        reqTools: [],
        qty: 1,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "equipShovel", name: "Equip", desc: "equips shovel", singleTime: true},
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
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
        reqTools: [],
        qty: 1,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "equipStoneKnife", name: "Equip", desc: "equips stone knife", singleTime: true},
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
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
        reqTools: [],
        qty: 1,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "equipSsharpenedShell", name: "Equip", desc: "equips sharpened shell", singleTime: true},
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    tool_emptyBucket:{
        id:"tool_emptyBucket",
        type: "tool",
        name: "empty bucket",
        desc: "A wooden bucket made of planks. Used to collect water from the rivers or catch rain",
        reqMats:[
            {id:"mat_wood_plank", qty: 10},
            {id:"mat_crafted_rope", qty: 2}
        ],
        reqCons:[],
        reqTools: [],
        qty: 1,
        crafted: true,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "equipEmptyBucket", name: "Equip", desc: "equips bucket", singleTime: true},
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    },
    tool_waterBucket:{
        id:"tool_waterBucket",
        type: "tool",
        name: "water bucket",
        desc: "A water filled wooden bucket. Used to collect water from the rivers or catch rain",
        reqMats:[],
        reqCons:[],
        reqTools: [],
        qty: 1,
        crafted: false,
        relatedTile: null,
        weight: 1000,
        options:[
            {actionCode: "equipWaterBucket", name: "Equip", desc: "equips bucket", singleTime: true},
            {actionCode: "emptyBucket", name: "Empty", desc: "empties bucket", singleTime: true},
            {actionCode: "dropItem", name: "drop", desc: "drops item", singleTime: true}
        ]
    }
}

export default tools