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

database.ref("users").once("value", function(snapshot) {
    // Get correct user data from localstorage
    var player = snapshot.val()[localStorage.getItem("id")];

    console.log(player["pokemon"] === undefined);

    // Display player info
    chooseStarter(player["name"]);
})

// If not, draw normal menu

function chooseStarter(name) {
    // Draw welcome text
    var text1 = $("<h2>Welcome to PokéPets, " + name + "</h2>"); 
    var text2 = $("<h2>To get started, choose your starter Pokemon!</h2>")
    $("#content").append(text1, text2);

    // Make 3 Pokemon Divs
    var pokemon1 = $("<div id='pokemon1'></div>");
    pokemon1.addClass("col-md-4");
    var pokemon2 = $("<div id='pokemon2'></div>");
    pokemon2.addClass("col-md-4");
    var pokemon3 = $("<div id='pokemon3'></div>");
    pokemon3.addClass("col-md-4");

    // Add Pokemon Names
    pokemon1.append("Bulbasaur");
    pokemon2.append("Charmander");
    pokemon3.append("Squirtle");

    // Add Pokemon Images
    pokemon1.append("<img src='images/bulbasaur_lg.png' class='starterImage'>");
    pokemon2.append("<img src='images/charmander_lg.png' class='starterImage'>");
    pokemon3.append("<img src='images/squirtle_lg.png' class='starterImage'>");

    // Append Pokemon Divs
    $("#content").append(pokemon1, pokemon2, pokemon3);
}