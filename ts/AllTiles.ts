interface TilesDict {
    [key:string]: {
        type:string
        walkable:boolean
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
        options: [
            {actionCode:"fish",name:"fish", desc: "fishing", singleTime: false},
        ]
    },
    sand:{
        type: "sand",
        walkable: true,
        options: []
    },
    grass:{
        type: "grass",
        walkable: true,
        options: [
            {actionCode:"gatherSmallRocks",name:"gather small rocks", desc: "gathering small rocks from the ground", singleTime: false},
            {actionCode:"gatherRock",name:"gather rock", desc: "gathering rocks from the ground", singleTime: false},
            {actionCode:"gatherSticks",name:"gather small sticks", desc: "gathering sticks from the ground", singleTime: false},
            {actionCode:"gatherGrassFibers",name:"gather grass fibers", desc: "gathering grass fibers from the ground", singleTime: false},
            {actionCode:"gatherWorms",name:"gather worms", desc: "gathering worms from the ground", singleTime: false}
        ]
    },
    trees:{
        type: "trees",
        walkable: false,
        options: [
            {actionCode:"gatherLongStick",name:"gather long stick", desc: "gathering a long stick from trees", singleTime: false},
            {actionCode:"chopDownTree",name:"chop tree down", desc: "chops the tree", singleTime: true}
        ]
    },
    woodenFloor:{
        type: "woodenFloor",
        walkable: true,
        options: []
    },
    torchTile:{
        type: "torchTile",
        walkable: false,
        options: []
    },
    gameEdge:{
        type: "gameEdge",
        walkable: false,
        options: []
    }
}

export default _TILES