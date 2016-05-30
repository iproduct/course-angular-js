import {Promise} from 'es6-shim';

class Greeter {
    constructor(private element: HTMLElement, private name: string) { }
    greet() {
        this.greetAfterTimeout("Hello", name, 3000).then(
            (msg: string) => this.element.innerHTML = msg);
    }

    greetAfterTimeout(msg: string, who: string, timeout: number) {
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



