import _ITEMS from "../AllItems.js"
import _TILES from "../AllTiles.js"
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
    images: {[key:string]:HTMLImageElement}
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    timeCanvas: HTMLCanvasElement
    timeCtx: CanvasRenderingContext2D
    rainCanvas: HTMLCanvasElement
    rainCtx: CanvasRenderingContext2D
    canvasFx: HTMLCanvasElement
    ctxFx: CanvasRenderingContext2D
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
        
        this.images = this.preloadImages()

        const newCanvas = document.createElement('canvas')
        this.canvas = newCanvas
        this.ctx = newCanvas.getContext('2d')!
        const timeCanvas = document.createElement('canvas')
        this.timeCanvas = timeCanvas
        this.timeCtx = timeCanvas.getContext('2d')!
        const newCanvasFx = document.createElement('canvas')
        this.canvasFx = newCanvasFx
        this.ctxFx = newCanvasFx.getContext('2d')!
        const rainCanvas = document.createElement('canvas')
        this.rainCanvas = rainCanvas
        this.rainCtx = rainCanvas.getContext('2d')!

        this.messages = []
        this.errors = []
        
        this.debugTilePositions = false
        this.init()
    }

    preloadImages(){
        let dict: {[key:string]:HTMLImageElement} = {}
        for(let tile in _TILES){
            let newImg = new Image()
            newImg.src = _TILES[tile].src
            dict[tile] = newImg
        }
        let playerDownImg = new Image()
        playerDownImg.src = "./assets/playerDown.png"
        dict["playerDown"] = playerDownImg

        let playerUpImg = new Image()
        playerUpImg.src = "./assets/playerUp.png"
        dict["playerUp"] = playerUpImg

        let playerLeftImg = new Image()
        playerLeftImg.src = "./assets/playerLeft.png"
        dict["playerLeft"] = playerLeftImg

        let playerRightImg = new Image()
        playerRightImg.src = "./assets/playerRight.png"
        dict["playerRight"] = playerRightImg
        return dict
    }
    
    init(){
        this.canvas.width = this.width
        this.canvasFx.width = this.width
        this.timeCanvas.width = this.width
        this.rainCanvas.width = this.width
        this.canvas.height = this.height
        this.canvasFx.height = this.height
        this.timeCanvas.height = this.height
        this.rainCanvas.height = this.height
        this.canvas.id = 'game-canvas'
        this.canvasFx.id = 'game-canvas-fx'
        this.timeCanvas.id = 'game-canvas-time'
        this.rainCanvas.id = 'game-canvas-rain'
        document.getElementById("game-container")!.append(this.canvas)
        document.getElementById("game-container")!.append(this.canvasFx)
        document.getElementById("game-container")!.append(this.rainCanvas)
        document.getElementById("game-container")!.append(this.timeCanvas)

        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0,0,this.width,this.height)        

    }

    drawMap(){
        
        let x = 0
        let y = 0

        for(let i = 0; i < (this.tilesPerColumn * this.tilesPerRow)+1; i++){

            let arrOffset = ((y+this.offsetY) * this.tilesPerRow) - this.tilesPerRow >= 0 ? ((y+this.offsetY) * this.game.map.tilesPerRow)-1 : 0
            const tile = this.game.map.tiles[x+this.offsetX + arrOffset]            
            
            const finalX = (tile.x - this.offsetX) * this.tileSize
            const finalY = (tile.y - this.offsetY) * this.tileSize
            
            tile.visible = true
            tile.unknown = false

            if(tile.base !== null){ 
                this.ctx.fillStyle = "none"
                this.ctx.drawImage(this.images[tile.base] ,finalX,finalY,this.tileSize,this.tileSize)
            }
            this.ctx.drawImage(this.images[tile.type] ,finalX,finalY,this.tileSize,this.tileSize)

            if(this.debugTilePositions){
                this.ctxFx.font = "10px Arial";
                this.ctxFx.fillStyle = `black`
                this.ctxFx.fillText(`x${tile.x}`, finalX+7, finalY+10);
                this.ctxFx.fillText(`y${tile.y}`, finalX+7, finalY+20);
            }

            if(i % this.tilesPerRow === 0){
                if(i > 0){
                    y++
                }
                x = 0
            }

            x++
        }

    } 

    drawFullMap(){
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0,0,this.width,this.height)
        this.game.map.tiles.forEach( tile => {
            if(!tile.unknown){
                if(tile.base !== null){
                    this.ctx.drawImage(this.images[tile.base] ,((tile.x - this.fullMapOffsetX) * this.mapTileSize),((tile.y - this.fullMapOffsetY) * this.mapTileSize), this.mapTileSize, this.mapTileSize)
                }
                this.ctx.drawImage(this.images[tile.type] ,((tile.x - this.fullMapOffsetX) * this.mapTileSize),((tile.y - this.fullMapOffsetY) * this.mapTileSize), this.mapTileSize, this.mapTileSize)
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
        switch(this.game.player.orientation){
            case "down":
                this.ctx.drawImage(this.images["playerDown"], (x-this.offsetX) * this.tileSize, (y-this.offsetY )* this.tileSize, this.tileSize, this.tileSize)
                break

            case "up":
                this.ctx.drawImage(this.images["playerUp"], (x-this.offsetX) * this.tileSize, (y-this.offsetY )* this.tileSize, this.tileSize, this.tileSize)
                break

            case "right":
                this.ctx.drawImage(this.images["playerRight"], (x-this.offsetX) * this.tileSize, (y-this.offsetY )* this.tileSize, this.tileSize, this.tileSize)
                break

            case "left":
                this.ctx.drawImage(this.images["playerLeft"], (x-this.offsetX) * this.tileSize, (y-this.offsetY )* this.tileSize, this.tileSize, this.tileSize)
                break
        }   
        
    }

    drawPlayerInFullMap(){
        const {x,y} = this.game.player.position

        this.ctx.drawImage(
        this.images["playerDown"], ((x - this.fullMapOffsetX) * this.mapTileSize), ((y - this.fullMapOffsetY) * this.mapTileSize), this.tileSize, this.tileSize)
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

        const targetTile = this.game.map.getTile(x,y)

        let imgToShow = this.images["woodenFloor"]

        if(this.game.buildingToPlace){
            imgToShow = this.images[_ITEMS[this.game.buildingToPlace].relatedTile!]
        }
        else return

        if(x >= pX-2 && x <= pX+2 && y >= pY-2 && y <= pY+2 && targetTile.spaceAvailable === true){
            if(this.game.buildingToPlace === "building_farmPlot" && targetTile.type === "grass"){
                this.ctx.drawImage(imgToShow ,cursorPos.x * this.tileSize,cursorPos.y * this.tileSize,this.tileSize,this.tileSize)
            }else{
                this.ctx.drawImage(imgToShow ,cursorPos.x * this.tileSize,cursorPos.y * this.tileSize,this.tileSize,this.tileSize)
            }
        }else{
            this.ctx.drawImage(imgToShow ,cursorPos.x * this.tileSize,cursorPos.y * this.tileSize,this.tileSize,this.tileSize)
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

        if(this.game.player.equipment.hands !== null && this.game.player.equipment.hands.id === "building_torch"){
            const playerTorchRadius = this.timeCtx.createRadialGradient(
                ((px - this.offsetX) * this.tileSize) + this.tileSize/2,
                ((py - this.offsetY) * this.tileSize) + this.tileSize/2,
                0,
                ((px - this.offsetX) * this.tileSize) + this.tileSize/2,
                ((py - this.offsetY) * this.tileSize) + this.tileSize/2,
                this.game.player.mainTorch.radius
            )
            
            playerTorchRadius.addColorStop(0, `rgba(255,75,0,${this.game.player.mainTorch.intensity})`)
            playerTorchRadius.addColorStop(0.66, "rgba(255,75,0,0.5)")
            playerTorchRadius.addColorStop(1, "rgba(255,75,0,0)")

            this.timeCtx.fillStyle = playerTorchRadius
            this.timeCtx.beginPath()
            this.timeCtx.arc(
                ((px - this.offsetX) * this.tileSize) + this.tileSize/2,
                ((py - this.offsetY) * this.tileSize) + this.tileSize/2,
                this.tileSize*10,
                0 , Math.PI*2
            )
            this.timeCtx.fill()
            this.timeCtx.filter = "none"
        }
        this.game.player.allTorches.forEach( torch => {
            const torchLight = this.timeCtx.createRadialGradient(
                ((torch.x - this.offsetX) * this.tileSize) + this.tileSize/2,
                ((torch.y - this.offsetY) * this.tileSize) + this.tileSize/2,
                0,
                ((torch.x - this.offsetX) * this.tileSize) + this.tileSize/2,
                ((torch.y - this.offsetY) * this.tileSize) + this.tileSize/2,
                torch.radius
            )
            
            torchLight.addColorStop(0, `rgba(255,75,0,${torch.intensity})`)
            torchLight.addColorStop(1, `rgba(255,75,0,0)`)

            this.timeCtx.fillStyle = torchLight
            this.timeCtx.beginPath()
            this.timeCtx.arc(
                ((torch.x - this.offsetX) * this.tileSize) + this.tileSize/2,
                ((torch.y - this.offsetY) * this.tileSize) + this.tileSize/2,
                this.tileSize*5,
                0 , Math.PI*2
                )
                this.timeCtx.fill()
                this.timeCtx.filter = "none"
        })
        this.game.player.allCampfires.forEach( campfire => {
            const campfireLight = this.timeCtx.createRadialGradient(
                ((campfire.x - this.offsetX) * this.tileSize) + this.tileSize/2,
                ((campfire.y - this.offsetY) * this.tileSize) + this.tileSize/2,
                0,
                ((campfire.x - this.offsetX) * this.tileSize) + this.tileSize/2,
                ((campfire.y - this.offsetY) * this.tileSize) + this.tileSize/2,
                campfire.radius
            )
            
            campfireLight.addColorStop(0, `rgba(255,75,0,${campfire.intensity})`)
            campfireLight.addColorStop(1, `rgba(255,75,0,0)`)

            this.timeCtx.fillStyle = campfireLight
            this.timeCtx.beginPath()
            this.timeCtx.arc(
                ((campfire.x - this.offsetX) * this.tileSize) + this.tileSize/2,
                ((campfire.y - this.offsetY) * this.tileSize) + this.tileSize/2,
                this.tileSize*10,
                0 , Math.PI*2
                )
                this.timeCtx.fill()
                this.timeCtx.filter = "none"
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

    drawRain(){
        const {rainData, stoppingRain} = this.game.weather
        
        rainData.drops.forEach( drop => {
            let rndYPos = Math.floor(Math.random() * (-1000))
            if(drop.y >= (this.height-40)){
                if(!stoppingRain){
                    drop.y = rndYPos
                }
                else{
                    drop.y = this.height+100
                }
            }
            else{
                drop.y += rainData.speed
                if(Math.random() > 0.8){
                    if(Math.random() > 0.5){
                        drop.x += 1
                    }
                    else{
                        drop.x -= 1
                    }
                }
            }
            
            this.rainCtx.fillStyle = "rgba(0,0,150,0.3)"
            this.roundRect(this.rainCtx,drop.x, drop.y, 2.5, 25, 2)
        })
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
        this.ctx.clearRect(0,0,this.width,this.height)
        this.ctxFx.clearRect(0,0,this.width,this.height)
        this.timeCtx.clearRect(0,0,this.width,this.height)
        this.rainCtx.clearRect(0,0,this.width,this.height)

        if(this.fullMap === true){
            this.drawFullMap()
            this.drawPlayerInFullMap()
        }
        else{
            this.drawMap()
            
            if(this.game.placingBuilding){
                this.showBuildingToPlace()
            }

            this.drawPlayer()
            this.drawTileHover()
            this.drawMessages()
            this.drawErrors()
            
            if(this.game.weather.rainData.active === true){
                this.drawRain()
            }
            
            this.timeOfDayFilter()
        }
    }
}

export default Graphics