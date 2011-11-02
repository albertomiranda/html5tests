/**
 * Framework Tests.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    ['Voxine/view/VoxView.class'],
    function(VoxView) {
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
        var callback = function(lastname) {alert(this.name + " " + lastname);};
        pub.bind('helloworld', callback, sub);

        //trigger(event)
        pub.trigger('helloworld', 'Sanchez');

        pub.unbind('helloworld', callback);
        pub.trigger('helloworld');  
    };
    
    /**
     * View test.
     * Creates a new View object assigning a template.
     * Parses template with test data and returns its output.
     * 
     * @author Alberto Miranda <alberto@nextive.com>
     * @return string
     */
    var view1 = function(){
        var view = new VoxView('testView1.view', null, this);
        
        //add mediator
        var Mediator = new VoxMediator();
        Mediator.mixin(this);
        this.bind('parsed', function(output){
            console.log(output);
        });
        
        view.render({
            "testName": "VoxView test 1",
            "subtitle": "This test worked just fine. Enjoy!",
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
    var view2 = function(){
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
    var view3 = function(){
        var view1 = new VoxView('testView1.view.php', 'one');
        view1.render({
            "testName": "VoxView test 1",
            "subtitle": "This test worked just fine. Enjoy!",
            "url": "albertomiranda.com.ar/html5",
            "urlName": "HTML5 Tests"
        });
        
        var view2 = new VoxView('testView1.view.php', 'two');
        view2.render({
            "testName": "VoxView test 2",
            "subtitle": "This test worked just fine. Enjoy!",
            "url": "albertomiranda.com.ar/html5",
            "urlName": "HTML5 Tests"
        });
    }
    
    return  {
        testProp: "OIEA!",
        mediator: mediator,
        view1: view1,
        view2: view2,
        view3: view3
    };
});