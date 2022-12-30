import SkeletonArcher from "../SkeletonArcher";
import SkeletonWarrior from "../SkeletonWarrior";
import SkeletonWizard from "../SkeletonWizard";
import Ghost from "../Ghost";
import PileOfSkull from "../PileOfSkull";
import GiantUndead from "../GiantUndead";
import Lich from "../Lich";
export default class Spawner{

    constructor() {
        this.pull = []
    }


    createPull(content_count){
        content_count.forEach(elem => {
            while (elem.count){
                switch (elem.name){
                    case 'skeleton warrior':
                        this.pull.push(new SkeletonWarrior())
                        break;
                    case 'skeleton archer':
                        this.pull.push(new SkeletonArcher())
                        break;
                    case 'skeleton mage':
                        this.pull.push(new SkeletonWizard())
                        break;
                    case 'ghost':
                        this.pull.push(new Ghost())
                        break;
                    case 'pile of skull':
                        this.pull.push(new PileOfSkull())
                        break;
                    case 'giant undead':
                        this.pull.push(new GiantUndead())
                        break;
                    case 'lich':
                        this.pull.push(new Lich())
                        break;
                }
                elem.count--
            }
        })
    }

    getWave(map){

        let count = this.pull.length >= 8 ? 8 : this.pull.length
        let result = []
        let wave = 1
        for(let i = 0; i < count;i++){
            let enemy = this.pull[Math.floor(Math.random() * this.pull.length)]
            let cords = this.getCords(i, map)
            enemy.cord_x = cords[0]
            enemy.cord_y = cords[1]
            result.push(enemy)
            this.pull.splice(this.pull.indexOf(enemy),1)
            wave ++
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