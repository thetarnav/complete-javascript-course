///////////////////////////////////////
// Lecture: Hoisting

///////////////////////////////////////
// Lecture: Scoping

// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/

// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/

///////////////////////////////////////
// Lecture: The this keyword

const myArrowFunc = () => console.log(this)
myArrowFunc()

const myObject = {
	property: 123,
	copy: this,

	myMethod() {
		console.log(this)
	},
	myMethod2: function () {
		console.log(this)

		function innerFunc() {
			console.log(this)
		}
		innerFunc()

		const arrowFunc = () => console.log(this)
		arrowFunc()
	},
}

myObject.myMethod()
myObject.myMethod2()

const newObject = {
	property: 321,
}

newObject.myMethod = myObject.myMethod
newObject.myMethod2 = myObject.myMethod2

newObject.myMethod()
newObject.myMethod2()

newObject.copy = myObject.copy
console.log(newObject.copy)
console.log(myObject.copy)
