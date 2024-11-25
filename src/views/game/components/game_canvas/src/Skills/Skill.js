import config from '/config.js'
export default class Skill {
    constructor(template, player) {
        this.player = player
        this.level = template.level
        this.id = template.id
        this.name = template.skill_name
        this.skill_type = template.skill_type
    }

    getImagePath(){
        return config.img_url + this.img
    }
    canUse(enemy = undefined){
        return enemy && !enemy.isDead();
    }
}
