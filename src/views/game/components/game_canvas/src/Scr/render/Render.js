import ImageData from "../../ImageData";
import Functions from "../../GameFunctions";

export default class Render{
    constructor() {
        this.cell_size = 100
        this.ctx = document.getElementById('game-canvas').getContext('2d')
        this.ctx.imageSmoothingEnabled= false
        this.img_data = new ImageData()
    }
}