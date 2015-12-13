var _dbase;

var DbHandler = function () {

    var self = this;
    self.colors = ["btn-blue", "btn-grey", "btn-green", "btn-red", "btn-yellow", "btn-cream", "btn-orange", "btn-violet"];

    self.executeSql = function (transaction, statement, params) {
        if (params == undefined)
            transaction.executeSql(statement);
        else
            transaction.executeSql(statement, params);
    }

    self.update = function (statement, params, callback, fallback) {
        _dbase.transaction(function (trans) {
            self.executeSql(trans, statement, params);
        }, callback, fallback);
    }

    self.delete = function (statement, callback, fallback) {
        _dbase.transaction(function (trans) {
            self.executeSql(trans, statement);
        }, callback, fallback);
    }

    self.insert = function (statement, callback, fallback) {
        _dbase.transaction(function (trans) {
            self.executeSql(trans, statement);
        }, callback, fallback);
    }

    self.select = function (statement, callback, fallback) {
        _dbase.transaction(function (trans) {
            self.executeSql(trans, statement);
        }, callback, fallback);

    }


    self.init = function() {
        _dbase = window.openDatabase("billing", "1.0", "Kasee Billing", 200000);
    }

    self.init();

}

var sqlHelper = new DbHandler();