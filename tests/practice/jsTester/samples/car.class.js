var Car = (function(){
    var private = {
        "privateKey": "Private Me"
    };

    return function(color, cilinders, privateKey){
        console.log("PRIVATE KEY: " + private.privateKey);
        console.log("PRIVATE KEY PARAM: " + privateKey);
        console.log("CONSTRUCTOR: color: " + color);
        this.color = color;
        this.cilinders = cilinders;

        this.start = function(){
            return 'starting ' + color + ' car';
        };
    };
})();

var car = new Car('red', 4, 99);
console.log(car.start());
console.log(car.privateKey);