
import Unit from "../scr/Unit";

export default class Enemy extends Unit{

    constructor(x, y) {
        super(x, y)
        this.can_change_behavior = false
        this.change_behavior_timeout = false
        this.is_idle_move = false
    }
}