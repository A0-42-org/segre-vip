# Segre.vip 🚀

Une plateforme SaaS permettant aux créateurs de publier des bio pages et offer pages premium avec une approche redirect-only.

## 📖 Description

Segre.vip permet aux créateurs de centraliser leurs liens et de publier des pages "VIP" (bio + pages d'offre) qui convertissent, avec une esthétique premium/intime et une approche brand-safe.

### Vision
- Créer une bio page en < 5 minutes, mobile-first, rapide, belle.
- Ajouter des "offer pages" (landing pages simples) pour convertir (prise de RDV, paiement via lien, capture email).
- Mesurer la performance (clics, sources, performance des CTAs) pour itérer.

## ✨ Features

### ✅ Disponibles (MVP)

| Feature | Description |
|---------|-------------|
| **Authentification** | BetterAuth avec email/password, sessions sécurisées |
| **Pages Bio** | Pages bio personnalisables avec blocks réutilisables |
| **Pages Offer** | Landing pages de conversion |
| **Éditeur** | Éditeur drag-and-drop avec preview |
| **Thèmes** | Thèmes Luxury et Neon |
| **Templates** | 5 templates prêts à l'emploi |
| **Analytics** | Tracking vues, clics, CTR, sources |
| **SEO** | Métadonnées OG, Twitter Cards, optimisation |
| **Security** | Validation URLs, rate limiting |
| **Protection routes** | Middleware d'authentification |
| **404 custom** | Page d'erreur personnalisée |

### 🔮 Roadmap (P2 - Issues GitHub)

1. **Upload d'images** (#1) - Avatars et covers
2. **Preview en temps réel** (#2) - Live preview dans l'éditeur
3. **Auto-save** (#3) - Sauvegarde automatique
4. **Blocs Stripe/Calendly** (#4) - Intégrations externes
5. **Domaines custom** (#5) - Gestion des domaines personnalisés

## 🛠 Stack Technique

| Catégorie | Technologie |
|-----------|-------------|
| **Framework** | SvelteKit 2.50.2 + TypeScript 5.9.3 |
| **UI Library** | Skeleton UI 4.12.0 (Thème Cerberus) |
| **CSS** | Tailwind CSS 4.1.18 |
| **Authentification** | BetterAuth 1.4.18 |
| **ORM** | Drizzle ORM 0.45.1 |
| **Base de données** | PostgreSQL |
| **Testing** | Playwright 1.58.1 |
| **Icons** | Lucide Svelte 0.563.0 |
| **Forms** | SvelteKit Superforms 2.29.1 |
| **Validation** | Zod 4.3.6 |
| **Drag & Drop** | svelte-dnd-action 0.9.69 |

## 📦 Installation

### Prérequis
- Node.js 20+
- PostgreSQL 13+
- Bun (package manager)

### Configuration

```bash
# Clone le repository
git clone https://github.com/A0-42-org/segre-vip.git
cd segre-vip

# Installe les dépendances
bun install

# Configure les variables d'environnement
cp .env.example .env
```

### Variables d'Environnement

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/segre_vip_dev"

# Auth
BETTER_AUTH_URL="http://localhost:5173"
BETTER_AUTH_SECRET="your-secret-key"

# Email Verification (Optional)
SKIP_EMAIL_VERIFICATION=true
```

### Migrations

```bash
# Génère les migrations
bun run drizzle-kit generate

# Applique les migrations
bun run drizzle-kit migrate
```

## 🚀 Développement

```bash
# Lance le serveur de développement
bun run dev

# Ouvre dans le navigateur
bun run dev -- --open

# Vérifie le code TypeScript
bun run check

# Formatte le code
bun run format

# Linting
bun run lint
```

## 🏗️ Build & Deploy

### Build

```bash
# Build de production
bun run build

# Preview du build
bun run preview
```

### Docker

```bash
# Build l'image Docker
docker build -t segre-vip .

# Run le container
docker run -p 3000:3000 -e DATABASE_URL="postgresql://..." segre-vip
```

### Deploy avec Dokploy

Le projet est configuré pour Dokploy avec le fichier `.env.dokploy`.

## 📊 Base de Données

### Schema

Les tables suivantes sont disponibles :

- `user` - Utilisateurs BetterAuth
- `session` - Sessions BetterAuth
- `account` - Comptes OAuth/Password
- `verification` - Codes de vérification
- `page` - Pages bio/offer
- `block` - Blocs de contenu
- `event` - Events d'analytics

## 🔐 Sécurité

- ✅ Middleware d'authentification sur routes privées
- ✅ Validation stricte des URLs (anti XSS)
- ✅ Rate limiting sur endpoints analytics
- ✅ Sessions sécurisées avec BetterAuth
- ✅ Protection CSRF

## 📈 Analytics

Les métriques suivantes sont trackées :

- Vues de page
- Clics sur blocs/liens
- Sources (referrer, UTM)
- Device (mobile/desktop)
- CTR (Click-Through Rate)

## 🎨 Personnalisation

### Thèmes Disponibles
- **Luxury** - Noir/or, typographie raffinée
- **Neon** - Cyberpunk, fluo, gradients

### Templates Disponibles
- **Bio Minimal** - Bio page minimaliste
- **Bio Business** - Bio page professionnelle
- **Bio Complete** - Bio page complète
- **Offer Simple** - Landing page simple
- **Offer Detailed** - Landing page détaillée

## 📝 Corrections Récentes (P0/P1)

| Issue | Description | Fichier |
|-------|-------------|---------|
| **P0-1** | BetterAuth provider corrigé (sqlite → pg) | `src/lib/auth.ts` |
| **P0-2** | Middleware d'authentification ajouté | `src/hooks.server.ts` |
| **P0-3** | Gestion d'erreurs globale | `src/hooks.server.ts` |
| **P0-4** | Analytics complétés | `src/lib/analytics/actions.ts` |
| **P1-1** | Validation URLs sécurisée | `src/routes/editor/+page.server.ts` |
| **P1-2** | Page 404 personnalisée | `src/routes/+error.svelte` |
| **P1-3** | SEO optimisé | `src/routes/[username]/+page.server.ts` |
| **P1-4** | Rate limiting implémenté | `src/lib/analytics/actions.ts` |
| **P1-5** | Métadonnées globales | `src/routes/+layout.svelte` |

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici le workflow :

1. Fork le projet
2. Crée une branche (`git checkout -b feature/AmazingFeature`)
3. Commit tes changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvre une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 🔗 Liens Utiles

- [GitHub Issues](https://github.com/A0-42-org/segre-vip/issues)
- [GitHub Repository](https://github.com/A0-42-org/segre-vip)
- [SvelteKit Documentation](https://svelte.dev/docs/kit)
- [BetterAuth Documentation](https://www.better-auth.com)
- [Drizzle ORM Documentation](https://orm.drizzle.team)

---

**Développé avec ❤️ pour les créateurs**
