import _ITEMS from "../AllItems.js"

class Item {

    id:string
    type: "material" | "consumible" | "tool" | "building"
    name:string
    desc:string
    reqMats: {
        id: string
        qty: number
    }[]
    reqCons: {
        id: string
        qty: number
    }[]
    qty: number
    crafted: boolean
    icon:string
    relatedTile: string | null
    weight: number
    options: {
        actionCode: string,
        name: string
        desc: string
        singleTime: boolean
    }[]

    constructor(itemId:string, qty:number){
        this.id = itemId
        this.type = _ITEMS[itemId].type
        this.name = _ITEMS[itemId].name
        this.desc = _ITEMS[itemId].desc
        this.reqMats =  _ITEMS[itemId].reqMats
        this.reqCons =  _ITEMS[itemId].reqCons
        this.qty =  qty
        this.crafted = _ITEMS[itemId].crafted
        this.icon = _ITEMS[itemId].icon
        this.relatedTile = _ITEMS[itemId].relatedTile
        this.weight = _ITEMS[itemId].weight
        this.options = _ITEMS[itemId].options
    }
}

export default Item