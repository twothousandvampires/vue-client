import World from './World'
import UndergroundRender from "../../Scr/render/UndergroundRender";
import Input from "../../Singltons/Input";
import log  from "../../Singltons/Logger";
import NodeFactory from "../../Scr/factories/NodeFactory";
import {useLogStore} from "@/stores/log";

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

    async init(world_data){
        this.updateMapData(world_data)
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
        data.nodes.forEach(elem =>{
            elem = this.node_factory.createNode(elem, this.char)
            this.map[elem.pretti_y][elem.pretti_x] = elem
        })
        for(let i = 0; i < this.map.length; i++){
            let map_row = this.map[i]
            for (let j = 0; j < map_row.length; j++){
                let node = this.map[i][j]
                if(node?.visited){
                    if(this.map[i - 1] && this.map[i - 1][j]){
                        let n_node = this.map[i - 1][j]
                        n_node.setLightSource('s')
                    }
                    if(this.map[i + 1] && this.map[i + 1][j]){
                        let s_node = this.map[i + 1][j]
                        s_node.setLightSource('n')
                    }
                    if(this.map[i] && this.map[i][j - 1]){
                        let w_node = this.map[i][j - 1]
                        w_node.setLightSource('e')
                    }
                    if(this.map[i] && this.map[i][j + 1]){
                        let e_node = this.map[i][j + 1]
                        e_node.setLightSource('w')
                    }
                }
            }
        }
    }

    setDelay(ms){
        this.delay = true
        setTimeout(()=>{
            this.delay = false
        }, ms)
    }

    checkInput(){
        let input = Input.getInput()
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
                    this.delay = true
                    this.worldMove(node_to_go, y, x)
                }
            }
        }
    }

    worldMove(node, y, x){
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
                this.game.updateWorldData(node, this.char.id)
                this.delay = false
            }
        },50)
    }

    prettifyData(response){
        switch (response.node_type){
            case 0:
                this.updateMapData(response, this.char.x, this.char.y)
                break;
            case 1:
                this.game.newBattle(response)
                break;
            case 2:
                this.updateMapData(response, this.char.x, this.char.y)
                break;
        }
    }
}