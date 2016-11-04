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
	console.log("New Train Info:");
	console.log(snapshot.val().train);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().frequency);
	console.log(snapshot.val().nextArrival);
	//console.log(snapshot.val().minutesAway);

// If any errors are experienced, log them to console.
}, function (errorObject) {
  	console.log("The read failed: " + errorObject.code);
});


//log to console vars
	console.log("Train: " + train);
	console.log("Destination: " + destination);
	console.log("Frequency: " + frequency);
	console.log("Next Arrival: " + nextArrival);