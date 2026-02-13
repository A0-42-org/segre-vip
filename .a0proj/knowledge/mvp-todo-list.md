# Analyse & Todo List MVP — Segre.vip

## 1. Résumé Exécutif

**Segre.vip** est une plateforme SaaS permettant aux créateurs de publier des bio pages et offer pages premium avec une approche redirect-only (Stripe Payment Links, Calendly).

### État actuel
- ✅ **En place**: SvelteKit 2 avec TypeScript, Skeleton UI v4 (Cerberus), Tailwind CSS v4
- ❌ **Manquant**: Authentification (BetterAuth), Base de données (PostgreSQL + Drizzle ORM), Système de pages, Éditeur de blocs, Thèmes, Analytics

### Positionnement pour MVP
Le projet dispose d'une base technique solide mais nécessite une implémentation complète de l'infrastructure backend, de l'authentification, et des fonctionnalités core pour atteindre un MVP fonctionnel.

---

## 2. Analyse de l'État Actuel

### 2.1 Structure du projet actuel
```
/a0/usr/projects/segre_vip_backup_manual/
├── src/
│   ├── routes/
│   │   ├── +page.svelte          (Page d'accueil statique)
│   │   ├── +layout.svelte        (Layout global)
│   │   └── layout.css            (Styles globaux)
│   ├── lib/
│   │   ├── assets/               (Favicon)
│   │   └── index.ts
│   └── app.html                  (Template HTML)
├── static/
├── .a0proj/
│   └── knowledge/prd.md          (PRD complet)
├── package.json                 (Dépendances de base)
├── skeleton.config.js            (Thème Cerberus)
├── vite.config.ts               (Config Vite + Tailwind)
└── tsconfig.json
```

### 2.2 Ce qui est déjà en place
| Composant | État | Détails |
|-----------|------|---------|
| SvelteKit | ✅ Configuré | v2.50.2 avec TypeScript |
| Skeleton UI | ✅ Configuré | v4.12.0, thème Cerberus |
| Tailwind CSS | ✅ Configuré | v4.1.18 avec plugin Vite |
| ESLint/Prettier | ✅ Configuré | Linting et formatting actifs |
| Playwright | ✅ Configuré | Tests E2E possibles |
| Structure base | ✅ Configuré | Routes de base fonctionnelles |

### 2.3 Ce qui manque pour le MVP
| Composant | État | Priorité |
|-----------|------|----------|
| BetterAuth | ❌ Non installé | P0 |
| Drizzle ORM | ❌ Non installé | P0 |
| PostgreSQL | ❌ Non configuré | P0 |
| User Authentication | ❌ Non implémenté | P0 |
| Database Schema | ❌ Non créé | P0 |
| Dynamic Pages Routing | ❌ Non implémenté | P0 |
| Page Editor | ❌ Non implémenté | P0 |
| Block Components | ❌ Non créés | P0 |
| Theme System | ❌ Non implémenté | P1 |
| Analytics Tracking | ❌ Non implémenté | P1 |
| Public Page Views | ❌ Non implémenté | P0 |
| Stripe Integration | ❌ Non configuré | P1 |
| Calendly Integration | ❌ Non configuré | P1 |
| Admin Dashboard | ❌ Non créé | P2 |
| User Settings | ❌ Non créé | P1 |

---

## 3. Todo List MVP Structurée

### Légende
- **P0**: Critique pour MVP (bloqueur)
- **P1**: Important pour MVP (expérience core)
- **P2**: Nice-to-have (peut être post-MVP)
- **Effort**: Faible (1-2j), Moyen (3-5j), Élevé (6-10j)

### Catégorie 1: Infrastructure Core

| Tâche | Priorité | Dépendances | Effort | Description |
|-------|----------|-------------|--------|-------------|
| 1.1 Installer BetterAuth | P0 | - | Faible | Installer et configurer better-auth avec email/password |
| 1.2 Installer Drizzle ORM | P0 | - | Faible | Installer drizzle-orm et drivers PostgreSQL |
| 1.3 Configurer PostgreSQL | P0 | 1.2 | Moyen | Setup DB local/cloud, créer database, configurer connection pool |
| 1.4 Créer schema Drizzle | P0 | 1.2, 1.3 | Élevé | Définir tables: users, pages, blocks, themes, events, domains |
| 1.5 Setup migrations Drizzle | P0 | 1.4 | Faible | Configurer drizzle-kit pour migrations et push |
| 1.6 Configurer BetterAuth DB | P0 | 1.4, 1.5 | Moyen | Intégrer BetterAuth avec schema Drizzle existant |
| 1.7 Setup environment variables | P0 | 1.1, 1.3 | Faible | Configurer .env avec DATABASE_URL, AUTH_SECRET, etc. |

