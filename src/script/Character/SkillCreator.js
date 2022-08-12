import FireCoil from "../Skills/Active/FireCoil";
import FireNova from  "../Skills/Active/Chields/FireNova"

export default class SkillCreator{

    static create(skill){
        switch (skill.name){
            case 'fire coil':
                let fire_coil = new FireCoil(skill)
                skill.chields.forEach(elem => {
                    fire_coil.chields.push(SkillCreator.createChield(elem, fire_coil))
                })
                return fire_coil;
        }
    }

    static createChield(skill, parent){
        switch (skill.name){
            case 'fire nova':
                let fire_nova = new FireNova(skill, parent)
                return fire_nova;
        }
    }

}