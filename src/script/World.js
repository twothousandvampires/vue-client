import Node from "./Node";
import Request from "@/script/Request";
import Game from "@/script/Game";
import Render from "@/script/Render";
import Input from "@/script/Input";


export default class World{

    constructor(game) {
        this.game = game
        this.map = [[],[],[],[],[],[],[],[],[],[],[],[],[]]

        // to do
        // let ApiResponse = await Request.world(this.char_id)
        // if(ApiResponse.data.success){
        //     this.game = new Game(this, ApiResponse.data.data)
        //     this.loaded = false
        // }

        this.mouse = new Input(game_context.$refs.canvas)

        this.inv_is_open = false
        this.tree_is_open = false
        this.world.updateMapData(initiate_data.nodes, this.char.x, this.char.y)
        this.render = new Render(game_context.$refs.canvas.getContext('2d'))
    }

    clearMap(){
        this.map = [[],[],[],[],[],[],[],[],[],[],[],[],[]]
    }

    updateMapData(data, char_x, char_y){
        this.clearMap()
        data.forEach(elem =>{
            elem = new Node(elem, char_x, char_y)
            this.map[elem.pretti_y][elem.pretti_x] = elem
        })
    }

}