import Game from "./Game.js"
import _ITEMS from "../AllItems.js"
import Item from "./Item.js"

class UI{

    game: Game
    menus: {[key:string]:HTMLDivElement}
    activeMenu: HTMLDivElement | null
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
                let playerQty = this.game.player.inventory.items[item] ? this.game.player.inventory.items[item].qty : 0
                !this.game.crafting.matCheck(_ITEMS[item].id) && newItem.classList.add('insufficient')

                const nameDiv = document.createElement('div')
                nameDiv.classList.add('crafting-item-name')
                nameDiv.textContent = `${_ITEMS[item].name}`
                newItem.append(nameDiv)

                newItem.onclick = (e:MouseEvent) => {e.preventDefault(); this.selectedItem = _ITEMS[(e.target as HTMLDivElement).id]; this.update()}
                newItem.oncontextmenu = (e) => e.preventDefault()
                newItem.id = _ITEMS[item].id
                newItem.style.backgroundImage = `URL(${_ITEMS[item].icon})`

                const qtyDiv = document.createElement('div')
                qtyDiv.textContent = `(${playerQty})`
                qtyDiv.classList.add('crafting-item-qty')

                newItem.append(qtyDiv)

                itemsContainer.append(newItem)
            }
        }

        const itemInfo = document.createElement('div')
        itemInfo.id = "crafting-selected-item-info"
        itemInfo.oncontextmenu = (e) => e.preventDefault()
        itemInfo.style.display = "grid"
        itemInfo.style.alignContent = "center"
        itemInfo.style.justifyContent = "center"
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

    updateCraftingItemInfo(){
        if(!this.selectedItem) return

        const container = document.getElementById('crafting-selected-item-info') as HTMLDivElement
        container.innerHTML = ""

        const centerDiv = document.createElement('div')
        centerDiv.style.width = "90%"
        centerDiv.style.margin = "5%"

        const itemName = document.createElement('h3')
        itemName.id = "selected-item-name"
        itemName.textContent = this.selectedItem.name

        const itemDesc = document.createElement('p')
        itemDesc.id = "selected-item-desc"
        itemDesc.textContent = this.selectedItem.desc

        centerDiv.append(itemName, itemDesc)
        container.append(centerDiv)
    }

    updateReqs(){
        if(this.selectedItem === null) return

        const reqsContainer = document.getElementById("item-reqs-container") as HTMLDivElement
        reqsContainer.innerHTML = ""
        this.selectedItem.reqMats.forEach(mat => {
            const newReq = document.createElement('div')
            newReq.classList.add('req')
            let playerQty = this.game.player.inventory.items[mat.id] ? this.game.player.inventory.items[mat.id].qty : 0
            if(playerQty < mat.qty) newReq.classList.add('insufficient')

            const nameDiv = document.createElement('div')
            nameDiv.textContent = `${_ITEMS[mat.id].name}`
            nameDiv.classList.add('req-name')
            newReq.append(nameDiv)

            newReq.oncontextmenu = (e) => e.preventDefault()
            newReq.id = "req|"+mat.id
            newReq.style.backgroundImage = `URL(${_ITEMS[mat.id].icon})`

            const qtyDiv = document.createElement('div')
            qtyDiv.textContent = `(${mat.qty}/${playerQty})`
            qtyDiv.classList.add('req-qty')

            newReq.append(qtyDiv)

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
            const nameDiv = document.createElement('div')
            nameDiv.textContent = `${allItems[item].name}`
            nameDiv.classList.add('inventory-item-name')
            newItem.append(nameDiv)
            newItem.style.backgroundImage = `URL(${allItems[item].icon})`

            const qtyDiv = document.createElement('div')
            qtyDiv.textContent = `(${allItems[item].qty})`
            qtyDiv.classList.add('inventory-item-qty')

            newItem.append(qtyDiv)
            newItem.onclick = (e:MouseEvent) => {e.preventDefault(); this.selectedItem = _ITEMS[(e.target as HTMLDivElement).id]; this.update()}
            newItem.oncontextmenu = (e:MouseEvent) => e.preventDefault()
            itemsContainer.append(newItem)
        }

        container.append(itemsContainer)    
        this.gameContainer.append(container)
        this.inventoryPanel = container
        this.inventoryOpened = true
    }

    updateCraftingWindow(){
        const items = document.getElementsByClassName('crafting-item')
        for(let i = 0; i < items.length; i++){
            const elem = document.getElementById(items[i].id) as HTMLDivElement
            const elemQty = elem.lastChild as HTMLDivElement

            const playerQty = this.game.player.inventory.items[items[i].id] ? this.game.player.inventory.items[items[i].id].qty : 0
            elemQty.textContent = `(${playerQty})`

            if(!this.game.crafting.matCheck(items[i].id)){
                elem.classList.add('insufficient')
            }else{
                elem.classList.remove('insufficient')
            }
        }
    }

    closeInventory(){
        if(this.inventoryOpened && this.inventoryPanel){
            this.gameContainer.removeChild(this.inventoryPanel)
            this.inventoryPanel = null
            this.inventoryOpened = false
            this.selectedItem = null
        }
    }

    closeCrafting(){
        if(this.craftingOpened && this.craftingPanel){
            this.gameContainer.removeChild(this.craftingPanel)
            this.craftingPanel = null
            this.craftingOpened = false
            this.selectedItem = null
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
                        if(option.singleTime){
                            this.game.actions[option.actionCode](this.game)
                        }else{
                            this.game.player.startGathering(option.actionCode)
                        }
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
                this.game.actions[option.actionCode](this.game)
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
            const playerPos = this.game.player.position
            const px = playerPos.x - this.game.graphics.offsetX
            const py = playerPos.y - this.game.graphics.offsetY

            if(x  > px+1 || x < px-1 || y > py+1 || y < py-1){
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

    showMap(){
        if(this.game.graphics.fullMap === true){
            this.game.graphics.fullMap = false
        }
        else{
            this.game.graphics.fullMap = true
        }
    }

    closeAllWindows(){
        if(this.inventoryOpened){
            this.closeInventory()
        }
        if(this.craftingOpened){
            this.closeCrafting()
        }
    }

    toggleWindow(window: "inventory" | "crafting"){
        switch(window){
            case "inventory":{
                if(this.game.ui.inventoryOpened){
                    this.game.ui.closeInventory()
                }else{
                    this.game.ui.openInventory()
                }
                break
            }

            case "crafting":{
                if(this.craftingOpened){
                    this.closeCrafting()
                }else{
                    this.openCrafting()
                }
                break
            }
        }
    }

    update(){
        if(this.craftingOpened){
            this.updateReqs()
            this.updateCraftingWindow()
            this.updateCraftingItemInfo()
        }  
    }
}
export default UI