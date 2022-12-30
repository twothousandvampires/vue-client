export default class Node{

    constructor(template, char){
        this.x = template.x
        this.y  = template.y
        this.pretti_x = template.x - char.x + 6
        this.pretti_y = template.y - char.y + 6
        this.visited = template.visited || (this.pretti_x === char.pretti_x && this.pretti_y === char.pretti_y)
        this.type = template.type
        this.light = false
        this.tile = this.getTile(template)
        if(template.content_type){
            this.frame_timer = 0
            this.frame = 0
            this.content_name = template.content_type
            switch (this.content_name){
                case 'undying squad':
                    this.content_img_offset_x = 20
                    this.content_img_offset_y = -15
                    this.content_sprite_w = 90
                    this.content_sprite_h = 90
                    this.size_w = 70
                    this.size_h = 70
                    this.max_frame = 7
                    break;
                case 'city':
                    this.content_img_offset_x = 0
                    this.content_img_offset_y = -20
                    this.content_sprite_w = 100
                    this.content_sprite_h = 100
                    this.size_w = 100
                    this.size_h = 100
                    this.max_frame = 11
                    break;
                case 'treasure':
                    this.content_img_offset_x = 25
                    this.content_img_offset_y = 20
                    this.content_sprite_w = 90
                    this.content_sprite_h = 90
                    this.size_w = 45
                    this.size_h = 45
                    this.max_frame = 11
                    break;
            }

        }
    }

    setLightSource(source){
        this.light = true
        this.mist_timer = 0
        this.mist_frame = 0
        this.mist_max_frame = 8
        switch (source){
            case 's':
                this.mist_offsets = this.mist_offsets.filter(elem => {
                    return elem !== 200
                })
                break;
            case 'n':
                this.mist_offsets = this.mist_offsets.filter(elem => {
                    return elem !== 0
                })
                break;
            case 'w':
                this.mist_offsets = this.mist_offsets.filter(elem => {
                    return elem !== 300
                })
                break;
            case 'e':
                this.mist_offsets = this.mist_offsets.filter(elem => {
                    return elem !== 100
                })
                break;
        }
    }

    getTile(node){
        this.mist_offsets = []
        let x,y
        if(node.n_link && node.s_link && node.w_link && node.e_link){
            x = 0
            y = 300
        }
        else if(node.n_link && node.s_link && node.w_link){
            x = 300
            y = 200
            this.mist_draw_offset = 14
            this.mist_offsets = [0, 200, 300]
        }
        else if(node.n_link && node.s_link && node.e_link){
            x = 200
            y = 200
            this.mist_offsets = [0, 100, 200]
        }
        else if(node.w_link && node.e_link && node.n_link){
            x = 100
            y = 200
            this.mist_draw_offset = 14
            this.mist_offsets = [0, 100, 300]

        }else if(node.w_link && node.e_link && node.s_link){
            x = 0
            y = 200
            this.mist_offsets = [100, 200, 300]
        }
        else if(node.n_link && node.s_link){
            x = 100
            y = 100
            this.mist_offsets = [0, 200]
        }
        else if(node.w_link && node.e_link){
            x = 0
            y = 100
            this.mist_offsets = [100, 300]
        }
        else if(node.n_link && node.e_link){
            this.mist_draw_offset = 12
            x = 500
            y = 100
            this.mist_offsets = [0, 100]
        }
        else if(node.w_link && node.n_link){
            x = 400
            this.mist_draw_offset = 12
            y = 100
            this.mist_offsets = [0, 300]
        }
        else if(node.s_link && node.e_link){
            x = 200
            y = 100
            this.mist_offsets = [200, 100]
        }
        else if(node.w_link && node.s_link){
            x = 300
            y = 100
            this.mist_offsets = [200, 300]
        }
        else if(node.w_link){
            x = 0
            y = 0
        }
        else if(node.e_link){
            x = 100
            y = 0
        }
        else if(node.n_link){
            x = 200
            y = 0
        }
        else if(node.s_link){
            x = 300
            y = 0
        }

        return[x,y]
    }
}