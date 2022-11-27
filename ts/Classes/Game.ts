import Controls from './Controls.js'
import Graphics from './Graphics.js'
import Map from './Map.js'
import Player from './Player.js'
import UI from './UI.js'
import ACTIONS from '../Actions.js'
import Tile from './Tile.js'
import Crafting from './Crafting.js'
import Item from './Item.js'

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
    actions: {[key:string]: (game:Game,desc:string) => void}
    lastClickedTile: Tile | null
    placingBuilding: boolean
    buildingToPlace: string | null
    time: number
    timeOfDay: "dawn" | "day" | "dusk" | "night"
    clockRate: 32 | 16 | 8 | 4 | 1
 
    constructor(){
        this.graphics = new Graphics(this, 800,600)
        this.map = new Map(this, 3200, 2400)
        this.player = new Player(this)
        this.controls = new Controls(this)
        this.crafting = new Crafting(this)
        this.cursorPos = {x:0,y:0}
        this.lastClickedTile = null
        this.clock = null
        this.clockRate = 32
        this.internalClock = 0
        this.ui = new UI(this)
        this.placingBuilding = false
        this.buildingToPlace = null

        this.time = 12
        this.timeOfDay = "day"

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
        if(this.internalClock + 1 >= 300 ){
            this.internalClock = 0
            if(this.time + 1 > 23){
                this.time = 0
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
        
        this.graphics.update()
    }
}

export default Game