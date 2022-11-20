interface TilesDict {
    [key:string]: {
        type:string,
        color:string,
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
        color: "MediumTurquoise",
        walkable: false,
        options: [
            {actionCode:"fish",name:"fish", desc: "fishing"},
        ]
    },
    sand:{
        type: "sand",
        color: "khaki",
        walkable: true,
        options: []
    },
    grass:{
        type: "grass",
        color: "MediumSeaGreen",
        walkable: true,
        options: [
            {actionCode:"gatherSmallRocks",name:"gather small rocks", desc: "gathering small rocks from the ground"},
            {actionCode:"gatherSticks",name:"gather small sticks", desc: "gathering sticks from the ground"},
            {actionCode:"gatherGrassFibers",name:"gather grass fibers", desc: "gathering grass fibers from the ground"},
            {actionCode:"gatherWorms",name:"gather worms", desc: "gathering worms from the ground"}
        ]
    },
    trees:{
        type: "trees",
        color: "ForestGreen",
        walkable: false,
        options: [
            {actionCode:"gatherLongStick",name:"gather long stick", desc: "gathering a long stick from trees"}
        ]
    }
}

export default _TILES