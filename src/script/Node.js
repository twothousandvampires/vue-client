export default class Node{

    constructor(template, char_x, char_y){
        this.x = template.x
        this.y  = template.y
        this.pretti_x = template.x - char_x + 6
        this.pretti_y = template.y - char_y + 6
        this.tile = this.getTile(template)
        this.visited = template.visited
        this.type = template.type
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

    getTile(node){
        let x,y
        if(node.n_link && node.s_link && node.w_link && node.e_link){
            x = 0
            y = 300
        }
        else if(node.n_link && node.s_link && node.w_link){
            x = 300
            y = 200
        }
        else if(node.n_link && node.s_link && node.e_link){
            x = 200
            y = 200
        }
        else if(node.w_link && node.e_link && node.n_link){
            x = 100
            y = 200
        }else if(node.w_link && node.e_link && node.s_link){
            x = 0
            y = 200
        }
        else if(node.n_link && node.s_link){
            x = 100
            y = 100
        }
        else if(node.w_link && node.e_link){
            x = 0
            y = 100
        }
        else if(node.n_link && node.e_link){
            x = 500
            y = 100
        }
        else if(node.w_link && node.n_link){
            x = 400
            y = 100
        }
        else if(node.s_link && node.e_link){
            x = 200
            y = 100
        }
        else if(node.w_link && node.s_link){
            x = 300
            y = 100
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