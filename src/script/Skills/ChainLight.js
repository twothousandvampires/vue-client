import Functions from "../GameFunctions";
import EffectCreator from "../Effects/EffectCreator";

let limit = 3
let distance = Functions.distance(mouse_cord, this)
let angle = Functions.angle(mouse_cord, this)
EffectCreator.createChainLight(this.cord_x,this.cord_y,distance,angle,effect)
let hited = []
function chain(from){
    hited.push(from)
    for(let i =0 ; i < enemy.length; i++){
        let elem = enemy[i]
        let distance = Functions.distance(elem, from)
        if(distance < 200 && !hited.includes(elem) && limit){
            let angle = Functions.angle(elem, from)
            EffectCreator.createChainLight(from.cord_x,from.cord_y,distance,angle,effect)
            hited.push(elem)
            limit--
            chain(elem)
        }
    }
}
chain(mouse_cord)