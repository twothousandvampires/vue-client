import Status from "../Status";

export default class RadianceStatus extends Status{
    constructor(power) {
        super();
        this.power = power
        this.name = 'radiance'
        this.status_bar_img_name = 'endless_flame.gif'
        this.duration = 'infinity'
    }

    getDescription(){
        return `you burn enemies`
    }

    newTurn(){
        let count = this.target.fight_context.turn_queue.filter(elem => !elem.isDead() && elem !== this.target)
        let d = {
            magic_damage: this.power
        }
        count.forEach(elem => {
            elem.takeSpellDamage(this.target, d)
        })
    }

    expire(){
        this.target.status.delete(this.name)
    }

    affect(target, source){
        this.target = target
        this.source = source
    }

    targetDead() {
        this.expire()
    }
}