### Catégorie 2: Authentification & Utilisateurs

| Tâche | Priorité | Dépendances | Effort | Description |
|-------|----------|-------------|--------|-------------|
| 2.1 Créer route signup | P0 | 1.6 | Faible | Page inscription avec email/password + validation |
| 2.2 Créer route login | P0 | 1.6 | Faible | Page connexion avec gestion erreurs |
| 2.3 Créer route logout | P0 | 1.6 | Faible | Déconnexion et nettoyage session |
| 2.4 Créer route forgot-password | P1 | 1.6 | Moyen | Flow récupération mot de passe (optionnel MVP) |
| 2.5 Middleware auth | P0 | 1.6 | Moyen | Protection routes privées, vérification session |
| 2.6 Page profil utilisateur | P1 | 2.5 | Faible | Profile view avec email, date création |
| 2.7 Page settings utilisateur | P1 | 2.6 | Moyen | Edition nom, avatar, mot de passe |

### Catégorie 3: Database & Models

| Tâche | Priorité | Dépendances | Effort | Description |
|-------|----------|-------------|--------|-------------|
| 3.1 Table users | P0 | 1.4 | Faible | id, email, name, avatar, createdAt, plan |
| 3.2 Table pages | P0 | 1.4, 3.1 | Faible | id, userId, slug, title, type (bio/offer), theme, published, publishedAt |
| 3.3 Table blocks | P0 | 1.4, 3.2 | Moyen | id, pageId, type, content, style, order, visible, schedule, trackingLabel, targetUrl |
| 3.4 Table themes | P1 | 1.4 | Faible | presets Luxury, Neon avec configs |
| 3.5 Table events | P1 | 1.4, 3.2, 3.3 | Moyen | id, pageId, blockId, eventType (view/click), timestamp, referrer, utm, device, userAgent |
| 3.6 Table domains | P2 | 1.4, 3.1, 3.2 | Faible | id, userId, pageId, domain, verified, ssl |
| 3.7 Repository pattern | P0 | 3.1-3.6 | Élevé | Créer fonctions d'accès DB (users, pages, blocks) |
| 3.8 Seed database | P2 | 3.7 | Faible | Data de test pour dev |

### Catégorie 4: Routing Pages Publiques

| Tâche | Priorité | Dépendances | Effort | Description |
|-------|----------|-------------|--------|-------------|
| 4.1 Route dynamic username | P0 | 3.7 | Moyen | /[username] chargement page bio par défaut |
| 4.2 Route dynamic page slug | P0 | 4.1 | Moyen | /[username]/[slug] pour pages spécifiques |
| 4.3 SSR page rendering | P0 | 4.1, 4.2 | Moyen | Server-side rendering avec metas OG |
| 4.4 SEO optimization | P0 | 4.3 | Faible | Metas Twitter, OG, title, description |
| 4.5 404 handling | P1 | 4.1 | Faible | Page 404 custom pour pages not found |
| 4.6 Unpublished page handling | P1 | 3.2, 4.1 | Faible | Redirect ou message si page non publiée |

### Catégorie 5: Composants UI - Blocks

| Tâche | Priorité | Dépendances | Effort | Description |
|-------|----------|-------------|--------|-------------|
| 5.1 Block Header | P0 | 3.3 | Faible | Avatar, nom, bio, badges avec styles theme |
| 5.2 Block Link List | P0 | 3.3 | Moyen | Liste liens simples + featured link |
| 5.3 Block CTA Button | P0 | 3.3 | Moyen | Bouton configurable: label, url, icon, style, target, tracking |
| 5.4 Block Embed | P1 | 3.3 | Élevé | Embed YouTube/TikTok/Instagram |
| 5.5 Block Testimonials | P1 | 3.3 | Moyen | Liste témoignages avec nom + rôle |
| 5.6 Block FAQ | P1 | 3.3 | Moyen | Accordion Q+A |
| 5.7 Block Social Icons | P0 | 3.3 | Faible | Icônes réseaux sociaux configurables |
| 5.8 Block Text/Rich | P1 | 3.3 | Faible | Bloc texte simple |

### Catégorie 6: Thèmes & Styling

