//Battle class

//TEST BATTLE
var player1 = JSON.parse(JSON.stringify(examplePlayer1));
var player2 = JSON.parse(JSON.stringify(examplePlayer2));

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
    console.log(pokemon1.Name + ' used ' + pokemon1.Skills[0].skillName + '!');
    pokemon2.HP -= pokemon1.Skills[0].skillDMG;
    console.log(pokemon2.Name + ' took ' + pokemon1.Skills[0].skillDMG + ' dmg!');
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
