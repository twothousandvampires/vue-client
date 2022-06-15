import SkeletonArcher from "../SkeletonArcher";
import SkeletonWarrior from "../SkeletonWarrior";
import SkeletonWizard from "../SkeletonWizard";

export default class Spawner{

    constructor() {
        this.pull = []
    }


    createPull(count = 15){

        for(let i = 0;i < 2;i++){
            this.pull.push(new SkeletonArcher(0,0))
        }
        for(let i = 0;i < 19;i++){
            this.pull.push(new SkeletonWarrior(0,0))
        }
        for(let i = 0;i < 3;i++){
            this.pull.push(new SkeletonWizard(0,0))
        }
    }

    getWave(){
        let count = this.pull.length >= 8 ? 8 : this.pull.length
        let result = []
        for(let i = 0; i < count;i++){
            let enemy = this.pull[Math.floor(Math.random() * this.pull.length)]
            let cords = this.getCords(i)
            enemy.cord_x = cords[0]
            enemy.cord_y = cords[1]
            result.push(enemy)
            this.pull.splice(this.pull.indexOf(enemy),1)
        }
        return result ? result : false
    }

    getCords(i){
        switch (i){
            case 0:
                return [300,425]
            case 1:
                return [650,425]
            case 2:
                return [1000,425]
            case 3:
                return [300,775]
            case 4:
                return [1000,775]
            case 5:
                return [300,1125]
            case 6:
                return [650,1125]
            case 7:
                return [1000,1125]
        }
    }

}