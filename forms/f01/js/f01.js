document.addEventListener("DOMContentLoaded", () => {

    console.log("F01 chargé");

});

const champs = [

"province",
"ville",
"commune",
"quartier",
"entreprise",
"adresse",

"rccm",
"idnat",
"nif",
"cnss",

"telephone",
"email",

"activite",

"nature",

"creation",

"employeur",

"responsable"

];

champs.forEach(id=>{

const champ=document.getElementById(id);

if(!champ) return;

champ.addEventListener("change",()=>{

console.log(id+" enregistré");

});

});

function valeur(id){

return parseInt(document.getElementById(id).value)||0;

}

function calculEffectifs(){

let natH=valeur("nat_h");
let natF=valeur("nat_f");

let expH=valeur("exp_h");
let expF=valeur("exp_f");

let natTotal=natH+natF;
let expTotal=expH+expF;

let hommes=natH+expH;
let femmes=natF+expF;

let total=natTotal+expTotal;

document.getElementById("nat_total").value=natTotal;

document.getElementById("exp_total").value=expTotal;

document.getElementById("hommes_total").value=hommes;

document.getElementById("femmes_total").value=femmes;

document.getElementById("grand_total").value=total;

}

[
"nat_h",
"nat_f",
"exp_h",
"exp_f"

].forEach(id=>{

document.getElementById(id).addEventListener(

"input",

calculEffectifs

);

});

calculEffectifs();

function calculHeures(){

const debut=document.getElementById("heure_debut").value;

const fin=document.getElementById("heure_fin").value;

if(!debut || !fin){

document.getElementById("heures_semaine").value="";

return;

}

const d=new Date("2000-01-01 "+debut);

const f=new Date("2000-01-01 "+fin);

let heures=(f-d)/1000/60/60;

if(heures<0){

heures+=24;

}

document.getElementById("heures_semaine").value=heures*6;

}

document

.getElementById("heure_debut")

.addEventListener(

"input",

calculHeures

);

document

.getElementById("heure_fin")

.addEventListener(

"input",

calculHeures

);
