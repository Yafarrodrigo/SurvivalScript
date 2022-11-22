import _ITEMS from "../AllItems.js"
import Game from "./Game.js"

class Graphics{
    game: Game
    width: number
    height: number
    tileSize: 25 | 40 | 50
    offsetX: number
    offsetY: number
    tilesPerRow: number
    tilesPerColumn: number
    fullMap: boolean
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    canvasFx: HTMLCanvasElement
    ctxFx: CanvasRenderingContext2D
    grassImg: HTMLImageElement
    waterImg: HTMLImageElement
    sandImg: HTMLImageElement
    treesImg: HTMLImageElement
    playerImg: HTMLImageElement
    woodenFloorImg: HTMLImageElement
    messages: {x:number,y:number, text:string, timer:number, alpha:number}[]
    errors: {x:number,y:number, text:string, timer:number, alpha:number}[]

    debugTilePositions: boolean

    constructor(game: Game, width: number, height: number){
        this.game = game
        this.width = width
        this.height = height
        this.tileSize = 25
        this.tilesPerRow = this.width / this.tileSize
        this.tilesPerColumn = this.height / this.tileSize

        this.offsetX = 0
        this.offsetY = 0

        this.fullMap = false

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
        this.woodenFloorImg = new Image()
        this.woodenFloorImg.src = "./assets/wooden-floor.png"

        const newCanvas = document.createElement('canvas')
        this.canvas = newCanvas
        this.ctx = newCanvas.getContext('2d')!
        const newCanvasFx = document.createElement('canvas')
        this.canvasFx = newCanvasFx
        this.ctxFx = newCanvasFx.getContext('2d')!

        this.messages = []
        this.errors = []
        
        this.debugTilePositions = false
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
            const X = (tile.x - this.offsetX) * this.tileSize
            const Y = (tile.y - this.offsetY) * this.tileSize
            if(X < 0 || X > this.width || Y < 0 || Y > this.height) return
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
                case "woodenFloor":{
                    img = this.woodenFloorImg
                    break
                }
                default: img = this.grassImg
            }
            tile.visible = true
            this.ctx.drawImage(img,X,Y,this.tileSize,this.tileSize)
            if(this.debugTilePositions){
                this.ctxFx.font = "10px Arial";
                this.ctxFx.fillStyle = `black`
                this.ctxFx.fillText(`x${tile.x}`, X+7, Y+10);
                this.ctxFx.fillText(`y${tile.y}`, X+7, Y+20);
            }
        })
    }

    drawFullMap(){
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0,0,this.width,this.height)
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

            this.ctx.drawImage(img,(tile.x * 6)+12,(tile.y * 6)+12, 6, 6)
        })
    }

    drawPlayer(){
        const {x,y} = this.game.player.position
        this.ctx.drawImage(
        this.playerImg, (x-this.offsetX) * this.tileSize, (y-this.offsetY )* this.tileSize, this.tileSize, this.tileSize)
    }

    drawPlayerInFullMap(){
        const {x,y} = this.game.player.position

        this.ctx.drawImage(
        this.playerImg, x * 6, y * 6, this.tileSize, this.tileSize)
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

    error(text:string){
        /* this.errors.push({x: 750,y: 100,text,timer:85,alpha:1}) */
        this.errors.push({x:this.game.player.position.x*this.tileSize,y: (this.game.player.position.y*this.tileSize) - 15,text,timer:75,alpha:0.75})
    }

    drawErrors(){
        this.errors.forEach( error => {
            if(error.timer <= 0){
                this.errors = this.errors.filter( error => error.timer >= 0)
                return
            }else{
                error.timer--
                error.y -= 1
                if(error.timer < 30){
                    error.alpha -= 0.05
                }
            }

            let txtWidth = this.ctxFx.measureText(error.text).width
            this.ctxFx.fillStyle = `rgb(255,50,50,${error.alpha})`
            this.roundRect(this.ctxFx, error.x - txtWidth/3 - 10, error.y-25, txtWidth+25, 32)
            this.ctxFx.font = "20px Arial";
            this.ctxFx.fillStyle = `rgb(255,255,255,${error.alpha})`
            this.ctxFx.fillText(error.text, error.x - txtWidth/3, error.y); 
        })
    }

    showBuildingToPlace(){
        const cursorPos = this.game.cursorPos
        const x = cursorPos.x + this.game.graphics.offsetX
        const y = cursorPos.y + this.game.graphics.offsetY

        const pX = this.game.player.position.x
        const pY = this.game.player.position.y

        if(x >= pX-2 && x <= pX+2 && y >= pY-2 && y <= pY+2 && this.game.map.getTile(x,y).type !== "woodenFloor"){
            this.ctx.drawImage(this.woodenFloorImg ,cursorPos.x * this.tileSize,cursorPos.y * this.tileSize,this.tileSize,this.tileSize)
        }else{
            this.ctx.drawImage(this.woodenFloorImg ,cursorPos.x * this.tileSize,cursorPos.y * this.tileSize,this.tileSize,this.tileSize)
            this.ctx.fillStyle = "rgba(255,0,0,0.5)"
            this.ctx.fillRect(cursorPos.x * this.tileSize,cursorPos.y * this.tileSize,this.tileSize,this.tileSize)
        }
    }

    roundRect(ctx:CanvasRenderingContext2D ,x: number,y: number,width: number,height: number,r:number = 5) {
        const radius = {tl: r, tr: r, br: r, bl: r};
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();

        ctx.fill();
      }

    update(){
        this.ctxFx.clearRect(0,0,this.width,this.height)
        if(this.fullMap === true){
            this.drawFullMap()
            this.drawPlayerInFullMap()
        }
        else{
            this.drawMap()
            this.drawPlayer()
            this.drawTileHover()
            this.drawMessages()
            this.drawErrors()
            if(this.game.placingBuilding){
                this.showBuildingToPlace()
            }
        }
        
        
    }
}

export default Graphics