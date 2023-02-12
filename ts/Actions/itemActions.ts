import Game from "../Classes/Game"
const itemActions = {
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
    },
    equipTorch: (game:Game) => {
        if(game.player.inventory.has("building_torch", 1)){
            const torchItem = game.player.inventory.items["building_torch"]
            game.player.equipItem("hands", torchItem)
        }else{
            game.graphics.error("no torches in your inventory")
        }
    },
    equipHatchet: (game:Game) => {
        if(game.player.inventory.has("tool_hatchet", 1)){
            const hatchet = game.player.inventory.items["tool_hatchet"]
            game.player.equipItem("hands", hatchet)
        }else{
            game.graphics.error("no hatchet in your inventory")
        }
    },
    equipShovel: (game:Game) => {
        if(game.player.inventory.has("tool_shovel", 1)){
            const shovel = game.player.inventory.items["tool_shovel"]
            game.player.equipItem("hands", shovel)
        }else{
            game.graphics.error("no shovel in your inventory")
        }
    },
    equipFishingRod: (game:Game) => {
        if(game.player.inventory.has("tool_fishingRod", 1)){
            const fishingRod = game.player.inventory.items["tool_fishingRod"]
            game.player.equipItem("hands", fishingRod)
        }else{
            game.graphics.error("no fishing rod in your inventory")
        }
    },
    equipWoodenBow: (game:Game) => {
        if(game.player.inventory.has("tool_woodenBow", 1)){
            const woodenBow = game.player.inventory.items["tool_woodenBow"]
            game.player.equipItem("hands", woodenBow)
        }else{
            game.graphics.error("no wooden bow in your inventory")
        }
    },
    equipStoneKnife: (game:Game) => {
        if(game.player.inventory.has("tool_stoneKnife", 1)){
            const stoneKnife = game.player.inventory.items["tool_stoneKnife"]
            game.player.equipItem("hands", stoneKnife)
        }else{
            game.graphics.error("no stone knife in your inventory")
        }
    },
    equipSsharpenedShell: (game:Game) => {
        if(game.player.inventory.has("tool_sharpenedShell", 1)){
            const sharpenedShell = game.player.inventory.items["tool_sharpenedShell"]
            game.player.equipItem("hands", sharpenedShell)
        }else{
            game.graphics.error("no sharpened shell in your inventory")
        }
    },
    eatRawFish: (game:Game) => {
        if(game.player.inventory.has("cons_food_rawFish", 1)){
            console.log("come pescadito crudo");
            game.player.inventory.removeItem("cons_food_rawFish", 1)
        }
        else{
            game.graphics.error("no hay pescado en el inventario")
        }
    },
    eatCookedFish: (game:Game) => {
        if(game.player.inventory.has("cons_food_cookedFish", 1)){
            console.log("come pescadito cocinado");
            game.player.inventory.removeItem("cons_food_cookedFish", 1)
        }
        else{
            game.graphics.error("no hay pescado en el inventario")
        }
    },
    dropItem: (game:Game) => {
        if(game.ui.lastItemActionClicked === null) return
        const item = game.ui.lastItemActionClicked.id.split("-")[1]
        if(game.player.inventory.has(item, 1)){
            game.player.inventory.removeAll(item)
        }
    },
    equipBucket: (game:Game) => {
        console.log("equips bucket!");
    },
}

export default itemActions