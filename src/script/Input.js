export default class Input {
    constructor(canvas) {
        canvas.addEventListener('contextmenu', e => e.preventDefault())
        this.y = undefined
        this.click = false
        this.canvas = canvas
        this.pressed ={}
        this.canvas.addEventListener('mousemove',(e)=>{
            this.pressed.canvas_x = e.offsetX
            this.pressed.canvas_y = e.offsetY
        })
        this.canvas.addEventListener('mouseleave',(e)=>{
            this.pressed.canvas_x = undefined
            this.pressed.canvas_y = undefined
        })
        this.canvas.addEventListener('mousedown',(e)=>{
            if(e.which === 1){
                this.pressed.l_click = true
                setTimeout(()=>{
                    this.pressed.l_click = false
                },50)
            }
            else{
                this.pressed.r_click = true
                setTimeout(()=>{
                    this.pressed.r_click = false
                },50)
            }
        })
        window.addEventListener('keydown',(e)=>{
            this.pressed[e.key] = true
        })
        window.addEventListener('keyup',(e)=>{
            this.pressed[e.key] = false
        })
        window.addEventListener('mousemove',(e)=>{
            this.pressed.window_x = e.pageX
            this.pressed.window_y = e.pageY
        })
    }

    getInput(){
        return this.pressed
    }
}