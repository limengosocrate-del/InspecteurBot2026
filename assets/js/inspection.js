// ======================================
// INSPECTEURBOT IA RDC
// inspection.js
// Gestion complète des inspections
// Version 1.0
// ======================================

"use strict";

const InspectionManager = {

    inspections: [],

    storageKey: "inspecteurbot_inspections",

    init() {

        this.load();

        this.bindEvents();

        this.renderTable();

        console.log("InspectionManager initialisé.");

    },

    bindEvents() {

        const form = document.getElementById("inspectionForm");

        if (form) {

            form.addEventListener("submit", (e) => {

                e.preventDefault();

                this.saveInspection();

            });

        }

        const search = document.getElementById("searchInspection");

        if (search) {

            search.addEventListener("keyup", (e) => {

                this.search(e.target.value);

            });

        }

    },

    saveInspection() {

        const data = {

            id: Date.now(),

            numero: document.getElementById("numero")?.value || "",

            inspecteur: document.getElementById("inspecteur")?.value || "",

            entreprise: document.getElementById("entreprise")?.value || "",

            province: document.getElementById("province")?.value || "",

            date: document.getElementById("dateInspection")?.value || "",

            statut: "En attente",

            created: new Date().toLocaleString("fr-FR")

        };

        if (!data.numero || !data.inspecteur || !data.entreprise) {

            alert("Veuillez remplir tous les champs obligatoires.");

            return;

        }

        this.inspections.push(data);

        this.save();

        this.renderTable();

        this.resetForm();

        alert("Inspection enregistrée avec succès.");

    },

    save() {

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(this.inspections)

        );

    },

    load() {

        const data = localStorage.getItem(this.storageKey);

        if (data) {

            this.inspections = JSON.parse(data);

        }

    },

    resetForm() {

        const form = document.getElementById("inspectionForm");

        if (form) {

            form.reset();

        }

    },

      renderTable(data = this.inspections) {

        const tbody = document.getElementById("inspectionTableBody");

        if (!tbody) return;

        tbody.innerHTML = "";

        if (data.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align:center">
                        Aucune inspection enregistrée.
                    </td>
                </tr>
            `;

            return;

        }

        data.forEach((inspection) => {

            tbody.innerHTML += `
                <tr>

                    <td>${inspection.numero}</td>

                    <td>${inspection.inspecteur}</td>

                    <td>${inspection.entreprise}</td>

                    <td>${inspection.province}</td>

                    <td>${inspection.date}</td>

                    <td>${inspection.statut}</td>

                    <td>${inspection.created}</td>

                    <td>

                        <button
                            class="btn btn-primary"
                            onclick="InspectionManager.edit(${inspection.id})">

                            Modifier

                        </button>

                        <button
                            class="btn btn-danger"
                            onclick="InspectionManager.remove(${inspection.id})">

                            Supprimer

                        </button>

                    </td>

                </tr>

            `;

        });

        this.updateStatistics();

    },

    search(keyword) {

        keyword = keyword.toLowerCase();

        const resultat = this.inspections.filter((item) => {

            return (

                item.numero.toLowerCase().includes(keyword) ||

                item.inspecteur.toLowerCase().includes(keyword) ||

                item.entreprise.toLowerCase().includes(keyword) ||

                item.province.toLowerCase().includes(keyword) ||

                item.statut.toLowerCase().includes(keyword)

            );

        });

        this.renderTable(resultat);

    },

    remove(id) {

        if (!confirm("Supprimer cette inspection ?")) {

            return;

        }

        this.inspections = this.inspections.filter(

            inspection => inspection.id !== id

        );

        this.save();

        this.renderTable();

    },

      edit(id) {

        const inspection = this.inspections.find(item => item.id === id);

        if (!inspection) return;

        document.getElementById("numero").value = inspection.numero;
        document.getElementById("inspecteur").value = inspection.inspecteur;
        document.getElementById("entreprise").value = inspection.entreprise;
        document.getElementById("province").value = inspection.province;
        document.getElementById("dateInspection").value = inspection.date;

        this.remove(id);

    },

    updateStatistics() {

        const total = this.inspections.length;

        const attente = this.inspections.filter(
            item => item.statut === "En attente"
        ).length;

        const termine = this.inspections.filter(
            item => item.statut === "Terminée"
        ).length;

        const totalEl = document.getElementById("totalInspection");
        const attenteEl = document.getElementById("inspectionAttente");
        const termineEl = document.getElementById("inspectionTerminee");

        if (totalEl) totalEl.textContent = total;
        if (attenteEl) attenteEl.textContent = attente;
        if (termineEl) termineEl.textContent = termine;

    },

    exportJSON() {

        const data = JSON.stringify(this.inspections, null, 2);

        const blob = new Blob(
            [data],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "inspections.json";

        a.click();

        URL.revokeObjectURL(url);

    },

    exportCSV() {

        let csv = "Numero,Inspecteur,Entreprise,Province,Date,Statut\n";

        this.inspections.forEach(item => {

            csv += `${item.numero},${item.inspecteur},${item.entreprise},${item.province},${item.date},${item.statut}\n`;

        });

        const blob = new Blob(
            [csv],
            { type: "text/csv;charset=utf-8;" }
        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "inspections.csv";

        a.click();

        URL.revokeObjectURL(url);

    },

    print() {

        window.print();

    }

};

document.addEventListener("DOMContentLoaded", () => {

    InspectionManager.init();

});

  

