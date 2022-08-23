export default class Item{

    constructor(template) {
        this.name = template.name
        this.class = template.class
        this.subclass = template.subclass
        this.type = template.type
        this.char_id = template.char_id
        this.id = template.id
        this.slot = template.slot
        this.quality = template.quality
        this.image_path = template.img_path
    }
    getImagePath(){
        return this.image_path
    }
}