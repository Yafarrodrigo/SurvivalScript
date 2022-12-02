interface TilesDict {
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
        options: []
    },
    seashells:{
        type: "seashells",
        walkable: true,
        spaceAvailable: true,
        src: "./assets/seashells.jpg",
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
    woodenFloor:{
        type: "woodenFloor",
        walkable: true,
        spaceAvailable: false,
        src: "./assets/wooden-floor.jpg",
        base: null,
        options: []
    },
    torchGrass:{
        type: "torchTile",
        walkable: false,
        spaceAvailable: false,
        src: "./assets/torch_grass.jpg",
        base: null,
        options: []
    },
    torchSand:{
        type: "torchTile",
        walkable: false,
        spaceAvailable: false,
        src: "./assets/torch_sand.jpg",
        base: null,
        options: []
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