export default class EmptyCell{
    constructor(i) {
        this.slot = i
        this.name = 'empty'

    }
    getImagePath(){
        let str = '/src/assets/img/icons/items/misc/'
            if([0,3,6].includes(this.slot)){
            return str + 'empty_weapon.png'
        }
        if([1,4,7].includes(this.slot)){
            return str + 'empty_armour.png'
        }
        if([2,5,8].includes(this.slot)){
            return str + 'empty_accessory.png'
        }
        else {
            return str + 'empty_shield.png'
        }
    }
    getDescription(){
        return 'empty slot'
    }
    equip(p){

    }
    unequip(p){

    }
}