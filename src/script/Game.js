import Character from "./Character/Character.js";
import Node from "./Node";
import Render from "./Render.js";
import Input from "./Input.js";
import Request from "./Request.js";
import Spawner from "./Enemy/src/Spawner"


export default class Game{

    constructor(game_context) {
        this.spawner = new Spawner()
        this.delay = false
        this.inv_is_open = false
        this.tree_is_open = false
        this.scene = 'world'
        this.enemy = []
        this.effects = []
        this.projectiles = []
        this.text = []
        this.mouse = new Input(game_context.$refs.canvas)
        this.render = new Render(game_context.$refs.canvas.getContext('2d'))
        this.win = false
        this.game_tick = 0
    }

    setState(state){
        window.location.href = '/world'
    }

    prettifyData(response){
        if(response.char_update){
            this.char = new Character(response.character)
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
                this.nodes = this.nodes.sort((a,b) => {
                    return a.pretti_y - b.pretti_y
                })
                this.char.pretti_x = 6
                this.char.pretti_y = 6
                break;
            case 1:
                this.enemy = []
                this.spawner.pull = []
                this.scene = 'fight'
                this.createEnemy()
                break;
            case 4:
                this.scene = 'tower'
                break;
        }
    }

    createEnemy(){
        this.spawner.createPull()
        this.enemy = this.enemy.concat(this.spawner.getWave())
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
        if(this.mouse.getInput().v && !this.delay){
            this.tree_is_open = false
            this.inv_is_open = !this.inv_is_open
            this.delay = true
            setTimeout(()=>{
                this.delay = false
            },100)
        }
        if(this.mouse.getInput().b && !this.delay){
            this.inv_is_open = false
            this.tree_is_open = !this.tree_is_open
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
                        if(!this.inv_is_open && !this.tree_is_open) {
                            this.render.drawWorld(this)
                        }
                        break;
                    case 'fight':
                        this.act()
                        this.render.drawFight(this.char, this.enemy, this.effects, this.projectiles)
                        break;
                }
                this.game_tick ++
            },50)
        }
    }

    act(){
        if(this.game_tick % 1000 === 0){
            this.enemy = this.enemy.concat(this.spawner.getWave())
            // setTimeout(()=>{
            //     Request.win(this.char.id).then(r => {
            //         console.log(r)
            //         this.prettifyData(r.data.data)
            //         this.win = false
            //     })
            // },3000)
        }

        this.char.act(this.mouse ,this.effects, this.enemy, this.game_tick, this.text)
        this.projectiles.forEach(elem => {
            elem.act(this.char, this.effects, this.enemy, this.projectiles)
        })
        this.enemy.forEach(elem => {
            elem.act(this.char, this.effects, this.enemy, this.projectiles)
        })
        this.effects.forEach(elem => {
            elem.act(this.effects)
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