# Damage

([Back to Index](../README.md#commands))  
([Back to Battle Commands](../README.md#battle-specific-commands))

Damage in Feyscript is a fundamental aspect of gameplay, affecting characters' health and status. This document outlines the various types of damage, how they are calculated, and their effects on characters.

## Types of Damage

1. **Physical Damage**: This is the most common type of damage, resulting from physical attacks such as slashes, strikes, and blunt force trauma. It can be mitigated by armor and physical resistances.
2. **Magical Damage**: This type of damage is inflicted through magical spells and abilities. It often bypasses physical armor but can be reduced by magical resistances and wards.
3. **Elemental Damage**: This includes damage types such as fire, ice, lightning, and poison. Each elemental type may have specific resistances or vulnerabilities associated with it. Elemental damage is a modifier on top of physical or magical damage.
4. **True Damage**: This type of damage ignores all forms of resistance and armor, dealing a fixed amount of damage directly to the target's health.
5. **Status Damage**: This includes damage over time effects such as bleeding, burning, or poison. These effects can stack and may have additional consequences beyond just health reduction.

## Damage Calculation

Damage in Feyscript is calculated using a combination of the attacker's damage output and the defender's resistances. The basic formula is as follows:

$` \boxed{\large{\textcolor{#ff4040}{\text{Damage}} = \textcolor{#00ff00}{\text{Attack}}^2 \times \left( \frac{C}{C + {\textcolor{#8080ff}{\text{Defense}}}^{1.5}}\right) \times \underbrace{ \color{orange}{\text{Resistances}}\color{white}\left[ \color{pink}{\text{Element}}\color{white}\right] \left(^{1.5}_{0.\overline{6}}\right) \times \color{#ffff00}{\text{Critical Chance}} \color{white}\left(^{2}_{1}\right) \times \color{purple}{\text{Random Multiplier} \color{white}{\left(^{1.1}_{0.9}\right)}}}_\text{Modifiers}}}`$

Inflict damage on a target. `damage` is commonly used during battles to reduce HP; it supports modifiers such as element, chance, and duration for status effects.

## AI / Usage

Enemy AI commonly uses `damage` indirectly (via higher-level attack/skill primitives). When used directly by AI scripts, consider it a low-level effect that the engine applies to the chosen target after decision-making and target selection.

## Syntax

```feyscript
damage <target> <type (physical|magical|flat)> <power> [as <element>] [chance <percent>] [flat <true|false>]
```

## Parameters

- `<target>` — the target identifier (actor id, enemy id, `target`, or `self`).
- `<type (physical|magical|flat)>` — type of damage: `physical`, `magical`, or `flat` (true damage).
- `<power>` — numeric power amount (can be an expression).
- `as <element>` — optional: element type (for example `fire`, `ice`) which may interact with resistances.
- `chance <percent>` — optional: percentage chance the damage applies (0–100).
- `flat <true|false>` — optional: if `true`, applies flat damage, bypassing calculations; if `false` or omitted, damage is calculated normally.

## Examples

```feyscript
# Deal 30 fire magical damage to the target
damage target magical 30 as fire
```

```feyscript
# 50% chance to deal 100 flat (true) damage
damage boss flat 100 chance 50
```

```feyscript
# Deal 20 flat damage to self
damage self flat 20
```

## Notes

- Damage handling (HP reduction, death triggers) depends on the runtime's battle system.
- Use `apply` for status effects that modify behavior (poisoned, stunned) rather than direct damage when appropriate.

## See also

- [**apply**](apply.md) — apply status effects
- [**heal**](heal.md) — restore HP to targets
- [**setturn**](setturn.md) — control battle turn order


