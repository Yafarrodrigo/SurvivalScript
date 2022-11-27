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
    torchInHand: boolean

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
        this.torchInHand = true
    }

    move(dir: "up" | "down" | "left" | "right"){

        if(this.game.graphics.fullMap) return

        const x = this.position.x
        const y = this.position.y
       
        switch(dir){
            case "up":{
                if(this.game.map.getTile(x,y-1).walkable === true){
                    this.position.y -= 1
                    if( y - this.game.graphics.offsetY <= 7 ){
                        this.game.graphics.offsetY -= 1
                        if(this.game.graphics.offsetY <= 0){
                            this.game.graphics.offsetY = 0
                        }
                    }
                }
                break
            }
            case "down":{
                if(this.game.map.getTile(x,y+1).walkable === true){
                    this.position.y += 1
                    if( (y - this.game.graphics.offsetY) >= (this.game.graphics.tilesPerColumn - 7)){
                        this.game.graphics.offsetY += 1
                        
                        if(this.game.graphics.offsetY >= (this.game.map.tilesPerColumn)){
                            this.game.graphics.offsetY = this.game.map.tilesPerColumn
                        }
                    }
                }
                break
            }
            case "left":{
                if(this.game.map.getTile(x-1,y).walkable === true){
                    this.position.x -= 1
                    if( x - this.game.graphics.offsetX <= 7){
                        this.game.graphics.offsetX -= 1
                        if(this.game.graphics.offsetX <= 0){
                            this.game.graphics.offsetX = 0
                        }
                    }          
                }
                break
            }
            case "right":{
                if(this.game.map.getTile(x+1,y).walkable === true){
                    this.position.x += 1
                    if( (x - this.game.graphics.offsetX) >= (this.game.graphics.tilesPerRow - 7)){
                        this.game.graphics.offsetX += 1
                        if(this.game.graphics.offsetX >= (this.game.map.tilesPerRow)){
                            this.game.graphics.offsetX = this.game.map.tilesPerRow
                        }
                    }
                }
                break
            }
            default: return
        }
    }
}

export default Player