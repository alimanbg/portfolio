# Portfolio

Personal portfolio website built with **HTML, CSS, and JavaScript** (no framework). The homepage links to separate pages for **Projects**, **Experience**, **Skills**, and **Personal**.

## Pages

- **Home**: `index.html`
- **Projects**: `projects/projects.html`
- **Experience**: `experience/experience.html`
- **Skills**: `skills/skills.html` (Three.js scene + 3D character)
- **Personal**: `personal/personal.html`

## Tech stack

- **Vanilla HTML/CSS/JS**
- **GSAP** + ScrollTrigger (animations)
- **Lenis** (smooth scrolling)
- **Three.js** (Skills page 3D scene)

## Run locally

Because this is a static site, you can open `index.html` directly. For best results (and to avoid browser module/CORS issues), run a local server:

- **VS Code**: install “Live Server”, then “Open with Live Server”
- **Python**:

```bash
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

## Project structure

```text
.
├── index.html
├── styles.css
├── script.js
├── assets/
├── projects/
├── experience/
├── skills/
└── personal/
```

## Notes

- The 3D character model used on the Skills page lives at `skills/character.glb`.
