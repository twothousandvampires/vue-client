import Character from "./Character/Character.js";
import Node from "./Node";
import Render from "./Render.js";
import Input from "./Input.js";
import Request from "./Request.js";

import Shadow from "./Enemy/Shadow";

export default class Game{

    constructor(game_context) {
        this.delay = false
        this.inv_is_open = false
        this.scene = 'world'
        this.enemy = []
        this.effects = []
        this.mouse = new Input(game_context.$refs.canvas)
        this.render = new Render(game_context.$refs.canvas.getContext('2d'))
    }

    prettifyData(response){
        if(response.char_update){
            this.char = new Character(response.character.character, response.character.items)
        }
        else {
            this.char.x = response.char.x
            this.char.y = response.char.y
        }
        switch (response.node_type){
            case 0:
                this.scene = 'world'
                this.nodes = response.nodes.map(elem =>{
                    elem = new Node(elem, this.char.x, this.char.y)
                    return elem
                })
                this.char.pretti_x = 6
                this.char.pretti_y = 6
                break;
            case 1:
                this.scene = 'fight'
                this.createEnemy()
                break;
        }
    }

    createEnemy(){

        for(let i = 0; i < 5; i++){
            this.enemy.push(new Shadow(100 + i * 50,100 + i * 50,100))
        }
    }

    checkInput(){
        if(this.mouse.getInput().w && !this.delay){
            let items = this.nodes.filter( elem => {
                return elem.pretti_y === this.char.pretti_y - 1 && elem.pretti_x === this.char.pretti_x
            })
            if(items[0]){
                this.delay = true
                this.worldMove(items[0], 1, -0.1)
            }
        }
        if(this.mouse.getInput().s && !this.delay){
            let items = this.nodes.filter( elem => {
                return elem.pretti_y === this.char.pretti_y + 1 && elem.pretti_x === this.char.pretti_x
            })
            if(items[0]){
                this.delay = true
                this.worldMove(items[0], 1, 0.1)
            }
        }
        if(this.mouse.getInput().a && !this.delay){
            let items = this.nodes.filter( elem => {
                return elem.pretti_y === this.char.pretti_y && elem.pretti_x === this.char.pretti_x - 1
            })
            if(items[0]){
                this.delay = true
                this.worldMove(items[0], 0, -0.1)
            }
        }
        if(this.mouse.getInput().d && !this.delay){
            let items = this.nodes.filter( elem => {
                return elem.pretti_y === this.char.pretti_y && elem.pretti_x === this.char.pretti_x + 1
            })
            if(items[0]){
                this.delay = true
                this.worldMove(items[0], 0, 0.1)
            }
        }
        else if(this.mouse.getInput().v && !this.delay){
            this.inv_is_open = !this.inv_is_open
            this.delay = true
            setTimeout(()=>{
                this.delay = false
            },100)
        }
    }

    frame(){
        if(this.nodes) {
            setInterval(()=>{
                switch (this.scene){
                    case 'world':
                        this.checkInput()
                        if(!this.inv_is_open) {
                            this.render.drawWorld(this)
                        }
                        break;
                    case 'fight':
                        this.act()
                        this.render.drawFight(this.char, this.enemy, this.effects)
                        break;
                }
            },50)
        }
    }

    act(){
        this.char.act(this.mouse ,this.effects, this.enemy)
        this.enemy.forEach(elem => {
            elem.act(this.char)
        })
    }

    worldMove(node, xy, sign){
        let add = 0
        let move = setInterval(()=>{
            add += sign
            if(xy){
                this.char.pretti_y += sign
            }else {
                this.char.pretti_x += sign
            }
            if(Math.abs(add) >= 1){
                clearInterval(move);
                Request.move(node.x, node.y, this.char.id).then(r => {
                    this.prettifyData(r.data.data)
                    this.delay = false
                })
            }
        },50)
    }
}