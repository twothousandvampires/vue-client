import Spawner from "./Enemy/src/Spawner";
import Functions from "./GameFunctions";

export default class Fight{

    constructor(game) {
        this.game = game
        this.spawner = new Spawner()
        this.enemy = []
        this.effects = []
        this.projectiles = []
        this.win = false
    }

    createEnemy(){
        this.spawner.createPull()
        this.enemy = this.enemy.concat(this.spawner.getWave())
    }

    newFight(){
        this.enemy = []
        this.spawner.pull = []
        this.scene = 'fight'
        this.createEnemy()
    }

    act(){
        if(Functions.every(3, this.game.game_tick)){
            this.enemy = this.enemy.concat(this.spawner.getWave())
            // setTimeout(()=>{
            //     Request.win(this.char.id).then(r => {
            //         console.log(r)
            //         this.prettifyData(r.data.data)
            //         this.win = false
            //     })
            // },3000)
        }

        this.game.char.act(this.game.mouse ,this.effects, this.enemy, this.game.game_tick, this.projectiles)
        this.projectiles.forEach(elem => {
            elem.act(this.game.char,  this.enemy,this.effects, this.projectiles)
        })
        this.enemy.forEach(elem => {
            elem.act(this.game.char, this.effects, this.enemy, this.projectiles)
        })
        this.effects.forEach(elem => {
            elem.act(this.effects)
        })
    }

}