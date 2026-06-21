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

// Impression

document

.getElementById("btnImprimer")

.addEventListener(

"click",

()=>{

window.print();

}

);

// Réinitialisation

document

.getElementById("btnReset")

.addEventListener(

"click",

()=>{

if(confirm("Réinitialiser le formulaire ?")){

location.reload();

}

});

// Sauvegarde locale

document

.getElementById("btnEnregistrer")

.addEventListener(

"click",

()=>{

const donnees={};

document

.querySelectorAll("input,select,textarea")

.forEach(el=>{

donnees[el.id]=el.value;

});

localStorage.setItem(

"F01",

JSON.stringify(donnees)

);

alert("Formulaire enregistré.");

});

// Chargement automatique

window.addEventListener(

"load",

()=>{

const data=localStorage.getItem("F01");

if(!data) return;

const obj=JSON.parse(data);

Object.keys(obj).forEach(id=>{

const champ=document.getElementById(id);

if(champ){

champ.value=obj[id];

}

});

calculEffectifs();

calculHeures();

});

// Génération PDF (temporaire)

document
.getElementById("btnPDF")
.addEventListener("click", genererPDF);

"click",

()=>{

alert(

"La génération PDF sera connectée dans la prochaine partie."

);

});

async function genererPDF() {

const { jsPDF } = window.jspdf;

const pdf = new jsPDF({

orientation: "portrait",
unit: "mm",
format: "a4"

});

pdf.setFont("helvetica","bold");
pdf.setFontSize(16);

pdf.text("F01 - Fiche d'inspection",105,15,{align:"center"});

pdf.setFontSize(11);
pdf.setFont("helvetica","normal");

let y=30;

function ligne(libelle,id){

const champ=document.getElementById(id);

const valeur=champ ? champ.value : "";

pdf.text(libelle+" : "+valeur,20,y);

y+=7;

}

ligne("Entreprise","entreprise");
ligne("Adresse","adresse");
ligne("Inspecteur","inspecteur");
ligne("Date","date_visite");

y+=5;

pdf.setFont("helvetica","bold");
pdf.text("Effectifs",20,y);

y+=8;

pdf.setFont("helvetica","normal");

ligne("Nationaux H","nat_h");
ligne("Nationaux F","nat_f");
ligne("Expatriés H","exp_h");
ligne("Expatriés F","exp_f");
ligne("Total","grand_total");

y+=5;

pdf.setFont("helvetica","bold");
pdf.text("Organisation du travail",20,y);

y+=8;

pdf.setFont("helvetica","normal");

ligne("Début","heure_debut");
ligne("Fin","heure_fin");
ligne("Heures/semaine","heures_semaine");
ligne("Repos","repos");

y+=5;

pdf.setFont("helvetica","bold");
pdf.text("Observations",20,y);

y+=8;

pdf.setFont("helvetica","normal");

const obs=document.getElementById("observations").value;

const lignes=pdf.splitTextToSize(obs,170);

pdf.text(lignes,20,y);

y+=10;

pdf.setFont("helvetica","bold");

pdf.text("Analyse intelligente",20,y);

y+=8;

pdf.setFont("helvetica","normal");

pdf.text(
"Niveau de risque : "
+document.getElementById("niveauRisque").value,
20,
y
);

y+=8;

pdf.text(
"Décision : "
+document.getElementById("decisionInspection").value,
20,
y
);

y+=8;

const conclusion=pdf.splitTextToSize(
document.getElementById("conclusionIA").value,
170
);

pdf.text(conclusion,20,y);

pdf.save("F01_Inspection.pdf");

 }

pdf.setDrawColor(0);

pdf.rect(10,10,190,277);

pdf.setFont("helvetica","bold");
pdf.setFontSize(15);

pdf.text("MINISTÈRE DU TRAVAIL",105,18,{align:"center"});

pdf.setFontSize(11);

pdf.text("Direction de l'Inspection du Travail",105,25,{align:"center"});

