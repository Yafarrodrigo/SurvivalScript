import Controls from './Controls.js'
import Graphics from './Graphics.js'
import Map from './Map.js'
import Player from './Player.js'
import UI from './UI.js'
import ACTIONS from '../Actions.js'
import Tile from './Tile.js'
import Crafting from './Crafting.js'

class Game {
    width: number = 800
    height: number = 600
    graphics: Graphics
    map: Map
    player: Player
    controls: Controls
    crafting: Crafting
    cursorPos: {
        x: number,
        y: number
    }
    clock: ReturnType<typeof setInterval> | null
    internalClock: number
    ui: UI
    actions: {[key:string]: (game:Game) => void}
    lastClickedTile: Tile | null
    placingBuilding: boolean
    buildingToPlace: string | null
    time: number
    day: number
    timeOfDay: "dawn" | "day" | "dusk" | "night"
    clockRate: 5000 | 32 | 16 | 8 | 4 | 1
    rainData:{
        active: boolean
        dropsQty: number
        drops:{x: number, y:number}[]
        speed: number
    }
    snowData:{
        active: boolean
        dropsQty: number
        drops:{x: number, y:number}[]
        speed: number
    }
 
    constructor(){
        this.graphics = new Graphics(this, 1280,736)
        this.map = new Map(this, 6400, 3680)
        
        this.player = new Player(this)
        this.crafting = new Crafting(this)
        this.cursorPos = {x:0,y:0}
        this.lastClickedTile = null
        this.clock = null
        this.clockRate = 32
        this.internalClock = 0
        this.ui = new UI(this)
        this.controls = new Controls(this)
        this.placingBuilding = false
        this.buildingToPlace = null
        
        this.time = 12
        this.timeOfDay = "day"
        this.day = 0

        this.rainData = {
            active: true,
            dropsQty: 500,
            drops: [],
            speed: 15
        }

        for(let i = 0; i < this.rainData.dropsQty; i++){
            let rndYPos = (Math.floor(Math.random() * 1000))*(-1)
            const newDrop = {
                x: Math.floor(Math.random()*this.graphics.canvas.width),
                y: rndYPos
            }
            this.rainData.drops.push(newDrop)
        }

        this.snowData = {
            active: false,
            dropsQty: 250,
            drops: [],
            speed: 10
        }

        for(let i = 0; i < this.snowData.dropsQty; i++){
            let rndYPos = (Math.floor(Math.random() * 1250))*(-1)
            const newDrop = {
                x: Math.floor(Math.random()*this.graphics.canvas.width),
                y: rndYPos
            }
            this.snowData.drops.push(newDrop)
        }
        
        
        this.actions = ACTIONS
        this.graphics.update()
    }

    start(){
        this.clock = setInterval(() => {
            this.update()
        }, this.clockRate)
    }

    stop(){
        if(this.clock){
            clearInterval(this.clock)
            this.clock = null
        }
    }

    startRain(){
        this.rainData.active = true
    }

    stopRain(){
        this.rainData.active = false
    }

    torchFlicker(torch:{x?:number,y?:number,intensity:number,radius:number}){
        if(Math.random() > 0.33){
            if((torch.intensity + 0.35) > 1){
                torch.intensity = 1
            }else{
                torch.intensity += 0.35
            }
        }else{
            if((torch.intensity - 0.1) < 0.35){
                torch.intensity = 0.35
            }else{
                torch.intensity += 0.1
            }
        }

        if(Math.random() > 0.33){
            if((torch.radius + 1) > 150){
                torch.radius = 150
            }else{
                torch.radius += 1
            }
        }else{
            if((torch.radius - 1) < 140){
                torch.radius = 140
            }else{
                torch.radius -= 1
            }
        } 
    }

    campfireFlicker(campfire:{x?:number,y?:number,intensity:number,radius:number}){
        if(Math.random() > 0.33){
            if((campfire.intensity + 0.35) > 1){
                campfire.intensity = 1
            }else{
                campfire.intensity += 0.35
            }
        }else{
            if((campfire.intensity - 0.1) < 0.35){
                campfire.intensity = 0.35
            }else{
                campfire.intensity += 0.1
            }
        }

        if(Math.random() > 0.33){
            if((campfire.radius + 1) > 250){
                campfire.radius = 250
            }else{
                campfire.radius += 1
            }
        }else{
            if((campfire.radius - 1) < 240){
                campfire.radius = 240
            }else{
                campfire.radius -= 1
            }
        } 
    }

    update(){
        if(this.internalClock + 1 >= 300 ){
            this.internalClock = 0
            if(this.time + 1 > 23){
                this.time = 0
                this.day += 1

                // dia a dia
                this.player.allCrops.forEach(crop => {
    
                    if(!crop.planted) return

                    if(crop.days < 1){
                        crop.days += 1
                    }
                    else{
                        crop.grown = true
                        this.map.changeTile(crop.x,crop.y,"pumpkinFarmPlot")
                        this.player.allCrops = this.player.allCrops.filter( crop => crop.grown === false)
                    }
                })

            }else{
                this.time += 1
                console.log(`${this.time}:00`);
                
            }
        }
        else{
            this.internalClock += 1
        }
        
        if(this.time == 8) this.timeOfDay = 'dawn' 
        else if(this.time == 12) this.timeOfDay = 'day' 
        else if(this.time == 19) this.timeOfDay = 'dusk' 
        else if(this.time == 22) this.timeOfDay = 'night'

        // ** slow **
        //
        //
        this.player.allTorches.forEach(torch => this.torchFlicker(torch))
        this.player.allCampfires.forEach(campfire => this.campfireFlicker(campfire))
        this.torchFlicker(this.player.mainTorch)
        
        this.graphics.update()
    }
}

export default Game