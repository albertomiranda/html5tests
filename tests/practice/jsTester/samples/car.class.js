var Car = (function(){
    return function(color, cilinders){
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