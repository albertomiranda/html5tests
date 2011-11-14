/**
 * Framework Tests: VoxView
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    ['voxine/view/VoxView.class'],
    function(VoxView) {
        /**
         * View test.
         * Creates a new View object assigning a template.
         * Parses template with test data and returns its output.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @return string
         */
        var noTarget = function(){
            var view = new VoxView('testView1.view.php');

            //add mediator
            var Mediator = new VoxMediator();
            Mediator.mixin(view);
            view.bind('parsed', function(output){
                console.log("I HEAR YOU SAY 'parsed'!\n" + output);
            });

            //render
            view.render({
                "testName": "VoxView test 2, no target",
                "subtitle": "Parsed with no target. Triggered event!",
                "url": "albertomiranda.com.ar/html5",
                "urlName": "HTML5 Tests"
            });
        };

        /**
         * View test.
         * Creates a new View object assigning a template.
         * Parses template with test data and assign it to specified target element.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @return string
         */
        var target = function(){
            var view = new VoxView('testView1.view', '#tweets');
            view.render({
                "testName": "VoxView test 2",
                "subtitle": "This test worked just fine. Enjoy!",
                "url": "albertomiranda.com.ar/html5",
                "urlName": "HTML5 Tests"
            });
        };

        /**
         * Test multiple creations of View.
         */
        var twoTargets = function(){
            var view1 = new VoxView('testView1.view.php', '#tweets');
            view1.render({
                "testName": "VoxView test 1",
                "subtitle": "This test worked just fine. Enjoy!",
                "url": "albertomiranda.com.ar/html5",
                "urlName": "HTML5 Tests"
            });

            var view2 = new VoxView('testView1.view.php', 'h1');
            view2.render({
                "testName": "VoxView test 2",
                "subtitle": "This test worked just fine. Enjoy!",
                "url": "albertomiranda.com.ar/html5",
                "urlName": "HTML5 Tests"
            });
        }
        
        /**
         * Test multiple creations of View.
         */
        var targetAndNoTarget = function(){
            var view1 = new VoxView('testView1.view.php', '#tweets');
            view1.render({
                "testName": "VoxView test 1",
                "subtitle": "This test worked just fine. Enjoy!",
                "url": "albertomiranda.com.ar/html5",
                "urlName": "HTML5 Tests"
            });

            var view2 = new VoxView('testView1.view.php', null, this);
            var Mediator = new VoxMediator(); //add mediator to listen to "parsed" event
            Mediator.mixin(this);
            this.bind('parsed', function(output){
                console.log("I HEAR YOU SAY 'parsed'!\n" + output);
            });
            view2.render({
                "testName": "VoxView test 2, no target",
                "subtitle": "Parsed with no target. Triggered event!",
                "url": "albertomiranda.com.ar/html5",
                "urlName": "HTML5 Tests"
            });
        }

        return  {
            noTarget: noTarget,
            target: target,
            twoTargets: twoTargets,
            targetAndNoTarget: targetAndNoTarget
        };
    }
);