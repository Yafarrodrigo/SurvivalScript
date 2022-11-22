import Game from "./Game.js"

class Controls{
    game: Game

    constructor(game: Game){
        this.game = game

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

    updateCursorPos(newPos: {x:number, y:number}){
        this.game.cursorPos = newPos        
    }

    init(){
        // KEYBOARD
        const checkKey = (e:KeyboardEvent) => {
            
            e = e || window.event;
            const { player } = this.game
            
            if (e.code == 'ArrowUp' || e.code == 'KeyW') {    // up arrow
                player.move("up")
            }
            else if (e.code == 'ArrowDown' || e.code == 'KeyS') {   // down arrow
                player.move("down")     
            }
            else if (e.code == 'ArrowLeft' || e.code == 'KeyA') {   // left arrow
                player.move("left")
            }
            else if (e.code == 'ArrowRight' || e.code == 'KeyD') {   // right arrow
                player.move("right")
            }
            else if (e.code == 'KeyI'){
                if(this.game.ui.inventoryOpened){
                    this.game.ui.closeInventory()
                }else{
                    this.game.ui.openInventory()
                }
            }
            else if (e.code == 'KeyC'){
                if(this.game.ui.craftingOpened){
                    this.game.ui.closeCrafting()
                }else{
                    this.game.ui.openCrafting()
                }
            }
            else if (e.code == 'Escape'){
                if(this.game.ui.inventoryOpened){
                    this.game.ui.closeInventory()
                }
                if(this.game.ui.craftingOpened){
                    this.game.ui.closeCrafting()
                }
            }
            else if (e.code == 'KeyM'){
                if(this.game.graphics.fullMap === true){
                    this.game.graphics.fullMap = false
                }
                else{
                    this.game.graphics.fullMap = true
                }
            }
            else if (e.code == 'KeyB'){
                if(this.game.placingBuilding === true){
                    this.game.placingBuilding = false
                    this.game.buildingToPlace = null
                }
                else{
                    if(this.game.player.inventory.has('building_wooden_floor', 1)){
                        this.game.placingBuilding = true
                        this.game.buildingToPlace = 'building_wooden_floor'
                    }
                }                
            }

            this.game.ui.hideMenus()
        }
        document.onkeydown = checkKey;

        // MOUSE
        document.onclick = (e) => {
            if(this.game.graphics.fullMap) return
            const canvas = e.target as HTMLCanvasElement
             
            if(canvas.id === "game-canvas"){
                this.game.ui.hideMenus()

                if(this.game.player.inventory.has(this.game.buildingToPlace!,1)){
                    if(this.game.placingBuilding){
                        const cursorPos = this.game.cursorPos
                        const x = cursorPos.x + this.game.graphics.offsetX
                        const y = cursorPos.y + this.game.graphics.offsetY
    
                        const pX = this.game.player.position.x
                        const pY = this.game.player.position.y
    
    
                        if(x >= pX-2 && x <= pX+2 && y >= pY-2 && y <= pY+2 && this.game.map.getTile(x,y).type !== "woodenFloor"){
                            this.game.map.changeTile(x,y,"woodenFloor")
                            this.game.player.inventory.removeItem(this.game.buildingToPlace!,1)

                            if(!this.game.player.inventory.has(this.game.buildingToPlace!,1)){
                                this.game.placingBuilding = false
                                this.game.buildingToPlace = null
                            }
                        }
                        else{
                            this.game.graphics.error("can't build there !")
                        }
                    }     
                }
                else{
                    this.game.placingBuilding = false
                    this.game.buildingToPlace = null
                }
                // TESTING CON CLICK !

            }
        }

        document.onmousemove = (e) => {
            if(this.game.graphics.fullMap) return
            const newMousePos = this.getMousePos(e)
            this.updateCursorPos(newMousePos)  
        }

        this.game.graphics.canvas.oncontextmenu = (e) => {
            e.preventDefault();
            if(this.game.graphics.fullMap) return
            const cursorPos = this.game.cursorPos
            const x = cursorPos.x + this.game.graphics.offsetX
            const y = cursorPos.y + this.game.graphics.offsetY

            this.game.lastClickedTile = this.game.map.getTile(x,y)  
                      

            if(this.game.cursorPos.x === this.game.player.position.x &&
                this.game.cursorPos.y === this.game.player.position.y){
                    this.game.ui.showMenu(e, "player", this.game.player.options)
            }else{
                const {type,options} = this.game.map.getTile(x,y)
                if(options.length) this.game.ui.showMenu(e, type, options)  
            }
        }
    }
    
}

export default Controls