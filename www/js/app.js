
var SalesStatisticViewModel = function () {
    var self = this;
    self.totalSales = ko.observableArray([]);
    self.totalTips = ko.observable();

    self.totalSalesAmount = ko.computed(function () {
        var totalAmount = 0;

        ko.utils.arrayForEach(self.totalSales(), function(item) {

            totalAmount += (parseFloat(item.Price) * parseFloat(item.Quantity));
        });

        return '$' + totalAmount.toFixed(2);
    });

    self.init = function () {

        self.totalSales([{ Id: 1, Name: "Cake", Price: 20, Quantity: 10 },
            { Id: 2, Name: "Cake I", Price: 30, Quantity: 4 },
            { Id: 3, Name: "Cake II", Price: 40, Quantity: 2 },
        { Id: 4, Name: "Cake III", Price: 40, Quantity: 2 },
        { Id: 5, Name: "Cake IV", Price: 40, Quantity: 2 }]);
        self.totalTips(200);
    }
}




var CheckOutViewModel = function (cart) {
    var self = this;
    self.cart = ko.observableArray([]);
    self.cartAmount = ko.observable();
    self.CashReceived = ko.observable();
    self.TipReceived = ko.observable();
    self.Change = ko.computed(function () {
        var cartAmount = parseFloat(self.cartAmount() == undefined ? 0.00 : self.cartAmount().replace("$", "") || 0.00);
        return '$' + (parseFloat(self.CashReceived() || 0) - (cartAmount + parseFloat(self.TipReceived() || 0))).toFixed(2);
    });

    self.MoneyReceived = function () {

    }
    self.ClearCart = function () {
        self.cart([])
        mainViewModel.cart([])
        self.cartAmount(null);
        $('#dialogDeleteCart').popup('close');

    }
}


var ButtonColorViewModel = function (data) {

    var self = this;
    self.Color = ko.observable('');

    if (data) {
        self.Color(data);

    }

}

var DesignViewModel = function () {

    var self = this;
    self.SelectedButton = ko.observable();
    self.buttons = ko.observableArray([]);
    self.Name = ko.observable('Button').extend({ required: true });
    self.Color = ko.observable('btn-blue');
    self.Price = ko.observable('').extend({ required: true });
    self.ButtonCaption = ko.computed(function () {
        return self.Name() + (self.Price() != '' ? " ($" + self.Price() + ")" : '');
    })

    self.reset = function () {
        self.Name('Button');
        self.Color('btn-blue');
        self.Price('');
    }

    self.setColor = function (entity) {

        self.Color(entity.Color());
    }

    self.isModelValid = function () {
        var result = ko.validation.group(self, { deep: true, observable: false });

        if (!self.isValid()) {
            result.showAllMessages(true);
            return false;
        }
        return true;
    };


    self.SaveButton = function () {

        $.when(self.isModelValid()).then(function (result) {

            if (result) {

                self.SelectedButton().Name(self.Name());
                self.SelectedButton().Price(self.Price());
                self.SelectedButton().ButtonClass(self.Color() + " ui-btn ui-btn-f ui-shadow ui-corner-all");
                self.SelectedButton().IsSale(true);
                self.reset();
                $.mobile.changePage("#main-page", { transition: "slide", changeHash: true });


            }

        });







    }

    self.init = function () {

        var rows = [
		"btn-blue",
		"btn-grey",
		"btn-green",
		"btn-red",
		"btn-yellow",
		"btn-cream",
		"btn-orange",
		"btn-violet"], buttons = [];

        ko.utils.arrayForEach(rows, function (item) {
            buttons.push(new ButtonColorViewModel(item));
        });
        self.buttons(buttons);



    }

    self.init();

}




var ButtonViewModel = function (data) {
    var self = this;
    self.Id = ko.observable();
    self.Name = ko.observable('');
    self.Price = ko.observable('');
    self.ButtonClass = ko.observable("btn-blue");
    self.IsSale = ko.observable(false);
    self.ButtonCaption = ko.computed(function () {
        return self.Name() + (self.Price() != '' ? " ($" + self.Price() + ")" : '');
    })
    if (data) {
        self.Id(data.Id);
    }

}

