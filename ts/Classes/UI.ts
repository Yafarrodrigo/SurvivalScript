import Game from "./Game.js"
import _ITEMS from "../AllItems.js"

class UI{

    game: Game
    menus: {[key:string]:HTMLDivElement}
    activeMenu: HTMLDivElement | null
    infoPanel: HTMLDivElement
    gameContainer: HTMLElement
    inventoryOpened: boolean
    inventoryPanel: HTMLDivElement | null
    craftingOpened: boolean
    craftingPanel: HTMLDivElement | null

    constructor(game: Game){
        this.game = game
        this.gameContainer = document.getElementById('game-container')!
        this.menus = this.createAllMenus()
        this.infoPanel = this.createInfoPanel()
        this.inventoryPanel = null
        this.activeMenu = null
        this.inventoryOpened = false
        this.craftingOpened = false
        this.craftingPanel = null
    }

    openCrafting(){

        if(this.craftingOpened) return

        const container = document.createElement('div')
        container.id = "crafting-panel"
        container.oncontextmenu = (e) => e.preventDefault()

        const header = document.createElement('div')
        header.id = "crafting-header"
        container.append(header)
        header.oncontextmenu = (e) => e.preventDefault()

        const h3 = document.createElement("h3")
        h3.id = "crafting-name"
        h3.textContent = "Crafting"
        header.append(h3)
        h3.oncontextmenu = (e) => e.preventDefault()


        this.gameContainer.append(container)
        this.craftingPanel = container
        this.craftingOpened = true
    }

    openInventory(){

        if(this.inventoryOpened) return

        const container = document.createElement('div')
        container.id = "inventory-panel"
        container.oncontextmenu = (e) => e.preventDefault()

        const header = document.createElement('div')
        header.id = "inventory-header"
        container.append(header)
        header.oncontextmenu = (e) => e.preventDefault()

        const h3 = document.createElement("h3")
        h3.id = "inventory-name"
        h3.textContent = "Inventory"
        header.append(h3)
        h3.oncontextmenu = (e) => e.preventDefault()

        const itemsContainer = document.createElement('div')
        itemsContainer.id = "inventory-items-container"
        itemsContainer.oncontextmenu = (e) => e.preventDefault()
        
        // items
        const allItems = this.game.player.inventory.items
        for(let item in allItems){
            const newItem = document.createElement('div')
            newItem.classList.add('inventory-item')
            newItem.id = allItems[item].id
            newItem.textContent = `${allItems[item].name}(${allItems[item].qty})`
            newItem.oncontextmenu = (e) => e.preventDefault()
            itemsContainer.append(newItem)
        }

        container.append(itemsContainer)    
        this.gameContainer.append(container)
        this.inventoryPanel = container
        this.inventoryOpened = true
    }

    closeInventory(){
        if(this.inventoryOpened && this.inventoryPanel){
            this.gameContainer.removeChild(this.inventoryPanel)
            this.inventoryPanel = null
            this.inventoryOpened = false
            this.closeCrafting()
        }
    }

    closeCrafting(){
        if(this.craftingOpened && this.craftingPanel){
            this.gameContainer.removeChild(this.craftingPanel)
            this.craftingPanel = null
            this.craftingOpened = false
            this.closeInventory()
        }
    }

    updateTileName(tileType:string){        
        const elem = document.getElementById('tile-name')!
        elem.textContent = tileType
    }

    createInfoPanel(){
        const container = document.createElement('div')
        container.id = "info-panel"
        
        const status = document.createElement('div')
        status.id = "player-status"
        container.append(status)

        const tileName = document.createElement('div')
        tileName.id = "tile-name-container"
        const nameDiv = document.createElement('div')
        nameDiv.id = "tile-name"
        nameDiv.textContent = "grass"
        tileName.append(nameDiv)
        container.append(tileName)

        const inventory = document.createElement('div')
        inventory.id = "inventory"
        for(let item in this.game.player.inventory.items){
            const {name, qty} = this.game.player.inventory.items[item]
            const elem = document.createElement('div')
            elem.classList.add('item')
            const nameElem = document.createElement('span')
            nameElem.classList.add('item-name') 
            nameElem.textContent = name
            elem.append(nameElem)
            const qtyElem = document.createElement('span')
            qtyElem.classList.add('item-qty') 
            qtyElem.textContent = qty.toString()
            elem.append(qtyElem)

            inventory.append(elem)
        }
        container.append(inventory)
        
        this.gameContainer.append(container)
        return container
    }

    updateInventory(){
        const inventory = document.getElementById('inventory')!
        inventory.innerHTML = ""
        for(let item in this.game.player.inventory.items){
            const {name, qty} = this.game.player.inventory.items[item]
            const elem = document.createElement('div')
            elem.classList.add('item')
            const nameElem = document.createElement('span')
            nameElem.classList.add('item-name') 
            nameElem.textContent = name
            elem.append(nameElem)
            const qtyElem = document.createElement('span')
            qtyElem.classList.add('item-qty') 
            qtyElem.textContent = qty.toString()
            elem.append(qtyElem)

            inventory.append(elem)
        }
    }

    createAllMenus(){
        const allMenus:{[key:string]:HTMLDivElement} = {}
        // TILES

        for(let type in this.game.map.allTileTypes){

            if(!this.game.map.allTileTypes[type].options.length) continue
            const container = document.createElement('div')
            container.classList.add('context-menu')
            container.id = type+"Menu"
            container.style.display = "none"
            const list = document.createElement('ul')
            this.game.map.allTileTypes[type].options.forEach( option => {
                const newItem = document.createElement('li')
                newItem.innerText = option.name
                newItem.onclick = (e) => {
                    e.preventDefault()
                    this.hideMenus()
                    if(!container.classList.contains("disabled")){
                        this.game.actions[option.actionCode](this.game, option.desc)
                    }
                }
                newItem.oncontextmenu = (e) => e.preventDefault()
                list.append(newItem)
            })
            container.append(list)
            this.gameContainer.append(container)
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
            newItem.innerText = option.name
            newItem.onclick = (e) => {
                e.preventDefault()
                this.hideMenus()
                this.game.actions[option.actionCode](this.game, option.desc)
            }
            newItem.oncontextmenu = (e) => e.preventDefault()
            list.append(newItem)
        })
        container.append(list)
        this.gameContainer.append(container)
        allMenus["playerMenu"] = container

        return allMenus
    }

    showMenu(e: MouseEvent, tileType: string, options:{actionCode: string,desc: string}[]){
        const type = tileType+"Menu"
        this.menus[type].style.top = e.offsetY + "px"
        this.menus[type].style.left = e.offsetX + "px"
        if(this.activeMenu !== null){
            this.activeMenu.style.display = "none"
            this.hideMenus()
            this.showMenu(e, tileType, options)
        }
        else{
            const {x,y} = this.game.cursorPos
            const {x: px, y:py} = this.game.player.position
            if(x > px+1 || x < px-1 || y > py+1 || y < py-1){
                console.log("muy lejos");
                this.menus[type].classList.add("disabled")
            }else{
                this.menus[type].classList.remove("disabled")
            }
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

    update(){
        this.updateInventory()
    }
}
export default UI