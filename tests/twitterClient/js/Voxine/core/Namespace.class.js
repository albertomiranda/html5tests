/**
 * Namespace support.
 * Allows easy creation and assignment of namespace modules.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(function() {
    //create base object
    //var Voxine = Voxine || {};

    //add namespace support
    Voxine.namespace = function(namespace, data) {
        if(data==undefined) data = {};
        var parts = namespace.split('.')
        var parent = Voxine
        
        //strip redundant leading global
        if (parts[0] === 'Voxine') parts = parts.slice(1);

        for (var i = 0; i < parts.length; i += 1) {
            //create a property if it doesn't exist
            if (typeof parent[parts[i]] === "undefined") parent[parts[i]] = {};
            parent = parent[parts[i]];
        }
        
        //assign passed data and return object
        eval(namespace + "= data");
        return parent;
    };
    
    return Voxine;
});