| Tâche | Priorité | Dépendances | Effort | Description |
|-------|----------|-------------|--------|-------------|
| 6.1 Système de thèmes | P1 | 3.4, 5.1-5.8 | Élevé | Architecture theme provider avec presets |
| 6.2 Thème Luxury | P1 | 6.1 | Moyen | Noir/or, typographie raffinée, élégant |
| 6.3 Thème Neon | P1 | 6.1 | Moyen | Cyberpunk, fluo, gradients, moderne |
| 6.4 Theme switcher | P1 | 6.1 | Faible | Dropdown sélection theme dans éditeur |
| 6.5 Customization options | P1 | 6.1 | Élevé | Override colors, fonts, backgrounds per page |

### Catégorie 7: Page Editor

| Tâche | Priorité | Dépendances | Effort | Description |
|-------|----------|-------------|--------|-------------|
| 7.1 Layout editor | P0 | 5.1-5.8 | Moyen | Interface drag-and-drop pour ordonner blocs |
| 7.2 Block creation modal | P0 | 7.1 | Moyen | Modal pour ajouter nouveau bloc avec formulaire |
| 7.3 Block edit panel | P0 | 7.1 | Moyen | Panel pour éditer contenu et style bloc existant |
| 7.4 Block delete | P0 | 7.3 | Faible | Suppression bloc avec confirmation |
| 7.5 Block reordering | P0 | 7.1 | Moyen | Drag-and-drop réordonnancement |
| 7.6 Auto-save | P1 | 7.2, 7.3 | Moyen | Sauvegarde auto après modification |
| 7.7 Preview mode | P1 | 7.1 | Moyen | Toggle preview live de la page |
| 7.8 Publish/unpublish | P0 | 3.2, 7.6 | Faible | Toggle statut publication |

### Catégorie 8: Dashboard & Analytics

| Tâche | Priorité | Dépendances | Effort | Description |
|-------|----------|-------------|--------|-------------|
| 8.1 Dashboard home | P0 | 3.7, 4.1 | Moyen | Vue liste pages avec stats rapides |
| 8.2 Page detail view | P0 | 8.1 | Moyen | Détail page avec éditeur + analytics |
| 8.3 Analytics tracking | P1 | 3.5, 4.3 | Élevé | Endpoint API pour tracker events (view/click) |
| 8.4 Analytics dashboard | P1 | 8.3 | Élevé | Graphiques vues, clics, CTR par période |
| 8.5 Per-block analytics | P1 | 8.4 | Moyen | Breakdown clics par block/link |
| 8.6 Source tracking | P2 | 8.3 | Moyen | Referrer et UTM params tracking |

### Catégorie 9: Intégrations Externes

| Tâche | Priorité | Dépendances | Effort | Description |
|-------|----------|-------------|--------|-------------|
| 9.1 Calendly button | P1 | 5.3 | Faible | Bloc CTA spécial pour URL Calendly |
| 9.2 Stripe Payment Link | P1 | 5.3 | Faible | Bloc CTA spécial pour URL Stripe Payment Link |
| 9.3 Validation URLs | P0 | 9.1, 9.2 | Moyen | Validation stricte URLs (anti javascript:, unsafe schemes) |
| 9.4 Target option | P1 | 5.3 | Faible | Config same tab / new tab pour liens |
| 9.5 Interstitial warning | P2 | 9.3 | Faible | Modal "Vous allez quitter Segre.vip" |

### Catégorie 10: Admin & Modération

| Tâche | Priorité | Dépendances | Effort | Description |
|-------|----------|-------------|--------|-------------|
| 10.1 Admin auth | P2 | 2.1-2.5 | Faible | Role-based access pour admins |
| 10.2 Admin dashboard | P2 | 8.1 | Moyen | Vue admin pour gérer utilisateurs/pages |
| 10.3 Report page feature | P2 | 3.2, 4.3 | Moyen | Bouton report sur pages publiques |
| 10.4 Report moderation | P2 | 10.2, 10.3 | Moyen | Vue reports avec actions (disable page) |
| 10.5 Audit logs | P2 | 3.7 | Élevé | Logging modifications pages/users |

### Catégorie 11: Offer Pages (Landing)

| Tâche | Priorité | Dépendances | Effort | Description |
|-------|----------|-------------|--------|-------------|
| 11.1 Offer page template | P1 | 5.1-5.8, 6.1 | Élevé | Template landing page: hero, features, testimonials, CTA |
| 11.2 Offer page editor | P1 | 7.1-7.8 | Moyen | Adaptation éditeur pour offer pages |
| 11.3 Offer page routing | P1 | 4.1, 4.2 | Faible | Routing spécifique pour offer pages |

