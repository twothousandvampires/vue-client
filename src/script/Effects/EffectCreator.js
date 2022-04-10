import ImageData from "../ImageData";
import Effect from "./Effect.js";
import ChainLight from "./ChainLight";
let imageData = new ImageData()
export default class EffectCreator{

    static createWeaponSwing(size , angle , effect){
        effect.push(new Effect(imageData.getImage('weapon_swing') , size , angle , Math.round(Math.random() * 3)))
    }
    static createChainLight(x,y, dis , angle , effect){
        effect.push(new ChainLight(imageData.getImage('chain_light') ,x,y,dis, angle ))
    }
}