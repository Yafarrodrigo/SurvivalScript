import Controls from './Controls.js'
import Graphics from './Graphics.js'
import Map from './Map.js'
import Player from './Player.js'
import UI from './UI.js'
import ACTIONS from '../Actions.js'
import Tile from './Tile.js'
import Crafting from './Crafting.js'
import Weather from './Weather.js'

class Game {
    width: number = 800
    height: number = 600
    graphics: Graphics
    map: Map
    player: Player
    controls: Controls
    crafting: Crafting
    weather: Weather
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
    
 
    constructor(){
        this.graphics = new Graphics(this, 1280,736)
        this.map = new Map(this, 6400, 3680)
        
        this.player = new Player(this)
        this.crafting = new Crafting(this)
        this.weather = new Weather(this)
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

    update(){
        // CADA HORA
        if(this.internalClock + 1 >= 300 ){
            
            if(this.weather.rainData.active){
                if(Math.random() > 0.80){
                    this.weather.stopRain()
                    console.log("stop raining",this.time);
                }
            }else{
                if(Math.random() > 0.9725){
                    this.weather.startRain()
                    console.log("start raining",this.time);
                    
                }
            }
            
            this.internalClock = 0
            if(this.time + 1 > 23){
                this.time = 0
                this.day += 1
                console.log(this.day);
                
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
            }
        }
        else{
            this.internalClock += 1
        }
        
        if(this.time == 8) this.timeOfDay = 'dawn' 
        else if(this.time == 12) this.timeOfDay = 'day' 
        else if(this.time == 19) this.timeOfDay = 'dusk' 
        else if(this.time == 22) this.timeOfDay = 'night'

        this.player.allTorches.forEach(torch => this.graphics.torchFlicker(torch))
        this.player.allCampfires.forEach(campfire => this.graphics.campfireFlicker(campfire))
        this.graphics.torchFlicker(this.player.mainTorch)
        
        this.graphics.update()
    }
}

export default Game