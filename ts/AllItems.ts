import Item from "./Classes/Item.js"
import buildings from "./Items/buildings.js"
import consumibles from "./Items/consumibles.js"
import materials from "./Items/Materials.js"
import tools from "./Items/tools.js"

interface ItemsDict {
    [key:string]: Item
    
}

const _ITEMS: ItemsDict =  {

    ...materials,
    ...tools,
    ...buildings,
    ...consumibles

}

export default _ITEMS