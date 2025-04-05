import World from './World'
import UndergroundRender from "../../Scr/render/UndergroundRender";
import Input from "../../Singltons/Input";
import NodeFactory from "../../Scr/factories/NodeFactory";
import {useLogStore} from "@/stores/log";
import FlyingBat from "@/views/game/components/game_canvas/src/World/Effect/FlyingBat";
import WildLight from "@/views/game/components/game_canvas/src/World/Effect/WildLight";
import requestService from '../../../../../services/requestService';

export default class Underground extends World{
   constructor(game, world_data) {
        super(game);
        this.log = useLogStore()
        this.player = game.char
        this.delay = false
        this.node_factory = new NodeFactory()
        this.render = new UndergroundRender()
        this.map = [[],[],[],[],[],[],[],[],[],[],[],[],[]]
        this.init(world_data)
    }
    filterMap(func){
       let res = []
        for(let i = 0; i < this.map.length; i++){
            let map_row = this.map[i]
            res.push(...map_row.filter(func))
        }
        return res
    }
    generateEffect(){
        let r = Math.random()
        if(r > 0.10) return
        let rnd = Math.round(Math.random() * 100)
        let targets = []
        if(rnd < 50){
            targets = this.filterMap((elem) => !elem?.content && !elem?.effect && !elem?.light)
            let node = targets[Math.floor(targets.length * Math.random())]
            new WildLight(node, this.map)
        }
        else {
            targets = this.filterMap((elem) => !elem?.content && !elem?.effect && elem?.light)
            let node = targets[Math.floor(targets.length * Math.random())]
            new FlyingBat(node)
        }
    }
    async init(world_data){
        this.updateMapData(world_data)
        setInterval(() => {
            this.generateEffect()
        }, 2000)
    }

    frame(){
        if(!this.player.dead){
            this.checkInput()
        }
        this.render.draw(this.map, this.player)
    }
    clearMap(){
        this.map = [[],[],[],[],[],[],[],[],[],[],[],[],[]]
    }
    updateMapData(data){
        this.clearMap()
        data.forEach(elem =>{
            elem = this.node_factory.createNode(elem, this.char)
            this.map[elem.pretti_y][elem.pretti_x] = elem
        })
        let l = []
        for(let i = 0; i < this.map.length; i++){
            let map_row = this.map[i]
            for (let j = 0; j < map_row.length; j++){
                let node = this.map[i][j]
                if(node?.visited){
                    if(this.map[i - 1] && this.map[i - 1][j]){
                        let n_node = this.map[i - 1][j]
                        n_node.light = true
                    }
                    if(this.map[i + 1] && this.map[i + 1][j]){
                        let s_node = this.map[i + 1][j]
                        s_node.light = true
                    }
                    if(this.map[i] && this.map[i][j - 1]){
                        let w_node = this.map[i][j - 1]
                        w_node.light = true
                    }
                    if(this.map[i] && this.map[i][j + 1]){
                        let e_node = this.map[i][j + 1]
                        e_node.light = true
                    }
                }
            }
        }
        for(let i = 0; i < this.map.length; i++){
            let map_row = this.map[i]
            for (let j = 0; j < map_row.length; j++){
                let node = this.map[i][j]
                if(node?.light){
                    l.push(node)
                }
            }
            l.forEach(elem => elem.setMist(this.map))
        }
    }

    setDelay(ms){
        this.delay = true
        setTimeout(()=>{
            this.delay = false
        }, ms)
    }
    checkHorizontalLine(char, node){
        let diff = char.pretti_x - node.pretti_x
        while (diff !== 0){
            diff += char.pretti_x - node.pretti_x > 0 ? -1 : 1
            let c_node = this.map[char.pretti_y][char.pretti_x - diff]
            if(!c_node) return false
        }
        return true
    }
    checkVerticalLine(char, node){
        let diff = char.pretti_y - node.pretti_y
        while (diff !== 0){
            diff += char.pretti_y - node.pretti_y > 0 ? -1 : 1
            let c_node = this.map[char.pretti_y - diff][char.pretti_x]
            if(!c_node) return false
        }
        return true
    }
    async checkInput(){
        let input = Input.getInput()
        if(this.player.map_cursored_elem && input.l_click && !this.delay){
            let node = this.player.map_cursored_elem
            if(node.pretti_y === this.char.pretti_y) {
                let node_to_go = this.map[node.pretti_y][node.pretti_x]
                if(node_to_go){
                    let distance = Math.abs(node.pretti_x - this.char.pretti_x)
                    let line_check = this.checkHorizontalLine(this.char, node_to_go)
                    if(line_check){
                        this.char.fliped = node.x - this.char.x < 0
                        this.worldMove(node_to_go, 0, this.char.fliped ? -distance : distance)
                    }
                }
                return
            }
            else if(node.pretti_x === this.char.pretti_x) {
                let node_to_go = this.map[node.pretti_y][node.pretti_x]
                if(node_to_go){
                    let distance = Math.abs(node.pretti_y - this.char.pretti_y)
                    let line_check = this.checkVerticalLine(this.char, node_to_go)
                    if(line_check){
                        this.char.fliped = node.y - this.char.y < 0
                        this.worldMove(node_to_go, this.char.fliped ? -distance : distance, 0)
                    }
                }
                return;
            }
            else if(node.visited === 1){
                this.delay = true
                let result = await requestService.serverRequest('move', {x: node.x, y: node.y})
                this.game.updateWorldData(result, this.char.id)
                this.delay = false
            }
        }
        if(input.i && !this.delay){
            this.setDelay(100)
            this.player.inv_is_open = !this.player.inv_is_open
        }
        if(!this.delay){
            let y = input.w ? -1 : input.s ? 1 : 0
            let x = input.a ? -1 : input.d ? 1 : 0
            if(y || x){
                this.char.fliped = x < 0
                let node_to_go = this.map[this.char.pretti_y + y][this.char.pretti_x + x]
                if(node_to_go){
                    this.worldMove(node_to_go, y, x)
                }
            }
        }
    }

    async worldMove(node, y, x){
        let result = await requestService.serverRequest('move', {x: node.x, y: node.y})
        console.log(result)
        if(!result.success) return
        
        this.delay = true
        this.char.setWorldMove()
        let add = y ? y/20 : x/20
        let tick = 0
        let move = setInterval(()=>{
            tick++
            if(y !== 0){
                this.char.pretti_y += add
            }else {
                this.char.pretti_x += add
            }
            if(tick === 20){
                this.char.setWorldIdle()
                clearInterval(move);
                this.game.updateWorldData(result, this.char.id)
                this.delay = false
            }
        },50)
    }

}