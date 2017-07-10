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

// Check if first-time user...
database.ref("users").once("value", function(snapshot) {
    // Get correct user data
    var player = snapshot.val()[localStorage.getItem("id")];
    
    // Display player info
    var playerImage = $("<img>");
    playerImage.attr("src", player["profilePic"]);
    var playerName = $("<h1>");
    playerName.text("Hello, " + player["name"]);

    // Append info
    $("#playerTemp").append(playerImage, playerName);
})

// If not, draw normal menu