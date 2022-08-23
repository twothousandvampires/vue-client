import StoneSkin from "@/script/Skills/Passive/Combat/StoneSkin";
import InnerFocus from "@/script/Skills/Passive/Sorcery/InnerFocus";
import FastMovement from "@/script/Skills/Passive/Movement/FastMovement";

export default class SkillCreator{
    static createSkill(template){
        switch (template.name){
            case 'stone skin':
                return new StoneSkin(template)
            case 'inner focus':
                return new InnerFocus(template)
            case 'fast movement':
                return new FastMovement(template)
        }
    }
}