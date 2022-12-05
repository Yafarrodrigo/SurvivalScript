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

    numberOfCrafts(itemId:string):number{
        const {inventory} = this.game.player

        let possibleResults:number[] = []
        _ITEMS[itemId].reqMats.forEach( req => {
            if(inventory.has(req.id, req.qty)){
                let qty = Math.floor((inventory.items[req.id].qty / req.qty)) 
                possibleResults.push(qty)
            }else{
                possibleResults.push(0)
            }
        })
        
        const result = Math.min(...possibleResults) || 0

        return result
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
                    this.game.map.changeTile(x,y,"torchTile",oldTile.type)
                    this.game.player.allTorches.push({x,y, radius:125, intensity: 0.75})
                }
                else if(itemId === "building_farmPlot"){
                    this.game.map.changeTile(x,y,_ITEMS[itemId].relatedTile!, oldTile.type)
                    this.game.player.allCrops.push({x,y, days:0, type:"pumpkins", grown: false, planted: false})
                }
                else{
                    this.game.map.changeTile(x,y,_ITEMS[itemId].relatedTile!, oldTile.type)
                }
                oldTile.spaceAvailable = false
                this.game.player.inventory.removeItem(itemId,1)
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