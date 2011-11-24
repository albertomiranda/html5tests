/**
 * Todo Main Controller
 * 
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define([    
        'VoxClass',
        'voxine/controller/VoxController.class',
        'app/models/Todo.class',
        'app/models/TodoList.class',
        'app/controllers/TodoController.class',
        'jQuery'
    ], 
    function(VoxClass, VoxController, Todo, TodoList, TodoController, $) {
        var todos;
        
        var clearTodoInput = function(event) {
            $('#newtodo').val("");
        };
        
        var resetTodoInput = function(event) {
            //var controller = event.data.controller;
            $('#newtodo').val("What can be done?");
        };

        var addTodo = function() {
            if (event.keyCode && event.keyCode != 13) { 
                return;
            };
            
            var todo = new Todo('local', 'todo' + todos.size, {}, false, $('#newtodo').val());
            todos.addItem(todo);

            clearTodoInput();
        };
        
        var updateStats = function() {
            $('#todo-stats').html("<p>Remaining todos: " + todos.getRemaining() + "</p>");
        };
        
        var renderTodo = function(todo) {
            var toDoCtrl = new TodoController('todo' + todos.size, todos.size, todo);
            todos.bind('collection:itemRemoved', toDoCtrl.destroy, toDoCtrl);
        };

        var saveList = function() {
            todos.save();
        };
        
        var removeSelected = function() {
            todos.deleteFinished();
        };
        
        var onParsed = function() {
            //apply jquery's mobile styles
            $("#content").trigger("create");
            //load model from local storage
            todos.load();
        };
    
        return VoxClass.Class(
            'ListController',
            VoxController,
            {
                constructor: function () {
                    this.bindingsMap = {
                        "main.view.html": {
                            "#newtodo": {
                                "click" : clearTodoInput,
                                "keyup" : addTodo
                            },
                            "#addBtn" : {
                                "click" : addTodo
                            },
                            "#saveBtn" : {
                                "click" : saveList
                            },
                            "#removeBtn" : {
                                "click" : removeSelected
                            }
                        }
                    };
                    //render main view
                    this.render('main.view.html', '#content', {}, onParsed);
                    
                    //create application model
                    todos = new TodoList('local', 'voxine-todo-list', {}, function() {console.log('filtering');});
                    
                    //bind methods to model events
                    todos.bind('collection:itemAdded', renderTodo);
                    todos.bind('collection:itemAdded', updateStats);
                    todos.bind('collection:itemRemoved', updateStats);
                    
                    //the model will be loaded after the view renders itself
                    //see onLoadHandler
                }
            }
        );
});
