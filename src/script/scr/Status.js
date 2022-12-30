import Character from "../Character/Character";
export default class Status{
    constructor(owner) {
        this.owner =  owner
        this.pull = []
    }

    newStatus(status, fight_context, elem){

    }

    removeStatus(status){
        let index = this.pull.indexOf(status)
        this.pull.splice(index, 1)
    }
}