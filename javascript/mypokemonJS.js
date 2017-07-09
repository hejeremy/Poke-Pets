$(document).ready(function() {
	var player = JSON.parse(JSON.stringify(examplePlayer1));

	for (var i = 0; i<player.Pokemon.length; i++) {
		var current = player.Pokemon[i];

		var pokemonDiv = $("<div>").addClass("pokemon").attr("id", current.Name);
		var container = $("<div>").addClass("col-xs-4 img-container");
		var img = $("<img>").addClass("pokemon-img").attr("src", current.ImgLink);
		var lvl = $("<div>").addClass("pokemon-lvl text-center").html("<h4>XP: " + current.EXP + "</h4>");
		var stats = $("<div>").addClass("pokemon-stats col-xs-8").html("<h6>?</h6><h4>" + current.Name + "</h4>");

		container.html(img).append(lvl);
		pokemonDiv.html($("<div>").addClass("row").append(container).append(stats));


		$("#my-pokemon").append(pokemonDiv);
	}
})