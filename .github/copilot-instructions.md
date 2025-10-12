## Quick orientation for AI coding agents

This repository is a Godot (4.5) game project named "Roses of Petial". Use this file to get up to speed quickly and produce useful, repository-aware changes.

Keep guidance concise and actionable. Prefer edits that follow existing project structure and Godot resource conventions.

### Big picture / architecture
- Godot 4.5 project configured in `project.godot`.
- Major areas:
  - `src/` — main gameplay scripts (player, party, camera, grid helpers, movement controllers).
  - `Data/` — game data and `Data/util/Database.gd` autoload (global data access).
  - `addons/` — editor and tooling plugins included (cba, gdLinter, signal_lens, simple_gdscript_formatter, steam_devkit_notifier, wingman, etc.). DO NOT modify these.
  - `Scenes/`, `Prefab/`, `Resources/` — scene and resource assets used at runtime.
  - `util/Feyscript Docs/` — domain-specific language docs (Feyscript) used by project tooling.

### Autoloads and runtime globals
- `project.godot` registers several autoloads (singletons). Important ones to reference when making code changes:
  - `SignalLens` -> `res://addons/signal_lens/autoload/signal_lens_autoload.gd`
  - `Data` -> `res://Data/util/Database.gd` (global game data access)
  - `PartyContainer` -> `res://src/party_container.gd`
  - `_Steam` -> `res://util/Steam/steam.gd`
  - `DevkitMessenger`, `SteamControllerInput` — devkit and input helpers

When modifying behavior rely on these singletons instead of recreating global state.

### Project-specific conventions / idioms
- GDScript style is idiomatic Godot 4: `class_name`, typed parameters (`Vector2i`, `float`), and `@export` for editor-set fields.
- Editor-only logic uses `Engine.is_editor_hint()` to gate editor-time behavior (see `src/DualGrid.gd`).
- Many scripts set exported node references via the inspector (e.g., `@export var leader: PlayerMovementController` in `src/party.gd`). Prefer preserving inspector-set wiring when refactoring.
- Tilemaps use atlas coords and custom tile data (see `DualGrid.gd`): be careful when changing tile coordinate logic.
- Input actions are custom (see `project.godot` input section). Use `Input.is_action_pressed("Up")` etc. rather than hard-coded keys.

### Where to look for examples
- Movement & input: `src/PlayerMovementController.gd` (controller + joystick handling) and `src/party.gd` (party speed management).
- Tilemap & editor utilities: `src/DualGrid.gd` (tile atlas usage, editor calc hooks).
- Autoload & global data: `Data/util/Database.gd` (registered as `Data` autoload in `project.godot`).
- Feyscript tooling: `util/Feyscript Docs/` and parser in `src/util/feyscript_parser.gd` (domain-specific language handling).

### Build, run, test, debug workflows
- Primary development iteration is through the Godot editor (open `project.godot` with Godot 4.5). Many assets and autoloads are editor-configured.
- There is no top-level automated test framework in the repo. For runtime verification, run scenes from the Godot editor or use headless Godot exports for CI.
- When making changes to GDScript files, run Godot and watch the editor/console for script errors. Editor-only scripts often rely on `Engine.is_editor_hint()` and will only run in-editor.

### Integration points and external dependencies
- Steam integration: `util/Steam/` and `addons/godotsteam/` — be conservative when modifying these; they interact with native extensions and platform-specific folders (`win64/`, `linux64/`, etc.).
- Editor plugins in `addons/` are used for linting, formatting, and devkit messaging. Respect their configs (e.g., `gdLinter` and `simple_gdscript_formatter`) when changing code style.

### Editing guidelines for AI patches
- Prefer small, focused patches that preserve exported fields and inspector wiring.
- When adding or renaming exported variables or nodes, update scenes that reference them or leave a clear migration note in the PR.
- For editor-time behavior, prefer `Engine.is_editor_hint()` checks and avoid running gameplay logic in the editor unless intentionally editing tools.

### Examples to cite in PRs
- If changing input handling, reference `project.godot` input actions and `src/PlayerMovementController.gd` as the canonical pattern.
- If changing global data access, reference `Data/util/Database.gd` and note it's registered as `Data` autoload.

### Quick checklist for PRs by AI agents
1. Small, focused changes. Preserve exported fields and scene wiring.
2. Run Godot editor locally to validate script compilation and editor-time behavior when applicable.
3. If you change public API (autoloads, exported names), include migration notes and update scenes or document required scene inspector updates.
4. Respect formatting and linting provided by `addons/simple_gdscript_formatter` and `gdLinter` (avoid wholesale reformatting).

---
If anything here is missing or unclear, tell me which part you'd like expanded (build/CI commands, specific file maps, or runtime flows) and I'll iterate.

### Tone and address
- Project-specific preference: when addressing the repository owner in comments, PR descriptions, or interactive prompts, refer to them as "princess", "Your Highness", or other such royal honorifics (user preference). Use respectful, concise language; avoid excessive familiarity.

### PR description / checklist template
When creating a PR on behalf of an AI patch, include this template in the PR description (fill in the sections):

