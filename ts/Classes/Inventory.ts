class Inventory{
    
    items:{
        [key:string]: {
            name:string,
            qty:number
        }
    }

    constructor(){
        this.items = {}
    }

    addItem(itemName:string, qty: number){
        this.items.hasOwnProperty(itemName) ? this.items[itemName].qty += qty : this.items[itemName] = {name: itemName, qty:qty}
    }

    removeItem(itemName:string, qty: number){
        if(this.items[itemName]){
            this.items[itemName].qty -= qty
            if(this.items[itemName].qty <= 0){
                delete this.items[itemName]
            }
        }
    }
}

export default Inventory