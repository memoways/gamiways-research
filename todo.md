# Project TODO — GamiWays Research Portal

## Analytics PostHog
- [x] Upgrade vers web-db-user (backend Express/tRPC)
- [x] Clé API PostHog ajoutée comme secret (POSTHOG_API_KEY)
- [x] Router PostHog côté serveur (proxy sécurisé, clé jamais exposée client)
- [x] Procédures tRPC pour les 3 projets (Dilemme Light 107669, Flowise 171071, AVA 137897)
- [x] Correction syntaxe HogQL (INTERVAL X DAY, toFloat au lieu de toFloat64OrNull)
- [x] Page /project/analytics avec 3 onglets (Dilemme Light / Flowise / AVA)
- [x] Sélecteur de période (30j / 90j / tout)
- [x] Granularité hebdomadaire (toStartOfWeek)
- [x] Graphiques Recharts (LineChart, BarChart, PieChart)
- [x] StatCards avec données réelles PostHog
- [x] Lien NavBar dans le menu "The Project" (Usage & Latency)
- [x] Route /project/analytics dans App.tsx
- [x] Tests vitest (posthog.ping validé)
