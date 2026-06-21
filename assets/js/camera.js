// ======================================
// INSPECTEURBOT IA RDC
// camera.js
// Gestion de la caméra
// Version 1.0
// ======================================

"use strict";

const CameraManager = {

    stream: null,

    photos: [],

    init() {

        this.video = document.getElementById("cameraPreview");

        this.canvas = document.getElementById("cameraCanvas");

        this.gallery = document.getElementById("photoGallery");

        this.bindEvents();

    },

    bindEvents() {

        const openBtn = document.getElementById("btnOpenCamera");

        if (openBtn) {

            openBtn.addEventListener("click", () => {

                this.openCamera();

            });

        }

        const captureBtn = document.getElementById("btnCapture");

        if (captureBtn) {

            captureBtn.addEventListener("click", () => {

                this.capturePhoto();

            });

        }

        const closeBtn = document.getElementById("btnCloseCamera");

        if (closeBtn) {

            closeBtn.addEventListener("click", () => {

                this.closeCamera();

            });

        }

    },

    async openCamera() {

        try {

            this.stream = await navigator.mediaDevices.getUserMedia({

                video: {

                    facingMode: "environment"

                },

                audio: false

            });

            this.video.srcObject = this.stream;

            this.video.play();

        }

        catch(error) {

            alert("Impossible d'accéder à la caméra.");

            console.error(error);

        }

    },

    closeCamera() {

        if (!this.stream) return;

        this.stream.getTracks().forEach(track => {

            track.stop();

        });

        this.video.srcObject = null;

    },

      capturePhoto() {

        if (!this.stream) {

            alert("Veuillez d'abord ouvrir la caméra.");

            return;

        }

        const context = this.canvas.getContext("2d");

        this.canvas.width = this.video.videoWidth;

        this.canvas.height = this.video.videoHeight;

        context.drawImage(

            this.video,

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );

        const image = this.canvas.toDataURL("image/jpeg", 0.9);

        this.photos.push(image);

        this.renderGallery();

    },

    renderGallery() {

        if (!this.gallery) return;

        this.gallery.innerHTML = "";

        this.photos.forEach((photo, index) => {

            const card = document.createElement("div");

            card.className = "photo-item";

            card.innerHTML = `

                <img src="${photo}" alt="Inspection Photo">

                <div class="photo-actions">

                    <button
                        class="btn btn-danger"
                        onclick="CameraManager.removePhoto(${index})">

                        Supprimer

                    </button>

                </div>

            `;

            this.gallery.appendChild(card);

        });

    },

    removePhoto(index) {

        if (!confirm("Supprimer cette photo ?")) {

            return;

        }

        this.photos.splice(index, 1);

        this.renderGallery();

    },

    clearPhotos() {

        this.photos = [];

        this.renderGallery();

    },

    getPhotos() {

        return this.photos;

    },

      savePhotos() {

        try {

            localStorage.setItem(
                "inspecteurbot_photos",
                JSON.stringify(this.photos)
            );

            console.log("Photos sauvegardées.");

        } catch (error) {

            console.error("Erreur de sauvegarde :", error);

        }

    },

    loadPhotos() {

        try {

            const data = localStorage.getItem("inspecteurbot_photos");

            if (data) {

                this.photos = JSON.parse(data);

                this.renderGallery();

            }

        } catch (error) {

            console.error("Erreur de chargement :", error);

        }

    },

    prepareUpload() {

        return this.photos.map((photo, index) => {

            return {

                id: index + 1,

                filename: `inspection_${Date.now()}_${index + 1}.jpg`,

                image: photo

            };

        });

    },

    reset() {

        this.closeCamera();

        this.clearPhotos();

        localStorage.removeItem("inspecteurbot_photos");

    }

};

// ======================================
// INITIALISATION
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    CameraManager.init();

    CameraManager.loadPhotos();

});

window.addEventListener("beforeunload", () => {

    CameraManager.savePhotos();

});
