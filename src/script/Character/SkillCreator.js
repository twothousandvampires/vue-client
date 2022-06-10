import FireBall from "../Skills/Active/FireBall";

export default class SkillCreator{


    static create(skill, player){

        switch (skill.name){
            case 'Fire Ball':
                return new FireBall(skill, player);

        }

    }

}