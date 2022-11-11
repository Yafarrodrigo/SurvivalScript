import _ITEMS from "../AllItems.js"

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

    addItem(itemId:string, qty: number){
        if(_ITEMS[itemId]){
            this.items.hasOwnProperty(itemId) ? this.items[itemId].qty += qty : this.items[itemId] = {..._ITEMS[itemId], qty: 1}
        }
        else{
            console.log("no existe el item!");
        }
    }

    getItems(){
        return this.items
    }

    removeItem(itemId:string, qty: number){
        if(this.items[itemId]){
            this.items[itemId].qty -= qty
            if(this.items[itemId].qty <= 0){
                delete this.items[itemId]
            }
        }
    }

    has(itemId:string, qty:number){
        if(!this.items.hasOwnProperty(itemId)) return false
        if(this.items[itemId].qty >= qty) return true
        else return false
    }

    update(){
        const itemList = document.getElementById('itemList')!
        itemList.innerHTML = ""
        for(let item in this.items){
            const newLi = document.createElement('li')
            newLi.textContent = `${this.items[item].name}, ${this.items[item].qty}`
            itemList.append(newLi)
        }
        console.log(this.items);
        
    }
}

export default Inventory