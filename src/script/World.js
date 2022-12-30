import Node from "./Node";
import Request from "@/script/Request";
import Game from "@/script/Game";
import Render from "@/script/Render";
import Input from "@/script/Input";


export default class WorldController{

    constructor(game) {
        this.game = game
        this.char = game.char
        this.map = [[],[],[],[],[],[],[],[],[],[],[],[],[]]

        // to do
        // let ApiResponse = await Request.world(this.char_id)
        // if(ApiResponse.data.success){
        //     this.game = new Game(this, ApiResponse.data.data)
        //     this.loaded = false
        // }

        this.mouse = new Input()
        this.render = new Render
        this.inv_is_open = false
        this.tree_is_open = false
        // this.world.updateMapData(initiate_data.nodes, this.char.x, this.char.y)
        // this.render = new Render(game_context.$refs.canvas.getContext('2d'))
        this.init()
    }

    async init(){
        let response = await Request.world(this.char.id)
        console.log(response.data)
        if(response.data.success){
            this.updateMapData(response.data.data)
        }
    }

    clearMap(){
        this.map = [[],[],[],[],[],[],[],[],[],[],[],[],[]]
    }

    newLog(msg){
        this.game.loger.newLog(msg)
    }

    updateMapData(data){
        this.clearMap()
        data.forEach(elem =>{
            elem = new Node(elem, this.char)
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


    frame(){
        this.checkInput()
        if(!this.inv_is_open && !this.tree_is_open) {
            this.render.drawWorld(this.map, this.char)
        }
    }


    checkInput(){
        let input = this.mouse.getInput()
        if(input.i){
            this.inv_is_open = !this.inv_is_open
            this.tree_is_open = false
        }
        if(input.o){
            this.tree_is_open = !this.tree_is_open
            this.inv_is_open = false
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
        this.char.setImageState('world move')
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
                this.char.setImageState('world idle')
                clearInterval(move);
                Request.move(node.x, node.y, this.char.id).then(r => {
                    this.char.x = node.x
                    this.char.y = node.y
                    this.char.pretti_x = 6
                    this.char.pretti_y = 6
                    this.prettifyData(r.data.data)
                    this.delay = false
                })
            }
        },50)
    }

    prettifyData(response){
        switch (response.node_type){
            case 0:
                this.updateMapData(response.nodes, this.char.x, this.char.y)
                break;
            case 1:
                this.scene = 'fight'
                this.game.newFight(response.node)
                break;
            case 2:
                if(!response.item.slot){
                    this.newLog('You founded item, but have no slot')
                }
                else {
                    this.newLog('You founded item(' + response.item.name + ')')
                    this.char.inv.pull[response.item.slot] =  this.char.inv.createItem(response.item)
                }
                this.updateMapData(response.nodes, this.char.x, this.char.y)
                break;
            case 4:
                this.scene = 'tower'
                break;
        }
    }

}