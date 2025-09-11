//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.52;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.52] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * EXAMPLE:
 * 
 * - The new state: "Fiery Blade" will allow the affected battler to deal fire
 * elemental damage. With Action End, this means for 5 actions, those attacks
 * will deal fire damage.
 * 
 * - This means that if no action is taken, due to a status effect like "Sleep"
 * or "Stun", then the duration count will not decrease.
 * 
 * - On the flip side, if the battler performs multiple actions a turn, then
 * the duration count drops faster because more actions have been spent.
 * 
 * - However, if this "Fiery Blade" state was using Turn End instead, it will
 * have its duration reduced by 1 each turn, regardless of "Sleep" or "Stun"
 * states, and regardless of how many actions are performed each turn.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Skill Notetags
 * - Used for Scene_Skill.
 * - Changes sorting priority by ID for skills to 'x'. 
 *   - Default priority level is '50'.
 * - Skills with higher priority values will be sorted higher up on the list
 *   while lower values will be lower on the list.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Even non-consumable items will be consumed.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Bypass State Damage Removal: id>
 * <Bypass State Damage Removal: id, id, id>
 * 
 * <Bypass State Damage Removal: name>
 * <Bypass State Damage Removal: name, name, name>
 * 
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used to attack an enemy with the listed state that
 *   would normally have on damage removal (ie Sleep).
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for attacks like "Dream Eater" that would prevent waking
 *   up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Attacker: id>
 * <Bypass State Damage Removal as Attacker: id, id, id>
 * 
 * <Bypass State Damage Removal as Attacker: name>
 * <Bypass State Damage Removal as Attacker: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When an attacker with an associated trait object that has this notetag
 *   would attack an enemy with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Sleep Striker" that would prevent the
 *   attacker from waking up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Target: id>
 * <Bypass State Damage Removal as Target: id, id, id>
 * 
 * <Bypass State Damage Removal as Target: name>
 * <Bypass State Damage Removal as Target: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When a target with an associated trait object that has this notetag is
 *   attacked as the target with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Deep Sleep" that would prevent the
 *   attacked target from waking up.
 * 
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 * 
 * === Skill Toggle Notetags ===
 * 
 * Skill Toggles are skills that can be toggled ON or OFF. If ON, then any
 * passive states on that skill will become enabled (assuming all other passive
 * conditions are met) and if toggled OFF, then that passive state will not
 * appear (even if all other conditions are met).
 * 
 * Skill Toggles do not take up actions, even in battle. They will not consume
 * an actor's current turn. A player can toggle multiple skill toggles at a
 * time.
 * 
 * Skill Toggles require the character to pay the skill cost ONLY when the
 * skill is toggled from OFF to ON, not when it is toggled ON to OFF.
 * 
 * Enemies are unable to switch Toggle Skills and the passive effects on a
 * Toggle Skill for an enemy will always be considered ON.
 * 
 * Otherwise, you can use JavaScript calls like the following for script call
 * checks, and the like:
 * 
 *   $gameActors.actor(2).isSkillToggled($dataSkills[3])
 * 
 * ---
 * 
 * <Toggle>
 * 
 * - Used for: Skill Notetags
 * - Turns the skill into a toggle skill.
 * - Best used with a passive state.
 * - Toggle skills cannot be used with certain skill effects:
 *   - Active Chain Skills, Evolution Matrix Skills, Input Combo Skills
 *   - Field Skills
 *   - Item Amplify Skills, Item Concoct Skills, Item Throw Skills
 *   - Toggle skills cannot be Skill Containers
 * 
 * ---
 * 
 * <Initial Toggle: On>
 * <Initial Toggle: Off>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - Sets the initial toggle for this skill to be ON/OFF.
 *   - aka when an actor learns the skill for the first time and this
 *     determines what toggle it will have
 * - If this notetag is not used, refer to the setting found in the
 *   Plugin Parameters
 * 
 * ---
 * 
 * <Toggle Exclusion Group: key>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When this skill is toggled, all other toggle skills with a matching 'key'
 *   will be turned off.
 *   - For example, the skills Fire Force, Ice Force, and Thunder Force have
 *     the <Toggle Exclusion Group: Force> notetag.
 *   - When Fire Force is toggled ON, then Ice Force and Thunder Force will
 *     automatically turn OFF.
 * - Replace 'key' with a toggle exclusion group name for this skill to use.
 * 
 * ---
 * 
 * <Toggle On Animation: x>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When a skill is turned off, this is the animation that plays.
 * - If this notetag is not used, refer to the skill's animation.
 * - Replace 'x' with a number representing the ID of the animation to play
 *   when the skill is toggled on.
 * 
 * ---
 * 
 * <Toggle Off Animation: x>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When a skill is turned off, this is the animation that plays.
 * - If this notetag is not used, refer to the Plugin Parameters' animation.
 * - Replace 'x' with a number representing the ID of the animation to play
 *   when the skill is toggled off.
 * 
 * ---
 * 
 * === Aura & Miasma Notetags ===
 * 
 * Auras are a type passive that affects an allied party. Miasmas are a type of
 * passive that affects an opposing party. Auras and Miasmas only need to come
 * from a single source to give an entire party or troop a passive provided
 * that the battler emitting the aura/miasma is alive and in battle.
 * 
 * ---
 * 
 * <Aura State: x>
 * <Aura States: x, x, x>
 * 
 * <Aura State: name>
 * <Aura States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an aura that affects the battler's allies and gives each affected
 *   member passive state(s) 'x'.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this aura.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this aura.
 * - Note: If you plan on applying an aura effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Miasma State: x>
 * <Miasma States: x, x, x>
 * 
 * <Miasma State: name>
 * <Miasma States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an miasma that affects the battler's opponents and gives each
 *   affected member passive state(s) 'x'.
 * - Miasmas do NOT apply outside of battle.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this miasma.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this miasma.
 * - Note: If you plan on applying a miasma effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Not User Aura>
 * <Aura Not For User>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Prevents the emitting user from being affected by the related aura.
 * 
 * ---
 * 
 * <Allow Dead Aura>
 * <Allow Dead Miasma>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to continue emitting even after the emitting user is
 *   in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 * - Takes priority over <Dead Aura Only> and <Dead Miasma Only> notetags.
 * 
 * ---
 * 
 * <Dead Aura Only>
 * <Dead Miasma Only>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to only emit if the emitting user is in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Skill Cost Plugin Commands ===
 * 
 * ---
 * 
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * - 
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * - 
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * === State Turns Plugin Commands ===
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Sort: Alphabetical:
 *   - Insert the ID's of Skill Types you want sorted alphabetically.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Toggle Settings
 * ============================================================================
 *
 * Skill toggles are a new type of skill. They do not perform any actions but
 * instead, will switch on/off any passive effects the skill has.
 * 
 * Skill Toggles do not take up actions, even in battle. They will not consume
 * an actor's current turn. A player can toggle multiple skill toggles at a
 * time.
 * 
 * Skill Toggles require the character to pay the skill cost ONLY when the
 * skill is toggled from OFF to ON, not when it is toggled ON to OFF.
 * 
 * Enemies are unable to switch Toggle Skills and the passive effects on a
 * Toggle Skill for an enemy will always be considered ON.
 *
 * ---
 *
 * Default
 * 
 *   Default Toggle:
 *   - What is the default toggle setting for toggle skills?
 * 
 *   Toggle Off Animation:
 *   - Play this animation when a skill is toggled off.
 *   - Requires VisuMZ_0_CoreEngine.
 *   - Toggle On animation by default is whatever the skill animation is set to
 * 
 * ---
 * 
 * Appearance
 * 
 *   Toggle On Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Applies for skill name, not the skill cost
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Toggle Type:
 *   - Skill toggle displayed in the status window.
 * 
 *   Toggle On:
 *   - Text displayed for a skill that's toggled on
 * 
 *   Toggle Off:
 *   - Text displayed for a skill that's toggled off
 * 
 *     Off Text Location:
 *     - Where is the [OFF] text located in the skill cost?
 *       - front
 *       - back
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - Refer to "Major Changes" in Help File for explanation.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.53: September 18, 2025
 * * Bug Fixes!
 * ** Fixed a bug where the "Preset: Gauge Color" Plugin Parameter was not
 *    accepting #rrggbb values. Fix made by Arisu.
 * 
 * Version 1.52: August 14, 2025
 * * Feature Update!
 * ** Passive States with custom JS conditions should be less prone to infinite
 *    loops. Update made by Irina.
 * 
 * Version 1.51: April 17, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > Skill Toggle Settings
 * **** Skill toggles are a new type of skill. They do not perform any actions
 *      but instead, will switch on/off any passive effects the skill has.
 * **** Enemies are unable to switch Toggle Skills and the passive effects on a
 *      Toggle Skill for an enemy will always be considered ON.
 * **** See the help file for more information.
 * ** New Notetags added by Olivia:
 * *** Skill Toggle Notetags:
 * **** <Toggle>
 * **** <Initial Toggle: On/Off>
 * **** <Toggle Exclusion Group: key>
 * **** <Toggle On Animation: x>
 * **** <Toggle Off Animation: x>
 * ***** See the help file for more information.
 * 
 * Version 1.50: March 20, 2025
 * * Documentation Update!
 * ** Changed the description of Plugin Parameter 'Action End Update' to
 *    'Refer to "Major Changes" in Help File for explanation.'
 * ** Added examples of "Action End Update" under "Major Changes"
 * *** The new state: "Fiery Blade" will allow the affected battler to deal
 *     fire elemental damage. With Action End, this means for 5 actions, those
 *     attacks will deal fire damage.
 * *** This means that if no action is taken, due to a status effect like
 *     "Sleep" or "Stun", then the duration count will not decrease.
 * *** On the flip side, if the battler performs multiple actions a turn, then
 *     the duration count drops faster because more actions have been spent.
 * *** However, if this "Fiery Blade" state was using Turn End instead, it will
 *     have its duration reduced by 1 each turn, regardless of "Sleep" or
 *     "Stun" states, and regardless of how many actions are performed each
 *     turn.
 * 
 * Version 1.49: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a bug where causing a dead battler to refresh afterwards would
 *    yield multiple death states on that battler. Fix made by Arisu.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.48: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Auras & Miasmas added by Olivia:
 * *** Auras are a type passive that affects an allied party. Miasmas are a
 *     type of passive that affects an opposing party. Auras and Miasmas only
 *     need to come from a single source to give an entire party or troop a
 *     passive provided that the battler emitting the aura/miasma is alive and
 *     in battle.
 * ** New Notetags added by Olivia:
 * *** <Aura State: x>
 * **** Emits an aura that affects the battler's allies and gives each affected
 *      member passive state(s) 'x'.
 * *** <Miasma State: x>
 * **** Emits an aura that affects the battler's opponents and gives each
 *      affected member passive state(s) 'x'.
 * *** <Not User Aura>
 * **** Prevents the emitting user from being affected by the related aura.
 * *** <Allow Dead Aura>
 * *** <Allow Dead Miasma>
 * **** Allows aura/miasma to continue emitting even after the emitting user is
 *      in a dead state.
 * *** <Dead Aura Only>
 * *** <Dead Miasma Only>
 * **** Allows aura/miasma to only emit if the emitting user is in a dead state
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.47: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Bypass State Damage Removal: id/name>
 * **** When this skill/item is used to attack an enemy with the listed state
 *      that would normally have on damage removal (ie Sleep).
 * **** This can be used for attacks like "Dream Eater" that would prevent
 *      waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Attacker: id/name>
 * **** When an attacker with an associated trait object that has this notetag
 *      would attack an enemy with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Sleep Striker" that would prevent
 *      the attacker from waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Target: id/name>
 * **** When a target with an associated trait object that has this notetag is
 *      attacked as the target with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Deep Sleep" that would prevent the
 *      attacked target from waking up.
 * 
 * Version 1.46: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Skill Settings > Skill Types > Sort: Alphabetical
 * **** Insert the ID's of Skill Types you want sorted alphabetically.
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Skill.
 * **** Changes sorting priority by ID for skill to 'x'. 
 * **** Default priority level is '50'.
 * **** Skills with higher priority values will be sorted higher up on the list
 *      while lower values will be lower on the list.
 * 
 * Version 1.45: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem with passive state conditional notetags not working
 *    properly. Fix made by Irina.
 * 
 * Version 1.44: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where passive states would not appear. Fix made by Olivia.
 * ** Fixed a bug where a crash would occur if certain plugins cleared the
 *    passive state cache midway through trying to register it. Fix by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** States with lots and lots of text data within their notes will no longer
 *    cause FPS drops.
 * 
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Toggles:struct
 * @text Skill Toggle Settings
 * @parent Skills:struct
 * @type struct<Toggles>
 * @desc Settings in regards to how skill toggles function.
 * @default {"Default":"","DefaultToggle:eval":"true","ToggleOffAnimationID:num":"62","Appear":"","ToggleOnTextColor:str":"24","Vocab":"","ToggleType:str":"Toggle","ToggleOn:str":"\\FS[22]\\C[0][ON]","ToggleOff:str":"\\FS[22]\\C[8][OFF]","ToggleOffLocation:str":"back"}
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param SortSkillTypesAbc:arraynum
 * @text Sort: Alphabetical
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of Skill Types you want sorted alphabetically.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Toggle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Toggles:
 *
 * @param Default
 *
 * @param DefaultToggle:eval
 * @text Default Toggle
 * @parent Default
 * @type boolean
 * @on ON
 * @off OFF
 * @desc What is the default toggle setting for toggle skills?
 * @default true
 *
 * @param ToggleOffAnimationID:num
 * @text Toggle Off Animation
 * @parent Default
 * @type animation
 * @desc Play this animation when a skill is toggled off.
 * Requires VisuMZ_0_CoreEngine.
 * @default 62
 *
 * @param Appear
 * @text Appearance
 *
 * @param ToggleOnTextColor:str
 * @text Toggle On Text Color
 * @parent Appear
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param ToggleType:str
 * @text Toggle Type
 * @parent Vocab
 * @desc Skill toggle displayed in the status window.
 * @default Toggle
 *
 * @param ToggleOn:str
 * @text Toggle On
 * @parent Vocab
 * @desc Text displayed for a skill that's toggled on
 * @default \FS[22]\C[0][ON]
 *
 * @param ToggleOff:str
 * @text Toggle Off
 * @parent Vocab
 * @desc Text displayed for a skill that's toggled off
 * @default \FS[22]\C[8][OFF]
 *
 * @param ToggleOffLocation:str
 * @text Off Text Location
 * @parent ToggleOff:str
 * @type select
 * @option front
 * @option back
 * @desc Where is the [OFF] text located in the skill cost?
 * @default back
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:str
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc Refer to "Major Changes" in Help File for explanation.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x236293=_0x8acc;(function(_0x573f2e,_0x5cc882){const _0x4621d4=_0x8acc,_0x24598b=_0x573f2e();while(!![]){try{const _0x7deb48=-parseInt(_0x4621d4(0x2bb))/0x1+-parseInt(_0x4621d4(0x28d))/0x2+-parseInt(_0x4621d4(0x395))/0x3+-parseInt(_0x4621d4(0x28b))/0x4*(-parseInt(_0x4621d4(0x293))/0x5)+parseInt(_0x4621d4(0x2dc))/0x6+parseInt(_0x4621d4(0x26f))/0x7*(parseInt(_0x4621d4(0x39b))/0x8)+-parseInt(_0x4621d4(0x1ae))/0x9*(-parseInt(_0x4621d4(0x3a1))/0xa);if(_0x7deb48===_0x5cc882)break;else _0x24598b['push'](_0x24598b['shift']());}catch(_0x2913ed){_0x24598b['push'](_0x24598b['shift']());}}}(_0x824d,0xbd0bc));var label=_0x236293(0x37b),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x236293(0x1e7)](function(_0x142fb5){const _0x110bca=_0x236293;return _0x142fb5['status']&&_0x142fb5['description'][_0x110bca(0x31f)]('['+label+']');})[0x0];function _0x8acc(_0x20e31c,_0x5eb83f){const _0x824de3=_0x824d();return _0x8acc=function(_0x8accf5,_0x153427){_0x8accf5=_0x8accf5-0x9f;let _0x41a368=_0x824de3[_0x8accf5];return _0x41a368;},_0x8acc(_0x20e31c,_0x5eb83f);}function _0x824d(){const _0x442206=['clearStateDisplay','CanPayJS','MatchLabelGaugeColor','SkillConditionJS','<member-%1>','slice','localeCompare','onSkillToggle','onEraseDebuffGlobalJS','addBuff','Game_Actor_skillTypes','onExpireBuff','onEraseBuff','totalStateCategory','PassiveConditionJS','Window_Base_createAllSkillCostText_Toggle','skillTypeWindowRect','buffIconIndex','Scene_Skill_itemWindowRect','onEraseBuffJS','Armor-%1-%2','_colorCache','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','120424vOlriw','innerWidth','457496oNDPHK','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','FieldSkill','canUse','Window_SkillList_includes','ActorIDs','25FSMtMm','Scene_Battle_onSkillOk_Toggle','push','ShowShopStatus','alterSkillName','Game_BattlerBase_meetsSkillConditions','EnableLayout','applyStateTurnManipulationEffects','drawIcon','_animationIndex','PassiveStates','_commandNameWindow','ConvertParams','Game_BattlerBase_addNewState','skillTpCost','_checkingVisuMzPassiveStateObjects','learnSkill','skillVisibleJS','Global','scrollTo','allSwitchOn','active','_cache_isToggleSkill','PayJS','ColorBuff','setStateTurns','_cache_getAuraPassiveStatesFromObj','changeTextColor','toUpperCase','Game_Battler_addDebuff','PresetLabelGaugeColor','drawActorStateData','isBuffOrDebuffAffected','States','none','description','ValueOutlineSolid','_buffTurns','stateCategoriesResisted','_bypassRemoveStateDamage_value','754544gSqGeQ','adjustSkillCost','getPassiveStatesFromObj','onAddStateJS','Window_SkillList_updateHelp','Parse_Notetags_State_Category','standardIconWidth','shopStatusWindowRectSkillsStatesCore','iconIndex','anchor','convertTargetToStateOriginKey','executeHpDamage','placeExactGauge','ToggleOn','labelFontFace','Game_Battler_addState','applyBuffTurnManipulationEffects','TurnOffsetX','onExpireStateJS','drawActorStateTurns','isGroupDefeatStateAffected','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','mainAreaTop','Game_Battler_regenerateAll','ForcedChainSkill','uiHelpPosition','SkillContainers','target','slipTp','frameCount','onEraseBuffGlobalJS','stateColor','getColorDataFromPluginParameters','2364900GRfUcw','version','valueFontFace','iconWidth','uiInputPosition','SkillEnemyPaySkillCost','Scene_Skill_statusWindowRect','clamp','getCurrentStateActiveUser','index','setBackgroundType','registerCommand','Scene_Boot_onDatabaseLoaded','Game_BattlerBase_traitsSet','meetsSkillConditionsGlobalJS','isMaxDebuffAffected','isActor','ToggleType','boxWidth','ParseAllNotetags','makeSuccess','initMembers','hasStateCategory','Gauge','ParseSkillChangessIntoData','_hidden','_currentTroopUniqueID','createShopStatusWindow','DataOffsetX','format','POSITIVE','labelOutlineColor','onAddBuffGlobalJS','back','changePaintOpacity','eraseBuff','Parse_Notetags_State_SlipEffectJS','InputComboSkills','NUM','setupSkillsStatesCore','SortByIDandPriorityUsingIDs','isStateAddable','Class-%1-%2','labelColor','Window_SkillType_initialize','enemy','onEraseDebuffJS','action','process_VisuMZ_SkillsStatesCore_State_Notetags','getClassIdWithName','hasState','overwriteBuffTurns','applySkillsStatesCoreEffects','_battler','currentValue','ParseClassIDs','Game_BattlerBase_eraseBuff','testApply','DisplayedParams','process_VisuMZ_SkillsStatesCore_CheckForAuras','drawParamText','_cache_getPassiveStatesFromObj','AmplifyWith','onEraseStateJS','ParseSkillNotetags','placeGauge','NEGATIVE','includes','%1-%2-%3','Game_BattlerBase_refresh','Scene_Skill_helpWindowRect','rgba(0,\x200,\x200,\x200)','LabelFontMainType','skillTypes','debuffColor','CalcJS','Sprite_StateIcon_updateFrame','paramBuffRate','statePassiveConditionJS','onRegenerateCustomStateDamageOverTime','isToggleSkill','isSkillToggled','ActionEndUpdate','MAXHP','removeBuff','setBuffTurns','anySwitchOff','_stored_debuffColor','chanceByDamage','Sprite_Gauge_currentValue','Window_SkillList_setActor','AURA_SYSTEM_ENABLED','updateVisibility','GroupDigits','ActiveChainSkills','GaugeMaxJS','ATK','addPassiveStates','windowPadding','VisuMZ_3_ItemAmplifySkills','onChange','StackDebuffMax','Game_Actor_learnSkill','_cache_getPassiveStateConditionClassesData','playEquip','textColor','getStateData','mainFontFace','Game_BattlerBase_die','_currentActor','members','onExpireState','commandName','bitmap','Scene_Skill_skillTypeWindowRect','canSortSkillTypeList','valueOutlineColor','LearnedMatrix','checkSkillTypeMatch','SkillSceneAdjustSkillList','applyStateCategoryRemovalEffects','center','match','makeAdditionalSkillCostText','useDigitGrouping','drawActorIcons','SortByIDandPriority','aliveMembers','_skillIDs','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','Window_SkillList_drawItem','isSkill','Window_SkillList_maxCols','iconText','currentClass','getStateRetainType','skillTypeWindowRectSkillsStatesCore','isBuffAffected','shift','mainCommandWidth','magicSkills','onAddState','opacity','labelFontSize','sortSkillList','StateTurnsEnemyChangeBy','keys','ShowData','Game_BattlerBase_states','Skills','LabelOutlineWidth','isConfused','createSkillCostText','gainMp','VisuMZ_3_ItemThrowSkills','addPassiveStatesByPluginParameters','_prevPassiveJsFrameCount','process_VisuMZ_SkillsStatesCore_Skill_Notetags','Parse_Notetags_Skill_JS','SkillsStatesCore','ignore','ValueFontMainType','debuffTurns','ANY','mainAreaHeight','makeCurrentTroopUniqueID','getSkillChangesFromState','mpDamage','friendsUnit','retrieveStateColor','isLearnedSkill','isUseSkillsStatesCoreUpdatedLayout','getPassiveStateConditionSwitchData','skillEnableJS','LayoutStyle','ItemConcoctSkills','Window_StatusBase_drawActorIcons','skillMpCost','outlineColor','setDebuffTurns','Game_BattlerBase_resetStateCounts','height','redrawSkillsStatesCore','split','isUseModernControls','842274wcDrNj','valueFontSize','equipPassives','isBottomHelpMode','front','toggleType','5546192PmWNXd','_skills','_checkingPassiveStates','VisuMZ_2_ClassChangeSystem','sortPriority','rgba(0,\x200,\x200,\x201)','60bgupYb','Game_BattlerBase_skillMpCost','Toggles','setup','drawTextEx','setStateRetainType','isSkillUsableForAutoBattle','paySkillCost','maxSlipDamage','_skillToggle','skills','_toggleSkillColor','stateEraseJS','_lastStatesActionEndFrameCount','icon','process_VisuMZ_SkillsStatesCore_Notetags','traitsSet','Parse_Notetags_Skill_Cost','value','_prevPassiveJsCounter','[ON]','anySwitchOn','ToggleOffLocation','remove','auraStateIDs','helpAreaTop','slipHp','stepsForTurn','isStateCategoryAffected','isSkillHidden','gaugeBackColor','animationId','setItem','width','AvailableMatrix','map','checkSkillConditionsSwitchNotetags','%1\x20%2\x20%3','initMembersSkillsStatesCore','Sprite_Gauge_setup','EVAL','TurnOffsetY','\x5cI[%1]%2','setSkillToggle','drawActorBuffTurns','Game_BattlerBase_recoverAll','_stateIDs','refresh','_stypeIDs','allIcons','hasSkill','statusWidth','CheckBypassRemoveStatesByDamage','SkillSceneStatusBgType','bypassRemoveStatesByDamage','clearStateData','commandStyle','damage','_bypassRemoveStateDamage_action','maxItems','ItemAmplifySkills','ShowJS','isDead','Parse_Notetags_Skill_Sorting','onExpireStateCustomJS','stateMaximumTurns','canChangeSkillsThroughStateEffects','fontFace','onAddBuff','_scene','addChild','contents','loadBitmap','drawItemStyleIcon','Sprite_Gauge_redraw','initialize','_cache_toggleExclusionGroups','_data','Name','ToggleOffAnimationID','getPassiveStateConditionClassesData','shopStatusWindowRect','refreshAllMembers','\x5cFS[22]\x5cC[8][OFF]','prototype','recalculateSlipDamageJS','log','_tempActor','isMaxBuffAffected','addStateTurns','_costSettings','Sprite_Gauge_initMembers','mainFontSize','gaugeColor2','toggleOff','buttonAssistSwitch','Game_BattlerBase_buffIconIndex','miasmaStateIDs','FUNC','makeResistedStateCategories','onEraseStateGlobalJS','parameters','getStypeIdWithName','isStateResist','drawActorBuffRates','isTargetBypassRemoveStatesByDamage','meetsPassiveStateConditions','onDatabaseLoaded','constructor','createItemWindow','gaugeColor1','Game_BattlerBase_initMembers','VisuMZ_3_ActiveChainSkills','Skill-%1-%2','Game_BattlerBase_isStateResist','right','_result','Window_SkillStatus_refresh','regenerateAll','addDebuff','SortSkillTypesAbc','ReapplyRules','success','_cache_getPassiveStateConditionSwitchData','meetsSkillConditionsEnableJS','checkShowHideJS','drawSkillCost','drawItemStyleIconText','onAddDebuff','paramValueByName','_classIDs','onExpireStateGlobalJS','Game_Action_testApply','stateTpSlipHealJS','commandNameWindowDrawBackground','onEraseStateCustomJS','Game_Action_isValid','VisuMZ_3_EvoMatrixSkills','skillCostSeparator','isStateExpired','valueOutlineWidth','_categoryWindow','Param','commandNameWindowCenter','exit','labelOutlineWidth','isPassiveStateStackable','createPassiveStatesCache','fontSize','buffColor','stateTurns','commandNameWindowDrawText','call','getCurrentTroopUniqueID','DEF','includesSkillsStatesCore','Game_Battler_isStateAddable','stateTpSlipDamageJS','addAuraPassiveStateIDs','splice','isUserBypassRemoveStatesByDamage','Game_BattlerBase_meetsSkillConditions_Toggle','fontBold','SkillID','createTurnDisplaySprite','MeetsAuraStateConditions','greater','<enemy-%1>','skill','Game_Unit_isAllDead','adjustItemWidthByShopStatus','getSkillIdWithName','setStateDisplay','onExpireBuffJS','Game_Action_executeHpDamage_bypassStateDmgRemoval','usableSkills','itemAt','Game_Variables_onChange','VisuMZ_4_SkillContainers','updateCommandNameWindow','ARRAYNUM','isDebuffAffected','clearAllStateOrigins','meetsPassiveStateGlobalConditionJS','CheckIncompatibleStates','setStatusWindow','resetFontSettings','LUK','_skillWindow','Game_BattlerBase_increaseBuff','makeItemList','[OFF]','Game_BattlerBase_skillTpCost','_states','Window_StatusBase_placeGauge','clearStateRetainType','SkillMenuStatusRect','actorId','state','allSwitchOff','passiveStateObjects','isRightInputMode','isBuffPrevented','Scene_Skill_createItemWindow','_stateTurns','isSkillTypeMatchForUse','priority','addPassiveStatesByNotetag','resetTextColor','menuActor','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','currentMaxValue','RegExp','createKeyJS','decreaseBuff','enemyId','buffTurns','BattleManager_endAction','updatedLayoutStyle','ForceList','setStypeId','onExpireDebuff','gaugeRate','getCurrentStateOriginKey','STRUCT','ARRAYJSON','onSkillOk','helpWindowRectSkillsStatesCore','removeStatesByCategoryAll','traitObjects','uiMenuStyle','ForceListRange','battleMembers','getStateReapplyRulings','MaxTurns','_shopStatusWindow','ParseStateNotetags','#%1','setActor','totalStateCategoryAffected','checkCacheKey','inBattle','onAddStateMakeCustomSlipValues','_stypeId','updateStatesActionEnd','Settings','toLowerCase','AvailableChainSkill','Game_BattlerBase_eraseState','removeByDamage','isValid','commandStyleCheck','getStateOriginByKey','_statusWindow','eraseState','groupDefeat','DefaultToggle','Costs','itemLineRect','CheckVisibleSwitchNotetags','recoverAll','updateTurnDisplaySprite','ValueOutlineWidth','passiveStates','ShowTurns','JSON','CheckVisibleBattleNotetags','MAXMP','opponentsUnit','onAddStateGlobalJS','_stateRetainType','canClearState','MatchLabelColor','AutoAddState','VisuMZ_3_FieldSkills','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','item','onExpireDebuffGlobalJS','activate','onRemoveState','note','convertGaugeTypeSkillsStatesCore','ARRAYFUNC','max','Game_BattlerBase_decreaseBuff','statusWindowRect','changeSkillsThroughStateEffects','addPassiveStatesFromOtherPlugins','multiclasses','Game_Action_applyItemUserEffect','stateMpSlipHealJS','number','CmdWidth','Game_Troop_setup','maxTurns','DataFontSize','maxCols','isAutoBattle','currentMaxValueSkillsStatesCore','MDF','callUpdateHelp','isEnemy','_stored_state-%1-color','VisuMZ_0_CoreEngine','iconHeight','160731JMcgJZ','concat','ToggleOnTextColor','getColor','removeStatesByDamage','addPassiveStatesTraitSets','updateHelp','endAction','textSizeEx','ToggleOff','MeetsAuraObjConditions','buff','trim','ARRAYSTRUCT','addWindow','onAddDebuffGlobalJS','_stateOrigin','user','applyItemUserEffect','add','drawItem','indexOf','sort','Enemy','Game_Battler_addBuff','stateAddJS','TextJS','stateExpireJS','_skillTypeWindow','_bypassRemoveStateDamage_user','_itemWindow','BattleHiddenSkillTypes','TurnFontSize','toggleExclusionGroups','floor','Buffs','subject','checkSkillConditionsNotetags','removeBuffsAuto','meetsPassiveStateConditionClasses','ARRAYSTR','CmdTextAlign','_actor','skillLearn','_stateData','MAT','parse','drawExtendedSkillsStatesCoreStatus','die','replace','standardIconHeight','drawExtendedParameter','toggleOn','setPassiveStateSlipDamageJS','equipBattleSkills','autoRemovalTiming','getSkillTypes','filter','setStateOrigin','addNewState','getStateOrigin','name','getAuraPassiveStateIDs','reset','recover\x20all','drawActorIconsAllTurnCounters','allowCreateShopStatusWindow','clearStateOrigin','RefreshCacheSwitch','isAllDead','test','normalColor','FieldSkills','changeOutlineColor','allBattleMembers','makeCommandName','Game_BattlerBase_overwriteBuffTurns','ALL','defaultToggleSkillSetting','currentValueSkillsStatesCore','statesByCategory','isPlaytest','Window_Base_changeTextColor','<actor-%1>','removeState','IconStypeNorm','meetsSkillConditions','gaugeLineHeight','Toggle','_cache','stateMpSlipDamageJS','shopStatusWidth','isStateRemoved','_stateDisplay','isStateCategoryResisted','multiClass','Actor-%1-%2','_prevPassiveJsResults','updateFrame','hpDamage','_subject','currentDisplayedValue','StateID','Game_Battler_onBattleEnd','onBattleEnd','Game_Switches_onChange','passiveStateIDs','checkShowHideNotetags','clear','State-%1-%2','stateData','stateHpSlipHealJS','Game_Unit_deadMembers','StackBuffMax','prepareResetStateCounts','MultiplierJS','onEraseDebuff','death','addBuffTurns','Parse_Notetags_State_ApplyRemoveLeaveJS','Turns','some','createCommandNameWindow','isBuffExpired','_stored_buffColor','getStateDisplay','DataOffsetY','gainHp','CanThrowType','_skillChangesFromState','VisuMZ_1_ItemsEquipsCore','Sprite_Gauge_gaugeRate','Game_Actor_forgetSkill','untitled','_cache_CheckBypassRemoveStatesByDamage','createAllSkillCostText','toggleOffLocation','forgetSkill','deathStateId','Game_BattlerBase_clearStates','isAppeared','isSceneBattle','heal','StateTurnsActorChangeTo','categories','itemTextAlign','lineHeight','states','stateHpSlipDamageJS','_buffs','Enemy-%1-%2','Sprite_Gauge_currentMaxValue','drawText','actor','onExpireBuffGlobalJS','CheckVisibleSkillNotetags','removeStatesByCategory','slipMp','addCommand','AGI','onAddStateCustomJS','onAddDebuffJS','addState','text','_passiveStateResults','convertPassiveStates','meetsPassiveStateConditionJS','Window_SkillList_makeItemList','isStateAffected','stateId','meetsPassiveStateConditionSwitches','_checkingTraitsSetSkillsStatesCore','removeStatesAuto','auto','EnemyIndex','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','isStateRestrict','_tempBattler','applyDebuffTurnManipulationEffects','redraw','isAlive','statusWindowRectSkillsStatesCore','itemWindowRect','getStateIdWithName','length','isSkillCostShown','attacker','clearStates','Window_Base_drawText','increaseBuff','_stateMaxTurns','_turnDisplaySprite','testSkillStatesCoreNotetags','14qnYGbK','numberFontFace','removeOtherStatesOfSameCategory','Sprite_StateIcon_loadBitmap','regenerateAllSkillsStatesCore'];_0x824d=function(){return _0x442206;};return _0x824d();}VisuMZ[label][_0x236293(0x172)]=VisuMZ[label][_0x236293(0x172)]||{},VisuMZ[_0x236293(0x29f)]=function(_0x383cc2,_0x3e069a){const _0x26b3e4=_0x236293;for(const _0x1288ca in _0x3e069a){if(_0x1288ca[_0x26b3e4(0x356)](/(.*):(.*)/i)){const _0x33e450=String(RegExp['$1']),_0x2a7f57=String(RegExp['$2'])[_0x26b3e4(0x2af)]()[_0x26b3e4(0x1ba)]();let _0x1bdd50,_0x2c1bd7,_0x2b8944;switch(_0x2a7f57){case _0x26b3e4(0x302):_0x1bdd50=_0x3e069a[_0x1288ca]!==''?Number(_0x3e069a[_0x1288ca]):0x0;break;case _0x26b3e4(0x131):_0x2c1bd7=_0x3e069a[_0x1288ca]!==''?JSON[_0x26b3e4(0x1dc)](_0x3e069a[_0x1288ca]):[],_0x1bdd50=_0x2c1bd7[_0x26b3e4(0xa0)](_0x1d4c84=>Number(_0x1d4c84));break;case _0x26b3e4(0xa5):_0x1bdd50=_0x3e069a[_0x1288ca]!==''?eval(_0x3e069a[_0x1288ca]):null;break;case'ARRAYEVAL':_0x2c1bd7=_0x3e069a[_0x1288ca]!==''?JSON[_0x26b3e4(0x1dc)](_0x3e069a[_0x1288ca]):[],_0x1bdd50=_0x2c1bd7['map'](_0x1be1b4=>eval(_0x1be1b4));break;case _0x26b3e4(0x186):_0x1bdd50=_0x3e069a[_0x1288ca]!==''?JSON[_0x26b3e4(0x1dc)](_0x3e069a[_0x1288ca]):'';break;case _0x26b3e4(0x15e):_0x2c1bd7=_0x3e069a[_0x1288ca]!==''?JSON[_0x26b3e4(0x1dc)](_0x3e069a[_0x1288ca]):[],_0x1bdd50=_0x2c1bd7[_0x26b3e4(0xa0)](_0x48c470=>JSON[_0x26b3e4(0x1dc)](_0x48c470));break;case _0x26b3e4(0xdf):_0x1bdd50=_0x3e069a[_0x1288ca]!==''?new Function(JSON[_0x26b3e4(0x1dc)](_0x3e069a[_0x1288ca])):new Function('return\x200');break;case _0x26b3e4(0x197):_0x2c1bd7=_0x3e069a[_0x1288ca]!==''?JSON['parse'](_0x3e069a[_0x1288ca]):[],_0x1bdd50=_0x2c1bd7[_0x26b3e4(0xa0)](_0xd348f0=>new Function(JSON[_0x26b3e4(0x1dc)](_0xd348f0)));break;case'STR':_0x1bdd50=_0x3e069a[_0x1288ca]!==''?String(_0x3e069a[_0x1288ca]):'';break;case _0x26b3e4(0x1d6):_0x2c1bd7=_0x3e069a[_0x1288ca]!==''?JSON[_0x26b3e4(0x1dc)](_0x3e069a[_0x1288ca]):[],_0x1bdd50=_0x2c1bd7[_0x26b3e4(0xa0)](_0x5a2f92=>String(_0x5a2f92));break;case _0x26b3e4(0x15d):_0x2b8944=_0x3e069a[_0x1288ca]!==''?JSON[_0x26b3e4(0x1dc)](_0x3e069a[_0x1288ca]):{},_0x383cc2[_0x33e450]={},VisuMZ[_0x26b3e4(0x29f)](_0x383cc2[_0x33e450],_0x2b8944);continue;case _0x26b3e4(0x1bb):_0x2c1bd7=_0x3e069a[_0x1288ca]!==''?JSON[_0x26b3e4(0x1dc)](_0x3e069a[_0x1288ca]):[],_0x1bdd50=_0x2c1bd7[_0x26b3e4(0xa0)](_0x3793a4=>VisuMZ[_0x26b3e4(0x29f)]({},JSON[_0x26b3e4(0x1dc)](_0x3793a4)));break;default:continue;}_0x383cc2[_0x33e450]=_0x1bdd50;}}return _0x383cc2;},(_0x4a3c23=>{const _0x30180c=_0x236293,_0x48e8ad=_0x4a3c23[_0x30180c(0x1eb)];for(const _0xf849a7 of dependencies){if(!Imported[_0xf849a7]){alert(_0x30180c(0x28e)[_0x30180c(0x2f9)](_0x48e8ad,_0xf849a7)),SceneManager['exit']();break;}}const _0x2ec856=_0x4a3c23[_0x30180c(0x2b6)];if(_0x2ec856['match'](/\[Version[ ](.*?)\]/i)){const _0x1b4c96=Number(RegExp['$1']);_0x1b4c96!==VisuMZ[label][_0x30180c(0x2dd)]&&(alert(_0x30180c(0x14f)[_0x30180c(0x2f9)](_0x48e8ad,_0x1b4c96)),SceneManager[_0x30180c(0x10d)]());}if(_0x2ec856[_0x30180c(0x356)](/\[Tier[ ](\d+)\]/i)){const _0x58023b=Number(RegExp['$1']);_0x58023b<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x48e8ad,_0x58023b,tier)),SceneManager[_0x30180c(0x10d)]()):tier=Math[_0x30180c(0x198)](_0x58023b,tier);}VisuMZ[_0x30180c(0x29f)](VisuMZ[label][_0x30180c(0x172)],_0x4a3c23[_0x30180c(0xe2)]);})(pluginData),PluginManager[_0x236293(0x2e7)](pluginData['name'],'SkillActorPaySkillCost',_0x4a8b20=>{const _0x3aaa09=_0x236293;VisuMZ['ConvertParams'](_0x4a8b20,_0x4a8b20);const _0x3c5254=_0x4a8b20[_0x3aaa09(0x292)]||[],_0x3f8af7=Number(_0x4a8b20[_0x3aaa09(0x120)]),_0x5f482a=$dataSkills[_0x3f8af7];if(!_0x5f482a)return;for(const _0x381821 of _0x3c5254){const _0x575fc4=$gameActors['actor'](_0x381821);if(!_0x575fc4)continue;_0x575fc4['paySkillCost'](_0x5f482a);}}),PluginManager[_0x236293(0x2e7)](pluginData[_0x236293(0x1eb)],_0x236293(0x2e1),_0x4561a4=>{const _0x3b25c3=_0x236293;VisuMZ[_0x3b25c3(0x29f)](_0x4561a4,_0x4561a4);const _0x498680=_0x4561a4[_0x3b25c3(0x25c)]||[],_0x17e836=Number(_0x4561a4[_0x3b25c3(0x120)]),_0x1e1856=$dataSkills[_0x17e836];if(!_0x1e1856)return;for(const _0x3d0dc6 of _0x498680){const _0x4df356=$gameTroop[_0x3b25c3(0x34a)]()[_0x3d0dc6];if(!_0x4df356)continue;_0x4df356['paySkillCost'](_0x1e1856);}}),PluginManager[_0x236293(0x2e7)](pluginData['name'],'StateTurnsActorChangeBy',_0x4a38f9=>{const _0x2e1b75=_0x236293;VisuMZ[_0x2e1b75(0x29f)](_0x4a38f9,_0x4a38f9);const _0x48ea5c=_0x4a38f9[_0x2e1b75(0x292)]||[],_0x250492=Number(_0x4a38f9[_0x2e1b75(0x214)]),_0x2aa491=Number(_0x4a38f9[_0x2e1b75(0x226)]),_0x467cf9=_0x4a38f9[_0x2e1b75(0x18e)];for(const _0x27b666 of _0x48ea5c){const _0x588512=$gameActors['actor'](_0x27b666);if(!_0x588512)continue;_0x467cf9&&!_0x588512[_0x2e1b75(0x256)](_0x250492)?(_0x588512[_0x2e1b75(0x250)](_0x250492),_0x588512[_0x2e1b75(0x2ac)](_0x250492,_0x2aa491)):_0x588512[_0x2e1b75(0xd6)](_0x250492,_0x2aa491);}}),PluginManager[_0x236293(0x2e7)](pluginData['name'],_0x236293(0x23d),_0x2e8471=>{const _0x33f65c=_0x236293;VisuMZ[_0x33f65c(0x29f)](_0x2e8471,_0x2e8471);const _0x436f4f=_0x2e8471[_0x33f65c(0x292)]||[],_0x4d17f7=Number(_0x2e8471[_0x33f65c(0x214)]),_0x3f9055=Math[_0x33f65c(0x198)](Number(_0x2e8471[_0x33f65c(0x226)]),0x0),_0x417fb2=_0x2e8471[_0x33f65c(0x18e)];for(const _0x35f3af of _0x436f4f){const _0x944bab=$gameActors['actor'](_0x35f3af);if(!_0x944bab)continue;_0x417fb2&&!_0x944bab['isStateAffected'](_0x4d17f7)&&_0x944bab[_0x33f65c(0x250)](_0x4d17f7),_0x944bab['setStateTurns'](_0x4d17f7,_0x3f9055);}}),PluginManager['registerCommand'](pluginData[_0x236293(0x1eb)],_0x236293(0x36d),_0x176384=>{const _0x52a9c1=_0x236293;if(!$gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x176384,_0x176384);const _0x42b1ba=_0x176384[_0x52a9c1(0x25c)]||[],_0x209aff=Number(_0x176384[_0x52a9c1(0x214)]),_0x1a0e62=Number(_0x176384[_0x52a9c1(0x226)]),_0x11d513=_0x176384[_0x52a9c1(0x18e)];for(const _0x44601d of _0x42b1ba){const _0x3d76af=$gameTroop[_0x52a9c1(0x34a)]()[_0x44601d];if(!_0x3d76af)continue;_0x11d513&&!_0x3d76af[_0x52a9c1(0x256)](_0x209aff)?(_0x3d76af[_0x52a9c1(0x250)](_0x209aff),_0x3d76af['setStateTurns'](_0x209aff,_0x1a0e62)):_0x3d76af[_0x52a9c1(0xd6)](_0x209aff,_0x1a0e62);}}),PluginManager[_0x236293(0x2e7)](pluginData['name'],'StateTurnsEnemyChangeTo',_0x1e50f9=>{const _0x2def0e=_0x236293;if(!$gameParty[_0x2def0e(0x16e)]())return;VisuMZ['ConvertParams'](_0x1e50f9,_0x1e50f9);const _0x59ed4f=_0x1e50f9['EnemyIndex']||[],_0x4fa552=Number(_0x1e50f9[_0x2def0e(0x214)]),_0x3ab32d=Math['max'](Number(_0x1e50f9[_0x2def0e(0x226)]),0x0),_0x36d0ae=_0x1e50f9['AutoAddState'];for(const _0x24967d of _0x59ed4f){const _0x53dadc=$gameTroop[_0x2def0e(0x34a)]()[_0x24967d];if(!_0x53dadc)continue;_0x36d0ae&&!_0x53dadc['isStateAffected'](_0x4fa552)&&_0x53dadc[_0x2def0e(0x250)](_0x4fa552),_0x53dadc['setStateTurns'](_0x4fa552,_0x3ab32d);}}),VisuMZ[_0x236293(0x37b)][_0x236293(0x2e8)]=Scene_Boot[_0x236293(0xd1)][_0x236293(0xe8)],Scene_Boot['prototype'][_0x236293(0xe8)]=function(){const _0x3dcb84=_0x236293;VisuMZ[_0x3dcb84(0x37b)][_0x3dcb84(0x2e8)]['call'](this),this[_0x3dcb84(0x3b0)](),VisuMZ[_0x3dcb84(0x37b)][_0x3dcb84(0x135)]();},Scene_Boot[_0x236293(0xd1)][_0x236293(0x3b0)]=function(){const _0x270d46=_0x236293;this[_0x270d46(0x317)]();if(VisuMZ[_0x270d46(0x2ef)])return;this[_0x270d46(0x379)](),this[_0x270d46(0x30c)]();},Scene_Boot[_0x236293(0xd1)]['process_VisuMZ_SkillsStatesCore_Skill_Notetags']=function(){const _0x5bafd0=_0x236293;for(const _0x21bb24 of $dataSkills){if(!_0x21bb24)continue;VisuMZ['SkillsStatesCore'][_0x5bafd0(0x3b2)](_0x21bb24),VisuMZ[_0x5bafd0(0x37b)][_0x5bafd0(0xbc)](_0x21bb24),VisuMZ[_0x5bafd0(0x37b)][_0x5bafd0(0x37a)](_0x21bb24);}},Scene_Boot[_0x236293(0xd1)]['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){const _0x396281=_0x236293;for(const _0x2cef2b of $dataStates){if(!_0x2cef2b)continue;VisuMZ[_0x396281(0x37b)]['Parse_Notetags_State_Category'](_0x2cef2b),VisuMZ['SkillsStatesCore']['Parse_Notetags_State_PassiveJS'](_0x2cef2b),VisuMZ['SkillsStatesCore'][_0x396281(0x300)](_0x2cef2b),VisuMZ[_0x396281(0x37b)][_0x396281(0x225)](_0x2cef2b);}},VisuMZ[_0x236293(0x37b)][_0x236293(0x31c)]=VisuMZ['ParseSkillNotetags'],VisuMZ['ParseSkillNotetags']=function(_0x2bcc09){const _0x4920c5=_0x236293;VisuMZ[_0x4920c5(0x37b)][_0x4920c5(0x31c)][_0x4920c5(0x115)](this,_0x2bcc09),VisuMZ[_0x4920c5(0x37b)][_0x4920c5(0x3b2)](_0x2bcc09),VisuMZ[_0x4920c5(0x37b)]['Parse_Notetags_Skill_Sorting'](_0x2bcc09),VisuMZ[_0x4920c5(0x37b)]['Parse_Notetags_Skill_JS'](_0x2bcc09);},VisuMZ[_0x236293(0x37b)][_0x236293(0x169)]=VisuMZ[_0x236293(0x169)],VisuMZ[_0x236293(0x169)]=function(_0x11c2f1){const _0xd10880=_0x236293;VisuMZ['SkillsStatesCore'][_0xd10880(0x169)]['call'](this,_0x11c2f1),VisuMZ[_0xd10880(0x37b)][_0xd10880(0x2c0)](_0x11c2f1),VisuMZ[_0xd10880(0x37b)]['Parse_Notetags_State_PassiveJS'](_0x11c2f1),VisuMZ['SkillsStatesCore'][_0xd10880(0x300)](_0x11c2f1),VisuMZ[_0xd10880(0x37b)][_0xd10880(0x225)](_0x11c2f1);},VisuMZ[_0x236293(0x37b)]['Parse_Notetags_Skill_Cost']=function(_0x4af50e){const _0x55bf63=_0x236293,_0x2e789b=_0x4af50e[_0x55bf63(0x195)];_0x2e789b['match'](/<MP COST:[ ](\d+)>/i)&&(_0x4af50e['mpCost']=Number(RegExp['$1'])),_0x2e789b[_0x55bf63(0x356)](/<TP COST:[ ](\d+)>/i)&&(_0x4af50e['tpCost']=Number(RegExp['$1']));},VisuMZ[_0x236293(0x37b)][_0x236293(0xbc)]=function(_0x2c948){const _0x5129bb=_0x236293;if(!_0x2c948)return;_0x2c948[_0x5129bb(0x39f)]=0x32;const _0x32fe68=_0x2c948[_0x5129bb(0x195)]||'';_0x32fe68[_0x5129bb(0x356)](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x2c948[_0x5129bb(0x39f)]=Number(RegExp['$1']));},VisuMZ[_0x236293(0x37b)][_0x236293(0x389)]={},VisuMZ[_0x236293(0x37b)][_0x236293(0x2a4)]={},VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_JS']=function(_0x22d911){const _0x7bdbc0=_0x236293,_0x395ed2=_0x22d911[_0x7bdbc0(0x195)];if(_0x395ed2[_0x7bdbc0(0x356)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0xd1c2a=String(RegExp['$1']),_0x353a3d=_0x7bdbc0(0x28a)[_0x7bdbc0(0x2f9)](_0xd1c2a);VisuMZ[_0x7bdbc0(0x37b)]['skillEnableJS'][_0x22d911['id']]=new Function('skill',_0x353a3d);}if(_0x395ed2[_0x7bdbc0(0x356)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x190b3c=String(RegExp['$1']),_0x214236=_0x7bdbc0(0x25d)[_0x7bdbc0(0x2f9)](_0x190b3c);VisuMZ[_0x7bdbc0(0x37b)][_0x7bdbc0(0x2a4)][_0x22d911['id']]=new Function(_0x7bdbc0(0x125),_0x214236);}},VisuMZ[_0x236293(0x37b)][_0x236293(0x2c0)]=function(_0x5569a1){const _0x2d8fd8=_0x236293;_0x5569a1['categories']=[_0x2d8fd8(0x1fb),_0x2d8fd8(0x37f)];const _0x1c796d=_0x5569a1[_0x2d8fd8(0x195)],_0x25f49e=_0x1c796d[_0x2d8fd8(0x356)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x25f49e)for(const _0x26e9ad of _0x25f49e){_0x26e9ad[_0x2d8fd8(0x356)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x3b1982=String(RegExp['$1'])[_0x2d8fd8(0x2af)]()['trim']()[_0x2d8fd8(0x393)](',');for(const _0x4d92c8 of _0x3b1982){_0x5569a1[_0x2d8fd8(0x23e)][_0x2d8fd8(0x295)](_0x4d92c8[_0x2d8fd8(0x1ba)]());}}if(_0x1c796d[_0x2d8fd8(0x356)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x147434=RegExp['$1'][_0x2d8fd8(0x393)](/[\r\n]+/);for(const _0x5d3566 of _0x147434){_0x5569a1[_0x2d8fd8(0x23e)][_0x2d8fd8(0x295)](_0x5d3566[_0x2d8fd8(0x2af)]()[_0x2d8fd8(0x1ba)]());}}_0x1c796d['match'](/<POSITIVE STATE>/i)&&_0x5569a1[_0x2d8fd8(0x23e)][_0x2d8fd8(0x295)](_0x2d8fd8(0x2fa)),_0x1c796d[_0x2d8fd8(0x356)](/<NEGATIVE STATE>/i)&&_0x5569a1[_0x2d8fd8(0x23e)]['push'](_0x2d8fd8(0x31e));},VisuMZ[_0x236293(0x37b)][_0x236293(0x32a)]={},VisuMZ[_0x236293(0x37b)]['Parse_Notetags_State_PassiveJS']=function(_0x3db17b){const _0x233ea8=_0x236293,_0x4b6222=_0x3db17b[_0x233ea8(0x195)];if(_0x4b6222[_0x233ea8(0x356)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x20e4a4=String(RegExp['$1']),_0x33d80c=_0x233ea8(0x2d0)[_0x233ea8(0x2f9)](_0x20e4a4);VisuMZ[_0x233ea8(0x37b)][_0x233ea8(0x32a)][_0x3db17b['id']]=new Function(_0x233ea8(0x143),_0x33d80c);}},VisuMZ[_0x236293(0x37b)][_0x236293(0x242)]={},VisuMZ[_0x236293(0x37b)][_0x236293(0x21d)]={},VisuMZ['SkillsStatesCore']['stateMpSlipDamageJS']={},VisuMZ[_0x236293(0x37b)]['stateMpSlipHealJS']={},VisuMZ[_0x236293(0x37b)][_0x236293(0x11a)]={},VisuMZ[_0x236293(0x37b)][_0x236293(0x102)]={},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_SlipEffectJS']=function(_0x149dc8){const _0x1c0501=_0x236293,_0x477ade=_0x149dc8['note'],_0x324973=_0x1c0501(0x35d);if(_0x477ade[_0x1c0501(0x356)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x15d421=String(RegExp['$1']),_0x30a771=_0x324973[_0x1c0501(0x2f9)](_0x15d421,_0x1c0501(0xb6),-0x1,_0x1c0501(0x3bb));VisuMZ[_0x1c0501(0x37b)][_0x1c0501(0x242)][_0x149dc8['id']]=new Function(_0x1c0501(0x257),_0x30a771);}else{if(_0x477ade[_0x1c0501(0x356)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x397951=String(RegExp['$1']),_0xc612fa=_0x324973[_0x1c0501(0x2f9)](_0x397951,'heal',0x1,_0x1c0501(0x3bb));VisuMZ['SkillsStatesCore'][_0x1c0501(0x21d)][_0x149dc8['id']]=new Function(_0x1c0501(0x257),_0xc612fa);}}if(_0x477ade[_0x1c0501(0x356)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0xeb1345=String(RegExp['$1']),_0x35d00e=_0x324973['format'](_0xeb1345,_0x1c0501(0xb6),-0x1,_0x1c0501(0x24b));VisuMZ[_0x1c0501(0x37b)][_0x1c0501(0x208)][_0x149dc8['id']]=new Function('stateId',_0x35d00e);}else{if(_0x477ade[_0x1c0501(0x356)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x1743f3=String(RegExp['$1']),_0x2c7530=_0x324973[_0x1c0501(0x2f9)](_0x1743f3,_0x1c0501(0x23c),0x1,_0x1c0501(0x24b));VisuMZ[_0x1c0501(0x37b)][_0x1c0501(0x19f)][_0x149dc8['id']]=new Function(_0x1c0501(0x257),_0x2c7530);}}if(_0x477ade[_0x1c0501(0x356)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x3b1c3e=String(RegExp['$1']),_0x275041=_0x324973[_0x1c0501(0x2f9)](_0x3b1c3e,_0x1c0501(0xb6),-0x1,'slipTp');VisuMZ[_0x1c0501(0x37b)][_0x1c0501(0x11a)][_0x149dc8['id']]=new Function('stateId',_0x275041);}else{if(_0x477ade[_0x1c0501(0x356)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x2d95e5=String(RegExp['$1']),_0x1a573d=_0x324973[_0x1c0501(0x2f9)](_0x2d95e5,'heal',0x1,_0x1c0501(0x2d7));VisuMZ[_0x1c0501(0x37b)][_0x1c0501(0x102)][_0x149dc8['id']]=new Function(_0x1c0501(0x257),_0x1a573d);}}},VisuMZ[_0x236293(0x37b)][_0x236293(0x1c7)]={},VisuMZ[_0x236293(0x37b)][_0x236293(0x3ad)]={},VisuMZ[_0x236293(0x37b)][_0x236293(0x1c9)]={},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_ApplyRemoveLeaveJS']=function(_0x27484a){const _0x1ace53=_0x236293,_0xa3513e=_0x27484a[_0x1ace53(0x195)],_0x27b825=_0x1ace53(0x190);if(_0xa3513e[_0x1ace53(0x356)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x41ad48=String(RegExp['$1']),_0x28c9f9=_0x27b825[_0x1ace53(0x2f9)](_0x41ad48);VisuMZ[_0x1ace53(0x37b)][_0x1ace53(0x1c7)][_0x27484a['id']]=new Function(_0x1ace53(0x257),_0x28c9f9);}if(_0xa3513e[_0x1ace53(0x356)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x10b83d=String(RegExp['$1']),_0x105c47=_0x27b825[_0x1ace53(0x2f9)](_0x10b83d);VisuMZ['SkillsStatesCore'][_0x1ace53(0x3ad)][_0x27484a['id']]=new Function('stateId',_0x105c47);}if(_0xa3513e['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x4fd308=String(RegExp['$1']),_0xfb023d=_0x27b825['format'](_0x4fd308);VisuMZ[_0x1ace53(0x37b)][_0x1ace53(0x1c9)][_0x27484a['id']]=new Function(_0x1ace53(0x257),_0xfb023d);}},VisuMZ[_0x236293(0x37b)][_0x236293(0x135)]=function(){const _0x2b0154=_0x236293;if(!VisuMZ[_0x2b0154(0x37b)][_0x2b0154(0x172)][_0x2b0154(0x2b4)][_0x2b0154(0x32e)])return;for(const _0x436a6e of $dataStates){if(!_0x436a6e)continue;_0x436a6e['restriction']===0x4&&_0x436a6e[_0x2b0154(0x1e5)]===0x1&&(_0x436a6e[_0x2b0154(0x1e5)]=0x2);}},VisuMZ[_0x236293(0x37b)][_0x236293(0x152)]=function(_0x3b77d5,_0x509b46){const _0x49c292=_0x236293;if(VisuMZ['createKeyJS'])return VisuMZ['createKeyJS'](_0x3b77d5,_0x509b46);let _0x5b4727='';if($dataActors[_0x49c292(0x31f)](_0x3b77d5))_0x5b4727=_0x49c292(0x20e)[_0x49c292(0x2f9)](_0x3b77d5['id'],_0x509b46);if($dataClasses['includes'](_0x3b77d5))_0x5b4727=_0x49c292(0x306)['format'](_0x3b77d5['id'],_0x509b46);if($dataSkills[_0x49c292(0x31f)](_0x3b77d5))_0x5b4727=_0x49c292(0xee)[_0x49c292(0x2f9)](_0x3b77d5['id'],_0x509b46);if($dataItems['includes'](_0x3b77d5))_0x5b4727='Item-%1-%2'[_0x49c292(0x2f9)](_0x3b77d5['id'],_0x509b46);if($dataWeapons['includes'](_0x3b77d5))_0x5b4727='Weapon-%1-%2'[_0x49c292(0x2f9)](_0x3b77d5['id'],_0x509b46);if($dataArmors['includes'](_0x3b77d5))_0x5b4727=_0x49c292(0x288)[_0x49c292(0x2f9)](_0x3b77d5['id'],_0x509b46);if($dataEnemies[_0x49c292(0x31f)](_0x3b77d5))_0x5b4727=_0x49c292(0x244)[_0x49c292(0x2f9)](_0x3b77d5['id'],_0x509b46);if($dataStates['includes'](_0x3b77d5))_0x5b4727=_0x49c292(0x21b)[_0x49c292(0x2f9)](_0x3b77d5['id'],_0x509b46);return _0x5b4727;},DataManager['getClassIdWithName']=function(_0x34c89f){const _0x436d30=_0x236293;_0x34c89f=_0x34c89f[_0x436d30(0x2af)]()['trim'](),this[_0x436d30(0xff)]=this[_0x436d30(0xff)]||{};if(this['_classIDs'][_0x34c89f])return this[_0x436d30(0xff)][_0x34c89f];for(const _0x5caec0 of $dataClasses){if(!_0x5caec0)continue;let _0x12eb73=_0x5caec0[_0x436d30(0x1eb)];_0x12eb73=_0x12eb73[_0x436d30(0x1df)](/\x1I\[(\d+)\]/gi,''),_0x12eb73=_0x12eb73['replace'](/\\I\[(\d+)\]/gi,''),this[_0x436d30(0xff)][_0x12eb73[_0x436d30(0x2af)]()[_0x436d30(0x1ba)]()]=_0x5caec0['id'];}return this[_0x436d30(0xff)][_0x34c89f]||0x0;},DataManager[_0x236293(0x1e6)]=function(_0x5bc6b4){const _0x48cb0f=_0x236293;this[_0x48cb0f(0xad)]=this[_0x48cb0f(0xad)]||{};if(this[_0x48cb0f(0xad)][_0x5bc6b4['id']])return this[_0x48cb0f(0xad)][_0x5bc6b4['id']];this[_0x48cb0f(0xad)][_0x5bc6b4['id']]=[_0x5bc6b4['stypeId']];if(_0x5bc6b4[_0x48cb0f(0x195)][_0x48cb0f(0x356)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16529b=JSON['parse']('['+RegExp['$1'][_0x48cb0f(0x356)](/\d+/g)+']');this[_0x48cb0f(0xad)][_0x5bc6b4['id']]=this[_0x48cb0f(0xad)][_0x5bc6b4['id']][_0x48cb0f(0x1af)](_0x16529b);}else{if(_0x5bc6b4[_0x48cb0f(0x195)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x2a47f7=RegExp['$1'][_0x48cb0f(0x393)](',');for(const _0x3391d8 of _0x2a47f7){const _0x56e8a9=DataManager[_0x48cb0f(0xe3)](_0x3391d8);if(_0x56e8a9)this['_stypeIDs'][_0x5bc6b4['id']][_0x48cb0f(0x295)](_0x56e8a9);}}}return this[_0x48cb0f(0xad)][_0x5bc6b4['id']];},DataManager['getStypeIdWithName']=function(_0x1b2c84){const _0x597dd2=_0x236293;_0x1b2c84=_0x1b2c84[_0x597dd2(0x2af)]()[_0x597dd2(0x1ba)](),this['_stypeIDs']=this['_stypeIDs']||{};if(this['_stypeIDs'][_0x1b2c84])return this[_0x597dd2(0xad)][_0x1b2c84];for(let _0x470c8b=0x1;_0x470c8b<0x64;_0x470c8b++){if(!$dataSystem['skillTypes'][_0x470c8b])continue;let _0x303c69=$dataSystem[_0x597dd2(0x325)][_0x470c8b][_0x597dd2(0x2af)]()['trim']();_0x303c69=_0x303c69[_0x597dd2(0x1df)](/\x1I\[(\d+)\]/gi,''),_0x303c69=_0x303c69[_0x597dd2(0x1df)](/\\I\[(\d+)\]/gi,''),this[_0x597dd2(0xad)][_0x303c69]=_0x470c8b;}return this['_stypeIDs'][_0x1b2c84]||0x0;},DataManager['getSkillIdWithName']=function(_0x3644e9){const _0x50cde0=_0x236293;_0x3644e9=_0x3644e9[_0x50cde0(0x2af)]()[_0x50cde0(0x1ba)](),this[_0x50cde0(0x35c)]=this[_0x50cde0(0x35c)]||{};if(this[_0x50cde0(0x35c)][_0x3644e9])return this['_skillIDs'][_0x3644e9];for(const _0x385908 of $dataSkills){if(!_0x385908)continue;this[_0x50cde0(0x35c)][_0x385908[_0x50cde0(0x1eb)][_0x50cde0(0x2af)]()[_0x50cde0(0x1ba)]()]=_0x385908['id'];}return this['_skillIDs'][_0x3644e9]||0x0;},DataManager[_0x236293(0x265)]=function(_0x2300b8){const _0x40f8f8=_0x236293;_0x2300b8=_0x2300b8[_0x40f8f8(0x2af)]()[_0x40f8f8(0x1ba)](),this[_0x40f8f8(0xab)]=this[_0x40f8f8(0xab)]||{};if(this['_stateIDs'][_0x2300b8])return this[_0x40f8f8(0xab)][_0x2300b8];for(const _0x4754b3 of $dataStates){if(!_0x4754b3)continue;this[_0x40f8f8(0xab)][_0x4754b3[_0x40f8f8(0x1eb)][_0x40f8f8(0x2af)]()['trim']()]=_0x4754b3['id'];}return this['_stateIDs'][_0x2300b8]||0x0;},DataManager['stateMaximumTurns']=function(_0x408361){const _0x397115=_0x236293;this[_0x397115(0x26c)]=this[_0x397115(0x26c)]||{};if(this['_stateMaxTurns'][_0x408361])return this['_stateMaxTurns'][_0x408361];return $dataStates[_0x408361][_0x397115(0x195)]['match'](/<MAX TURNS:[ ](\d+)>/i)?this[_0x397115(0x26c)][_0x408361]=Number(RegExp['$1']):this[_0x397115(0x26c)][_0x408361]=VisuMZ[_0x397115(0x37b)][_0x397115(0x172)][_0x397115(0x2b4)][_0x397115(0x167)],this[_0x397115(0x26c)][_0x408361];},DataManager['getSkillChangesFromState']=function(_0x147988){const _0x4341d3=_0x236293;if(!_0x147988)return{};this[_0x4341d3(0x22f)]=this[_0x4341d3(0x22f)]||{};if(this[_0x4341d3(0x22f)][_0x147988['id']]!==undefined)return this['_skillChangesFromState'][_0x147988['id']];const _0x224251=_0x147988[_0x4341d3(0x195)]||'',_0x2d994b={};{const _0x236c1e=_0x224251['match'](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);if(_0x236c1e)for(const _0x291e76 of _0x236c1e){_0x291e76[_0x4341d3(0x356)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);let _0x5b6418=String(RegExp['$1']),_0x2c48a8=String(RegExp['$2']);VisuMZ[_0x4341d3(0x37b)]['ParseSkillChangessIntoData'](_0x2d994b,_0x5b6418,_0x2c48a8);}}if(_0x224251['match'](/<SKILL CHANGE(?:|S)>\s*([\s\S]*)\s*<\/SKILL CHANGE(?:|S)>/i)){const _0x11e2ec=String(RegExp['$1'])[_0x4341d3(0x393)](/[\r\n]+/)[_0x4341d3(0x3b8)]('');for(const _0x5ac827 of _0x11e2ec){if(_0x5ac827[_0x4341d3(0x356)](/(.*)[ ]>>>[ ](.*)/i)){let _0x12f4a6=String(RegExp['$1']),_0x1199e5=String(RegExp['$2']);VisuMZ['SkillsStatesCore'][_0x4341d3(0x2f4)](_0x2d994b,_0x12f4a6,_0x1199e5);}}}return this[_0x4341d3(0x22f)][_0x147988['id']]=_0x2d994b,this[_0x4341d3(0x22f)][_0x147988['id']];},VisuMZ['SkillsStatesCore'][_0x236293(0x2f4)]=function(_0x501000,_0x3a18cb,_0x7ec15b){const _0x3edd97=_0x236293;/^\d+$/[_0x3edd97(0x1f4)](_0x3a18cb)?_0x3a18cb=Number(_0x3a18cb):_0x3a18cb=DataManager['getSkillIdWithName'](_0x3a18cb),/^\d+$/['test'](_0x7ec15b)?_0x7ec15b=Number(_0x7ec15b):_0x7ec15b=DataManager[_0x3edd97(0x128)](_0x7ec15b),_0x501000[_0x3a18cb]=_0x7ec15b;},DataManager[_0x236293(0x32c)]=function(_0xfdea90){const _0x331ff3=_0x236293;if(!DataManager[_0x331ff3(0x35f)](_0xfdea90))return![];this[_0x331ff3(0x2a9)]=this[_0x331ff3(0x2a9)]||{};if(this[_0x331ff3(0x2a9)][_0xfdea90['id']]!==undefined)return this['_cache_isToggleSkill'][_0xfdea90['id']];this[_0x331ff3(0x2a9)][_0xfdea90['id']]=![];const _0xc2f984=_0xfdea90['note']||'';if(_0xc2f984['match'](/<TOGGLE>/i))this[_0x331ff3(0x2a9)][_0xfdea90['id']]=!![];else{if(_0xc2f984[_0x331ff3(0x356)](/<INITIAL TOGGLE: ON>/i))this[_0x331ff3(0x2a9)][_0xfdea90['id']]=!![];else{if(_0xc2f984['match'](/<INITIAL TOGGLE: OFF>/i))this['_cache_isToggleSkill'][_0xfdea90['id']]=!![];else _0xc2f984[_0x331ff3(0x356)](/<TOGGLE EXCLU(?:DE|SION) GROUP(?:|S):[ ](.*)>/i)&&(this[_0x331ff3(0x2a9)][_0xfdea90['id']]=!![]);}}return this['hasToggleSkillAntiCheck'](_0xc2f984)&&(this[_0x331ff3(0x2a9)][_0xfdea90['id']]=![]),this[_0x331ff3(0x2a9)][_0xfdea90['id']];},DataManager['hasToggleSkillAntiCheck']=function(_0x2a8b82){const _0x1adae4=_0x236293;if(Imported[_0x1adae4(0xed)]){const _0x1c31aa=VisuMZ[_0x1adae4(0x33a)][_0x1adae4(0x151)];if(_0x2a8b82['match'](_0x1c31aa[_0x1adae4(0x174)]))return!![];if(_0x2a8b82['match'](_0x1c31aa[_0x1adae4(0x2d3)]))return!![];if(_0x2a8b82['match'](_0x1c31aa['LearnedChainSkill']))return!![];}if(Imported[_0x1adae4(0x106)]){const _0x4af886=VisuMZ['EvoMatrixSkills'][_0x1adae4(0x151)];if(_0x2a8b82[_0x1adae4(0x356)](_0x4af886[_0x1adae4(0x9f)]))return!![];if(_0x2a8b82[_0x1adae4(0x356)](_0x4af886['ForcedMatrix']))return!![];if(_0x2a8b82['match'](_0x4af886[_0x1adae4(0x351)]))return!![];}if(Imported['VisuMZ_3_InputComboSkills']){const _0x568858=VisuMZ[_0x1adae4(0x301)]['RegExp'];if(_0x2a8b82[_0x1adae4(0x356)](_0x568858['InputKey']))return!![];}if(Imported[_0x1adae4(0x18f)]){const _0x155ba8=VisuMZ[_0x1adae4(0x1f6)][_0x1adae4(0x151)];if(_0x2a8b82[_0x1adae4(0x356)](_0x155ba8[_0x1adae4(0x28f)]))return!![];}if(Imported[_0x1adae4(0x33f)]){const _0x287b51=VisuMZ[_0x1adae4(0xb9)][_0x1adae4(0x151)];if(_0x2a8b82[_0x1adae4(0x356)](_0x287b51[_0x1adae4(0x31a)]))return!![];}if(Imported['VisuMZ_3_ItemConcoctSkills']){const _0x17ba6e=VisuMZ[_0x1adae4(0x38b)][_0x1adae4(0x151)];if(_0x2a8b82[_0x1adae4(0x356)](_0x17ba6e['CanConcoct']))return!![];}if(Imported[_0x1adae4(0x376)]){const _0x20e6f9=VisuMZ['ItemThrowSkills'][_0x1adae4(0x151)];if(_0x2a8b82['match'](_0x20e6f9[_0x1adae4(0x22e)]))return!![];}if(Imported[_0x1adae4(0x12f)]){const _0x51cbc6=VisuMZ[_0x1adae4(0x2d5)]['RegExp'];if(_0x2a8b82[_0x1adae4(0x356)](_0x51cbc6['KnownList']))return!![];if(_0x2a8b82[_0x1adae4(0x356)](_0x51cbc6['KnownListRange']))return!![];if(_0x2a8b82[_0x1adae4(0x356)](_0x51cbc6[_0x1adae4(0x158)]))return!![];if(_0x2a8b82[_0x1adae4(0x356)](_0x51cbc6[_0x1adae4(0x164)]))return!![];}return![];},DataManager[_0x236293(0x1fc)]=function(_0x5ad591){const _0x43fa06=_0x236293,_0x278e37=_0x5ad591?_0x5ad591['note']||'':'';if(_0x278e37['match'](/<INITIAL TOGGLE: ON>/i))return!![];else{if(_0x278e37[_0x43fa06(0x356)](/<INITIAL TOGGLE: OFF>/i))return![];}return VisuMZ[_0x43fa06(0x37b)][_0x43fa06(0x172)][_0x43fa06(0x3a3)][_0x43fa06(0x17d)];},DataManager[_0x236293(0x1cf)]=function(_0x3e544a){const _0x2c5364=_0x236293;if(!this['isSkill'](_0x3e544a))return[];this[_0x2c5364(0xc9)]=this['_cache_toggleExclusionGroups']||{};if(this[_0x2c5364(0xc9)][_0x3e544a['id']]!==undefined)return this['_cache_toggleExclusionGroups'][_0x3e544a['id']];let _0x142758=[];const _0x3706e5=_0x3e544a['note']||'';return _0x3706e5[_0x2c5364(0x356)](/<TOGGLE EXCLU(?:DE|SION) GROUP(?:|S):[ ](.*)>/i)&&(_0x142758=String(RegExp['$1'])[_0x2c5364(0x393)](',')[_0x2c5364(0xa0)](_0x450c10=>_0x450c10['toUpperCase']()['trim']())),this[_0x2c5364(0xc9)][_0x3e544a['id']]=_0x142758,this[_0x2c5364(0xc9)][_0x3e544a['id']];},TextManager[_0x236293(0x39a)]=VisuMZ[_0x236293(0x37b)][_0x236293(0x172)][_0x236293(0x3a3)][_0x236293(0x2ed)]??_0x236293(0x206),TextManager[_0x236293(0x1e2)]=VisuMZ[_0x236293(0x37b)][_0x236293(0x172)]['Toggles'][_0x236293(0x2c8)]??'\x5cFS[22]\x5cC[0][ON]',TextManager['toggleOff']=VisuMZ[_0x236293(0x37b)][_0x236293(0x172)][_0x236293(0x3a3)][_0x236293(0x1b7)]??_0x236293(0xd0),TextManager[_0x236293(0x236)]=VisuMZ['SkillsStatesCore'][_0x236293(0x172)][_0x236293(0x3a3)][_0x236293(0x3b7)]??_0x236293(0x2fd),ColorManager[_0x236293(0x2db)]=function(_0x9597aa,_0x5c97f6){const _0x574f05=_0x236293;return _0x5c97f6=String(_0x5c97f6),this['_colorCache']=this[_0x574f05(0x289)]||{},_0x5c97f6[_0x574f05(0x356)](/#(.*)/i)?this['_colorCache'][_0x9597aa]=_0x574f05(0x16a)[_0x574f05(0x2f9)](String(RegExp['$1'])):this['_colorCache'][_0x9597aa]=this['textColor'](Number(_0x5c97f6)),this[_0x574f05(0x289)][_0x9597aa];},ColorManager[_0x236293(0x1b1)]=function(_0x500465){const _0x4efef5=_0x236293;return _0x500465=String(_0x500465),_0x500465['match'](/#(.*)/i)?_0x4efef5(0x16a)[_0x4efef5(0x2f9)](String(RegExp['$1'])):this['textColor'](Number(_0x500465));},ColorManager[_0x236293(0x2da)]=function(_0x34aa7d){const _0x385576=_0x236293;if(typeof _0x34aa7d===_0x385576(0x1a0))_0x34aa7d=$dataStates[_0x34aa7d];const _0x100ddc=_0x385576(0x1ab)[_0x385576(0x2f9)](_0x34aa7d['id']);this[_0x385576(0x289)]=this[_0x385576(0x289)]||{};if(this[_0x385576(0x289)][_0x100ddc])return this[_0x385576(0x289)][_0x100ddc];const _0x17ae28=this[_0x385576(0x385)](_0x34aa7d);return this[_0x385576(0x2db)](_0x100ddc,_0x17ae28);},ColorManager[_0x236293(0x385)]=function(_0x39ff20){const _0x5e0147=_0x236293,_0x2ee9ef=_0x39ff20[_0x5e0147(0x195)];if(_0x2ee9ef[_0x5e0147(0x356)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x2ee9ef['match'](/<POSITIVE STATE>/i))return VisuMZ[_0x5e0147(0x37b)]['Settings'][_0x5e0147(0x2b4)]['ColorPositive'];else return _0x2ee9ef[_0x5e0147(0x356)](/<NEGATIVE STATE>/i)?VisuMZ[_0x5e0147(0x37b)][_0x5e0147(0x172)][_0x5e0147(0x2b4)]['ColorNegative']:VisuMZ[_0x5e0147(0x37b)][_0x5e0147(0x172)][_0x5e0147(0x2b4)]['ColorNeutral'];}},ColorManager[_0x236293(0x112)]=function(){const _0x12056b=_0x236293,_0x23afb2=_0x12056b(0x22a);this[_0x12056b(0x289)]=this[_0x12056b(0x289)]||{};if(this['_colorCache'][_0x23afb2])return this['_colorCache'][_0x23afb2];const _0x4942dc=VisuMZ[_0x12056b(0x37b)]['Settings']['Buffs'][_0x12056b(0x2ab)];return this[_0x12056b(0x2db)](_0x23afb2,_0x4942dc);},ColorManager[_0x236293(0x326)]=function(){const _0x28052e=_0x236293,_0x5147fb=_0x28052e(0x333);this[_0x28052e(0x289)]=this['_colorCache']||{};if(this['_colorCache'][_0x5147fb])return this[_0x28052e(0x289)][_0x5147fb];const _0x51dbba=VisuMZ[_0x28052e(0x37b)][_0x28052e(0x172)]['Buffs']['ColorDebuff'];return this[_0x28052e(0x2db)](_0x5147fb,_0x51dbba);},SceneManager[_0x236293(0x23b)]=function(){const _0x1beef7=_0x236293;return this['_scene']&&this[_0x1beef7(0xc2)][_0x1beef7(0xe9)]===Scene_Battle;},VisuMZ[_0x236293(0x37b)]['BattleManager_endAction']=BattleManager['endAction'],BattleManager[_0x236293(0x1b5)]=function(){const _0xd07512=_0x236293;this[_0xd07512(0x171)](),VisuMZ[_0xd07512(0x37b)][_0xd07512(0x156)][_0xd07512(0x115)](this);},BattleManager[_0x236293(0x171)]=function(){const _0x531971=_0x236293,_0x357151=VisuMZ[_0x531971(0x37b)][_0x531971(0x172)][_0x531971(0x2b4)];if(!_0x357151)return;if(_0x357151[_0x531971(0x32e)]===![])return;if(!this[_0x531971(0x212)])return;this[_0x531971(0x212)]['updateStatesActionEnd']();},Game_Battler['prototype'][_0x236293(0x171)]=function(){const _0x2d0648=_0x236293;if(BattleManager['_phase']!==_0x2d0648(0x30b))return;if(this[_0x2d0648(0x3ae)]===Graphics[_0x2d0648(0x2d8)])return;this[_0x2d0648(0x3ae)]=Graphics['frameCount'];for(const _0xc52d07 of this[_0x2d0648(0x13e)]){const _0x10d029=$dataStates[_0xc52d07];if(!_0x10d029)continue;if(_0x10d029[_0x2d0648(0x1e5)]!==0x1)continue;this[_0x2d0648(0x149)][_0xc52d07]>0x0&&this[_0x2d0648(0x149)][_0xc52d07]--;}this['removeStatesAuto'](0x1);},Game_BattlerBase[_0x236293(0xd1)]['updateStateTurns']=function(){const _0x5a4899=_0x236293,_0x1903a9=VisuMZ[_0x5a4899(0x37b)][_0x5a4899(0x172)][_0x5a4899(0x2b4)];for(const _0x583a7c of this[_0x5a4899(0x13e)]){const _0x18744d=$dataStates[_0x583a7c];if(_0x1903a9&&_0x1903a9[_0x5a4899(0x32e)]!==![]){if(_0x18744d&&_0x18744d[_0x5a4899(0x1e5)]===0x1)continue;}this[_0x5a4899(0x149)][_0x583a7c]>0x0&&this[_0x5a4899(0x149)][_0x583a7c]--;}},VisuMZ[_0x236293(0x37b)]['Game_Switches_onChange']=Game_Switches['prototype'][_0x236293(0x340)],Game_Switches[_0x236293(0xd1)][_0x236293(0x340)]=function(){const _0x1918b2=_0x236293;VisuMZ['SkillsStatesCore'][_0x1918b2(0x217)]['call'](this);const _0x668fae=VisuMZ[_0x1918b2(0x37b)][_0x1918b2(0x172)][_0x1918b2(0x29d)][_0x1918b2(0x1f2)]??!![];if(!_0x668fae)return;if(SceneManager[_0x1918b2(0x23b)]())for(const _0x322a52 of BattleManager[_0x1918b2(0x1f8)]()){if(_0x322a52)_0x322a52[_0x1918b2(0xac)]();}},VisuMZ[_0x236293(0x37b)][_0x236293(0x12e)]=Game_Variables[_0x236293(0xd1)][_0x236293(0x340)],Game_Variables[_0x236293(0xd1)][_0x236293(0x340)]=function(){const _0x30ec7e=_0x236293;VisuMZ[_0x30ec7e(0x37b)][_0x30ec7e(0x12e)]['call'](this);const _0x481599=VisuMZ[_0x30ec7e(0x37b)][_0x30ec7e(0x172)][_0x30ec7e(0x29d)]['RefreshCacheVar']??!![];if(!_0x481599)return;if(SceneManager[_0x30ec7e(0x23b)]())for(const _0x2aa2c7 of BattleManager[_0x30ec7e(0x1f8)]()){if(_0x2aa2c7)_0x2aa2c7[_0x30ec7e(0xac)]();}},VisuMZ['SkillsStatesCore'][_0x236293(0x19e)]=Game_Action[_0x236293(0xd1)]['applyItemUserEffect'],Game_Action[_0x236293(0xd1)][_0x236293(0x1c0)]=function(_0x5b05ef){const _0x165cb4=_0x236293;VisuMZ[_0x165cb4(0x37b)][_0x165cb4(0x19e)]['call'](this,_0x5b05ef),this[_0x165cb4(0x310)](_0x5b05ef);},Game_Action[_0x236293(0xd1)][_0x236293(0x310)]=function(_0x23ae8c){const _0x19647a=_0x236293;this['applyStateCategoryRemovalEffects'](_0x23ae8c),this['applyStateTurnManipulationEffects'](_0x23ae8c),this[_0x19647a(0x2cb)](_0x23ae8c),this[_0x19647a(0x260)](_0x23ae8c);},VisuMZ[_0x236293(0x37b)][_0x236293(0x101)]=Game_Action[_0x236293(0xd1)][_0x236293(0x315)],Game_Action['prototype'][_0x236293(0x315)]=function(_0x2755eb){const _0xa5b34e=_0x236293;if(this[_0xa5b34e(0x26e)](_0x2755eb))return!![];return VisuMZ['SkillsStatesCore'][_0xa5b34e(0x101)][_0xa5b34e(0x115)](this,_0x2755eb);},Game_Action['prototype'][_0x236293(0x26e)]=function(_0x208ea6){const _0x184609=_0x236293;if(!this[_0x184609(0x191)]())return;const _0x1f4b6f=this[_0x184609(0x191)]()[_0x184609(0x195)];if(_0x1f4b6f[_0x184609(0x356)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x5ab7cc=String(RegExp['$1']);if(_0x208ea6[_0x184609(0x3bd)](_0x5ab7cc))return!![];}if(_0x1f4b6f[_0x184609(0x356)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x402013=Number(RegExp['$1']);if(_0x208ea6[_0x184609(0x256)](_0x402013))return!![];}else{if(_0x1f4b6f[_0x184609(0x356)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x3b4af4=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x208ea6[_0x184609(0x256)](_0x3b4af4))return!![];}}return![];},Game_Action['prototype'][_0x236293(0x354)]=function(_0x4e025e){const _0x17d8c3=_0x236293;if(_0x4e025e[_0x17d8c3(0x241)]()[_0x17d8c3(0x266)]<=0x0)return;const _0x25bdfa=this[_0x17d8c3(0x191)]()[_0x17d8c3(0x195)];{const _0xfdb6ec=_0x25bdfa[_0x17d8c3(0x356)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0xfdb6ec)for(const _0x4cf353 of _0xfdb6ec){_0x4cf353['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x5641ee=String(RegExp['$1']);_0x4e025e[_0x17d8c3(0x161)](_0x5641ee);}}{const _0x2505dc=_0x25bdfa['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x2505dc)for(const _0x23e7dc of _0x2505dc){_0x23e7dc[_0x17d8c3(0x356)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x5deb00=String(RegExp['$1']),_0x52de50=Number(RegExp['$2']);_0x4e025e[_0x17d8c3(0x24a)](_0x5deb00,_0x52de50);}}},Game_Action[_0x236293(0xd1)][_0x236293(0x29a)]=function(_0x4a0d28){const _0x515d39=_0x236293,_0x39646e=this['item']()[_0x515d39(0x195)],_0x3428b4=_0x39646e['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x3428b4)for(const _0x4fac00 of _0x3428b4){let _0x1375b7=0x0,_0x515eb9=0x0;if(_0x4fac00['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x1375b7=Number(RegExp['$1']),_0x515eb9=Number(RegExp['$2']);else _0x4fac00[_0x515d39(0x356)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x1375b7=DataManager[_0x515d39(0x265)](RegExp['$1']),_0x515eb9=Number(RegExp['$2']));_0x4a0d28[_0x515d39(0x2ac)](_0x1375b7,_0x515eb9),this['makeSuccess'](_0x4a0d28);}const _0x3801c0=_0x39646e[_0x515d39(0x356)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3801c0)for(const _0x2dc22e of _0x3801c0){let _0x56c3f3=0x0,_0x191572=0x0;if(_0x2dc22e[_0x515d39(0x356)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x56c3f3=Number(RegExp['$1']),_0x191572=Number(RegExp['$2']);else _0x2dc22e['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x56c3f3=DataManager[_0x515d39(0x265)](RegExp['$1']),_0x191572=Number(RegExp['$2']));_0x4a0d28[_0x515d39(0xd6)](_0x56c3f3,_0x191572),this[_0x515d39(0x2f0)](_0x4a0d28);}},Game_Action[_0x236293(0xd1)][_0x236293(0x2cb)]=function(_0x195731){const _0x3f6d74=_0x236293,_0x3007da=['MAXHP','MAXMP',_0x3f6d74(0x33c),'DEF',_0x3f6d74(0x1db),_0x3f6d74(0x1a8),_0x3f6d74(0x24d),'LUK'],_0x8efa28=this[_0x3f6d74(0x191)]()[_0x3f6d74(0x195)],_0xac92ed=_0x8efa28[_0x3f6d74(0x356)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0xac92ed)for(const _0x3877c of _0xac92ed){_0x3877c[_0x3f6d74(0x356)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x2994ab=_0x3007da['indexOf'](String(RegExp['$1'])[_0x3f6d74(0x2af)]()),_0x3a2e83=Number(RegExp['$2']);_0x2994ab>=0x0&&(_0x195731[_0x3f6d74(0x331)](_0x2994ab,_0x3a2e83),this['makeSuccess'](_0x195731));}const _0x7f6a42=_0x8efa28[_0x3f6d74(0x356)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x7f6a42)for(const _0x1a6b91 of _0xac92ed){_0x1a6b91[_0x3f6d74(0x356)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x108b39=_0x3007da[_0x3f6d74(0x1c3)](String(RegExp['$1'])[_0x3f6d74(0x2af)]()),_0x174de8=Number(RegExp['$2']);_0x108b39>=0x0&&(_0x195731[_0x3f6d74(0x224)](_0x108b39,_0x174de8),this['makeSuccess'](_0x195731));}},Game_Action[_0x236293(0xd1)]['applyDebuffTurnManipulationEffects']=function(_0x483a7e){const _0x169bad=_0x236293,_0x1317ca=[_0x169bad(0x32f),_0x169bad(0x188),'ATK',_0x169bad(0x117),_0x169bad(0x1db),'MDF',_0x169bad(0x24d),_0x169bad(0x138)],_0x345fd9=this['item']()['note'],_0x19f079=_0x345fd9['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x19f079)for(const _0x3bd991 of _0x19f079){_0x3bd991[_0x169bad(0x356)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0xa69116=_0x1317ca['indexOf'](String(RegExp['$1'])[_0x169bad(0x2af)]()),_0x3671d2=Number(RegExp['$2']);_0xa69116>=0x0&&(_0x483a7e[_0x169bad(0x38f)](_0xa69116,_0x3671d2),this[_0x169bad(0x2f0)](_0x483a7e));}const _0x10c522=_0x345fd9['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x10c522)for(const _0x509f32 of _0x19f079){_0x509f32[_0x169bad(0x356)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x34a460=_0x1317ca[_0x169bad(0x1c3)](String(RegExp['$1'])[_0x169bad(0x2af)]()),_0x25b2c5=Number(RegExp['$2']);_0x34a460>=0x0&&(_0x483a7e['addDebuffTurns'](_0x34a460,_0x25b2c5),this[_0x169bad(0x2f0)](_0x483a7e));}},VisuMZ['SkillsStatesCore'][_0x236293(0xec)]=Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x2f1)],Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x2f1)]=function(){const _0x438213=_0x236293;this[_0x438213(0x207)]={},this['initMembersSkillsStatesCore'](),VisuMZ[_0x438213(0x37b)][_0x438213(0xec)][_0x438213(0x115)](this);},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0xa3)]=function(){const _0x1246e0=_0x236293;this[_0x1246e0(0x18b)]='',this[_0x1246e0(0x1da)]={},this[_0x1246e0(0x20b)]={},this[_0x1246e0(0x1be)]={},this[_0x1246e0(0x3aa)]={};},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x16d)]=function(_0x5f375d){const _0x6e377d=_0x236293;return this[_0x6e377d(0x207)]=this[_0x6e377d(0x207)]||{},this['_cache'][_0x5f375d]!==undefined;},VisuMZ[_0x236293(0x37b)][_0x236293(0x321)]=Game_BattlerBase[_0x236293(0xd1)][_0x236293(0xac)],Game_BattlerBase['prototype'][_0x236293(0xac)]=function(){const _0x23c5da=_0x236293;this['_cache']={},VisuMZ[_0x23c5da(0x37b)][_0x23c5da(0x321)][_0x23c5da(0x115)](this);},VisuMZ[_0x236293(0x37b)][_0x236293(0x175)]=Game_BattlerBase['prototype'][_0x236293(0x17b)],Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x17b)]=function(_0x2aa09b){const _0x491490=_0x236293;let _0x3ea7de=this['isStateAffected'](_0x2aa09b);VisuMZ['SkillsStatesCore'][_0x491490(0x175)][_0x491490(0x115)](this,_0x2aa09b);if(_0x3ea7de&&!this[_0x491490(0x256)](_0x2aa09b))this[_0x491490(0x194)](_0x2aa09b);},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x194)]=function(_0x121de1){const _0x4e8869=_0x236293;this[_0x4e8869(0xb4)](_0x121de1),this[_0x4e8869(0x274)](_0x121de1);},VisuMZ[_0x236293(0x37b)][_0x236293(0x215)]=Game_Battler[_0x236293(0xd1)]['onBattleEnd'],Game_Battler[_0x236293(0xd1)][_0x236293(0x216)]=function(){const _0x4d519f=_0x236293;VisuMZ[_0x4d519f(0x37b)]['Game_Battler_onBattleEnd'][_0x4d519f(0x115)](this),this['clearAllStateOrigins'](),this[_0x4d519f(0x378)]=0x0,this[_0x4d519f(0x3b4)]=0x0;},VisuMZ[_0x236293(0x37b)][_0x236293(0x390)]=Game_BattlerBase[_0x236293(0xd1)]['resetStateCounts'],Game_BattlerBase[_0x236293(0xd1)]['resetStateCounts']=function(_0x14075f){const _0x205329=_0x236293,_0x22d56b=$dataStates[_0x14075f],_0x7ea12a=this[_0x205329(0x113)](_0x14075f),_0x46d8a9=this[_0x205329(0x166)](_0x22d56b)[_0x205329(0x173)]()[_0x205329(0x1ba)]();switch(_0x46d8a9){case _0x205329(0x37c):if(_0x7ea12a<=0x0)this[_0x205329(0x220)](_0x14075f);break;case _0x205329(0x1ed):this[_0x205329(0x220)](_0x14075f);break;case _0x205329(0x123):this[_0x205329(0x220)](_0x14075f),this[_0x205329(0x149)][_0x14075f]=Math[_0x205329(0x198)](this[_0x205329(0x149)][_0x14075f],_0x7ea12a);break;case'add':this[_0x205329(0x220)](_0x14075f),this[_0x205329(0x149)][_0x14075f]+=_0x7ea12a;break;default:this[_0x205329(0x220)](_0x14075f);break;}if(this[_0x205329(0x256)](_0x14075f)){const _0x3e0005=DataManager[_0x205329(0xbe)](_0x14075f);this['_stateTurns'][_0x14075f]=this[_0x205329(0x149)][_0x14075f]['clamp'](0x0,_0x3e0005);}},Game_BattlerBase[_0x236293(0xd1)]['prepareResetStateCounts']=function(_0x8f7650){const _0x2e2250=_0x236293;VisuMZ[_0x2e2250(0x37b)][_0x2e2250(0x390)][_0x2e2250(0x115)](this,_0x8f7650);},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x166)]=function(_0x58e72e){const _0xe62581=_0x236293,_0x2c79ec=_0x58e72e[_0xe62581(0x195)];return _0x2c79ec[_0xe62581(0x356)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0xe62581(0x37b)][_0xe62581(0x172)]['States'][_0xe62581(0xf6)];},VisuMZ['SkillsStatesCore'][_0x236293(0x1fa)]=Game_BattlerBase[_0x236293(0xd1)]['overwriteBuffTurns'],Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x30f)]=function(_0x4c587b,_0x42bcce){const _0xc31645=_0x236293,_0xdf4cd2=VisuMZ['SkillsStatesCore'][_0xc31645(0x172)]['Buffs'][_0xc31645(0xf6)],_0x7263e4=this[_0xc31645(0x155)](_0x4c587b);switch(_0xdf4cd2){case _0xc31645(0x37c):if(_0x7263e4<=0x0)this[_0xc31645(0x2b8)][_0x4c587b]=_0x42bcce;break;case'reset':this[_0xc31645(0x2b8)][_0x4c587b]=_0x42bcce;break;case _0xc31645(0x123):this[_0xc31645(0x2b8)][_0x4c587b]=Math[_0xc31645(0x198)](_0x7263e4,_0x42bcce);break;case _0xc31645(0x1c1):this[_0xc31645(0x2b8)][_0x4c587b]+=_0x42bcce;break;default:VisuMZ[_0xc31645(0x37b)][_0xc31645(0x1fa)][_0xc31645(0x115)](this,_0x4c587b,_0x42bcce);break;}const _0x4fcfde=VisuMZ[_0xc31645(0x37b)][_0xc31645(0x172)][_0xc31645(0x1d1)][_0xc31645(0x167)];this[_0xc31645(0x2b8)][_0x4c587b]=this['_buffTurns'][_0x4c587b]['clamp'](0x0,_0x4fcfde);},Game_BattlerBase[_0x236293(0xd1)]['isGroupDefeatStateAffected']=function(){const _0x1dc40b=_0x236293;if(this[_0x1dc40b(0x207)][_0x1dc40b(0x17c)]!==undefined)return this['_cache'][_0x1dc40b(0x17c)];this[_0x1dc40b(0x207)]['groupDefeat']=![];const _0xf71a09=this['states']();for(const _0x479197 of _0xf71a09){if(!_0x479197)continue;if(_0x479197[_0x1dc40b(0x195)]['match'](/<GROUP DEFEAT>/i)){this[_0x1dc40b(0x207)][_0x1dc40b(0x17c)]=!![];break;}}return this[_0x1dc40b(0x207)][_0x1dc40b(0x17c)];},VisuMZ[_0x236293(0x37b)]['Game_Unit_deadMembers']=Game_Unit[_0x236293(0xd1)]['deadMembers'],Game_Unit['prototype']['deadMembers']=function(){const _0x18858e=_0x236293;let _0x947dfd=VisuMZ[_0x18858e(0x37b)][_0x18858e(0x21e)][_0x18858e(0x115)](this);return BattleManager['_endingBattle']&&(_0x947dfd=_0x947dfd['concat'](this['members']()['filter'](_0x1ded31=>_0x1ded31['isGroupDefeatStateAffected']()))),_0x947dfd;},VisuMZ[_0x236293(0x37b)][_0x236293(0x239)]=Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x269)],Game_BattlerBase['prototype'][_0x236293(0x269)]=function(){const _0x661f0d=_0x236293;this[_0x661f0d(0x363)]()!==''?this['clearStatesWithStateRetain']():(VisuMZ[_0x661f0d(0x37b)]['Game_BattlerBase_clearStates'][_0x661f0d(0x115)](this),this[_0x661f0d(0xa3)]());},Game_Actor[_0x236293(0xd1)][_0x236293(0x269)]=function(){const _0x6444eb=_0x236293;this['_stateSteps']=this['_stateSteps']||{},Game_Battler[_0x6444eb(0xd1)]['clearStates'][_0x6444eb(0x115)](this);},Game_BattlerBase[_0x236293(0xd1)]['clearStatesWithStateRetain']=function(){const _0x166bb3=_0x236293,_0x5ec5cf=this[_0x166bb3(0x241)]();for(const _0x5060be of _0x5ec5cf){if(_0x5060be&&this[_0x166bb3(0x18c)](_0x5060be))this[_0x166bb3(0x17b)](_0x5060be['id']);}this[_0x166bb3(0x207)]={};},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x18c)]=function(_0x305184){const _0x53338b=_0x236293,_0xe20468=this[_0x53338b(0x363)]();if(_0xe20468!==''){const _0x3d1ed5=_0x305184[_0x53338b(0x195)];if(_0xe20468==='death'&&_0x3d1ed5['match'](/<NO DEATH CLEAR>/i))return![];if(_0xe20468===_0x53338b(0x1ee)&&_0x3d1ed5['match'](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x53338b(0x256)](_0x305184['id']);},Game_BattlerBase[_0x236293(0xd1)]['getStateRetainType']=function(){const _0x224dc6=_0x236293;return this[_0x224dc6(0x18b)];},Game_BattlerBase['prototype'][_0x236293(0x3a6)]=function(_0x53aa5b){const _0x5d585b=_0x236293;this[_0x5d585b(0x18b)]=_0x53aa5b;},Game_BattlerBase['prototype'][_0x236293(0x140)]=function(){const _0x3b9e41=_0x236293;this[_0x3b9e41(0x18b)]='';},VisuMZ[_0x236293(0x37b)]['Game_BattlerBase_die']=Game_BattlerBase[_0x236293(0xd1)]['die'],Game_BattlerBase['prototype'][_0x236293(0x1de)]=function(){const _0x38293c=_0x236293;this[_0x38293c(0x3a6)](_0x38293c(0x223)),VisuMZ[_0x38293c(0x37b)][_0x38293c(0x348)][_0x38293c(0x115)](this),this['clearStateRetainType']();},VisuMZ[_0x236293(0x37b)][_0x236293(0xaa)]=Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x181)],Game_BattlerBase[_0x236293(0xd1)]['recoverAll']=function(){const _0x463089=_0x236293;this[_0x463089(0x3a6)]('recover\x20all'),VisuMZ[_0x463089(0x37b)][_0x463089(0xaa)]['call'](this),this[_0x463089(0x140)]();},Game_BattlerBase['prototype'][_0x236293(0x2bc)]=function(_0x2f31ff,_0x8621b3,_0x4c8ed8){return _0x8621b3;},Game_BattlerBase[_0x236293(0xd1)]['canPaySkillCost']=function(_0x5e7e54){const _0x56eb6a=_0x236293;for(settings of VisuMZ[_0x56eb6a(0x37b)][_0x56eb6a(0x172)][_0x56eb6a(0x17e)]){let _0x10abf7=settings[_0x56eb6a(0x327)][_0x56eb6a(0x115)](this,_0x5e7e54);_0x10abf7=this['adjustSkillCost'](_0x5e7e54,_0x10abf7,settings);if(!settings[_0x56eb6a(0x275)][_0x56eb6a(0x115)](this,_0x5e7e54,_0x10abf7))return![];}return!![];},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x3a8)]=function(_0x3fdecd){const _0x1a2806=_0x236293;for(settings of VisuMZ[_0x1a2806(0x37b)]['Settings'][_0x1a2806(0x17e)]){let _0x36877a=settings[_0x1a2806(0x327)][_0x1a2806(0x115)](this,_0x3fdecd);_0x36877a=this[_0x1a2806(0x2bc)](_0x3fdecd,_0x36877a,settings),settings[_0x1a2806(0x2aa)][_0x1a2806(0x115)](this,_0x3fdecd,_0x36877a);}},VisuMZ[_0x236293(0x37b)][_0x236293(0x298)]=Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x204)],Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x204)]=function(_0x46b777){const _0x226ea9=_0x236293;if(!_0x46b777)return![];if(!VisuMZ[_0x226ea9(0x37b)][_0x226ea9(0x298)][_0x226ea9(0x115)](this,_0x46b777))return![];if(!this[_0x226ea9(0x1d3)](_0x46b777))return![];if(!this['meetsSkillConditionsEnableJS'](_0x46b777))return![];if(!this[_0x226ea9(0x2ea)](_0x46b777))return![];return!![];},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x1d3)]=function(_0x5dfef9){const _0x3bad2f=_0x236293;if(!this[_0x3bad2f(0xa1)](_0x5dfef9))return![];return!![];},Game_BattlerBase['prototype'][_0x236293(0xa1)]=function(_0xe09f00){const _0x38dfa3=_0x236293,_0x504f51=_0xe09f00[_0x38dfa3(0x195)];if(_0x504f51['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5bea5f=JSON[_0x38dfa3(0x1dc)]('['+RegExp['$1'][_0x38dfa3(0x356)](/\d+/g)+']');for(const _0x5b5cfe of _0x5bea5f){if(!$gameSwitches[_0x38dfa3(0x3b3)](_0x5b5cfe))return![];}return!![];}if(_0x504f51['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29de93=JSON[_0x38dfa3(0x1dc)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2ef786 of _0x29de93){if(!$gameSwitches['value'](_0x2ef786))return![];}return!![];}if(_0x504f51[_0x38dfa3(0x356)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2d3cb6=JSON['parse']('['+RegExp['$1'][_0x38dfa3(0x356)](/\d+/g)+']');for(const _0x73a0cf of _0x2d3cb6){if($gameSwitches[_0x38dfa3(0x3b3)](_0x73a0cf))return!![];}return![];}if(_0x504f51[_0x38dfa3(0x356)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x47df13=JSON[_0x38dfa3(0x1dc)]('['+RegExp['$1'][_0x38dfa3(0x356)](/\d+/g)+']');for(const _0x167303 of _0x47df13){if(!$gameSwitches[_0x38dfa3(0x3b3)](_0x167303))return!![];}return![];}if(_0x504f51[_0x38dfa3(0x356)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xea13df=JSON[_0x38dfa3(0x1dc)]('['+RegExp['$1'][_0x38dfa3(0x356)](/\d+/g)+']');for(const _0xbc03e5 of _0xea13df){if(!$gameSwitches[_0x38dfa3(0x3b3)](_0xbc03e5))return!![];}return![];}if(_0x504f51[_0x38dfa3(0x356)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x301c65=JSON[_0x38dfa3(0x1dc)]('['+RegExp['$1'][_0x38dfa3(0x356)](/\d+/g)+']');for(const _0x4448e6 of _0x301c65){if($gameSwitches[_0x38dfa3(0x3b3)](_0x4448e6))return![];}return!![];}return!![];},Game_BattlerBase['prototype'][_0x236293(0xf9)]=function(_0x917d2a){const _0x10db2a=_0x236293,_0x170d51=_0x917d2a['note'],_0x5dd391=VisuMZ[_0x10db2a(0x37b)][_0x10db2a(0x389)];return _0x5dd391[_0x917d2a['id']]?_0x5dd391[_0x917d2a['id']]['call'](this,_0x917d2a):!![];},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x2ea)]=function(_0x178ef4){const _0x2be2f1=_0x236293;return VisuMZ[_0x2be2f1(0x37b)]['Settings']['Skills'][_0x2be2f1(0x277)][_0x2be2f1(0x115)](this,_0x178ef4);},VisuMZ[_0x236293(0x37b)][_0x236293(0x3a2)]=Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x38d)],Game_BattlerBase[_0x236293(0xd1)]['skillMpCost']=function(_0x38861c){const _0x25b5ea=_0x236293;for(settings of VisuMZ['SkillsStatesCore'][_0x25b5ea(0x172)]['Costs']){if(settings[_0x25b5ea(0xcb)][_0x25b5ea(0x2af)]()==='MP'){let _0x2fa08e=settings[_0x25b5ea(0x327)][_0x25b5ea(0x115)](this,_0x38861c);return _0x2fa08e=this[_0x25b5ea(0x2bc)](_0x38861c,_0x2fa08e,settings),_0x2fa08e;}}return VisuMZ[_0x25b5ea(0x37b)][_0x25b5ea(0x3a2)][_0x25b5ea(0x115)](this,_0x38861c);},VisuMZ[_0x236293(0x37b)][_0x236293(0x13d)]=Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x2a1)],Game_BattlerBase['prototype'][_0x236293(0x2a1)]=function(_0x4c74a1){const _0x1e739a=_0x236293;for(settings of VisuMZ[_0x1e739a(0x37b)][_0x1e739a(0x172)][_0x1e739a(0x17e)]){if(settings[_0x1e739a(0xcb)][_0x1e739a(0x2af)]()==='TP'){let _0x3ae792=settings[_0x1e739a(0x327)][_0x1e739a(0x115)](this,_0x4c74a1);return _0x3ae792=this['adjustSkillCost'](_0x4c74a1,_0x3ae792,settings),_0x3ae792;}}return VisuMZ['SkillsStatesCore'][_0x1e739a(0x13d)][_0x1e739a(0x115)](this,_0x4c74a1);},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x30e)]=function(_0x23b320){const _0x1a9d16=_0x236293;if(typeof _0x23b320==='number')_0x23b320=$dataStates[_0x23b320];return this[_0x1a9d16(0x241)]()[_0x1a9d16(0x31f)](_0x23b320);},VisuMZ[_0x236293(0x37b)][_0x236293(0x370)]=Game_BattlerBase['prototype'][_0x236293(0x241)],Game_BattlerBase[_0x236293(0xd1)]['states']=function(){const _0x56a7a7=_0x236293;let _0x2394f6=VisuMZ[_0x56a7a7(0x37b)]['Game_BattlerBase_states'][_0x56a7a7(0x115)](this);if($gameTemp[_0x56a7a7(0x39d)])return _0x2394f6;return $gameTemp[_0x56a7a7(0x39d)]=!![],this[_0x56a7a7(0x33d)](_0x2394f6),$gameTemp['_checkingPassiveStates']=undefined,_0x2394f6;},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x33d)]=function(_0x4d34bc){const _0xe540de=_0x236293,_0x4d2d5b=this[_0xe540de(0x184)]();for(state of _0x4d2d5b){if(!state)continue;if(!this['isPassiveStateStackable'](state)&&_0x4d34bc[_0xe540de(0x31f)](state))continue;_0x4d34bc[_0xe540de(0x295)](state);}_0x4d2d5b['length']>0x0&&_0x4d34bc[_0xe540de(0x1c4)]((_0x5c63b9,_0x1fdd0a)=>{const _0x59bba0=_0xe540de,_0x4b4860=_0x5c63b9[_0x59bba0(0x14b)],_0x40ddb0=_0x1fdd0a[_0x59bba0(0x14b)];if(_0x4b4860!==_0x40ddb0)return _0x40ddb0-_0x4b4860;return _0x5c63b9-_0x1fdd0a;});},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x10f)]=function(_0x53587c){const _0x18d8d7=_0x236293;return _0x53587c[_0x18d8d7(0x195)][_0x18d8d7(0x356)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x236293(0x37b)][_0x236293(0x2e9)]=Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x3b1)],Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x3b1)]=function(_0x4580e0){const _0x28bd8d=_0x236293;this['_checkingTraitsSetSkillsStatesCore']=!![];let _0x1d6a67=VisuMZ[_0x28bd8d(0x37b)]['Game_BattlerBase_traitsSet'][_0x28bd8d(0x115)](this,_0x4580e0);return this[_0x28bd8d(0x259)]=undefined,_0x1d6a67;},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x253)]=function(){const _0x19546d=_0x236293;let _0x2cc985=[];this[_0x19546d(0x252)]=this['_passiveStateResults']||{};for(;;){_0x2cc985=[];let _0x56b218=!![];for(const _0x277964 of this[_0x19546d(0x207)][_0x19546d(0x184)]){const _0x2b1585=$dataStates[_0x277964];if(!_0x2b1585)continue;let _0x426741=this[_0x19546d(0xe7)](_0x2b1585);this[_0x19546d(0x252)][_0x277964]!==_0x426741&&(_0x56b218=![],this[_0x19546d(0x252)][_0x277964]=_0x426741);if(!_0x426741)continue;_0x2cc985[_0x19546d(0x295)](_0x2b1585);}if(_0x56b218)break;else{if(!this[_0x19546d(0x259)])this['refresh']();this[_0x19546d(0x110)]();}}return _0x2cc985;},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0xe7)]=function(_0x589e62){const _0x1ff0b5=_0x236293;if(!this[_0x1ff0b5(0x1d5)](_0x589e62))return![];if(!this['meetsPassiveStateConditionSwitches'](_0x589e62))return![];if(!this[_0x1ff0b5(0x254)](_0x589e62))return![];if(!this['meetsPassiveStateGlobalConditionJS'](_0x589e62))return![];return!![];},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x1d5)]=function(_0xc0b763){return!![];},Game_Actor[_0x236293(0xd1)][_0x236293(0x1d5)]=function(_0x47848a){const _0x9b20f3=_0x236293,_0x48df2f=DataManager[_0x9b20f3(0xcd)](_0x47848a);if(_0x48df2f[_0x9b20f3(0x362)][_0x9b20f3(0x266)]>0x0){const _0x54059b=_0x48df2f['currentClass'];if(!_0x54059b[_0x9b20f3(0x31f)](this[_0x9b20f3(0x362)]()))return![];}if(_0x48df2f['multiClass'][_0x9b20f3(0x266)]>0x0){const _0x1f8f35=_0x48df2f[_0x9b20f3(0x20d)];let _0x4d616e=[this[_0x9b20f3(0x362)]()];Imported[_0x9b20f3(0x39e)]&&this['multiclasses']&&(_0x4d616e=this[_0x9b20f3(0x19d)]());if(_0x1f8f35[_0x9b20f3(0x1e7)](_0x316489=>_0x4d616e[_0x9b20f3(0x31f)](_0x316489))['length']<=0x0)return![];}return Game_BattlerBase[_0x9b20f3(0xd1)][_0x9b20f3(0x1d5)][_0x9b20f3(0x115)](this,_0x47848a);},DataManager[_0x236293(0xcd)]=function(_0xe91695){const _0x118029=_0x236293,_0x11544f={'currentClass':[],'multiClass':[]};if(!_0xe91695)return _0x11544f;this[_0x118029(0x343)]=this[_0x118029(0x343)]||{};if(this[_0x118029(0x343)][_0xe91695['id']]!==undefined)return this[_0x118029(0x343)][_0xe91695['id']];const _0x331e95=_0xe91695[_0x118029(0x195)]||'';if(_0x331e95[_0x118029(0x356)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x1de199=String(RegExp['$1'])[_0x118029(0x393)](',')[_0x118029(0xa0)](_0xe9f99c=>_0xe9f99c[_0x118029(0x1ba)]());_0x11544f[_0x118029(0x362)]=VisuMZ[_0x118029(0x37b)][_0x118029(0x313)](_0x1de199);}if(_0x331e95[_0x118029(0x356)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x44fccb=String(RegExp['$1'])[_0x118029(0x393)](',')['map'](_0x213e43=>_0x213e43[_0x118029(0x1ba)]());_0x11544f['multiClass']=VisuMZ[_0x118029(0x37b)]['ParseClassIDs'](_0x44fccb);}return this[_0x118029(0x343)][_0xe91695['id']]=_0x11544f,this[_0x118029(0x343)][_0xe91695['id']];},VisuMZ[_0x236293(0x37b)][_0x236293(0x313)]=function(_0x3bed63){const _0x39bd84=_0x236293,_0x81f230=[];for(let _0x474623 of _0x3bed63){_0x474623=(String(_0x474623)||'')['trim']();const _0x5c2b5e=/^\d+$/[_0x39bd84(0x1f4)](_0x474623);_0x5c2b5e?_0x81f230[_0x39bd84(0x295)](Number(_0x474623)):_0x81f230[_0x39bd84(0x295)](DataManager[_0x39bd84(0x30d)](_0x474623));}return _0x81f230['map'](_0x287f11=>$dataClasses[Number(_0x287f11)])[_0x39bd84(0x3b8)](null);},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x258)]=function(_0x1de7a1){const _0x3639f1=_0x236293,_0x3f6966=DataManager['getPassiveStateConditionSwitchData'](_0x1de7a1);if(_0x3f6966[_0x3639f1(0x2a7)]&&_0x3f6966[_0x3639f1(0x2a7)][_0x3639f1(0x266)]>0x0){const _0x451e28=_0x3f6966[_0x3639f1(0x2a7)];for(const _0x380cc4 of _0x451e28){if(!$gameSwitches[_0x3639f1(0x3b3)](_0x380cc4))return![];}}if(_0x3f6966['anySwitchOn']&&_0x3f6966['anySwitchOn'][_0x3639f1(0x266)]>0x0){const _0x18c3a0=_0x3f6966[_0x3639f1(0x3b6)];let _0x1dbc89=!![];for(const _0x3cd564 of _0x18c3a0){if($gameSwitches[_0x3639f1(0x3b3)](_0x3cd564)){_0x1dbc89=![];break;}}if(_0x1dbc89)return![];}if(_0x3f6966[_0x3639f1(0x144)]&&_0x3f6966['allSwitchOff'][_0x3639f1(0x266)]>0x0){const _0x4e4276=_0x3f6966[_0x3639f1(0x144)];for(const _0x20071f of _0x4e4276){if($gameSwitches[_0x3639f1(0x3b3)](_0x20071f))return![];}}if(_0x3f6966[_0x3639f1(0x332)]&&_0x3f6966['anySwitchOff'][_0x3639f1(0x266)]>0x0){const _0x498c02=_0x3f6966[_0x3639f1(0x332)];let _0x34c284=!![];for(const _0x4a9121 of _0x498c02){if(!$gameSwitches[_0x3639f1(0x3b3)](_0x4a9121)){_0x34c284=![];break;}}if(_0x34c284)return![];}return!![];},DataManager[_0x236293(0x388)]=function(_0x1a088c){const _0x2def53=_0x236293;let _0x1815b0={'allSwitchOn':[],'anySwitchOn':[],'allSwitchOff':[],'anySwitchOff':[]};if(!_0x1a088c)return _0x1815b0;const _0x1a62c6=_0x1a088c['id'];this[_0x2def53(0xf8)]=this[_0x2def53(0xf8)]||{};if(this['_cache_getPassiveStateConditionSwitchData'][_0x1a62c6]!==undefined)return this[_0x2def53(0xf8)][_0x1a62c6];const _0x30cc0a=_0x1a088c[_0x2def53(0x195)]||'';return _0x30cc0a[_0x2def53(0x356)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x1815b0['allSwitchOn']=String(RegExp['$1'])['split'](',')[_0x2def53(0xa0)](_0x487a6e=>Number(_0x487a6e))),_0x30cc0a['match'](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x1815b0[_0x2def53(0x3b6)]=String(RegExp['$1'])[_0x2def53(0x393)](',')[_0x2def53(0xa0)](_0x17c43f=>Number(_0x17c43f))),_0x30cc0a[_0x2def53(0x356)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x1815b0[_0x2def53(0x144)]=String(RegExp['$1'])[_0x2def53(0x393)](',')[_0x2def53(0xa0)](_0x5aabec=>Number(_0x5aabec))),_0x30cc0a[_0x2def53(0x356)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x1815b0['anySwitchOff']=String(RegExp['$1'])['split'](',')[_0x2def53(0xa0)](_0x38e022=>Number(_0x38e022))),this[_0x2def53(0xf8)][_0x1a62c6]=_0x1815b0,this[_0x2def53(0xf8)][_0x1a62c6];},Game_BattlerBase[_0x236293(0xd1)]['meetsPassiveStateConditionJS']=function(_0x45e066){const _0x1010eb=_0x236293,_0x4e3069=VisuMZ[_0x1010eb(0x37b)][_0x1010eb(0x32a)];if(_0x4e3069[_0x45e066['id']]){this['_prevPassiveJsFrameCount']=this[_0x1010eb(0x378)]||0x0,this[_0x1010eb(0x3b4)]=this[_0x1010eb(0x3b4)]||0x0;this[_0x1010eb(0x378)]!==Graphics[_0x1010eb(0x2d8)]&&(this['_prevPassiveJsFrameCount']=Graphics[_0x1010eb(0x2d8)],this['_prevPassiveJsResults']={},this['_prevPassiveJsCounter']=0x0);this[_0x1010eb(0x3b4)]++;if(this[_0x1010eb(0x3b4)]>=0x1e)return this[_0x1010eb(0x20f)][_0x45e066['id']]??!![];else{const _0x3a678f=_0x4e3069[_0x45e066['id']][_0x1010eb(0x115)](this,_0x45e066);return this[_0x1010eb(0x20f)][_0x45e066['id']]=_0x3a678f,_0x3a678f;}}else return!![];},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x134)]=function(_0x2f203d){const _0x393125=_0x236293;return VisuMZ['SkillsStatesCore']['Settings'][_0x393125(0x29d)][_0x393125(0x282)][_0x393125(0x115)](this,_0x2f203d);},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x184)]=function(){const _0x366664=_0x236293;if(this[_0x366664(0x16d)](_0x366664(0x184)))return this[_0x366664(0x253)]();if(this[_0x366664(0x2a2)])return[];return this[_0x366664(0x2a2)]=!![],this['createPassiveStatesCache'](),this[_0x366664(0x2a2)]=undefined,this[_0x366664(0x253)]();},Game_BattlerBase[_0x236293(0xd1)]['createPassiveStatesCache']=function(){const _0x502610=_0x236293;this['_checkingVisuMzPassiveStateObjects']=!![],this['_cache'][_0x502610(0x184)]=[],this[_0x502610(0x19c)](),this[_0x502610(0x14c)](),this['addPassiveStatesByPluginParameters'](),Game_BattlerBase[_0x502610(0x337)]&&this[_0x502610(0x11b)](),this[_0x502610(0x207)][_0x502610(0x184)]=this['_cache'][_0x502610(0x184)][_0x502610(0x1c4)]((_0x649ce0,_0x58e7a4)=>_0x649ce0-_0x58e7a4),this[_0x502610(0x2a2)]=undefined;},Game_BattlerBase[_0x236293(0xd1)]['addPassiveStatesFromOtherPlugins']=function(){const _0x153df6=_0x236293;if(Imported['VisuMZ_1_ElementStatusCore'])this[_0x153df6(0x1b3)]();},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x145)]=function(){return[];},Game_BattlerBase[_0x236293(0xd1)]['addPassiveStatesByNotetag']=function(){const _0x39c0cc=_0x236293,_0x829344=this[_0x39c0cc(0x207)][_0x39c0cc(0x184)]||[],_0x5209d5=this[_0x39c0cc(0x145)]();this['_cache'][_0x39c0cc(0x184)]=_0x829344||[];for(const _0x422378 of _0x5209d5){if(!_0x422378)continue;const _0x1c154d=DataManager[_0x39c0cc(0x2bd)](_0x422378);for(const _0x18bc1f of _0x1c154d){this[_0x39c0cc(0x207)][_0x39c0cc(0x184)][_0x39c0cc(0x295)](_0x18bc1f);}}},DataManager['getPassiveStatesFromObj']=function(_0x38db56){const _0x41e05e=_0x236293;if(!_0x38db56)return[];const _0x4e0c62=VisuMZ['SkillsStatesCore'][_0x41e05e(0x152)](_0x38db56,_0x41e05e(0x218));this['_cache_getPassiveStatesFromObj']=this[_0x41e05e(0x319)]||{};if(this[_0x41e05e(0x319)][_0x4e0c62]!==undefined)return this[_0x41e05e(0x319)][_0x4e0c62];const _0x34e135=[],_0x2fa7f4=_0x38db56['note']||'',_0x292893=/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,_0x4c53d2=_0x2fa7f4['match'](_0x292893);if(_0x4c53d2)for(const _0xce1411 of _0x4c53d2){_0xce1411[_0x41e05e(0x356)](_0x292893);const _0x26b531=String(RegExp['$1'])[_0x41e05e(0x393)](',')[_0x41e05e(0xa0)](_0x6e10a1=>_0x6e10a1[_0x41e05e(0x1ba)]());for(const _0x317c5a of _0x26b531){const _0x5795ba=/^\d+$/[_0x41e05e(0x1f4)](_0x317c5a);let _0x9cad33=0x0;_0x5795ba?_0x9cad33=Number(_0x317c5a):_0x9cad33=DataManager[_0x41e05e(0x265)](_0x317c5a),_0x9cad33&&_0x34e135[_0x41e05e(0x295)](_0x9cad33);}}return this['_cache_getPassiveStatesFromObj'][_0x4e0c62]=_0x34e135,this[_0x41e05e(0x319)][_0x4e0c62];},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x377)]=function(){const _0x4fb86a=_0x236293,_0x268d8a=VisuMZ[_0x4fb86a(0x37b)][_0x4fb86a(0x172)][_0x4fb86a(0x29d)][_0x4fb86a(0x2a5)];this[_0x4fb86a(0x207)][_0x4fb86a(0x184)]=this['_cache']['passiveStates'][_0x4fb86a(0x1af)](_0x268d8a);},Game_BattlerBase[_0x236293(0x337)]=![],Scene_Boot[_0x236293(0xd1)]['process_VisuMZ_SkillsStatesCore_CheckForAuras']=function(){const _0x3c7b80=_0x236293,_0x24624e=[$dataActors,$dataClasses,$dataSkills,$dataWeapons,$dataArmors,$dataEnemies];for(const _0x106854 of _0x24624e){for(const _0x3a8d6d of _0x106854){if(!_0x3a8d6d)continue;const _0x27e0a3=_0x3a8d6d[_0x3c7b80(0x195)]||'';if(_0x27e0a3[_0x3c7b80(0x356)](/<(?:AURA|MIASMA) (?:STATE|STATES):[ ](.*)>/gi)){Game_BattlerBase[_0x3c7b80(0x337)]=!![];break;}}}},Game_BattlerBase[_0x236293(0xd1)]['addAuraPassiveStateIDs']=function(){const _0x4d0464=_0x236293;if(this[_0x4d0464(0xbb)]())return;if(!this[_0x4d0464(0x23a)]())return;const _0x4f335a=this[_0x4d0464(0x207)][_0x4d0464(0x184)]||[],_0x4fdb17=this,_0x472aad=this[_0x4d0464(0x384)]()[_0x4d0464(0x1ec)](!![],_0x4fdb17),_0x538d76=$gameParty[_0x4d0464(0x16e)]()?this[_0x4d0464(0x189)]()[_0x4d0464(0x1ec)](![],_0x4fdb17):[];this[_0x4d0464(0x207)][_0x4d0464(0x184)]=_0x4f335a||[],this[_0x4d0464(0x207)][_0x4d0464(0x184)]=this[_0x4d0464(0x207)][_0x4d0464(0x184)][_0x4d0464(0x1af)](_0x472aad)[_0x4d0464(0x1af)](_0x538d76);},Game_Unit[_0x236293(0xd1)][_0x236293(0x1ec)]=function(_0x5654e8,_0x41a63d){const _0x5b1254=_0x236293;let _0x194eb6=[];const _0x4e3d29=this===$gameParty?this[_0x5b1254(0x165)]():this[_0x5b1254(0x34a)]();for(const _0xb980a7 of _0x4e3d29){if(!_0xb980a7)continue;if(!_0xb980a7[_0x5b1254(0x23a)]())continue;const _0x1c2650=_0xb980a7[_0x5b1254(0x145)]();for(const _0x45b157 of _0x1c2650){if(!_0x45b157)continue;if(!VisuMZ[_0x5b1254(0x37b)][_0x5b1254(0x1b8)](_0x45b157,_0x5654e8,_0xb980a7,_0x41a63d))continue;let _0x33c889=DataManager['getAuraPassiveStatesFromObj'](_0x45b157,_0x5654e8);for(const _0x1d17c3 of _0x33c889){if(!VisuMZ['SkillsStatesCore'][_0x5b1254(0x122)](_0x1d17c3,_0x5654e8,_0xb980a7,_0x41a63d))continue;_0x194eb6[_0x5b1254(0x295)](_0x1d17c3),!_0x41a63d[_0x5b1254(0x256)](_0x1d17c3)&&_0x41a63d['setStateOrigin'](_0x1d17c3,_0xb980a7);}}}return _0x194eb6;},DataManager['getAuraPassiveStatesFromObj']=function(_0x9512d1,_0x24fead){const _0x4ca750=_0x236293;if(!_0x9512d1)return[];const _0x1f9634=_0x24fead?_0x4ca750(0x3b9):_0x4ca750(0xde),_0x7b0181=VisuMZ[_0x4ca750(0x37b)][_0x4ca750(0x152)](_0x9512d1,_0x1f9634);this[_0x4ca750(0x2ad)]=this[_0x4ca750(0x2ad)]||{};if(this['_cache_getAuraPassiveStatesFromObj'][_0x7b0181]!==undefined)return this[_0x4ca750(0x2ad)][_0x7b0181];const _0x5543c2=[],_0x2ecf03=_0x9512d1[_0x4ca750(0x195)]||'',_0x408f0c=_0x24fead?/<AURA (?:STATE|STATES):[ ](.*)>/gi:/<MIASMA (?:STATE|STATES):[ ](.*)>/gi,_0x3c1c34=_0x2ecf03[_0x4ca750(0x356)](_0x408f0c);if(_0x3c1c34)for(const _0xaf6ece of _0x3c1c34){_0xaf6ece[_0x4ca750(0x356)](_0x408f0c);const _0x20432e=String(RegExp['$1'])[_0x4ca750(0x393)](',')[_0x4ca750(0xa0)](_0x40c972=>_0x40c972['trim']());for(const _0x576a4b of _0x20432e){const _0x548d0d=/^\d+$/[_0x4ca750(0x1f4)](_0x576a4b);let _0x5dba19=0x0;_0x548d0d?_0x5dba19=Number(_0x576a4b):_0x5dba19=DataManager[_0x4ca750(0x265)](_0x576a4b),_0x5dba19&&_0x5543c2[_0x4ca750(0x295)](_0x5dba19);}}return this['_cache_getAuraPassiveStatesFromObj'][_0x7b0181]=_0x5543c2,this['_cache_getAuraPassiveStatesFromObj'][_0x7b0181];},VisuMZ[_0x236293(0x37b)][_0x236293(0x1b8)]=function(_0xabb666,_0x16bb82,_0xbdc820,_0x5e822c){const _0x5c8fac=_0x236293;if(!_0xabb666)return![];if(_0xabb666['autoRemovalTiming']!==undefined&&_0xabb666[_0x5c8fac(0x1a3)]!==undefined)return![];const _0xd18c25=_0xabb666[_0x5c8fac(0x195)]||'';if(!VisuMZ[_0x5c8fac(0x37b)]['MeetsAuraNoteConditions'](_0xd18c25,_0x16bb82,_0xbdc820,_0x5e822c))return![];return!![];},VisuMZ[_0x236293(0x37b)][_0x236293(0x122)]=function(_0x29c36d,_0x1fda7e,_0x3f2a63,_0x8de7c0){const _0x8f8309=$dataStates[_0x29c36d];if(!_0x8f8309)return![];const _0x176f39=_0x8f8309['note']||'';if(!VisuMZ['SkillsStatesCore']['MeetsAuraNoteConditions'](_0x176f39,_0x1fda7e,_0x3f2a63,_0x8de7c0))return![];return!![];},VisuMZ[_0x236293(0x37b)]['MeetsAuraNoteConditions']=function(_0x531d21,_0x5390b3,_0x3af388,_0x4548d7){const _0x448e97=_0x236293;_0x531d21=_0x531d21||'';if(_0x3af388[_0x448e97(0xbb)]()){if(_0x5390b3&&_0x531d21[_0x448e97(0x356)](/<ALLOW DEAD AURA>/i)){}else{if(!_0x5390b3&&_0x531d21[_0x448e97(0x356)](/<ALLOW DEAD MIASMA>/i)){}else{if(_0x5390b3&&_0x531d21[_0x448e97(0x356)](/<DEAD AURA ONLY>/i)){}else{if(!_0x5390b3&&_0x531d21[_0x448e97(0x356)](/<DEAD MIASMA ONLY>/i)){}else return![];}}}}else{if(_0x5390b3&&_0x531d21[_0x448e97(0x356)](/<DEAD AURA ONLY>/i))return![];else{if(!_0x5390b3&&_0x531d21[_0x448e97(0x356)](/<DEAD MIASMA ONLY>/i))return![];}}if(_0x5390b3){if(_0x531d21[_0x448e97(0x356)](/<AURA NOT FOR USER>/i)){if(_0x3af388===_0x4548d7)return![];}else{if(_0x531d21[_0x448e97(0x356)](/<NOT USER AURA>/i)){if(_0x3af388===_0x4548d7)return![];}}}return!![];},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x113)]=function(_0x507690){const _0x4cfd35=_0x236293;if(typeof _0x507690!==_0x4cfd35(0x1a0))_0x507690=_0x507690['id'];return this[_0x4cfd35(0x149)][_0x507690]||0x0;},Game_BattlerBase[_0x236293(0xd1)]['setStateTurns']=function(_0x524d96,_0x1a7e36){const _0x4dd757=_0x236293;if(typeof _0x524d96!=='number')_0x524d96=_0x524d96['id'];if(this['isStateAffected'](_0x524d96)){const _0x112cf5=DataManager[_0x4dd757(0xbe)](_0x524d96);this['_stateTurns'][_0x524d96]=_0x1a7e36['clamp'](0x0,_0x112cf5);if(this[_0x4dd757(0x149)][_0x524d96]<=0x0)this[_0x4dd757(0x202)](_0x524d96);}},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0xd6)]=function(_0x150b9e,_0x5b7471){const _0x176d64=_0x236293;if(typeof _0x150b9e!==_0x176d64(0x1a0))_0x150b9e=_0x150b9e['id'];this['isStateAffected'](_0x150b9e)&&(_0x5b7471+=this['stateTurns'](_0x150b9e),this['setStateTurns'](_0x150b9e,_0x5b7471));},VisuMZ['SkillsStatesCore'][_0x236293(0x314)]=Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x2ff)],Game_BattlerBase['prototype'][_0x236293(0x2ff)]=function(_0x521c23){const _0x56cc6e=_0x236293,_0x107fae=this[_0x56cc6e(0x243)][_0x521c23];VisuMZ[_0x56cc6e(0x37b)][_0x56cc6e(0x314)]['call'](this,_0x521c23);if(_0x107fae>0x0)this[_0x56cc6e(0x280)](_0x521c23);if(_0x107fae<0x0)this['onEraseDebuff'](_0x521c23);},VisuMZ[_0x236293(0x37b)][_0x236293(0x13a)]=Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x26b)],Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x26b)]=function(_0x4d0696){const _0x3e3644=_0x236293;VisuMZ[_0x3e3644(0x37b)][_0x3e3644(0x13a)][_0x3e3644(0x115)](this,_0x4d0696);if(!this[_0x3e3644(0x2b3)](_0x4d0696))this[_0x3e3644(0x2ff)](_0x4d0696);},VisuMZ[_0x236293(0x37b)]['Game_BattlerBase_decreaseBuff']=Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x153)],Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x153)]=function(_0x2d17d1){const _0x49ab65=_0x236293;VisuMZ[_0x49ab65(0x37b)][_0x49ab65(0x199)][_0x49ab65(0x115)](this,_0x2d17d1);if(!this[_0x49ab65(0x2b3)](_0x2d17d1))this[_0x49ab65(0x2ff)](_0x2d17d1);},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x280)]=function(_0xf0a0fb){},Game_BattlerBase['prototype']['onEraseDebuff']=function(_0x30fd7e){},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0xd5)]=function(_0x456538){const _0x5516cf=_0x236293;return this[_0x5516cf(0x243)][_0x456538]===VisuMZ[_0x5516cf(0x37b)]['Settings'][_0x5516cf(0x1d1)][_0x5516cf(0x21f)];},Game_BattlerBase['prototype'][_0x236293(0x2eb)]=function(_0x1f12d3){const _0xf5f50a=_0x236293;return this[_0xf5f50a(0x243)][_0x1f12d3]===-VisuMZ[_0xf5f50a(0x37b)][_0xf5f50a(0x172)]['Buffs'][_0xf5f50a(0x341)];},VisuMZ[_0x236293(0x37b)][_0x236293(0xdd)]=Game_BattlerBase[_0x236293(0xd1)]['buffIconIndex'],Game_BattlerBase['prototype'][_0x236293(0x285)]=function(_0x754409,_0x47b51a){const _0x1f80b9=_0x236293;return _0x754409=_0x754409['clamp'](-0x2,0x2),VisuMZ['SkillsStatesCore'][_0x1f80b9(0xdd)]['call'](this,_0x754409,_0x47b51a);},Game_BattlerBase[_0x236293(0xd1)]['paramBuffRate']=function(_0x1348e2){const _0x1840db=_0x236293,_0x157926=this[_0x1840db(0x243)][_0x1348e2];return VisuMZ[_0x1840db(0x37b)][_0x1840db(0x172)][_0x1840db(0x1d1)][_0x1840db(0x221)][_0x1840db(0x115)](this,_0x1348e2,_0x157926);},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x155)]=function(_0x50bea7){const _0x4b052c=_0x236293;return this[_0x4b052c(0x2b8)][_0x50bea7]||0x0;},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x37e)]=function(_0x37c977){const _0x14df8d=_0x236293;return this[_0x14df8d(0x155)](_0x37c977);},Game_BattlerBase[_0x236293(0xd1)]['setBuffTurns']=function(_0x35cd50,_0x5a3bd8){const _0x20cb32=_0x236293;if(this[_0x20cb32(0x365)](_0x35cd50)){const _0x355c9a=VisuMZ[_0x20cb32(0x37b)][_0x20cb32(0x172)]['Buffs'][_0x20cb32(0x167)];this[_0x20cb32(0x2b8)][_0x35cd50]=_0x5a3bd8[_0x20cb32(0x2e3)](0x0,_0x355c9a);}},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x224)]=function(_0x19cbc7,_0x5258b3){const _0x4eb424=_0x236293;this[_0x4eb424(0x365)](_0x19cbc7)&&(_0x5258b3+=this[_0x4eb424(0x155)](stateId),this[_0x4eb424(0x331)](_0x19cbc7,_0x5258b3));},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x38f)]=function(_0x2cdbbf,_0x4306c4){const _0x38e354=_0x236293;if(this[_0x38e354(0x132)](_0x2cdbbf)){const _0x35d25b=VisuMZ['SkillsStatesCore']['Settings'][_0x38e354(0x1d1)]['MaxTurns'];this[_0x38e354(0x2b8)][_0x2cdbbf]=_0x4306c4[_0x38e354(0x2e3)](0x0,_0x35d25b);}},Game_BattlerBase[_0x236293(0xd1)]['addDebuffTurns']=function(_0x5cf06e,_0x2d23da){const _0x4c473e=_0x236293;this[_0x4c473e(0x132)](_0x5cf06e)&&(_0x2d23da+=this[_0x4c473e(0x155)](stateId),this[_0x4c473e(0x38f)](_0x5cf06e,_0x2d23da));},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x21c)]=function(_0x5db596){const _0x50e2b3=_0x236293;if(typeof _0x5db596!==_0x50e2b3(0x1a0))_0x5db596=_0x5db596['id'];return this['_stateData']=this[_0x50e2b3(0x1da)]||{},this[_0x50e2b3(0x1da)][_0x5db596]=this[_0x50e2b3(0x1da)][_0x5db596]||{},this[_0x50e2b3(0x1da)][_0x5db596];},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x346)]=function(_0x4645da,_0x582af4){const _0x2978bb=_0x236293;if(typeof _0x4645da!==_0x2978bb(0x1a0))_0x4645da=_0x4645da['id'];const _0x460e0=this[_0x2978bb(0x21c)](_0x4645da);return _0x460e0[_0x582af4];},Game_BattlerBase[_0x236293(0xd1)]['setStateData']=function(_0x201414,_0x423049,_0x427d01){const _0x1609a5=_0x236293;if(typeof _0x201414!==_0x1609a5(0x1a0))_0x201414=_0x201414['id'];const _0xed45fa=this[_0x1609a5(0x21c)](_0x201414);_0xed45fa[_0x423049]=_0x427d01;},Game_BattlerBase['prototype'][_0x236293(0xb4)]=function(_0x58d08a){const _0xac937a=_0x236293;if(typeof _0x58d08a!==_0xac937a(0x1a0))_0x58d08a=_0x58d08a['id'];this[_0xac937a(0x1da)]=this[_0xac937a(0x1da)]||{},this[_0xac937a(0x1da)][_0x58d08a]={};},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x22b)]=function(_0xc05475){const _0x1ad9ad=_0x236293;if(typeof _0xc05475!==_0x1ad9ad(0x1a0))_0xc05475=_0xc05475['id'];return this[_0x1ad9ad(0x20b)]=this[_0x1ad9ad(0x20b)]||{},this[_0x1ad9ad(0x20b)][_0xc05475]===undefined&&(this[_0x1ad9ad(0x20b)][_0xc05475]=''),this['_stateDisplay'][_0xc05475];},Game_BattlerBase['prototype'][_0x236293(0x129)]=function(_0xa8937c,_0x1623b5){const _0x3ee7da=_0x236293;if(typeof _0xa8937c!==_0x3ee7da(0x1a0))_0xa8937c=_0xa8937c['id'];this[_0x3ee7da(0x20b)]=this['_stateDisplay']||{},this[_0x3ee7da(0x20b)][_0xa8937c]=_0x1623b5;},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x274)]=function(_0x18a330){const _0x1a0880=_0x236293;if(typeof _0x18a330!==_0x1a0880(0x1a0))_0x18a330=_0x18a330['id'];this[_0x1a0880(0x20b)]=this[_0x1a0880(0x20b)]||{},this[_0x1a0880(0x20b)][_0x18a330]='';},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x1ea)]=function(_0x313ff4){const _0xc706d=_0x236293;if(typeof _0x313ff4!==_0xc706d(0x1a0))_0x313ff4=_0x313ff4['id'];this[_0xc706d(0x1be)]=this[_0xc706d(0x1be)]||{},this[_0xc706d(0x1be)][_0x313ff4]=this[_0xc706d(0x1be)][_0x313ff4]||_0xc706d(0x1bf);const _0x37527c=this[_0xc706d(0x1be)][_0x313ff4];return this[_0xc706d(0x179)](_0x37527c);},Game_BattlerBase['prototype'][_0x236293(0x1e8)]=function(_0x286da6,_0x23d1c6){const _0x348b0b=_0x236293;this[_0x348b0b(0x1be)]=this['_stateOrigin']||{};const _0x1b5080=_0x23d1c6?this[_0x348b0b(0x2c5)](_0x23d1c6):this['getCurrentStateOriginKey']();this['_stateOrigin'][_0x286da6]=_0x1b5080;},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x1f1)]=function(_0x4c21a3){const _0x28d056=_0x236293;this[_0x28d056(0x1be)]=this[_0x28d056(0x1be)]||{},delete this[_0x28d056(0x1be)][_0x4c21a3];},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x133)]=function(){const _0x385ef4=_0x236293;this[_0x385ef4(0x1be)]={};},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x15c)]=function(){const _0x4fef05=_0x236293,_0x560d48=this[_0x4fef05(0x2e4)]();return this['convertTargetToStateOriginKey'](_0x560d48);},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x2e4)]=function(){const _0x2b67ea=_0x236293;if($gameParty[_0x2b67ea(0x16e)]()){if(BattleManager[_0x2b67ea(0x212)])return BattleManager['_subject'];else{if(BattleManager['_currentActor'])return BattleManager[_0x2b67ea(0x349)];}}else{const _0xadfab6=SceneManager['_scene'];if(![Scene_Map,Scene_Item]['includes'](_0xadfab6[_0x2b67ea(0xe9)]))return $gameParty[_0x2b67ea(0x14e)]();}return this;},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x2c5)]=function(_0x4c8759){const _0x4f9321=_0x236293;if(!_0x4c8759)return _0x4f9321(0x1bf);if(_0x4c8759[_0x4f9321(0x2ec)]())return _0x4f9321(0x201)[_0x4f9321(0x2f9)](_0x4c8759[_0x4f9321(0x142)]());else{const _0x41fc2c=_0x4f9321(0x124)[_0x4f9321(0x2f9)](_0x4c8759[_0x4f9321(0x154)]()),_0x1b76b8=_0x4f9321(0x278)[_0x4f9321(0x2f9)](_0x4c8759[_0x4f9321(0x2e5)]()),_0x2a27d4='<troop-%1>'[_0x4f9321(0x2f9)]($gameTroop['getCurrentTroopUniqueID']());return _0x4f9321(0xa2)[_0x4f9321(0x2f9)](_0x41fc2c,_0x1b76b8,_0x2a27d4);}return'user';},Game_BattlerBase[_0x236293(0xd1)]['getStateOriginByKey']=function(_0x348d09){const _0x42056c=_0x236293;if(_0x348d09==='user')return this;else{if(_0x348d09[_0x42056c(0x356)](/<actor-(\d+)>/i))return $gameActors[_0x42056c(0x247)](Number(RegExp['$1']));else{if($gameParty[_0x42056c(0x16e)]()&&_0x348d09['match'](/<troop-(\d+)>/i)){const _0x855461=Number(RegExp['$1']);if(_0x855461===$gameTroop[_0x42056c(0x116)]()){if(_0x348d09[_0x42056c(0x356)](/<member-(\d+)>/i))return $gameTroop[_0x42056c(0x34a)]()[Number(RegExp['$1'])];}}if(_0x348d09[_0x42056c(0x356)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x32d)]=function(_0x2b1c4d){const _0x3b2819=_0x236293;if(!_0x2b1c4d)return![];if(this[_0x3b2819(0x1aa)]())return!![];this[_0x3b2819(0x3aa)]=this[_0x3b2819(0x3aa)]||{};if(this[_0x3b2819(0x3aa)][_0x2b1c4d['id']]===undefined){this[_0x3b2819(0x2ec)]()?this[_0x3b2819(0x3aa)][_0x2b1c4d['id']]=DataManager[_0x3b2819(0x1fc)](_0x2b1c4d):this[_0x3b2819(0x3aa)][_0x2b1c4d['id']]=!![];if(this['_skillToggle'][_0x2b1c4d['id']]&&DataManager[_0x3b2819(0x1cf)](_0x2b1c4d)[_0x3b2819(0x266)]>0x0){const _0x2d2b5a=DataManager[_0x3b2819(0x1cf)](_0x2b1c4d),_0x46efde=this[_0x3b2819(0x3ab)]()['filter'](_0x28e80d=>_0x28e80d!==_0x2b1c4d)['filter'](_0x29a8aa=>DataManager[_0x3b2819(0x32c)](_0x29a8aa))[_0x3b2819(0x1e7)](_0x1dee81=>DataManager[_0x3b2819(0x1cf)](_0x1dee81)[_0x3b2819(0x227)](_0x1ef382=>_0x2d2b5a[_0x3b2819(0x31f)](_0x1ef382)));_0x46efde['length']>0x0&&(this['_skillToggle'][_0x2b1c4d['id']]=![]);}if(this['_skillToggle'][_0x2b1c4d['id']]){this[_0x3b2819(0xac)](),$gameParty[_0x3b2819(0xcf)]();if($gameParty['inBattle']())$gameTroop[_0x3b2819(0xcf)]();}}return this[_0x3b2819(0x3aa)][_0x2b1c4d['id']];},Game_BattlerBase[_0x236293(0xd1)]['setSkillToggle']=function(_0x26a093,_0x518239){const _0x36c577=_0x236293;if(!DataManager[_0x36c577(0x32c)](_0x26a093))return;if(this[_0x36c577(0x1aa)]())return;this['_skillToggle']=this[_0x36c577(0x3aa)]||{};if(_0x518239&&DataManager[_0x36c577(0x1cf)](_0x26a093)['length']>0x0){const _0x128413=DataManager[_0x36c577(0x1cf)](_0x26a093),_0x220c2e=this[_0x36c577(0x3ab)]()[_0x36c577(0x1e7)](_0x1142d8=>DataManager['isToggleSkill'](_0x1142d8))['filter'](_0x1a4bd5=>DataManager[_0x36c577(0x1cf)](_0x1a4bd5)['some'](_0x4a9e8e=>_0x128413[_0x36c577(0x31f)](_0x4a9e8e)));for(const _0x158178 of _0x220c2e){if(!_0x158178)continue;this[_0x36c577(0x3aa)][_0x158178['id']]=![];}}this['_skillToggle'][_0x26a093['id']]=_0x518239,this[_0x36c577(0xac)](),$gameParty[_0x36c577(0xcf)]();if($gameParty[_0x36c577(0x16e)]())$gameTroop[_0x36c577(0xcf)]();},VisuMZ['SkillsStatesCore'][_0x236293(0x11e)]=Game_BattlerBase[_0x236293(0xd1)]['meetsSkillConditions'],Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x204)]=function(_0x554680){const _0x35abab=_0x236293;if(DataManager[_0x35abab(0x32c)](_0x554680)){if(this[_0x35abab(0x2ec)]()){if($gameParty[_0x35abab(0x16e)]()){if(this[_0x35abab(0x1a6)]())return![];if(this[_0x35abab(0x373)]())return![];}if(this['isSkillToggled'](_0x554680))return!![];}else return![];}return VisuMZ['SkillsStatesCore'][_0x35abab(0x11e)][_0x35abab(0x115)](this,_0x554680);},VisuMZ['SkillsStatesCore'][_0x236293(0x105)]=Game_Action[_0x236293(0xd1)][_0x236293(0x177)],Game_Action[_0x236293(0xd1)][_0x236293(0x177)]=function(){const _0x4f6a0c=_0x236293;if(DataManager[_0x4f6a0c(0x32c)](this[_0x4f6a0c(0x191)]()))return![];return VisuMZ[_0x4f6a0c(0x37b)]['Game_Action_isValid'][_0x4f6a0c(0x115)](this);},VisuMZ['SkillsStatesCore'][_0x236293(0x2ca)]=Game_Battler[_0x236293(0xd1)][_0x236293(0x250)],Game_Battler[_0x236293(0xd1)][_0x236293(0x250)]=function(_0x5d8b00){const _0x114502=_0x236293,_0x36f497=this['isStateAddable'](_0x5d8b00);VisuMZ[_0x114502(0x37b)]['Game_Battler_addState'][_0x114502(0x115)](this,_0x5d8b00);if(_0x36f497&&this[_0x114502(0x30e)]($dataStates[_0x5d8b00])){this[_0x114502(0x369)](_0x5d8b00);;}},VisuMZ['SkillsStatesCore'][_0x236293(0x119)]=Game_Battler[_0x236293(0xd1)][_0x236293(0x305)],Game_Battler['prototype'][_0x236293(0x305)]=function(_0xa93d61){const _0x45313c=_0x236293,_0x157a5a=$dataStates[_0xa93d61];if(_0x157a5a&&_0x157a5a[_0x45313c(0x195)][_0x45313c(0x356)](/<NO DEATH CLEAR>/i))return!this[_0x45313c(0xe4)](_0xa93d61)&&!this[_0x45313c(0x25e)](_0xa93d61)&&!this[_0x45313c(0xf1)][_0x45313c(0x20a)](_0xa93d61);return VisuMZ[_0x45313c(0x37b)]['Game_Battler_isStateAddable']['call'](this,_0xa93d61);},VisuMZ['SkillsStatesCore'][_0x236293(0x2a0)]=Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x1e9)],Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x1e9)]=function(_0x559946){const _0x318d3b=_0x236293;VisuMZ[_0x318d3b(0x37b)][_0x318d3b(0x2a0)][_0x318d3b(0x115)](this,_0x559946);if(_0x559946===this['deathStateId']())while(this[_0x318d3b(0x13e)][_0x318d3b(0x1e7)](_0x58a126=>_0x58a126===this[_0x318d3b(0x238)]())[_0x318d3b(0x266)]>0x1){const _0x598354=this[_0x318d3b(0x13e)]['indexOf'](this[_0x318d3b(0x238)]());this[_0x318d3b(0x13e)][_0x318d3b(0x11c)](_0x598354,0x1);}},Game_Battler['prototype']['onAddState']=function(_0x2ed550){const _0x1ac378=_0x236293;this[_0x1ac378(0x1e8)](_0x2ed550),this[_0x1ac378(0x271)](_0x2ed550),this[_0x1ac378(0x16f)](_0x2ed550),this[_0x1ac378(0x24e)](_0x2ed550),this['onAddStateGlobalJS'](_0x2ed550);},Game_Battler['prototype']['onRemoveState']=function(_0x26af36){const _0x3cb303=_0x236293;this[_0x3cb303(0x104)](_0x26af36),this[_0x3cb303(0xe1)](_0x26af36),Game_BattlerBase[_0x3cb303(0xd1)][_0x3cb303(0x194)][_0x3cb303(0x115)](this,_0x26af36);},Game_Battler[_0x236293(0xd1)][_0x236293(0x25a)]=function(_0x25366f){const _0x33a871=_0x236293;for(const _0x580f78 of this[_0x33a871(0x241)]()){this[_0x33a871(0x108)](_0x580f78['id'])&&_0x580f78[_0x33a871(0x1e5)]===_0x25366f&&(this[_0x33a871(0x202)](_0x580f78['id']),this[_0x33a871(0x34b)](_0x580f78['id']),this[_0x33a871(0x100)](_0x580f78['id']));}},Game_Battler[_0x236293(0xd1)]['onExpireState']=function(_0xfe1a1e){const _0x87586c=_0x236293;this[_0x87586c(0xbd)](_0xfe1a1e);},Game_Battler[_0x236293(0xd1)][_0x236293(0x24e)]=function(_0x49cec9){const _0x557017=_0x236293;if(this[_0x557017(0xd4)]||this[_0x557017(0x25f)])return;const _0x2871c4=VisuMZ[_0x557017(0x37b)]['stateAddJS'];if(_0x2871c4[_0x49cec9])_0x2871c4[_0x49cec9]['call'](this,_0x49cec9);},Game_Battler['prototype']['onEraseStateCustomJS']=function(_0x2d3322){const _0x5685f1=_0x236293;if(this[_0x5685f1(0xd4)]||this[_0x5685f1(0x25f)])return;const _0x4cca98=VisuMZ['SkillsStatesCore'][_0x5685f1(0x3ad)];if(_0x4cca98[_0x2d3322])_0x4cca98[_0x2d3322][_0x5685f1(0x115)](this,_0x2d3322);},Game_Battler[_0x236293(0xd1)]['onExpireStateCustomJS']=function(_0x27dbc7){const _0x49c9bc=_0x236293;if(this[_0x49c9bc(0xd4)]||this[_0x49c9bc(0x25f)])return;const _0x51e2f0=VisuMZ['SkillsStatesCore'][_0x49c9bc(0x1c9)];if(_0x51e2f0[_0x27dbc7])_0x51e2f0[_0x27dbc7][_0x49c9bc(0x115)](this,_0x27dbc7);},Game_Battler[_0x236293(0xd1)][_0x236293(0x18a)]=function(_0xa12c62){const _0x176d8b=_0x236293;if(this['_tempActor']||this['_tempBattler'])return;try{VisuMZ[_0x176d8b(0x37b)][_0x176d8b(0x172)][_0x176d8b(0x2b4)][_0x176d8b(0x2be)][_0x176d8b(0x115)](this,_0xa12c62);}catch(_0x4f41ce){if($gameTemp[_0x176d8b(0x1ff)]())console[_0x176d8b(0xd3)](_0x4f41ce);}},Game_Battler['prototype'][_0x236293(0xe1)]=function(_0x5012fa){const _0x55b0ad=_0x236293;if(this['_tempActor']||this[_0x55b0ad(0x25f)])return;try{VisuMZ[_0x55b0ad(0x37b)][_0x55b0ad(0x172)][_0x55b0ad(0x2b4)][_0x55b0ad(0x31b)]['call'](this,_0x5012fa);}catch(_0x301fa4){if($gameTemp['isPlaytest']())console[_0x55b0ad(0xd3)](_0x301fa4);}},Game_Battler['prototype'][_0x236293(0x100)]=function(_0x190233){const _0x447304=_0x236293;if(this['_tempActor']||this['_tempBattler'])return;try{VisuMZ[_0x447304(0x37b)]['Settings'][_0x447304(0x2b4)][_0x447304(0x2cd)]['call'](this,_0x190233);}catch(_0x4fac2f){if($gameTemp[_0x447304(0x1ff)]())console[_0x447304(0xd3)](_0x4fac2f);}},Game_Battler['prototype'][_0x236293(0x1fe)]=function(_0x488a86){const _0x575eeb=_0x236293;return _0x488a86=_0x488a86[_0x575eeb(0x2af)]()[_0x575eeb(0x1ba)](),this[_0x575eeb(0x241)]()[_0x575eeb(0x1e7)](_0x581e42=>_0x581e42[_0x575eeb(0x23e)][_0x575eeb(0x31f)](_0x488a86));},Game_Battler[_0x236293(0xd1)][_0x236293(0x24a)]=function(_0x1b35c3,_0x4ee276){const _0x25989b=_0x236293;_0x1b35c3=_0x1b35c3[_0x25989b(0x2af)]()[_0x25989b(0x1ba)](),_0x4ee276=_0x4ee276||0x0;const _0x547383=this[_0x25989b(0x1fe)](_0x1b35c3),_0x251b98=[];for(const _0xcb0d67 of _0x547383){if(!_0xcb0d67)continue;if(_0x4ee276<=0x0)break;_0x251b98['push'](_0xcb0d67['id']),this[_0x25989b(0xf1)][_0x25989b(0xf7)]=!![],_0x4ee276--;}while(_0x251b98['length']>0x0){this['removeState'](_0x251b98[_0x25989b(0x366)]());}},Game_Battler[_0x236293(0xd1)]['removeStatesByCategoryAll']=function(_0x3ff8d2,_0x8b4dff){const _0x586d32=_0x236293;_0x3ff8d2=_0x3ff8d2['toUpperCase']()[_0x586d32(0x1ba)](),_0x8b4dff=_0x8b4dff||[];const _0x313216=this[_0x586d32(0x1fe)](_0x3ff8d2),_0x4d5bf6=[];for(const _0x509c56 of _0x313216){if(!_0x509c56)continue;if(_0x8b4dff[_0x586d32(0x31f)](_0x509c56))continue;_0x4d5bf6[_0x586d32(0x295)](_0x509c56['id']),this[_0x586d32(0xf1)][_0x586d32(0xf7)]=!![];}while(_0x4d5bf6[_0x586d32(0x266)]>0x0){this['removeState'](_0x4d5bf6[_0x586d32(0x366)]());}},Game_Battler[_0x236293(0xd1)][_0x236293(0x3bd)]=function(_0x283a91){const _0x2472fb=_0x236293;return this[_0x2472fb(0x16c)](_0x283a91)>0x0;},Game_Battler[_0x236293(0xd1)][_0x236293(0x2f2)]=function(_0xbb946c){const _0x5a44bc=_0x236293;return this[_0x5a44bc(0x281)](_0xbb946c)>0x0;},Game_Battler[_0x236293(0xd1)][_0x236293(0x16c)]=function(_0x1d26d0){const _0x58b81f=_0x236293,_0xac71e5=this[_0x58b81f(0x1fe)](_0x1d26d0)[_0x58b81f(0x1e7)](_0x39dfde=>this[_0x58b81f(0x256)](_0x39dfde['id']));return _0xac71e5[_0x58b81f(0x266)];},Game_Battler['prototype']['totalStateCategory']=function(_0x3536f5){const _0x564e46=_0x236293,_0x38066b=this[_0x564e46(0x1fe)](_0x3536f5);return _0x38066b[_0x564e46(0x266)];},VisuMZ[_0x236293(0x37b)][_0x236293(0xef)]=Game_BattlerBase[_0x236293(0xd1)][_0x236293(0xe4)],Game_BattlerBase[_0x236293(0xd1)][_0x236293(0xe4)]=function(_0x59e92f){const _0xb53126=_0x236293,_0x44ff77=$dataStates[_0x59e92f];if(_0x44ff77&&_0x44ff77[_0xb53126(0x23e)]['length']>0x0)for(const _0x2135d7 of _0x44ff77[_0xb53126(0x23e)]){if(this['isStateCategoryResisted'](_0x2135d7))return!![];}return VisuMZ[_0xb53126(0x37b)][_0xb53126(0xef)][_0xb53126(0x115)](this,_0x59e92f);},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x20c)]=function(_0x113941){const _0x544c5a=_0x236293;let _0x5c34e6=_0x544c5a(0x2b9);if(this[_0x544c5a(0x16d)](_0x5c34e6))return this['_cache'][_0x5c34e6][_0x544c5a(0x31f)](_0x113941);return this[_0x544c5a(0x207)][_0x5c34e6]=this[_0x544c5a(0xe0)](),this[_0x544c5a(0x207)][_0x5c34e6]['includes'](_0x113941);},Game_BattlerBase[_0x236293(0xd1)]['makeResistedStateCategories']=function(){const _0x5e7bc0=_0x236293,_0x535e79=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0xce3844=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x382c62=[];for(const _0x4fd5ba of this[_0x5e7bc0(0x162)]()){if(!_0x4fd5ba)continue;const _0x872385=_0x4fd5ba[_0x5e7bc0(0x195)],_0x12bb16=_0x872385['match'](_0x535e79);if(_0x12bb16)for(const _0x48461b of _0x12bb16){_0x48461b[_0x5e7bc0(0x356)](_0x535e79);const _0x5da5dd=String(RegExp['$1'])[_0x5e7bc0(0x393)](',')[_0x5e7bc0(0xa0)](_0x506a45=>String(_0x506a45)[_0x5e7bc0(0x2af)]()['trim']());_0x382c62=_0x382c62[_0x5e7bc0(0x1af)](_0x5da5dd);}if(_0x872385[_0x5e7bc0(0x356)](_0xce3844)){const _0x407d1a=String(RegExp['$1'])[_0x5e7bc0(0x393)](/[\r\n]+/)[_0x5e7bc0(0xa0)](_0x4b96bd=>String(_0x4b96bd)[_0x5e7bc0(0x2af)]()[_0x5e7bc0(0x1ba)]());_0x382c62=_0x382c62[_0x5e7bc0(0x1af)](_0x407d1a);}}return _0x382c62;},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x271)]=function(_0x253e8d){const _0x28cb54=_0x236293,_0x5b86c3=$dataStates[_0x253e8d];if(!_0x5b86c3)return;const _0x8794=_0x5b86c3['note']||'',_0x367026=_0x8794[_0x28cb54(0x356)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x367026){const _0x463686=[_0x5b86c3];for(const _0x33e58b of _0x367026){_0x33e58b[_0x28cb54(0x356)](/<REMOVE OTHER (.*) STATES>/i);const _0x5e8692=String(RegExp['$1']);this['removeStatesByCategoryAll'](_0x5e8692,_0x463686);}}},Game_Battler[_0x236293(0xd1)][_0x236293(0x1b2)]=function(){const _0x6a6bad=_0x236293;for(const _0x332276 of this[_0x6a6bad(0x241)]()){if(!_0x332276)continue;if(!this[_0x6a6bad(0x256)](_0x332276['id']))continue;if(!_0x332276[_0x6a6bad(0x176)])continue;if(this[_0x6a6bad(0xb3)](_0x332276))continue;Math['randomInt'](0x64)<_0x332276[_0x6a6bad(0x334)]&&this['removeState'](_0x332276['id']);}},VisuMZ[_0x236293(0x37b)][_0x236293(0x12b)]=Game_Action[_0x236293(0xd1)]['executeHpDamage'],Game_Action[_0x236293(0xd1)][_0x236293(0x2c6)]=function(_0x3851b5,_0x1e4359){const _0x56771b=_0x236293;$gameTemp[_0x56771b(0xb7)]=this[_0x56771b(0x191)](),$gameTemp[_0x56771b(0x1cb)]=this[_0x56771b(0x1d2)](),$gameTemp[_0x56771b(0x2ba)]=_0x1e4359,VisuMZ[_0x56771b(0x37b)][_0x56771b(0x12b)][_0x56771b(0x115)](this,_0x3851b5,_0x1e4359),$gameTemp['_bypassRemoveStateDamage_action']=undefined,$gameTemp[_0x56771b(0x1cb)]=undefined,$gameTemp[_0x56771b(0x2ba)]=undefined;},Game_Battler[_0x236293(0xd1)][_0x236293(0xb3)]=function(_0x11c2d2){const _0x1f58f4=_0x236293;if($gameTemp[_0x1f58f4(0xb7)]){const _0x1936d9=$gameTemp['_bypassRemoveStateDamage_action'],_0x29c267=/<BYPASS STATE DAMAGE REMOVAL:[ ](.*)>/gi;if(DataManager[_0x1f58f4(0xb1)](_0x11c2d2,_0x1936d9,_0x29c267,_0x1f58f4(0x30b)))return!![];}if($gameTemp[_0x1f58f4(0x1cb)]){const _0x17a58e=$gameTemp[_0x1f58f4(0x1cb)];if(_0x17a58e[_0x1f58f4(0x11d)](_0x11c2d2))return!![];}if(this['isTargetBypassRemoveStatesByDamage'](_0x11c2d2))return!![];return![];},Game_Battler[_0x236293(0xd1)][_0x236293(0x11d)]=function(_0x775446){const _0x37fcbb=_0x236293,_0x40ce23=/<BYPASS STATE DAMAGE REMOVAL AS (?:ATTACKER|USER):[ ](.*)>/gi;for(const _0xd4a48b of this[_0x37fcbb(0x162)]()){if(!_0xd4a48b)continue;if(DataManager[_0x37fcbb(0xb1)](_0x775446,_0xd4a48b,_0x40ce23,_0x37fcbb(0x268)))return!![];}return![];},Game_Battler[_0x236293(0xd1)][_0x236293(0xe6)]=function(_0x3a0860){const _0x3e1a25=_0x236293,_0xcfc556=/<BYPASS STATE DAMAGE REMOVAL AS (?:TARGET|VICTIM):[ ](.*)>/gi;for(const _0x4face6 of this[_0x3e1a25(0x162)]()){if(!_0x4face6)continue;if(DataManager[_0x3e1a25(0xb1)](_0x3a0860,_0x4face6,_0xcfc556,_0x3e1a25(0x2d6)))return!![];}return![];},DataManager[_0x236293(0xb1)]=function(_0x33a88d,_0x90c6a9,_0x3ff5d0,_0x18344b){const _0x36287e=_0x236293,_0x5e6155=_0x36287e(0x320)[_0x36287e(0x2f9)](_0x90c6a9[_0x36287e(0x1eb)],_0x90c6a9['id'],_0x18344b);this[_0x36287e(0x234)]=this[_0x36287e(0x234)]||{};if(this[_0x36287e(0x234)][_0x5e6155]!==undefined)return this[_0x36287e(0x234)][_0x5e6155][_0x36287e(0x31f)](_0x33a88d['id']);const _0x402a53=[],_0x42a283=_0x90c6a9[_0x36287e(0x195)][_0x36287e(0x356)](_0x3ff5d0);if(_0x42a283)for(const _0x190916 of _0x42a283){_0x190916[_0x36287e(0x356)](_0x3ff5d0);const _0x1c74e8=String(RegExp['$1'])[_0x36287e(0x393)](',')[_0x36287e(0xa0)](_0x5dda65=>_0x5dda65['trim']());for(let _0x5ef111 of _0x1c74e8){_0x5ef111=(String(_0x5ef111)||'')[_0x36287e(0x1ba)]();if(_0x5ef111[_0x36287e(0x356)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0x45dde0=Math['min'](Number(RegExp['$1']),Number(RegExp['$2'])),_0x12ace0=Math[_0x36287e(0x198)](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x4a5d46=_0x45dde0;_0x4a5d46<=_0x12ace0;_0x4a5d46++)elements['push'](_0x4a5d46);continue;}const _0x58afc1=/^\d+$/[_0x36287e(0x1f4)](_0x5ef111);_0x58afc1?entryID=Number(_0x5ef111):entryID=DataManager['getStateIdWithName'](_0x5ef111),entryID&&_0x402a53[_0x36287e(0x295)](entryID);}}return this[_0x36287e(0x234)][_0x5e6155]=_0x402a53,this[_0x36287e(0x234)][_0x5e6155][_0x36287e(0x31f)](_0x33a88d['id']);},VisuMZ[_0x236293(0x37b)][_0x236293(0x1c6)]=Game_Battler[_0x236293(0xd1)][_0x236293(0x27d)],Game_Battler['prototype'][_0x236293(0x27d)]=function(_0x18a5c9,_0x5b3153){const _0x1ff2da=_0x236293;VisuMZ['SkillsStatesCore'][_0x1ff2da(0x1c6)]['call'](this,_0x18a5c9,_0x5b3153),this[_0x1ff2da(0x365)](_0x18a5c9)&&this[_0x1ff2da(0xc1)](_0x18a5c9,_0x5b3153);},Game_Battler['prototype'][_0x236293(0x147)]=function(_0x34f786){},VisuMZ['SkillsStatesCore'][_0x236293(0x2b0)]=Game_Battler['prototype']['addDebuff'],Game_Battler[_0x236293(0xd1)][_0x236293(0xf4)]=function(_0x4edf5a,_0x1c9e9a){const _0x4a8a92=_0x236293;VisuMZ[_0x4a8a92(0x37b)][_0x4a8a92(0x2b0)][_0x4a8a92(0x115)](this,_0x4edf5a,_0x1c9e9a),this['isDebuffAffected'](_0x4edf5a)&&this[_0x4a8a92(0xfd)](_0x4edf5a,_0x1c9e9a);},Game_Battler['prototype'][_0x236293(0x1d4)]=function(){const _0x56ec6d=_0x236293;for(let _0xb977ff=0x0;_0xb977ff<this['buffLength']();_0xb977ff++){if(this[_0x56ec6d(0x229)](_0xb977ff)){const _0x5edde1=this[_0x56ec6d(0x243)][_0xb977ff];this[_0x56ec6d(0x330)](_0xb977ff);if(_0x5edde1>0x0)this[_0x56ec6d(0x27f)](_0xb977ff);if(_0x5edde1<0x0)this[_0x56ec6d(0x15a)](_0xb977ff);}}},Game_Battler[_0x236293(0xd1)][_0x236293(0xc1)]=function(_0x3ed7c2,_0x4a6dea){const _0x574365=_0x236293;this[_0x574365(0x2fc)](_0x3ed7c2,_0x4a6dea);},Game_Battler['prototype'][_0x236293(0xfd)]=function(_0x395871,_0x3bc5e3){const _0x45fa4e=_0x236293;this[_0x45fa4e(0x1bd)](_0x395871,_0x3bc5e3);},Game_Battler[_0x236293(0xd1)]['onEraseBuff']=function(_0x59f654){const _0x3fbe05=_0x236293;Game_BattlerBase[_0x3fbe05(0xd1)][_0x3fbe05(0x280)][_0x3fbe05(0x115)](this,_0x59f654),this[_0x3fbe05(0x2d9)](_0x59f654);},Game_Battler[_0x236293(0xd1)]['onEraseDebuff']=function(_0x3e55cd){const _0x4ddff2=_0x236293;Game_BattlerBase[_0x4ddff2(0xd1)][_0x4ddff2(0x222)]['call'](this,_0x3e55cd),this[_0x4ddff2(0x27c)](_0x3e55cd);},Game_Battler['prototype'][_0x236293(0x27f)]=function(_0x42dcae){this['onExpireBuffGlobalJS'](_0x42dcae);},Game_Battler[_0x236293(0xd1)][_0x236293(0x15a)]=function(_0x496d51){this['onExpireDebuffGlobalJS'](_0x496d51);},Game_Battler[_0x236293(0xd1)]['onAddBuffGlobalJS']=function(_0x3f698c,_0x1efd80){const _0x4016a6=_0x236293;VisuMZ[_0x4016a6(0x37b)][_0x4016a6(0x172)][_0x4016a6(0x1d1)]['onAddBuffJS']['call'](this,_0x3f698c,_0x1efd80);},Game_Battler[_0x236293(0xd1)][_0x236293(0x1bd)]=function(_0x135bb5,_0xdf362b){const _0x1667f9=_0x236293;VisuMZ['SkillsStatesCore'][_0x1667f9(0x172)][_0x1667f9(0x1d1)][_0x1667f9(0x24f)]['call'](this,_0x135bb5,_0xdf362b);},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x2d9)]=function(_0x50783d){const _0x78681=_0x236293;VisuMZ[_0x78681(0x37b)][_0x78681(0x172)][_0x78681(0x1d1)][_0x78681(0x287)][_0x78681(0x115)](this,_0x50783d);},Game_BattlerBase[_0x236293(0xd1)][_0x236293(0x27c)]=function(_0x24c4ed){const _0x49aa7e=_0x236293;VisuMZ['SkillsStatesCore'][_0x49aa7e(0x172)]['Buffs'][_0x49aa7e(0x30a)][_0x49aa7e(0x115)](this,_0x24c4ed);},Game_Battler[_0x236293(0xd1)][_0x236293(0x248)]=function(_0x1602ab){const _0x42aaa5=_0x236293;VisuMZ[_0x42aaa5(0x37b)][_0x42aaa5(0x172)][_0x42aaa5(0x1d1)][_0x42aaa5(0x12a)]['call'](this,_0x1602ab);},Game_Battler[_0x236293(0xd1)][_0x236293(0x192)]=function(_0x3525e7){const _0x42a300=_0x236293;VisuMZ[_0x42a300(0x37b)][_0x42a300(0x172)][_0x42a300(0x1d1)]['onExpireDebuffJS'][_0x42a300(0x115)](this,_0x3525e7);},Game_Battler[_0x236293(0xd1)][_0x236293(0x16f)]=function(_0x15b67b){const _0x2f24b4=_0x236293,_0x429034=VisuMZ[_0x2f24b4(0x37b)],_0x38be18=[_0x2f24b4(0x242),_0x2f24b4(0x21d),_0x2f24b4(0x208),_0x2f24b4(0x19f),_0x2f24b4(0x11a),_0x2f24b4(0x102)];for(const _0x3730f9 of _0x38be18){_0x429034[_0x3730f9][_0x15b67b]&&_0x429034[_0x3730f9][_0x15b67b]['call'](this,_0x15b67b);}},VisuMZ['SkillsStatesCore']['Game_Battler_regenerateAll']=Game_Battler[_0x236293(0xd1)][_0x236293(0xf3)],Game_Battler[_0x236293(0xd1)]['regenerateAll']=function(){const _0x33465b=_0x236293;this[_0x33465b(0xd2)](),VisuMZ['SkillsStatesCore'][_0x33465b(0x2d2)][_0x33465b(0x115)](this),this['setPassiveStateSlipDamageJS'](),this[_0x33465b(0x273)]();},Game_Battler[_0x236293(0xd1)][_0x236293(0x1e3)]=function(){const _0x28cf2d=_0x236293;for(const _0x2568d5 of this[_0x28cf2d(0x184)]()){if(!_0x2568d5)continue;this[_0x28cf2d(0x16f)](_0x2568d5['id']);}},Game_Battler['prototype'][_0x236293(0xd2)]=function(){const _0x236dff=_0x236293;for(const _0x220667 of this[_0x236dff(0x241)]()){if(!_0x220667)continue;_0x220667[_0x236dff(0x195)][_0x236dff(0x356)](/<JS SLIP REFRESH>/i)&&this[_0x236dff(0x16f)](_0x220667['id']);}},Game_Battler['prototype'][_0x236293(0x273)]=function(){const _0x5d45a2=_0x236293;if(!this[_0x5d45a2(0x262)]())return;const _0x8a1017=this[_0x5d45a2(0x241)]();for(const _0x4a08e2 of _0x8a1017){if(!_0x4a08e2)continue;this[_0x5d45a2(0x32b)](_0x4a08e2);}},Game_Battler['prototype']['onRegenerateCustomStateDamageOverTime']=function(_0x36f82d){const _0x4b3047=_0x236293,_0xa6e951=this['getStateData'](_0x36f82d['id'],_0x4b3047(0x3bb))||0x0,_0x22dda5=-this[_0x4b3047(0x3a9)](),_0x3bdbe4=Math[_0x4b3047(0x198)](_0xa6e951,_0x22dda5);if(_0x3bdbe4!==0x0){const _0xab0d37=this[_0x4b3047(0xf1)][_0x4b3047(0x211)]||0x0;this[_0x4b3047(0x22d)](_0x3bdbe4),this['_result'][_0x4b3047(0x211)]+=_0xab0d37;}const _0x3ff991=this[_0x4b3047(0x346)](_0x36f82d['id'],'slipMp')||0x0;if(_0x3ff991!==0x0){const _0xd52d2=this[_0x4b3047(0xf1)]['mpDamage']||0x0;this[_0x4b3047(0x375)](_0x3ff991),this[_0x4b3047(0xf1)][_0x4b3047(0x383)]+=_0xd52d2;}const _0x5e8f4d=this[_0x4b3047(0x346)](_0x36f82d['id'],_0x4b3047(0x2d7))||0x0;_0x5e8f4d!==0x0&&this['gainSilentTp'](_0x5e8f4d);},VisuMZ['SkillsStatesCore']['Game_Actor_skillTypes']=Game_Actor[_0x236293(0xd1)]['skillTypes'],Game_Actor[_0x236293(0xd1)]['skillTypes']=function(){const _0x3416cc=_0x236293,_0x5e87e0=VisuMZ[_0x3416cc(0x37b)][_0x3416cc(0x27e)][_0x3416cc(0x115)](this),_0x142e48=VisuMZ[_0x3416cc(0x37b)][_0x3416cc(0x172)][_0x3416cc(0x371)];let _0x2bd2e4=_0x142e48['HiddenSkillTypes'];return $gameParty[_0x3416cc(0x16e)]()&&(_0x2bd2e4=_0x2bd2e4[_0x3416cc(0x1af)](_0x142e48[_0x3416cc(0x1cd)])),_0x5e87e0[_0x3416cc(0x1e7)](_0x2d453c=>!_0x2bd2e4[_0x3416cc(0x31f)](_0x2d453c));},Game_Actor[_0x236293(0xd1)][_0x236293(0x12c)]=function(){const _0x4372c7=_0x236293;return this[_0x4372c7(0x3ab)]()[_0x4372c7(0x1e7)](_0x565c36=>this[_0x4372c7(0x3a7)](_0x565c36));},Game_Actor['prototype']['isSkillUsableForAutoBattle']=function(_0x50c92d){const _0x4a7d75=_0x236293;if(!this[_0x4a7d75(0x290)](_0x50c92d))return![];if(!_0x50c92d)return![];if(!this[_0x4a7d75(0x14a)](_0x50c92d))return![];if(this[_0x4a7d75(0x3be)](_0x50c92d))return![];return!![];},Game_Actor['prototype'][_0x236293(0x14a)]=function(_0x4ce175){const _0x2ddfba=_0x236293,_0x36622e=this[_0x2ddfba(0x325)](),_0x3e4c9b=DataManager[_0x2ddfba(0x1e6)](_0x4ce175),_0x4ba11f=_0x36622e[_0x2ddfba(0x1e7)](_0x3d21d6=>_0x3e4c9b[_0x2ddfba(0x31f)](_0x3d21d6));return _0x4ba11f[_0x2ddfba(0x266)]>0x0;},Game_Actor[_0x236293(0xd1)][_0x236293(0x3be)]=function(_0x5538f8){const _0xe323d1=_0x236293;if(!VisuMZ[_0xe323d1(0x37b)]['CheckVisibleBattleNotetags'](this,_0x5538f8))return!![];if(!VisuMZ[_0xe323d1(0x37b)][_0xe323d1(0x180)](this,_0x5538f8))return!![];if(!VisuMZ['SkillsStatesCore'][_0xe323d1(0x249)](this,_0x5538f8))return!![];return![];},Game_Actor['prototype'][_0x236293(0x145)]=function(){const _0xdc908b=_0x236293;let _0x46d501=[this['actor'](),this[_0xdc908b(0x362)]()];_0x46d501=_0x46d501[_0xdc908b(0x1af)](this['equips']()['filter'](_0x550bed=>_0x550bed));for(const _0x3369c7 of this[_0xdc908b(0x39c)]){const _0x1da0b3=$dataSkills[_0x3369c7];if(!_0x1da0b3)continue;if(DataManager[_0xdc908b(0x32c)](_0x1da0b3)){if(!this[_0xdc908b(0x32d)](_0x1da0b3))continue;}_0x46d501[_0xdc908b(0x295)](_0x1da0b3);}return _0x46d501;},Game_Actor[_0x236293(0xd1)][_0x236293(0x377)]=function(){const _0x37ef64=_0x236293;Game_Battler['prototype'][_0x37ef64(0x377)][_0x37ef64(0x115)](this);const _0x2aa4c2=VisuMZ[_0x37ef64(0x37b)][_0x37ef64(0x172)][_0x37ef64(0x29d)]['Actor'];this[_0x37ef64(0x207)]['passiveStates']=this[_0x37ef64(0x207)]['passiveStates'][_0x37ef64(0x1af)](_0x2aa4c2);},VisuMZ[_0x236293(0x37b)][_0x236293(0x342)]=Game_Actor[_0x236293(0xd1)][_0x236293(0x2a3)],Game_Actor[_0x236293(0xd1)][_0x236293(0x2a3)]=function(_0x4bfcb5){const _0xe65bab=_0x236293;VisuMZ[_0xe65bab(0x37b)][_0xe65bab(0x342)][_0xe65bab(0x115)](this,_0x4bfcb5),this[_0xe65bab(0x207)]={},this['passiveStates']();},VisuMZ[_0x236293(0x37b)]['Game_Actor_forgetSkill']=Game_Actor['prototype'][_0x236293(0x237)],Game_Actor[_0x236293(0xd1)][_0x236293(0x237)]=function(_0x4b5b06){const _0x1807c5=_0x236293;VisuMZ['SkillsStatesCore'][_0x1807c5(0x232)][_0x1807c5(0x115)](this,_0x4b5b06),this[_0x1807c5(0x207)]={},this[_0x1807c5(0x184)]();},Game_Actor[_0x236293(0xd1)][_0x236293(0x3bc)]=function(){const _0x376da2=_0x236293;return VisuMZ['SkillsStatesCore'][_0x376da2(0x172)][_0x376da2(0x2b4)]['TurnEndOnMap']??0x14;},Game_Enemy[_0x236293(0xd1)]['passiveStateObjects']=function(){const _0x34b8ef=_0x236293;let _0x4bfb57=[this['enemy']()];return _0x4bfb57[_0x34b8ef(0x1af)](this[_0x34b8ef(0x3ab)]());},Game_Enemy[_0x236293(0xd1)][_0x236293(0x377)]=function(){const _0x2ee971=_0x236293;Game_Battler['prototype']['addPassiveStatesByPluginParameters'][_0x2ee971(0x115)](this);const _0x17b4a8=VisuMZ['SkillsStatesCore'][_0x2ee971(0x172)][_0x2ee971(0x29d)][_0x2ee971(0x1c5)];this[_0x2ee971(0x207)][_0x2ee971(0x184)]=this[_0x2ee971(0x207)]['passiveStates'][_0x2ee971(0x1af)](_0x17b4a8);},Game_Enemy[_0x236293(0xd1)][_0x236293(0x3ab)]=function(){const _0x1ccb95=_0x236293,_0x107f53=[];for(const _0x264e0e of this[_0x1ccb95(0x309)]()['actions']){const _0x56494d=$dataSkills[_0x264e0e['skillId']];if(_0x56494d&&!_0x107f53[_0x1ccb95(0x31f)](_0x56494d))_0x107f53[_0x1ccb95(0x295)](_0x56494d);}return _0x107f53;},Game_Enemy[_0x236293(0xd1)]['meetsStateCondition']=function(_0x140d9d){return this['hasState']($dataStates[_0x140d9d]);},VisuMZ[_0x236293(0x37b)]['Game_Unit_isAllDead']=Game_Unit['prototype'][_0x236293(0x1f3)],Game_Unit[_0x236293(0xd1)][_0x236293(0x1f3)]=function(){const _0x5223b6=_0x236293;if(this['isPartyAllAffectedByGroupDefeatStates']())return!![];return VisuMZ[_0x5223b6(0x37b)][_0x5223b6(0x126)][_0x5223b6(0x115)](this);},Game_Unit[_0x236293(0xd1)]['isPartyAllAffectedByGroupDefeatStates']=function(){const _0x5eec85=_0x236293,_0x2dc6b4=this[_0x5eec85(0x35b)]();for(const _0x208c4c of _0x2dc6b4){if(!_0x208c4c[_0x5eec85(0x2cf)]())return![];}return!![];},Game_Unit[_0x236293(0xd1)][_0x236293(0xcf)]=function(){const _0x48ee1e=_0x236293;for(const _0x4c38f9 of this[_0x48ee1e(0x34a)]()){if(!_0x4c38f9)continue;_0x4c38f9['refresh']();}},VisuMZ[_0x236293(0x37b)]['Game_Player_refresh']=Game_Player[_0x236293(0xd1)][_0x236293(0xac)],Game_Player['prototype'][_0x236293(0xac)]=function(){const _0x1e9f66=_0x236293;VisuMZ[_0x1e9f66(0x37b)]['Game_Player_refresh'][_0x1e9f66(0x115)](this),$gameParty[_0x1e9f66(0xcf)](),$gameParty[_0x1e9f66(0x16e)]()&&$gameTroop[_0x1e9f66(0xcf)]();},VisuMZ[_0x236293(0x37b)]['Game_Troop_setup']=Game_Troop['prototype'][_0x236293(0x3a4)],Game_Troop[_0x236293(0xd1)][_0x236293(0x3a4)]=function(_0x3c2108){const _0x5d4af0=_0x236293;VisuMZ[_0x5d4af0(0x37b)][_0x5d4af0(0x1a2)]['call'](this,_0x3c2108),this[_0x5d4af0(0x381)]();},Game_Troop[_0x236293(0xd1)][_0x236293(0x381)]=function(){const _0xe2aa2c=_0x236293;this[_0xe2aa2c(0x2f6)]=Graphics[_0xe2aa2c(0x2d8)];},Game_Troop[_0x236293(0xd1)]['getCurrentTroopUniqueID']=function(){const _0x2dbe6c=_0x236293;return this[_0x2dbe6c(0x2f6)]=this['_currentTroopUniqueID']||Graphics[_0x2dbe6c(0x2d8)],this[_0x2dbe6c(0x2f6)];},Scene_Skill[_0x236293(0xd1)][_0x236293(0x398)]=function(){const _0x4b0473=_0x236293;if(ConfigManager[_0x4b0473(0x163)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x4b0473(0x2d4)];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x4b0473(0x157)]()['match'](/LOWER/i);else Scene_ItemBase[_0x4b0473(0xd1)]['isRightInputMode'][_0x4b0473(0x115)](this);}},Scene_Skill[_0x236293(0xd1)][_0x236293(0x146)]=function(){const _0x5414da=_0x236293;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x5414da(0x2e0)]!==undefined)return ConfigManager['uiInputPosition'];else return this['isUseSkillsStatesCoreUpdatedLayout']()?this['updatedLayoutStyle']()[_0x5414da(0x356)](/RIGHT/i):Scene_ItemBase[_0x5414da(0xd1)][_0x5414da(0x146)][_0x5414da(0x115)](this);},Scene_Skill[_0x236293(0xd1)][_0x236293(0x157)]=function(){const _0xed7716=_0x236293;return VisuMZ[_0xed7716(0x37b)]['Settings'][_0xed7716(0x371)][_0xed7716(0x38a)];},Scene_Skill['prototype'][_0x236293(0x394)]=function(){const _0x107fd4=_0x236293;return this[_0x107fd4(0x10a)]&&this[_0x107fd4(0x10a)][_0x107fd4(0x394)]();},Scene_Skill[_0x236293(0xd1)][_0x236293(0x387)]=function(){const _0x5ab427=_0x236293;return VisuMZ[_0x5ab427(0x37b)][_0x5ab427(0x172)][_0x5ab427(0x371)][_0x5ab427(0x299)];},VisuMZ[_0x236293(0x37b)][_0x236293(0x322)]=Scene_Skill[_0x236293(0xd1)]['helpWindowRect'],Scene_Skill[_0x236293(0xd1)]['helpWindowRect']=function(){const _0x32f316=_0x236293;return this[_0x32f316(0x387)]()?this[_0x32f316(0x160)]():VisuMZ[_0x32f316(0x37b)]['Scene_Skill_helpWindowRect']['call'](this);},Scene_Skill[_0x236293(0xd1)][_0x236293(0x160)]=function(){const _0x5b8d12=_0x236293,_0x2aeec9=0x0,_0x47dc11=this[_0x5b8d12(0x3ba)](),_0x4bb105=Graphics['boxWidth'],_0x489315=this['helpAreaHeight']();return new Rectangle(_0x2aeec9,_0x47dc11,_0x4bb105,_0x489315);},VisuMZ[_0x236293(0x37b)][_0x236293(0x34e)]=Scene_Skill[_0x236293(0xd1)][_0x236293(0x284)],Scene_Skill[_0x236293(0xd1)]['skillTypeWindowRect']=function(){const _0x4730a9=_0x236293;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x4730a9(0x364)]():VisuMZ[_0x4730a9(0x37b)][_0x4730a9(0x34e)][_0x4730a9(0x115)](this);},Scene_Skill[_0x236293(0xd1)][_0x236293(0x367)]=function(){const _0x49179e=_0x236293;return VisuMZ['SkillsStatesCore'][_0x49179e(0x172)][_0x49179e(0x371)][_0x49179e(0x1a1)]??Scene_MenuBase['prototype'][_0x49179e(0x367)][_0x49179e(0x115)](this);},Scene_Skill[_0x236293(0xd1)][_0x236293(0x364)]=function(){const _0x13bf7a=_0x236293,_0x109962=this[_0x13bf7a(0x367)](),_0x1f63fc=this['calcWindowHeight'](0x3,!![]),_0x46d2cc=this[_0x13bf7a(0x146)]()?Graphics[_0x13bf7a(0x2ee)]-_0x109962:0x0,_0x507ee7=this['mainAreaTop']();return new Rectangle(_0x46d2cc,_0x507ee7,_0x109962,_0x1f63fc);},VisuMZ[_0x236293(0x37b)][_0x236293(0x2e2)]=Scene_Skill[_0x236293(0xd1)][_0x236293(0x19a)],Scene_Skill[_0x236293(0xd1)][_0x236293(0x19a)]=function(){const _0x234bdc=_0x236293;return this[_0x234bdc(0x387)]()?this[_0x234bdc(0x263)]():VisuMZ['SkillsStatesCore']['Scene_Skill_statusWindowRect'][_0x234bdc(0x115)](this);},Scene_Skill[_0x236293(0xd1)][_0x236293(0x263)]=function(){const _0x100e45=_0x236293,_0x56ea23=Graphics[_0x100e45(0x2ee)]-this[_0x100e45(0x367)](),_0x424c05=this[_0x100e45(0x1ca)][_0x100e45(0x391)],_0x5d7b67=this[_0x100e45(0x146)]()?0x0:Graphics['boxWidth']-_0x56ea23,_0x11bc0b=this[_0x100e45(0x2d1)]();return new Rectangle(_0x5d7b67,_0x11bc0b,_0x56ea23,_0x424c05);},VisuMZ[_0x236293(0x37b)][_0x236293(0x148)]=Scene_Skill[_0x236293(0xd1)][_0x236293(0xea)],Scene_Skill[_0x236293(0xd1)][_0x236293(0xea)]=function(){const _0x2f542a=_0x236293;VisuMZ[_0x2f542a(0x37b)][_0x2f542a(0x148)][_0x2f542a(0x115)](this),this['allowCreateShopStatusWindow']()&&this['createShopStatusWindow']();},VisuMZ[_0x236293(0x37b)][_0x236293(0x286)]=Scene_Skill[_0x236293(0xd1)][_0x236293(0x264)],Scene_Skill[_0x236293(0xd1)][_0x236293(0x264)]=function(){const _0x571b79=_0x236293;if(this[_0x571b79(0x387)]())return this['itemWindowRectSkillsStatesCore']();else{const _0x323e17=VisuMZ[_0x571b79(0x37b)][_0x571b79(0x286)][_0x571b79(0x115)](this);return this[_0x571b79(0x1f0)]()&&this[_0x571b79(0x127)]()&&(_0x323e17[_0x571b79(0x3c2)]-=this[_0x571b79(0x209)]()),_0x323e17;}},Scene_Skill[_0x236293(0xd1)]['itemWindowRectSkillsStatesCore']=function(){const _0x2b51c4=_0x236293,_0x484e3d=Graphics[_0x2b51c4(0x2ee)]-this[_0x2b51c4(0x209)](),_0x453a1e=this[_0x2b51c4(0x380)]()-this['_statusWindow'][_0x2b51c4(0x391)],_0x142cb6=this[_0x2b51c4(0x146)]()?Graphics[_0x2b51c4(0x2ee)]-_0x484e3d:0x0,_0x55cc37=this['_statusWindow']['y']+this[_0x2b51c4(0x17a)][_0x2b51c4(0x391)];return new Rectangle(_0x142cb6,_0x55cc37,_0x484e3d,_0x453a1e);},Scene_Skill[_0x236293(0xd1)][_0x236293(0x1f0)]=function(){const _0x150404=_0x236293;if(!Imported[_0x150404(0x230)])return![];else return this['isUseSkillsStatesCoreUpdatedLayout']()?!![]:VisuMZ[_0x150404(0x37b)][_0x150404(0x172)][_0x150404(0x371)][_0x150404(0x296)];},Scene_Skill['prototype'][_0x236293(0x127)]=function(){const _0x4bf382=_0x236293;return VisuMZ[_0x4bf382(0x37b)][_0x4bf382(0x172)][_0x4bf382(0x371)][_0x4bf382(0x353)];},Scene_Skill[_0x236293(0xd1)][_0x236293(0x2f7)]=function(){const _0x540364=_0x236293,_0x4758ba=this[_0x540364(0xce)]();this[_0x540364(0x168)]=new Window_ShopStatus(_0x4758ba),this[_0x540364(0x1bc)](this[_0x540364(0x168)]),this['_itemWindow'][_0x540364(0x136)](this[_0x540364(0x168)]);const _0x42058b=VisuMZ[_0x540364(0x37b)][_0x540364(0x172)]['Skills'][_0x540364(0xb2)];this[_0x540364(0x168)][_0x540364(0x2e6)](_0x42058b||0x0);},Scene_Skill['prototype'][_0x236293(0xce)]=function(){const _0x195b7e=_0x236293;return this[_0x195b7e(0x387)]()?this['shopStatusWindowRectSkillsStatesCore']():VisuMZ[_0x195b7e(0x37b)]['Settings'][_0x195b7e(0x371)][_0x195b7e(0x141)]['call'](this);},Scene_Skill[_0x236293(0xd1)][_0x236293(0x2c2)]=function(){const _0x528850=_0x236293,_0x3fb440=this[_0x528850(0x209)](),_0x23054a=this[_0x528850(0x1cc)][_0x528850(0x391)],_0x3bc39c=this[_0x528850(0x146)]()?0x0:Graphics[_0x528850(0x2ee)]-this['shopStatusWidth'](),_0x1db312=this[_0x528850(0x1cc)]['y'];return new Rectangle(_0x3bc39c,_0x1db312,_0x3fb440,_0x23054a);},Scene_Skill[_0x236293(0xd1)]['shopStatusWidth']=function(){const _0x1a4242=_0x236293;return Imported[_0x1a4242(0x230)]?Scene_Shop[_0x1a4242(0xd1)][_0x1a4242(0xb0)]():0x0;},Scene_Skill[_0x236293(0xd1)]['buttonAssistText1']=function(){const _0x61e6a5=_0x236293;return this[_0x61e6a5(0x1ca)]&&this['_skillTypeWindow'][_0x61e6a5(0x2a8)]?TextManager[_0x61e6a5(0xdc)]:'';},VisuMZ[_0x236293(0x37b)]['Scene_Skill_onItemOk_Toggle']=Scene_Skill['prototype']['onItemOk'],Scene_Skill[_0x236293(0xd1)]['onItemOk']=function(){const _0x455e30=_0x236293,_0x5ee329=this[_0x455e30(0x191)]();DataManager[_0x455e30(0x32c)](_0x5ee329)?this[_0x455e30(0x27b)]():VisuMZ['SkillsStatesCore']['Scene_Skill_onItemOk_Toggle'][_0x455e30(0x115)](this);},Scene_Skill[_0x236293(0xd1)][_0x236293(0x27b)]=function(){const _0x3a272c=_0x236293;SoundManager[_0x3a272c(0x344)]();const _0x4c41f7=this[_0x3a272c(0x191)](),_0x138fee=this['actor']()[_0x3a272c(0x32d)](_0x4c41f7);if(!_0x138fee)this[_0x3a272c(0x247)]()[_0x3a272c(0x3a8)](_0x4c41f7);this[_0x3a272c(0x247)]()[_0x3a272c(0xa8)](_0x4c41f7,!_0x138fee),this['_itemWindow']['refresh'](),this[_0x3a272c(0x1cc)][_0x3a272c(0x193)]();if(this['_statusWindow'])this[_0x3a272c(0x17a)][_0x3a272c(0xac)]();},VisuMZ[_0x236293(0x37b)][_0x236293(0x294)]=Scene_Battle[_0x236293(0xd1)][_0x236293(0x15f)],Scene_Battle[_0x236293(0xd1)]['onSkillOk']=function(){const _0x43bff0=_0x236293,_0x38fa37=this[_0x43bff0(0x139)][_0x43bff0(0x191)]();DataManager[_0x43bff0(0x32c)](_0x38fa37)?this[_0x43bff0(0x27b)]():VisuMZ[_0x43bff0(0x37b)][_0x43bff0(0x294)][_0x43bff0(0x115)](this);},Scene_Battle['prototype'][_0x236293(0x27b)]=function(){const _0x4e8bc2=_0x236293;SoundManager['playEquip']();const _0x35274f=this['_skillWindow'][_0x4e8bc2(0x191)](),_0x5a7bb=BattleManager[_0x4e8bc2(0x247)](),_0x2ec41f=_0x5a7bb[_0x4e8bc2(0x32d)](_0x35274f);if(!_0x2ec41f)_0x5a7bb['paySkillCost'](_0x35274f);_0x5a7bb['setSkillToggle'](_0x35274f,!_0x2ec41f);if(Imported[_0x4e8bc2(0x1ac)]){let _0x1079e7=0x0;_0x5a7bb[_0x4e8bc2(0x32d)](_0x35274f)?_0x35274f[_0x4e8bc2(0x195)][_0x4e8bc2(0x356)](/<TOGGLE ON (?:ANI|ANIMATION):[ ](\d+)>/i)?_0x1079e7=Number(RegExp['$1']):_0x1079e7=_0x35274f[_0x4e8bc2(0x3c0)]||0x0:_0x35274f[_0x4e8bc2(0x195)][_0x4e8bc2(0x356)](/<TOGGLE OFF (?:ANI|ANIMATION):[ ](\d+)>/i)?_0x1079e7=Number(RegExp['$1']):_0x1079e7=VisuMZ['SkillsStatesCore'][_0x4e8bc2(0x172)]['Toggles'][_0x4e8bc2(0xcc)]??0x0,_0x1079e7>0x0&&$gameTemp['requestFauxAnimation']([_0x5a7bb],_0x1079e7,![],![]);}this[_0x4e8bc2(0x139)][_0x4e8bc2(0xac)](),this[_0x4e8bc2(0x139)]['activate']();if(this[_0x4e8bc2(0x17a)])this[_0x4e8bc2(0x17a)][_0x4e8bc2(0xac)]();},VisuMZ[_0x236293(0x37b)][_0x236293(0xd8)]=Sprite_Gauge[_0x236293(0xd1)]['initMembers'],Sprite_Gauge[_0x236293(0xd1)]['initMembers']=function(){const _0x5d3ae0=_0x236293;VisuMZ[_0x5d3ae0(0x37b)][_0x5d3ae0(0xd8)][_0x5d3ae0(0x115)](this),this[_0x5d3ae0(0xd7)]=null;},VisuMZ[_0x236293(0x37b)][_0x236293(0xa4)]=Sprite_Gauge['prototype'][_0x236293(0x3a4)],Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x3a4)]=function(_0x29b7e1,_0x79571f){const _0x3303fb=_0x236293;this['setupSkillsStatesCore'](_0x29b7e1,_0x79571f),_0x79571f=_0x79571f[_0x3303fb(0x173)](),VisuMZ[_0x3303fb(0x37b)][_0x3303fb(0xa4)][_0x3303fb(0x115)](this,_0x29b7e1,_0x79571f);},Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x303)]=function(_0x3675df,_0x567f8c){const _0x2f5cfc=_0x236293,_0x42bda2=VisuMZ['SkillsStatesCore']['Settings'][_0x2f5cfc(0x17e)][_0x2f5cfc(0x1e7)](_0x1be3e6=>_0x1be3e6[_0x2f5cfc(0xcb)][_0x2f5cfc(0x2af)]()===_0x567f8c[_0x2f5cfc(0x2af)]());_0x42bda2[_0x2f5cfc(0x266)]>=0x1?this[_0x2f5cfc(0xd7)]=_0x42bda2[0x0]:this[_0x2f5cfc(0xd7)]=null;},VisuMZ[_0x236293(0x37b)][_0x236293(0x335)]=Sprite_Gauge['prototype']['currentValue'],Sprite_Gauge['prototype'][_0x236293(0x312)]=function(){const _0xc10711=_0x236293;return this['_battler']&&this[_0xc10711(0xd7)]?this[_0xc10711(0x1fd)]():VisuMZ[_0xc10711(0x37b)][_0xc10711(0x335)][_0xc10711(0x115)](this);},Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x1fd)]=function(){const _0x4d0226=_0x236293;return this['_costSettings']['GaugeCurrentJS'][_0x4d0226(0x115)](this[_0x4d0226(0x311)]);},VisuMZ[_0x236293(0x37b)][_0x236293(0x245)]=Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x150)],Sprite_Gauge[_0x236293(0xd1)]['currentMaxValue']=function(){const _0x1f5443=_0x236293;return this[_0x1f5443(0x311)]&&this[_0x1f5443(0xd7)]?this[_0x1f5443(0x1a7)]():VisuMZ['SkillsStatesCore'][_0x1f5443(0x245)][_0x1f5443(0x115)](this);},Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x1a7)]=function(){const _0xa31dd8=_0x236293;return this[_0xa31dd8(0xd7)][_0xa31dd8(0x33b)]['call'](this[_0xa31dd8(0x311)]);},VisuMZ['SkillsStatesCore'][_0x236293(0x231)]=Sprite_Gauge[_0x236293(0xd1)]['gaugeRate'],Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x15b)]=function(){const _0x51cdc0=_0x236293,_0x2317ef=VisuMZ[_0x51cdc0(0x37b)]['Sprite_Gauge_gaugeRate'][_0x51cdc0(0x115)](this);return _0x2317ef[_0x51cdc0(0x2e3)](0x0,0x1);},VisuMZ[_0x236293(0x37b)][_0x236293(0xc7)]=Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x261)],Sprite_Gauge[_0x236293(0xd1)]['redraw']=function(){const _0x1ceca7=_0x236293;this[_0x1ceca7(0x311)]&&this[_0x1ceca7(0xd7)]?(this[_0x1ceca7(0x34d)]['clear'](),this[_0x1ceca7(0x392)]()):VisuMZ[_0x1ceca7(0x37b)]['Sprite_Gauge_redraw'][_0x1ceca7(0x115)](this);},Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x213)]=function(){const _0x5f2ad9=_0x236293;let _0x5985e6=this['currentValue']();return Imported[_0x5f2ad9(0x1ac)]&&this[_0x5f2ad9(0x358)]()&&(_0x5985e6=VisuMZ[_0x5f2ad9(0x339)](_0x5985e6)),_0x5985e6;},Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x392)]=function(){const _0x242c2b=_0x236293;this['bitmap'][_0x242c2b(0x21a)](),this['_costSettings']['GaugeDrawJS']['call'](this);},Sprite_Gauge[_0x236293(0xd1)]['drawFullGauge']=function(_0x4c7c35,_0x4aa61d,_0x1fe10,_0x360d25,_0x5e07ea,_0x16ee18){const _0x12d7a6=_0x236293,_0x329257=this[_0x12d7a6(0x15b)](),_0x3d7e1a=Math[_0x12d7a6(0x1d0)]((_0x5e07ea-0x2)*_0x329257),_0xb8be3c=_0x16ee18-0x2,_0x22f2b4=this[_0x12d7a6(0x3bf)]();this['bitmap']['fillRect'](_0x1fe10,_0x360d25,_0x5e07ea,_0x16ee18,_0x22f2b4),this[_0x12d7a6(0x34d)]['gradientFillRect'](_0x1fe10+0x1,_0x360d25+0x1,_0x3d7e1a,_0xb8be3c,_0x4c7c35,_0x4aa61d);},Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x2c9)]=function(){const _0xede50a=_0x236293,_0x467933=VisuMZ['SkillsStatesCore'][_0xede50a(0x172)][_0xede50a(0x2f3)];return _0x467933['LabelFontMainType']==='number'?$gameSystem[_0xede50a(0x270)]():$gameSystem[_0xede50a(0x347)]();},Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x36b)]=function(){const _0x6ab82=_0x236293,_0x5827d1=VisuMZ[_0x6ab82(0x37b)][_0x6ab82(0x172)][_0x6ab82(0x2f3)];return _0x5827d1[_0x6ab82(0x324)]===_0x6ab82(0x1a0)?$gameSystem[_0x6ab82(0xd9)]()-0x6:$gameSystem[_0x6ab82(0xd9)]()-0x2;},Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x2de)]=function(){const _0x1d6903=_0x236293,_0x4434ee=VisuMZ[_0x1d6903(0x37b)][_0x1d6903(0x172)][_0x1d6903(0x2f3)];return _0x4434ee['ValueFontMainType']===_0x1d6903(0x1a0)?$gameSystem['numberFontFace']():$gameSystem['mainFontFace']();},Sprite_Gauge['prototype'][_0x236293(0x396)]=function(){const _0x5df2a7=_0x236293,_0x27382f=VisuMZ[_0x5df2a7(0x37b)][_0x5df2a7(0x172)][_0x5df2a7(0x2f3)];return _0x27382f[_0x5df2a7(0x37d)]==='number'?$gameSystem[_0x5df2a7(0xd9)]()-0x6:$gameSystem['mainFontSize']()-0x2;},Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x307)]=function(){const _0x2f6229=_0x236293,_0xadad0e=VisuMZ[_0x2f6229(0x37b)][_0x2f6229(0x172)][_0x2f6229(0x2f3)];if(_0xadad0e[_0x2f6229(0x18d)]){if(_0xadad0e[_0x2f6229(0x276)]===0x1)return this[_0x2f6229(0xeb)]();else{if(_0xadad0e[_0x2f6229(0x276)]===0x2)return this[_0x2f6229(0xda)]();}}const _0x4a48d8=_0xadad0e[_0x2f6229(0x2b1)];return ColorManager[_0x2f6229(0x1b1)](_0x4a48d8);},Sprite_Gauge['prototype'][_0x236293(0x2fb)]=function(){const _0x1cee7e=_0x236293,_0x3efd5a=VisuMZ[_0x1cee7e(0x37b)][_0x1cee7e(0x172)][_0x1cee7e(0x2f3)];if(this['labelOutlineWidth']()<=0x0)return _0x1cee7e(0x323);else return _0x3efd5a['LabelOutlineSolid']?_0x1cee7e(0x3a0):ColorManager[_0x1cee7e(0x38e)]();},Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x10e)]=function(){const _0xd21cc6=_0x236293;return VisuMZ['SkillsStatesCore'][_0xd21cc6(0x172)][_0xd21cc6(0x2f3)][_0xd21cc6(0x372)]||0x0;},Sprite_Gauge['prototype'][_0x236293(0x350)]=function(){const _0x13a166=_0x236293,_0x151632=VisuMZ[_0x13a166(0x37b)][_0x13a166(0x172)][_0x13a166(0x2f3)];if(this['valueOutlineWidth']()<=0x0)return _0x13a166(0x323);else return _0x151632[_0x13a166(0x2b7)]?_0x13a166(0x3a0):ColorManager[_0x13a166(0x38e)]();},Sprite_Gauge[_0x236293(0xd1)][_0x236293(0x109)]=function(){const _0x26c925=_0x236293;return VisuMZ['SkillsStatesCore'][_0x26c925(0x172)][_0x26c925(0x2f3)][_0x26c925(0x183)]||0x0;},VisuMZ[_0x236293(0x37b)][_0x236293(0x272)]=Sprite_StateIcon[_0x236293(0xd1)][_0x236293(0xc5)],Sprite_StateIcon['prototype']['loadBitmap']=function(){const _0x474799=_0x236293;VisuMZ[_0x474799(0x37b)][_0x474799(0x272)][_0x474799(0x115)](this),this[_0x474799(0x121)]();},Sprite_StateIcon[_0x236293(0xd1)][_0x236293(0x121)]=function(){const _0x241ce1=_0x236293,_0x26fef0=Window_Base[_0x241ce1(0xd1)][_0x241ce1(0x240)]();this[_0x241ce1(0x26d)]=new Sprite(),this[_0x241ce1(0x26d)]['bitmap']=new Bitmap(ImageManager['iconWidth'],_0x26fef0),this[_0x241ce1(0x26d)][_0x241ce1(0x2c4)]['x']=this[_0x241ce1(0x2c4)]['x'],this[_0x241ce1(0x26d)][_0x241ce1(0x2c4)]['y']=this['anchor']['y'],this[_0x241ce1(0xc3)](this[_0x241ce1(0x26d)]),this[_0x241ce1(0xc4)]=this['_turnDisplaySprite'][_0x241ce1(0x34d)];},VisuMZ['SkillsStatesCore'][_0x236293(0x328)]=Sprite_StateIcon['prototype'][_0x236293(0x210)],Sprite_StateIcon[_0x236293(0xd1)][_0x236293(0x210)]=function(){const _0x1f13e3=_0x236293;VisuMZ[_0x1f13e3(0x37b)][_0x1f13e3(0x328)]['call'](this),this[_0x1f13e3(0x182)]();},Sprite_StateIcon[_0x236293(0xd1)][_0x236293(0x246)]=function(_0x2d8990,_0x404787,_0x40b845,_0x31869f,_0x26679e){const _0x35af63=_0x236293;this[_0x35af63(0xc4)][_0x35af63(0x246)](_0x2d8990,_0x404787,_0x40b845,_0x31869f,this['contents'][_0x35af63(0x391)],_0x26679e);},Sprite_StateIcon[_0x236293(0xd1)][_0x236293(0x182)]=function(){const _0x32b7ee=_0x236293;this[_0x32b7ee(0x137)](),this[_0x32b7ee(0xc4)][_0x32b7ee(0x21a)]();const _0x3dc900=this[_0x32b7ee(0x311)];if(!_0x3dc900)return;const _0x455036=_0x3dc900[_0x32b7ee(0x241)]()[_0x32b7ee(0x1e7)](_0x4669fd=>_0x4669fd['iconIndex']>0x0),_0x2e084d=[...Array(0x8)[_0x32b7ee(0x36e)]()][_0x32b7ee(0x1e7)](_0x2b3862=>_0x3dc900[_0x32b7ee(0x1b9)](_0x2b3862)!==0x0),_0xae3c2a=this[_0x32b7ee(0x29c)],_0x3ca3c0=_0x455036[_0xae3c2a];if(_0x3ca3c0)Window_Base['prototype'][_0x32b7ee(0x2ce)]['call'](this,_0x3dc900,_0x3ca3c0,0x0,0x0),Window_Base['prototype'][_0x32b7ee(0x2b2)][_0x32b7ee(0x115)](this,_0x3dc900,_0x3ca3c0,0x0,0x0);else{const _0x1fddb5=_0x2e084d[_0xae3c2a-_0x455036[_0x32b7ee(0x266)]];if(_0x1fddb5===undefined)return;Window_Base['prototype'][_0x32b7ee(0xa9)][_0x32b7ee(0x115)](this,_0x3dc900,_0x1fddb5,0x0,0x0),Window_Base[_0x32b7ee(0xd1)]['drawActorBuffRates']['call'](this,_0x3dc900,_0x1fddb5,0x0,0x0);}},Sprite_StateIcon['prototype']['resetFontSettings']=function(){const _0x560ae9=_0x236293;this[_0x560ae9(0xc4)][_0x560ae9(0xc0)]=$gameSystem['mainFontFace'](),this[_0x560ae9(0xc4)]['fontSize']=$gameSystem[_0x560ae9(0xd9)](),this[_0x560ae9(0x14d)]();},Sprite_StateIcon[_0x236293(0xd1)][_0x236293(0x14d)]=function(){const _0x3a25d5=_0x236293;this['changeTextColor'](ColorManager[_0x3a25d5(0x1f5)]()),this[_0x3a25d5(0x1f7)](ColorManager['outlineColor']());},Sprite_StateIcon[_0x236293(0xd1)][_0x236293(0x2ae)]=function(_0x59347a){const _0x539b5a=_0x236293;this[_0x539b5a(0xc4)][_0x539b5a(0x345)]=_0x59347a;},Sprite_StateIcon[_0x236293(0xd1)][_0x236293(0x1f7)]=function(_0x3fb71e){const _0x16a65f=_0x236293;this[_0x16a65f(0xc4)][_0x16a65f(0x38e)]=_0x3fb71e;},Sprite_StateIcon['prototype']['hide']=function(){const _0x231962=_0x236293;this[_0x231962(0x2f5)]=!![],this[_0x231962(0x338)]();},Window_Base['prototype']['drawSkillCost']=function(_0x572d07,_0x5dcbac,_0x2ad7d8,_0x20e6ff,_0x3e6b25){const _0x146c2e=_0x236293,_0x13890=this['createAllSkillCostText'](_0x572d07,_0x5dcbac),_0x12973c=this['textSizeEx'](_0x13890,_0x2ad7d8,_0x20e6ff,_0x3e6b25),_0x46add1=_0x2ad7d8+_0x3e6b25-_0x12973c['width'];this[_0x146c2e(0x3a5)](_0x13890,_0x46add1,_0x20e6ff,_0x3e6b25),this['resetFontSettings']();},Window_Base[_0x236293(0xd1)][_0x236293(0x235)]=function(_0x382765,_0x24aaae){const _0x3adf52=_0x236293;let _0x178d1f='';for(settings of VisuMZ[_0x3adf52(0x37b)]['Settings'][_0x3adf52(0x17e)]){if(!this[_0x3adf52(0x267)](_0x382765,_0x24aaae,settings))continue;if(_0x178d1f[_0x3adf52(0x266)]>0x0)_0x178d1f+=this['skillCostSeparator']();_0x178d1f+=this[_0x3adf52(0x374)](_0x382765,_0x24aaae,settings);}_0x178d1f=this[_0x3adf52(0x357)](_0x382765,_0x24aaae,_0x178d1f);if(_0x24aaae['note'][_0x3adf52(0x356)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x178d1f[_0x3adf52(0x266)]>0x0)_0x178d1f+=this[_0x3adf52(0x107)]();_0x178d1f+=String(RegExp['$1']);}return _0x178d1f;},Window_Base[_0x236293(0xd1)][_0x236293(0x357)]=function(_0x194ac0,_0x2548d8,_0x54fbff){return _0x54fbff;},Window_Base[_0x236293(0xd1)]['isSkillCostShown']=function(_0x2338ae,_0x46dade,_0x2c23a5){const _0x4722d5=_0x236293;let _0x2179ce=_0x2c23a5['CalcJS'][_0x4722d5(0x115)](_0x2338ae,_0x46dade);return _0x2179ce=_0x2338ae['adjustSkillCost'](_0x46dade,_0x2179ce,_0x2c23a5),_0x2c23a5[_0x4722d5(0xba)][_0x4722d5(0x115)](_0x2338ae,_0x46dade,_0x2179ce,_0x2c23a5);},Window_Base[_0x236293(0xd1)][_0x236293(0x374)]=function(_0x364e49,_0x53a132,_0x34252d){const _0x4758ff=_0x236293;let _0x602ba9=_0x34252d[_0x4758ff(0x327)][_0x4758ff(0x115)](_0x364e49,_0x53a132);return _0x602ba9=_0x364e49[_0x4758ff(0x2bc)](_0x53a132,_0x602ba9,_0x34252d),_0x34252d[_0x4758ff(0x1c8)][_0x4758ff(0x115)](_0x364e49,_0x53a132,_0x602ba9,_0x34252d);},Window_Base['prototype'][_0x236293(0x107)]=function(){return'\x20';},Window_Base[_0x236293(0xd1)][_0x236293(0x359)]=function(_0x38581f,_0x3891e1,_0x4e6635,_0x46684c){const _0x2fbad1=_0x236293;if(!_0x38581f)return;VisuMZ[_0x2fbad1(0x37b)][_0x2fbad1(0x38c)]['call'](this,_0x38581f,_0x3891e1,_0x4e6635,_0x46684c),this[_0x2fbad1(0x1ef)](_0x38581f,_0x3891e1,_0x4e6635,_0x46684c);},Window_Base[_0x236293(0xd1)]['drawActorIconsAllTurnCounters']=function(_0xf2ebc9,_0xd9da8a,_0x4b9429,_0x27503c){const _0x1864a5=_0x236293;_0x27503c=_0x27503c||0x90;const _0x56d05b=ImageManager[_0x1864a5(0x2c1)]||0x20,_0x54a310=ImageManager[_0x1864a5(0x1e0)]||0x20,_0x3b2d68=_0x56d05b,_0x1b2bcf=_0xf2ebc9[_0x1864a5(0xae)]()[_0x1864a5(0x279)](0x0,Math[_0x1864a5(0x1d0)](_0x27503c/_0x3b2d68)),_0x151a44=_0xf2ebc9[_0x1864a5(0x241)]()[_0x1864a5(0x1e7)](_0x4a4589=>_0x4a4589[_0x1864a5(0x2c3)]>0x0),_0x584045=[...Array(0x8)[_0x1864a5(0x36e)]()][_0x1864a5(0x1e7)](_0x1868bf=>_0xf2ebc9[_0x1864a5(0x1b9)](_0x1868bf)!==0x0),_0x18469c=[];let _0x376432=_0xd9da8a;for(let _0xf0fd20=0x0;_0xf0fd20<_0x1b2bcf[_0x1864a5(0x266)];_0xf0fd20++){this[_0x1864a5(0x137)]();const _0x18727d=_0x151a44[_0xf0fd20];if(_0x18727d)!_0x18469c['includes'](_0x18727d)&&this['drawActorStateTurns'](_0xf2ebc9,_0x18727d,_0x376432,_0x4b9429),this['drawActorStateData'](_0xf2ebc9,_0x18727d,_0x376432,_0x4b9429),_0x18469c[_0x1864a5(0x295)](_0x18727d);else{const _0xf89c31=_0x584045[_0xf0fd20-_0x151a44['length']];this['drawActorBuffTurns'](_0xf2ebc9,_0xf89c31,_0x376432,_0x4b9429),this[_0x1864a5(0xe5)](_0xf2ebc9,_0xf89c31,_0x376432,_0x4b9429);}_0x376432+=_0x3b2d68;}},Window_Base['prototype'][_0x236293(0x2ce)]=function(_0x3aeb27,_0x52d315,_0x1de506,_0x43e949){const _0x39f2d6=_0x236293;if(!VisuMZ['SkillsStatesCore'][_0x39f2d6(0x172)][_0x39f2d6(0x2b4)][_0x39f2d6(0x185)])return;if(!_0x3aeb27['isStateAffected'](_0x52d315['id']))return;if(_0x52d315['autoRemovalTiming']===0x0)return;if(_0x52d315[_0x39f2d6(0x195)][_0x39f2d6(0x356)](/<HIDE STATE TURNS>/i))return;const _0x1ec4c9=ImageManager[_0x39f2d6(0x2c1)]||0x20,_0x1a9531=_0x1ec4c9,_0x10a5f8=_0x3aeb27[_0x39f2d6(0x113)](_0x52d315['id']),_0x33af55=ColorManager['stateColor'](_0x52d315);this[_0x39f2d6(0x2ae)](_0x33af55),this[_0x39f2d6(0x1f7)](_0x39f2d6(0x3a0)),this[_0x39f2d6(0xc4)][_0x39f2d6(0x11f)]=!![],this[_0x39f2d6(0xc4)][_0x39f2d6(0x111)]=VisuMZ[_0x39f2d6(0x37b)][_0x39f2d6(0x172)][_0x39f2d6(0x2b4)][_0x39f2d6(0x1ce)],_0x1de506+=VisuMZ[_0x39f2d6(0x37b)]['Settings'][_0x39f2d6(0x2b4)][_0x39f2d6(0x2cc)],_0x43e949+=VisuMZ[_0x39f2d6(0x37b)]['Settings'][_0x39f2d6(0x2b4)][_0x39f2d6(0xa6)],this['drawText'](_0x10a5f8,_0x1de506,_0x43e949,_0x1a9531,_0x39f2d6(0xf0)),this[_0x39f2d6(0xc4)][_0x39f2d6(0x11f)]=![],this[_0x39f2d6(0x137)]();},Window_Base[_0x236293(0xd1)]['drawActorStateData']=function(_0x8ab0e5,_0x403f38,_0x509aa4,_0x1990d2){const _0x1289d5=_0x236293;if(!VisuMZ[_0x1289d5(0x37b)][_0x1289d5(0x172)][_0x1289d5(0x2b4)][_0x1289d5(0x36f)])return;const _0x53c576=ImageManager[_0x1289d5(0x2c1)]||0x20,_0x525669=ImageManager[_0x1289d5(0x1e0)]||0x20,_0x1461cc=_0x53c576,_0x5d2d8f=_0x525669/0x2,_0x1195ed=ColorManager[_0x1289d5(0x1f5)]();this[_0x1289d5(0x2ae)](_0x1195ed),this[_0x1289d5(0x1f7)](_0x1289d5(0x3a0)),this[_0x1289d5(0xc4)][_0x1289d5(0x11f)]=!![],this['contents']['fontSize']=VisuMZ[_0x1289d5(0x37b)]['Settings']['States'][_0x1289d5(0x1a4)],_0x509aa4+=VisuMZ[_0x1289d5(0x37b)]['Settings'][_0x1289d5(0x2b4)]['DataOffsetX'],_0x1990d2+=VisuMZ['SkillsStatesCore'][_0x1289d5(0x172)][_0x1289d5(0x2b4)]['DataOffsetY'];const _0x43b8d2=String(_0x8ab0e5[_0x1289d5(0x22b)](_0x403f38['id']));this[_0x1289d5(0x246)](_0x43b8d2,_0x509aa4,_0x1990d2,_0x1461cc,_0x1289d5(0x355)),this[_0x1289d5(0xc4)][_0x1289d5(0x11f)]=![],this[_0x1289d5(0x137)]();},Window_Base[_0x236293(0xd1)][_0x236293(0xa9)]=function(_0xdec316,_0x3ef736,_0x3ff361,_0x5f18fb){const _0x5cbcad=_0x236293;if(!VisuMZ['SkillsStatesCore'][_0x5cbcad(0x172)][_0x5cbcad(0x1d1)][_0x5cbcad(0x185)])return;const _0x36a90e=_0xdec316[_0x5cbcad(0x1b9)](_0x3ef736);if(_0x36a90e===0x0)return;const _0x2355ed=_0xdec316[_0x5cbcad(0x155)](_0x3ef736),_0x12119a=ImageManager[_0x5cbcad(0x2df)],_0x3400fd=_0x36a90e>0x0?ColorManager[_0x5cbcad(0x112)]():ColorManager[_0x5cbcad(0x326)]();this['changeTextColor'](_0x3400fd),this[_0x5cbcad(0x1f7)](_0x5cbcad(0x3a0)),this[_0x5cbcad(0xc4)][_0x5cbcad(0x11f)]=!![],this[_0x5cbcad(0xc4)]['fontSize']=VisuMZ[_0x5cbcad(0x37b)]['Settings'][_0x5cbcad(0x1d1)][_0x5cbcad(0x1ce)],_0x3ff361+=VisuMZ[_0x5cbcad(0x37b)]['Settings'][_0x5cbcad(0x1d1)][_0x5cbcad(0x2cc)],_0x5f18fb+=VisuMZ[_0x5cbcad(0x37b)]['Settings'][_0x5cbcad(0x1d1)][_0x5cbcad(0xa6)],this[_0x5cbcad(0x246)](_0x2355ed,_0x3ff361,_0x5f18fb,_0x12119a,'right'),this[_0x5cbcad(0xc4)][_0x5cbcad(0x11f)]=![],this[_0x5cbcad(0x137)]();},Window_Base['prototype'][_0x236293(0xe5)]=function(_0x143317,_0xfd86ef,_0x404501,_0x122f81){const _0x198af4=_0x236293;if(!VisuMZ[_0x198af4(0x37b)][_0x198af4(0x172)]['Buffs'][_0x198af4(0x36f)])return;const _0x2bdc1d=_0x143317[_0x198af4(0x329)](_0xfd86ef),_0x287e5b=_0x143317['buff'](_0xfd86ef),_0x595dbe=ImageManager[_0x198af4(0x2c1)]||0x20,_0x1c9fbc=ImageManager[_0x198af4(0x1e0)]||0x20,_0x3e66d4=_0x595dbe,_0x5800fa=_0x1c9fbc/0x2,_0x3d2cfc=_0x287e5b>0x0?ColorManager['buffColor']():ColorManager[_0x198af4(0x326)]();this['changeTextColor'](_0x3d2cfc),this['changeOutlineColor'](_0x198af4(0x3a0)),this[_0x198af4(0xc4)][_0x198af4(0x11f)]=!![],this['contents'][_0x198af4(0x111)]=VisuMZ[_0x198af4(0x37b)][_0x198af4(0x172)][_0x198af4(0x1d1)][_0x198af4(0x1a4)],_0x404501+=VisuMZ[_0x198af4(0x37b)]['Settings'][_0x198af4(0x1d1)][_0x198af4(0x2f8)],_0x122f81+=VisuMZ['SkillsStatesCore']['Settings'][_0x198af4(0x1d1)][_0x198af4(0x22c)];const _0x5d95a0='%1%'['format'](Math['round'](_0x2bdc1d*0x64));this[_0x198af4(0x246)](_0x5d95a0,_0x404501,_0x122f81,_0x3e66d4,'center'),this['contents'][_0x198af4(0x11f)]=![],this[_0x198af4(0x137)]();},VisuMZ[_0x236293(0x37b)][_0x236293(0x200)]=Window_Base['prototype'][_0x236293(0x2ae)],Window_Base['prototype'][_0x236293(0x2ae)]=function(_0x2bfc30){const _0xa18141=_0x236293;this[_0xa18141(0x3ac)]&&(_0x2bfc30=ColorManager[_0xa18141(0x1b1)](VisuMZ[_0xa18141(0x37b)]['Settings'][_0xa18141(0x3a3)][_0xa18141(0x1b0)]??0x0)),VisuMZ[_0xa18141(0x37b)]['Window_Base_changeTextColor'][_0xa18141(0x115)](this,_0x2bfc30);},VisuMZ[_0x236293(0x37b)][_0x236293(0x26a)]=Window_Base['prototype'][_0x236293(0x246)],Window_Base[_0x236293(0xd1)][_0x236293(0x246)]=function(_0x1a3ff1,_0x3f9361,_0x4f78f2,_0x59b0d8,_0x15cdc8){const _0x482994=_0x236293;VisuMZ[_0x482994(0x37b)][_0x482994(0x26a)]['call'](this,_0x1a3ff1,_0x3f9361,_0x4f78f2,_0x59b0d8,_0x15cdc8),this[_0x482994(0x3ac)]=undefined;},VisuMZ[_0x236293(0x37b)]['Window_Base_createAllSkillCostText_Toggle']=Window_Base[_0x236293(0xd1)][_0x236293(0x235)],Window_Base[_0x236293(0xd1)][_0x236293(0x235)]=function(_0x14d8b1,_0x466a1e){const _0x587ab1=_0x236293;let _0x32bd8e=VisuMZ[_0x587ab1(0x37b)][_0x587ab1(0x283)][_0x587ab1(0x115)](this,_0x14d8b1,_0x466a1e);;return DataManager['isToggleSkill'](_0x466a1e)&&_0x14d8b1&&(_0x14d8b1[_0x587ab1(0x32d)](_0x466a1e)?_0x32bd8e=TextManager[_0x587ab1(0x1e2)]??_0x587ab1(0x3b5):(TextManager[_0x587ab1(0x236)]===_0x587ab1(0x399)?_0x32bd8e=(TextManager[_0x587ab1(0xdb)]??'[OFF]')+this[_0x587ab1(0x107)]()+_0x32bd8e:_0x32bd8e=_0x32bd8e+this[_0x587ab1(0x107)]()+(TextManager[_0x587ab1(0xdb)]??_0x587ab1(0x13c)),_0x32bd8e=_0x32bd8e[_0x587ab1(0x1ba)]())),_0x32bd8e;},VisuMZ['SkillsStatesCore'][_0x236293(0x13f)]=Window_StatusBase[_0x236293(0xd1)]['placeGauge'],Window_StatusBase[_0x236293(0xd1)][_0x236293(0x31d)]=function(_0x56e7b8,_0x569650,_0xa4b716,_0x4401a1){const _0x380969=_0x236293;if(_0x56e7b8[_0x380969(0x2ec)]())_0x569650=this[_0x380969(0x196)](_0x56e7b8,_0x569650);this['placeExactGauge'](_0x56e7b8,_0x569650,_0xa4b716,_0x4401a1);},Window_StatusBase[_0x236293(0xd1)][_0x236293(0x2c7)]=function(_0x3d1c93,_0x1a9b55,_0x5e868f,_0x2643ce){const _0x6fef4e=_0x236293;if([_0x6fef4e(0x2b5),_0x6fef4e(0x233)][_0x6fef4e(0x31f)](_0x1a9b55[_0x6fef4e(0x173)]()))return;VisuMZ[_0x6fef4e(0x37b)][_0x6fef4e(0x13f)][_0x6fef4e(0x115)](this,_0x3d1c93,_0x1a9b55,_0x5e868f,_0x2643ce);},Window_StatusBase[_0x236293(0xd1)][_0x236293(0x196)]=function(_0x254684,_0x1001b1){const _0x292f2b=_0x236293,_0x4e5dae=_0x254684[_0x292f2b(0x362)]()[_0x292f2b(0x195)];if(_0x1001b1==='hp'&&_0x4e5dae['match'](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x1001b1==='mp'&&_0x4e5dae[_0x292f2b(0x356)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x1001b1==='tp'&&_0x4e5dae[_0x292f2b(0x356)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x1001b1;}},VisuMZ['SkillsStatesCore'][_0x236293(0x38c)]=Window_StatusBase[_0x236293(0xd1)][_0x236293(0x359)],Window_StatusBase[_0x236293(0xd1)][_0x236293(0x359)]=function(_0x630ad0,_0x4e2b3c,_0x3e3b19,_0x1a69eb){const _0x39330a=_0x236293;if(!_0x630ad0)return;Window_Base[_0x39330a(0xd1)][_0x39330a(0x359)]['call'](this,_0x630ad0,_0x4e2b3c,_0x3e3b19,_0x1a69eb);},VisuMZ[_0x236293(0x37b)][_0x236293(0x308)]=Window_SkillType['prototype'][_0x236293(0xc8)],Window_SkillType[_0x236293(0xd1)][_0x236293(0xc8)]=function(_0x2b1967){const _0x14c4a9=_0x236293;VisuMZ[_0x14c4a9(0x37b)]['Window_SkillType_initialize']['call'](this,_0x2b1967),this[_0x14c4a9(0x228)](_0x2b1967);},Window_SkillType[_0x236293(0xd1)]['createCommandNameWindow']=function(_0xc57e59){const _0x48a6a0=_0x236293,_0x2526e9=new Rectangle(0x0,0x0,_0xc57e59[_0x48a6a0(0x3c2)],_0xc57e59['height']);this[_0x48a6a0(0x29e)]=new Window_Base(_0x2526e9),this['_commandNameWindow'][_0x48a6a0(0x36a)]=0x0,this[_0x48a6a0(0xc3)](this['_commandNameWindow']),this[_0x48a6a0(0x130)]();},Window_SkillType[_0x236293(0xd1)][_0x236293(0x1a9)]=function(){const _0x409205=_0x236293;Window_Command['prototype'][_0x409205(0x1a9)][_0x409205(0x115)](this);if(this[_0x409205(0x29e)])this['updateCommandNameWindow']();},Window_SkillType[_0x236293(0xd1)]['updateCommandNameWindow']=function(){const _0xade44d=_0x236293,_0x3e9c3a=this['_commandNameWindow'];_0x3e9c3a[_0xade44d(0xc4)][_0xade44d(0x21a)]();const _0x5d29cf=this[_0xade44d(0x178)](this[_0xade44d(0x2e5)]());if(_0x5d29cf===_0xade44d(0x3af)&&this[_0xade44d(0xb8)]()>0x0){const _0x45fd58=this[_0xade44d(0x17f)](this[_0xade44d(0x2e5)]());let _0x536d8b=this[_0xade44d(0x34c)](this[_0xade44d(0x2e5)]());_0x536d8b=_0x536d8b['replace'](/\\I\[(\d+)\]/gi,''),_0x3e9c3a[_0xade44d(0x137)](),this[_0xade44d(0x103)](_0x536d8b,_0x45fd58),this['commandNameWindowDrawText'](_0x536d8b,_0x45fd58),this['commandNameWindowCenter'](_0x536d8b,_0x45fd58);}},Window_SkillType[_0x236293(0xd1)]['commandNameWindowDrawBackground']=function(_0x3864d0,_0x1c9774){},Window_SkillType[_0x236293(0xd1)][_0x236293(0x114)]=function(_0x67509c,_0x5ed525){const _0x48ff89=_0x236293,_0x38f41e=this[_0x48ff89(0x29e)];_0x38f41e[_0x48ff89(0x246)](_0x67509c,0x0,_0x5ed525['y'],_0x38f41e['innerWidth'],_0x48ff89(0x355));},Window_SkillType[_0x236293(0xd1)][_0x236293(0x10c)]=function(_0x12e07e,_0x5ab7db){const _0x1c099f=_0x236293,_0x435461=this[_0x1c099f(0x29e)],_0x9ea84d=$gameSystem[_0x1c099f(0x33e)](),_0x29503e=_0x5ab7db['x']+Math[_0x1c099f(0x1d0)](_0x5ab7db[_0x1c099f(0x3c2)]/0x2)+_0x9ea84d;_0x435461['x']=_0x435461[_0x1c099f(0x3c2)]/-0x2+_0x29503e,_0x435461['y']=Math[_0x1c099f(0x1d0)](_0x5ab7db[_0x1c099f(0x391)]/0x2);},Window_SkillType[_0x236293(0xd1)][_0x236293(0x394)]=function(){const _0x372545=_0x236293;return Imported[_0x372545(0x1ac)]&&Window_Command[_0x372545(0xd1)]['isUseModernControls']['call'](this);},Window_SkillType[_0x236293(0xd1)]['makeCommandList']=function(){const _0x304571=_0x236293;if(!this[_0x304571(0x1d8)])return;const _0x5071a1=this[_0x304571(0x1d8)]['skillTypes']();for(const _0xd95add of _0x5071a1){const _0x5d407d=this[_0x304571(0x1f9)](_0xd95add);this[_0x304571(0x24c)](_0x5d407d,_0x304571(0x125),!![],_0xd95add);}},Window_SkillType[_0x236293(0xd1)][_0x236293(0x1f9)]=function(_0xe225ad){const _0xf7e899=_0x236293;let _0x1759e3=$dataSystem[_0xf7e899(0x325)][_0xe225ad];if(_0x1759e3[_0xf7e899(0x356)](/\\I\[(\d+)\]/i))return _0x1759e3;if(this[_0xf7e899(0xb5)]()==='text')return _0x1759e3;const _0x38f4ae=VisuMZ['SkillsStatesCore']['Settings'][_0xf7e899(0x371)],_0x58d8e8=$dataSystem[_0xf7e899(0x368)][_0xf7e899(0x31f)](_0xe225ad),_0x41640d=_0x58d8e8?_0x38f4ae['IconStypeMagic']:_0x38f4ae[_0xf7e899(0x203)];return _0xf7e899(0xa7)['format'](_0x41640d,_0x1759e3);},Window_SkillType[_0x236293(0xd1)][_0x236293(0x23f)]=function(){const _0x4d2dc9=_0x236293;return VisuMZ[_0x4d2dc9(0x37b)][_0x4d2dc9(0x172)][_0x4d2dc9(0x371)][_0x4d2dc9(0x1d7)];},Window_SkillType['prototype']['drawItem']=function(_0x8b4ffd){const _0x351dbe=_0x236293,_0xfa74f8=this[_0x351dbe(0x178)](_0x8b4ffd);if(_0xfa74f8==='iconText')this['drawItemStyleIconText'](_0x8b4ffd);else _0xfa74f8===_0x351dbe(0x3af)?this[_0x351dbe(0xc6)](_0x8b4ffd):Window_Command[_0x351dbe(0xd1)][_0x351dbe(0x1c2)][_0x351dbe(0x115)](this,_0x8b4ffd);},Window_SkillType['prototype']['commandStyle']=function(){const _0x5c491c=_0x236293;return VisuMZ[_0x5c491c(0x37b)][_0x5c491c(0x172)][_0x5c491c(0x371)]['CmdStyle'];},Window_SkillType[_0x236293(0xd1)][_0x236293(0x178)]=function(_0x1300cd){const _0x13aadb=_0x236293;if(_0x1300cd<0x0)return _0x13aadb(0x251);const _0x451d55=this[_0x13aadb(0xb5)]();if(_0x451d55!==_0x13aadb(0x25b))return _0x451d55;else{if(this[_0x13aadb(0xb8)]()>0x0){const _0x528e66=this[_0x13aadb(0x34c)](_0x1300cd);if(_0x528e66[_0x13aadb(0x356)](/\\I\[(\d+)\]/i)){const _0x5b7f73=this[_0x13aadb(0x17f)](_0x1300cd),_0xe91c0=this[_0x13aadb(0x1b6)](_0x528e66)[_0x13aadb(0x3c2)];return _0xe91c0<=_0x5b7f73[_0x13aadb(0x3c2)]?_0x13aadb(0x361):_0x13aadb(0x3af);}}}return'text';},Window_SkillType[_0x236293(0xd1)][_0x236293(0xfc)]=function(_0x375acf){const _0x288e44=_0x236293,_0x3d7347=this[_0x288e44(0x17f)](_0x375acf),_0x1b761e=this[_0x288e44(0x34c)](_0x375acf),_0x58cfb0=this[_0x288e44(0x1b6)](_0x1b761e)[_0x288e44(0x3c2)];this[_0x288e44(0x2fe)](this['isCommandEnabled'](_0x375acf));const _0x554472=this[_0x288e44(0x23f)]();if(_0x554472===_0x288e44(0xf0))this[_0x288e44(0x3a5)](_0x1b761e,_0x3d7347['x']+_0x3d7347['width']-_0x58cfb0,_0x3d7347['y'],_0x58cfb0);else{if(_0x554472==='center'){const _0x365a23=_0x3d7347['x']+Math[_0x288e44(0x1d0)]((_0x3d7347[_0x288e44(0x3c2)]-_0x58cfb0)/0x2);this[_0x288e44(0x3a5)](_0x1b761e,_0x365a23,_0x3d7347['y'],_0x58cfb0);}else this['drawTextEx'](_0x1b761e,_0x3d7347['x'],_0x3d7347['y'],_0x58cfb0);}},Window_SkillType[_0x236293(0xd1)][_0x236293(0xc6)]=function(_0x5634ad){const _0x14743c=_0x236293;this[_0x14743c(0x34c)](_0x5634ad)[_0x14743c(0x356)](/\\I\[(\d+)\]/i);const _0x577371=Number(RegExp['$1'])||0x0,_0xf9c2d9=this[_0x14743c(0x17f)](_0x5634ad),_0x35495f=_0xf9c2d9['x']+Math[_0x14743c(0x1d0)]((_0xf9c2d9[_0x14743c(0x3c2)]-ImageManager[_0x14743c(0x2df)])/0x2),_0x45d493=_0xf9c2d9['y']+(_0xf9c2d9[_0x14743c(0x391)]-ImageManager[_0x14743c(0x1ad)])/0x2;this[_0x14743c(0x29b)](_0x577371,_0x35495f,_0x45d493);},VisuMZ['SkillsStatesCore'][_0x236293(0xf2)]=Window_SkillStatus[_0x236293(0xd1)][_0x236293(0xac)],Window_SkillStatus[_0x236293(0xd1)]['refresh']=function(){const _0x99cd10=_0x236293;VisuMZ[_0x99cd10(0x37b)][_0x99cd10(0xf2)]['call'](this);if(this[_0x99cd10(0x1d8)])this[_0x99cd10(0x1dd)]();},Window_SkillStatus[_0x236293(0xd1)]['drawExtendedSkillsStatesCoreStatus']=function(){const _0x4947de=_0x236293;if(!Imported[_0x4947de(0x1ac)])return;if(!Imported['VisuMZ_1_MainMenuCore'])return;const _0x5c0a25=this[_0x4947de(0x205)]();let _0x509f85=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x2a702d=this[_0x4947de(0x28c)]-_0x509f85-0x2;if(_0x2a702d>=0x12c){const _0x2ab5b7=VisuMZ['CoreEngine'][_0x4947de(0x172)][_0x4947de(0x10b)][_0x4947de(0x316)],_0x51c06d=Math['floor'](_0x2a702d/0x2)-0x18;let _0x19dcd0=_0x509f85,_0x1e80d5=Math['floor']((this['innerHeight']-Math['ceil'](_0x2ab5b7[_0x4947de(0x266)]/0x2)*_0x5c0a25)/0x2),_0x2c0a2a=0x0;for(const _0xafb7fd of _0x2ab5b7){this[_0x4947de(0x1e1)](_0x19dcd0,_0x1e80d5,_0x51c06d,_0xafb7fd),_0x2c0a2a++,_0x2c0a2a%0x2===0x0?(_0x19dcd0=_0x509f85,_0x1e80d5+=_0x5c0a25):_0x19dcd0+=_0x51c06d+0x18;}}this[_0x4947de(0x137)]();},Window_SkillStatus[_0x236293(0xd1)]['drawExtendedParameter']=function(_0x1364d2,_0x3738cf,_0x329929,_0x51094a){const _0xe9ba7d=_0x236293,_0x2f0a7=this[_0xe9ba7d(0x205)]();this['resetFontSettings'](),this[_0xe9ba7d(0x318)](_0x1364d2,_0x3738cf,_0x329929,_0x51094a,!![]),this[_0xe9ba7d(0x14d)](),this[_0xe9ba7d(0xc4)][_0xe9ba7d(0x111)]-=0x8;const _0x31a46f=this[_0xe9ba7d(0x1d8)][_0xe9ba7d(0xfe)](_0x51094a,!![]);this[_0xe9ba7d(0xc4)][_0xe9ba7d(0x246)](_0x31a46f,_0x1364d2,_0x3738cf,_0x329929,_0x2f0a7,_0xe9ba7d(0xf0));},VisuMZ['SkillsStatesCore'][_0x236293(0x291)]=Window_SkillList[_0x236293(0xd1)][_0x236293(0x31f)],Window_SkillList[_0x236293(0xd1)][_0x236293(0x31f)]=function(_0x47b265){const _0x4dbd32=_0x236293;if(this['_stypeId']<=0x0)return![];return this[_0x4dbd32(0x118)](_0x47b265);},VisuMZ[_0x236293(0x37b)][_0x236293(0x360)]=Window_SkillList['prototype'][_0x236293(0x1a5)],Window_SkillList[_0x236293(0xd1)]['maxCols']=function(){const _0x3e595b=_0x236293;return SceneManager[_0x3e595b(0xc2)][_0x3e595b(0xe9)]===Scene_Battle?VisuMZ[_0x3e595b(0x37b)][_0x3e595b(0x360)]['call'](this):VisuMZ[_0x3e595b(0x37b)][_0x3e595b(0x172)][_0x3e595b(0x371)]['ListWindowCols'];},VisuMZ[_0x236293(0x37b)][_0x236293(0x336)]=Window_SkillList[_0x236293(0xd1)]['setActor'],Window_SkillList[_0x236293(0xd1)][_0x236293(0x16b)]=function(_0xbea6){const _0x56e0fb=_0x236293,_0x34b6df=this['_actor']!==_0xbea6;VisuMZ[_0x56e0fb(0x37b)][_0x56e0fb(0x336)][_0x56e0fb(0x115)](this,_0xbea6),_0x34b6df&&(this['_statusWindow']&&this[_0x56e0fb(0x17a)][_0x56e0fb(0xe9)]===Window_ShopStatus&&this[_0x56e0fb(0x17a)][_0x56e0fb(0x3c1)](this[_0x56e0fb(0x12d)](0x0)));},Window_SkillList[_0x236293(0xd1)][_0x236293(0x159)]=function(_0x30a0c9){const _0x5bd81c=_0x236293;if(this[_0x5bd81c(0x170)]===_0x30a0c9)return;if(!_0x30a0c9)return;this['_stypeId']=_0x30a0c9,this[_0x5bd81c(0xac)](),this[_0x5bd81c(0x2a6)](0x0,0x0),this[_0x5bd81c(0x17a)]&&this[_0x5bd81c(0x17a)][_0x5bd81c(0xe9)]===Window_ShopStatus&&this[_0x5bd81c(0x17a)][_0x5bd81c(0x3c1)](this[_0x5bd81c(0x12d)](0x0));},Window_SkillList[_0x236293(0xd1)][_0x236293(0x118)]=function(_0x269c98){const _0x161870=_0x236293;if(!_0x269c98)return VisuMZ[_0x161870(0x37b)]['Window_SkillList_includes'][_0x161870(0x115)](this,_0x269c98);if(!this[_0x161870(0x352)](_0x269c98))return![];if(!this[_0x161870(0x219)](_0x269c98))return![];if(!this[_0x161870(0xfa)](_0x269c98))return![];return!![];},Window_SkillList[_0x236293(0xd1)][_0x236293(0x352)]=function(_0x328107){const _0x4d0527=_0x236293;return DataManager['getSkillTypes'](_0x328107)['includes'](this[_0x4d0527(0x170)]);},Window_SkillList[_0x236293(0xd1)][_0x236293(0x219)]=function(_0x1a8630){const _0x4ef44c=_0x236293;if(!VisuMZ['SkillsStatesCore'][_0x4ef44c(0x187)](this[_0x4ef44c(0x1d8)],_0x1a8630))return![];if(!VisuMZ[_0x4ef44c(0x37b)]['CheckVisibleSwitchNotetags'](this[_0x4ef44c(0x1d8)],_0x1a8630))return![];if(!VisuMZ[_0x4ef44c(0x37b)]['CheckVisibleSkillNotetags'](this[_0x4ef44c(0x1d8)],_0x1a8630))return![];return!![];},VisuMZ[_0x236293(0x37b)][_0x236293(0x187)]=function(_0x5ce8e8,_0x5be216){const _0x3b43ec=_0x236293,_0x1d80b6=_0x5be216[_0x3b43ec(0x195)];if(_0x1d80b6['match'](/<HIDE IN BATTLE>/i)&&$gameParty[_0x3b43ec(0x16e)]())return![];else return _0x1d80b6[_0x3b43ec(0x356)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x3b43ec(0x16e)]()?![]:!![];},VisuMZ['SkillsStatesCore'][_0x236293(0x180)]=function(_0x3e17a2,_0x3a9152){const _0x550850=_0x236293,_0x5e4016=_0x3a9152[_0x550850(0x195)];if(_0x5e4016[_0x550850(0x356)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1ad0fd=JSON[_0x550850(0x1dc)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1370da of _0x1ad0fd){if(!$gameSwitches[_0x550850(0x3b3)](_0x1370da))return![];}return!![];}if(_0x5e4016[_0x550850(0x356)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x26046e=JSON[_0x550850(0x1dc)]('['+RegExp['$1'][_0x550850(0x356)](/\d+/g)+']');for(const _0x4bb6ac of _0x26046e){if(!$gameSwitches['value'](_0x4bb6ac))return![];}return!![];}if(_0x5e4016['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x168461=JSON[_0x550850(0x1dc)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x31045c of _0x168461){if($gameSwitches[_0x550850(0x3b3)](_0x31045c))return!![];}return![];}if(_0x5e4016[_0x550850(0x356)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x20b20b=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x8a30f5 of _0x20b20b){if(!$gameSwitches['value'](_0x8a30f5))return!![];}return![];}if(_0x5e4016[_0x550850(0x356)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x308f60=JSON[_0x550850(0x1dc)]('['+RegExp['$1'][_0x550850(0x356)](/\d+/g)+']');for(const _0x4006ae of _0x308f60){if(!$gameSwitches['value'](_0x4006ae))return!![];}return![];}if(_0x5e4016[_0x550850(0x356)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5baae6=JSON[_0x550850(0x1dc)]('['+RegExp['$1'][_0x550850(0x356)](/\d+/g)+']');for(const _0x4a1166 of _0x5baae6){if($gameSwitches[_0x550850(0x3b3)](_0x4a1166))return![];}return!![];}return!![];},VisuMZ[_0x236293(0x37b)][_0x236293(0x249)]=function(_0x1646b0,_0x40d5cc){const _0x442a92=_0x236293,_0x3cc2c0=_0x40d5cc['note'];if(_0x3cc2c0[_0x442a92(0x356)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16fdba=JSON[_0x442a92(0x1dc)]('['+RegExp['$1'][_0x442a92(0x356)](/\d+/g)+']');for(const _0x1f3fae of _0x16fdba){if(!_0x1646b0['isLearnedSkill'](_0x1f3fae))return![];}return!![];}else{if(_0x3cc2c0[_0x442a92(0x356)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x36db8b=RegExp['$1'][_0x442a92(0x393)](',');for(const _0x385068 of _0x36db8b){const _0x2ded42=DataManager['getSkillIdWithName'](_0x385068);if(!_0x2ded42)continue;if(!_0x1646b0[_0x442a92(0x386)](_0x2ded42))return![];}return!![];}}if(_0x3cc2c0[_0x442a92(0x356)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5a90e7=JSON[_0x442a92(0x1dc)]('['+RegExp['$1'][_0x442a92(0x356)](/\d+/g)+']');for(const _0x3ddb7 of _0x5a90e7){if(!_0x1646b0[_0x442a92(0x386)](_0x3ddb7))return![];}return!![];}else{if(_0x3cc2c0[_0x442a92(0x356)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5a4bd2=RegExp['$1'][_0x442a92(0x393)](',');for(const _0x532d14 of _0x5a4bd2){const _0x3a6f1f=DataManager[_0x442a92(0x128)](_0x532d14);if(!_0x3a6f1f)continue;if(!_0x1646b0[_0x442a92(0x386)](_0x3a6f1f))return![];}return!![];}}if(_0x3cc2c0[_0x442a92(0x356)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1ec231=JSON[_0x442a92(0x1dc)]('['+RegExp['$1'][_0x442a92(0x356)](/\d+/g)+']');for(const _0x2f3e7c of _0x1ec231){if(_0x1646b0['isLearnedSkill'](_0x2f3e7c))return!![];}return![];}else{if(_0x3cc2c0[_0x442a92(0x356)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x30ed0f=RegExp['$1'][_0x442a92(0x393)](',');for(const _0x39f8cc of _0x30ed0f){const _0x3d09cf=DataManager[_0x442a92(0x128)](_0x39f8cc);if(!_0x3d09cf)continue;if(_0x1646b0[_0x442a92(0x386)](_0x3d09cf))return!![];}return![];}}if(_0x3cc2c0[_0x442a92(0x356)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x201656=JSON[_0x442a92(0x1dc)]('['+RegExp['$1'][_0x442a92(0x356)](/\d+/g)+']');for(const _0xac495f of _0x201656){if(!_0x1646b0[_0x442a92(0x386)](_0xac495f))return!![];}return![];}else{if(_0x3cc2c0[_0x442a92(0x356)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x6c4025=RegExp['$1'][_0x442a92(0x393)](',');for(const _0x1dc863 of _0x6c4025){const _0x5be8dd=DataManager[_0x442a92(0x128)](_0x1dc863);if(!_0x5be8dd)continue;if(!_0x1646b0['isLearnedSkill'](_0x5be8dd))return!![];}return![];}}if(_0x3cc2c0[_0x442a92(0x356)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x553516=JSON[_0x442a92(0x1dc)]('['+RegExp['$1'][_0x442a92(0x356)](/\d+/g)+']');for(const _0x1b8a85 of _0x553516){if(!_0x1646b0['isLearnedSkill'](_0x1b8a85))return!![];}return![];}else{if(_0x3cc2c0['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5b1bd3=RegExp['$1'][_0x442a92(0x393)](',');for(const _0x14fdf5 of _0x5b1bd3){const _0x1b82b9=DataManager[_0x442a92(0x128)](_0x14fdf5);if(!_0x1b82b9)continue;if(!_0x1646b0['isLearnedSkill'](_0x1b82b9))return!![];}return![];}}if(_0x3cc2c0[_0x442a92(0x356)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x17bfe6=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x41aef5 of _0x17bfe6){if(_0x1646b0[_0x442a92(0x386)](_0x41aef5))return![];}return!![];}else{if(_0x3cc2c0[_0x442a92(0x356)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x574931=RegExp['$1'][_0x442a92(0x393)](',');for(const _0x19004b of _0x574931){const _0x5beaac=DataManager[_0x442a92(0x128)](_0x19004b);if(!_0x5beaac)continue;if(_0x1646b0['isLearnedSkill'](_0x5beaac))return![];}return!![];}}if(_0x3cc2c0[_0x442a92(0x356)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1aa0b5=JSON[_0x442a92(0x1dc)]('['+RegExp['$1'][_0x442a92(0x356)](/\d+/g)+']');for(const _0x12b6ec of _0x1aa0b5){if(!_0x1646b0['hasSkill'](_0x12b6ec))return![];}return!![];}else{if(_0x3cc2c0[_0x442a92(0x356)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5e14b3=RegExp['$1'][_0x442a92(0x393)](',');for(const _0x4bbeb4 of _0x5e14b3){const _0x2c27ca=DataManager[_0x442a92(0x128)](_0x4bbeb4);if(!_0x2c27ca)continue;if(!_0x1646b0[_0x442a92(0xaf)](_0x2c27ca))return![];}return!![];}}if(_0x3cc2c0[_0x442a92(0x356)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x380671=JSON[_0x442a92(0x1dc)]('['+RegExp['$1'][_0x442a92(0x356)](/\d+/g)+']');for(const _0x26c6f7 of _0x380671){if(!_0x1646b0[_0x442a92(0xaf)](_0x26c6f7))return![];}return!![];}else{if(_0x3cc2c0[_0x442a92(0x356)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x556c4f=RegExp['$1'][_0x442a92(0x393)](',');for(const _0x55d3fa of _0x556c4f){const _0x436f66=DataManager[_0x442a92(0x128)](_0x55d3fa);if(!_0x436f66)continue;if(!_0x1646b0[_0x442a92(0xaf)](_0x436f66))return![];}return!![];}}if(_0x3cc2c0[_0x442a92(0x356)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x39cec6=JSON[_0x442a92(0x1dc)]('['+RegExp['$1'][_0x442a92(0x356)](/\d+/g)+']');for(const _0x42cc5b of _0x39cec6){if(_0x1646b0[_0x442a92(0xaf)](_0x42cc5b))return!![];}return![];}else{if(_0x3cc2c0[_0x442a92(0x356)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x267a52=RegExp['$1'][_0x442a92(0x393)](',');for(const _0x41db95 of _0x267a52){const _0x5c600c=DataManager[_0x442a92(0x128)](_0x41db95);if(!_0x5c600c)continue;if(_0x1646b0['hasSkill'](_0x5c600c))return!![];}return![];}}if(_0x3cc2c0[_0x442a92(0x356)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2a9dbf=JSON[_0x442a92(0x1dc)]('['+RegExp['$1'][_0x442a92(0x356)](/\d+/g)+']');for(const _0x17ea05 of _0x2a9dbf){if(!_0x1646b0[_0x442a92(0xaf)](_0x17ea05))return!![];}return![];}else{if(_0x3cc2c0[_0x442a92(0x356)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x394ade=RegExp['$1'][_0x442a92(0x393)](',');for(const _0x43b627 of _0x394ade){const _0x37c2da=DataManager['getSkillIdWithName'](_0x43b627);if(!_0x37c2da)continue;if(!_0x1646b0[_0x442a92(0xaf)](_0x37c2da))return!![];}return![];}}if(_0x3cc2c0[_0x442a92(0x356)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x8ca245=JSON['parse']('['+RegExp['$1'][_0x442a92(0x356)](/\d+/g)+']');for(const _0x4ac3fb of _0x8ca245){if(!_0x1646b0[_0x442a92(0xaf)](_0x4ac3fb))return!![];}return![];}else{if(_0x3cc2c0[_0x442a92(0x356)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x59e531=RegExp['$1']['split'](',');for(const _0x560320 of _0x59e531){const _0x411a39=DataManager['getSkillIdWithName'](_0x560320);if(!_0x411a39)continue;if(!_0x1646b0[_0x442a92(0xaf)](_0x411a39))return!![];}return![];}}if(_0x3cc2c0[_0x442a92(0x356)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5efa06=JSON[_0x442a92(0x1dc)]('['+RegExp['$1'][_0x442a92(0x356)](/\d+/g)+']');for(const _0x10328d of _0x5efa06){if(_0x1646b0['hasSkill'](_0x10328d))return![];}return!![];}else{if(_0x3cc2c0['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x439127=RegExp['$1'][_0x442a92(0x393)](',');for(const _0x2d1de9 of _0x439127){const _0x1b00d8=DataManager['getSkillIdWithName'](_0x2d1de9);if(!_0x1b00d8)continue;if(_0x1646b0[_0x442a92(0xaf)](_0x1b00d8))return![];}return!![];}}return!![];},Window_SkillList[_0x236293(0xd1)][_0x236293(0xfa)]=function(_0x1044f1){const _0x5e0300=_0x236293,_0x43ec25=_0x1044f1['note'],_0x176b9c=VisuMZ[_0x5e0300(0x37b)][_0x5e0300(0x2a4)];return _0x176b9c[_0x1044f1['id']]?_0x176b9c[_0x1044f1['id']]['call'](this,_0x1044f1):!![];},VisuMZ[_0x236293(0x37b)][_0x236293(0x255)]=Window_SkillList[_0x236293(0xd1)][_0x236293(0x13b)],Window_SkillList['prototype'][_0x236293(0x13b)]=function(){const _0x4e6d1c=_0x236293;VisuMZ[_0x4e6d1c(0x37b)]['Window_SkillList_makeItemList'][_0x4e6d1c(0x115)](this),this[_0x4e6d1c(0x34f)]()&&this['sortSkillList'](),this[_0x4e6d1c(0xbf)]()&&this[_0x4e6d1c(0x19b)]();},Window_SkillList[_0x236293(0xd1)][_0x236293(0x34f)]=function(){return!![];},Window_SkillList[_0x236293(0xd1)][_0x236293(0x36c)]=function(){const _0x914283=_0x236293,_0x2eecad=VisuMZ[_0x914283(0x37b)][_0x914283(0x172)]['Skills'][_0x914283(0xf5)]||[];return _0x2eecad&&_0x2eecad[_0x914283(0x31f)](this['_stypeId'])?this[_0x914283(0xca)][_0x914283(0x1c4)]((_0x2592f1,_0x31ddcb)=>{const _0x16f95d=_0x914283;if(!!_0x2592f1&&!!_0x31ddcb)return _0x2592f1[_0x16f95d(0x1eb)][_0x16f95d(0x27a)](_0x31ddcb['name']);return 0x0;}):VisuMZ[_0x914283(0x37b)][_0x914283(0x35a)](this[_0x914283(0xca)]),this[_0x914283(0xca)];},VisuMZ[_0x236293(0x37b)][_0x236293(0x35a)]=function(_0x3b4753){const _0x531127=_0x236293;return _0x3b4753[_0x531127(0x1c4)]((_0x5019d1,_0x51409f)=>{const _0x539634=_0x531127;if(!!_0x5019d1&&!!_0x51409f){if(_0x5019d1[_0x539634(0x39f)]===undefined)VisuMZ[_0x539634(0x37b)]['Parse_Notetags_Skill_Sorting'](_0x5019d1);if(_0x51409f[_0x539634(0x39f)]===undefined)VisuMZ['SkillsStatesCore'][_0x539634(0xbc)](_0x51409f);const _0x1cfb3d=_0x5019d1[_0x539634(0x39f)],_0x1e2cf8=_0x51409f[_0x539634(0x39f)];if(_0x1cfb3d!==_0x1e2cf8)return _0x1e2cf8-_0x1cfb3d;return _0x5019d1['id']-_0x51409f['id'];}return 0x0;}),_0x3b4753;},VisuMZ[_0x236293(0x37b)][_0x236293(0x304)]=function(_0x4fde08){const _0x4bbb0e=_0x236293;return _0x4fde08[_0x4bbb0e(0x1c4)]((_0x30e8ad,_0x58d809)=>{const _0x4d25a1=_0x4bbb0e,_0x2344ae=$dataSkills[_0x30e8ad],_0x410521=$dataSkills[_0x58d809];if(!!_0x2344ae&&!!_0x410521){if(_0x2344ae[_0x4d25a1(0x39f)]===undefined)VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Sorting'](_0x2344ae);if(_0x410521[_0x4d25a1(0x39f)]===undefined)VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Sorting'](_0x410521);const _0x234333=_0x2344ae[_0x4d25a1(0x39f)],_0x121d0f=_0x410521[_0x4d25a1(0x39f)];if(_0x234333!==_0x121d0f)return _0x121d0f-_0x234333;return _0x30e8ad-_0x58d809;}return 0x0;}),_0x4fde08;},Window_SkillList[_0x236293(0xd1)][_0x236293(0xbf)]=function(){const _0x230cf6=_0x236293;if(!this[_0x230cf6(0x1d8)])return![];if([_0x230cf6(0x1d9),_0x230cf6(0x1e4),_0x230cf6(0x397)][_0x230cf6(0x31f)](this[_0x230cf6(0x170)]))return![];return!![];},Window_SkillList['prototype'][_0x236293(0x19b)]=function(){const _0x3314fb=_0x236293,_0xd81e94=this[_0x3314fb(0x1d8)][_0x3314fb(0x241)]();for(const _0x13947f of _0xd81e94){const _0x31e5b3=DataManager[_0x3314fb(0x382)](_0x13947f);for(const _0x1b27fa in _0x31e5b3){const _0x100183=$dataSkills[Number(_0x1b27fa)]||null,_0x33e7de=$dataSkills[Number(_0x31e5b3[_0x1b27fa])]||null;while(this[_0x3314fb(0xca)][_0x3314fb(0x31f)](_0x100183)){const _0x381a9a=this[_0x3314fb(0xca)][_0x3314fb(0x1c3)](_0x100183);this[_0x3314fb(0xca)][_0x381a9a]=_0x33e7de;}}}},VisuMZ[_0x236293(0x37b)][_0x236293(0x35e)]=Window_SkillList['prototype'][_0x236293(0x1c2)],Window_SkillList['prototype']['drawItem']=function(_0x2d6b53){const _0x11f4c0=_0x236293,_0x4aa82c=this[_0x11f4c0(0x12d)](_0x2d6b53),_0x13aeb5=_0x4aa82c?_0x4aa82c[_0x11f4c0(0x1eb)]:'';if(_0x4aa82c)this[_0x11f4c0(0x297)](_0x4aa82c);DataManager[_0x11f4c0(0x32c)](_0x4aa82c)&&this[_0x11f4c0(0x1d8)]&&this[_0x11f4c0(0x1d8)][_0x11f4c0(0x32d)](_0x4aa82c)&&(this['_toggleSkillColor']=!![]);VisuMZ[_0x11f4c0(0x37b)]['Window_SkillList_drawItem']['call'](this,_0x2d6b53),this[_0x11f4c0(0x3ac)]=undefined;if(_0x4aa82c)_0x4aa82c[_0x11f4c0(0x1eb)]=_0x13aeb5;},Window_SkillList[_0x236293(0xd1)][_0x236293(0x297)]=function(_0x415125){const _0x3998bb=_0x236293;if(_0x415125&&_0x415125[_0x3998bb(0x195)][_0x3998bb(0x356)](/<LIST NAME:[ ](.*)>/i)){_0x415125[_0x3998bb(0x1eb)]=String(RegExp['$1'])[_0x3998bb(0x1ba)]();for(;;){if(_0x415125[_0x3998bb(0x1eb)][_0x3998bb(0x356)](/\\V\[(\d+)\]/gi))_0x415125[_0x3998bb(0x1eb)]=_0x415125[_0x3998bb(0x1eb)][_0x3998bb(0x1df)](/\\V\[(\d+)\]/gi,(_0x2a20c9,_0x2f1330)=>$gameVariables[_0x3998bb(0x3b3)](parseInt(_0x2f1330)));else break;}}},Window_SkillList[_0x236293(0xd1)]['drawSkillCost']=function(_0x4fc5c0,_0x4060f4,_0x5930fc,_0x261e0c){const _0xc40e08=_0x236293;Window_Base[_0xc40e08(0xd1)][_0xc40e08(0xfb)][_0xc40e08(0x115)](this,this[_0xc40e08(0x1d8)],_0x4fc5c0,_0x4060f4,_0x5930fc,_0x261e0c);},Window_SkillList['prototype'][_0x236293(0x136)]=function(_0x506935){const _0x213be1=_0x236293;this[_0x213be1(0x17a)]=_0x506935,this[_0x213be1(0x1a9)]();},VisuMZ[_0x236293(0x37b)][_0x236293(0x2bf)]=Window_SkillList['prototype'][_0x236293(0x1b4)],Window_SkillList[_0x236293(0xd1)][_0x236293(0x1b4)]=function(){const _0x3db184=_0x236293;VisuMZ[_0x3db184(0x37b)][_0x3db184(0x2bf)][_0x3db184(0x115)](this),this[_0x3db184(0x17a)]&&this[_0x3db184(0x17a)][_0x3db184(0xe9)]===Window_ShopStatus&&this['_statusWindow'][_0x3db184(0x3c1)](this[_0x3db184(0x191)]());};