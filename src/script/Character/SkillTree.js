export default class SkillTree{

    constructor(template) {
        this.passives = [];

        for(let skill in template){

            this.passives.push(template[skill])

        }

       console.log(this.passives)
    }

}