import Functions from "./GameFunctions";
import BattleRender from "./Scr/render/BattleRender";
import EnemyFactory from "./Scr/factories/EnemyFactory";
import Fight from "./Fight";
import {useLogStore} from "@/stores/log";
import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import requestService from "../../../services/requestService";

export default class Battle extends Fight{

    constructor(node, game) {
        super(game)
        this.enemy_creator = new EnemyFactory()
        this.player_cell = 16
        this.enemy_slots = [5, 12, 19, 26, 33,6, 13, 20, 27, 34,7, 14, 21, 28, 35]
        this.cell_w = 50
        this.cell_h = 75
        this.log = useLogStore()
        this.tick = 0
        this.columns = 7
        this.rows = 5
        this.turn_queue = []
        this.enemy_pull = []
        this.summons = []
        this.render = new BattleRender(this)
        this.init(node)
        this.turn_count = 0

    }
    getPlayerCell(){
        return this.cells.find(elem => elem.num === this.player_cell)
    }
    pushSummon(summon){
        let cells = this.cells.filter(elem => !elem.content && !this.enemy_slots.includes(elem.num))
        let cell = cells[Math.floor(Math.random() * cells.length)]
        if(cell){
            cell.content = summon
            summon.setCellCords(cell, this.cell_w, this.cell_h)
            summon.num = cell.num
            this.turn_queue.push(summon)
            this.summons.push(summon)
        }
    }
    pushEnemyInFreeSlot(enemy_name, cell = undefined){
        let free = this.getFreeCells()
        if(!cell){
            cell = free[Math.floor(Math.random() * free.length)]
        }
        if(cell){
            let g = 0
            if(typeof enemy_name === 'string'){
                g = this.enemy_creator.create(enemy_name, this)
            }
            else{
                g = enemy_name
            }
            cell.content = g
            g.setCellCords(cell, this.cell_w, this.cell_h)
            g.num = cell.num
            this.turn_queue.push(g)
            this.enemy_pull.push(g)
        }
    }
    async start(){

        this.turn_queue.push(this.player)

        let enemy_with_aura = this.turn_queue.filter(elem => elem.auras.length)

        enemy_with_aura.forEach(elem => {
            elem.auras.forEach(aura => {
                aura.affect(this.turn_queue)
                Functions.createModal(elem, aura.name)
            })
        })

        this.sortByInitiative()

        this.turn_queue[0].startTurn(this.turn_queue, this.player)
    }
    getAliveEnemies(enemy = undefined){
        return this.enemy_pull.filter(elem => !elem.isDead() && elem != enemy)
    }
    getRandomAliveEnemy(){
        let pull = this.getAliveEnemies()
        return pull[Math.floor(Math.random() * pull.length)]
    }
    getEnemies(){
        return this.turn_queue.filter(elem => elem instanceof Enemy)
    }
    addEffect(effect, cell_num = undefined){
        if(cell_num){
            effect.addCell(this.cells.find(elem => elem.num === cell_num))
        }
        
        if(effect.type === 'ground'){
            this.ground_effects.push(effect)
        }
        else {
            this.effects.push(effect)
        }
    }
    addArea(area){
        this.areas.push(area)
    }
    fightEnd(){
        this.sendHP()
        this.player.is_in_figth = false
        this.game.endFight()
    }
    retreat(){
        this.sendHP()
        this.player.is_in_figth = false
        this.game.playerRetreat()
    }
    
