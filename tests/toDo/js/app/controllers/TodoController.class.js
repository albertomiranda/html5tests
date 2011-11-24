/**
 * Todo Controller
 * 
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define([    
        'VoxClass',
        'voxine/controller/VoxController.class',
        'jQuery'
    ], 
    function(VoxClass, VoxController, $) {
        
        var onParsed = function(output) {
            $('#todo-list').append(output);
            $('#todo-list').listview("refresh");
        };
        
        var toogleTodo = function(event) {
            var model = event.data.controller.model;
            model.toggle();
        };
        
        var renderToogle = function() {
            var checkBoxNode = $('#ch_' + this.id + ':checked');
            var decoration = checkBoxNode.val() ? 'line-through' : 'none';
            $('#' + this.id).css('text-decoration', decoration);
        };
        
        var destroy = function(key) {
            if (key === this.model.clientKey) {
                $('#' + this.id).remove();
                $('#todo-list').listview("refresh");
            }    
        };
    
        return VoxClass.Class(
            'TodoController',
            VoxController,
            {
                constructor: function (id, count, model) {
                    this.id = id;
                    this.model = model;
                    var selectId = '#' + this.id;
                    
                    this.bindingsMap = {};
                    this.bindingsMap["todo.view.html"] = {};
                    this.bindingsMap["todo.view.html"][selectId] = {'click' : toogleTodo};

                    var dataToRender = {
                        activity : model.activity,
                        id       : id,
                        ch_id    : 'ch_' + id,
                        count    : count
                    };
                    
                    //render main view
                    this.render('todo.view.html', null, dataToRender, onParsed);
                    
                    model.bind("todo:toogle", renderToogle, this);
                },
                toogleTodo : toogleTodo,
                destroy : destroy
            }
        );
});
