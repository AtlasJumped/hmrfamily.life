# HMR kit

One file, `skin.json`, feeds the HMR dash on every HMR family site
(claudebomb.com, hmrfamily.life, universemodel.ai, endgame.life, reactionapp.life).
Push a change here and every site picks it up within about an hour (each visitor's
browser keeps a copy for one hour).

## palettes
Each palette is checked in the browser before it is offered. It must have every role
below as a lowercase 6-digit hex color, and pass contrast: text vs bg and surface 7:1,
muted and link vs bg 4.5:1, onAccent vs accent 4.5:1, onBand vs band 4.5:1, onGrad vs
each grad stop 4.5:1. A palette that fails is skipped silently.

```json
{ "id": "my-palette", "name": "My Palette", "mood": "One short line", "dark": true,
  "bg": "#0b1020", "surface": "#141a30", "surface2": "#1d2440", "line": "#2c3558",
  "text": "#f2f4ff", "muted": "#b7bdd8", "accent": "#f5b041", "accent2": "#4fd1c5",
  "accent3": "#c084fc", "onAccent": "#111111", "link": "#8fd3ff", "band": "#1d2440",
  "onBand": "#f2f4ff", "grad": ["#e0307a", "#f59e0b", "#06b6d4"], "onGrad": "#111111",
  "select": "#3a4a80" }
```

## fonts
Google Fonts only: `{ "id": "display", "name": "Display", "family": "Fraunces", "fallback": "serif", "g": "Fraunces:wght@400;700" }` (fallback: serif, sans-serif, monospace, cursive or system-ui)

## media (finished DaVinci renders)
1. Export from DaVinci Resolve: H.264 (or H.265), MP4, 1080p, under 20 MB, plus a still frame as a JPG poster.
2. Put both in `hmr-kit/media/`.
3. Add an entry: `{ "type": "video", "src": "https://hmrfamily.life/hmr-kit/media/name.mp4", "poster": "https://hmrfamily.life/hmr-kit/media/name.jpg", "title": "Title", "note": "One line" }`
   (`"type": "image"` works the same way, without a poster).
4. Push. A "New from our studio" tile appears in the dash on every site.

Bump `version` on every change.
