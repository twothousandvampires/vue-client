export default class Modal{

    static PARRENT = document.body

    static createModal(text, x, y){
        let scroll =document.getElementsByClassName('wrap')[0].scrollTop
        let modal = document.createElement('p')
        modal.textContent = text
        modal.className = 'modal'
        modal.style.top = y - scroll - 300 + 'px'
        modal.style.left = x + 140 + 'px'
        Modal.PARRENT.appendChild(modal)
        let tick = 10
        let timer = setInterval(()=>{
            modal.style.top = parseFloat(modal.style.top) - 4 + 'px'
            if(!tick){
                modal.parentNode.removeChild(modal)
                clearInterval(timer)
            }
            tick --
        },50)

    }

}