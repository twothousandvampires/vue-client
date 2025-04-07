import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import Ignite from "@/views/game/components/game_canvas/src/Status/Ignite/Ignite";
import FlameWave from "@/views/game/components/game_canvas/src/Effects/FlameWave/FlameWave";

export default class ScrollOfInferno extends Used{

    constructor(template, player) {
        super(template, player)
        this.uses_in_fight = true
    }

    async use(enemy = false){
    
        let targets = this.player.fight_context.getFirstEnemiesInLines().filter(elem => !elem.isDead())
        let d = {
            fire_damage: this.power * 12
        }
        targets.forEach(elem => {
            elem.takeDirectSpellDamage(d, this.player)
            elem.newStatus(new Ignite(this.power * 3, 3), this.player)
            this.player.fight_context.addEffect(new FlameWave( this.player.fight_context), elem.num)
        })

        this.afterUse()
    }

    getDescription(){
        return 'creates wave of flame'
    }

    canUse(enemy = undefined) {
        return true
    }
}