# Tailwind CSS dans Svelte - Bonnes Pratiques

## ❌ Ce qu'il ne faut PAS faire avec Tailwind v4

### 1. Utiliser `@apply` avec des classes utilitaires dans les `<style>` de Svelte

```svelte
<!-- ❌ NE FAITES PAS CA -->
<style lang="postcss">
	.my-class {
		@apply flex justify-center gap-3;
	}
</style>
```

**Problème avec Tailwind v4:**

- Tailwind v4 ne reconnaît pas correctement les classes utilitaires dans `@apply`
- Le build échoue avec des erreurs comme: "Cannot apply unknown utility class"
- Cela est dû à la façon dont Tailwind v4 traite les plugins et les directives

### 2. Mélanger `@apply` et classes inline

```svelte
<!-- ❌ COMBINAISON PROBLÉMATIQUE -->
<div class="@apply flex gap-3 p-4">
	<!-- Contenu -->
</div>

<style lang="postcss">
	.my-class {
		@apply flex gap-3;
	}
</style>
```

Cela crée de la confusion et augmente la maintenance du code.

### 3. Over-apprendre les classes

```svelte
<!-- ❌ TROP DE CLASSES INLINE -->
<div
	class="
    flex cursor-pointer items-center justify-center
    gap-2 rounded-lg px-6
    py-4 text-lg
    font-semibold transition-all
    duration-200
    hover:scale-105
    hover:shadow-lg
  "
>
	<!-- Contenu -->
</div>
```

Ce qui rend le code difficile à lire et à maintenir.

---

## ✅ Ce qu'il faut FAIRE à la place

### 1. Utiliser les classes directement dans le HTML (RECOMMANDÉ)

```svelte
<!-- ✅ UTILISEZ DES CLASSES INLINE -->
<div
	class="flex cursor-pointer items-center gap-2 rounded-lg px-6 py-4 text-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
>
	<!-- Contenu -->
</div>
```

**Avantages:**

- Plus rapide à développer
- Code plus lisible pour les débutants
- Moins de fichiers CSS à maintenir
- Très bien supporté par Tailwind v4

### 2. Créer des classes CSS custom si nécessaire

```svelte
<div class="card-button">
	<!-- Contenu -->
</div>

<!-- ✅ CRÉEZ DES CLASSES CUSTOM -->
<style lang="postcss">
	.card-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 1.5rem;
		border-radius: 0.5rem;
		font-size: 1.125rem;
		font-weight: 600;
		transition: all 0.2s ease;
	}

	.card-button:hover {
		transform: scale(1.05);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
</style>
```

**Avantages:**

- Code plus propre et maintenable
- Idéal pour des composants réutilisables
- Plus facile à modifier plus tard

### 3. Utiliser les conditions conditionnelles intelligemment

```svelte
<!-- ✅ UTILISEZ les expressions conditionnelles Svelte -->
<div
  class="flex items-center gap-2"
  class:px-6={usePadding}
  class:rounded-lg={useBorderRadius}
>
  <!-- Contenu -->
</div>

<div
  class="flex items-center gap-2"
  class="px-6 py-4 rounded-lg"
  class:text-lg={fontSize === 'large'}
  class:text-base={fontSize === 'normal'}
>
  <!-- Contenu -->
</div>
```

**Avantages:**

- Code plus propre
- Conditions explicites
- Aide à la maintenance

### 4. Regrouper les classes par utilité

```svelte
<!-- ✅ REGROUPEZ LES CLASSES PAR TYPE -->
<div
	class="
  /* Layout */ /* Spacing &
  Shape */ /* Typography */ /* Animation */
  /* Interactivity */ /* Hover
  effects */ flex cursor-pointer items-center
  gap-2 rounded-lg px-6 py-4
  text-lg font-semibold transition-all duration-200 hover:scale-105
"
>
	<!-- Contenu -->
</div>
```

---

## 🎯 Guide de Choix

### Quand utiliser des classes inline?

- ✅ Pour des composants simples ou uniques
- ✅ Pour des styles peu complexes
- ✅ Pour le prototypage rapide
- ✅ Pour des composants de layout

### Quand créer des classes custom?

- ✅ Pour des composants réutilisables
- ✅ Pour des patterns de style complexes
- ✅ Pour des thèmes ou variations récurrentes
- ✅ Quand vous avez besoin de beaucoup de contextes

### Quand utiliser `@apply` (si possible)?

- ✅ Dans les fichiers CSS globaux (pas dans Svelte)
- ✅ Pour créer des classes de thème réutilisables
- ✅ Pour des mixins CSS complexes

---

## 📚 Règles d'or pour Tailwind v4 + Svelte

1. **Évitez `@apply` dans les composants Svelte** - Utilisez plutôt des classes inline
2. **Gardez les styles inline dans une seule ligne** - Utilisez des backticks (` ` `)
3. **Regroupez les classes logiquement** - Même s'ils ne sont pas parfaitement organisés, cela aide
4. **Utilisez les classes conditionnelles** - `class:condition` au lieu de logique JS complexe
5. **Créez des composants avec styles inline** - Svelte est fait pour ça
6. **Gardez les styles globaux dans `layout.css`** - Utilisez `@import` là

---

## 💡 Bonnes Pratiques Exemples

### Exemple 1: Bouton simple

```svelte
<button
	class="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
>
	Cliquer ici
</button>
```

### Exemple 2: Carte de contenu

```svelte
<div class="rounded-xl bg-white p-6 shadow-lg">
	<h3 class="mb-2 text-xl font-bold">Titre</h3>
	<p class="text-gray-600">Description</p>
</div>
```

### Exemple 3: Composant réutilisable

```svelte
<div class="info-card">
	<!-- Contenu -->
</div>

<style lang="postcss">
	.info-card {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.5rem;
		padding: 1.5rem;
	}
</style>
```

---

## 🚀 Ressources utiles

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Svelte Documentation](https://svelte.dev/docs)
- [Tailwind v4 Release Notes](https://tailwindcss.com/blog/tailwindcss-v4-beta)
- [Svelte Best Practices](https://svelte.dev/docs/svelte-components#using-the-class-directive)

---

## 📝 Résumé

**Ne faites PAS:**

- ❌ Utiliser `@apply` avec des classes utilitaires dans Svelte
- ❌ Mélanger inline classes et `@apply`
- ❌ Over-appliquer des classes multiples

**Faites:**

- ✅ Utilisez des classes inline directes
- ✅ Créez des classes CSS custom pour les composants réutilisables
- ✅ Utilisez les conditions Svelte (`class:condition`)
- ✅ Regroupez les classes par logique quand c'est possible

Le secret avec Tailwind v4 + Svelte est d'utiliser les classes directement dans le HTML plutôt que de les extraire dans des `@apply` directives!
