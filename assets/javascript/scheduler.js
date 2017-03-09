

// Initialize Firebase
var config = {
apiKey: "AIzaSyCiA70aYjLH8jy7eh-0DCg2vk5j5y8RnCU",
authDomain: "zbirds-1st-project.firebaseapp.com",
databaseURL: "https://zbirds-1st-project.firebaseio.com",
storageBucket: "zbirds-1st-project.appspot.com",
messagingSenderId: "642238249348"
};

firebase.initializeApp(config);

var database = firebase.database
var trainName;
var destination;
var firstTrainTime;
var frequency;
var nextArrival;
var minutesAway;



$(document).on('click', '#submit', function(){
	trainName = $('#trainNameInput').val().trim();
	destination = $('#destinationInput').val().trim();
	frequency = $('#frequencyInput').val().trim();
	firstTrainTime = $('#firstTrainTimeInput').val().trim();
	console.log(trainName, destination, firstTrainTime, frequency);

	firebase.database().ref().push({
		trainName: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
		frequency: frequency
	});
	$('#trainNameInput').val('');
	$('#destinationInput').val('');
	$('#frequencyInput').val('');
	$('#firstTrainTime').val('');
})

firebase.database().ref().on('child_added', function(snap){

	$('table').append(
		'</tr><tr><td>'+snap.val().trainName+'</td>'+
		'<td>'+snap.val().destination+'</td>'+
		'<td>'+snap.val().frequency+'</td></tr>');

	snap.trainName;
	snap.destination;
	snap.firstTrainTime;
	snap.frequency;

	console.log(snap);
})
  

