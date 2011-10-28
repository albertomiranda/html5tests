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
        var parts = namespace.split('.');
        var parent = Voxine;
        
        //strip redundant leading global
        if (parts[0] === 'Voxine') parts = parts.slice(1);

        for (var i = 0; i < parts.length; ++i) {
            //create a property if it doesn't exist
            if (typeof parent[parts[i]] === "undefined") parent[parts[i]] = {};
            if(i+1>=parts.length) parent[parts[i]] = data; //assign data to last node
            parent = parent[parts[i]];
        }
        return parent;
    };
    return Voxine;
});