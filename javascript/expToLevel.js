function expToLevel(exp) {

    // Store Resulting Level and Exp
    var result = {
        level: 1,
        exp: 0
    }

    // Starting Exp Counter
    var expCounter = 7;

    while (exp >= expCounter) {
        exp -= expCounter;
        expCounter = expCounter + 2;
        result.level++;
    }
    result.exp = exp;

    return result;
}