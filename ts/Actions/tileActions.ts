import Game from "../Classes/Game"
import CHECKS from "../Checks.js"

const tileActions = {
    fish: (game:Game) => {
        if(CHECKS.canFish(game.player)){
            game.player.inventory.removeItem("cons_bait_worm", 1)
            game.player.inventory.addItem("cons_food_rawFish", 1)
            const playerQty = game.player.inventory.items["cons_food_rawFish"].qty
            game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} raw fish`);

        }
        else{
            game.graphics.error("equip a fishing rod and use bait to fish!");
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
        const playerQty = game.player.inventory.items["mat_stone_rock"].qty
        game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} rocks`);

        const {x,y} = game.lastClickedTile!
        game.map.changeTile(x,y, "grass")
        
    },
    gatherSticks: (game:Game) => {
        const rndQty = Math.floor(Math.random()*3)+1
        game.player.inventory.addItem("mat_wood_small_stick", rndQty)
        const playerQty = game.player.inventory.items["mat_wood_small_stick"].qty
        game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} small sticks`);

        const {x,y} = game.lastClickedTile!
        game.map.changeTile(x,y, "grass")
        
    },
    gatherGrassFibers: (game:Game) => {
        const rndQty = Math.floor(Math.random()*3)+1
        game.player.inventory.addItem("mat_grass_fiber", rndQty)
        const playerQty = game.player.inventory.items["mat_grass_fiber"].qty
        game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} grass fibers`);
        
    },
    gatherDirt: (game:Game) => {
        if(CHECKS.canGatherSandOrDirt(game.player)){
            game.player.inventory.addItem("mat_dirt", 1)
            const playerQty = game.player.inventory.items["mat_dirt"].qty
            game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} dirt`);
        }
        else{
            game.graphics.error("you need a shovel!")
        }
        
    },
    gatherSand: (game:Game) => {
        if(CHECKS.canGatherSandOrDirt(game.player)){
            game.player.inventory.addItem("mat_sand", 1)
            const playerQty = game.player.inventory.items["mat_sand"].qty
            game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} sand`);
        }
        else{
            game.graphics.error("you need a shovel!")
        }
        
    },
    plantPumpkins: (game:Game) => {
        const {x,y} = game.lastClickedTile!
        const crop = game.player.allCrops.find( crop => crop.x === x && crop.y === y)
        if(crop){
            crop.planted = true
            game.map.changeTile(x,y, "plantedFarmPlot")
            game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `planted pumpkins!`);
        }else{
            game.graphics.error("crop not found")
        }
    },
    gatherSeaShells: (game:Game) => {
        const rndQty = Math.floor(Math.random()*3)+1
        game.player.inventory.addItem("mat_sea_shell", rndQty)
        const playerQty = game.player.inventory.items["mat_sea_shell"].qty
        game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} sea shells`);
        
        const {x,y} = game.lastClickedTile!
        game.map.changeTile(x,y, "sand")
    },
    gatherWorms: (game:Game) => {
        const rndQty = Math.floor(Math.random()*3)+1
        game.player.inventory.addItem("cons_bait_worm", rndQty)
        const playerQty = game.player.inventory.items["cons_bait_worm"].qty
        game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} worms`);
        
    },
    gatherLongStick: (game:Game) => {
        if(CHECKS.canGatherLongSticks(game.player)){
            game.player.inventory.addItem("mat_wood_stick", 1)
            const playerQty = game.player.inventory.items["mat_wood_stick"].qty
            game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} long sticks`);
        }else{
            game.graphics.error("must have a hatchet, knife or sharpened shell equipped!");
        }
        
    },
    chopDownTree: (game:Game) => {
        if(game.lastClickedTile === null) return
        if(CHECKS.canChopTrees(game.player)){
            game.map.changeTile(game.lastClickedTile.x,game.lastClickedTile.y,"grass")
            game.player.inventory.addItem("mat_wood_log", 1)
            const playerQty = game.player.inventory.items["mat_wood_log"].qty
            game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} wood logs`);
        }
        else{
            game.graphics.error("must have a hatchet equipped!");
        }
    },
    removeTorch: (game:Game) => {
        if(game.lastClickedTile === null) return
        game.player.removeTorchFromGame(game.lastClickedTile.x,game.lastClickedTile.y)
        game.map.changeTile(game.lastClickedTile.x,game.lastClickedTile.y,game.lastClickedTile.base!)
        game.player.inventory.addItem('building_torch', 1)
    },
    removeFloor: (game:Game) => {
        if(game.lastClickedTile === null) return
        if(game.player.inventory.has('tool_hatchet', 1)){
            game.map.changeTile(game.lastClickedTile.x,game.lastClickedTile.y,game.lastClickedTile.base!)
        }else{
            game.graphics.error("you need a hatchet to destroy floor!")
        }
    },
    removeCampfire: (game:Game) => {
        if(game.lastClickedTile === null) return
        game.player.removeCampfireFromGame(game.lastClickedTile.x,game.lastClickedTile.y)
        game.map.changeTile(game.lastClickedTile.x,game.lastClickedTile.y,game.lastClickedTile.base!)
    }, 
    roastFish: (game:Game) => {
        if(game.player.inventory.has("mat_wood_stick", 1)){
            if(game.player.inventory.has("cons_food_rawFish", 1)){
                game.player.inventory.removeItem("cons_food_rawFish",1)
                game.player.inventory.addItem("cons_food_cookedFish",1)
                const playerQty = game.player.inventory.items["cons_food_cookedFish"].qty
                game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} cooked fishes`);
            }
            else{
                game.graphics.error("you dont have any fish")
            }
        }
        else{
            game.graphics.error("you need a long wooden stick to roast things")
        }
    }
}

export default tileActions