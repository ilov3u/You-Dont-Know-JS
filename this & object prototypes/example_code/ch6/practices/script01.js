function Foo() {
    /* .. */
}

function Bar () {

}

Bar.prototype = Object.create(Foo.prototype);

var b1 = new Bar();

Bar.prototype instanceof Foo; //  true
Object.getPrototypeOf(Bar.prototype) === Foo.prototype; //  true
Foo.prototype.isPrototypeOf(Bar.prototype); // true
Foo.prototype.isPrototypeOf(b1); // true
Bar.prototype.isPrototypeOf(b1); // true

/*
OLOO style
 */

var Foo1 = {};

var Bar1 = Object.create(Foo1);

var bar1 = Object.create(Bar1);


Foo1.isPrototypeOf(Bar1); // true
Object.getPrototypeOf(Bar1) === Foo1; // true

Foo1.isPrototypeOf(bar1); // true
Bar1.isPrototypeOf(bar1);