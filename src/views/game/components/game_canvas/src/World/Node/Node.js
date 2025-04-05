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
        this.visited = template.visited
        this.type = template.type
        this.light = template.visited ||
            (Math.abs(this.pretti_x - char.pretti_x) <= 1 && this.pretti_y === char.pretti_y) ||
            (Math.abs(this.pretti_y - char.pretti_y) <= 1 && this.pretti_x === char.pretti_x)
        this.content = template.content
        this.mist_offsets = []
        this.mist_max_frame = 7
        this.mist_timer = 0
        this.mist_frame = 0
        this.effect = null
        this.travelled = template.travelled
    }

    setMist(map){
        this.mist_offsets = [0, 100, 200, 300]

        if(map[this.pretti_y - 1] && map[this.pretti_y - 1][this.pretti_x]){
            let n_node = map[this.pretti_y - 1][this.pretti_x]
            if(n_node.light){
                this.mist_offsets = this.mist_offsets.filter(elem => elem != 0)
            }
        }
        else {
            this.mist_offsets = this.mist_offsets.filter(elem => elem != 0)
        }

        if(map[this.pretti_y + 1] && map[this.pretti_y + 1][this.pretti_x]){
            let s_node = map[this.pretti_y + 1][this.pretti_x]
            if(s_node.light){
                this.mist_offsets = this.mist_offsets.filter(elem => elem != 200)
            }
        }
        else {
            this.mist_offsets = this.mist_offsets.filter(elem => elem != 200)
        }

        if(map[this.pretti_y] && map[this.pretti_y][this.pretti_x - 1]){
            let w_node = map[this.pretti_y][this.pretti_x - 1]
            if(w_node.light){
                this.mist_offsets = this.mist_offsets.filter(elem => elem != 300)
            }
        }
        else {
            this.mist_offsets = this.mist_offsets.filter(elem => elem != 300)
        }

        if(map[this.pretti_y] && map[this.pretti_y][this.pretti_x + 1]){
            let e_node = map[this.pretti_y][this.pretti_x + 1]
            if(e_node.light){
                this.mist_offsets = this.mist_offsets.filter(elem => elem != 100)
            }
        }
        else {
            this.mist_offsets = this.mist_offsets.filter(elem => elem != 100)
        }

    }
}