export default class Mouse{
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
    }

    getСoord(){
        if(this.x && this.y){
            return {
                x : this.x,
                y : this.y
            }
        }
        else{
            return false
        }
    }
}