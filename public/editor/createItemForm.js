export const createItemForm = `
<form id="createItemForm">

<div class="inputGroup">
    <label for="itemId">id:</label>
    <input required type="text" name="itemId" id="itemIdInput">
</div>

<div class="inputGroup">
    <label for="itemType">type:</label>
    <select required name="itemType" id="itemTypeInput">
        <option value="material">material</option>
        <option value="tool">tool</option>
        <option value="consumible">consumible</option>
        <option value="building">building</option>
    </select>
</div>

<div class="inputGroup">
    <label for="itemName">name:</label>
    <input required type="text" name="itemName" id="itemNameInput">
</div>

<div class="inputGroup">
    <label for="itemDesc">Desc:</label>
    <input required type="text" name="itemDesc" id="itemDescInput">
</div>

<div class="inputGroup">
    <label for="itemCrafted">Crafted?</label>
    <input type="checkbox" name="itemCrafted" id="itemCraftedInput">
</div>

<div class="inputGroup">
    <label for="itemRelatedTile">Related Tile?</label>
    <select required name="itemRelatedTile" id="itemRelatedTileInput">
    </select>
</div>

<div class="inputGroup">
    <label for="itemWeight">Weight:</label>
    <input required type="number" name="itemWeight" id="itemWeightInput">
</div>

<button id="addActionButton"> add action </button>
<div id="optionsContainer"> </div>

<input id="submitNewItem" type="submit" value="Create">
</form>
`

export const createNewOption = `
<label for="actionCode">ActionCode:</label>
<input required type="text" name="actionCode" id="actionCodeInput">
<label for="actionName">Name:</label>
<input required type="text" name="actionName" id="actionNameInput">
<label for="actionDesc">Desc:</label>
<input required type="text" name="actionDesc" id="actionDescInput">
<label for="actionSingleTime">SingleTime:</label>
<input required type="checkbox" name="actionSingleTime" id="actionSingleTimeInput">
<button class="removeActionButton"> x </button>
`