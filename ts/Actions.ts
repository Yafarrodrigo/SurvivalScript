import Game from "./Classes/Game.js"

function showDesc(txt:string){
    document.getElementById('info')!.textContent = "..."+txt
    setTimeout(()=>{
        document.getElementById('info')!.textContent = ""
    },2000)
}

const ACTIONS = {
    fish: (game:Game, desc:string) => showDesc(desc),
    drink: (game:Game, desc:string) => showDesc(desc),
    gatherSand: (game:Game, desc:string) => showDesc(desc),
    gatherBranches: (game:Game, desc:string) => showDesc(desc),
    gatherSticks: (game:Game, desc:string) => showDesc(desc),
    gatherRocks: (game:Game, desc:string) => showDesc(desc),
    gatherFruits: (game:Game, desc:string) => showDesc(desc),
    gatherSap: (game:Game, desc:string) => showDesc(desc),
    wait: (game:Game, desc:string) => showDesc(desc),
    sit: (game:Game, desc:string) => showDesc(desc),
    startCampfire: (game:Game, desc:string) => showDesc(desc)
}

export default ACTIONS