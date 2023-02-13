import Game from "./Game";

class Health{

    game:Game
    hunger: number
    thirst: number
    hp: number
    stamina: number
    
    constructor(game:Game){
        this.game = game
        this.hunger = 100
        this.thirst = 100
        this.hp = 100
        this.stamina = 100
    }
}

export default Health