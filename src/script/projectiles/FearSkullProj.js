import GameObject from "../scr/GameObject";
import Functions from "../GameFunctions";
import MagicExplosion from "../Effects/MagicExplosion";
import Fear from "../status/Fear";
import FuryOfTheDead from "../status/FuryOfTheDead";
import UnitData from "../UnitData";

export default class FearSkullProj extends GameObject{
    constructor(owner, angle) {
        super(owner.cord_x, owner.cord_y)
        this.owner = owner
        this.img_name = 'fear_skull'
        this.name = 'skull of fear'
        this.angle = angle
        this.max_frame = 8
        this.hitted = []
        this.chance_to_proc = 20
        this.tags = ['hit', 'proj', 'spell']
        this.stats = UnitData.get(this.name)
        this.box_size_x = 10
        this.sprite_w = 40
        this.sprite_h = 40
        this.box_size_y = 10
        this.size_x = 40
        this.size_y = 40
    }

    getDamage(){
        return  {
            'type': 'magic',
            'value': 10,
            'force': false,
            'source': this
        }
    }

    act(fight_context){
        // let { player } = fight_context
        // if(Functions.rectCollision(this, player)){
        //     if(player.wasHit(this, fight_context)){
        //         player.takeDamage(this.getDamage())
        //     }
        //     if(Math.random() * 100 < this.chance_to_proc){
        //         player.status.newStatus(new Fear(this), fight_context)
        //     }
        //     fight_context.projectiles.splice(fight_context.projectiles.indexOf(this),1)
        //     return
        // }
        for(let i = 0;i < fight_context.enemy.length;i++){
            let enemy = fight_context.enemy[i]
            if(Functions.rectCollision(this, enemy) && enemy != this.owner && !this.hitted.includes(enemy)){
                if(Math.random() * 100 < this.chance_to_proc){
                    enemy.newStatus(new FuryOfTheDead(enemy), fight_context)
                }
                this.hitted.push(enemy)
            }
        }
        this.frame_timer ++
        if(this.frame_timer == 2){
            this.frame ++
            this.frame_timer = 0
            if(this.frame > this.max_frame){
                this.frame = 0
            }
        }
        this.x_move = Math.sin(this.angle)
        this.y_move = Math.cos(this.angle)
        if(this.setCord(this.x_move, this.y_move, fight_context)){
            fight_context.effects.push(new MagicExplosion(this.cord_x, this.cord_y))
            fight_context.projectiles.splice(fight_context.projectiles.indexOf(this),1)
        }
    }
}