class Tile{

    id: number
    type: string
    color: string
    x: number
    y: number

    constructor(id:number, type:string, color:string, x:number, y:number){
        this.id = id
        this.type = type
        this.color = color
        this.x = x
        this.y = y
    }
}

export default Tile