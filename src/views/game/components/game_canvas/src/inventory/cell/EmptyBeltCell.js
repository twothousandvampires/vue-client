import EmptyCell from "./EmptyCell";

export default class EmptyBeltCell extends EmptyCell{
    constructor(cell_id) {
        super(cell_id)
        this.description =  'Empty belt cell.'
        switch (this.slot){
            case 35:
                this.img_path = '/src/assets/img/icons/hud/belt_1.png'
                break;
            case 36:
                this.img_path = '/src/assets/img/icons/hud/belt_2.png'
                break;
            case 37:
                this.img_path = '/src/assets/img/icons/hud/belt_3.png'
                break;
            case 38:
                this.img_path = '/src/assets/img/icons/hud/belt_4.png'
                break;
        }
    }
}