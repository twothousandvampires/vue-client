import Spawner from "./Enemy/src/Spawner";
import Functions from "./GameFunctions";
import Rock from "./Environment/Rock";
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
        this.map.rocks = this.generateRocks()
        this.enemy = []
        this.spawner.pull = []
        this.game.char.cord_x = this.map.start_x + this.map.width/2
        this.game.char.cord_y = this.map.start_y + this.map.height/2
        this.scene = 'fight'
        this.createEnemy(JSON.parse(node.content_count))
    }

    generateRocks(w, h){
        let result = []
        let rock_count = Math.floor(Math.random() * (10 - 3) + 3)
        let min_x, min_y, max_x, max_y
        for (let i = 0; i < rock_count; i++){
            let rock_width = Math.floor(Math.random() * (120 - 70) + 70)
            let rock_height = Math.floor(Math.random() * (120 - 70) + 70)
            let zone = Math.floor(Math.random() * 7)
            switch (zone){
                case 0:
                    min_x = this.map.start_x + 100 + rock_width/2
                    min_y = this.map.start_y
                    max_x = this.map.start_x + this.map.width/2 - 50 - rock_width/2
                    max_y = this.map.start_y + 100
                    break;
                case 1:
                    min_x = this.map.start_x + this.map.width/2 + 50 + rock_width/2
                    min_y = this.map.start_y
                    max_x = this.map.start_x + this.map.width - 100 - rock_width/2
                    max_y = this.map.start_y + 100
                    break;
                case 2:
                    min_x = this.map.start_x
                    min_y = this.map.start_y + 100 + rock_height/2
                    max_x = this.map.start_x + this.map.width
                    max_y = this.map.start_y + this.map.height/2 -50 - rock_height/2
                    break;
                case 3:
                    min_x = this.map.start_x + 100 + rock_width/2
                    min_y = this.map.start_y + this.map.height/2 - 50
                    max_x = this.map.start_x + this.map.width/2 - 50 - rock_width/2
                    max_y = this.map.start_y + this.map.height/2 + 50
                    break;
                case 4:
                    min_x = this.map.start_x + this.map.width/2 + 50 + rock_width/2
                    min_y = this.map.start_y + this.map.height/2 - 50
                    max_x = this.map.start_x + this.map.width - 100 - rock_width/2
                    max_y = this.map.start_y + this.map.height/2 + 50
                    break;
                case 5:
                    min_x = this.map.start_x
                    min_y = this.map.start_y + this.map.height/2 + 50 + rock_height/2
                    max_x = this.map.start_x + this.map.width
                    max_y = this.map.start_y + this.map.height - 100 - rock_height/2
                    break;
                case 6:
                    min_x = this.map.start_x + 100 + rock_width/2
                    min_y = this.map.start_y + this.map.height - 100
                    max_x = this.map.start_x + this.map.width/2 - 50 - rock_width/2
                    max_y = this.map.start_y + this.map.height
                    break;
                case 7:
                    min_x = this.map.start_x + this.map.width/2 + 50 + rock_width/2
                    min_y = this.map.start_y + this.map.height - 100
                    max_x = this.map.start_x + this.map.width - 100 - rock_width/2
                    max_y = this.map.start_y + this.map.height
                    break;
            }
            let random_x = Math.floor(Math.random() * (max_x - min_x) + min_x)
            console.log(min_x)
            let random_y = Math.floor(Math.random() * (max_y - min_y) + min_y)
            result.push(new Rock(random_x, random_y, rock_width, rock_height))
        }
        console.log(result)
        return result
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