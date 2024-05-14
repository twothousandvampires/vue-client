import Armour from "../../Items/EquipProperties/Armour";
import MaxAttackDamage from "../../Items/EquipProperties/MaxAttackDamage";
import MinAttackDamage from "../../Items/EquipProperties/MinAttackDamage";
import AttackSpeed from "../../Items/EquipProperties/AttackSpeed";
import BlockAttack from "../../Items/EquipProperties/BlockAttack";
import MinSpellDamage from "../../Items/EquipProperties/MinSpellDamage";
import MaxSpellDamage from "../../Items/EquipProperties/MaxSpellDamage";
import SpellAOE from "../../Items/EquipProperties/SpellAOE";
import Resist from "../../Items/EquipProperties/Resist";
import SpellLifeLeech from "../../Items/EquipProperties/SpellLifeLeech";
import CriticalChance from "../../Items/EquipProperties/CriticalChance";
import SpellMultiplier from "../../Items/EquipProperties/SpellMultiplier";
import CannotBeFrozen from "../../Items/EquipProperties/CannotBeFrozen";
import AddLife from "../../Items/EquipProperties/AddLife";
import LifeArmourOnBlock from "../../Items/EquipProperties/LifeArmourOnBlock";
import MovementSpeed from "../../Items/EquipProperties/MovementSpeed";
import EnergyRegeneration from "../../Items/EquipProperties/EnergyRegeneration";
import Radiance from "../../Items/EquipProperties/Radiance";
import CastSpeed from "../../Items/EquipProperties/CastSpeed";
import AttackCritChance from "../../Items/EquipProperties/AttackCritChance";
import SpellCritMultiplier from "../../Items/EquipProperties/SpellCritMultiplier";
import AddMana from "../../Items/EquipProperties/AddMana";
export default class PropertyFactory {
    constructor() {
    }

    createEquipProperty(template, item){
        switch (template.stat){
            case 'armour':
                return new Armour(template, item)
            case 'min_attack_damage':
                return new MinAttackDamage(template, item)
            case 'max_attack_damage':
                return new MaxAttackDamage(template, item)
            case 'attack_speed':
                return new AttackSpeed(template, item)
            case 'attack_block':
                return new BlockAttack(template, item)
            case 'min_spell_damage':
                return new MinSpellDamage(template, item)
            case 'max_spell_damage':
                return new MaxSpellDamage(template, item)
            case 'spell_aoe':
                return new SpellAOE(template, item)
            case 'resist':
                return new Resist(template, item)
            case 'spell life leech':
                return new SpellLifeLeech(template, item)
            case 'additional critical chance':
                return new CriticalChance(template, item)
            case 'additional spell multiplier':
                return new SpellMultiplier(template, item)
            case 'cannot_be_frozen':
                return new CannotBeFrozen(template, item)
            case 'max_life':
                return new AddLife(template, item)
            case 'leaf_armour_on_block':
                return new LifeArmourOnBlock(template, item)
            case 'movement_speed':
                return new MovementSpeed(template, item)
            case 'energy_regeneration':
                return new EnergyRegeneration(template, item)
            case 'radiance':
                return new Radiance(template, item)
            case 'cast_speed':
                return new CastSpeed(template, item)
            case 'attack_crit_chance':
                return new AttackCritChance(template, item)
            case 'spell_crit_multiplier':
                return new SpellCritMultiplier(template, item)
            case 'max_mana':
                return new AddMana(template, item)
        }
    }
}