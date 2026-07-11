# zakkig Landingpage

Landingpage und Wartelisten-Frontend für zakkig, aufgebaut mit TanStack Start, TanStack Router, React, TypeScript und Tailwind CSS.

## Projektüberblick

Die Anwendung ist eine einseitige Marketingseite mit mehreren inhaltlichen Abschnitten, zweisprachiger Oberfläche und einer Wartelisten-Formularstrecke. Der Fokus liegt auf einer klaren Präsentation des Produkts, einer direkten Kontaktaufnahme über E-Mail und einer kleinen serverseitigen Speicherung der eingetragenen Adressen.

Wichtige Bestandteile:

- Startseite mit Hero, Problem-, Lösungs- und About-Bereich
- Wartelisten-Formular mit lokaler Validierung, Server-Call und Toast-Rückmeldungen
- DE/EN-Routing mit sprachabhängigen Texten
- Serverseitige SQLite-Speicherung der Leads
- Statische Assets in `public/media`

## Projektstruktur

Die wichtigsten Ordner und Dateien:

- `src/components/` enthält die wiederverwendbaren UI-Bausteine
- `src/routes/` enthält die Datei-basierten Routes von TanStack Router
- `src/server/` enthält serverseitige Logik wie die Wartelisten-Speicherung
- `src/lib/` enthält Hilfsfunktionen wie Datenbank- und i18n-Setup
- `src/styles.css` enthält globale Styles und Animationen
- `public/media/` enthält Bilder, Logos und Videoassets

## Lokales Starten

Voraussetzung ist ein installiertes Node.js-Setup mit dem im Projekt definierten Paketmanager.

```bash
npm install
npm run dev
```

Die Anwendung läuft dann standardmäßig auf Port 3000.

## Produktions-Build

```bash
npm run build
```

Der Build erzeugt Client- und SSR-Ausgaben und prüft dabei auch die serverseitigen Teile der Anwendung.

## Verfügbare Skripte

```bash
npm run dev
npm run generate-routes
npm run build
npm run preview
npm run test
npm run lint
npm run format
npm run check
```

### Bedeutung der Skripte

- `dev` startet den lokalen Entwicklungsserver
- `generate-routes` erzeugt die Route-Definitionen aus dem Dateisystem
- `build` erstellt die Produktionsversion
- `preview` startet eine lokale Vorschau des Builds
- `test` führt die Vitest-Tests aus
- `lint` prüft den Code mit ESLint
- `format` formatiert Code mit Prettier und behebt ESLint-Probleme, soweit möglich
- `check` prüft nur die Formatierung

## Styling

Das Frontend nutzt Tailwind CSS als primäres Styling-System. Globale Stile, Schrift und Animationen liegen in `src/styles.css`.

Wichtige Punkte:

- Die Seite verwendet eine Poppins-Schriftfamilie
- Das Layout ist bewusst dark-first gehalten
- Toasts und kleine UI-Übergänge werden über eigene Keyframes animiert

## Routing

TanStack Router verwaltet die Navigation über Datei-Routing in `src/routes`.

Relevante Routen:

- `src/routes/index.tsx` für die Hauptseite
- `src/routes/impressum.tsx` für das Impressum
- `src/routes/datenschutz.tsx` für die Datenschutzerklärung
- `src/routes/en/index.tsx` für die englische Startseite
- `src/routes/en/legal.tsx` für das englische Legal Notice
- `src/routes/en/privacy.tsx` für die englische Datenschutzerklärung

Die Root-Route in `src/routes/__root.tsx` definiert das Dokument-Shell-Layout, bindet globale Styles ein und rendert den Devtools-Container.

## Wartelisten-Formular

Die Formularlogik liegt in `src/components/WaitlistForm.tsx`.

Verhalten:

- E-Mail wird vor dem Absenden getrimmt und in Kleinbuchstaben normalisiert
- Leere oder ungültige Eingaben erzeugen einen Fehler-Toast
- Erfolgreiche Einträge erzeugen einen Bestätigungs-Toast
- Doppelte E-Mails werden serverseitig abgefangen und separat gemeldet
- Toasts erscheinen oben und verschwinden mit einer sanften Exit-Animation

## Serverseitige Speicherung

Die Wartelisten-Datenbank wird in `data/waitlist.db` angelegt und nicht im Repository-Root gespeichert.

Details:

- Die DB wird in `src/lib/db.ts` initialisiert
- Der Ordner `data/` wird beim Start automatisch erstellt
- SQLite wird über `better-sqlite3` verwendet
- Die Tabelle `leads` enthält eine eindeutige `email`-Spalte

## Internationalisierung

Die Sprachlogik liegt in `src/lib/i18n.ts`.

Aktuell unterstützt:

- Deutsch
- Englisch

Die Sprache wird anhand der Route bestimmt, also etwa `/` für Deutsch und `/en` für Englisch.

## Medien und Assets

Statische Medien liegen in `public/media` und werden direkt vom Frontend referenziert.

Typische Assets sind:

- Logo-Dateien
- Hero-Video und Vorschaubild
- Illustrationen und Bildmaterial für die Abschnitte

## Qualität und Pflege

Vor Änderungen lohnt sich typischerweise:

```bash
npm run lint
npm run build
```

Wenn sich Routing-Dateien ändern, kann zusätzlich `npm run generate-routes` relevant sein.

## Hinweise zur Weiterentwicklung

- Neue Seiten sollten als neue Dateien in `src/routes/` angelegt werden
- Neue Texte sollten über die i18n-Map ergänzt werden
- Serverseitige Logik gehört nach Möglichkeit in `src/server/` oder in `.server`-Dateien
- Lokale Daten wie die SQLite-Datei bleiben in `data/` und werden nicht committed

## Technologiestack

- React 19
- TypeScript
- TanStack Start
- TanStack Router
- TanStack React Form
- Tailwind CSS
- SQLite über `better-sqlite3`

## Kurzfassung für neue Entwickler

Wenn du das Projekt zum ersten Mal öffnest, sind die wichtigsten Einstiegspunkte:

- `src/components/MainPage.tsx` für den Seitenaufbau
- `src/components/WaitlistForm.tsx` für die komplette Wartelisteninteraktion
- `src/server/waitlist.ts` für die DB-Logik
- `src/routes/__root.tsx` für das globale Layout
- `src/styles.css` für Animationen und globale Styles

## Support

Für lokale Entwicklung und Anpassungen reichen in der Regel `npm run dev`, `npm run lint` und `npm run build` aus. Weitere projektinterne Entscheidungen lassen sich direkt über die genannten Einstiegspunkte nachvollziehen.
