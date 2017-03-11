$(document).on('ready', function(){
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
	var firstTrainTimeConverted;
	var frequency;
	var nextTrainTime;
	var currentTime;  
	var diffTime;
	var tRemainder;
	var tMinutesTillTrain;
	var nextTrain;

	$(document).on('click', '#submit', function(){

		trainName = $('#trainNameInput').val().trim();
		destination = $('#destinationInput').val().trim();
		frequency = $('#frequencyInput').val().trim();
		firstTrainTime = $('#firstTrainTimeInput').val().trim();
		firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
		currentTime = moment().format("dddd, MMMM Do YYYY, h:mm a");
		diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
		tRemainder = diffTime % frequency;
		tMinutesTillTrain = frequency - tRemainder;
		nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm a");

		firebase.database().ref().push({
			trainName: trainName,
			destination: destination,
			firstTrainTime: firstTrainTime,
			frequency: frequency,
			usersCurrentTime: currentTime,
		});
		
		$('#trainNameInput').val('');
		$('#destinationInput').val('');
		$('#firstTrainTimeInput').val('');
		$('#frequencyInput').val('');
		$('#firstTrainTime').val('');
	})

	firebase.database().ref().on('child_added', function(snap){

		$('tbody').append(
			'<tr><td>'+snap.val().trainName+'</td>'+
			'<td>'+snap.val().destination+'</td>'+
			'<td>'+snap.val().firstTrainTime+'</td>'+
			'<td>'+snap.val().frequency+'</td>'+
			'<td>'+nextTrain+'</td>'+
			'<td>'+tMinutesTillTrain+'</td></tr>'
		);		
	})
})
  

