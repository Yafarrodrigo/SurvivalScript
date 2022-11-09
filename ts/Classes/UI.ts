import Game from "./Game.js"

class UI{

    game: Game
    menus: {[key:string]:HTMLDivElement}
    activeMenu: HTMLDivElement | null

    constructor(game: Game){
        this.game = game
        this.menus = this.createAllMenus()
        this.activeMenu = null
    }

    createAllMenus(){
        const allMenus:{[key:string]:HTMLDivElement} = {}
        // TILES

        for(let type in this.game.map.allTileTypes){

            const container = document.createElement('div')
            container.classList.add('context-menu')
            container.id = type+"Menu"
            container.style.display = "none"
            const list = document.createElement('ul')
            this.game.map.allTileTypes[type].options.forEach( option => {
                const newItem = document.createElement('li')
                newItem.innerText = option.desc
                newItem.onclick = (e) => {e.preventDefault(); this.hideMenus(); this.game.actions[option.actionName]()}
                newItem.oncontextmenu = (e) => e.preventDefault()
                list.append(newItem)
            })
            container.append(list)
            document.body.append(container)
            allMenus[type+"Menu"] = container
        }
            

        // PLAYER
        const container = document.createElement('div')
        container.classList.add('context-menu')
        container.id = "playerMenu"
        container.style.display = "none"
        const list = document.createElement('ul')
        this.game.player.options.forEach( option => {
            const newItem = document.createElement('li')
            newItem.innerText = option.desc
            newItem.onclick = (e) => {e.preventDefault(); this.hideMenus(); this.game.actions[option.actionName]()}
            newItem.oncontextmenu = (e) => e.preventDefault()
            list.append(newItem)
        })
        container.append(list)
        document.body.append(container)
        allMenus["playerMenu"] = container

        return allMenus
    }

    showMenu(e: MouseEvent, tileType: string, options:{actionName: string,desc: string}[]){
        const type = tileType+"Menu"
        this.menus[type].style.top = e.offsetY + "px"
        this.menus[type].style.left = e.offsetX + "px"
        if(this.activeMenu !== null){
            this.activeMenu.style.display = "none"
            this.hideMenus()
            this.showMenu(e, tileType, options)
        }
        else{
            this.menus[type].style.display = "block"
        }
        this.activeMenu = this.menus[type]
    }

    hideMenus(){
        if(this.activeMenu !== null){
            this.activeMenu.style.display = "none"
            this.activeMenu = null
        }
    }
}

export default UI