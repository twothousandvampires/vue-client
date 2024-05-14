export default class Node{

    constructor(template, char){
        this.x = template.x
        this.y  = template.y
        this.s_link = template.s_link
        this.n_link = template.n_link
        this.e_link = template.e_link
        this.w_link = template.w_link
        this.pretti_x = template.x - char.x + 6
        this.pretti_y = template.y - char.y + 6
        this.visited = template.visited ||
                      (Math.abs(this.pretti_x - char.pretti_x) <= 1 && this.pretti_y === char.pretti_y) ||
                      (Math.abs(this.pretti_y - char.pretti_y) <= 1 && this.pretti_x === char.pretti_x)
        this.type = template.type
        this.light = false
        this.content = template.content
    }

    setLightSource(source){
        // this.light = true
        // this.mist_max_frame = 8
        // switch (source){
        //     case 's':
        //         this.mist_offsets = this.mist_offsets.filter(elem => {
        //             return elem !== 200
        //         })
        //         break;
        //     case 'n':
        //         this.mist_offsets = this.mist_offsets.filter(elem => {
        //             return elem !== 0
        //         })
        //         break;
        //     case 'w':
        //         this.mist_offsets = this.mist_offsets.filter(elem => {
        //             return elem !== 300
        //         })
        //         break;
        //     case 'e':
        //         this.mist_offsets = this.mist_offsets.filter(elem => {
        //             return elem !== 100
        //         })
        //         break;
        // }
    }
}