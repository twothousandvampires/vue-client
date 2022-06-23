import SkeletonArcher from "../SkeletonArcher";
import SkeletonWarrior from "../SkeletonWarrior";
import SkeletonWizard from "../SkeletonWizard";

export default class Spawner{

    constructor() {
        this.pull = []
    }


    createPull(content_count){
        content_count.forEach(elem => {
            elem.count *= 10
            while (elem.count){
                switch (elem.name){
                    case 'skeleton warrior':
                        this.pull.push(new SkeletonWarrior(0,0))
                        break;
                    case 'skeleton archer':
                        this.pull.push(new SkeletonArcher(0,0))
                        break;
                    case 'skeleton mage':
                        this.pull.push(new SkeletonWizard(0,0))
                        break;
                }
                elem.count--
            }
        })
    }

    getWave(map){
        let count = this.pull.length >= 8 ? 8 : this.pull.length
        let result = []
        for(let i = 0; i < count;i++){
            let enemy = this.pull[Math.floor(Math.random() * this.pull.length)]
            let cords = this.getCords(i, map)
            enemy.cord_x = cords[0]
            enemy.cord_y = cords[1]
            result.push(enemy)
            this.pull.splice(this.pull.indexOf(enemy),1)
        }
        return result ? result : false
    }

    getCords(i, map){
        switch (i){
            case 0:
                return [map.start_x + 50, map.start_y + 50]
            case 1:
                return [map.start_x + map.width/2, map.start_y + 50]
            case 2:
                return [map.start_x + map.width - 50, map.start_y + 50]
            case 3:
                return [map.start_x + 50, map.start_y + map.height/2]
            case 4:
                return [map.start_x + map.width - 50, map.start_y + map.height/2]
            case 5:
                return [map.start_x + 50, map.height + map.start_y - 50]
            case 6:
                return [map.start_x + map.width/2, map.height + map.start_y - 50]
            case 7:
                return [map.start_x + map.width- 50, map.height + map.start_y- 50]
        }
    }

}