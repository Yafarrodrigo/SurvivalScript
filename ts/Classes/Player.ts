import Game from "./Game.js"
import Inventory from "./Inventory.js"

class Player{

    game: Game
    position: {
        x:number,
        y:number
    }
    options:{actionCode: string,name:string,desc: string}[]
    inventory: Inventory

    constructor(game: Game){
        this.game = game
        let startingPos = {
            x: Math.floor(Math.random()*game.graphics.tilesPerRow),
            y: Math.floor(Math.random()*game.graphics.tilesPerColumn)
        }
        while(this.game.map.getTile(startingPos.x,startingPos.y).walkable !== true){
            startingPos = {
                x: Math.floor(Math.random()*game.graphics.tilesPerRow),
                y: Math.floor(Math.random()*game.graphics.tilesPerColumn)
            }
        }
        this.position = startingPos
        this.options = [
            {actionCode: "wait",name:"wait", desc: "waiting"},
            {actionCode: "sit",name:"sit", desc: "siting"},
            {actionCode: "startCampfire",name:"start campfire", desc: "starting camfire"}
        ]
        this.inventory = new Inventory(this.game)
    }

    move(dir: "up" | "down" | "left" | "right"){
        switch(dir){
            case "up":{
                if(this.game.map.getTile(this.position.x,this.position.y-1).walkable === true){
                    this.position.y -= 1
                }
                break
            }
            case "down":{
                if(this.game.map.getTile(this.position.x,this.position.y+1).walkable === true){
                    this.position.y += 1
                }
                break
            }
            case "left":{
                if(this.game.map.getTile(this.position.x-1,this.position.y).walkable === true){
                    this.position.x -= 1
                }
                break
            }
            case "right":{
                if(this.game.map.getTile(this.position.x+1,this.position.y).walkable === true){
                    this.position.x += 1
                }
                break
            }
            default: return
        }
    }
}

export default Player