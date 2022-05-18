export default class Passive{

    constructor(template, player, child = false) {
        this.is_child = child
        this.type = template.type
        this.class = template.class
        this.value = template.value
        this.affect = template.affect
        this.level = template.level
        this.description = template.description
        this.name = template.name
        this.img_path = template.img_path

        if(template.affect_type === 'trigger'){
            this.trigger = true
            this.trigger_chance = template.trigger_chance
            this.trigger_type = template.trigger_type
        }

        if(template.childs){
            this.childs = []
            template.childs.forEach(elem => {
                this.childs.push(new Passive(elem ,player, true))
            })
        }

        if(this.level){
            if(this.trigger){

            }
            else {
                for(let i = 0;i < this.level;i++){
                    this.levelUp(player)
                }
            }
        }
    }

    levelUp(player){
        player[this.affect] ? player[this.affect] += this.value : player[this.affect] = this.value
    }

    levelDown(player){
        player[this.affect] -= this.value
    }
}