import Unit from "../Scr/Unit";
import config from '/config.js'
export default class Status{
    check(target){
        return target.state !== Unit.STATE_DEAD && target.state !== Unit.STATE_DYING
    }
    endTurn(){

    }
    newTurn(){
        
    }
    act(){

    }
    getStatusBarImgPath(){
        return config.img_url + this.status_bar_img_name
    }
    getDescription(){
        return `${this.name} (${this.duration}) \n${this.description} `
    }
    targetDead(){
        
    }
}