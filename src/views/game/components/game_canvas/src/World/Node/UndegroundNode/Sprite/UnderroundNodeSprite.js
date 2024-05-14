import NodeSprite from "../../../../Scr/sprite/NodeSprite";

export default class UndergroundNodeSprite extends NodeSprite{
    constructor(node) {
        super(node)
        this.width = 100
        this.height = 100
        this.img = new Image()
        this.img.src = './src/assets/img/world/underground_tiles.png'
        this.setTile()
    }

    act(){

    }

    setTile(){
        let node = this.node
        if(node.n_link && node.s_link && node.w_link && node.e_link){
            this.frame = 0
            this.y_frame_offset = 300
        }
        else if(node.n_link && node.s_link && node.w_link){
            this.frame = 3
            this.y_frame_offset = 200
        }
        else if(node.n_link && node.s_link && node.e_link){
            this.frame = 2
            this.y_frame_offset = 200
        }
        else if(node.w_link && node.e_link && node.n_link){
            this.frame = 1
            this.y_frame_offset = 200

        }else if(node.w_link && node.e_link && node.s_link){
            this.frame = 0
            this.y_frame_offset = 200
        }
        else if(node.n_link && node.s_link){
            this.frame = 1
            this.y_frame_offset = 100
        }
        else if(node.w_link && node.e_link){
            this.frame = 0
            this.y_frame_offset = 100
        }
        else if(node.n_link && node.e_link){
            this.frame = 5
            this.y_frame_offset = 100
        }
        else if(node.w_link && node.n_link){
            this.frame = 4
            this.y_frame_offset = 100
        }
        else if(node.s_link && node.e_link){
            this.frame = 2
            this.y_frame_offset = 100
        }
        else if(node.w_link && node.s_link){
            this.frame = 3
            this.y_frame_offset = 100
        }
        else if(node.w_link){
            this.frame = 0
            this.y_frame_offset = 0
        }
        else if(node.e_link){
            this.frame = 1
            this.y_frame_offset = 0
        }
        else if(node.n_link){
            this.frame = 2
            this.y_frame_offset = 0
        }
        else if(node.s_link){
            this.frame = 3
            this.y_frame_offset = 0
        }
    }
}