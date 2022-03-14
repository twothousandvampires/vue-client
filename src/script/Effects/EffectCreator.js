import ImageData from "../ImageData";
import Effect from "./Effect.js";
let imageData = new ImageData()
export default class EffectCreator{
    static createWeaponSwing(size , angle , game){
        game.effects.push(new Effect(imageData.getImage('weapon_swing') , size , angle , Math.round(Math.random() * 3)))
    }
}