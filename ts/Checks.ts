import Player from "./Classes/Player.js"

const CHECKS = {
    canChopTrees: (player: Player) => {
        const toolsToChop = ["tool_hatchet"]
        if(player.equipment.hands !== null && toolsToChop.includes(player.equipment.hands.id)) return true
        else return false
    },
    canFish: (player:Player) => {
        const toolsToFish = ["tool_fishingRod"]
        if(player.equipment.hands !== null && toolsToFish.includes(player.equipment.hands.id) &&
            player.inventory.has('cons_bait_worm',1)){
                return true
        }else{
            return false
        }
        

    },
}

export default CHECKS