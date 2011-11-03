/**
 * Framework Tests: VoxMediator
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    ['Voxine/core/VoxMediator.class'],
    function(VoxMediator) {
        /**
         * Mediator test.
         * Mixins mediator functionality with a test object.
         * Binds a custom event assigning a context.
         * Triggers custom event.
         * 
         * @author Esteban Abait <esteban.abait@nextive.com>
         */
        var mediator = function(){
            var pub = {}, sub = {name: 'Pedro'};
            var mediator = new VoxMediator();

            //mix mediator into pub object
            mediator.mixin(pub);

            //bind (event, callback, context)
            var callback = function(lastname) {console.log(this.name + " " + lastname);};
            pub.bind('helloworld', callback, sub);

            //trigger(event)
            pub.trigger('helloworld', 'Sanchez');

            pub.unbind('helloworld', callback);
            pub.trigger('helloworld');  
        };
        
    return  {
        default: mediator
    };
});