import Tile from "./Tile.js"
import { Perlin } from '../Perlin/perlin.js';

class Map{

    tiles: Tile[]
    allTileTypes:{[key:string]: Tile}

    constructor(tilesPerColumn: number, tilesPerRow: number){
        // MAP GEN
        const perlin = new Perlin(0.5,0.5)
        perlin.setSeed(5000)
        const newMap = []
        for(let y = 0; y < tilesPerColumn; y++){
            for(let x = 0; x < tilesPerRow; x++){

                let rndValue = Math.abs(perlin.noise(x/1000+x/25,y/1000+y/25))

                let color:string
                let tileType:string
                let options:{actionCode:string, name:string,desc:string}[] = []
                // AGUA
                if(rndValue < 0.05){
                    color = "MediumTurquoise"
                    tileType = "water"
                    options = [
                        {actionCode:"fish",name:"fish", desc: "fishing"},
                        {actionCode:"drink",name:"drink", desc: "drinking water"}
                    ]
                }
                // ARENA
                else if(rndValue < 0.1){
                    color = "khaki"
                    tileType = "sand"
                    options = [
                        {actionCode:"gatherSand",name:"gather sand", desc: "gathering sand from the beach"}
                    ]
                }
                // PASTO
                else if(rndValue < 0.45){
                    color = "MediumSeaGreen"
                    tileType = "grass"
                    options = [
                        {actionCode:"gatherRocks",name:"gather rocks", desc: "gathering rocks from the ground"},
                        {actionCode:"gatherSticks",name:"gather sticks", desc: "gathering sticks from the ground"}
                    ]
                }
                // ARBOLES
                else{
                    color = "ForestGreen"
                    tileType = "trees"
                    options = [
                        {actionCode:"gatherBranches",name:"gather branches", desc: "gathering branches from trees"},
                        {actionCode:"gatherFruits",name:"gather fruits", desc: "gathering fruits from trees"},
                        {actionCode:"gatherSap",name:"gather sap", desc: "gathering sap from trees"}
                    ]
                }

                let newTile = new Tile(y+(x*y),tileType,color,x,y,options)
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