### Catégorie 12: Branding & Legal

| Tâche | Priorité | Dépendances | Effort | Description |
|-------|----------|-------------|--------|-------------|
| 12.1 Powered by Segre footer | P1 | 5.1 | Faible | Footer branding sur pages Free |
| 12.2 Privacy policy | P0 | - | Faible | Page politique confidentialité |
| 12.3 Terms of service | P0 | - | Faible | Page conditions d'utilisation |
| 12.4 Content policy | P1 | - | Faible | Politique contenu (brand-safe) |

### Catégorie 13: DevOps & Performance

| Tâche | Priorité | Dépendances | Effort | Description |
|-------|----------|-------------|--------|-------------|
| 13.1 Build optimization | P1 | Tous | Faible | Optimiser build SvelteKit pour production |
| 13.2 Image optimization | P1 | 5.1 | Moyen | Lazy loading, compression images |
| 13.3 Edge caching | P1 | 4.3 | Moyen | Configurer cache headers pour pages publiques |
| 13.4 Rate limiting | P1 | 8.3 | Moyen | Limiter requests API analytics |
| 13.5 Error handling | P0 | Tous | Moyen | Global error handling + logging |
| 13.6 Deployment config | P1 | Tous | Faible | Config deployment (Vercel/Cloudflare/etc) |

---

## 4. Roadmap MVP

### Phase 1: Foundation (Semaines 1-2)
**Objectif**: Infrastructure et authentification fonctionnelles

**Milestones**:
- ✅ PostgreSQL configuré et accessible
- ✅ BetterAuth installé et intégré
- ✅ Schema Drizzle créé avec migrations
- ✅ Inscription/connexion fonctionnelles
- ✅ Protection routes privées active

**Tâches**:
- 1.1 → 1.7 (Infrastructure setup)
- 2.1 → 2.5 (Auth routes & middleware)
- 3.1 → 3.4 (Core DB tables)
- 13.5 (Error handling)

**Livrables**:
- Base de données fonctionnelle
- Système d'authentification complet
- Utilisateur peut créer compte et se connecter

---

### Phase 2: Core Features (Semaines 3-4)
**Objectif**: Création et publication de pages bio basiques

**Milestones**:
- ✅ Utilisateur peut créer page bio
- ✅ Page bio accessible via URL username.segre.vip
- ✅ Éditeur fonctionnel avec blocs de base
- ✅ Page publique rendue avec SSR

**Tâches**:
- 3.5 → 3.8 (Complete DB schema + repos)
- 4.1 → 4.6 (Dynamic routing & SEO)
- 5.1, 5.2, 5.3, 5.7 (Core block components)
- 7.1 → 7.5, 7.8 (Basic editor)
- 12.2, 12.3 (Legal pages)

**Livrables**:
- Système de pages fonctionnel
- Routing dynamique opérationnel
- Éditeur de blocs de base
- Pages publiques accessibles

---

### Phase 3: Theming & Polish (Semaines 5-6)
**Objectif**: Expérience visuelle premium avec thèmes

**Milestones**:
- ✅ Système de thèmes opérationnel
- ✅ Thèmes Luxury et Neon disponibles
- ✅ Personnalisation possible par utilisateur
- ✅ UI responsive et accessible

**Tâches**:
- 6.1 → 6.5 (Theme system + Luxury/Neon)
- 5.4, 5.5, 5.6, 5.8 (Advanced blocks)
- 7.6, 7.7 (Auto-save + Preview)
- 13.2 (Image optimization)

**Livrables**:
- Thèmes premium fonctionnels
- Expérience utilisateur soignée
- Éditeur complet avec preview

---

### Phase 4: Analytics & Offer Pages (Semaines 7-8)
**Objectif**: Tracking performance + landing pages conversion

**Milestones**:
- ✅ Analytics vues et clics trackés
- ✅ Dashboard analytics simple opérationnel
- ✅ Offer pages créables et publiables
- ✅ Intégrations Stripe/Calendly fonctionnelles

**Tâches**:
- 8.1 → 8.5 (Analytics tracking + dashboard)
- 9.1 → 9.4 (External integrations)
- 11.1 → 11.3 (Offer pages)
- 13.3, 13.4 (Performance & rate limiting)

**Livrables**:
- Système d'analytics basique
- Dashboard utilisateur fonctionnel
- Offer pages opérationnelles
- Intégrations Stripe/Calendly

