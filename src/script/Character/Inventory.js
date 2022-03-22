export default class Inventory{
    constructor(items) {
        this.pull = items[0]
        for(let i = 0; i < 20; i++){
            if(this.pull[i]) {
                let slot = this.pull[i].inv_slot
                if (slot !== i) {
                    this.pull[slot] = this.pull[i]
                    this.pull[i] = 'empty';
                }
            }
            else {
                this.pull[i] = 'empty';
            }
        }
    }

    getTitle(slot){
        return this.pull[slot - 1].name
    }
}