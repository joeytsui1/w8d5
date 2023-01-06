// Function.prototype.inherits = function(ele) {
//     function Surrogate() {}
//     Surrogate.prototype = ele.prototype
//     this.prototype = new Surrogate
//     this.prototype.constructor = this

// }

Function.prototype.inherits = function(ele) {
    Object.create(this, ele)
}

function MovingObject() { }

function Ship() { }
Ship.inherits(MovingObject);

function Asteroid() { }
Asteroid.inherits(MovingObject);