define(['dojo'], function(){
    var Class = function(classname, inheritsfrom, functions) {
        return dojo.declare(classname, inheritsfrom, functions);
    };
    return {
        Class: Class
    }
})
