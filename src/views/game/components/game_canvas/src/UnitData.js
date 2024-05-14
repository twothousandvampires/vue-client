export default class UnitData{
    static data =

    {

        'skull': {
            life: 5,
            max_life: 5,
            speed: 2,
            attack_speed: 1400,
            attack_range: 30,
            looking_range: 600,
            more_speed: 0
        },
        'skeleton wizard': {
            life: 20,
            max_life: 20,
            speed: 1.7,
            attack_speed: 1800,
            cast_speed: 1500,
            attack_range: 60,
            looking_range: 300,
            more_speed: 0
        },
        'skeleton archer': {
            life: 20,
            max_life: 20,
            speed: 1.3,
            attack_speed: 2500,
            looking_range: 300,
            more_speed: 0,
            attack_range: 0,
            escape_radius: 150
        },
        'skull of fear': {
            speed: 6,
            more_speed: 0
        },
        'skeleton arrow': {
          speed: 15
        },
        'ghost': {
          cast_speed: 1800,
          speed: 1.7,
          looking_range: 400,
          life: 10,
          max_life: 10,
        },
        'player': {
            speed: 5.4,
            more_speed: 0,
            attack_range: 60,
        },
        'pile of skull':{
            life: 40,
            max_life: 40,
            cast_speed: 2500,
        },
        'giant undead':{
            life: 120,
            max_life: 120,
            speed: 0.5,
            attack_speed: 2800,
            attack_range: 80,
            looking_range: 350,
            more_speed: 0
        },
        'lich':{
            life: 220,
            max_life: 220,
            speed: 1.2,
            attack_speed: 0,
            looking_range: 350,
            cast_speed: 2300
        }
    }

    static get(unit){
        let r = {}
        return Object.assign(r ,UnitData.data[unit])
    }
}