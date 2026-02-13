<script lang="ts">
import { goto } from "$app/navigation";

let email = "";
let isLoading = false;
let error = "";
let success = false;

async function resetPassword() {
isLoading = true;
error = "";

try {
const response = await fetch("/api/auth/forgot-password", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ email }),
});

if (!response.ok) {
error = "Échec de l'envoi de l'email de réinitialisation";
isLoading = false;
return;
}

success = true;
} catch (e) {
error = "Une erreur est survenue";
isLoading = false;
}
}
</script>

<svelte:head>
<title>Mot de passe oublié - Segre.vip</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
<div class="max-w-md w-full space-y-8">
<div class="text-center">
<h1 class="text-4xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent mb-2">
Segre.vip
</h1>
<p class="text-gray-600 dark:text-gray-400">Réinitialisez votre mot de passe</p>
</div>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
{#if success}
<div class="space-y-4">
<div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300">
✅ Email de réinitialisation envoyé !
</div>
<p class="text-center text-gray-600 dark:text-gray-400">
Nous avons envoyé un lien de réinitialisation à {email}.
<br />
Vérifiez votre boîte de réception.
</p>
<button
on:click={() => goto("/login")}
class="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
>
Retour à la connexion
</button>
</div>
{:else}
{#if error}
<div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
{error}
</div>
{/if}

<form on:submit|preventDefault={resetPassword} class="space-y-4">
<div>
<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Email
</label>
<input
id="email"
type="email"
bind:value={email}
required
placeholder="votre@email.com"
class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
/>
</div>

<button
type="submit"
disabled={isLoading}
class="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
>
{#if isLoading}
<svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
<span>Envoi en cours...</span>
{:else}
<span>Envoyer le lien de réinitialisation</span>
{/if}
</button>
</form>

<div class="text-center text-sm text-gray-600 dark:text-gray-400">
Vous vous souvenez de votre mot de passe ?
<a href="/login" class="text-primary-600 hover:text-primary-500 font-medium ml-1">
Se connecter
</a>
</div>
{/if}
</div>
</div>
</div>
