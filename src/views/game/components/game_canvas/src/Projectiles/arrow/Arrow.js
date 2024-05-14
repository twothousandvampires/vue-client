import GameFunctions from '../../GameFunctions'
import Functions from "../../GameFunctions";
import ArrowSprite from "./sprite/ArrowSprite";
import Projectile from "../Projectile";

export default class Arrow extends Projectile{

    constructor(owner, context, x, y ,angle) {
        super(context, x, y);
        this.owner = owner
        this.name = 'skeleton arrow'
        this.sprite = new ArrowSprite(this)
        this.angle = angle
        this.speed = 25
        this.box_size_x = 6
        this.box_size_y = 6
        this.size_x = 16
        this.size_y = 26
    }

    collisionWithPlayer(){
        this.figth_context.player.takeAttackDamage(this.owner.attack.getDamageDescription(), this.owner)
        this.destroy()
        this.owner.endTurn()
    }
}