// Initialize Firebase
var config = {
    apiKey: "AIzaSyCzrx1SkMDyNlE4X2gOadgtPf8asSAWh70",
    authDomain: "poke-pets.firebaseapp.com",
    databaseURL: "https://poke-pets.firebaseio.com",
    projectId: "poke-pets",
    storageBucket: "poke-pets.appspot.com",
    messagingSenderId: "416846931"
};

firebase.initializeApp(config);
// Link to database
var database = firebase.database();
var currentPlayer;

$(document).ready(function() {
	// var player = JSON.parse(JSON.stringify(examplePlayer1));  //example player
	console.log(localStorage.getItem("id"));
	database.ref("users").once("value", function(snap) {
		console.log(snap.val());
		currentPlayer = snap.val()[localStorage.getItem("id")];

		console.log(currentPlayer);


		for (var i = 0; i<currentPlayer.pokemon.length; i++) {
			var current = currentPlayer.pokemon[i];
		   	var currentID;
		   	var currentDesc;

		   	var queryURL = "https://pokeapi.co/api/v2/pokemon-species/" + current.Name.toLowerCase() + "/";

		   $.ajax({
				url: queryURL,
				method: "GET"
			}).done(function(response) {
				currentID = response["id"];
				currentDesc = response["id"]["flavor_text_entries"][0]["flavor_text"];
				console.log(response);
				console.log("ID: " +currentID);
				console.log("Desc: " + currentDesc);

				var pokemonDiv = $("<div>").addClass("pokemon").attr("id", current.Name);
				var container = $("<div>").addClass("col-xs-4 img-container");
				var img = $("<img>").addClass("pokemon-img").attr("src", current.ImgLarge);
				var lvl = $("<div>").addClass("pokemon-lvl text-center").html("<h4>XP: " + current.EXP + "</h4>");
				var stats = $("<div>").addClass("pokemon-stats col-xs-8").html("<h6>no. " + currentID + "</h6><h4>" + current.Name + "</h4>");
			
				container.html(img).append(lvl);
				pokemonDiv.html($("<div>").addClass("row").append(container).append(stats));
				$("#my-pokemon").append(pokemonDiv);

			});
		}
	});


});