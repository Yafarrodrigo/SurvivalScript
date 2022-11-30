import _ITEMS from "../AllItems.js"
import Game from "./Game.js"

class Graphics{
    game: Game
    width: number
    height: number
    tileSize: number
    mapTileSize: number
    tilesPerRow: number
    offsetY: number
    offsetX: number
    fullMapOffsetX: number
    fullMapOffsetY: number
    tilesPerColumn: number
    fullMap: boolean
    nightAlpha: number
    nightTint:{
        r: number
        g: number
        b: number
    }
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    timeCanvas: HTMLCanvasElement
    timeCtx: CanvasRenderingContext2D
    canvasFx: HTMLCanvasElement
    ctxFx: CanvasRenderingContext2D
    grassImg: HTMLImageElement
    waterImg: HTMLImageElement
    sandImg: HTMLImageElement
    treesImg: HTMLImageElement
    playerImg: HTMLImageElement
    woodenFloorImg: HTMLImageElement
    torchTileImg: HTMLImageElement
    messages: {x:number,y:number, text:string, timer:number, alpha:number}[]
    errors: {x:number,y:number, text:string, timer:number, alpha:number}[]

    debugTilePositions: boolean

    constructor(game: Game, width: number, height: number){
        this.game = game
        this.width = width
        this.height = height
        this.tileSize = 32
        this.mapTileSize = 10
        this.tilesPerRow = Math.floor(this.width / this.tileSize)
        this.tilesPerColumn = Math.floor(this.height / this.tileSize)

        this.offsetX = 0
        this.offsetY = 0
        this.fullMapOffsetX = 0
        this.fullMapOffsetY = 0

        this.fullMap = false
        this.nightTint = {
            r: 0,
            g: 0,
            b: 15,
        }
        this.nightAlpha = 0

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
        this.torchTileImg = new Image()
        this.torchTileImg.src = "./assets/torchTile.jpg"

        const newCanvas = document.createElement('canvas')
        this.canvas = newCanvas
        this.ctx = newCanvas.getContext('2d')!
        const timeCanvas = document.createElement('canvas')
        this.timeCanvas = timeCanvas
        this.timeCtx = timeCanvas.getContext('2d')!
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
        this.timeCanvas.width = this.width
        this.canvas.height = this.height
        this.canvasFx.height = this.height
        this.timeCanvas.height = this.height
        this.canvas.id = 'game-canvas'
        this.canvasFx.id = 'game-canvas-fx'
        this.timeCanvas.id = 'game-canvas-time'
        document.getElementById("game-container")!.append(this.canvas)
        document.getElementById("game-container")!.append(this.canvasFx)
        document.getElementById("game-container")!.append(this.timeCanvas)

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
                case "torchTile":{
                    img = this.torchTileImg
                    break
                }
                default: img = this.grassImg
            }
            tile.visible = true
            tile.unknown = false
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
            if(!tile.unknown){
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
                this.ctx.drawImage(img,((tile.x - this.fullMapOffsetX) * this.mapTileSize),((tile.y - this.fullMapOffsetY) * this.mapTileSize), this.mapTileSize, this.mapTileSize)
            }
            else{
                this.ctx.fillStyle = "#111"
                this.ctx.fillRect(((tile.x - this.fullMapOffsetX) * this.mapTileSize),((tile.y - this.fullMapOffsetY) * this.mapTileSize), this.mapTileSize, this.mapTileSize)
            }

        })
    }

    moveMap(dir:string){
        switch(dir){
            case "up":{
                if(this.fullMapOffsetY - 5 >= 0){
                    this.fullMapOffsetY -= 5
                }
                break
            }
            case "down":{
                if(this.fullMapOffsetY + 5 <= 50){
                    this.fullMapOffsetY += 5
                }
                break
            }
            case "left":{
                if(this.fullMapOffsetX - 5 >= 0){
                    this.fullMapOffsetX -= 5
                }
                break
            }
            case "right":{
                if(this.fullMapOffsetX + 5 <= 70)
                this.fullMapOffsetX += 5
                break
            }
        }
    }

    drawPlayer(){
        const {x,y} = this.game.player.position
        this.ctx.drawImage(
        this.playerImg, (x-this.offsetX) * this.tileSize, (y-this.offsetY )* this.tileSize, this.tileSize, this.tileSize)
    }

    drawPlayerInFullMap(){
        const {x,y} = this.game.player.position

        this.ctx.drawImage(
        this.playerImg, ((x - this.fullMapOffsetX) * this.mapTileSize), ((y - this.fullMapOffsetY) * this.mapTileSize), this.tileSize, this.tileSize)
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
        this.messages.push({
            x: (x - this.offsetX) * this.tileSize,
            y: (y - this.offsetY) * this.tileSize,text,
            timer:20,
            alpha:1})
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
        this.errors.push({
            x:(this.game.player.position.x - this.offsetX)*this.tileSize,
            y: ((this.game.player.position.y - this.offsetY)*this.tileSize) - 15,text,
            timer:75,
            alpha:0.75
        })
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

    timeOfDayFilter(){
   
        switch(this.game.timeOfDay){
            case "dawn":{
                (this.nightAlpha - 0.001) > 0 ? this.nightAlpha -= 0.001 : this.nightAlpha = 0
                break
            }
            case "dusk":{
                (this.nightAlpha + 0.001) < 0.9 ? this.nightAlpha += 0.001 : this.nightAlpha = 0.9
                break
            }
            case "day":{
                this.nightAlpha = 0
                break
            }
            case "night":{
                this.nightAlpha = 0.9
                break
            }
        }

        this.timeCtx.fillStyle = `rgba(${this.nightTint.r},${this.nightTint.g},${this.nightTint.b},${this.nightAlpha})`
        this.timeCtx.fillRect(0,0,this.width,this.width)
        this.timeCtx.globalCompositeOperation = 'destination-out';
        this.addLight()
        this.timeCtx.globalCompositeOperation = 'source-over';
    }

    addLight(){

        const {x:px,y:py} = this.game.player.position

        if(this.game.player.torchInHand){
            const playerTorchRadius = this.timeCtx.createRadialGradient(
                ((px - this.offsetX) * this.tileSize),
                ((py - this.offsetY) * this.tileSize),
                this.tileSize,
                ((px - this.offsetX) * this.tileSize),
                ((py - this.offsetY) * this.tileSize),
                this.tileSize * 10
            )
            
            playerTorchRadius.addColorStop(0, "rgba(255,75,0,1)")
            playerTorchRadius.addColorStop(0.66, "rgba(255,75,0,0.5)")
            playerTorchRadius.addColorStop(1, "rgba(255,75,0,0)")

            this.timeCtx.fillStyle = playerTorchRadius
            this.timeCtx.beginPath()
            this.timeCtx.arc(
                (px - this.offsetX) * this.tileSize,
                (py - this.offsetY) * this.tileSize,
                this.tileSize*10,
                0 , Math.PI*2
            )
            this.timeCtx.fill()
        }
        this.game.player.allTorches.forEach( torch => {
            const torchLight = this.timeCtx.createRadialGradient(
                ((torch.x - this.offsetX) * this.tileSize) + this.tileSize/2,
                ((torch.y - this.offsetY) * this.tileSize) + this.tileSize/2,
                this.tileSize,
                ((torch.x - this.offsetX) * this.tileSize) + this.tileSize/2,
                ((torch.y - this.offsetY) * this.tileSize) + this.tileSize/2,
                this.tileSize * 5
            )
            
            torchLight.addColorStop(0, "rgba(255,75,0,1)")
            torchLight.addColorStop(1, "rgba(255,75,0,0)")

            this.timeCtx.fillStyle = torchLight
            this.timeCtx.beginPath()
            this.timeCtx.arc(
                ((torch.x - this.offsetX) * this.tileSize) + this.tileSize/2,
                ((torch.y - this.offsetY) * this.tileSize) + this.tileSize/2,
                this.tileSize*5,
                0 , Math.PI*2
            )
            this.timeCtx.fill()
        })
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
        this.ctx.clearRect(0,0,this.width,this.height)
        this.ctxFx.clearRect(0,0,this.width,this.height)
        this.timeCtx.clearRect(0,0,this.width,this.height)

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
            this.timeOfDayFilter()
        }
    }
}

export default Graphics