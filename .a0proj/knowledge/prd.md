# PRD — Segre.vip (Bio pages + Offer pages, redirect-only)

## 1) Vision, objectifs, principes
### Vision
Segre.vip permet aux créateurs de centraliser leurs liens et de publier des pages “VIP” (bio + pages d’offre) qui convertissent, avec une esthétique premium/intime et une approche brand-safe (aucun contenu adulte hébergé).

### Objectifs produit
- Créer une bio page en < 5 minutes, mobile-first, rapide, belle.
- Ajouter des “offer pages” (landing pages simples) pour convertir (prise de RDV, paiement via lien, capture email).
- Mesurer la performance (clics, sources, performance des CTAs) pour itérer.

### Principes clés (très important)
- **Redirect-only payments** : Segre ne traite pas les paiements fans → créateurs.
- Les paiements se font via redirection (Stripe Payment Links, pages Stripe hébergées) et/ou via Calendly (l’utilisateur gère son setup Calendly + Stripe si besoin).
- Brand-safe : langage public neutre, politique de contenu claire, modération minimaliste (report/abuse).

***

## 2) Utilisateurs cibles & parcours
### Personas
- Créateur “social-first” : veut une page premium + tracking basique.
- Créateur “services” : veut vendre du temps (coaching, collabs, RDV) via Calendly.
- Créateur “digital” : veut un bouton “Pay” qui redirige vers Stripe Payment Links.
- (Plus tard) Manager / agence : gère plusieurs profils et templates.

### Parcours principaux
1) Onboarding → création page → publication (URL segre.vip).
2) Ajout CTAs (Calendly / Pay link / Lead capture) → tracking.
3) (Option) Migration depuis un link-in-bio existant → mise à jour structure + templates.
4) (Début) Onboarding concierge : tu aides à configurer page + 1 offer page + tracking.

***

## 3) Portée & fonctionnalités
### MVP (objectif : sortir vite, convertir, zéro paiement interne)
**Pages**
- Bio Page (1 page) : avatar/nom/bio, liens, boutons, sections, icônes socials, embed (YouTube/TikTok), CTA principal.
- Offer Page (1 page) : landing page simple orientée conversion (hero, bénéfices, preuves, FAQ, CTA).

**Blocs / composants**
- Header (avatar, nom, bio, badges).
- Link list (liens simples + “featured link”).
- CTA Button (styles, icône, tracking label).
- Embed (YouTube/TikTok/Instagram selon faisabilité).
- Testimonials (texte + nom + rôle, brand-safe).
- FAQ (accordion).
- Contact / Email opt-in (optionnel en MVP, sinon V1).

**Intégrations (redirect only)**
- Bouton Calendly : URL + label + style + ouverture nouvelle page + tracking du clic.
- Bouton Stripe Payment Link : stockage URL + label + style + tracking du clic.

**Personnalisation**
- Thèmes + palettes (Luxury / Neon).
- Typo, couleurs, background (dégradés), style “glass”.
- Branding “Powered by Segre” sur Free.

**Analytics (MVP)**
- Vues page.
- Clics totaux.
- Clics par bloc/lien/CTA.
- Sources simples (referrer/UTM basique si présent).
- Device (mobile/desktop) basique.

**Admin / modération minimum**
- Report page / report link.
- Désactivation page (admin).
- Logs basiques (audit de modifications).

**Hors scope MVP**
- Checkout natif, panier, tips, gestion TVA, marketplace.
- Hébergement de médias “adult”.
- Email automation avancée (drips), CRM complet.

***

### V1 (objectif : croissance + optimisation)
**Landing pages & tunnel léger**
- Plusieurs offer pages (ex : 5).
- Page “Thank you” (post-optin) et page “Resource” (livraison).

**Optimisation**
- Scheduling des blocs/CTAs (start/end date + timezone).
- A/B test simple (A vs B) sur une offer page (split + analytics comparatives).
- Import depuis Linktree (liens + titres + ordre) pour réduire friction.

