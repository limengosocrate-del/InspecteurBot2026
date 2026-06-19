/* =====================================================
   INSPECTEURBOT-IA
   Créé par Inspecteur Limengo (P. Miller) © 2026
===================================================== */

// ==========================
// Message de bienvenue
// ==========================

const bienvenue = [
"Bienvenue sur InspecteurBot-IA.",
"Heureux de vous revoir.",
"Bonne journée Inspecteur.",
"Votre travail protège les travailleurs.",
"Ensemble pour une inspection moderne."
];

alert(
bienvenue[Math.floor(Math.random()*bienvenue.length)]
);

// ==========================
// Messages de motivation
// ==========================

const motivations = [

"La justice commence par une bonne inspection.",

"Chaque contrôle protège des vies.",

"L'intégrité est votre plus grande force.",

"Votre profession fait respecter la loi.",

"Continuez à servir avec honnêteté."

];

// ==========================
// Blagues
// ==========================

const blagues = [

"Pourquoi l'inspecteur sourit ? Parce que tout est conforme ! 😄",

"Le patron dit : tout est parfait. L'inspecteur répond : voyons cela... 😄",

"Une inspection réussie est une inspection bien préparée."

];

// ==========================
// Fonction Motivation
// ==========================

function motivation(){

const m =
motivations[Math.floor(Math.random()*motivations.length)];

alert("💡 Motivation\n\n"+m);

}

// ==========================
// Fonction Blague
// ==========================

function blague(){

const b =
blagues[Math.floor(Math.random()*blagues.length)];

alert("😂 Blague\n\n"+b);

}

// ==========================
// Heure actuelle
// ==========================

function afficherHeure(){

const maintenant = new Date();

console.log(maintenant.toLocaleString());

}

setInterval(afficherHeure,1000);

// ==========================
// Notifications
// ==========================

function notification(message){

if("Notification" in window){

Notification.requestPermission().then(function(permission){

if(permission==="granted"){

new Notification(message);

}

});

}

}

// ==========================
// Mode sombre
// ==========================

function changerTheme(){

document.body.classList.toggle("dark-mode");

localStorage.setItem(

"theme",

document.body.classList.contains("dark-mode")

);

}

window.onload=function(){

if(localStorage.getItem("theme")==="true"){

document.body.classList.add("dark-mode");

}

}

// ==========================
// Salutation automatique
// ==========================

const heure = new Date().getHours();

let salutation="";

if(heure<12){

salutation="☀️ Bonjour";

}

else if(heure<18){

salutation="🌞 Bon après-midi";

}

else{

salutation="🌙 Bonsoir";

}

console.log(salutation);

// ==========================
// Citation quotidienne
// ==========================

const citations=[

"Le travail est une richesse lorsqu'il est protégé.",

"Respecter la loi protège tout le monde.",

"Chaque inspection est une mission de confiance.",

"La discipline est la clé du succès.",

"La sécurité au travail est un droit."

];

function citationJour(){

return citations[Math.floor(Math.random()*citations.length)];

}

console.log(citationJour());

// ==========================
// Initialisation
// ==========================

console.log("InspecteurBot-IA démarré avec succès.");
