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
    ui: UI
    actions: {[key:string]: (game:Game,desc:string) => void}
    lastClickedTile: Tile | null

    constructor(){
        this.graphics = new Graphics(this, 800,600)
        this.map = new Map(this.graphics.tilesPerColumn, this.graphics.tilesPerRow)
        this.player = new Player(this)
        this.controls = new Controls(this)
        this.crafting = new Crafting(this)
        this.cursorPos = {x:0,y:0}
        this.lastClickedTile = null
        this.clock = null
        this.ui = new UI(this)

        this.actions = ACTIONS
        this.graphics.update()
    }

    start(){
        this.clock = setInterval(() => {
            this.update()
        }, 32)
    }

    stop(){
        if(this.clock){
            clearInterval(this.clock)
            this.clock = null
        }
    }

    update(){
        this.graphics.update()
    }
}

export default Game