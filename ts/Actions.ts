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
        if(game.player.inventory.has("tool_shovel",1)){
            game.player.inventory.addItem("mat_dirt", 1)
            const playerQty = game.player.inventory.items["mat_dirt"].qty
            game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} dirt`);
        }
        else{
            game.graphics.error("you need a shovel!")
        }
        
    },
    gatherSand: (game:Game) => {
        if(game.player.inventory.has("tool_shovel",1)){
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
        if(game.player.inventory.has('tool_stoneKnife', 1) || game.player.inventory.has('tool_hatchet', 1) || game.player.inventory.has('tool_sharpenedShell', 1)){
            game.player.inventory.addItem("mat_wood_stick", 1)
            const playerQty = game.player.inventory.items["mat_wood_stick"].qty
            game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} long sticks`);
        }else{
            game.graphics.error("must have a hatchet or a knife !");
        }
        
    },
    chopDownTree: (game:Game) => {
        if(game.lastClickedTile === null) return
        if(game.player.inventory.has('tool_hatchet', 1)){
            game.map.changeTile(game.lastClickedTile.x,game.lastClickedTile.y,"grass")
            game.player.inventory.addItem("mat_wood_log", 1)
            const playerQty = game.player.inventory.items["mat_wood_log"].qty
            game.graphics.drawGatherInfo(game.player.position.x, game.player.position.y, `${playerQty} wood logs`);
        }
        else{
            game.graphics.error("must have a hatchet !");
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
    wait: (game:Game) => {
        game.graphics.error("work in progress :(")
    },
    sit: (game:Game) => {
        game.graphics.error("work in progress :(")
    },
    startCampfire: (game:Game) => {
        game.graphics.error("work in progress :(")
    },
    placeWoodenFloor: (game:Game) => {
        if(game.player.inventory.has('building_wooden_floor', 1)){
            game.placingBuilding = true
            game.buildingToPlace = 'building_wooden_floor'
            game.ui.closeAllWindows()
        }
        else{
            game.graphics.error("no wooden floors remaining")
        }
    },
    placeTorch: (game:Game) => {
        if(game.player.inventory.has('building_torch', 1)){
            game.placingBuilding = true
            game.buildingToPlace = 'building_torch'
            game.ui.closeAllWindows()
        }
        else{
            game.graphics.error("no torches remaining")
        }
    },
    placeFarmPlot: (game:Game) => {
        if(game.player.inventory.has('building_farmPlot', 1)){
            game.placingBuilding = true
            game.buildingToPlace = 'building_farmPlot'
            game.ui.closeAllWindows()
        }
        else{
            game.graphics.error("no farm plots remaining")
        }
    },
    placeCampfire: (game:Game) => {
        if(game.player.inventory.has('building_campfire', 1)){
            game.placingBuilding = true
            game.buildingToPlace = 'building_campfire'
            game.ui.closeAllWindows()
        }
        else{
            game.graphics.error("no campfires remaining")
        }
    }
    
}

export default ACTIONS