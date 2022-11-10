import Tile from "./Tile.js"
import { Perlin } from '../Perlin/perlin.js';

class Map{

    tiles: Tile[]
    allTileTypes:{[key:string]: Tile}

    constructor(tilesPerColumn: number, tilesPerRow: number){
        // MAP GEN
        const perlin = new Perlin(0.5,0.5)
        const n1 = 23//Math.floor(Math.random()*100)           //  tweak for map gen
        const n2 = 8923//Math.floor(Math.random()*10000)           //  tweak for map gen
        const seed = 4339//Math.floor(Math.random()*10000)
        perlin.setSeed(seed)    //  tweak for map gen
        console.log({n1,n2, seed});
        
        const newMap = []
        for(let y = 0; y < tilesPerColumn; y++){
            for(let x = 0; x < tilesPerRow; x++){


                let rndValue = Math.abs(perlin.noise(x/n1+x/n2,y/n1+y/n2))

                let color:string
                let tileType:string
                let options:{actionCode:string, name:string,desc:string}[] = []
                let walkable = true
                // AGUA
                if(rndValue < 0.05){
                    color = "MediumTurquoise"
                    tileType = "water"
                    options = [
                        {actionCode:"fish",name:"fish", desc: "fishing"},
                        {actionCode:"drink",name:"drink", desc: "drinking water"}
                    ]
                    walkable = false
                }
                // ARENA
                else if(rndValue < 0.15){
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
                    walkable = false
                }

                let newTile = new Tile(y+(x*y),tileType,color,x,y,walkable,options)
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