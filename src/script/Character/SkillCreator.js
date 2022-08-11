import FireCoil from "../Skills/Active/FireCoil";

export default class SkillCreator{

    static create(skill){
        switch (skill.name){
            case 'fire coil':
                return new FireCoil(skill);
        }
    }

}