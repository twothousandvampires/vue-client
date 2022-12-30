export default class Sprite{

    constructor(w, h, name) {
        this.width = w
        this.height = h

        this.frame = 0
        this.frame_timer = 0
        this.y_frame_offset = 0
        this.name = name

        this.sprite_stoped = false
    }

}