import _ITEMS from "../AllItems.js"
import Game from "./Game.js"
import Item from "./Item.js"
import { equipmentSlots } from "./Player.js"

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
        const { player } = this.game
        if(this.items[itemId]){
            this.items[itemId].qty -= qty
            this.items[itemId].weight = this.items[itemId].qty * _ITEMS[itemId].weight
            player.carryWeight = this.getWeight()
            if(this.items[itemId].qty <= 0){
                delete this.items[itemId]

                for(let slot in player.equipment){
                    const itemInSlot = player.equipment[slot as equipmentSlots]
                    if( itemInSlot !== null && itemInSlot.id === itemId){
                        player.removeEquipment(slot as equipmentSlots)
                    }
                }
   
            }
        }

        if(this.game.ui){
            this.game.ui.update()
        }
    }

    removeAll(itemId:string){
        if(!this.has(itemId, 1)) return

        while(this.items[itemId] && this.items[itemId].qty > 0){
            if(this.has(itemId, 1)){
                this.removeItem(itemId, 1)
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