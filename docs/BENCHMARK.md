# Benchmark Notes

This project is intentionally beginner-first.

## What We Learned From Stronger Writing Tools

### 1. Robust plain-text projects matter

Inspired by `novelWriter`, which emphasizes many small text documents, metadata, synopsis, and version-control-friendly project storage.

Why it matters for Story Forge Pro:

- beginners should not get locked into a fragile format
- files should remain readable even outside the app
- project folders should be easy to back up, sync, and version

### 2. Story bibles are not optional for long-form writing

Inspired by Sudowrite Story Bible updates, especially worldbuilding, unlimited characters, outline expansion, and visibility into which story elements are being used.

Why it matters for Story Forge Pro:

- beginners forget continuity quickly
- the tool must surface characters, world rules, and unresolved threads
- drafting should stay connected to planning materials

### 3. Scene-level planning beats vague chapter generation

Inspired by Sudowrite Scenes and Novelcrafter scene labels / matrix planning.

Why it matters for Story Forge Pro:

- beginners need smaller units than "write a whole chapter"
- scenes are easier to revise, reorder, and diagnose
- scene cards reduce overwhelm and improve momentum

### 4. Visual and organizational planning helps non-experts

Inspired by Novelcrafter matrix planning and import flows.

Why it matters for Story Forge Pro:

- users often have messy notes from Word or chat apps
- they need guided structure more than theory
- planning should feel like moving cards, not writing an essay about craft

### 5. Low-friction onboarding is a feature, not polish

Inspired by tools that emphasize quick start, templates, and simple entry points.

Why it matters for Story Forge Pro:

- the target user is a total beginner
- `npm start` and double-click launchers are more important than advanced controls
- every extra decision at startup increases drop-off

## Product Decisions We Took

- added `npm start` guided mode
- added double-click beginner launcher files
- added starter packs for common novel and screenplay directions
- added more explicit revision checklists and dialogue passes
- kept the project markdown-first and folder-first
