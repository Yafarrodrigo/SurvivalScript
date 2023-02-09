import Tile from "./Tile.js"
import { Perlin } from '../Perlin/perlin.js';
import Game from "./Game.js";
import _TILES, { TilesDict } from "../AllTiles.js";

class Map{
    
    game:Game
    width: number
    height: number
    tilesPerRow: number
    tilesPerColumn: number

    tileSize: number
    tiles: Tile[]
    allTileTypes:TilesDict
    

    constructor(game:Game, width: number, height:number){
        this.game = game
        this.tileSize = 32
        this.width = width
        this.height = height
        this.tilesPerRow = Math.floor(this.width / this.tileSize)
        this.tilesPerColumn = Math.floor(this.height / this.tileSize)
        // MAP GEN
        const perlin = new Perlin(0.5,0.5)
        const n1 = Math.floor(Math.random()*50)+100         //  tweak for map gen
        const n2 = Math.floor(Math.random()*50)+25         //  tweak for map gen
        const seed =  Math.floor(Math.random()*1000)
        perlin.setSeed(seed)    //  tweak for map gen

        console.table({
            n1,n2,seed
        });
        
        
        const newMap = []
        for(let y = 0; y < this.tilesPerColumn; y++){
            for(let x = 0; x < this.tilesPerRow; x++){

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

                const finalTile = this.discoverTile(tileType)
                let newTile = new Tile(finalTile,x,y,_TILES[finalTile].base)
                newMap.push(newTile)
            }
        }
        this.tiles = newMap

        // ALL TYPES
        let tileTypesCount: TilesDict = {}
        for(let tile in _TILES){
            if(!tileTypesCount[_TILES[tile].type]){
                tileTypesCount[tile] = _TILES[tile]
            }
        }

        this.allTileTypes = tileTypesCount
    }

    getTile(x:number, y:number){
        const tile = this.tiles.find( tile => tile.x === x && tile.y === y)
        return tile || new Tile("gameEdge",9999999,9999999)     
    }

    getRandomTile(){
        const arr = this.tiles
        const shuffledArr = arr.sort(()=>Math.random() -0.5)
        return shuffledArr[0]
    }

    changeTile(x: number,y: number, tileType:string, base?:string){
        const oldTile = this.getTile(x,y)
        const index = this.tiles.indexOf(oldTile)
        const newTile = new Tile(tileType, oldTile.x ,oldTile.y, base)
        
        this.tiles[index] = newTile
    }

    discoverTile(type:string){
        switch(type){
            case "grass":{
                let rnd = Math.random()
                if(rnd >= 0.995){
                    return "bush"
                }
                else if(rnd <= 0.025){
                    return "stones"
                }
                else{
                    return "grass"
                }
            }
            case "sand":{
                let rnd = Math.random()
                if(rnd >= 0.9){
                    return "seashells"
                }
            }
        }
        return type
    }
}

export default Map