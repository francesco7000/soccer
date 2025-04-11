# Guida al Deployment su Netlify

Questa guida ti mostrerà come deployare la tua PWA Calcetto App su Netlify in pochi semplici passaggi.

## Prerequisiti

- Un account GitHub (gratuito)
- Un account Netlify (gratuito)

## Passaggi per il Deployment

### 1. Carica il progetto su GitHub

- Crea un nuovo repository su GitHub
- Inizializza Git nella cartella del progetto (se non è già stato fatto):
  ```
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin https://github.com/TUO-USERNAME/TUO-REPOSITORY.git
  git push -u origin main
  ```

### 2. Configura il deployment su Netlify

1. Accedi a [Netlify](https://netlify.com)
2. Clicca su "Add new site" e seleziona "Import an existing project"
3. Scegli GitHub come provider di Git
4. Seleziona il repository che hai appena creato
5. Nella configurazione di build, verifica che:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Clicca su "Deploy site"

### 3. Configura le impostazioni del dominio

1. Una volta completato il deployment, Netlify ti fornirà un URL (es. `https://tuo-sito.netlify.app`)
2. Puoi personalizzare questo URL cliccando su "Domain settings" e poi "Options" > "Edit site name"

### 4. Verifica la PWA

- Apri l'URL del tuo sito su un dispositivo mobile
- Per installare la PWA sulla home screen:
  1. Su iOS: Tocca l'icona di condivisione (il quadrato con la freccia verso l'alto) e seleziona "Aggiungi alla schermata Home"
  2. Su Android: Chrome mostrerà automaticamente un banner di installazione, oppure puoi usare il menu (tre puntini) e selezionare "Installa app"

## Funzionalità da testare

- **Installazione**: Verifica che l'app possa essere installata sulla home screen
- **Esperienza standalone**: Apri l'app dalla home screen e verifica che funzioni come un'app nativa
- **Funzionamento offline**: Attiva la modalità aereo e verifica se l'app continua a funzionare
- **Aggiornamenti**: Dopo aver fatto modifiche e rieffettuato il deployment, verifica che l'app si aggiorni correttamente

## Risoluzione dei problemi

### Problemi con il service worker

Se riscontri problemi con il funzionamento offline, verifica che:

1. Il file `sw.js` sia correttamente servito con le intestazioni appropriate
2. Puoi controllare questo nelle impostazioni di Netlify sotto "Post processing" > "Asset optimization"

### Problemi con il manifest

Se l'app non può essere installata:

1. Verifica che il manifest sia accessibile all'URL `/manifest`
2. Controlla che tutte le icone siano caricate correttamente

## Note importanti

- Netlify offre hosting gratuito con alcune limitazioni (come il numero di build al mese)
- Il file `netlify.toml` nella root del progetto contiene tutte le configurazioni necessarie per il corretto funzionamento della PWA
- Il plugin `@netlify/plugin-nextjs` è stato aggiunto alle dipendenze per gestire correttamente le applicazioni Next.js