import { GameData } from "./GameData.js"

const gameData = new GameData()

const searchBar = document.getElementById('item-search')
searchBar.addEventListener('keyup', e => {
    updateItemList(e.target.value)
})

function showItemData(e, itemId){
    gameData.selectedItem = itemId
    const itemDataContainer = document.getElementById('item-data')
    const item = gameData.items[itemId]
    const itemPre = document.createElement('pre')
    itemPre.textContent = JSON.stringify(item, undefined, 4)
    itemDataContainer.replaceChildren(itemPre)
}

function updateItemList(filter = ""){
    const itemListContainer = document.getElementById('item-list')
    itemListContainer.innerHTML = ""
    for(let item in gameData.items){
        if(!item.includes(filter)) continue
        const itemDiv = document.createElement('div')
        const nameDiv = document.createElement('div')
        nameDiv.innerText = `${item}`
        nameDiv.classList.add('nameDiv')
        nameDiv.addEventListener('click', e => {
            showItemData(e, item)
            const allNodes = document.querySelectorAll('.item-selector')
            allNodes.forEach( node => node.classList.remove('selected-item'))
            nameDiv.parentNode.classList.add('selected-item')
        })
        itemDiv.append(nameDiv)
        itemDiv.classList.add('item-selector')
        if(gameData.selectedItem === item){
            itemDiv.classList.add('selected-item')
        }

        const editButton = document.createElement('button')
        editButton.textContent = "edit"
        editButton.classList.add('edit-button')
        itemDiv.append(editButton)

        itemListContainer.append(itemDiv)
    }
}

setTimeout(()=>{
    updateItemList()
},100)