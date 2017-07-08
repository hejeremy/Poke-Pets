
//Variable to save store items and pricing
var store = {
    potion: 10,
    superPotion: 20,
}

//To generate table row with the item from the shop
function createItemRow(key) {
    var newRow = $('<tr>');
    newRow.append('<td>' + key + '</td>');
    newRow.append('<td>' + store.key + '</td>');
    newRow.append('<td><button class=\'btn btn-default buyThis\' value=\'' + store.key + '\'>BUY</button></td>');
}

//On click to buy, calls shop function
$(document).on('click', '.buyThis', function() {
    var item = $(this).val();
    shop(player1, item);
});

//Makes a call against player money, then either buys the item + subtracts playerMoney + adds item to player bag
function shop(player1, item) {
    var cost = number * store[item];
    if (player1.playerMoney > store[item]) {
        player1.playerMoney -= store[item];
        player1.playerBag[item] += 1;
    } else {
        console.log('Not enough money.');
    }
}
