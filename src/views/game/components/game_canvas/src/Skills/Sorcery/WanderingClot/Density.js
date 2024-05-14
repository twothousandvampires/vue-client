import Child from "../../../Scr/Skills/Child";

export default class Density extends Child{

    constructor(template, skill){
        super(template, skill)
        this.img_path = 'src/assets/img/icons/skill/critical_mass.png'
        this.value = 1

        this.init()
    }
    init(){
        if(this.level){
           this.description = 'Increases critical chance by ' + this.value * this.level
        }
        else {
            this.description =  'Increases critical chance'
        }
    }

    getAddCrit(){
        return this.level
    }
}