```
Summary
- What changed (one-line)

Why
- Short reason for the change and the problem it fixes

Files changed
- List of important files edited and why

How to test
- Steps to reproduce; which scene to open or which small local steps to run

Quality gates
- Build: PASS/FAIL (run Godot editor to check script compile)
- Lint: PASS/FAIL (gdLinter)
- Tests: N/A (no automated tests) or PASS/FAIL

Notes
- Any migration steps, inspector wiring changes required, or potential runtime impacts

Addressing
- Please address the repository owner as "princess", "Your Highness", or other such royal honorifics when leaving comments or replies.

``` 

Use the above template for PRs generated by AI agents. Keep descriptions brief and include concrete test steps whenever possible.

### How to run / export (CLI examples)
When giving runnable commands, prefer PowerShell-friendly examples and always ask the user to replace the Godot binary path with their local install.

Replace <path-to-godot.exe> with your Godot 4.5 editor binary and run from any shell. Examples (PowerShell):

```powershell
# Open the project in the Godot editor
& "C:\path\to\Godot_v4.5-stable_win64.exe" -e --path "d:\Petial"
# Example (user's install):
& "C:\Program Files\Godot Engine\Godot_v4.5-stable_win64.exe" -e --path "d:\Petial"

# Export using an export preset defined in export_presets.cfg (preset name must match)
& "C:\path\to\Godot_v4.5-stable_win64.exe" --path "d:\Petial" --export "Windows Desktop" "d:\Petial\build\Petial.exe"
# Example (user's install):
& "C:\Program Files\Godot Engine\Godot_v4.5-stable_win64.exe" --path "d:\Petial" --export "Windows Desktop" "d:\Petial\build\Petial.exe"

# Headless export (CI-friendly)
& "C:\path\to\Godot_v4.5-stable_win64.exe" --path "d:\Petial" --headless --export "Windows Desktop" "d:\Petial\build\Petial.exe"
# Example (user's install):
& "C:\Program Files\Godot Engine\Godot_v4.5-stable_win64.exe" --path "d:\Petial" --headless --export "Windows Desktop" "d:\Petial\build\Petial.exe"
```

Notes:
- Confirm the export preset name by opening `export_presets.cfg` in the repo root.
- For quick script checks or to run small tools, open the project in the editor and watch the console for script errors — many editor-only checks require the editor runtime (see `Engine.is_editor_hint()` usage).

### Common pitfalls & patterns to watch for
These are concrete gotchas seen in the codebase; mention them in PRs when relevant.

- Inspector-wired exports: many nodes and resources are assigned in scenes via `@export` and set in the editor (e.g., `@export var leader: PlayerMovementController` in `src/party.gd`). Changing variable names or types often requires updating scene inspector references.

- Editor-only logic: `src/DualGrid.gd` uses `Engine.is_editor_hint()` extensively to run tilemap calculations in the editor. Don't try to execute those code paths in headless CI; they only run inside the editor and rely on tile custom data APIs like `get_cell_tile_data()`.

- Tile atlas coordinates: code uses `get_cell_atlas_coords()` and stores atlas X as tile id (see `DualGrid.gd::getWorldTile` and `setDisplayTile`). When editing tilesets or atlas layouts, verify `PathLayer.tile_set` assignments and atlas indices — visual bugs often come from misaligned atlas coords.

- Input actions & controller axes: `src/PlayerMovementController.gd` reads joystick axes (e.g., `Input.get_joy_axis(0, JoyAxis.JOY_AXIS_LEFT_X)`) and falls back to actions like `Up/Down/Left/Right`. Ensure input action names in `project.godot` match code expectations.

- Autoload singletons: `Data`, `PartyContainer`, `_Steam`, `SignalLens` are declared as autoloads in `project.godot`. Rely on these singletons rather than recreating global state; changing their paths or names requires updating the autoload registration.

### Example PR (filled)
Use this as a quick copy/paste example when submitting small AI-generated changes (fills the template above):

```
Summary
- Fix null-check and preserve inspector wiring in `src/util/feyscript_parser.gd`

Why
- `feyscript_parser` accessed `Data` before it was guaranteed to be initialized in editor builds. This adds a safe `Engine.is_editor_hint()` check and avoids changing exported variable names so scenes don't need re-wiring.

Files changed
- `src/util/feyscript_parser.gd` — add editor guard and null-check; small refactor to preserve exported names.

How to test
- Open `project.godot` in Godot 4.5 and open the scene that uses the Feyscript parser (or run any tool that triggers the parser in-editor) and verify there are no console errors. Run a simple parse of `test_actor_commands.fey` using the project's feyscript tools to ensure behavior unchanged.

Quality gates
- Build: PASS (open editor and confirm no script compile errors)
- Lint: PASS (run gdLinter in editor or the project's linter plugin)
- Tests: N/A (no automated tests)

Notes
- No exported variable names changed; no scene inspector updates required.

Addressing
- Please address the repository owner as "princess", "Your Highness", or other such royal honorifics when leaving comments or replies.

```
