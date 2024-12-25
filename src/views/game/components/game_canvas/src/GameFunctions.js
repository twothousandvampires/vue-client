import Character from "./Character/Character";
import Point from "./Scr/Point";

export default class Functions{

    static modal_queue = 0

    static distance(from, to){
        return Math.floor(Math.sqrt(((from.point.x - to.point.x) ** 2)
                                     + ((from.point.y - to.point.y) ** 2)))
    }

    static increasedByPercent(flat, percent){
        return +((flat * (1 + percent / 100)).toFixed(1))
    }
    static chance(chance){
        return Math.random() <= chance / 100
    }

    static changeByPercent(flat, percent){

        if(!percent){
            return flat
        }
        if(percent > 0){
            return  Math.round(flat *  (1 + percent / 100) )
        }
        if(percent <= -100){
            return 0
        }

        return Math.round(flat *  (1 - percent / 100) )
    }

    static reducedByPercent(flat ,percent){
        if(percent <= -100){
            return 0
        }
        return +((flat * (1 - percent/100)).toFixed(1))
    }

    static truncated(num, decimalPlaces) {
        let numPowerConverter = Math.pow(10, decimalPlaces);ш
        return ~~(num * numPowerConverter)/numPowerConverter;
    }

    static pointInRect(x, y, rect, box = false){
        if(box){
            let w = rect.box_size_x/2
            let h = rect.box_size_y/2
            return x > rect.point.x - w
                && x < rect.point.x + w
                && y > rect.point.y - h
                && y < rect.point.y + h
        }
        else {
            let w = rect.size_x / 2
            let h = rect.size_y / 2
            return x > rect.point.x - w
                && x < rect.point.x + w
                && y > rect.point.y - h  + rect.box_size_y/2
                && y < rect.point.y + rect.box_size_y/2
        }
    }

    static msToTick(ms){
        return Math.round(ms/40)
    }

    static every(second, tick){
        return tick % (25 * second) === 0
    }

    static rectCollision(rect1 , rect2){

        rect1.x = Math.floor(rect1.point.x - (rect1.box_size_x / 2))
        rect1.y = Math.floor(rect1.point.y - (rect1.box_size_y / 2))

        rect2.x = Math.floor(rect2.point.x - (rect2.box_size_x / 2))
        rect2.y = Math.floor(rect2.point.y - (rect2.box_size_y / 2))

        let x_coll = false;
        let y_coll = false;

        if ((rect1.x + rect1.box_size_x > rect2.x) && (rect1.x < rect2.x + rect2.box_size_x)) x_coll = true;
        if ((rect1.y + rect1.box_size_y > rect2.y) && (rect1.y < rect2.y + rect2.box_size_y)) y_coll = true;

        if (x_coll && y_coll) {
            return true
        }
        return false
    }

    static circleCollision(radius, item , other){
        // return Functions.distance(item, other) < radius
    }

    static flipHorizontally(context, around){
        context.translate(around , 0)
        context.scale(-1, 1);
        context.translate(-around, 0)
    }

    static angle(from, target){
        if(!target.point){
            target = {
                point: target
            }
        }
        if(!from.point){
            from = {
                point: from
            }
        }
        let angle = Math.atan((from.point.x - target.point.x) / (from.point.y - target.point.y))

        if(target.point.x <= from.point.x && target.point.y <= from.point.y){
            angle += Math.PI
        }
        if(target.point.x >= from.point.x && target.point.y <= from.point.y){
            angle += Math.PI
        }
        if(target.point.x <= from.point.x && target.point.y >= from.point.y){
            angle += Math.PI*2
        }

        return angle
    }

