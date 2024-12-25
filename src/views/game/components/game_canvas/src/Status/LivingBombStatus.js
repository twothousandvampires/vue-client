import Status from "../Status/Status";
import FireExplosion from "@/views/game/components/game_canvas/src/Effects/FireExplosion/FireExplosion";

export default class LivingBombStatus extends Status{
    constructor(power, attach = false) {
        super()
        this.name = 'living bomb'
        this.duration = 'infinity'
        this.description = '???'
        this.status_bar_img_name = 'frozen.png'
        this.power = power
        this.attach = attach
    }

    newTurn(){
        
    }
    affect(target){
        this.target = target
    }

    expire(){
        
    }

    update(status){
        this.power = status.power
    }
    targetDead(){
        this.target.status.delete(this.name)
        let figth_context = this.target.figth_context
        let targets = figth_context.getEnemiesInSquare(this.target).filter(elem => !elem.isDead())

        let d = {
            fire_damage: Math.floor(this.target.max_life * (this.power / 100))
        }
        targets.forEach(element => {
            element.takeSpellDamage(figth_context.player, d)
        });

        figth_context.addEffect(new FireExplosion(figth_context, 200, 200), this.target.num)

        if(this.attach){
            let attached = false
            targets.forEach(element => {
                if(!element.isDead() && !attached){
                    element.newStatus(new LivingBombStatus(this.power, false))
                    attached = true
                }
            });
        }

        figth_context.clearCellContent(this.target)
    }
}