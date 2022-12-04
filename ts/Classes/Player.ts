import ACTIONS from "../Actions.js"
import Game from "./Game.js"
import Inventory from "./Inventory.js"

class Player{

    game: Game
    position: {
        x:number,
        y:number
    }
    options:{actionCode: string,name:string,desc: string, singleTime: boolean}[]
    inventory: Inventory
    torchInHand: boolean
    mainTorch: {
        radius:number
        intensity:number
    }
    gathering: boolean
    doingAction: string | null
    gatheringClock: ReturnType<typeof setInterval> | null
    allTorches: {
        x:number
        y:number
        radius:number
        intensity: number
    }[]
    allCrops: {
        x:number
        y:number
        days:number
        type: string
        grown: boolean
        planted: boolean
    }[]

    constructor(game: Game){
        this.game = game
        this.position = this.randomStartPos(game)
        
        this.options = [
            {actionCode: "wait",name:"wait", desc: "waiting", singleTime: true},
            {actionCode: "sit",name:"sit", desc: "siting", singleTime: true},
            {actionCode: "startCampfire",name:"start campfire", desc: "starting camfire", singleTime: true}
        ]
        this.inventory = new Inventory(this.game)
        this.inventory.addItem("building_torch",5)
        this.inventory.addItem("building_wooden_floor",5)
        this.inventory.addItem("building_farmPlot",5)
        this.torchInHand = false
        this.mainTorch = {radius:140,intensity:1}
        this.gathering = false
        this.doingAction = null
        this.gatheringClock = null
        this.allTorches = []
        this.allCrops = []
    }

    startGathering(action:string){
        if(this.doingAction === null){
            this.gathering = true
            this.doingAction = action

            this.game.actions[this.doingAction](this.game)

            this.gatheringClock = setInterval(()=>{
                if(this.doingAction !== null){
                    this.game.actions[this.doingAction](this.game)
                }
                else{
                    if(this.gatheringClock){
                        clearInterval(this.gatheringClock)
                    }
                }
            },1000)
        }
    }

    stopGathering(){
        if(this.doingAction !== null){
            this.gathering = false
            this.doingAction = null
            if(this.gatheringClock !== null){
                clearInterval(this.gatheringClock)
            }
        }
    }

    randomStartPos(game: Game){
        let startingPos = {
            x: Math.floor(Math.random() * game.graphics.tilesPerRow),
            y: Math.floor(Math.random() * game.graphics.tilesPerColumn)
        }

        while(this.game.map.getTile(startingPos.x,startingPos.y).walkable !== true){
            startingPos = {
                x: Math.floor(Math.random() * game.graphics.tilesPerRow),
                y: Math.floor(Math.random() * game.graphics.tilesPerColumn)
            }
        }

        return startingPos
    }

    move(dir: "up" | "down" | "left" | "right"){

        if(this.game.graphics.fullMap) return

        this.game.player.stopGathering()

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
                        if(this.game.graphics.offsetY < this.game.map.tilesPerColumn - this.game.graphics.tilesPerColumn){
                            this.game.graphics.offsetY += 1
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
                        if(this.game.graphics.offsetX < this.game.map.tilesPerRow - this.game.graphics.tilesPerRow){
                            this.game.graphics.offsetX += 1
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