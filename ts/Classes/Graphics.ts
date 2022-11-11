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
    canvasFx: HTMLCanvasElement
    ctxFx: CanvasRenderingContext2D
    grassImg: HTMLImageElement
    waterImg: HTMLImageElement
    sandImg: HTMLImageElement
    treesImg: HTMLImageElement
    playerImg: HTMLImageElement
    messages: {x:number,y:number, text:string, timer:number, alpha:number}[]

    constructor(game: Game, width: number, height: number){
        this.game = game
        this.width = width
        this.height = height
        this.tileSize = 25
        this.tilesPerRow = this.width / this.tileSize
        this.tilesPerColumn = this.height / this.tileSize

        this.grassImg = new Image()
        this.grassImg.src = "./assets/grass0.jpg"
        this.treesImg = new Image()
        this.treesImg.src = "./assets/trees.jpg"
        this.waterImg = new Image()
        this.waterImg.src = "./assets/water.jpg"
        this.sandImg = new Image()
        this.sandImg.src = "./assets/sand.jpg"
        this.playerImg = new Image()
        this.playerImg.src = "./assets/player.png"

        const newCanvas = document.createElement('canvas')
        this.canvas = newCanvas
        this.ctx = newCanvas.getContext('2d')!
        const newCanvasFx = document.createElement('canvas')
        this.canvasFx = newCanvasFx
        this.ctxFx = newCanvasFx.getContext('2d')!

        this.messages = []

        this.init()
    }
    
    init(){
        this.canvas.width = this.width
        this.canvasFx.width = this.width
        this.canvas.height = this.height
        this.canvasFx.height = this.height
        this.canvas.id = 'game-canvas'
        this.canvasFx.id = 'game-canvas-fx'
        document.getElementById("game-container")!.append(this.canvas)
        document.getElementById("game-container")!.append(this.canvasFx)

        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0,0,this.width,this.height)
    }

    drawMap(){
        this.game.map.tiles.forEach( tile => {
            let img
            switch(tile.type){
                case "grass":{
                    img = this.grassImg
                    break
                }
                case "sand":{
                    img = this.sandImg
                    break
                }
                case "water":{
                    img = this.waterImg
                    break
                }
                case "trees":{
                    img = this.treesImg
                    break
                }
                default: img = this.grassImg
            }

            this.ctx.drawImage(img,tile.x * this.tileSize,tile.y * this.tileSize,this.tileSize,this.tileSize)
        })
    }

    drawPlayer(){
        const {x,y} = this.game.player.position

        this.ctx.drawImage(
        this.playerImg, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
    }

    drawTileHover(){
        this.ctx.fillStyle = "#aaaaaa55",
        this.ctx.fillRect(
            this.game.cursorPos.x * this.tileSize,
            this.game.cursorPos.y * this.tileSize,
            this.tileSize,
            this.tileSize
        )
    }

    drawGatherInfo(x:number,y:number, text:string){
        this.messages.push({x:x*this.tileSize,y: y*this.tileSize,text,timer:20,alpha:1})
    }

    drawMessages(){
        this.messages.forEach( msg => {
            if(msg.timer <= 0){
                this.messages = this.messages.filter( msg => msg.timer >= 0)
                return
            }else{
                msg.timer--
                msg.y -= 1
                if(msg.timer < 10){
                    msg.alpha -= 0.05
                }
            }
            this.ctxFx.font = "20px Arial";
            this.ctxFx.fillStyle = `rgb(255,255,255,${msg.alpha})`
            let txtWidth = this.ctxFx.measureText(msg.text).width
            this.ctxFx.fillText(msg.text, msg.x - txtWidth/3, msg.y); 
        })
    }

    update(){
        this.ctxFx.clearRect(0,0,this.width,this.height)
        this.drawMap()
        this.drawPlayer()
        this.drawTileHover()
        this.drawMessages()
    }
}

export default Graphics