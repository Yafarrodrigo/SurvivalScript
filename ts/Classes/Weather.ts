import Game from "./Game";

class Weather{

    game:Game
    rainData:{
        active: boolean
        dropsQty: number
        drops:{x: number, y:number}[]
        speed: number
    }
    stoppingRain: boolean

    constructor(game:Game){
        this.game = game
        this.stoppingRain = false

        this.rainData = {
            active: true,
            dropsQty: 500,
            drops: [],
            speed: 20
        }

        for(let i = 0; i < this.rainData.dropsQty; i++){
            let rndYPos = (Math.floor(Math.random() * 1000))*(-1)
            const newDrop = {
                x: Math.floor(Math.random()*this.game.graphics.canvas.width),
                y: rndYPos
            }
            this.rainData.drops.push(newDrop)
        }
    }

    startRain(){
        for(let i = 0; i < this.rainData.dropsQty; i++){
            let rndYPos = (Math.floor(Math.random() * 1000))*(-1)
            const newDrop = {
                x: Math.floor(Math.random()*this.game.graphics.canvas.width),
                y: rndYPos
            }
            this.rainData.drops.push(newDrop)
        }
        this.rainData.active = true
    }

    stopRain(){
        this.stoppingRain = true
        setTimeout(()=>{
            this.rainData.active = false
            this.stoppingRain = false
        },5000)
    }
}

export default Weather