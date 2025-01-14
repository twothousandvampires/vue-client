import Input from "../src/Input";

export default class Fight{
    constructor(game) {
        this.game = game
        this.player = game.char

        this.enemy = []
        this.effects = []
        this.ground_effects = []

        this.projectiles = []
        this.areas_before = []
        this.areas = []
        this.areas_after = []

        this.player.fight_context = this


    }

    deleteArea(area){
        this.areas = this.areas.filter(elem => elem !== area)
    }
    newEffect(effect){
        this.effects.push(effect)
    }
    removeProj(proj){
        this.projectiles = this.projectiles.filter(elem => elem !== proj)
    }
    removeEffect(effect){
        if(effect.type === 'ground'){
            this.ground_effects = this.ground_effects.filter(elem => elem !== effect)
        }
        else {
            this.effects = this.effects.filter(elem => elem !== effect)
        }
    }
    removeEnemy(enemy){
        this.enemy = this.enemy.filter(elem => elem !== enemy)
    }
}