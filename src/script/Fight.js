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
        this.map = {
            start_x : 200,
            start_y : 370
        }
    }

    createEnemy(content_count){
        this.spawner.createPull(content_count)
        this.enemy = this.enemy.concat(this.spawner.getWave(this.map))
    }

    newFight(node){
        let parsed_node = JSON.parse(node.map)
        this.map.width = parsed_node.width
        this.map.height = parsed_node.height
        this.enemy = []
        this.spawner.pull = []
        this.game.char.cord_x = this.map.start_x + this.map.width/2
        this.game.char.cord_y = this.map.start_y + this.map.height/2
        this.scene = 'fight'
        this.createEnemy(JSON.parse(node.content_count))
    }

    act(){
        if(Functions.every(3, this.game.game_tick)){
            this.enemy = this.enemy.concat(this.spawner.getWave(this.map))
            // setTimeout(()=>{
            //     Request.win(this.char.id).then(r => {
            //         console.log(r)
            //         this.prettifyData(r.data.data)
            //         this.win = false
            //     })
            // },3000)
        }

        this.game.char.act(this.game.mouse ,this.effects, this.enemy, this.game.game_tick, this.projectiles, this.map)
        this.projectiles.forEach(elem => {
            elem.act(this.game.char,  this.enemy,this.effects, this.projectiles, this.map)
        })
        this.enemy.forEach(elem => {
            elem.act(this.game.char, this)
        })
        this.effects.forEach(elem => {
            elem.act(this.effects)
        })
    }

}