# Damage

Damage in Feyscript is a fundamental aspect of gameplay, affecting characters' health and status. This document outlines the various types of damage, how they are calculated, and their effects on characters.

## Types of Damage

1. **Physical Damage**: This is the most common type of damage, resulting from physical attacks such as slashes, strikes, and blunt force trauma. It can be mitigated by armor and physical resistances.
2. **Magical Damage**: This type of damage is inflicted through magical spells and abilities. It often bypasses physical armor but can be reduced by magical resistances and wards.
3. **Elemental Damage**: This includes damage types such as fire, ice, lightning, and poison. Each elemental type may have specific resistances or vulnerabilities associated with it. Elemental damage is a modifier on top of physical or magical damage.
4. **True Damage**: This type of damage ignores all forms of resistance and armor, dealing a fixed amount of damage directly to the target's health.
5. **Status Damage**: This includes damage over time effects such as bleeding, burning, or poison. These effects can stack and may have additional consequences beyond just health reduction.

## Damage Calculation

Damage in Feyscript is calculated using a combination of the attacker's damage output and the defender's resistances. The basic formula is as follows:

```
