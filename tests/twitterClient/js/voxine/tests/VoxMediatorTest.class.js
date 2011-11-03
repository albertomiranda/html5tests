/**
 * Framework Tests: VoxMediator
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    ['voxine/core/VoxMediator.class'],
    function(VoxMediator) {
        
        function makePublisher() {
            var pub = {};
            var mediator = new VoxMediator();
            mediator.mixin(pub);
            return pub;
        };
        
        /**
         * Test 
         * 
         * @author Esteban Abait <esteban.abait@nextive.com>
         */
        var testParameterAndContext = function(){
            var listener = {id: '1234'};
            var pub = makePublisher();

            var callback = function(parameters) {
                var assert1 = this.id === '1234';
                var assert2 = parameters === '1234';
                var res = assert1 && assert2;
                console.log('Test case result: ' + (res ? 'pass' : 'fail'));
            };
            pub.bind('test:event', callback, listener);
            pub.trigger('test:event', '1234');
        };
        
        /** 
         * Test the <pre>bind</pre> method
         * @author Esteban Abait <esteban.abait@nextive.com>
         */
        var bindOneEvent = function() {
            var pub = makePublisher();
            
            var assert1 = false;
            
            var callback = function() {
                assert1 = true;
            };
            pub.bind('test:event', callback);
            pub.trigger('test:event');
            
            console.log('Test case result: ' + (assert1 ? 'pass' : 'fail'));
        };
        
        /** 
         * Test the <pre>unbind</pre> method
         * @author Esteban Abait <esteban.abait@nextive.com>
         */
        var bindOneUnbindOne = function() {
            var pub = makePublisher();
            
            var assert1 = true;
            
            var callback = function() {
                assert1 = false;
            };
            
            pub.bind('test:event', callback);
            pub.unbind('test:event', callback);
            
            pub.trigger('test:event');

            console.log('Test case result: ' + (assert1 ? 'pass' : 'fail'));
        };
        
        /** 
         * Test unbinding the same event twice.
         * Shows weather the class throws exceptions
         * @author Esteban Abait <esteban.abait@nextive.com>
         */
        var bindOneUnbindTwo = function() {
            var pub = makePublisher();
            
            var assert1 = true;
            
            var callback = function() {
                assert1 = false;
            };
            
            pub.bind('test:event', callback);
            pub.unbind('test:event', callback);
            pub.unbind('test:event', callback);
            
            pub.trigger('test:event');

            console.log('Test case result: ' + (assert1 ? 'pass' : 'fail'));
        };
        
        /** 
         * Test unbinding the same event twice and then binding
         * it again, so it should trigger.
         * @author Esteban Abait <esteban.abait@nextive.com>
         */
        var bindOneUnbindTwoBindAgain = function() {
            var pub = makePublisher();
            
            var assert1 = false;
            
            var callback = function() {
                assert1 = true;
            };
            
            pub.bind('test:event', callback);
            pub.unbind('test:event', callback);
            pub.unbind('test:event', callback);
            pub.bind('test:event', callback);
            
            pub.trigger('test:event');

            console.log('Test case result: ' + (assert1 ? 'pass' : 'fail'));
        };
        
        /** 
         * Add multiple listeners with different contexts
         * 
         * @author Esteban Abait <esteban.abait@nextive.com>
         */
        var multipleListeners = function() {
            var pub = makePublisher();
            var sub1 = {id : '1'},
                sub2 = {id : '2'},
                sub3 = {id : '3'};
            
            var assert1 = false,
                assert2 = false,
                assert3 = false;
            
            var callback1 = function() {
                assert1 = this.id === '1';
            };
            
            var callback2 = function() {
                assert2 = this.id === '2';
            };
            
            var callback3 = function() {
                assert3 = this.id === '3';
            };
            
            pub.bind('test:event', callback1, sub1);
            pub.bind('test:event', callback2, sub2);
            pub.bind('test:event', callback3, sub3);
            
            pub.trigger('test:event');

            var res = (assert1 && assert2 && assert3);
            console.log('Test case result: ' + (res ? 'pass' : 'fail'));
        };
        
        return  {
            bindOneEvent : bindOneEvent,
            bindOneUnbindOne :bindOneUnbindOne,
            bindOneUnbindTwo : bindOneUnbindTwo,
            bindOneUnbindTwoBindAgain : bindOneUnbindTwoBindAgain,
            testParameterAndContext: testParameterAndContext,
            multipleListeners : multipleListeners
        };
    }
);
