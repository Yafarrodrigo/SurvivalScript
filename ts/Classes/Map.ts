import Tile from "./Tile.js"

class Map{

    tiles: Tile[]
    allTileTypes:{[key:string]: Tile}

    constructor(tilesPerColumn: number, tilesPerRow: number){
        // MAP GEN
        const newMap = []
        for(let y = 0; y < tilesPerColumn; y++){
            for(let x = 0; x < tilesPerRow; x++){
                const newTile = new Tile(y+(x*y),"grass","green",x,y,[
                    {actionName:"gatherRocks", desc: "gather rocks"},
                    {actionName:"gatherBranches", desc: "gather branches"}
                ])
                newMap.push(newTile)
            }
        }
        this.tiles = newMap
        // ALL TYPES
        let tileTypesCount:{[key:string]: Tile} = {}
        this.tiles.forEach( tile => {
            if(!tileTypesCount[tile.type]){
                tileTypesCount[tile.type] = tile
            }
        })
        this.allTileTypes = tileTypesCount
    }

    getTile(x:number, y:number){
        const tile = this.tiles.find( tile => tile.x === x && tile.y === y)
        return tile || this.tiles[0]      
    }
}

export default Map