export interface TilesDict {
    [key:string]: {
        type:string
        walkable:boolean
        spaceAvailable: boolean
        src: string
        base:string | null
        options:{
            actionCode:string
            name:string
            desc:string
            singleTime: boolean
        }[]
    }
}

const _TILES: TilesDict = {

    water:{
        type: "water",
        walkable: false,
        spaceAvailable: true,
        src: "./assets/water.jpg",
        base: null,
        options: [
            {actionCode:"fish",name:"fish", desc: "fishing", singleTime: false},
        ]
    },
    sand:{
        type: "sand",
        walkable: true,
        spaceAvailable: true,
        src: "./assets/sand.jpg",
        base: null,
        options: [
            {actionCode:"gatherSand",name:"gather sand", desc: "gathering sand from the ground", singleTime: false},
        ]
    },
    seashells:{
        type: "seashells",
        walkable: true,
        spaceAvailable: true,
        src: "./assets/seashells.png",
        base: "sand",
        options: [
            {actionCode:"gatherSeaShells",name:"gather sea shells", desc: "gathering sea shells", singleTime: true}
        ]
    },
    grass:{
        type: "grass",
        walkable: true,
        spaceAvailable: true,
        src: "./assets/grass0.jpg",
        base: null,
        options: [
            {actionCode:"gatherDirt",name:"gather dirt", desc: "gathering dirt from the ground", singleTime: false},
            {actionCode:"gatherSmallRocks",name:"gather small rocks", desc: "gathering small rocks from the ground", singleTime: false},
            {actionCode:"gatherGrassFibers",name:"gather grass fibers", desc: "gathering grass fibers from the ground", singleTime: false},
            {actionCode:"gatherWorms",name:"gather worms", desc: "gathering worms from the ground", singleTime: false}
        ]
    },
    bush:{
        type: "bush",
        walkable: true,
        spaceAvailable: false,
        src: "./assets/bush.jpg",
        base: "grass",
        options: [
            {actionCode:"gatherSticks",name:"gather small sticks", desc: "gathering sticks from the ground", singleTime: true}
        ]
    },
    stones:{
        type: "stones",
        walkable: true,
        spaceAvailable: false,
        src: "./assets/stones.jpg",
        base: "grass",
        options: [
            {actionCode:"gatherRock",name:"gather rock", desc: "gathering rocks from the ground", singleTime: true}
        ]
    },
    trees:{
        type: "trees",
        walkable: false,
        spaceAvailable: false,
        src: "./assets/trees.jpg",
        base: null,
        options: [
            {actionCode:"gatherLongStick",name:"gather long stick", desc: "gathering a long stick from trees", singleTime: false},
            {actionCode:"chopDownTree",name:"chop tree down", desc: "chops the tree", singleTime: true}
        ]
    },
    emptyFarmPlot:{
        type: "emptyFarmPlot",
        walkable: true,
        spaceAvailable: false,
        src: "./assets/emptyFarmPlot.jpg",
        base: null,
        options: [{actionCode:"plantPumpkins",name:"Plant pumpkins", desc: "Plant pumpkins", singleTime: true}]
    },
    plantedFarmPlot:{
        type: "plantedFarmPlot",
        walkable: true,
        spaceAvailable: false,
        src: "./assets/plantedFarmPlot.jpg",
        base: null,
        options: []
    },
    pumpkinFarmPlot:{
        type: "pumpkinFarmPlot",
        walkable: true,
        spaceAvailable: false,
        src: "./assets/pumpkinFarmPlot.jpg",
        base: null,
        options: []
    },
    woodenFloor:{
        type: "woodenFloor",
        walkable: true,
        spaceAvailable: false,
        src: "./assets/wooden-floor.jpg",
        base: null,
        options: [{actionCode:"removeFloor",name:"remove floor", desc: "remove floor", singleTime: true}]
    },
    torchTile:{
        type: "torchTile",
        walkable: false,
        spaceAvailable: false,
        src: "./assets/torchTile.png",
        base: null,
        options: [{actionCode:"removeTorch",name:"Remove Torch", desc: "Remove torch", singleTime: true}]
    },
    campfireTile:{
        type: "campfireTile",
        walkable: false,
        spaceAvailable: false,
        src: "./assets/campfire.png",
        base: null,
        options: [{actionCode:"removeCampfire",name:"Destroy Campfire", desc: "Destroy Campfire", singleTime: true}]
    },
    gameEdge:{
        type: "gameEdge",
        walkable: false,
        spaceAvailable: false,
        src: "./assets/grass0.jpg",
        base: "",
        options: []
    }
}

export default _TILES