// ======================================
// INSPECTEURBOT IA RDC
// gps.js
// Gestion de la géolocalisation GPS
// Version 1.0
// ======================================

"use strict";

const GPSManager = {

    position: null,

    watchId: null,

    init() {

        this.latitude = document.getElementById("latitude");
        this.longitude = document.getElementById("longitude");
        this.accuracy = document.getElementById("accuracy");
        this.status = document.getElementById("gpsStatus");

        this.bindEvents();

    },

    bindEvents() {

        const btnGPS = document.getElementById("btnGPS");

        if (btnGPS) {

            btnGPS.addEventListener("click", () => {

                this.getLocation();

            });

        }

    },

    getLocation() {

        if (!navigator.geolocation) {

            alert("La géolocalisation n'est pas prise en charge par ce navigateur.");

            return;

        }

        this.setStatus("Recherche de la position...");

        navigator.geolocation.getCurrentPosition(

            (position) => {

                this.position = position;

                this.displayPosition(position);

            },

            (error) => {

                this.showError(error);

            },

            {

                enableHighAccuracy: true,

                timeout: 15000,

                maximumAge: 0

            }

        );

    },

    displayPosition(position) {

        const lat = position.coords.latitude;

        const lon = position.coords.longitude;

        const acc = position.coords.accuracy;

        if (this.latitude) this.latitude.value = lat.toFixed(6);

        if (this.longitude) this.longitude.value = lon.toFixed(6);

        if (this.accuracy) this.accuracy.value = acc.toFixed(2) + " m";

        this.setStatus("Position GPS obtenue avec succès.");

    },

    setStatus(message) {

        if (this.status) {

            this.status.textContent = message;

        }

        console.log(message);

    },

      startTracking() {

        if (!navigator.geolocation) {

            alert("La géolocalisation n'est pas disponible.");

            return;

        }

        this.setStatus("Suivi GPS en cours...");

        this.watchId = navigator.geolocation.watchPosition(

            (position) => {

                this.position = position;

                this.displayPosition(position);

                this.saveLocation();

            },

            (error) => {

                this.showError(error);

            },

            {

                enableHighAccuracy: true,

                maximumAge: 1000,

                timeout: 10000

            }

        );

    },

    stopTracking() {

        if (this.watchId !== null) {

            navigator.geolocation.clearWatch(this.watchId);

            this.watchId = null;

            this.setStatus("Suivi GPS arrêté.");

        }

    },

    saveLocation() {

        if (!this.position) return;

        const location = {

            latitude: this.position.coords.latitude,

            longitude: this.position.coords.longitude,

            accuracy: this.position.coords.accuracy,

            altitude: this.position.coords.altitude,

            speed: this.position.coords.speed,

            heading: this.position.coords.heading,

            timestamp: this.position.timestamp

        };

        localStorage.setItem(

            "inspecteurbot_gps",

            JSON.stringify(location)

        );

    },

    loadLocation() {

        const data = localStorage.getItem("inspecteurbot_gps");

        if (!data) return;

        const location = JSON.parse(data);

        if (this.latitude)

            this.latitude.value = location.latitude;

        if (this.longitude)

            this.longitude.value = location.longitude;

        if (this.accuracy)

            this.accuracy.value = location.accuracy + " m";

    },

    showError(error) {

        switch (error.code) {

            case error.PERMISSION_DENIED:

                this.setStatus("Autorisation GPS refusée.");

                break;

            case error.POSITION_UNAVAILABLE:

                this.setStatus("Position indisponible.");

                break;

            case error.TIMEOUT:

                this.setStatus("Temps de localisation dépassé.");

                break;

            default:

                this.setStatus("Erreur GPS inconnue.");

                break;

        }

    },

      getLocationData() {

        if (!this.position) {

            return null;

        }

        return {

            latitude: this.position.coords.latitude,

            longitude: this.position.coords.longitude,

            accuracy: this.position.coords.accuracy,

            altitude: this.position.coords.altitude,

            speed: this.position.coords.speed,

            heading: this.position.coords.heading,

            timestamp: this.position.timestamp

        };

    },

    reset() {

        this.stopTracking();

        this.position = null;

        localStorage.removeItem("inspecteurbot_gps");

        if (this.latitude) this.latitude.value = "";
        if (this.longitude) this.longitude.value = "";
        if (this.accuracy) this.accuracy.value = "";

        this.setStatus("GPS réinitialisé.");

    }

};

// ======================================
// INITIALISATION
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    GPSManager.init();

    GPSManager.loadLocation();

    const btnStart = document.getElementById("btnStartGPS");

    if (btnStart) {

        btnStart.addEventListener("click", () => {

            GPSManager.startTracking();

        });

    }

    const btnStop = document.getElementById("btnStopGPS");

    if (btnStop) {

        btnStop.addEventListener("click", () => {

            GPSManager.stopTracking();

        });

    }

});
  


