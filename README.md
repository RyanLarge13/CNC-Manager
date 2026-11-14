# CNC Manager

A React and TypeScript PWA for the CNC shop queue. The first version shows
12 fictional blocks across two jobs. Workflow tabs filter the same block
records, so a block awaiting stock cut and programming appears in both tabs.

## Local development

Use the Node version in `.nvmrc`.

```sh
npm ci
npm run dev
```

## Production build and PWA check

```sh
npm run build
npm run preview
```

Open the preview on localhost in a PWA-capable browser. Install CNC Manager
from the browser after the service worker activates. Switch the browser offline,
then reopen the app and check that the queue loads. Use the preview build for
service worker checks. The development server is for ordinary UI iteration.

The service worker caches the app shell, including the bundled mock data.
The queue is read-only. PDF buttons are disabled until drawings are available.
