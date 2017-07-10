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


$("#button").click(function() {
    // Create instance of Facebook provider object
    var provider = new firebase.auth.FacebookAuthProvider();

    // Login
    firebase.auth().signInWithPopup(provider).then(function(data) {

        // Store info
        var user = data.additionalUserInfo.profile;
        var name = user.first_name;
        var id = user.id;
        var picture = user.picture.data.url;

        // If new user...
        database.ref("users/" + id).once("value", function(snapshot) {
            var exists = snapshot.val() !== null;
            if (!exists) {
                // Write to DB
                database.ref("users/" + id).set({
                    name: name,
                    profilePic: picture,
                    pokedollar: 0,
                    experience: 0,
                });
            }
            // Store id in localstorage
            localStorage.setItem("id", id);

            // Switch to Main Menu
            document.location.href = "main.html";
        });


        console.log(data);

    }).catch(function(error) {
        console.log(error);
    });
});

$(".btn-github").click(function() {
    console.log("you are here");
    document.location.href = "main.html";
});
