// Variables - containers that store values.

var name; // a declared variable, but not initialized (no value) and it's in the "global scope" (BAD)

let foo; // a declared ES 6 variable that can be changed - still no value however 

const bar = "Bar" // a declared ES 6 constant that cannot be changed.
// '=' is the assignment operator, read it as "is assigned the value of..."

const ANSWER = 42;

// Strings - a set of string of characters

let string1 = "Hello World!"

let string2 = "Hello Utah!"

let string3 = new String("Hello New World!")  // using a String constructor

// Numbers

let myNum = 888111333;

let myNum2 = 25.94;

"1" // This is not a number! It is a string.
// "==" a loose equality check
"1" == 1; // evaluates to true because of type coercion and loose equality checking
"1" === 1; // false because this is strict equality checking

// Boolean

let myBool = false;

// need to look further into "truthy" and "falsy" values

// Arrays - hold sets of items of any data type

let myArray = [];  // this is an empty array - notice the square brackets

// ordering     0      1      2       3      4
let myArray2 = [42, "Bob", myBool, ANSWER, true];

let secondElement = myArray2[1];  // retrieve the item at the 1 or second position of the array.

myArray2.length;  //  the length property of an array is very handy.

let lastItem = myArray2[myArray2.length - 1];

// Objects

let minObject = {}; // the most minimal object possible

let myCar = { // objects are made of properties which are key:value pairs.
    make: 'Chevrolet',
    color: 'Green',
    year: '1964',
    vin: '88888888',
}

myCar.numDoors = 4; // a new property can be simply added to an existing object using dot notation

const anotherObject = { // objects can contain just about anything, including arrays, other objects, etc.
    wordz: ['foo', 'bar', 'baz'],
    car: {
        make: 'Ferrari',
        model: 'LaFerrari'
    },
    dope: true
};

// Functions

function myFunction() { // this is a named function definition 
    return "My condolences to you is what I return!"; // doesn't do much. Only return a string.
}

function sumTwoThings(thingOne, thingTwo) {
    return thingOne + thingTwo;
}