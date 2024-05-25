class Player{
    constructor(email, username, firstname, lastname, birthdate, phonenumber, adress, password, token){
        this.email = email;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.phonenumber = phonenumber;
        this.adress = adress;
        this.password = password;
        this.token = token;
    }

    get emailPlayer(){return this.email;}
    get usernamePlayer(){return this.username;}
    get firstnamePlayer(){return this.firstname;}
    get lastnamePlayer(){return this.lastname;}
    get birthdatePlayer(){return this.birthdate;}
    get phonenumberPlayer(){return this.phonenumber;}
    get adressPlayer(){return this.adress;}
    get passwordPlayer(){return this.password;}
    get tokenPlayer(){return this.token;}

    set emailPlayer(email){this.email = email;}
    set usernamePlayer(username){this.username = username;}
    set firstnamePlayer(firstname){this.firstname = firstname;}
    set lastnamePlayer(lastname){this.lastname = lastname;}
    set birthdatePlayer(birthdate){this.birthdate = birthdate;}
    set phonenumberPlayer(phonenumber){this.phonenumber = phonenumber}
    set adressPlayer(adress){this.adress = adress;}
    set passwordPlayer(password){this.password = password;}
    set tokenPlayer(token){this.token = token;}

    addToken(token){this.token += token;}
    removeToken(token){this.token -= token;}

    displayPlayer(){
        /*On modifie le nom*/
        document.getElementById('user-text').textContent = this.username;

        /*On affiche les token*/
        var tokenP = document.createElement('p');
        tokenP.textContent = "Wallet: " + this.token;
        document.getElementById('user-icone').appendChild(tokenP);
        document.getElementById('user-icone').style.height = '80px';
    }
}

var players = [];
let currentPlayer = null;

function loadUsers(){
    fetch('../json/players.json')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                let player = new Player(user.email, user.username, user.firstname, user.lastname, user.birthdate, user.phonenumber, user.adress, user.password, user.token);
                players.push(player);
            })
        })
        .catch(error => console.error('Error loading users:', error));
}

function isNewUser(username, password){
    loadUsers();

    /*On parcours l'API*/
    for(let item of players){
        if(item.username === username && item.password === password) return false;
    }
    return true; 
}

function logPlayer(player){
    currentPlayer = player;
    currentPlayer.displayPlayer();
}

function logIn(){
    /*ON récupère les identifiants de connexion*/
    let username = document.getElementById('username');
    let password = document.getElementById('password');

    /*On vérifie si les identifiants de connexion corresponde à un utilisateur*/
    if(!isNewUser(username.value, password.value)){
        for(let item of players){
            if(item.username === username.value && item.password === password.value){
                var player = new Player(item.email, item.username, item.firstname, item.lastname, item.birthdate, item.phonenumber, item.adress, item.password, item.token);
                logPlayer(player);
                break;
            }    
        }
    }
    else{
        alert("Username ou Password incorrect");
    }
}

function signIn(){
    /*On récupère les éléments*/
    let email = document.getElementById('email');
    let username = document.getElementById('username');
    let firstname = document.getElementById('firstname');
    let lastname = document.getElementById('lastname');
    let birthdate = document.getElementById('birthdate');
    let phonenumber = document.getElementById('phonenumber');
    let adress = document.getElementById('adress');
    let password = document.getElementById('password');
    let confirmpassword = document.getElementById('confirmpassword');

    /*On vérifie si les mot de passe corresponde et si tous les champs sont rempli*/
    if(password.value != confirmpassword.value){
        alert("Vous devez rentrer le même mot de passe.");
    } 
    else if(email.value === "" || username.value === "" || firstname.value === "" || lastname.value === "" || birthdate.value === "" || phonenumber.value === "" || adress.value === "" || password.value === "" || confirmpassword.value === ""){
        alert("Vous devez remplir tous les champs");
    }
    else{
        if(isNewUser(username, password)){
            var newPlayer = new Player(email.value, username.value, firstname.value, lastname.value, birthdate.value, phonenumber.value, adress.value, password.value, 0);
            players.push(newPlayer);

            /*On le log*/
            logPlayer(newPlayer);
        }
    }
}