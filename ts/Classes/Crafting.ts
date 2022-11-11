import _ITEMS from "../AllItems.js";
import Game from "./Game.js";

class Crafting{

    game:Game

    constructor(game: Game){
        this.game = game
    }

    matCheck(itemId: string){
        if(!_ITEMS[itemId]){
            console.log("no existe ese item")
            return
        }
        if(!_ITEMS[itemId].reqMats.length) return true

        let fails:number = 0
        _ITEMS[itemId].reqMats.forEach( req => {
            if(!this.game.player.inventory.has(req.id, req.qty)){
                fails++
            }
        })
        
        if(fails > 0){
            return false
        }
        else return true
    }

    craft(itemId:string){
        if(!this.matCheck(itemId)) return

        this.game.player.inventory.addItem(itemId, 1)
        _ITEMS[itemId].reqMats.forEach( req => {
            this.game.player.inventory.removeItem(req.id, req.qty)
        })
        this.game.graphics.drawGatherInfo(this.game.player.position.x, this.game.player.position.y, `+1 ${_ITEMS[itemId].name}`);
        this.game.player.inventory.update()
    }
}

export default Crafting