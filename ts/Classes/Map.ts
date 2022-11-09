import Tile from "./Tile.js"

class Map{

    tiles: Tile[]
    tileTypes: string[]
    tileOptions:{[key: string]: string[]} = {
        "grass": ["gather rocks", "gather branches", "start campfire"],
        "player": ["wait","sit"]
    }

    constructor(tilesPerColumn: number, tilesPerRow: number){
        // MAP GEN
        const newMap = []
        for(let y = 0; y < tilesPerColumn; y++){
            for(let x = 0; x < tilesPerRow; x++){
                const newTile = new Tile(y+(x*y),"grass","green",x,y)
                newMap.push(newTile)
            }
        }
        this.tiles = newMap

        // ALL TYPES
        let tileTypesCount:string[] = []
        this.tiles.forEach( tile => {
            if(!tileTypesCount.includes(tile.type)){
                tileTypesCount.push(tile.type)
            }
        })
        this.tileTypes = tileTypesCount.length ? tileTypesCount : []
    }

    getTile(x:number, y:number){
        const tile = this.tiles.find( tile => tile.x === x && tile.y === y)
        return tile || this.tiles[0]      
    }
}

export default Map