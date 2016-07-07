"use strict";
var es6_promise_1 = require('es6-promise');
var Greeter = (function () {
    function Greeter(element, name) {
        this.element = element;
        this.name = name;
    }
    Greeter.prototype.greet = function () {
        var _this = this;
        this.greetAfterTimeout("Hello", this.name, 4000).then(function (msg) { return _this.element.innerHTML = msg; });
    };
    Greeter.prototype.greetAfterTimeout = function (msg, who, timeout) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(msg + " " + who + " from TypeScript!"); }, timeout);
        });
    };
    return Greeter;
}());
;
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el, "JS User");
    greeter.greet();
};
//# sourceMappingURL=greeter.js.map