$(document).on('ready', function(){

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
	var trainNameHtml;
	var destinationHtml;
	var firstTrainTimeHtml;
	var frequencyHtml;
	var usersNextTrainTimeHtml;

	var config = {
		apiKey: "AIzaSyCiA70aYjLH8jy7eh-0DCg2vk5j5y8RnCU",
		authDomain: "zbirds-1st-project.firebaseapp.com",
		databaseURL: "https://zbirds-1st-project.firebaseio.com",
		storageBucket: "zbirds-1st-project.appspot.com",
		messagingSenderId: "642238249348"
	};

	firebase.initializeApp(config);

	$(document).on('click', '#submit', function(){

		trainName = $('#trainNameInput').val().trim();
		destination = $('#destinationInput').val().trim();
		frequency = $('#frequencyInput').val().trim();
		firstTrainTime = $('#firstTrainTimeInput').val().trim();
		firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");

		// currentTime = moment().format("dddd, MMMM Do YYYY, h:mm a");
		// diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
		// tRemainder = diffTime % frequency;
		// tMinutesTillTrain = frequency - tRemainder;
		// nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm a");

		firebase.database().ref().push({
			trainName: trainName,
			destination: destination,
			firstTrainTime: firstTrainTime,
			frequency: frequency,
			nTime: nextTrain
		});

		$('#trainNameInput').val('');
		$('#destinationInput').val('');
		$('#firstTrainTimeInput').val('');
		$('#frequencyInput').val('');
		$('#firstTrainTime').val('');
	})	

	firebase.database().ref().on('child_added', function(snap, childKey){
		
		currentTime = moment().format("dddd, MMMM Do YYYY, h:mm a");
		diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
		tRemainder = diffTime % frequency;
		tMinutesTillTrain = frequency - tRemainder;
		nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm a")

		trainNameHtml = '<tr><td>'+snap.val().trainName+'</td>'
		destinationHtml = '<td>'+snap.val().destination+'</td>'
		firstTrainTimeHtml = '<td>'+snap.val().firstTrainTime+'</td>'
		frequencyHtml = '<td>'+snap.val().frequency+'</td>'
		usersNextTrainTimeHtml = '<td>'+nextTrain+'</td>'
		// var usersMinutesUntilTrainHtml = '<td>'+snap.val().usersMinutesUntilTrain+'</td></tr>'

		$('tbody').append(
			trainNameHtml +
			destinationHtml+
			firstTrainTimeHtml+
			frequencyHtml+
			usersNextTrainTimeHtml
			// usersMinutesUntilTrainHtml
		);		
	})
})
  

