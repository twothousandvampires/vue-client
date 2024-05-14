export default class WorldController{
    constructor(game) {
        this.game = game
        this.char = game.char
    }

    clearMap(){
        this.map = [[],[],[],[],[],[],[],[],[],[],[],[],[]]
    }

}