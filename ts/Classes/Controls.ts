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
            
            if (e.code == 'ArrowUp') {    // up arrow
                if(player.position.y - 1 >= 0){
                    player.move("up")
                }
            }
            else if (e.code == 'ArrowDown') {   // down arrow
                if(player.position.y + 1 < this.game.graphics.tilesPerColumn){
                    player.move("down")
                }                
            }
            else if (e.code == 'ArrowLeft') {   // left arrow
                if(player.position.x - 1 >= 0){
                    player.move("left")
                }                
            }
            else if (e.code == 'ArrowRight') {   // right arrow
                if(player.position.x + 1 < this.game.graphics.tilesPerRow){
                    player.move("right")
                }
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

            this.game.ui.hideMenus()
        }
        document.onkeydown = checkKey;

        // MOUSE
        document.onclick = (e) => {
            const canvas = e.target as HTMLCanvasElement
             
            if(canvas.id === "game-canvas"){
                this.game.ui.hideMenus()

                // test click en el game!
                /* const {x,y} = this.game.cursorPos
                this.game.map.changeTile(x,y, "water") */
                this.game.crafting.craft("mat_crafted_string")
                this.game.crafting.craft("mat_crafted_rope")
                this.game.crafting.craft("mat_crafted_hook")
                this.game.crafting.craft("tool_fishingRod")
            }
        }

        document.onmousemove = (e) => {
            const newMousePos = this.getMousePos(e)
            this.updateCursorPos(newMousePos)  
            const tile = this.game.map.getTile(newMousePos.x,newMousePos.y)
            this.game.ui.updateTileName(tile.type)
        }

        this.game.graphics.canvas.oncontextmenu = (e) => {
            e.preventDefault();
            const {x,y} = this.game.cursorPos
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