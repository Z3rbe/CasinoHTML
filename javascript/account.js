class Player{
    constructor(email, username, firstname, lastname, birthdate, phonenumber, adress, password){
        this.email = email;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.phonenumber = phonenumber;
        this.adress = adress;
        this.password = password;
        this.token = 0;
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
}

function logIn(){
    let username = document.getElementById('username');
    let password = document.getElementById('password');
}

function signIn(){
    let email = document.getElementById('email');
    let username = document.getElementById('username');
    let firstname = document.getElementById('firstname');
    let lastname = document.getElementById('lastname');
    let birthdate = document.getElementById('birthdate');
    let phonenumber = document.getElementById('phonenumber');
    let adress = document.getElementById('adress');
    let password = document.getElementById('password');
    let confirmpassword = document.getElementById('confirmpassword');


}

function isNewUser(username, password){
    /*On récupère de l'API*/
    
}