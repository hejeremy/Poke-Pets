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
    
    console.log(player["pokemon"] === null);
    console.log(player["pokemon"] === undefined);

    // Display player info
    var playerImage = $("<img>");
    playerImage.attr("src", player["profilePic"]);
    var playerName = $("<h1>");
    playerName.text("Hello, " + player["name"]);
    chooseStarter(playerName);

    // Append info
    $("#playerTemp").append(playerImage, playerName);
})

// If not, draw normal menu

function chooseStarter(name) {
    // Draw welcome text
    var text1 = $("<h2>Welcome to PokéPets, " + name + "</h2>"); 
    var text2 = $("<h2>To get started, choose your starter Pokemon!</h2>")
    $("#playerTemp").append("hfdsgsfdg");
}