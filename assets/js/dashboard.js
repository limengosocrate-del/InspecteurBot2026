// ======================================
// INSPECTEURBOT IA RDC
// Dashboard JavaScript
// Développé par Inspecteur Limengo (Pmiller)
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================
    // UTILISATEUR CONNECTÉ
    // ==========================

    const email = localStorage.getItem("inspecteur_email");

    const user = document.getElementById("user");

    if(user && email){

        user.textContent = email;

    }

    // ==========================
    // HORLOGE
    // ==========================

    function updateClock(){

        const now = new Date();

        const heure = now.toLocaleTimeString("fr-FR");

        const date = now.toLocaleDateString("fr-FR");

        const clock = document.getElementById("clock");

        if(clock){

            clock.innerHTML = heure + "<br><small>" + date + "</small>";

        }

    }

    updateClock();

    setInterval(updateClock,1000);


    
        // ==========================
    // NOTIFICATION
    // ==========================

    function notification(message){

        const notif = document.getElementById("notification");

        if(!notif) return;

        notif.textContent = message;

        notif.style.display = "block";

        setTimeout(function(){

            notif.style.display = "none";

        },3000);

    }

    notification("Bienvenue sur InspecteurBot IA RDC");

    // ==========================
    // RÉPONSE IA
    // ==========================

    window.repondreIA = function(){

        const question = document.getElementById("question");

        const resultat = document.getElementById("resultat");

        if(!question || !resultat) return;

        const texte = question.value.trim();

        if(texte === ""){

            resultat.innerHTML = "<p>Veuillez saisir une question.</p>";

            return;

        }

        resultat.innerHTML = `
            <div class="message ia">
                <strong>InspecteurBot IA :</strong><br><br>
                Vous avez demandé : <b>${texte}</b><br><br>
                Cette fonctionnalité sera reliée au moteur IA dans la prochaine étape.
            </div>
        `;

    };


        // ==========================
    // DÉCONNEXION
    // ==========================

    window.logout = function(){

        if(confirm("Voulez-vous vraiment vous déconnecter ?")){

            localStorage.removeItem("inspecteur_email");

            window.location.href = "index.html";

        }

    };

    // ==========================
    // ÉVÉNEMENTS
    // ==========================

    const btnIA = document.getElementById("btnIA");

    if(btnIA){

        btnIA.addEventListener("click", repondreIA);

    }

    const question = document.getElementById("question");

    if(question){

        question.addEventListener("keypress", function(e){

            if(e.key === "Enter"){

                repondreIA();

            }

        });

    }

}); // Fin de DOMContentLoaded




    
                          
