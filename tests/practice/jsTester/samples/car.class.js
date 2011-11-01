var Car = (function(){
    var privateKey = 'im private!';

    return function(color, cilinders){
        console.log("PRIVATE KEY: " + privateKey);
        console.log("CONSTRUCTOR: color: " + color);
        this.color = color;
        this.cilinders = cilinders;

        this.start = function(){
            return 'starting ' + color + ' car';
        };
    };
})();

var car = new Car('red', 4);
console.log(car.start());
console.log(car.privateKey);