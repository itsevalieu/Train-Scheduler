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
var firstTrain; //military time


//Functions
function nextArrival(fstTrain, freq){	
	// First Time (pushed back 1 year to make sure it comes before current time)
		console.log("First Train: " + fstTrain);

		console.log("Frequency: " + freq);
		var firstTimeConverted = moment(fstTrain,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

	// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % freq;
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = freq - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
	return nextTrain;
}
function minutesAway(fstTrain, freq){
	// First Time (pushed back 1 year to make sure it comes before current time)
		console.log("First Train: " + fstTrain);

		console.log("Frequency: " + freq);
		var firstTimeConverted = moment(fstTrain,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

	// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % freq;
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = freq - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
	return tMinutesTillTrain;
}


//------------------------------------------------------------
// Whenever a user clicks the click button
$("#addTrain").on("click", function() {
	//store input values into variables
	train = $("#train-input").val().trim();
	destination = $("#destination-input").val().trim();
	frequency = $("#frequency-input").val().trim();
	firstTrain = $("#firstTrain-input").val().trim();

	database.ref().push({
		train: train,
		destination: destination,
		frequency: frequency,
		firstTrain: firstTrain,
		dateAdded: firebase.database.ServerValue.TIMESTAMP

	});
	
	train.val("");
	destination.val("");
	frequency.val("");
	firstTrain.val("");
	// Return False to allow "enter"
	return false;
});

// At the initial load, get a snapshot of the current data.
database.ref().on("child_added", function(childSnapshot){
	//Log to console new train information:
	console.log("New Train Info:");
	console.log(childSnapshot.val().train);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().frequency);
	console.log(childSnapshot.val().firstTrain);
	//Work on function-->console.log(childSnapshot.val().minutesAway);
	
	var childTrain = childSnapshot.val().train;
	var childDestination = childSnapshot.val().destination;
	var childFrequency = childSnapshot.val().frequency;
	var childFirstTrain = childSnapshot.val().firstTrain;
	
	var newRow= $("<tr>");
	
	var trainTD = $('<td class="col-sm-2">');
	var destTD = $('<td class="col-sm-2">');
	var freqTD = $('<td class="col-sm-2">');
	var nextArrivalTD = $('<td class="col-sm-2">');
	var minAwayTD = $('<td class="col-sm-2">');

	//Display to table
	trainTD.append(childTrain);
	destTD.append(childDestination);
	freqTD.append(childFrequency);
	nextArrivalTD.append(nextArrival(childFirstTrain, childFrequency)); //not displaying correctly
	console.log(nextArrival(childFirstTrain, childFrequency));
	minAwayTD.append(minutesAway(childFirstTrain, childFrequency)); //same times always? Why.

	newRow.append(trainTD);
	newRow.append(destTD);
	newRow.append(freqTD);
	newRow.append(nextArrivalTD);
	newRow.append(minAwayTD);

	$("tbody").append(newRow);

// If any errors are experienced, log them to console.
}, function (errorObject) {
  	console.log("The read failed: " + errorObject.code);
});
/* Assuming:

The first train of the day comes in at 3:00 AM.
The train runs every 17 minutes
The current time is 7:12 PM.
There have been no delays and will be no delays.
Question:

How many minutes away is the next train?
--------------------------------------------------
(firstTrainTime) - (currentTime)




*/