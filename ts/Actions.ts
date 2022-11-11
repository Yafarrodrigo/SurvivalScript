import Game from "./Classes/Game.js"

function showDesc(txt:string){
    document.getElementById('info')!.textContent = "..."+txt
    setTimeout(()=>{
        document.getElementById('info')!.textContent = ""
    },2000)
}

const ACTIONS = {
    fish: (game:Game) => {},
    drink: (game:Game) => {},
    gatherSand: (game:Game) => {},
    gatherSmallRocks: (game:Game) => {},
    gatherSticks: (game:Game) => {
        const rndQty = Math.floor(Math.random()*3)+1
        game.player.inventory.addItem("mat_wood_small_stick", rndQty)
        game.player.inventory.update()
        console.log(`gathered ${rndQty} small sticks`);
        
    },
    gatherGrassFibers: (game:Game) => {
        const rndQty = Math.floor(Math.random()*3)+1
        game.player.inventory.addItem("mat_grass_fiber", rndQty)
        game.player.inventory.update()
        console.log(`gathered ${rndQty} fibers`);
        
    },
    gatherWorms: (game:Game) => {},
    gatherLongStick: (game:Game) => {},
    gatherFruits: (game:Game) => {},
    gatherSap: (game:Game) => {}
    

}

export default ACTIONS