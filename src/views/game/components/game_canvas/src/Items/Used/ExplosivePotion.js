import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import FireExplosion from "@/views/game/components/game_canvas/src/Effects/FireExplosion/FireExplosion";

export default class ExplosivePotion extends Used{
    constructor(template, player) {
        super(template, player)
        this.uses_in_fight = true
    }

    async use(enemy = false){
        let targets = this.player.fight_context.getEnemiesInSquare(enemy).filter(elem => !elem.isDead())

        Functions.createModal(this.player, this.name)

        let damage = {
            magic_damage: 0,
            fire_damage: this.getTotalPotionPower(),
            cold_damage: 0,
            lightning_damage: 0
        }

        targets.forEach(elem =>{
            elem.takeSpellDamage(this.player, damage)
        })
        this.player.fight_context.addEffect(new FireExplosion(this.player.fight_context, 200, 200), enemy.num)

        await this.afterUse()
    }

    getDescription(){
        return 'deals fire damage'
    }
}