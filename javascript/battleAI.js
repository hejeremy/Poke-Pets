var version = 38;
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
    window.location.href = 'https://hejeremy.github.io/Poke-Pets/main.html';
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
            mainBattle();
        }
    });
}

function setOpponent(name, image) {
    var pokemon = pokemonNames[Math.floor(Math.random()*pokemonNames.length)];
    var skills = new Skill('Tackle', 5);
    var newPokemon = new Pokemon(pokemon.name, '#', '#', pokemon.image, 27, 0, skills);
    opponent = new Player(name, image, newPokemon);

    //console.log(opponent);

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function startBattle() {
    generateOpponent();
    //console.log(mainPlayer);
}

function renderImages() {
    $('#playerName').html('<h2>' + mainPlayer.name + '</h2>');
    $('#playerImage').html('<img src=\'' + mainPlayer.profilePic + '\' alt=\'Your Image\'>');
    $('#playerPokemon').prepend('<img class=\'pokemonImage\' src=\'' + mainPlayer.pokemon[0].ImgLarge + '\' alt=\'Your Pokemon\'>');

    $('#opponentName').html('<h2>' + capitalizeFirstLetter(opponent.Name) + '</h2>');
    $('#opponentImage').html('<img src=\'' + opponent.Image + '\' alt=\'Opponent Image\'>');
    $('#opponentPokemon').append('<img class=\'pokemonImage\' src=\'' + opponent.Pokemon.ImgLarge + '\' alt=\'Opponent Pokemon\'>');
}

//Everything for battling happens in here
function mainBattle() {
    var pokemon1 = JSON.parse(JSON.stringify(mainPlayer.pokemon[0]));
    var pokemon2 = JSON.parse(JSON.stringify(opponent.Pokemon));
    var attacker = pokemon1;
    var defender = pokemon2;
    var attackerWho = 'Your '
        var defenderWho = 'Foe\'s '
        //var playerTurn = true;
        console.log(pokemon1);
    console.log(pokemon2);

    var eventNumber = 0;
    var win;

    var expReward = 0;
    var moneyReward = 0;


    //$('#battleBox').append('<button class=\'btn btn-default\' id=\nextButton\'>Next</button>');
    $('#nextButton').text('Next');
    $('#nextButton').css('visibility', 'hidden');
    $(document).on('click', '#nextButton', nextEvent);
    $(document).on('click', '.attackButton', function() {
        $('#nextButton').css('visibility', 'visible');
        $('.attackButton').css('visibility', 'hidden');
        nextEvent();
    });

    nextRound();

    //EVERYTHING AFTER THIS IS ONLY CALLED IN mainBattle()

    //Battle event handler, not scalar right now but it works and I don't want to risk something going wrong last second.
    function nextEvent() {
        eventNumber++;
        switch(eventNumber) {
            case 1:
                event1();
                break;
            case 2:
                event2();
                break;
            case 3:
                endRound();
                break;
            case 4:
                endBattle();
                break;
            case 5:
                rewards();
                break;
            case 6:
                mainMenu();
                break;
            default:
                console.log('Nothing interesting happens.');
                break;
        }
    }

    function event1() {
        $('#battleText').html(attackerWho + attacker.Name + ' used ' + attacker.Skills.skillName + '.');
    }

    function event2() {
        if(Math.random() > .2) {
            $('#battleText').html(defenderWho + defender.Name + ' takes ' + attacker.Skills.skillDMG + ' damage!');
            //console.log('Defender HP: ' + defender.HP);
            //console.log('Attacker DMG: ' + attacker.Skills.skillDMG);
            defender.HP -= attacker.Skills.skillDMG;
            if (defender.HP <= 0) {
                console.log('Defender HP reached 0.');
                defender.HP = 0;
            }
        } else {
            $('#battleText').html('It missed!');
        }
        refreshHP();
    }

    function refreshHP() {
        $('#playerHPNum').text(pokemon1.HP + '/60');
        $('#opponentHPNum').text(pokemon2.HP + '/50');
        $('#playerHPBar').html(hpBar(pokemon1.HP));
        $('#opponentHPBar').html(hpBar(pokemon2.HP));

    }

    function hpBar(input) {
        // Make Pokemon HP Bar
        var hpBar = $("<div class='hpBar'>");
        var hpProgress = $("<div class='hpProgress'>");
        var percentage = 100*input/60;

        if (percentage <= 25) {
            hpProgress.css('background', 'red');
        } else if (percentage > 25 && percentage <= 50) {
            hpProgress.css('background', 'yellow');
        } else {
            hpProgress.css('background', 'green');
        }

        hpProgress.css("width", percentage + "%");
        hpBar.append(hpProgress);
        return hpBar;
    }

    function endRound() {
        if (defender.HP <= 0) {
            //eventNumber = 3;
            faintedText(defender.Name);
            return;
        }

        if (attacker == pokemon1) {
            attacker = pokemon2;
            defender = pokemon1;
            attackerWho = 'Foe\'s '
                defenderWho = 'Your '
                eventNumber = 0;
                nextEvent();
        } else {
            attacker = pokemon1;
            defender = pokemon2;
            attackerWho = 'Your '
                defenderWho = 'Foe\'s '
                nextRound();
        }
    }

    function nextRound() {
        refreshHP();
        eventNumber = 0;
        $('#battleText').text('What will ' + pokemon1.Name + ' do?');
        $('#nextButton').css('visibility', 'hidden');
        $('.attackButton').css('visibility', 'visible');
    }

    function faintedText(input) {
        $('#battleText').text(defenderWho + input + ' has fainted.');
    }

    function endBattle() {
        if (attacker == pokemon1) {
            $('#battleText').text(mainPlayer.name + ' wins!');
            win = true;
        } else {
            $('#battleText').text(mainPlayer.name + ' lost!');
            win = false;
        }
    }

    function rewards() {
        if (win) {
            expReward = 5 + Math.ceil(5*Math.random());
            moneyReward = 50 + Math.ceil(50*Math.random());
            $('#battleText').text(mainPlayer.name + ' gets ' + expReward + ' EXP and $' + moneyReward + ' for winning.');
        } else {
            $('#battleTExt').text(mainPlayer.name + ' gets nothing for losing.');
        }
        database.ref('users').child(localStorage.getItem('id')).update({
            experience: mainPlayer.experience += expReward,
            pokedollar: mainPlayer.pokedollar += moneyReward,
        });
        $('#nextButton').text('Return');
    }

    function mainMenu() {
        document.location.href = 'main.html';
        //document.history.back();
    }
}
