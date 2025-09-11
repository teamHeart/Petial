//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.87;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.87] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * ---
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
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
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
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
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
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
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
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
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
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
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
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
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
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
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
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
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
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
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
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
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
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
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
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
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
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
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x4e56c8=_0x521a;(function(_0x1b2f8d,_0x86290e){const _0x40b052=_0x521a,_0x5d239d=_0x1b2f8d();while(!![]){try{const _0x3839a0=-parseInt(_0x40b052(0x2f1))/0x1*(parseInt(_0x40b052(0x82c))/0x2)+parseInt(_0x40b052(0x5a5))/0x3*(-parseInt(_0x40b052(0x8b))/0x4)+parseInt(_0x40b052(0x183))/0x5+-parseInt(_0x40b052(0x5d2))/0x6+-parseInt(_0x40b052(0x7d0))/0x7+-parseInt(_0x40b052(0x3ec))/0x8+parseInt(_0x40b052(0x697))/0x9*(parseInt(_0x40b052(0x62b))/0xa);if(_0x3839a0===_0x86290e)break;else _0x5d239d['push'](_0x5d239d['shift']());}catch(_0x17a13c){_0x5d239d['push'](_0x5d239d['shift']());}}}(_0x1305,0x53f49));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4e56c8(0x842)](function(_0x34a1f6){const _0x2137fe=_0x4e56c8;return _0x34a1f6[_0x2137fe(0x17c)]&&_0x34a1f6[_0x2137fe(0x353)][_0x2137fe(0xd3)]('['+label+']');})[0x0];VisuMZ[label][_0x4e56c8(0x5ce)]=VisuMZ[label][_0x4e56c8(0x5ce)]||{},VisuMZ['ConvertParams']=function(_0x1eecd6,_0x299f0e){const _0x989cb1=_0x4e56c8;for(const _0x502f7f in _0x299f0e){if(_0x502f7f[_0x989cb1(0x60a)](/(.*):(.*)/i)){const _0x3abc17=String(RegExp['$1']),_0x461c5f=String(RegExp['$2'])[_0x989cb1(0x25a)]()[_0x989cb1(0x519)]();let _0x2389d5,_0x3c49ae,_0x2d3867;switch(_0x461c5f){case'NUM':_0x2389d5=_0x299f0e[_0x502f7f]!==''?Number(_0x299f0e[_0x502f7f]):0x0;break;case _0x989cb1(0x1a6):_0x3c49ae=_0x299f0e[_0x502f7f]!==''?JSON[_0x989cb1(0x7c8)](_0x299f0e[_0x502f7f]):[],_0x2389d5=_0x3c49ae['map'](_0x29fc5=>Number(_0x29fc5));break;case _0x989cb1(0x429):_0x2389d5=_0x299f0e[_0x502f7f]!==''?eval(_0x299f0e[_0x502f7f]):null;break;case _0x989cb1(0x3be):_0x3c49ae=_0x299f0e[_0x502f7f]!==''?JSON[_0x989cb1(0x7c8)](_0x299f0e[_0x502f7f]):[],_0x2389d5=_0x3c49ae[_0x989cb1(0x90)](_0xd594e=>eval(_0xd594e));break;case _0x989cb1(0x6b0):_0x2389d5=_0x299f0e[_0x502f7f]!==''?JSON['parse'](_0x299f0e[_0x502f7f]):'';break;case _0x989cb1(0x3d6):_0x3c49ae=_0x299f0e[_0x502f7f]!==''?JSON[_0x989cb1(0x7c8)](_0x299f0e[_0x502f7f]):[],_0x2389d5=_0x3c49ae[_0x989cb1(0x90)](_0x433908=>JSON[_0x989cb1(0x7c8)](_0x433908));break;case _0x989cb1(0x5ca):_0x2389d5=_0x299f0e[_0x502f7f]!==''?new Function(JSON['parse'](_0x299f0e[_0x502f7f])):new Function('return\x200');break;case'ARRAYFUNC':_0x3c49ae=_0x299f0e[_0x502f7f]!==''?JSON['parse'](_0x299f0e[_0x502f7f]):[],_0x2389d5=_0x3c49ae['map'](_0x4f5089=>new Function(JSON[_0x989cb1(0x7c8)](_0x4f5089)));break;case _0x989cb1(0x40f):_0x2389d5=_0x299f0e[_0x502f7f]!==''?String(_0x299f0e[_0x502f7f]):'';break;case _0x989cb1(0x2ba):_0x3c49ae=_0x299f0e[_0x502f7f]!==''?JSON['parse'](_0x299f0e[_0x502f7f]):[],_0x2389d5=_0x3c49ae[_0x989cb1(0x90)](_0x22d686=>String(_0x22d686));break;case'STRUCT':_0x2d3867=_0x299f0e[_0x502f7f]!==''?JSON[_0x989cb1(0x7c8)](_0x299f0e[_0x502f7f]):{},_0x1eecd6[_0x3abc17]={},VisuMZ[_0x989cb1(0x177)](_0x1eecd6[_0x3abc17],_0x2d3867);continue;case'ARRAYSTRUCT':_0x3c49ae=_0x299f0e[_0x502f7f]!==''?JSON[_0x989cb1(0x7c8)](_0x299f0e[_0x502f7f]):[],_0x2389d5=_0x3c49ae['map'](_0x2f48b2=>VisuMZ['ConvertParams']({},JSON[_0x989cb1(0x7c8)](_0x2f48b2)));break;default:continue;}_0x1eecd6[_0x3abc17]=_0x2389d5;}}return _0x1eecd6;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x50e)]=SceneManager[_0x4e56c8(0x351)],SceneManager[_0x4e56c8(0x351)]=function(){const _0x10ad8e=_0x4e56c8;VisuMZ['CoreEngine']['SceneManager_exit']['call'](this);if(Utils[_0x10ad8e(0x5c1)]>='1.4.4'){if(typeof nw===_0x10ad8e(0x48d))nw['App'][_0x10ad8e(0x5d6)]();}},(_0x3de3f1=>{const _0x2a48be=_0x4e56c8,_0x343435=_0x3de3f1[_0x2a48be(0x9f)];for(const _0x3b8013 of dependencies){if(!Imported[_0x3b8013]){alert(_0x2a48be(0x40d)['format'](_0x343435,_0x3b8013)),SceneManager[_0x2a48be(0x351)]();break;}}const _0x5d3394=_0x3de3f1[_0x2a48be(0x353)];if(_0x5d3394['match'](/\[Version[ ](.*?)\]/i)){const _0x52c3f7=Number(RegExp['$1']);_0x52c3f7!==VisuMZ[label][_0x2a48be(0xf1)]&&(alert(_0x2a48be(0x2cc)[_0x2a48be(0x6d4)](_0x343435,_0x52c3f7)),SceneManager[_0x2a48be(0x351)]());}if(_0x5d3394[_0x2a48be(0x60a)](/\[Tier[ ](\d+)\]/i)){const _0x4a282e=Number(RegExp['$1']);_0x4a282e<tier?(alert(_0x2a48be(0x77)[_0x2a48be(0x6d4)](_0x343435,_0x4a282e,tier)),SceneManager[_0x2a48be(0x351)]()):tier=Math['max'](_0x4a282e,tier);}VisuMZ[_0x2a48be(0x177)](VisuMZ[label]['Settings'],_0x3de3f1[_0x2a48be(0xd9)]);})(pluginData),((()=>{const _0x59bfa2=_0x4e56c8;if(VisuMZ[_0x59bfa2(0x5b8)]['Settings'][_0x59bfa2(0x2c9)][_0x59bfa2(0x444)]??!![])for(const _0x5a59d6 in $plugins){const _0x56cc21=$plugins[_0x5a59d6];_0x56cc21[_0x59bfa2(0x9f)][_0x59bfa2(0x60a)](/(.*)\/(.*)/i)&&(_0x56cc21['name']=String(RegExp['$2'][_0x59bfa2(0x519)]()));}})()),PluginManager[_0x4e56c8(0x195)](pluginData['name'],_0x4e56c8(0x516),_0xe658f0=>{const _0x505540=_0x4e56c8;if(!SceneManager[_0x505540(0x7f6)])return;if(!SceneManager[_0x505540(0x7f6)][_0x505540(0x294)])return;VisuMZ[_0x505540(0x177)](_0xe658f0,_0xe658f0);const _0x5d682f=Math[_0x505540(0x263)](_0xe658f0['pointX']),_0x1da533=Math[_0x505540(0x263)](_0xe658f0['pointY']);$gameTemp[_0x505540(0x462)](_0x5d682f,_0x1da533,_0xe658f0[_0x505540(0x6ee)],_0xe658f0[_0x505540(0x4b0)],_0xe658f0[_0x505540(0x132)]);}),PluginManager[_0x4e56c8(0x195)](pluginData['name'],_0x4e56c8(0x2d9),_0x402611=>{const _0xc1a7b=_0x4e56c8;VisuMZ[_0xc1a7b(0x177)](_0x402611,_0x402611);const _0x5993b3=Math[_0xc1a7b(0x263)](_0x402611[_0xc1a7b(0x384)])[_0xc1a7b(0x2d2)](0x0,0x64),_0x3f1aed=AudioManager['_currentBgm'];_0x3f1aed&&(_0x3f1aed['volume']=_0x5993b3,_0x3f1aed[_0xc1a7b(0x229)]=AudioManager[_0xc1a7b(0x7ff)]['seek'](),AudioManager['updateBgmParameters'](_0x3f1aed),AudioManager[_0xc1a7b(0x39b)](_0x3f1aed,_0x3f1aed['pos']),AudioManager['_bgmBuffer'][_0xc1a7b(0x5c2)](_0x3f1aed[_0xc1a7b(0x229)]));}),PluginManager['registerCommand'](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x50a),_0x42b3ec=>{const _0x225572=_0x4e56c8;VisuMZ[_0x225572(0x177)](_0x42b3ec,_0x42b3ec);const _0x4c28b1=Math[_0x225572(0x263)](_0x42b3ec[_0x225572(0x62d)])['clamp'](0x32,0x96),_0xc4738b=AudioManager[_0x225572(0x6d8)];_0xc4738b&&(_0xc4738b[_0x225572(0x62d)]=_0x4c28b1,_0xc4738b[_0x225572(0x229)]=AudioManager[_0x225572(0x7ff)][_0x225572(0x196)](),AudioManager[_0x225572(0x7af)](_0xc4738b),AudioManager[_0x225572(0x39b)](_0xc4738b,_0xc4738b[_0x225572(0x229)]),AudioManager[_0x225572(0x7ff)][_0x225572(0x5c2)](_0xc4738b[_0x225572(0x229)]));}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x684),_0x3eec34=>{const _0xeeb510=_0x4e56c8;VisuMZ[_0xeeb510(0x177)](_0x3eec34,_0x3eec34);const _0x182699=Math[_0xeeb510(0x263)](_0x3eec34['pan'])[_0xeeb510(0x2d2)](-0x64,0x64),_0x497470=AudioManager['_currentBgm'];_0x497470&&(_0x497470[_0xeeb510(0x7e8)]=_0x182699,_0x497470['pos']=AudioManager['_bgmBuffer']['seek'](),AudioManager[_0xeeb510(0x7af)](_0x497470),AudioManager[_0xeeb510(0x39b)](_0x497470,_0x497470[_0xeeb510(0x229)]),AudioManager[_0xeeb510(0x7ff)][_0xeeb510(0x5c2)](_0x497470[_0xeeb510(0x229)]));}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x75),_0x164766=>{const _0x5462f8=_0x4e56c8;VisuMZ[_0x5462f8(0x177)](_0x164766,_0x164766);const _0x4c5f8f=Math['round'](_0x164766[_0x5462f8(0x384)])['clamp'](0x0,0x64),_0x705058=AudioManager[_0x5462f8(0x5e0)];_0x705058&&(_0x705058[_0x5462f8(0x384)]=_0x4c5f8f,_0x705058[_0x5462f8(0x229)]=AudioManager[_0x5462f8(0x41f)]['seek'](),AudioManager[_0x5462f8(0x816)](_0x705058),AudioManager[_0x5462f8(0x6ba)](_0x705058,_0x705058[_0x5462f8(0x229)]),AudioManager[_0x5462f8(0x41f)][_0x5462f8(0x5c2)](_0x705058[_0x5462f8(0x229)]));}),PluginManager['registerCommand'](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x1e8),_0x308569=>{const _0x481be9=_0x4e56c8;VisuMZ[_0x481be9(0x177)](_0x308569,_0x308569);const _0x4fd842=Math[_0x481be9(0x263)](_0x308569[_0x481be9(0x62d)])[_0x481be9(0x2d2)](0x32,0x96),_0x3f618d=AudioManager[_0x481be9(0x5e0)];_0x3f618d&&(_0x3f618d[_0x481be9(0x62d)]=_0x4fd842,_0x3f618d[_0x481be9(0x229)]=AudioManager[_0x481be9(0x41f)]['seek'](),AudioManager[_0x481be9(0x816)](_0x3f618d),AudioManager[_0x481be9(0x6ba)](_0x3f618d,_0x3f618d[_0x481be9(0x229)]),AudioManager['_bgsBuffer'][_0x481be9(0x5c2)](_0x3f618d[_0x481be9(0x229)]));}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x810),_0x5ac56e=>{const _0x2dbed8=_0x4e56c8;VisuMZ[_0x2dbed8(0x177)](_0x5ac56e,_0x5ac56e);const _0x1f8b79=Math[_0x2dbed8(0x263)](_0x5ac56e[_0x2dbed8(0x7e8)])[_0x2dbed8(0x2d2)](-0x64,0x64),_0x18fd64=AudioManager[_0x2dbed8(0x5e0)];_0x18fd64&&(_0x18fd64[_0x2dbed8(0x7e8)]=_0x1f8b79,_0x18fd64['pos']=AudioManager[_0x2dbed8(0x41f)]['seek'](),AudioManager[_0x2dbed8(0x816)](_0x18fd64),AudioManager[_0x2dbed8(0x6ba)](_0x18fd64,_0x18fd64[_0x2dbed8(0x229)]),AudioManager['_bgsBuffer'][_0x2dbed8(0x5c2)](_0x18fd64['pos']));}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x15f),_0x41e028=>{const _0xc0240b=_0x4e56c8;if(!$gameTemp[_0xc0240b(0x6c9)]())return;const _0x3cf2f2=Input[_0xc0240b(0x7a6)]();console[_0xc0240b(0x2d8)](_0x3cf2f2);}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x19d),_0x20d6cc=>{const _0x37cc46=_0x4e56c8;if(!$gameTemp[_0x37cc46(0x6c9)]())return;if(!Utils[_0x37cc46(0x7c9)]())return;SceneManager[_0x37cc46(0x7f6)][_0x37cc46(0x62f)]=![],VisuMZ[_0x37cc46(0x5b8)]['ExportStrFromAllMaps']();}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x70),_0x1de4e0=>{const _0x46508d=_0x4e56c8;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;SceneManager['_scene'][_0x46508d(0x62f)]=![],VisuMZ[_0x46508d(0x5b8)][_0x46508d(0x273)]();}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],'ExportCurMapText',_0xf6d42=>{const _0x45133e=_0x4e56c8;if(!$gameTemp[_0x45133e(0x6c9)]())return;if(!Utils[_0x45133e(0x7c9)]())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ[_0x45133e(0x177)](_0xf6d42,_0xf6d42);const _0x34fdd8=_0x45133e(0x288)[_0x45133e(0x6d4)]($gameMap[_0x45133e(0x1bb)]()[_0x45133e(0x76f)](0x3)),_0x3532bf=VisuMZ['CoreEngine'][_0x45133e(0x500)]($gameMap[_0x45133e(0x1bb)]());VisuMZ[_0x45133e(0x5b8)][_0x45133e(0x74e)](_0x3532bf,_0x34fdd8,!![]);}),PluginManager[_0x4e56c8(0x195)](pluginData['name'],_0x4e56c8(0x648),_0x3f18ec=>{const _0x4051e4=_0x4e56c8;if(!$gameTemp[_0x4051e4(0x6c9)]())return;if(!Utils['isNwjs']())return;if(!$gameParty[_0x4051e4(0x831)]())return;VisuMZ[_0x4051e4(0x177)](_0x3f18ec,_0x3f18ec);const _0x4771bc=_0x4051e4(0x2a2)[_0x4051e4(0x6d4)]($gameTroop[_0x4051e4(0x7ac)]['padZero'](0x4)),_0x258712=VisuMZ[_0x4051e4(0x5b8)][_0x4051e4(0x171)]($gameTroop[_0x4051e4(0x7ac)]);VisuMZ[_0x4051e4(0x5b8)][_0x4051e4(0x74e)](_0x258712,_0x4771bc,!![]);}),VisuMZ[_0x4e56c8(0x5b8)]['ExportString']=function(_0x5c463b,_0x350a0d,_0x567e26){const _0x2fe85a=_0x4e56c8,_0x51a7cf=require('fs');let _0x27311e=_0x2fe85a(0x35c)[_0x2fe85a(0x6d4)](_0x350a0d||'0');_0x51a7cf['writeFile'](_0x27311e,_0x5c463b,_0x3198be=>{const _0x1588ac=_0x2fe85a;if(_0x3198be)throw err;else _0x567e26&&alert(_0x1588ac(0x285)['format'](_0x27311e));});},VisuMZ['CoreEngine'][_0x4e56c8(0x199)]=function(){const _0x6ba383=_0x4e56c8,_0x35ae7e=[];for(const _0x18711c of $dataMapInfos){if(!_0x18711c)continue;_0x35ae7e[_0x6ba383(0x5c9)](_0x18711c['id']);}const _0xcb2537=_0x35ae7e[_0x6ba383(0x323)]*0x64+Math[_0x6ba383(0x184)](0x64);alert(_0x6ba383(0x765)[_0x6ba383(0x6d4)](_0xcb2537)),this[_0x6ba383(0x4e0)]=[],this['_currentMap']=$dataMap;for(const _0x15e7be of _0x35ae7e){VisuMZ[_0x6ba383(0x5b8)][_0x6ba383(0x44f)](_0x15e7be);}setTimeout(VisuMZ['CoreEngine'][_0x6ba383(0x598)]['bind'](this),_0xcb2537);},VisuMZ[_0x4e56c8(0x5b8)]['loadMapData']=function(_0xfe8059){const _0x4e0d2f=_0x4e56c8,_0x176b9a='Map%1.json'[_0x4e0d2f(0x6d4)](_0xfe8059['padZero'](0x3)),_0x52dd03=new XMLHttpRequest(),_0x39b052='data/'+_0x176b9a;_0x52dd03[_0x4e0d2f(0x83f)]('GET',_0x39b052),_0x52dd03[_0x4e0d2f(0x518)](_0x4e0d2f(0x1a3)),_0x52dd03[_0x4e0d2f(0x47a)]=()=>this[_0x4e0d2f(0x806)](_0x52dd03,_0xfe8059,_0x176b9a,_0x39b052),_0x52dd03[_0x4e0d2f(0x1e6)]=()=>DataManager[_0x4e0d2f(0x651)](_0x4e0d2f(0x1b2),_0x176b9a,_0x39b052),_0x52dd03['send']();},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x806)]=function(_0xc4ab1b,_0x1e57f1,_0x461777,_0x2a561b){const _0x229ec6=_0x4e56c8;$dataMap=JSON['parse'](_0xc4ab1b[_0x229ec6(0x5b4)]),DataManager[_0x229ec6(0x746)]($dataMap),this['_storedMapText'][_0x1e57f1]=VisuMZ[_0x229ec6(0x5b8)][_0x229ec6(0x500)](_0x1e57f1),$dataMap=this[_0x229ec6(0x32e)];},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x598)]=function(){const _0x2b3016=_0x4e56c8,_0x3cafdd=_0x2b3016(0x640);this[_0x2b3016(0x4e0)]['remove'](undefined)[_0x2b3016(0x2e8)]('')[_0x2b3016(0x2e8)](null);const _0xf32c1c=this[_0x2b3016(0x4e0)][_0x2b3016(0x512)](_0x2b3016(0x79))['trim']();VisuMZ[_0x2b3016(0x5b8)][_0x2b3016(0x74e)](_0xf32c1c,_0x3cafdd,!![]),SceneManager[_0x2b3016(0x7f6)][_0x2b3016(0x62f)]=!![];},VisuMZ['CoreEngine'][_0x4e56c8(0x500)]=function(_0xafe663){const _0x2bc949=_0x4e56c8;if(!$dataMap)return'';let _0x4408c3='█'[_0x2bc949(0xd7)](0x46)+'\x0a\x0a',_0x4a9d5e='═'[_0x2bc949(0xd7)](0x46)+'\x0a\x0a',_0x3d06bf='';this[_0x2bc949(0x80e)]=0x0;for(const _0x8c31d5 of $dataMap[_0x2bc949(0x318)]){if(!_0x8c31d5)continue;let _0x3e8c29=_0x8c31d5['id'],_0x12458a=_0x8c31d5[_0x2bc949(0x9f)],_0x14a4c4=_0x8c31d5[_0x2bc949(0x620)];for(const _0x42b8ee of _0x14a4c4){const _0x157038=_0x14a4c4[_0x2bc949(0x48e)](_0x42b8ee)+0x1;let _0x47d1f1=_0x4a9d5e+_0x2bc949(0x413),_0x154606=VisuMZ['CoreEngine']['ExtractStrFromList'](_0x42b8ee[_0x2bc949(0x144)]);if(_0x154606['length']>0x0){if(_0x3d06bf[_0x2bc949(0x323)]>0x0)_0x3d06bf+=_0x4a9d5e+_0x2bc949(0x79);else{const _0xe3f61c=$dataMapInfos[_0xafe663][_0x2bc949(0x9f)];_0x3d06bf+=_0x4408c3+_0x2bc949(0x673)['format'](_0xafe663,_0xe3f61c||'Unnamed')+_0x4408c3;}_0x3d06bf+=_0x47d1f1['format'](_0x3e8c29,_0x12458a,_0x157038,_0x154606);}}}return _0x3d06bf[_0x2bc949(0x323)]>0x0&&(_0x3d06bf+=_0x4a9d5e),_0x3d06bf;},VisuMZ['CoreEngine'][_0x4e56c8(0x273)]=function(){const _0x12a10c=_0x4e56c8,_0xc6f6af=$dataTroops['length']*0xa+Math[_0x12a10c(0x184)](0xa);alert(_0x12a10c(0x1ca)[_0x12a10c(0x6d4)](_0xc6f6af));const _0xecb5eb=[];for(const _0xb0c0e1 of $dataTroops){if(!_0xb0c0e1)continue;const _0x8d13ea=_0xb0c0e1['id'];_0xecb5eb[_0x8d13ea]=VisuMZ[_0x12a10c(0x5b8)][_0x12a10c(0x171)](_0x8d13ea);}setTimeout(VisuMZ[_0x12a10c(0x5b8)][_0x12a10c(0x761)][_0x12a10c(0x223)](this,_0xecb5eb),_0xc6f6af);},VisuMZ['CoreEngine']['ExtractStrFromTroop']=function(_0x3dc192){const _0xb7fd6e=_0x4e56c8;if(!$dataTroops[_0x3dc192])return'';let _0x639092='█'[_0xb7fd6e(0xd7)](0x46)+'\x0a\x0a',_0x38e07d='═'[_0xb7fd6e(0xd7)](0x46)+'\x0a\x0a',_0x546f66='';this['_commonEventLayers']=0x0;const _0x3c9b68=$dataTroops[_0x3dc192];let _0x163b16=_0x3c9b68[_0xb7fd6e(0x620)];for(const _0x3af970 of _0x163b16){const _0x29675a=_0x163b16[_0xb7fd6e(0x48e)](_0x3af970)+0x1;let _0xd4dfe8=_0x38e07d+_0xb7fd6e(0x55a),_0x33da8a=VisuMZ['CoreEngine'][_0xb7fd6e(0x3e2)](_0x3af970[_0xb7fd6e(0x144)]);_0x33da8a[_0xb7fd6e(0x323)]>0x0&&(_0x546f66[_0xb7fd6e(0x323)]>0x0?_0x546f66+=_0x38e07d+_0xb7fd6e(0x79):_0x546f66+=_0x639092+_0xb7fd6e(0x481)[_0xb7fd6e(0x6d4)](_0x3dc192,_0x3c9b68[_0xb7fd6e(0x9f)]||_0xb7fd6e(0x7a9))+_0x639092,_0x546f66+=_0xd4dfe8[_0xb7fd6e(0x6d4)](_0x29675a,_0x33da8a));}return _0x546f66[_0xb7fd6e(0x323)]>0x0&&(_0x546f66+=_0x38e07d),_0x546f66;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x761)]=function(_0x46f386){const _0x5c714a=_0x4e56c8,_0x5e49df=_0x5c714a(0x53c);_0x46f386['remove'](undefined)['remove']('')['remove'](null);const _0x398a3c=_0x46f386['join'](_0x5c714a(0x79))[_0x5c714a(0x519)]();VisuMZ[_0x5c714a(0x5b8)][_0x5c714a(0x74e)](_0x398a3c,_0x5e49df,!![]),SceneManager[_0x5c714a(0x7f6)][_0x5c714a(0x62f)]=!![];},VisuMZ[_0x4e56c8(0x5b8)]['ExtractStrFromList']=function(_0x56bc02){const _0x4fa35b=_0x4e56c8;let _0x53e480='\x0a'+'─'[_0x4fa35b(0xd7)](0x46)+'\x0a',_0x7a909c='\x0a'+'┄'[_0x4fa35b(0xd7)](0x46)+'\x0a',_0x26cceb='';for(const _0x505f26 of _0x56bc02){if(!_0x505f26)continue;if(_0x505f26['code']===0x65)_0x26cceb+=_0x53e480+'\x0a',_0x26cceb+='〘Show\x20Text〙\x0a',_0x505f26[_0x4fa35b(0xd9)][0x4]!==''&&_0x505f26[_0x4fa35b(0xd9)][0x4]!==undefined&&(_0x26cceb+=_0x4fa35b(0x61b)['format'](_0x505f26['parameters'][0x4]));else{if(_0x505f26['code']===0x191)_0x26cceb+=_0x4fa35b(0x73d)[_0x4fa35b(0x6d4)](_0x505f26[_0x4fa35b(0xd9)][0x0]);else{if(_0x505f26[_0x4fa35b(0x375)]===0x192)_0x26cceb+=_0x53e480,_0x26cceb+='%1〘Choice\x20%2〙\x20%3%1'[_0x4fa35b(0x6d4)](_0x7a909c,_0x505f26['parameters'][0x0]+0x1,_0x505f26['parameters'][0x1]);else{if(_0x505f26[_0x4fa35b(0x375)]===0x193)_0x26cceb+=_0x53e480,_0x26cceb+=_0x4fa35b(0x65d)[_0x4fa35b(0x6d4)](_0x7a909c);else{if(_0x505f26[_0x4fa35b(0x375)]===0x194)_0x26cceb+=_0x53e480,_0x26cceb+=_0x4fa35b(0x149)[_0x4fa35b(0x6d4)](_0x7a909c);else{if(_0x505f26[_0x4fa35b(0x375)]===0x69)_0x26cceb+=_0x53e480+'\x0a',_0x26cceb+='〘Scrolling\x20Text〙\x0a';else{if(_0x505f26[_0x4fa35b(0x375)]===0x6c)_0x26cceb+=_0x53e480+'\x0a',_0x26cceb+=_0x4fa35b(0x486)[_0x4fa35b(0x6d4)](_0x505f26[_0x4fa35b(0xd9)][0x0]);else{if(_0x505f26['code']===0x198)_0x26cceb+=_0x4fa35b(0x73d)[_0x4fa35b(0x6d4)](_0x505f26[_0x4fa35b(0xd9)][0x0]);else{if(_0x505f26['code']===0x75){const _0x391e7c=$dataCommonEvents[_0x505f26[_0x4fa35b(0xd9)][0x0]];if(_0x391e7c&&this[_0x4fa35b(0x80e)]<=0xa){this[_0x4fa35b(0x80e)]++;let _0x58c8ee=VisuMZ[_0x4fa35b(0x5b8)]['ExtractStrFromList'](_0x391e7c[_0x4fa35b(0x144)]);_0x58c8ee[_0x4fa35b(0x323)]>0x0&&(_0x26cceb+=_0x53e480,_0x26cceb+=_0x7a909c,_0x26cceb+=_0x4fa35b(0x714)['format'](_0x391e7c['id'],_0x391e7c[_0x4fa35b(0x9f)]),_0x26cceb+=_0x7a909c,_0x26cceb+=_0x58c8ee,_0x26cceb+=_0x7a909c,_0x26cceb+=_0x4fa35b(0x18a)['format'](_0x391e7c['id'],_0x391e7c[_0x4fa35b(0x9f)]),_0x26cceb+=_0x7a909c),this[_0x4fa35b(0x80e)]--;}}}}}}}}}}}return _0x26cceb['length']>0x0&&(_0x26cceb+=_0x53e480),_0x26cceb;},PluginManager['registerCommand'](pluginData[_0x4e56c8(0x9f)],'OpenURL',_0x305cd6=>{const _0x38547c=_0x4e56c8;VisuMZ[_0x38547c(0x177)](_0x305cd6,_0x305cd6);const _0x5a3c70=_0x305cd6[_0x38547c(0x448)];VisuMZ['openURL'](_0x5a3c70);}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x572),_0x4d5492=>{const _0x593eae=_0x4e56c8;VisuMZ['ConvertParams'](_0x4d5492,_0x4d5492);const _0xf49cd8=_0x4d5492[_0x593eae(0x599)]||0x0;$gameParty['gainGold'](_0xf49cd8);}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x3f5),_0x44a377=>{const _0x18ff91=_0x4e56c8;if(!SceneManager[_0x18ff91(0x738)]())return;VisuMZ[_0x18ff91(0x177)](_0x44a377,_0x44a377);const _0x4dad13=_0x44a377[_0x18ff91(0x710)];SceneManager[_0x18ff91(0x7f6)][_0x18ff91(0x70f)](_0x4dad13);}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x20c),_0x2d565a=>{const _0xe12fea=_0x4e56c8;if(!$gameTemp[_0xe12fea(0x6c9)]())return;if(!Utils['isNwjs']())return;VisuMZ[_0xe12fea(0x177)](_0x2d565a,_0x2d565a);const _0xa194b3=_0x2d565a['PictureID']||0x1;$gameTemp['_pictureCoordinatesMode']=_0xa194b3;}),PluginManager['registerCommand'](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x7dd),_0x4c22cc=>{const _0x25e238=_0x4e56c8;VisuMZ['ConvertParams'](_0x4c22cc,_0x4c22cc);const _0x14c391=_0x4c22cc[_0x25e238(0x520)]||0x1,_0xc26e12=_0x4c22cc[_0x25e238(0x652)]||'Linear',_0x8a397e=$gameScreen[_0x25e238(0x5b9)](_0x14c391);_0x8a397e&&_0x8a397e[_0x25e238(0x6b5)](_0xc26e12);}),PluginManager['registerCommand'](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0xca),_0x20d61f=>{const _0x51c796=_0x4e56c8;for(let _0x223439=0x1;_0x223439<=$gameScreen[_0x51c796(0x792)]();_0x223439++){$gameScreen[_0x51c796(0x708)](_0x223439);}}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],'PictureEraseRange',_0x4a4fb7=>{const _0x45c27c=_0x4e56c8;VisuMZ['ConvertParams'](_0x4a4fb7,_0x4a4fb7);const _0x33a117=Math[_0x45c27c(0x6a7)](_0x4a4fb7[_0x45c27c(0x1ce)],_0x4a4fb7[_0x45c27c(0x576)]),_0x52d7f8=Math[_0x45c27c(0x53e)](_0x4a4fb7['StartID'],_0x4a4fb7['EndingID']);for(let _0x15ecc8=_0x33a117;_0x15ecc8<=_0x52d7f8;_0x15ecc8++){$gameScreen[_0x45c27c(0x708)](_0x15ecc8);}}),PluginManager['registerCommand'](pluginData[_0x4e56c8(0x9f)],'PictureRotateBy',_0x375183=>{const _0x4ca8f5=_0x4e56c8;VisuMZ[_0x4ca8f5(0x177)](_0x375183,_0x375183);const _0x4df7f1=Math[_0x4ca8f5(0x263)](_0x375183[_0x4ca8f5(0x30e)])[_0x4ca8f5(0x2d2)](0x1,0x64),_0x3e6e0b=-Number(_0x375183['AdjustAngle']||0x0),_0xd67a65=Math[_0x4ca8f5(0x53e)](_0x375183[_0x4ca8f5(0x1cb)]||0x0,0x0),_0x4fcb43=_0x375183[_0x4ca8f5(0x652)]||_0x4ca8f5(0x630),_0x23d628=_0x375183[_0x4ca8f5(0x443)],_0x297797=$gameScreen[_0x4ca8f5(0x5b9)](_0x4df7f1);if(!_0x297797)return;_0x297797[_0x4ca8f5(0x2c8)](_0x3e6e0b,_0xd67a65,_0x4fcb43);if(_0x23d628){const _0x4c2188=$gameTemp['getLastPluginCommandInterpreter']();if(_0x4c2188)_0x4c2188['wait'](_0xd67a65);}}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x6c1),_0x59a157=>{const _0x59e535=_0x4e56c8;VisuMZ[_0x59e535(0x177)](_0x59a157,_0x59a157);const _0x223e28=Math[_0x59e535(0x263)](_0x59a157['PictureID'])[_0x59e535(0x2d2)](0x1,0x64),_0x42f61a=-Number(_0x59a157[_0x59e535(0x16d)]||0x0),_0x70dbb7=Math[_0x59e535(0x53e)](_0x59a157[_0x59e535(0x1cb)]||0x0,0x0),_0x392726=_0x59a157[_0x59e535(0x652)]||_0x59e535(0x630),_0x554df2=_0x59a157[_0x59e535(0x443)],_0x483de0=$gameScreen['picture'](_0x223e28);if(!_0x483de0)return;_0x483de0['setAnglePlusData'](_0x42f61a,_0x70dbb7,_0x392726);if(_0x554df2){const _0x5e1db9=$gameTemp[_0x59e535(0x190)]();if(_0x5e1db9)_0x5e1db9[_0x59e535(0x6ca)](_0x70dbb7);}}),PluginManager[_0x4e56c8(0x195)](pluginData['name'],_0x4e56c8(0x5b0),_0x5727a0=>{const _0xab70a0=_0x4e56c8;VisuMZ['ConvertParams'](_0x5727a0,_0x5727a0);const _0x387f67=Math['round'](_0x5727a0[_0xab70a0(0x30e)])[_0xab70a0(0x2d2)](0x1,0x64),_0x517f49=_0x5727a0[_0xab70a0(0x5ce)],_0x3da650=_0x517f49[_0xab70a0(0x73c)]['clamp'](0x0,0x1),_0x37a5ea=Math['round'](_0x517f49[_0xab70a0(0x3e4)]||0x0),_0x3a7eac=Math[_0xab70a0(0x263)](_0x517f49[_0xab70a0(0x237)]||0x0),_0x7cf39b=Math['round'](_0x517f49[_0xab70a0(0xc7)]||0x0),_0x3a76ab=Math[_0xab70a0(0x263)](_0x517f49[_0xab70a0(0x54d)]||0x0),_0x4b35cb=Math[_0xab70a0(0x263)](_0x517f49[_0xab70a0(0x3ee)])[_0xab70a0(0x2d2)](0x0,0xff),_0x58e519=_0x517f49['BlendMode'],_0x82c990=_0xab70a0(0x668),_0x5a5c39=_0x5727a0[_0xab70a0(0x460)]?'Smooth':_0xab70a0(0x432),_0x55176a=_0x82c990[_0xab70a0(0x6d4)](_0x5727a0[_0xab70a0(0x5d4)],_0x5a5c39);$gameScreen[_0xab70a0(0x71b)](_0x387f67,_0x55176a,_0x3da650,_0x37a5ea,_0x3a7eac,_0x7cf39b,_0x3a76ab,_0x4b35cb,_0x58e519);}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],'ScreenShake',_0x12179a=>{const _0x1b6fbd=_0x4e56c8;VisuMZ[_0x1b6fbd(0x177)](_0x12179a,_0x12179a);const _0x1320d2=_0x12179a[_0x1b6fbd(0x63e)]||_0x1b6fbd(0x757),_0x4acc50=_0x12179a['Power'][_0x1b6fbd(0x2d2)](0x1,0x9),_0x2d99b5=_0x12179a[_0x1b6fbd(0x1bf)]['clamp'](0x1,0x9),_0x141763=_0x12179a['Duration']||0x1,_0x536197=_0x12179a[_0x1b6fbd(0x443)];$gameScreen[_0x1b6fbd(0x200)](_0x1320d2),$gameScreen['startShake'](_0x4acc50,_0x2d99b5,_0x141763);if(_0x536197){const _0x4c6286=$gameTemp[_0x1b6fbd(0x190)]();if(_0x4c6286)_0x4c6286['wait'](_0x141763);}}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x57b),_0x87e121=>{const _0x56c907=_0x4e56c8;if($gameParty[_0x56c907(0x831)]())return;VisuMZ[_0x56c907(0x177)](_0x87e121,_0x87e121);const _0x104fb6=_0x87e121[_0x56c907(0x3a2)],_0x16d1f2=(_0x87e121[_0x56c907(0x7d)]||0x0)/0x64;for(const _0x218f76 of _0x104fb6){const _0x2c009a=Math['random']()<=_0x16d1f2;$gameSwitches['setValue'](_0x218f76,_0x2c009a);}}),PluginManager[_0x4e56c8(0x195)](pluginData['name'],_0x4e56c8(0x556),_0x2a893e=>{const _0x396547=_0x4e56c8;if($gameParty[_0x396547(0x831)]())return;VisuMZ['ConvertParams'](_0x2a893e,_0x2a893e);const _0x22ea1b=Math[_0x396547(0x6a7)](_0x2a893e['StartID'],_0x2a893e[_0x396547(0x576)]),_0x156329=Math[_0x396547(0x53e)](_0x2a893e[_0x396547(0x1ce)],_0x2a893e[_0x396547(0x576)]),_0x3b13b5=(_0x2a893e[_0x396547(0x7d)]||0x0)/0x64;for(let _0x572b23=_0x22ea1b;_0x572b23<=_0x156329;_0x572b23++){const _0x28e0fd=Math['random']()<=_0x3b13b5;$gameSwitches[_0x396547(0x1e1)](_0x572b23,_0x28e0fd);}}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x16c),_0x448633=>{const _0x9bfab4=_0x4e56c8;if($gameParty[_0x9bfab4(0x831)]())return;VisuMZ[_0x9bfab4(0x177)](_0x448633,_0x448633);const _0x5d7915=_0x448633['IDs'];for(const _0x2da82c of _0x5d7915){const _0x2c38ef=$gameSwitches['value'](_0x2da82c);$gameSwitches[_0x9bfab4(0x1e1)](_0x2da82c,!_0x2c38ef);}}),PluginManager[_0x4e56c8(0x195)](pluginData['name'],_0x4e56c8(0x205),_0x2bfca8=>{const _0x5135d2=_0x4e56c8;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x2bfca8,_0x2bfca8);const _0x420c83=Math[_0x5135d2(0x6a7)](_0x2bfca8[_0x5135d2(0x1ce)],_0x2bfca8['EndingID']),_0x3cc68a=Math[_0x5135d2(0x53e)](_0x2bfca8[_0x5135d2(0x1ce)],_0x2bfca8['EndingID']);for(let _0x3384c3=_0x420c83;_0x3384c3<=_0x3cc68a;_0x3384c3++){const _0x333095=$gameSwitches[_0x5135d2(0x599)](_0x3384c3);$gameSwitches['setValue'](_0x3384c3,!_0x333095);}}),PluginManager[_0x4e56c8(0x195)](pluginData['name'],'SystemSetFontSize',_0x285364=>{const _0x19ebf5=_0x4e56c8;VisuMZ[_0x19ebf5(0x177)](_0x285364,_0x285364);const _0x25fea3=_0x285364[_0x19ebf5(0x3de)]||0x1;$gameSystem[_0x19ebf5(0x19e)](_0x25fea3);}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0xf9),_0x98e8ac=>{const _0x31e5dd=_0x4e56c8;if($gameParty[_0x31e5dd(0x831)]())return;VisuMZ[_0x31e5dd(0x177)](_0x98e8ac,_0x98e8ac);const _0x42a7ea=_0x98e8ac[_0x31e5dd(0x3de)];if(_0x42a7ea[_0x31e5dd(0x60a)](/Front/i))$gameSystem[_0x31e5dd(0x4fb)](![]);else _0x42a7ea[_0x31e5dd(0x60a)](/Side/i)?$gameSystem[_0x31e5dd(0x4fb)](!![]):$gameSystem[_0x31e5dd(0x4fb)](!$gameSystem['isSideView']());}),PluginManager[_0x4e56c8(0x195)](pluginData['name'],_0x4e56c8(0x484),_0x5a1c8c=>{const _0x1544fb=_0x4e56c8;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x5a1c8c,_0x5a1c8c);const _0x4d193c=['bgm',_0x1544fb(0x155),'me','se'];for(const _0x5799fb of _0x4d193c){const _0x89de0b=_0x5a1c8c[_0x5799fb],_0xd232b1='%1/'['format'](_0x5799fb);for(const _0x1eae56 of _0x89de0b){AudioManager[_0x1544fb(0x6dc)](_0xd232b1,_0x1eae56);}}}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x1fd),_0x3997ce=>{const _0x27f5ea=_0x4e56c8;if($gameParty[_0x27f5ea(0x831)]())return;VisuMZ[_0x27f5ea(0x177)](_0x3997ce,_0x3997ce);const _0x91ee6e=[_0x27f5ea(0x74c),_0x27f5ea(0x801),'battlebacks2',_0x27f5ea(0x85f),_0x27f5ea(0x6a5),'faces','parallaxes',_0x27f5ea(0x84),_0x27f5ea(0x5ee),_0x27f5ea(0x355),_0x27f5ea(0x48b),'tilesets',_0x27f5ea(0x840),'titles2'];for(const _0xe71c43 of _0x91ee6e){const _0x1a4f74=_0x3997ce[_0xe71c43],_0x1aeb33=_0x27f5ea(0x824)[_0x27f5ea(0x6d4)](_0xe71c43);for(const _0x103622 of _0x1a4f74){ImageManager['loadBitmap'](_0x1aeb33,_0x103622);}}}),PluginManager['registerCommand'](pluginData[_0x4e56c8(0x9f)],'SystemSetBattleSystem',_0x4b7031=>{const _0x53253f=_0x4e56c8;if($gameParty[_0x53253f(0x831)]())return;VisuMZ[_0x53253f(0x177)](_0x4b7031,_0x4b7031);const _0x4db939=_0x4b7031[_0x53253f(0x3de)][_0x53253f(0x25a)]()[_0x53253f(0x519)](),_0x167e0a=VisuMZ[_0x53253f(0x5b8)][_0x53253f(0x58a)](_0x4db939);$gameSystem[_0x53253f(0x76c)](_0x167e0a);}),VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x58a)]=function(_0x4aa6a3){const _0x31910a=_0x4e56c8;_0x4aa6a3=_0x4aa6a3||_0x31910a(0x1c3),_0x4aa6a3=String(_0x4aa6a3)[_0x31910a(0x25a)]()[_0x31910a(0x519)]();switch(_0x4aa6a3){case _0x31910a(0x788):return 0x0;case _0x31910a(0x3ce):Imported[_0x31910a(0x173)]&&(ConfigManager[_0x31910a(0x178)]=!![]);return 0x1;case _0x31910a(0x3bb):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x31910a(0x178)]=![]);return 0x2;case _0x31910a(0x11e):if(Imported['VisuMZ_2_BattleSystemCTB'])return _0x31910a(0x11e);break;case'STB':if(Imported[_0x31910a(0x817)])return'STB';break;case'BTB':if(Imported['VisuMZ_2_BattleSystemBTB'])return _0x31910a(0x81c);break;case _0x31910a(0x343):if(Imported[_0x31910a(0x450)])return _0x31910a(0x343);break;case _0x31910a(0x187):if(Imported[_0x31910a(0x4cd)])return _0x31910a(0x187);break;case _0x31910a(0x45d):if(Imported[_0x31910a(0x4da)])return _0x31910a(0x45d);break;case _0x31910a(0x46c):if(Imported[_0x31910a(0x2c7)])return'PTB';break;}return $dataSystem[_0x31910a(0x222)];},PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],'SystemSetWindowPadding',_0x3676f6=>{const _0x21f536=_0x4e56c8;VisuMZ[_0x21f536(0x177)](_0x3676f6,_0x3676f6);const _0x1e7d41=_0x3676f6[_0x21f536(0x3de)]||0x1;$gameSystem[_0x21f536(0x5e4)](_0x1e7d41);}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x683),_0x4dd0f3=>{const _0xb593b3=_0x4e56c8;VisuMZ['ConvertParams'](_0x4dd0f3,_0x4dd0f3);const _0x37e7ad=_0x4dd0f3[_0xb593b3(0x456)]||'';$textPopup(_0x37e7ad);}),PluginManager[_0x4e56c8(0x195)](pluginData[_0x4e56c8(0x9f)],_0x4e56c8(0x403),_0x2d2d6c=>{const _0x58271d=_0x4e56c8;VisuMZ['ConvertParams'](_0x2d2d6c,_0x2d2d6c);const _0x5123de=_0x2d2d6c['id']||0x1,_0x5dab5f=_0x2d2d6c['operation'],_0x4380a2=_0x2d2d6c[_0x58271d(0x5a2)]||0x0;let _0xbad1ca=$gameVariables['value'](_0x5123de)||0x0;switch(_0x5dab5f){case'=':_0xbad1ca=_0x4380a2;break;case'+':_0xbad1ca+=_0x4380a2;break;case'-':_0xbad1ca-=_0x4380a2;break;case'*':_0xbad1ca*=_0x4380a2;break;case'/':_0xbad1ca/=_0x4380a2;break;case'%':_0xbad1ca%=_0x4380a2;break;}_0xbad1ca=_0xbad1ca||0x0,$gameVariables['setValue'](_0x5123de,_0xbad1ca);}),PluginManager[_0x4e56c8(0x195)](pluginData['name'],_0x4e56c8(0x14e),_0xfacdf3=>{const _0x30191c=_0x4e56c8;VisuMZ[_0x30191c(0x177)](_0xfacdf3,_0xfacdf3);const _0x2fbc07=_0xfacdf3['id']()||0x1,_0x535898=_0xfacdf3['operation'],_0x35253b=_0xfacdf3['operand']()||0x0;let _0x42ecea=$gameVariables[_0x30191c(0x599)](_0x2fbc07)||0x0;switch(_0x535898){case'=':_0x42ecea=_0x35253b;break;case'+':_0x42ecea+=_0x35253b;break;case'-':_0x42ecea-=_0x35253b;break;case'*':_0x42ecea*=_0x35253b;break;case'/':_0x42ecea/=_0x35253b;break;case'%':_0x42ecea%=_0x35253b;break;}_0x42ecea=_0x42ecea||0x0,$gameVariables[_0x30191c(0x1e1)](_0x2fbc07,_0x42ecea);}),VisuMZ[_0x4e56c8(0x5b8)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x4e56c8(0x5e7)],Scene_Boot[_0x4e56c8(0x510)][_0x4e56c8(0x5e7)]=function(){const _0x5db69f=_0x4e56c8;VisuMZ[_0x5db69f(0x5b8)][_0x5db69f(0x32a)][_0x5db69f(0x410)](this),this[_0x5db69f(0x24e)](),this[_0x5db69f(0x136)](),this['process_VisuMZ_CoreEngine_Settings'](),this[_0x5db69f(0x35b)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),this[_0x5db69f(0xd5)](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0xfe)]={},Scene_Boot['prototype'][_0x4e56c8(0x24e)]=function(){const _0x46afad=_0x4e56c8,_0x542486=[_0x46afad(0x280),'MAXMP',_0x46afad(0x5a0),_0x46afad(0x27b),_0x46afad(0x753),_0x46afad(0x754),_0x46afad(0x9e),'LUK'],_0x51379d=['HIT',_0x46afad(0x398),_0x46afad(0x6f5),_0x46afad(0x180),_0x46afad(0x7f7),_0x46afad(0x2db),_0x46afad(0x2bc),_0x46afad(0x381),'MRG','TRG'],_0x339569=[_0x46afad(0x1ab),'GRD','REC',_0x46afad(0x4d4),'MCR',_0x46afad(0x63a),_0x46afad(0x308),'MDR',_0x46afad(0x3bc),_0x46afad(0x5b1)],_0xfb2380=[_0x542486,_0x51379d,_0x339569],_0x27b30b=[_0x46afad(0x23d),_0x46afad(0x474),'Plus2',_0x46afad(0x24c),_0x46afad(0x745),_0x46afad(0x6f9),_0x46afad(0x2d4),_0x46afad(0x357),'Flat1',_0x46afad(0x498)];for(const _0x5ee071 of _0xfb2380){let _0x9c3172='';if(_0x5ee071===_0x542486)_0x9c3172='param';if(_0x5ee071===_0x51379d)_0x9c3172='xparam';if(_0x5ee071===_0x339569)_0x9c3172='sparam';for(const _0x38a813 of _0x27b30b){let _0x1886d6=_0x46afad(0x799)[_0x46afad(0x6d4)](_0x9c3172,_0x38a813);VisuMZ[_0x46afad(0x5b8)]['RegExp'][_0x1886d6]=[],VisuMZ[_0x46afad(0x5b8)][_0x46afad(0xfe)][_0x1886d6+'JS']=[];let _0x166c16=_0x46afad(0x839);if([_0x46afad(0x23d),'Flat'][_0x46afad(0xd3)](_0x38a813))_0x166c16+=_0x46afad(0x31a);else{if([_0x46afad(0x474),_0x46afad(0x5cc)][_0x46afad(0xd3)](_0x38a813))_0x166c16+='([\x5c+\x5c-]\x5cd+)([%％])>';else{if([_0x46afad(0x2e9),_0x46afad(0x498)][_0x46afad(0xd3)](_0x38a813))_0x166c16+=_0x46afad(0x7b9);else{if(_0x38a813===_0x46afad(0x24c))_0x166c16+=_0x46afad(0x23b);else{if(_0x38a813==='Rate1')_0x166c16+=_0x46afad(0x463);else _0x38a813===_0x46afad(0x2d4)&&(_0x166c16+=_0x46afad(0x3c8));}}}}for(const _0x2f43b5 of _0x5ee071){let _0x508cab=_0x38a813[_0x46afad(0x64a)](/[\d+]/g,'')[_0x46afad(0x25a)]();const _0x5d51fe=_0x166c16[_0x46afad(0x6d4)](_0x2f43b5,_0x508cab);VisuMZ[_0x46afad(0x5b8)][_0x46afad(0xfe)][_0x1886d6]['push'](new RegExp(_0x5d51fe,'i'));const _0x5a29f9='<JS\x20%1\x20%2:[\x20](.*)>'[_0x46afad(0x6d4)](_0x2f43b5,_0x508cab);VisuMZ[_0x46afad(0x5b8)][_0x46afad(0xfe)][_0x1886d6+'JS'][_0x46afad(0x5c9)](new RegExp(_0x5a29f9,'i'));}}}},Scene_Boot[_0x4e56c8(0x510)][_0x4e56c8(0x136)]=function(){const _0x2f286b=_0x4e56c8;if(VisuMZ[_0x2f286b(0x411)])return;},Scene_Boot[_0x4e56c8(0x510)][_0x4e56c8(0x387)]=function(){const _0x438eae=_0x4e56c8,_0x3c12b3=VisuMZ[_0x438eae(0x5b8)]['Settings'];_0x3c12b3[_0x438eae(0x2c9)][_0x438eae(0x6c0)]&&VisuMZ[_0x438eae(0x592)](!![]);_0x3c12b3['QoL'][_0x438eae(0x568)]&&(Input[_0x438eae(0x206)][0x23]='end',Input['keyMapper'][0x24]=_0x438eae(0x515));if(_0x3c12b3[_0x438eae(0x21c)]){const _0x23321e=_0x3c12b3[_0x438eae(0x21c)];_0x23321e[_0x438eae(0x160)]=_0x23321e[_0x438eae(0x160)]||'\x5c}❪SHIFT❫\x5c{',_0x23321e[_0x438eae(0xb1)]=_0x23321e[_0x438eae(0xb1)]||_0x438eae(0x73e);}_0x3c12b3[_0x438eae(0x84c)][_0x438eae(0x41e)]&&(Input['keyMapper'][0x57]='up',Input['keyMapper'][0x41]=_0x438eae(0x67b),Input[_0x438eae(0x206)][0x53]=_0x438eae(0x324),Input[_0x438eae(0x206)][0x44]='right',Input[_0x438eae(0x206)][0x45]=_0x438eae(0x4a5)),_0x3c12b3[_0x438eae(0x84c)][_0x438eae(0x779)]&&(Input['keyMapper'][0x52]=_0x438eae(0x2a0)),_0x3c12b3[_0x438eae(0x2b7)]['DisplayedParams']=_0x3c12b3[_0x438eae(0x2b7)]['DisplayedParams']['map'](_0x522bf7=>_0x522bf7[_0x438eae(0x25a)]()[_0x438eae(0x519)]()),_0x3c12b3[_0x438eae(0x2b7)][_0x438eae(0x6af)]=_0x3c12b3[_0x438eae(0x2b7)][_0x438eae(0x6af)][_0x438eae(0x90)](_0x4b1eae=>_0x4b1eae['toUpperCase']()[_0x438eae(0x519)]()),_0x3c12b3['QoL'][_0x438eae(0x19f)]=_0x3c12b3['QoL']['ShiftR_Toggle']??!![],_0x3c12b3[_0x438eae(0x2c9)][_0x438eae(0x480)]=_0x3c12b3[_0x438eae(0x2c9)][_0x438eae(0x480)]??!![],_0x3c12b3[_0x438eae(0x21c)][_0x438eae(0x6b6)]&&VisuMZ[_0x438eae(0x5b8)][_0x438eae(0x1f8)]();},VisuMZ[_0x4e56c8(0x5b8)]['CheckSplitEscape']=function(){const _0x24b945=_0x4e56c8;let _0x253fe6=![],_0x57aded=![];for(let _0x2e62c0 in Input[_0x24b945(0x206)]){const _0x2bb86e=Input['keyMapper'][_0x2e62c0];if(_0x2bb86e==='menu')_0x253fe6=!![];if(_0x2bb86e===_0x24b945(0x26b))_0x57aded=!![];if(_0x253fe6&&_0x57aded)return;}let _0x5beb8f=_0x24b945(0x42f);_0x5beb8f+='You\x20do\x20not\x20have\x20a\x20custom\x20Input.keyMapper\x20with\x20\x22cancel\x22\x20and\x20\x22menu\x22\x20',_0x5beb8f+='buttons!\x20Go\x20to\x20project\x27s\x20rmmz_core.js\x20and\x20modify\x20Input.keyMapper\x20',_0x5beb8f+=_0x24b945(0x5fe),_0x5beb8f+=_0x24b945(0x7ba),alert(_0x5beb8f),SceneManager[_0x24b945(0x351)]();},Scene_Boot['prototype'][_0x4e56c8(0x35b)]=function(){const _0x5cd4f7=_0x4e56c8;this[_0x5cd4f7(0x446)]();},Scene_Boot[_0x4e56c8(0x510)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x4809ae=_0x4e56c8,_0x169c39=VisuMZ[_0x4809ae(0x5b8)][_0x4809ae(0x5ce)][_0x4809ae(0x655)];for(const _0x6e84c5 of _0x169c39){const _0x33077d=_0x6e84c5[_0x4809ae(0x5ab)][_0x4809ae(0x64a)](/[ ]/g,''),_0x140f4a=_0x6e84c5['CodeJS'];VisuMZ[_0x4809ae(0x5b8)][_0x4809ae(0x6cf)](_0x33077d,_0x140f4a);}},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x6cf)]=function(_0x5a6693,_0x54c3d8){const _0x2dd3cb=_0x4e56c8;if(!!window[_0x5a6693]){if($gameTemp[_0x2dd3cb(0x6c9)]())console['log'](_0x2dd3cb(0x75c)[_0x2dd3cb(0x6d4)](_0x5a6693));}const _0x2c16ff=_0x2dd3cb(0x1a9)[_0x2dd3cb(0x6d4)](_0x5a6693,_0x54c3d8);window[_0x5a6693]=new Function(_0x2c16ff);},Scene_Boot[_0x4e56c8(0x510)][_0x4e56c8(0x785)]=function(){const _0xb017ae=_0x4e56c8,_0xb7ffde=VisuMZ['CoreEngine'][_0xb017ae(0x5ce)][_0xb017ae(0x140)];if(!_0xb7ffde)return;for(const _0x3da0c0 of _0xb7ffde){if(!_0x3da0c0)continue;VisuMZ[_0xb017ae(0x5b8)][_0xb017ae(0x6db)](_0x3da0c0);}},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x67e)]={},VisuMZ['CoreEngine'][_0x4e56c8(0x44a)]={},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x371)]={},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x547)]={},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x6db)]=function(_0x3bea10){const _0x46f3ac=_0x4e56c8,_0x5aa273=_0x3bea10[_0x46f3ac(0x50b)],_0x35a813=_0x3bea10['ParamName'],_0x9a8ad=_0x3bea10['Icon'],_0x6075a9=_0x3bea10[_0x46f3ac(0x63e)],_0xc6c098=new Function(_0x3bea10[_0x46f3ac(0x209)]);VisuMZ[_0x46f3ac(0x5b8)]['CustomParamNames'][_0x5aa273[_0x46f3ac(0x25a)]()[_0x46f3ac(0x519)]()]=_0x35a813,VisuMZ[_0x46f3ac(0x5b8)]['CustomParamIcons'][_0x5aa273[_0x46f3ac(0x25a)]()[_0x46f3ac(0x519)]()]=_0x9a8ad,VisuMZ['CoreEngine'][_0x46f3ac(0x371)][_0x5aa273[_0x46f3ac(0x25a)]()[_0x46f3ac(0x519)]()]=_0x6075a9,VisuMZ[_0x46f3ac(0x5b8)][_0x46f3ac(0x547)][_0x5aa273[_0x46f3ac(0x25a)]()[_0x46f3ac(0x519)]()]=_0x5aa273,Object[_0x46f3ac(0x38b)](Game_BattlerBase[_0x46f3ac(0x510)],_0x5aa273,{'get'(){const _0x4c653d=_0x46f3ac,_0x305487=_0xc6c098['call'](this);return _0x6075a9===_0x4c653d(0x426)?Math['round'](_0x305487):_0x305487;}});},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x10a)]={},VisuMZ[_0x4e56c8(0x5b8)]['ControllerMatches']={},Scene_Boot[_0x4e56c8(0x510)][_0x4e56c8(0xd5)]=function(){const _0x47a397=_0x4e56c8,_0x5e57e4=VisuMZ[_0x47a397(0x5b8)]['Settings'][_0x47a397(0x10a)];for(const _0x574a04 of _0x5e57e4){const _0xff3474=(_0x574a04[_0x47a397(0x2f6)]||'')[_0x47a397(0x471)]()[_0x47a397(0x519)](),_0x1ddab2=(_0x574a04[_0x47a397(0x537)]||'')[_0x47a397(0x471)]()[_0x47a397(0x519)]();VisuMZ['CoreEngine']['ControllerButtons'][_0xff3474]=_0x574a04,VisuMZ[_0x47a397(0x5b8)][_0x47a397(0x5de)][_0x1ddab2]=_0xff3474;}},VisuMZ[_0x4e56c8(0x411)]=function(){const _0x55f5f5=_0x4e56c8;for(const _0x285675 of $dataActors){if(_0x285675)VisuMZ[_0x55f5f5(0x1af)](_0x285675);}for(const _0x411de7 of $dataClasses){if(_0x411de7)VisuMZ['ParseClassNotetags'](_0x411de7);}for(const _0x2330ff of $dataSkills){if(_0x2330ff)VisuMZ[_0x55f5f5(0x7d8)](_0x2330ff);}for(const _0x4a7344 of $dataItems){if(_0x4a7344)VisuMZ[_0x55f5f5(0x509)](_0x4a7344);}for(const _0x25ae6b of $dataWeapons){if(_0x25ae6b)VisuMZ[_0x55f5f5(0x5be)](_0x25ae6b);}for(const _0xc41855 of $dataArmors){if(_0xc41855)VisuMZ[_0x55f5f5(0x7f)](_0xc41855);}for(const _0x301c52 of $dataEnemies){if(_0x301c52)VisuMZ[_0x55f5f5(0x74a)](_0x301c52);}for(const _0x4311e8 of $dataStates){if(_0x4311e8)VisuMZ[_0x55f5f5(0x82f)](_0x4311e8);}for(const _0x2a067a of $dataTilesets){if(_0x2a067a)VisuMZ[_0x55f5f5(0x158)](_0x2a067a);}},VisuMZ[_0x4e56c8(0x1af)]=function(_0x1c936f){},VisuMZ[_0x4e56c8(0x4db)]=function(_0x3e0e92){},VisuMZ['ParseSkillNotetags']=function(_0x434360){},VisuMZ[_0x4e56c8(0x509)]=function(_0x113bb5){},VisuMZ['ParseWeaponNotetags']=function(_0x1a0257){},VisuMZ[_0x4e56c8(0x7f)]=function(_0x13656d){},VisuMZ[_0x4e56c8(0x74a)]=function(_0x1681ff){},VisuMZ['ParseStateNotetags']=function(_0x2f82f7){},VisuMZ[_0x4e56c8(0x158)]=function(_0x1fe81a){},VisuMZ['CoreEngine'][_0x4e56c8(0x1af)]=VisuMZ['ParseActorNotetags'],VisuMZ[_0x4e56c8(0x1af)]=function(_0xa49945){const _0x5b2785=_0x4e56c8;VisuMZ['CoreEngine'][_0x5b2785(0x1af)][_0x5b2785(0x410)](this,_0xa49945);const _0x57d7fb=_0xa49945[_0x5b2785(0x47c)];if(_0x57d7fb[_0x5b2785(0x60a)](/<MAX LEVEL:[ ](\d+)>/i)){_0xa49945[_0x5b2785(0x513)]=Number(RegExp['$1']);if(_0xa49945[_0x5b2785(0x513)]===0x0)_0xa49945['maxLevel']=Number[_0x5b2785(0x838)];}_0x57d7fb[_0x5b2785(0x60a)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0xa49945['initialLevel']=Math[_0x5b2785(0x6a7)](Number(RegExp['$1']),_0xa49945[_0x5b2785(0x513)]));},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x4db)]=VisuMZ[_0x4e56c8(0x4db)],VisuMZ[_0x4e56c8(0x4db)]=function(_0x424d37){const _0x3bd8da=_0x4e56c8;VisuMZ[_0x3bd8da(0x5b8)]['ParseClassNotetags'][_0x3bd8da(0x410)](this,_0x424d37);if(_0x424d37[_0x3bd8da(0x2a5)])for(const _0x17aea9 of _0x424d37[_0x3bd8da(0x2a5)]){_0x17aea9[_0x3bd8da(0x47c)][_0x3bd8da(0x60a)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x17aea9['level']=Math['max'](Number(RegExp['$1']),0x1));}},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x74a)]=VisuMZ[_0x4e56c8(0x74a)],VisuMZ['ParseEnemyNotetags']=function(_0x3f9fdb){const _0x344810=_0x4e56c8;VisuMZ[_0x344810(0x5b8)][_0x344810(0x74a)]['call'](this,_0x3f9fdb),_0x3f9fdb[_0x344810(0x5eb)]=0x1;const _0x50aa94=_0x3f9fdb[_0x344810(0x47c)];if(_0x50aa94[_0x344810(0x60a)](/<LEVEL:[ ](\d+)>/i))_0x3f9fdb[_0x344810(0x5eb)]=Number(RegExp['$1']);if(_0x50aa94[_0x344810(0x60a)](/<MAXHP:[ ](\d+)>/i))_0x3f9fdb[_0x344810(0x231)][0x0]=Number(RegExp['$1']);if(_0x50aa94[_0x344810(0x60a)](/<MAXMP:[ ](\d+)>/i))_0x3f9fdb[_0x344810(0x231)][0x1]=Number(RegExp['$1']);if(_0x50aa94['match'](/<ATK:[ ](\d+)>/i))_0x3f9fdb[_0x344810(0x231)][0x2]=Number(RegExp['$1']);if(_0x50aa94[_0x344810(0x60a)](/<DEF:[ ](\d+)>/i))_0x3f9fdb['params'][0x3]=Number(RegExp['$1']);if(_0x50aa94[_0x344810(0x60a)](/<MAT:[ ](\d+)>/i))_0x3f9fdb[_0x344810(0x231)][0x4]=Number(RegExp['$1']);if(_0x50aa94['match'](/<MDF:[ ](\d+)>/i))_0x3f9fdb['params'][0x5]=Number(RegExp['$1']);if(_0x50aa94[_0x344810(0x60a)](/<AGI:[ ](\d+)>/i))_0x3f9fdb[_0x344810(0x231)][0x6]=Number(RegExp['$1']);if(_0x50aa94['match'](/<LUK:[ ](\d+)>/i))_0x3f9fdb[_0x344810(0x231)][0x7]=Number(RegExp['$1']);if(_0x50aa94['match'](/<EXP:[ ](\d+)>/i))_0x3f9fdb[_0x344810(0x57d)]=Number(RegExp['$1']);if(_0x50aa94['match'](/<GOLD:[ ](\d+)>/i))_0x3f9fdb[_0x344810(0x10f)]=Number(RegExp['$1']);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x16b)]=Graphics[_0x4e56c8(0x185)],Graphics['_defaultStretchMode']=function(){const _0x2febc2=_0x4e56c8;switch(VisuMZ[_0x2febc2(0x5b8)]['Settings']['QoL']['AutoStretch']){case _0x2febc2(0x654):return!![];case _0x2febc2(0x587):return![];default:return VisuMZ[_0x2febc2(0x5b8)][_0x2febc2(0x16b)][_0x2febc2(0x410)](this);}},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x821)]=Graphics[_0x4e56c8(0x9b)],Graphics[_0x4e56c8(0x9b)]=function(_0x388e64,_0x3116ed,_0x4e7da8=null){const _0xddb4d6=_0x4e56c8;VisuMZ['CoreEngine'][_0xddb4d6(0x821)][_0xddb4d6(0x410)](this,_0x388e64,_0x3116ed,_0x4e7da8),VisuMZ['ShowDevTools'](![]);},VisuMZ['CoreEngine'][_0x4e56c8(0x39f)]=Graphics[_0x4e56c8(0x7b)],Graphics[_0x4e56c8(0x7b)]=function(_0x124bad){const _0x1cdbeb=_0x4e56c8;VisuMZ[_0x1cdbeb(0x5b8)][_0x1cdbeb(0x39f)]['call'](this,_0x124bad),this[_0x1cdbeb(0x833)](_0x124bad);},Graphics['_centerElementCoreEngine']=function(_0x2e3336){const _0x2fc81e=_0x4e56c8;VisuMZ[_0x2fc81e(0x5b8)][_0x2fc81e(0x5ce)][_0x2fc81e(0x2c9)][_0x2fc81e(0x612)]&&(_0x2e3336['style'][_0x2fc81e(0x551)]=_0x2fc81e(0x29e));VisuMZ[_0x2fc81e(0x5b8)]['Settings'][_0x2fc81e(0x2c9)][_0x2fc81e(0x7f5)]&&(_0x2e3336[_0x2fc81e(0x3d9)][_0x2fc81e(0x502)]=_0x2fc81e(0x1ad));const _0x3c1b86=Math[_0x2fc81e(0x53e)](0x0,Math[_0x2fc81e(0x653)](_0x2e3336[_0x2fc81e(0x79c)]*this[_0x2fc81e(0x4ab)])),_0x20c62c=Math[_0x2fc81e(0x53e)](0x0,Math[_0x2fc81e(0x653)](_0x2e3336[_0x2fc81e(0x1e9)]*this[_0x2fc81e(0x4ab)]));_0x2e3336[_0x2fc81e(0x3d9)][_0x2fc81e(0x79c)]=_0x3c1b86+'px',_0x2e3336[_0x2fc81e(0x3d9)][_0x2fc81e(0x1e9)]=_0x20c62c+'px';},VisuMZ[_0x4e56c8(0x5b8)]['Bitmap_initialize']=Bitmap[_0x4e56c8(0x510)][_0x4e56c8(0x5e5)],Bitmap['prototype'][_0x4e56c8(0x5e5)]=function(_0x57269d,_0x2f12dd){const _0x24b68e=_0x4e56c8;VisuMZ[_0x24b68e(0x5b8)][_0x24b68e(0x1f2)][_0x24b68e(0x410)](this,_0x57269d,_0x2f12dd),this[_0x24b68e(0x719)]=!(VisuMZ[_0x24b68e(0x5b8)][_0x24b68e(0x5ce)][_0x24b68e(0x2c9)][_0x24b68e(0x7f5)]??!![]);},Bitmap[_0x4e56c8(0x510)]['markCoreEngineModified']=function(){const _0x1670b7=_0x4e56c8;this[_0x1670b7(0x34c)]=!![];},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5c7)]=Sprite[_0x4e56c8(0x510)][_0x4e56c8(0x778)],Sprite[_0x4e56c8(0x510)]['destroy']=function(){const _0x5aedb7=_0x4e56c8;if(this[_0x5aedb7(0x65b)])VisuMZ[_0x5aedb7(0x5b8)][_0x5aedb7(0x5c7)]['call'](this);this[_0x5aedb7(0x4c0)]();},Sprite[_0x4e56c8(0x510)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x2c5b44=_0x4e56c8;if(!this[_0x2c5b44(0x134)])return;if(!this[_0x2c5b44(0x134)][_0x2c5b44(0x34c)])return;this[_0x2c5b44(0x134)]['_baseTexture']&&!this[_0x2c5b44(0xa1)][_0x2c5b44(0x2c2)]['destroyed']&&this[_0x2c5b44(0x134)][_0x2c5b44(0x778)]();},VisuMZ[_0x4e56c8(0x5b8)]['Bitmap_resize']=Bitmap[_0x4e56c8(0x510)][_0x4e56c8(0x850)],Bitmap['prototype'][_0x4e56c8(0x850)]=function(_0x4e670f,_0x5f4198){const _0x491ef9=_0x4e56c8;VisuMZ[_0x491ef9(0x5b8)][_0x491ef9(0xe4)]['call'](this,_0x4e670f,_0x5f4198),this[_0x491ef9(0x2aa)]();},VisuMZ['CoreEngine'][_0x4e56c8(0x66b)]=Bitmap[_0x4e56c8(0x510)][_0x4e56c8(0x314)],Bitmap['prototype'][_0x4e56c8(0x314)]=function(_0x30804d,_0x40a9a7,_0x44b201,_0x4929a2,_0x7d7217,_0x202b8a,_0x56d581,_0x414b7d,_0x4d4a09){const _0x5daaeb=_0x4e56c8;_0x40a9a7=Math[_0x5daaeb(0x263)](_0x40a9a7),_0x44b201=Math[_0x5daaeb(0x263)](_0x44b201),_0x4929a2=Math[_0x5daaeb(0x263)](_0x4929a2),_0x7d7217=Math[_0x5daaeb(0x263)](_0x7d7217),_0x202b8a=Math[_0x5daaeb(0x263)](_0x202b8a),_0x56d581=Math[_0x5daaeb(0x263)](_0x56d581),VisuMZ[_0x5daaeb(0x5b8)][_0x5daaeb(0x66b)][_0x5daaeb(0x410)](this,_0x30804d,_0x40a9a7,_0x44b201,_0x4929a2,_0x7d7217,_0x202b8a,_0x56d581,_0x414b7d,_0x4d4a09),this[_0x5daaeb(0x2aa)]();},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x167)]=Bitmap['prototype']['clearRect'],Bitmap['prototype'][_0x4e56c8(0x6e2)]=function(_0x49b56e,_0x2489b5,_0xb80326,_0x40d9d8){const _0x2ab5ba=_0x4e56c8;VisuMZ[_0x2ab5ba(0x5b8)][_0x2ab5ba(0x167)][_0x2ab5ba(0x410)](this,_0x49b56e,_0x2489b5,_0xb80326,_0x40d9d8),this[_0x2ab5ba(0x2aa)]();},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ea)]=Bitmap[_0x4e56c8(0x510)][_0x4e56c8(0x425)],Bitmap['prototype'][_0x4e56c8(0x425)]=function(_0x212aef,_0x4a5f3a,_0x3c79ce,_0x591b8c,_0x1f31e4){const _0x504d97=_0x4e56c8;VisuMZ[_0x504d97(0x5b8)][_0x504d97(0x5ea)][_0x504d97(0x410)](this,_0x212aef,_0x4a5f3a,_0x3c79ce,_0x591b8c,_0x1f31e4),this[_0x504d97(0x2aa)]();},VisuMZ['CoreEngine'][_0x4e56c8(0x819)]=Bitmap[_0x4e56c8(0x510)][_0x4e56c8(0x5f9)],Bitmap[_0x4e56c8(0x510)][_0x4e56c8(0x5f9)]=function(_0x1dc114,_0x124fbc,_0x1d4865,_0x468bd0,_0x4cf684){const _0x2e96a4=_0x4e56c8;VisuMZ[_0x2e96a4(0x5b8)][_0x2e96a4(0x819)][_0x2e96a4(0x410)](this,_0x1dc114,_0x124fbc,_0x1d4865,_0x468bd0,_0x4cf684),this[_0x2e96a4(0x2aa)]();},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x69f)]=Bitmap[_0x4e56c8(0x510)][_0x4e56c8(0x3fe)],Bitmap['prototype']['gradientFillRect']=function(_0x4f9f9c,_0x213a16,_0x2b5edf,_0x33b959,_0x452d78,_0x3163c7,_0x39274d){const _0x2c4ee2=_0x4e56c8;VisuMZ[_0x2c4ee2(0x5b8)][_0x2c4ee2(0x69f)][_0x2c4ee2(0x410)](this,_0x4f9f9c,_0x213a16,_0x2b5edf,_0x33b959,_0x452d78,_0x3163c7,_0x39274d),this[_0x2c4ee2(0x2aa)]();},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x6d7)]=Bitmap[_0x4e56c8(0x510)][_0x4e56c8(0x2b6)],Bitmap[_0x4e56c8(0x510)][_0x4e56c8(0x2b6)]=function(_0x1160c9,_0x8e8e13,_0x576c6e,_0x113a61){const _0xa2b42d=_0x4e56c8;_0x1160c9=Math[_0xa2b42d(0x263)](_0x1160c9),_0x8e8e13=Math['round'](_0x8e8e13),_0x576c6e=Math[_0xa2b42d(0x263)](_0x576c6e),VisuMZ['CoreEngine'][_0xa2b42d(0x6d7)][_0xa2b42d(0x410)](this,_0x1160c9,_0x8e8e13,_0x576c6e,_0x113a61),this[_0xa2b42d(0x2aa)]();},VisuMZ['CoreEngine'][_0x4e56c8(0x695)]=Bitmap[_0x4e56c8(0x510)][_0x4e56c8(0x112)],Bitmap['prototype'][_0x4e56c8(0x112)]=function(_0x4eb40e){const _0x2515b8=_0x4e56c8;return Math[_0x2515b8(0xc0)](VisuMZ['CoreEngine']['Bitmap_measureTextWidth'][_0x2515b8(0x410)](this,_0x4eb40e));},VisuMZ[_0x4e56c8(0x5b8)]['Bitmap_drawText']=Bitmap['prototype'][_0x4e56c8(0x356)],Bitmap[_0x4e56c8(0x510)]['drawText']=function(_0x21ff41,_0x3ca271,_0x17c013,_0x25dd9b,_0x498a6b,_0x2f05f3){const _0x18bee7=_0x4e56c8;_0x3ca271=Math[_0x18bee7(0x263)](_0x3ca271),_0x17c013=Math[_0x18bee7(0x263)](_0x17c013),_0x25dd9b=Math[_0x18bee7(0xc0)](_0x25dd9b),_0x498a6b=Math['ceil'](_0x498a6b),VisuMZ[_0x18bee7(0x5b8)][_0x18bee7(0x5d1)][_0x18bee7(0x410)](this,_0x21ff41,_0x3ca271,_0x17c013,_0x25dd9b,_0x498a6b,_0x2f05f3),this[_0x18bee7(0x2aa)]();},VisuMZ['CoreEngine']['Bitmap_drawTextOutline']=Bitmap['prototype']['_drawTextOutline'],Bitmap['prototype'][_0x4e56c8(0x2e4)]=function(_0x3fea39,_0x464603,_0x57ace1,_0x245802){const _0x202506=_0x4e56c8;VisuMZ[_0x202506(0x5b8)][_0x202506(0x5ce)][_0x202506(0x2c9)][_0x202506(0x490)]?this[_0x202506(0xa0)](_0x3fea39,_0x464603,_0x57ace1,_0x245802):VisuMZ[_0x202506(0x5b8)][_0x202506(0x7df)][_0x202506(0x410)](this,_0x3fea39,_0x464603,_0x57ace1,_0x245802);},Bitmap['prototype'][_0x4e56c8(0xa0)]=function(_0xc1b1a4,_0x66085c,_0x331c63,_0x4bb48c){const _0x28a185=_0x4e56c8,_0x1220e1=this[_0x28a185(0x7f9)];_0x1220e1['fillStyle']=this['outlineColor'],_0x1220e1[_0x28a185(0x739)](_0xc1b1a4,_0x66085c+0x2,_0x331c63+0x2,_0x4bb48c);},VisuMZ[_0x4e56c8(0x5b8)]['Input_clear']=Input[_0x4e56c8(0xaf)],Input[_0x4e56c8(0xaf)]=function(){const _0x4f503b=_0x4e56c8;VisuMZ[_0x4f503b(0x5b8)][_0x4f503b(0x83)][_0x4f503b(0x410)](this),this[_0x4f503b(0x7dc)]=undefined,this[_0x4f503b(0x26c)]=undefined,this['_gamepadWait']=Input[_0x4f503b(0x335)];},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x2a9)]=Input[_0x4e56c8(0x5b3)],Input['update']=function(){const _0x4ca420=_0x4e56c8;VisuMZ['CoreEngine']['Input_update'][_0x4ca420(0x410)](this);if(this[_0x4ca420(0x7c2)])this[_0x4ca420(0x7c2)]--;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x66d)]=Input[_0x4e56c8(0x4f0)],Input[_0x4e56c8(0x4f0)]=function(){const _0x23ce7c=_0x4e56c8;if(this['_gamepadWait'])return;VisuMZ[_0x23ce7c(0x5b8)][_0x23ce7c(0x66d)][_0x23ce7c(0x410)](this);},VisuMZ['CoreEngine'][_0x4e56c8(0x609)]=Input['_setupEventHandlers'],Input['_setupEventHandlers']=function(){const _0x2fc1e8=_0x4e56c8;VisuMZ[_0x2fc1e8(0x5b8)][_0x2fc1e8(0x609)]['call'](this),document[_0x2fc1e8(0xa3)](_0x2fc1e8(0x1a0),this['_onKeyPress'][_0x2fc1e8(0x223)](this));},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x182)]=Input[_0x4e56c8(0x3b5)],Input[_0x4e56c8(0x3b5)]=function(_0x1a8c5d){const _0x2b96fb=_0x4e56c8;this[_0x2b96fb(0x26c)]=_0x1a8c5d[_0x2b96fb(0x51f)],VisuMZ[_0x2b96fb(0x5b8)][_0x2b96fb(0x182)]['call'](this,_0x1a8c5d),this[_0x2b96fb(0x11c)](null);},Input[_0x4e56c8(0x706)]=function(_0x11b6b3){const _0x159000=_0x4e56c8;this[_0x159000(0x347)](_0x11b6b3);},Input[_0x4e56c8(0x347)]=function(_0x516f1b){const _0x493db2=_0x4e56c8;this[_0x493db2(0x26c)]=_0x516f1b[_0x493db2(0x51f)];let _0x2daeaa=String[_0x493db2(0x529)](_0x516f1b[_0x493db2(0xd2)]);this['_inputString']===undefined?this[_0x493db2(0x7dc)]=_0x2daeaa:this['_inputString']+=_0x2daeaa;},VisuMZ['CoreEngine']['Input_shouldPreventDefault']=Input['_shouldPreventDefault'],Input['_shouldPreventDefault']=function(_0x535b7d){const _0x1162f9=_0x4e56c8;if(_0x535b7d===0x8)return![];return VisuMZ[_0x1162f9(0x5b8)][_0x1162f9(0x236)][_0x1162f9(0x410)](this,_0x535b7d);},Input['isSpecialCode']=function(_0x2071b5){const _0x3f43c8=_0x4e56c8;if(_0x2071b5[_0x3f43c8(0x60a)](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x2071b5[_0x3f43c8(0x60a)](/enter/i))return this[_0x3f43c8(0x26c)]===0xd;if(_0x2071b5['match'](/escape/i))return this[_0x3f43c8(0x26c)]===0x1b;},Input[_0x4e56c8(0x57e)]=function(){const _0x268256=_0x4e56c8;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x268256(0x54f)](this['_inputSpecialKeyCode']);},Input[_0x4e56c8(0x329)]=function(){const _0x4ff63c=_0x4e56c8;return[0x25,0x26,0x27,0x28][_0x4ff63c(0x54f)](this[_0x4ff63c(0x26c)]);},Input[_0x4e56c8(0x33b)]=function(){const _0x2e9d89=_0x4e56c8;if(navigator['getGamepads']){const _0x380aa1=navigator[_0x2e9d89(0x549)]();if(_0x380aa1)for(const _0x87f71f of _0x380aa1){if(_0x87f71f&&_0x87f71f[_0x2e9d89(0x716)])return!![];}}return![];},Input[_0x4e56c8(0x73a)]=function(){const _0x16d418=_0x4e56c8;if(navigator[_0x16d418(0x549)]){const _0x1f3eb3=navigator[_0x16d418(0x549)]();if(_0x1f3eb3)for(const _0x2531bd of _0x1f3eb3){if(_0x2531bd&&_0x2531bd[_0x16d418(0x716)]){if(this[_0x16d418(0x2e2)](_0x2531bd))return!![];if(this[_0x16d418(0x52c)](_0x2531bd))return!![];}}}return![];},Input[_0x4e56c8(0x2e2)]=function(_0x3cd031){const _0x259a8b=_0x4e56c8,_0x9fabfc=_0x3cd031[_0x259a8b(0x545)];for(let _0x22699c=0x0;_0x22699c<_0x9fabfc[_0x259a8b(0x323)];_0x22699c++){if(_0x9fabfc[_0x22699c][_0x259a8b(0x78b)])return!![];}return![];},Input['isGamepadAxisMoved']=function(_0x5e3c51){const _0x70d67e=_0x4e56c8,_0x1b9b85=_0x5e3c51[_0x70d67e(0x5ed)],_0xdcb8dc=0.5;if(_0x1b9b85[0x0]<-_0xdcb8dc)return!![];if(_0x1b9b85[0x0]>_0xdcb8dc)return!![];if(_0x1b9b85[0x1]<-_0xdcb8dc)return!![];if(_0x1b9b85[0x1]>_0xdcb8dc)return!![];return![];},Input['getLastGamepadUsed']=function(){const _0x358bbf=_0x4e56c8;return this[_0x358bbf(0x4a2)]||null;},Input['setLastGamepadUsed']=function(_0x483904){const _0x174922=_0x4e56c8;this[_0x174922(0x4a2)]=_0x483904;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x7aa)]=Input[_0x4e56c8(0x1f7)],Input['_updateGamepadState']=function(_0x41cd22){const _0x4afc30=_0x4e56c8;VisuMZ['CoreEngine'][_0x4afc30(0x7aa)][_0x4afc30(0x410)](this,_0x41cd22),(this[_0x4afc30(0x2e2)](_0x41cd22)||this[_0x4afc30(0x52c)](_0x41cd22))&&this[_0x4afc30(0x11c)](_0x41cd22);},Input[_0x4e56c8(0x7a6)]=function(){const _0x1c0140=_0x4e56c8;return this[_0x1c0140(0x4a2)]?this[_0x1c0140(0x4a2)]['id']:_0x1c0140(0x138);},VisuMZ['CoreEngine'][_0x4e56c8(0x84e)]=Tilemap[_0x4e56c8(0x510)]['_addShadow'],Tilemap['prototype'][_0x4e56c8(0x197)]=function(_0x44a092,_0x258edf,_0x38832f,_0x42ea7e){const _0x44ab35=_0x4e56c8;if($gameMap&&$gameMap['areTileShadowsHidden']())return;VisuMZ[_0x44ab35(0x5b8)][_0x44ab35(0x84e)][_0x44ab35(0x410)](this,_0x44a092,_0x258edf,_0x38832f,_0x42ea7e);},Tilemap[_0x4e56c8(0x22d)][_0x4e56c8(0x510)][_0x4e56c8(0x4c6)]=function(){const _0x452298=_0x4e56c8;this[_0x452298(0x605)]();for(let _0x248641=0x0;_0x248641<Tilemap[_0x452298(0x4be)][_0x452298(0x503)];_0x248641++){const _0x5c28c7=new PIXI[(_0x452298(0x637))]();_0x5c28c7[_0x452298(0x37b)](0x800,0x800),VisuMZ[_0x452298(0x5b8)][_0x452298(0x5ce)][_0x452298(0x2c9)][_0x452298(0x7f5)]&&(_0x5c28c7[_0x452298(0x369)]=PIXI[_0x452298(0x15d)][_0x452298(0x366)]),this[_0x452298(0x530)][_0x452298(0x5c9)](_0x5c28c7);}},WindowLayer[_0x4e56c8(0x510)][_0x4e56c8(0x7cb)]=function(){const _0x3d027e=_0x4e56c8;return SceneManager&&SceneManager[_0x3d027e(0x7f6)]?SceneManager['_scene'][_0x3d027e(0x5c3)]():!![];},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x582)]=WindowLayer[_0x4e56c8(0x510)][_0x4e56c8(0x5c0)],WindowLayer[_0x4e56c8(0x510)]['render']=function render(_0x2406db){const _0x541d8e=_0x4e56c8;this['isMaskingEnabled']()?VisuMZ[_0x541d8e(0x5b8)][_0x541d8e(0x582)]['call'](this,_0x2406db):this['renderNoMask'](_0x2406db);},WindowLayer[_0x4e56c8(0x510)]['renderNoMask']=function render(_0x28ee36){const _0x4b47d2=_0x4e56c8;if(!this[_0x4b47d2(0x852)])return;const _0x4c4b48=new PIXI[(_0x4b47d2(0x30f))](),_0x83475b=_0x28ee36['gl'],_0x9e8cd4=this[_0x4b47d2(0x616)][_0x4b47d2(0x3d1)]();_0x28ee36[_0x4b47d2(0x723)][_0x4b47d2(0x244)](),_0x4c4b48['transform']=this['transform'],_0x28ee36['batch'][_0x4b47d2(0x378)](),_0x83475b[_0x4b47d2(0x703)](_0x83475b[_0x4b47d2(0x3f3)]);while(_0x9e8cd4[_0x4b47d2(0x323)]>0x0){const _0x328d06=_0x9e8cd4[_0x4b47d2(0x61c)]();_0x328d06['_isWindow']&&_0x328d06[_0x4b47d2(0x852)]&&_0x328d06['openness']>0x0&&(_0x83475b[_0x4b47d2(0x4ce)](_0x83475b[_0x4b47d2(0x21f)],0x0,~0x0),_0x83475b['stencilOp'](_0x83475b[_0x4b47d2(0x2e7)],_0x83475b[_0x4b47d2(0x2e7)],_0x83475b[_0x4b47d2(0x2e7)]),_0x328d06[_0x4b47d2(0x5c0)](_0x28ee36),_0x28ee36[_0x4b47d2(0xb7)][_0x4b47d2(0x378)](),_0x4c4b48[_0x4b47d2(0xaf)](),_0x83475b[_0x4b47d2(0x4ce)](_0x83475b['ALWAYS'],0x1,~0x0),_0x83475b['stencilOp'](_0x83475b[_0x4b47d2(0x25d)],_0x83475b[_0x4b47d2(0x25d)],_0x83475b[_0x4b47d2(0x25d)]),_0x83475b[_0x4b47d2(0x325)](_0x83475b[_0x4b47d2(0x4ca)],_0x83475b[_0x4b47d2(0x17f)]),_0x4c4b48[_0x4b47d2(0x5c0)](_0x28ee36),_0x28ee36[_0x4b47d2(0xb7)][_0x4b47d2(0x378)](),_0x83475b[_0x4b47d2(0x325)](_0x83475b[_0x4b47d2(0x17f)],_0x83475b[_0x4b47d2(0x664)]));}_0x83475b[_0x4b47d2(0x23e)](_0x83475b[_0x4b47d2(0x3f3)]),_0x83475b[_0x4b47d2(0xaf)](_0x83475b['STENCIL_BUFFER_BIT']),_0x83475b[_0x4b47d2(0x1f6)](0x0),_0x28ee36[_0x4b47d2(0xb7)][_0x4b47d2(0x378)]();for(const _0x4fcd46 of this[_0x4b47d2(0x616)]){!_0x4fcd46['_isWindow']&&_0x4fcd46[_0x4b47d2(0x852)]&&_0x4fcd46['render'](_0x28ee36);}_0x28ee36[_0x4b47d2(0xb7)][_0x4b47d2(0x378)]();},DataManager[_0x4e56c8(0x227)]=function(_0x27f465){const _0x21d0b5=_0x4e56c8;return this[_0x21d0b5(0x52d)](_0x27f465)&&_0x27f465[_0x21d0b5(0x1b4)]===0x2;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x150)]=DataManager[_0x4e56c8(0x3db)],DataManager[_0x4e56c8(0x3db)]=function(){const _0x3afef0=_0x4e56c8;VisuMZ[_0x3afef0(0x5b8)][_0x3afef0(0x150)][_0x3afef0(0x410)](this),this[_0x3afef0(0x506)](),this['reserveNewGameCommonEvent']();},DataManager[_0x4e56c8(0x506)]=function(){const _0x2f7f8d=_0x4e56c8;if($gameTemp[_0x2f7f8d(0x6c9)]()){const _0x33f93c=VisuMZ[_0x2f7f8d(0x5b8)][_0x2f7f8d(0x5ce)][_0x2f7f8d(0x2c9)][_0x2f7f8d(0x497)];if(_0x33f93c>0x0)$gameTemp[_0x2f7f8d(0x1f4)](_0x33f93c);}},DataManager[_0x4e56c8(0x6da)]=function(){const _0x3b679b=_0x4e56c8,_0x3276bc=VisuMZ['CoreEngine'][_0x3b679b(0x5ce)][_0x3b679b(0x2c9)][_0x3b679b(0x131)]||0x0;if(_0x3276bc>0x0)$gameTemp[_0x3b679b(0x1f4)](_0x3276bc);},DataManager[_0x4e56c8(0x5f2)]=function(_0x460dd9){const _0x3c3b43=_0x4e56c8,_0x5dbdcd=$dataTroops[_0x460dd9];if(!_0x5dbdcd)return'';let _0x59645b='';_0x59645b+=_0x5dbdcd[_0x3c3b43(0x9f)];for(const _0x523368 of _0x5dbdcd[_0x3c3b43(0x620)]){for(const _0x493abc of _0x523368[_0x3c3b43(0x144)]){[0x6c,0x198][_0x3c3b43(0xd3)](_0x493abc[_0x3c3b43(0x375)])&&(_0x59645b+='\x0a',_0x59645b+=_0x493abc[_0x3c3b43(0xd9)][0x0]);}}return _0x59645b;};function _0x1305(){const _0x5811d6=['vertical','Sprite_Animation_processSoundTimings','filters','_number','OnLoadJS','offset','rgba(0,\x200,\x200,\x201.0)','RepositionEnemies130','LINEAR','RepositionEnemies','add','OutlineColor','isSceneMap','fillText','isGamepadTriggered','AutoScrollLockX','Origin','%1\x0a','\x5c}❪TAB❫\x5c{','textAlign','ShowButtons','originalJS','SEPARATOR','allowShiftScrolling','processKeyboardHome','Rate','onLoad','right','updateOnceParallelInterpreters','focus','ParseEnemyNotetags','WIN_OEM_CLEAR','animations','makeFontSmaller','ExportString','playOk','FadeSpeed','STB','updatePositionCoreEngineShakeOriginal','MAT','MDF','ColorGaugeBack','F20','random','buttonAssistKey%1','PGUP','opacity','_textQueue','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','_scaleX','AccuracyBoost','Window_Base_initialize','RevertPreserveNumbers','exportAllTroopStrings','backgroundBitmap','ScreenShake','CancelText','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','processCursorMove','Scene_Boot_updateDocumentTitle','vert','RequireFocus','isAnimationForEach','INQUAD','setBattleSystem','mainAreaTopSideButtonLayout','ADD','padZero','TextCodeClassNames','CommandList','pageup','_tilemap','Untitled','isSideButtonLayout','systemColor','index','destroy','DashToggleR','moveRelativeToResolutionChange','MAXMP','IconParam3','NameInputMessage','buttonAssistKey4','Sprite_Picture_updateOrigin','SkillMenu','JUNJA','updatePictureCoordinates','levelUpRecovery','OUTBACK','process_VisuMZ_CoreEngine_CustomParameters','%1:\x20Exit\x20','StatusBgType','DTB','_lastY','drawParamName','pressed','paramRate1','TitleCommandList','setActorHome','makeCommandList','Sprite_Gauge_currentValue','loadIconBitmap','maxPictures','toLocaleString','_destroyCanvas','layeredTiles','baseTextRect','_mapY','getControllerInputButtonMatch','%1%2','DimColor2','AutoScrollLockY','width','scrollUp','consumeItem','catchLoadError','_digitGrouping','GameEnd','iconWidth','drawRightArrow','LEFT','Window_NameInput_cursorDown','getLastUsedGamepadType','DOWN','bgsVolume','Unnamed','Input_updateGamepadState','concat','_troopId','isSideView','MCR','updateBgmParameters','scrollRight','INOUTQUINT','GRD','NUMPAD7','switchModes','createTitleButtons','Scene_Map_shouldAutosave','windowPadding','Spriteset_Base_updatePosition','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','If\x20you\x20don\x27t\x20want\x20this\x20option,\x20set\x20Split\x20Escape\x20option\x20back\x20to\x20false.','Sprite_AnimationMV_updatePosition','updateDuration','processEscape','getBattleSystem','_colorCache','ESC','WIN_OEM_AUTO','_gamepadWait','_originalViewport','refreshScrollBarBitmap','isPlaying','xparamFlatJS','Scene_Load','parse','isNwjs','currentLevelExp','isMaskingEnabled','Window_Selectable_processTouch','randomJS','_isButtonHidden','WIN_OEM_BACKTAB','2359938SHsJSX','LUK','Control\x20Variables\x20Script\x20Error','lineHeight','Window_StatusBase_drawActorSimpleStatus','retrieveFauxAnimation','offOpacity','isMagical','ParseSkillNotetags','_context','Game_System_initialize','WIN_OEM_PA3','_inputString','PictureEasingType','drawActorClass','Bitmap_drawTextOutline','eventsXyNt','onInputBannedWords','setActionState','OUTBOUNCE','startNormalGame','centerX','bitmapHeight','EXECUTE','pan','updatePointAnimations','createKeyJS','setupCoreEasing','alphabetic','Game_BattlerBase_refresh','DigitGroupingGaugeSprites','_stored_expGaugeColor2','updateAnglePlus','Game_Unit_onBattleStart','ConvertNumberToString','_forcedBattleGridSystem','GroupDigits','PixelateImageRendering','_scene','MEV','eva','context','DOLLAR','_stored_mpGaugeColor1','_baseSprite','restore','Window_Base_destroyContents','_bgmBuffer','optionsWindowRect','battlebacks1','_action','onKeyDown','textColor','smooth','storeMapData','resetBattleSystem','SideButtons','_rate','drawTextTopAligned','ColorMaxLvGauge1','getLevel','drawBackground','_commonEventLayers','_actorWindow','AudioChangeBgsPan','WIN_OEM_ATTN','paramWidth','_stored_crisisColor','_backSprite','removeAllPointAnimations','updateBgsParameters','VisuMZ_2_BattleSystemSTB','Window_NameInput_cursorPageup','Bitmap_strokeRect','updatePositionCoreEngineShakeRand','CategoryRect','BTB','Scene_Battle_createSpriteset','_cacheScaleY','charAt','battlerHue','Graphics_printError','scaleX','processPointAnimationRequests','img/%1/','altKey','calcCoreEasing','Sprite_Gauge_gaugeRate','ColorSystem','Game_Picture_x','evaded','allTiles','829630MdRbLE','xparamFlat2','setupBattleTestItems','ParseStateNotetags','crisisColor','inBattle','numRepeats','_centerElementCoreEngine','initialBattleSystem','dropItems','current','_anglePlus','MAX_SAFE_INTEGER','<%1\x20%2:[\x20]','removeFauxAnimation','isActiveTpb','xparamRate','Scene_Map_update','isUseModernControls','open','titles1','_lastScrollBarValues','filter','Window_NameInput_processTouch','IconXParam7','checkPassage','executeLoad','PERIOD','WIN_OEM_PA2','areTileShadowsHidden','_targetX','ColorTPGauge2','KeyboardInput','LoadError','Tilemap_addShadow','targetContentsOpacity','resize','makeTargetSprites','visible','slotWindowRect','xparamFlatBonus','wholeDuration','expGaugeColor2','terms','createContents','_skillTypeWindow','split','OutlineColorDmg','NumberBgType','drawGameTitle','maxTp','characters','NUMPAD1','ExportAllTroopText','NON_FRAME','MapNameTextCode','gaugeBackColor','requestMotion','AudioChangeBgsVolume','F11','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','BACK_SLASH','\x0a\x0a\x0a\x0a\x0a','isPreserveTp','_centerElement','mpCostColor','Chance','updatePosition','ParseArmorNotetags','Game_Interpreter_PluginCommand','members','initCoreEasing','Input_clear','pictures','_phase','outlineColor','paramFlatJS','SParamVocab0','_pageupButton','LESS_THAN','2554180EvRXtn','padding','XParamVocab3','Window_Selectable_cursorUp','createTilemap','map','Spriteset_Base_destroy','SCROLLBAR','updateCoreEasing','IconXParam0','resetFontSettings','stypeId','src','IconSParam2','updateSmoothScroll','adjustSprite','printError','MultiKeyFmt','subject','AGI','name','_drawTextShadow','_bitmap','createMenuButton','addEventListener','GoldRect','animationId','ShowActorLevel','maxTurns','isClosed','_mode','updateFrameCoreEngine','repositionEnemiesByResolution','setupTileExtendTerrainTags','processCursorHomeEndTrigger','isRepeated','clear','setCoreEngineUpdateWindowBg','KeyTAB','reduce','Sprite_StateIcon_loadBitmap','BlurStrength','PLUS','Scene_Title','batch','XParamVocab2','Game_Interpreter_command111','Window_MapName_refresh','backspace','OkText','VisuMZ_4_UniqueTileEffects','_buttonType','keyboard','ceil','innerWidth','nw.gui','Basic','onBattleStart','Window_Base_drawFace','ShortcutScripts','ScaleX','targetOpacity','Color','PictureEraseAll','ParamMax','Scene_Base_terminateAnimationClearBugFix','Symbol','BlurFilter','OS_KEY','Game_Picture_scaleY','Location','charCode','includes','processHandling','process_VisuMZ_CoreEngine_ControllerButtons','_tileExtendTerrainTags','repeat','initMembers','parameters','Scene_Skill_create','coreEngineRepositionEnemies','TranslucentOpacity','removeAnimationFromContainer','slice','framesPerChar','changeTileset','TextFmt','Subtitle','win32','Bitmap_resize','SaveMenu','Scene_Map_updateMainMultiply','startMove','_backSprite1','BattleSystem','refreshSpritesetForExtendedTiles','and\x20add\x20it\x20onto\x20this\x20one.','ColorCTGauge1','BannedWords','_scaleY','ZOOM','Game_Actor_isPreserveTp','version','isSceneBattle','updateWaitMode','_stored_hpGaugeColor2','initRotationCoreEngine','SLASH','outlineColorDmg','_addSpotTile','SystemSetSideView','_repositioned','setMoveEasingType','Sprite_Actor_setActorHome','dimColor1','RegExp','Game_Picture_updateMove','addChild','dummyWindowRect','Scene_MenuBase_mainAreaTop','_cacheScaleX','SParamVocab8','helpWindowRect','boxHeight','isCursorMovable','changeTextColor','updateAnchor','ControllerButtons','Game_Interpreter_command122','CRSEL','EREOF','VIEWPORT','gold','paramBase','ButtonFadeSpeed','measureTextWidth','applyEasing','Scene_Unlisted','snapForBackground','updatePositionCoreEngineShakeHorz','_targetScaleX','buttonAssistOffset4','valueOutlineColor','gainItem','INCUBIC','setLastGamepadUsed','createTextState','CTB','WIN_OEM_PA1','_downArrowSprite','framesMin','tileset','BuyBgType','tpGaugeColor2','_text','XParamVocab7','buttonAssistText%1','Window_NameInput_cursorPagedown','_targets','DisplayLockY','updateMove','Game_Picture_calcEasing','Game_Interpreter_command355','getColor','IconXParam3','horz','NewGameCommonEventAll','Mute','_data','bitmap','tpGaugeColor1','process_VisuMZ_CoreEngine_Notetags','xparamRate2','Keyboard','isTileExtended','_targetAnchor','Scene_Item_create','duration','SETTINGS','currentValue','createFauxAnimationQueue','CustomParam','commandWindowRows','MIN_SAFE_INTEGER','_opening','list','F7key','mpGaugeColor2','NUMPAD8','xparamRateJS','%1〘End\x20Choice\x20Selection〙%1','Scene_Menu_create','Game_Map_changeTileset','RIGHT','keys','VariableJsBlock','AMPERSAND','DataManager_setupNewGame','VOLUME_DOWN','Window_Base_drawIcon','REC','faces','bgs','addAnimationSpriteToContainer','createPointAnimationQueue','ParseTilesetNotetags','DigitGroupingLocale','F21','displayY','itemHitImprovedAccuracy','SCALE_MODES','makeCoreEngineCommandList','DebugConsoleLastControllerID','KeySHIFT','buttonAssistOffset%1','OUTQUAD','ColorMaxLvGauge2','makeDocumentTitle','ApplyEasing','endBattlerActions','Bitmap_clearRect','checkSubstitute','_subject','enableDigitGroupingEx','Graphics_defaultStretchMode','SwitchToggleOne','TargetAngle','enabled','atypeId','loadTitle1','ExtractStrFromTroop','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','VisuMZ_1_OptionsCore','playTestShiftR','_goldWindow','_targetOffsetX','ConvertParams','atbActive','savefileInfo','MvAnimationRate','maxScrollY','status','tilesetFlags','Sprite_Button_updateOpacity','ONE','CEV','normalColor','Input_onKeyDown','306425hKIMWC','randomInt','_defaultStretchMode','ForceNoPlayTest','OTB','SkillTypeBgType','Weapon-%1-%2','〘Common\x20Event\x20%1:\x20%2〙\x20End','Game_Actor_levelUp','hpGaugeColor1','isSmartEventCollisionOn','redraw','Window','getLastPluginCommandInterpreter','gameTitle','processKeyboardBackspace','XParameterFormula','_mainSprite','registerCommand','seek','_addShadow','loadTitle2','ExportStrFromAllMaps','Spriteset_Map_createTilemap','_stypeId','Scene_Battle_createCancelButton','ExportAllMapText','setMainFontSize','ShiftR_Toggle','keypress','shouldAutosave','SLEEP','application/json','_changingClass','HOME','ARRAYNUM','currencyUnit','_srcBitmap','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','TextJS','TGR','isGameActive','pixelated','isInputting','ParseActorNotetags','NUMPAD4','F16','$dataMap','PictureFilename','itypeId','CLOSE_BRACKET','drawActorExpGauge','filterArea','playMiss','drawFace','setSideButtonLayout','mapId','Game_Action_itemHit','FINAL','INOUTCIRC','Speed','Center','_stored_tpCostColor','VisuMZ_2_BattleSystemCTB','DATABASE','Scene_Base_createWindowLayer','defaultInputMode','item','advanced','KANA','PLAY','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','Duration','processKeyboardDelete','setupFont','StartID','_statusWindow','buttonAreaHeight','GoldBgType','loadBitmap','_stored_mpCostColor','Window_NumberInput_start','QUOTE','subtitle','skillId','playEscape','_sellWindow','drawParamText','EditBgType','zoomScale','Scene_TitleTransition','PRESERVCONVERSION(%1)','updateClose','Scene_MenuBase_helpAreaTop','setValue','_stored_maxLvGaugeColor1','OPEN_CURLY_BRACKET','_stored_systemColor','0.00','onerror','_opacity','AudioChangeBgsPitch','height','Sprite_Picture_loadBitmap','ItemHeight','_animation','Manual','sparamRate2','titleCommandWindow','Game_Interpreter_updateWaitMode','_itemWindow','Bitmap_initialize','_shakeDuration','reserveCommonEvent','isBottomHelpMode','clearStencil','_updateGamepadState','CheckSplitEscape','evade','Game_Picture_initRotation','fadeSpeed','Game_Picture_angle','SystemLoadImages','F13','SellRect','setCoreEngineScreenShakeStyle','Version','EncounterRateMinimum','runCombinedScrollingTextAsCode','LevelUpFullHp','SwitchToggleRange','keyMapper','GoldMax','F6key','ValueJS','updateKeyText','shake','PictureCoordinatesMode','_tempActor','updatePictureAntiZoom','isCancelled','BattleManager_invokeCounterAttack','CrisisRate','buttonAssistKey1','Scene_GameEnd_createBackground','drawGameVersion','_pictureCoordinatesMode','isLoopVertical','_stored_mpGaugeColor2','IconXParam5','repositionCancelButtonSideButtonLayout','#%1','AntiZoomPictures','ButtonAssist','isTpb','doesNameContainBannedWords','EQUAL','pow','updatePositionCoreEngineShakeVert','battleSystem','bind','ColorCTGauge2','buttonAssistCancel','traitsPi','isKeyItem','Game_Screen_initialize','pos','displayX','_fauxAnimationQueue','traitObjects','Renderer','paramRateJS','IconSParam0','lastAnimationSprite','params','drawActorSimpleStatus','_slotWindow','ScreenResolution','cursorRight','Input_shouldPreventDefault','PositionY','getKeyboardInputButtonString','isScrollBarVisible','_iconIndex','(\x5cd+)>','hasEncryptedImages','Plus','disable','updateMotion','createTileExtendSprites','powerDownColor','_shiftY','createButtonAssistWindow','forceStencil','_balloonQueue','EnableNumberInput','Window_StatusBase_drawActorLevel','paramchangeTextColor','font','loadTileBitmap','processBack','Max','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','process_VisuMZ_CoreEngine_RegExp','SParamVocab2','Sprite_Battler_startMove','meVolume','skills','Scene_Title_drawGameTitle','onKeyDownKeysF6F7','_cancelButton','Padding','IconParam2','scrollbarHeight','buttonAssistWindowButtonRect','toUpperCase','updateCurrentEvent','pictureButtons','REPLACE','categoryWindowRect','_battlerName','scaleY','setBackgroundOpacity','destroyContents','round','_hp','offColor','Window_Selectable_drawBackgroundRect','createCancelButton','SParamVocab3','DummyBgType','isLoopHorizontal','cancel','_inputSpecialKeyCode','processSoundTimings','paramFlat','stringKeyMap','_coreEasing','loadBitmapCoreEngine','_pauseSignSprite','ExportStrFromAllTroops','OUTCIRC','updatePositionCoreEngine','animationBaseDelay','drawItem','BACKSPACE','DetachMapPictureContainer','XParamVocab8','DEF','isBottomButtonMode','_targetOpacity','enemy','paramPlusJS','MAXHP','NUMPAD0','getInputButtonString','Game_Picture_y','adjustY','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','GetParamIcon','type','Map%1','mainCommandWidth','END','setup','ColorPowerUp','command105','_tileSprite','updateData','seVolume','SideView','_screenY','_pressed','_spriteset','loadPicture','_muteSound','sparamPlus2','_forcedBattleSys','scaleSprite','numberShowButton','Scene_Map_initialize','command111','drawIcon','none','IconXParam2','dashToggle','_viewportSize','Troop%1','_patternHeight','_offsetX','learnings','updatePictureSettings','setHandler','targetObjects','Input_update','markCoreEngineModified','updateLastTarget','getCoreEngineScreenShakeStyle','gainSilentTp','target','subjectHitRate','Window_TitleCommand_selectLast','wtypeId','isOptionValid','_movementWholeDuration','_clickHandler','SlotRect','drawCircle','Param','save','Window_Base_drawCharacter','ARRAYSTR','_moveEasingType','CNT','initCoreEngineScreenShake','EXCLAMATION','CLOSE_PAREN','isNormalPriority','_coreEasingType','_baseTexture','_buttonAssistWindow','_mapX','areButtonsOutsideMainUI','HIT','VisuMZ_2_BattleSystemPTB','changeAnglePlusData','QoL','_width','playCursor','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ActorHPColor','WIN_OEM_FJ_ROYA','mpGaugeColor1','_optionsWindow','setupScrollBarBitmap','clamp','hideButtonFromView','Rate2','Spriteset_Base_update','clearOnceParallelInterpreters','moveMenuButtonSideButtonLayout','log','AudioChangeBgmVolume','Game_Action_itemEva','MRF','drawGauge','initRotation','SParamVocab5','forceOutOfPlaytest','clearTp','constructor','isGamepadButtonPressed','Scene_Boot_startNormalGame','_drawTextOutline','ColorPowerDown','IconSParam9','KEEP','remove','Plus2','fontSize','Window_ShopSell_isEnabled','paramPlus','getButtonAssistLocation','INSERT','needsUpdate','_timeDuration','1eAXhvV','_lastCommandSymbol','command122','applyEasingAnglePlus','initCoreEngine','Name','HANJA','F22','updateScrollBarPosition','initialLevel','gaugeHeight','targetEvaRate','get','ENTER','Scene_Boot_loadSystemImages','Game_Interpreter_command105','_menuButton','onActorChange','ColorHPGauge1','BackOpacity','drawGameSubtitle','DamageColor','bitmapWidth','PDR','helpAreaHeight','COLON','buttonAssistOffset2','offsetX','OPEN_BRACKET','PictureID','Graphics','setViewportCoreEngineFix','tpColor','updateEffekseer','targetBackOpacity','blt','targetX','isEnabled','setBackgroundType','events','CIRCUMFLEX','([\x5c+\x5c-]\x5cd+)>','setTileFrame','Window_NameInput_refresh','skillTypeWindowRect','DisplayedParams','checkCacheKey','Spriteset_Battle_createEnemies','IconParam7','CtrlQuickLoad','length','down','blendFunc','buyWindowRect','setTargetAnchor','alignBottom','isArrowPressed','Scene_Boot_onDatabaseLoaded','transform','DurationPerChat','Window_NameInput_cursorRight','_currentMap','scrollX','sceneTerminationClearEffects','buttonAssistOffset5','calcEasing','Game_Picture_updateRotation','Game_Map_scrollLeft','keyRepeatWait','playBuzzer','isAutoColorAffected','_mirror','mainAreaHeightSideButtonLayout','F18','isGamepadConnected','Window_NameInput_cursorUp','prepareNextScene','NUMPAD6','_commandList','setLastPluginCommandInterpreter','Scene_Base_terminate','createPointAnimationSprite','FTB','initButtonHidden','imageSmoothingEnabled','removeChild','_registerKeyInput','_stored_tpGaugeColor2','TAB','Game_Actor_paramBase','MODECHANGE','_customModified','processCursorMoveModernControls','processTouch','_clientArea','select','exit','_editWindow','description','_coreEngineShakeStyle','sv_enemies','drawText','Flat','faceHeight','toString','_upArrowSprite','process_VisuMZ_CoreEngine_Functions','Exported_Script_%1.txt','onMoveEnd','GoldIcon','drawIconBySize','processDigitChange','param','scrollLeft','isOpen','buttonAssistText3','loadTileset','NEAREST','isPointAnimationPlaying','_eventId','scaleMode','BoxMargin','_playtestF7Looping','PA1','usableSkills','iconHeight','TextStr','VOLUME_MUTE','CustomParamType','createPageButtons','isPressed','Conditional\x20Branch\x20Script\x20Error','code','textWidth','endAction','flush','_windowskin','InputRect','setSize','_buyWindow','globalAlpha','textBaseline','maxHorz','EQUALS','HRG','TitlePicButtons','paramValueByName','volume','top','VisuMZ_1_BattleCore','process_VisuMZ_CoreEngine_Settings','PERCENT','findSymbol','IconSParam1','defineProperty','setTopRow','_commandWindow','nickname','optSideView','Game_Map_setup','_refreshPauseSign','PRINTSCREEN','MaxDuration','ActorBgType','DigitGroupingDamageSprites','addCommand','Game_Action_setAttack','EVA','_dummyWindow','consumable','playBgm','recoverAll','Window_Scrollable_update','isHandled','Graphics_centerElement','drawing','EditRect','IDs','IconXParam8','rowSpacing','_CoreEngineSettings','getInputMultiButtonStrings','mhp','makeFontBigger','_inputWindow','getTileExtendTerrainTags','BarBodyColor','getParameter','resetTextColor','IconSet','setupButtonImage','outlineColorGauge','_timerSprite','onBattleEnd','updateScrollBarVisibility','_mp','_onKeyDown','NUM_LOCK','KeyItemProtect','_textPopupWindow','titles2','create','TPB\x20WAIT','FDR','Scene_Shop_create','ARRAYEVAL','Game_Party_consumeItem','XParamVocab1','position','setCommonEvent','centerCameraCheckData','ItemRect','enableDigitGrouping','active','createSpriteset','(\x5cd+\x5c.?\x5cd+)>','Window_Selectable_itemRect','CorrectSkinBleeding','BarThickness','DOUBLE_QUOTE','command355','TPB\x20ACTIVE','isExpGaugeDrawn','processTouchModernControls','clone','damageColor','levelUp','processKeyboardHandling','showPointAnimations','ARRAYJSON','_blank','INOUTCUBIC','style','F15','setupNewGame','string','ALT','option','maxScrollX','_url','centerSprite','ExtractStrFromList','OPEN_PAREN','PositionX','waiting','_lastPluginCommandInterpreter','Window_NameInput_initialize','Tilemap_addSpotTile','destroyScrollBarBitmaps','_targetOffsetY','BTestArmors','2601120iNCUsc','SwitchActorText','Opacity','canUse','itemEva','numberWindowRect','sparamFlat2','STENCIL_TEST','ACCEPT','MapOnceParallel','CTRL','Game_Action_updateLastTarget','IconParam1','up2','asin','ColorMPGauge2','Scene_Battle_createSpritesetFix','_stored_deathColor','gradientFillRect','HASH','blockWidth','animationShouldMirror','updateFrame','VariableEvalReference','buttonAssistSwitch','LevelUpFullMp','isInstanceOfSceneMap','BKSP','loadGameImagesCoreEngine','guardSkillId','SParameterFormula','drawCharacter','NONCONVERT','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','removePointAnimation','STR','call','ParseAllNotetags','WIN_OEM_FJ_JISHO','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','_pictureCoordinatesWindow','isNextScene','_storedStack','BattleManager_checkSubstitute','Game_Troop_setup','INCIRC','OUTELASTIC','etypeId','setAttack','_duration','WASD','_bgsBuffer','F23','_image','dimColor2','ImprovedAccuracySystem','createPointAnimation','fillRect','integer','SCROLL_LOCK','XParamVocab9','EVAL','DECIMAL','_stored_pendingColor','loading','_hovered','NUMPAD9','ERROR!\x0a\x0aCore\x20Engine\x20>\x20Plugin\x20Parameters\x20>\x20Button\x20Assist\x20>\x20Split\x20Escape\x0a\x0a','Game_Picture_show','deselect','Pixelated','buttonAssistKey3','terminate','_tile','_movementDuration','updateText','HELP','WIN_OEM_COPY','_effectsContainer','applyForcedGameTroopSettingsCoreEngine','Scene_Map_createSpriteset','itemRect','setEnemyAction','MDR','maxCols','Scene_Name_onInputOk','setDisplayPos','Wait','SubfolderParse','DEFAULT_SHIFT_Y','process_VisuMZ_CoreEngine_jsQuickFunctions','StatusRect','URL','checkSmartEventCollision','CustomParamIcons','Game_Picture_move','SceneManager_initialize','Window_NameInput_processHandling','Sprite_StateIcon_updateFrame','loadMapData','VisuMZ_2_BattleSystemFTB','windowOpacity','drawValue','_numberWindow','OUTSINE','itemSuccessRate','text','faceWidth','EscapeAlways','scrollY','yScrollLinkedOffset','cursorUp','updatePlayTestF7','ETB','deflate','SPACE','Smooth','child_process','requestPointAnimation','(\x5cd+)([%％])>','_bypassCanCounterCheck','scrollbar','isRightInputMode','xparam','_displayedPassageError','playTestF6','endAnimation','PAUSE','PTB','updateDashToggle','ActorRect','StatusEquipBgType','standardIconHeight','toLowerCase','saveViewport','XParamVocab0','Plus1','CommandBgType','PositionJS','measureTextWidthNoRounding','targetScaleY','activate','onload','popScene','note','getCombinedScrollingText','targets','Page','ShiftT_Toggle','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','loadSystem','Spriteset_Base_isAnimationPlaying','SystemLoadAudio','NoTileShadows','》Comment《\x0a%1\x0a','catchUnknownError','framesMax','_pointAnimationSprites','nextLevelExp','system','editWindowRect','object','indexOf','PIPE','FontShadows','xparamFlat1','startAnimation','Window_NameInput_cursorLeft','tab','Game_Picture_scaleX','horzJS','NewGameCommonEvent','Flat2','removeAnimation','makeInputButtonString','_lastIconIndex','arePageButtonsEnabled','Window_refreshBack','targetScaleX','alpha','targetY','buttonY','_lastGamepad','OptionsRect','Gold','pagedown','centerY','useDigitGroupingEx','_stored_powerDownColor','X:\x20%1','buttonAssistOffset1','_realScale','Game_Event_start','animationNextDelay','boxWidth','EnableNameInput','Mirror','mainFontSize','ShowJS','QwertyLayout','addLoadListener','ProfileRect','Game_Unit_onBattleEnd','initDigitGrouping','setupCoreEngine','INOUTBOUNCE','LineHeight','DigitGroupingExText','_colorTone','cancelShowButton','Layer','isMenuButtonAssistEnabled','destroyCoreEngineMarkedBitmaps','ctGaugeColor2','isCollidedWithEvents','itemLineRect','currentExp','_closing','_createInternalTextures','INQUINT','IconSParam3','ItemBackColor1','ZERO','cursorPagedown','ColorHPGauge2','VisuMZ_2_BattleSystemOTB','stencilFunc','createEnemies','_targetY','EnableJS','itemBackColor1','QUESTION_MARK','PHA','ParamChange','Window_Base_update','text%1','scale','COMMA','VisuMZ_2_BattleSystemETB','ParseClassNotetags','VOLUME_UP','smoothSelect','setMute','buttonAssistOk','_storedMapText','isFauxAnimationPlaying','isActor','StateIconsNonFrame','_stored_ctGaugeColor1','Upper\x20Left','parseForcedGameTroopSettingsCoreEngine','itemHit','selectLast','gaugeLineHeight','processFauxAnimationRequests','removeTileExtendSprites','_lastX','Sprite_Button_initialize','_saveFileID','createWindowLayer','_pollGamepads','numActions','showFauxAnimations','Show\x20Scrolling\x20Text\x20Script\x20Error','isEventTest','updateScene','WIN_OEM_CUSEL','determineSideButtonLayoutValid','invokeCounterAttack','_backSprite2','textSizeEx','setSideView','isEventRunning','ShowItemBackground','_shakePower','_hideButtons','ExtractStrFromMap','refresh','image-rendering','MAX_GL_TEXTURES','sparam','_margin','reservePlayTestNewGameCommonEvent','useFontWidthFix','scrollDown','ParseItemNotetags','AudioChangeBgmPitch','Abbreviation','sparamFlatJS','addOnceParallelInterpreter','SceneManager_exit','updateOpacity','prototype','isItemStyle','join','maxLevel','paramRate','home','AnimationPoint','sparamFlatBonus','overrideMimeType','trim','actorWindowRect','OffBarColor','createFauxAnimationSprite','updateMain','_pointAnimationQueue','keyCode','pictureId','applyCoreEasing','overallHeight','onEscapeSuccess','INOUTSINE','addChildToBack','WIN_ICO_00','BattleManager_processEscape','DigitGroupingStandardText','fromCharCode','_stored_maxLvGaugeColor2','_list','isGamepadAxisMoved','isItem','INELASTIC','Total','_internalTextures','processKeyboardEnd','itemPadding','changeClass','getCustomBackgroundSettings','Game_Actor_changeClass','SnapshotOpacity','Match','initBasic','default','Scene_SingleLoadTransition','_actor','AllTroops','_offsetY','max','getColorDataFromPluginParameters','_statusEquipWindow','processDrawIcon','deathColor','cursorDown','actor','buttons','Window_Selectable_cursorDown','CustomParamAbb','initVisuMZCoreEngine','getGamepads','sin','enter','adjustBoxSize','ScaleY','ColorMPGauge1','contains','setClickHandler','font-smooth','isTriggered','ASTERISK','innerHeight','TextManager_param','SwitchRandomizeRange','Game_Map_scrollDown','maxBattleMembers','key%1','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','_helpWindow','isBusy','OUTEXPO','useDigitGrouping','RightMenus','Window_Base_createTextState','_encounterCount','processAlwaysEscape','tilesetNames','CategoryBgType','listWindowRect','WIN_OEM_JUMP','setGuard','ModernControls','F19','setupValueFont','loadWindowskin','DisplayLockX','drawTextEx','platform','OffBarOpacity','setEvent','_scrollDuration','GoldChange','loadSystemImages','createDigits','PageChange','EndingID','MinDuration','_onError','stop','Title','SwitchRandomizeOne','EXSEL','exp','isNumpadPressed','_backgroundFilter','movePageButtonSideButtonLayout','RepositionActors','WindowLayer_render','helpAreaTopSideButtonLayout','equips','%2%1%3','maxGold','normal','mainAreaHeight','_stored_gaugeBackColor','CreateBattleSystemID','catchException','TimeProgress','Game_Map_scrollUp','Scene_Battle_createSpriteset_detach','_maxDigits','buttonAssistText1','removeOnceParallelInterpreter','ShowDevTools','BTestWeapons','showIncompleteTilesetError','maxItems','VisuMZ_3_EventChainReact','MenuLayout','exportAllMapStrings','value','createBackground','ActorMPColor','start','Sprite_AnimationMV_processTimingData','WIN_ICO_HELP','HelpBgType','ATK','isAnimationOffsetXMirrored','operand','Scene_Map_updateScene','xScrollLinkedOffset','3Gchigg','WIN_OEM_FJ_MASSHOU','SEMICOLON','Game_Map_setDisplayPos','isSpecialCode','StatusParamsRect','FunctionName','Scene_MenuBase_mainAreaHeight','_pictureName','UNDERSCORE','GREATER_THAN','PictureShowIcon','EXR','GoldOverlap','update','responseText','layoutSettings','result','XParamVocab5','CoreEngine','picture','_onceParallelInterpreters','bgmVolume','ItemBackColor2','GoldFontSize','ParseWeaponNotetags','isClosing','render','RPGMAKER_VERSION','_startPlaying','isWindowMaskingEnabled','_listWindow','_displayX','PreserveNumbers','Sprite_destroy','contentsOpacity','push','FUNC','backOpacity','Flat1','Finish','Settings','pendingColor','_allTextHeight','Bitmap_drawText','3533952apebWt','displayName','IconIndex','isMapScrollLinked','quit','requestFauxAnimation','valueOutlineWidth','ctrlKey','paramY','BattleManager_update','IconXParam9','updateBattleVariables','ControllerMatches','baseId','_currentBgs','Scene_Map_createSpriteset_detach','getControllerInputButtonString','Scene_Base_create','setWindowPadding','initialize','maxScrollbar','onDatabaseLoaded','makeDeepCopy','F10','Bitmap_fillRect','level','_scrollBarHorz','axes','sv_actors','tileHeight','paramMax','ColSpacing','createTroopNote','setHome','SceneManager_isGameActive','_centerCameraCheck','deactivate','startAutoNewGame','isMVAnimation','strokeRect','CallHandlerJS','original','cursorLeft','contentsBack','keys\x20for\x20both\x20\x22cancel\x22\x20and\x20\x22menu\x22!\x0a\x0a','_isPlaytest','windowRect','currentClass','encounterStepsMinimum','processTimingData','updateDocumentTitle','_destroyInternalTextures','turn','successRate','abs','Input_setupEventHandlers','match','_scrollBarVert','Game_Map_scrollRight','sparamFlat1','onNameOk','onlyfilename','sparamPlus1','isAlive','FontSmoothing','setAction','missed','textHeight','children','CommandWidth','ColorCrisis','ButtonHeight','areButtonsHidden','【%1】\x0a','shift','getPointAnimationLayer','_index','move','pages','INQUART','INBACK','Scene_Map_updateMain','setColorTone','checkCoreEngineDisplayCenter','refreshActor','_dimmerSprite','command357','drawAllParams','exec','1176010HARGiI','openingSpeed','pitch','createPointAnimationTargets','_active','Linear','CLOSE_CURLY_BRACKET','Window_SkillList_includes','updateShadow','clearForcedGameTroopSettingsCoreEngine','inbounce','ColorMPCost','BaseTexture','itemHeight','DELETE','TCR','_shakeSpeed','paramMaxJS','setAnchor','Type','moveCancelButtonSideButtonLayout','AllMaps','nah','_startLoading','onButtonImageLoad','_onLoad','SParamVocab7','_fauxAnimationSprites','Window_EquipItem_isEnabled','ExportCurTroopText','setupCustomRateCoreEngine','replace','button','_makeFontNameText','EISU','openness','VisuMZ_2_BattleSystemBTB','refreshWithTextCodeSupport','onXhrError','easingType','floor','stretch','jsQuickFunc','playLoad','_refreshBack','_startDecrypting','parallaxes','mainAreaTop','_texture','updateFauxAnimations','%1〘Choice\x20Cancel〙%1','_anchor','setFrame','_sideButtonLayout','mute','measureText','overallWidth','ONE_MINUS_SRC_ALPHA','vertJS','menu','updateOpen','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','xparamRate1','attackSkillId','Bitmap_blt','goldWindowRect','Input_pollGamepads','sellWindowRect','ALTGR','TRG','profileWindowRect','colSpacing','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','Scene_Equip_create','addQueue','createCommandWindow','Actor-%1-%2','sparamRate1','_animationSprites','paramName','left','getBackgroundOpacity','Scene_Options_create','CustomParamNames','buttonAssistText4','RowSpacing','clearCachedKeys','_pagedownButton','TextPopupShow','AudioChangeBgmPan','WIN_OEM_FJ_LOYA','IconXParam6','battlebacks2','DummyRect','NewGameBoot','INOUTQUAD','buttonAssistText2','ColorManager_loadWindowskin','playTestShiftT','Window_Selectable_processCursorMove','setSkill','expGaugeColor1','outbounce','drawBackgroundRect','F17','checkScrollBarBitmap','Bitmap_measureTextWidth','retrievePointAnimation','198lOJOBw','playCursorSound','DimColor1','drawGoldItemStyle','expRate','ColorExpGauge2','angle','WIN_OEM_RESET','Bitmap_gradientFillRect','adjustPictureAntiZoom','HelpRect','ParamArrow','addWindow','XParamVocab4','enemies','worldTransform','min','playTestF7','Scene_MenuBase_createCancelButton','commandWindowRect','alwaysDash','UpdatePictureCoordinates','updateMainMultiply','_tileExtendSprites','ExtDisplayedParams','JSON','_categoryWindow','_playTestFastMode','CommandRect','tilesets','setEasingType','SplitEscape','xparamPlus1','Sprite_Animation_setViewport','buttonAssistKey5','playBgs','BgFilename2','number','sqrt','statusWindowRect','pagedownShowButton','OpenConsole','PictureRotate','adjustX','cursorPageup','show','processKeyboardDigitChange','buttonAssistKey2','anchor','MRG','isPlaytest','wait','contents','ColorDeath','Game_Character_processMoveCommand','removeAllFauxAnimations','createJsQuickFunction','_pictureContainer','_backgroundSprite','_hideTileShadows','F24','format','BACK_QUOTE','IconXParam1','Bitmap_drawCircle','_currentBgm','onInputOk','reserveNewGameCommonEvent','createCustomParameter','createBuffer','_cache','requiredWtypeId1','isOpening','background','_origin','clearRect','ColorTPGauge1','apply','ItemMenu','_windowLayer','createSubSprite','DetachBattlePictureContainer','onClick','createFauxAnimation','ListRect','buttonAssistOffset3','Item-%1-%2','AnimationID','_forcedTroopView','thickness','updatePadding','_profileWindow','ATTN','maxVisibleItems','CRI','ShopMenu','_stored_ctGaugeColor2','isTouchedInsideFrame','Rate1','Scene_Battle_update','ItemBgType','createScrollBarSprites','updateBackOpacity','playtestQuickLoad','updateScrollBars','smallParamFontSize','NUMPAD5','maxLvGaugeColor2','enable','escape','DETACH_PICTURE_CONTAINER','_onKeyPress','setupRate','erasePicture','maxLvGaugeColor1','_loadingState','_displayY','StatusParamsBgType','BottomHelp','F14','playOnceParallelInterpreter','CommonEventID','toFixed','mirror','FontSize','〘Common\x20Event\x20%1:\x20%2〙\x20Start','center','connected','tileWidth','Class-%1-%2','_smooth','processMoveCommand','showPicture','Scene_Map_createSpritesetFix','xparamPlus2','anglePlus','hit','isMaxLevel','targetSpritePosition','IconSParam8','framebuffer','_statusParamsWindow','paintOpacity','setActorHomeRepositioned','INOUTQUART','Window_Gold_refresh','paramBaseAboveLevel99','updateOrigin','hide'];_0x1305=function(){return _0x5811d6;};return _0x1305();}(VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)][_0x4e56c8(0x2c9)][_0x4e56c8(0xc6)]??!![])&&($scene=null,VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5e3)]=Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x3ba)],Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x3ba)]=function(){const _0x3d010f=_0x4e56c8;VisuMZ[_0x3d010f(0x5b8)]['Scene_Base_create'][_0x3d010f(0x410)](this),$scene=this;},$spriteset=null,VisuMZ['CoreEngine'][_0x4e56c8(0x43c)]=Scene_Map[_0x4e56c8(0x510)][_0x4e56c8(0x3c7)],Scene_Map['prototype'][_0x4e56c8(0x3c7)]=function(){const _0xc803fc=_0x4e56c8;VisuMZ[_0xc803fc(0x5b8)][_0xc803fc(0x43c)]['call'](this),$spriteset=this[_0xc803fc(0x294)];},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x81d)]=Scene_Battle[_0x4e56c8(0x510)][_0x4e56c8(0x3c7)],Scene_Battle[_0x4e56c8(0x510)][_0x4e56c8(0x3c7)]=function(){const _0x244ec6=_0x4e56c8;VisuMZ[_0x244ec6(0x5b8)]['Scene_Battle_createSpriteset'][_0x244ec6(0x410)](this),$spriteset=this[_0x244ec6(0x294)];},VisuMZ['CoreEngine'][_0x4e56c8(0x341)]=Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x434)],Scene_Base['prototype'][_0x4e56c8(0x434)]=function(){const _0x52ee47=_0x4e56c8;VisuMZ[_0x52ee47(0x5b8)][_0x52ee47(0x341)][_0x52ee47(0x410)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine']['BattleManager_update']=BattleManager[_0x4e56c8(0x5b3)],BattleManager[_0x4e56c8(0x5b3)]=function(_0x40b3c8){const _0x26ba2a=_0x4e56c8;VisuMZ['CoreEngine'][_0x26ba2a(0x5db)][_0x26ba2a(0x410)](this,_0x40b3c8),this[_0x26ba2a(0x5dd)]();},BattleManager[_0x4e56c8(0x5dd)]=function(){const _0x2f3ae6=_0x4e56c8;$subject=this['_subject'],$targets=this[_0x2f3ae6(0x129)],$target=this['_target']||this['_targets'][0x0];},$event=null,VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x4ac)]=Game_Event[_0x4e56c8(0x510)][_0x4e56c8(0x59c)],Game_Event[_0x4e56c8(0x510)][_0x4e56c8(0x59c)]=function(){const _0x4b49e0=_0x4e56c8;VisuMZ[_0x4b49e0(0x5b8)]['Game_Event_start'][_0x4b49e0(0x410)](this),$event=this;},VisuMZ['CoreEngine']['Scene_Map_update']=Scene_Map['prototype'][_0x4e56c8(0x5b3)],Scene_Map[_0x4e56c8(0x510)][_0x4e56c8(0x5b3)]=function(){const _0x3fef69=_0x4e56c8;VisuMZ[_0x3fef69(0x5b8)][_0x3fef69(0x83d)]['call'](this),$gameMap['updateCurrentEvent']();},Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x25b)]=function(){const _0x564041=_0x4e56c8;!this[_0x564041(0x4fc)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x380ac0){const _0x9e97b7=_0x4e56c8;if($gameTemp)$gameTemp[_0x9e97b7(0x1f4)](_0x380ac0);});;$onceParallel=function(_0x4a47c7,_0x19c451){const _0x16458e=_0x4e56c8;if(SceneManager['isSceneMap']())SceneManager['_scene'][_0x16458e(0x70f)](_0x4a47c7,_0x19c451);else{if(SceneManager[_0x16458e(0xf2)]()){if(Imported[_0x16458e(0x386)])SceneManager['_scene'][_0x16458e(0x70f)](_0x4a47c7);else $gameTemp&&$gameTemp[_0x16458e(0x6c9)]()&&alert('Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!');}else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x16458e(0x172));}},StorageManager['jsonToZip']=function(_0x3c47e4){return new Promise((_0x5aac81,_0x3da816)=>{const _0x3d4b4f=_0x521a;try{const _0x141538=pako[_0x3d4b4f(0x45e)](_0x3c47e4,{'to':_0x3d4b4f(0x3dc),'level':0x1});if(_0x141538[_0x3d4b4f(0x323)]>=0xc350){}_0x5aac81(_0x141538);}catch(_0x134790){_0x3da816(_0x134790);}});},TextManager[_0x4e56c8(0x26f)]=['','','','CANCEL','','',_0x4e56c8(0x438),'',_0x4e56c8(0x278),_0x4e56c8(0x349),'','','CLEAR',_0x4e56c8(0x2fe),'ENTER_SPECIAL','','SHIFT',_0x4e56c8(0x3f6),_0x4e56c8(0x3dd),_0x4e56c8(0x46b),'CAPSLOCK',_0x4e56c8(0x1c8),_0x4e56c8(0x64d),_0x4e56c8(0x781),_0x4e56c8(0x1bd),_0x4e56c8(0x2f7),'',_0x4e56c8(0x7c0),'CONVERT',_0x4e56c8(0x40c),_0x4e56c8(0x3f4),_0x4e56c8(0x34b),_0x4e56c8(0x45f),_0x4e56c8(0x759),'PGDN',_0x4e56c8(0x28a),_0x4e56c8(0x1a5),_0x4e56c8(0x7a4),'UP','RIGHT',_0x4e56c8(0x7a7),'SELECT','PRINT',_0x4e56c8(0x7e7),_0x4e56c8(0x392),_0x4e56c8(0x2ee),_0x4e56c8(0x639),'','0','1','2','3','4','5','6','7','8','9',_0x4e56c8(0x30a),'SEMICOLON',_0x4e56c8(0x8a),_0x4e56c8(0x380),_0x4e56c8(0x5af),_0x4e56c8(0x4d3),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x4e56c8(0xcf),'','CONTEXT_MENU','',_0x4e56c8(0x1a2),_0x4e56c8(0x281),_0x4e56c8(0x6f),'NUMPAD2','NUMPAD3',_0x4e56c8(0x1b0),_0x4e56c8(0x701),_0x4e56c8(0x33e),_0x4e56c8(0x7b3),_0x4e56c8(0x147),_0x4e56c8(0x42e),'MULTIPLY',_0x4e56c8(0x76e),_0x4e56c8(0x742),'SUBTRACT',_0x4e56c8(0x42a),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x4e56c8(0x5e9),_0x4e56c8(0x76),'F12',_0x4e56c8(0x1fe),_0x4e56c8(0x70e),_0x4e56c8(0x3da),_0x4e56c8(0x1b1),_0x4e56c8(0x693),_0x4e56c8(0x33a),_0x4e56c8(0x569),_0x4e56c8(0x756),_0x4e56c8(0x15a),_0x4e56c8(0x2f8),_0x4e56c8(0x420),_0x4e56c8(0x6d3),'','','','','','','','',_0x4e56c8(0x3b6),_0x4e56c8(0x427),_0x4e56c8(0x412),_0x4e56c8(0x5a6),'WIN_OEM_FJ_TOUROKU',_0x4e56c8(0x685),_0x4e56c8(0x2ce),'','','','','','','','','',_0x4e56c8(0x319),_0x4e56c8(0x2be),_0x4e56c8(0x3cc),_0x4e56c8(0x3ff),_0x4e56c8(0x7fa),_0x4e56c8(0x388),_0x4e56c8(0x14f),_0x4e56c8(0x5ae),_0x4e56c8(0x3e3),_0x4e56c8(0x2bf),_0x4e56c8(0x553),_0x4e56c8(0xb5),_0x4e56c8(0x48f),'HYPHEN_MINUS',_0x4e56c8(0x1e3),_0x4e56c8(0x631),'TILDE','','','','',_0x4e56c8(0x370),_0x4e56c8(0x151),_0x4e56c8(0x4dc),'','',_0x4e56c8(0x5a7),_0x4e56c8(0x380),_0x4e56c8(0x4d9),'MINUS',_0x4e56c8(0x847),_0x4e56c8(0xf6),_0x4e56c8(0x6d5),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x4e56c8(0x30d),_0x4e56c8(0x78),_0x4e56c8(0x1b5),_0x4e56c8(0x1d5),'','META',_0x4e56c8(0x66f),'',_0x4e56c8(0x59e),_0x4e56c8(0x526),'','WIN_ICO_CLEAR','','',_0x4e56c8(0x69e),_0x4e56c8(0x566),_0x4e56c8(0x11f),_0x4e56c8(0x848),_0x4e56c8(0x7db),'WIN_OEM_WSCTRL',_0x4e56c8(0x4f6),_0x4e56c8(0x811),'WIN_OEM_FINISH',_0x4e56c8(0x439),_0x4e56c8(0x7c1),'WIN_OEM_ENLW',_0x4e56c8(0x7cf),_0x4e56c8(0x6f3),_0x4e56c8(0x10c),_0x4e56c8(0x57c),_0x4e56c8(0x10d),_0x4e56c8(0x1c9),_0x4e56c8(0xef),'',_0x4e56c8(0x36c),_0x4e56c8(0x74b),''],TextManager['buttonAssistOk']=VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)][_0x4e56c8(0x21c)][_0x4e56c8(0xbc)],TextManager['buttonAssistCancel']=VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)][_0x4e56c8(0x21c)][_0x4e56c8(0x764)],TextManager[_0x4e56c8(0x404)]=VisuMZ['CoreEngine'][_0x4e56c8(0x5ce)][_0x4e56c8(0x21c)][_0x4e56c8(0x3ed)],VisuMZ['CoreEngine'][_0x4e56c8(0x555)]=TextManager[_0x4e56c8(0x361)],TextManager['param']=function(_0x12ea89){const _0x581943=_0x4e56c8;return typeof _0x12ea89===_0x581943(0x6bc)?VisuMZ[_0x581943(0x5b8)][_0x581943(0x555)][_0x581943(0x410)](this,_0x12ea89):this[_0x581943(0x67a)](_0x12ea89);},TextManager[_0x4e56c8(0x67a)]=function(_0x42f670){const _0x55c236=_0x4e56c8;_0x42f670=String(_0x42f670||'')[_0x55c236(0x25a)]();const _0x403c40=VisuMZ['CoreEngine'][_0x55c236(0x5ce)][_0x55c236(0x2b7)];if(_0x42f670===_0x55c236(0x280))return $dataSystem[_0x55c236(0x857)]['params'][0x0];if(_0x42f670===_0x55c236(0x77b))return $dataSystem['terms'][_0x55c236(0x231)][0x1];if(_0x42f670==='ATK')return $dataSystem[_0x55c236(0x857)]['params'][0x2];if(_0x42f670===_0x55c236(0x27b))return $dataSystem[_0x55c236(0x857)][_0x55c236(0x231)][0x3];if(_0x42f670===_0x55c236(0x753))return $dataSystem[_0x55c236(0x857)]['params'][0x4];if(_0x42f670===_0x55c236(0x754))return $dataSystem[_0x55c236(0x857)][_0x55c236(0x231)][0x5];if(_0x42f670==='AGI')return $dataSystem[_0x55c236(0x857)]['params'][0x6];if(_0x42f670===_0x55c236(0x7d1))return $dataSystem['terms'][_0x55c236(0x231)][0x7];if(_0x42f670==='HIT')return _0x403c40[_0x55c236(0x473)];if(_0x42f670===_0x55c236(0x398))return _0x403c40[_0x55c236(0x3c0)];if(_0x42f670==='CRI')return _0x403c40[_0x55c236(0xb8)];if(_0x42f670===_0x55c236(0x180))return _0x403c40[_0x55c236(0x8d)];if(_0x42f670==='MEV')return _0x403c40[_0x55c236(0x6a4)];if(_0x42f670===_0x55c236(0x2db))return _0x403c40[_0x55c236(0x5b7)];if(_0x42f670===_0x55c236(0x2bc))return _0x403c40['XParamVocab6'];if(_0x42f670===_0x55c236(0x381))return _0x403c40[_0x55c236(0x126)];if(_0x42f670===_0x55c236(0x6c8))return _0x403c40[_0x55c236(0x27a)];if(_0x42f670===_0x55c236(0x670))return _0x403c40[_0x55c236(0x428)];if(_0x42f670===_0x55c236(0x1ab))return _0x403c40[_0x55c236(0x88)];if(_0x42f670===_0x55c236(0x7b2))return _0x403c40['SParamVocab1'];if(_0x42f670===_0x55c236(0x153))return _0x403c40[_0x55c236(0x24f)];if(_0x42f670==='PHA')return _0x403c40[_0x55c236(0x268)];if(_0x42f670===_0x55c236(0x7ae))return _0x403c40['SParamVocab4'];if(_0x42f670===_0x55c236(0x63a))return _0x403c40[_0x55c236(0x2de)];if(_0x42f670===_0x55c236(0x308))return _0x403c40['SParamVocab6'];if(_0x42f670==='MDR')return _0x403c40[_0x55c236(0x645)];if(_0x42f670==='FDR')return _0x403c40[_0x55c236(0x104)];if(_0x42f670===_0x55c236(0x5b1))return _0x403c40['SParamVocab9'];if(VisuMZ[_0x55c236(0x5b8)][_0x55c236(0x67e)][_0x42f670])return VisuMZ[_0x55c236(0x5b8)][_0x55c236(0x67e)][_0x42f670];return'';},TextManager['getInputButtonString']=function(_0x3d6052){const _0x62da77=_0x4e56c8,_0x32834b=Input[_0x62da77(0x7a6)]();return _0x32834b===_0x62da77(0x138)?this['getKeyboardInputButtonString'](_0x3d6052):this['getControllerInputButtonString'](_0x32834b,_0x3d6052);},TextManager[_0x4e56c8(0x238)]=function(_0x5e3645){const _0x32f642=_0x4e56c8;let _0x4ac8bd=VisuMZ[_0x32f642(0x5b8)][_0x32f642(0x5ce)][_0x32f642(0x21c)][_0x32f642(0x6b6)];if(!_0x4ac8bd){if(_0x5e3645===_0x32f642(0x26b))_0x5e3645=_0x32f642(0x704);if(_0x5e3645===_0x32f642(0x666))_0x5e3645=_0x32f642(0x704);}let _0xfcf771=[];for(let _0x2e3991 in Input['keyMapper']){_0x2e3991=Number(_0x2e3991);if(_0x2e3991>=0x60&&_0x2e3991<=0x69)continue;if([0x12,0x20][_0x32f642(0xd3)](_0x2e3991))continue;_0x5e3645===Input[_0x32f642(0x206)][_0x2e3991]&&_0xfcf771['push'](_0x2e3991);}for(let _0x29a016=0x0;_0x29a016<_0xfcf771[_0x32f642(0x323)];_0x29a016++){_0xfcf771[_0x29a016]=TextManager[_0x32f642(0x26f)][_0xfcf771[_0x29a016]];}return this[_0x32f642(0x49a)](_0xfcf771);},TextManager['makeInputButtonString']=function(_0x19c4a2){const _0x38c803=_0x4e56c8,_0x464e12=VisuMZ['CoreEngine'][_0x38c803(0x5ce)][_0x38c803(0x21c)],_0x20fdbc=_0x464e12['KeyUnlisted'];let _0x28c6c7='';if(_0x19c4a2[_0x38c803(0xd3)]('UP'))_0x28c6c7='UP';else{if(_0x19c4a2[_0x38c803(0xd3)]('DOWN'))_0x28c6c7='DOWN';else{if(_0x19c4a2[_0x38c803(0xd3)]('LEFT'))_0x28c6c7='LEFT';else _0x19c4a2['includes'](_0x38c803(0x14c))?_0x28c6c7=_0x38c803(0x14c):_0x28c6c7=_0x19c4a2['pop']();}}const _0x17a58b='Key%1'[_0x38c803(0x6d4)](_0x28c6c7);return _0x464e12[_0x17a58b]?_0x464e12[_0x17a58b]:_0x20fdbc[_0x38c803(0x6d4)](_0x28c6c7);},TextManager[_0x4e56c8(0x3a6)]=function(_0x356351,_0x5a6e5d){const _0x39688e=_0x4e56c8,_0x298d66=VisuMZ[_0x39688e(0x5b8)][_0x39688e(0x5ce)][_0x39688e(0x21c)],_0x42a85c=_0x298d66[_0x39688e(0x9c)],_0x2405a1=this[_0x39688e(0x282)](_0x356351),_0x517cc4=this['getInputButtonString'](_0x5a6e5d);return _0x42a85c[_0x39688e(0x6d4)](_0x2405a1,_0x517cc4);},TextManager[_0x4e56c8(0x5e2)]=function(_0x4d143a,_0x2dfb03){const _0x270f1e=_0x4e56c8,_0x40137a=_0x4d143a[_0x270f1e(0x471)]()['trim'](),_0x4b3d8c=VisuMZ[_0x270f1e(0x5b8)]['ControllerButtons'][_0x40137a];if(!_0x4b3d8c)return this[_0x270f1e(0x798)](_0x4d143a,_0x2dfb03);return _0x4b3d8c[_0x2dfb03]||this[_0x270f1e(0x238)](_0x4d143a,_0x2dfb03);},TextManager[_0x4e56c8(0x798)]=function(_0x5788ca,_0x29447c){const _0x316962=_0x4e56c8,_0x54a09b=_0x5788ca['toLowerCase']()[_0x316962(0x519)]();for(const _0x4834ab in VisuMZ['CoreEngine'][_0x316962(0x5de)]){if(_0x54a09b[_0x316962(0xd3)](_0x4834ab)){const _0x237f27=VisuMZ[_0x316962(0x5b8)][_0x316962(0x5de)][_0x4834ab],_0x38c697=VisuMZ[_0x316962(0x5b8)]['ControllerButtons'][_0x237f27];return _0x38c697[_0x29447c]||this[_0x316962(0x238)](_0x29447c);}}return this[_0x316962(0x238)](_0x29447c);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x68c)]=ColorManager[_0x4e56c8(0x56b)],ColorManager[_0x4e56c8(0x56b)]=function(){const _0x431233=_0x4e56c8;VisuMZ[_0x431233(0x5b8)]['ColorManager_loadWindowskin'][_0x431233(0x410)](this),this[_0x431233(0x7bf)]=this[_0x431233(0x7bf)]||{};},ColorManager[_0x4e56c8(0x53f)]=function(_0x33acf8,_0x507aeb){const _0x4b2af7=_0x4e56c8;return _0x507aeb=String(_0x507aeb),this['_colorCache']=this['_colorCache']||{},_0x507aeb[_0x4b2af7(0x60a)](/#(.*)/i)?this[_0x4b2af7(0x7bf)][_0x33acf8]=_0x4b2af7(0x21a)[_0x4b2af7(0x6d4)](String(RegExp['$1'])):this[_0x4b2af7(0x7bf)][_0x33acf8]=this['textColor'](Number(_0x507aeb)),this['_colorCache'][_0x33acf8];},ColorManager[_0x4e56c8(0x12e)]=function(_0x49a7c1){const _0x83e47e=_0x4e56c8;return _0x49a7c1=String(_0x49a7c1),_0x49a7c1[_0x83e47e(0x60a)](/#(.*)/i)?_0x83e47e(0x21a)[_0x83e47e(0x6d4)](String(RegExp['$1'])):this[_0x83e47e(0x804)](Number(_0x49a7c1));},ColorManager[_0x4e56c8(0x681)]=function(){const _0x38f9fa=_0x4e56c8;this[_0x38f9fa(0x7bf)]={};},ColorManager[_0x4e56c8(0x181)]=function(){const _0x1f915d=_0x4e56c8,_0x1f169d='_stored_normalColor';this[_0x1f915d(0x7bf)]=this['_colorCache']||{};if(this[_0x1f915d(0x7bf)][_0x1f169d])return this[_0x1f915d(0x7bf)][_0x1f169d];const _0xd3415d=VisuMZ[_0x1f915d(0x5b8)][_0x1f915d(0x5ce)]['Color']['ColorNormal'];return this[_0x1f915d(0x53f)](_0x1f169d,_0xd3415d);},ColorManager['systemColor']=function(){const _0x5d718c=_0x4e56c8,_0x141cf3=_0x5d718c(0x1e4);this[_0x5d718c(0x7bf)]=this[_0x5d718c(0x7bf)]||{};if(this[_0x5d718c(0x7bf)][_0x141cf3])return this[_0x5d718c(0x7bf)][_0x141cf3];const _0x30ef51=VisuMZ['CoreEngine'][_0x5d718c(0x5ce)]['Color'][_0x5d718c(0x828)];return this[_0x5d718c(0x53f)](_0x141cf3,_0x30ef51);},ColorManager[_0x4e56c8(0x830)]=function(){const _0x331947=_0x4e56c8,_0x117adb=_0x331947(0x813);this[_0x331947(0x7bf)]=this['_colorCache']||{};if(this[_0x331947(0x7bf)][_0x117adb])return this[_0x331947(0x7bf)][_0x117adb];const _0x4852b0=VisuMZ['CoreEngine']['Settings'][_0x331947(0xc9)][_0x331947(0x618)];return this[_0x331947(0x53f)](_0x117adb,_0x4852b0);},ColorManager[_0x4e56c8(0x542)]=function(){const _0x58f020=_0x4e56c8,_0x40e41d=_0x58f020(0x3fd);this[_0x58f020(0x7bf)]=this['_colorCache']||{};if(this[_0x58f020(0x7bf)][_0x40e41d])return this['_colorCache'][_0x40e41d];const _0x382eb1=VisuMZ[_0x58f020(0x5b8)][_0x58f020(0x5ce)][_0x58f020(0xc9)][_0x58f020(0x6cc)];return this['getColorDataFromPluginParameters'](_0x40e41d,_0x382eb1);},ColorManager[_0x4e56c8(0x73)]=function(){const _0x2f78ff=_0x4e56c8,_0x123318=_0x2f78ff(0x589);this[_0x2f78ff(0x7bf)]=this[_0x2f78ff(0x7bf)]||{};if(this[_0x2f78ff(0x7bf)][_0x123318])return this[_0x2f78ff(0x7bf)][_0x123318];const _0x4c266c=VisuMZ['CoreEngine']['Settings'][_0x2f78ff(0xc9)][_0x2f78ff(0x755)];return this['getColorDataFromPluginParameters'](_0x123318,_0x4c266c);},ColorManager[_0x4e56c8(0x18c)]=function(){const _0x4265ca=_0x4e56c8,_0x1ad825='_stored_hpGaugeColor1';this[_0x4265ca(0x7bf)]=this['_colorCache']||{};if(this['_colorCache'][_0x1ad825])return this['_colorCache'][_0x1ad825];const _0x425417=VisuMZ[_0x4265ca(0x5b8)][_0x4265ca(0x5ce)]['Color'][_0x4265ca(0x303)];return this[_0x4265ca(0x53f)](_0x1ad825,_0x425417);},ColorManager['hpGaugeColor2']=function(){const _0x4d2cc6=_0x4e56c8,_0x339a11=_0x4d2cc6(0xf4);this[_0x4d2cc6(0x7bf)]=this[_0x4d2cc6(0x7bf)]||{};if(this[_0x4d2cc6(0x7bf)][_0x339a11])return this[_0x4d2cc6(0x7bf)][_0x339a11];const _0x76710c=VisuMZ[_0x4d2cc6(0x5b8)][_0x4d2cc6(0x5ce)][_0x4d2cc6(0xc9)][_0x4d2cc6(0x4cc)];return this[_0x4d2cc6(0x53f)](_0x339a11,_0x76710c);},ColorManager[_0x4e56c8(0x2cf)]=function(){const _0x133879=_0x4e56c8,_0x50ef30=_0x133879(0x7fb);this[_0x133879(0x7bf)]=this[_0x133879(0x7bf)]||{};if(this[_0x133879(0x7bf)][_0x50ef30])return this['_colorCache'][_0x50ef30];const _0x285caa=VisuMZ['CoreEngine'][_0x133879(0x5ce)][_0x133879(0xc9)][_0x133879(0x54e)];return this[_0x133879(0x53f)](_0x50ef30,_0x285caa);},ColorManager[_0x4e56c8(0x146)]=function(){const _0x3c68ce=_0x4e56c8,_0x151563=_0x3c68ce(0x217);this[_0x3c68ce(0x7bf)]=this[_0x3c68ce(0x7bf)]||{};if(this[_0x3c68ce(0x7bf)][_0x151563])return this[_0x3c68ce(0x7bf)][_0x151563];const _0x2ae521=VisuMZ['CoreEngine'][_0x3c68ce(0x5ce)][_0x3c68ce(0xc9)][_0x3c68ce(0x3fb)];return this[_0x3c68ce(0x53f)](_0x151563,_0x2ae521);},ColorManager[_0x4e56c8(0x7c)]=function(){const _0x4d819b=_0x4e56c8,_0x35993e=_0x4d819b(0x1d3);this[_0x4d819b(0x7bf)]=this['_colorCache']||{};if(this[_0x4d819b(0x7bf)][_0x35993e])return this[_0x4d819b(0x7bf)][_0x35993e];const _0x1a852e=VisuMZ['CoreEngine']['Settings']['Color'][_0x4d819b(0x636)];return this['getColorDataFromPluginParameters'](_0x35993e,_0x1a852e);},ColorManager['powerUpColor']=function(){const _0x508b54=_0x4e56c8,_0x3f6b5f='_stored_powerUpColor';this[_0x508b54(0x7bf)]=this[_0x508b54(0x7bf)]||{};if(this[_0x508b54(0x7bf)][_0x3f6b5f])return this[_0x508b54(0x7bf)][_0x3f6b5f];const _0x5997ec=VisuMZ[_0x508b54(0x5b8)]['Settings'][_0x508b54(0xc9)][_0x508b54(0x28c)];return this[_0x508b54(0x53f)](_0x3f6b5f,_0x5997ec);},ColorManager[_0x4e56c8(0x241)]=function(){const _0x5c9308=_0x4e56c8,_0x21ef8a=_0x5c9308(0x4a8);this['_colorCache']=this[_0x5c9308(0x7bf)]||{};if(this[_0x5c9308(0x7bf)][_0x21ef8a])return this[_0x5c9308(0x7bf)][_0x21ef8a];const _0x42ade0=VisuMZ['CoreEngine'][_0x5c9308(0x5ce)]['Color'][_0x5c9308(0x2e5)];return this[_0x5c9308(0x53f)](_0x21ef8a,_0x42ade0);},ColorManager['ctGaugeColor1']=function(){const _0x27897a=_0x4e56c8,_0x2ae4e6=_0x27897a(0x4e4);this[_0x27897a(0x7bf)]=this[_0x27897a(0x7bf)]||{};if(this[_0x27897a(0x7bf)][_0x2ae4e6])return this[_0x27897a(0x7bf)][_0x2ae4e6];const _0x413128=VisuMZ[_0x27897a(0x5b8)][_0x27897a(0x5ce)]['Color'][_0x27897a(0xec)];return this['getColorDataFromPluginParameters'](_0x2ae4e6,_0x413128);},ColorManager[_0x4e56c8(0x4c1)]=function(){const _0x33c694=_0x4e56c8,_0x9eef42=_0x33c694(0x6f7);this[_0x33c694(0x7bf)]=this['_colorCache']||{};if(this[_0x33c694(0x7bf)][_0x9eef42])return this['_colorCache'][_0x9eef42];const _0x5b8dfa=VisuMZ[_0x33c694(0x5b8)][_0x33c694(0x5ce)][_0x33c694(0xc9)][_0x33c694(0x224)];return this['getColorDataFromPluginParameters'](_0x9eef42,_0x5b8dfa);},ColorManager[_0x4e56c8(0x135)]=function(){const _0x172d94=_0x4e56c8,_0x404221='_stored_tpGaugeColor1';this[_0x172d94(0x7bf)]=this[_0x172d94(0x7bf)]||{};if(this[_0x172d94(0x7bf)][_0x404221])return this[_0x172d94(0x7bf)][_0x404221];const _0x18e9c6=VisuMZ[_0x172d94(0x5b8)][_0x172d94(0x5ce)][_0x172d94(0xc9)][_0x172d94(0x6e3)];return this['getColorDataFromPluginParameters'](_0x404221,_0x18e9c6);},ColorManager[_0x4e56c8(0x124)]=function(){const _0x4d0ef3=_0x4e56c8,_0x152d78=_0x4d0ef3(0x348);this['_colorCache']=this['_colorCache']||{};if(this[_0x4d0ef3(0x7bf)][_0x152d78])return this['_colorCache'][_0x152d78];const _0x533eb3=VisuMZ[_0x4d0ef3(0x5b8)][_0x4d0ef3(0x5ce)]['Color'][_0x4d0ef3(0x84b)];return this[_0x4d0ef3(0x53f)](_0x152d78,_0x533eb3);},ColorManager['tpCostColor']=function(){const _0x20a466=_0x4e56c8,_0x2b9d2b=_0x20a466(0x1c1);this[_0x20a466(0x7bf)]=this['_colorCache']||{};if(this[_0x20a466(0x7bf)][_0x2b9d2b])return this[_0x20a466(0x7bf)][_0x2b9d2b];const _0x5a54ff=VisuMZ[_0x20a466(0x5b8)][_0x20a466(0x5ce)][_0x20a466(0xc9)]['ColorTPCost'];return this[_0x20a466(0x53f)](_0x2b9d2b,_0x5a54ff);},ColorManager[_0x4e56c8(0x5cf)]=function(){const _0x49417e=_0x4e56c8,_0x21acde=_0x49417e(0x42b);this[_0x49417e(0x7bf)]=this[_0x49417e(0x7bf)]||{};if(this[_0x49417e(0x7bf)][_0x21acde])return this['_colorCache'][_0x21acde];const _0x772fd9=VisuMZ[_0x49417e(0x5b8)][_0x49417e(0x5ce)][_0x49417e(0xc9)]['ColorTPCost'];return this['getColorDataFromPluginParameters'](_0x21acde,_0x772fd9);},ColorManager['expGaugeColor1']=function(){const _0x52309e=_0x4e56c8,_0x12fd8b='_stored_expGaugeColor1';this['_colorCache']=this[_0x52309e(0x7bf)]||{};if(this[_0x52309e(0x7bf)][_0x12fd8b])return this[_0x52309e(0x7bf)][_0x12fd8b];const _0x231b04=VisuMZ[_0x52309e(0x5b8)][_0x52309e(0x5ce)]['Color']['ColorExpGauge1'];return this[_0x52309e(0x53f)](_0x12fd8b,_0x231b04);},ColorManager[_0x4e56c8(0x856)]=function(){const _0x695499=_0x4e56c8,_0x48ea63=_0x695499(0x7ef);this[_0x695499(0x7bf)]=this[_0x695499(0x7bf)]||{};if(this[_0x695499(0x7bf)][_0x48ea63])return this[_0x695499(0x7bf)][_0x48ea63];const _0x1d144f=VisuMZ['CoreEngine'][_0x695499(0x5ce)]['Color'][_0x695499(0x69c)];return this[_0x695499(0x53f)](_0x48ea63,_0x1d144f);},ColorManager[_0x4e56c8(0x709)]=function(){const _0x4dfe6a=_0x4e56c8,_0x264e3a=_0x4dfe6a(0x1e2);this['_colorCache']=this['_colorCache']||{};if(this[_0x4dfe6a(0x7bf)][_0x264e3a])return this['_colorCache'][_0x264e3a];const _0x3e6f4c=VisuMZ[_0x4dfe6a(0x5b8)][_0x4dfe6a(0x5ce)][_0x4dfe6a(0xc9)][_0x4dfe6a(0x80b)];return this[_0x4dfe6a(0x53f)](_0x264e3a,_0x3e6f4c);},ColorManager[_0x4e56c8(0x702)]=function(){const _0x208173=_0x4e56c8,_0x2bc235=_0x208173(0x52a);this[_0x208173(0x7bf)]=this['_colorCache']||{};if(this[_0x208173(0x7bf)][_0x2bc235])return this[_0x208173(0x7bf)][_0x2bc235];const _0x1aea18=VisuMZ[_0x208173(0x5b8)][_0x208173(0x5ce)][_0x208173(0xc9)][_0x208173(0x163)];return this[_0x208173(0x53f)](_0x2bc235,_0x1aea18);},ColorManager['hpColor']=function(_0x10162d){const _0x117dcd=_0x4e56c8;return VisuMZ['CoreEngine'][_0x117dcd(0x5ce)]['Color'][_0x117dcd(0x2cd)]['call'](this,_0x10162d);},ColorManager['mpColor']=function(_0x5aa4d0){const _0x1a7d42=_0x4e56c8;return VisuMZ[_0x1a7d42(0x5b8)]['Settings'][_0x1a7d42(0xc9)][_0x1a7d42(0x59b)]['call'](this,_0x5aa4d0);},ColorManager[_0x4e56c8(0x311)]=function(_0xa0334a){const _0x13b658=_0x4e56c8;return VisuMZ[_0x13b658(0x5b8)][_0x13b658(0x5ce)][_0x13b658(0xc9)]['ActorTPColor'][_0x13b658(0x410)](this,_0xa0334a);},ColorManager[_0x4e56c8(0x248)]=function(_0x1ddee8){const _0x18040a=_0x4e56c8;return VisuMZ[_0x18040a(0x5b8)][_0x18040a(0x5ce)][_0x18040a(0xc9)][_0x18040a(0x4d5)][_0x18040a(0x410)](this,_0x1ddee8);},ColorManager[_0x4e56c8(0x3d2)]=function(_0x4d6397){const _0x578d05=_0x4e56c8;return VisuMZ[_0x578d05(0x5b8)]['Settings'][_0x578d05(0xc9)][_0x578d05(0x306)][_0x578d05(0x410)](this,_0x4d6397);},ColorManager[_0x4e56c8(0x86)]=function(){const _0x5d8ae8=_0x4e56c8;return VisuMZ[_0x5d8ae8(0x5b8)][_0x5d8ae8(0x5ce)]['Color'][_0x5d8ae8(0x737)];},ColorManager[_0x4e56c8(0xf7)]=function(){const _0x476874=_0x4e56c8;return VisuMZ['CoreEngine'][_0x476874(0x5ce)][_0x476874(0xc9)][_0x476874(0x85b)]||'rgba(0,\x200,\x200,\x200.7)';},ColorManager[_0x4e56c8(0x3b0)]=function(){const _0x41d89b=_0x4e56c8;return VisuMZ[_0x41d89b(0x5b8)][_0x41d89b(0x5ce)][_0x41d89b(0xc9)]['OutlineColorGauge']||_0x41d89b(0x732);},ColorManager[_0x4e56c8(0xfd)]=function(){const _0x2ec5a8=_0x4e56c8;return VisuMZ[_0x2ec5a8(0x5b8)]['Settings'][_0x2ec5a8(0xc9)][_0x2ec5a8(0x699)];},ColorManager[_0x4e56c8(0x422)]=function(){const _0x1cee72=_0x4e56c8;return VisuMZ[_0x1cee72(0x5b8)][_0x1cee72(0x5ce)][_0x1cee72(0xc9)][_0x1cee72(0x79a)];},ColorManager[_0x4e56c8(0x4d2)]=function(){const _0x4423e3=_0x4e56c8;return VisuMZ[_0x4423e3(0x5b8)][_0x4423e3(0x5ce)][_0x4423e3(0xc9)][_0x4423e3(0x4c9)];},ColorManager['itemBackColor2']=function(){const _0x219068=_0x4e56c8;return VisuMZ[_0x219068(0x5b8)][_0x219068(0x5ce)][_0x219068(0xc9)][_0x219068(0x5bc)];},SceneManager[_0x4e56c8(0x416)]=[],SceneManager[_0x4e56c8(0xf2)]=function(){const _0x323e38=_0x4e56c8;return this[_0x323e38(0x7f6)]&&this['_scene'][_0x323e38(0x2e1)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x12a639=_0x4e56c8;return this[_0x12a639(0x7f6)]&&this[_0x12a639(0x7f6)]['constructor']===Scene_Map;},SceneManager[_0x4e56c8(0x406)]=function(){const _0x4bbbf8=_0x4e56c8;return this[_0x4bbbf8(0x7f6)]&&this[_0x4bbbf8(0x7f6)]instanceof Scene_Map;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x44c)]=SceneManager[_0x4e56c8(0x5e5)],SceneManager[_0x4e56c8(0x5e5)]=function(){const _0x1d612d=_0x4e56c8;VisuMZ[_0x1d612d(0x5b8)]['SceneManager_initialize'][_0x1d612d(0x410)](this),this[_0x1d612d(0x548)]();},VisuMZ[_0x4e56c8(0x5b8)]['SceneManager_onKeyDown']=SceneManager[_0x4e56c8(0x803)],SceneManager[_0x4e56c8(0x803)]=function(_0x1587ad){const _0x3143dc=_0x4e56c8;if($gameTemp)this[_0x3143dc(0x254)](_0x1587ad);VisuMZ[_0x3143dc(0x5b8)]['SceneManager_onKeyDown']['call'](this,_0x1587ad);},SceneManager['onKeyDownKeysF6F7']=function(_0x11743e){const _0x133346=_0x4e56c8;if(!_0x11743e[_0x133346(0x5d9)]&&!_0x11743e[_0x133346(0x825)])switch(_0x11743e[_0x133346(0x51f)]){case 0x52:this[_0x133346(0x174)]();break;case 0x54:this[_0x133346(0x68d)]();break;case 0x75:this['playTestF6']();break;case 0x76:if(Input[_0x133346(0x373)](_0x133346(0x61c))||Input[_0x133346(0x373)]('ctrl'))return;this[_0x133346(0x6a8)]();break;}else{if(_0x11743e[_0x133346(0x5d9)]){let _0x46c987=_0x11743e['keyCode'];if(_0x46c987>=0x31&&_0x46c987<=0x39){const _0x297a50=_0x46c987-0x30;return SceneManager['playtestQuickLoad'](_0x297a50);}else{if(_0x46c987>=0x61&&_0x46c987<=0x69){const _0x12ad15=_0x46c987-0x60;return SceneManager[_0x133346(0x6fe)](_0x12ad15);}}}}},SceneManager[_0x4e56c8(0x469)]=function(){const _0x4a820e=_0x4e56c8;if($gameTemp[_0x4a820e(0x6c9)]()&&VisuMZ[_0x4a820e(0x5b8)][_0x4a820e(0x5ce)][_0x4a820e(0x2c9)][_0x4a820e(0x208)]){ConfigManager['seVolume']!==0x0?(ConfigManager[_0x4a820e(0x5bb)]=0x0,ConfigManager[_0x4a820e(0x7a8)]=0x0,ConfigManager[_0x4a820e(0x251)]=0x0,ConfigManager[_0x4a820e(0x290)]=0x0):(ConfigManager[_0x4a820e(0x5bb)]=0x64,ConfigManager[_0x4a820e(0x7a8)]=0x64,ConfigManager[_0x4a820e(0x251)]=0x64,ConfigManager[_0x4a820e(0x290)]=0x64);ConfigManager[_0x4a820e(0x2b8)]();if(this[_0x4a820e(0x7f6)][_0x4a820e(0x2e1)]===Scene_Options){if(this[_0x4a820e(0x7f6)][_0x4a820e(0x2d0)])this[_0x4a820e(0x7f6)][_0x4a820e(0x2d0)][_0x4a820e(0x501)]();if(this[_0x4a820e(0x7f6)][_0x4a820e(0x5c4)])this[_0x4a820e(0x7f6)][_0x4a820e(0x5c4)][_0x4a820e(0x501)]();}}},SceneManager['playTestF7']=function(){const _0x25b05e=_0x4e56c8;$gameTemp['isPlaytest']()&&VisuMZ[_0x25b05e(0x5b8)][_0x25b05e(0x5ce)][_0x25b05e(0x2c9)][_0x25b05e(0x145)]&&($gameTemp[_0x25b05e(0x6b2)]=!$gameTemp[_0x25b05e(0x6b2)]);},SceneManager[_0x4e56c8(0x174)]=function(){const _0x5d9581=_0x4e56c8;if(!VisuMZ[_0x5d9581(0x5b8)]['Settings'][_0x5d9581(0x2c9)][_0x5d9581(0x19f)])return;if(!$gameTemp[_0x5d9581(0x6c9)]())return;if(!SceneManager[_0x5d9581(0xf2)]())return;if(!Input[_0x5d9581(0x373)]('shift'))return;for(const _0xf834e3 of $gameParty[_0x5d9581(0x81)]()){if(!_0xf834e3)continue;_0xf834e3[_0x5d9581(0x39c)]();}},SceneManager[_0x4e56c8(0x68d)]=function(){const _0x140cc9=_0x4e56c8;if(!VisuMZ[_0x140cc9(0x5b8)][_0x140cc9(0x5ce)]['QoL'][_0x140cc9(0x480)])return;if(!$gameTemp['isPlaytest']())return;if(!SceneManager[_0x140cc9(0xf2)]())return;if(!Input[_0x140cc9(0x373)](_0x140cc9(0x61c)))return;for(const _0x3f67a8 of $gameParty[_0x140cc9(0x81)]()){if(!_0x3f67a8)continue;_0x3f67a8[_0x140cc9(0x2ad)](_0x3f67a8[_0x140cc9(0x85e)]());}},SceneManager[_0x4e56c8(0x6fe)]=function(_0x14fb27){const _0x3f2409=_0x4e56c8;if(!$gameTemp['isPlaytest']())return;if(!DataManager[_0x3f2409(0x179)](_0x14fb27))return;if(!(VisuMZ[_0x3f2409(0x5b8)][_0x3f2409(0x5ce)][_0x3f2409(0x2c9)][_0x3f2409(0x322)]??!![]))return;this[_0x3f2409(0x5c9)](Scene_QuickLoad),this[_0x3f2409(0x33d)](_0x14fb27);},SceneManager['initVisuMZCoreEngine']=function(){const _0x3e3297=_0x4e56c8;this['_sideButtonLayout']=![],this[_0x3e3297(0x4ff)]=!VisuMZ['CoreEngine'][_0x3e3297(0x5ce)]['UI'][_0x3e3297(0x740)];},SceneManager[_0x4e56c8(0x1ba)]=function(_0x2982f3){const _0x27bc28=_0x4e56c8;VisuMZ[_0x27bc28(0x5b8)][_0x27bc28(0x5ce)]['UI']['SideButtons']&&(this['_sideButtonLayout']=_0x2982f3);},SceneManager[_0x4e56c8(0x775)]=function(){const _0x53e02f=_0x4e56c8;return this[_0x53e02f(0x660)];},SceneManager[_0x4e56c8(0x61a)]=function(){return this['_hideButtons'];},SceneManager[_0x4e56c8(0x2c5)]=function(){const _0x14ac93=_0x4e56c8;return this[_0x14ac93(0x61a)]()||this[_0x14ac93(0x775)]();},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5f4)]=SceneManager[_0x4e56c8(0x1ac)],SceneManager[_0x4e56c8(0x1ac)]=function(){const _0x3b8481=_0x4e56c8;return VisuMZ[_0x3b8481(0x5b8)][_0x3b8481(0x5ce)][_0x3b8481(0x2c9)][_0x3b8481(0x769)]?VisuMZ['CoreEngine'][_0x3b8481(0x5f4)][_0x3b8481(0x410)](this):!![];},SceneManager[_0x4e56c8(0x58b)]=function(_0x4d0e88){const _0x14d71a=_0x4e56c8;if(_0x4d0e88 instanceof Error)this['catchNormalError'](_0x4d0e88);else _0x4d0e88 instanceof Array&&_0x4d0e88[0x0]===_0x14d71a(0x84d)?this[_0x14d71a(0x79f)](_0x4d0e88):this[_0x14d71a(0x487)](_0x4d0e88);this[_0x14d71a(0x579)]();},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x527)]=BattleManager[_0x4e56c8(0x7bd)],BattleManager['processEscape']=function(){const _0x29ea5a=_0x4e56c8;return VisuMZ[_0x29ea5a(0x5b8)][_0x29ea5a(0x5ce)][_0x29ea5a(0x2c9)][_0x29ea5a(0x458)]?this[_0x29ea5a(0x562)]():VisuMZ[_0x29ea5a(0x5b8)]['BattleManager_processEscape'][_0x29ea5a(0x410)](this);},BattleManager[_0x4e56c8(0x562)]=function(){const _0x29c401=_0x4e56c8;return $gameParty['performEscape'](),SoundManager[_0x29c401(0x1d8)](),this[_0x29c401(0x523)](),!![];},BattleManager[_0x4e56c8(0x21d)]=function(){const _0x2f3159=_0x4e56c8;return $gameSystem[_0x2f3159(0x7be)]()>=0x1;},BattleManager[_0x4e56c8(0x83b)]=function(){const _0x441b8c=_0x4e56c8;return $gameSystem[_0x441b8c(0x7be)]()===0x1;},VisuMZ['CoreEngine']['Game_Temp_initialize']=Game_Temp[_0x4e56c8(0x510)]['initialize'],Game_Temp[_0x4e56c8(0x510)]['initialize']=function(){const _0xf622b8=_0x4e56c8;VisuMZ[_0xf622b8(0x5b8)]['Game_Temp_initialize'][_0xf622b8(0x410)](this),this[_0xf622b8(0x2df)](),this[_0xf622b8(0x13f)](),this[_0xf622b8(0x157)]();},Game_Temp[_0x4e56c8(0x510)][_0x4e56c8(0x2df)]=function(){const _0x256f07=_0x4e56c8;VisuMZ[_0x256f07(0x5b8)][_0x256f07(0x5ce)][_0x256f07(0x2c9)][_0x256f07(0x186)]&&(this[_0x256f07(0x5ff)]=![]);},Game_Temp[_0x4e56c8(0x510)][_0x4e56c8(0x340)]=function(_0x35e941){const _0x25b9b0=_0x4e56c8;this[_0x25b9b0(0x3e6)]=_0x35e941;},Game_Temp[_0x4e56c8(0x510)]['getLastPluginCommandInterpreter']=function(){const _0x4a5071=_0x4e56c8;return this[_0x4a5071(0x3e6)];},Game_Temp[_0x4e56c8(0x510)][_0x4e56c8(0x634)]=function(){const _0x309736=_0x4e56c8;this[_0x309736(0x6ef)]=undefined,this[_0x309736(0x298)]=undefined,this[_0x309736(0x7f3)]=undefined;},Game_Temp[_0x4e56c8(0x510)]['applyForcedGameTroopSettingsCoreEngine']=function(_0x4f260c){const _0x4252bd=_0x4e56c8;$gameMap&&$dataMap&&$dataMap[_0x4252bd(0x47c)]&&this[_0x4252bd(0x4e6)]($dataMap[_0x4252bd(0x47c)]);const _0x32965b=$dataTroops[_0x4f260c];if(_0x32965b){let _0x44147f=DataManager['createTroopNote'](_0x32965b['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x44147f);}},Game_Temp[_0x4e56c8(0x510)][_0x4e56c8(0x4e6)]=function(_0x2139f2){const _0x19fe3e=_0x4e56c8;if(!_0x2139f2)return;if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this['_forcedTroopView']='FV';else{if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x19fe3e(0x6ef)]='SV';else{if(_0x2139f2['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x50e5b2=String(RegExp['$1']);if(_0x50e5b2[_0x19fe3e(0x60a)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x19fe3e(0x6ef)]='FV';else _0x50e5b2['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x19fe3e(0x6ef)]='SV');}}}if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:DTB)>/i))this[_0x19fe3e(0x298)]=0x0;else{if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x19fe3e(0x298)]=0x1;else{if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x19fe3e(0x298)]=0x2;else{if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:TPB|ATB)>/i))this[_0x19fe3e(0x298)]=0x2;else{if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:CTB)>/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x19fe3e(0x298)]=_0x19fe3e(0x11e));else{if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:STB)>/i))Imported[_0x19fe3e(0x817)]&&(this[_0x19fe3e(0x298)]=_0x19fe3e(0x751));else{if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:BTB)>/i))Imported[_0x19fe3e(0x64f)]&&(this[_0x19fe3e(0x298)]=_0x19fe3e(0x81c));else{if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:FTB)>/i))Imported[_0x19fe3e(0x450)]&&(this[_0x19fe3e(0x298)]='FTB');else{if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:OTB)>/i))Imported[_0x19fe3e(0x4cd)]&&(this['_forcedBattleSys']='OTB');else{if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:ETB)>/i))Imported[_0x19fe3e(0x4da)]&&(this['_forcedBattleSys']='ETB');else{if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:PTB)>/i))Imported[_0x19fe3e(0x2c7)]&&(this[_0x19fe3e(0x298)]=_0x19fe3e(0x46c));else{if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x4db314=String(RegExp['$1']);if(_0x4db314[_0x19fe3e(0x60a)](/DTB/i))this[_0x19fe3e(0x298)]=0x0;else{if(_0x4db314['match'](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x19fe3e(0x298)]=0x1;else{if(_0x4db314[_0x19fe3e(0x60a)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x19fe3e(0x298)]=0x2;else{if(_0x4db314[_0x19fe3e(0x60a)](/CTB/i))Imported[_0x19fe3e(0x1c2)]&&(this[_0x19fe3e(0x298)]=_0x19fe3e(0x11e));else{if(_0x4db314[_0x19fe3e(0x60a)](/STB/i))Imported[_0x19fe3e(0x817)]&&(this['_forcedBattleSys']=_0x19fe3e(0x751));else{if(_0x4db314['match'](/BTB/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this['_forcedBattleSys']='BTB');else{if(_0x4db314[_0x19fe3e(0x60a)](/FTB/i))Imported[_0x19fe3e(0x450)]&&(this[_0x19fe3e(0x298)]=_0x19fe3e(0x343));else{if(_0x4db314[_0x19fe3e(0x60a)](/OTB/i))Imported[_0x19fe3e(0x4cd)]&&(this[_0x19fe3e(0x298)]='OTB');else{if(_0x4db314['match'](/ETB/i))Imported[_0x19fe3e(0x4da)]&&(this[_0x19fe3e(0x298)]=_0x19fe3e(0x45d));else _0x4db314[_0x19fe3e(0x60a)](/PTB/i)&&(Imported[_0x19fe3e(0x2c7)]&&(this[_0x19fe3e(0x298)]=_0x19fe3e(0x46c)));}}}}}}}}}}}}}}}}}}}}if(_0x2139f2[_0x19fe3e(0x60a)](/<(?:|BATTLE )GRID>/i))this[_0x19fe3e(0x7f3)]=!![];else _0x2139f2['match'](/<NO (?:|BATTLE )GRID>/i)&&(this[_0x19fe3e(0x7f3)]=![]);},Game_Temp['prototype'][_0x4e56c8(0x13f)]=function(){const _0x24ce80=_0x4e56c8;this[_0x24ce80(0x22b)]=[];},Game_Temp['prototype'][_0x4e56c8(0x5d7)]=function(_0x269059,_0x44a115,_0x304e7c,_0x3fa1ff){const _0x14d9e0=_0x4e56c8;if(!this[_0x14d9e0(0x4f2)]())return;_0x304e7c=_0x304e7c||![],_0x3fa1ff=_0x3fa1ff||![];if($dataAnimations[_0x44a115]){const _0x316b1f={'targets':_0x269059,'animationId':_0x44a115,'mirror':_0x304e7c,'mute':_0x3fa1ff};this[_0x14d9e0(0x22b)]['push'](_0x316b1f);for(const _0x2a62ac of _0x269059){_0x2a62ac[_0x14d9e0(0x492)]&&_0x2a62ac[_0x14d9e0(0x492)]();}}},Game_Temp[_0x4e56c8(0x510)]['showFauxAnimations']=function(){return!![];},Game_Temp[_0x4e56c8(0x510)][_0x4e56c8(0x7d5)]=function(){const _0x4114f6=_0x4e56c8;return this[_0x4114f6(0x22b)][_0x4114f6(0x61c)]();},Game_Temp['prototype']['createPointAnimationQueue']=function(){const _0xe61ff9=_0x4e56c8;this[_0xe61ff9(0x51e)]=[];},Game_Temp[_0x4e56c8(0x510)][_0x4e56c8(0x462)]=function(_0x348dd4,_0x546edd,_0x47da05,_0x27f9fb,_0x6357a2){const _0x7f45e2=_0x4e56c8;if(!this[_0x7f45e2(0x3d5)]())return;_0x27f9fb=_0x27f9fb||![],_0x6357a2=_0x6357a2||![];if($dataAnimations[_0x47da05]){const _0x11d48f={'x':_0x348dd4,'y':_0x546edd,'animationId':_0x47da05,'mirror':_0x27f9fb,'mute':_0x6357a2};this[_0x7f45e2(0x51e)][_0x7f45e2(0x5c9)](_0x11d48f);}},Game_Temp[_0x4e56c8(0x510)][_0x4e56c8(0x3d5)]=function(){return!![];},Game_Temp[_0x4e56c8(0x510)]['retrievePointAnimation']=function(){return this['_pointAnimationQueue']['shift']();},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x7da)]=Game_System['prototype'][_0x4e56c8(0x5e5)],Game_System[_0x4e56c8(0x510)][_0x4e56c8(0x5e5)]=function(){const _0x4f8a10=_0x4e56c8;VisuMZ[_0x4f8a10(0x5b8)][_0x4f8a10(0x7da)]['call'](this),this[_0x4f8a10(0x2f5)]();},Game_System['prototype']['initCoreEngine']=function(){const _0x18973c=_0x4e56c8;this[_0x18973c(0x3a5)]={'SideView':$dataSystem[_0x18973c(0x38f)],'BattleSystem':this[_0x18973c(0x834)](),'FontSize':$dataSystem[_0x18973c(0x1c7)][_0x18973c(0x2ea)],'Padding':0xc};},Game_System[_0x4e56c8(0x510)][_0x4e56c8(0x7ad)]=function(){const _0x1db5a0=_0x4e56c8;if($gameTemp[_0x1db5a0(0x6ef)]==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this[_0x1db5a0(0x3a5)]===undefined)this[_0x1db5a0(0x2f5)]();if(this['_CoreEngineSettings']['SideView']===undefined)this[_0x1db5a0(0x2f5)]();return this['_CoreEngineSettings'][_0x1db5a0(0x291)];},Game_System[_0x4e56c8(0x510)][_0x4e56c8(0x4fb)]=function(_0x3a4678){const _0x8956f=_0x4e56c8;if(this[_0x8956f(0x3a5)]===undefined)this[_0x8956f(0x2f5)]();if(this['_CoreEngineSettings']['SideView']===undefined)this[_0x8956f(0x2f5)]();this[_0x8956f(0x3a5)][_0x8956f(0x291)]=_0x3a4678;},Game_System['prototype'][_0x4e56c8(0x807)]=function(){const _0x2ef40a=_0x4e56c8;if(this['_CoreEngineSettings']===undefined)this[_0x2ef40a(0x2f5)]();this[_0x2ef40a(0x3a5)][_0x2ef40a(0xe9)]=this[_0x2ef40a(0x834)]();},Game_System[_0x4e56c8(0x510)]['initialBattleSystem']=function(){const _0xcb4784=_0x4e56c8,_0x3bdec8=(VisuMZ['CoreEngine'][_0xcb4784(0x5ce)][_0xcb4784(0xe9)]||'DATABASE')[_0xcb4784(0x25a)]()['trim']();return VisuMZ[_0xcb4784(0x5b8)][_0xcb4784(0x58a)](_0x3bdec8);},Game_System['prototype'][_0x4e56c8(0x7be)]=function(){const _0x14ece8=_0x4e56c8;if($gameTemp['_forcedBattleSys']!==undefined)return $gameTemp[_0x14ece8(0x298)];if(this[_0x14ece8(0x3a5)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x14ece8(0xe9)]===undefined)this['resetBattleSystem']();return this[_0x14ece8(0x3a5)][_0x14ece8(0xe9)];},Game_System[_0x4e56c8(0x510)][_0x4e56c8(0x76c)]=function(_0x11314b){const _0x512886=_0x4e56c8;if(this[_0x512886(0x3a5)]===undefined)this[_0x512886(0x2f5)]();if(this[_0x512886(0x3a5)]['BattleSystem']===undefined)this[_0x512886(0x807)]();this['_CoreEngineSettings']['BattleSystem']=_0x11314b;},Game_System[_0x4e56c8(0x510)][_0x4e56c8(0x4b1)]=function(){const _0xa8abd4=_0x4e56c8;if(this[_0xa8abd4(0x3a5)]===undefined)this[_0xa8abd4(0x2f5)]();if(this[_0xa8abd4(0x3a5)][_0xa8abd4(0x713)]===undefined)this[_0xa8abd4(0x2f5)]();return this[_0xa8abd4(0x3a5)][_0xa8abd4(0x713)];},Game_System[_0x4e56c8(0x510)]['setMainFontSize']=function(_0x2ecb89){const _0x189171=_0x4e56c8;if(this[_0x189171(0x3a5)]===undefined)this[_0x189171(0x2f5)]();if(this[_0x189171(0x3a5)]['TimeProgress']===undefined)this[_0x189171(0x2f5)]();this[_0x189171(0x3a5)][_0x189171(0x713)]=_0x2ecb89;},Game_System[_0x4e56c8(0x510)][_0x4e56c8(0x7b7)]=function(){const _0x319eb5=_0x4e56c8;if(this[_0x319eb5(0x3a5)]===undefined)this[_0x319eb5(0x2f5)]();if(this[_0x319eb5(0x3a5)][_0x319eb5(0x256)]===undefined)this['initCoreEngine']();return this[_0x319eb5(0x3a5)][_0x319eb5(0x256)];},Game_System[_0x4e56c8(0x510)][_0x4e56c8(0x5e4)]=function(_0x36749f){const _0x3e1100=_0x4e56c8;if(this[_0x3e1100(0x3a5)]===undefined)this['initCoreEngine']();if(this[_0x3e1100(0x3a5)][_0x3e1100(0x58c)]===undefined)this['initCoreEngine']();this[_0x3e1100(0x3a5)][_0x3e1100(0x256)]=_0x36749f;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x228)]=Game_Screen[_0x4e56c8(0x510)]['initialize'],Game_Screen['prototype'][_0x4e56c8(0x5e5)]=function(){const _0x16757a=_0x4e56c8;VisuMZ[_0x16757a(0x5b8)][_0x16757a(0x228)][_0x16757a(0x410)](this),this[_0x16757a(0x2bd)]();},Game_Screen[_0x4e56c8(0x510)]['initCoreEngineScreenShake']=function(){const _0x222480=_0x4e56c8,_0x28e12f=VisuMZ[_0x222480(0x5b8)][_0x222480(0x5ce)][_0x222480(0x763)];this['_coreEngineShakeStyle']=_0x28e12f?.['DefaultStyle']||_0x222480(0x757);},Game_Screen[_0x4e56c8(0x510)][_0x4e56c8(0x2ac)]=function(){const _0x3ea3c6=_0x4e56c8;if(this[_0x3ea3c6(0x354)]===undefined)this['initCoreEngineScreenShake']();return this[_0x3ea3c6(0x354)];},Game_Screen['prototype']['setCoreEngineScreenShakeStyle']=function(_0x41de21){const _0x197b40=_0x4e56c8;if(this['_coreEngineShakeStyle']===undefined)this['initCoreEngineScreenShake']();this[_0x197b40(0x354)]=_0x41de21[_0x197b40(0x471)]()[_0x197b40(0x519)]();},Game_Picture['prototype'][_0x4e56c8(0x5d5)]=function(){const _0x3ba755=_0x4e56c8;if($gameParty['inBattle']())return![];return this['onlyfilename']()&&this[_0x3ba755(0x60f)]()[_0x3ba755(0x81f)](0x0)==='!';},Game_Picture['prototype'][_0x4e56c8(0x60f)]=function(){return this['_name']['split']('/')['pop']();},VisuMZ['CoreEngine'][_0x4e56c8(0x829)]=Game_Picture[_0x4e56c8(0x510)]['x'],Game_Picture['prototype']['x']=function(){const _0x3b8ee3=_0x4e56c8;return this[_0x3b8ee3(0x5d5)]()?this[_0x3b8ee3(0x5a4)]():VisuMZ[_0x3b8ee3(0x5b8)][_0x3b8ee3(0x829)][_0x3b8ee3(0x410)](this);},Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x5a4)]=function(){const _0x3142c5=_0x4e56c8,_0x2528b3=$gameMap[_0x3142c5(0x22a)]()*$gameMap[_0x3142c5(0x717)]();return(this['_x']-_0x2528b3)*$gameScreen[_0x3142c5(0x1dc)]();},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x283)]=Game_Picture[_0x4e56c8(0x510)]['y'],Game_Picture[_0x4e56c8(0x510)]['y']=function(){const _0x45a61f=_0x4e56c8;return this['isMapScrollLinked']()?this[_0x45a61f(0x45a)]():VisuMZ[_0x45a61f(0x5b8)][_0x45a61f(0x283)][_0x45a61f(0x410)](this);},Game_Picture[_0x4e56c8(0x510)]['yScrollLinkedOffset']=function(){const _0x1cf360=_0x4e56c8,_0x257f7d=$gameMap[_0x1cf360(0x15b)]()*$gameMap[_0x1cf360(0x5ef)]();return(this['_y']-_0x257f7d)*$gameScreen['zoomScale']();},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x495)]=Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x822)],Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x822)]=function(){const _0x9a4071=_0x4e56c8;let _0xb6704e=VisuMZ[_0x9a4071(0x5b8)][_0x9a4071(0x495)][_0x9a4071(0x410)](this);return this[_0x9a4071(0x5d5)]()&&(_0xb6704e*=$gameScreen[_0x9a4071(0x1dc)]()),_0xb6704e;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0xd0)]=Game_Picture['prototype'][_0x4e56c8(0x260)],Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x260)]=function(){const _0x53f913=_0x4e56c8;let _0x50496a=VisuMZ[_0x53f913(0x5b8)]['Game_Picture_scaleY'][_0x53f913(0x410)](this);return this[_0x53f913(0x5d5)]()&&(_0x50496a*=$gameScreen[_0x53f913(0x1dc)]()),_0x50496a;},Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x6b5)]=function(_0x593783){const _0x55555c=_0x4e56c8;this[_0x55555c(0x2c1)]=_0x593783;},VisuMZ[_0x4e56c8(0x5b8)]['Game_Picture_calcEasing']=Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x332)],Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x332)]=function(_0x553bbb){const _0xb3a2a4=_0x4e56c8;return this[_0xb3a2a4(0x2c1)]=this[_0xb3a2a4(0x2c1)]||0x0,[0x0,0x1,0x2,0x3][_0xb3a2a4(0xd3)](this[_0xb3a2a4(0x2c1)])?VisuMZ[_0xb3a2a4(0x5b8)][_0xb3a2a4(0x12c)][_0xb3a2a4(0x410)](this,_0x553bbb):VisuMZ[_0xb3a2a4(0x165)](_0x553bbb,this[_0xb3a2a4(0x2c1)]);},VisuMZ[_0x4e56c8(0x5b8)]['Game_Picture_initRotation']=Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x2dd)],Game_Picture[_0x4e56c8(0x510)]['initRotation']=function(){const _0x5a122b=_0x4e56c8;VisuMZ[_0x5a122b(0x5b8)][_0x5a122b(0x1fa)][_0x5a122b(0x410)](this),this['initRotationCoreEngine']();},Game_Picture[_0x4e56c8(0x510)]['initRotationCoreEngine']=function(){const _0x4f168e=_0x4e56c8;this[_0x4f168e(0x837)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x4f168e(0x630)};},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x1fc)]=Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x69d)],Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x69d)]=function(){const _0x33a5ea=_0x4e56c8;let _0x3104a5=VisuMZ['CoreEngine'][_0x33a5ea(0x1fc)]['call'](this);return _0x3104a5+=this[_0x33a5ea(0x71e)](),_0x3104a5;},Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x71e)]=function(){const _0x3c2e9c=_0x4e56c8;if(this[_0x3c2e9c(0x837)]===undefined)this[_0x3c2e9c(0xf5)]();return this['_anglePlus'][_0x3c2e9c(0x836)]||0x0;},Game_Picture[_0x4e56c8(0x510)]['setAnglePlusData']=function(_0x25bad0,_0x2964f4,_0x306205){const _0x382979=_0x4e56c8;if(this[_0x382979(0x837)]===undefined)this[_0x382979(0xf5)]();this[_0x382979(0x837)][_0x382979(0x2ae)]=_0x25bad0||0x0,this[_0x382979(0x837)][_0x382979(0x13c)]=_0x2964f4||0x0,this[_0x382979(0x837)]['wholeDuration']=_0x2964f4||0x0,this['_anglePlus'][_0x382979(0x652)]=_0x306205||'Linear',_0x2964f4<=0x0&&(this[_0x382979(0x837)]['current']=this[_0x382979(0x837)]['target']);},Game_Picture['prototype']['changeAnglePlusData']=function(_0x5a3908,_0x259e9e,_0xfc1eff){const _0x3ae443=_0x4e56c8;if(this[_0x3ae443(0x837)]===undefined)this[_0x3ae443(0xf5)]();this[_0x3ae443(0x837)][_0x3ae443(0x2ae)]+=_0x5a3908||0x0,this['_anglePlus'][_0x3ae443(0x13c)]=_0x259e9e||0x0,this[_0x3ae443(0x837)]['wholeDuration']=_0x259e9e||0x0,this['_anglePlus'][_0x3ae443(0x652)]=_0xfc1eff||_0x3ae443(0x630),_0x259e9e<=0x0&&(this[_0x3ae443(0x837)][_0x3ae443(0x836)]=this[_0x3ae443(0x837)][_0x3ae443(0x2ae)]);},VisuMZ[_0x4e56c8(0x5b8)]['Game_Picture_updateRotation']=Game_Picture[_0x4e56c8(0x510)]['updateRotation'],Game_Picture[_0x4e56c8(0x510)]['updateRotation']=function(){const _0xb7c193=_0x4e56c8;VisuMZ[_0xb7c193(0x5b8)][_0xb7c193(0x333)][_0xb7c193(0x410)](this),this['updateAnglePlus']();},Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x7f0)]=function(){const _0x41cb5f=_0x4e56c8;if(this[_0x41cb5f(0x837)]===undefined)this['initRotationCoreEngine']();const _0x1684d7=this[_0x41cb5f(0x837)];if(_0x1684d7[_0x41cb5f(0x13c)]<=0x0)return;_0x1684d7[_0x41cb5f(0x836)]=this[_0x41cb5f(0x2f4)](_0x1684d7[_0x41cb5f(0x836)],_0x1684d7[_0x41cb5f(0x2ae)]),_0x1684d7[_0x41cb5f(0x13c)]--,_0x1684d7[_0x41cb5f(0x13c)]<=0x0&&(_0x1684d7[_0x41cb5f(0x836)]=_0x1684d7[_0x41cb5f(0x2ae)]);},Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x2f4)]=function(_0x43c4cd,_0x4b1803){const _0x57c9f8=_0x4e56c8,_0x4189a0=this[_0x57c9f8(0x837)],_0x222ac0=_0x4189a0[_0x57c9f8(0x652)],_0x5a9f40=_0x4189a0[_0x57c9f8(0x13c)],_0x48e89d=_0x4189a0[_0x57c9f8(0x855)],_0x4aeb06=VisuMZ[_0x57c9f8(0x165)]((_0x48e89d-_0x5a9f40)/_0x48e89d,_0x222ac0),_0x1c66d5=VisuMZ[_0x57c9f8(0x165)]((_0x48e89d-_0x5a9f40+0x1)/_0x48e89d,_0x222ac0),_0x1a00cb=(_0x43c4cd-_0x4b1803*_0x4aeb06)/(0x1-_0x4aeb06);return _0x1a00cb+(_0x4b1803-_0x1a00cb)*_0x1c66d5;},VisuMZ[_0x4e56c8(0x5b8)]['Game_Action_itemHit']=Game_Action[_0x4e56c8(0x510)]['itemHit'],Game_Action[_0x4e56c8(0x510)][_0x4e56c8(0x4e7)]=function(_0x39271d){const _0x17d0cc=_0x4e56c8;return VisuMZ[_0x17d0cc(0x5b8)][_0x17d0cc(0x5ce)][_0x17d0cc(0x2c9)]['ImprovedAccuracySystem']?this[_0x17d0cc(0x15c)](_0x39271d):VisuMZ[_0x17d0cc(0x5b8)][_0x17d0cc(0x1bc)][_0x17d0cc(0x410)](this,_0x39271d);},Game_Action[_0x4e56c8(0x510)][_0x4e56c8(0x15c)]=function(_0x4c833a){const _0x322431=_0x4e56c8,_0x45d028=this[_0x322431(0x455)](_0x4c833a),_0x31d56a=this[_0x322431(0x2af)](_0x4c833a),_0x21fc8a=this['targetEvaRate'](_0x4c833a);return _0x45d028*(_0x31d56a-_0x21fc8a);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x2da)]=Game_Action['prototype'][_0x4e56c8(0x3f0)],Game_Action['prototype'][_0x4e56c8(0x3f0)]=function(_0x2d32a7){const _0x332b87=_0x4e56c8;return VisuMZ[_0x332b87(0x5b8)][_0x332b87(0x5ce)][_0x332b87(0x2c9)]['ImprovedAccuracySystem']?0x0:VisuMZ['CoreEngine'][_0x332b87(0x2da)][_0x332b87(0x410)](this,_0x2d32a7);},Game_Action[_0x4e56c8(0x510)]['itemSuccessRate']=function(_0x1a7b04){const _0x3d4db1=_0x4e56c8;return this[_0x3d4db1(0x1c6)]()[_0x3d4db1(0x607)]*0.01;},Game_Action[_0x4e56c8(0x510)]['subjectHitRate']=function(_0x46a5e1){const _0x1dd560=_0x4e56c8;if(VisuMZ[_0x1dd560(0x5b8)][_0x1dd560(0x5ce)][_0x1dd560(0x2c9)][_0x1dd560(0x75e)]&&this[_0x1dd560(0x52d)]())return 0x1;return this['isPhysical']()?VisuMZ[_0x1dd560(0x5b8)]['Settings'][_0x1dd560(0x2c9)][_0x1dd560(0x75e)]&&this['subject']()['isActor']()?this[_0x1dd560(0x9d)]()[_0x1dd560(0x71f)]+0.05:this['subject']()[_0x1dd560(0x71f)]:0x1;},Game_Action[_0x4e56c8(0x510)][_0x4e56c8(0x2fc)]=function(_0x19d49e){const _0x1fa8be=_0x4e56c8;if(this[_0x1fa8be(0x9d)]()['isActor']()===_0x19d49e[_0x1fa8be(0x4e2)]())return 0x0;if(this['isPhysical']())return VisuMZ['CoreEngine'][_0x1fa8be(0x5ce)][_0x1fa8be(0x2c9)][_0x1fa8be(0x75e)]&&_0x19d49e['isEnemy']()?_0x19d49e[_0x1fa8be(0x7f8)]-0.05:_0x19d49e[_0x1fa8be(0x7f8)];else return this[_0x1fa8be(0x7d7)]()?_0x19d49e['mev']:0x0;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x3f7)]=Game_Action['prototype'][_0x4e56c8(0x2ab)],Game_Action[_0x4e56c8(0x510)]['updateLastTarget']=function(_0x2cb9fd){const _0x5ee087=_0x4e56c8;VisuMZ[_0x5ee087(0x5b8)]['Game_Action_updateLastTarget'][_0x5ee087(0x410)](this,_0x2cb9fd);if(VisuMZ[_0x5ee087(0x5b8)][_0x5ee087(0x5ce)][_0x5ee087(0x2c9)][_0x5ee087(0x423)])return;const _0x476e0c=_0x2cb9fd[_0x5ee087(0x5b6)]();_0x476e0c[_0x5ee087(0x614)]&&(0x1-this[_0x5ee087(0x3f0)](_0x2cb9fd)>this['itemHit'](_0x2cb9fd)&&(_0x476e0c[_0x5ee087(0x614)]=![],_0x476e0c[_0x5ee087(0x82a)]=!![]));},VisuMZ[_0x4e56c8(0x5b8)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x4e56c8(0x510)]['initMembers'],Game_BattlerBase[_0x4e56c8(0x510)][_0x4e56c8(0xd8)]=function(){const _0x56f69f=_0x4e56c8;this[_0x56f69f(0x6dd)]={},VisuMZ[_0x56f69f(0x5b8)]['Game_BattlerBase_initMembers'][_0x56f69f(0x410)](this);},VisuMZ[_0x4e56c8(0x5b8)]['Game_BattlerBase_refresh']=Game_BattlerBase['prototype']['refresh'],Game_BattlerBase[_0x4e56c8(0x510)][_0x4e56c8(0x501)]=function(){const _0xaa5cf7=_0x4e56c8;this[_0xaa5cf7(0x6dd)]={},VisuMZ['CoreEngine'][_0xaa5cf7(0x7ed)][_0xaa5cf7(0x410)](this);},Game_BattlerBase[_0x4e56c8(0x510)][_0x4e56c8(0x31f)]=function(_0x1137e2){const _0x1d4ec5=_0x4e56c8;return this[_0x1d4ec5(0x6dd)]=this[_0x1d4ec5(0x6dd)]||{},this[_0x1d4ec5(0x6dd)][_0x1137e2]!==undefined;},Game_BattlerBase[_0x4e56c8(0x510)]['paramPlus']=function(_0x18040e){const _0x135bc3=_0x4e56c8,_0x4e0861=(_0x7d0960,_0x5665a9)=>{const _0x56c3f8=_0x521a;if(!_0x5665a9)return _0x7d0960;if(_0x5665a9[_0x56c3f8(0x47c)][_0x56c3f8(0x60a)](VisuMZ[_0x56c3f8(0x5b8)][_0x56c3f8(0xfe)][_0x56c3f8(0x2ec)][_0x18040e])){var _0x5b726c=Number(RegExp['$1']);_0x7d0960+=_0x5b726c;}if(_0x5665a9[_0x56c3f8(0x47c)][_0x56c3f8(0x60a)](VisuMZ[_0x56c3f8(0x5b8)][_0x56c3f8(0xfe)][_0x56c3f8(0x27f)][_0x18040e])){var _0x3354dd=String(RegExp['$1']);try{_0x7d0960+=eval(_0x3354dd);}catch(_0x11dae1){if($gameTemp[_0x56c3f8(0x6c9)]())console[_0x56c3f8(0x2d8)](_0x11dae1);}}return _0x7d0960;};return this[_0x135bc3(0x22c)]()[_0x135bc3(0xb2)](_0x4e0861,this['_paramPlus'][_0x18040e]);},Game_BattlerBase[_0x4e56c8(0x510)][_0x4e56c8(0x5f0)]=function(_0x3e1881){const _0x24b7d2=_0x4e56c8;var _0x34931f=_0x24b7d2(0xc3)+(this['isActor']()?'Actor':'Enemy')+_0x24b7d2(0xcb)+_0x3e1881;if(this[_0x24b7d2(0x31f)](_0x34931f))return this['_cache'][_0x34931f];this[_0x24b7d2(0x6dd)][_0x34931f]=eval(VisuMZ[_0x24b7d2(0x5b8)][_0x24b7d2(0x5ce)][_0x24b7d2(0x2b7)][_0x34931f]);const _0x14ebf1=(_0x4a1958,_0x5c3e41)=>{const _0x4b7c78=_0x24b7d2;if(!_0x5c3e41)return _0x4a1958;if(_0x5c3e41['note'][_0x4b7c78(0x60a)](VisuMZ[_0x4b7c78(0x5b8)]['RegExp'][_0x4b7c78(0x5f0)][_0x3e1881])){var _0x225e3d=Number(RegExp['$1']);if(_0x225e3d===0x0)_0x225e3d=Number['MAX_SAFE_INTEGER'];_0x4a1958=Math[_0x4b7c78(0x53e)](_0x4a1958,_0x225e3d);}if(_0x5c3e41[_0x4b7c78(0x47c)][_0x4b7c78(0x60a)](VisuMZ[_0x4b7c78(0x5b8)][_0x4b7c78(0xfe)][_0x4b7c78(0x63c)][_0x3e1881])){var _0xe74417=String(RegExp['$1']);try{_0x4a1958=Math[_0x4b7c78(0x53e)](_0x4a1958,Number(eval(_0xe74417)));}catch(_0x4ad89c){if($gameTemp[_0x4b7c78(0x6c9)]())console['log'](_0x4ad89c);}}return _0x4a1958;};if(this['_cache'][_0x34931f]===0x0)this[_0x24b7d2(0x6dd)][_0x34931f]=Number[_0x24b7d2(0x838)];return this['_cache'][_0x34931f]=this[_0x24b7d2(0x22c)]()[_0x24b7d2(0xb2)](_0x14ebf1,this[_0x24b7d2(0x6dd)][_0x34931f]),this['_cache'][_0x34931f];},Game_BattlerBase[_0x4e56c8(0x510)][_0x4e56c8(0x514)]=function(_0x343669){const _0x36572e=_0x4e56c8,_0xb00bbd=this[_0x36572e(0x226)](Game_BattlerBase['TRAIT_PARAM'],_0x343669),_0x295d94=(_0x4c1b8a,_0x21677c)=>{const _0x45f584=_0x36572e;if(!_0x21677c)return _0x4c1b8a;if(_0x21677c[_0x45f584(0x47c)][_0x45f584(0x60a)](VisuMZ['CoreEngine']['RegExp'][_0x45f584(0x78c)][_0x343669])){var _0x26f0b7=Number(RegExp['$1'])/0x64;_0x4c1b8a*=_0x26f0b7;}if(_0x21677c[_0x45f584(0x47c)]['match'](VisuMZ[_0x45f584(0x5b8)]['RegExp']['paramRate2'][_0x343669])){var _0x26f0b7=Number(RegExp['$1']);_0x4c1b8a*=_0x26f0b7;}if(_0x21677c[_0x45f584(0x47c)][_0x45f584(0x60a)](VisuMZ['CoreEngine'][_0x45f584(0xfe)][_0x45f584(0x22e)][_0x343669])){var _0x1d7771=String(RegExp['$1']);try{_0x4c1b8a*=eval(_0x1d7771);}catch(_0x17deaf){if($gameTemp[_0x45f584(0x6c9)]())console[_0x45f584(0x2d8)](_0x17deaf);}}return _0x4c1b8a;};return this[_0x36572e(0x22c)]()[_0x36572e(0xb2)](_0x295d94,_0xb00bbd);},Game_BattlerBase[_0x4e56c8(0x510)]['paramFlatBonus']=function(_0x32341a){const _0x4fb026=_0x4e56c8,_0x5611d4=(_0x4049eb,_0x5e0c41)=>{const _0x45208e=_0x521a;if(!_0x5e0c41)return _0x4049eb;if(_0x5e0c41[_0x45208e(0x47c)]['match'](VisuMZ[_0x45208e(0x5b8)][_0x45208e(0xfe)][_0x45208e(0x26e)][_0x32341a])){var _0x1882c7=Number(RegExp['$1']);_0x4049eb+=_0x1882c7;}if(_0x5e0c41[_0x45208e(0x47c)][_0x45208e(0x60a)](VisuMZ[_0x45208e(0x5b8)][_0x45208e(0xfe)][_0x45208e(0x87)][_0x32341a])){var _0x56ab5e=String(RegExp['$1']);try{_0x4049eb+=eval(_0x56ab5e);}catch(_0x1ee8db){if($gameTemp[_0x45208e(0x6c9)]())console['log'](_0x1ee8db);}}return _0x4049eb;};return this['traitObjects']()[_0x4fb026(0xb2)](_0x5611d4,0x0);},Game_BattlerBase['prototype'][_0x4e56c8(0x361)]=function(_0x3c6dc3){const _0x2ef750=_0x4e56c8;let _0x25f499='param'+_0x3c6dc3+'Total';if(this[_0x2ef750(0x31f)](_0x25f499))return this[_0x2ef750(0x6dd)][_0x25f499];return this[_0x2ef750(0x6dd)][_0x25f499]=Math[_0x2ef750(0x263)](VisuMZ[_0x2ef750(0x5b8)][_0x2ef750(0x5ce)][_0x2ef750(0x2b7)]['BasicParameterFormula'][_0x2ef750(0x410)](this,_0x3c6dc3)),this[_0x2ef750(0x6dd)][_0x25f499];},Game_BattlerBase['prototype']['xparamPlus']=function(_0x27bf1f){const _0x4247c0=_0x4e56c8,_0x57cd64=(_0x1a3681,_0x1081ea)=>{const _0x236b33=_0x521a;if(!_0x1081ea)return _0x1a3681;if(_0x1081ea[_0x236b33(0x47c)][_0x236b33(0x60a)](VisuMZ['CoreEngine'][_0x236b33(0xfe)][_0x236b33(0x6b7)][_0x27bf1f])){var _0x4dc6d9=Number(RegExp['$1'])/0x64;_0x1a3681+=_0x4dc6d9;}if(_0x1081ea['note'][_0x236b33(0x60a)](VisuMZ[_0x236b33(0x5b8)]['RegExp'][_0x236b33(0x71d)][_0x27bf1f])){var _0x4dc6d9=Number(RegExp['$1']);_0x1a3681+=_0x4dc6d9;}if(_0x1081ea[_0x236b33(0x47c)][_0x236b33(0x60a)](VisuMZ[_0x236b33(0x5b8)][_0x236b33(0xfe)]['xparamPlusJS'][_0x27bf1f])){var _0xe43866=String(RegExp['$1']);try{_0x1a3681+=eval(_0xe43866);}catch(_0x2ae99d){if($gameTemp[_0x236b33(0x6c9)]())console['log'](_0x2ae99d);}}return _0x1a3681;};return this[_0x4247c0(0x22c)]()[_0x4247c0(0xb2)](_0x57cd64,0x0);},Game_BattlerBase[_0x4e56c8(0x510)][_0x4e56c8(0x83c)]=function(_0x453de4){const _0x10f708=_0x4e56c8,_0x5e93ac=(_0x4a8cbc,_0x417988)=>{const _0x2413e7=_0x521a;if(!_0x417988)return _0x4a8cbc;if(_0x417988['note'][_0x2413e7(0x60a)](VisuMZ['CoreEngine'][_0x2413e7(0xfe)][_0x2413e7(0x669)][_0x453de4])){var _0x5d0433=Number(RegExp['$1'])/0x64;_0x4a8cbc*=_0x5d0433;}if(_0x417988['note'][_0x2413e7(0x60a)](VisuMZ[_0x2413e7(0x5b8)][_0x2413e7(0xfe)][_0x2413e7(0x137)][_0x453de4])){var _0x5d0433=Number(RegExp['$1']);_0x4a8cbc*=_0x5d0433;}if(_0x417988[_0x2413e7(0x47c)][_0x2413e7(0x60a)](VisuMZ[_0x2413e7(0x5b8)][_0x2413e7(0xfe)][_0x2413e7(0x148)][_0x453de4])){var _0x39d52a=String(RegExp['$1']);try{_0x4a8cbc*=eval(_0x39d52a);}catch(_0x4a560f){if($gameTemp[_0x2413e7(0x6c9)]())console[_0x2413e7(0x2d8)](_0x4a560f);}}return _0x4a8cbc;};return this[_0x10f708(0x22c)]()[_0x10f708(0xb2)](_0x5e93ac,0x1);},Game_BattlerBase[_0x4e56c8(0x510)][_0x4e56c8(0x854)]=function(_0x160ed2){const _0x5c3fda=_0x4e56c8,_0x472abe=(_0x3ea42f,_0x2e867d)=>{const _0x58a79f=_0x521a;if(!_0x2e867d)return _0x3ea42f;if(_0x2e867d[_0x58a79f(0x47c)][_0x58a79f(0x60a)](VisuMZ[_0x58a79f(0x5b8)][_0x58a79f(0xfe)][_0x58a79f(0x491)][_0x160ed2])){var _0x5ca88a=Number(RegExp['$1'])/0x64;_0x3ea42f+=_0x5ca88a;}if(_0x2e867d['note'][_0x58a79f(0x60a)](VisuMZ['CoreEngine'][_0x58a79f(0xfe)][_0x58a79f(0x82d)][_0x160ed2])){var _0x5ca88a=Number(RegExp['$1']);_0x3ea42f+=_0x5ca88a;}if(_0x2e867d[_0x58a79f(0x47c)][_0x58a79f(0x60a)](VisuMZ[_0x58a79f(0x5b8)][_0x58a79f(0xfe)][_0x58a79f(0x7c6)][_0x160ed2])){var _0x5433cb=String(RegExp['$1']);try{_0x3ea42f+=eval(_0x5433cb);}catch(_0x59d62e){if($gameTemp[_0x58a79f(0x6c9)]())console[_0x58a79f(0x2d8)](_0x59d62e);}}return _0x3ea42f;};return this[_0x5c3fda(0x22c)]()[_0x5c3fda(0xb2)](_0x472abe,0x0);},Game_BattlerBase[_0x4e56c8(0x510)][_0x4e56c8(0x467)]=function(_0x2be4e1){const _0x272b85=_0x4e56c8;let _0x684048=_0x272b85(0x467)+_0x2be4e1+_0x272b85(0x52f);if(this[_0x272b85(0x31f)](_0x684048))return this[_0x272b85(0x6dd)][_0x684048];return this[_0x272b85(0x6dd)][_0x684048]=VisuMZ[_0x272b85(0x5b8)][_0x272b85(0x5ce)][_0x272b85(0x2b7)][_0x272b85(0x193)][_0x272b85(0x410)](this,_0x2be4e1),this[_0x272b85(0x6dd)][_0x684048];},Game_BattlerBase[_0x4e56c8(0x510)]['sparamPlus']=function(_0x8c7bc7){const _0x2c8340=_0x4e56c8,_0x3ee591=(_0x256b9e,_0x4b2bc1)=>{const _0x1c0490=_0x521a;if(!_0x4b2bc1)return _0x256b9e;if(_0x4b2bc1[_0x1c0490(0x47c)][_0x1c0490(0x60a)](VisuMZ[_0x1c0490(0x5b8)][_0x1c0490(0xfe)][_0x1c0490(0x610)][_0x8c7bc7])){var _0x523ecb=Number(RegExp['$1'])/0x64;_0x256b9e+=_0x523ecb;}if(_0x4b2bc1['note'][_0x1c0490(0x60a)](VisuMZ[_0x1c0490(0x5b8)][_0x1c0490(0xfe)][_0x1c0490(0x297)][_0x8c7bc7])){var _0x523ecb=Number(RegExp['$1']);_0x256b9e+=_0x523ecb;}if(_0x4b2bc1[_0x1c0490(0x47c)][_0x1c0490(0x60a)](VisuMZ['CoreEngine'][_0x1c0490(0xfe)]['sparamPlusJS'][_0x8c7bc7])){var _0x24b6b6=String(RegExp['$1']);try{_0x256b9e+=eval(_0x24b6b6);}catch(_0x5a10a3){if($gameTemp[_0x1c0490(0x6c9)]())console['log'](_0x5a10a3);}}return _0x256b9e;};return this[_0x2c8340(0x22c)]()['reduce'](_0x3ee591,0x0);},Game_BattlerBase[_0x4e56c8(0x510)]['sparamRate']=function(_0x2d9f6a){const _0x195d08=_0x4e56c8,_0x1bca45=(_0x5b0a44,_0x202dab)=>{const _0x416332=_0x521a;if(!_0x202dab)return _0x5b0a44;if(_0x202dab['note'][_0x416332(0x60a)](VisuMZ[_0x416332(0x5b8)]['RegExp'][_0x416332(0x678)][_0x2d9f6a])){var _0x1e06b7=Number(RegExp['$1'])/0x64;_0x5b0a44*=_0x1e06b7;}if(_0x202dab[_0x416332(0x47c)][_0x416332(0x60a)](VisuMZ[_0x416332(0x5b8)][_0x416332(0xfe)][_0x416332(0x1ee)][_0x2d9f6a])){var _0x1e06b7=Number(RegExp['$1']);_0x5b0a44*=_0x1e06b7;}if(_0x202dab[_0x416332(0x47c)][_0x416332(0x60a)](VisuMZ[_0x416332(0x5b8)]['RegExp']['sparamRateJS'][_0x2d9f6a])){var _0x16c674=String(RegExp['$1']);try{_0x5b0a44*=eval(_0x16c674);}catch(_0x143f6c){if($gameTemp[_0x416332(0x6c9)]())console[_0x416332(0x2d8)](_0x143f6c);}}return _0x5b0a44;};return this[_0x195d08(0x22c)]()['reduce'](_0x1bca45,0x1);},Game_BattlerBase[_0x4e56c8(0x510)][_0x4e56c8(0x517)]=function(_0x1a55c6){const _0x4e1489=_0x4e56c8,_0x52a2e6=(_0x5c2242,_0x585763)=>{const _0x2dcbba=_0x521a;if(!_0x585763)return _0x5c2242;if(_0x585763[_0x2dcbba(0x47c)]['match'](VisuMZ[_0x2dcbba(0x5b8)][_0x2dcbba(0xfe)][_0x2dcbba(0x60d)][_0x1a55c6])){var _0x2a47be=Number(RegExp['$1'])/0x64;_0x5c2242+=_0x2a47be;}if(_0x585763['note'][_0x2dcbba(0x60a)](VisuMZ['CoreEngine']['RegExp'][_0x2dcbba(0x3f2)][_0x1a55c6])){var _0x2a47be=Number(RegExp['$1']);_0x5c2242+=_0x2a47be;}if(_0x585763[_0x2dcbba(0x47c)][_0x2dcbba(0x60a)](VisuMZ[_0x2dcbba(0x5b8)][_0x2dcbba(0xfe)][_0x2dcbba(0x50c)][_0x1a55c6])){var _0x44a34b=String(RegExp['$1']);try{_0x5c2242+=eval(_0x44a34b);}catch(_0x291bf9){if($gameTemp[_0x2dcbba(0x6c9)]())console[_0x2dcbba(0x2d8)](_0x291bf9);}}return _0x5c2242;};return this[_0x4e1489(0x22c)]()['reduce'](_0x52a2e6,0x0);},Game_BattlerBase[_0x4e56c8(0x510)][_0x4e56c8(0x504)]=function(_0x4a0779){const _0x5762f2=_0x4e56c8;let _0x3d2f51='sparam'+_0x4a0779+_0x5762f2(0x52f);if(this['checkCacheKey'](_0x3d2f51))return this[_0x5762f2(0x6dd)][_0x3d2f51];return this[_0x5762f2(0x6dd)][_0x3d2f51]=VisuMZ['CoreEngine']['Settings'][_0x5762f2(0x2b7)][_0x5762f2(0x40a)][_0x5762f2(0x410)](this,_0x4a0779),this[_0x5762f2(0x6dd)][_0x3d2f51];},Game_BattlerBase['prototype']['paramValueByName']=function(_0x53909b,_0x5337ab){const _0x71a292=_0x4e56c8;if(typeof paramId==='number')return this[_0x71a292(0x361)](_0x53909b);_0x53909b=String(_0x53909b||'')['toUpperCase']();if(_0x53909b==='MAXHP')return this[_0x71a292(0x361)](0x0);if(_0x53909b===_0x71a292(0x77b))return this[_0x71a292(0x361)](0x1);if(_0x53909b===_0x71a292(0x5a0))return this[_0x71a292(0x361)](0x2);if(_0x53909b===_0x71a292(0x27b))return this[_0x71a292(0x361)](0x3);if(_0x53909b===_0x71a292(0x753))return this['param'](0x4);if(_0x53909b===_0x71a292(0x754))return this[_0x71a292(0x361)](0x5);if(_0x53909b==='AGI')return this[_0x71a292(0x361)](0x6);if(_0x53909b==='LUK')return this[_0x71a292(0x361)](0x7);if(_0x53909b===_0x71a292(0x2c6))return _0x5337ab?String(Math[_0x71a292(0x263)](this[_0x71a292(0x467)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x53909b==='EVA')return _0x5337ab?String(Math[_0x71a292(0x263)](this['xparam'](0x1)*0x64))+'%':this[_0x71a292(0x467)](0x1);if(_0x53909b==='CRI')return _0x5337ab?String(Math[_0x71a292(0x263)](this[_0x71a292(0x467)](0x2)*0x64))+'%':this[_0x71a292(0x467)](0x2);if(_0x53909b===_0x71a292(0x180))return _0x5337ab?String(Math[_0x71a292(0x263)](this[_0x71a292(0x467)](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x53909b==='MEV')return _0x5337ab?String(Math[_0x71a292(0x263)](this['xparam'](0x4)*0x64))+'%':this[_0x71a292(0x467)](0x4);if(_0x53909b===_0x71a292(0x2db))return _0x5337ab?String(Math[_0x71a292(0x263)](this[_0x71a292(0x467)](0x5)*0x64))+'%':this['xparam'](0x5);if(_0x53909b===_0x71a292(0x2bc))return _0x5337ab?String(Math[_0x71a292(0x263)](this['xparam'](0x6)*0x64))+'%':this[_0x71a292(0x467)](0x6);if(_0x53909b===_0x71a292(0x381))return _0x5337ab?String(Math[_0x71a292(0x263)](this[_0x71a292(0x467)](0x7)*0x64))+'%':this[_0x71a292(0x467)](0x7);if(_0x53909b==='MRG')return _0x5337ab?String(Math[_0x71a292(0x263)](this[_0x71a292(0x467)](0x8)*0x64))+'%':this[_0x71a292(0x467)](0x8);if(_0x53909b===_0x71a292(0x670))return _0x5337ab?String(Math[_0x71a292(0x263)](this[_0x71a292(0x467)](0x9)*0x64))+'%':this[_0x71a292(0x467)](0x9);if(_0x53909b===_0x71a292(0x1ab))return _0x5337ab?String(Math['round'](this['sparam'](0x0)*0x64))+'%':this[_0x71a292(0x504)](0x0);if(_0x53909b===_0x71a292(0x7b2))return _0x5337ab?String(Math['round'](this[_0x71a292(0x504)](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x53909b===_0x71a292(0x153))return _0x5337ab?String(Math[_0x71a292(0x263)](this[_0x71a292(0x504)](0x2)*0x64))+'%':this[_0x71a292(0x504)](0x2);if(_0x53909b==='PHA')return _0x5337ab?String(Math['round'](this[_0x71a292(0x504)](0x3)*0x64))+'%':this[_0x71a292(0x504)](0x3);if(_0x53909b===_0x71a292(0x7ae))return _0x5337ab?String(Math[_0x71a292(0x263)](this['sparam'](0x4)*0x64))+'%':this[_0x71a292(0x504)](0x4);if(_0x53909b===_0x71a292(0x63a))return _0x5337ab?String(Math[_0x71a292(0x263)](this[_0x71a292(0x504)](0x5)*0x64))+'%':this[_0x71a292(0x504)](0x5);if(_0x53909b==='PDR')return _0x5337ab?String(Math[_0x71a292(0x263)](this[_0x71a292(0x504)](0x6)*0x64))+'%':this[_0x71a292(0x504)](0x6);if(_0x53909b===_0x71a292(0x43f))return _0x5337ab?String(Math['round'](this[_0x71a292(0x504)](0x7)*0x64))+'%':this[_0x71a292(0x504)](0x7);if(_0x53909b===_0x71a292(0x3bc))return _0x5337ab?String(Math[_0x71a292(0x263)](this['sparam'](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x53909b===_0x71a292(0x5b1))return _0x5337ab?String(Math[_0x71a292(0x263)](this[_0x71a292(0x504)](0x9)*0x64))+'%':this[_0x71a292(0x504)](0x9);if(VisuMZ[_0x71a292(0x5b8)][_0x71a292(0x547)][_0x53909b]){const _0x4d816b=VisuMZ[_0x71a292(0x5b8)]['CustomParamAbb'][_0x53909b],_0x13ed55=this[_0x4d816b];return VisuMZ[_0x71a292(0x5b8)][_0x71a292(0x371)][_0x53909b]===_0x71a292(0x426)?_0x13ed55:_0x5337ab?String(Math[_0x71a292(0x263)](_0x13ed55*0x64))+'%':_0x13ed55;}return'';},Game_BattlerBase['prototype']['isDying']=function(){const _0x13b579=_0x4e56c8;return this[_0x13b579(0x611)]()&&this[_0x13b579(0x264)]<this[_0x13b579(0x3a7)]*VisuMZ[_0x13b579(0x5b8)][_0x13b579(0x5ce)][_0x13b579(0x2b7)][_0x13b579(0x211)];},Game_Battler['prototype']['performMiss']=function(){const _0x7f50d2=_0x4e56c8;SoundManager[_0x7f50d2(0x1b8)](),this[_0x7f50d2(0x74)](_0x7f50d2(0x1f9));},VisuMZ['CoreEngine']['Game_Actor_paramBase']=Game_Actor['prototype'][_0x4e56c8(0x110)],Game_Actor[_0x4e56c8(0x510)][_0x4e56c8(0x110)]=function(_0x1ca927){const _0x4092cd=_0x4e56c8;if(this[_0x4092cd(0x5eb)]>0x63)return this[_0x4092cd(0x729)](_0x1ca927);return VisuMZ[_0x4092cd(0x5b8)][_0x4092cd(0x34a)][_0x4092cd(0x410)](this,_0x1ca927);},Game_Actor[_0x4e56c8(0x510)][_0x4e56c8(0x729)]=function(_0x1b56b8){const _0x4d0c3a=_0x4e56c8,_0x562c54=this['currentClass']()['params'][_0x1b56b8][0x63],_0x5c0c26=this[_0x4d0c3a(0x601)]()[_0x4d0c3a(0x231)][_0x1b56b8][0x62];return _0x562c54+(_0x562c54-_0x5c0c26)*(this[_0x4d0c3a(0x5eb)]-0x63);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x535)]=Game_Actor[_0x4e56c8(0x510)][_0x4e56c8(0x533)],Game_Actor[_0x4e56c8(0x510)][_0x4e56c8(0x533)]=function(_0x25cc66,_0x1a6e7e){const _0x3bfc72=_0x4e56c8;$gameTemp[_0x3bfc72(0x1a4)]=!![],VisuMZ['CoreEngine'][_0x3bfc72(0x535)][_0x3bfc72(0x410)](this,_0x25cc66,_0x1a6e7e),$gameTemp[_0x3bfc72(0x1a4)]=undefined;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x18b)]=Game_Actor[_0x4e56c8(0x510)][_0x4e56c8(0x3d3)],Game_Actor[_0x4e56c8(0x510)][_0x4e56c8(0x3d3)]=function(){const _0x3cdebe=_0x4e56c8;VisuMZ[_0x3cdebe(0x5b8)][_0x3cdebe(0x18b)]['call'](this);if(!$gameTemp['_changingClass'])this[_0x3cdebe(0x783)]();},Game_Actor[_0x4e56c8(0x510)][_0x4e56c8(0x783)]=function(){const _0x1e61f5=_0x4e56c8;this[_0x1e61f5(0x6dd)]={};if(VisuMZ['CoreEngine'][_0x1e61f5(0x5ce)][_0x1e61f5(0x2c9)][_0x1e61f5(0x204)])this[_0x1e61f5(0x264)]=this['mhp'];if(VisuMZ[_0x1e61f5(0x5b8)]['Settings'][_0x1e61f5(0x2c9)][_0x1e61f5(0x405)])this[_0x1e61f5(0x3b4)]=this['mmp'];},Game_Actor[_0x4e56c8(0x510)][_0x4e56c8(0x69b)]=function(){const _0x46a92f=_0x4e56c8;if(this[_0x46a92f(0x720)]())return 0x1;const _0x20c996=this[_0x46a92f(0x48a)]()-this['currentLevelExp'](),_0x1869e9=this[_0x46a92f(0x4c4)]()-this[_0x46a92f(0x7ca)]();return(_0x1869e9/_0x20c996)[_0x46a92f(0x2d2)](0x0,0x1);},Game_Actor[_0x4e56c8(0x510)][_0x4e56c8(0x22c)]=function(){const _0x34a686=_0x4e56c8,_0x400394=Game_Battler[_0x34a686(0x510)][_0x34a686(0x22c)][_0x34a686(0x410)](this);for(const _0x266a2f of this[_0x34a686(0x584)]()){_0x266a2f&&_0x400394[_0x34a686(0x5c9)](_0x266a2f);}return _0x400394[_0x34a686(0x5c9)](this['currentClass'](),this[_0x34a686(0x544)]()),_0x400394;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0xf0)]=Game_Actor['prototype'][_0x4e56c8(0x7a)],Game_Actor['prototype'][_0x4e56c8(0x7a)]=function(){const _0x47be00=_0x4e56c8;if(!$gameParty['inBattle']())return!![];return VisuMZ[_0x47be00(0x5b8)][_0x47be00(0xf0)]['call'](this);},VisuMZ[_0x4e56c8(0x5b8)]['Game_Unit_onBattleStart']=Game_Unit[_0x4e56c8(0x510)][_0x4e56c8(0xc4)],Game_Unit[_0x4e56c8(0x510)][_0x4e56c8(0xc4)]=function(_0x44ef52){const _0x11d124=_0x4e56c8;this['_inBattle']=!![],VisuMZ['CoreEngine'][_0x11d124(0x7f1)][_0x11d124(0x410)](this,_0x44ef52);},VisuMZ['CoreEngine']['Game_Unit_onBattleEnd']=Game_Unit[_0x4e56c8(0x510)][_0x4e56c8(0x3b2)],Game_Unit['prototype'][_0x4e56c8(0x3b2)]=function(){const _0x5db7c8=_0x4e56c8;for(const _0x2b2120 of this[_0x5db7c8(0x81)]()){_0x2b2120&&!_0x2b2120[_0x5db7c8(0x7a)]()&&_0x2b2120[_0x5db7c8(0x2e0)]();}VisuMZ[_0x5db7c8(0x5b8)][_0x5db7c8(0x4b6)][_0x5db7c8(0x410)](this);},Object[_0x4e56c8(0x38b)](Game_Enemy['prototype'],_0x4e56c8(0x5eb),{'get':function(){const _0x54db04=_0x4e56c8;return this[_0x54db04(0x80c)]();},'configurable':!![]}),Game_Enemy[_0x4e56c8(0x510)]['getLevel']=function(){const _0x4315a6=_0x4e56c8;return this[_0x4315a6(0x27e)]()['level'];},Game_Enemy[_0x4e56c8(0x510)][_0x4e56c8(0x77a)]=function(){const _0x53e3c5=_0x4e56c8;!this[_0x53e3c5(0xfa)]&&(this[_0x53e3c5(0x292)]+=Math[_0x53e3c5(0x263)]((Graphics[_0x53e3c5(0x1e9)]-0x270)/0x2),this['_screenY']-=Math[_0x53e3c5(0x653)]((Graphics[_0x53e3c5(0x1e9)]-Graphics[_0x53e3c5(0x106)])/0x2),$gameSystem[_0x53e3c5(0x7ad)]()?this['_screenX']-=Math['floor']((Graphics[_0x53e3c5(0x79c)]-Graphics[_0x53e3c5(0x4ae)])/0x2):this['_screenX']+=Math[_0x53e3c5(0x263)]((Graphics[_0x53e3c5(0x4ae)]-0x330)/0x2)),this[_0x53e3c5(0xfa)]=!![];},Game_Party['prototype'][_0x4e56c8(0x586)]=function(){const _0x3ac1d1=_0x4e56c8;return VisuMZ[_0x3ac1d1(0x5b8)][_0x3ac1d1(0x5ce)][_0x3ac1d1(0x4a4)][_0x3ac1d1(0x207)];},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x3bf)]=Game_Party['prototype'][_0x4e56c8(0x79e)],Game_Party['prototype'][_0x4e56c8(0x79e)]=function(_0x352a63){const _0x5b82a8=_0x4e56c8;if(VisuMZ['CoreEngine'][_0x5b82a8(0x5ce)][_0x5b82a8(0x2c9)][_0x5b82a8(0x3b7)]&&DataManager['isKeyItem'](_0x352a63))return;VisuMZ[_0x5b82a8(0x5b8)][_0x5b82a8(0x3bf)][_0x5b82a8(0x410)](this,_0x352a63);},Game_Party['prototype'][_0x4e56c8(0x82e)]=function(){const _0x47b9f6=_0x4e56c8,_0x1278f8=VisuMZ[_0x47b9f6(0x5b8)][_0x47b9f6(0x5ce)][_0x47b9f6(0x2c9)],_0x1b7e75=_0x1278f8['BTestAddedQuantity']??0x63;let _0x32a47d=[];(_0x1278f8['BTestItems']??!![])&&(_0x32a47d=_0x32a47d['concat']($dataItems));(_0x1278f8[_0x47b9f6(0x593)]??!![])&&(_0x32a47d=_0x32a47d[_0x47b9f6(0x7ab)]($dataWeapons));(_0x1278f8[_0x47b9f6(0x3eb)]??!![])&&(_0x32a47d=_0x32a47d[_0x47b9f6(0x7ab)]($dataArmors));for(const _0xa5ee4e of _0x32a47d){if(!_0xa5ee4e)continue;if(_0xa5ee4e[_0x47b9f6(0x9f)][_0x47b9f6(0x519)]()<=0x0)continue;if(_0xa5ee4e[_0x47b9f6(0x9f)][_0x47b9f6(0x60a)](/-----/i))continue;this[_0x47b9f6(0x11a)](_0xa5ee4e,_0x1b7e75);}},VisuMZ['CoreEngine'][_0x4e56c8(0x418)]=Game_Troop[_0x4e56c8(0x510)][_0x4e56c8(0x28b)],Game_Troop[_0x4e56c8(0x510)][_0x4e56c8(0x28b)]=function(_0x34aab4){const _0x463580=_0x4e56c8;$gameTemp[_0x463580(0x634)](),$gameTemp[_0x463580(0x43b)](_0x34aab4),VisuMZ[_0x463580(0x5b8)][_0x463580(0x418)][_0x463580(0x410)](this,_0x34aab4);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x390)]=Game_Map['prototype'][_0x4e56c8(0x28b)],Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x28b)]=function(_0x57b291){const _0x4b8a04=_0x4e56c8;VisuMZ[_0x4b8a04(0x5b8)][_0x4b8a04(0x390)][_0x4b8a04(0x410)](this,_0x57b291),this[_0x4b8a04(0x625)](),this['setupCoreEngine'](_0x57b291),this['setupTileExtendTerrainTags']();},Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x4b8)]=function(){const _0x42063a=_0x4e56c8;this[_0x42063a(0x6d2)]=VisuMZ['CoreEngine'][_0x42063a(0x5ce)][_0x42063a(0x2c9)][_0x42063a(0x485)]||![];const _0xe54b9=VisuMZ[_0x42063a(0x5b8)][_0x42063a(0x5ce)][_0x42063a(0x234)],_0x4d7e38=$dataMap?$dataMap[_0x42063a(0x47c)]||'':'';if(_0x4d7e38[_0x42063a(0x60a)](/<SHOW TILE SHADOWS>/i))this[_0x42063a(0x6d2)]=![];else _0x4d7e38[_0x42063a(0x60a)](/<HIDE TILE SHADOWS>/i)&&(this[_0x42063a(0x6d2)]=!![]);if(_0x4d7e38['match'](/<SCROLL LOCK X>/i))this['centerCameraCheckData']()['centerX']=!![],this['centerCameraCheckData']()[_0x42063a(0x22a)]=_0xe54b9[_0x42063a(0x56c)];else _0x4d7e38[_0x42063a(0x60a)](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x42063a(0x3c3)]()[_0x42063a(0x7e5)]=!![],this['centerCameraCheckData']()['displayX']=Number(RegExp['$1']));if(_0x4d7e38['match'](/<SCROLL LOCK Y>/i))this[_0x42063a(0x3c3)]()[_0x42063a(0x4a6)]=!![],this[_0x42063a(0x3c3)]()[_0x42063a(0x15b)]=_0xe54b9[_0x42063a(0x12a)];else _0x4d7e38[_0x42063a(0x60a)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x42063a(0x3c3)]()[_0x42063a(0x4a6)]=!![],this[_0x42063a(0x3c3)]()[_0x42063a(0x15b)]=Number(RegExp['$1']));},Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x849)]=function(){const _0x5e983c=_0x4e56c8;if(this['_hideTileShadows']===undefined)this[_0x5e983c(0x4b8)]();return this[_0x5e983c(0x6d2)];},Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x625)]=function(){const _0x38fbbf=_0x4e56c8,_0x2d9434=VisuMZ[_0x38fbbf(0x5b8)][_0x38fbbf(0x5ce)]['ScreenResolution'];this[_0x38fbbf(0x5f5)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x2d9434[_0x38fbbf(0x73b)]){const _0x4e157d=Graphics[_0x38fbbf(0x79c)]/this[_0x38fbbf(0x717)]();_0x4e157d%0x1!==0x0&&Math[_0x38fbbf(0xc0)](_0x4e157d)===this[_0x38fbbf(0x79c)]()&&!this['isLoopHorizontal']()&&(this[_0x38fbbf(0x5f5)][_0x38fbbf(0x7e5)]=!![],this[_0x38fbbf(0x5f5)][_0x38fbbf(0x22a)]=_0x2d9434[_0x38fbbf(0x56c)]||0x0);}if(_0x2d9434[_0x38fbbf(0x79b)]){const _0x38a787=Graphics[_0x38fbbf(0x1e9)]/this[_0x38fbbf(0x5ef)]();_0x38a787%0x1!==0x0&&Math[_0x38fbbf(0xc0)](_0x38a787)===this[_0x38fbbf(0x1e9)]()&&!this[_0x38fbbf(0x216)]()&&(this[_0x38fbbf(0x5f5)][_0x38fbbf(0x4a6)]=!![],this['_centerCameraCheck']['displayY']=_0x2d9434['DisplayLockY']||0x0);}$gameScreen[_0x38fbbf(0x1dc)]()===0x1&&(this[_0x38fbbf(0x3c3)]()[_0x38fbbf(0x7e5)]&&(this['_displayX']=this[_0x38fbbf(0x3c3)]()[_0x38fbbf(0x22a)]),this[_0x38fbbf(0x3c3)]()[_0x38fbbf(0x4a6)]&&(this[_0x38fbbf(0x70b)]=this[_0x38fbbf(0x3c3)]()[_0x38fbbf(0x15b)]));},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5a8)]=Game_Map['prototype'][_0x4e56c8(0x442)],Game_Map[_0x4e56c8(0x510)]['setDisplayPos']=function(_0x2689aa,_0x33e3aa){const _0x55d854=_0x4e56c8;VisuMZ['CoreEngine'][_0x55d854(0x5a8)][_0x55d854(0x410)](this,_0x2689aa,_0x33e3aa),$gameScreen[_0x55d854(0x1dc)]()===0x1&&(!this[_0x55d854(0x26a)]()&&this[_0x55d854(0x3c3)]()[_0x55d854(0x7e5)]&&(this[_0x55d854(0x5c5)]=this[_0x55d854(0x3c3)]()[_0x55d854(0x22a)]),!this['isLoopVertical']()&&this[_0x55d854(0x3c3)]()[_0x55d854(0x4a6)]&&(this[_0x55d854(0x70b)]=this[_0x55d854(0x3c3)]()[_0x55d854(0x15b)]));},Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x3c3)]=function(){const _0xc70e73=_0x4e56c8;if(this[_0xc70e73(0x5f5)]===undefined)this[_0xc70e73(0x625)]();return this[_0xc70e73(0x5f5)];},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x557)]=Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x508)],Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x508)]=function(_0x5c0066){const _0x4ff363=_0x4e56c8;if(this['centerCameraCheckData']()[_0x4ff363(0x4a6)]&&$gameScreen[_0x4ff363(0x1dc)]()===0x1){this['_displayY']=this[_0x4ff363(0x3c3)]()['displayY'];return;}VisuMZ[_0x4ff363(0x5b8)][_0x4ff363(0x557)][_0x4ff363(0x410)](this,_0x5c0066);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x334)]=Game_Map['prototype']['scrollLeft'],Game_Map['prototype'][_0x4e56c8(0x362)]=function(_0x3596b4){const _0x9385f8=_0x4e56c8;if(this['centerCameraCheckData']()[_0x9385f8(0x7e5)]&&$gameScreen[_0x9385f8(0x1dc)]()===0x1){this[_0x9385f8(0x5c5)]=this[_0x9385f8(0x3c3)]()[_0x9385f8(0x22a)];return;}VisuMZ[_0x9385f8(0x5b8)]['Game_Map_scrollLeft'][_0x9385f8(0x410)](this,_0x3596b4);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x60c)]=Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x7b0)],Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x7b0)]=function(_0x4d407a){const _0x143f08=_0x4e56c8;if(this[_0x143f08(0x3c3)]()['centerX']&&$gameScreen[_0x143f08(0x1dc)]()===0x1){this[_0x143f08(0x5c5)]=this['centerCameraCheckData']()[_0x143f08(0x22a)];return;}VisuMZ['CoreEngine'][_0x143f08(0x60c)][_0x143f08(0x410)](this,_0x4d407a);},VisuMZ['CoreEngine'][_0x4e56c8(0x58d)]=Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x79d)],Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x79d)]=function(_0x51078f){const _0x541987=_0x4e56c8;if(this['centerCameraCheckData']()[_0x541987(0x4a6)]&&$gameScreen[_0x541987(0x1dc)]()===0x1){this[_0x541987(0x70b)]=this[_0x541987(0x3c3)]()['displayY'];return;}VisuMZ[_0x541987(0x5b8)][_0x541987(0x58d)]['call'](this,_0x51078f);},Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0xac)]=function(){const _0x165a27=_0x4e56c8;this[_0x165a27(0xd6)]={};const _0x20ff27=this[_0x165a27(0x122)]();if(!_0x20ff27)return{};const _0x47509a=_0x20ff27[_0x165a27(0x47c)]||'',_0x2dd9cf=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x1830af={};const _0x1da196=_0x47509a[_0x165a27(0x60a)](_0x2dd9cf);if(_0x1da196)for(const _0xc86854 of _0x1da196){_0xc86854[_0x165a27(0x60a)](_0x2dd9cf);const _0x4fa26e=Number(RegExp['$1'])[_0x165a27(0x2d2)](0x1,0x10),_0x4205d0=String(RegExp['$2'])[_0x165a27(0x85a)](',')['map'](_0xc9238b=>Number(_0xc9238b)['clamp'](0x1,0x7));for(const _0x94773e of _0x4205d0){_0x1830af[_0x94773e]=_0x4fa26e;}}this[_0x165a27(0xd6)]=_0x1830af;},Game_Map['prototype'][_0x4e56c8(0x3aa)]=function(){const _0x43252e=_0x4e56c8;if(this[_0x43252e(0xd6)]===undefined)this[_0x43252e(0xac)]();return this[_0x43252e(0xd6)];},Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x139)]=function(_0x28bc06){const _0x4d1392=_0x4e56c8;if(_0x28bc06>=0x400)return![];const _0x25eda0=$gameMap['getTileExtendTerrainTags']();if(Object[_0x4d1392(0x14d)](_0x25eda0)['length']<=0x0)return![];const _0x358c0a=this[_0x4d1392(0x17d)](),_0x5723cf=_0x358c0a[_0x28bc06]>>0xc,_0xd1b167=_0x25eda0[_0x5723cf]||0x0;return _0xd1b167>0x0;},VisuMZ['CoreEngine'][_0x4e56c8(0x14b)]=Game_Map['prototype'][_0x4e56c8(0xe0)],Game_Map['prototype'][_0x4e56c8(0xe0)]=function(_0x145a9c){const _0x1f3bfb=_0x4e56c8;VisuMZ[_0x1f3bfb(0x5b8)][_0x1f3bfb(0x14b)][_0x1f3bfb(0x410)](this,_0x145a9c),this['refreshSpritesetForExtendedTiles'](),SceneManager[_0x1f3bfb(0x7f6)]['_spriteset'][_0x1f3bfb(0x5b3)]();},Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0xea)]=function(){const _0x357b31=_0x4e56c8,_0x35fb6c=this['getTileExtendTerrainTags']();if(Object[_0x357b31(0x14d)](_0x35fb6c)[_0x357b31(0x323)]<=0x0)return;const _0x248223=SceneManager[_0x357b31(0x7f6)][_0x357b31(0x294)];_0x248223&&(_0x248223[_0x357b31(0x4eb)]&&_0x248223[_0x357b31(0x4eb)](),_0x248223[_0x357b31(0x240)]&&_0x248223[_0x357b31(0x240)]());},VisuMZ[_0x4e56c8(0x5b8)]['Game_Character_processMoveCommand']=Game_Character['prototype']['processMoveCommand'],Game_Character[_0x4e56c8(0x510)][_0x4e56c8(0x71a)]=function(_0x53371d){const _0x1b2180=_0x4e56c8;try{VisuMZ['CoreEngine'][_0x1b2180(0x6cd)][_0x1b2180(0x410)](this,_0x53371d);}catch(_0x2d64ef){if($gameTemp[_0x1b2180(0x6c9)]())console['log'](_0x2d64ef);}},Game_Player['prototype']['makeEncounterCount']=function(){const _0xe13510=_0x4e56c8,_0xc1d6b7=$gameMap['encounterStep']();this[_0xe13510(0x561)]=Math[_0xe13510(0x184)](_0xc1d6b7)+Math['randomInt'](_0xc1d6b7)+this[_0xe13510(0x602)]();},Game_Player[_0x4e56c8(0x510)]['encounterStepsMinimum']=function(){const _0x52a364=_0x4e56c8;return $dataMap&&$dataMap['note']&&$dataMap[_0x52a364(0x47c)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x52a364(0x5b8)][_0x52a364(0x5ce)]['QoL'][_0x52a364(0x202)];},VisuMZ[_0x4e56c8(0x5b8)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x4e56c8(0x510)][_0x4e56c8(0x4c2)],Game_Event['prototype']['isCollidedWithEvents']=function(_0x232db6,_0x500fde){const _0x473b49=_0x4e56c8;return this['isSmartEventCollisionOn']()?this[_0x473b49(0x449)](_0x232db6,_0x500fde):VisuMZ['CoreEngine']['Game_Event_isCollidedWithEvents'][_0x473b49(0x410)](this,_0x232db6,_0x500fde);},Game_Event[_0x4e56c8(0x510)][_0x4e56c8(0x18d)]=function(){const _0x48a277=_0x4e56c8;return VisuMZ['CoreEngine'][_0x48a277(0x5ce)][_0x48a277(0x2c9)]['SmartEventCollisionPriority'];},Game_Event[_0x4e56c8(0x510)][_0x4e56c8(0x449)]=function(_0x576c68,_0x318cec){const _0x5f0db3=_0x4e56c8;if(!this[_0x5f0db3(0x2c0)]())return![];else{const _0x4e5b94=$gameMap[_0x5f0db3(0x7e0)](_0x576c68,_0x318cec)[_0x5f0db3(0x842)](_0x147084=>_0x147084['isNormalPriority']());return _0x4e5b94['length']>0x0;}},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x300)]=Game_Interpreter[_0x4e56c8(0x510)][_0x4e56c8(0x28d)],Game_Interpreter[_0x4e56c8(0x510)][_0x4e56c8(0x28d)]=function(_0x4d7089){const _0x412311=_0x4e56c8,_0x54cc49=this[_0x412311(0x47d)]();return _0x54cc49[_0x412311(0x60a)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x412311(0x203)](_0x54cc49):VisuMZ[_0x412311(0x5b8)][_0x412311(0x300)]['call'](this,_0x4d7089);},Game_Interpreter[_0x4e56c8(0x510)][_0x4e56c8(0x47d)]=function(){const _0x4b7a8c=_0x4e56c8;let _0x13e90f='',_0x523f6e=this[_0x4b7a8c(0x61e)]+0x1;while(this[_0x4b7a8c(0x52b)][_0x523f6e]&&this['_list'][_0x523f6e]['code']===0x195){_0x13e90f+=this[_0x4b7a8c(0x52b)][_0x523f6e][_0x4b7a8c(0xd9)][0x0]+'\x0a',_0x523f6e++;}return _0x13e90f;},Game_Interpreter[_0x4e56c8(0x510)][_0x4e56c8(0x203)]=function(_0x1aecc2){const _0x1f5158=_0x4e56c8;try{eval(_0x1aecc2);}catch(_0x1dea0f){$gameTemp['isPlaytest']()&&(console['log'](_0x1f5158(0x4f3)),console[_0x1f5158(0x2d8)](_0x1dea0f));}return!![];},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0xb9)]=Game_Interpreter[_0x4e56c8(0x510)][_0x4e56c8(0x29c)],Game_Interpreter[_0x4e56c8(0x510)][_0x4e56c8(0x29c)]=function(_0x34366b){const _0x4bae39=_0x4e56c8;try{VisuMZ['CoreEngine'][_0x4bae39(0xb9)][_0x4bae39(0x410)](this,_0x34366b);}catch(_0x1b743d){$gameTemp[_0x4bae39(0x6c9)]()&&(console[_0x4bae39(0x2d8)](_0x4bae39(0x374)),console[_0x4bae39(0x2d8)](_0x1b743d)),this['skipBranch']();}return!![];},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x10b)]=Game_Interpreter[_0x4e56c8(0x510)][_0x4e56c8(0x2f3)],Game_Interpreter['prototype'][_0x4e56c8(0x2f3)]=function(_0x478d49){const _0x14f33c=_0x4e56c8;try{VisuMZ[_0x14f33c(0x5b8)][_0x14f33c(0x10b)][_0x14f33c(0x410)](this,_0x478d49);}catch(_0xffb806){$gameTemp[_0x14f33c(0x6c9)]()&&(console['log'](_0x14f33c(0x7d2)),console[_0x14f33c(0x2d8)](_0xffb806));}return!![];},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x12d)]=Game_Interpreter[_0x4e56c8(0x510)][_0x4e56c8(0x3cd)],Game_Interpreter[_0x4e56c8(0x510)][_0x4e56c8(0x3cd)]=function(){const _0x444371=_0x4e56c8;try{VisuMZ[_0x444371(0x5b8)][_0x444371(0x12d)]['call'](this);}catch(_0x5733f7){$gameTemp[_0x444371(0x6c9)]()&&(console[_0x444371(0x2d8)]('Script\x20Call\x20Error'),console[_0x444371(0x2d8)](_0x5733f7));}return!![];},VisuMZ[_0x4e56c8(0x5b8)]['Game_Interpreter_PluginCommand']=Game_Interpreter['prototype'][_0x4e56c8(0x628)],Game_Interpreter[_0x4e56c8(0x510)][_0x4e56c8(0x628)]=function(_0x53ce32){const _0x1591a6=_0x4e56c8;return $gameTemp[_0x1591a6(0x340)](this),VisuMZ[_0x1591a6(0x5b8)][_0x1591a6(0x80)][_0x1591a6(0x410)](this,_0x53ce32);},Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x1fb)]=function(){const _0x1dab06=_0x4e56c8;return VisuMZ['CoreEngine']['Settings']['UI'][_0x1dab06(0x750)];},Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x1f5)]=function(){const _0x2cfcde=_0x4e56c8;return VisuMZ['CoreEngine'][_0x2cfcde(0x5ce)]['UI'][_0x2cfcde(0x70d)];},Scene_Base['prototype'][_0x4e56c8(0x27c)]=function(){const _0x36f14c=_0x4e56c8;return VisuMZ['CoreEngine'][_0x36f14c(0x5ce)]['UI']['BottomButtons'];},Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x466)]=function(){const _0x10a1bc=_0x4e56c8;return VisuMZ[_0x10a1bc(0x5b8)]['Settings']['UI'][_0x10a1bc(0x55f)];},Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x289)]=function(){const _0x1226c4=_0x4e56c8;return VisuMZ['CoreEngine'][_0x1226c4(0x5ce)]['UI'][_0x1226c4(0x617)];},Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x1d0)]=function(){const _0x362ec4=_0x4e56c8;return VisuMZ['CoreEngine'][_0x362ec4(0x5ce)]['UI'][_0x362ec4(0x619)];},Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x5c3)]=function(){const _0x4c0283=_0x4e56c8;return VisuMZ[_0x4c0283(0x5b8)][_0x4c0283(0x5ce)][_0x4c0283(0x18f)]['EnableMasking'];},VisuMZ['CoreEngine']['Scene_Base_createWindowLayer']=Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x4ef)],Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x4ef)]=function(){const _0x53e95e=_0x4e56c8;VisuMZ[_0x53e95e(0x5b8)][_0x53e95e(0x1c4)][_0x53e95e(0x410)](this),this[_0x53e95e(0x243)](),this['createTextPopupWindow'](),this[_0x53e95e(0x6e6)]['x']=Math[_0x53e95e(0x263)](this[_0x53e95e(0x6e6)]['x']),this[_0x53e95e(0x6e6)]['y']=Math[_0x53e95e(0x263)](this[_0x53e95e(0x6e6)]['y']);},Scene_Base['prototype']['createButtonAssistWindow']=function(){},Scene_Base[_0x4e56c8(0x510)]['createTextPopupWindow']=function(){const _0x205a7e=_0x4e56c8;this[_0x205a7e(0x3b8)]=new Window_TextPopup(),this[_0x205a7e(0x100)](this[_0x205a7e(0x3b8)]);},$textPopup=function(_0xd00936){const _0x992c1c=_0x4e56c8,_0x50a61c=SceneManager[_0x992c1c(0x7f6)][_0x992c1c(0x3b8)];_0x50a61c&&_0x50a61c['addQueue'](_0xd00936);},Scene_Base['prototype']['buttonAssistKey1']=function(){const _0x31507b=_0x4e56c8;return TextManager[_0x31507b(0x3a6)](_0x31507b(0x772),'pagedown');},Scene_Base['prototype'][_0x4e56c8(0x6c6)]=function(){const _0xb96526=_0x4e56c8;return TextManager[_0xb96526(0x282)]('tab');},Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x433)]=function(){const _0x1c093f=_0x4e56c8;return TextManager[_0x1c093f(0x282)](_0x1c093f(0x61c));},Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x77e)]=function(){const _0x3b779d=_0x4e56c8;return TextManager[_0x3b779d(0x282)]('ok');},Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x6b9)]=function(){const _0x47577a=_0x4e56c8;return TextManager[_0x47577a(0x282)]('cancel');},Scene_Base['prototype'][_0x4e56c8(0x590)]=function(){const _0x266385=_0x4e56c8;return this[_0x266385(0x89)]&&this[_0x266385(0x89)]['visible']?TextManager[_0x266385(0x404)]:'';},Scene_Base['prototype'][_0x4e56c8(0x68b)]=function(){return'';},Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x364)]=function(){return'';},Scene_Base[_0x4e56c8(0x510)]['buttonAssistText4']=function(){const _0x4aae1c=_0x4e56c8;return TextManager[_0x4aae1c(0x4df)];},Scene_Base['prototype']['buttonAssistText5']=function(){const _0x3d48e8=_0x4e56c8;return TextManager[_0x3d48e8(0x225)];},Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x4aa)]=function(){return 0x0;},Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x30b)]=function(){return 0x0;},Scene_Base['prototype'][_0x4e56c8(0x6ec)]=function(){return 0x0;},Scene_Base['prototype'][_0x4e56c8(0x118)]=function(){return 0x0;},Scene_Base['prototype'][_0x4e56c8(0x331)]=function(){return 0x0;},VisuMZ['CoreEngine']['Scene_Boot_loadSystemImages']=Scene_Boot[_0x4e56c8(0x510)][_0x4e56c8(0x573)],Scene_Boot[_0x4e56c8(0x510)]['loadSystemImages']=function(){const _0x588001=_0x4e56c8;VisuMZ['CoreEngine'][_0x588001(0x2ff)]['call'](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x4e56c8(0x510)][_0x4e56c8(0x408)]=function(){const _0x20e223=_0x4e56c8,_0x3c5d36=[_0x20e223(0x74c),_0x20e223(0x801),_0x20e223(0x687),_0x20e223(0x85f),_0x20e223(0x6a5),_0x20e223(0x154),_0x20e223(0x659),_0x20e223(0x84),_0x20e223(0x5ee),_0x20e223(0x355),_0x20e223(0x48b),_0x20e223(0x6b4),'titles1',_0x20e223(0x3b9)];for(const _0x3c80aa of _0x3c5d36){const _0x354587=VisuMZ[_0x20e223(0x5b8)][_0x20e223(0x5ce)]['ImgLoad'][_0x3c80aa],_0x58816d=_0x20e223(0x824)[_0x20e223(0x6d4)](_0x3c80aa);for(const _0x2a8099 of _0x354587){ImageManager[_0x20e223(0x1d2)](_0x58816d,_0x2a8099);}}},VisuMZ['CoreEngine'][_0x4e56c8(0x2e3)]=Scene_Boot[_0x4e56c8(0x510)][_0x4e56c8(0x7e4)],Scene_Boot['prototype'][_0x4e56c8(0x7e4)]=function(){const _0x355b12=_0x4e56c8;Utils[_0x355b12(0x2b2)]('test')&&VisuMZ[_0x355b12(0x5b8)][_0x355b12(0x5ce)][_0x355b12(0x2c9)][_0x355b12(0x689)]?this[_0x355b12(0x5f7)]():VisuMZ[_0x355b12(0x5b8)]['Scene_Boot_startNormalGame']['call'](this);},Scene_Boot[_0x4e56c8(0x510)][_0x4e56c8(0x5f7)]=function(){const _0x20afd8=_0x4e56c8;this['checkPlayerLocation'](),DataManager[_0x20afd8(0x3db)](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x4e56c8(0x510)][_0x4e56c8(0x54c)]=function(){const _0x136ac9=_0x4e56c8,_0x212a44=$dataSystem[_0x136ac9(0x1c7)]['uiAreaWidth'],_0x2446b1=$dataSystem[_0x136ac9(0x1c7)]['uiAreaHeight'],_0x1115ec=VisuMZ[_0x136ac9(0x5b8)][_0x136ac9(0x5ce)]['UI'][_0x136ac9(0x36a)];Graphics['boxWidth']=_0x212a44-_0x1115ec*0x2,Graphics[_0x136ac9(0x106)]=_0x2446b1-_0x1115ec*0x2,this[_0x136ac9(0x4f7)]();},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x767)]=Scene_Boot[_0x4e56c8(0x510)]['updateDocumentTitle'],Scene_Boot[_0x4e56c8(0x510)][_0x4e56c8(0x604)]=function(){const _0x27a2ad=_0x4e56c8;this['isFullDocumentTitle']()?this['makeDocumentTitle']():VisuMZ[_0x27a2ad(0x5b8)]['Scene_Boot_updateDocumentTitle'][_0x27a2ad(0x410)](this);},Scene_Boot[_0x4e56c8(0x510)]['isFullDocumentTitle']=function(){const _0x5dbe88=_0x4e56c8;if(Scene_Title[_0x5dbe88(0x1d6)]==='')return![];if(Scene_Title[_0x5dbe88(0x1d6)]===_0x5dbe88(0xe2))return![];if(Scene_Title['version']==='')return![];if(Scene_Title['version']==='0.00')return![];return!![];},Scene_Boot[_0x4e56c8(0x510)][_0x4e56c8(0x164)]=function(){const _0x28ce1c=_0x4e56c8,_0x4449d8=$dataSystem[_0x28ce1c(0x191)],_0x4972fb=Scene_Title[_0x28ce1c(0x1d6)]||'',_0x41d7db=Scene_Title['version']||'',_0x2c5fad=VisuMZ[_0x28ce1c(0x5b8)][_0x28ce1c(0x5ce)][_0x28ce1c(0x597)]['Title']['DocumentTitleFmt'],_0x3a03ff=_0x2c5fad[_0x28ce1c(0x6d4)](_0x4449d8,_0x4972fb,_0x41d7db);document['title']=_0x3a03ff;},Scene_Boot['prototype'][_0x4e56c8(0x4f7)]=function(){const _0x500435=_0x4e56c8;if(VisuMZ[_0x500435(0x5b8)][_0x500435(0x5ce)]['UI'][_0x500435(0x808)]){const _0x31cd2d=Graphics['width']-Graphics[_0x500435(0x4ae)]-VisuMZ[_0x500435(0x5b8)][_0x500435(0x5ce)]['UI'][_0x500435(0x36a)]*0x2,_0x21eb39=Sprite_Button[_0x500435(0x510)]['blockWidth'][_0x500435(0x410)](this)*0x4;if(_0x31cd2d>=_0x21eb39)SceneManager[_0x500435(0x1ba)](!![]);}},Scene_Title[_0x4e56c8(0x1d6)]=VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)][_0x4e56c8(0x597)][_0x4e56c8(0x57a)]['Subtitle'],Scene_Title[_0x4e56c8(0xf1)]=VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)]['MenuLayout'][_0x4e56c8(0x57a)][_0x4e56c8(0x201)],Scene_Title[_0x4e56c8(0x25c)]=VisuMZ[_0x4e56c8(0x5b8)]['Settings'][_0x4e56c8(0x382)],VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x253)]=Scene_Title['prototype'][_0x4e56c8(0x85d)],Scene_Title[_0x4e56c8(0x510)]['drawGameTitle']=function(){const _0xd0871b=_0x4e56c8;VisuMZ[_0xd0871b(0x5b8)][_0xd0871b(0x5ce)]['MenuLayout'][_0xd0871b(0x57a)]['drawGameTitle'][_0xd0871b(0x410)](this);if(Scene_Title[_0xd0871b(0x1d6)]!==''&&Scene_Title['subtitle']!==_0xd0871b(0xe2))this['drawGameSubtitle']();if(Scene_Title[_0xd0871b(0xf1)]!==''&&Scene_Title[_0xd0871b(0xf1)]!==_0xd0871b(0x1e5))this[_0xd0871b(0x214)]();},Scene_Title[_0x4e56c8(0x510)][_0x4e56c8(0x305)]=function(){const _0xce9e51=_0x4e56c8;VisuMZ['CoreEngine'][_0xce9e51(0x5ce)][_0xce9e51(0x597)][_0xce9e51(0x57a)]['drawGameSubtitle'][_0xce9e51(0x410)](this);},Scene_Title['prototype'][_0x4e56c8(0x214)]=function(){const _0x56865d=_0x4e56c8;VisuMZ[_0x56865d(0x5b8)]['Settings'][_0x56865d(0x597)][_0x56865d(0x57a)][_0x56865d(0x214)]['call'](this);},Scene_Title[_0x4e56c8(0x510)][_0x4e56c8(0x676)]=function(){const _0x310831=_0x4e56c8;this[_0x310831(0x7b5)]();const _0x2c2d21=$dataSystem[_0x310831(0x1ef)][_0x310831(0x6e0)],_0x81e923=this['commandWindowRect']();this[_0x310831(0x38d)]=new Window_TitleCommand(_0x81e923),this[_0x310831(0x38d)][_0x310831(0x317)](_0x2c2d21);const _0x4875dc=this[_0x310831(0x6aa)]();this[_0x310831(0x38d)]['move'](_0x4875dc['x'],_0x4875dc['y'],_0x4875dc[_0x310831(0x79c)],_0x4875dc[_0x310831(0x1e9)]),this[_0x310831(0x38d)][_0x310831(0x858)](),this[_0x310831(0x38d)][_0x310831(0x501)](),this[_0x310831(0x38d)][_0x310831(0x4e8)](),this['addWindow'](this[_0x310831(0x38d)]);},Scene_Title[_0x4e56c8(0x510)][_0x4e56c8(0x141)]=function(){const _0x404d28=_0x4e56c8;return this[_0x404d28(0x38d)]?this[_0x404d28(0x38d)][_0x404d28(0x595)]():VisuMZ[_0x404d28(0x5b8)][_0x404d28(0x5ce)][_0x404d28(0x78d)][_0x404d28(0x323)];},Scene_Title[_0x4e56c8(0x510)][_0x4e56c8(0x6aa)]=function(){const _0x870524=_0x4e56c8;return VisuMZ['CoreEngine'][_0x870524(0x5ce)]['MenuLayout']['Title'][_0x870524(0x6b3)][_0x870524(0x410)](this);},Scene_Title[_0x4e56c8(0x510)][_0x4e56c8(0x7b5)]=function(){const _0x7efc35=_0x4e56c8;for(const _0xfd2c5a of Scene_Title[_0x7efc35(0x25c)]){const _0x362753=new Sprite_TitlePictureButton(_0xfd2c5a);this[_0x7efc35(0x100)](_0x362753);}},VisuMZ['CoreEngine']['Scene_Map_initialize']=Scene_Map[_0x4e56c8(0x510)]['initialize'],Scene_Map[_0x4e56c8(0x510)]['initialize']=function(){const _0x32e5ca=_0x4e56c8;VisuMZ['CoreEngine'][_0x32e5ca(0x29b)][_0x32e5ca(0x410)](this),$gameTemp[_0x32e5ca(0x634)](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x4e56c8(0x5b8)]['Scene_Map_updateMainMultiply']=Scene_Map[_0x4e56c8(0x510)][_0x4e56c8(0x6ad)],Scene_Map[_0x4e56c8(0x510)]['updateMainMultiply']=function(){const _0x3523c3=_0x4e56c8;VisuMZ[_0x3523c3(0x5b8)][_0x3523c3(0xe6)][_0x3523c3(0x410)](this),$gameTemp[_0x3523c3(0x6b2)]&&!$gameMessage[_0x3523c3(0x55c)]()&&(this['updateMain'](),SceneManager[_0x3523c3(0x312)]());},Scene_Map[_0x4e56c8(0x510)]['terminate']=function(){const _0x2d88b8=_0x4e56c8;Scene_Message[_0x2d88b8(0x510)][_0x2d88b8(0x434)][_0x2d88b8(0x410)](this),!SceneManager[_0x2d88b8(0x415)](Scene_Battle)&&(this[_0x2d88b8(0x294)]['update'](),this['_mapNameWindow'][_0x2d88b8(0x72b)](),this[_0x2d88b8(0x6e6)]['visible']=![],SceneManager[_0x2d88b8(0x115)]()),$gameScreen['clearZoom'](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x4e56c8(0x5b8)]['Scene_Map_createMenuButton']=Scene_Map[_0x4e56c8(0x510)][_0x4e56c8(0xa2)],Scene_Map[_0x4e56c8(0x510)][_0x4e56c8(0xa2)]=function(){const _0x1e27ea=_0x4e56c8;VisuMZ[_0x1e27ea(0x5b8)]['Scene_Map_createMenuButton'][_0x1e27ea(0x410)](this),SceneManager[_0x1e27ea(0x775)]()&&this[_0x1e27ea(0x2d7)]();},Scene_Map[_0x4e56c8(0x510)][_0x4e56c8(0x2d7)]=function(){const _0xfb5b23=_0x4e56c8;this[_0xfb5b23(0x301)]['x']=Graphics[_0xfb5b23(0x4ae)]+0x4;},VisuMZ['CoreEngine'][_0x4e56c8(0x5a3)]=Scene_Map[_0x4e56c8(0x510)][_0x4e56c8(0x4f5)],Scene_Map['prototype'][_0x4e56c8(0x4f5)]=function(){const _0x6119ad=_0x4e56c8;VisuMZ['CoreEngine'][_0x6119ad(0x5a3)][_0x6119ad(0x410)](this),this[_0x6119ad(0x46d)]();},Scene_Map[_0x4e56c8(0x510)][_0x4e56c8(0x46d)]=function(){const _0x1c344e=_0x4e56c8;Input[_0x1c344e(0x552)](_0x1c344e(0x2a0))&&(ConfigManager[_0x1c344e(0x6ab)]=!ConfigManager['alwaysDash'],ConfigManager[_0x1c344e(0x2b8)]());},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x623)]=Scene_Map[_0x4e56c8(0x510)]['updateMain'],Scene_Map['prototype'][_0x4e56c8(0x51d)]=function(){const _0x78dad4=_0x4e56c8;VisuMZ[_0x78dad4(0x5b8)][_0x78dad4(0x623)][_0x78dad4(0x410)](this),this[_0x78dad4(0x748)]();},Scene_Map['prototype'][_0x4e56c8(0x2d6)]=function(){this['_onceParallelInterpreters']=[];},Scene_Map[_0x4e56c8(0x510)][_0x4e56c8(0x748)]=function(){const _0x4ccab8=_0x4e56c8;if(!this[_0x4ccab8(0x5ba)])return;for(const _0x1d1a77 of this[_0x4ccab8(0x5ba)]){_0x1d1a77&&_0x1d1a77['update']();}},Scene_Map[_0x4e56c8(0x510)][_0x4e56c8(0x70f)]=function(_0xff43f1,_0x4b893a){const _0x3ada2b=_0x4e56c8,_0x3c22ad=$dataCommonEvents[_0xff43f1];if(!_0x3c22ad)return;const _0xd60432=new Game_OnceParallelInterpreter();this[_0x3ada2b(0x50d)](_0xd60432),_0xd60432[_0x3ada2b(0x3c2)](_0xff43f1),_0xd60432['setEvent'](_0x4b893a);},Scene_Map['prototype'][_0x4e56c8(0x50d)]=function(_0x30cf1d){const _0x4b023d=_0x4e56c8;this[_0x4b023d(0x5ba)]=this[_0x4b023d(0x5ba)]||[],this[_0x4b023d(0x5ba)][_0x4b023d(0x5c9)](_0x30cf1d);},Scene_Map[_0x4e56c8(0x510)][_0x4e56c8(0x591)]=function(_0xf8e26e){const _0x33a6e2=_0x4e56c8;this[_0x33a6e2(0x5ba)]=this[_0x33a6e2(0x5ba)]||[],this[_0x33a6e2(0x5ba)][_0x33a6e2(0x2e8)](_0xf8e26e);};function Game_OnceParallelInterpreter(){const _0x574af6=_0x4e56c8;this[_0x574af6(0x5e5)](...arguments);}function _0x521a(_0x537b24,_0x4895f7){const _0x13059e=_0x1305();return _0x521a=function(_0x521a79,_0x1295cb){_0x521a79=_0x521a79-0x6f;let _0x2ca8fc=_0x13059e[_0x521a79];return _0x2ca8fc;},_0x521a(_0x537b24,_0x4895f7);}Game_OnceParallelInterpreter[_0x4e56c8(0x510)]=Object[_0x4e56c8(0x3ba)](Game_Interpreter[_0x4e56c8(0x510)]),Game_OnceParallelInterpreter[_0x4e56c8(0x510)][_0x4e56c8(0x2e1)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype']['setCommonEvent']=function(_0x3d2263){const _0x12f90a=_0x4e56c8,_0x6d7946=$dataCommonEvents[_0x3d2263];_0x6d7946?this[_0x12f90a(0x28b)](_0x6d7946[_0x12f90a(0x144)],0x0):this[_0x12f90a(0x434)]();},Game_OnceParallelInterpreter[_0x4e56c8(0x510)][_0x4e56c8(0x570)]=function(_0x32f30d){const _0x56e1ae=_0x4e56c8;this[_0x56e1ae(0x368)]=_0x32f30d||0x0;},Game_OnceParallelInterpreter['prototype'][_0x4e56c8(0x434)]=function(){const _0x2c1c7b=_0x4e56c8;if(!SceneManager[_0x2c1c7b(0x738)]())return;SceneManager[_0x2c1c7b(0x7f6)][_0x2c1c7b(0x591)](this),Game_Interpreter['prototype'][_0x2c1c7b(0x434)][_0x2c1c7b(0x410)](this);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x1e0)]=Scene_MenuBase[_0x4e56c8(0x510)]['helpAreaTop'],Scene_MenuBase['prototype']['helpAreaTop']=function(){const _0x18fe73=_0x4e56c8;let _0x557bdd=0x0;return SceneManager[_0x18fe73(0x2c5)]()?_0x557bdd=this[_0x18fe73(0x583)]():_0x557bdd=VisuMZ['CoreEngine'][_0x18fe73(0x1e0)][_0x18fe73(0x410)](this),_0x557bdd;},Scene_MenuBase[_0x4e56c8(0x510)][_0x4e56c8(0x583)]=function(){const _0x1f4893=_0x4e56c8;return this[_0x1f4893(0x1f5)]()?this['mainAreaBottom']():0x0;},VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x4e56c8(0x510)]['mainAreaTop'],Scene_MenuBase[_0x4e56c8(0x510)][_0x4e56c8(0x65a)]=function(){const _0x56b95b=_0x4e56c8;return SceneManager[_0x56b95b(0x2c5)]()?this[_0x56b95b(0x76d)]():VisuMZ[_0x56b95b(0x5b8)][_0x56b95b(0x102)][_0x56b95b(0x410)](this);},Scene_MenuBase[_0x4e56c8(0x510)][_0x4e56c8(0x76d)]=function(){const _0x34a528=_0x4e56c8;if(!this[_0x34a528(0x1f5)]())return this['helpAreaBottom']();else return this['isMenuButtonAssistEnabled']()&&this[_0x34a528(0x2ed)]()==='top'?Window_ButtonAssist['prototype'][_0x34a528(0x7d3)]():0x0;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ac)]=Scene_MenuBase[_0x4e56c8(0x510)][_0x4e56c8(0x588)],Scene_MenuBase['prototype'][_0x4e56c8(0x588)]=function(){const _0x460065=_0x4e56c8;let _0x54adea=0x0;return SceneManager[_0x460065(0x2c5)]()?_0x54adea=this[_0x460065(0x339)]():_0x54adea=VisuMZ[_0x460065(0x5b8)][_0x460065(0x5ac)][_0x460065(0x410)](this),this[_0x460065(0x4bf)]()&&this['getButtonAssistLocation']()!==_0x460065(0x64b)&&(_0x54adea-=Window_ButtonAssist[_0x460065(0x510)][_0x460065(0x7d3)]()),_0x54adea;},Scene_MenuBase['prototype'][_0x4e56c8(0x339)]=function(){const _0x48c382=_0x4e56c8;return Graphics[_0x48c382(0x106)]-this['helpAreaHeight']();},VisuMZ[_0x4e56c8(0x5b8)]['Scene_MenuBase_createBackground']=Scene_MenuBase['prototype'][_0x4e56c8(0x59a)],Scene_MenuBase['prototype'][_0x4e56c8(0x59a)]=function(){const _0x3bd70b=_0x4e56c8,_0x431916=VisuMZ[_0x3bd70b(0x5b8)][_0x3bd70b(0x5ce)]['MenuBg'][_0x3bd70b(0xb4)]??0x8;this[_0x3bd70b(0x57f)]=new PIXI['filters'][(_0x3bd70b(0xce))](_0x431916),this[_0x3bd70b(0x6d1)]=new Sprite(),this['_backgroundSprite'][_0x3bd70b(0x134)]=SceneManager['backgroundBitmap'](),this[_0x3bd70b(0x6d1)][_0x3bd70b(0x72e)]=[this[_0x3bd70b(0x57f)]],this[_0x3bd70b(0x100)](this[_0x3bd70b(0x6d1)]),this[_0x3bd70b(0x261)](0xc0),this[_0x3bd70b(0x261)](this['getBackgroundOpacity']()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x4e56c8(0x510)][_0x4e56c8(0x67c)]=function(){const _0xc5f66f=_0x4e56c8,_0x554e43=String(this[_0xc5f66f(0x2e1)][_0xc5f66f(0x9f)]),_0x59cf70=this[_0xc5f66f(0x534)](_0x554e43);return _0x59cf70?_0x59cf70[_0xc5f66f(0x536)]:0xc0;},Scene_MenuBase[_0x4e56c8(0x510)]['createCustomBackgroundImages']=function(){const _0xec3755=_0x4e56c8,_0xdfcab4=String(this[_0xec3755(0x2e1)][_0xec3755(0x9f)]),_0x4a02f6=this[_0xec3755(0x534)](_0xdfcab4);_0x4a02f6&&(_0x4a02f6['BgFilename1']!==''||_0x4a02f6[_0xec3755(0x6bb)]!=='')&&(this[_0xec3755(0xe8)]=new Sprite(ImageManager[_0xec3755(0x170)](_0x4a02f6['BgFilename1'])),this['_backSprite2']=new Sprite(ImageManager[_0xec3755(0x198)](_0x4a02f6[_0xec3755(0x6bb)])),this[_0xec3755(0x100)](this[_0xec3755(0xe8)]),this['addChild'](this['_backSprite2']),this[_0xec3755(0xe8)][_0xec3755(0x134)][_0xec3755(0x4b4)](this[_0xec3755(0x9a)][_0xec3755(0x223)](this,this[_0xec3755(0xe8)])),this[_0xec3755(0x4f9)]['bitmap'][_0xec3755(0x4b4)](this[_0xec3755(0x9a)]['bind'](this,this[_0xec3755(0x4f9)])));},Scene_MenuBase['prototype']['getCustomBackgroundSettings']=function(_0x4ddd3b){const _0x47ad94=_0x4e56c8;return VisuMZ[_0x47ad94(0x5b8)]['Settings']['MenuBg'][_0x4ddd3b]||VisuMZ[_0x47ad94(0x5b8)][_0x47ad94(0x5ce)]['MenuBg'][_0x47ad94(0x114)];},Scene_MenuBase[_0x4e56c8(0x510)][_0x4e56c8(0x9a)]=function(_0x4d230e){const _0x208900=_0x4e56c8;this[_0x208900(0x299)](_0x4d230e),this[_0x208900(0x3e1)](_0x4d230e);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x6a9)]=Scene_MenuBase['prototype'][_0x4e56c8(0x267)],Scene_MenuBase[_0x4e56c8(0x510)][_0x4e56c8(0x267)]=function(){const _0xde4026=_0x4e56c8;VisuMZ[_0xde4026(0x5b8)][_0xde4026(0x6a9)][_0xde4026(0x410)](this),SceneManager[_0xde4026(0x775)]()&&this[_0xde4026(0x63f)]();},Scene_MenuBase[_0x4e56c8(0x510)][_0x4e56c8(0x63f)]=function(){const _0x56508c=_0x4e56c8;this[_0x56508c(0x255)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x4e56c8(0x5b8)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase['prototype'][_0x4e56c8(0x372)],Scene_MenuBase['prototype'][_0x4e56c8(0x372)]=function(){const _0x48ab5f=_0x4e56c8;VisuMZ[_0x48ab5f(0x5b8)]['Scene_MenuBase_createPageButtons'][_0x48ab5f(0x410)](this),SceneManager[_0x48ab5f(0x775)]()&&this['movePageButtonSideButtonLayout']();},Scene_MenuBase[_0x4e56c8(0x510)][_0x4e56c8(0x580)]=function(){const _0x49a383=_0x4e56c8;this['_pageupButton']['x']=-0x1*(this[_0x49a383(0x89)][_0x49a383(0x79c)]+this[_0x49a383(0x682)][_0x49a383(0x79c)]+0x8),this[_0x49a383(0x682)]['x']=-0x1*(this['_pagedownButton'][_0x49a383(0x79c)]+0x4);},Scene_MenuBase[_0x4e56c8(0x510)][_0x4e56c8(0x4bf)]=function(){const _0x55f943=_0x4e56c8;return VisuMZ[_0x55f943(0x5b8)]['Settings'][_0x55f943(0x21c)]['Enable'];},Scene_MenuBase[_0x4e56c8(0x510)]['getButtonAssistLocation']=function(){const _0x1190a2=_0x4e56c8;return SceneManager[_0x1190a2(0x775)]()||SceneManager[_0x1190a2(0x61a)]()?VisuMZ[_0x1190a2(0x5b8)]['Settings']['ButtonAssist'][_0x1190a2(0xd1)]:_0x1190a2(0x64b);},Scene_MenuBase[_0x4e56c8(0x510)][_0x4e56c8(0x243)]=function(){const _0x110457=_0x4e56c8;if(!this[_0x110457(0x4bf)]())return;const _0x7d3986=this['buttonAssistWindowRect']();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x7d3986),this[_0x110457(0x6a3)](this[_0x110457(0x2c3)]);},Scene_MenuBase[_0x4e56c8(0x510)]['buttonAssistWindowRect']=function(){const _0x2e54f0=_0x4e56c8;return this[_0x2e54f0(0x2ed)]()===_0x2e54f0(0x64b)?this['buttonAssistWindowButtonRect']():this['buttonAssistWindowSideRect']();},Scene_MenuBase[_0x4e56c8(0x510)][_0x4e56c8(0x259)]=function(){const _0x90d486=_0x4e56c8,_0x25e96b=ConfigManager['touchUI']?(Sprite_Button[_0x90d486(0x510)][_0x90d486(0x400)]()+0x6)*0x2:0x0,_0xc5202f=this[_0x90d486(0x4a1)](),_0x220771=Graphics['boxWidth']-_0x25e96b*0x2,_0xeb7a56=this[_0x90d486(0x1d0)]();return new Rectangle(_0x25e96b,_0xc5202f,_0x220771,_0xeb7a56);},Scene_MenuBase[_0x4e56c8(0x510)]['buttonAssistWindowSideRect']=function(){const _0x2eb4b1=_0x4e56c8,_0x4c0619=Graphics[_0x2eb4b1(0x4ae)],_0x2e1669=Window_ButtonAssist['prototype'][_0x2eb4b1(0x7d3)](),_0x539cc7=0x0;let _0x1df100=0x0;return this[_0x2eb4b1(0x2ed)]()===_0x2eb4b1(0x385)?_0x1df100=0x0:_0x1df100=Graphics[_0x2eb4b1(0x106)]-_0x2e1669,new Rectangle(_0x539cc7,_0x1df100,_0x4c0619,_0x2e1669);},Scene_Menu['layoutSettings']=VisuMZ['CoreEngine'][_0x4e56c8(0x5ce)][_0x4e56c8(0x597)]['MainMenu'],VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x14a)]=Scene_Menu[_0x4e56c8(0x510)][_0x4e56c8(0x3ba)],Scene_Menu['prototype'][_0x4e56c8(0x3ba)]=function(){const _0x36d0fe=_0x4e56c8;VisuMZ[_0x36d0fe(0x5b8)][_0x36d0fe(0x14a)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu[_0x4e56c8(0x510)][_0x4e56c8(0xb0)]=function(){const _0x1a231b=_0x4e56c8;this[_0x1a231b(0x38d)]&&this[_0x1a231b(0x38d)]['setBackgroundType'](Scene_Menu[_0x1a231b(0x5b5)][_0x1a231b(0x475)]),this['_goldWindow']&&this[_0x1a231b(0x175)]['setBackgroundType'](Scene_Menu[_0x1a231b(0x5b5)][_0x1a231b(0x1d1)]),this[_0x1a231b(0x1cf)]&&this[_0x1a231b(0x1cf)][_0x1a231b(0x317)](Scene_Menu[_0x1a231b(0x5b5)][_0x1a231b(0x787)]);},Scene_Menu[_0x4e56c8(0x510)][_0x4e56c8(0x6aa)]=function(){const _0x3e489a=_0x4e56c8;return Scene_Menu[_0x3e489a(0x5b5)][_0x3e489a(0x6b3)][_0x3e489a(0x410)](this);},Scene_Menu['prototype'][_0x4e56c8(0x66c)]=function(){const _0x4c1f17=_0x4e56c8;return Scene_Menu[_0x4c1f17(0x5b5)][_0x4c1f17(0xa4)][_0x4c1f17(0x410)](this);},Scene_Menu[_0x4e56c8(0x510)][_0x4e56c8(0x6be)]=function(){const _0x325af0=_0x4e56c8;return Scene_Menu['layoutSettings'][_0x325af0(0x447)][_0x325af0(0x410)](this);},Scene_Item[_0x4e56c8(0x5b5)]=VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)]['MenuLayout'][_0x4e56c8(0x6e5)],VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x13b)]=Scene_Item[_0x4e56c8(0x510)][_0x4e56c8(0x3ba)],Scene_Item['prototype'][_0x4e56c8(0x3ba)]=function(){const _0x3e2903=_0x4e56c8;VisuMZ[_0x3e2903(0x5b8)]['Scene_Item_create']['call'](this),this[_0x3e2903(0xb0)]();},Scene_Item[_0x4e56c8(0x510)][_0x4e56c8(0xb0)]=function(){const _0x2f90cf=_0x4e56c8;this[_0x2f90cf(0x55b)]&&this[_0x2f90cf(0x55b)]['setBackgroundType'](Scene_Item[_0x2f90cf(0x5b5)][_0x2f90cf(0x59f)]),this[_0x2f90cf(0x6b1)]&&this[_0x2f90cf(0x6b1)][_0x2f90cf(0x317)](Scene_Item[_0x2f90cf(0x5b5)][_0x2f90cf(0x564)]),this['_itemWindow']&&this[_0x2f90cf(0x1f1)][_0x2f90cf(0x317)](Scene_Item[_0x2f90cf(0x5b5)]['ItemBgType']),this[_0x2f90cf(0x80f)]&&this[_0x2f90cf(0x80f)]['setBackgroundType'](Scene_Item[_0x2f90cf(0x5b5)][_0x2f90cf(0x394)]);},Scene_Item['prototype']['helpWindowRect']=function(){const _0x30936f=_0x4e56c8;return Scene_Item[_0x30936f(0x5b5)][_0x30936f(0x6a1)][_0x30936f(0x410)](this);},Scene_Item[_0x4e56c8(0x510)][_0x4e56c8(0x25e)]=function(){const _0x485747=_0x4e56c8;return Scene_Item[_0x485747(0x5b5)][_0x485747(0x81b)][_0x485747(0x410)](this);},Scene_Item['prototype']['itemWindowRect']=function(){const _0x5d8ef2=_0x4e56c8;return Scene_Item['layoutSettings'][_0x5d8ef2(0x3c4)][_0x5d8ef2(0x410)](this);},Scene_Item[_0x4e56c8(0x510)][_0x4e56c8(0x51a)]=function(){const _0xb884e4=_0x4e56c8;return Scene_Item[_0xb884e4(0x5b5)]['ActorRect'][_0xb884e4(0x410)](this);},Scene_Skill[_0x4e56c8(0x5b5)]=VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)]['MenuLayout'][_0x4e56c8(0x780)],VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0xda)]=Scene_Skill[_0x4e56c8(0x510)]['create'],Scene_Skill[_0x4e56c8(0x510)][_0x4e56c8(0x3ba)]=function(){const _0x400920=_0x4e56c8;VisuMZ['CoreEngine']['Scene_Skill_create']['call'](this),this[_0x400920(0xb0)]();},Scene_Skill['prototype'][_0x4e56c8(0xb0)]=function(){const _0x39c747=_0x4e56c8;this[_0x39c747(0x55b)]&&this['_helpWindow']['setBackgroundType'](Scene_Skill['layoutSettings']['HelpBgType']),this[_0x39c747(0x859)]&&this[_0x39c747(0x859)][_0x39c747(0x317)](Scene_Skill[_0x39c747(0x5b5)][_0x39c747(0x188)]),this['_statusWindow']&&this['_statusWindow']['setBackgroundType'](Scene_Skill[_0x39c747(0x5b5)][_0x39c747(0x787)]),this[_0x39c747(0x1f1)]&&this[_0x39c747(0x1f1)]['setBackgroundType'](Scene_Skill[_0x39c747(0x5b5)][_0x39c747(0x6fb)]),this[_0x39c747(0x80f)]&&this['_actorWindow'][_0x39c747(0x317)](Scene_Skill[_0x39c747(0x5b5)][_0x39c747(0x394)]);},Scene_Skill[_0x4e56c8(0x510)]['helpWindowRect']=function(){const _0x27036c=_0x4e56c8;return Scene_Skill[_0x27036c(0x5b5)]['HelpRect']['call'](this);},Scene_Skill[_0x4e56c8(0x510)][_0x4e56c8(0x31d)]=function(){const _0x96c58=_0x4e56c8;return Scene_Skill[_0x96c58(0x5b5)]['SkillTypeRect']['call'](this);},Scene_Skill['prototype'][_0x4e56c8(0x6be)]=function(){const _0x291bb2=_0x4e56c8;return Scene_Skill[_0x291bb2(0x5b5)][_0x291bb2(0x447)][_0x291bb2(0x410)](this);},Scene_Skill[_0x4e56c8(0x510)]['itemWindowRect']=function(){const _0x1bbff0=_0x4e56c8;return Scene_Skill[_0x1bbff0(0x5b5)][_0x1bbff0(0x3c4)]['call'](this);},Scene_Skill[_0x4e56c8(0x510)]['actorWindowRect']=function(){const _0xd59d24=_0x4e56c8;return Scene_Skill[_0xd59d24(0x5b5)][_0xd59d24(0x46e)][_0xd59d24(0x410)](this);},Scene_Equip[_0x4e56c8(0x5b5)]=VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)]['MenuLayout']['EquipMenu'],VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x674)]=Scene_Equip['prototype'][_0x4e56c8(0x3ba)],Scene_Equip['prototype']['create']=function(){const _0x2e3d10=_0x4e56c8;VisuMZ['CoreEngine'][_0x2e3d10(0x674)][_0x2e3d10(0x410)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip[_0x4e56c8(0x510)]['setCoreEngineUpdateWindowBg']=function(){const _0x25405a=_0x4e56c8;this['_helpWindow']&&this[_0x25405a(0x55b)]['setBackgroundType'](Scene_Equip['layoutSettings']['HelpBgType']),this['_statusWindow']&&this[_0x25405a(0x1cf)][_0x25405a(0x317)](Scene_Equip[_0x25405a(0x5b5)]['StatusBgType']),this[_0x25405a(0x38d)]&&this[_0x25405a(0x38d)][_0x25405a(0x317)](Scene_Equip[_0x25405a(0x5b5)]['CommandBgType']),this[_0x25405a(0x233)]&&this['_slotWindow'][_0x25405a(0x317)](Scene_Equip[_0x25405a(0x5b5)]['SlotBgType']),this['_itemWindow']&&this[_0x25405a(0x1f1)][_0x25405a(0x317)](Scene_Equip[_0x25405a(0x5b5)][_0x25405a(0x6fb)]);},Scene_Equip[_0x4e56c8(0x510)][_0x4e56c8(0x105)]=function(){const _0x385911=_0x4e56c8;return Scene_Equip[_0x385911(0x5b5)][_0x385911(0x6a1)]['call'](this);},Scene_Equip[_0x4e56c8(0x510)]['statusWindowRect']=function(){const _0x7e3b1d=_0x4e56c8;return Scene_Equip[_0x7e3b1d(0x5b5)][_0x7e3b1d(0x447)][_0x7e3b1d(0x410)](this);},Scene_Equip[_0x4e56c8(0x510)]['commandWindowRect']=function(){const _0x146cca=_0x4e56c8;return Scene_Equip[_0x146cca(0x5b5)]['CommandRect'][_0x146cca(0x410)](this);},Scene_Equip['prototype'][_0x4e56c8(0x853)]=function(){const _0x249107=_0x4e56c8;return Scene_Equip[_0x249107(0x5b5)][_0x249107(0x2b5)][_0x249107(0x410)](this);},Scene_Equip[_0x4e56c8(0x510)]['itemWindowRect']=function(){const _0x348958=_0x4e56c8;return Scene_Equip['layoutSettings'][_0x348958(0x3c4)][_0x348958(0x410)](this);},Scene_Status['layoutSettings']=VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)]['MenuLayout']['StatusMenu'],VisuMZ[_0x4e56c8(0x5b8)]['Scene_Status_create']=Scene_Status[_0x4e56c8(0x510)][_0x4e56c8(0x3ba)],Scene_Status['prototype'][_0x4e56c8(0x3ba)]=function(){const _0x3b32ec=_0x4e56c8;VisuMZ[_0x3b32ec(0x5b8)]['Scene_Status_create']['call'](this),this[_0x3b32ec(0xb0)]();},Scene_Status[_0x4e56c8(0x510)][_0x4e56c8(0xb0)]=function(){const _0x2732ea=_0x4e56c8;this['_profileWindow']&&this[_0x2732ea(0x6f2)][_0x2732ea(0x317)](Scene_Status[_0x2732ea(0x5b5)]['ProfileBgType']),this[_0x2732ea(0x1cf)]&&this[_0x2732ea(0x1cf)][_0x2732ea(0x317)](Scene_Status['layoutSettings'][_0x2732ea(0x787)]),this[_0x2732ea(0x724)]&&this[_0x2732ea(0x724)][_0x2732ea(0x317)](Scene_Status[_0x2732ea(0x5b5)][_0x2732ea(0x70c)]),this[_0x2732ea(0x540)]&&this['_statusEquipWindow'][_0x2732ea(0x317)](Scene_Status[_0x2732ea(0x5b5)][_0x2732ea(0x46f)]);},Scene_Status[_0x4e56c8(0x510)][_0x4e56c8(0x671)]=function(){const _0x3b3181=_0x4e56c8;return Scene_Status['layoutSettings'][_0x3b3181(0x4b5)]['call'](this);},Scene_Status[_0x4e56c8(0x510)][_0x4e56c8(0x6be)]=function(){const _0x1cb365=_0x4e56c8;return Scene_Status[_0x1cb365(0x5b5)]['StatusRect'][_0x1cb365(0x410)](this);},Scene_Status['prototype']['statusParamsWindowRect']=function(){const _0x2129eb=_0x4e56c8;return Scene_Status[_0x2129eb(0x5b5)][_0x2129eb(0x5aa)][_0x2129eb(0x410)](this);},Scene_Status[_0x4e56c8(0x510)]['statusEquipWindowRect']=function(){return Scene_Status['layoutSettings']['StatusEquipRect']['call'](this);},Scene_Options['layoutSettings']=VisuMZ[_0x4e56c8(0x5b8)]['Settings'][_0x4e56c8(0x597)]['OptionsMenu'],VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x67d)]=Scene_Options[_0x4e56c8(0x510)][_0x4e56c8(0x3ba)],Scene_Options[_0x4e56c8(0x510)]['create']=function(){const _0x45e738=_0x4e56c8;VisuMZ['CoreEngine'][_0x45e738(0x67d)][_0x45e738(0x410)](this),this[_0x45e738(0xb0)]();},Scene_Options['prototype'][_0x4e56c8(0xb0)]=function(){const _0x2a79bb=_0x4e56c8;this[_0x2a79bb(0x2d0)]&&this['_optionsWindow']['setBackgroundType'](Scene_Options[_0x2a79bb(0x5b5)]['OptionsBgType']);},Scene_Options[_0x4e56c8(0x510)][_0x4e56c8(0x800)]=function(){const _0xc8e686=_0x4e56c8;return Scene_Options[_0xc8e686(0x5b5)][_0xc8e686(0x4a3)]['call'](this);},Scene_Save[_0x4e56c8(0x5b5)]=VisuMZ[_0x4e56c8(0x5b8)]['Settings']['MenuLayout'][_0x4e56c8(0xe5)],Scene_Save[_0x4e56c8(0x510)][_0x4e56c8(0x3ba)]=function(){const _0x591a99=_0x4e56c8;Scene_File[_0x591a99(0x510)][_0x591a99(0x3ba)]['call'](this),this[_0x591a99(0xb0)]();},Scene_Save['prototype'][_0x4e56c8(0xb0)]=function(){const _0x266d35=_0x4e56c8;this['_helpWindow']&&this[_0x266d35(0x55b)]['setBackgroundType'](Scene_Save[_0x266d35(0x5b5)][_0x266d35(0x59f)]),this[_0x266d35(0x5c4)]&&this[_0x266d35(0x5c4)][_0x266d35(0x317)](Scene_Save['layoutSettings']['ListBgType']);},Scene_Save['prototype'][_0x4e56c8(0x105)]=function(){const _0x553022=_0x4e56c8;return Scene_Save['layoutSettings'][_0x553022(0x6a1)][_0x553022(0x410)](this);},Scene_Save[_0x4e56c8(0x510)][_0x4e56c8(0x565)]=function(){const _0x411baa=_0x4e56c8;return Scene_Save[_0x411baa(0x5b5)]['ListRect'][_0x411baa(0x410)](this);},Scene_Load[_0x4e56c8(0x5b5)]=VisuMZ[_0x4e56c8(0x5b8)]['Settings'][_0x4e56c8(0x597)]['LoadMenu'],Scene_Load['prototype']['create']=function(){const _0x199f2d=_0x4e56c8;Scene_File[_0x199f2d(0x510)]['create'][_0x199f2d(0x410)](this),this[_0x199f2d(0xb0)]();},Scene_Load[_0x4e56c8(0x510)][_0x4e56c8(0xb0)]=function(){const _0x40dddb=_0x4e56c8;this[_0x40dddb(0x55b)]&&this[_0x40dddb(0x55b)]['setBackgroundType'](Scene_Load[_0x40dddb(0x5b5)]['HelpBgType']),this[_0x40dddb(0x5c4)]&&this[_0x40dddb(0x5c4)][_0x40dddb(0x317)](Scene_Load[_0x40dddb(0x5b5)]['ListBgType']);},Scene_Load[_0x4e56c8(0x510)]['helpWindowRect']=function(){const _0x1bb7d8=_0x4e56c8;return Scene_Load[_0x1bb7d8(0x5b5)][_0x1bb7d8(0x6a1)][_0x1bb7d8(0x410)](this);},Scene_Load[_0x4e56c8(0x510)]['listWindowRect']=function(){const _0x1d483b=_0x4e56c8;return Scene_Load[_0x1d483b(0x5b5)][_0x1d483b(0x6eb)]['call'](this);};function Scene_QuickLoad(){this['initialize'](...arguments);}Scene_QuickLoad[_0x4e56c8(0x510)]=Object[_0x4e56c8(0x3ba)](Scene_Load[_0x4e56c8(0x510)]),Scene_QuickLoad[_0x4e56c8(0x510)][_0x4e56c8(0x2e1)]=Scene_QuickLoad,Scene_QuickLoad[_0x4e56c8(0x510)][_0x4e56c8(0x5e5)]=function(){const _0x1a38eb=_0x4e56c8;Scene_Load['prototype'][_0x1a38eb(0x5e5)][_0x1a38eb(0x410)](this);},Scene_QuickLoad[_0x4e56c8(0x510)][_0x4e56c8(0x3ba)]=function(){const _0x562147=_0x4e56c8;this[_0x562147(0x846)](this[_0x562147(0x4ee)]);},Scene_QuickLoad[_0x4e56c8(0x510)]['prepare']=function(_0x2d952e){const _0xd45589=_0x4e56c8;this[_0xd45589(0x4ee)]=_0x2d952e;},Scene_QuickLoad['prototype'][_0x4e56c8(0x59c)]=function(){const _0x33681b=_0x4e56c8;Scene_MenuBase[_0x33681b(0x510)][_0x33681b(0x59c)][_0x33681b(0x410)](this);},Scene_GameEnd[_0x4e56c8(0x5b5)]=VisuMZ['CoreEngine'][_0x4e56c8(0x5ce)][_0x4e56c8(0x597)][_0x4e56c8(0x7a1)],VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x213)]=Scene_GameEnd[_0x4e56c8(0x510)][_0x4e56c8(0x59a)],Scene_GameEnd[_0x4e56c8(0x510)][_0x4e56c8(0x59a)]=function(){const _0xdfa4cd=_0x4e56c8;Scene_MenuBase[_0xdfa4cd(0x510)][_0xdfa4cd(0x59a)][_0xdfa4cd(0x410)](this);},Scene_GameEnd[_0x4e56c8(0x510)][_0x4e56c8(0x676)]=function(){const _0x18c966=_0x4e56c8,_0x584e3b=this[_0x18c966(0x6aa)]();this[_0x18c966(0x38d)]=new Window_GameEnd(_0x584e3b),this['_commandWindow'][_0x18c966(0x2a7)](_0x18c966(0x26b),this[_0x18c966(0x47b)][_0x18c966(0x223)](this)),this[_0x18c966(0x6a3)](this[_0x18c966(0x38d)]),this[_0x18c966(0x38d)][_0x18c966(0x317)](Scene_GameEnd[_0x18c966(0x5b5)][_0x18c966(0x475)]);},Scene_GameEnd[_0x4e56c8(0x510)][_0x4e56c8(0x6aa)]=function(){const _0x1cd156=_0x4e56c8;return Scene_GameEnd[_0x1cd156(0x5b5)][_0x1cd156(0x6b3)][_0x1cd156(0x410)](this);},Scene_Shop[_0x4e56c8(0x5b5)]=VisuMZ[_0x4e56c8(0x5b8)]['Settings'][_0x4e56c8(0x597)][_0x4e56c8(0x6f6)],VisuMZ['CoreEngine'][_0x4e56c8(0x3bd)]=Scene_Shop[_0x4e56c8(0x510)][_0x4e56c8(0x3ba)],Scene_Shop['prototype'][_0x4e56c8(0x3ba)]=function(){const _0x319abe=_0x4e56c8;VisuMZ[_0x319abe(0x5b8)]['Scene_Shop_create'][_0x319abe(0x410)](this),this[_0x319abe(0xb0)]();},Scene_Shop['prototype'][_0x4e56c8(0xb0)]=function(){const _0x47979f=_0x4e56c8;this[_0x47979f(0x55b)]&&this[_0x47979f(0x55b)][_0x47979f(0x317)](Scene_Shop[_0x47979f(0x5b5)][_0x47979f(0x59f)]),this['_goldWindow']&&this['_goldWindow'][_0x47979f(0x317)](Scene_Shop[_0x47979f(0x5b5)][_0x47979f(0x1d1)]),this['_commandWindow']&&this[_0x47979f(0x38d)][_0x47979f(0x317)](Scene_Shop[_0x47979f(0x5b5)][_0x47979f(0x475)]),this[_0x47979f(0x399)]&&this[_0x47979f(0x399)][_0x47979f(0x317)](Scene_Shop['layoutSettings'][_0x47979f(0x269)]),this[_0x47979f(0x453)]&&this[_0x47979f(0x453)][_0x47979f(0x317)](Scene_Shop[_0x47979f(0x5b5)][_0x47979f(0x85c)]),this[_0x47979f(0x1cf)]&&this[_0x47979f(0x1cf)][_0x47979f(0x317)](Scene_Shop[_0x47979f(0x5b5)][_0x47979f(0x787)]),this['_buyWindow']&&this[_0x47979f(0x37c)][_0x47979f(0x317)](Scene_Shop[_0x47979f(0x5b5)][_0x47979f(0x123)]),this['_categoryWindow']&&this[_0x47979f(0x6b1)][_0x47979f(0x317)](Scene_Shop[_0x47979f(0x5b5)][_0x47979f(0x564)]),this['_sellWindow']&&this[_0x47979f(0x1d9)][_0x47979f(0x317)](Scene_Shop[_0x47979f(0x5b5)]['SellBgType']);},Scene_Shop[_0x4e56c8(0x510)][_0x4e56c8(0x105)]=function(){const _0x476ed3=_0x4e56c8;return Scene_Shop[_0x476ed3(0x5b5)][_0x476ed3(0x6a1)]['call'](this);},Scene_Shop['prototype'][_0x4e56c8(0x66c)]=function(){const _0x1cb746=_0x4e56c8;return Scene_Shop[_0x1cb746(0x5b5)][_0x1cb746(0xa4)][_0x1cb746(0x410)](this);},Scene_Shop[_0x4e56c8(0x510)][_0x4e56c8(0x6aa)]=function(){const _0x207816=_0x4e56c8;return Scene_Shop[_0x207816(0x5b5)]['CommandRect'][_0x207816(0x410)](this);},Scene_Shop['prototype'][_0x4e56c8(0x101)]=function(){const _0x5c4ce6=_0x4e56c8;return Scene_Shop['layoutSettings'][_0x5c4ce6(0x688)][_0x5c4ce6(0x410)](this);},Scene_Shop[_0x4e56c8(0x510)][_0x4e56c8(0x3f1)]=function(){const _0x512ba7=_0x4e56c8;return Scene_Shop[_0x512ba7(0x5b5)]['NumberRect'][_0x512ba7(0x410)](this);},Scene_Shop['prototype'][_0x4e56c8(0x6be)]=function(){const _0x14cd09=_0x4e56c8;return Scene_Shop[_0x14cd09(0x5b5)]['StatusRect'][_0x14cd09(0x410)](this);},Scene_Shop['prototype'][_0x4e56c8(0x326)]=function(){const _0x19f848=_0x4e56c8;return Scene_Shop[_0x19f848(0x5b5)]['BuyRect'][_0x19f848(0x410)](this);},Scene_Shop[_0x4e56c8(0x510)][_0x4e56c8(0x25e)]=function(){const _0x14dc65=_0x4e56c8;return Scene_Shop[_0x14dc65(0x5b5)]['CategoryRect']['call'](this);},Scene_Shop[_0x4e56c8(0x510)][_0x4e56c8(0x66e)]=function(){const _0x434396=_0x4e56c8;return Scene_Shop[_0x434396(0x5b5)][_0x434396(0x1ff)]['call'](this);},Scene_Name[_0x4e56c8(0x5b5)]=VisuMZ[_0x4e56c8(0x5b8)]['Settings'][_0x4e56c8(0x597)]['NameMenu'],VisuMZ[_0x4e56c8(0x5b8)]['Scene_Name_create']=Scene_Name[_0x4e56c8(0x510)][_0x4e56c8(0x3ba)],Scene_Name[_0x4e56c8(0x510)]['create']=function(){const _0x2a1c3a=_0x4e56c8;VisuMZ['CoreEngine']['Scene_Name_create'][_0x2a1c3a(0x410)](this),this[_0x2a1c3a(0xb0)]();},Scene_Name[_0x4e56c8(0x510)][_0x4e56c8(0xb0)]=function(){const _0x10d9b5=_0x4e56c8;this[_0x10d9b5(0x352)]&&this['_editWindow'][_0x10d9b5(0x317)](Scene_Name[_0x10d9b5(0x5b5)][_0x10d9b5(0x1db)]),this[_0x10d9b5(0x3a9)]&&this[_0x10d9b5(0x3a9)][_0x10d9b5(0x317)](Scene_Name['layoutSettings']['InputBgType']);},Scene_Name[_0x4e56c8(0x510)][_0x4e56c8(0x309)]=function(){return 0x0;},Scene_Name[_0x4e56c8(0x510)][_0x4e56c8(0x48c)]=function(){const _0x5dffe2=_0x4e56c8;return Scene_Name[_0x5dffe2(0x5b5)][_0x5dffe2(0x3a1)][_0x5dffe2(0x410)](this);},Scene_Name['prototype']['inputWindowRect']=function(){const _0xe90a40=_0x4e56c8;return Scene_Name['layoutSettings'][_0xe90a40(0x37a)][_0xe90a40(0x410)](this);},Scene_Name[_0x4e56c8(0x510)][_0x4e56c8(0x4af)]=function(){const _0x36435e=_0x4e56c8;if(!this[_0x36435e(0x3a9)])return![];return VisuMZ[_0x36435e(0x5b8)][_0x36435e(0x5ce)][_0x36435e(0x84c)][_0x36435e(0x4af)];},Scene_Name['prototype'][_0x4e56c8(0x212)]=function(){const _0x4d4f68=_0x4e56c8;if(this['EnableNameInput']()&&this[_0x4d4f68(0x3a9)][_0x4d4f68(0xa9)]!==_0x4d4f68(0xbf))return TextManager['getInputMultiButtonStrings']('pageup',_0x4d4f68(0x4a5));return Scene_MenuBase[_0x4d4f68(0x510)][_0x4d4f68(0x212)][_0x4d4f68(0x410)](this);},Scene_Name[_0x4e56c8(0x510)][_0x4e56c8(0x433)]=function(){const _0x1e61d8=_0x4e56c8;return this[_0x1e61d8(0x4af)]()?TextManager[_0x1e61d8(0x282)](_0x1e61d8(0x494)):Scene_MenuBase[_0x1e61d8(0x510)][_0x1e61d8(0x433)][_0x1e61d8(0x410)](this);},Scene_Name[_0x4e56c8(0x510)][_0x4e56c8(0x77e)]=function(){const _0xc53443=_0x4e56c8;if(this[_0xc53443(0x4af)]()&&this[_0xc53443(0x3a9)][_0xc53443(0xa9)]==='keyboard')return TextManager[_0xc53443(0x49a)]([_0xc53443(0x2fe)]);return Scene_MenuBase['prototype'][_0xc53443(0x77e)][_0xc53443(0x410)](this);},Scene_Name[_0x4e56c8(0x510)][_0x4e56c8(0x6b9)]=function(){const _0x3649a0=_0x4e56c8;if(this[_0x3649a0(0x4af)]()&&this[_0x3649a0(0x3a9)][_0x3649a0(0xa9)]==='keyboard')return TextManager[_0x3649a0(0x49a)]([_0x3649a0(0x407)]);return Scene_MenuBase[_0x3649a0(0x510)][_0x3649a0(0x6b9)][_0x3649a0(0x410)](this);},Scene_Name[_0x4e56c8(0x510)][_0x4e56c8(0x590)]=function(){const _0x3878aa=_0x4e56c8;if(this[_0x3878aa(0x4af)]()&&this[_0x3878aa(0x3a9)][_0x3878aa(0xa9)]!==_0x3878aa(0xbf)){const _0x3cde3d=VisuMZ['CoreEngine']['Settings'][_0x3878aa(0x84c)];return _0x3cde3d[_0x3878aa(0x575)]||'Page';}return Scene_MenuBase[_0x3878aa(0x510)][_0x3878aa(0x590)]['call'](this);},Scene_Name[_0x4e56c8(0x510)][_0x4e56c8(0x364)]=function(){const _0xee3eb1=_0x4e56c8;if(this['EnableNameInput']()){const _0x19e4c7=VisuMZ['CoreEngine'][_0xee3eb1(0x5ce)]['KeyboardInput'];return this[_0xee3eb1(0x3a9)][_0xee3eb1(0xa9)]===_0xee3eb1(0xbf)?_0x19e4c7[_0xee3eb1(0x138)]||_0xee3eb1(0x138):_0x19e4c7['Manual']||_0xee3eb1(0x1ed);}else return Scene_MenuBase[_0xee3eb1(0x510)]['buttonAssistText3']['call'](this);},Scene_Name['prototype'][_0x4e56c8(0x67f)]=function(){const _0x32e1af=_0x4e56c8;if(this[_0x32e1af(0x4af)]()){const _0x38bf6a=VisuMZ['CoreEngine']['Settings'][_0x32e1af(0x84c)];if(this[_0x32e1af(0x3a9)][_0x32e1af(0xa9)]===_0x32e1af(0xbf))return _0x38bf6a[_0x32e1af(0x5cd)]||_0x32e1af(0x5cd);}return Scene_MenuBase[_0x32e1af(0x510)]['buttonAssistText4'][_0x32e1af(0x410)](this);},VisuMZ['CoreEngine'][_0x4e56c8(0x441)]=Scene_Name[_0x4e56c8(0x510)][_0x4e56c8(0x6d9)],Scene_Name[_0x4e56c8(0x510)][_0x4e56c8(0x6d9)]=function(){const _0x4f56a8=_0x4e56c8;this[_0x4f56a8(0x21e)]()?this[_0x4f56a8(0x7e1)]():VisuMZ[_0x4f56a8(0x5b8)][_0x4f56a8(0x441)][_0x4f56a8(0x410)](this);},Scene_Name[_0x4e56c8(0x510)]['doesNameContainBannedWords']=function(){const _0x576781=_0x4e56c8,_0x4ed284=VisuMZ[_0x576781(0x5b8)][_0x576781(0x5ce)][_0x576781(0x84c)];if(!_0x4ed284)return![];const _0x489748=_0x4ed284[_0x576781(0xed)];if(!_0x489748)return![];const _0xd951e3=this[_0x576781(0x352)][_0x576781(0x9f)]()[_0x576781(0x471)]();for(const _0x3e3d31 of _0x489748){if(_0xd951e3[_0x576781(0xd3)](_0x3e3d31[_0x576781(0x471)]()))return!![];}return![];},Scene_Name['prototype']['onInputBannedWords']=function(){const _0x3b5142=_0x4e56c8;SoundManager[_0x3b5142(0x336)]();},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x6fa)]=Scene_Battle[_0x4e56c8(0x510)][_0x4e56c8(0x5b3)],Scene_Battle[_0x4e56c8(0x510)][_0x4e56c8(0x5b3)]=function(){const _0x45d511=_0x4e56c8;VisuMZ[_0x45d511(0x5b8)]['Scene_Battle_update'][_0x45d511(0x410)](this);if($gameTemp['_playTestFastMode'])this[_0x45d511(0x45c)]();},Scene_Battle[_0x4e56c8(0x510)]['updatePlayTestF7']=function(){const _0x2f3821=_0x4e56c8;!BattleManager[_0x2f3821(0x1ae)]()&&!this['_playtestF7Looping']&&!$gameMessage['isBusy']()&&(this[_0x2f3821(0x36b)]=!![],this[_0x2f3821(0x5b3)](),SceneManager['updateEffekseer'](),this['_playtestF7Looping']=![]);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x19c)]=Scene_Battle[_0x4e56c8(0x510)]['createCancelButton'],Scene_Battle[_0x4e56c8(0x510)][_0x4e56c8(0x267)]=function(){const _0x339e=_0x4e56c8;VisuMZ['CoreEngine']['Scene_Battle_createCancelButton'][_0x339e(0x410)](this),SceneManager['isSideButtonLayout']()&&this[_0x339e(0x219)]();},Scene_Battle[_0x4e56c8(0x510)][_0x4e56c8(0x219)]=function(){const _0x32b0f2=_0x4e56c8;this[_0x32b0f2(0x255)]['x']=Graphics[_0x32b0f2(0x4ae)]+0x4,this[_0x32b0f2(0x27c)]()?this[_0x32b0f2(0x255)]['y']=Graphics[_0x32b0f2(0x106)]-this[_0x32b0f2(0x1d0)]():this[_0x32b0f2(0x255)]['y']=0x0;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x4ed)]=Sprite_Button[_0x4e56c8(0x510)][_0x4e56c8(0x5e5)],Sprite_Button[_0x4e56c8(0x510)]['initialize']=function(_0x15004f){const _0x37779a=_0x4e56c8;VisuMZ[_0x37779a(0x5b8)]['Sprite_Button_initialize']['call'](this,_0x15004f),this[_0x37779a(0x344)]();},Sprite_Button[_0x4e56c8(0x510)][_0x4e56c8(0x344)]=function(){const _0x58c087=_0x4e56c8,_0x3ea903=VisuMZ[_0x58c087(0x5b8)]['Settings']['UI'];this[_0x58c087(0x7ce)]=![];switch(this[_0x58c087(0xbe)]){case'cancel':this[_0x58c087(0x7ce)]=!_0x3ea903[_0x58c087(0x4bd)];break;case _0x58c087(0x772):case'pagedown':this[_0x58c087(0x7ce)]=!_0x3ea903[_0x58c087(0x6bf)];break;case _0x58c087(0x324):case'up':case'down2':case _0x58c087(0x3f9):case'ok':this['_isButtonHidden']=!_0x3ea903[_0x58c087(0x29a)];break;case'menu':this[_0x58c087(0x7ce)]=!_0x3ea903['menuShowButton'];break;}},VisuMZ[_0x4e56c8(0x5b8)]['Sprite_Button_updateOpacity']=Sprite_Button[_0x4e56c8(0x510)][_0x4e56c8(0x50f)],Sprite_Button[_0x4e56c8(0x510)]['updateOpacity']=function(){const _0x5e2af4=_0x4e56c8;SceneManager[_0x5e2af4(0x61a)]()||this[_0x5e2af4(0x7ce)]?this['hideButtonFromView']():VisuMZ[_0x5e2af4(0x5b8)][_0x5e2af4(0x17e)][_0x5e2af4(0x410)](this);},Sprite_Button['prototype'][_0x4e56c8(0x2d3)]=function(){const _0x3b5ebe=_0x4e56c8;this[_0x3b5ebe(0x852)]=![],this['opacity']=0x0,this['x']=Graphics['width']*0xa,this['y']=Graphics[_0x3b5ebe(0x1e9)]*0xa;},VisuMZ[_0x4e56c8(0x5b8)]['Sprite_Battler_startMove']=Sprite_Battler['prototype']['startMove'],Sprite_Battler[_0x4e56c8(0x510)][_0x4e56c8(0xe7)]=function(_0x4d69ba,_0x5c7155,_0x4a748c){const _0x1c1fbc=_0x4e56c8;(this[_0x1c1fbc(0x176)]!==_0x4d69ba||this[_0x1c1fbc(0x3ea)]!==_0x5c7155)&&(this['setMoveEasingType']('Linear'),this[_0x1c1fbc(0x2b3)]=_0x4a748c),VisuMZ[_0x1c1fbc(0x5b8)][_0x1c1fbc(0x250)]['call'](this,_0x4d69ba,_0x5c7155,_0x4a748c);},Sprite_Battler[_0x4e56c8(0x510)][_0x4e56c8(0xfb)]=function(_0x5028a5){const _0x30a56e=_0x4e56c8;this[_0x30a56e(0x2bb)]=_0x5028a5;},Sprite_Battler[_0x4e56c8(0x510)][_0x4e56c8(0x12b)]=function(){const _0x1fbc9e=_0x4e56c8;if(this['_movementDuration']<=0x0)return;const _0xc6a9b5=this[_0x1fbc9e(0x436)],_0x3f2568=this['_movementWholeDuration'],_0x5b0b4c=this[_0x1fbc9e(0x2bb)];this[_0x1fbc9e(0x2a4)]=this['applyEasing'](this[_0x1fbc9e(0x2a4)],this[_0x1fbc9e(0x176)],_0xc6a9b5,_0x3f2568,_0x5b0b4c),this['_offsetY']=this[_0x1fbc9e(0x113)](this[_0x1fbc9e(0x53d)],this[_0x1fbc9e(0x3ea)],_0xc6a9b5,_0x3f2568,_0x5b0b4c),this[_0x1fbc9e(0x436)]--;if(this[_0x1fbc9e(0x436)]<=0x0)this[_0x1fbc9e(0x35d)]();},Sprite_Battler['prototype'][_0x4e56c8(0x113)]=function(_0x298a15,_0x3f90d7,_0x2cfe8b,_0x3c75de,_0x2ad348){const _0x113e79=_0x4e56c8,_0x2cdf89=VisuMZ['ApplyEasing']((_0x3c75de-_0x2cfe8b)/_0x3c75de,_0x2ad348||_0x113e79(0x630)),_0x388b77=VisuMZ[_0x113e79(0x165)]((_0x3c75de-_0x2cfe8b+0x1)/_0x3c75de,_0x2ad348||_0x113e79(0x630)),_0x2900d3=(_0x298a15-_0x3f90d7*_0x2cdf89)/(0x1-_0x2cdf89);return _0x2900d3+(_0x3f90d7-_0x2900d3)*_0x388b77;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0xfc)]=Sprite_Actor[_0x4e56c8(0x510)][_0x4e56c8(0x78e)],Sprite_Actor[_0x4e56c8(0x510)]['setActorHome']=function(_0x20a784){const _0x544dd0=_0x4e56c8;VisuMZ[_0x544dd0(0x5b8)][_0x544dd0(0x5ce)]['UI'][_0x544dd0(0x581)]?this[_0x544dd0(0x726)](_0x20a784):VisuMZ[_0x544dd0(0x5b8)]['Sprite_Actor_setActorHome'][_0x544dd0(0x410)](this,_0x20a784);},Sprite_Actor[_0x4e56c8(0x510)][_0x4e56c8(0x726)]=function(_0x31044a){const _0x9ff411=_0x4e56c8;let _0x447e5a=Math[_0x9ff411(0x263)](Graphics['width']/0x2+0xc0);_0x447e5a-=Math[_0x9ff411(0x653)]((Graphics[_0x9ff411(0x79c)]-Graphics['boxWidth'])/0x2),_0x447e5a+=_0x31044a*0x20;let _0x19102c=Graphics[_0x9ff411(0x1e9)]-0xc8-$gameParty[_0x9ff411(0x558)]()*0x30;_0x19102c-=Math[_0x9ff411(0x653)]((Graphics[_0x9ff411(0x1e9)]-Graphics[_0x9ff411(0x106)])/0x2),_0x19102c+=_0x31044a*0x30,this[_0x9ff411(0x5f3)](_0x447e5a,_0x19102c);},Sprite_Actor[_0x4e56c8(0x510)]['retreat']=function(){const _0x468465=_0x4e56c8;this[_0x468465(0xe7)](0x4b0,0x0,0x78);},Sprite_Animation[_0x4e56c8(0x510)]['setMute']=function(_0x3bfd4f){const _0x3bfc1d=_0x4e56c8;this[_0x3bfc1d(0x296)]=_0x3bfd4f;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x72d)]=Sprite_Animation[_0x4e56c8(0x510)]['processSoundTimings'],Sprite_Animation[_0x4e56c8(0x510)][_0x4e56c8(0x26d)]=function(){const _0x21dc25=_0x4e56c8;if(this[_0x21dc25(0x296)])return;VisuMZ[_0x21dc25(0x5b8)][_0x21dc25(0x72d)][_0x21dc25(0x410)](this);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x6b8)]=Sprite_Animation[_0x4e56c8(0x510)]['setViewport'],Sprite_Animation[_0x4e56c8(0x510)]['setViewport']=function(_0x194e2c){const _0x1c4ba1=_0x4e56c8;this[_0x1c4ba1(0x5a1)]()?this[_0x1c4ba1(0x310)](_0x194e2c):VisuMZ[_0x1c4ba1(0x5b8)][_0x1c4ba1(0x6b8)][_0x1c4ba1(0x410)](this,_0x194e2c);},Sprite_Animation[_0x4e56c8(0x510)]['isAnimationOffsetXMirrored']=function(){const _0x493b1f=_0x4e56c8;if(!this['_animation'])return![];const _0x3fcea5=this[_0x493b1f(0x1ec)][_0x493b1f(0x9f)]||'';if(_0x3fcea5[_0x493b1f(0x60a)](/<MIRROR OFFSET X>/i))return!![];if(_0x3fcea5['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x493b1f(0x5b8)][_0x493b1f(0x5ce)][_0x493b1f(0x2c9)]['AnimationMirrorOffset'];},Sprite_Animation[_0x4e56c8(0x510)][_0x4e56c8(0x310)]=function(_0x4f234c){const _0x209e38=_0x4e56c8,_0x1ce865=this[_0x209e38(0x2a1)],_0x42d1ea=this[_0x209e38(0x2a1)],_0x9e3ecc=this[_0x209e38(0x1ec)][_0x209e38(0x30c)]*(this[_0x209e38(0x338)]?-0x1:0x1)-_0x1ce865/0x2,_0x4d2777=this[_0x209e38(0x1ec)]['offsetY']-_0x42d1ea/0x2,_0x46263c=this['targetPosition'](_0x4f234c);_0x4f234c['gl']['viewport'](_0x9e3ecc+_0x46263c['x'],_0x4d2777+_0x46263c['y'],_0x1ce865,_0x42d1ea);},Sprite_Animation['prototype'][_0x4e56c8(0x721)]=function(_0x35b0d1){const _0x5bb506=_0x4e56c8;if(_0x35b0d1[_0x5bb506(0x194)]){}const _0x4f0b79=this[_0x5bb506(0x1ec)][_0x5bb506(0x9f)];let _0xe59926=_0x35b0d1['height']*_0x35b0d1[_0x5bb506(0x4d8)]['y'],_0x3a05ea=0x0,_0x2a302d=-_0xe59926/0x2;if(_0x4f0b79[_0x5bb506(0x60a)](/<(?:HEAD|HEADER|TOP)>/i))_0x2a302d=-_0xe59926;if(_0x4f0b79[_0x5bb506(0x60a)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x2a302d=0x0;if(this[_0x5bb506(0x1ec)][_0x5bb506(0x328)])_0x2a302d=0x0;if(_0x4f0b79['match'](/<(?:LEFT)>/i))_0x3a05ea=-_0x35b0d1['width']/0x2;if(_0x4f0b79['match'](/<(?:RIGHT)>/i))_0x3a05ea=_0x35b0d1['width']/0x2;_0x4f0b79[_0x5bb506(0x60a)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x3a05ea=Number(RegExp['$1'])*_0x35b0d1[_0x5bb506(0x79c)]);_0x4f0b79[_0x5bb506(0x60a)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x2a302d=(0x1-Number(RegExp['$1']))*-_0xe59926);_0x4f0b79['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x3a05ea=Number(RegExp['$1'])*_0x35b0d1['width'],_0x2a302d=(0x1-Number(RegExp['$2']))*-_0xe59926);if(_0x4f0b79[_0x5bb506(0x60a)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x3a05ea+=Number(RegExp['$1']);if(_0x4f0b79[_0x5bb506(0x60a)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x2a302d+=Number(RegExp['$1']);_0x4f0b79[_0x5bb506(0x60a)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x3a05ea+=Number(RegExp['$1']),_0x2a302d+=Number(RegExp['$2']));const _0x382132=new Point(_0x3a05ea,_0x2a302d);return _0x35b0d1['updateTransform'](),_0x35b0d1[_0x5bb506(0x6a6)][_0x5bb506(0x6e4)](_0x382132);},Sprite_AnimationMV['prototype'][_0x4e56c8(0x707)]=function(){const _0x595ae3=_0x4e56c8;this[_0x595ae3(0x809)]=VisuMZ[_0x595ae3(0x5b8)][_0x595ae3(0x5ce)][_0x595ae3(0x2c9)][_0x595ae3(0x17a)]??0x4,this[_0x595ae3(0x649)](),this[_0x595ae3(0x809)]=this[_0x595ae3(0x809)][_0x595ae3(0x2d2)](0x1,0xa);},Sprite_AnimationMV[_0x4e56c8(0x510)][_0x4e56c8(0x649)]=function(){const _0x4e72cb=_0x4e56c8;if(!this[_0x4e72cb(0x1ec)]);const _0x4097c1=this[_0x4e72cb(0x1ec)][_0x4e72cb(0x9f)]||'';_0x4097c1['match'](/<RATE:[ ](\d+)>/i)&&(this[_0x4e72cb(0x809)]=(Number(RegExp['$1'])||0x1)[_0x4e72cb(0x2d2)](0x1,0xa));},Sprite_AnimationMV[_0x4e56c8(0x510)][_0x4e56c8(0x4de)]=function(_0x1b9800){const _0x550085=_0x4e56c8;this[_0x550085(0x296)]=_0x1b9800;},VisuMZ[_0x4e56c8(0x5b8)]['Sprite_AnimationMV_processTimingData']=Sprite_AnimationMV['prototype'][_0x4e56c8(0x603)],Sprite_AnimationMV[_0x4e56c8(0x510)][_0x4e56c8(0x603)]=function(_0x3d74da){const _0x747239=_0x4e56c8;this[_0x747239(0x296)]&&(_0x3d74da=JsonEx['makeDeepCopy'](_0x3d74da),_0x3d74da['se']&&(_0x3d74da['se'][_0x747239(0x384)]=0x0)),VisuMZ['CoreEngine'][_0x747239(0x59d)][_0x747239(0x410)](this,_0x3d74da);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x7bb)]=Sprite_AnimationMV[_0x4e56c8(0x510)][_0x4e56c8(0x7e)],Sprite_AnimationMV[_0x4e56c8(0x510)][_0x4e56c8(0x7e)]=function(){const _0x1954a5=_0x4e56c8;VisuMZ[_0x1954a5(0x5b8)][_0x1954a5(0x7bb)][_0x1954a5(0x410)](this);if(this[_0x1954a5(0x1ec)][_0x1954a5(0x3c1)]===0x3){if(this['x']===0x0)this['x']=Math['round'](Graphics['width']/0x2);if(this['y']===0x0)this['y']=Math['round'](Graphics[_0x1954a5(0x1e9)]/0x2);}},Sprite_Damage[_0x4e56c8(0x510)][_0x4e56c8(0x574)]=function(_0xffccb){const _0x1a592f=_0x4e56c8;let _0x3c12cb=Math[_0x1a592f(0x608)](_0xffccb)[_0x1a592f(0x359)]();this[_0x1a592f(0x55e)]()&&(_0x3c12cb=VisuMZ[_0x1a592f(0x7f4)](_0x3c12cb));const _0x826db6=this[_0x1a592f(0x2ea)](),_0x2e9722=Math[_0x1a592f(0x653)](_0x826db6*0.75);for(let _0x471dd3=0x0;_0x471dd3<_0x3c12cb[_0x1a592f(0x323)];_0x471dd3++){const _0x4797ed=this['createChildSprite'](_0x2e9722,_0x826db6);_0x4797ed['bitmap'][_0x1a592f(0x356)](_0x3c12cb[_0x471dd3],0x0,0x0,_0x2e9722,_0x826db6,_0x1a592f(0x715)),_0x4797ed['x']=(_0x471dd3-(_0x3c12cb[_0x1a592f(0x323)]-0x1)/0x2)*_0x2e9722,_0x4797ed['dy']=-_0x471dd3;}},Sprite_Damage[_0x4e56c8(0x510)][_0x4e56c8(0x55e)]=function(){const _0x589aa2=_0x4e56c8;return VisuMZ[_0x589aa2(0x5b8)][_0x589aa2(0x5ce)][_0x589aa2(0x2c9)][_0x589aa2(0x395)];},Sprite_Damage[_0x4e56c8(0x510)]['valueOutlineColor']=function(){const _0x29ff62=_0x4e56c8;return ColorManager[_0x29ff62(0xf7)]();},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x827)]=Sprite_Gauge[_0x4e56c8(0x510)]['gaugeRate'],Sprite_Gauge[_0x4e56c8(0x510)]['gaugeRate']=function(){const _0x12da52=_0x4e56c8;return VisuMZ[_0x12da52(0x5b8)][_0x12da52(0x827)]['call'](this)[_0x12da52(0x2d2)](0x0,0x1);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x790)]=Sprite_Gauge[_0x4e56c8(0x510)][_0x4e56c8(0x13e)],Sprite_Gauge[_0x4e56c8(0x510)][_0x4e56c8(0x13e)]=function(){const _0x236275=_0x4e56c8;let _0x53e9fe=VisuMZ[_0x236275(0x5b8)][_0x236275(0x790)][_0x236275(0x410)](this);return _0x53e9fe;},Sprite_Gauge[_0x4e56c8(0x510)][_0x4e56c8(0x452)]=function(){const _0xeaf28f=_0x4e56c8;let _0x2a36cb=this['currentValue']();this[_0xeaf28f(0x55e)]()&&(_0x2a36cb=VisuMZ[_0xeaf28f(0x7f4)](_0x2a36cb));const _0x1dbe80=this[_0xeaf28f(0x307)]()-0x1,_0x3eb905=this['textHeight']?this[_0xeaf28f(0x615)]():this[_0xeaf28f(0x7e6)]();this[_0xeaf28f(0x56a)](),this[_0xeaf28f(0x134)][_0xeaf28f(0x356)](_0x2a36cb,0x0,0x0,_0x1dbe80,_0x3eb905,_0xeaf28f(0x747));},Sprite_Gauge[_0x4e56c8(0x510)][_0x4e56c8(0x5d8)]=function(){return 0x3;},Sprite_Gauge['prototype'][_0x4e56c8(0x55e)]=function(){const _0x2aeddf=_0x4e56c8;return VisuMZ['CoreEngine']['Settings'][_0x2aeddf(0x2c9)][_0x2aeddf(0x7ee)];},Sprite_Gauge[_0x4e56c8(0x510)][_0x4e56c8(0x119)]=function(){return ColorManager['outlineColorGauge']();},Sprite_StateIcon[_0x4e56c8(0x71)]=VisuMZ[_0x4e56c8(0x5b8)]['Settings']['UI'][_0x4e56c8(0x4e3)]??!![],VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0xb3)]=Sprite_StateIcon['prototype'][_0x4e56c8(0x1d2)],Sprite_StateIcon['prototype']['loadBitmap']=function(){const _0x2f0353=_0x4e56c8;Sprite_StateIcon['NON_FRAME']?this[_0x2f0353(0x271)]():VisuMZ['CoreEngine']['Sprite_StateIcon_loadBitmap'][_0x2f0353(0x410)](this);},Sprite_StateIcon[_0x4e56c8(0x510)][_0x4e56c8(0x271)]=function(){const _0xc8963e=_0x4e56c8;this['bitmap']=new Bitmap(ImageManager[_0xc8963e(0x7a2)],ImageManager[_0xc8963e(0x36e)]),this[_0xc8963e(0x1a8)]=ImageManager[_0xc8963e(0x482)]('IconSet');},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x44e)]=Sprite_StateIcon[_0x4e56c8(0x510)][_0x4e56c8(0x402)],Sprite_StateIcon[_0x4e56c8(0x510)][_0x4e56c8(0x402)]=function(){const _0x45e79f=_0x4e56c8;Sprite_StateIcon[_0x45e79f(0x71)]?this[_0x45e79f(0xaa)]():VisuMZ['CoreEngine'][_0x45e79f(0x44e)]['call'](this);},Sprite_StateIcon[_0x4e56c8(0x510)][_0x4e56c8(0xaa)]=function(){const _0x58d2fa=_0x4e56c8;if(this['_lastIconIndex']===this[_0x58d2fa(0x23a)])return;this[_0x58d2fa(0x49b)]=this['_iconIndex'];const _0xc455f7=ImageManager[_0x58d2fa(0x7a2)],_0x110035=ImageManager[_0x58d2fa(0x36e)],_0x5a5afa=this[_0x58d2fa(0x23a)]%0x10*_0xc455f7,_0x188afc=Math[_0x58d2fa(0x653)](this['_iconIndex']/0x10)*_0x110035,_0x17be4c=this['_srcBitmap'],_0x2a31c1=this[_0x58d2fa(0x134)];_0x2a31c1[_0x58d2fa(0xaf)](),_0x2a31c1[_0x58d2fa(0x314)](_0x17be4c,_0x5a5afa,_0x188afc,_0xc455f7,_0x110035,0x0,0x0,_0x2a31c1[_0x58d2fa(0x79c)],_0x2a31c1[_0x58d2fa(0x1e9)]);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x1ea)]=Sprite_Picture['prototype'][_0x4e56c8(0x1d2)],Sprite_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x1d2)]=function(){const _0x5f332a=_0x4e56c8;this[_0x5f332a(0x5ad)]&&this[_0x5f332a(0x5ad)][_0x5f332a(0x60a)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x5f332a(0x791)](Number(RegExp['$1'])):VisuMZ[_0x5f332a(0x5b8)]['Sprite_Picture_loadBitmap'][_0x5f332a(0x410)](this);},Sprite_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x791)]=function(_0x1b02c4){const _0x24a52c=_0x4e56c8,_0x49e869=ImageManager[_0x24a52c(0x7a2)],_0x2a97d6=ImageManager[_0x24a52c(0x36e)],_0x2d0722=this[_0x24a52c(0x5ad)]['match'](/SMOOTH/i);this[_0x24a52c(0x134)]=new Bitmap(_0x49e869,_0x2a97d6);const _0x8fc05c=ImageManager[_0x24a52c(0x482)](_0x24a52c(0x3ae)),_0x54a03f=_0x1b02c4%0x10*_0x49e869,_0x4f6707=Math[_0x24a52c(0x653)](_0x1b02c4/0x10)*_0x2a97d6;this[_0x24a52c(0x134)][_0x24a52c(0x805)]=_0x2d0722,this[_0x24a52c(0x134)][_0x24a52c(0x314)](_0x8fc05c,_0x54a03f,_0x4f6707,_0x49e869,_0x2a97d6,0x0,0x0,_0x49e869,_0x2a97d6);};function Sprite_TitlePictureButton(){const _0x2609c=_0x4e56c8;this[_0x2609c(0x5e5)](...arguments);}Sprite_TitlePictureButton[_0x4e56c8(0x510)]=Object['create'](Sprite_Clickable[_0x4e56c8(0x510)]),Sprite_TitlePictureButton[_0x4e56c8(0x510)][_0x4e56c8(0x2e1)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x4e56c8(0x510)][_0x4e56c8(0x5e5)]=function(_0x39da9d){const _0x4db372=_0x4e56c8;Sprite_Clickable[_0x4db372(0x510)]['initialize'][_0x4db372(0x410)](this),this[_0x4db372(0x133)]=_0x39da9d,this[_0x4db372(0x2b4)]=null,this[_0x4db372(0x28b)]();},Sprite_TitlePictureButton[_0x4e56c8(0x510)][_0x4e56c8(0x28b)]=function(){const _0x19a632=_0x4e56c8;this['x']=Graphics['width'],this['y']=Graphics[_0x19a632(0x1e9)],this[_0x19a632(0x852)]=![],this[_0x19a632(0x3af)]();},Sprite_TitlePictureButton[_0x4e56c8(0x510)][_0x4e56c8(0x3af)]=function(){const _0x38aca7=_0x4e56c8;this[_0x38aca7(0x134)]=ImageManager[_0x38aca7(0x295)](this[_0x38aca7(0x133)][_0x38aca7(0x1b3)]),this['bitmap']['addLoadListener'](this[_0x38aca7(0x643)][_0x38aca7(0x223)](this));},Sprite_TitlePictureButton[_0x4e56c8(0x510)]['onButtonImageLoad']=function(){const _0x4cac01=_0x4e56c8;this['_data'][_0x4cac01(0x730)][_0x4cac01(0x410)](this),this['_data'][_0x4cac01(0x476)][_0x4cac01(0x410)](this),this[_0x4cac01(0x550)](this['_data'][_0x4cac01(0x5fa)][_0x4cac01(0x223)](this));},Sprite_TitlePictureButton[_0x4e56c8(0x510)][_0x4e56c8(0x5b3)]=function(){const _0x364ebb=_0x4e56c8;Sprite_Clickable[_0x364ebb(0x510)][_0x364ebb(0x5b3)][_0x364ebb(0x410)](this),this[_0x364ebb(0x50f)](),this[_0x364ebb(0x34e)]();},Sprite_TitlePictureButton[_0x4e56c8(0x510)][_0x4e56c8(0x1fb)]=function(){const _0x33244f=_0x4e56c8;return VisuMZ[_0x33244f(0x5b8)][_0x33244f(0x5ce)][_0x33244f(0x597)][_0x33244f(0x57a)][_0x33244f(0x111)];},Sprite_TitlePictureButton[_0x4e56c8(0x510)][_0x4e56c8(0x50f)]=function(){const _0x3d582d=_0x4e56c8;this[_0x3d582d(0x293)]||this[_0x3d582d(0x42d)]?this['opacity']=0xff:(this[_0x3d582d(0x75a)]+=this[_0x3d582d(0x852)]?this[_0x3d582d(0x1fb)]():-0x1*this['fadeSpeed'](),this[_0x3d582d(0x75a)]=Math[_0x3d582d(0x6a7)](0xc0,this[_0x3d582d(0x75a)]));},Sprite_TitlePictureButton[_0x4e56c8(0x510)]['setClickHandler']=function(_0x544664){const _0x42e248=_0x4e56c8;this[_0x42e248(0x2b4)]=_0x544664;},Sprite_TitlePictureButton[_0x4e56c8(0x510)][_0x4e56c8(0x6e9)]=function(){const _0x54698e=_0x4e56c8;this[_0x54698e(0x2b4)]&&this['_clickHandler']();};function Sprite_ExtendedTile(){const _0xc4cb1=_0x4e56c8;this[_0xc4cb1(0x5e5)](...arguments);}Sprite_ExtendedTile[_0x4e56c8(0x510)]=Object[_0x4e56c8(0x3ba)](Sprite[_0x4e56c8(0x510)]),Sprite_ExtendedTile[_0x4e56c8(0x510)]['constructor']=Sprite_ExtendedTile,Sprite_ExtendedTile['prototype'][_0x4e56c8(0x5e5)]=function(_0x2e613b,_0x16021a,_0xd5eac3,_0x418a23){const _0x3de802=_0x4e56c8;this[_0x3de802(0x242)]=Game_CharacterBase[_0x3de802(0x445)]||-0x6,this[_0x3de802(0x2c4)]=_0x2e613b,this[_0x3de802(0x797)]=_0x16021a,this[_0x3de802(0x435)]=_0xd5eac3,this['_patternHeight']=_0x418a23,Sprite[_0x3de802(0x510)][_0x3de802(0x5e5)][_0x3de802(0x410)](this),this[_0x3de802(0x6e7)](),this[_0x3de802(0x24a)](),this[_0x3de802(0x31b)](),this['update']();},Sprite_ExtendedTile[_0x4e56c8(0x510)][_0x4e56c8(0x6e7)]=function(){const _0x28503f=_0x4e56c8;this[_0x28503f(0x28e)]=new Sprite(),this[_0x28503f(0x28e)][_0x28503f(0x6c7)]['x']=0.5,this['_tileSprite'][_0x28503f(0x6c7)]['y']=0x1,this[_0x28503f(0x28e)]['y']=-this[_0x28503f(0x242)]+0x1,this[_0x28503f(0x100)](this['_tileSprite']);},Sprite_ExtendedTile[_0x4e56c8(0x510)][_0x4e56c8(0x24a)]=function(){const _0x28873a=_0x4e56c8,_0x52fefc=$gameMap[_0x28873a(0x122)](),_0x4942b1=0x5+Math[_0x28873a(0x653)](this['_tile']/0x100);this[_0x28873a(0x28e)]['bitmap']=ImageManager[_0x28873a(0x365)](_0x52fefc[_0x28873a(0x563)][_0x4942b1]);},Sprite_ExtendedTile[_0x4e56c8(0x510)]['setTileFrame']=function(){const _0x1240a9=_0x4e56c8,_0x29700f=this[_0x1240a9(0x435)],_0x5018b1=$gameMap[_0x1240a9(0x717)](),_0x378c4a=$gameMap[_0x1240a9(0x5ef)](),_0x533c70=(Math[_0x1240a9(0x653)](_0x29700f/0x80)%0x2*0x8+_0x29700f%0x8)*_0x5018b1,_0x1d9cdd=Math[_0x1240a9(0x653)](_0x29700f%0x100/0x8)%0x10*_0x378c4a,_0x395a9f=this[_0x1240a9(0x2a3)]*_0x378c4a;this[_0x1240a9(0x28e)][_0x1240a9(0x65f)](_0x533c70,_0x1d9cdd-_0x395a9f,_0x5018b1,_0x378c4a+_0x395a9f);},Sprite_ExtendedTile[_0x4e56c8(0x510)]['update']=function(){const _0x6f8564=_0x4e56c8;Sprite[_0x6f8564(0x510)][_0x6f8564(0x5b3)]['call'](this),this[_0x6f8564(0x7e)]();},Sprite_ExtendedTile['prototype']['updatePosition']=function(){const _0x13781d=_0x4e56c8,_0x46af41=$gameMap[_0x13781d(0x717)](),_0x4a5722=$gameMap[_0x13781d(0x5ef)](),_0x53e78f=this[_0x13781d(0x2c4)],_0x3c51ad=this[_0x13781d(0x797)];this['x']=Math[_0x13781d(0x653)](($gameMap[_0x13781d(0x6c2)](_0x53e78f)+0.5)*_0x46af41),this['y']=Math['floor'](($gameMap[_0x13781d(0x284)](_0x3c51ad)+0x1)*_0x4a5722)+this[_0x13781d(0x242)]-0x1;},VisuMZ['CoreEngine']['Spriteset_Base_initialize']=Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x5e5)],Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x5e5)]=function(){const _0x2c548a=_0x4e56c8;VisuMZ['CoreEngine']['Spriteset_Base_initialize'][_0x2c548a(0x410)](this),this['initMembersCoreEngine']();},Spriteset_Base[_0x4e56c8(0x510)]['initMembersCoreEngine']=function(){const _0x365820=_0x4e56c8;this[_0x365820(0x646)]=[],this[_0x365820(0x489)]=[],this[_0x365820(0x103)]=this['scale']['x'],this[_0x365820(0x81e)]=this['scale']['y'];},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x91)]=Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x778)],Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x778)]=function(_0x2df148){const _0x5057ae=_0x4e56c8;this[_0x5057ae(0x6ce)](),this[_0x5057ae(0x815)](),VisuMZ[_0x5057ae(0x5b8)]['Spriteset_Base_destroy']['call'](this,_0x2df148);},VisuMZ[_0x4e56c8(0x5b8)]['Spriteset_Base_update']=Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x5b3)],Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x5b3)]=function(){const _0x523e0d=_0x4e56c8;VisuMZ['CoreEngine'][_0x523e0d(0x2d5)][_0x523e0d(0x410)](this),this[_0x523e0d(0x2a6)](),this[_0x523e0d(0x20e)](),this['updateFauxAnimations'](),this['updatePointAnimations']();},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x2a6)]=function(){},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x20e)]=function(){const _0x2960a5=_0x4e56c8;if(!VisuMZ[_0x2960a5(0x5b8)][_0x2960a5(0x5ce)][_0x2960a5(0x2c9)][_0x2960a5(0x21b)])return;if(this[_0x2960a5(0x103)]===this[_0x2960a5(0x4d8)]['x']&&this[_0x2960a5(0x81e)]===this[_0x2960a5(0x4d8)]['y'])return;this[_0x2960a5(0x6a0)](),this[_0x2960a5(0x103)]=this[_0x2960a5(0x4d8)]['x'],this[_0x2960a5(0x81e)]=this['scale']['y'];},Spriteset_Base[_0x4e56c8(0x510)]['adjustPictureAntiZoom']=function(){const _0x1eb3b6=_0x4e56c8;if(SceneManager[_0x1eb3b6(0x738)]()&&Spriteset_Map[_0x1eb3b6(0x705)])return;else{if(SceneManager[_0x1eb3b6(0xf2)]()&&Spriteset_Battle[_0x1eb3b6(0x705)])return;}this[_0x1eb3b6(0x4d8)]['x']!==0x0&&(this[_0x1eb3b6(0x6d0)]['scale']['x']=0x1/this['scale']['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x1eb3b6(0x4d8)]['x'])),this['scale']['y']!==0x0&&(this['_pictureContainer'][_0x1eb3b6(0x4d8)]['y']=0x1/this[_0x1eb3b6(0x4d8)]['y'],this[_0x1eb3b6(0x6d0)]['y']=-(this['y']/this[_0x1eb3b6(0x4d8)]['y']));},VisuMZ[_0x4e56c8(0x5b8)]['Spriteset_Base_updatePosition']=Spriteset_Base[_0x4e56c8(0x510)]['updatePosition'],Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x7e)]=function(){const _0x40c2f1=_0x4e56c8;VisuMZ['CoreEngine'][_0x40c2f1(0x7b8)][_0x40c2f1(0x410)](this),this[_0x40c2f1(0x275)]();},Spriteset_Base['prototype'][_0x4e56c8(0x275)]=function(){const _0x273c9e=_0x4e56c8;if(!$gameScreen)return;if($gameScreen[_0x273c9e(0x1f3)]<=0x0)return;this['x']-=Math[_0x273c9e(0x263)]($gameScreen[_0x273c9e(0x20b)]());const _0x57ea1f=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0x273c9e(0x5fb):this[_0x273c9e(0x752)]();break;case'horizontal':this[_0x273c9e(0x116)]();break;case _0x273c9e(0x72c):this[_0x273c9e(0x221)]();break;default:this[_0x273c9e(0x81a)]();break;}},Spriteset_Base[_0x4e56c8(0x510)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x2b149b=_0x4e56c8,_0x4ef6a8=VisuMZ['CoreEngine']['Settings'][_0x2b149b(0x763)];if(_0x4ef6a8&&_0x4ef6a8['originalJS'])return _0x4ef6a8[_0x2b149b(0x741)]['call'](this);this['x']+=Math['round']($gameScreen[_0x2b149b(0x20b)]());},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x81a)]=function(){const _0x1ccf15=_0x4e56c8,_0x47da5f=VisuMZ[_0x1ccf15(0x5b8)][_0x1ccf15(0x5ce)][_0x1ccf15(0x763)];if(_0x47da5f&&_0x47da5f['randomJS'])return _0x47da5f[_0x1ccf15(0x7cd)][_0x1ccf15(0x410)](this);const _0x4abfaf=$gameScreen[_0x1ccf15(0x4fe)]*0.75,_0x28ef38=$gameScreen[_0x1ccf15(0x63b)]*0.6,_0x9078d=$gameScreen[_0x1ccf15(0x1f3)];this['x']+=Math['round'](Math[_0x1ccf15(0x184)](_0x4abfaf)-Math[_0x1ccf15(0x184)](_0x28ef38))*(Math['min'](_0x9078d,0x1e)*0.5),this['y']+=Math[_0x1ccf15(0x263)](Math[_0x1ccf15(0x184)](_0x4abfaf)-Math['randomInt'](_0x28ef38))*(Math[_0x1ccf15(0x6a7)](_0x9078d,0x1e)*0.5);},Spriteset_Base[_0x4e56c8(0x510)]['updatePositionCoreEngineShakeHorz']=function(){const _0x39aad9=_0x4e56c8,_0x246b9b=VisuMZ[_0x39aad9(0x5b8)]['Settings'][_0x39aad9(0x763)];if(_0x246b9b&&_0x246b9b[_0x39aad9(0x496)])return _0x246b9b[_0x39aad9(0x496)][_0x39aad9(0x410)](this);const _0x6340ce=$gameScreen[_0x39aad9(0x4fe)]*0.75,_0x4cf30f=$gameScreen[_0x39aad9(0x63b)]*0.6,_0x45bee0=$gameScreen[_0x39aad9(0x1f3)];this['x']+=Math[_0x39aad9(0x263)](Math[_0x39aad9(0x184)](_0x6340ce)-Math[_0x39aad9(0x184)](_0x4cf30f))*(Math[_0x39aad9(0x6a7)](_0x45bee0,0x1e)*0.5);},Spriteset_Base[_0x4e56c8(0x510)]['updatePositionCoreEngineShakeVert']=function(){const _0x182fdf=_0x4e56c8,_0x54dac1=VisuMZ[_0x182fdf(0x5b8)]['Settings']['ScreenShake'];if(_0x54dac1&&_0x54dac1[_0x182fdf(0x665)])return _0x54dac1[_0x182fdf(0x665)][_0x182fdf(0x410)](this);const _0x11bfd9=$gameScreen[_0x182fdf(0x4fe)]*0.75,_0x5708f2=$gameScreen[_0x182fdf(0x63b)]*0.6,_0x5ec07b=$gameScreen['_shakeDuration'];this['y']+=Math[_0x182fdf(0x263)](Math['randomInt'](_0x11bfd9)-Math[_0x182fdf(0x184)](_0x5708f2))*(Math[_0x182fdf(0x6a7)](_0x5ec07b,0x1e)*0.5);},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x65c)]=function(){const _0x34b0d8=_0x4e56c8;for(const _0x41f627 of this[_0x34b0d8(0x646)]){!_0x41f627['isPlaying']()&&this[_0x34b0d8(0x83a)](_0x41f627);}this['processFauxAnimationRequests']();},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x4ea)]=function(){const _0x32c632=_0x4e56c8;for(;;){const _0x14cedf=$gameTemp[_0x32c632(0x7d5)]();if(_0x14cedf)this[_0x32c632(0x6ea)](_0x14cedf);else break;}},Spriteset_Base[_0x4e56c8(0x510)]['createFauxAnimation']=function(_0x37dd4f){const _0x4c66c1=_0x4e56c8,_0x1a68d4=$dataAnimations[_0x37dd4f[_0x4c66c1(0xa5)]],_0x50198a=_0x37dd4f[_0x4c66c1(0x47e)],_0x312f1b=_0x37dd4f['mirror'],_0x316704=_0x37dd4f[_0x4c66c1(0x661)];let _0x516446=this[_0x4c66c1(0x276)]();const _0x4194ec=this[_0x4c66c1(0x4ad)]();if(this[_0x4c66c1(0x76a)](_0x1a68d4))for(const _0x9e584a of _0x50198a){this['createFauxAnimationSprite']([_0x9e584a],_0x1a68d4,_0x312f1b,_0x516446,_0x316704),_0x516446+=_0x4194ec;}else this[_0x4c66c1(0x51c)](_0x50198a,_0x1a68d4,_0x312f1b,_0x516446,_0x316704);},Spriteset_Base[_0x4e56c8(0x510)]['createAnimationSprite']=function(_0x10f6a0,_0x46a80a,_0x977c2d,_0xec4cec){const _0x4f98d8=_0x4e56c8,_0x4e2a05=this[_0x4f98d8(0x5f8)](_0x46a80a),_0x46705d=new(_0x4e2a05?Sprite_AnimationMV:Sprite_Animation)(),_0x34d530=this[_0x4f98d8(0x851)](_0x10f6a0),_0x15cc81=this[_0x4f98d8(0x276)](),_0x5cfe9e=_0xec4cec>_0x15cc81?this[_0x4f98d8(0x230)]():null;this[_0x4f98d8(0x401)](_0x10f6a0[0x0])&&(_0x977c2d=!_0x977c2d),_0x46705d[_0x4f98d8(0x2a8)]=_0x10f6a0,_0x46705d['setup'](_0x34d530,_0x46a80a,_0x977c2d,_0xec4cec,_0x5cfe9e),this[_0x4f98d8(0x156)](_0x46705d),this[_0x4f98d8(0x679)]['push'](_0x46705d);},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x51c)]=function(_0x57aaa4,_0x2a24e8,_0x486324,_0x2cc698,_0x33f5c9){const _0x4e7c98=_0x4e56c8,_0x4f151c=this[_0x4e7c98(0x5f8)](_0x2a24e8),_0x12e6f5=new(_0x4f151c?Sprite_AnimationMV:Sprite_Animation)(),_0x46cb97=this[_0x4e7c98(0x851)](_0x57aaa4);this['animationShouldMirror'](_0x57aaa4[0x0])&&(_0x486324=!_0x486324);_0x12e6f5[_0x4e7c98(0x2a8)]=_0x57aaa4,_0x12e6f5[_0x4e7c98(0x28b)](_0x46cb97,_0x2a24e8,_0x486324,_0x2cc698),_0x12e6f5[_0x4e7c98(0x4de)](_0x33f5c9),this[_0x4e7c98(0x156)](_0x12e6f5);if(this[_0x4e7c98(0x679)])this['_animationSprites'][_0x4e7c98(0x2e8)](_0x12e6f5);this['_fauxAnimationSprites'][_0x4e7c98(0x5c9)](_0x12e6f5);},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x156)]=function(_0x549f59){const _0x2e9a08=_0x4e56c8;this[_0x2e9a08(0x43a)][_0x2e9a08(0x100)](_0x549f59);},Spriteset_Base['prototype'][_0x4e56c8(0x499)]=function(_0x260406){const _0x1feb75=_0x4e56c8;this[_0x1feb75(0x679)]['remove'](_0x260406),this[_0x1feb75(0xdd)](_0x260406);for(const _0x4eeeb7 of _0x260406[_0x1feb75(0x2a8)]){_0x4eeeb7[_0x1feb75(0x46a)]&&_0x4eeeb7[_0x1feb75(0x46a)]();}_0x260406['destroy']();},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x83a)]=function(_0x15af88){const _0xa6d23c=_0x4e56c8;this[_0xa6d23c(0x646)]['remove'](_0x15af88),this['removeAnimationFromContainer'](_0x15af88);for(const _0x11536e of _0x15af88[_0xa6d23c(0x2a8)]){_0x11536e[_0xa6d23c(0x46a)]&&_0x11536e['endAnimation']();}_0x15af88[_0xa6d23c(0x778)]();},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0xdd)]=function(_0xe9bd50){const _0x29476c=_0x4e56c8;this[_0x29476c(0x43a)]['removeChild'](_0xe9bd50);},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x6ce)]=function(){const _0x79824c=_0x4e56c8;for(const _0x518a60 of this[_0x79824c(0x646)]){this[_0x79824c(0x83a)](_0x518a60);}},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x4e1)]=function(){const _0x765b42=_0x4e56c8;return this[_0x765b42(0x646)]['length']>0x0;},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x7e9)]=function(){const _0x1377bc=_0x4e56c8;for(const _0x3123ab of this[_0x1377bc(0x489)]){!_0x3123ab[_0x1377bc(0x7c5)]()&&this[_0x1377bc(0x40e)](_0x3123ab);}this[_0x1377bc(0x823)]();},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x823)]=function(){const _0x274787=_0x4e56c8;for(;;){const _0x30793d=$gameTemp[_0x274787(0x696)]();if(_0x30793d)this[_0x274787(0x424)](_0x30793d);else break;}},Spriteset_Base[_0x4e56c8(0x510)]['createPointAnimation']=function(_0x2caa35){const _0xcdc79e=_0x4e56c8,_0x4ba843=$dataAnimations[_0x2caa35[_0xcdc79e(0xa5)]],_0x5b1723=this[_0xcdc79e(0x62e)](_0x2caa35),_0x17bab4=_0x2caa35[_0xcdc79e(0x712)],_0x5bc5e9=_0x2caa35[_0xcdc79e(0x661)];let _0x29530b=this['animationBaseDelay']();const _0x3c69a4=this[_0xcdc79e(0x4ad)]();if(this[_0xcdc79e(0x76a)](_0x4ba843))for(const _0xa41899 of _0x5b1723){this[_0xcdc79e(0x342)]([_0xa41899],_0x4ba843,_0x17bab4,_0x29530b,_0x5bc5e9),_0x29530b+=_0x3c69a4;}else this[_0xcdc79e(0x342)](_0x5b1723,_0x4ba843,_0x17bab4,_0x29530b,_0x5bc5e9);},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x62e)]=function(_0x26194a){const _0x277171=_0x4e56c8,_0x238deb=new Sprite_Clickable(),_0x57879a=this[_0x277171(0x61d)]();_0x238deb['x']=_0x26194a['x']-_0x57879a['x'],_0x238deb['y']=_0x26194a['y']-_0x57879a['y'],_0x238deb['z']=0x64;const _0x52155d=this['getPointAnimationLayer']();return _0x52155d[_0x277171(0x100)](_0x238deb),[_0x238deb];},Spriteset_Base['prototype'][_0x4e56c8(0x61d)]=function(){return this;},Spriteset_Map[_0x4e56c8(0x510)][_0x4e56c8(0x61d)]=function(){const _0x5589a0=_0x4e56c8;return this[_0x5589a0(0x773)]||this;},Spriteset_Battle['prototype'][_0x4e56c8(0x61d)]=function(){return this['_battleField']||this;},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x342)]=function(_0x192057,_0x466be9,_0x4ddc84,_0x4c7beb,_0x505e01){const _0x4f2a1b=_0x4e56c8,_0x12e8d9=this[_0x4f2a1b(0x5f8)](_0x466be9),_0x2b8a1c=new(_0x12e8d9?Sprite_AnimationMV:Sprite_Animation)();_0x2b8a1c[_0x4f2a1b(0x2a8)]=_0x192057,_0x2b8a1c['setup'](_0x192057,_0x466be9,_0x4ddc84,_0x4c7beb),_0x2b8a1c['setMute'](_0x505e01),this[_0x4f2a1b(0x156)](_0x2b8a1c),this[_0x4f2a1b(0x489)]['push'](_0x2b8a1c);},Spriteset_Base[_0x4e56c8(0x510)][_0x4e56c8(0x40e)]=function(_0x564450){const _0x35b162=_0x4e56c8;this[_0x35b162(0x489)][_0x35b162(0x2e8)](_0x564450),this[_0x35b162(0x43a)][_0x35b162(0x346)](_0x564450);for(const _0x20b1ef of _0x564450[_0x35b162(0x2a8)]){_0x20b1ef[_0x35b162(0x46a)]&&_0x20b1ef[_0x35b162(0x46a)]();const _0xd9158b=this[_0x35b162(0x61d)]();if(_0xd9158b)_0xd9158b[_0x35b162(0x346)](_0x20b1ef);}_0x564450[_0x35b162(0x778)]();},Spriteset_Base[_0x4e56c8(0x510)]['removeAllPointAnimations']=function(){const _0xdf849a=_0x4e56c8;for(const _0x27bf00 of this[_0xdf849a(0x489)]){this['removePointAnimation'](_0x27bf00);}},Spriteset_Base['prototype'][_0x4e56c8(0x367)]=function(){const _0x5bd77e=_0x4e56c8;return this[_0x5bd77e(0x489)][_0x5bd77e(0x323)]>0x0;},VisuMZ['CoreEngine'][_0x4e56c8(0x483)]=Spriteset_Base[_0x4e56c8(0x510)]['isAnimationPlaying'],Spriteset_Base['prototype']['isAnimationPlaying']=function(){const _0x37bf27=_0x4e56c8;return VisuMZ[_0x37bf27(0x5b8)][_0x37bf27(0x483)][_0x37bf27(0x410)](this)||this['isPointAnimationPlaying']();},Spriteset_Map['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)]['QoL'][_0x4e56c8(0x279)]||![],VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5e1)]=Scene_Map['prototype'][_0x4e56c8(0x3c7)],Scene_Map['prototype']['createSpriteset']=function(){const _0x5c2ec8=_0x4e56c8;VisuMZ[_0x5c2ec8(0x5b8)]['Scene_Map_createSpriteset_detach'][_0x5c2ec8(0x410)](this);if(!Spriteset_Map[_0x5c2ec8(0x705)])return;const _0x3e9690=this[_0x5c2ec8(0x294)];if(!_0x3e9690)return;this[_0x5c2ec8(0x6d0)]=_0x3e9690[_0x5c2ec8(0x6d0)];if(!this[_0x5c2ec8(0x6d0)])return;this[_0x5c2ec8(0x100)](this[_0x5c2ec8(0x6d0)]);},VisuMZ['CoreEngine'][_0x4e56c8(0x19a)]=Spriteset_Map['prototype'][_0x4e56c8(0x8f)],Spriteset_Map[_0x4e56c8(0x510)][_0x4e56c8(0x8f)]=function(){const _0x10afcb=_0x4e56c8;VisuMZ[_0x10afcb(0x5b8)][_0x10afcb(0x19a)][_0x10afcb(0x410)](this),this[_0x10afcb(0x240)]();},Spriteset_Map[_0x4e56c8(0x510)][_0x4e56c8(0x240)]=function(){const _0x542d25=_0x4e56c8,_0x3e0595=$gameMap[_0x542d25(0x122)]();if(!_0x3e0595)return;const _0x703e70=$gameMap[_0x542d25(0x3aa)]();if(Object[_0x542d25(0x14d)](_0x703e70)['length']<=0x0)return;const _0x1c5239=$gameMap[_0x542d25(0x17d)]();this[_0x542d25(0x6ae)]=this['_tileExtendSprites']||[];for(let _0x3ef931=0x0;_0x3ef931<$gameMap[_0x542d25(0x1e9)]();_0x3ef931++){for(let _0x4c1624=0x0;_0x4c1624<$gameMap[_0x542d25(0x79c)]();_0x4c1624++){for(const _0x55538b of $gameMap[_0x542d25(0x795)](_0x4c1624,_0x3ef931)){const _0x1e8245=_0x1c5239[_0x55538b]>>0xc,_0xf0f93b=_0x703e70[_0x1e8245]||0x0;if(_0xf0f93b<=0x0)continue;this['createExtendedTileSprite'](_0x4c1624,_0x3ef931,_0x55538b,_0xf0f93b);}}}},Spriteset_Map['prototype'][_0x4e56c8(0x4eb)]=function(){const _0x37815c=_0x4e56c8;this[_0x37815c(0x6ae)]=this[_0x37815c(0x6ae)]||[];for(const _0x45aab9 of this[_0x37815c(0x6ae)]){this[_0x37815c(0x773)][_0x37815c(0x346)](_0x45aab9);}this[_0x37815c(0x6ae)]=[];},Spriteset_Map[_0x4e56c8(0x510)]['createExtendedTileSprite']=function(_0x55c7da,_0x575b3d,_0x49d594,_0x311179){const _0x22b0e5=_0x4e56c8,_0x4df36a=new Sprite_ExtendedTile(_0x55c7da,_0x575b3d,_0x49d594,_0x311179),_0x618180=$gameMap[_0x22b0e5(0x17d)]();_0x618180[_0x49d594]&0x10?_0x4df36a['z']=0x4:_0x4df36a['z']=0x3,this[_0x22b0e5(0x773)][_0x22b0e5(0x100)](_0x4df36a),this[_0x22b0e5(0x6ae)][_0x22b0e5(0x5c9)](_0x4df36a);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x3e8)]=Tilemap[_0x4e56c8(0x510)][_0x4e56c8(0xf8)],Tilemap['prototype'][_0x4e56c8(0xf8)]=function(_0x3fd0bd,_0x3d6ac6,_0x171b70){const _0x2ebd23=_0x4e56c8;if($gameMap[_0x2ebd23(0x139)](_0x3fd0bd))return;VisuMZ['CoreEngine'][_0x2ebd23(0x3e8)][_0x2ebd23(0x410)](this,_0x3fd0bd,_0x3d6ac6,_0x171b70);},Spriteset_Battle[_0x4e56c8(0x705)]=VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)][_0x4e56c8(0x2c9)][_0x4e56c8(0x6e8)]||![],VisuMZ['CoreEngine'][_0x4e56c8(0x58e)]=Scene_Battle[_0x4e56c8(0x510)][_0x4e56c8(0x3c7)],Scene_Battle[_0x4e56c8(0x510)]['createSpriteset']=function(){const _0x390bac=_0x4e56c8;VisuMZ[_0x390bac(0x5b8)][_0x390bac(0x58e)][_0x390bac(0x410)](this);if(!Spriteset_Battle['DETACH_PICTURE_CONTAINER'])return;const _0x1c239f=this[_0x390bac(0x294)];if(!_0x1c239f)return;this['_pictureContainer']=_0x1c239f[_0x390bac(0x6d0)];if(!this[_0x390bac(0x6d0)])return;this['addChild'](this[_0x390bac(0x6d0)]);},Spriteset_Battle[_0x4e56c8(0x510)][_0x4e56c8(0x59a)]=function(){const _0x465ee8=_0x4e56c8;this['_backgroundFilter']=new PIXI[(_0x465ee8(0x72e))]['BlurFilter'](clamp=!![]),this[_0x465ee8(0x6d1)]=new Sprite(),this[_0x465ee8(0x6d1)][_0x465ee8(0x134)]=SceneManager[_0x465ee8(0x762)](),this[_0x465ee8(0x6d1)][_0x465ee8(0x72e)]=[this[_0x465ee8(0x57f)]],this[_0x465ee8(0x7fc)][_0x465ee8(0x100)](this[_0x465ee8(0x6d1)]);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x320)]=Spriteset_Battle[_0x4e56c8(0x510)][_0x4e56c8(0x4cf)],Spriteset_Battle['prototype'][_0x4e56c8(0x4cf)]=function(){const _0x37be7b=_0x4e56c8;this[_0x37be7b(0xdb)]()&&this['repositionEnemiesByResolution'](),VisuMZ[_0x37be7b(0x5b8)]['Spriteset_Battle_createEnemies'][_0x37be7b(0x410)](this);},Spriteset_Battle['prototype'][_0x4e56c8(0xdb)]=function(){const _0x537eb1=_0x4e56c8,_0xb76425=VisuMZ['CoreEngine']['Settings'][_0x537eb1(0x234)];if(!_0xb76425)return![];if(Utils[_0x537eb1(0x5c1)]>='1.3.0'&&!_0xb76425[_0x537eb1(0x733)])return![];return _0xb76425[_0x537eb1(0x735)];},Spriteset_Battle[_0x4e56c8(0x510)][_0x4e56c8(0xab)]=function(){const _0x5c16d3=_0x4e56c8;for(member of $gameTroop[_0x5c16d3(0x81)]()){member[_0x5c16d3(0x77a)]();}},VisuMZ[_0x4e56c8(0x5b8)]['Window_Base_initialize']=Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x5e5)],Window_Base['prototype'][_0x4e56c8(0x5e5)]=function(_0xea6720){const _0x534d3b=_0x4e56c8;_0xea6720['x']=Math[_0x534d3b(0x263)](_0xea6720['x']),_0xea6720['y']=Math[_0x534d3b(0x263)](_0xea6720['y']),_0xea6720[_0x534d3b(0x79c)]=Math[_0x534d3b(0x263)](_0xea6720[_0x534d3b(0x79c)]),_0xea6720[_0x534d3b(0x1e9)]=Math[_0x534d3b(0x263)](_0xea6720[_0x534d3b(0x1e9)]),this[_0x534d3b(0x4b7)](),VisuMZ[_0x534d3b(0x5b8)][_0x534d3b(0x75f)]['call'](this,_0xea6720),this['initCoreEasing']();},Window_Base[_0x4e56c8(0x510)]['initDigitGrouping']=function(){const _0xbb41d3=_0x4e56c8;this[_0xbb41d3(0x7a0)]=VisuMZ[_0xbb41d3(0x5b8)]['Settings'][_0xbb41d3(0x2c9)][_0xbb41d3(0x528)],this['_digitGroupingEx']=VisuMZ[_0xbb41d3(0x5b8)][_0xbb41d3(0x5ce)]['QoL'][_0xbb41d3(0x4bb)];},Window_Base['prototype']['lineHeight']=function(){const _0x322054=_0x4e56c8;return VisuMZ[_0x322054(0x5b8)]['Settings']['Window'][_0x322054(0x4ba)];},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x532)]=function(){const _0x31f1c9=_0x4e56c8;return VisuMZ[_0x31f1c9(0x5b8)][_0x31f1c9(0x5ce)][_0x31f1c9(0x18f)]['ItemPadding'];},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x6fd)]=function(){const _0xe5736f=_0x4e56c8;$gameSystem['windowOpacity']?this[_0xe5736f(0x5cb)]=$gameSystem[_0xe5736f(0x451)]():this['backOpacity']=VisuMZ[_0xe5736f(0x5b8)][_0xe5736f(0x5ce)][_0xe5736f(0x18f)][_0xe5736f(0x304)];},Window_Base[_0x4e56c8(0x510)]['translucentOpacity']=function(){const _0x500ac6=_0x4e56c8;return VisuMZ['CoreEngine'][_0x500ac6(0x5ce)][_0x500ac6(0x18f)][_0x500ac6(0xdc)];},Window_Base['prototype'][_0x4e56c8(0x62c)]=function(){const _0x4614dc=_0x4e56c8;return VisuMZ[_0x4614dc(0x5b8)][_0x4614dc(0x5ce)]['Window']['OpenSpeed'];},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x4d6)]=Window_Base['prototype'][_0x4e56c8(0x5b3)],Window_Base['prototype'][_0x4e56c8(0x5b3)]=function(){const _0x11d438=_0x4e56c8;VisuMZ[_0x11d438(0x5b8)][_0x11d438(0x4d6)][_0x11d438(0x410)](this),this[_0x11d438(0x93)]();},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x667)]=function(){const _0x36f311=_0x4e56c8;this['_opening']&&(this[_0x36f311(0x64e)]+=this[_0x36f311(0x62c)](),this[_0x36f311(0x363)]()&&(this[_0x36f311(0x143)]=![]));},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x1df)]=function(){const _0x414cfa=_0x4e56c8;this[_0x414cfa(0x4c5)]&&(this[_0x414cfa(0x64e)]-=this['openingSpeed'](),this[_0x414cfa(0xa8)]()&&(this[_0x414cfa(0x4c5)]=![]));},VisuMZ[_0x4e56c8(0x5b8)]['Window_Base_drawText']=Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x356)],Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x356)]=function(_0x4b81a4,_0x5d0655,_0x378759,_0x203385,_0x206e3e){const _0x40fb9b=_0x4e56c8;if(this[_0x40fb9b(0x55e)]())_0x4b81a4=VisuMZ['GroupDigits'](_0x4b81a4);VisuMZ['CoreEngine']['Window_Base_drawText'][_0x40fb9b(0x410)](this,_0x4b81a4,_0x5d0655,_0x378759,_0x203385,_0x206e3e);},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x55e)]=function(){const _0x5b98e7=_0x4e56c8;return this[_0x5b98e7(0x7a0)];},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x560)]=Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x11d)],Window_Base['prototype'][_0x4e56c8(0x11d)]=function(_0x1824e2,_0x49e87b,_0x1181b1,_0x355711){const _0x332ab3=_0x4e56c8;var _0x29f6fc=VisuMZ['CoreEngine'][_0x332ab3(0x560)][_0x332ab3(0x410)](this,_0x1824e2,_0x49e87b,_0x1181b1,_0x355711);if(this[_0x332ab3(0x4a7)]())_0x29f6fc[_0x332ab3(0x456)]=String(VisuMZ[_0x332ab3(0x7f4)](_0x29f6fc[_0x332ab3(0x456)]))||'';return _0x29f6fc;},Window_Base['prototype']['useDigitGroupingEx']=function(){return this['_digitGroupingEx'];},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x3c5)]=function(_0x38304b){const _0x57525f=_0x4e56c8;this[_0x57525f(0x7a0)]=_0x38304b;},Window_Base['prototype'][_0x4e56c8(0x16a)]=function(_0x45bd98){this['_digitGroupingEx']=_0x45bd98;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x152)]=Window_Base['prototype']['drawIcon'],Window_Base[_0x4e56c8(0x510)]['drawIcon']=function(_0x42a305,_0x5c684a,_0x1d872c){const _0x403a65=_0x4e56c8;_0x5c684a=Math['round'](_0x5c684a),_0x1d872c=Math[_0x403a65(0x263)](_0x1d872c),VisuMZ[_0x403a65(0x5b8)][_0x403a65(0x152)][_0x403a65(0x410)](this,_0x42a305,_0x5c684a,_0x1d872c);},VisuMZ['CoreEngine'][_0x4e56c8(0xc5)]=Window_Base['prototype']['drawFace'],Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x1b9)]=function(_0x14aa4e,_0x11130c,_0x2b3974,_0xd0e37f,_0x2689eb,_0x54dbb7){const _0x1a7a50=_0x4e56c8;_0x2689eb=_0x2689eb||ImageManager[_0x1a7a50(0x457)],_0x54dbb7=_0x54dbb7||ImageManager[_0x1a7a50(0x358)],_0x2b3974=Math['round'](_0x2b3974),_0xd0e37f=Math[_0x1a7a50(0x263)](_0xd0e37f),_0x2689eb=Math[_0x1a7a50(0x263)](_0x2689eb),_0x54dbb7=Math[_0x1a7a50(0x263)](_0x54dbb7),VisuMZ['CoreEngine'][_0x1a7a50(0xc5)]['call'](this,_0x14aa4e,_0x11130c,_0x2b3974,_0xd0e37f,_0x2689eb,_0x54dbb7);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x2b9)]=Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x40b)],Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x40b)]=function(_0x414541,_0x29a7bf,_0x2fe065,_0x2391ae){const _0x5cea33=_0x4e56c8;_0x2fe065=Math['round'](_0x2fe065),_0x2391ae=Math[_0x5cea33(0x263)](_0x2391ae),VisuMZ['CoreEngine']['Window_Base_drawCharacter'][_0x5cea33(0x410)](this,_0x414541,_0x29a7bf,_0x2fe065,_0x2391ae);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x3c9)]=Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x43d)],Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x43d)]=function(_0xfab7f9){const _0xe30b48=_0x4e56c8;let _0x58a17f=VisuMZ['CoreEngine'][_0xe30b48(0x3c9)][_0xe30b48(0x410)](this,_0xfab7f9);return _0x58a17f['x']=Math[_0xe30b48(0x263)](_0x58a17f['x']),_0x58a17f['y']=Math[_0xe30b48(0x263)](_0x58a17f['y']),_0x58a17f[_0xe30b48(0x79c)]=Math['round'](_0x58a17f[_0xe30b48(0x79c)]),_0x58a17f[_0xe30b48(0x1e9)]=Math[_0xe30b48(0x263)](_0x58a17f['height']),_0x58a17f;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x7d4)]=Window_StatusBase['prototype']['drawActorSimpleStatus'],Window_StatusBase[_0x4e56c8(0x510)][_0x4e56c8(0x232)]=function(_0x531f2b,_0x5a748b,_0x10e79a){const _0x12325e=_0x4e56c8;_0x5a748b=Math[_0x12325e(0x263)](_0x5a748b),_0x10e79a=Math[_0x12325e(0x263)](_0x10e79a),VisuMZ[_0x12325e(0x5b8)][_0x12325e(0x7d4)][_0x12325e(0x410)](this,_0x531f2b,_0x5a748b,_0x10e79a);},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x82)]=function(){const _0x3e83de=_0x4e56c8;this[_0x3e83de(0x270)]={'duration':0x0,'wholeDuration':0x0,'type':_0x3e83de(0x734),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x3e83de(0x4d8)]['x'],'targetScaleY':this[_0x3e83de(0x4d8)]['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this[_0x3e83de(0x5c8)]};},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x93)]=function(){const _0xcf3bf5=_0x4e56c8;if(!this['_coreEasing'])return;if(this[_0xcf3bf5(0x270)][_0xcf3bf5(0x13c)]<=0x0)return;this['x']=this[_0xcf3bf5(0x521)](this['x'],this[_0xcf3bf5(0x270)][_0xcf3bf5(0x315)]),this['y']=this['applyCoreEasing'](this['y'],this[_0xcf3bf5(0x270)][_0xcf3bf5(0x4a0)]),this['scale']['x']=this[_0xcf3bf5(0x521)](this[_0xcf3bf5(0x4d8)]['x'],this[_0xcf3bf5(0x270)][_0xcf3bf5(0x49e)]),this[_0xcf3bf5(0x4d8)]['y']=this[_0xcf3bf5(0x521)](this['scale']['y'],this[_0xcf3bf5(0x270)][_0xcf3bf5(0x478)]),this[_0xcf3bf5(0x75a)]=this[_0xcf3bf5(0x521)](this[_0xcf3bf5(0x75a)],this[_0xcf3bf5(0x270)][_0xcf3bf5(0xc8)]),this[_0xcf3bf5(0x5cb)]=this['applyCoreEasing'](this[_0xcf3bf5(0x5cb)],this['_coreEasing'][_0xcf3bf5(0x313)]),this['contentsOpacity']=this[_0xcf3bf5(0x521)](this[_0xcf3bf5(0x5c8)],this[_0xcf3bf5(0x270)][_0xcf3bf5(0x84f)]),this[_0xcf3bf5(0x270)][_0xcf3bf5(0x13c)]--;},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x521)]=function(_0x580acb,_0x5f4750){const _0x5be934=_0x4e56c8;if(!this[_0x5be934(0x270)])return _0x5f4750;const _0x4bd31a=this[_0x5be934(0x270)][_0x5be934(0x13c)],_0x383a33=this[_0x5be934(0x270)][_0x5be934(0x855)],_0x13bf3c=this['calcCoreEasing']((_0x383a33-_0x4bd31a)/_0x383a33),_0x56abee=this[_0x5be934(0x826)]((_0x383a33-_0x4bd31a+0x1)/_0x383a33),_0x14bf9f=(_0x580acb-_0x5f4750*_0x13bf3c)/(0x1-_0x13bf3c);return _0x14bf9f+(_0x5f4750-_0x14bf9f)*_0x56abee;},Window_Base[_0x4e56c8(0x510)]['calcCoreEasing']=function(_0x59e8f0){const _0x1bb704=_0x4e56c8;if(!this[_0x1bb704(0x270)])return _0x59e8f0;return VisuMZ[_0x1bb704(0x165)](_0x59e8f0,this[_0x1bb704(0x270)][_0x1bb704(0x287)]||'LINEAR');},Window_Base['prototype']['anchorCoreEasing']=function(_0xbeb209,_0x24dc70){const _0x1735ab=_0x4e56c8;if(!this['_coreEasing'])return;this['x']=this[_0x1735ab(0x270)]['targetX'],this['y']=this[_0x1735ab(0x270)][_0x1735ab(0x4a0)],this[_0x1735ab(0x4d8)]['x']=this[_0x1735ab(0x270)][_0x1735ab(0x49e)],this['scale']['y']=this[_0x1735ab(0x270)]['targetScaleY'],this[_0x1735ab(0x75a)]=this['_coreEasing'][_0x1735ab(0xc8)],this[_0x1735ab(0x5cb)]=this['_coreEasing']['targetBackOpacity'],this['contentsOpacity']=this[_0x1735ab(0x270)][_0x1735ab(0x84f)],this[_0x1735ab(0x7eb)](_0xbeb209,_0x24dc70,this['x'],this['y'],this[_0x1735ab(0x4d8)]['x'],this[_0x1735ab(0x4d8)]['y'],this['opacity'],this[_0x1735ab(0x5cb)],this[_0x1735ab(0x5c8)]);},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x7eb)]=function(_0x190cdb,_0x2ae548,_0x3bf4ff,_0x52c563,_0x5b630f,_0x229d78,_0x5b8ce3,_0x20e5be,_0x48b52d){const _0x2d52b=_0x4e56c8;this[_0x2d52b(0x270)]={'duration':_0x190cdb,'wholeDuration':_0x190cdb,'type':_0x2ae548,'targetX':_0x3bf4ff,'targetY':_0x52c563,'targetScaleX':_0x5b630f,'targetScaleY':_0x229d78,'targetOpacity':_0x5b8ce3,'targetBackOpacity':_0x20e5be,'targetContentsOpacity':_0x48b52d};},Window_Base[_0x4e56c8(0x510)]['drawCurrencyValue']=function(_0xa5f926,_0x3042d3,_0x436e74,_0x2417f2,_0x4b6392){const _0x2f1f92=_0x4e56c8;this[_0x2f1f92(0x95)](),this['contents'][_0x2f1f92(0x2ea)]=VisuMZ['CoreEngine'][_0x2f1f92(0x5ce)][_0x2f1f92(0x4a4)][_0x2f1f92(0x5bd)];const _0x1b605a=VisuMZ[_0x2f1f92(0x5b8)][_0x2f1f92(0x5ce)][_0x2f1f92(0x4a4)][_0x2f1f92(0x35e)];if(_0x1b605a>0x0&&_0x3042d3===TextManager['currencyUnit']){const _0x5dd03b=_0x2417f2+(this[_0x2f1f92(0x7d3)]()-ImageManager['iconHeight'])/0x2;this[_0x2f1f92(0x29d)](_0x1b605a,_0x436e74+(_0x4b6392-ImageManager[_0x2f1f92(0x7a2)]),_0x5dd03b),_0x4b6392-=ImageManager[_0x2f1f92(0x7a2)]+0x4;}else this[_0x2f1f92(0x108)](ColorManager[_0x2f1f92(0x776)]()),this[_0x2f1f92(0x356)](_0x3042d3,_0x436e74,_0x2417f2,_0x4b6392,_0x2f1f92(0x747)),_0x4b6392-=this[_0x2f1f92(0x376)](_0x3042d3)+0x6;this[_0x2f1f92(0x3ad)]();const _0x268c76=this[_0x2f1f92(0x376)](this['_digitGrouping']?VisuMZ[_0x2f1f92(0x7f4)](_0xa5f926):_0xa5f926);_0x268c76>_0x4b6392?this['drawText'](VisuMZ[_0x2f1f92(0x5b8)][_0x2f1f92(0x5ce)][_0x2f1f92(0x4a4)][_0x2f1f92(0x5b2)],_0x436e74,_0x2417f2,_0x4b6392,_0x2f1f92(0x747)):this[_0x2f1f92(0x356)](_0xa5f926,_0x436e74,_0x2417f2,_0x4b6392,_0x2f1f92(0x747)),this[_0x2f1f92(0x95)]();},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x35f)]=function(_0x280867,_0x549aef,_0xf69b4c,_0x456c2a,_0x28ac47){const _0x315b38=_0x4e56c8,_0x4b6ec5=ImageManager[_0x315b38(0x482)](_0x315b38(0x3ae)),_0x103d2d=ImageManager[_0x315b38(0x7a2)],_0x3b5751=ImageManager['iconHeight'],_0x1c046b=_0x280867%0x10*_0x103d2d,_0x3e6995=Math[_0x315b38(0x653)](_0x280867/0x10)*_0x3b5751,_0x2cf22d=_0x456c2a,_0x325543=_0x456c2a;this[_0x315b38(0x6cb)][_0x315b38(0x7d9)][_0x315b38(0x345)]=_0x28ac47,this[_0x315b38(0x6cb)][_0x315b38(0x314)](_0x4b6ec5,_0x1c046b,_0x3e6995,_0x103d2d,_0x3b5751,_0x549aef,_0xf69b4c,_0x2cf22d,_0x325543),this['contents'][_0x315b38(0x7d9)][_0x315b38(0x345)]=!![];},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x2dc)]=function(_0xdd76f7,_0x3cfe4a,_0x23a555,_0x1987c2,_0x587ad0,_0xb6709a){const _0x1e474d=_0x4e56c8,_0x2f2745=Math[_0x1e474d(0x653)]((_0x23a555-0x2)*_0x1987c2),_0x5f6b1b=Sprite_Gauge[_0x1e474d(0x510)][_0x1e474d(0x2fb)][_0x1e474d(0x410)](this),_0x305ac2=_0x3cfe4a+this[_0x1e474d(0x7d3)]()-_0x5f6b1b-0x2;this[_0x1e474d(0x6cb)][_0x1e474d(0x425)](_0xdd76f7,_0x305ac2,_0x23a555,_0x5f6b1b,ColorManager[_0x1e474d(0x73)]()),this[_0x1e474d(0x6cb)][_0x1e474d(0x3fe)](_0xdd76f7+0x1,_0x305ac2+0x1,_0x2f2745,_0x5f6b1b-0x2,_0x587ad0,_0xb6709a);},Window_Scrollable[_0x4e56c8(0x92)]={'enabled':VisuMZ['CoreEngine'][_0x4e56c8(0x5ce)][_0x4e56c8(0x18f)]['ShowScrollBar']??!![],'thickness':VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)][_0x4e56c8(0x18f)][_0x4e56c8(0x3cb)]??0x2,'offset':VisuMZ[_0x4e56c8(0x5b8)]['Settings'][_0x4e56c8(0x18f)]['BarOffset']??0x2,'bodyColor':VisuMZ[_0x4e56c8(0x5b8)]['Settings'][_0x4e56c8(0x18f)][_0x4e56c8(0x3ab)]??0x0,'offColor':VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)][_0x4e56c8(0x18f)][_0x4e56c8(0x51b)]??0x7,'offOpacity':VisuMZ[_0x4e56c8(0x5b8)]['Settings'][_0x4e56c8(0x18f)][_0x4e56c8(0x56f)]??0x80},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x239)]=function(){const _0x3db1b8=_0x4e56c8;return Window_Scrollable[_0x3db1b8(0x92)][_0x3db1b8(0x16e)]&&Window_Scrollable[_0x3db1b8(0x92)][_0x3db1b8(0x6f0)]>0x0;},VisuMZ['CoreEngine']['Window_Base_createContents']=Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x858)],Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x858)]=function(){const _0xae3a52=_0x4e56c8;VisuMZ['CoreEngine']['Window_Base_createContents']['call'](this),this[_0xae3a52(0x6fc)](),this[_0xae3a52(0x2d1)](!![]),this[_0xae3a52(0x2d1)](![]);},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x6fc)]=function(){const _0x2f9ad8=_0x4e56c8;if(!this['isScrollBarVisible']())return;if(this['_scrollBarHorz']||this['_scrollBarVert'])return;this[_0x2f9ad8(0x841)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this['_scrollBarHorz']=new Sprite(),this[_0x2f9ad8(0x60b)]=new Sprite(),this[_0x2f9ad8(0x100)](this[_0x2f9ad8(0x5ec)]),this[_0x2f9ad8(0x100)](this['_scrollBarVert']);},Window_Base[_0x4e56c8(0x510)]['setupScrollBarBitmap']=function(_0x217aaf){const _0x503207=_0x4e56c8,_0x625f3c=_0x217aaf?this[_0x503207(0x5ec)]:this[_0x503207(0x60b)];if(!_0x625f3c)return;const _0x485fa1=Window_Scrollable['SCROLLBAR'],_0x56bf0d=_0x485fa1['thickness'],_0x2fb3f7=_0x217aaf?this[_0x503207(0xc1)]-_0x56bf0d*0x2:_0x56bf0d,_0xea2e2c=_0x217aaf?_0x56bf0d:this['innerHeight']-_0x56bf0d*0x2;_0x625f3c[_0x503207(0x134)]=new Bitmap(_0x2fb3f7,_0xea2e2c),_0x625f3c[_0x503207(0x65f)](0x0,0x0,_0x2fb3f7,_0xea2e2c),this[_0x503207(0x2f9)](_0x217aaf);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x7fe)]=Window_Base['prototype'][_0x4e56c8(0x262)],Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x262)]=function(){const _0x4904a4=_0x4e56c8;VisuMZ[_0x4904a4(0x5b8)][_0x4904a4(0x7fe)][_0x4904a4(0x410)](this),this[_0x4904a4(0x3e9)]();},Window_Base[_0x4e56c8(0x510)]['destroyScrollBarBitmaps']=function(){const _0x500800=_0x4e56c8,_0x33a194=[this[_0x500800(0x5ec)],this[_0x500800(0x60b)]];for(const _0x1e3142 of _0x33a194){if(_0x1e3142&&_0x1e3142[_0x500800(0x134)])_0x1e3142[_0x500800(0x134)][_0x500800(0x778)]();}},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x39d)]=Window_Scrollable[_0x4e56c8(0x510)][_0x4e56c8(0x5b3)],Window_Scrollable[_0x4e56c8(0x510)][_0x4e56c8(0x5b3)]=function(){const _0x5d126c=_0x4e56c8;VisuMZ[_0x5d126c(0x5b8)][_0x5d126c(0x39d)]['call'](this),this[_0x5d126c(0x6ff)]();},Window_Scrollable[_0x4e56c8(0x510)][_0x4e56c8(0x6ff)]=function(){const _0x590cee=_0x4e56c8;this[_0x590cee(0x3b3)](),this[_0x590cee(0x694)](!![]),this[_0x590cee(0x694)](![]),this['updateScrollBarPosition'](!![]),this[_0x590cee(0x2f9)](![]);},Window_Scrollable[_0x4e56c8(0x510)][_0x4e56c8(0x3b3)]=function(){const _0x1ee835=_0x4e56c8,_0xf5ddc0=[this[_0x1ee835(0x5ec)],this['_scrollBarVert']];for(const _0x2222a2 of _0xf5ddc0){_0x2222a2&&(_0x2222a2[_0x1ee835(0x852)]=this[_0x1ee835(0x239)]()&&this[_0x1ee835(0x363)]());}},Window_Scrollable[_0x4e56c8(0x510)][_0x4e56c8(0x694)]=function(_0x2d6c85){const _0x234a6d=_0x4e56c8;if(!this[_0x234a6d(0x841)])return;const _0x526211=this[_0x234a6d(0x465)](_0x2d6c85),_0xd1fad4=this[_0x234a6d(0x5e6)](_0x2d6c85),_0x36ac16=_0x2d6c85?_0x234a6d(0x130):_0x234a6d(0x768),_0x5a193d=_0x2d6c85?_0x234a6d(0x37f):'maxVert';(this[_0x234a6d(0x841)][_0x36ac16]!==_0x526211||this['_lastScrollBarValues'][_0x5a193d]!==_0xd1fad4)&&(this['_lastScrollBarValues'][_0x36ac16]=_0x526211,this[_0x234a6d(0x841)][_0x5a193d]=_0xd1fad4,this[_0x234a6d(0x7c4)](_0x2d6c85,_0x526211,_0xd1fad4));},Window_Scrollable[_0x4e56c8(0x510)]['scrollbar']=function(_0x1c6507){const _0x43636f=_0x4e56c8;if(this[_0x43636f(0x5d0)]!==undefined)return _0x1c6507?this[_0x43636f(0x32f)]():this['origin']['y'];return _0x1c6507?this[_0x43636f(0x32f)]():this[_0x43636f(0x459)]();},Window_Scrollable[_0x4e56c8(0x510)][_0x4e56c8(0x5e6)]=function(_0xe7d841){const _0x342d1d=_0x4e56c8;if(this[_0x342d1d(0x5d0)]!==undefined)return _0xe7d841?this[_0x342d1d(0x3df)]():Math['max'](0x0,this[_0x342d1d(0x5d0)]-this[_0x342d1d(0x554)]);return _0xe7d841?this['maxScrollX']():this[_0x342d1d(0x17b)]();},Window_Scrollable['prototype']['scrollbarHeight']=function(){const _0x5bcde7=_0x4e56c8;if(this['_allTextHeight']!==undefined)return Math[_0x5bcde7(0x53e)](0x0,this[_0x5bcde7(0x5d0)]);return this[_0x5bcde7(0x522)]();},Window_Scrollable[_0x4e56c8(0x510)][_0x4e56c8(0x7c4)]=function(_0x4845dc,_0x5e276f,_0x5af83d){const _0x32480e=_0x4e56c8,_0x2bc1e9=_0x4845dc?this[_0x32480e(0x5ec)]:this['_scrollBarVert'];if(!_0x2bc1e9)return;if(!_0x2bc1e9[_0x32480e(0x134)])return;const _0x2afa33=_0x2bc1e9[_0x32480e(0x134)];_0x2afa33[_0x32480e(0xaf)]();if(_0x5af83d<=0x0)return;const _0x167dea=_0x4845dc?this[_0x32480e(0xc1)]/this[_0x32480e(0x663)]():this[_0x32480e(0x554)]/this[_0x32480e(0x258)](),_0xfc81f7=_0x4845dc?Math['round'](_0x5e276f*_0x167dea):0x0,_0x4db3ec=_0x4845dc?0x0:Math[_0x32480e(0x263)](_0x5e276f*_0x167dea),_0x48286f=_0x4845dc?Math[_0x32480e(0x263)](_0x2afa33[_0x32480e(0x79c)]*_0x167dea):_0x2afa33[_0x32480e(0x79c)],_0x3e7342=_0x4845dc?_0x2afa33[_0x32480e(0x1e9)]:Math[_0x32480e(0x263)](_0x2afa33[_0x32480e(0x1e9)]*_0x167dea),_0x59b0ed=Window_Scrollable[_0x32480e(0x92)],_0x230d61=ColorManager[_0x32480e(0x12e)](_0x59b0ed[_0x32480e(0x265)]),_0x195fe4=ColorManager['getColor'](_0x59b0ed['bodyColor']),_0x3d46aa=_0x59b0ed[_0x32480e(0x7d6)];_0x2afa33['paintOpacity']=_0x3d46aa,_0x2afa33['fillAll'](_0x230d61),_0x2afa33[_0x32480e(0x725)]=0xff,_0x2afa33['fillRect'](_0xfc81f7,_0x4db3ec,_0x48286f,_0x3e7342,_0x195fe4);},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x2f9)]=function(_0x431c2c){const _0x41fdb2=_0x4e56c8,_0x580f2a=_0x431c2c?this['_scrollBarHorz']:this['_scrollBarVert'];if(!_0x580f2a)return;const _0x48c634=Window_Scrollable[_0x41fdb2(0x92)],_0x3ada0e=_0x48c634[_0x41fdb2(0x6f0)],_0x15afb1=_0x48c634[_0x41fdb2(0x731)];if(!_0x580f2a[_0x41fdb2(0x32b)])return;_0x580f2a['x']=this[_0x41fdb2(0x8c)]+(_0x431c2c?_0x3ada0e:this[_0x41fdb2(0xc1)]+_0x15afb1),_0x580f2a['y']=this['padding']+(_0x431c2c?this[_0x41fdb2(0x554)]+_0x15afb1:_0x3ada0e);},Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x543)]=function(_0x2e1935){const _0x2176dc=_0x4e56c8;let _0x3e27f0=this[_0x2176dc(0x777)]();const _0x5950e7=this[_0x2176dc(0x595)](),_0x55533a=this[_0x2176dc(0x440)]();if(this[_0x2176dc(0x83e)]()&&(_0x3e27f0<_0x5950e7||_0x2e1935&&_0x55533a===0x1)){_0x3e27f0+=_0x55533a;if(_0x3e27f0>=_0x5950e7)_0x3e27f0=_0x5950e7-0x1;this['smoothSelect'](_0x3e27f0);}else!this[_0x2176dc(0x83e)]()&&((_0x3e27f0<_0x5950e7-_0x55533a||_0x2e1935&&_0x55533a===0x1)&&this['smoothSelect']((_0x3e27f0+_0x55533a)%_0x5950e7));},VisuMZ[_0x4e56c8(0x5b8)]['Window_Selectable_cursorDown']=Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x543)],Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x543)]=function(_0x8ca5f6){const _0x17ef49=_0x4e56c8;this[_0x17ef49(0x83e)]()&&_0x8ca5f6&&this[_0x17ef49(0x440)]()===0x1&&this[_0x17ef49(0x777)]()===this[_0x17ef49(0x595)]()-0x1?this[_0x17ef49(0x4dd)](0x0):VisuMZ[_0x17ef49(0x5b8)][_0x17ef49(0x546)][_0x17ef49(0x410)](this,_0x8ca5f6);},Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x45b)]=function(_0x274f39){const _0x574862=_0x4e56c8;let _0x428930=Math['max'](0x0,this['index']());const _0x1af23c=this[_0x574862(0x595)](),_0x55c12f=this[_0x574862(0x440)]();if(this['isUseModernControls']()&&_0x428930>0x0||_0x274f39&&_0x55c12f===0x1){_0x428930-=_0x55c12f;if(_0x428930<=0x0)_0x428930=0x0;this[_0x574862(0x4dd)](_0x428930);}else!this[_0x574862(0x83e)]()&&((_0x428930>=_0x55c12f||_0x274f39&&_0x55c12f===0x1)&&this[_0x574862(0x4dd)]((_0x428930-_0x55c12f+_0x1af23c)%_0x1af23c));},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x8e)]=Window_Selectable[_0x4e56c8(0x510)]['cursorUp'],Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x45b)]=function(_0x4fbc72){const _0x432d71=_0x4e56c8;this[_0x432d71(0x83e)]()&&_0x4fbc72&&this[_0x432d71(0x440)]()===0x1&&this['index']()===0x0?this['smoothSelect'](this[_0x432d71(0x595)]()-0x1):VisuMZ['CoreEngine'][_0x432d71(0x8e)]['call'](this,_0x4fbc72);},Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x83e)]=function(){const _0x3bec91=_0x4e56c8;return VisuMZ[_0x3bec91(0x5b8)]['Settings'][_0x3bec91(0x2c9)][_0x3bec91(0x568)];},VisuMZ[_0x4e56c8(0x5b8)]['Window_Selectable_processCursorMove']=Window_Selectable['prototype'][_0x4e56c8(0x766)],Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x766)]=function(){const _0x1b2abd=_0x4e56c8;this[_0x1b2abd(0x83e)]()?(this[_0x1b2abd(0x34d)](),this[_0x1b2abd(0xad)]()):VisuMZ[_0x1b2abd(0x5b8)][_0x1b2abd(0x68e)][_0x1b2abd(0x410)](this);},Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x743)]=function(){return!![];},Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x34d)]=function(){const _0x435935=_0x4e56c8;if(this[_0x435935(0x107)]()){const _0x8732e8=this[_0x435935(0x777)]();Input[_0x435935(0xae)](_0x435935(0x324))&&(Input[_0x435935(0x373)]('shift')&&this[_0x435935(0x743)]()?this[_0x435935(0x4cb)]():this[_0x435935(0x543)](Input['isTriggered'](_0x435935(0x324)))),Input['isRepeated']('up')&&(Input[_0x435935(0x373)](_0x435935(0x61c))&&this[_0x435935(0x743)]()?this[_0x435935(0x6c3)]():this[_0x435935(0x45b)](Input[_0x435935(0x552)]('up'))),Input[_0x435935(0xae)](_0x435935(0x747))&&this['cursorRight'](Input[_0x435935(0x552)](_0x435935(0x747))),Input[_0x435935(0xae)](_0x435935(0x67b))&&this['cursorLeft'](Input[_0x435935(0x552)]('left')),!this[_0x435935(0x39e)](_0x435935(0x4a5))&&Input[_0x435935(0xae)](_0x435935(0x4a5))&&this[_0x435935(0x4cb)](),!this[_0x435935(0x39e)]('pageup')&&Input[_0x435935(0xae)](_0x435935(0x772))&&this[_0x435935(0x6c3)](),this[_0x435935(0x777)]()!==_0x8732e8&&this['playCursorSound']();}},Window_Selectable['prototype'][_0x4e56c8(0xad)]=function(){const _0x1b60c9=_0x4e56c8;if(this[_0x1b60c9(0x107)]()){const _0x362590=this[_0x1b60c9(0x777)]();Input[_0x1b60c9(0x552)](_0x1b60c9(0x515))&&this['smoothSelect'](Math[_0x1b60c9(0x6a7)](this[_0x1b60c9(0x777)](),0x0)),Input[_0x1b60c9(0x552)]('end')&&this[_0x1b60c9(0x4dd)](Math[_0x1b60c9(0x53e)](this[_0x1b60c9(0x777)](),this['maxItems']()-0x1)),this[_0x1b60c9(0x777)]()!==_0x362590&&this[_0x1b60c9(0x698)]();}},VisuMZ['CoreEngine'][_0x4e56c8(0x7cc)]=Window_Selectable['prototype'][_0x4e56c8(0x34e)],Window_Selectable['prototype'][_0x4e56c8(0x34e)]=function(){const _0x24bcbf=_0x4e56c8;this[_0x24bcbf(0x83e)]()?this[_0x24bcbf(0x3d0)]():VisuMZ[_0x24bcbf(0x5b8)][_0x24bcbf(0x7cc)][_0x24bcbf(0x410)](this);},Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x3d0)]=function(){const _0x42500f=_0x4e56c8;VisuMZ[_0x42500f(0x5b8)][_0x42500f(0x7cc)][_0x42500f(0x410)](this);},Window_Selectable['prototype'][_0x4e56c8(0x672)]=function(){const _0x42bd06=_0x4e56c8;return VisuMZ[_0x42bd06(0x5b8)]['Settings'][_0x42bd06(0x18f)][_0x42bd06(0x5f1)];},Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x3a4)]=function(){const _0x4e7b20=_0x4e56c8;return VisuMZ[_0x4e7b20(0x5b8)][_0x4e7b20(0x5ce)][_0x4e7b20(0x18f)][_0x4e7b20(0x680)];},Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x638)]=function(){const _0x1b3ebd=_0x4e56c8;return Window_Scrollable['prototype'][_0x1b3ebd(0x638)][_0x1b3ebd(0x410)](this)+VisuMZ[_0x1b3ebd(0x5b8)]['Settings'][_0x1b3ebd(0x18f)][_0x1b3ebd(0x1eb)];;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x266)]=Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x692)],Window_Selectable[_0x4e56c8(0x510)][_0x4e56c8(0x692)]=function(_0x10a207){const _0x4c9c52=_0x4e56c8,_0xc889b1=VisuMZ[_0x4c9c52(0x5b8)][_0x4c9c52(0x5ce)]['Window'];if(_0xc889b1[_0x4c9c52(0x4fd)]===![])return;_0xc889b1['DrawItemBackgroundJS']?_0xc889b1['DrawItemBackgroundJS'][_0x4c9c52(0x410)](this,_0x10a207):VisuMZ[_0x4c9c52(0x5b8)]['Window_Selectable_drawBackgroundRect']['call'](this,_0x10a207);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x728)]=Window_Gold[_0x4e56c8(0x510)]['refresh'],Window_Gold['prototype'][_0x4e56c8(0x501)]=function(){const _0x33c74c=_0x4e56c8;this[_0x33c74c(0x511)]()?this[_0x33c74c(0x69a)]():VisuMZ[_0x33c74c(0x5b8)][_0x33c74c(0x728)]['call'](this);},Window_Gold[_0x4e56c8(0x510)][_0x4e56c8(0x511)]=function(){const _0x137b5b=_0x4e56c8;if(TextManager[_0x137b5b(0x1a7)]!==this['currencyUnit']())return![];return VisuMZ['CoreEngine'][_0x137b5b(0x5ce)][_0x137b5b(0x4a4)]['ItemStyle'];},Window_Gold[_0x4e56c8(0x510)]['drawGoldItemStyle']=function(){const _0x2335d0=_0x4e56c8;this[_0x2335d0(0x95)](),this[_0x2335d0(0x6cb)][_0x2335d0(0xaf)](),this['contents'][_0x2335d0(0x2ea)]=VisuMZ['CoreEngine'][_0x2335d0(0x5ce)][_0x2335d0(0x4a4)][_0x2335d0(0x5bd)];const _0x4ae23b=VisuMZ['CoreEngine']['Settings'][_0x2335d0(0x4a4)]['GoldIcon'],_0x28436f=this['itemLineRect'](0x0);if(_0x4ae23b>0x0){const _0x43602a=ImageManager['standardIconWidth']||0x20,_0x582d43=_0x43602a-ImageManager[_0x2335d0(0x7a2)],_0x10244d=_0x28436f['y']+(this[_0x2335d0(0x7d3)]()-ImageManager[_0x2335d0(0x36e)])/0x2;this[_0x2335d0(0x29d)](_0x4ae23b,_0x28436f['x']+Math[_0x2335d0(0xc0)](_0x582d43/0x2),_0x10244d);const _0x39e1ac=_0x43602a+0x4;_0x28436f['x']+=_0x39e1ac,_0x28436f[_0x2335d0(0x79c)]-=_0x39e1ac;}this[_0x2335d0(0x108)](ColorManager[_0x2335d0(0x776)]()),this[_0x2335d0(0x356)](this[_0x2335d0(0x1a7)](),_0x28436f['x'],_0x28436f['y'],_0x28436f['width'],_0x2335d0(0x67b));const _0x42f5a8=this[_0x2335d0(0x376)](this[_0x2335d0(0x1a7)]())+0x6;;_0x28436f['x']+=_0x42f5a8,_0x28436f[_0x2335d0(0x79c)]-=_0x42f5a8,this['resetTextColor']();const _0x471dbf=this['value'](),_0x3530db=this[_0x2335d0(0x376)](this[_0x2335d0(0x7a0)]?VisuMZ[_0x2335d0(0x7f4)](this['value']()):this[_0x2335d0(0x599)]());_0x3530db>_0x28436f[_0x2335d0(0x79c)]?this[_0x2335d0(0x356)](VisuMZ[_0x2335d0(0x5b8)][_0x2335d0(0x5ce)][_0x2335d0(0x4a4)][_0x2335d0(0x5b2)],_0x28436f['x'],_0x28436f['y'],_0x28436f['width'],_0x2335d0(0x747)):this[_0x2335d0(0x356)](this['value'](),_0x28436f['x'],_0x28436f['y'],_0x28436f[_0x2335d0(0x79c)],_0x2335d0(0x747)),this[_0x2335d0(0x95)]();},Window_StatusBase['prototype']['drawParamText']=function(_0x59dede,_0x312b5a,_0x13336b,_0x64b5e7,_0x990f){const _0x312a67=_0x4e56c8;_0x64b5e7=String(_0x64b5e7||'')[_0x312a67(0x25a)]();if(VisuMZ[_0x312a67(0x5b8)]['Settings'][_0x312a67(0x2b7)]['DrawIcons']){const _0x1b7a2f=VisuMZ[_0x312a67(0x286)](_0x64b5e7);if(_0x990f)this[_0x312a67(0x35f)](_0x1b7a2f,_0x59dede,_0x312b5a,this[_0x312a67(0x4e9)]()),_0x13336b-=this[_0x312a67(0x4e9)]()+0x2,_0x59dede+=this[_0x312a67(0x4e9)]()+0x2;else{const _0x576c3e=ImageManager['standardIconWidth']||0x20,_0x30f322=ImageManager[_0x312a67(0x470)]||0x20,_0x577e56=_0x576c3e-ImageManager[_0x312a67(0x7a2)],_0x192c1e=_0x30f322-ImageManager[_0x312a67(0x36e)];let _0x2df634=0x2,_0x30cd16=0x2;this[_0x312a67(0x7d3)]()!==0x24&&(_0x30cd16=Math[_0x312a67(0x653)]((this['lineHeight']()-_0x30f322)/0x2));const _0x446861=_0x59dede+Math[_0x312a67(0x653)](_0x577e56/0x2)+_0x2df634,_0x1a5c7b=_0x312b5a+Math[_0x312a67(0x653)](_0x192c1e/0x2)+_0x30cd16;this['drawIcon'](_0x1b7a2f,_0x446861,_0x1a5c7b),_0x13336b-=_0x576c3e+0x4,_0x59dede+=_0x576c3e+0x4;}}const _0x22c41b=TextManager[_0x312a67(0x361)](_0x64b5e7);this[_0x312a67(0x95)](),this[_0x312a67(0x108)](ColorManager['systemColor']()),_0x990f?(this[_0x312a67(0x6cb)][_0x312a67(0x2ea)]=this[_0x312a67(0x700)](),this['contents'][_0x312a67(0x356)](_0x22c41b,_0x59dede,_0x312b5a,_0x13336b,this[_0x312a67(0x4e9)](),_0x312a67(0x67b))):this[_0x312a67(0x356)](_0x22c41b,_0x59dede,_0x312b5a,_0x13336b),this[_0x312a67(0x95)]();},Window_StatusBase[_0x4e56c8(0x510)][_0x4e56c8(0x700)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x4e56c8(0x510)][_0x4e56c8(0x7de)]=function(_0x306918,_0x256829,_0x3fcb6d,_0x322a85){const _0x14dc0d=_0x4e56c8;_0x322a85=_0x322a85||0xa8,this[_0x14dc0d(0x3ad)]();if(VisuMZ[_0x14dc0d(0x5b8)][_0x14dc0d(0x5ce)]['UI'][_0x14dc0d(0x770)])this[_0x14dc0d(0x56d)](_0x306918[_0x14dc0d(0x601)]()[_0x14dc0d(0x9f)],_0x256829,_0x3fcb6d,_0x322a85);else{const _0xb50952=_0x306918[_0x14dc0d(0x601)]()['name'][_0x14dc0d(0x64a)](/\\I\[(\d+)\]/gi,'');this[_0x14dc0d(0x356)](_0xb50952,_0x256829,_0x3fcb6d,_0x322a85);}},Window_StatusBase[_0x4e56c8(0x510)]['drawActorNickname']=function(_0xb9bd3c,_0x28a766,_0x5f5200,_0x2495f9){const _0x53e1dd=_0x4e56c8;_0x2495f9=_0x2495f9||0x10e,this[_0x53e1dd(0x3ad)]();if(VisuMZ[_0x53e1dd(0x5b8)][_0x53e1dd(0x5ce)]['UI']['TextCodeNicknames'])this[_0x53e1dd(0x56d)](_0xb9bd3c[_0x53e1dd(0x38e)](),_0x28a766,_0x5f5200,_0x2495f9);else{const _0x359c0f=_0xb9bd3c[_0x53e1dd(0x38e)]()[_0x53e1dd(0x64a)](/\\I\[(\d+)\]/gi,'');this[_0x53e1dd(0x356)](_0xb9bd3c[_0x53e1dd(0x38e)](),_0x28a766,_0x5f5200,_0x2495f9);}},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x247)]=Window_StatusBase['prototype']['drawActorLevel'],Window_StatusBase['prototype']['drawActorLevel']=function(_0x514967,_0x160f8f,_0x2b5aa0){const _0x3ec2aa=_0x4e56c8;if(VisuMZ[_0x3ec2aa(0x5b8)][_0x3ec2aa(0x5ce)][_0x3ec2aa(0x2b7)][_0x3ec2aa(0xa6)]===![])return;if(this[_0x3ec2aa(0x3cf)]())this[_0x3ec2aa(0x1b6)](_0x514967,_0x160f8f,_0x2b5aa0);VisuMZ[_0x3ec2aa(0x5b8)]['Window_StatusBase_drawActorLevel'][_0x3ec2aa(0x410)](this,_0x514967,_0x160f8f,_0x2b5aa0);},Window_StatusBase[_0x4e56c8(0x510)][_0x4e56c8(0x3cf)]=function(){const _0x1bedad=_0x4e56c8;return VisuMZ[_0x1bedad(0x5b8)][_0x1bedad(0x5ce)]['UI']['LvExpGauge'];},Window_StatusBase[_0x4e56c8(0x510)][_0x4e56c8(0x1b6)]=function(_0x1c7d8c,_0x449c81,_0x2c56ae){const _0x5ab0b4=_0x4e56c8;if(!_0x1c7d8c)return;if(!_0x1c7d8c[_0x5ab0b4(0x4e2)]())return;const _0x1c1051=0x80,_0x332b27=_0x1c7d8c[_0x5ab0b4(0x69b)]();let _0x1ea2ec=ColorManager[_0x5ab0b4(0x690)](),_0x260852=ColorManager[_0x5ab0b4(0x856)]();_0x332b27>=0x1&&(_0x1ea2ec=ColorManager[_0x5ab0b4(0x709)](),_0x260852=ColorManager[_0x5ab0b4(0x702)]()),this['drawGauge'](_0x449c81,_0x2c56ae,_0x1c1051,_0x332b27,_0x1ea2ec,_0x260852);},Window_EquipStatus['prototype'][_0x4e56c8(0x629)]=function(){const _0x2aa4dc=_0x4e56c8;let _0x2afbb4=0x0;for(const _0x217246 of VisuMZ[_0x2aa4dc(0x5b8)]['Settings'][_0x2aa4dc(0x2b7)][_0x2aa4dc(0x31e)]){const _0x304811=this[_0x2aa4dc(0x532)](),_0x445eb6=this[_0x2aa4dc(0x5da)](_0x2afbb4);this[_0x2aa4dc(0x277)](_0x304811,_0x445eb6,_0x217246),_0x2afbb4++;}},Window_EquipStatus[_0x4e56c8(0x510)][_0x4e56c8(0x78a)]=function(_0x5cc8af,_0x218f4b,_0x34da47){const _0x23e62f=_0x4e56c8,_0x106424=this['paramX']()-this['itemPadding']()*0x2;this[_0x23e62f(0x1da)](_0x5cc8af,_0x218f4b,_0x106424,_0x34da47,![]);},Window_EquipStatus[_0x4e56c8(0x510)]['drawCurrentParam']=function(_0x536451,_0x5cf1ec,_0x598c56){const _0x409b7b=_0x4e56c8,_0x1f75fa=this[_0x409b7b(0x812)]();this[_0x409b7b(0x3ad)](),this[_0x409b7b(0x356)](this[_0x409b7b(0x53b)][_0x409b7b(0x383)](_0x598c56,!![]),_0x536451,_0x5cf1ec,_0x1f75fa,_0x409b7b(0x747));},Window_EquipStatus[_0x4e56c8(0x510)][_0x4e56c8(0x7a3)]=function(_0x2c2092,_0x3cb5d5){const _0x3da0e4=_0x4e56c8,_0x232bc4=this['rightArrowWidth']();this[_0x3da0e4(0x108)](ColorManager[_0x3da0e4(0x776)]());const _0x5e0693=VisuMZ[_0x3da0e4(0x5b8)][_0x3da0e4(0x5ce)]['UI'][_0x3da0e4(0x6a2)];this[_0x3da0e4(0x356)](_0x5e0693,_0x2c2092,_0x3cb5d5,_0x232bc4,_0x3da0e4(0x715));},Window_EquipStatus['prototype']['drawNewParam']=function(_0x18e51d,_0x301ef4,_0x39b865){const _0x4880d2=_0x4e56c8,_0x42bcf8=this[_0x4880d2(0x812)](),_0x4b4e32=this[_0x4880d2(0x20d)]['paramValueByName'](_0x39b865),_0x3889fa=_0x4b4e32-this['_actor'][_0x4880d2(0x383)](_0x39b865);this[_0x4880d2(0x108)](ColorManager['paramchangeTextColor'](_0x3889fa)),this[_0x4880d2(0x356)](this[_0x4880d2(0x20d)][_0x4880d2(0x383)](_0x39b865,!![]),_0x18e51d,_0x301ef4,_0x42bcf8,_0x4880d2(0x747));},VisuMZ['CoreEngine'][_0x4e56c8(0x647)]=Window_EquipItem['prototype'][_0x4e56c8(0x316)],Window_EquipItem[_0x4e56c8(0x510)][_0x4e56c8(0x316)]=function(_0x313e81){const _0x6dd893=_0x4e56c8;return _0x313e81&&this['_actor']?this['_actor']['canEquip'](_0x313e81):VisuMZ[_0x6dd893(0x5b8)][_0x6dd893(0x647)][_0x6dd893(0x410)](this,_0x313e81);},Window_StatusParams[_0x4e56c8(0x510)][_0x4e56c8(0x595)]=function(){const _0x229c01=_0x4e56c8;return VisuMZ[_0x229c01(0x5b8)]['Settings'][_0x229c01(0x2b7)][_0x229c01(0x31e)][_0x229c01(0x323)];},Window_StatusParams['prototype']['drawItem']=function(_0xda8eb3){const _0x114e19=_0x4e56c8,_0x5a7159=this[_0x114e19(0x4c3)](_0xda8eb3),_0x4b5f29=VisuMZ[_0x114e19(0x5b8)][_0x114e19(0x5ce)]['Param']['DisplayedParams'][_0xda8eb3],_0x5e1f75=TextManager[_0x114e19(0x361)](_0x4b5f29),_0x27c5c1=this['_actor'][_0x114e19(0x383)](_0x4b5f29,!![]);this[_0x114e19(0x1da)](_0x5a7159['x'],_0x5a7159['y'],0xa0,_0x4b5f29,![]),this['resetTextColor'](),this[_0x114e19(0x356)](_0x27c5c1,_0x5a7159['x']+0xa0,_0x5a7159['y'],0x3c,_0x114e19(0x747));};if(VisuMZ['CoreEngine'][_0x4e56c8(0x5ce)]['KeyboardInput'][_0x4e56c8(0x4af)]){VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)][_0x4e56c8(0x84c)][_0x4e56c8(0x4b3)]&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x4e56c8(0x47f),'OK']);;VisuMZ['CoreEngine'][_0x4e56c8(0x3e7)]=Window_NameInput['prototype'][_0x4e56c8(0x5e5)],Window_NameInput[_0x4e56c8(0x510)]['initialize']=function(_0x44174f){const _0x23e5ea=_0x4e56c8;this['_mode']=this[_0x23e5ea(0x1c5)](),VisuMZ[_0x23e5ea(0x5b8)][_0x23e5ea(0x3e7)][_0x23e5ea(0x410)](this,_0x44174f),this[_0x23e5ea(0xa9)]===_0x23e5ea(0x539)?this[_0x23e5ea(0x350)](0x0):(Input[_0x23e5ea(0xaf)](),this[_0x23e5ea(0x431)]());},Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0x1c5)]=function(){const _0xf9d2e9=_0x4e56c8;if(Input[_0xf9d2e9(0x33b)]())return _0xf9d2e9(0x539);return VisuMZ['CoreEngine'][_0xf9d2e9(0x5ce)]['KeyboardInput']['DefaultMode']||_0xf9d2e9(0xbf);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x44d)]=Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0xd4)],Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0xd4)]=function(){const _0x2975ca=_0x4e56c8;if(!this[_0x2975ca(0x363)]())return;if(!this[_0x2975ca(0x3c6)])return;if(this[_0x2975ca(0xa9)]===_0x2975ca(0xbf)&&Input['isGamepadTriggered']())this[_0x2975ca(0x7b4)]('default');else{if(Input[_0x2975ca(0x5a9)](_0x2975ca(0xbb)))Input['clear'](),this[_0x2975ca(0x24b)]();else{if(Input[_0x2975ca(0x552)]('tab'))Input['clear'](),this[_0x2975ca(0xa9)]===_0x2975ca(0xbf)?this['switchModes'](_0x2975ca(0x539)):this[_0x2975ca(0x7b4)](_0x2975ca(0xbf));else{if(this['_mode']===_0x2975ca(0xbf))this[_0x2975ca(0x3d4)]();else Input['isSpecialCode'](_0x2975ca(0x704))?(Input['clear'](),this[_0x2975ca(0x7b4)]('keyboard')):VisuMZ['CoreEngine'][_0x2975ca(0x44d)][_0x2975ca(0x410)](this);}}}},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x843)]=Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0x34e)],Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0x34e)]=function(){const _0x4ff996=_0x4e56c8;if(!this['isOpenAndActive']())return;if(this[_0x4ff996(0xa9)]===_0x4ff996(0xbf)){if(TouchInput[_0x4ff996(0x552)]()&&this[_0x4ff996(0x6f8)]())this[_0x4ff996(0x7b4)](_0x4ff996(0x539));else TouchInput[_0x4ff996(0x20f)]()&&this[_0x4ff996(0x7b4)]('default');}else VisuMZ[_0x4ff996(0x5b8)][_0x4ff996(0x843)][_0x4ff996(0x410)](this);},Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0x3d4)]=function(){const _0x352869=_0x4e56c8;if(Input[_0x352869(0x5a9)](_0x352869(0x54b)))Input[_0x352869(0xaf)](),this[_0x352869(0x60e)]();else{if(Input[_0x352869(0x7dc)]!==undefined){let _0xd08c57=Input['_inputString'],_0x4d8226=_0xd08c57[_0x352869(0x323)];for(let _0x7d4189=0x0;_0x7d4189<_0x4d8226;++_0x7d4189){this['_editWindow'][_0x352869(0x736)](_0xd08c57[_0x7d4189])?SoundManager['playOk']():SoundManager[_0x352869(0x336)]();}Input['clear']();}}},Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0x7b4)]=function(_0x3ae9d1){const _0x3ff79f=_0x4e56c8;let _0x442f81=this[_0x3ff79f(0xa9)];this[_0x3ff79f(0xa9)]=_0x3ae9d1,_0x442f81!==this[_0x3ff79f(0xa9)]&&(this['refresh'](),SoundManager[_0x3ff79f(0x74f)](),this[_0x3ff79f(0xa9)]===_0x3ff79f(0x539)?this['select'](0x0):this[_0x3ff79f(0x350)](-0x1));},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x7a5)]=Window_NameInput['prototype'][_0x4e56c8(0x543)],Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0x543)]=function(_0x459897){const _0x8d3747=_0x4e56c8;if(this[_0x8d3747(0xa9)]===_0x8d3747(0xbf)&&!Input[_0x8d3747(0x329)]())return;if(Input[_0x8d3747(0x57e)]())return;VisuMZ['CoreEngine'][_0x8d3747(0x7a5)]['call'](this,_0x459897),this[_0x8d3747(0x7b4)](_0x8d3747(0x539));},VisuMZ[_0x4e56c8(0x5b8)]['Window_NameInput_cursorUp']=Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0x45b)],Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0x45b)]=function(_0x3b0131){const _0x3510a3=_0x4e56c8;if(this[_0x3510a3(0xa9)]===_0x3510a3(0xbf)&&!Input[_0x3510a3(0x329)]())return;if(Input[_0x3510a3(0x57e)]())return;VisuMZ[_0x3510a3(0x5b8)][_0x3510a3(0x33c)]['call'](this,_0x3b0131),this[_0x3510a3(0x7b4)](_0x3510a3(0x539));},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x32d)]=Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0x235)],Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0x235)]=function(_0x22ee31){const _0x395f73=_0x4e56c8;if(this[_0x395f73(0xa9)]==='keyboard'&&!Input[_0x395f73(0x329)]())return;if(Input[_0x395f73(0x57e)]())return;VisuMZ[_0x395f73(0x5b8)][_0x395f73(0x32d)][_0x395f73(0x410)](this,_0x22ee31),this[_0x395f73(0x7b4)](_0x395f73(0x539));},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x493)]=Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0x5fc)],Window_NameInput['prototype'][_0x4e56c8(0x5fc)]=function(_0x516e8e){const _0x2fac86=_0x4e56c8;if(this[_0x2fac86(0xa9)]===_0x2fac86(0xbf)&&!Input[_0x2fac86(0x329)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x2fac86(0x5b8)][_0x2fac86(0x493)][_0x2fac86(0x410)](this,_0x516e8e),this[_0x2fac86(0x7b4)](_0x2fac86(0x539));},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x128)]=Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0x4cb)],Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0x4cb)]=function(){const _0x4cff22=_0x4e56c8;if(this[_0x4cff22(0xa9)]===_0x4cff22(0xbf))return;if(Input[_0x4cff22(0x57e)]())return;VisuMZ[_0x4cff22(0x5b8)][_0x4cff22(0x128)][_0x4cff22(0x410)](this),this[_0x4cff22(0x7b4)](_0x4cff22(0x539));},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x818)]=Window_NameInput[_0x4e56c8(0x510)][_0x4e56c8(0x6c3)],Window_NameInput[_0x4e56c8(0x510)]['cursorPageup']=function(){const _0x44e2f2=_0x4e56c8;if(this[_0x44e2f2(0xa9)]==='keyboard')return;if(Input[_0x44e2f2(0x57e)]())return;VisuMZ[_0x44e2f2(0x5b8)][_0x44e2f2(0x818)][_0x44e2f2(0x410)](this),this[_0x44e2f2(0x7b4)](_0x44e2f2(0x539));},VisuMZ['CoreEngine'][_0x4e56c8(0x31c)]=Window_NameInput[_0x4e56c8(0x510)]['refresh'],Window_NameInput[_0x4e56c8(0x510)]['refresh']=function(){const _0x4cffb8=_0x4e56c8;if(this[_0x4cffb8(0xa9)]===_0x4cffb8(0xbf)){this[_0x4cffb8(0x6cb)][_0x4cffb8(0xaf)](),this[_0x4cffb8(0x5fd)][_0x4cffb8(0xaf)](),this[_0x4cffb8(0x3ad)]();let _0x224356=VisuMZ['CoreEngine'][_0x4cffb8(0x5ce)]['KeyboardInput'][_0x4cffb8(0x77d)]['split']('\x0a'),_0x264653=_0x224356[_0x4cffb8(0x323)],_0x1ae673=(this[_0x4cffb8(0x554)]-_0x264653*this[_0x4cffb8(0x7d3)]())/0x2;for(let _0x453c78=0x0;_0x453c78<_0x264653;++_0x453c78){let _0x1fa9b4=_0x224356[_0x453c78],_0x51214c=this['textSizeEx'](_0x1fa9b4)[_0x4cffb8(0x79c)],_0x1396cc=Math[_0x4cffb8(0x653)]((this[_0x4cffb8(0x6cb)][_0x4cffb8(0x79c)]-_0x51214c)/0x2);this['drawTextEx'](_0x1fa9b4,_0x1396cc,_0x1ae673),_0x1ae673+=this[_0x4cffb8(0x7d3)]();}}else VisuMZ[_0x4cffb8(0x5b8)]['Window_NameInput_refresh'][_0x4cffb8(0x410)](this);};};VisuMZ['CoreEngine'][_0x4e56c8(0x2eb)]=Window_ShopSell['prototype']['isEnabled'],Window_ShopSell[_0x4e56c8(0x510)][_0x4e56c8(0x316)]=function(_0x57f04a){const _0x447244=_0x4e56c8;return VisuMZ[_0x447244(0x5b8)][_0x447244(0x5ce)][_0x447244(0x2c9)]['KeyItemProtect']&&DataManager[_0x447244(0x227)](_0x57f04a)?![]:VisuMZ[_0x447244(0x5b8)][_0x447244(0x2eb)][_0x447244(0x410)](this,_0x57f04a);},Window_NumberInput[_0x4e56c8(0x510)]['isUseModernControls']=function(){return![];};VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)]['KeyboardInput'][_0x4e56c8(0x246)]&&(VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x1d4)]=Window_NumberInput[_0x4e56c8(0x510)]['start'],Window_NumberInput[_0x4e56c8(0x510)][_0x4e56c8(0x59c)]=function(){const _0x3f4053=_0x4e56c8;VisuMZ[_0x3f4053(0x5b8)][_0x3f4053(0x1d4)][_0x3f4053(0x410)](this),this['select'](this['_maxDigits']-0x1),Input[_0x3f4053(0xaf)]();},VisuMZ['CoreEngine']['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x4e56c8(0x510)][_0x4e56c8(0x360)],Window_NumberInput[_0x4e56c8(0x510)][_0x4e56c8(0x360)]=function(){const _0x139887=_0x4e56c8;if(!this['isOpenAndActive']())return;if(Input[_0x139887(0x57e)]())this[_0x139887(0x6c5)]();else{if(Input['isSpecialCode'](_0x139887(0xbb)))this['processKeyboardBackspace']();else{if(Input[_0x139887(0x26c)]===0x2e)this[_0x139887(0x1cc)]();else{if(Input[_0x139887(0x26c)]===0x24)this[_0x139887(0x744)]();else Input[_0x139887(0x26c)]===0x23?this[_0x139887(0x531)]():VisuMZ['CoreEngine']['Window_NumberInput_processDigitChange'][_0x139887(0x410)](this);}}}},Window_NumberInput[_0x4e56c8(0x510)][_0x4e56c8(0x766)]=function(){const _0xff79bc=_0x4e56c8;if(!this[_0xff79bc(0x107)]())return;Input['isNumpadPressed']()?this[_0xff79bc(0x6c5)]():Window_Selectable[_0xff79bc(0x510)][_0xff79bc(0x766)][_0xff79bc(0x410)](this);},Window_NumberInput['prototype'][_0x4e56c8(0xad)]=function(){},Window_NumberInput[_0x4e56c8(0x510)][_0x4e56c8(0x6c5)]=function(){const _0x387de0=_0x4e56c8;if(String(this[_0x387de0(0x72f)])['length']>=this[_0x387de0(0x58f)])return;const _0x34549f=Number(String(this['_number'])+Input[_0x387de0(0x7dc)]);if(isNaN(_0x34549f))return;this['_number']=_0x34549f;const _0x2de71c='9'['repeat'](this[_0x387de0(0x58f)]);this['_number']=this['_number'][_0x387de0(0x2d2)](0x0,_0x2de71c),Input[_0x387de0(0xaf)](),this[_0x387de0(0x501)](),SoundManager[_0x387de0(0x2cb)](),this[_0x387de0(0x350)](this[_0x387de0(0x58f)]-0x1);},Window_NumberInput[_0x4e56c8(0x510)][_0x4e56c8(0x192)]=function(){const _0xd52458=_0x4e56c8;this[_0xd52458(0x72f)]=Number(String(this[_0xd52458(0x72f)])[_0xd52458(0xde)](0x0,-0x1)),this['_number']=Math[_0xd52458(0x53e)](0x0,this[_0xd52458(0x72f)]),Input[_0xd52458(0xaf)](),this[_0xd52458(0x501)](),SoundManager[_0xd52458(0x2cb)](),this[_0xd52458(0x350)](this['_maxDigits']-0x1);},Window_NumberInput['prototype'][_0x4e56c8(0x1cc)]=function(){const _0x1b3018=_0x4e56c8;this[_0x1b3018(0x72f)]=Number(String(this[_0x1b3018(0x72f)])['substring'](0x1)),this['_number']=Math[_0x1b3018(0x53e)](0x0,this['_number']),Input[_0x1b3018(0xaf)](),this[_0x1b3018(0x501)](),SoundManager['playCursor'](),this['select'](this['_maxDigits']-0x1);},Window_NumberInput[_0x4e56c8(0x510)][_0x4e56c8(0x744)]=function(){const _0x54acf0=_0x4e56c8;if(this[_0x54acf0(0x777)]()===0x0)return;Input[_0x54acf0(0xaf)](),this[_0x54acf0(0x501)](),SoundManager[_0x54acf0(0x2cb)](),this['select'](0x0);},Window_NumberInput['prototype']['processKeyboardEnd']=function(){const _0x1ebf57=_0x4e56c8;if(this['index']()===this[_0x1ebf57(0x58f)]-0x1)return;Input['clear'](),this[_0x1ebf57(0x501)](),SoundManager[_0x1ebf57(0x2cb)](),this['select'](this[_0x1ebf57(0x58f)]-0x1);});;VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0xba)]=Window_MapName['prototype']['refresh'],Window_MapName[_0x4e56c8(0x510)][_0x4e56c8(0x501)]=function(){const _0x3718f7=_0x4e56c8;VisuMZ[_0x3718f7(0x5b8)][_0x3718f7(0x5ce)]['QoL'][_0x3718f7(0x72)]?this[_0x3718f7(0x650)]():VisuMZ[_0x3718f7(0x5b8)][_0x3718f7(0xba)]['call'](this);},Window_MapName[_0x4e56c8(0x510)][_0x4e56c8(0x650)]=function(){const _0x307722=_0x4e56c8;this[_0x307722(0x6cb)]['clear']();if($gameMap['displayName']()){const _0x461537=this['innerWidth'];this[_0x307722(0x80d)](0x0,0x0,_0x461537,this[_0x307722(0x7d3)]());const _0x1da3f3=this[_0x307722(0x4fa)]($gameMap[_0x307722(0x5d3)]())['width'];this[_0x307722(0x56d)]($gameMap[_0x307722(0x5d3)](),Math[_0x307722(0x653)]((_0x461537-_0x1da3f3)/0x2),0x0);}},Window_TitleCommand[_0x4e56c8(0x33f)]=VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)][_0x4e56c8(0x78d)],Window_TitleCommand[_0x4e56c8(0x510)][_0x4e56c8(0x78f)]=function(){const _0x234050=_0x4e56c8;this[_0x234050(0x15e)]();},Window_TitleCommand['prototype'][_0x4e56c8(0x15e)]=function(){const _0x1c77be=_0x4e56c8;for(const _0x14c706 of Window_TitleCommand[_0x1c77be(0x33f)]){if(_0x14c706['ShowJS'][_0x1c77be(0x410)](this)){const _0x2fa973=_0x14c706[_0x1c77be(0xcd)];let _0x390872=_0x14c706['TextStr'];if(['',_0x1c77be(0x774)][_0x1c77be(0xd3)](_0x390872))_0x390872=_0x14c706['TextJS'][_0x1c77be(0x410)](this);const _0x36cbcf=_0x14c706[_0x1c77be(0x4d1)][_0x1c77be(0x410)](this),_0x13a448=_0x14c706['ExtJS'][_0x1c77be(0x410)](this);this[_0x1c77be(0x396)](_0x390872,_0x2fa973,_0x36cbcf,_0x13a448),this['setHandler'](_0x2fa973,_0x14c706['CallHandlerJS'][_0x1c77be(0x223)](this,_0x13a448));}}},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x2b0)]=Window_TitleCommand['prototype'][_0x4e56c8(0x4e8)],Window_TitleCommand[_0x4e56c8(0x510)]['selectLast']=function(){const _0x531a3c=_0x4e56c8;VisuMZ['CoreEngine'][_0x531a3c(0x2b0)][_0x531a3c(0x410)](this);if(!Window_TitleCommand['_lastCommandSymbol'])return;const _0x491671=this[_0x531a3c(0x389)](Window_TitleCommand[_0x531a3c(0x2f2)]),_0x2cc648=Math[_0x531a3c(0x653)](this[_0x531a3c(0x6f4)]()/0x2)-0x1;this['smoothSelect'](_0x491671),this[_0x531a3c(0x571)]>0x1&&(this['_scrollDuration']=0x1,this[_0x531a3c(0x99)]()),this[_0x531a3c(0x38c)](_0x491671-_0x2cc648);},Window_GameEnd[_0x4e56c8(0x33f)]=VisuMZ['CoreEngine'][_0x4e56c8(0x5ce)][_0x4e56c8(0x597)][_0x4e56c8(0x7a1)][_0x4e56c8(0x771)],Window_GameEnd[_0x4e56c8(0x510)][_0x4e56c8(0x78f)]=function(){const _0x2764e1=_0x4e56c8;this[_0x2764e1(0x15e)]();},Window_GameEnd['prototype']['makeCoreEngineCommandList']=function(){const _0x2691ca=_0x4e56c8;for(const _0x2635ff of Window_GameEnd['_commandList']){if(_0x2635ff[_0x2691ca(0x4b2)][_0x2691ca(0x410)](this)){const _0x46c96d=_0x2635ff[_0x2691ca(0xcd)];let _0x19f03c=_0x2635ff[_0x2691ca(0x36f)];if(['','Untitled'][_0x2691ca(0xd3)](_0x19f03c))_0x19f03c=_0x2635ff[_0x2691ca(0x1aa)][_0x2691ca(0x410)](this);const _0x4bdda7=_0x2635ff['EnableJS'][_0x2691ca(0x410)](this),_0x469b04=_0x2635ff['ExtJS'][_0x2691ca(0x410)](this);this[_0x2691ca(0x396)](_0x19f03c,_0x46c96d,_0x4bdda7,_0x469b04),this['setHandler'](_0x46c96d,_0x2635ff[_0x2691ca(0x5fa)][_0x2691ca(0x223)](this,_0x469b04));}}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist[_0x4e56c8(0x510)]=Object[_0x4e56c8(0x3ba)](Window_Base[_0x4e56c8(0x510)]),Window_ButtonAssist[_0x4e56c8(0x510)][_0x4e56c8(0x2e1)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x4e56c8(0x5e5)]=function(_0x535be9){const _0x432b63=_0x4e56c8;this[_0x432b63(0x133)]={},Window_Base['prototype'][_0x432b63(0x5e5)][_0x432b63(0x410)](this,_0x535be9),this[_0x432b63(0x317)](VisuMZ[_0x432b63(0x5b8)]['Settings'][_0x432b63(0x21c)]['BgType']||0x0),this[_0x432b63(0x501)]();},Window_ButtonAssist[_0x4e56c8(0x510)][_0x4e56c8(0x7d3)]=function(){const _0x549730=_0x4e56c8;return this[_0x549730(0x554)]||Window_Base['prototype'][_0x549730(0x7d3)][_0x549730(0x410)](this);},Window_ButtonAssist[_0x4e56c8(0x510)][_0x4e56c8(0x3a8)]=function(){const _0x36bd05=_0x4e56c8;this[_0x36bd05(0x6cb)][_0x36bd05(0x2ea)]<=0x60&&(this[_0x36bd05(0x6cb)][_0x36bd05(0x2ea)]+=0x6);},Window_ButtonAssist['prototype'][_0x4e56c8(0x74d)]=function(){const _0xb4516c=_0x4e56c8;this[_0xb4516c(0x6cb)][_0xb4516c(0x2ea)]>=0x18&&(this['contents'][_0xb4516c(0x2ea)]-=0x6);},Window_ButtonAssist[_0x4e56c8(0x510)]['update']=function(){const _0x36cd48=_0x4e56c8;Window_Base[_0x36cd48(0x510)]['update'][_0x36cd48(0x410)](this),this[_0x36cd48(0x20a)]();},Window_ButtonAssist[_0x4e56c8(0x510)]['updatePadding']=function(){const _0xe89d45=_0x4e56c8;this['padding']=SceneManager[_0xe89d45(0x7f6)][_0xe89d45(0x2ed)]()!==_0xe89d45(0x64b)?0x0:0x8;},Window_ButtonAssist[_0x4e56c8(0x510)][_0x4e56c8(0x20a)]=function(){const _0x1c4e1e=_0x4e56c8,_0x42fdca=SceneManager['_scene'];for(let _0x2db9a9=0x1;_0x2db9a9<=0x5;_0x2db9a9++){if(this[_0x1c4e1e(0x133)][_0x1c4e1e(0x559)[_0x1c4e1e(0x6d4)](_0x2db9a9)]!==_0x42fdca[_0x1c4e1e(0x758)['format'](_0x2db9a9)]())return this[_0x1c4e1e(0x501)]();if(this['_data'][_0x1c4e1e(0x4d7)[_0x1c4e1e(0x6d4)](_0x2db9a9)]!==_0x42fdca[_0x1c4e1e(0x127)[_0x1c4e1e(0x6d4)](_0x2db9a9)]())return this[_0x1c4e1e(0x501)]();}},Window_ButtonAssist['prototype'][_0x4e56c8(0x501)]=function(){const _0xa8adc=_0x4e56c8;this[_0xa8adc(0x6cb)][_0xa8adc(0xaf)]();for(let _0x18959d=0x1;_0x18959d<=0x5;_0x18959d++){this['drawSegment'](_0x18959d);}},Window_ButtonAssist[_0x4e56c8(0x510)]['drawSegment']=function(_0x37dc93){const _0x2d911f=_0x4e56c8,_0xe5cd0d=this[_0x2d911f(0xc1)]/0x5,_0x42e1c3=SceneManager[_0x2d911f(0x7f6)],_0x2a49ea=_0x42e1c3[_0x2d911f(0x758)[_0x2d911f(0x6d4)](_0x37dc93)](),_0x2490f5=_0x42e1c3[_0x2d911f(0x127)[_0x2d911f(0x6d4)](_0x37dc93)]();this[_0x2d911f(0x133)]['key%1'[_0x2d911f(0x6d4)](_0x37dc93)]=_0x2a49ea,this[_0x2d911f(0x133)][_0x2d911f(0x4d7)['format'](_0x37dc93)]=_0x2490f5;if(_0x2a49ea==='')return;if(_0x2490f5==='')return;const _0x37b0fa=_0x42e1c3[_0x2d911f(0x161)[_0x2d911f(0x6d4)](_0x37dc93)](),_0x6f5223=this['itemPadding'](),_0x1caeb1=_0xe5cd0d*(_0x37dc93-0x1)+_0x6f5223+_0x37b0fa,_0x40f064=VisuMZ[_0x2d911f(0x5b8)][_0x2d911f(0x5ce)][_0x2d911f(0x21c)][_0x2d911f(0xe1)];this['drawTextEx'](_0x40f064[_0x2d911f(0x6d4)](_0x2a49ea,_0x2490f5),_0x1caeb1,0x0,_0xe5cd0d-_0x6f5223*0x2);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x1f0)]=Game_Interpreter[_0x4e56c8(0x510)]['updateWaitMode'],Game_Interpreter['prototype'][_0x4e56c8(0xf3)]=function(){const _0x4f958a=_0x4e56c8;if($gameTemp['_pictureCoordinatesMode']!==undefined)return VisuMZ[_0x4f958a(0x5b8)][_0x4f958a(0x6ac)]();return VisuMZ[_0x4f958a(0x5b8)][_0x4f958a(0x1f0)][_0x4f958a(0x410)](this);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x6ac)]=function(){const _0x2f3422=_0x4e56c8,_0x189c9e=$gameTemp[_0x2f3422(0x215)]||0x0;(_0x189c9e<0x0||_0x189c9e>0x64||TouchInput[_0x2f3422(0x20f)]()||Input['isTriggered'](_0x2f3422(0x26b)))&&($gameTemp[_0x2f3422(0x215)]=undefined,Input[_0x2f3422(0xaf)](),TouchInput[_0x2f3422(0xaf)]());const _0x14b1b9=$gameScreen[_0x2f3422(0x5b9)](_0x189c9e);return _0x14b1b9&&(_0x14b1b9['_x']=TouchInput['_x'],_0x14b1b9['_y']=TouchInput['_y']),VisuMZ[_0x2f3422(0x5b8)][_0x2f3422(0x782)](),$gameTemp[_0x2f3422(0x215)]!==undefined;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x782)]=function(){const _0x383e5b=_0x4e56c8,_0x4117ca=SceneManager[_0x383e5b(0x7f6)];if(!_0x4117ca)return;!_0x4117ca['_pictureCoordinatesWindow']&&(SoundManager[_0x383e5b(0x656)](),_0x4117ca[_0x383e5b(0x414)]=new Window_PictureCoordinates(),_0x4117ca[_0x383e5b(0x100)](_0x4117ca[_0x383e5b(0x414)])),$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager['playCancel'](),_0x4117ca['removeChild'](_0x4117ca['_pictureCoordinatesWindow']),_0x4117ca[_0x383e5b(0x414)]=undefined);};function Window_PictureCoordinates(){const _0x3b31b0=_0x4e56c8;this[_0x3b31b0(0x5e5)](...arguments);}Window_PictureCoordinates[_0x4e56c8(0x510)]=Object['create'](Window_Base[_0x4e56c8(0x510)]),Window_PictureCoordinates['prototype'][_0x4e56c8(0x2e1)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x4e56c8(0x510)][_0x4e56c8(0x5e5)]=function(){const _0x52d0d9=_0x4e56c8;this['_lastOrigin']=_0x52d0d9(0x641),this[_0x52d0d9(0x4ec)]=_0x52d0d9(0x641),this[_0x52d0d9(0x789)]='nah';const _0x54bbcb=this[_0x52d0d9(0x600)]();Window_Base[_0x52d0d9(0x510)][_0x52d0d9(0x5e5)][_0x52d0d9(0x410)](this,_0x54bbcb),this[_0x52d0d9(0x317)](0x2);},Window_PictureCoordinates[_0x4e56c8(0x510)][_0x4e56c8(0x600)]=function(){const _0x456cc8=_0x4e56c8;let _0x3153ee=0x0,_0x5e2a5d=Graphics[_0x456cc8(0x1e9)]-this[_0x456cc8(0x7d3)](),_0x27933e=Graphics[_0x456cc8(0x79c)],_0x532e4c=this[_0x456cc8(0x7d3)]();return new Rectangle(_0x3153ee,_0x5e2a5d,_0x27933e,_0x532e4c);},Window_PictureCoordinates[_0x4e56c8(0x510)][_0x4e56c8(0x6f1)]=function(){const _0x2f6d78=_0x4e56c8;this[_0x2f6d78(0x8c)]=0x0;},Window_PictureCoordinates[_0x4e56c8(0x510)][_0x4e56c8(0x5b3)]=function(){const _0x43f6c7=_0x4e56c8;Window_Base[_0x43f6c7(0x510)][_0x43f6c7(0x5b3)][_0x43f6c7(0x410)](this),this[_0x43f6c7(0x28f)]();},Window_PictureCoordinates[_0x4e56c8(0x510)][_0x4e56c8(0x28f)]=function(){const _0x2b846d=_0x4e56c8;if(!this['needsUpdate']())return;this[_0x2b846d(0x501)]();},Window_PictureCoordinates[_0x4e56c8(0x510)][_0x4e56c8(0x2ef)]=function(){const _0x3893ad=_0x4e56c8,_0x133834=$gameTemp['_pictureCoordinatesMode'],_0x5cf0e4=$gameScreen[_0x3893ad(0x5b9)](_0x133834);return _0x5cf0e4?this['_lastOrigin']!==_0x5cf0e4['_origin']||this[_0x3893ad(0x4ec)]!==_0x5cf0e4['_x']||this[_0x3893ad(0x789)]!==_0x5cf0e4['_y']:![];},Window_PictureCoordinates[_0x4e56c8(0x510)][_0x4e56c8(0x501)]=function(){const _0x25bdac=_0x4e56c8;this[_0x25bdac(0x6cb)][_0x25bdac(0xaf)]();const _0x371a47=$gameTemp['_pictureCoordinatesMode'],_0xd8d924=$gameScreen[_0x25bdac(0x5b9)](_0x371a47);if(!_0xd8d924)return;this['_lastOrigin']=_0xd8d924[_0x25bdac(0x6e1)],this[_0x25bdac(0x4ec)]=_0xd8d924['_x'],this['_lastY']=_0xd8d924['_y'];const _0x2e3b63=ColorManager[_0x25bdac(0x4d2)]();this[_0x25bdac(0x6cb)]['fillRect'](0x0,0x0,this['innerWidth'],this[_0x25bdac(0x554)],_0x2e3b63);const _0x2b8715='\x20Origin:\x20%1'[_0x25bdac(0x6d4)](_0xd8d924['_origin']===0x0?_0x25bdac(0x4e5):_0x25bdac(0x1c0)),_0x4ef3da=_0x25bdac(0x4a9)[_0x25bdac(0x6d4)](_0xd8d924['_x']),_0x4efcf6='Y:\x20%1'[_0x25bdac(0x6d4)](_0xd8d924['_y']),_0x549543=_0x25bdac(0x786)['format'](TextManager[_0x25bdac(0x282)](_0x25bdac(0x26b)));let _0x5698ad=Math[_0x25bdac(0x653)](this[_0x25bdac(0xc1)]/0x4);this['drawText'](_0x2b8715,_0x5698ad*0x0,0x0,_0x5698ad),this['drawText'](_0x4ef3da,_0x5698ad*0x1,0x0,_0x5698ad,_0x25bdac(0x715)),this[_0x25bdac(0x356)](_0x4efcf6,_0x5698ad*0x2,0x0,_0x5698ad,_0x25bdac(0x715));const _0x24f437=this['textSizeEx'](_0x549543)[_0x25bdac(0x79c)],_0x17e550=this['innerWidth']-_0x24f437;this['drawTextEx'](_0x549543,_0x17e550,0x0,_0x24f437);};function Window_TextPopup(){const _0x237e66=_0x4e56c8;this[_0x237e66(0x5e5)](...arguments);}Window_TextPopup[_0x4e56c8(0x510)]=Object[_0x4e56c8(0x3ba)](Window_Base[_0x4e56c8(0x510)]),Window_TextPopup[_0x4e56c8(0x510)][_0x4e56c8(0x2e1)]=Window_TextPopup,Window_TextPopup[_0x4e56c8(0x13d)]={'framesPerChar':VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)][_0x4e56c8(0x18f)][_0x4e56c8(0x32c)]??1.5,'framesMin':VisuMZ['CoreEngine'][_0x4e56c8(0x5ce)][_0x4e56c8(0x18f)][_0x4e56c8(0x577)]??0x5a,'framesMax':VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x5ce)][_0x4e56c8(0x18f)][_0x4e56c8(0x393)]??0x12c},Window_TextPopup[_0x4e56c8(0x510)][_0x4e56c8(0x5e5)]=function(){const _0x491cea=_0x4e56c8,_0x588ef5=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0x491cea(0x510)][_0x491cea(0x5e5)][_0x491cea(0x410)](this,_0x588ef5),this[_0x491cea(0x64e)]=0x0,this[_0x491cea(0x125)]='',this['_textQueue']=[],this[_0x491cea(0x2f0)]=0x0;},Window_TextPopup[_0x4e56c8(0x510)][_0x4e56c8(0x337)]=function(){return!![];},Window_TextPopup[_0x4e56c8(0x510)][_0x4e56c8(0x675)]=function(_0x2d2f9b){const _0x372042=_0x4e56c8;if(this[_0x372042(0x75b)][this['_textQueue'][_0x372042(0x323)]-0x1]===_0x2d2f9b)return;this[_0x372042(0x75b)]['push'](_0x2d2f9b),SceneManager['_scene'][_0x372042(0x100)](this);},Window_TextPopup[_0x4e56c8(0x510)][_0x4e56c8(0x5b3)]=function(){const _0x576a5b=_0x4e56c8;Window_Base[_0x576a5b(0x510)][_0x576a5b(0x5b3)][_0x576a5b(0x410)](this),this['updateText'](),this[_0x576a5b(0x7bc)]();},Window_TextPopup['prototype'][_0x4e56c8(0x437)]=function(){const _0x1cbde1=_0x4e56c8;if(this[_0x1cbde1(0x125)]!=='')return;if(this[_0x1cbde1(0x75b)][_0x1cbde1(0x323)]<=0x0)return;if(!this[_0x1cbde1(0xa8)]())return;this[_0x1cbde1(0x125)]=this[_0x1cbde1(0x75b)]['shift']();const _0x28d7b5=Window_TextPopup[_0x1cbde1(0x13d)],_0x5d14c3=Math['ceil'](this[_0x1cbde1(0x125)][_0x1cbde1(0x323)]*_0x28d7b5[_0x1cbde1(0xdf)]);this['_timeDuration']=_0x5d14c3[_0x1cbde1(0x2d2)](_0x28d7b5[_0x1cbde1(0x121)],_0x28d7b5[_0x1cbde1(0x488)]);const _0x1b5586=this[_0x1cbde1(0x4fa)](this[_0x1cbde1(0x125)]);let _0x23cb40=_0x1b5586['width']+this[_0x1cbde1(0x532)]()*0x2;_0x23cb40+=$gameSystem['windowPadding']()*0x2;let _0xf07935=Math[_0x1cbde1(0x53e)](_0x1b5586['height'],this[_0x1cbde1(0x7d3)]());_0xf07935+=$gameSystem['windowPadding']()*0x2;const _0x133ffe=Math[_0x1cbde1(0x263)]((Graphics[_0x1cbde1(0x79c)]-_0x23cb40)/0x2),_0x568fa2=Math[_0x1cbde1(0x263)]((Graphics[_0x1cbde1(0x1e9)]-_0xf07935)/0x2),_0x574baa=new Rectangle(_0x133ffe,_0x568fa2,_0x23cb40,_0xf07935);this['move'](_0x574baa['x'],_0x574baa['y'],_0x574baa[_0x1cbde1(0x79c)],_0x574baa[_0x1cbde1(0x1e9)]),this[_0x1cbde1(0x858)](),this[_0x1cbde1(0x501)](),this[_0x1cbde1(0x83f)](),SceneManager['_scene']['addChild'](this);},Window_TextPopup[_0x4e56c8(0x510)][_0x4e56c8(0x501)]=function(){const _0x5d0426=_0x4e56c8,_0x2b1392=this[_0x5d0426(0x796)]();this[_0x5d0426(0x6cb)]['clear'](),this['drawTextEx'](this[_0x5d0426(0x125)],_0x2b1392['x'],_0x2b1392['y'],_0x2b1392['width']);},Window_TextPopup['prototype'][_0x4e56c8(0x7bc)]=function(){const _0x36c264=_0x4e56c8;if(this[_0x36c264(0x6df)]()||this[_0x36c264(0x5bf)]())return;if(this['_timeDuration']<=0x0)return;this['_timeDuration']--,this[_0x36c264(0x2f0)]<=0x0&&(this['close'](),this[_0x36c264(0x125)]='');},VisuMZ['ShowDevTools']=function(_0x13df32){const _0x243f61=_0x4e56c8;if(Utils['isOptionValid']('test')){var _0x268380=require(_0x243f61(0xc2))['Window'][_0x243f61(0x2fd)]();SceneManager['showDevTools']();if(_0x13df32)setTimeout(_0x268380[_0x243f61(0x749)][_0x243f61(0x223)](_0x268380),0x190);}},VisuMZ[_0x4e56c8(0x165)]=function(_0x4efd65,_0x38d875){const _0x48ab30=_0x4e56c8;_0x38d875=_0x38d875[_0x48ab30(0x25a)]();var _0xa0e755=1.70158,_0x599026=0.7;switch(_0x38d875){case'LINEAR':return _0x4efd65;case'INSINE':return-0x1*Math['cos'](_0x4efd65*(Math['PI']/0x2))+0x1;case _0x48ab30(0x454):return Math['sin'](_0x4efd65*(Math['PI']/0x2));case _0x48ab30(0x524):return-0.5*(Math['cos'](Math['PI']*_0x4efd65)-0x1);case _0x48ab30(0x76b):return _0x4efd65*_0x4efd65;case _0x48ab30(0x162):return _0x4efd65*(0x2-_0x4efd65);case _0x48ab30(0x68a):return _0x4efd65<0.5?0x2*_0x4efd65*_0x4efd65:-0x1+(0x4-0x2*_0x4efd65)*_0x4efd65;case _0x48ab30(0x11b):return _0x4efd65*_0x4efd65*_0x4efd65;case'OUTCUBIC':var _0x25f050=_0x4efd65-0x1;return _0x25f050*_0x25f050*_0x25f050+0x1;case _0x48ab30(0x3d8):return _0x4efd65<0.5?0x4*_0x4efd65*_0x4efd65*_0x4efd65:(_0x4efd65-0x1)*(0x2*_0x4efd65-0x2)*(0x2*_0x4efd65-0x2)+0x1;case _0x48ab30(0x621):return _0x4efd65*_0x4efd65*_0x4efd65*_0x4efd65;case'OUTQUART':var _0x25f050=_0x4efd65-0x1;return 0x1-_0x25f050*_0x25f050*_0x25f050*_0x25f050;case _0x48ab30(0x727):var _0x25f050=_0x4efd65-0x1;return _0x4efd65<0.5?0x8*_0x4efd65*_0x4efd65*_0x4efd65*_0x4efd65:0x1-0x8*_0x25f050*_0x25f050*_0x25f050*_0x25f050;case _0x48ab30(0x4c7):return _0x4efd65*_0x4efd65*_0x4efd65*_0x4efd65*_0x4efd65;case'OUTQUINT':var _0x25f050=_0x4efd65-0x1;return 0x1+_0x25f050*_0x25f050*_0x25f050*_0x25f050*_0x25f050;case _0x48ab30(0x7b1):var _0x25f050=_0x4efd65-0x1;return _0x4efd65<0.5?0x10*_0x4efd65*_0x4efd65*_0x4efd65*_0x4efd65*_0x4efd65:0x1+0x10*_0x25f050*_0x25f050*_0x25f050*_0x25f050*_0x25f050;case'INEXPO':if(_0x4efd65===0x0)return 0x0;return Math[_0x48ab30(0x220)](0x2,0xa*(_0x4efd65-0x1));case _0x48ab30(0x55d):if(_0x4efd65===0x1)return 0x1;return-Math[_0x48ab30(0x220)](0x2,-0xa*_0x4efd65)+0x1;case'INOUTEXPO':if(_0x4efd65===0x0||_0x4efd65===0x1)return _0x4efd65;var _0x4da0d5=_0x4efd65*0x2,_0x1db19b=_0x4da0d5-0x1;if(_0x4da0d5<0x1)return 0.5*Math[_0x48ab30(0x220)](0x2,0xa*_0x1db19b);return 0.5*(-Math['pow'](0x2,-0xa*_0x1db19b)+0x2);case _0x48ab30(0x419):var _0x4da0d5=_0x4efd65/0x1;return-0x1*(Math[_0x48ab30(0x6bd)](0x1-_0x4da0d5*_0x4efd65)-0x1);case _0x48ab30(0x274):var _0x25f050=_0x4efd65-0x1;return Math[_0x48ab30(0x6bd)](0x1-_0x25f050*_0x25f050);case _0x48ab30(0x1be):var _0x4da0d5=_0x4efd65*0x2,_0x1db19b=_0x4da0d5-0x2;if(_0x4da0d5<0x1)return-0.5*(Math[_0x48ab30(0x6bd)](0x1-_0x4da0d5*_0x4da0d5)-0x1);return 0.5*(Math[_0x48ab30(0x6bd)](0x1-_0x1db19b*_0x1db19b)+0x1);case _0x48ab30(0x622):return _0x4efd65*_0x4efd65*((_0xa0e755+0x1)*_0x4efd65-_0xa0e755);case _0x48ab30(0x784):var _0x4da0d5=_0x4efd65/0x1-0x1;return _0x4da0d5*_0x4da0d5*((_0xa0e755+0x1)*_0x4da0d5+_0xa0e755)+0x1;break;case'INOUTBACK':var _0x4da0d5=_0x4efd65*0x2,_0x59c483=_0x4da0d5-0x2,_0x306b55=_0xa0e755*1.525;if(_0x4da0d5<0x1)return 0.5*_0x4da0d5*_0x4da0d5*((_0x306b55+0x1)*_0x4da0d5-_0x306b55);return 0.5*(_0x59c483*_0x59c483*((_0x306b55+0x1)*_0x59c483+_0x306b55)+0x2);case _0x48ab30(0x52e):if(_0x4efd65===0x0||_0x4efd65===0x1)return _0x4efd65;var _0x4da0d5=_0x4efd65/0x1,_0x1db19b=_0x4da0d5-0x1,_0x214fe4=0x1-_0x599026,_0x306b55=_0x214fe4/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math[_0x48ab30(0x220)](0x2,0xa*_0x1db19b)*Math[_0x48ab30(0x54a)]((_0x1db19b-_0x306b55)*(0x2*Math['PI'])/_0x214fe4));case _0x48ab30(0x41a):var _0x214fe4=0x1-_0x599026,_0x4da0d5=_0x4efd65*0x2;if(_0x4efd65===0x0||_0x4efd65===0x1)return _0x4efd65;var _0x306b55=_0x214fe4/(0x2*Math['PI'])*Math[_0x48ab30(0x3fa)](0x1);return Math[_0x48ab30(0x220)](0x2,-0xa*_0x4da0d5)*Math[_0x48ab30(0x54a)]((_0x4da0d5-_0x306b55)*(0x2*Math['PI'])/_0x214fe4)+0x1;case'INOUTELASTIC':var _0x214fe4=0x1-_0x599026;if(_0x4efd65===0x0||_0x4efd65===0x1)return _0x4efd65;var _0x4da0d5=_0x4efd65*0x2,_0x1db19b=_0x4da0d5-0x1,_0x306b55=_0x214fe4/(0x2*Math['PI'])*Math[_0x48ab30(0x3fa)](0x1);if(_0x4da0d5<0x1)return-0.5*(Math['pow'](0x2,0xa*_0x1db19b)*Math[_0x48ab30(0x54a)]((_0x1db19b-_0x306b55)*(0x2*Math['PI'])/_0x214fe4));return Math[_0x48ab30(0x220)](0x2,-0xa*_0x1db19b)*Math[_0x48ab30(0x54a)]((_0x1db19b-_0x306b55)*(0x2*Math['PI'])/_0x214fe4)*0.5+0x1;case _0x48ab30(0x7e3):var _0x4da0d5=_0x4efd65/0x1;if(_0x4da0d5<0x1/2.75)return 7.5625*_0x4da0d5*_0x4da0d5;else{if(_0x4da0d5<0x2/2.75){var _0x59c483=_0x4da0d5-1.5/2.75;return 7.5625*_0x59c483*_0x59c483+0.75;}else{if(_0x4da0d5<2.5/2.75){var _0x59c483=_0x4da0d5-2.25/2.75;return 7.5625*_0x59c483*_0x59c483+0.9375;}else{var _0x59c483=_0x4da0d5-2.625/2.75;return 7.5625*_0x59c483*_0x59c483+0.984375;}}}case'INBOUNCE':var _0x3470f2=0x1-VisuMZ[_0x48ab30(0x165)](0x1-_0x4efd65,_0x48ab30(0x691));return _0x3470f2;case _0x48ab30(0x4b9):if(_0x4efd65<0.5)var _0x3470f2=VisuMZ[_0x48ab30(0x165)](_0x4efd65*0x2,_0x48ab30(0x635))*0.5;else var _0x3470f2=VisuMZ['ApplyEasing'](_0x4efd65*0x2-0x1,_0x48ab30(0x691))*0.5+0.5;return _0x3470f2;default:return _0x4efd65;}},VisuMZ[_0x4e56c8(0x286)]=function(_0x40362c){const _0x44ac56=_0x4e56c8;_0x40362c=String(_0x40362c)[_0x44ac56(0x25a)]();const _0x1d3499=VisuMZ['CoreEngine'][_0x44ac56(0x5ce)][_0x44ac56(0x2b7)];if(_0x40362c==='MAXHP')return _0x1d3499['IconParam0'];if(_0x40362c===_0x44ac56(0x77b))return _0x1d3499[_0x44ac56(0x3f8)];if(_0x40362c===_0x44ac56(0x5a0))return _0x1d3499[_0x44ac56(0x257)];if(_0x40362c===_0x44ac56(0x27b))return _0x1d3499[_0x44ac56(0x77c)];if(_0x40362c===_0x44ac56(0x753))return _0x1d3499['IconParam4'];if(_0x40362c===_0x44ac56(0x754))return _0x1d3499['IconParam5'];if(_0x40362c===_0x44ac56(0x9e))return _0x1d3499['IconParam6'];if(_0x40362c===_0x44ac56(0x7d1))return _0x1d3499[_0x44ac56(0x321)];if(_0x40362c===_0x44ac56(0x2c6))return _0x1d3499[_0x44ac56(0x94)];if(_0x40362c===_0x44ac56(0x398))return _0x1d3499[_0x44ac56(0x6d6)];if(_0x40362c===_0x44ac56(0x6f5))return _0x1d3499[_0x44ac56(0x29f)];if(_0x40362c===_0x44ac56(0x180))return _0x1d3499[_0x44ac56(0x12f)];if(_0x40362c==='MEV')return _0x1d3499['IconXParam4'];if(_0x40362c===_0x44ac56(0x2db))return _0x1d3499[_0x44ac56(0x218)];if(_0x40362c===_0x44ac56(0x2bc))return _0x1d3499[_0x44ac56(0x686)];if(_0x40362c===_0x44ac56(0x381))return _0x1d3499[_0x44ac56(0x844)];if(_0x40362c===_0x44ac56(0x6c8))return _0x1d3499[_0x44ac56(0x3a3)];if(_0x40362c===_0x44ac56(0x670))return _0x1d3499[_0x44ac56(0x5dc)];if(_0x40362c===_0x44ac56(0x1ab))return _0x1d3499[_0x44ac56(0x22f)];if(_0x40362c===_0x44ac56(0x7b2))return _0x1d3499[_0x44ac56(0x38a)];if(_0x40362c===_0x44ac56(0x153))return _0x1d3499[_0x44ac56(0x98)];if(_0x40362c==='PHA')return _0x1d3499[_0x44ac56(0x4c8)];if(_0x40362c===_0x44ac56(0x7ae))return _0x1d3499['IconSParam4'];if(_0x40362c==='TCR')return _0x1d3499['IconSParam5'];if(_0x40362c==='PDR')return _0x1d3499['IconSParam6'];if(_0x40362c==='MDR')return _0x1d3499['IconSParam7'];if(_0x40362c===_0x44ac56(0x3bc))return _0x1d3499[_0x44ac56(0x722)];if(_0x40362c===_0x44ac56(0x5b1))return _0x1d3499[_0x44ac56(0x2e6)];if(VisuMZ[_0x44ac56(0x5b8)]['CustomParamIcons'][_0x40362c])return VisuMZ['CoreEngine'][_0x44ac56(0x44a)][_0x40362c]||0x0;return 0x0;},VisuMZ[_0x4e56c8(0x7f2)]=function(_0x29b142,_0x3d0583,_0x1462be){const _0x1e3875=_0x4e56c8;if(_0x1462be===undefined&&_0x29b142%0x1===0x0)return _0x29b142;if(_0x1462be!==undefined&&[_0x1e3875(0x280),_0x1e3875(0x77b),'ATK',_0x1e3875(0x27b),_0x1e3875(0x753),_0x1e3875(0x754),'AGI',_0x1e3875(0x7d1)]['includes'](String(_0x1462be)[_0x1e3875(0x25a)]()[_0x1e3875(0x519)]()))return _0x29b142;_0x3d0583=_0x3d0583||0x0;if(VisuMZ['CoreEngine'][_0x1e3875(0x547)][_0x1462be])return VisuMZ['CoreEngine']['CustomParamType'][_0x1462be]===_0x1e3875(0x426)?_0x29b142:String((_0x29b142*0x64)['toFixed'](_0x3d0583))+'%';return String((_0x29b142*0x64)[_0x1e3875(0x711)](_0x3d0583))+'%';},VisuMZ['GroupDigits']=function(_0x15c8ff){const _0x2ef5ef=_0x4e56c8;_0x15c8ff=String(_0x15c8ff);if(!_0x15c8ff)return _0x15c8ff;if(typeof _0x15c8ff!==_0x2ef5ef(0x3dc))return _0x15c8ff;const _0x358b3b=VisuMZ[_0x2ef5ef(0x5b8)][_0x2ef5ef(0x5ce)][_0x2ef5ef(0x2c9)][_0x2ef5ef(0x159)]||'en-US',_0x4c6a42={'maximumFractionDigits':0x6};_0x15c8ff=_0x15c8ff[_0x2ef5ef(0x64a)](/\[(.*?)\]/g,(_0x10ba27,_0x31fb4a)=>{return VisuMZ['PreserveNumbers'](_0x31fb4a,'[',']');}),_0x15c8ff=_0x15c8ff[_0x2ef5ef(0x64a)](/<(.*?)>/g,(_0x2576d0,_0x5c1bc4)=>{const _0x24db29=_0x2ef5ef;return VisuMZ[_0x24db29(0x5c6)](_0x5c1bc4,'<','>');}),_0x15c8ff=_0x15c8ff[_0x2ef5ef(0x64a)](/\{\{(.*?)\}\}/g,(_0x42a140,_0x280a22)=>{const _0x36e9af=_0x2ef5ef;return VisuMZ[_0x36e9af(0x5c6)](_0x280a22,'','');}),_0x15c8ff=_0x15c8ff['replace'](/(\d+\.?\d*)/g,(_0xf6c847,_0x2ab63b)=>{const _0x50eacd=_0x2ef5ef;let _0x4f424f=_0x2ab63b;if(_0x4f424f[0x0]==='0')return _0x4f424f;if(_0x4f424f[_0x4f424f['length']-0x1]==='.')return Number(_0x4f424f)['toLocaleString'](_0x358b3b,_0x4c6a42)+'.';else return _0x4f424f[_0x4f424f[_0x50eacd(0x323)]-0x1]===','?Number(_0x4f424f)[_0x50eacd(0x793)](_0x358b3b,_0x4c6a42)+',':Number(_0x4f424f)['toLocaleString'](_0x358b3b,_0x4c6a42);});let _0x37ac8=0x3;while(_0x37ac8--){_0x15c8ff=VisuMZ[_0x2ef5ef(0x760)](_0x15c8ff);}return _0x15c8ff;},VisuMZ[_0x4e56c8(0x5c6)]=function(_0x3c363a,_0x141923,_0x47bb1c){const _0x4e5d82=_0x4e56c8;return _0x3c363a=_0x3c363a[_0x4e5d82(0x64a)](/(\d)/gi,(_0x5d53b5,_0x34e01c)=>_0x4e5d82(0x1de)['format'](Number(_0x34e01c))),_0x4e5d82(0x585)[_0x4e5d82(0x6d4)](_0x3c363a,_0x141923,_0x47bb1c);},VisuMZ['RevertPreserveNumbers']=function(_0x3a5b12){const _0x14a9be=_0x4e56c8;return _0x3a5b12=_0x3a5b12[_0x14a9be(0x64a)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x2cb93b,_0x1b00a5)=>Number(parseInt(_0x1b00a5))),_0x3a5b12;},VisuMZ['openURL']=function(_0x1dd0dc){const _0x40642c=_0x4e56c8;SoundManager[_0x40642c(0x74f)]();if(!Utils[_0x40642c(0x7c9)]()){const _0x533f75=window[_0x40642c(0x83f)](_0x1dd0dc,_0x40642c(0x3d7));}else{const _0x4f523b=process[_0x40642c(0x56e)]=='darwin'?_0x40642c(0x83f):process[_0x40642c(0x56e)]==_0x40642c(0xe3)?'start':'xdg-open';require(_0x40642c(0x461))[_0x40642c(0x62a)](_0x4f523b+'\x20'+_0x1dd0dc);}},VisuMZ[_0x4e56c8(0x7ea)]=function(_0x174d24,_0x8bf247){const _0x394497=_0x4e56c8;if(!_0x174d24)return'';const _0x11790a=_0x174d24[_0x394497(0x5df)]||_0x174d24['id'];let _0x53b0d4='';return _0x174d24[_0x394497(0x2fa)]!==undefined&&_0x174d24[_0x394497(0x38e)]!==undefined&&(_0x53b0d4=_0x394497(0x677)['format'](_0x11790a,_0x8bf247)),_0x174d24['expParams']!==undefined&&_0x174d24[_0x394497(0x2a5)]!==undefined&&(_0x53b0d4=_0x394497(0x718)['format'](_0x11790a,_0x8bf247)),_0x174d24[_0x394497(0x96)]!==undefined&&_0x174d24[_0x394497(0x6de)]!==undefined&&(_0x53b0d4='Skill-%1-%2'[_0x394497(0x6d4)](_0x11790a,_0x8bf247)),_0x174d24[_0x394497(0x1b4)]!==undefined&&_0x174d24[_0x394497(0x39a)]!==undefined&&(_0x53b0d4=_0x394497(0x6ed)[_0x394497(0x6d4)](_0x11790a,_0x8bf247)),_0x174d24[_0x394497(0x2b1)]!==undefined&&_0x174d24[_0x394497(0x41b)]===0x1&&(_0x53b0d4=_0x394497(0x189)[_0x394497(0x6d4)](_0x11790a,_0x8bf247)),_0x174d24[_0x394497(0x16f)]!==undefined&&_0x174d24['etypeId']>0x1&&(_0x53b0d4='Armor-%1-%2'[_0x394497(0x6d4)](_0x11790a,_0x8bf247)),_0x174d24[_0x394497(0x835)]!==undefined&&_0x174d24[_0x394497(0x820)]!==undefined&&(_0x53b0d4='Enemy-%1-%2'[_0x394497(0x6d4)](_0x11790a,_0x8bf247)),_0x174d24['autoRemovalTiming']!==undefined&&_0x174d24[_0x394497(0xa7)]!==undefined&&(_0x53b0d4='State-%1-%2'['format'](_0x11790a,_0x8bf247)),_0x53b0d4;},Window_Base[_0x4e56c8(0x510)][_0x4e56c8(0x541)]=function(_0x52962c,_0x421c97){const _0xa3ea73=_0x4e56c8,_0x193d16=ImageManager['standardIconWidth']||0x20,_0x425588=ImageManager[_0xa3ea73(0x470)]||0x20;if(_0x421c97[_0xa3ea73(0x3a0)]){const _0x3807ba=_0x193d16-ImageManager[_0xa3ea73(0x7a2)],_0x12d437=_0x425588-ImageManager[_0xa3ea73(0x36e)];let _0x622107=0x2,_0x511281=0x2;this[_0xa3ea73(0x7d3)]()!==0x24&&(_0x511281=Math[_0xa3ea73(0x653)]((this[_0xa3ea73(0x7d3)]()-_0x425588)/0x2));const _0x40ecaf=_0x421c97['x']+Math[_0xa3ea73(0x653)](_0x3807ba/0x2)+_0x622107,_0x5db8dd=_0x421c97['y']+Math[_0xa3ea73(0x653)](_0x12d437/0x2)+_0x511281;this[_0xa3ea73(0x29d)](_0x52962c,_0x40ecaf,_0x5db8dd);}_0x421c97['x']+=_0x193d16+0x4;},Window_StatusBase[_0x4e56c8(0x510)]['drawActorIcons']=function(_0x432368,_0x4758ea,_0x10d08d,_0x5701e4){const _0x3d74a1=_0x4e56c8;_0x5701e4=_0x5701e4||0x90;const _0x2bce65=ImageManager['standardIconWidth']||0x20,_0x241394=ImageManager[_0x3d74a1(0x470)]||0x20,_0x12b31f=_0x2bce65-ImageManager[_0x3d74a1(0x7a2)],_0x1a06bb=_0x241394-ImageManager[_0x3d74a1(0x36e)],_0x272e77=_0x2bce65,_0x48fca1=_0x432368['allIcons']()['slice'](0x0,Math[_0x3d74a1(0x653)](_0x5701e4/_0x272e77));let _0x4338f3=_0x4758ea+Math[_0x3d74a1(0xc0)](_0x12b31f/0x2),_0x1e1fab=_0x10d08d+Math['ceil'](_0x1a06bb/0x2);for(const _0x33a29f of _0x48fca1){this[_0x3d74a1(0x29d)](_0x33a29f,_0x4338f3,_0x1e1fab),_0x4338f3+=_0x272e77;}},Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x6c7)]=function(){return this['_anchor'];},VisuMZ['CoreEngine']['Game_Picture_initBasic']=Game_Picture[_0x4e56c8(0x510)]['initBasic'],Game_Picture['prototype'][_0x4e56c8(0x538)]=function(){const _0x5d556c=_0x4e56c8;VisuMZ['CoreEngine']['Game_Picture_initBasic']['call'](this),this[_0x5d556c(0x65e)]={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0};},VisuMZ['CoreEngine'][_0x4e56c8(0xff)]=Game_Picture['prototype'][_0x4e56c8(0x12b)],Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x12b)]=function(){const _0x57d462=_0x4e56c8;this[_0x57d462(0x109)]();const _0x44981d=this[_0x57d462(0x41d)];VisuMZ[_0x57d462(0x5b8)][_0x57d462(0xff)][_0x57d462(0x410)](this),_0x44981d>0x0&&this[_0x57d462(0x41d)]<=0x0&&(this['_x']=this[_0x57d462(0x84a)],this['_y']=this[_0x57d462(0x4d0)],this[_0x57d462(0x75d)]=this[_0x57d462(0x117)],this[_0x57d462(0xee)]=this['_targetScaleY'],this[_0x57d462(0x1e7)]=this[_0x57d462(0x27d)],this[_0x57d462(0x65e)]&&(this['_anchor']['x']=this[_0x57d462(0x13a)]['x'],this[_0x57d462(0x65e)]['y']=this[_0x57d462(0x13a)]['y']));},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x430)]=Game_Picture[_0x4e56c8(0x510)]['show'],Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x6c4)]=function(_0x210374,_0x1b3f02,_0x553e40,_0x5bc0ee,_0x303d2a,_0x1d46bd,_0x3ace8f,_0x38a1c7){const _0x3dc643=_0x4e56c8;VisuMZ[_0x3dc643(0x5b8)]['Game_Picture_show'][_0x3dc643(0x410)](this,_0x210374,_0x1b3f02,_0x553e40,_0x5bc0ee,_0x303d2a,_0x1d46bd,_0x3ace8f,_0x38a1c7),this[_0x3dc643(0x63d)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1b3f02]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x4e56c8(0x44b)]=Game_Picture['prototype'][_0x4e56c8(0x61f)],Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x61f)]=function(_0x3c8fc2,_0x20a74c,_0x205faa,_0x50f883,_0x1f6425,_0x3dcabc,_0x2123fe,_0x49e32b,_0x197ca4){const _0x8ec067=_0x4e56c8;VisuMZ[_0x8ec067(0x5b8)][_0x8ec067(0x44b)][_0x8ec067(0x410)](this,_0x3c8fc2,_0x20a74c,_0x205faa,_0x50f883,_0x1f6425,_0x3dcabc,_0x2123fe,_0x49e32b,_0x197ca4),this[_0x8ec067(0x327)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3c8fc2]||{'x':0x0,'y':0x0});},Game_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x109)]=function(){const _0x24d947=_0x4e56c8;this[_0x24d947(0x41d)]>0x0&&(this['_anchor']['x']=this[_0x24d947(0x113)](this['_anchor']['x'],this[_0x24d947(0x13a)]['x']),this[_0x24d947(0x65e)]['y']=this['applyEasing'](this[_0x24d947(0x65e)]['y'],this[_0x24d947(0x13a)]['y']));},Game_Picture['prototype']['setAnchor']=function(_0x553b77){const _0x545521=_0x4e56c8;this[_0x545521(0x65e)]=_0x553b77,this['_targetAnchor']=JsonEx[_0x545521(0x5e8)](this['_anchor']);},Game_Picture[_0x4e56c8(0x510)]['setTargetAnchor']=function(_0x2e7910){const _0x54a8ec=_0x4e56c8;this[_0x54a8ec(0x13a)]=_0x2e7910;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x77f)]=Sprite_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x72a)],Sprite_Picture[_0x4e56c8(0x510)][_0x4e56c8(0x72a)]=function(){const _0x3debb2=_0x4e56c8,_0x5e9305=this[_0x3debb2(0x5b9)]();!_0x5e9305[_0x3debb2(0x6c7)]()?VisuMZ[_0x3debb2(0x5b8)]['Sprite_Picture_updateOrigin'][_0x3debb2(0x410)](this):(this[_0x3debb2(0x6c7)]['x']=_0x5e9305['anchor']()['x'],this[_0x3debb2(0x6c7)]['y']=_0x5e9305[_0x3debb2(0x6c7)]()['y']);},Game_Action['prototype'][_0x4e56c8(0x43e)]=function(_0x5bec01){const _0xae020e=_0x4e56c8;if(_0x5bec01){const _0x5a9ba3=_0x5bec01[_0xae020e(0x1d7)];if(_0x5a9ba3===0x1&&this['subject']()[_0xae020e(0x66a)]()!==0x1)this[_0xae020e(0x41c)]();else _0x5a9ba3===0x2&&this['subject']()[_0xae020e(0x409)]()!==0x2?this[_0xae020e(0x567)]():this[_0xae020e(0x68f)](_0x5a9ba3);}else this[_0xae020e(0xaf)]();},Game_Actor[_0x4e56c8(0x510)][_0x4e56c8(0x36d)]=function(){const _0x5161f2=_0x4e56c8;return this[_0x5161f2(0x252)]()[_0x5161f2(0x842)](_0x548a64=>this[_0x5161f2(0x3ef)](_0x548a64)&&this['skillTypes']()[_0x5161f2(0xd3)](_0x548a64[_0x5161f2(0x96)]));},Window_Base[_0x4e56c8(0x510)]['createDimmerSprite']=function(){const _0x439cbc=_0x4e56c8;this[_0x439cbc(0x627)]=new Sprite(),this[_0x439cbc(0x627)][_0x439cbc(0x134)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x439cbc(0x525)](this[_0x439cbc(0x627)]);},Window_Base[_0x4e56c8(0x510)]['refreshDimmerBitmap']=function(){const _0x46703e=_0x4e56c8;if(this[_0x46703e(0x627)]){const _0x3b71be=this[_0x46703e(0x627)]['bitmap'],_0x107265=this[_0x46703e(0x79c)],_0x4dd62d=this['height'],_0x4c3573=this[_0x46703e(0x8c)],_0x24fb83=ColorManager[_0x46703e(0xfd)](),_0x517aab=ColorManager[_0x46703e(0x422)]();_0x3b71be[_0x46703e(0x850)](_0x107265,_0x4dd62d),_0x3b71be[_0x46703e(0x3fe)](0x0,0x0,_0x107265,_0x4c3573,_0x517aab,_0x24fb83,!![]),_0x3b71be[_0x46703e(0x425)](0x0,_0x4c3573,_0x107265,_0x4dd62d-_0x4c3573*0x2,_0x24fb83),_0x3b71be[_0x46703e(0x3fe)](0x0,_0x4dd62d-_0x4c3573,_0x107265,_0x4c3573,_0x24fb83,_0x517aab,!![]),this['_dimmerSprite'][_0x46703e(0x65f)](0x0,0x0,_0x107265,_0x4dd62d);}},Game_Actor[_0x4e56c8(0x510)]['makeAutoBattleActions']=function(){const _0x308161=_0x4e56c8;for(let _0x342355=0x0;_0x342355<this[_0x308161(0x4f1)]();_0x342355++){const _0x5433b3=this['makeActionList']();let _0x2ac309=Number[_0x308161(0x142)];this[_0x308161(0x613)](_0x342355,_0x5433b3[0x0]);for(const _0x426882 of _0x5433b3){const _0x13fb99=_0x426882['evaluate']();_0x13fb99>_0x2ac309&&(_0x2ac309=_0x13fb99,this[_0x308161(0x613)](_0x342355,_0x426882));}}this[_0x308161(0x7e2)](_0x308161(0x3e5));},Window_BattleItem['prototype']['isEnabled']=function(_0x1a0bed){const _0x1a2bdb=_0x4e56c8;return BattleManager[_0x1a2bdb(0x544)]()?BattleManager[_0x1a2bdb(0x544)]()[_0x1a2bdb(0x3ef)](_0x1a0bed):Window_ItemList[_0x1a2bdb(0x510)][_0x1a2bdb(0x316)][_0x1a2bdb(0x410)](this,_0x1a0bed);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x71c)]=Scene_Map['prototype'][_0x4e56c8(0x3c7)],Scene_Map['prototype'][_0x4e56c8(0x3c7)]=function(){const _0x423c8e=_0x4e56c8;VisuMZ['CoreEngine'][_0x423c8e(0x71c)][_0x423c8e(0x410)](this);const _0x1ca220=this[_0x423c8e(0x294)][_0x423c8e(0x3b1)];if(_0x1ca220)this[_0x423c8e(0x100)](_0x1ca220);},VisuMZ['CoreEngine'][_0x4e56c8(0x3fc)]=Scene_Battle[_0x4e56c8(0x510)]['createSpriteset'],Scene_Battle[_0x4e56c8(0x510)][_0x4e56c8(0x3c7)]=function(){const _0xfe23f6=_0x4e56c8;VisuMZ['CoreEngine'][_0xfe23f6(0x3fc)]['call'](this);const _0x3513eb=this[_0xfe23f6(0x294)][_0xfe23f6(0x3b1)];if(_0x3513eb)this[_0xfe23f6(0x100)](_0x3513eb);},Sprite_Actor[_0x4e56c8(0x510)][_0x4e56c8(0x5b3)]=function(){const _0x1d9b0e=_0x4e56c8;Sprite_Battler['prototype'][_0x1d9b0e(0x5b3)]['call'](this),this[_0x1d9b0e(0x633)]();if(this['_actor'])this[_0x1d9b0e(0x23f)]();else this[_0x1d9b0e(0x25f)]!==''&&(this[_0x1d9b0e(0x25f)]='');},Window[_0x4e56c8(0x510)]['_refreshArrows']=function(){const _0x5191a8=_0x4e56c8,_0x15e818=this[_0x5191a8(0x2ca)],_0x3a78c7=this['_height'],_0x2ef554=0x18,_0x74e0dd=_0x2ef554/0x2,_0x4e5ac9=0x60+_0x2ef554,_0x1b1c76=0x0+_0x2ef554;this[_0x5191a8(0x120)][_0x5191a8(0x134)]=this[_0x5191a8(0x379)],this[_0x5191a8(0x120)]['anchor']['x']=0.5,this[_0x5191a8(0x120)][_0x5191a8(0x6c7)]['y']=0.5,this[_0x5191a8(0x120)][_0x5191a8(0x65f)](_0x4e5ac9+_0x74e0dd,_0x1b1c76+_0x74e0dd+_0x2ef554,_0x2ef554,_0x74e0dd),this['_downArrowSprite'][_0x5191a8(0x61f)](Math[_0x5191a8(0x263)](_0x15e818/0x2),Math['round'](_0x3a78c7-_0x74e0dd)),this[_0x5191a8(0x35a)][_0x5191a8(0x134)]=this['_windowskin'],this[_0x5191a8(0x35a)][_0x5191a8(0x6c7)]['x']=0.5,this[_0x5191a8(0x35a)]['anchor']['y']=0.5,this['_upArrowSprite']['setFrame'](_0x4e5ac9+_0x74e0dd,_0x1b1c76,_0x2ef554,_0x74e0dd),this[_0x5191a8(0x35a)]['move'](Math[_0x5191a8(0x263)](_0x15e818/0x2),Math['round'](_0x74e0dd));},Window['prototype'][_0x4e56c8(0x391)]=function(){const _0xed0577=_0x4e56c8,_0x16af26=0x90,_0x89280d=0x60,_0x1df396=0x18;this['_pauseSignSprite'][_0xed0577(0x134)]=this[_0xed0577(0x379)],this[_0xed0577(0x272)][_0xed0577(0x6c7)]['x']=0.5,this[_0xed0577(0x272)]['anchor']['y']=0x1,this[_0xed0577(0x272)]['move'](Math[_0xed0577(0x263)](this[_0xed0577(0x2ca)]/0x2),this['_height']),this[_0xed0577(0x272)][_0xed0577(0x65f)](_0x16af26,_0x89280d,_0x1df396,_0x1df396),this[_0xed0577(0x272)][_0xed0577(0x49f)]=0xff;},Window['prototype']['_updateFilterArea']=function(){const _0x3d057b=_0x4e56c8,_0x1b7c63=this['_clientArea'][_0x3d057b(0x6a6)][_0x3d057b(0x6e4)](new Point(0x0,0x0)),_0x236665=this[_0x3d057b(0x34f)][_0x3d057b(0x1b7)];_0x236665['x']=_0x1b7c63['x']+this['origin']['x'],_0x236665['y']=_0x1b7c63['y']+this['origin']['y'],_0x236665[_0x3d057b(0x79c)]=Math[_0x3d057b(0xc0)](this[_0x3d057b(0xc1)]*this[_0x3d057b(0x4d8)]['x']),_0x236665[_0x3d057b(0x1e9)]=Math[_0x3d057b(0xc0)](this[_0x3d057b(0x554)]*this['scale']['y']);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x49d)]=Window[_0x4e56c8(0x510)][_0x4e56c8(0x657)],Window[_0x4e56c8(0x510)][_0x4e56c8(0x657)]=function(){const _0xae5738=_0x4e56c8,_0x54bc06=VisuMZ[_0xae5738(0x5b8)][_0xae5738(0x5ce)][_0xae5738(0x18f)][_0xae5738(0x3ca)]??!![];if(!_0x54bc06)return VisuMZ[_0xae5738(0x5b8)][_0xae5738(0x49d)][_0xae5738(0x410)](this);const _0x59af01=this[_0xae5738(0x505)],_0x41f228=Math[_0xae5738(0x53e)](0x0,this[_0xae5738(0x2ca)]-_0x59af01*0x2),_0x851f22=Math[_0xae5738(0x53e)](0x0,this['_height']-_0x59af01*0x2),_0x3bacb1=this[_0xae5738(0x814)],_0x340152=_0x3bacb1[_0xae5738(0x616)][0x0];_0x3bacb1[_0xae5738(0x134)]=this[_0xae5738(0x379)],_0x3bacb1[_0xae5738(0x65f)](0x0,0x0,0x60,0x60),_0x3bacb1[_0xae5738(0x61f)](_0x59af01,_0x59af01),_0x3bacb1[_0xae5738(0x4d8)]['x']=_0x41f228/0x60,_0x3bacb1[_0xae5738(0x4d8)]['y']=_0x851f22/0x60,_0x340152['bitmap']=this[_0xae5738(0x379)],_0x340152[_0xae5738(0x65f)](0x0,0x60,0x60,0x60),_0x340152[_0xae5738(0x61f)](0x0,0x0,_0x41f228,_0x851f22),_0x340152['scale']['x']=0x1/_0x3bacb1[_0xae5738(0x4d8)]['x'],_0x340152[_0xae5738(0x4d8)]['y']=0x1/_0x3bacb1[_0xae5738(0x4d8)]['y'],_0x3bacb1[_0xae5738(0x624)](this[_0xae5738(0x4bc)]);},Game_Temp[_0x4e56c8(0x510)]['sceneTerminationClearEffects']=function(){const _0x2ceabf=_0x4e56c8;this['_animationQueue']=[],this[_0x2ceabf(0x22b)]=[],this[_0x2ceabf(0x51e)]=[],this[_0x2ceabf(0x245)]=[];},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0xcc)]=Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x434)],Scene_Base[_0x4e56c8(0x510)][_0x4e56c8(0x434)]=function(){const _0x124fab=_0x4e56c8;if($gameTemp)$gameTemp[_0x124fab(0x330)]();VisuMZ[_0x124fab(0x5b8)][_0x124fab(0xcc)][_0x124fab(0x410)](this);},Bitmap[_0x4e56c8(0x510)][_0x4e56c8(0x477)]=function(_0x1b3892){const _0x112f08=_0x4e56c8,_0x534ac7=this[_0x112f08(0x7f9)];_0x534ac7[_0x112f08(0x2b8)](),_0x534ac7[_0x112f08(0x249)]=this['_makeFontNameText']();const _0x57638d=_0x534ac7[_0x112f08(0x662)](_0x1b3892)['width'];return _0x534ac7['restore'](),_0x57638d;},Window_Message[_0x4e56c8(0x510)][_0x4e56c8(0x376)]=function(_0x315e11){const _0x4bd900=_0x4e56c8;return this[_0x4bd900(0x507)]()?this[_0x4bd900(0x6cb)][_0x4bd900(0x477)](_0x315e11):Window_Base['prototype'][_0x4bd900(0x376)][_0x4bd900(0x410)](this,_0x315e11);},Window_Message[_0x4e56c8(0x510)][_0x4e56c8(0x507)]=function(){const _0x45707d=_0x4e56c8;return VisuMZ[_0x45707d(0x5b8)][_0x45707d(0x5ce)]['QoL']['FontWidthFix']??!![];},VisuMZ[_0x4e56c8(0x5b8)]['Game_Action_numRepeats']=Game_Action[_0x4e56c8(0x510)]['numRepeats'],Game_Action[_0x4e56c8(0x510)][_0x4e56c8(0x832)]=function(){const _0x505a8e=_0x4e56c8;return this[_0x505a8e(0x1c6)]()?VisuMZ[_0x505a8e(0x5b8)]['Game_Action_numRepeats']['call'](this):0x0;},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x397)]=Game_Action[_0x4e56c8(0x510)][_0x4e56c8(0x41c)],Game_Action[_0x4e56c8(0x510)][_0x4e56c8(0x41c)]=function(){const _0x2aac1e=_0x4e56c8;if(this[_0x2aac1e(0x9d)]()&&this['subject']()['canAttack']())VisuMZ['CoreEngine']['Game_Action_setAttack'][_0x2aac1e(0x410)](this);else BattleManager[_0x2aac1e(0x464)]?VisuMZ['CoreEngine']['Game_Action_setAttack']['call'](this):this[_0x2aac1e(0xaf)]();},VisuMZ[_0x4e56c8(0x5b8)]['BattleManager_invokeCounterAttack']=BattleManager[_0x4e56c8(0x4f8)],BattleManager[_0x4e56c8(0x4f8)]=function(_0x1fbb39,_0x2cc3a8){const _0x509ad3=_0x4e56c8;this[_0x509ad3(0x464)]=!![],VisuMZ[_0x509ad3(0x5b8)][_0x509ad3(0x210)]['call'](this,_0x1fbb39,_0x2cc3a8),this['_bypassCanCounterCheck']=undefined;},Sprite_Name[_0x4e56c8(0x510)][_0x4e56c8(0x7e6)]=function(){return 0x24;},Sprite_Name[_0x4e56c8(0x510)][_0x4e56c8(0x18e)]=function(){const _0x5e8373=_0x4e56c8,_0x55866a=this['name'](),_0x171f22=this[_0x5e8373(0x307)](),_0x535451=this['bitmapHeight']();this[_0x5e8373(0x1cd)](),this[_0x5e8373(0x134)]['clear'](),this[_0x5e8373(0x134)][_0x5e8373(0x80a)](_0x55866a,0x4,0x0,_0x171f22-0xa,_0x535451,_0x5e8373(0x67b));},Bitmap[_0x4e56c8(0x510)][_0x4e56c8(0x80a)]=function(_0x36f783,_0x32b6c0,_0x221226,_0x51e8fa,_0x12c25f,_0x4f6b1a){const _0x4fe222=_0x4e56c8,_0xaef6c1=this[_0x4fe222(0x7f9)],_0x4e78cf=_0xaef6c1[_0x4fe222(0x37d)];_0x51e8fa=_0x51e8fa||0xffffffff;let _0x41cd84=_0x32b6c0,_0x34494a=Math[_0x4fe222(0x263)](_0x221226+0x18/0x2+this[_0x4fe222(0x2ea)]*0.35);_0x4f6b1a==='center'&&(_0x41cd84+=_0x51e8fa/0x2),_0x4f6b1a==='right'&&(_0x41cd84+=_0x51e8fa),_0xaef6c1[_0x4fe222(0x2b8)](),_0xaef6c1[_0x4fe222(0x249)]=this[_0x4fe222(0x64c)](),_0xaef6c1[_0x4fe222(0x73f)]=_0x4f6b1a,_0xaef6c1[_0x4fe222(0x37e)]=_0x4fe222(0x7ec),_0xaef6c1[_0x4fe222(0x37d)]=0x1,this[_0x4fe222(0x2e4)](_0x36f783,_0x41cd84,_0x34494a,_0x51e8fa),_0xaef6c1['globalAlpha']=_0x4e78cf,this['_drawTextBody'](_0x36f783,_0x41cd84,_0x34494a,_0x51e8fa),_0xaef6c1[_0x4fe222(0x7fd)](),this[_0x4fe222(0x2c2)][_0x4fe222(0x5b3)]();},VisuMZ['CoreEngine'][_0x4e56c8(0x417)]=BattleManager[_0x4e56c8(0x168)],BattleManager[_0x4e56c8(0x168)]=function(_0xb3369a){const _0x47039d=_0x4e56c8;if(this[_0x47039d(0x802)]['isForFriend']())return![];return VisuMZ[_0x47039d(0x5b8)][_0x47039d(0x417)][_0x47039d(0x410)](this,_0xb3369a);},BattleManager[_0x4e56c8(0x377)]=function(){const _0x3f6914=_0x4e56c8;if(this[_0x3f6914(0x169)])this['_logWindow'][_0x3f6914(0x377)](this['_subject']);this[_0x3f6914(0x85)]=_0x3f6914(0x606),this[_0x3f6914(0x169)]&&this['_subject'][_0x3f6914(0x4f1)]()===0x0&&(this[_0x3f6914(0x166)](this['_subject']),this[_0x3f6914(0x169)]=null);},Bitmap[_0x4e56c8(0x510)][_0x4e56c8(0x642)]=function(){const _0xc633f1=_0x4e56c8;this[_0xc633f1(0x421)]=new Image(),this[_0xc633f1(0x421)][_0xc633f1(0x47a)]=this[_0xc633f1(0x644)][_0xc633f1(0x223)](this),this[_0xc633f1(0x421)]['onerror']=this[_0xc633f1(0x578)]['bind'](this),this[_0xc633f1(0x794)](),this[_0xc633f1(0x70a)]=_0xc633f1(0x42c),Utils[_0xc633f1(0x23c)]()?this[_0xc633f1(0x658)]():(this[_0xc633f1(0x421)][_0xc633f1(0x97)]=this[_0xc633f1(0x3e0)],![]&&this[_0xc633f1(0x421)]['width']>0x0&&(this[_0xc633f1(0x421)]['onload']=null,this[_0xc633f1(0x644)]()));},Scene_Skill['prototype'][_0x4e56c8(0x302)]=function(){const _0x27801c=_0x4e56c8;Scene_MenuBase[_0x27801c(0x510)][_0x27801c(0x302)][_0x27801c(0x410)](this),this[_0x27801c(0x626)](),this['_itemWindow'][_0x27801c(0x5f6)](),this['_itemWindow'][_0x27801c(0x431)](),this[_0x27801c(0x859)][_0x27801c(0x479)]();},Scene_Skill[_0x4e56c8(0x510)][_0x4e56c8(0x49c)]=function(){const _0xcbbaf5=_0x4e56c8;return this[_0xcbbaf5(0x859)]&&this[_0xcbbaf5(0x859)][_0xcbbaf5(0x3c6)];},Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x845)]=function(_0x272ef7,_0x454bbc,_0x3f4edb){const _0x42cfe1=_0x4e56c8,_0x577269=this[_0x42cfe1(0x17d)](),_0x222d09=this[_0x42cfe1(0x82b)](_0x272ef7,_0x454bbc);for(const _0x3a0ed4 of _0x222d09){const _0x1c34a4=_0x577269[_0x3a0ed4];if(_0x1c34a4===undefined||_0x1c34a4===null){if($gameTemp[_0x42cfe1(0x6c9)]()&&!DataManager[_0x42cfe1(0x4f4)]()){let _0x2e577c=_0x42cfe1(0x24d)+'\x0a';_0x2e577c+='Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages'+'\x0a',_0x2e577c+=_0x42cfe1(0xeb);if(this['showIncompleteTilesetError']())alert(_0x2e577c),SceneManager[_0x42cfe1(0x351)]();else{if(!this[_0x42cfe1(0x468)])console[_0x42cfe1(0x2d8)](_0x2e577c);this['_displayedPassageError']=!![];}}}if((_0x1c34a4&0x10)!==0x0)continue;if((_0x1c34a4&_0x3f4edb)===0x0)return!![];if((_0x1c34a4&_0x3f4edb)===_0x3f4edb)return![];}return![];},Game_Map[_0x4e56c8(0x510)][_0x4e56c8(0x594)]=function(){const _0x1d5b0c=_0x4e56c8;if(Imported[_0x1d5b0c(0x596)])return!![];if(Imported[_0x1d5b0c(0xbd)])return!![];return![];},Sprite_Animation[_0x4e56c8(0x510)][_0x4e56c8(0x472)]=function(_0x188342){const _0x5b6d87=_0x4e56c8;!this['_originalViewport']&&(this[_0x5b6d87(0x7c3)]=_0x188342['gl'][_0x5b6d87(0x3ac)](_0x188342['gl'][_0x5b6d87(0x10e)]));},VisuMZ[_0x4e56c8(0x5b8)]['Scene_Map_shouldAutosave']=Scene_Map[_0x4e56c8(0x510)]['shouldAutosave'],Scene_Map[_0x4e56c8(0x510)][_0x4e56c8(0x1a1)]=function(){const _0x3207ce=_0x4e56c8,_0x42e36e=SceneManager['_previousClass'][_0x3207ce(0x9f)];if([_0x3207ce(0xb6),_0x3207ce(0x7c7),_0x3207ce(0x1dd),_0x3207ce(0x53a)][_0x3207ce(0xd3)](_0x42e36e))return![];return VisuMZ['CoreEngine'][_0x3207ce(0x7b6)][_0x3207ce(0x410)](this);},VisuMZ[_0x4e56c8(0x5b8)][_0x4e56c8(0x632)]=Window_SkillList['prototype'][_0x4e56c8(0xd3)],Window_SkillList['prototype'][_0x4e56c8(0xd3)]=function(_0x13c2bc){const _0x6544f3=_0x4e56c8;if(this[_0x6544f3(0x19b)]<=0x0)return![];return VisuMZ[_0x6544f3(0x5b8)][_0x6544f3(0x632)][_0x6544f3(0x410)](this,_0x13c2bc);};