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
        }
        document.onkeydown = checkKey;

        // MOUSE
        document.onclick = (e) => {
            const canvas = e.target as HTMLCanvasElement
             
            if(canvas.id === "game-canvas"){
                this.game.ui.hideMenus()
            }
        }

        document.onmousemove = (e) => {
            this.updateCursorPos(this.getMousePos(e))         
        }

        this.game.graphics.canvas.oncontextmenu = (e) => {
            e.preventDefault();
            const {x,y} = this.game.cursorPos
            
            if(this.game.cursorPos.x === this.game.player.position.x &&
                this.game.cursorPos.y === this.game.player.position.y){
                    this.game.ui.showMenu(e, "player")
            }else{
                const tileType = this.game.map.getTile(x,y).type
                this.game.ui.showMenu(e, tileType)  
            }
        }
    }
    
}

export default Controls