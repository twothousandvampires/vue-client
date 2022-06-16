import Character from "./Character/Character.js";
import Render from "./Render.js";
import Input from "./Input.js";
import Request from "./Request.js";
import Fight from "./Fight";
import World from "./World";
import Functions from './GameFunctions.js'

export default class Game{

    constructor(game_context, initiate_data) {
        this.scene = 'world'
        this.fight = new Fight(this)
        this.world = new World(this)

        this.char = new Character(initiate_data.character)
        this.world.updateMapData(initiate_data.nodes, this.char.x, this.char.y)

        this.delay = false

        this.inv_is_open = false
        this.tree_is_open = false

        this.mouse = new Input(game_context.$refs.canvas)
        this.render = new Render(game_context.$refs.canvas.getContext('2d'))

        this.game_tick = 0
        this.frame()
    }

    prettifyData(response){
        switch (response.node_type){
            case 0:
                this.char.x = response.char.x
                this.char.y = response.char.y
                this.world.updateMapData(response.nodes, this.char.x, this.char.y)
                break;
            case 1:
                this.scene = 'fight'
                this.fight.newFight(response.node)
                break;
            case 4:
                this.scene = 'tower'
                break;
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
                let node_to_go = this.world.map[this.char.pretti_y + y][this.char.pretti_x + x]
                if(node_to_go){
                    this.delay = true
                    this.worldMove(node_to_go, y, x)
                }
            }
        }
    }

    worldMove(node, y, x){
        let add = y ? y/10 : x/10
        let tick = 0
        let move = setInterval(()=>{
            tick++
            if(y !== 0){
                this.char.pretti_y += add
            }else {
                this.char.pretti_x += add
            }
            if(tick === 10){
                clearInterval(move);
                Request.move(node.x, node.y, this.char.id).then(r => {
                    this.char.pretti_x = 6
                    this.char.pretti_y = 6
                    this.prettifyData(r.data.data)
                    this.delay = false
                })
            }
        },50)
    }

    frame(){

        setInterval(()=>{
            this.game_tick ++
            switch (this.scene){
                case 'world':
                    this.checkInput()
                    if(!this.inv_is_open && !this.tree_is_open) {
                        this.render.drawWorld(this.world, this.char)
                    }
                    break;
                case 'fight':
                    let start = Date.now()
                    this.fight.act()
                    this.render.drawFight(this.char, this.fight)
                    console.log(Date.now() - start)
                    break;
            }
        },50)
    }
}