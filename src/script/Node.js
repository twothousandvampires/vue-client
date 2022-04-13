import ImageData from "./ImageData";
let img_data = new ImageData();
export default class Node{

    constructor(template, char_x, char_y){
        this.x = template.x
        this.y  = template.y
        this.pretti_x = template.x - char_x + 6
        this.pretti_y = template.y - char_y + 6
        this.tile = this.getTile(template)
        this.visited = template.visited
        this.type = template.type
        if(this.type != 0 && this.type != 4){
            this.content_name = template.content_img
            this.frame_timer = 0
            this.frame = 0
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