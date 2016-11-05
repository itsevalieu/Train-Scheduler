// Initialize Firebase
var config = {
	apiKey: "AIzaSyBhxif06eoJHgeax8HgyY6I1fR9n35aZn0",
	authDomain: "train-schedule-a62f8.firebaseapp.com",
	databaseURL: "https://train-schedule-a62f8.firebaseio.com",
	storageBucket: "train-schedule-a62f8.appspot.com",
	messagingSenderId: "633851121623"
};
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

//Initial Values
var train = "";
var destination = "";
var frequency;
var nextArrival;
var minutesAway;

//------------------------------------------------------------
// Whenever a user clicks the click button
$("#addTrain").on("click", function() {
	//store input values into variables
	train = $("#train-input").val().trim();
	destination = $("#destination-input").val().trim();
	frequency = $("#frequency-input").val().trim();
	nextArrival = $("#time-input").val();

	database.ref().set({
		train: train,
		destination: destination,
		frequency: frequency,
		nextArrival: nextArrival,
		//minutesAway: minutesAway 
	});
	
	// Return False to allow "enter"
	return false;
});

// At the initial load, get a snapshot of the current data.
database.ref().on("value", function(snapshot) {
	//Log to console new train information:
	console.log("New Train Info:");
	console.log(snapshot.val().train);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().frequency);
	console.log(snapshot.val().nextArrival);
	//Work on function-->console.log(snapshot.val().minutesAway);

	//Display to table
	 var tblRows = $('table').children().eq(1).children('tr').eq(0).children('td');
            tblRows.eq(0).html(snapshot.val().train);
            tblRows.eq(1).html(snapshot.val().destination);
            tblRows.eq(2).html(snapshot.val().frequency);
            tblRows.eq(3).html(snapshot.val().nextArrival);




// If any errors are experienced, log them to console.
}, function (errorObject) {
  	console.log("The read failed: " + errorObject.code);
});