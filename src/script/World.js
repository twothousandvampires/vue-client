import Node from "./Node";


export default class World{

    constructor(game) {
        this.game = game
        this.map = [[],[],[],[],[],[],[],[],[],[],[],[],[]]
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