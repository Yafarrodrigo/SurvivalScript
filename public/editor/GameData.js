const BACKEND_URL = "http://localhost:3000"

export class GameData {
    constructor(){
        this.items = null
        this.tiles = null
        this.selectedItem = ""
        this.init()
    }

    async init(){
        this.items = await this.getItems()
        this.tiles = await this.getTiles()
    }

    async getItems(){
        const items = await fetch(BACKEND_URL + '/items')
        const results = await items.json()
        return results
    }
    async getTiles(){
        const tiles = await fetch(BACKEND_URL + '/tiles')
        const results = await tiles.json()
        return results
    }
}

