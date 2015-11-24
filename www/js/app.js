
var CheckOutViewModel = function(cart){
	var self = this;
	self.cart = ko.observableArray([]);
	self.cartAmount = ko.observable();

	self.ConfirmDelete = function(){
		alert()
    	$.mobile.changePage("#myDialog");
    }
    self.clearCart=function(){
    	self.cart([])
    	$.mobile.changePage( "#checkout-page", { transition: "slideup", changeHash: false });
    }

}


var ButtonColorViewModel = function(data){

		var self = this;
		self.Color = ko.observable('');	

		if(data){
			self.Color(data);
			
		}

}

var DesignViewModel = function(){

	var self = this;
	self.SelectedButton =ko.observable();
	self.buttons = ko.observableArray([]);
	self.Name = ko.observable('Button');
	self.Color = ko.observable('btn-blue');
	self.Price =ko.observable('');
	self.ButtonCaption = ko.computed(function(){
	return self.Name() +(self.Price() != '' ? " ($" +self.Price() +")" : '');
	})

	self.setColor = function(entity){

		self.Color(entity.Color());
	}

	
	self.SaveButton = function(){

	self.SelectedButton().Name(self.Name());
	self.SelectedButton().Price(self.Price());
	self.SelectedButton().ButtonClass(self.Color());
	self.SelectedButton().IsSale(true);
	$.mobile.changePage( "#main-page", { transition: "slideup", changeHash: false });



	}
	
	self.init = function(){

		var rows =[
		"btn-blue",
		"btn-grey",
		"btn-green",
		"btn-red",
		"btn-yellow",
		"btn-cream",
		"btn-orange",
		"btn-violet"],buttons =[];

		ko.utils.arrayForEach(rows,function(item){
			buttons.push(new ButtonColorViewModel(item));
		});
		self.buttons(buttons);



	}

	self.init();

}




var ButtonViewModel = function(data){
	var self = this;
	self.Id = ko.observable();
	self.Name = ko.observable('');
	self.Price = ko.observable('');
	self.ButtonClass = ko.observable("btn-blue");
	self.IsSale = ko.observable(false);	
	self.ButtonCaption = ko.computed(function(){
	return self.Name() +(self.Price() != '' ? " ($" +self.Price() +")" : '');
	})
	if(data){
		self.Id(data.Id);
	}

}

var CartViewModel = function(data){

	var self = this;
	self.Id= ko.observable();
	self.Price = ko.observable();
	self.Quantity= ko.observable();
	self.Name = ko.observable();
	self.Total = ko.computed(function(){
		return (parseFloat(self.Price()) * parseFloat(self.Quantity())).toFixed(2);
	})

	if(data){
		self.Id(data.Id);
		self.Price(data.Price);
		self.Quantity(data.Quantity);
		self.Name(data.Name);
	}
}


var MainViewModel = function(){
	var self = this;
	self.salesButtons = ko.observableArray([]);
	self.cart= ko.observableArray([]);
	self.cartAmount = ko.computed(function(){

		if(self.cart().length  == 0)
			return '$0.00';

		var total =0.00;

		ko.utils.arrayForEach(self.cart(),function(item){

			total+=parseFloat(item.Total());
		})

		return '$'+parseFloat(total).toFixed(2);

	});
	self._items = ko.computed(function () {
        var itemsPerRow = 3, rowIndex = 0, rows = [];
        var people = self.salesButtons();
        if (people == null)
            return [];

        for (var index = 0; index < people.length; index++) {
            if (!rows[rowIndex])
                rows[rowIndex] = [];

            rows[rowIndex].push(people[index]);
            if (rows[rowIndex].length == itemsPerRow)
                rowIndex++;
        }

        return rows;
    });

    self.checkOut = function(){

    	checkoutViewModel.cart(self.cart());
    	checkoutViewModel.cartAmount(self.cartAmount());    	
    	$.mobile.changePage( "#checkout-page", { transition: "slideup", changeHash: false });

    }

    

    self.addItem = function(entity){

    	if(entity.IsSale()){
    		var existingButton  = ko.utils.arrayFirst(self.cart(),function(item){
    			return item.Id() == entity.Id()
    		});    

    		if(existingButton != null)
    		existingButton.Quantity(existingButton.Quantity()+1);
    		else
    		self.cart.push(new CartViewModel({Id : entity.Id(),Price : entity.Price(),Name : entity.Name(), Quantity : 1}))
    		

    	

    	}
    	else{

    	designViewModel.SelectedButton(entity); 
    	$.mobile.changePage( "#design-page", { transition: "slideup", changeHash: false });
    	}
    }

	
	self.init = function(){

		var rows =[{ Id : 1},{ Id : 2},{ Id : 3},{ Id : 4},{ Id : 5},{ Id : 6},{ Id : 7},{ Id : 8},{ Id : 9},{Id : 10},
					{ Id : 11},{ Id : 12},{ Id : 13},{ Id : 14},{ Id : 15},{ Id : 16},{ Id : 17},{ Id : 18},{ Id : 19},{Id : 20},
					{Id : 21},{Id : 22},{Id : 23},{Id : 24}],buttons =[];

		ko.utils.arrayForEach(rows,function(item){
			buttons.push(new ButtonViewModel(item));
		});
		self.salesButtons(buttons);



	}

	self.init();



}

var mainViewModel = new MainViewModel();
var designViewModel = new DesignViewModel();
var checkoutViewModel = new CheckOutViewModel();

ko.applyBindings(mainViewModel, document.getElementById("main-page"));
ko.applyBindings(designViewModel, document.getElementById("design-page"));
ko.applyBindings(checkoutViewModel, document.getElementById("checkout-page"));