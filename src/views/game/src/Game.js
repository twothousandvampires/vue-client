import Character from "../components/game_canvas/src/Character/Character";
import Request from "../components/game_canvas/src/Request.js";
import Underground from "../components/game_canvas/src/World/Src/Underground";
import Battle from "../components/game_canvas/src/Battle";
import Input from "../components/game_canvas/src/Singltons/Input";
import CharacterService from "../services/CharacterService";
import { useGameConfigStore } from "@/stores/game_config";
import { useLogStore } from "@/stores/log";

export default class Game{

    constructor(char) {
        this.game_config = useGameConfigStore()
        this.game_tick = 0
        this.log = useLogStore()
        this.scene = undefined
        this.inv_is_open = false
        this.char = char
    }
    async init(){
        Input.init()
        let world_response = await CharacterService.world(this.char.id)
        if(world_response.data.success){
            this.scene = new Underground(this, world_response.data.data)
        }
        this.frame_id = requestAnimationFrame(()=>this.frame())
        this.initiated = true

        this.log.addLog('journey is started!')
    }

    newBattle(response){
        this.scene = new Battle(response.node, this)
    }

    endFight(){
        Request.win(this.char.id).then(r => {
            this.checkLogFromServer(r)
            this.char = new Character(r.data.data.char)
            this.scene = new Underground(this, r.data.data)
        })
    }

    checkLogFromServer(data){
        if( data.data.data?.log?.length ){
            data.data.data.log.forEach(server_log => {
                this.log.addLog(server_log)
            })
        }
    }

    updateWorldData(node, char_id){
        CharacterService.move(node.x, node.y, char_id).then(r => {
            if(r.data.data?.item && r.data.data.item?.slot){
                this.char.inv.pull[r.data.data.item.slot] =  this.char.inv.createItem(r.data.data?.item)
            }
            this.checkLogFromServer(r)
            this.char.x = node.x
            this.char.y = node.y
            this.char.pretti_x = 6
            this.char.pretti_y = 6
            this.scene.prettifyData(r.data.data)
        })
    }

    frame(){
        setTimeout(()=>{
            requestAnimationFrame(()=>this.frame())
            this.game_tick ++
            this.scene.frame()
        }, this.game_config.getGameTick)
    }
}