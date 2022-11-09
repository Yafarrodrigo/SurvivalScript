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

    constructor(id:number, type:string, color:string, x:number, y:number, options:{actionCode: string,name:string,desc: string}[]){
        this.id = id
        this.type = type
        this.color = color
        this.x = x
        this.y = y
        this.options = options
    }
}

export default Tile