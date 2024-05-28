import Functions from "./GameFunctions";
import BattleRender from "./Scr/render/BattleRender";
import EnemyFactory from "./Scr/factories/EnemyFactory";
import Point from "./Scr/Point";
import BigCaveRock from "./Environment/BigCaveRock/BigCaveRock";
import MediumCaveRock from "./Environment/MediumCaveRock/MediumCaveRock";
import SmallCaveRock from "./Environment/SmallCaveRock/SmallCaveRock";
import BigStalagmite from "./Environment/BigStalagmite/BigStalagmite";
import MediumStalagmite from "./Environment/MediumStalagmite/MediumStalagmite";
import SmallStalagmite from "./Environment/SmallStalagmite/SmallStalagmite";
import Fight from "./Fight";
import Unit from "./Scr/Unit";


const enemy_creator = new EnemyFactory()
export default class Battle extends Fight{

    constructor(node, game) {
        super(game)
        this.pull = []

        this.win = false

        this.map = {
            start_x : 370,
            start_y : 370,
            player_cell: 16
        }

        this.render = new BattleRender()
        this.tick = 0
        this.columns = 7
        this.rows = 5
        this.turn_queue = []
        this.init(node)
    }
    getPlayerCell(){
        return this.cells.find(elem => elem.num === this.map.player_cell)
    }
    checkWin(){
        if(this.enemy.every(elem =>{
            return  elem.isDead()
        })){
            setTimeout(() => {
                this.fightEnd()
            }, 5000)
        }
    }