    static random(max, min = 0){
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    static circleRectCollision(centr, radius, rect, box = false){


        let x1 = rect.point.x - (!box ? rect.size_x /2 : rect.box_size_x / 2)
        let x2 = rect.point.x + (!box ? rect.size_x /2 : rect.box_size_x / 2)
        let y1 = rect.point.y - (!box ? rect.size_y /2 : rect.box_size_y / 2)
        let y2 = rect.point.y + (!box ? rect.size_y /2 : rect.box_size_y / 2)

        if(Functions.distance({ point: new Point(x1, y1)}, centr) < radius) return true
        if(Functions.distance({ point: new Point(x2, y1)}, centr) < radius) return true
        if(Functions.distance({ point: new Point(x1, y2)}, centr) < radius) return true
        if(Functions.distance({ point: new Point(x2, y2)}, centr) < radius) return true


        let line1 = { point: new Point(x1, rect.point.y)}
        let line2 = { point: new Point(x2, rect.point.y)}
        let line3 = { point: new Point(rect.point.x, y1)}
        let line4 = { point: new Point(rect.point.x, y2)}

        if(Functions.distance(line1, centr) < radius) return true
        if(Functions.distance(line2, centr) < radius) return true
        if(Functions.distance(line3, centr) < radius) return true
        if(Functions.distance(line4, centr) < radius) return true

        return false
    }

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static createDamageModal(unit, damage, options = {}){
        let modal_direction = unit instanceof Character ? -2 : + 2
        let canvas = document.getElementById('game-canvas')
        let c_x = canvas.getBoundingClientRect().left
        let c_y = canvas.getBoundingClientRect().top


        let elem = document.createElement('p');

        let text = damage
        
        if(options.critical){
            text += '!'
        }

        elem.textContent = text;

        elem.classList.add('game-modal')
        elem.style.top = c_y + unit.point.y - unit.size_y / 2 + 'px'
        elem.style.left = c_x + unit.point.x - 10 + 'px'
        elem.style.fontSize = options.critical ? '18px' : '16px'
        elem.style.color = options.type === 'phys' ? 'white' : 'yellow'
        let tick = 0
        let timer = setInterval(()=>{
            if(tick > 15){
                clearInterval(timer)
                elem.parentNode.removeChild(elem)
                return true
            }
            elem.style.left = parseInt(elem.style.left) + modal_direction + 'px'
            tick++
        }, 40)
        document.getElementById('app').append(elem)
    }

    static async createModal(unit ,text, font_size = 14, color = 'white', without_queue = false){
        if(!without_queue){
            Functions.modal_queue ++
        }
        setTimeout(() => {
            if(!without_queue){
                Functions.modal_queue --
            }
            let canvas = document.getElementById('game-canvas')
            let c_x = canvas.getBoundingClientRect().left
            let c_y = canvas.getBoundingClientRect().top


            let elem = document.createElement('p');
            elem.textContent = text;
            elem.classList.add('game-modal')
            elem.style.top = c_y + unit.point.y - unit.size_y/2 + 'px'
            elem.style.left = c_x + unit.point.x - 10 + 'px'
            elem.style.fontSize = font_size + 'px'
            elem.style.color = color
            let tick = 0
            let timer = setInterval(()=>{
                if(tick > 30){
                    clearInterval(timer)
                    elem.parentNode.removeChild(elem)
                    return true
                }
                elem.style.top = parseInt(elem.style.top) - 1 + 'px'
                tick++
            },40)
            document.getElementById('app').append(elem)
        }, Functions.modal_queue * 250)
    }

    static async createInputModal(title = '???', callback){
        let exist = document.getElementsByClassName('options_modal')[0]
        if(exist){
            exist.parentNode.removeChild(exist)
        }

        let div = document.createElement('div')
        div.className = 'options_modal'

        let title_div = document.createElement('div')
        title_div.className = 'title'
        title_div.innerText = title
        div.appendChild(title_div)

        let input = document.createElement('input')
        input.type="number"
        input.value = 10
        input.id = 'input_id'

        input.autofocus = true

        div.appendChild(input)

        let ok = document.createElement('p')
        ok.innerText = 'ok'

        ok.addEventListener('click', () => {
            let v = document.getElementById('input_id').value
            callback(v)
            div.parentNode.removeChild(div)
        })

        div.appendChild(ok)


        document.getElementById('app').append(div)
    }

    static async createOptionsModal(options, source, title = ''){

        let exist = document.getElementsByClassName('options_modal')[0]
        if(exist){
            exist.parentNode.removeChild(exist)
        }

        let div = document.createElement('div')
        div.className = 'options_modal'

        if(title){
            let title_div = document.createElement('div')
            title_div.className = 'title'
            title_div.innerText = title
            div.appendChild(title_div)
        }
        let option_list_div = document.createElement('div')
        option_list_div.className = 'options'
        options.forEach(option => {
            let o_div = document.createElement('div')
            o_div.innerText = option.name
            option_list_div.appendChild(o_div)
            o_div.addEventListener('click', () => {
                source.chooseOption(option.id)

            })
        })
        div.appendChild(option_list_div)
        div.addEventListener('click', () => {
            div.parentNode.removeChild(div)
        })
        document.getElementById('app').append(div)
    }
}
