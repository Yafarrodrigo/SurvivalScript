import _ITEMS from "../AllItems.js"
import Game from "./Game.js"
import Item from "./Item.js"

class Inventory{

    game:Game
    items:{
        [key:string]: Item
    }

    constructor(game:Game){
        this.game = game
        this.items = {}
    }

    addItem(itemId:string, qty: number){
        if(_ITEMS[itemId]){
            this.items.hasOwnProperty(itemId) ? this.items[itemId].qty += qty : this.items[itemId] = new Item(itemId,qty)
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
        this.game.ui.update()
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
        this.game.ui.update()
    }
}

export default Inventory