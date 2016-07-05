import {Promise} from 'es6-promise';

class Greeter {
    constructor(private element: HTMLElement, private name: string) { }
    greet() {
        this.greetAfterTimeout("Hello", this.name, 4000).then(
            msg => this.element.innerHTML = msg);
    }

    greetAfterTimeout(msg, who, timeout) {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => resolve(`${msg} ${who} from TypeScript!`), timeout);
        });
    }
};


window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el, "JS User");
    greeter.greet();
};



