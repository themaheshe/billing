var currentDate = function () {
    var d = new Date,
           currentdate = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    return currentdate;
}

var SalesStatisticViewModel = function () {
    var self = this;
    self.totalSales = ko.observableArray([]);
    self.totalTips = ko.observable();
<<<<<<< HEAD
    self.Range = ko.observable('');
=======
>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9

    self.totalSalesAmount = ko.computed(function () {
        var totalAmount = 0;

<<<<<<< HEAD
        ko.utils.arrayForEach(self.totalSales(), function (item) {
            totalAmount += (parseFloat(item.Price()) * parseInt(item.Quantity()));
        });

        return '$' + totalAmount.toFixed(2);
    });

}

var CheckOutViewModel = function (cart) {
    var self = this;
    self.cart = ko.observableArray([]);
    self.cartAmount = ko.observable();
    self.CashReceived = ko.observable(0).extend({
        required: { message: 'Cash received is required' }
    });
    self.TipReceived = ko.observable(0);

    self.Change = ko.computed(function () {
        var cartAmount = parseFloat(self.cartAmount() == undefined ? 0.00 : self.cartAmount().replace("$", "") || 0.00);
        return '$' + (parseFloat(self.CashReceived() || 0) - (cartAmount + parseFloat(self.TipReceived() || 0))).toFixed(2);
    });

    self.isModelValid = function () {
        var result = ko.validation.group(self, { deep: false, observable: false });


        if (!self.isValid()) {
            result.showAllMessages(true);
            return false;
        }
        return true;
    };

    self.saveSales = function (trans) {

        var sql = 'INSERT INTO SALE (sale_date,tips,amountpaid) VALUES (?,?,?);';

        trans.executeSql(sql, [currentDate(), self.TipReceived(), self.cartAmount()], function (tx, results) {

            ko.utils.arrayForEach(mainViewModel.cart(), function (item) {
                sql = 'INSERT INTO SALEDETAIL (sale_id,itemid,quantity,price,description) VALUES (?,?,?,?,?);';
                trans.executeSql(sql, [results.insertId, item.Id(), item.Quantity(), item.Price(), item.Name()], function () { }, function () { });
            });


            sql = 'delete from CART';
            trans.executeSql(sql);


        }, function () {

        });
    }

    self.MoneyReceived = function () {
        if (self.isModelValid()) {
            _dbase.transaction(self.saveSales, function (success) {
                alert("dbsuccess");
            }, function (error) {
            
                self.cart([]);
                mainViewModel.cart([]);
                ko.utils.arrayForEach(mainViewModel.salesButtons(), function (item) {
                    item.Counter(0);
                });

                $('#checkoutpopup').popup('close');

                setTimeout(function () {
                    $.mobile.changePage("#main-page", { transition: "slide", changeHash: true });
                }, 500);

            });
        }


    }

    self.deleteCart = function (tx) {
        var sql = 'delete from CART';
        tx.executeSql(sql);
    }
    self.ClearCart = function () {
        _dbase.transaction(self.deleteCart, function (success) { }, function (error) {
            self.cart([]);

            mainViewModel.cart([]);
            ko.utils.arrayForEach(mainViewModel.salesButtons(), function (item) {
                item.Counter(0);
            });

            self.cartAmount(null);
            $('#dialogDeleteCart').popup('close');

            setTimeout(function () {
                $.mobile.changePage("#main-page", { transition: "slide", changeHash: true });
            }, 500);

        });

=======
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
>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9
    }
}

var ButtonColorViewModel = function (data) {

<<<<<<< HEAD
    var self = this;
    self.Color = ko.observable('');
    self.Id = ko.observable('');

    if (data) {
        self.Color(data.Color);
        self.Id(data.Id);

    }
=======


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
>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9

    }
}

