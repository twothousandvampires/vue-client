export default class SkillTree{

    constructor(template, player) {
        this.passives = [];
        for(let skill in template){
            if(template[skill].type === 'passive'){
                this.passives.push(template[skill])
                if(template[skill].level){
                    template[skill].affect.forEach((elem, index) => {
                        player[elem] += template[skill].value[index]
                    })
                }
            }
        }
    }
S
    getPassives(page){
        let result = this.passives.filter(elem => {
            return elem.class === page
        })
        return result
    }

}