var CartViewModel = function (data) {

    var self = this;
    self.Id = ko.observable(0);
    self.Price = ko.observable().extend({ required: true });
    self.Quantity = ko.observable().extend({ required: true });
    self.Name = ko.observable().extend({ required: true });
    self.Total = ko.computed(function () {
        return (parseFloat(self.Price()) * parseFloat(self.Quantity())).toFixed(2);
    })

    self.reset = function () {
        self.Id(0);
        self.Price('');
        self.Quantity('');
        self.Name('');
    }

    self.isModelValid = function () {
        var result = ko.validation.group(self, { deep: true, observable: false });

        if (!self.isValid()) {
            result.showAllMessages(true);
            return false;
        }
        return true;
    };

    if (data) {
        self.Id(data.Id);
        self.Price(data.Price);
        self.Quantity(data.Quantity);
        self.Name(data.Name);
    }
}


var MainViewModel = function () {
    var self = this;
    self.salesButtons = ko.observableArray([]);
    self.cart = ko.observableArray([]);
    self._extraSale = ko.observable();
    self.showFirst = ko.observable(true);
    self.MoreCaption = ko.computed(function () {

        return self.showFirst() ? "Next" : "Previous";
    })

    self.next = function () {

        self.showFirst(!self.showFirst());
    }
    self.cartAmount = ko.computed(function () {

        if (self.cart().length == 0)
            return '$0.00';

        var total = 0.00;

        ko.utils.arrayForEach(self.cart(), function (item) {
            total += parseFloat(item.Total());
        })

        return '$' + parseFloat(total).toFixed(2);

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

    self.checkOut = function () {

        checkoutViewModel.cart(self.cart());
        checkoutViewModel.cartAmount(self.cartAmount());
        $.mobile.changePage("#checkout-page", { transition: "slide", changeHash: true });

    }

    self.addExtraSales = function () {

        if (self._extraSale().isModelValid()) {

            var id = 0;
            ko.utils.arrayForEach(self.cart(), function (item) {

                if (id > item.Id())
                    id = item.Id();

            });

            if (id == 0 || id < 25)
                id = 25;
            else
                id = id + 1;

            self._extraSale().Id(id);
            self.cart.push(new CartViewModel({ Id: self._extraSale().Id(), Price: self._extraSale().Price(), Name: self._extraSale().Name(), Quantity: self._extraSale().Quantity() }))
            self._extraSale().reset();

            $("#extrapopup").popup("close");

        }



    }



    self.addItem = function (entity) {

        if (entity.IsSale()) {
            var existingButton = ko.utils.arrayFirst(self.cart(), function (item) {
                return item.Id() == entity.Id()
            });

            if (existingButton != null)
                existingButton.Quantity(existingButton.Quantity() + 1);
            else
                self.cart.push(new CartViewModel({ Id: entity.Id(), Price: entity.Price(), Name: entity.Name(), Quantity: 1 }))




        }
        else {

            designViewModel.SelectedButton(entity);
            $.mobile.changePage("#design-page", { transition: "slide", changeHash: true });
        }
    }


    self.init = function () {

        var rows = [{ Id: 1 }, { Id: 2 }, { Id: 3 }, { Id: 4 }, { Id: 5 }, { Id: 6 }, { Id: 7 }, { Id: 8 }, { Id: 9 }, { Id: 10 },
					{ Id: 11 }, { Id: 12 }, { Id: 13 }, { Id: 14 }, { Id: 15 }, { Id: 16 }, { Id: 17 }, { Id: 18 }, { Id: 19 }, { Id: 20 },
					{ Id: 21 }, { Id: 22 }, { Id: 23 }, { Id: 24 }], buttons = [];

        ko.utils.arrayForEach(rows, function (item) {
            buttons.push(new ButtonViewModel(item));
        });
        self.salesButtons(buttons);
        self._extraSale(new CartViewModel());



    }

    self.salesstatistic = function () {

        $.when(salesStatisticViewModel.init()).then(function () {
            $.mobile.changePage("#sale-statistic-page", { transition: "slide", changeHash: true });
        });

    }

    self.init();



}

var mainViewModel = new MainViewModel();
var designViewModel = new DesignViewModel();
var checkoutViewModel = new CheckOutViewModel();
var salesStatisticViewModel = new SalesStatisticViewModel();

ko.applyBindings(mainViewModel, document.getElementById("main-page"));
ko.applyBindings(designViewModel, document.getElementById("design-page"));
ko.applyBindings(checkoutViewModel, document.getElementById("checkout-page"));
ko.applyBindings(salesStatisticViewModel, document.getElementById("sale-statistic-page"));