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


	function displayGifs(respObject) {
		// NEED TO DISPLAY RATINGS.
		$('#animals').empty();
		for (i=0; i < 10; i++) {
			var source = respObject.data[i].images.fixed_height_still.url;
			var srcAnimated = respObject.data[i].images.fixed_height.url;
			var srcStill = respObject.data[i].images.fixed_height_still.url;
			var gif = $("<img>").addClass("gif").attr("data-still", srcStill).attr("data-animate", srcAnimated).attr("data-state", "still").attr("src", source);
			console.log(gif);
			$('#animals').append(gif);
		}
	}; // function displayGifs()


	$('#addAnimal').on('click', function(event){
		event.preventDefault();

		addTopicButton();
	}); // on click addAnimal


	// on.click call api.
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
		}); // ajax call
	}); // on.click button.topic


	// on.click TOGGLES IMAGES BETWEEN 'animate' and 'still'.
	$(document).on('click', '.gif', function() {
		var state = $(this).attr("data-state");

		if (state === "still") {
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
		}
	}); // on.click .gif (toggle animation)
}); // document.ready()






