    addEffect(effect){
        this.effects.push(effect)
    }
    addArea(area){
        this.areas.push(area)
    }
    fightEnd(){
        this.player.is_in_figth = false
        this.game.endFight()
    }
    init(node){
        this.generateCells()
        this.player.prepareToFight(this)

        let content = JSON.parse(node.content.content)

        this.map.width = content.map.width
        this.map.height = content.map.height

        this.createPull(content.enemy.groups)
    }
    generateCells(){
        this.cells = []
        let num = 1
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.columns; j++){
                this.cells.push({
                    content: undefined,
                    width: 75,
                    height: 120,
                    num: num,
                    x: j * 75 + this.map.start_x,
                    y: i * 120 + this.map.start_y
                })
                num++
            }
        }
    }
    createPull(enemy_array){
        enemy_array.forEach(elem => {
            elem.forEach(g => {
                let e = enemy_creator.create(g.name, this)
                e.num = g.num
                this.pull.push(e)
            })
        })

        this.turn_queue.push(this.player)

        this.pull.sort(()=>Math.random()-0.5)

        this.pull.forEach(elem => {
            this.enemy.push(elem)
            this.turn_queue.push(elem)

            let cell = this.cells.find(cell => cell.num === elem.num)
            if(cell){
                cell.content = elem
                elem.setCellCords(cell)
            }
        })

        this.sortBySpeed()
        this.turn_queue[0].startTurn()
    }
    getTargetByPoint(point){
        let target = false
        this.cells.some(elem => {
            if(point?.x> elem.x && point?.x< elem.x + elem.width && point?.y > elem.y  && point?.y < elem.y + elem.height){
                target = elem?.content
            }
        })
        return target
    }
    sortBySpeed(){
        this.turn_queue.sort((a,b) => b.speed - a.speed)
    }
    checkLine(num){
        if(num % 7){
            return !this.cells[num - 2].content || this.cells[num - 2].content.isDead()
                &&  !this.cells[num - 3].content || this.cells[num - 2].content.isDead()
        }
        else{
            return !this.cells[num - 2].content || this.cells[num - 2].content.isDead()
        }
    }

    async next(enemy, delay = 1000){
        let i = this.turn_queue.indexOf(enemy)
        let next = this.turn_queue[i + 1]


        if(!next){
            this.sortBySpeed()
            next = this.turn_queue[0]
        }

        await Functions.sleep(delay)
        next.startTurn()
    }
    getWave(){
        for(let i = 0; i < 8; i++){
            let cords = this.getCords(i, this.map)
            let cord_x = cords[0]
            let cord_y = cords[1]

            let e = this.pull.pop()
            if(!e){
                return
            }

            e.point = new Point(cord_x, cord_y)

            this.addEnemyToBattle(e)
        }
    }
    addEnemyToBattle(e){
        if(!this.checkFrame(e)){
            return
        }

        e.stacked = this.checkPlace(e)
        e.env_stacked = this.checkEnvironmentPlace(e)

        this.enemy.push(e)
    }

    checkEnvironmentPlace(object){
        for(let i = 0; i < this.map.environment.length; i++){
            let rock = this.map.environment[i]
            if(Functions.rectCollision(rock, object)){
                return true
            }
        }

        return false
    }

    checkFrame(object){
        return object.point.x > this.map.start_x && object.point.x < this.map.start_x + this.map.width
            && object.point.y > this.map.start_y && object.point.y < this.map.start_y + this.map.height
    }

    checkPlace(object){
        let all = this.enemy.concat(this.player)
        for(let i = 0; i < all.length; i++){
            let enemy = all[i]
            if(enemy[i] === this || enemy.stacked || enemy.phased || enemy.state === Unit.STATE_DEAD || enemy.state === Unit.STATE_DYING){
                continue
            }
            if(Functions.rectCollision(enemy, object)){
                return true
            }
        }

        return false
    }

    getCords(i, map){
        switch (i){
            case 0:
                return [map.start_x + 50, map.start_y + 50]
            case 1:
                return [map.start_x + map.width/2, map.start_y + 50]
            case 2:
                return [map.start_x + map.width - 50, map.start_y + 50]
            case 3:
                return [map.start_x + 50, map.start_y + map.height/2]
            case 4:
                return [map.start_x + map.width - 50, map.start_y + map.height/2]
            case 5:
                return [map.start_x + 50, map.height + map.start_y - 50]
            case 6:
                return [map.start_x + map.width/2, map.height + map.start_y - 50]
            case 7:
                return [map.start_x + map.width- 50, map.height + map.start_y- 50]
        }
    }
    getRock(rock) {
        let min_x, min_y, max_x, max_y
        let rock_width = rock.size_x
        let rock_height = rock.size_y
        let zone = Math.floor(Math.random() * 7)
        switch (zone) {
            case 0:
                min_x = this.map.start_x + 100 + rock_width / 2
                min_y = this.map.start_y + rock_height / 2
                max_x = this.map.start_x + this.map.width / 2 - 50 - rock_width / 2
                max_y = this.map.start_y + 100
                break;
            case 1:
                min_x = this.map.start_x + this.map.width / 2 + 50 + rock_width / 2
                min_y = this.map.start_y + rock_height / 2
                max_x = this.map.start_x + this.map.width - 100 - rock_width / 2
                max_y = this.map.start_y + 100
                break;
            case 2:
                min_x = this.map.start_x + rock_width / 2
                min_y = this.map.start_y + 100 + rock_height / 2
                max_x = this.map.start_x + this.map.width - rock_width / 2
                max_y = this.map.start_y + this.map.height / 2 - 50 - rock_height / 2
                break;
            case 3:
                min_x = this.map.start_x + 100 + rock_width / 2
                min_y = this.map.start_y + this.map.height / 2 - 50
                max_x = this.map.start_x + this.map.width / 2 - 50 - rock_width / 2
                max_y = this.map.start_y + this.map.height / 2 + 50
                break;
            case 4:
                min_x = this.map.start_x + this.map.width / 2 + 50 + rock_width / 2
                min_y = this.map.start_y + this.map.height / 2 - 50
                max_x = this.map.start_x + this.map.width - 100 - rock_width / 2
                max_y = this.map.start_y + this.map.height / 2 + 50
                break;
            case 5:
                min_x = this.map.start_x + rock_width / 2
                min_y = this.map.start_y + this.map.height / 2 + 50 + rock_height / 2
                max_x = this.map.start_x + this.map.width - rock_width / 2
                max_y = this.map.start_y + this.map.height - 100 - rock_height / 2
                break;
            case 6:
                min_x = this.map.start_x + 100 + rock_width / 2
                min_y = this.map.start_y + this.map.height - 100
                max_x = this.map.start_x + this.map.width / 2 - 50 - rock_width / 2
                max_y = this.map.start_y + this.map.height - rock_height / 2
                break;
            case 7:
                min_x = this.map.start_x + this.map.width / 2 + 50 + rock_width / 2
                min_y = this.map.start_y + this.map.height - 100
                max_x = this.map.start_x + this.map.width - 100 - rock_width / 2
                max_y = this.map.start_y + this.map.height - rock_height / 2
                break;
        }

        let random_x = Math.floor(Math.random() * (max_x - min_x) + min_x)
        let random_y = Math.floor(Math.random() * (max_y - min_y) + min_y)

        rock.point = new Point(random_x, random_y)
        this.map.environment.push(rock)
    }

    generateRocks(){

        let small_stalagmite_count = Math.floor(Math.random() * 8)
        let medium_stalagmite_count = Math.floor(Math.random() * 4)
        let big_stalagmite_count = Math.floor(Math.random() * 2)


        let big_rock_count = Math.floor(Math.random() * 2)
        let medium_rock_count = Math.floor(Math.random() * 4)
        let small_rock_count = Math.floor(Math.random() * 8)

        for(let i = 0; i < small_rock_count; i++){
           this.getRock(new SmallCaveRock(0, 0))
        }

        for(let i = 0; i < medium_rock_count; i++){
            this.getRock(new MediumCaveRock(0, 0))
        }

        for(let i = 0; i < big_rock_count; i++){
            this.getRock(new BigCaveRock(0, 0))
        }


        for(let i = 0; i < small_stalagmite_count; i++){
            this.getRock(new SmallStalagmite(0, 0))
        }

        for(let i = 0; i < medium_stalagmite_count; i++){
            this.getRock(new MediumStalagmite(0, 0))
        }

        for(let i = 0; i < big_stalagmite_count; i++){
            this.getRock(new BigStalagmite(0, 0))
        }
    }

    allDead(){
        return this.enemy.every(elem => {
           return elem.state === 'dying';
        })
    }

    sendHP(){
        axios({
            method: 'post',
            url: '//127.0.0.1:8000/api/character/set/' + this.player.id,
            data : {
                life: this.player.life,
                mana: this.player.mana,
                dead: this.player.dead
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
    }

    frame(){
        if( Functions.every(4, this.tick)){
            this.sendHP()
        }


        this.player.act()

        this.projectiles.forEach(elem => {
            elem.act(this)
        })

        // this.cells.forEach(cell => {
        //     if(cell.content){
        //         console.log(cell.content)
        //         cell.content.act()
        //     }
        // })

        this.enemy.forEach(elem => {
            elem.act()
        })

        this.effects.forEach(elem => {
            elem.act()
        })
        this.effects_before.forEach(elem => {
            elem.act(this)
        })
        this.effects_after.forEach(elem => {
            elem.act(this)
        })

        this.areas_before.forEach(elem => {
            elem.act(this)
        })

        this.areas.forEach(elem => {
            elem.act(this)
        })

        this.areas_after.forEach(elem => {
            elem.act(this)
        })
        this.render.draw(this)

        this.tick ++
    }

}