<<<<<<< HEAD
var DesignViewModel = function () {

    var self = this;
    self.SelectedButton = ko.observable();
    self.buttons = ko.observableArray([]);
    self.Name = ko.observable('Button').extend({ required: true });
    self.Color = ko.observable('btn-blue');
    self.Price = ko.observable('').extend({ required: true });
    self.Id = ko.observable();
    self.ButtonSource = ko.observableArray([]);

    self.ButtonCaption = ko.computed(function () {
        return self.Name() + (self.Price() != '' ? " ($" + self.Price() + ")" : '');
    });


    self.reset = function () {
        self.Name('Button');
        self.Color('btn-blue');
        self.Price('');
        self.Id(null);
    }

    self.setColor = function (entity) {
        self.Id(entity.Id());
=======

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

>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9
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

<<<<<<< HEAD
    self.afterSave = function () {

        self.SelectedButton().Name(self.Name());
        self.SelectedButton().Price(self.Price());
        self.SelectedButton().ButtonClass(self.Color() + " ui-btn ui-btn-f ui-shadow ui-corner-all");
        self.SelectedButton().IsSale(true);
        self.reset();
        $.mobile.changePage("#main-page", { transition: "slide", changeHash: true });

    }


    self.SaveButton = function () {

        $.when(self.isModelValid()).then(function (result) {

            if (result) {

                _dbase.transaction(function (tx) {
=======

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

>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9

                    var sql = 'UPDATE ITEMS SET buttoncolorid=?,description=?,price=? where id=?;';
                    tx.executeSql(sql, [self.Color(), self.Name(), self.Price(), self.SelectedButton().Id()], self.afterSave, function () { });

                }, function (success) {



                }, function (error) {

<<<<<<< HEAD
                });


=======
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
>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9


            }

<<<<<<< HEAD
        });

=======
    }

    self.init();
>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9

    }



    self.populateButtons = function (tx) {

        tx.executeSql('SELECT * FROM BUTTONCOLORS', [],
            function (txt, results) {
                var len = results.rows.length;

                for (var i = 0; i < len; i++) {
                    self.buttons.push(new ButtonColorViewModel({ Id: results.rows.item(i).id, Color: results.rows.item(i).btnclass }));
                }

            },
            function () { alert(); });

<<<<<<< HEAD

    }


    self.init = function () {
        self.buttons([]);
        if (self.buttons().length == 0) {
            _dbase.transaction(self.populateButtons, function (error) {
            }, function (error) {
            });
        }

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
    self.Counter = ko.observable(0);
    self.ButtonCaption = ko.computed(function () {
        return self.Name() + (self.Price() != '' ? "<div> ($" + self.Price() + ") </div>" : '');
    })
    if (data) {
        self.Id(data.Id);
        self.Name(data.Name == null ? '' : data.Name);
        self.Price(data.Price == null ? '' : data.Price);
        self.IsSale(data.Price != null);
        self.ButtonClass((data.ButtonClass == null ? 'btn-blue' : data.ButtonClass) + " ui-btn ui-btn-f ui-shadow ui-corner-all");
        self.Counter(data.Quantity == null ? 0 : data.Quantity);
    }

}

var CartViewModel = function (data) {

    var self = this;
    self.Id = ko.observable(0);
    self.Price = ko.observable().extend({ required: { message: 'Price is required' } });
    self.Quantity = ko.observable().extend({ required: { message: 'Quantity is required' } });
    self.Name = ko.observable().extend({ required: { message: 'Name is required' } });
    self.IsExtra = ko.observable(false);
    self.Total = ko.computed(function () {
        return (parseFloat(self.Price()) * parseFloat(self.Quantity())).toFixed(2);
    });

    self.reset = function () {
        self.Id(0);
        self.Price('');
        self.Quantity('');
        self.Name('');
        self.IsExtra(false);
    }

    self.isModelValid = function () {
        var result = ko.validation.group(self, { deep: true, observable: false });
=======
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

>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9
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
<<<<<<< HEAD
        self.IsExtra(data.IsExtra != undefined);
=======
>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9
    }
}

var MainViewModel = function () {
    var self = this;
    self.salesButtons = ko.observableArray([]);
    self.cart = ko.observableArray([]);
    self._extraSale = ko.observable();
    self.showFirst = ko.observable(true);
    self.MoreCaption = ko.computed(function () {

<<<<<<< HEAD
        return self.showFirst() ? "Next" : "Previous";
    });
=======
var MainViewModel = function () {
    var self = this;
    self.salesButtons = ko.observableArray([]);
    self.cart = ko.observableArray([]);
    self._extraSale = ko.observable();
    self.showFirst = ko.observable(true);
    self.MoreCaption = ko.computed(function () {

        return self.showFirst() ? "Next" : "Previous";
    })
>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9

    self.next = function () {

        self.showFirst(!self.showFirst());
    }
    self.cartAmount = ko.computed(function () {

        if (self.cart().length == 0)
            return '$0.00';

        var total = 0.00;

        ko.utils.arrayForEach(self.cart(), function (item) {
            total += parseFloat(item.Total());
<<<<<<< HEAD
        });
=======
        })
>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9

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
<<<<<<< HEAD

        checkoutViewModel.cart(self.cart());
        checkoutViewModel.cartAmount(self.cartAmount());
        $.mobile.changePage("#checkout-page", { transition: "slide", changeHash: true });

    }

    self.addExtraToCart = function (trans, entity) {
        var sql = 'INSERT INTO CART (itemid,quantity,price,cartdate,isextra,description) VALUES (?,?,?,?,?,?);';
        trans.executeSql(sql, [entity.Id(), entity.Quantity(), entity.Price(), currentDate(), 1, entity.Name()]);
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
            _dbase.transaction(function (transation) {
                self.addExtraToCart(transation, self._extraSale());
            }, function (e) { }, function (s) {
                self._extraSale().Id(id);
                self.cart.push(new CartViewModel({
                    Id: self._extraSale().Id(),
                    Price: self._extraSale().Price(),
                    Name: self._extraSale().Name(),
                    Quantity: self._extraSale().Quantity(),
                    IsExtra: true
                }));
                self._extraSale().reset();
                $("#extrapopup").popup("close");
            });




        }



    }

    self.addorupdatecart = function (tx, entity) {

        var existingButton = ko.utils.arrayFirst(self.cart(), function (item) {
            return item.Id() == entity.Id();
        });

        if (existingButton == null) {
            var sql = 'INSERT INTO CART (itemid,quantity,price,cartdate,isextra) VALUES (?,?,?,?,?);';
            tx.executeSql(sql, [entity.Id(), 1, entity.Price(), currentDate(), 0]);

        } else {
            var existingQuantity = existingButton.Quantity() + 1;
            tx.executeSql('Update CART Set quantity =' + existingQuantity + ' Where itemid=' + entity.Id());

        }

    }


    self.addItem = function (entity) {

        if (entity.IsSale()) {

            var existingButton = ko.utils.arrayFirst(self.cart(), function (item) {
                return item.Id() == entity.Id();
            });
            _dbase.transaction(function (tx) {
                self.addorupdatecart(tx, entity);
            }, function (success) {
                alert();

            }, function (error) {
                if (existingButton != null) {
                    var existingQuantity = existingButton.Quantity() + 1;
                    entity.Counter(existingQuantity);
                    existingButton.Quantity(existingQuantity);

                } else {
                    entity.Counter(1);
                    self.cart.push(new CartViewModel({ Id: entity.Id(), Price: entity.Price(), Name: entity.Name(), Quantity: 1 }));

                }
            });
        }
        else {

            designViewModel.SelectedButton(entity);
            $.mobile.changePage("#design-page", { transition: "slide", changeHash: true });
        }
    }

    self.bindButtons = function (txt, sqlRecordset) {
        var buttons = [], cart = [];

        for (var k = 0; k < sqlRecordset.rows.length; k++) {
            var row = new ButtonViewModel({
                Id: sqlRecordset.rows.item(k).id,
                Price: sqlRecordset.rows.item(k).price,
                Name: sqlRecordset.rows.item(k).description,
                ButtonClass: sqlRecordset.rows.item(k).buttoncolorid,
                Quantity: sqlRecordset.rows.item(k).quantity == null ? 0 : sqlRecordset.rows.item(k).quantity

            });

            if (sqlRecordset.rows.item(k).quantity != null) {
                cart.push(new CartViewModel({
                    Id: sqlRecordset.rows.item(k).id,
                    Price: sqlRecordset.rows.item(k).price,
                    Name: sqlRecordset.rows.item(k).description,
                    Quantity: sqlRecordset.rows.item(k).quantity,
                    IsExtra: false
                }));

            }
=======

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


>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9

            buttons.push(row);
        }


        self.cart(cart);
        self.salesButtons(buttons);
        self._extraSale(new CartViewModel());
    }


<<<<<<< HEAD
    self.init = function () {

        _dbase.transaction(function (tx) {
            tx.executeSql('SELECT * FROM ITEMS i left join Cart c on c.itemid = i.id', [], self.bindButtons);
            tx.executeSql('SELECT * FROM Cart  where isextra = 1', [], function (trans, sqlRecordset) {

                for (var k = 0; k < sqlRecordset.rows.length; k++) {
                    self.cart.push(new CartViewModel({
                        Id: sqlRecordset.rows.item(k).id,
                        Price: sqlRecordset.rows.item(k).price,
                        Name: sqlRecordset.rows.item(k).description,
                        Quantity: sqlRecordset.rows.item(k).quantity,
                        IsExtra: true
                    }));
                }

            });
        });


    }

    self.pickSales = function (txt, sqlRecordset) {

        var sales = [], saleIds = [], tips = 0,range ='';
        if (sqlRecordset.rows.length > 0) {

            var fromDate = sqlRecordset.rows.item(0).sale_date,toDate = sqlRecordset.rows.item(sqlRecordset.rows.length - 1).sale_date;

=======

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
>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9

            range = fromDate.split(' ')[0] + ' - ' + toDate.split(' ')[0];


        
          

            for (var k = 0; k < sqlRecordset.rows.length; k++) {

                var id = parseInt(sqlRecordset.rows.item(k).id);

<<<<<<< HEAD
                if (saleIds.indexOf(id) === -1) {
                    saleIds.push(id);
                    tips += parseFloat(sqlRecordset.rows.item(k).tips || 0);
                }

                var row = new CartViewModel({
                    Id: sqlRecordset.rows.item(k).itemId,
                    Name: sqlRecordset.rows.item(k).description,
                    Price: sqlRecordset.rows.item(k).price,
                    Quantity: sqlRecordset.rows.item(k).quantity
                });

                sales.push(row);
            }
        }


        salesStatisticViewModel.totalSales(sales);
        salesStatisticViewModel.totalTips(tips);
        salesStatisticViewModel.Range(range);
      
        $.mobile.changePage("#sale-statistic-page", { transition: "slide", changeHash: true });
      


=======
>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9
    }

    self.salesstatistic = function () {

<<<<<<< HEAD
        _dbase = window.openDatabase("billing", "1.0", "Kasee Billing", 200000);
        _dbase.transaction(function (tx) {
            tx.executeSql('SELECT * FROM SALEDETAIL sd INNER JOIN SALE s on s.id = sd.sale_id order by sale_date ', [], self.pickSales, function (s) {

            }, function (e) {

            });
        }, function (a) {


        }, function (b) {

        });
    }
    self.init();

=======
        $.when(salesStatisticViewModel.init()).then(function () {
            $.mobile.changePage("#sale-statistic-page", { transition: "slide", changeHash: true });
        });

    }

    self.init();
>>>>>>> 2cb9b4b94a184f8f668546d016069ca3ac2020d9



}

var mainViewModel = new MainViewModel();
var designViewModel = new DesignViewModel();
var checkoutViewModel = new CheckOutViewModel();
var salesStatisticViewModel = new SalesStatisticViewModel();

ko.applyBindings(mainViewModel, document.getElementById("main-page"));
ko.applyBindings(designViewModel, document.getElementById("design-page"));
ko.applyBindings(checkoutViewModel, document.getElementById("checkout-page"));
ko.applyBindings(salesStatisticViewModel, document.getElementById("sale-statistic-page"));