---

### Phase 5: Pre-Launch (Semaine 9)
**Objectif**: Préparation lancement MVP

**Milestones**:
- ✅ Toutes fonctionnalités P0 testées
- ✅ Branding et legal complètes
- ✅ Performance et accessibilité validées
- ✅ Déployment configuré

**Tâches**:
- 2.6, 2.7 (User settings)
- 10.1 → 10.5 (Admin basics - optional MVP)
- 12.1, 12.4 (Branding + content policy)
- 13.1, 13.6 (Build + deployment)
- Tests E2E et QA complets

**Livrables**:
- MVP prêt pour lancement
- Infrastructure deployment prête
- Documentation utilisateur

---

## 5. Risques & Recommendations

### 5.1 Risques Techniques

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Complexité Drizzle + BetterAuth | Moyenne | Élevé | Suivre docs skills disponibles, tester early |
| Performance analytics avec écritures fréquentes | Moyenne | Moyen | Batch inserts, async tracking, cache reads |
| SEO avec SSR sur edge | Faible | Moyen | Tester edge rendering, configurer cache headers |
| Gestion d'images uploadées | Moyenne | Moyen | Utiliser service externe (Cloudinary, S3) |

### 5.2 Risques Produit

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Scope creep - trop de features | Élevée | Élevé | Stricte adhérence PRD MVP, prioriser P0 |
| Adoption thèmes personnalisés | Moyenne | Faible | Commencer avec presets solides |
| Abus via liens malveillants | Moyenne | Élevé | Validation stricte URLs, report system |
| Confiance TLD .vip | Moyenne | Moyen | UX professionnelle, legal pages complètes |

### 5.3 Recommendations Stratégiques

**Pour MVP**:
1. **Simplifier les blocs**: Commencer avec Header, Link List, CTA Button, Social Icons
2. **Thèmes fixes**: Pas de personnalisation avancée en MVP, presets Luxury/Neon suffisent
3. **Analytics basiques**: Vues et clics suffisent, pas de UTM avancé en MVP
4. **Admin minimal**: Report system mais sans dashboard admin complet
5. **Tests manuels**: Pas de suite E2E automatique pour MVP, tests manuels suffisent

**Post-MVP**:
1. **A/B testing**: Feature V1 pour optimiser conversion
2. **Domaines custom**: Feature Pro pour monétisation
3. **Export analytics**: Feature Pro pour power users
4. **Lead capture**: Feature V1 pour croissance
5. **Multi-workspaces**: Feature V2 pour agences

### 5.4 Recommandations Techniques

1. **Utiliser les skills disponibles**:
   - BetterAuth: `/a0/usr/skills/better-auth-svelte/SKILL.md`
   - Stripe: `/a0/usr/skills/stripe-sveltekit/SKILL.md`

2. **Package manager**: Préférer `bun` comme documenté dans le projet

3. **Architecture**: Maintenir séparation claire entre:
   - `/src/routes/` - Pages et API endpoints
   - `/src/lib/components/` - Composants UI réutilisables
   - `/src/lib/db/` - Repositories et accès DB
   - `/src/lib/auth/` - Logique authentification
   - `/src/lib/analytics/` - Tracking et analytics

4. **Performance**: Prioriser SSR pour pages publiques, CSR pour dashboard

5. **Testing**: Playwright configuré, utiliser pour tests E2E critiques

---

## 6. Annexes

### 6.1 Dépendances à installer

```bash
# Authentication
bun add better-auth @auth/core

# Database
bun add drizzle-orm postgres
bun add -D drizzle-kit

# Utilities
bun add zod
bun add date-fns
```

### 6.2 Environment variables requises

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/segre_vip"

# Auth
AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# App
APP_URL="http://localhost:3000"

# Stripe (optionnel pour MVP)
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

### 6.3 Ordre de priorité d'implémentation

**Sprint 1 (Foundation)**:
1. Setup PostgreSQL + Drizzle
2. Configurer BetterAuth
3. Créer tables users + pages
4. Routes signup/login

**Sprint 2 (Core Pages)**:
1. Routing dynamique [username]
2. Composants blocs de base
3. Éditeur simple
4. Publication page

**Sprint 3 (Polish)**:
1. Thèmes Luxury/Neon
2. Dashboard user
3. Analytics tracking
4. Offer pages

---

**Document généré**: 2026-02-12
**Version**: 1.0 - MVP Todo List
**Projet**: Segre.vip
