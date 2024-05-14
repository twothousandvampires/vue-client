import Point from "../Scr/Point";
import Unit from "../Scr/Unit";

export default class Status{
    constructor() {

    }

    check(target){
        return target.state !== Unit.STATE_DEAD && target.state !== Unit.STATE_DYING
    }
}