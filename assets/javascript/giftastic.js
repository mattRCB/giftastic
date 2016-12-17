$(document).ready(function() {
	console.log("Its alive");
	var giphyBaseURL = "http://api.giphy.com/v1/gifs/search";
	var giphyKey = "dc6zaTOxFJmzC";
	var params = {};
	var topics = ['dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish', 'bird', 'turtle'];

	params['api_key'] = giphyKey;


	displayTopicButtons();
	// DISPLAY THE TOPIC BUTTONS ON SCREEN USING CURRENT CONTENTS OF topics ARRAY.
	function displayTopicButtons() {
		$('#animalButtons').empty();
		for (var i=0; i < topics.length; i++) {
			var buttonNew = $('<button>').addClass('topic').text(topics[i]);
			$('#animalButtons').append(buttonNew);
		}
	};


	function addTopicButton() {
		console.log("Add topic button: ");
		topics.push($('#animal-input').val().trim());
		console.log(topics);

		displayTopicButtons();
	}; // function addTopicButton


	$('#addAnimal').on('click', function(event){
		event.preventDefault();

		addTopicButton();
	}); // on click addAnimal


	$(document).on('click', 'button.topic', function() {
		var queryURL = giphyBaseURL;
		params['q'] = $(this).text();
		queryURL += '?' + $.param(params);

		$.ajax({
		  url: queryURL,
		  method: 'GET'
		}).done(function(response) {
		  console.log(response);
		  displayGifs(response);
		});

	}); // on.click button.topic


	function displayGifs(respObject) {
		console.log("so display the gifs, dude.")
		console.log("Is this the img src url? " + respObject.data[0].images.fixed_height.url);
		var source = respObject.data[0].images.fixed_height.url;
		var gif = $("<img>").attr("src", source);
		console.log(gif);
		$('#animals').append(gif);
	}; // function displayGifs()

}); // document.ready()