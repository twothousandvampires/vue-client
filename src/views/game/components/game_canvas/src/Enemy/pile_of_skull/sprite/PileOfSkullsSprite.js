import Sprite from "../../../Scr/sprite/UnitSprite";
import Unit from "../../../Scr/Unit";

export default class PileOfSkullsSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 96
        this.height = 96
        this.img = new Image()
        this.img.src = './src/assets/img/enemy/pile_of_skull.png'
    }

    setImgState(){
        switch (this.owner.state){
            case Unit.STATE_IDLE:
                let idle = Math.floor(Math.random() * 3)
                switch (idle){
                    case 0:
                        this.y_frame_offset = 0
                        this.max_frame = 16
                        break;
                    case 1:
                        this.y_frame_offset = 96
                        this.max_frame = 14
                        break;
                    case 2:
                        this.y_frame_offset = 192
                        this.max_frame = 13
                        break;
                }
                this.frame_timer_max = 6
                break;
            case Unit.STATE_ATTACK:
                this.y_frame_offset = 288
                this.max_frame = 12
                this.frame_timer_max = Math.floor((this.owner.getAttackSpeed()/12)/40)
                break;
            case Unit.STATE_DYING:
                this.y_frame_offset = 384
                this.max_frame = 6
                this.frame_timer_max = 3
                break;
            case Unit.STATE_DEAD:
                this.y_frame_offset = 480
                this.max_frame = 1
                this.frame_timer_max = 4
                break;

        }
    }
}