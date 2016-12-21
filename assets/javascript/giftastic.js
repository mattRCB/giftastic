$(document).ready(function() {
	console.log("Its alive");
	var giphyBaseURL = "http://api.giphy.com/v1/gifs/search";
	var giphyKey = "dc6zaTOxFJmzC";
	var params = {};
	var topics = ['dog', 'cat', 'owl', 'turtle', 'rhino', 'hippo', 'elephant', 'lemur', 'giraffe', 'penguin', 'panda', 'ostrich', 'lemur', 'grasshopper', 'koala', 'emu', 'donkey', 'horse', 'alpaca', 'rabbit', 'hamster', 'skunk', 'bonobo', 'chimpanzee', 'gorilla', 'monkey', 'orangatan','falcon', 'eagle', 'goldfish', 'crow', 'raven'];

	params['api_key'] = giphyKey;


	displayTopicButtons();
	// DISPLAY THE TOPIC BUTTONS ON SCREEN USING CURRENT CONTENTS OF topics ARRAY.
	function displayTopicButtons() {
		$('#animalButtons').empty();
		for (var i=0; i < topics.length; i++) {
			var buttonNew = $('<button>').addClass('topic').text(topics[i]);
			$('#animal-input').val("").blur(); // empties the text field.
			$('#animalButtons').append(buttonNew);
		}
	};


	function addTopicButton() {
		if (($('#animal-input').val().trim()) != "") {
			topics.push($('#animal-input').val().trim());
			console.log(topics);
			$('#animalButtons').animate({scrollLeft: ($('#animalButtons').width() + 1000) }, 800);
		}

		displayTopicButtons();
	}; // function addTopicButton


	function displayGifs(respObject) {
		// NEED TO DISPLAY RATINGS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		$('#animals').empty();
		for (i=0; i < 10; i++) {
			var source = respObject.data[i].images.fixed_height_still.url;
			var srcAnimated = respObject.data[i].images.fixed_height.url;
			var srcStill = respObject.data[i].images.fixed_height_still.url;
			var gifHolder = $('<div>').addClass("gifHolder").html("<h3>Rating: " + respObject.data[i].rating + "</h3>");
			var gif = $("<img>").addClass("gif").attr("data-still", srcStill).attr("data-animate", srcAnimated).attr("data-state", "still").attr("src", source);
			gifHolder.append(gif);
			$('#animals').append(gifHolder);
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
	

	// buttons for horizontally scrolling the topic buttons
	$(document).on('click', '#scrollLeft', function() {
		$('#animalButtons').animate( {scrollLeft: '+=250'} );
		console.log('scroll left');
	});
	$(document).on('click', '#scrollRight', function() {
		$('#animalButtons').animate( {scrollLeft: '-=250'} );
		console.log('scroll left');
	});

}); // document.ready()