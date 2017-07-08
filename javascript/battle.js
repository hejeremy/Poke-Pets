
//Resolve round of battle
function battle(pokemon1, attack, pokemon2) {
    battleRound (pokemon1, attack, pokemon2);
    if (pokemon2.HP < 0) {
        endBattle(pokemon2);
    } else {
        return;
    }
}

function battleRound(pokemon1, attack, pokemon2) {
    pokemon2.HP -= pokemon1.move[attack].skillDMG;
}

function useItem(player1, item) {
    player1.playerBag.item -= 1;
}

function endBattle(pokemon2) {
    console.log(pokemon2.pokemonName + ' has fainted.');
}
