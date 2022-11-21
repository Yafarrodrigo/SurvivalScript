import Game from "./Game.js"
import _ITEMS from "../AllItems.js"
import Item from "./Item.js"

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
    selectedItem: Item | null

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
        this.selectedItem = null
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

        const middleDiv = document.createElement('div')
        middleDiv.style.display = "flex"
        middleDiv.style.marginTop = "5px"
        middleDiv.style.height = "90%"

        const itemsContainer = document.createElement('div')
        itemsContainer.id = "crafting-items-container"
        itemsContainer.oncontextmenu = (e) => e.preventDefault()
        middleDiv.append(itemsContainer)

        const craftingZone = document.createElement('div')
        craftingZone.id = "crafting-zone"
        craftingZone.oncontextmenu = (e) => e.preventDefault()
        middleDiv.append(craftingZone)

        // items to craft
        for(let item in _ITEMS){
            if(_ITEMS[item].crafted){
                const newItem = document.createElement('div')
                newItem.classList.add('crafting-item')
                newItem.textContent = `${_ITEMS[item].name}`
                newItem.onclick = (e:MouseEvent) => {e.preventDefault(); this.selectedItem = _ITEMS[(e.target as HTMLDivElement).id]; this.update()}
                newItem.oncontextmenu = (e) => e.preventDefault()
                newItem.id = _ITEMS[item].id
                itemsContainer.append(newItem)
            }
        }

        const itemInfo = document.createElement('div')
        itemInfo.id = "crafting-selected-item-info"
        itemInfo.oncontextmenu = (e) => e.preventDefault()
        craftingZone.append(itemInfo)

        const craftReqs = document.createElement('div')
        craftReqs.id = "item-reqs-container"
        craftReqs.oncontextmenu = (e) => e.preventDefault()
        craftingZone.append(craftReqs)

        const craftButton = document.createElement('button')
        craftButton.id = "craft-button"
        craftButton.textContent = "Craft!"
        craftButton.onclick = (e) => {e.preventDefault(); if(this.selectedItem){this.game.crafting.craft(this.selectedItem.id)}}
        craftButton.oncontextmenu = (e) => e.preventDefault()
        craftingZone.append(craftButton)

        container.append(middleDiv)
        this.gameContainer.append(container)
        this.craftingPanel = container
        this.craftingOpened = true
    }

    updateReqs(){
        if(this.selectedItem === null || this.craftingOpened === false) return

        const reqsContainer = document.getElementById("item-reqs-container") as HTMLDivElement
        reqsContainer.innerHTML = ""
        this.selectedItem.reqMats.forEach(mat => {
            const newReq = document.createElement('div')
            newReq.classList.add('req')
            let playerQty = this.game.player.inventory.items[mat.id] ? this.game.player.inventory.items[mat.id].qty : 0
            if(playerQty < mat.qty) newReq.classList.add('insufficient')
            newReq.textContent = `${_ITEMS[mat.id].name} (${mat.qty}/${playerQty})`
            newReq.oncontextmenu = (e) => e.preventDefault()
            newReq.id = "req|"+mat.id
            reqsContainer.append(newReq)
        })
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
            newItem.onclick = (e:MouseEvent) => {e.preventDefault(); this.selectedItem = _ITEMS[(e.target as HTMLDivElement).id]; this.update()}
            newItem.oncontextmenu = (e:MouseEvent) => e.preventDefault()
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
            this.selectedItem = null
            this.closeCrafting()
        }
    }

    closeCrafting(){
        if(this.craftingOpened && this.craftingPanel){
            this.gameContainer.removeChild(this.craftingPanel)
            this.craftingPanel = null
            this.craftingOpened = false
            this.selectedItem = null
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
        this.updateReqs()
    }
}
export default UI