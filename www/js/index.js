/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', function () {
            
            _dbase = window.openDatabase("billing", "1.0", "Kasee Billing", 200000);
            _dbase.transaction(app.populateDB, app.errorCB, app.successCB);

        }, false);

    },
    populateDB: function (tx) {
       
        //tx.executeSql('DROP TABLE IF EXISTS BUTTONCOLORS'); 
       // tx.executeSql('DROP TABLE IF EXISTS SALE');
     // tx.executeSql('DROP TABLE IF EXISTS SALEDETAIL');
      
        tx.executeSql('CREATE TABLE IF NOT EXISTS SALE(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,sale_date DATETIME,amountpaid REAL,tips REAL)');
        //BUTTONCOLORS

        tx.executeSql('CREATE TABLE IF NOT EXISTS SALEDETAIL(sale_id INTEGER NOT NULL,itemid INTEGER NOT NULL ,quantity INTEGER NOT NULL,price real ,description NULL)');
        //CHECKOUT
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS CART (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,itemid INTEGER NOT NULL ,quantity INTEGER NOT NULL,price real ,cartdate,isextra INTEGER NOT NULL,description NULL)');
        //BUTTONCOLORS
    
       tx.executeSql('CREATE TABLE IF NOT EXISTS BUTTONCOLORS (id unique,color,btnclass)');
        //ITEMS

        tx.executeSql('CREATE TABLE IF NOT EXISTS ITEMS (id unique,number,buttoncolorid,price,description)');
        //extra

        tx.executeSql('CREATE TABLE IF NOT EXISTS EXTRA (id unique,description,price,quantity,date)');
        //query result
        //tx.executeSql('SELECT * FROM ITEMS', [], app.querySuccess, app.errorCB);
        tx.executeSql('SELECT * FROM BUTTONCOLORS', [], app.querySuccess, app.errorCB);


      
      

    },

    querySuccess: function (tx, results) {

       //alert(len);
        if (results.rows.length == 0) {



            for (var i = 1; i <= 24; i++) {
                tx.executeSql('INSERT INTO ITEMS (id, number) VALUES (' + i + ', "' + i + '")');
            }

            //insert colors
            var colors = ["#3e80bd", "#515151", "#15ab16", "#bf0f11", "#d4d12a", "#c7893c", "#e66d04", "#c42cf9"];

            var btnclass = ["btn-blue", "btn-grey", "btn-green", "btn-red", "btn-yellow", "btn-cream", "btn-orange", "btn-violet"];
            for (var j = 0; j < colors.length; j++) {

                var sql = 'INSERT INTO BUTTONCOLORS (id, color, btnclass) VALUES (' + (j + 1) + ', "' + colors[j] + '", "' + btnclass[j] + '")';
               
                tx.executeSql(sql);


            }





        }



    },

    // Transaction error callback
    //
    errorCB: function (err) {
        alert("Error processing SQL: " + err.message);
    },

    // Transaction success callback
    //
    successCB: function () {
       // alert("success!");
    }


};



