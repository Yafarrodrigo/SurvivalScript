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
    }

    build(itemId:string, x:number, y:number){

        if(this.game.player.inventory.has(itemId, 1)){
            const oldTile = this.game.map.getTile(x,y)
            
            if(oldTile.spaceAvailable === true){
                if(itemId === "building_torch"){
                    if(oldTile.type === "grass"){
                        this.game.map.changeTile(x,y,"torchGrass")
                    }else{
                        this.game.map.changeTile(x,y,"torchSand")
                    }
                }
                else{
                    this.game.map.changeTile(x,y,_ITEMS[itemId].relatedTile!)
                }
                oldTile.spaceAvailable = false
                this.game.player.inventory.removeItem(itemId,1)

                if(_ITEMS[itemId].id === "building_torch"){
                    this.game.player.allTorches.push({x,y, radius:125, intensity: 0.75})
                }
            }
        }
        else{
            console.log("no hay item pa construir");
        }

        if(!this.game.player.inventory.has(itemId,1)){
            this.game.placingBuilding = false
            this.game.buildingToPlace = null
        }
    }
}

export default Crafting