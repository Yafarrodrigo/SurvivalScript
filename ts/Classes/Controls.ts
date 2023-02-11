import Game from "./Game.js"

class Controls{
    game: Game
    mouseDown: Boolean
    movingWindow: string | null
    mouseOffset: {
        x:number
        y:number
    }

    constructor(game: Game){
        this.game = game
        this.mouseDown = false
        this.movingWindow = null
        this.mouseOffset = {
            x: 0,
            y: 0
        }
        this.init()
        
    }

    getMousePos(evt:MouseEvent){
        const { canvas, tilesPerRow, tilesPerColumn, tileSize } = this.game.graphics
        const rect = canvas.getBoundingClientRect();

        const widthScale = canvas.width / rect.width;
        const heightScale = canvas.height / rect.height;

        let [x,y] = [Math.floor(((evt.clientX - rect.left) * widthScale)/ tileSize),
                        Math.floor(((evt.clientY - rect.top) * heightScale)/ tileSize)]

        if(x < 0) x = 0
        else if ( x > tilesPerRow ) x = tilesPerRow
        else if ( y < 0 )  y = 0
        else if ( y > tilesPerColumn ) y = tilesPerColumn
        
        return{x,y}
    }

    cancelConstructionMode(){
        this.game.placingBuilding = false
        this.game.buildingToPlace = null
    }

    init(){
        // KEYBOARD
        const checkKey = (e:KeyboardEvent) => {
            
            e = e || window.event;
            const { player, ui } = this.game

            if(this.game.ui.uiTyping === true && e.code !== 'Escape') return
            
            if (e.code == 'ArrowUp' || e.code == 'KeyW') { 
                if(this.game.graphics.fullMap){
                    this.game.graphics.moveMap("up")
                }else{
                    player.move("up")
                }
            }
            else if (e.code == 'ArrowDown' || e.code == 'KeyS') {
                if(this.game.graphics.fullMap){
                    this.game.graphics.moveMap("down")
                }   else{
                    player.move("down")
                }  
            }
            else if (e.code == 'ArrowLeft' || e.code == 'KeyA') {
                if(this.game.graphics.fullMap){
                    this.game.graphics.moveMap("left")
                }else{
                    player.move("left")
                }
            }
            else if (e.code == 'ArrowRight' || e.code == 'KeyD') {
                if(this.game.graphics.fullMap){
                    this.game.graphics.moveMap("right")
                }else{
                    player.move("right")
                }
            }
            else if (e.code == 'Escape'){
                ui.closeAllWindows()
                this.game.placingBuilding = false
                this.game.buildingToPlace = null
            }
            

            ui.hideMenus()
        }

        const checkKeyUI = (e:KeyboardEvent) => {
            e = e || window.event;
            const { ui } = this.game

            if(this.game.ui.uiTyping === true && e.code !== 'Escape') return
            
            if (e.code == 'KeyI'){
                if(this.game.graphics.fullMap) return
                ui.toggleWindow('inventory')
                
            }
            else if (e.code == 'KeyC'){
                if(this.game.graphics.fullMap) return
                ui.toggleWindow('crafting')
            }
            else if (e.code == 'KeyM'){
                ui.closeAllWindows()
                ui.showMap()
            }
        }

        document.onkeydown = checkKey;
        document.onkeyup = checkKeyUI;

        // MOUSE
        document.onmousedown = (e) => {
            const target = e.target as HTMLDivElement
            
            if(target.id === "crafting-header"){
                this.mouseDown = true
                this.movingWindow = "crafting-panel"
                if(this.game.ui.inventoryOpened){
                    this.game.ui.craftingPanel!.style.zIndex = "1000"
                    this.game.ui.inventoryPanel!.style.zIndex = "900"
                }
                this.mouseOffset = {
                    x: target.offsetWidth/2,
                    y: target.offsetHeight/2
                } 
            }else if(target.id === "inventory-header"){
                this.mouseDown = true
                this.movingWindow = "inventory-panel"
                if(this.game.ui.craftingOpened){
                    this.game.ui.craftingPanel!.style.zIndex = "900"
                    this.game.ui.inventoryPanel!.style.zIndex = "1000"
                }
                this.mouseOffset = {
                    x: target.offsetWidth/2,
                    y: target.offsetHeight/2
                } 
            }else{
                return
            }
        } 

        document.onmouseup = (e) => {
            this.mouseDown = false
            this.movingWindow = null

            if(this.game.graphics.fullMap) return
            const target = e.target as HTMLCanvasElement | HTMLDivElement | HTMLLIElement
            
            const { player,graphics, ui, map } = this.game
            
            if(target.id === "game-canvas"){
                ui.hideMenus()

                const cursorPos = this.game.cursorPos
                const x = cursorPos.x + graphics.offsetX
                const y = cursorPos.y + graphics.offsetY

                this.game.player.stopGathering()
                if(this.game.placingBuilding && e.button === 0){

                    const pX = player.position.x
                    const pY = player.position.y

                    if(x >= pX-2 && x <= pX+2 && y >= pY-2 && y <= pY+2){
                        this.game.crafting.build(this.game.buildingToPlace!, x ,y)
                    }
                    else{
                        graphics.error("can't build there !")
                    }    
                }
                
            }else{
                if(target.tagName !== "LI"){
                    ui.hideMenus()
                }
            }
        }

        document.onmousemove =  (e) => {
            if(this.game.graphics.fullMap) return
            const newMousePos = this.getMousePos(e)
            this.game.cursorPos = newMousePos
            
            if(this.mouseDown){
                let mousePosition = {
                    x : e.clientX - this.mouseOffset.x,
                    y : e.clientY - this.mouseOffset.y
                };
                let div = this.game.ui.inventoryPanel
                if(this.movingWindow === "inventory-panel"){
                    div = this.game.ui.inventoryPanel!
                }
                else if(this.movingWindow === "crafting-panel"){
                    div = this.game.ui.craftingPanel!
                }
                else{
                    this.movingWindow = null
                    return
                }

                div.style.left = mousePosition.x + 'px';
                div.style.top  = mousePosition.y + 'px';
            }
        }

        this.game.graphics.canvas.oncontextmenu = (e) => {
            e.preventDefault();
            if(this.game.graphics.fullMap) return

            const cursorPos = this.game.cursorPos
            const x = cursorPos.x + this.game.graphics.offsetX
            const y = cursorPos.y + this.game.graphics.offsetY

            this.game.lastClickedTile = this.game.map.getTile(x,y)  

            if(this.game.placingBuilding === true){
                this.cancelConstructionMode()
                return  
            }   
            else{                
                if(x === this.game.player.position.x && y === this.game.player.position.y){
                    this.game.ui.showTileMenu(e, "player", this.game.player.options)
                }else{
                    const {type,options} = this.game.map.getTile(x,y)
                    if(options.length) this.game.ui.showTileMenu(e, type, options)  
                }  
            }
              
        }
    }    
}

export default Controls