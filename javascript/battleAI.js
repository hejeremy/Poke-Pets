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

//Battle class
var mainPlayer;
console.log(localStorage.getItem('id'));
database.ref('users/' + localStorage.getItem('id')).once('value', function(snapshot) {
    mainPlayer = snapshot.val();
    console.log(snapshot);
});

console.log(mainPlayer);

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
