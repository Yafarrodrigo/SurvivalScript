import { GameData } from "./GameData.js"
import {createItemForm, createNewOption}  from "./createItemForm.js"

const gameData = new GameData()

const searchBar = document.getElementById('item-search')
searchBar.addEventListener('keyup', e => {
    updateItemList(e.target.value)
})

function prepareToPOST(form){
    const data = new FormData(form)
    const entries = data.entries()
    const rawObj = {...entries}
    for(let entry of entries){rawObj[entry[0]] = entry[1]}
    const craftedCheckbox = document.getElementById('itemCraftedInput')
    const crafted = craftedCheckbox.checked
    const result = {
        id: rawObj.itemId,
        type: rawObj.itemType,
        name: rawObj.itemName,
        desc: rawObj.itemDesc,
        relatedTile: rawObj.itemRelatedTile,
        weigth: rawObj.itemWeight,
        crafted
    }
    return result
}

function showCreateItemForm(){
    const itemDataContainer = document.getElementById('item-data')
    itemDataContainer.innerHTML = createItemForm

    const form = document.getElementById('createItemForm')
    form.addEventListener('submit', function(e){
        e.preventDefault()
        const objToPOST = prepareToPOST(this)
    })

    const selectInput = document.getElementById('itemRelatedTileInput')

    const nullOption = document.createElement('option')
    nullOption.textContent = "none"
    nullOption.value = "none"
    selectInput.append(nullOption)

    for(let tile in gameData.tiles){
        const newOption = document.createElement('option')
        newOption.textContent = tile
        newOption.value = tile
        selectInput.append(newOption)
    }

    // item actions (options)
    const actionsContainer = document.getElementById('optionsContainer')
    const addActionButton = document.getElementById('addActionButton')
    addActionButton.addEventListener('click', (e) => {
        e.preventDefault()
        const newAction = document.createElement('div')
        newAction.classList.add('inputGroupActions')
        newAction.innerHTML = createNewOption
        actionsContainer.append(newAction)

        const allRemoveButtons = document.querySelectorAll('.removeActionButton')
        allRemoveButtons.forEach( button => button.addEventListener('click', (e) => {
            e.preventDefault()
            button.parentNode.remove()
        }))
    })
}

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

setTimeout(()=>{
    showCreateItemForm()
},200)