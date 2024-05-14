import SkillAmplificationFactory from "../../../Scr/factories/SkillAmplificationFactory";
import ExcitedBodyStatus from "../../../Status/ExcitedBody/ExcitedBody";
import Skill from "../../../Scr/Skills/Skill";

export default class ExcitedBody extends Skill{

    constructor(template, gem, player) {
        super(template, gem, player)
        this.level = template.level
        this.amplifications = new Map
        this.img_path = 'src/assets/img/icons/skill/excited_body.png'
        this.name = 'exited body'
        this.increase_attack_speed = 2
        this.increase_cast_speed = 2
        this.increase_movement_speed = 2
        this.duration = 5000
        template.children.forEach(elem =>{
            this.amplifications.set(elem.name, SkillAmplificationFactory.create(elem))
        })
        this.init()
        this.description = 'Increase your cast, movement, attack speed'
    }

    init(){

    }

    getDescription(){
        return "Increase your cast speed by ("+this.increase_cast_speed * this.level +"%)," +
            " attack speed by ("+this.increase_attack_speed * this.level +"%)," +
            " movement speed by(" + this.increase_movement_speed * this.level + "%)"
    }

    cast(fight_context) {
        let player = fight_context.player
        let status = new ExcitedBodyStatus(this.increase_attack_speed,
                                            this.increase_cast_speed,
                                            this.increase_movement_speed,
                                            this.duration)
        player.newStatus(status, fight_context)
    }
}