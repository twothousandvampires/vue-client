import Point from "./scr/Point";

export default class Functions{

    static distance(from, to){
        return Math.floor(Math.sqrt(((from.x - to.x) ** 2)
                                     + ((from.y - to.y) ** 2)))
    }

    static increasedByPercent(flat, percent){
        return +((flat * (1 + percent / 100)).toFixed(1))
    }

    static reducedByPercent(flat ,percent){
        if(percent >= 100){
            return 0
        }
        return +((flat * (1 - percent/100)).toFixed(1))
    }

    static pointInRect(point, rect){
        rect.x = Math.floor(rect.x - (rect.width / 2))
        rect.y = Math.floor(rect.y - (rect.height / 2))

        return point.x > rect.x
            && point.x < rect.x + rect.width
            && point.y > rect.y
            && point.y < rect.y + rect.height
    }

    static msToTick(ms){
        return ms/50
    }

    static every(second, tick){
        return tick % (20 * second) === 0
    }

    static rectCollision(rect1 , rect2){

        rect1.x = Math.floor(rect1.x - (rect1.width / 2))
        rect1.y = Math.floor(rect1.y - (rect1.height / 2))

        rect2.x = Math.floor(rect2.x - (rect2.width / 2))
        rect2.y = Math.floor(rect2.y - (rect2.height / 2))

        let x_coll = false;
        let y_coll = false;

        if ((rect1.x + rect1.width > rect2.x) && (rect1.x < rect2.x + rect2.width)) x_coll = true;
        if ((rect1.y + rect1.height > rect2.y) && (rect1.y < rect2.y + rect2.height)) y_coll = true;

        if (x_coll && y_coll) {
            return true
        }
        return false
    }

    static circleCollision(radius, item , other){
        console.log("in circles collision")
        // return Functions.distance(item, other) < radius
    }

    static flipHorizontally(context, around){
        context.translate(around , 0);
        context.scale(-1, 1);
        context.translate(-around, 0)
    }

    static angle(from, target){

        let angle = Math.atan((from.x - target.x) / (from.y - target.y))

        if(target.x < from.x && target.y < from.y){
            angle += Math.PI
        }
        if(target.x > from.x && target.y < from.y){
            angle += Math.PI
        }
        if(target.x < from.x && target.y > from.y){
            angle += Math.PI*2
        }

        return angle
    }

    static random(max, min = 0){
        Math.floor(Math.random() * (max - min) + min)
    }

    static circleRectCollision(circle =  false, rect= false){
        let x1 = rect.x - rect.width / 2
        let x2 = rect.x + rect.width / 2
        let y1 = rect.y - rect.height / 2
        let y2 = rect.y + rect.height / 2

        if(Functions.distance(new Point(x1, y1), circle.point) < circle.radius) return true
        if(Functions.distance(new Point(x2, y1), circle.point) < circle.radius) return true
        if(Functions.distance(new Point(x1, y2), circle.point) < circle.radius) return true
        if(Functions.distance(new Point(x2, y2), circle.point) < circle.radius) return true

        let line1 = new Point(x1, rect.y)
        let line2 = new Point(x2, rect.y)
        let line3 = new Point(rect.x, y1)
        let line4 = new Point(rect.x, y2)

        if(Functions.distance(line1, circle.point) < circle.radius) return true
        if(Functions.distance(line2, circle.point) < circle.radius) return true
        if(Functions.distance(line3, circle.point) < circle.radius) return true
        if(Functions.distance(line4, circle.point) < circle.radius) return true

        return false
    }

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
