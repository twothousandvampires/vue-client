import Used from "./../Used";

export default class Scroll extends Used{
    constructor(template) {
        super(template);
        this.props = template.props
    }

    getDescription(){
        let desc = 'Increase random stat : '
        this.props.for
        return desc
    }
}