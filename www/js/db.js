function getButtons()
{
	var db = window.openDatabase("billing", "1.0", "Kasee Billing", 200000);
    db.transaction(app.populateDB, app.errorCB, app.successCB);
    tx.executeSql('SELECT * FROM BUTTONCOLORS', [], listButtons, errorCB);

    
}

var listButtons=function(tx, results) {
    var len = results.rows.length;
    console.log("ITEMS table: " + len + " rows found.");
        for (var i=0; i<len; i++){
            //alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).number);
            //alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).color);
        }

}

    // Transaction error callback
    //
var  errorCB = function(err) {
        alert("Error processing SQL: "+err.message);
    }
