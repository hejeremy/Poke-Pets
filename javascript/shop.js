
//Variable to save store items and pricing
var store = {
    'Potion': 10,
    'SuperPotion': 20,
    'MegaPotion': 30,
}

//To generate table row with the item from the shop
function createItemRow(key) {
    var newTBody = $('<tbody>');
    var newRow = $('<tr>');
    newRow.append('<td>' + key + '</td>');
    newRow.append('<td>$' + store[key] + '</td>');
    newRow.append('<td><button class=\'btn btn-default buyThis\' value=\'' + key + '\'>BUY</button></td>');
    newTBody.html(newRow);
    $('#shopTable').append(newTBody);
}

for (var key in store) {
    if (store.hasOwnProperty(key)) {
        createItemRow(key);
    }
}

//On click to buy, calls shop function
$(document).on('click', '.buyThis', function() {
    var item = $(this).val();
    //console.log(item);
    shop(examplePlayer1, item);
});

//Makes a call against player money, then either buys the item + subtracts playerMoney + adds item to player bag
function shop(player1, item) {
    var cost = store[item];
    if (player1.Money >= store[item]) {
        if (!player1.Bag.hasOwnProperty(item)) {
            player1.Bag[item] = 0;
        }
        player1.Money -= store[item];
        player1.Bag[item] += 1;
    } else {
        console.log('Not enough money.');
        return;
    }
    console.log(player1.Money);
    console.log(player1.Bag);
}
