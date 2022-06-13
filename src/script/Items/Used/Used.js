export default class Used{

    constructor(template) {
        for(let prop in template) {
            this[prop] = template[prop]
        }
    }


    getDiscription(){
        return `${this.name} \nrestore ${this.value} life`
    }

}