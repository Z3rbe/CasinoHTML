var token = 100;

function updateTokenAdd(mise){
    token += mise;
    printToken();
}

function updateTokenSup(mise){
    token -= mise;
    printToken();
}

function checkToken(mise){
    return mise <= token;
}