ko.bindingHandlers.numeric = {
    init: function (element, valueAccessor) {
        $(element).on('keydown', function (event) {

            // Allow: backspace, delete, tab, escape, and enter
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
                // Allow: Ctrl combinations
            (event.ctrlKey === true) ||
                //Allow decimal symbol (.)

                // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            else {
                // Ensure that it is a number and stop the event
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 || event.keyCode === 190)) {
                    event.preventDefault();
                }
            }
        });
    },
    update: function (element, valueAccessor) {
    }
};


ko.bindingHandlers.decimal = {
    init: function (element, valueAccessor) {
        $(element).on('keydown', function (event) {

            if (event.shiftKey == true) {
                event.preventDefault();
            }

            if ((event.keyCode >= 48 && event.keyCode <= 57) ||
                (event.keyCode >= 96 && event.keyCode <= 105) ||
                event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 ||
                event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190 || event.keyCode == 110) {

            } else {
                event.preventDefault();
            }

            if ($(this).val().indexOf('.') !== -1 && (event.keyCode == 190 || event.keyCode == 110))
                event.preventDefault();
        });
    },
    update: function (element, valueAccessor) {
    }
};

var jQueryWidget = function(element, valueAccessor, name, constructor) {
    var options = ko.utils.unwrapObservable(valueAccessor());
    var $element = $(element);
    setTimeout(function() { constructor($element, options) }, 0);
    //$element.data(name, $widget);

};


ko.bindingHandlers.dialog = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
            console.log("init");
            jQueryWidget(element, valueAccessor, 'dialog', function($element, options) {
                console.log("Creating dialog on "  + $element);
                return $element.dialog(options);
            });
        }        
};
    
    
ko.bindingHandlers.dialogcmd = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel) {          
            $(element).button().click(function() {
                var options = ko.utils.unwrapObservable(valueAccessor());
                $('#' + options.id).dialog(options.cmd || 'open');
            });
        }        
};


ko.bindingHandlers.popupCommand = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel) {          
            $(element).button().click(function() {
                var options = ko.utils.unwrapObservable(valueAccessor());
                $('#' + options.id).popup(options.cmd || 'open');

                if(options.cmd == 'close' && typeof viewModel.reset == "function")
                    viewModel.reset();

                
            });
        }        
};
