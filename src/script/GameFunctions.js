export default class Functions{

    static distance(from, to){
        return Math.floor(Math.sqrt(((from.cord_x- to.cord_x) ** 2) + ((from.cord_y - to.cord_y) ** 2)))
    }

    // no need here
    static colWithWalls(x, y , target , walls){

        let box_x = Math.floor(target.cords.x - (target.box_size_w/2) + x)
        let box_y = Math.floor(target.cords.y + y)
        let box_w = target.box_size_w
        let box_h = target.box_size_h

        for(let i = 0 ; i < walls.length; i ++){
            let wall = walls[i]
            let XColl=false;
            let YColl=false;
            if ((box_x + box_w > wall[0] * 50) && (box_x < wall[0] * 50 + 50)) XColl = true;
            if ((box_y + box_h > wall[1] * 50) && (box_y < wall[1] * 50 + 50)) YColl = true;
            if (XColl&YColl){return true;}

        }

        return false;
    }

    static colWithWallsOne(target , walls){
        let box_x = Math.floor(target.cords.x - (target.box_size_w/2) + 1)
        let box_y = Math.floor(target.cords.y + 1)
        let box_w = target.box_size_w
        let box_h = target.box_size_h

        for(let i = 0 ; i < walls.length; i ++){
            let wall = walls[i]
            let XColl=false;
            let YColl=false;
            if ((box_x + box_w > wall[0] * 50) && (box_x < wall[0] * 50 + 50)) XColl = true;
            if ((box_y + box_h > wall[1] * 50) && (box_y < wall[1] * 50 + 50)) YColl = true;
            if (XColl&YColl){return true;}

        }

        return false;
    }

    static pointInRect(x,y,rect){
        let rect1_x = Math.floor(rect.cords.x - (rect.size_w/2))
        let rect1_y = Math.floor(rect.cords.y)
        let rect1_w = rect.size_w
        let rect1_h = rect.size_h

        if(x > rect1_x && x < rect1_x + rect1_w && y > rect1_y && y < rect1_y + rect1_h){
            return true
        }
        return false
    }

    static msToTick(ms){
        return ms/50
    }

    static rectCollision(item , other){
        let rect1_x = Math.floor(item.cords.x - (item.box_size_w/2))
        let rect1_y = Math.floor(item.cords.y)
        let rect1_w = item.box_size_w
        let rect1_h = item.box_size_h

        let rect2_x = Math.floor(other.cords.x - (other.box_size_w/2))
        let rect2_y = Math.floor(other.cords.y)
        let rect2_w = other.box_size_w
        let rect2_h = other.box_size_h

        let XColl=false;
        let YColl=false;
        if ((rect1_x + rect1_w > rect2_x) && (rect1_x < rect2_x + rect2_w)) XColl = true;
        if ((rect1_y + rect1_h > rect2_y) && (rect1_y < rect2_y + rect2_h)) YColl = true;
        if (XColl&YColl){return true;}

        return false
    }

    static circleCollision(radius, item , other){
        return Functions.distance(item, other) < radius
    }


    static angle( item , other ){

        let angle = Math.atan((item.cord_x-other.cord_x)/(item.cord_y-other.cord_y));
        if(other.cord_x < item.cord_x && other.cord_y < item.cord_y){
            angle += Math.PI
        }
        if(other.cord_x > item.cord_x && other.cord_y < item.cord_y){
            angle += Math.PI
        }
        if(other.cord_x < item.cord_x && other.cord_y > item.cord_y){
            angle += Math.PI*2
        }

        return angle
    }
}
