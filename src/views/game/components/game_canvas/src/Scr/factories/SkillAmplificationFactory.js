import Density from "../../Skills/Sorcery/WanderingClot/Density";
import Overload from "../../Skills/Sorcery/WanderingClot/Overload";
import MoreProjectiles from "../../Skills/Sorcery/WanderingClot/MoreProjectiles";
import Intensity from "../../Skills/Sorcery/WanderingClot/Intensity";
import EndlessEnergy from "../../Skills/Sorcery/WanderingClot/EndlessEnergy";
import Explosive from "../../Skills/Sorcery/WanderingClot/Explosive";

export default class SkillAmplificationFactory {
    constructor() {
    }

    static create(item, skill){
        switch (item.name){
            case 'density':
                return new Density(item, skill)
            case 'overload':
                return new Overload(item, skill)
            case 'more projectiles':
                return new MoreProjectiles(item, skill)
            case 'intensity':
                return new Intensity(item, skill)
            case 'endless energy':
                return new EndlessEnergy(item, skill)
            case 'explosive':
                return new Explosive(item, skill)
        }
    }
}