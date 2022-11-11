import _TILES from "../AllTiles.js"

class Tile{

    id: number
    type: string
    color: string
    x: number
    y: number
    options: {
        actionCode: string,
        name: string
        desc: string
    }[]
    walkable: boolean

    constructor(type:string, x:number, y:number){
        this.id = Math.floor(Math.random()*10000)
        this.type = type
        this.color = _TILES[type].color
        this.x = x
        this.y = y
        this.options = _TILES[type].options
        this.walkable = _TILES[type].walkable
    }
}

export default Tile