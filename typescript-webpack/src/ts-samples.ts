let s: string;
s = "aaaa";

let fullName: string = "Jane Smith";
let age = 35;
let sentence: string = `Hello, my name is ${ fullName }.
My age is: ${age}`;
console.log(sentence);

let x: [string, number];

x = ["hello", 10];

enum Color {Red = 1, Green, Blue};
let colorName: string = Color[2];

console.log("color:", colorName);

// for (let i = 0; i < 10 ; i++) {
//     setTimeout(function() {console.log(i); }, 1000 * i);}

let o : {a: string; b?: number;} = {a: "foo"} ;
let {a, b = 20} = o;
console.log(a,b);

function f({a, b = 0}: {a: string; b?: number;} = o ): void {
    console.log(a,b);
}
f({a: "yes"}); // ok, default b = 0
f(); // ok, default to {a: ""}, which then defaults b = 0
//f({}); // not ok - missing a