pdf.setFontSize(14);

pdf.text("FORMULAIRE F01",105,35,{align:"center"});

pdf.setFont("helvetica","normal");

pdf.setFontSize(10);

pdf.setFont("helvetica","bold");

pdf.text("Effectifs",20,y);

y+=6;

pdf.rect(15,y,180,34);

pdf.setFont("helvetica","normal");

pdf.text("Nationaux H : "+document.getElementById("nat_h").value,20,y+8);

pdf.text("Nationaux F : "+document.getElementById("nat_f").value,105,y+8);

pdf.text("Expatriés H : "+document.getElementById("exp_h").value,20,y+18);

pdf.text("Expatriés F : "+document.getElementById("exp_f").value,105,y+18);

pdf.setFont("helvetica","bold");

pdf.text("Total : "+document.getElementById("grand_total").value,20,y+30);

y+=45;

pdf.setFont("helvetica","bold");

pdf.text("Organisation du travail",20,y);

y+=6;

pdf.rect(15,y,180,28);

pdf.setFont("helvetica","normal");

pdf.text("Début : "+document.getElementById("heure_debut").value,20,y+8);

pdf.text("Fin : "+document.getElementById("heure_fin").value,105,y+8);

pdf.text("Repos : "+document.getElementById("repos").value,20,y+18);

pdf.text("Heures/Semaine : "+document.getElementById("heures_semaine").value,105,y+18);

y+=40;

pdf.setFont("helvetica","bold");

pdf.text("Observations",20,y);

y+=5;

pdf.rect(15,y,180,55);

pdf.setFont("helvetica","normal");

const texte=pdf.splitTextToSize(

document.getElementById("observations").value,

170

);

pdf.text(texte,20,y+8);

y+=70;

pdf.line(25,y,85,y);

pdf.line(125,y,185,y);

pdf.text("Inspecteur",40,y+7);

pdf.text("Entreprise",140,y+7);

function genererRapport(){
    
rapport+="Numéro : "
+document.getElementById("numeroInspection").value
+"\n";

rapport+="Date : "
+document.getElementById("dateHeure").value
+"\n";

rapport+="Statut : "
+document.getElementById("statutInspection").value
+"\n\n";
    
const entreprise=document.getElementById("entreprise").value;

const inspecteur=document.getElementById("inspecteur").value;

const date=document.getElementById("date_visite").value;

const total=document.getElementById("grand_total").value;

const observations=document.getElementById("observations").value;

let rapport="";

rapport+="==============================\n";

rapport+="RAPPORT D'INSPECTION F01\n";

rapport+="==============================\n\n";

rapport+="Entreprise : "+entreprise+"\n";

rapport+="Inspecteur : "+inspecteur+"\n";

rapport+="Date : "+date+"\n\n";

rapport+="Effectif total : "+total+"\n\n";

rapport+="Observations\n";

rapport+="-----------------------------\n";

rapport+=observations+"\n\n";

rapport+="Conclusion\n";

rapport+="-----------------------------\n";

rapport+="L'inspection a été réalisée conformément aux dispositions du Code du Travail.\n";

rapport+="Le présent rapport est généré automatiquement par InspecteurBot IA.\n";

document.getElementById("rapport").value=rapport;

}

document
    
const liste=analyserInspection();

rapport+="\n";

rapport+="Infractions détectées\n";

rapport+="-------------------------\n";

if(liste.length===0){

rapport+="Aucune anomalie détectée.\n";

}else{

liste.forEach((item,i)=>{

rapport+=

(i+1)

+". "

+item.anomalie

+"\n";

rapport+="Article : "

+item.article

+"\n";

rapport+="Mesure : "

+item.mesure

+"\n\n";

});

}

rapport+="\n";

rapport+="Analyse intelligente\n";

rapport+="-------------------------\n";

rapport+="Niveau de risque : ";

rapport+=document.getElementById("niveauRisque").value;

rapport+="\n";

rapport+="Décision : ";

