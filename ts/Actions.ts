import itemActions from "./Actions/itemActions.js"
import playerActions from "./Actions/playerActions.js"
import tileActions from "./Actions/tileActions.js"

const ACTIONS = {
    ...itemActions,
    ...tileActions,
    ...playerActions
}

export default ACTIONS