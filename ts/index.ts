import Game from './Classes/Game.js'

const game = new Game()
game.start()

const h1 = document.createElement('h1')
h1.textContent = ""
h1.id = "info"
document.body.append(h1)

console.log(game);
