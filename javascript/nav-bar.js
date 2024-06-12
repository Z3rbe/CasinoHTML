/*On récupère toutes les informations*/
let openBtn = document.getElementById("nav-open");
let closeBtn = document.getElementById("nav-close");
let navWrapper = document.getElementById("nav-wrapper");
let navLatteral = document.getElementById("nav-latteral");

/*Cas ou le barre de navigation est ouverte*/
const openNav = () => {
  navWrapper.classList.add("active");
  navLatteral.style.left = "0";
};

/*Cas ou la barre de navigation est fermmé*/
const closeNav = () => {
  navWrapper.classList.remove("active");
  navLatteral.style.left = "-100%";
};

/*On ajoute un événement au différent bouton*/
openBtn.addEventListener("click", openNav);
closeBtn.addEventListener("click", closeNav);
navWrapper.addEventListener("click", closeNav);
