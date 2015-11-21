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
         
         tx.executeSql('CREATE TABLE IF NOT EXISTS SALES (id unique, tableid,date,ispaid,checkoutid)');
         //CHECKOUT
        
         tx.executeSql('CREATE TABLE IF NOT EXISTS CHECKOUT (id unique,date,amountpaid,tips)');
         //BUTTONCOLORS
         
         tx.executeSql('CREATE TABLE IF NOT EXISTS BUTTONCOLORS (id unique,color)');
         //BUTTONS
         
         tx.executeSql('CREATE TABLE IF NOT EXISTS BUTTONS (id unique,colorid,description,price)');
         //ITEMS
        
         tx.executeSql('CREATE TABLE IF NOT EXISTS ITEMS (id unique,number,buttonid)');
         //extra
         
         tx.executeSql('CREATE TABLE IF NOT EXISTS EXTRA (id unique,price,quantity,date)');
         //INSERT DEFAULT DATA
         /*
         tx.executeSql('INSERT INTO ITEMS (id, number) VALUES (1, "1")');
         tx.executeSql('INSERT INTO ITEMS (id, number) VALUES (2, "2")');
         tx.executeSql('INSERT INTO ITEMS (id, number) VALUES (3, "3")');
         tx.executeSql('INSERT INTO ITEMS (id, number) VALUES (4, "4")');
         tx.executeSql('INSERT INTO ITEMS (id, number) VALUES (5, "5")');
         tx.executeSql('INSERT INTO ITEMS (id, number) VALUES (6, "6")');
         tx.executeSql('INSERT INTO ITEMS (id, number) VALUES (7, "7")');
         tx.executeSql('INSERT INTO ITEMS (id, number) VALUES (8, "8")');
         tx.executeSql('INSERT INTO ITEMS (id, number) VALUES (9, "9")');
         tx.executeSql('INSERT INTO ITEMS (id, number) VALUES (10, "10")');
         tx.executeSql('INSERT INTO ITEMS (id, number) VALUES (11, "11")');
         tx.executeSql('INSERT INTO ITEMS (id, number) VALUES (12, "12")');*/

         //query result
         tx.executeSql('SELECT * FROM ITEMS', [], app.querySuccess, app.errorCB);


    },

    querySuccess:function(tx, results) {
    var len = results.rows.length;
    if(len==0){    
         for (var i=1; i<=24; i++){
         tx.executeSql('INSERT INTO ITEMS (id, number) VALUES ('+i+', "'+i+'")');       
        }
    }
    app.loadButtons(len,results);

},

    loadButtons: function(len,results)
    {
        console.log("ITEMS table: " + len + " rows found.");
        for (var i=0; i<len; i++){
            //alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).number);
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



