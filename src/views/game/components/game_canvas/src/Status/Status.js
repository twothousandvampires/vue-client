import Unit from "../Scr/Unit";
import config from '/config.js'
export default class Status{
    constructor() {

    }

    check(target){
        return target.state !== Unit.STATE_DEAD && target.state !== Unit.STATE_DYING
    }
    endTurn(){

    }
    act(){

    }
    getStatusBarImgPath(){
        return config.img_url + this.status_bar_img_name
    }
}