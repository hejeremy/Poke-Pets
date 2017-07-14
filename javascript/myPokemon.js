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
	database.ref("users").once("value", function(snap) {
		currentPlayer = snap.val()[localStorage.getItem("id")];

		for (var i = 0; i<currentPlayer.pokemon.length; i++) {
			var current = currentPlayer.pokemon[i];
		   	var currentID;
		   	var currentDesc;

		   	var queryURL = "https://pokeapi.co/api/v2/pokemon-species/" + current.Name.toLowerCase() + "/";



		   $.ajax({
				url: queryURL,
				async: false,
				method: "GET"
			}).done(function(response) {
				currentID = response["id"];
				currentDesc = response["flavor_text_entries"][1]["flavor_text"];
				//creates column to hold name, description, etc
				var stats = $("<div>").addClass("pokemon-stats col-xs-8").html("<h6>no. " +  currentID + "</h6><h4>" + current.Name + "</h4>");
				//contents of column
				var desc = $("<div>").addClass("description").html(currentDesc);
				var abilitiesTable = createTable(current.Skills.skillName, current.Skills.skillDMG);
				var abilitiesPanel = createPanel("Abilities", abilitiesTable);
				
				//add contents into column
				var subRow2 = createRowDiv("stats-detail").html(desc).append(abilitiesPanel);
				stats.append(subRow2);

				//adds columns into main div
				pokemonDiv.html($("<div>").addClass("row").append(container).append(stats));
				$("#main-section").append(pokemonDiv);

			});
		}
	});

	function createStatsDiv(statName, value) {
		return $("<div>").addClass(statName).html(statName.toUpperCase()).append($("<div>").addClass("stat-value").html(value));
	}

	function createRowDiv(className) {
		return $("<div>").addClass("row " + className);
	}

	function createPanel(title, content) {
		var fullPanel = $("<div>").addClass("panel panel-default");
		fullPanel.html($("<div>").addClass("panel-heading").html(title));
		fullPanel.append($("<div>").addClass("panel-body").html(content));

		return fullPanel;
	}

	function createTable(elem1, elem2) {
		var table = $("<table>").addClass("table").html("<tbody><tr><td>" + elem1 + "</td><td>" + elem2 + "</td></tr></tbody>");
		return table;
	}

	$("#main").click(function() {
        document.location.href = "main.html";
    });
});