rapport+=document.getElementById("decisionInspection").value;

rapport+="\n\n";

rapport+="Conclusion\n";

rapport+="-------------------------\n";

rapport+=document.getElementById("conclusionIA").value;

rapport+="\n";

genererConclusionIA();

genererRapport();
    
.getElementById("btnRapport")

.addEventListener(

"click",

genererRapport

);

// Génère un numéro unique

function genererNumeroInspection(){

const maintenant=new Date();

const annee=maintenant.getFullYear();

let compteur=localStorage.getItem("compteurF01");

if(!compteur){

compteur=1;

}else{

compteur=parseInt(compteur)+1;

}

localStorage.setItem("compteurF01",compteur);

const numero="F01-"+annee+"-"+String(compteur).padStart(6,"0");

document.getElementById("numeroInspection").value=numero;

}

// Date et heure

function remplirDateHeure(){

const maintenant=new Date();

document.getElementById("dateHeure").value=

maintenant.toLocaleString();

}

document

.getElementById("btnEnregistrer")

.addEventListener(

"click",

()=>{

// Sauvegarde...

verifierConformite();

afficherInfractions();

genererRapport();
    
genererRapport();

});

function verifierConformite(){

let observations=document

.getElementById("observations")

.value

.trim();

let total=parseInt(

document.getElementById("grand_total").value

)||0;

let statut="Conforme";

if(observations.length>20){

statut="À améliorer";

}

if(total===0){

statut="Non conforme";

}

document.getElementById("statutInspection").value=statut;

}

window.addEventListener("load",()=>{

genererNumeroInspection();

remplirDateHeure();

verifierConformite();

});

function analyserInspection(){

let liste=[];

const total=parseInt(
document.getElementById("grand_total").value
)||0;

const heures=parseFloat(
document.getElementById("heures_semaine").value
)||0;

const observations=document
.getElementById("observations")
.value
.toLowerCase();

if(total===0){

liste.push({
article:"Article 1",
anomalie:"Aucun travailleur déclaré.",
mesure:"Vérifier immédiatement les effectifs."
});

}

if(heures>40){

liste.push({
article:"Durée du travail",
anomalie:"Durée hebdomadaire supérieure à 40 heures.",
mesure:"Mettre les horaires en conformité."
});

}

if(observations.includes("absence")){

liste.push({
article:"Registre du personnel",
anomalie:"Absence de document obligatoire.",
mesure:"Présenter le registre lors du contrôle."
});

}

if(observations.includes("sécurité")){

liste.push({
article:"Santé et sécurité",
anomalie:"Mesures de sécurité insuffisantes.",
mesure:"Mettre en place les équipements requis."
});

}

return liste;

}

function afficherInfractions(){

const liste=analyserInspection();

let texte="";

if(liste.length===0){

texte="Aucune anomalie détectée.";

}else{

liste.forEach((item,index)=>{

texte+=

(index+1)+". "

+item.anomalie

+"\n";

texte+="Article : "

+item.article

+"\n";

texte+="Mesure : "

+item.mesure

+"\n\n";

});

}

document

.getElementById("infractions")

.value=texte;

}

function genererConclusionIA(){

const anomalies=analyserInspection();

let risque="Faible";

let decision="Conforme";

let conclusion="";

if(anomalies.length>=1){

risque="Moyen";

decision="Mise en demeure";

}

if(anomalies.length>=3){

risque="Élevé";

decision="Procès-verbal";

}

if(anomalies.length===0){

conclusion=
"Aucune anomalie majeure n'a été constatée. L'entreprise respecte les principales obligations vérifiées.";

}else{

conclusion=
"L'inspection a permis de constater "
+anomalies.length+
" anomalie(s). Des mesures correctives doivent être mises en œuvre dans les délais prescrits.";

}

document.getElementById("niveauRisque").value=risque;

document.getElementById("decisionInspection").value=decision;

document.getElementById("conclusionIA").value=conclusion;

    }



