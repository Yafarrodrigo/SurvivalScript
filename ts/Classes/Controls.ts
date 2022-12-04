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

    cancelConstructionMode(){
        this.game.placingBuilding = false
        this.game.buildingToPlace = null
    }

    init(){
        // KEYBOARD
        const checkKey = (e:KeyboardEvent) => {
            
            e = e || window.event;
            const { player, ui } = this.game
            
            if (e.code == 'ArrowUp' || e.code == 'KeyW') {    // up arrow
                if(this.game.graphics.fullMap){
                    this.game.graphics.moveMap("up")
                }else{
                    player.move("up")
                }
            }
            else if (e.code == 'ArrowDown' || e.code == 'KeyS') {   // down arrow
                if(this.game.graphics.fullMap){
                    this.game.graphics.moveMap("down")
                }   else{
                    player.move("down")
                }  
            }
            else if (e.code == 'ArrowLeft' || e.code == 'KeyA') {   // left arrow
                if(this.game.graphics.fullMap){
                    this.game.graphics.moveMap("left")
                }else{
                    player.move("left")
                }
            }
            else if (e.code == 'ArrowRight' || e.code == 'KeyD') {   // right arrow
                if(this.game.graphics.fullMap){
                    this.game.graphics.moveMap("right")
                }else{
                    player.move("right")
                }
            }
            else if (e.code == 'KeyI'){
                ui.toggleWindow('inventory')
            }
            else if (e.code == 'KeyC'){
                ui.toggleWindow('crafting')
            }
            else if (e.code == 'KeyT'){
                if(this.game.player.inventory.has("building_torch", 1)){
                    player.torchInHand === true ? player.torchInHand = false : player.torchInHand = true
                }
                else{
                    this.game.graphics.error("you need a torch!")
                    player.torchInHand = false
                }
            }
            else if (e.code == 'Escape'){
                ui.closeAllWindows()
                this.game.placingBuilding = false
                this.game.buildingToPlace = null
            }
            else if (e.code == 'KeyM'){
                ui.showMap()
            }

            else if (e.code == 'KeyB'){
                if(this.game.placingBuilding === true){
                    this.cancelConstructionMode()
                }

                const option = prompt("1 - wooden floor \n 2 - torch \n 3 - farm plot")
                if(option === "1"){
                    if(player.inventory.has('building_wooden_floor', 1)){
                        this.game.placingBuilding = true
                        this.game.buildingToPlace = 'building_wooden_floor'
                    }
                }
                else if(option === "2"){
                    if(player.inventory.has('building_torch', 1)){
                        this.game.placingBuilding = true
                        this.game.buildingToPlace = 'building_torch'
                    }
                }
                else if(option === "3"){
                    if(player.inventory.has('building_farmPlot', 1)){
                        this.game.placingBuilding = true
                        this.game.buildingToPlace = 'building_farmPlot'
                    }
                }               
            }

            ui.hideMenus()
        }

        document.onkeydown = checkKey;

        // MOUSE
        document.onclick = (e) => {
            if(this.game.graphics.fullMap) return
            const target = e.target as HTMLCanvasElement | HTMLDivElement
            
            const { player,graphics, ui, map } = this.game
            ui.hideMenus()
            
            if(target.id === "game-canvas"){

                const cursorPos = this.game.cursorPos
                const x = cursorPos.x + graphics.offsetX
                const y = cursorPos.y + graphics.offsetY

                console.log(map.getTile(x,y));

                this.game.player.stopGathering()
                if(this.game.placingBuilding){

                    const pX = player.position.x
                    const pY = player.position.y

                    if(x >= pX-2 && x <= pX+2 && y >= pY-2 && y <= pY+2){
                        this.game.crafting.build(this.game.buildingToPlace!, x ,y)
                    }
                    else{
                        graphics.error("can't build there !")
                    }    
                }
                else{
                    this.cancelConstructionMode()
                }
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

            console.log(x,y);
            

            this.game.lastClickedTile = this.game.map.getTile(x,y)  
                      

            if(x === this.game.player.position.x && y === this.game.player.position.y){
                    this.game.ui.showMenu(e, "player", this.game.player.options)
            }else{
                const {type,options} = this.game.map.getTile(x,y)
                if(options.length) this.game.ui.showMenu(e, type, options)  
            }
        }
    }
    
}

export default Controls