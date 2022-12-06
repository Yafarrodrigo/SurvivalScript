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
            if(this.items.hasOwnProperty(itemId)){
                this.items[itemId].qty += qty
                this.items[itemId].weight = this.items[itemId].qty * _ITEMS[itemId].weight
                this.game.player.carryWeight = this.getWeight()
            }
            else{
                this.items[itemId] = new Item(itemId,qty)
            }
        }
        else{
            console.log("no existe el item!");
        }
        if(this.game.ui){
            this.game.ui.update()
        }
    }

    getItems(){
        return this.items
    }

    getWeight(){
        let result = 0
        for(let item in this.items){
            result += this.items[item].weight
        }
        return result
    }

    removeItem(itemId:string, qty: number){
        if(this.items[itemId]){
            this.items[itemId].qty -= qty
            this.items[itemId].weight = this.items[itemId].qty * _ITEMS[itemId].weight
            this.game.player.carryWeight = this.getWeight()
            if(this.items[itemId].qty <= 0){
                delete this.items[itemId]
            }
        }
        if(this.game.ui){
            this.game.ui.update()
        }
    }

    has(itemId:string, qty:number){
        if(!this.items.hasOwnProperty(itemId)) return false
        if(this.items[itemId].qty >= qty) return true
        else return false
    }
}

export default Inventory