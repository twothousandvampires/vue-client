import Character from "./Character/Character.js";
import Render from "./Render.js";
import Input from "./Input.js";
import Request from "./Request.js";
import FightController from "./Fight";
import WorldController from "./World";
import Log from "./Loger";

export default class Game{


    constructor() {

    }
    async init(){
        this.game_tick = 0
        this.delay = false
        this.scene = 'world'
        this.loger = new Log()

        let response = await Request.getCharacter()
        if(response.data.success) {
            this.char = new Character(response.data.data)
            this.fight_controller = new FightController(this)
            this.world_controller = new WorldController(this)
        }
        this.frame();
        this.initiated = true
    }

    setScene(scene){
        this.scene = scene
    }

    endFight(){
        Request.win(this.char.id).then(r => {
            this.world_controller.prettifyData(r.data.data)
            this.scene = 'world'
        })
    }

    newFight(node){
        this.char.setImageState('idle')
        this.fight_controller.newFight(node)
        this.scene = 'fight'
    }

    inventoryIsOpen(){
        return this.world_controller.inv_is_open
    }

    frame(){
        setInterval(()=>{
            this.game_tick ++
            switch (this.scene){
                case 'world':
                    this.world_controller.frame()
                    break;
                case 'fight':
                    this.fight_controller.frame()
                    break;
            }
        },50)
    }
}