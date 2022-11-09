import Game from "./Game.js"

class Player{

    game: Game
    position: {
        x:number,
        y:number
    }
    options:{actionName: string,desc: string}[]

    constructor(game: Game){
        this.game = game
        this.position = {
            x: Math.floor(Math.random()*game.graphics.tilesPerRow),
            y: Math.floor(Math.random()*game.graphics.tilesPerColumn)
        }
        this.options = [
            {actionName: "wait", desc: "wait"},
            {actionName: "sit", desc: "sit"},
            {actionName: "startCampfire", desc: "start camfire"}
        ]
    }

    move(dir: "up" | "down" | "left" | "right"){
        switch(dir){
            case "up":{
                this.position.y -= 1
                break
            }
            case "down":{
                this.position.y += 1
                break
            }
            case "left":{
                this.position.x -= 1
                break
            }
            case "right":{
                this.position.x += 1
                break
            }
        }
    }
}

export default Player