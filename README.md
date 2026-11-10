# AI Fluency Compass

Discover what you can do with AI—and what you can learn to do next.

A free, browser-only professional reflection for teachers, created by [Federico Orozco](https://www.federicoorozco.co). Built with Vite, React, and TypeScript. No login, backend, AI API, analytics, or paid service. Fonts are bundled locally.

## Run locally

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the local address printed by Vite (normally `http://127.0.0.1:5173`). To check the production build:

```sh
npm run build
npm run preview
```

## What works

- Welcome → classroom pathway → five-question self-check → two unscored classroom reflections → five-domain profile → chosen next step.
- Thirty original descriptors; three pathways with six concrete classroom landmarks each.
- Editable answers, formative scenario feedback, interactive continuum, and methodology with references.
- Teacher-selected growth domain, contextual prompt, review checklist, and learning-focused reflection.
- Copyable profile and prompt, manual-copy fallback, and dedicated print / save-as-PDF layout.
- Local answer persistence with validated restoration and an explicit reset. If storage is unavailable, the current tab still works.
- Native radio groups, keyboard focus, responsive layouts, semantic landmarks, and reduced-motion support.

## Edit the instructional content

| File                      | Content                                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `src/data/framework.ts`   | Six levels, five domain questions, 30 Can-Do descriptors, domain activities, prompt instructions                     |
| `src/data/pathways.ts`    | Three pathways, 18 classroom landmarks, next actions, prompts, domain applications, checklists, reflection questions |
| `src/data/scenarios.ts`   | Two situations per pathway, action choices, constructive feedback                                                    |
| `src/data/methodology.ts` | Methodology, limitations, independence statement, source links                                                       |
| `src/model.ts`            | Validated local state, direct self-placement, prompt and summary generation                                          |
| `src/styles.css`          | Design tokens, responsive presentation, print stylesheet                                                             |

The descriptor at index 0 corresponds to Level 1; index 5 corresponds to Level 6. Each selected descriptor directly determines that domain’s level. There are no statistical weights, overall scores, AI evaluations, or scenario-based score adjustments. At Level 6 the next step deepens practice; there is no Level 7. Future performance-based evidence should use a separately versioned model rather than silently changing this self-placement contract.

## Test

```sh
npm test
npm run build
```

The automated tests verify all 7,776 possible complete five-domain profiles, scenario independence, invalid saved-state recovery, content coverage, pathway-specific exports, and the Level 6 boundary.

For browser acceptance, test the complete journey for all three pathways, change an answer using Back, refresh mid-reflection, explore each landmark, select another growth domain, copy a prompt and full summary, print/save a profile, and reset. Repeat at phone and laptop widths, using a keyboard and screen reader. Check that scenarios never alter the five selected levels. Automated tests do not establish full accessibility conformance.

## Deploy to GitHub Pages

The CI workflow tests and builds every push to `main` and every pull request. A separate, manually triggered Pages workflow tests, builds, and deploys the static `dist/` folder. This keeps initial CI healthy before Pages is configured.

1. Push this project to `LenguajeLabs-design/AI-Fluency-Compass`.
2. In the repository’s **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source. This is a one-time repository setting.
3. Run **Check and deploy GitHub Pages → Run workflow** from the Actions tab. Run it again when you want to deploy later changes.

The expected URL after a successful deployment is `https://lenguajelabs-design.github.io/AI-Fluency-Compass/`. The workflow sets `BASE_PATH=/AI-Fluency-Compass/`. If you rename the repository, update this path. A custom domain generally uses `BASE_PATH=/`.

## Deploy to Netlify

Import the GitHub repository into Netlify. `netlify.toml` supplies `npm run build`, `dist`, and Node 24. Leave `BASE_PATH` unset for a root deployment. Alternatively, build locally and upload the contents of `dist/` to Netlify. No runtime environment variables or API keys are needed.

## Privacy, scope, and limitations

Answers remain in this browser’s local storage under `ai-fluency-compass:v1`; nothing is sent to an assessment server. Reset removes and replaces this key with an empty reflection. Copies and saved PDFs contain the teacher’s own choices; sharing them is optional. Deployment providers may maintain ordinary hosting access logs, but the app has no analytics or answer transmission.

This is an original, unvalidated **provisional self-reflection profile**, not a certification or proficiency test. It is independent of WIDA, UNESCO, and other framework publishers. Use it for reflection and professional conversation, not teacher ranking or employment decisions. The methodology page distinguishes inspiration and related research from validation.

Examples use fictional contexts. External AI prompts must be used in accordance with school policy; do not enter student names, identifiable records, grades, or real student work. Suggestions need teacher review. AI may be unnecessary or inappropriate. Copy access depends on the browser; the app provides a manual fallback. Print pagination varies by browser and paper settings. Local storage is device- and origin-specific, so choices will not synchronize or automatically transfer from preview to a deployed site.
