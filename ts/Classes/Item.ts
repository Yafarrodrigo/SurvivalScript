import _ITEMS from "../AllItems.js"

class Item {

    id:string
    type: "material" | "consumible" | "tool"
    name:string
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

    constructor(itemId:string, qty:number){
        this.id = itemId
        this.type = _ITEMS[itemId].type
        this.name = _ITEMS[itemId].name
        this.reqMats =  _ITEMS[itemId].reqMats
        this.reqCons =  _ITEMS[itemId].reqCons
        this.qty =  qty
        this.crafted = _ITEMS[itemId].crafted
    }
}

export default Item