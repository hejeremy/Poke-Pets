var version = 60;
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
    startBattle();
});

//Quick testing remove self for those without admin rights to the Firebase
$(document).on('click', '#clearYourself', function() {
    database.ref('users').child(localStorage.getItem('id')).remove();
    window.location.href = 'https://hejeremy.github.io/Poke-Pets/main.html';
});

// Return Button
$("#main").click(function() {
    document.location.href = "main.html";
});

var opponent;

//Generating opponent, also comtains main battle function
function generateOpponent() {
    var opponentName;
    var opponentImage;
    var opponentPokemon;
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
            setOpponent(data.results[0].name.first, data.results[0].picture.large);
            renderImages();
            mainBattle();
        }
    });
}

//Creates opponent using the random name API
function setOpponent(name, image) {
    var pokemon = pokemonNames[Math.floor(Math.random()*pokemonNames.length)];
    var skills = new Skill('Tackle', 5);
    var newPokemon = new Pokemon(pokemon.name, '#', '#', pokemon.image, 60, 0, skills);
    opponent = new Player(name, image, newPokemon);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function startBattle() {
    generateOpponent();
}

function renderImages() {
    $('#playerName').html(mainPlayer.name);
    $('#playerImage').html('<img src=\'' + mainPlayer.profilePic + '\' alt=\'Your Image\'>');
    $('#player-pokemon-col').append('<img class=\'pokemonImage\' src=\'' + mainPlayer.pokemon[0].ImgLarge + '\' alt=\'Your Pokemon\'>');

    $('#opponentName').html(capitalizeFirstLetter(opponent.Name));
    $('#opponentImage').html('<img src=\'' + opponent.Image + '\' alt=\'Opponent Image\'>');
    $('#opponent-pokemon-col').append('<img class=\'pokemonImage\' src=\'' + opponent.Pokemon.ImgLarge + '\' alt=\'Opponent Pokemon\'>');
}

//Everything for battling happens in here
function mainBattle() {
    var pokemon1 = JSON.parse(JSON.stringify(mainPlayer.pokemon[0]));
    var pokemon2 = JSON.parse(JSON.stringify(opponent.Pokemon));
    var attacker = pokemon1;
    var defender = pokemon2;

    var attackerWho = capitalizeFirstLetter(mainPlayer.name);
    var defenderWho = capitalizeFirstLetter(opponent.Name);

    var eventWhich;
    var win;

    var potions = 1;
    var expReward = 0;
    var moneyReward = 0;

    $('.itemButton').text('Potions \(' + potions + '\)');

    $('#nextButton').text('Next');
    $('#nextButton').css('visibility', 'hidden');

    $(document).on('click', '#nextButton', nextEvent);
    $(document).on('click', '.attackButton', function() {
        $('#nextButton').css('visibility', 'visible');
        $('.attackButton').css('visibility', 'hidden');
        $('.itemButton').css('visibility', 'hidden');
        eventWhich = 'event1';
        nextEvent();
    });
    $(document).on('click', '.itemButton', function() {
        $('#nextButton').css('visibility', 'visible');
        $('.attackButton').css('visibility', 'hidden');
        $('.itemButton').css('visibility', 'hidden');
        eventWhich = 'potion1';
        nextEvent();
    });

    nextRound();

    //EVERYTHING AFTER THIS IS ONLY CALLED IN mainBattle()
    function nextEvent() {
        switch(eventWhich) {
            case 'event1':
                event1();
                break;
            case 'event2':
                event2();
                break;
            case 'potion1':
                potion1();
                break;
            case 'potion2':
                potion2();
                break;
            case 'endRound':
                endRound();
                break;
            case 'endBattle':
                endBattle();
                break;
            case 'rewards':
                rewards();
                break;
            case 'mainMenu':
                mainMenu();
                break;
            case 'nextRound':
                nextRound();
                break;
            default:
                break;
        }
    }

    //Attack choice 1st text
    function event1() {
        $('#battleText').text(attacker.Name + '\(' + attackerWho + '\) used ' + attacker.Skills.skillName + '.');
        eventWhich = 'event2';
    }

    //Attack choice 2nd text
    function event2() {
        if(Math.random() > .2) {
            $('#battleText').text(defender.Name + '\(' + defenderWho + '\) takes ' + attacker.Skills.skillDMG + ' damage!');
            defender.HP -= attacker.Skills.skillDMG;
            if (defender.HP <= 0) {
                defender.HP = 0;
            }
        } else {
            $('#battleText').text('It missed!');
        }
        refreshHP();
        eventWhich = 'endRound';
    }

    //Potion choice 1st text
    function potion1() {
        if (potions > 0) {
            $('#battleText').text(attackerWho + ' used a potion.');
            eventWhich = 'potion2';
            potions--;
        } else {
            $('#battleText').text('You have no potions left!');
            eventWhich = 'nextRound';
        }
    }

    //Potion choice 2nd text
    function potion2() {
        $('#battleText').text(attacker.Name + '\(' + attackerWho + '\) regained some HP.');
        if (attacker.HP + 20 > 60) {
            attacker.HP = 60;
        } else {
            attacker.HP += 20;
        }
        refreshHP();
        eventWhich = 'endRound';
    }

    //Refreshes HP display
    function refreshHP() {
        $('#playerHPBar').html(hpBar(pokemon1.HP));
        $('#opponentHPBar').html(hpBar(pokemon2.HP));
    }

    // Make Pokemon HP Bar
    function hpBar(input) {
        var hpBar = $("<div class='hpBar'>");
        var hpProgress = $("<div class='hpProgress'>");
        var percentage = 100*input/60;
        var hpProgressText = $("<h1 id='hpProgressText'>" + input + '/60' + "</h1>");

        hpProgress.css('background', 'linear-gradient(' + getColorForPercentage(percentage/100) + ', rgb\(255, 255, 255\)\)');

        hpProgress.css("width", percentage + "%");

        hpBar.append(hpProgressText);
        hpBar.append(hpProgress);
        return hpBar;
    }

    //Switches attacker/defender
    function endRound() {
        if (defender.HP <= 0) {
            eventWhich = 'endBattle';
            faintedText(defender.Name);
            return;
        }

        if (attacker == pokemon1) {
            attacker = pokemon2;
            defender = pokemon1;
            attackerWho = capitalizeFirstLetter(opponent.Name);
            defenderWho = capitalizeFirstLetter(mainPlayer.name);
            eventWhich = 'event1';
        } else {
            attacker = pokemon1;
            defender = pokemon2;
            attackerWho = capitalizeFirstLetter(mainPlayer.name);
            defenderWho = capitalizeFirstLetter(opponent.Name);
            eventWhich = 'nextRound';
        }
        nextEvent();
    }

    //Starts new round after trading hits
    function nextRound() {
        refreshHP();
        eventWhich = 'event1';
        $('#battleText').text('What will ' + pokemon1.Name + ' do?');
        $('#nextButton').css('visibility', 'hidden');
        $('.itemButton').text('Potions \(' + potions + '\)');
        $('.attackButton').css('visibility', 'visible');
        $('.itemButton').css('visibility', 'visible');
    }

    function faintedText(input) {
        $('#battleText').text(input + '\(' + defenderWho + '\) has fainted.');
    }

    function endBattle() {
        if (attacker == pokemon1) {
            $('#battleText').text(attacker.Name + '\(' + attackerWho + '\) won!');
            win = true;
        } else {
            $('#battleText').text(defender.Name + '\(' + defenderWho + '\) lost!');
            win = false;
        }
        eventWhich = 'rewards';
    }

    //Player must get to this point in order to recieve rewards from the battle
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
        eventWhich = 'mainMenu';
        $('#nextButton').text('Return');
    }

    function mainMenu() {
        document.location.href = 'main.html';
    }
}

var percentColors = [
    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } }
];

var getColorForPercentage = function(pct) {
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    // or output as hex if preferred
}
