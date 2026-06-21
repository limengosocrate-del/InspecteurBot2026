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
