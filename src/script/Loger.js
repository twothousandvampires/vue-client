export default class Loger{
    constructor() {
        this.list = []
    }
    newLog(msg){
        this.list.push(msg)
    }
}