import Food from "@/views/game/components/game_canvas/src/Items/Used/Food";

export default class CaveMoth extends Food{
    constructor(template, player) {
        super(template, player)
        this.img_path = '/src/assets/img/cave_moth.png'
        this.name = 'cave moth'
        this.uses_in_fight = true
    }

    async use(){
        this.player.addMana(this.power)
        this.player.magic_damage += 1
        await this.afterUse()
    }

    getDescription(){
        return 'increases your magic damage and restores your mana'
    }
    canUse(enemy = undefined){
        return true
    }
}