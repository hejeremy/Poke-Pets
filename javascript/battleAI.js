var version = 17;
console.log('Version - ' + version);

// Link to database
var config = {
    apiKey: "AIzaSyCzrx1SkMDyNlE4X2gOadgtPf8asSAWh70",
    authDomain: "poke-pets.firebaseapp.com",
    databaseURL: "https://poke-pets.firebaseio.com",
    projectId: "poke-pets",
    storageBucket: "poke-pets.appspot.com",
    messagingSenderId: "416846931"
};
firebase.initializeApp(config);
var database = firebase.database();

$('#opponent').css('visibility', 'hidden');

var pokemonNames = [
    {name: 'Bulbasaur', image: 'images/bulbasaur_lg.png'},
    {name: 'Squirtle', image: 'images/squirtle_lg.png'},
    {name: 'Charmander', image: 'images/charmander_lg.png'}
];

//Battle class
var mainPlayer;

database.ref('users').once('value', function(snapshot) {
    mainPlayer = snapshot.val()[localStorage.getItem('id')];
    //console.log(snapshot);
    //console.log(mainPlayer);
    //console.log(mainPlayer.profilePic);
    startBattle();
});

$(document).on('click', '#clearYourself', function() {
    console.log('You have been cleared.');
    database.ref('users').child(localStorage.getItem('id')).remove();
    window.location.href = 'https://hejeremy.github.io/Poke-Pets/';
});

//$(document).on('click', '#startBattle', startBattle);

var opponent;

function generateOpponent() {
    var opponentName;
    var opponentImage;
    var opponentPokemon;
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            setOpponent(data.results[0].name.first, data.results[0].picture.large);
            renderImages();
        }
    });
}

function setOpponent(name, image) {
    var pokemon = pokemonNames[Math.floor(Math.random()*pokemonNames.length)];
    var skills = new Skill('Tackle', 5);
    var newPokemon = new Pokemon(pokemon.name, '#', '#', pokemon.image, 60, 0, skills);
    opponent = new Player(name, image, newPokemon);

    console.log(opponent);

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function startBattle() {
    generateOpponent();
    console.log(mainPlayer);
}

function renderImages() {
    //$('#startBattle').css('visibility', 'hidden');

    $('#playerName').html('<h2>' + mainPlayer.name + '</h2>');
    $('#playerImage').html('<img src=\'' + mainPlayer.profilePic + '\' alt=\'Your Image\'>');
    $('#playerPokemon').html('<img src=\'' + mainPlayer.pokemon[0].ImgLarge + '\' alt=\'Your Pokemon\'>');

    $('#opponentName').html('<h2>' + capitalizeFirstLetter(opponent.Name) + '</h2>');
    $('#opponentImage').html('<img src=\'' + opponent.Image + '\' alt=\'Opponent Image\'>');
    $('#opponentPokemon').html('<img src=\'' + opponent.Pokemon.ImgLarge + '\' alt=\'Opponent Pokemon\'>');
}


/*
//TEST BATTLE
//var player1 = JSON.parse(JSON.stringify(mainPlayer));
var player1 = JSON.parse(JSON.stringify(examplePlayer2));
var player2 = JSON.parse(JSON.stringify(examplePlayer3));

var attacker = player1;
var defender = player2;

var battle = true;
var round = 0;

//Battle
$(document).on('click', '#battle', function() {
if (battle) {
startBattle(attacker, defender);
} else {
console.log('Battle has ended.');
return;
}
});
//TEST BATTLE END

//Start round of battle
function startBattle(atk, def) {
var pokemon1 = atk.Pokemon[0];
var pokemon2 = def.Pokemon[0];
//console.log(pokemon1);
//console.log(pokemon2);
battleRound(pokemon1, pokemon2);

round++;
console.log('Round ' + round + ' ended.');

if (pokemon2.HP <= 0) {
endBattle();
battle = false;
return;
}

if (round % 2 === 0) {
attacker = player1;
defender = player2;
} else {
attacker = player2;
defender = player1;
}
}

function battleRound(pokemon1, pokemon2) {
console.log(pokemon1.Name + ' used ' + pokemon1.Skills.skillName + '!');
pokemon2.HP -= pokemon1.Skills.skillDMG;
console.log(pokemon2.Name + ' took ' + pokemon1.Skills.skillDMG + ' dmg!');
console.log(pokemon2.Name + ' has ' + pokemon2.HP + ' HP left.');
}

function useItem(player1, item) {
player1.Bag.item -= 1;
}

function endBattle() {
console.log(defender.Pokemon[0].Name + ' has fainted.');
console.log(attacker.Pokemon[0].Name + ' wins!');
round = 0;
}
*/