    init(node){
        this.generateCells()
        this.player.prepareToFight(this)
        let content = JSON.parse(node.content.content)
        this.createPull(content.enemy.groups)
    }
    generateCells(){
        let total_w = this.columns * this.cell_w
        let total_h = this.rows * this.cell_h

        let x = 1300/2 - total_w / 2
        let y = 1300/2 - total_h / 2

        this.cells = []
        let num = 1
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.columns; j++){
                this.cells.push({
                    content: undefined,
                    width: this.cell_w,
                    height: this.cell_h ,
                    num: num,
                    x: j * this.cell_w + x,
                    y: i * this.cell_h + y
                })
                num++
            }
        }
    }
    createEnemy(enemy_name, cell_number = undefined){
        
        if(!cell_number){
            cell_number = this.getFreeCells()[0].num
        }

        let e = this.enemy_creator.create(enemy_name, this)
        e.num = cell_number
        this.turn_queue.push(e)
        this.enemy_pull.push(e)
        let cell = this.cells.find(cell => cell.num === e.num)
        if(cell){
            cell.content = e
            e.setCellCords(cell, this.cell_w, this.cell_h)
        }
    }
    async createPull(enemy_array){
        enemy_array.forEach(elem => {
            elem.forEach(g => {
                this.createEnemy(g.name, g.num)
            })
        })
    }

    getFreeCells(){
        return this.cells.filter(cell => !cell.content && this.enemy_slots.includes(cell.num))
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
    sortByInitiative(){
        this.turn_queue.sort((a,b) => b.initiative - a.initiative)
    }
    checkLine(num){
        let first = this.cells.find(elem => elem.num === num - 1)
        let second = this.cells.find(elem => elem.num === num - 2)

        if( (!first.content || first.content.isDead()) && (!second.content || second.content.isDead())){
            return true
        }
        else{
            return false
        }
    }
    getBehindTarget(enemy){
        let num = enemy.num
        if([7,14,21,28,25].includes(num)){
            return false
        }
        return this.turn_queue.find(elem => elem.num === num + 1)
    }
    getEnemiesInSquare(item){
        let result = [item]

        let up =this.turn_queue.find(elem => elem.num === item.num - 7)
        if(up) result.push(up)

        let down =this.turn_queue.find(elem => elem.num === item.num + 7)
        if(down) result.push(down)

        let right =this.turn_queue.find(elem => elem.num === item.num + 1)
        if(right) result.push(right)

        let left =this.turn_queue.find(elem => elem.num === item.num - 1)
        if(left) result.push(left)


        let up_left =this.turn_queue.find(elem => elem.num === item.num - 8)
        if(up_left) result.push(up_left)

        let up_right =this.turn_queue.find(elem => elem.num === item.num - 6)
        if(up_right) result.push(up_right)

        let down_left =this.turn_queue.find(elem => elem.num === item.num + 6)
        if(down_left) result.push(down_left)

        let down_right =this.turn_queue.find(elem => elem.num === item.num + 8)
        if(down_right) result.push(down_right)

        return result
    }
    getTargetsUpperAndBottom(enemy){
        let result = [enemy]
        let upper = this.turn_queue.find(elem => elem.num === enemy.num - 8)
        if(upper){
            result.push(upper)
        }
        if(!upper){
            upper = this.turn_queue.find(elem => elem.num === enemy.num - 7)
            if(upper){
                result.push(upper)
            }
        }
        if(!upper){
            upper = this.turn_queue.find(elem => elem.num === enemy.num - 6)
            if(upper){
                result.push(upper)
            }
        }

        let below = this.turn_queue.find(elem => elem.num === enemy.num + 6)
        if(below){
            result.push(below)
        }
        if(!below){
            below = this.turn_queue.find(elem => elem.num === enemy.num + 7)
            if(below){
                result.push(below)
            }
        }
        if(!below){
            below = this.turn_queue.find(elem => elem.num === enemy.num + 8)
            if(below){
                result.push(below)
            }
        }

        return result
    }
    getFirstEnemiesInLines(){
        let result =[]
        let f_line_index = [5, 6, 7]

        for(let i = 0; i < f_line_index.length; i++){
            let enemy = this.turn_queue.find(elem => elem.num === f_line_index[i])
            if(enemy){
                result.push(enemy)
                break
            }
        }

        let s_line_index = [12, 13, 14]

        for(let i = 0; i < s_line_index.length; i++){
            let enemy = this.turn_queue.find(elem => elem.num === s_line_index[i])
            if(enemy){
                result.push(enemy)
                break
            }
        }

        let t_line_index = [19, 20, 21]

        for(let i = 0; i < t_line_index.length; i++){
            let enemy = this.turn_queue.find(elem => elem.num === t_line_index[i])
            if(enemy){
                result.push(enemy)
                break
            }
        }

        let fo_line_index = [26, 27, 28]

        for(let i = 0; i < fo_line_index.length; i++){
            let enemy = this.turn_queue.find(elem => elem.num === fo_line_index[i])
            if(enemy){
                result.push(enemy)
                break
            }
        }

        let fi_line_index = [33, 34, 35]

        for(let i = 0; i < fi_line_index.length; i++){
            let enemy = this.turn_queue.find(elem => elem.num === fi_line_index[i])
            if(enemy){
                result.push(enemy)
                break
            }
        }

        return result
    }
    clearCellContent(content){
        let cell = this.cells.find(elem => elem.num === content.num)
        cell.content = undefined
        this.enemy_pull = this.enemy_pull.filter(elem => elem != content)
    }
    deleteFromQueue(item){
        this.turn_queue = this.turn_queue.filter(elem => elem != item)
    }
    async next(unit){
        await Functions.sleep(500)
        if(this.player.dead) return

        if(this.enemy_pull.every(elem => elem.isDead())){
            this.fightEnd()
            return
        }

        let index = this.turn_queue.indexOf(unit)
        let next = this.turn_queue[index + 1]


        if(!next){
            this.turn_count ++
            this.sortByInitiative()
            next = this.turn_queue[0]
        }

        next.startTurn(this.enemy_pull, this.player)
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

        this.enemy_pull.forEach(elem => {
            elem.act(this)
        })
        this.summons.forEach(elem => {
            elem.act(this)
        })

        this.effects.forEach(elem => {
            elem.act(this)
        })

        this.ground_effects.forEach(elem => {
            elem.act(this)
        })

        this.render.draw(this)

        this.tick ++
    }

}