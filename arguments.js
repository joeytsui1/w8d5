// function sum() {
//     let res = 0
//     for (let i = 0; i < arguments.length; i++) {
//         res += arguments[i]
//     }
//     return res
// }

// console.log(sum(1,2,3))

function sum(...nums){
    let res = 0
    for (let i = 0; i < nums.length; i++) {
        res += nums[i]
    }
    return res
}

// console.log(sum(1, 2, 3))

Function.prototype.myBind = function(context) {
    let that = this
    let bindArgs = arguments.slice(1)
    return function() {
        let callArgs = arguments.slice()
        return that.apply(context, bindArgs.concat(callArgs))
    }
}

Function.prototype.myBind = function(context, ...bindArgs) {
    let that = this
    return function(...callArgs) {
        return that.apply(context, bindArgs.concat(callArgs))
    }
}

class Cat {
    constructor(name) {
        this.name = name;
    }

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    }
}

class Dog {
    constructor(name) {
        this.name = name;
    }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

markov.says.myBind(pavlov, "meow", "Kush")();
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
markov.says.myBind(pavlov)("meow", "a tree");
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(pavlov);
notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true

function curry(numArgs){
    let arr = []

    return function _curriedSum(num) {
        arr.push(num)
        if(arr.length === numArgs) {
            let sum = 0
            for (let i = 0; i < numArgs; i++) {
                sum += arr[i]
            }
            return sum
        } else {
            return _curriedSum
        }
    }
}

function sumThree(num1, num2, num3) {
    return num1 + num2 + num3;
}

console.log(sumThree(4, 20, 6)); // == 30

// you'll write `Function#curry`!
// let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
// f1 = f1(4); // [Function]
// f1 = f1(20); // [Function]
// f1 = f1(6); // = 30

// or more briefly:
console.log(sumThree.curry(3)(4)(20)(6));


Function.prototype.curry = function() {
    return function(num1) {
        return function(num2) {
            return function(num3) {
                return num1 + num2 + num3
            }
        }
    }
}

let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30

console.log(sumThree.curry(3)(4)(20)(6));