import {Promise} from 'core-js';

class Greeter {
    constructor(private element: HTMLElement, private name: string) { }
    greet() {
        this.greetAfterTimeout("Hello", this.name, 3000).then(
            (msg: string) => {
                this.element.innerHTML += msg;
                return this.greetAfterTimeout("<br>Hi again", this.name, 2000);
        }).then(
            (msg: string) => {
                this.element.innerHTML += msg;
        });
    }

    private greetAfterTimeout(msg: string, who: string, timeout: number) {
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



