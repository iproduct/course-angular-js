import {Promise} from 'es6-shim';

class Greeter {
    constructor(private name: string) { }
    greet() {
        this.greetAfterTimeout("Hello", this.name, 3000).then(
            (msg: string) => {
                console.log(msg);
                return this.greetAfterTimeout("Hi", this.name, 2000)
            }
        ).then( 
            (msg) => console.log(msg)
        );
    }

    greetAfterTimeout(msg: string, who: string, timeout: number) {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => resolve(`${msg} ${who} from TypeScript!`), timeout);
        });
    }
};


var greeter = new Greeter("JS User");
greeter.greet();




