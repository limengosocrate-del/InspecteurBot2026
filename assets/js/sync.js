// ======================================
// INSPECTEURBOT IA RDC
// sync.js
// Synchronisation des données
// Version 1.0
// ======================================

"use strict";

const SyncManager = {

    apiUrl: "api/sync.php",

    queue: [],

    syncing: false,

    init() {

        this.loadQueue();

        this.bindEvents();

        this.updateStatus();

    },

    bindEvents() {

        window.addEventListener("online", () => {

            console.log("Connexion Internet rétablie.");

            this.syncAll();

        });

        window.addEventListener("offline", () => {

            console.log("Mode hors ligne.");

            this.updateStatus();

        });

        const btnSync = document.getElementById("btnSync");

        if (btnSync) {

            btnSync.addEventListener("click", () => {

                this.syncAll();

            });

        }

    },

    add(data) {

        this.queue.push({

            id: Date.now(),

            created: new Date().toISOString(),

            status: "waiting",

            data: data

        });

        this.saveQueue();

        this.updateStatus();

    },

    saveQueue() {

        localStorage.setItem(

            "inspecteurbot_sync",

            JSON.stringify(this.queue)

        );

    },

    loadQueue() {

        const data = localStorage.getItem("inspecteurbot_sync");

        if (data) {

            this.queue = JSON.parse(data);

        }

    },

    updateStatus() {

        const element = document.getElementById("syncStatus");

        if (!element) return;

        if (!navigator.onLine) {

            element.textContent =

                "Mode hors ligne - Synchronisation en attente";

            return;

        }

        element.textContent =

            `${this.queue.length} élément(s) en attente`;

    },

      async syncAll() {

        if (!navigator.onLine) {

            this.updateStatus();

            return;

        }

        if (this.syncing) {

            return;

        }

        this.syncing = true;

        this.updateStatus();

        while (this.queue.length > 0) {

            const item = this.queue[0];

            const success = await this.send(item);

            if (success) {

                this.queue.shift();

                this.saveQueue();

            } else {

                break;

            }

        }

        this.syncing = false;

        this.updateStatus();

    },

    async send(item) {

        try {

            const response = await fetch(this.apiUrl, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(item.data)

            });

            if (!response.ok) {

                throw new Error("Erreur serveur");

            }

            const result = await response.json();

            if (result.success) {

                console.log("Inspection synchronisée :", item.id);

                return true;

            }

            console.error(result.message);

            return false;

        }

        catch (error) {

            console.error("Erreur de synchronisation :", error);

            return false;

        }

    },

    async uploadPhotos(photos = []) {

        if (photos.length === 0) {

            return true;

        }

        const formData = new FormData();

        photos.forEach((photo, index) => {

            formData.append(`photo_${index}`, photo);

        });

        try {

            const response = await fetch(

                "api/upload_photos.php",

                {

                    method: "POST",

                    body: formData

                }

            );

            return response.ok;

        }

        catch (error) {

            console.error(error);

            return false;

        }

    },

    async uploadGPS(gps) {

        try {

            const response = await fetch(

                "api/upload_gps.php",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify(gps)

                }

            );

            return response.ok;

        }

        catch (error) {

            console.error(error);

            return false;

        }

    },

  # ================================
# PARTIE 3 : COMMANDES ADMIN
# ================================

from discord.ext import commands
import discord

class Admin(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    @commands.has_permissions(administrator=True)
    async def clear(self, ctx, amount: int = 5):
        """Supprime des messages"""
        await ctx.channel.purge(limit=amount + 1)
        msg = await ctx.send(f"🗑️ {amount} messages supprimés.")
        await msg.delete(delay=3)

    @commands.command()
    @commands.has_permissions(administrator=True)
    async def kick(self, ctx, member: discord.Member, *, reason="Aucune raison"):
        await member.kick(reason=reason)
        await ctx.send(f"👢 {member.mention} a été expulsé.\nRaison : {reason}")

    @commands.command()
    @commands.has_permissions(administrator=True)
    async def ban(self, ctx, member: discord.Member, *, reason="Aucune raison"):
        await member.ban(reason=reason)
        await ctx.send(f"🔨 {member.mention} a été banni.\nRaison : {reason}")

    @commands.command()
    @commands.has_permissions(administrator=True)
    async def unban(self, ctx, *, member):
        banned = await ctx.guild.bans()

        name, discriminator = member.split("#")

        for ban_entry in banned:
            user = ban_entry.user

            if (user.name, user.discriminator) == (name, discriminator):
                await ctx.guild.unban(user)
                await ctx.send(f"✅ {user} a été débanni.")
                return

        await ctx.send("❌ Utilisateur introuvable.")

async def setup(bot):
    await bot.add_cog(Admin(bot))

