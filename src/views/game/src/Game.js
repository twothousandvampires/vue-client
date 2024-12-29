import Character from "../components/game_canvas/src/Character/Character";
import Request from "../components/game_canvas/src/Request.js";
import Underground from "../components/game_canvas/src/World/Src/Underground";
import Battle from "../components/game_canvas/src/Battle";
import Input from "../components/game_canvas/src/Singltons/Input";
import requestService from "../services/requestService";
import { useGameConfigStore } from "@/stores/game_config";
import { useLogStore } from "@/stores/log";

export default class Game{

    constructor() {
        this.game_config = useGameConfigStore()
        this.game_tick = 0
        this.log = useLogStore()
        this.scene = undefined
        this.char = undefined
        this.prepare_for_battle = false
    }
    async init(){
        Input.init()
        let res = await requestService.serverRequest('move')
        if(res.success){
            this.char = new Character(res.data.char)
            this.scene = new Underground(this, res.data.nodes)
        }
        this.frame_id = requestAnimationFrame(()=>this.frame())
        this.initiated = true
        this.log.addLog('journey is started!')
    }

    newBattle(response){
        this.scene = new Battle(response.node, this)
        this.scene.start()
    }

    endFight(){
        requestService.serverRequest('win').then(res => {
            this.checkLogFromServer(res.data.log)
            this.char = new Character(res.data.char)
            this.scene = new Underground(this, res.data.nodes)
        })
    }

    playerRetreat(){
        requestService.serverRequest('retreat').then(res => {
            this.checkLogFromServer(res.data.log)
            this.char = new Character(res.data.char)
            this.scene = new Underground(this, res.data.nodes)
        })
    }

    checkLogFromServer(log){
       if(!log) return

       log.forEach(server_log => {
            this.log.addLog(server_log)
       })
    }

    async updateWorldData(node){
        let res = await requestService.serverRequest('move', {x: node.x, y: node.y})

        if(res.data.fight){
            this.scene = new Battle(res.data.node, this)
            this.scene.start()
            return
        }
        else{
            this.char.parseStats(res.data.character)
            this.char.init()
            this.checkLogFromServer(res.data.log)
            this.char.pretti_x = 6
            this.char.pretti_y = 6
            this.scene.updateMapData(res.data.nodes)
        }
    }

    frame(){
        setTimeout(()=>{
            requestAnimationFrame(()=>this.frame())
            this.game_tick ++
            this.scene.frame()
        }, this.game_config.getGameTick)
    }
}