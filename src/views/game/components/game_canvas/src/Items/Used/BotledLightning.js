import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import SparkEffect from "../../Effects/Spark/SparkEffect";
import BoltedLigthningShield from "../../Status/BotledLightningShiled";
import Functions from "../../GameFunctions";

export default class BoltedLigthning extends Used{
    constructor(template, player) {
        super(template, player)
        this.name = 'botled lightning'
        this.uses_in_fight = true
        this.power = 4
    }

    async use(){
        let targets = this.player.figth_context.getFirstEnemiesInLines().filter(elem => !elem.isDead())
        Functions.createModal(this.player, this.name)

        let damage = {
            magic_damage: 0,
            fire_damage: 0,
            cold_damage: 0,
            lightning_damage: this.getTotalPotionPower(),
        }

        targets.forEach(elem =>{
            elem.takeSpellDamage(this.player, damage)
            this.player.figth_context.addEffect(new SparkEffect(this.player.figth_context), elem.num)
        })

        this.player.newStatus(new BoltedLigthningShield(20, 3), this, true)

        await this.afterUse()
    }

    canUse(enemy = undefined){
        return true
    }

    getDescription(){
        return 'unleash the sparks and give a ligthning shield'
    }
}