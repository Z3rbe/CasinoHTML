var token = 100;

window.onload = function(){
    printToken();
};

function printToken(){
    document.getElementById("token-user").innerText = "Token : " + token +" €";
}

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