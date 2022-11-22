import Game from "./Classes/Game.js"

const ACTIONS = {
    fish: (game:Game) => {
        if(game.player.inventory.has("tool_fishingRod",1) && game.player.inventory.has("cons_bait_worm",1)){
            game.player.inventory.removeItem("cons_bait_worm", 1)
            game.player.inventory.addItem("cons_food_fish", 1)
            const playerQty = game.player.inventory.items["cons_food_fish"].qty
            game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} fish`);

        }
        else{
            game.graphics.error("need a bait !");
        }
    },
    gatherSmallRocks: (game:Game) => {
        const rndQty = Math.floor(Math.random()*3)+1
        game.player.inventory.addItem("mat_stone_small_rock", rndQty)
        const playerQty = game.player.inventory.items["mat_stone_small_rock"].qty
        game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} small rocks`);
        
    },
    gatherRock: (game:Game) => {
        game.player.inventory.addItem("mat_stone_rock", 1)
        game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `+1 rock`);
        
    },
    gatherSticks: (game:Game) => {
        const rndQty = Math.floor(Math.random()*3)+1
        game.player.inventory.addItem("mat_wood_small_stick", rndQty)
        game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `+${rndQty} small sticks`);
        
    },
    gatherGrassFibers: (game:Game) => {
        const rndQty = Math.floor(Math.random()*3)+1
        game.player.inventory.addItem("mat_grass_fiber", rndQty)
        game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `+${rndQty} fibers`);
        
    },
    gatherWorms: (game:Game) => {
        const rndQty = Math.floor(Math.random()*3)+1
        game.player.inventory.addItem("cons_bait_worm", rndQty)
        game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `+${rndQty} worms`);
        
    },
    gatherLongStick: (game:Game) => {
        if(game.player.inventory.has('tool_stoneKnife', 1) || game.player.inventory.has('tool_hatchet', 1) ){
            game.player.inventory.addItem("mat_wood_stick", 1)
            game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `+1 long stick`);
        }else{
            game.graphics.error("must have a hatchet or a knife !");
        }
        
    },
    chopDownTree: (game:Game) => {
        if(game.lastClickedTile === null) return
        if(game.player.inventory.has('tool_hatchet', 1)){
            game.map.changeTile(game.lastClickedTile.x,game.lastClickedTile.y,"grass")
            game.player.inventory.addItem("mat_wood_log", 1)
            game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `+1 wood log`);
        }
        else{
            game.graphics.error("must have a hatchet !");
        }
    },
    wait: (game:Game) => {
        game.graphics.error("work in progress :(")
    },
    sit: (game:Game) => {
        game.graphics.error("work in progress :(")
    },
    startCampfire: (game:Game) => {
        game.graphics.error("work in progress :(")
    }
    
}

export default ACTIONS