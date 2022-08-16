import FireCoil from "../Skills/Active/FireCoil";
import FireNova from  "../Skills/Active/Chields/FireNova"
import FireCoilChain from  "../Skills/Active/Chields/FireCoilChain"
import FireCoilExplosion from  "../Skills/Active/Chields/FireCoilExplosion"
import FireCoilIgnite from "../Skills/Active/Chields/FireCoilIgnite"

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
            case 'fire coil chain':
                let fire_coil_chain = new FireCoilChain(skill, parent)
                return fire_coil_chain;
            case 'fire coil explosion':
                let fire_coil_explosion = new FireCoilExplosion(skill, parent)
                return fire_coil_explosion;
                case 'fire coil ignite':
                let fire_coil_ignite = new FireCoilIgnite(skill, parent)
                return fire_coil_ignite;
        }
    }

}