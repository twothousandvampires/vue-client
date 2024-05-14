import {ref} from "vue";
let instance;
let log = {
    msgs: ref([])
};

class Logger {
    constructor() {
        if (instance) {
            throw new Error("New instance cannot be created!!");
        }

        instance = this;
    }

    pushMsg(msg) {
       log.msgs.value.push(msg)
    }

    getLog() {
        return log.msgs.value;
    }
}

let logInstance = Object.freeze(new Logger());

export default logInstance;