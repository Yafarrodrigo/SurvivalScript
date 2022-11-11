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
        
        const newMap = []
        for(let y = 0; y < tilesPerColumn; y++){
            for(let x = 0; x < tilesPerRow; x++){

                let rndValue = Math.abs(perlin.noise(x/n1+x/n2,y/n1+y/n2))
                let tileType:string

                // AGUA
                if(rndValue < 0.05){
                    tileType = "water"
                }
                // ARENA
                else if(rndValue < 0.15){
                    tileType = "sand"
                }
                // PASTO
                else if(rndValue < 0.45){
                    tileType = "grass"
                }
                else{
                    tileType = "trees"
                }

                let newTile = new Tile(tileType,x,y)
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

    changeTile(x: number,y: number, tileType:string){
        const oldTile = this.getTile(x,y)
        const index = this.tiles.indexOf(oldTile)
        this.tiles[index] = new Tile(tileType, x ,y)
    }
}

export default Map