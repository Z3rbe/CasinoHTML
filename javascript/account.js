/*Définition de la Class*/
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

    addToken(token){
        this.token += token;
        this.displayPlayer();
    }
    removeToken(token){
        this.token -= token;
        this.displayPlayer();
    }
    checkToken(mise){return mise <= this.token;}

    displayPlayer(){
        /*On modifie le nom*/
        document.getElementById('user-text').textContent = this.username;
        document.getElementById('user-wallet').textContent = "Wallet: " + this.token + " $";

        document.getElementById('user-icone').style.height = '80px';
    }
}

var currentPlayer = null;

/*Fonction pour charger les utilisateur depuis le fichier JSON*/
async function loadUsers(url) {
    try {
        const players = [];
        const response = await fetch(url);
        const users = await response.json();
        users.forEach(user => {
            let player = new Player(user.email, user.username, user.firstname, user.lastname, user.birthdate, user.phonenumber, user.adress, user.password, user.token);
            players.push(player);
        });
        return players;
    } catch (error) {
        console.error('Error loading users:', error);
        throw error;
    }
}

/*On détermine si il s'agit d'un nouvel utilisateur*/
function isNewUser(username, password, players){
    /*On parcours l'API*/
    for(let item of players){
        if(item.username == username && item.password == password) return false;
    }
    return true; 
}

/*On connecte le compte sélectionné*/
function logPlayer(player){
    currentPlayer = player;
    currentPlayer.displayPlayer();
}

/*L'utilisateur rentre les identifiant d'un compte sur la page LogIn*/
async function logIn() {
    // On récupère l'API
    let players;
    try {
        players = await loadUsers('../json/players.json');
    } catch (error) {
        console.error('Error loading players:', error);
        return; // Arrête l'exécution si les joueurs ne peuvent pas être chargés
    }

    // On récupère les identifiants de connexion
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // On vérifie si les identifiants de connexion correspondent à un utilisateur
    if (!isNewUser(username, password, players)) {
        for (let item of players) {
            if (item.username === username && item.password === password) {
                logPlayer(item);
                break;
            }    
        }
    } else {
        alert("Username ou Password incorrect");
    }
}

/*L'utilisateur crée un nouveau comtpe*/
async function signIn(){
    // On récupère l'API
    let players;
    try {
        players = await loadUsers('../json/players.json');
    } catch (error) {
        console.error('Error loading players:', error);
        return; // Arrête l'exécution si les joueurs ne peuvent pas être chargés
    }

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
        if(isNewUser(username, password, players)){
            var newPlayer = new Player(email.value, username.value, firstname.value, lastname.value, birthdate.value, phonenumber.value, adress.value, password.value, 0);
            players.push(newPlayer);

            /*On le log*/
            logPlayer(newPlayer);
        }
    }
}

/*On sauvergarde les information de l'utilisateur connecté dans la session*/
function saveCurrent() {
    if (currentPlayer) {
        let data = {
            "username": currentPlayer.username,
            "password": currentPlayer.password,
            "email": currentPlayer.email,
            "firstname": currentPlayer.firstname,
            "lastname": currentPlayer.lastname,
            "birthdate": currentPlayer.birthdate,
            "phonenumber": currentPlayer.phonenumber,
            "adress": currentPlayer.adress,
            "password": currentPlayer.password,
            "token": currentPlayer.token
        };
        sessionStorage.setItem('userData', JSON.stringify(data));
    }
}

/*On charge les informations de l'utilisateur connecté depuis la session*/
async function loadCurrent() {
    try {
        const players = await loadUsers('../json/players.json');
        let jsonData = sessionStorage.getItem('userData');

        if (jsonData) {
            let data = JSON.parse(jsonData);
            for (let item of players) {
                if (item.username === data['username'] && item.password === data['password']) {
                    logPlayer(new Player(data['email'], data['username'], data['firstname'], data['lastname'], data['birthdate'], data['phonenumber'], data['adress'], data['password'], data['token']));
                    break;
                }
            }
        }
    } catch (error) {
        console.error('Error during loadCurrent:', error);
    }
}

/*On rempli le porte feuille*/
function feedWallet(){
    currentPlayer.addToken(parseInt(document.getElementById('depot-amount').value));
}

window.addEventListener('load', loadCurrent);
window.addEventListener('beforeunload', saveCurrent);