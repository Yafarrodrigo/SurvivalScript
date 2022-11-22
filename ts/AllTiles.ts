interface TilesDict {
    [key:string]: {
        type:string,
        walkable:boolean,
        options:{
            actionCode:string,
            name:string,
            desc:string
        }[]
    }
}

const _TILES: TilesDict = {

    water:{
        type: "water",
        walkable: false,
        options: [
            {actionCode:"fish",name:"fish", desc: "fishing"},
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
            {actionCode:"gatherSmallRocks",name:"gather small rocks", desc: "gathering small rocks from the ground"},
            {actionCode:"gatherRock",name:"gather rock", desc: "gathering rocks from the ground"},
            {actionCode:"gatherSticks",name:"gather small sticks", desc: "gathering sticks from the ground"},
            {actionCode:"gatherGrassFibers",name:"gather grass fibers", desc: "gathering grass fibers from the ground"},
            {actionCode:"gatherWorms",name:"gather worms", desc: "gathering worms from the ground"}
        ]
    },
    trees:{
        type: "trees",
        walkable: false,
        options: [
            {actionCode:"gatherLongStick",name:"gather long stick", desc: "gathering a long stick from trees"},
            {actionCode:"chopDownTree",name:"chop tree down", desc: "chops the tree"}
        ]
    },
    woodenFloor:{
        type: "woodenFloor",
        walkable: true,
        options: []
    },
    gameEdge:{
        type: "gameEdge",
        walkable: false,
        options: []
    }
}

export default _TILES