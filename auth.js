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


$(".btn-facebook").click(function() {
    // Create instance of Facebook provider object
    var provider = new firebase.auth.FacebookAuthProvider();

    // Login
    firebase.auth().signInWithPopup(provider).then(function(data) {
        var user = data.additionalUserInfo.profile;
        var name = user.first_name;
        var id = user.id;
        var picture = user.picture.data.url;

        database.ref("users/" + id).set({
            name: name,
            profilePic: picture
        });
        console.log(data);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
    }).catch(function(error) {
        console.log(error);
    }); 
});