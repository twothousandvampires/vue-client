export default class Input {
    constructor(canvas) {
        this.x = undefined
        this.y = undefined
        this.click = false
        this.canvas = canvas
        this.canvas.addEventListener('mousemove',(e)=>{
            this.x = e.offsetX
            this.y = e.offsetY
        })
        this.canvas.addEventListener('mouseleave',(e)=>{
            this.x = undefined
            this.y = undefined
        })
        this.canvas.addEventListener('click',(e)=>{
            this.click = true
            setTimeout(()=>{
                this.click = false
            },50)
        })
        window.addEventListener('keydown',(e)=>{
            e.preventDefault()
            this.pressed[e.key] = true
        })
        window.addEventListener('keyup',(e)=>{
            this.pressed[e.key] = false
        })
        this.pressed ={}
    }

    getInput(){
        return this.pressed
    }

    getСoord(){
        if(this.x && this.y){
            return {
                cord_x : this.x,
                cord_y : this.y
            }
        }
        else{
            return false
        }
    }
}