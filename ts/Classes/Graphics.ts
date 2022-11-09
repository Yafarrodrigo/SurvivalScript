import Game from "./Game.js"

class Graphics{
    game: Game
    width: number
    height: number
    tileSize: 25 | 40 | 50
    tilesPerRow: number
    tilesPerColumn: number
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    constructor(game: Game, width: number, height: number){
        this.game = game
        this.width = width
        this.height = height
        this.tileSize = 40
        this.tilesPerRow = this.width / this.tileSize
        this.tilesPerColumn = this.height / this.tileSize

        const newCanvas = document.createElement('canvas')
        this.canvas = newCanvas
        this.ctx = newCanvas.getContext('2d')!

        this.init()
    }
    
    init(){
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.canvas.id = 'game-canvas'
        document.body.append(this.canvas)

        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0,0,this.width,this.height)
    }

    drawMap(){
        this.game.map.tiles.forEach( tile => {
            this.ctx.fillStyle = tile.color,
            this.ctx.fillRect(
                tile.x * this.tileSize,
                tile.y * this.tileSize,
                this.tileSize-1,
                this.tileSize-1
            )
        })
    }

    drawPlayer(){
        const {x,y} = this.game.player.position

        this.ctx.fillStyle = "purple",
        this.ctx.fillRect(
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize-1,
            this.tileSize-1
        )
    }

    drawTileHover(){
        this.ctx.fillStyle = "#aaaaaa55",
        this.ctx.fillRect(
            this.game.cursorPos.x * this.tileSize,
            this.game.cursorPos.y * this.tileSize,
            this.tileSize-1,
            this.tileSize-1
        )
    }

    update(){
        this.drawMap()
        this.drawPlayer()
        this.drawTileHover()
    }
}

export default Graphics