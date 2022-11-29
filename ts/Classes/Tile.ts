import _TILES from "../AllTiles.js"

class Tile{

    type: string
    x: number
    y: number
    options: {
        actionCode: string,
        name: string
        desc: string
        singleTime: boolean
    }[]
    walkable: boolean
    visible: boolean
    unknown: boolean

    constructor(type:string, x:number, y:number){
        this.type = type
        this.x = x
        this.y = y
        this.options = _TILES[type].options
        this.walkable = _TILES[type].walkable
        this.visible = false
        this.unknown = true
    }
}

export default Tile