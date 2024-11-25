import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import CharacterService from "@/views/game/services/CharacterService";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import FireExplosion from "@/views/game/components/game_canvas/src/Effects/FireExplosion/FireExplosion";

export default class ExplosivePotion extends Used{
    constructor(template, player) {
        super(template, player)
        this.img_path = '/src/assets/img/explosive_potion.png'
        this.name = 'explosive potion'
        this.uses_in_fight = true
    }

    async use(enemy = false){
        let targets = this.player.figth_context.getEnemiesInSquare(enemy).filter(elem => !elem.isDead())

        Functions.createModal(this.player, this.name)

        let damage = {
            magic_damage: 0,
            fire_damage: this.power,
            cold_damage: 0,
            lightning_damage: 0
        }

        targets.forEach(elem =>{
            elem.takeSpellDamage(this.player, damage)
        })
        this.player.figth_context.addEffect(new FireExplosion(this.player.figth_context, 200, 200), enemy.num)
        await CharacterService.useItems([this.id], this.player)
        this.player.inv.deleteFromPull(this)
    }

    getDescription(){
        return 'deals fire damage'
    }
}