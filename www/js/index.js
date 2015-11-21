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
    initialize: function() {
        this.bindEvents();
    },

    test: function(){
        alert("success!");
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {        
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
        app.createDatabase();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
         
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

    },


    createDatabase: function()
    {
        var db = window.openDatabase("billing", "1.0", "Kasee Billing", 200000);
        db.transaction(app.populateDB, app.errorCB, app.successCB);        

    },

    populateDB: function(tx) {
         //SALES
         /*tx.executeSql('DROP TABLE IF EXISTS SALES');
         tx.executeSql('DROP TABLE IF EXISTS CHECKOUT');
         tx.executeSql('DROP TABLE IF EXISTS BUTTONCOLORS');
         tx.executeSql('DROP TABLE IF EXISTS ITEMS');
         tx.executeSql('DROP TABLE IF EXISTS EXTRA');
         */

         tx.executeSql('CREATE TABLE IF NOT EXISTS SALES (id unique, itemid,date,ispaid,checkoutid,isextra)');
         //CHECKOUT
         
         tx.executeSql('CREATE TABLE IF NOT EXISTS CHECKOUT (id unique,date,amountpaid,tips)');
         //BUTTONCOLORS
         
         tx.executeSql('CREATE TABLE IF NOT EXISTS BUTTONCOLORS (id unique,color)');
         
         //ITEMS
         
         tx.executeSql('CREATE TABLE IF NOT EXISTS ITEMS (id unique,number,buttoncolorid,price,description)');
         //extra
         
         tx.executeSql('CREATE TABLE IF NOT EXISTS EXTRA (id unique,description,price,quantity,date)');
         //query result
         //tx.executeSql('SELECT * FROM ITEMS', [], app.querySuccess, app.errorCB);
         tx.executeSql('SELECT * FROM BUTTONCOLORS', [], app.querySuccess, app.errorCB);

    },

    querySuccess:function(tx, results) {
    var len = results.rows.length;
    //alert(len);
    if(len==0){    
         for (var i=1; i<=24; i++){
           tx.executeSql('INSERT INTO ITEMS (id, number) VALUES ('+i+', "'+i+'")');       
        }
        //insert colors
        var colors=["#3e80bd","#515151","#15ab16","#bf0f11","#d4d12a","#c7893c","#e66d04","#c42cf9"];
        for (var i=0; i<colors.length; i++){
            tx.executeSql('INSERT INTO BUTTONCOLORS (id, color) VALUES ('+(i+1)+', "'+colors[i]+'")');
        }

    }

    app.loadButtons(len,results);

},

    loadButtons: function(len,results)
    {
        console.log("ITEMS table: " + len + " rows found.");
        for (var i=0; i<len; i++){
            //alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).number);
            //alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).color);
        }
    },
    // Transaction error callback
    //
    errorCB: function(err) {
        alert("Error processing SQL: "+err.message);
    },

    // Transaction success callback
    //
    successCB: function() {
        //alert("success!");
    }


};



