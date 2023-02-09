import _TILES from "../AllTiles.js"

class Tile{

    type: string
    base: string | null
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
    spaceAvailable: boolean
    rotated: 0 | 90 | 180 | 270

    constructor(type:string, x:number, y:number, base?:string|null, rotated?:0|90|180|270){
        this.type = type
        this.x = x
        this.y = y
        this.options = _TILES[type].options
        this.walkable = _TILES[type].walkable
        this.spaceAvailable = _TILES[type].spaceAvailable
        this.visible = false
        this.unknown = true
        this.base = base || null
        this.rotated = rotated || 0
    }
}

export default Tile