**Tracking avancé**
- UTM builder (génération de liens trackés).
- Export CSV des analytics.
- Pixels/GA (si tu l’ajoutes) avec mécanisme de consentement cookie.

**Lead capture**
- Bloc email opt-in (stockage + export).
- Webhook (n8n/Zapier) pour envoyer les leads.

***

### V2 (objectif : “studio/agency” + écosystème)
- Multi-profils / multi-workspaces.
- Rôles & permissions (owner/admin/editor/viewer).
- Templates partagés (bibliothèque).
- Webhooks/API (événements : page_published, link_clicked, lead_created).
- White-label / domaine custom avancé (selon complexité DNS).

***

## 4) Exigences (fonctionnelles & non-fonctionnelles)
### Exigences fonctionnelles (spécifications)
**Modèle de contenu**
- Entités : User, Workspace (optionnel), Page, Block, Theme, Domain, Event.
- Block : `id`, `type`, `content`, `style`, `order`, `visible`, `schedule`, `trackingLabel`, `targetUrl`.
- Event tracking : `timestamp`, `pageId`, `blockId`, `eventType` (view/click/submit), `referrer`, `utm`, `device`, `country` (si possible), `userAgent`.

**Gestion des URLs**
- Validation stricte des URLs (anti `javascript:` et schémas non sûrs).
- Paramètres d’ouverture : same tab / new tab.
- Option “interstitial warning” (ex : “Vous allez quitter Segre.vip”).

**Domaines**
- Par défaut : `username.segre.vip` ou `segre.vip/@username`.
- Domaine custom (Pro+) : instructions DNS + vérification + SSL auto (si tu peux).

**Brand safety**
- Termes et policy : interdit de publier du contenu illégal, haine, etc.
- “Adult” : pas d’hébergement, liens sortants autorisés selon politique; wording public neutre.
- Report abuse + traitement.

### Exigences non-fonctionnelles
- Performance : pages publiques très rapides (SSR/edge cache), images optimisées, lazy-loading.
- SEO : metas OG propres, option `noindex`, URLs stables.
- Accessibilité : contrastes, focus visibles, navigation clavier basique.
- Sécurité : rate limiting login & opt-in, CSRF si nécessaire, logs d’audit.
- Conformité : privacy policy, cookies/consent si pixels/GA activés.

***

## 5) Monétisation, KPIs, roadmap, risques
### Plans & pricing (reco)
- Free : 1 bio + 1 offer page, templates de base, analytics basiques, branding Segre.
- Pro (≈19€/mo) : domaine custom, templates premium, scheduling, analytics avancés, export, pixels/GA (si activés).
- Elite (≈49€/mo) : plus de pages, multi-profils, white-label, API/webhooks, support prioritaire.
- Add-on : “Concierge setup” (one-shot) : configuration complète + 1 offer page + tracking + recommandations.

### KPIs
- Activation : page publiée + 3 liens ajoutés + 1 CTA configuré.
- Conversion : Free → Pro.
- Engagement : clics / vues, CTR du CTA principal, perf des offer pages.
- Rétention : rétention 30 jours, churn mensuel.
- Support : tickets / 100 utilisateurs.

### Roadmap (exemple)
- S1–S2 : Auth, page publique, éditeur bio (blocs), thèmes, tracking views/clicks.
- S3–S4 : Offer page (template), CTA Calendly + Stripe link, dashboard analytics, plans/paiement SaaS.
- S5–S6 : Scheduling, export CSV, import Linktree (V1), lead capture.
- S7–S10 : A/B test simple, domaines custom robustes, webhooks, pack agency (V2).

### Risques & mitigations
- Scope creep (tunnel trop complexe) → limiter à 1–3 pages + templates conversion-focused.
- Trust (TLD .vip) → pages légales, UX propre, performance, brand-safe copy.
- Compliance tracking → consent clair dès que pixels/GA arrivent.
- Abus/liens sensibles → validation URLs + report + blocage admin.

Si tu veux, je peux aussi te produire une version “Backlog Jira” directement (Epics → User stories → critères d’acceptation) à partir de ce PRD.
