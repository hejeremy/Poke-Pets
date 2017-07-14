var pokemonName = "charmander";
var queryURL = "https://pokeapi.co/api/v2/pokemon-species/" + pokemonName + "/";

$(document).ready(function() {
   $.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
	});

});
     