/**
 * Todo object.
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define([
        'VoxClass',
        'voxine/collection/VoxObjectCollection.class',
        'app/models/Todo.class'
    ],
    function(VoxClass, VoxObjectCollection, Todo) {
    
        var onLoadSuccess = function(response) {
            //var obj = JSON.parse(response);
            var collection = response["collection"];
            var newtodo, aux;
            for (var i = 0, l = collection.length; i < l; ++i) {
                aux = collection[i];
                newtodo = new Todo(aux.storageType, aux.storageKey, {}, aux.done, aux.activity);
                this.addItem(newtodo);
            };
        };

        var onLoadError = function(response) {
            //throw Error('Critical error when loading todo list: ' + response);
        };
        
        var getRemaining = function() {
            var remaining = this.filterBy({done : false}, true);
            return remaining.size;
        };
        
        var deleteFinished = function() {
            var dones = this.filterBy({done : true}, true);
            for (var i=0, l=dones.size; i < l; ++i) {
                this.removeItem(dones.getItemAt(i).clientKey)
            };
        };
        
        var toJSON = function() {
            
            var collection = [];
            for (var i=0, l = this.collection.length; i<l; ++i) {
                collection[i] = this.collection[i].prune();
            };
            
            return JSON.stringify({
                storageKey: this.storageKey, 
                storageType: this.storageType,
                clientKey: this.clientKey,
                serverKey: this.serverKey,
                collection: collection,
                filter: this.filter,
                options: this.options
            });
        };
        
        return VoxClass.Class(
            'TodoList',
            VoxObjectCollection,
            {
                onLoadSuccess : onLoadSuccess,
                onLoadError : onLoadError,
                getRemaining : getRemaining,
                toJSON : toJSON,
                deleteFinished : deleteFinished
            }
        );
});
