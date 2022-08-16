export default class FireCoilExplosion{

    constructor(template) {

        this.level = template.level
        this.description = template.description
        this.name = template.name
        this.img_path = template.img_path
        this.type = template.subtype;

        this.props = template.properties
        this.props.sort((a,b) => {
            return a.order - b.order
        })

        this.create_fire_coil_explosion = this.props[0]

    }

}