import Unit from "../../scr/Unit";

export default class Undead extends Unit{

    constructor(x, y) {
        super(x, y)
        this.type = 'undead'
    }

    canResurect(){
        return this.state == 'dying' && !this.skull_will_spawned
    }

}