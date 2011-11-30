$(function() {
    //Color list
    window.Celsius = Backbone.Model.extend({
        // Default attributes for the colors list.
        defaults: function() {
            return {
                temperture : 0
            };
        },
        toFahrenheit : function() {
            return this.get("temperture") + 273.15;
        },
        toRankine : function() {
            return (this.get("temperture") + 273.15) * 1.8;
        },
        toKelvin : function() {
            return this.get("temperture") + 273.15;
        }
    });

    //View
    window.TempConverterView = Backbone.View.extend({

        el: $('#tempSlider'),

        events: {
          "change #tempSlider" : "updateTemperature"
        },
        
        initialize: function(){
            // every function that uses 'this' as the current object should be in here
            this.model = new Celsius();
            _.bindAll(this, 'render', 'updateTemperature'); 
            this.model.bind('change', this.render, this);
            this.render();
        },

        render: function() {
            $('#kelvin').text('Kelvin: ' + this.model.toKelvin());
            $('#fahrenheit').text('Fahrenheit: ' + this.model.toFahrenheit());
            $('#rankine').text('Rankine: ' + this.model.toRankine());
            return this;
        },
        
        updateTemperature : function() {
            console.log('pepe');
            this.model.set({temperture : $(this.el).val()});
        }
    });
    
    window.mainView = new TempConverterView();
});