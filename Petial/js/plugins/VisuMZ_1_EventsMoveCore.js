//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.60;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.60] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Character Sprite Filename Tags
 * ============================================================================
 * 
 * For the files located inside of your project's /img/characters/ folder, if
 * the filenames themselves have specific "tags" in them, special properties
 * will be applied to them. These tags can be combined together with a few
 * exceptions.
 * 
 * Some of these are new to VisuStella MZ, while others are default to MZ.
 * 
 * ---
 * 
 *   !filename.png
 *   - Tag: !
 *   - Causes this character's sprite to align with the tile grid instead of
 *     being lifted a few pixels higher.
 *   - This is primarily used for things like doors, chests, and floor plates.
 *   - Default to RPG Maker MZ.
 * 
 * ---
 * 
 *   $filename.png
 *   - Tag: $
 *   - Causes this character's sprite to use the "big character" format.
 *   - Primarily used for sprites like the big monsters and such which only
 *     have 3x4 cells as opposed to 12x8 cells that regular sprite sheets have.
 *   - Cannot be combined with the [VS8] tag.
 *   - Default to RPG Maker MZ.
 * 
 * ---
 * 
 *   filename[Invisible].png
 *   - Tag: [Invisible] or [Inv]
 *   - This character's sprite will become invisible on the map screen in-game
 *     while almost everything else about it is visible.
 *   - This is used for those who wish to use sprite labels for things such as
 *     autorun and parallel events.
 * 
 * ---
 * 
 *   filename[VS8].png
 *   - Tag: [VS8]
 *   - Converts this sprite into a VisuStella-Style 8-Direction Sprite Sheet.
 *   - Refer to the section below.
 *   - Cannot be combined with the $ tag.
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 * 
 * <Map Load Common Event: x>
 * <Map Load Common Events: x, x, x>
 * 
 * - Used for: Map Notetags
 * - When this map is loaded, run the specified Common Events once available.
 *   - Does NOT trigger if you transfer to a different part of the same map.
 * - Replace 'x' with a number representing the ID of the Common Event you wish
 *   to reserve and run once ready.
 * 
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Circle: x>
 * <Activation Delta: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 *   - If '0' is used for the Map ID, reference the current map.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 * 
 * <Encounter Half Square: x>
 * <Encounter Half Circle: x>
 * <Encounter Half Delta: x>
 * <Encounter Half Row: x>
 * <Encounter Half Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be halved.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterHalf(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate halving effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Encounter None Square: x>
 * <Encounter None Circle: x>
 * <Encounter None Delta: x>
 * <Encounter None Row: x>
 * <Encounter None Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be suppressed completely.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterNone(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate suppression effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Erase if Encounter Half>
 * <Erase if Encounter None>
 * 
 * - Used for: Event Notetags ONLY
 * - Automatically erase this event if the player's party has an encounter half
 *   or encounter none effect, or if the event has spawned in an encounter half
 *   or encounter none area.
 * - This check only occurs in two situations: when the map is first loaded
 *   after being teleported into or when the player leaves a menu and returns
 *   back to the map.
 * - Events that have been erased due to this effect will NOT return even if
 *   the encounter half/none effect is removed while the player is still on the
 *   map. The event will return if the player exits the map and comes back.
 * 
 * ---
 * 
 * <Exit Reset Self Data>
 * 
 * - Used for: Event Notetags ONLY
 * - When the player leaves the current map, all Self Switches and Self
 *   Variables related to this event will be reset.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 *   - If text codes are used, avoid text codes that use < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 *   - You can use text codes with < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - If this tag is not used, refer to the default plugin parameter settings.
 *
 * ---
 * 
 * <Label Range Type: Square>
 * <Label Range Type: Circle>
 * <Label Range Type: Diamond>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range type for the label to appear visible for.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Diamond: A diamond-shaped range with the event at the center.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - If this tag is not used, refer to the default plugin parameter settings.
 * 
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Label Hue Shift: +x>
 * <Label Hue Shift: -x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the hue of the event label by +x or -x every frame.
 *   - Keep in mind that since this is changing hue, this will appear to have
 *     no effect if you are using black and white labels.
 *   - Use labels with text codes that add color to them like '\C[4]text'
 * - This only works with the sprite version of event labels and does not work
 *   with the legacy version.
 * 
 * ---
 * 
 * <Location X: +x>
 * <Location X: -x>
 * 
 * <Location Y: +x>
 * <Location Y: -x>
 * 
 * <Location: +x, +y>
 * <Location: +x, -y>
 * <Location: -x, +y>
 * <Location: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the initial location of this event by +x and +y (or -x and -y).
 * - This allows you to stack events on top of each other or even move them to
 *   various places of the map.
 * - Replace 'x' with a number that represents the horizontal tiles to adjust
 *   the initial starting location by.
 * - Replace 'y' with a number that represents the vertical tiles to adjust
 *   the initial starting location by.
 * 
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Picture Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Applies a picture graphic from the /img/pictures/ folder of your project.
 * - This graphic will be on top of the character sprite but below the event
 *   icon sprite.
 *   - The picture priority will be the same as the event's priority.
 *   - If it is "below characters", the player can walk on top of it.
 *   - If it is "above characters", the player will behind it.
 *   - If it is "same as characters", the priority will be based on the
 *     current relative Y position. This also means, if the picture is big
 *     enough, it can clip into the top of tree tiles and such.
 * - Replace 'filename' with a filename from the game project's /img/pictures/
 *   folder. This is case sensitive. Do NOT include the file extension.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Type: Enemy>
 * <Picture Type: SV Enemy>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
 *   grab a picture graphic from.
 * - Other picture graphic sprite related notetags will apply as normal.
 * 
 * ---
 * 
 * <Picture Max Size: x>
 * <Picture Scale: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - If the "Max Size" or "Scale" supplementary notetags are used, the picture
 *   graphic will be scaled proportionally to fit either the exact pixel size
 *   for "Max Size" or the "Scale" ratio.
 *   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
 * - Replace 'x' with a number value representing the exact pixel size for the
 *   "Max Size" notetag.
 * - Replace 'y' with a number value representing the scale on which to shrink
 *   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
 *   double size.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Picture Offset X: +x>
 * <Picture Offset X: -x>
 *
 * <Picture Offset Y: +x>
 * <Picture Offset Y: -x>
 *
 * <Picture Offset: +x, +y>
 * <Picture Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Offsets the X and Y position of the event picture relative to the event
 *   sprite's own position.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Wait Frames: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Requires VisuMZ_4_AnimatedPictures!
 * - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
 *   determines the delay inbetween frame changes.
 * - Replace 'x' with a number representing the amount of frames to wait
 *   inbetween frame changes.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Playtest>
 * 
 * - Used for: Event Notetags.
 * - This does NOT work when it's in the Event Page Comment Tags.
 * - If this notetag is found in the event's notebox (NOT comments), then the
 *   event will only appear during a playtest session. It will not appear in a
 *   deployed game where the playtest flag is not on.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Scale: x%>
 * 
 * <Scale X: x%>
 * <Scale Y: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the scale of the sprite to the designated size.
 * - For <Scale: x%> variant: replace 'x' with a number representing the
 *   scaling overall percentage to be used.
 * - For <Scale X: x%> variant, replace 'x' with a number representing the x
 *   factor for the horizontal scaling percentage to be used.
 * - For <Scale Y: y%> variant, replace 'y' with a number representing the y
 *   factor for the vertical scaling percentage to be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Tile Expand Up: x>
 * <Tile Expand Down: x>
 * <Tile Expand Left: x>
 * <Tile Expand Right: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used for events with tile graphics. Expands the graphic up, down, left, or
 *   right from the spritesheet.
 *   - This does NOT expand the hitbox.
 * - The graphic will be anchored to the tile it's expanded from. This means
 *   even if you expanded downward, the actual event's position will still be
 *   the current event's X/Y coordinates. It's just grown more vertically and
 *   is still centered horizontally.
 * - This is primarily used to save on having to use too many events for tiles
 *   that expanded past 1x1 tile sizes.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Read
 * - Runs the page of a different event remotely.
 * - This will run the page of the target event on the CURRENT event.
 * - This means that any "This Event" commands will be applied to the event
 *   using this Plugin Command and NOT the target event that page data is being
 *   retrieved from.
 * - Think of it as the current event using the target called event as a
 *   Common Event ala how RPG Maker 2003 works (for those familiar with it).
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change (Temporary)
 * - Change the icon that appears on an event.
 * - This change is temporary and resets upon new events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Change (Forced)
 * - Change the icon that appears on an event.
 * - This change is forced and needs to be restored.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 * - This will remain deleted and invisible for events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * Event Icon: Restore
 * - Restores a deleted or forced icon that appears on an event.
 * 
 *   Map ID: 
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Popup Plugin Commands ===
 * 
 * ---
 * 
 * Event Popup: Player
 * - Makes a centered event popup on the player sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Follower
 * - Makes a centered event popup on target follower sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Follower Index:
 *   - Which follower index to play popup?
 *   - Index starts at 0.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second.
 *   - You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Event
 * - Makes a centered event popup on target event sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Event ID:
 *   - The ID of the event to play popup on.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Target Tile
 * - Makes a centered event popup on target tile.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Map Tile X:
 *   Map Tile Y:
 *   - The x/y coordinate of the map tile.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Popup Settings
 * 
 *   Fade Settings:
 * 
 *     Fade In Duration:
 *     - How many frames does it take to fade in?
 *     - 60 frames = 1 second.
 * 
 *     Fade Out Duration:
 *     - How many frames does it take to fade out?
 *     - 60 frames = 1 second.
 * 
 *   Offset Settings:
 * 
 *     Starting Offset X:
 *     - Offsets the starting x position.
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Starting Offset Y:
 *     - Offsets the starting y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *     Ending Offset X:
 *     - Offsets the ending x position. 
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Ending Offset Y:
 *     - Offsets the ending y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *   Scaling Settings:
 * 
 *     Starting Scale X:
 *     - What is the starting scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Starting Scale Y:
 *     - What is the starting scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale X:
 *     - What is the ending scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale Y:
 *     - What is the ending scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *   Angle Settings:
 * 
 *     Starting Offset Angle:
 *     - What is the starting angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *     Ending Offset Angle:
 *     - What is the ending angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *   Misc Settings:
 * 
 *     Arc Peak:
 *     - This is the height of the popup's trajectory arc in pixels.
 *     - Positive: up. Negative: down.
 *     - You may use code.
 * 
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Data Plugin Commands ===
 * 
 * ---
 * 
 * Self Data: Reset All
 * - Reset the Self Switch and Self Variable data of all events within the
 *   specified map.
 * 
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Mobile-Enabled?:
 *   - Enable event labels for mobile devices?
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 * 
 *     Range Type:
 *     - What do you want the default label visible range type?
 *       - Square
 *       - Diamond
 *       - Circle
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Dash on Ladder?
 *   - Allow dashing while on a ladder or rope?
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 *   Shift Y:
 *   - How many pixels should non-tile characters be shifted by?
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Path Finding
 * 
 *   Mobile-Enabled?:
 *   - Enable diagonal pathfinding for mobile devices?
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 * 
 * Wall Bump
 * 
 *   Enable?:
 *   - Enable the sound effect to be played when bumping into a wall?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.60: August 29, 2024
 * * Bug Fixes!
 * ** Fixed a bug where events with large hitboxes do not work with crash move.
 *    Fix made by Arisu.
 * ** Fixed a bug where single-mode save games by Save Core would freeze after
 *    executed event movements. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Event Labels will adjust their vertical position to the picture of any
 *    attached event picture if one is present. Update by Arisu.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Picture Type: Enemy>
 * *** <Picture Type: SV Enemy>
 * **** Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
 *      grab a picture graphic from.
 * **** Other picture graphic sprite related notetags will apply as normal.
 * *** <Label Range Type: Square>
 * *** <Label Range Type: Circle>
 * *** <Label Range Type: Diamond>
 * **** Sets a range type for the label to appear visible for.
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Event Label Settings > Visible Range > Range Type:
 * **** What do you want the default label visible range type?
 * 
 * Version 1.59: June 13, 2024
 * * Bug Fixes!
 * ** Added a cache check for character sprite tag names to reduce frame drops.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Location X: +x>, <Location X: -x>
 * *** <Location Y: +y>, <Location Y: -y>
 * *** <Location: +x, +y>, <Location: +x, -y>
 * *** <Location: -x, +y>, <Location: -x, -y>
 * **** Adjusts the initial location of this event by +x and +y (or -x and -y).
 * **** This allows you to stack events on top of each other or even move them
 *      to various places of the map.
 * *** <Tile Expand Up: x>
 * *** <Tile Expand Down: x>
 * *** <Tile Expand Left: x>
 * *** <Tile Expand Right: x>
 * **** Used for events with tile graphics. Expands the graphic up, down, left,
 *      or right from the spritesheet.
 * **** This does NOT expand the hitbox.
 * **** The graphic will be anchored to the tile it's expanded from. This means
 *      even if you expanded downward, the actual event's position will still
 *      be the current event's X/Y coordinates. It's just grown more vertically
 *      and is still centered horizontally.
 * **** This is primarily used to save on having to use too many events for
 *      tiles that expanded past 1x1 tile sizes.
 * 
 * Version 1.58: May 16, 2024
 * * Documentation Update!
 * ** Added "Features: Character Sprite Filename Tags" section.
 * * New Features!
 * ** [Invisible] tag added to character sprite filenames.
 * *** If a character sprite's filename has [invisible] in it, it will become
 *     invisible on the map screen in-game while almost everything else about
 *     it is visible. This is used for those who wish to use sprite labels for
 *     things such as autorun and parallel events.
 * 
 * Version 1.57: March 14, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Plugin Command: "Event Icon: Delete" will now keep an event icon cleared
 *    until the newly added Plugin Command: "Event Icon: Restore" is used.
 *    Update made by Arisu.
 * ** Plugin Command: "Event Icon: Change" is now renamed to have "(Temporary)"
 *    after its name in order to clarify the temporary changes made to it.
 * * New Features!
 * ** New Plugin Command added by Arisu:
 * *** Event Icon: Event Icon: Change (Forced)
 * **** Change the icon that appears on an event.
 * **** This change is forced and needs to be restored.
 * *** Event Icon: Restore
 * **** Restores a deleted or forced icon that appears on an event.
 * 
 * Version 1.56: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added fail safes for activation proximity notetags when loaded from past
 *    save files without Events and Movement Core installed. Added by Arisu.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Encounter Half Square: x>
 * *** <Encounter Half Circle: x>
 * *** <Encounter Half Delta: x>
 * *** <Encounter Half Row: x>
 * *** <Encounter Half Column: x>
 * *** <Encounter None Square: x>
 * *** <Encounter None Circle: x>
 * *** <Encounter None Delta: x>
 * *** <Encounter None Row: x>
 * *** <Encounter None Column: x>
 * **** If the player is within the 'x' area effect of this event, the random
 *      encounter rate will be halved or suppressed completely depending on the
 *      notetag used.
 * **** These include script call checks.
 * *** <Erase if Encounter Half>
 * *** <Erase if Encounter None>
 * **** Automatically erase this event if the player's party has an encounter
 *      half or encounter none effect, or if the event has spawned in an
 *      encounter half or encounter none area.
 * **** This check only occurs in two situations: when the map is first loaded
 *      after being teleported into or when the player leaves a menu and
 *      returns back to the map.
 * **** Events that have been erased due to this effect will NOT return even if
 *      the encounter half/none effect is removed while the player is still on
 *      the map. The event will return if the player exits the map and comes
 *      back.
 * 
 * Version 1.55: December 14, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Event Popup: Player
 * *** Event Popup: Follower
 * *** Event Popup: Event
 * *** Event Popup: Target Tile
 * **** Makes a centered event popup on the player sprite, target follower
 *      sprite, target event sprite, or target tile.
 * **** All of these new Plugin Commands require VisuMZ_1_MessageCore and
 *      cannot be used in battle.
 * 
 * Version 1.54: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated to reduce confusion:
 * *** Call Event: Remote Read
 * **** This will run the page of the target event on the current event.
 * **** This means that any "This Event" commands will be applied to the event
 *      using this Plugin Command and NOT the target event that page data is
 *      being retrieved from.
 * **** Think of it as the current event using the target called event as a
 *      Common Event ala how RPG Maker 2003 works (for those familiar with it).
 * * Feature Update!
 * ** Renamed "Call Event: Remote Activation" to "Call Event: Remote Read" to
 *    reduce confusion.
 * * Feature Update!
 * ** <Activation Radius: x> notetag is now defined as <Activation Delta: x>
 * *** 'Radius' variant will still work and function as 'Delta' but will no
 *     longer be listed in the help file as 'Radius'
 * *** This is changed to avoid confusion with the new notetag.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by AndyL:
 * *** <Activation Circle: x>
 * **** A circle-shaped range with the event at the center.
 * **** 'x' represents the distance from the center.
 * 
 * Version 1.53: August 17, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** <Map Load Common Event: x>
 * ** <Map Load Common Events: x, x, x>
 * *** When this map is loaded, run the specified Common Events once available.
 * **** Does NOT trigger if you transfer to a different part of the same map.
 * 
 * Version 1.52: July 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated help file for <Label: text> notetags:
 * *** If text codes are used, avoid text codes that use < and > wrappers.
 * ** Updated help file for <Label> sandwich notetags:
 * *** You can use text codes with < and > wrappers.
 * * Feature Update!
 * ** Event labels now work properly with scaling sprites.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by Anon:
 * *** <Label Hue Shift: +x>
 * *** <Label Hue Shift: -x>
 * **** Changes the hue of the event label by +x or -x every frame.
 * **** Keep in mind that since this is changing hue, this will appear to have
 *      no effect if you are using black and white labels.
 * **** Use labels with text codes that add color to them like '\C[4]text'
 * **** This only works with the sprite version of event labels and does not
 *      work with the legacy version.
 * 
 * Version 1.51: June 15, 2023
 * * Bug Fixes!
 * ** Provided a fail safe for plugins using the scaling options from this
 *    plugin but do not have scaling parameters identified. The scaling ratio
 *    should now default to 1.0. Fix made by Olivia.
 * * Feature Update!
 * ** Diagonal pathfinding is now improved as to not get stuck on tight corners
 *    on the map. Feature update made by Arisu.
 * 
 * Version 1.50: April 13, 2023
 * * Bug Fixes!
 * ** <Icon: x> should now update correctly when changing pages through self
 *    switches or other event conditions. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Event Labels > Mobile-Enabled?
 * *** Plugin Parameters > Movement > Pathfinding > Mobile-Enabled?
 * **** These settings allow you to enable or disable certain features when
 *      played on mobile devices for better performance.
 * 
 * Version 1.49: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Event Notetag and Comment Tags added by Arisu:
 * *** <Scale: x%>
 * *** <Scale X: x%>
 * *** <Scale Y: y%>
 * **** Changes the scale of the sprite to the designated size.
 * 
 * Version 1.48: January 20, 2023
 * * Feature Update!
 * ** <Move Synch> for certain types will also copy facing directions even if
 *    there are no tile movements (ie changing directions when pressed up
 *    against and obstacle). Update made by Arisu.
 * 
 * Version 1.47: November 10, 2022
 * * Feature Update!
 * ** If "Follower: Set Global Chase" is set to false, followers will no longer
 *    jump towards the player location when the player jumps. This does NOT
 *    apply to gather or location changing players. Followers will still have
 *    to synchronize their positions there regardless in order to maintain
 *    consistency. Update made by Olivia.
 * 
 * Version 1.46: September 29, 2022
 * * Bug Fixes!
 * ** Altered the self switch auto-reset timing to reduce errors. Fix by Arisu.
 * * Feature Update!
 * ** Added self-movement prevention whenever scenes are deactivated. Update
 *    made by Arisu.
 * 
 * Version 1.45: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused event labels with variables from refreshing
 *    properly. Fix made by Arisu.
 * 
 * Version 1.44: July 21, 2022
 * * Bug Fixes!
 * ** Fixed a problem that caused <Exit Reset Self Data> notetag to not work.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Diagonal pathfinding is now disabled when there are too many events on a
 *    map, causing extra collission checks. This value is set to 100 for the
 *    time being until we can figure out a better way to calculate diagonal
 *    pathfinding. Update made by Irina.
 * 
 * Version 1.43: July 14, 2022
 * * Bug Fixes!
 * ** Move to Player for events should no longer cause hang ups. Fix by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added caching function for pathfinding when using touch movement for a
 *    smoother experience. When touch movement is held down, pathfinding will
 *    utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Update made by Arisu.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Playtest>
 * **** If this notetag is found in the event's notebox (NOT comments), then
 *      the event will only appear during a playtest session. It will not
 *      appear in a deployed game where the playtest flag is not on.
 * 
 * Version 1.42: June 23, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added to <Copy Event: x, y> notetag help:
 * *** - If '0' is used for the Map ID, reference the current map.
 * * Feature Update!
 * ** Default MZ behavior would have "below characters" trigger events with
 *    only comments lock out facing "same as characters" trigger events. This
 *    is now bypassed. Update made by Arisu.
 * ** The <Copy Event: mapID, eventID> notetags now allow usage of '0' for the
 *    mapID to reference the current map. Update made by Arisu.
 * ** <Save Event Location> should now work more efficiently. Update by Arisu.
 * ** Dashing animations for followers will no longer look weird after having
 *    gathered up and then proceeding to dash. Update made by Irina.
 * * New Features!
 * ** New event notetag added by Arisu:
 * *** <Exit Reset Self Data>
 * **** When the player leaves the current map, all Self Switches and Self
 *      Variables related to this event will be reset.
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Self Data: Reset All
 * **** Reset the Self Switch and Self Variable data of all events within the
 *      specified map.
 * ** New Plugin Parameter added by Arisu and sponsored by Anon:
 * *** Plugin Params > Movement Settings > Dash > Dash on Ladder?
 * **** Allow dashing while on a ladder or rope?
 * 
 * Version 1.41: June 1, 2022
 * * Bug Fixes!
 * ** Parallel Process Common Events above 1000 should no longer crash the
 *    game. Bug fixed by Irina.
 * 
 * Version 1.40: May 19, 2022
 * * Bug Fixes!
 * ** Sprite Event Labels with distance properties will now work properly
 *    when changing from a non-met page condition to a met page condition.
 *    Fix made by Arisu.
 * 
 * Version 1.39: May 5, 2022
 * * Bug Fixes!
 * ** Save event location should now work properly with Set Event Location
 *    command. Fix made by Arisu.
 * ** Sprite Event Labels with distance properties will no longer be visible
 *    when constantly entering/exiting the Main Menu. Fix made by Arisu.
 * 
 * Version 1.38: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
 * **** How many pixels should non-tile characters be shifted by?
 * ** New Notetags added by Arisu and sponsored by Archeia:
 * *** <Picture Filename: filename>
 * **** applies a picture graphic from the /img/pictures/ folder of your
 *      game project.
 * **** This graphic will be on top of the character sprite but below the event
 *      icon sprite.
 * **** The picture priority will be the same as the event's priority. If it is
 *      "below characters", the player can walk on top of it. If it is "above
 *      characters", the player will behind it. If it is "same as characters",
 *      the priority will be based on the current relative Y position.
 * *** <Picture Max Size: x>
 * *** <Picture Scale: y%>
 * **** If the "Max Size" or "Scale" supplementary notetags are used, the
 *      picture graphic will be scaled proportionally to fit either the exact
 *      pixel size for "Max Size" or the "Scale" ratio.
 * *** <Picture Offset: +x, +y>
 * *** <Picture Offset: -x, -y>
 * **** Offsets the X and Y position of the event picture relative to the event
 *      sprite's own position.
 * *** <Picture Wait Frames: x>
 * **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
 *      Animated Pictures plugin. This determines the delay inbetween
 *      frame changes.
 * 
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Read
 * @desc Runs the page of a different event remotely. This will run
 * the page of the target event on the CURRENT event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change (Temporary)
 * @desc Change the icon that appears on an event.
 * This change is temporary and resets upon new events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChangeForced
 * @text Event Icon: Change (Forced)
 * @desc Change the icon that appears on an event.
 * This change is forced and needs to be restored.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 * This will remain deleted and invisible for events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconRestore
 * @text Event Icon: Restore
 * @desc Restores a deleted or forced icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupPlayer
 * @text Event Popup: Player
 * @desc Makes a centered event popup on the player sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "+\\LastGainObjQuantity\\LastGainObj"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupFollower
 * @text Event Popup: Follower
 * @desc Makes a centered event popup on target follower sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Which follower index to play popup?
 * Index starts at 0. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[23]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupEvent
 * @text Event Popup: Event
 * @desc Makes a centered event popup on target event sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to play popup on.
 * Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "Line1\nLine2"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupTargetTile
 * @text Event Popup: Target Tile
 * @desc Makes a centered event popup on target tile.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg TileX:eval
 * @text Map Tile X
 * @desc The x coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.width() / 2
 *
 * @arg TileY:eval
 * @text Map Tile Y
 * @desc The y coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.height() / 2
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[87]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-24","endOffsetX:eval":"+0","endOffsetY:eval":"-24","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfData
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfDataResetAll
 * @text Self Data: Reset All
 * @desc Reset the Self Switch and Self Variable data of all events
 * within the specified map.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param MobileEnabled:eval
 * @text Mobile-Enabled?
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable event labels for mobile devices?
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 * @param RangeType:str
 * @text Range Type
 * @parent VisibleRange:num
 * @type select
 * @option square
 * @option circle
 * @option diamond
 * @desc What do you want the default label visible range type?
 * @default square
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param DashOnLadder:eval
 * @text Dash On Ladder?
 * @parent Dash
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow dashing while on a ladder or rope?
 * @default false
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Shift Y
 * @parent EventMove
 * @desc How many pixels should non-tile characters be shifted by?
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param PathFind
 * @text Path Finding
 *
 * @param PathfindMobileEnabled:eval
 * @text Mobile-Enabled?
 * @parent PathFind
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable diagonal pathfinding for mobile devices?
 * @default false
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Popup Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PopupExtra:
 *
 * @param Fade
 * @text Fade Settings
 *
 * @param fadeInDuration:eval
 * @text Fade In Duration
 * @parent Fade
 * @desc How many frames does it take to fade in?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param fadeOutDuration:eval
 * @text Fade Out Duration
 * @parent Fade
 * @desc How many frames does it take to fade out?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param Offset
 * @text Offset Settings
 *
 * @param startOffsetX:eval
 * @text Starting Offset X
 * @parent Offset
 * @desc Offsets the starting x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param startOffsetY:eval
 * @text Starting Offset Y
 * @parent Offset
 * @desc Offsets the starting y position. You may use code.
 * Negative: up. Positive: down.
 * @default -48
 *
 * @param endOffsetX:eval
 * @text Ending Offset X
 * @parent Offset
 * @desc Offsets the ending x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param endOffsetY:eval
 * @text Ending Offset Y
 * @parent Offset
 * @desc Offsets the ending y position. You may use code.
 * Negative: up. Positive: down.
 * @default -96
 *
 * @param Scale
 * @text Scaling Settings
 *
 * @param startScaleX:eval
 * @text Starting Scale X
 * @parent Scale
 * @desc What is the starting scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param startScaleY:eval
 * @text Starting Scale Y
 * @parent Scale
 * @desc What is the starting scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleX:eval
 * @text Ending Scale X
 * @parent Scale
 * @desc What is the ending scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleY:eval
 * @text Ending Scale Y
 * @parent Scale
 * @desc What is the ending scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param Angle
 * @text Angle Settings
 *
 * @param startAngle:eval
 * @text Starting Offset Angle
 * @parent Angle
 * @desc What is the starting angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 *
 * @param endAngle:eval
 * @text Ending Offset Angle
 * @parent Angle
 * @desc What is the ending angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 * 
 * @param Misc
 * @text Misc Settings
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Misc
 * @desc This is the height of the popup's trajectory arc
 * in pixels. Positive: up. Negative: down. Code allowed.
 * @default +0
 *
 */
//=============================================================================

const _0x50f639=_0x1273;(function(_0x2945c3,_0x4c32f1){const _0x11ce0b=_0x1273,_0x29ca05=_0x2945c3();while(!![]){try{const _0x20bf24=-parseInt(_0x11ce0b(0x5da))/0x1*(-parseInt(_0x11ce0b(0x2f5))/0x2)+parseInt(_0x11ce0b(0x20d))/0x3+parseInt(_0x11ce0b(0x24c))/0x4+parseInt(_0x11ce0b(0x5e5))/0x5*(-parseInt(_0x11ce0b(0x577))/0x6)+parseInt(_0x11ce0b(0x2e7))/0x7+-parseInt(_0x11ce0b(0x4ad))/0x8+-parseInt(_0x11ce0b(0x61f))/0x9;if(_0x20bf24===_0x4c32f1)break;else _0x29ca05['push'](_0x29ca05['shift']());}catch(_0x1d4627){_0x29ca05['push'](_0x29ca05['shift']());}}}(_0x26fc,0xd6618));var label='EventsMoveCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x50f639(0x25a)](function(_0x274533){const _0xdc22c5=_0x50f639;return _0x274533[_0xdc22c5(0x698)]&&_0x274533['description']['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x50f639(0x55c)]||{},VisuMZ[_0x50f639(0x4f9)]=function(_0x23549a,_0x15b766){const _0x176d13=_0x50f639;for(const _0x3d99db in _0x15b766){if(_0x3d99db[_0x176d13(0x1e7)](/(.*):(.*)/i)){const _0x12d274=String(RegExp['$1']),_0x516b5b=String(RegExp['$2'])[_0x176d13(0x4ab)]()[_0x176d13(0x334)]();let _0x2600b0,_0x498290,_0x4b2341;switch(_0x516b5b){case'NUM':_0x2600b0=_0x15b766[_0x3d99db]!==''?Number(_0x15b766[_0x3d99db]):0x0;break;case _0x176d13(0x35c):_0x498290=_0x15b766[_0x3d99db]!==''?JSON[_0x176d13(0x53e)](_0x15b766[_0x3d99db]):[],_0x2600b0=_0x498290[_0x176d13(0x479)](_0x52cca3=>Number(_0x52cca3));break;case _0x176d13(0x329):_0x2600b0=_0x15b766[_0x3d99db]!==''?eval(_0x15b766[_0x3d99db]):null;break;case'ARRAYEVAL':_0x498290=_0x15b766[_0x3d99db]!==''?JSON[_0x176d13(0x53e)](_0x15b766[_0x3d99db]):[],_0x2600b0=_0x498290[_0x176d13(0x479)](_0x12efe0=>eval(_0x12efe0));break;case _0x176d13(0x45a):_0x2600b0=_0x15b766[_0x3d99db]!==''?JSON[_0x176d13(0x53e)](_0x15b766[_0x3d99db]):'';break;case _0x176d13(0x576):_0x498290=_0x15b766[_0x3d99db]!==''?JSON[_0x176d13(0x53e)](_0x15b766[_0x3d99db]):[],_0x2600b0=_0x498290[_0x176d13(0x479)](_0x4dd152=>JSON[_0x176d13(0x53e)](_0x4dd152));break;case _0x176d13(0x29f):_0x2600b0=_0x15b766[_0x3d99db]!==''?new Function(JSON[_0x176d13(0x53e)](_0x15b766[_0x3d99db])):new Function(_0x176d13(0x4fb));break;case _0x176d13(0x5b8):_0x498290=_0x15b766[_0x3d99db]!==''?JSON['parse'](_0x15b766[_0x3d99db]):[],_0x2600b0=_0x498290['map'](_0xd4e3bb=>new Function(JSON['parse'](_0xd4e3bb)));break;case'STR':_0x2600b0=_0x15b766[_0x3d99db]!==''?String(_0x15b766[_0x3d99db]):'';break;case _0x176d13(0x2d0):_0x498290=_0x15b766[_0x3d99db]!==''?JSON[_0x176d13(0x53e)](_0x15b766[_0x3d99db]):[],_0x2600b0=_0x498290[_0x176d13(0x479)](_0x5e862f=>String(_0x5e862f));break;case'STRUCT':_0x4b2341=_0x15b766[_0x3d99db]!==''?JSON[_0x176d13(0x53e)](_0x15b766[_0x3d99db]):{},_0x23549a[_0x12d274]={},VisuMZ[_0x176d13(0x4f9)](_0x23549a[_0x12d274],_0x4b2341);continue;case _0x176d13(0x654):_0x498290=_0x15b766[_0x3d99db]!==''?JSON[_0x176d13(0x53e)](_0x15b766[_0x3d99db]):[],_0x2600b0=_0x498290[_0x176d13(0x479)](_0x529956=>VisuMZ[_0x176d13(0x4f9)]({},JSON[_0x176d13(0x53e)](_0x529956)));break;default:continue;}_0x23549a[_0x12d274]=_0x2600b0;}}return _0x23549a;},(_0x1451a8=>{const _0xbe9054=_0x50f639,_0x519668=_0x1451a8[_0xbe9054(0x422)];for(const _0x4cc218 of dependencies){if(!Imported[_0x4cc218]){alert(_0xbe9054(0x3ab)[_0xbe9054(0x566)](_0x519668,_0x4cc218)),SceneManager['exit']();break;}}const _0x13e412=_0x1451a8['description'];if(_0x13e412['match'](/\[Version[ ](.*?)\]/i)){const _0x42d11f=Number(RegExp['$1']);_0x42d11f!==VisuMZ[label][_0xbe9054(0x66f)]&&(alert(_0xbe9054(0x669)[_0xbe9054(0x566)](_0x519668,_0x42d11f)),SceneManager[_0xbe9054(0x5b9)]());}if(_0x13e412[_0xbe9054(0x1e7)](/\[Tier[ ](\d+)\]/i)){const _0xa4e230=Number(RegExp['$1']);_0xa4e230<tier?(alert(_0xbe9054(0x37e)['format'](_0x519668,_0xa4e230,tier)),SceneManager[_0xbe9054(0x5b9)]()):tier=Math[_0xbe9054(0x244)](_0xa4e230,tier);}VisuMZ[_0xbe9054(0x4f9)](VisuMZ[label][_0xbe9054(0x55c)],_0x1451a8[_0xbe9054(0x287)]);})(pluginData),VisuMZ[_0x50f639(0x25d)]=function(_0x1f71ba,_0x140b40,_0x5bd84b){switch(_0x5bd84b){case'=':return _0x140b40;break;case'+':return _0x1f71ba+_0x140b40;break;case'-':return _0x1f71ba-_0x140b40;break;case'*':return _0x1f71ba*_0x140b40;break;case'/':return _0x1f71ba/_0x140b40;break;case'%':return _0x1f71ba%_0x140b40;break;}return _0x1f71ba;},PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],'AutoMoveEvents',_0x200b15=>{const _0x1c2884=_0x50f639;VisuMZ[_0x1c2884(0x4f9)](_0x200b15,_0x200b15);switch(_0x200b15[_0x1c2884(0x431)]){case _0x1c2884(0x56e):$gameSystem['setAllowEventAutoMovement'](!![]);break;case _0x1c2884(0x65d):$gameSystem[_0x1c2884(0x2fd)](![]);break;case _0x1c2884(0x5aa):$gameSystem[_0x1c2884(0x2fd)](!$gameSystem[_0x1c2884(0x23c)]());break;}}),PluginManager['registerCommand'](pluginData['name'],_0x50f639(0x66b),_0x4cc774=>{const _0x2dc663=_0x50f639;VisuMZ[_0x2dc663(0x4f9)](_0x4cc774,_0x4cc774);const _0x3e1c21=$gameTemp['getLastPluginCommandInterpreter'](),_0x300eed={'mapId':_0x4cc774[_0x2dc663(0x2fa)],'eventId':_0x4cc774[_0x2dc663(0x413)]||_0x3e1c21[_0x2dc663(0x353)](),'pageId':_0x4cc774[_0x2dc663(0x2f6)]};if(_0x300eed['mapId']<=0x0)_0x300eed[_0x2dc663(0x336)]=$gameMap?$gameMap[_0x2dc663(0x336)]():0x1;$gameTemp['getLastPluginCommandInterpreter']()['pluginCommandCallEvent'](_0x300eed);}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x40a),_0x5d7e78=>{const _0x3f9bba=_0x50f639;VisuMZ[_0x3f9bba(0x4f9)](_0x5d7e78,_0x5d7e78);switch(_0x5d7e78['Value']){case _0x3f9bba(0x472):$gameSystem[_0x3f9bba(0x388)](!![]);break;case _0x3f9bba(0x30d):$gameSystem['setDashingEnabled'](![]);break;case _0x3f9bba(0x5aa):$gameSystem[_0x3f9bba(0x388)](!$gameSystem[_0x3f9bba(0x5b2)]());break;}}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x3df),_0x237f2d=>{const _0x51d588=_0x50f639;VisuMZ[_0x51d588(0x4f9)](_0x237f2d,_0x237f2d);const _0x3874b6=$gameTemp[_0x51d588(0x23f)]();_0x237f2d[_0x51d588(0x2fa)]=_0x237f2d[_0x51d588(0x2fa)]||$gameMap[_0x51d588(0x336)](),$gameSystem[_0x51d588(0x5a7)](_0x237f2d[_0x51d588(0x2fa)],_0x237f2d['EventId']||_0x3874b6[_0x51d588(0x353)](),_0x237f2d[_0x51d588(0x52c)],_0x237f2d[_0x51d588(0x56b)],_0x237f2d[_0x51d588(0x30f)],_0x237f2d[_0x51d588(0x258)],![]);}),PluginManager[_0x50f639(0x528)](pluginData['name'],_0x50f639(0x5a8),_0x47cf26=>{const _0x4f2d85=_0x50f639;VisuMZ['ConvertParams'](_0x47cf26,_0x47cf26);const _0x386ffc=$gameTemp[_0x4f2d85(0x23f)]();_0x47cf26[_0x4f2d85(0x2fa)]=_0x47cf26[_0x4f2d85(0x2fa)]||$gameMap[_0x4f2d85(0x336)](),$gameSystem[_0x4f2d85(0x5a7)](_0x47cf26[_0x4f2d85(0x2fa)],_0x47cf26[_0x4f2d85(0x413)]||_0x386ffc[_0x4f2d85(0x353)](),_0x47cf26[_0x4f2d85(0x52c)],_0x47cf26[_0x4f2d85(0x56b)],_0x47cf26['IconBufferY'],_0x47cf26[_0x4f2d85(0x258)],!![]);}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x37d),_0x1cd1a8=>{const _0x412c4b=_0x50f639;VisuMZ[_0x412c4b(0x4f9)](_0x1cd1a8,_0x1cd1a8);const _0x38cf9c=$gameTemp[_0x412c4b(0x23f)]();_0x1cd1a8[_0x412c4b(0x2fa)]=_0x1cd1a8[_0x412c4b(0x2fa)]||$gameMap[_0x412c4b(0x336)](),$gameSystem[_0x412c4b(0x4ce)](_0x1cd1a8[_0x412c4b(0x2fa)],_0x1cd1a8['EventId']||_0x38cf9c[_0x412c4b(0x353)]());}),PluginManager['registerCommand'](pluginData[_0x50f639(0x422)],_0x50f639(0x592),_0x1f7b36=>{const _0x369f23=_0x50f639;VisuMZ[_0x369f23(0x4f9)](_0x1f7b36,_0x1f7b36);const _0x57c384=$gameTemp[_0x369f23(0x23f)]();_0x1f7b36[_0x369f23(0x2fa)]=_0x1f7b36[_0x369f23(0x2fa)]||$gameMap['mapId'](),$gameSystem['restoreIconsOnEventsDataKey'](_0x1f7b36[_0x369f23(0x2fa)],_0x1f7b36[_0x369f23(0x413)]||_0x57c384[_0x369f23(0x353)]());}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],'EventLabelRefresh',_0x144437=>{const _0x194a29=_0x50f639;if($gameMap)for(const _0x375017 of $gameMap[_0x194a29(0x459)]()){_0x375017[_0x194a29(0x377)](),_0x375017['updateEventLabelText']();}if(SceneManager[_0x194a29(0x2dc)]()){const _0x407da9=SceneManager[_0x194a29(0x58c)][_0x194a29(0x62a)];if(_0x407da9)_0x407da9[_0x194a29(0x679)]();}}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],'EventLabelVisible',_0x595a44=>{const _0x21878a=_0x50f639;VisuMZ['ConvertParams'](_0x595a44,_0x595a44);switch(_0x595a44[_0x21878a(0x62b)]){case _0x21878a(0x523):$gameSystem['setEventLabelsVisible'](!![]);break;case _0x21878a(0x4ff):$gameSystem[_0x21878a(0x5c0)](![]);break;case'Toggle':$gameSystem[_0x21878a(0x5c0)](!$gameSystem[_0x21878a(0x32e)]());break;}}),PluginManager['registerCommand'](pluginData['name'],_0x50f639(0x44f),_0xdd2c24=>{const _0x337a16=_0x50f639;VisuMZ['ConvertParams'](_0xdd2c24,_0xdd2c24);const _0x10f1b8=$gameTemp[_0x337a16(0x23f)]();if(!$gameMap)return;const _0x148bba=$gameMap[_0x337a16(0x5bd)](_0xdd2c24['EventId']||_0x10f1b8['eventId']());if(_0x148bba)_0x148bba[_0x337a16(0x697)]();}),PluginManager[_0x50f639(0x528)](pluginData['name'],_0x50f639(0x209),_0x17718a=>{const _0x359496=_0x50f639;VisuMZ[_0x359496(0x4f9)](_0x17718a,_0x17718a);const _0x4f547a=$gameTemp[_0x359496(0x23f)](),_0x34fdc2=_0x17718a[_0x359496(0x2fa)]||$gameMap[_0x359496(0x336)](),_0xa4a508=_0x17718a[_0x359496(0x413)]||_0x4f547a[_0x359496(0x353)](),_0x2feb73=_0x17718a[_0x359496(0x398)]||0x0,_0x1edaea=_0x17718a[_0x359496(0x65f)]||0x0,_0x206aab=_0x17718a['Direction']||0x2,_0x59641a=((_0x17718a[_0x359496(0x2f6)]||0x1)-0x1)[_0x359496(0x36d)](0x0,0x13),_0x25fa7f=_0x17718a[_0x359496(0x29d)]||0x0;$gameSystem[_0x359496(0x37f)](_0x34fdc2,_0xa4a508,_0x2feb73,_0x1edaea,_0x206aab,_0x59641a,_0x25fa7f);}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x3af),_0x1b7882=>{const _0x23c56a=_0x50f639;VisuMZ[_0x23c56a(0x4f9)](_0x1b7882,_0x1b7882);const _0x46b6a5=$gameTemp[_0x23c56a(0x23f)](),_0x3bd7a5=_0x1b7882[_0x23c56a(0x2fa)]||$gameMap[_0x23c56a(0x336)](),_0x20b023=_0x1b7882[_0x23c56a(0x413)]||_0x46b6a5[_0x23c56a(0x353)]();$gameSystem['deleteSavedEventLocationKey'](_0x3bd7a5,_0x20b023);}),VisuMZ[_0x50f639(0x380)][_0x50f639(0x2ae)]=function(_0x518062,_0x29037c){const _0x56d2a0=_0x50f639;_0x29037c=_0x29037c||{},_0x518062['fadeDuration']={'fadeIn':_0x29037c[_0x56d2a0(0x554)]||0x0,'fadeOut':_0x29037c[_0x56d2a0(0x4af)]||0x0},_0x518062[_0x56d2a0(0x345)]={'x':_0x29037c[_0x56d2a0(0x696)]||0x0,'y':_0x29037c[_0x56d2a0(0x614)]||0x0},_0x518062[_0x56d2a0(0x5d0)]={'x':_0x29037c[_0x56d2a0(0x60d)]||0x0,'y':_0x29037c[_0x56d2a0(0x4e5)]||0x0},_0x518062['endScale']={'x':_0x29037c[_0x56d2a0(0x539)]||0x0,'y':_0x29037c[_0x56d2a0(0x1c9)]||0x0},_0x518062[_0x56d2a0(0x48f)]={'x':_0x29037c[_0x56d2a0(0x5f0)]||0x0,'y':_0x29037c['startScaleY']||0x0},_0x518062['angle']={'start':_0x29037c['startAngle']||0x0,'end':_0x29037c[_0x56d2a0(0x5eb)]||0x0},_0x518062[_0x56d2a0(0x612)]={'arc':_0x29037c[_0x56d2a0(0x672)]||0x0};},PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x1e0),_0x4b172b=>{const _0x28a47d=_0x50f639;if(!SceneManager[_0x28a47d(0x5a9)]())return;if(!Imported[_0x28a47d(0x321)]){$gameTemp['isPlaytest']()&&alert(_0x28a47d(0x433)+'\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!');return;}VisuMZ[_0x28a47d(0x4f9)](_0x4b172b,_0x4b172b);const _0x2ccb80={'text':_0x4b172b['MessageText']||'','duration':Math[_0x28a47d(0x244)](_0x4b172b[_0x28a47d(0x2b7)]||0x3c,0xc)},_0x198074=_0x4b172b['PopupExtra']||{};VisuMZ['EventsMoveCore'][_0x28a47d(0x2ae)](_0x2ccb80,_0x198074);const _0x238d83=SceneManager[_0x28a47d(0x58c)][_0x28a47d(0x62a)];if(_0x238d83){const _0x22de75=$gamePlayer;_0x238d83[_0x28a47d(0x2e5)](_0x22de75,_0x2ccb80);}}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x4cc),_0xac2403=>{const _0x312e7d=_0x50f639;if(!SceneManager[_0x312e7d(0x5a9)]())return;if(!Imported[_0x312e7d(0x321)]){$gameTemp[_0x312e7d(0x38f)]()&&alert(_0x312e7d(0x433)+_0x312e7d(0x3b1));return;}VisuMZ['ConvertParams'](_0xac2403,_0xac2403);const _0x388631=_0xac2403[_0x312e7d(0x3d3)]||0x0,_0x773395={'text':_0xac2403[_0x312e7d(0x51a)]||'','duration':Math[_0x312e7d(0x244)](_0xac2403[_0x312e7d(0x2b7)]||0x3c,0xc)},_0x15935f=_0xac2403[_0x312e7d(0x4f0)]||{};VisuMZ['EventsMoveCore'][_0x312e7d(0x2ae)](_0x773395,_0x15935f);const _0x4e4762=SceneManager[_0x312e7d(0x58c)]['_spriteset'];if(_0x4e4762){const _0x5cd1f2=$gamePlayer[_0x312e7d(0x5d6)]()['follower'](_0x388631);_0x4e4762['createEventsMoveCoreMessagePopup'](_0x5cd1f2,_0x773395);}}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x61c),_0x483d7b=>{const _0x439f7e=_0x50f639;if(!SceneManager[_0x439f7e(0x5a9)]())return;if(!Imported[_0x439f7e(0x321)]){$gameTemp['isPlaytest']()&&alert(_0x439f7e(0x433)+_0x439f7e(0x3b1));return;}VisuMZ['ConvertParams'](_0x483d7b,_0x483d7b);const _0x13b2fb=$gameTemp[_0x439f7e(0x23f)](),_0x543937=_0x483d7b[_0x439f7e(0x413)]||(_0x13b2fb?_0x13b2fb[_0x439f7e(0x353)]():0x1),_0x48fd93={'text':_0x483d7b[_0x439f7e(0x51a)]||'','duration':Math[_0x439f7e(0x244)](_0x483d7b[_0x439f7e(0x2b7)]||0x3c,0xc)},_0x20435d=_0x483d7b[_0x439f7e(0x4f0)]||{};VisuMZ[_0x439f7e(0x380)][_0x439f7e(0x2ae)](_0x48fd93,_0x20435d);const _0x3b2ec4=SceneManager[_0x439f7e(0x58c)][_0x439f7e(0x62a)];if(_0x3b2ec4){const _0x4175af=$gameMap[_0x439f7e(0x5bd)](_0x543937);_0x3b2ec4[_0x439f7e(0x2e5)](_0x4175af,_0x48fd93);}}),PluginManager[_0x50f639(0x528)](pluginData['name'],_0x50f639(0x69c),_0x289b90=>{const _0x38e7c9=_0x50f639;if(!SceneManager['isInstanceOfSceneMap']())return;if(!Imported['VisuMZ_1_MessageCore']){$gameTemp[_0x38e7c9(0x38f)]()&&alert(_0x38e7c9(0x433)+_0x38e7c9(0x3b1));return;}VisuMZ[_0x38e7c9(0x4f9)](_0x289b90,_0x289b90);const _0x2e52c7={'text':_0x289b90[_0x38e7c9(0x51a)]||'','duration':Math[_0x38e7c9(0x244)](_0x289b90[_0x38e7c9(0x2b7)]||0x3c,0xc),'tileCoordinates':{'x':Math[_0x38e7c9(0x452)](_0x289b90['TileX']||0x0),'y':Math[_0x38e7c9(0x452)](_0x289b90[_0x38e7c9(0x53c)]||0x0)}},_0x19a0fd=_0x289b90[_0x38e7c9(0x4f0)]||{};VisuMZ['EventsMoveCore']['ApplyPopupExtraSettings'](_0x2e52c7,_0x19a0fd);const _0x5b99ea=SceneManager['_scene'][_0x38e7c9(0x62a)];_0x5b99ea&&_0x5b99ea[_0x38e7c9(0x618)](_0x2e52c7);}),PluginManager['registerCommand'](pluginData[_0x50f639(0x422)],_0x50f639(0x421),_0x47cbdf=>{const _0x1fcd4e=_0x50f639;VisuMZ[_0x1fcd4e(0x4f9)](_0x47cbdf,_0x47cbdf);const _0x478484=_0x47cbdf[_0x1fcd4e(0x494)];$gameTimer[_0x1fcd4e(0x463)](_0x478484);}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],'EventTimerExpireClear',_0x3039f2=>{$gameTimer['setCommonEvent'](0x0);}),PluginManager['registerCommand'](pluginData[_0x50f639(0x422)],_0x50f639(0x3fb),_0x5a8f7d=>{const _0x1f9080=_0x50f639;if(!$gameTimer['isWorking']())return;VisuMZ[_0x1f9080(0x4f9)](_0x5a8f7d,_0x5a8f7d);let _0x1a7604=0x0;_0x1a7604+=_0x5a8f7d[_0x1f9080(0x44c)],_0x1a7604+=_0x5a8f7d[_0x1f9080(0x570)]*0x3c,_0x1a7604+=_0x5a8f7d[_0x1f9080(0x660)]*0x3c*0x3c,_0x1a7604+=_0x5a8f7d[_0x1f9080(0x3fa)]*0x3c*0x3c*0x3c,$gameTimer[_0x1f9080(0x68a)](_0x1a7604);}),PluginManager['registerCommand'](pluginData[_0x50f639(0x422)],_0x50f639(0x43d),_0xbf0aa2=>{const _0x347bbf=_0x50f639;if(!$gameTimer[_0x347bbf(0x456)]())return;VisuMZ[_0x347bbf(0x4f9)](_0xbf0aa2,_0xbf0aa2);let _0x55fb63=0x0;_0x55fb63+=_0xbf0aa2[_0x347bbf(0x44c)],_0x55fb63+=_0xbf0aa2['Seconds']*0x3c,_0x55fb63+=_0xbf0aa2[_0x347bbf(0x660)]*0x3c*0x3c,_0x55fb63+=_0xbf0aa2['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x347bbf(0x442)](_0x55fb63);}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x565),_0x2cd3fe=>{const _0x2681c7=_0x50f639;if(!$gameTimer['isWorking']())return;$gameTimer[_0x2681c7(0x3eb)]();}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x695),_0x4644fc=>{const _0x295c39=_0x50f639;if(!$gameTimer[_0x295c39(0x456)]())return;$gameTimer[_0x295c39(0x408)]();}),PluginManager['registerCommand'](pluginData[_0x50f639(0x422)],_0x50f639(0x4cd),_0x37e39f=>{const _0xdb8525=_0x50f639;VisuMZ[_0xdb8525(0x4f9)](_0x37e39f,_0x37e39f);const _0x2f14f9=_0x37e39f[_0xdb8525(0x4fd)]||0x0;$gameTimer[_0xdb8525(0x3ce)](_0x2f14f9);}),PluginManager['registerCommand'](pluginData[_0x50f639(0x422)],'FollowerSetGlobalChase',_0x4b8a5b=>{const _0x4f00c8=_0x50f639;VisuMZ[_0x4f00c8(0x4f9)](_0x4b8a5b,_0x4b8a5b);const _0x9a0ac0=!_0x4b8a5b[_0x4f00c8(0x1f8)];$gameSystem['setStopFollowerChasing'](_0x9a0ac0);}),PluginManager['registerCommand'](pluginData[_0x50f639(0x422)],'FollowerSetTargetChase',_0x26f527=>{const _0x271847=_0x50f639;VisuMZ['ConvertParams'](_0x26f527,_0x26f527);const _0x4f9a15=(_0x26f527['FollowerID']||0x0)-0x1,_0x48ccd7=!_0x26f527[_0x271847(0x1f8)],_0x110695=$gamePlayer[_0x271847(0x5d6)]()[_0x271847(0x2bc)](_0x4f9a15);if(_0x110695)_0x110695['setChaseOff'](_0x48ccd7);}),PluginManager['registerCommand'](pluginData[_0x50f639(0x422)],_0x50f639(0x3a9),_0x1184b6=>{const _0x3c6e0d=_0x50f639;VisuMZ[_0x3c6e0d(0x4f9)](_0x1184b6,_0x1184b6);const _0x516d5d=_0x1184b6[_0x3c6e0d(0x4f5)];$gameSystem[_0x3c6e0d(0x4c5)](_0x516d5d);}),PluginManager['registerCommand'](pluginData[_0x50f639(0x422)],'FollowerReset',_0x453617=>{const _0x584c84=_0x50f639;VisuMZ[_0x584c84(0x4f9)](_0x453617,_0x453617),$gameSystem['setControlledFollowerID'](0x0),$gameSystem[_0x584c84(0x550)](![]);for(const _0x3bfa65 of $gamePlayer[_0x584c84(0x5d6)]()[_0x584c84(0x42f)]){if(_0x3bfa65)_0x3bfa65['setChaseOff'](![]);}}),PluginManager['registerCommand'](pluginData[_0x50f639(0x422)],'SwitchGetSelfSwitchABCD',_0x3b31e1=>{const _0x43dfd3=_0x50f639;VisuMZ[_0x43dfd3(0x4f9)](_0x3b31e1,_0x3b31e1);const _0x56abd2=$gameTemp[_0x43dfd3(0x23f)]();_0x3b31e1[_0x43dfd3(0x2fa)]=_0x3b31e1[_0x43dfd3(0x2fa)]||$gameMap['mapId']();const _0x39757f=[_0x3b31e1['MapId'],_0x3b31e1['EventId']||_0x56abd2['eventId'](),_0x3b31e1[_0x43dfd3(0x35a)]],_0x32101b=_0x3b31e1[_0x43dfd3(0x48b)],_0x5c5671=$gameSelfSwitches[_0x43dfd3(0x264)](_0x39757f)||![];$gameSwitches[_0x43dfd3(0x337)](_0x32101b,_0x5c5671);}),PluginManager['registerCommand'](pluginData[_0x50f639(0x422)],_0x50f639(0x600),_0x216752=>{const _0x52be92=_0x50f639;VisuMZ[_0x52be92(0x4f9)](_0x216752,_0x216752);const _0x4bb065=$gameTemp[_0x52be92(0x23f)]();_0x216752[_0x52be92(0x2fa)]=_0x216752[_0x52be92(0x2fa)]||$gameMap[_0x52be92(0x336)]();const _0x325772=[_0x216752['MapId'],_0x216752['EventId']||_0x4bb065[_0x52be92(0x353)](),_0x52be92(0x36f)[_0x52be92(0x566)](_0x216752[_0x52be92(0x689)])],_0xdc7cda=_0x216752['TargetSwitchId'],_0x1926f2=$gameSelfSwitches[_0x52be92(0x264)](_0x325772)||![];$gameSwitches['setValue'](_0xdc7cda,_0x1926f2);}),PluginManager['registerCommand'](pluginData['name'],_0x50f639(0x307),_0x48867d=>{const _0x443354=_0x50f639;VisuMZ[_0x443354(0x4f9)](_0x48867d,_0x48867d);const _0x21dab7=$gameTemp[_0x443354(0x23f)]();_0x48867d[_0x443354(0x2fa)]=_0x48867d[_0x443354(0x2fa)]||$gameMap[_0x443354(0x336)]();const _0x115f52=[_0x48867d[_0x443354(0x2fa)],_0x48867d['EventId']||_0x21dab7[_0x443354(0x353)](),_0x443354(0x266)['format'](_0x48867d['VariableId'])],_0x3b6739=_0x48867d['TargetVariableId'],_0x1ead98=$gameSelfSwitches[_0x443354(0x264)](_0x115f52)||![];$gameVariables['setValue'](_0x3b6739,_0x1ead98);}),PluginManager[_0x50f639(0x528)](pluginData['name'],_0x50f639(0x469),_0x116e37=>{const _0x52b425=_0x50f639;VisuMZ[_0x52b425(0x4f9)](_0x116e37,_0x116e37);if(!$gameMap)return;const _0x2f9fb1=$gameTemp[_0x52b425(0x23f)](),_0x14b82f=_0x116e37['Step2Preserve'];_0x116e37[_0x52b425(0x647)]=_0x116e37[_0x52b425(0x647)]||$gameMap[_0x52b425(0x336)](),_0x116e37['Step2MapId']=_0x116e37[_0x52b425(0x207)]||$gameMap[_0x52b425(0x336)](),_0x116e37[_0x52b425(0x4e2)]=_0x116e37[_0x52b425(0x4e2)][_0x52b425(0x4ab)]()['trim']();if(!_0x14b82f&&_0x116e37[_0x52b425(0x647)]!==$gameMap[_0x52b425(0x336)]())return;if($gameMap['mapId']()===_0x116e37[_0x52b425(0x647)]){const _0x357a1d=$gameMap[_0x52b425(0x5bd)](_0x116e37[_0x52b425(0x394)]||_0x2f9fb1['eventId']());if(!_0x357a1d)return;_0x116e37[_0x52b425(0x4e2)]!==_0x52b425(0x3b9)?_0x357a1d['morphIntoTemplate'](_0x116e37[_0x52b425(0x4e2)]):_0x357a1d[_0x52b425(0x646)](_0x116e37[_0x52b425(0x207)],_0x116e37[_0x52b425(0x68e)]||_0x2f9fb1['eventId']());}_0x14b82f&&$gameSystem[_0x52b425(0x485)](_0x116e37[_0x52b425(0x647)],_0x116e37[_0x52b425(0x394)],_0x116e37[_0x52b425(0x4e2)],_0x116e37[_0x52b425(0x207)],_0x116e37[_0x52b425(0x68e)]);}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x493),_0x17b9be=>{const _0x375c6b=_0x50f639;VisuMZ['ConvertParams'](_0x17b9be,_0x17b9be);if(!$gameMap)return;const _0xdea72f=$gameTemp['getLastPluginCommandInterpreter']();_0x17b9be[_0x375c6b(0x2fa)]=_0x17b9be[_0x375c6b(0x2fa)]||$gameMap[_0x375c6b(0x336)]();if($gameMap[_0x375c6b(0x336)]()===_0x17b9be[_0x375c6b(0x2fa)]){const _0x53e882=$gameMap[_0x375c6b(0x5bd)](_0x17b9be[_0x375c6b(0x413)]||_0xdea72f[_0x375c6b(0x353)]());_0x53e882[_0x375c6b(0x299)]();}_0x17b9be[_0x375c6b(0x52a)]&&$gameSystem[_0x375c6b(0x1de)](_0x17b9be[_0x375c6b(0x2fa)],_0x17b9be[_0x375c6b(0x413)]||_0xdea72f[_0x375c6b(0x353)]());}),PluginManager[_0x50f639(0x528)](pluginData['name'],_0x50f639(0x2c9),_0x27f6f0=>{const _0x188d82=_0x50f639;VisuMZ['ConvertParams'](_0x27f6f0,_0x27f6f0),$gameSystem[_0x188d82(0x4a7)]($gamePlayer,_0x27f6f0[_0x188d82(0x52c)],_0x27f6f0['IconBufferX'],_0x27f6f0[_0x188d82(0x30f)],_0x27f6f0[_0x188d82(0x258)]);}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x250),_0x153fa0=>{const _0x24d11d=_0x50f639;VisuMZ[_0x24d11d(0x4f9)](_0x153fa0,_0x153fa0),$gameSystem[_0x24d11d(0x3ee)]($gamePlayer);}),PluginManager[_0x50f639(0x528)](pluginData['name'],_0x50f639(0x1e4),_0x5e0151=>{const _0x147a49=_0x50f639;VisuMZ[_0x147a49(0x4f9)](_0x5e0151,_0x5e0151),$gameSystem[_0x147a49(0x245)](!_0x5e0151[_0x147a49(0x472)]);}),PluginManager[_0x50f639(0x528)](pluginData['name'],'PlayerMovementDiagonal',_0x3aaade=>{const _0x259595=_0x50f639;VisuMZ[_0x259595(0x4f9)](_0x3aaade,_0x3aaade),$gameSystem['setPlayerDiagonalSetting'](_0x3aaade[_0x259595(0x4a8)]);}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x496),_0x5f04cd=>{const _0x399a76=_0x50f639;VisuMZ[_0x399a76(0x4f9)](_0x5f04cd,_0x5f04cd);const _0x559b75=_0x5f04cd['MapId']||$gameMap[_0x399a76(0x336)]();$gameSelfSwitches[_0x399a76(0x405)](_0x559b75);}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x5a3),_0xc7adbe=>{const _0x334081=_0x50f639;VisuMZ[_0x334081(0x4f9)](_0xc7adbe,_0xc7adbe);const _0x3a3cf3=$gameTemp[_0x334081(0x23f)]();_0xc7adbe[_0x334081(0x2fa)]=_0xc7adbe[_0x334081(0x2fa)]||$gameMap[_0x334081(0x336)]();const _0x24ac60=[_0xc7adbe[_0x334081(0x2fa)],_0xc7adbe[_0x334081(0x413)]||_0x3a3cf3[_0x334081(0x353)](),_0xc7adbe[_0x334081(0x35a)]];switch(_0xc7adbe[_0x334081(0x431)]){case'ON':$gameSelfSwitches[_0x334081(0x337)](_0x24ac60,!![]);break;case _0x334081(0x5bc):$gameSelfSwitches[_0x334081(0x337)](_0x24ac60,![]);break;case _0x334081(0x5aa):$gameSelfSwitches[_0x334081(0x337)](_0x24ac60,!$gameSelfSwitches[_0x334081(0x264)](_0x24ac60));break;}}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x396),_0x103b02=>{const _0x3929df=_0x50f639;VisuMZ[_0x3929df(0x4f9)](_0x103b02,_0x103b02);const _0x255f2a=$gameTemp[_0x3929df(0x23f)]();_0x103b02['MapId']=_0x103b02[_0x3929df(0x2fa)]||$gameMap[_0x3929df(0x336)]();const _0x4e8c33=[_0x103b02[_0x3929df(0x2fa)],_0x103b02['EventId']||_0x255f2a['eventId'](),_0x3929df(0x36f)[_0x3929df(0x566)](_0x103b02[_0x3929df(0x689)])];switch(_0x103b02[_0x3929df(0x431)]){case'ON':$gameSelfSwitches['setValue'](_0x4e8c33,!![]);break;case _0x3929df(0x5bc):$gameSelfSwitches['setValue'](_0x4e8c33,![]);break;case _0x3929df(0x5aa):$gameSelfSwitches[_0x3929df(0x337)](_0x4e8c33,!$gameSelfSwitches[_0x3929df(0x264)](_0x4e8c33));break;}}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x5d1),_0x362a50=>{const _0x3ccbe0=_0x50f639;VisuMZ[_0x3ccbe0(0x4f9)](_0x362a50,_0x362a50);const _0x14e589=$gameTemp['getLastPluginCommandInterpreter']();_0x362a50[_0x3ccbe0(0x2fa)]=_0x362a50['MapId']||$gameMap[_0x3ccbe0(0x336)]();const _0xb75ec2=[_0x362a50[_0x3ccbe0(0x2fa)],_0x362a50[_0x3ccbe0(0x413)]||_0x14e589[_0x3ccbe0(0x353)](),_0x3ccbe0(0x266)[_0x3ccbe0(0x566)](_0x362a50['VariableId'])],_0x14c5ec=VisuMZ[_0x3ccbe0(0x25d)]($gameSelfSwitches[_0x3ccbe0(0x264)](_0xb75ec2),_0x362a50[_0x3ccbe0(0x431)],_0x362a50[_0x3ccbe0(0x65b)]);$gameSelfSwitches[_0x3ccbe0(0x337)](_0xb75ec2,_0x14c5ec);}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x44d),_0x11c566=>{const _0x52f4b5=_0x50f639;VisuMZ['ConvertParams'](_0x11c566,_0x11c566);const _0x2b2d54=$gameTemp[_0x52f4b5(0x23f)](),_0x3132c3={'template':_0x11c566[_0x52f4b5(0x4e2)],'mapId':_0x11c566['MapId']||$gameMap[_0x52f4b5(0x336)](),'eventId':_0x11c566[_0x52f4b5(0x413)]||_0x2b2d54['eventId'](),'x':_0x11c566[_0x52f4b5(0x398)],'y':_0x11c566['PosY'],'spawnPreserved':_0x11c566['Preserve'],'spawnEventId':$gameMap[_0x52f4b5(0x69e)][_0x52f4b5(0x622)]+0x3e8},_0x1035fa=_0x11c566[_0x52f4b5(0x226)]||0x0;if(!VisuMZ[_0x52f4b5(0x2bf)][_0x3132c3[_0x52f4b5(0x336)]]&&_0x3132c3[_0x52f4b5(0x336)]!==$gameMap['mapId']()){let _0xcd6c4e='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'['format'](_0x3132c3['mapId']);_0xcd6c4e+=_0x52f4b5(0x351),_0xcd6c4e+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0xcd6c4e+=_0x52f4b5(0x644),_0xcd6c4e+=_0x52f4b5(0x3c0)[_0x52f4b5(0x566)](_0x3132c3[_0x52f4b5(0x336)]),alert(_0xcd6c4e);return;}const _0x487088=$gameMap[_0x52f4b5(0x3bf)](_0x3132c3,_0x11c566[_0x52f4b5(0x4bd)],_0x11c566[_0x52f4b5(0x2c5)]);_0x1035fa&&$gameSwitches[_0x52f4b5(0x337)](_0x1035fa,!!_0x487088);}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x270),_0x30abb7=>{const _0x37167b=_0x50f639;VisuMZ[_0x37167b(0x4f9)](_0x30abb7,_0x30abb7);const _0x33ae4f=$gameTemp[_0x37167b(0x23f)](),_0x408446={'template':_0x30abb7[_0x37167b(0x4e2)],'mapId':_0x30abb7[_0x37167b(0x2fa)]||$gameMap[_0x37167b(0x336)](),'eventId':_0x30abb7[_0x37167b(0x413)]||_0x33ae4f[_0x37167b(0x353)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x30abb7['Preserve'],'spawnEventId':$gameMap[_0x37167b(0x69e)]['length']+0x3e8},_0x4d1315=_0x30abb7[_0x37167b(0x226)]||0x0;if(!VisuMZ['PreloadedMaps'][_0x408446[_0x37167b(0x336)]]&&_0x408446['mapId']!==$gameMap['mapId']()){let _0x448f07=_0x37167b(0x66a)[_0x37167b(0x566)](_0x408446['mapId']);_0x448f07+=_0x37167b(0x351),_0x448f07+=_0x37167b(0x59a),_0x448f07+=_0x37167b(0x644),_0x448f07+=_0x37167b(0x3c0)[_0x37167b(0x566)](_0x408446[_0x37167b(0x336)]),alert(_0x448f07);return;}const _0x1493d4=$gameMap[_0x37167b(0x593)](_0x408446,_0x30abb7[_0x37167b(0x1f9)],_0x30abb7[_0x37167b(0x4bd)],_0x30abb7[_0x37167b(0x2c5)]);_0x4d1315&&$gameSwitches[_0x37167b(0x337)](_0x4d1315,!!_0x1493d4);}),PluginManager['registerCommand'](pluginData[_0x50f639(0x422)],_0x50f639(0x535),_0x1122f3=>{const _0x5e69b5=_0x50f639;VisuMZ[_0x5e69b5(0x4f9)](_0x1122f3,_0x1122f3);const _0x17dba7=$gameTemp['getLastPluginCommandInterpreter'](),_0x4142d5={'template':_0x1122f3[_0x5e69b5(0x4e2)],'mapId':_0x1122f3[_0x5e69b5(0x2fa)]||$gameMap[_0x5e69b5(0x336)](),'eventId':_0x1122f3['EventId']||_0x17dba7[_0x5e69b5(0x353)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x1122f3['Preserve'],'spawnEventId':$gameMap[_0x5e69b5(0x69e)][_0x5e69b5(0x622)]+0x3e8},_0x54b668=_0x1122f3[_0x5e69b5(0x226)]||0x0;if(!VisuMZ[_0x5e69b5(0x2bf)][_0x4142d5[_0x5e69b5(0x336)]]&&_0x4142d5[_0x5e69b5(0x336)]!==$gameMap[_0x5e69b5(0x336)]()){let _0x4b800d=_0x5e69b5(0x66a)['format'](_0x4142d5[_0x5e69b5(0x336)]);_0x4b800d+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x4b800d+=_0x5e69b5(0x59a),_0x4b800d+=_0x5e69b5(0x644),_0x4b800d+=_0x5e69b5(0x3c0)[_0x5e69b5(0x566)](_0x4142d5[_0x5e69b5(0x336)]),alert(_0x4b800d);return;}const _0x10c826=$gameMap['prepareSpawnedEventAtTerrainTag'](_0x4142d5,_0x1122f3[_0x5e69b5(0x536)],_0x1122f3['Collision'],_0x1122f3[_0x5e69b5(0x2c5)]);_0x54b668&&$gameSwitches[_0x5e69b5(0x337)](_0x54b668,!!_0x10c826);}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x5f9),_0x323995=>{const _0x5523bd=_0x50f639;VisuMZ[_0x5523bd(0x4f9)](_0x323995,_0x323995);const _0x235d1d=$gameTemp[_0x5523bd(0x23f)]();$gameMap[_0x5523bd(0x6a1)](_0x323995[_0x5523bd(0x1ca)]||_0x235d1d[_0x5523bd(0x353)]());}),PluginManager['registerCommand'](pluginData[_0x50f639(0x422)],_0x50f639(0x553),_0x3aa5c7=>{const _0x4ad356=_0x50f639;VisuMZ[_0x4ad356(0x4f9)](_0x3aa5c7,_0x3aa5c7);const _0x5e1fcf=_0x3aa5c7[_0x4ad356(0x398)],_0x533f5f=_0x3aa5c7[_0x4ad356(0x65f)];$gameMap[_0x4ad356(0x2f8)](_0x5e1fcf,_0x533f5f);}),PluginManager['registerCommand'](pluginData['name'],'SpawnEventDespawnRegions',_0x4935d3=>{const _0x267d94=_0x50f639;VisuMZ['ConvertParams'](_0x4935d3,_0x4935d3),$gameMap['despawnRegions'](_0x4935d3[_0x267d94(0x1f9)]);}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],'SpawnEventDespawnTerrainTags',_0x544618=>{const _0x8ccbb3=_0x50f639;VisuMZ[_0x8ccbb3(0x4f9)](_0x544618,_0x544618),$gameMap[_0x8ccbb3(0x63b)](_0x544618[_0x8ccbb3(0x536)]);}),PluginManager[_0x50f639(0x528)](pluginData[_0x50f639(0x422)],_0x50f639(0x51e),_0x49aafa=>{const _0x211941=_0x50f639;VisuMZ[_0x211941(0x4f9)](_0x49aafa,_0x49aafa),$gameMap[_0x211941(0x233)]();}),VisuMZ['EventsMoveCore'][_0x50f639(0x2be)]=Scene_Boot['prototype'][_0x50f639(0x2f4)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x38c93c=_0x50f639;VisuMZ[_0x38c93c(0x380)][_0x38c93c(0x2be)][_0x38c93c(0x673)](this),this[_0x38c93c(0x517)](),this[_0x38c93c(0x441)]();if(VisuMZ[_0x38c93c(0x380)][_0x38c93c(0x60a)])VisuMZ[_0x38c93c(0x380)][_0x38c93c(0x60a)][_0x38c93c(0x378)]();},VisuMZ[_0x50f639(0x2bf)]=[],VisuMZ['EventTemplates']={},Scene_Boot[_0x50f639(0x346)]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x4c67e5=_0x50f639;if(DataManager[_0x4c67e5(0x35d)]()||DataManager[_0x4c67e5(0x3fe)]())return;const _0x4b7fcd=VisuMZ['EventsMoveCore'][_0x4c67e5(0x55c)][_0x4c67e5(0x2ea)],_0x399c45=_0x4b7fcd[_0x4c67e5(0x309)][_0x4c67e5(0x25c)](0x0);for(const _0x577b72 of _0x4b7fcd[_0x4c67e5(0x251)]){_0x577b72[_0x4c67e5(0x1ee)]=_0x577b72[_0x4c67e5(0x1ee)]['toUpperCase']()[_0x4c67e5(0x334)](),VisuMZ[_0x4c67e5(0x546)][_0x577b72[_0x4c67e5(0x1ee)]]=_0x577b72;if(!_0x399c45[_0x4c67e5(0x292)](_0x577b72[_0x4c67e5(0x64b)]))_0x399c45['push'](_0x577b72[_0x4c67e5(0x64b)]);}for(const _0x310bdc of _0x399c45){if(VisuMZ[_0x4c67e5(0x2bf)][_0x310bdc])continue;const _0x1f2fcf=_0x4c67e5(0x363)['format'](_0x310bdc[_0x4c67e5(0x677)](0x3)),_0x206de8=_0x4c67e5(0x42e)[_0x4c67e5(0x566)](_0x310bdc);DataManager[_0x4c67e5(0x39e)](_0x206de8,_0x1f2fcf),setTimeout(this[_0x4c67e5(0x352)]['bind'](this,_0x310bdc,_0x206de8),0x64);}},Scene_Boot['prototype'][_0x50f639(0x352)]=function(_0x5d4de3,_0xd04933){const _0x179a1e=_0x50f639;window[_0xd04933]?(VisuMZ[_0x179a1e(0x2bf)][_0x5d4de3]=window[_0xd04933],window[_0xd04933]=undefined):setTimeout(this[_0x179a1e(0x352)][_0x179a1e(0x603)](this,_0x5d4de3,_0xd04933),0x64);},VisuMZ['AdvancedSwitches']=[],VisuMZ['SelfSwitches']=[],VisuMZ[_0x50f639(0x5ae)]=[],VisuMZ[_0x50f639(0x3f7)]=[],VisuMZ[_0x50f639(0x3b2)]=[],VisuMZ[_0x50f639(0x37c)]=[],Scene_Boot[_0x50f639(0x346)][_0x50f639(0x441)]=function(){const _0x45a0bf=_0x50f639;for(let _0x1900a9=0x1;_0x1900a9<$dataSystem['switches'][_0x45a0bf(0x622)];_0x1900a9++){if($dataSystem['switches'][_0x1900a9][_0x45a0bf(0x1e7)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedSwitches']['push'](_0x1900a9);if($dataSystem[_0x45a0bf(0x5cd)][_0x1900a9][_0x45a0bf(0x1e7)](/<SELF>/i))VisuMZ[_0x45a0bf(0x525)]['push'](_0x1900a9);if($dataSystem[_0x45a0bf(0x5cd)][_0x1900a9]['match'](/<MAP>/i))VisuMZ['MapSwitches'][_0x45a0bf(0x5d9)](_0x1900a9);}for(let _0x48901d=0x1;_0x48901d<$dataSystem[_0x45a0bf(0x255)]['length'];_0x48901d++){if($dataSystem[_0x45a0bf(0x255)][_0x48901d][_0x45a0bf(0x1e7)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x45a0bf(0x3f7)]['push'](_0x48901d);if($dataSystem['variables'][_0x48901d]['match'](/<SELF>/i))VisuMZ[_0x45a0bf(0x3b2)][_0x45a0bf(0x5d9)](_0x48901d);if($dataSystem[_0x45a0bf(0x255)][_0x48901d][_0x45a0bf(0x1e7)](/<MAP>/i))VisuMZ[_0x45a0bf(0x37c)][_0x45a0bf(0x5d9)](_0x48901d);}},VisuMZ['EventsMoveCore']['CustomPageConditions']={},VisuMZ[_0x50f639(0x380)][_0x50f639(0x60a)][_0x50f639(0x378)]=function(){const _0x4aa411=_0x50f639;this[_0x4aa411(0x4bf)]=new Game_CPCInterpreter(),this[_0x4aa411(0x623)]();},VisuMZ['EventsMoveCore'][_0x50f639(0x60a)][_0x50f639(0x623)]=function(){const _0x3fc77c=_0x50f639;this[_0x3fc77c(0x38c)]=[];for(const _0x31b26f of $dataCommonEvents){if(!_0x31b26f)continue;VisuMZ[_0x3fc77c(0x380)][_0x3fc77c(0x60a)][_0x3fc77c(0x648)](_0x31b26f);if(_0x31b26f[_0x3fc77c(0x25b)][_0x3fc77c(0x622)]>0x0)this[_0x3fc77c(0x38c)][_0x3fc77c(0x5d9)](_0x31b26f['id']);}},VisuMZ[_0x50f639(0x380)]['CustomPageConditions']['metCPC']=function(_0x344ea1,_0x47d599,_0x24e640){const _0x32d9b1=_0x50f639;return this[_0x32d9b1(0x4bf)]['setup'](_0x344ea1,_0x47d599),_0x24e640?this[_0x32d9b1(0x4bf)][_0x32d9b1(0x225)](_0x24e640):this[_0x32d9b1(0x4bf)][_0x32d9b1(0x504)](),this[_0x32d9b1(0x4bf)]['_cpc'];},VisuMZ['EventsMoveCore'][_0x50f639(0x60a)][_0x50f639(0x648)]=function(_0x4e3944){const _0x848c5c=_0x50f639;let _0x26f20b=![];_0x4e3944['CPC']=[];for(const _0x5aacd3 of _0x4e3944['list']){if([0x6c,0x198]['includes'](_0x5aacd3['code'])){const _0x4fe8dc=_0x5aacd3[_0x848c5c(0x287)][0x0];if(_0x4fe8dc[_0x848c5c(0x1e7)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x26f20b=!![];else _0x4fe8dc['match'](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x26f20b=![]);}_0x26f20b&&_0x4e3944[_0x848c5c(0x25b)][_0x848c5c(0x5d9)](_0x5aacd3);}},getSelfSwitchValue=function(_0x1561ea,_0x494440,_0x184133){const _0x4e19d5=_0x50f639;let _0x48690a=[_0x1561ea,_0x494440,_0x4e19d5(0x36f)[_0x4e19d5(0x566)](_0x184133)];return typeof _0x184133==='string'&&(_0x48690a=[_0x1561ea,_0x494440,_0x184133[_0x4e19d5(0x4ab)]()['trim']()]),$gameSelfSwitches['value'](_0x48690a);},getMapSwitchValue=function(_0x11af53,_0x4f4fcc){const _0x190520=_0x50f639;let _0x153a0e=[0x0,0x0,_0x190520(0x474)[_0x190520(0x566)](_0x11af53,_0x4f4fcc)];return $gameSelfSwitches[_0x190520(0x264)](_0x153a0e);},getMapVariableValue=function(_0x44aeba,_0xebc409){const _0x50b487=_0x50f639;let _0x2c3b6a=[0x0,0x0,_0x50b487(0x4ef)[_0x50b487(0x566)](_0x44aeba,_0xebc409)];return $gameSelfSwitches[_0x50b487(0x264)](_0x2c3b6a);},getSelfVariableValue=function(_0x48f613,_0x4bc69f,_0x353afe){const _0x4ceff4=_0x50f639,_0x50fef8=[_0x48f613,_0x4bc69f,_0x4ceff4(0x266)['format'](_0x353afe)];return $gameSelfSwitches[_0x4ceff4(0x264)](_0x50fef8);},setSelfSwitchValue=function(_0x48fb49,_0x1b69d1,_0x225b94,_0x152bad){const _0x3e5885=_0x50f639;let _0x3f148f=[_0x48fb49,_0x1b69d1,_0x3e5885(0x36f)[_0x3e5885(0x566)](_0x225b94)];typeof _0x225b94===_0x3e5885(0x5b1)&&(_0x3f148f=[_0x48fb49,_0x1b69d1,_0x225b94[_0x3e5885(0x4ab)]()[_0x3e5885(0x334)]()]),$gameSelfSwitches[_0x3e5885(0x337)](_0x3f148f,_0x152bad);},setSelfVariableValue=function(_0x71fdfe,_0xf805a5,_0x44a05e,_0x1e965b){const _0x2855b1=_0x50f639,_0x2527cf=[_0x71fdfe,_0xf805a5,_0x2855b1(0x266)[_0x2855b1(0x566)](_0x44a05e)];$gameSelfSwitches['setValue'](_0x2527cf,_0x1e965b);},setMapSwitchValue=function(_0x2739e0,_0x52a65d,_0x1b1da9){const _0x3c035d=_0x50f639;let _0x40e2d3=[0x0,0x0,_0x3c035d(0x474)['format'](_0x2739e0,_0x52a65d)];$gameSelfSwitches[_0x3c035d(0x337)](_0x40e2d3,_0x1b1da9);},setMapVariableValue=function(_0x8997cd,_0xab1f3e,_0x4d5a40){const _0x35bdda=_0x50f639;let _0x3520fe=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x35bdda(0x566)](_0x8997cd,_0xab1f3e)];$gameSelfSwitches[_0x35bdda(0x337)](_0x3520fe,_0x4d5a40);},DataManager[_0x50f639(0x596)]=function(_0x51be29){const _0x107fd8=_0x50f639;if(SceneManager[_0x107fd8(0x58c)]['constructor']===Scene_Debug)return![];return VisuMZ['AdvancedSwitches'][_0x107fd8(0x292)](_0x51be29);},DataManager['isAdvancedVariable']=function(_0x46a371){const _0x2b3cd4=_0x50f639;if(SceneManager['_scene'][_0x2b3cd4(0x381)]===Scene_Debug)return![];return VisuMZ[_0x2b3cd4(0x3f7)][_0x2b3cd4(0x292)](_0x46a371);},DataManager[_0x50f639(0x368)]=function(_0x119c90){const _0x17df2f=_0x50f639;if(SceneManager['_scene'][_0x17df2f(0x381)]===Scene_Debug)return![];return VisuMZ[_0x17df2f(0x525)]['includes'](_0x119c90);},DataManager[_0x50f639(0x426)]=function(_0x14acee){const _0x354c81=_0x50f639;if(SceneManager[_0x354c81(0x58c)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x354c81(0x3b2)][_0x354c81(0x292)](_0x14acee);},DataManager['isMapSwitch']=function(_0x1d73ea){const _0x1a95b5=_0x50f639;if(BattleManager[_0x1a95b5(0x35d)]())return![];return VisuMZ[_0x1a95b5(0x5ae)][_0x1a95b5(0x292)](_0x1d73ea);},DataManager['isMapVariable']=function(_0x435ecf){const _0x300cae=_0x50f639;if(BattleManager[_0x300cae(0x35d)]())return![];return VisuMZ['MapVariables'][_0x300cae(0x292)](_0x435ecf);},ImageManager[_0x50f639(0x384)]=function(_0x580231){const _0x50f830=_0x50f639;return _0x580231[_0x50f830(0x1e7)](/\[INV(?:|ISIBLE)\]/i);},SceneManager[_0x50f639(0x2dc)]=function(){const _0x3cdda4=_0x50f639;return this['_scene']&&this[_0x3cdda4(0x58c)]['constructor']===Scene_Map;},SceneManager[_0x50f639(0x5a9)]=function(){const _0x2a9f2d=_0x50f639;return this['_scene']&&this[_0x2a9f2d(0x58c)]instanceof Scene_Map;},VisuMZ[_0x50f639(0x380)][_0x50f639(0x23b)]=Game_Temp[_0x50f639(0x346)][_0x50f639(0x5db)],Game_Temp['prototype']['setDestination']=function(_0x1a2e1b,_0x4521aa){const _0x41adef=_0x50f639;if(this['isEventClickTriggered'](_0x1a2e1b,_0x4521aa))return;VisuMZ[_0x41adef(0x380)]['Game_Temp_setDestination'][_0x41adef(0x673)](this,_0x1a2e1b,_0x4521aa);},Game_Temp[_0x50f639(0x346)][_0x50f639(0x5d5)]=function(_0x454d3a,_0x2c5e26){const _0x22d4c8=_0x50f639,_0x5338da=$gameMap['eventsXy'](_0x454d3a,_0x2c5e26);for(const _0x1d4699 of _0x5338da){if(_0x1d4699&&_0x1d4699[_0x22d4c8(0x63e)]())return _0x1d4699['onClickTrigger'](),!![];}return TouchInput[_0x22d4c8(0x205)]()&&_0x5338da[_0x22d4c8(0x622)]>0x0&&TouchInput[_0x22d4c8(0x276)](),![];},Game_Temp[_0x50f639(0x346)][_0x50f639(0x220)]=function(_0x196c99){const _0x2bf70f=_0x50f639;this[_0x2bf70f(0x2e4)]=_0x196c99;},Game_Temp[_0x50f639(0x346)][_0x50f639(0x23f)]=function(){const _0x85b22f=_0x50f639;return this[_0x85b22f(0x2e4)];},Game_Temp['prototype'][_0x50f639(0x5ca)]=function(_0x3ffdec){const _0x46845a=_0x50f639;this[_0x46845a(0x51b)]=_0x3ffdec;},Game_Temp[_0x50f639(0x346)]['clearSelfTarget']=function(){const _0x5cfc8e=_0x50f639;this[_0x5cfc8e(0x51b)]=undefined;},Game_Temp['prototype'][_0x50f639(0x5d4)]=function(){const _0x283596=_0x50f639;return this[_0x283596(0x51b)];},VisuMZ[_0x50f639(0x380)][_0x50f639(0x639)]=Game_System[_0x50f639(0x346)][_0x50f639(0x378)],Game_System[_0x50f639(0x346)][_0x50f639(0x378)]=function(){const _0x2f9374=_0x50f639;VisuMZ[_0x2f9374(0x380)][_0x2f9374(0x639)]['call'](this),this['initEventsMoveCore'](),this[_0x2f9374(0x1d2)]();},Game_System[_0x50f639(0x346)]['initEventsMoveCore']=function(){const _0x8f01c=_0x50f639;this[_0x8f01c(0x586)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x8f01c(0x434)]={},this[_0x8f01c(0x5ba)]=[],this[_0x8f01c(0x415)]={},this['_SavedEventLocations']={},this['_DisablePlayerControl']=![],this[_0x8f01c(0x5f8)]='default';},Game_System[_0x50f639(0x346)][_0x50f639(0x5b2)]=function(){const _0x526a87=_0x50f639;if(this[_0x526a87(0x586)]===undefined)this[_0x526a87(0x219)]();if(this['_EventsMoveCoreSettings'][_0x526a87(0x1d9)]===undefined)this['initEventsMoveCore']();return this[_0x526a87(0x586)][_0x526a87(0x1d9)];},Game_System['prototype'][_0x50f639(0x388)]=function(_0x7be59){const _0x4d0c2b=_0x50f639;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this[_0x4d0c2b(0x586)]['DashingEnable']===undefined)this['initEventsMoveCore']();this[_0x4d0c2b(0x586)][_0x4d0c2b(0x1d9)]=_0x7be59;},Game_System['prototype'][_0x50f639(0x23c)]=function(){const _0x163796=_0x50f639;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this[_0x163796(0x586)][_0x163796(0x453)]===undefined)this[_0x163796(0x219)]();return this['_EventsMoveCoreSettings'][_0x163796(0x453)];},Game_System[_0x50f639(0x346)][_0x50f639(0x2fd)]=function(_0x36b4e6){const _0x504a5b=_0x50f639;if(this['_EventsMoveCoreSettings']===undefined)this[_0x504a5b(0x219)]();if(this[_0x504a5b(0x586)][_0x504a5b(0x453)]===undefined)this[_0x504a5b(0x219)]();this[_0x504a5b(0x586)][_0x504a5b(0x453)]=_0x36b4e6;},Game_System[_0x50f639(0x346)][_0x50f639(0x32e)]=function(){const _0x191226=_0x50f639;if(this['_EventsMoveCoreSettings']===undefined)this[_0x191226(0x219)]();if(this[_0x191226(0x586)][_0x191226(0x28d)]===undefined)this['initEventsMoveCore']();return this['_EventsMoveCoreSettings']['VisibleEventLabels'];},Game_System[_0x50f639(0x346)][_0x50f639(0x5c0)]=function(_0xdb6069){const _0x2b6c37=_0x50f639;if(this[_0x2b6c37(0x586)]===undefined)this[_0x2b6c37(0x219)]();if(this['_EventsMoveCoreSettings'][_0x2b6c37(0x28d)]===undefined)this[_0x2b6c37(0x219)]();this['_EventsMoveCoreSettings']['VisibleEventLabels']=_0xdb6069;},Game_System['prototype'][_0x50f639(0x425)]=function(){const _0x4072f5=_0x50f639;return this[_0x4072f5(0x3b6)]===undefined&&(this[_0x4072f5(0x3b6)]=![]),this[_0x4072f5(0x3b6)];},Game_System[_0x50f639(0x346)]['setPlayerControlDisable']=function(_0xeed6e8){const _0x4cfa4c=_0x50f639;this[_0x4cfa4c(0x3b6)]=_0xeed6e8;},Game_System[_0x50f639(0x346)][_0x50f639(0x206)]=function(){return this['_PlayerDiagonalSetting'];},Game_System[_0x50f639(0x346)]['setPlayerDiagonalSetting']=function(_0x663df5){const _0x3e41a6=_0x50f639;this[_0x3e41a6(0x5f8)]=String(_0x663df5)[_0x3e41a6(0x4ae)]()[_0x3e41a6(0x334)]();},Game_System[_0x50f639(0x346)][_0x50f639(0x3f3)]=function(_0x322abd){const _0x38037e=_0x50f639;if(this[_0x38037e(0x434)]===undefined)this[_0x38037e(0x219)]();if(!_0x322abd)return null;if(_0x322abd===$gamePlayer)return this['_EventIcons']['Player'];else{const _0x2c44d1=VisuMZ[_0x38037e(0x380)][_0x38037e(0x55c)],_0x17d51b='Map%1-Event%2'[_0x38037e(0x566)](_0x322abd[_0x38037e(0x4c3)],_0x322abd[_0x38037e(0x543)]);return this[_0x38037e(0x434)][_0x17d51b]=this[_0x38037e(0x434)][_0x17d51b]||{'iconIndex':0x0,'bufferX':_0x2c44d1[_0x38037e(0x23d)][_0x38037e(0x5a2)],'bufferY':_0x2c44d1[_0x38037e(0x23d)][_0x38037e(0x24b)],'blendMode':_0x2c44d1[_0x38037e(0x23d)]['BlendMode']},this[_0x38037e(0x434)][_0x17d51b];}},Game_System[_0x50f639(0x346)]['setEventIconData']=function(_0x1a3028,_0x1feeae,_0x55f263,_0x51e6de,_0x466720){const _0x413142=_0x50f639;if(this[_0x413142(0x434)]===undefined)this[_0x413142(0x219)]();const _0x1d36f3=_0x1a3028===$gamePlayer?_0x413142(0x64a):_0x413142(0x28e)[_0x413142(0x566)](_0x1a3028['_mapId'],_0x1a3028[_0x413142(0x543)]);this[_0x413142(0x434)][_0x1d36f3]={'iconIndex':_0x1feeae,'bufferX':_0x55f263,'bufferY':_0x51e6de,'blendMode':_0x466720};},Game_System['prototype']['setEventIconDataKey']=function(_0x5f1e23,_0x186647,_0x17cb1d,_0x8f6960,_0x12790c,_0x31574e,_0x310380){const _0x41c9af=_0x50f639;if(this[_0x41c9af(0x434)]===undefined)this[_0x41c9af(0x219)]();const _0x1f626b=_0x41c9af(0x28e)[_0x41c9af(0x566)](_0x5f1e23,_0x186647);this['_EventIcons'][_0x1f626b]={'iconIndex':_0x17cb1d,'forced':_0x310380,'bufferX':_0x8f6960,'bufferY':_0x12790c,'blendMode':_0x31574e};},Game_System[_0x50f639(0x346)]['deleteIconsOnEventsData']=function(_0x12a13c){const _0x5f17a6=_0x50f639;if(this[_0x5f17a6(0x434)]===undefined)this['initEventsMoveCore']();if(!_0x12a13c)return null;_0x12a13c===$gamePlayer?delete this[_0x5f17a6(0x434)][_0x5f17a6(0x64a)]:this[_0x5f17a6(0x4ce)](_0x12a13c[_0x5f17a6(0x4c3)],_0x12a13c['_eventId']);},Game_System[_0x50f639(0x346)][_0x50f639(0x4ce)]=function(_0x4815cd,_0x23f6e2){const _0x1f4702=_0x50f639;if(this['_EventIcons']===undefined)this[_0x1f4702(0x219)]();this[_0x1f4702(0x5a7)](_0x4815cd,_0x23f6e2,-0x1,0x0,0x0,0x0,![]);},Game_System[_0x50f639(0x346)][_0x50f639(0x252)]=function(_0x354bd2){const _0xcb5f30=_0x50f639;if(this[_0xcb5f30(0x434)]===undefined)this[_0xcb5f30(0x219)]();if(!_0x354bd2)return null;_0x354bd2===$gamePlayer?delete this[_0xcb5f30(0x434)][_0xcb5f30(0x64a)]:this[_0xcb5f30(0x684)](_0x354bd2[_0xcb5f30(0x4c3)],_0x354bd2[_0xcb5f30(0x543)]);},Game_System['prototype'][_0x50f639(0x684)]=function(_0x240f8f,_0x2da11d){const _0x22e49e=_0x50f639;if(this['_EventIcons']===undefined)this[_0x22e49e(0x219)]();const _0x31e042=_0x22e49e(0x28e)[_0x22e49e(0x566)](_0x240f8f,_0x2da11d);if(this['_EventIcons'][_0x31e042]){if(this[_0x22e49e(0x434)][_0x31e042][_0x22e49e(0x662)]<0x0)return;if(this[_0x22e49e(0x434)][_0x31e042][_0x22e49e(0x4f8)])return;}delete this[_0x22e49e(0x434)][_0x31e042];},Game_System[_0x50f639(0x346)][_0x50f639(0x341)]=function(_0x190ae7,_0x3bd1e9){const _0x10ac87=_0x50f639;if(this['_EventIcons']===undefined)this[_0x10ac87(0x219)]();const _0x4904d4=_0x10ac87(0x28e)[_0x10ac87(0x566)](_0x190ae7,_0x3bd1e9);delete this[_0x10ac87(0x434)][_0x4904d4];if(_0x190ae7!==$gameMap['mapId']())return;const _0x4dd50f=$gameMap['event'](_0x3bd1e9);if(!_0x4dd50f)return;_0x4dd50f[_0x10ac87(0x594)]();},Game_System['prototype'][_0x50f639(0x4e9)]=function(_0x191b54){const _0x61c6f8=_0x50f639;if(this[_0x61c6f8(0x2c1)]===undefined)this[_0x61c6f8(0x219)]();if(!_0x191b54)return null;const _0x340649=_0x61c6f8(0x28e)['format'](_0x191b54[_0x61c6f8(0x4c3)],_0x191b54[_0x61c6f8(0x543)]);return this[_0x61c6f8(0x2c1)][_0x340649];},Game_System[_0x50f639(0x346)][_0x50f639(0x697)]=function(_0x2e4b0c){const _0x19132a=_0x50f639;if(this[_0x19132a(0x2c1)]===undefined)this[_0x19132a(0x219)]();if(!_0x2e4b0c)return;const _0x1cd86e=_0x19132a(0x28e)[_0x19132a(0x566)](_0x2e4b0c[_0x19132a(0x4c3)],_0x2e4b0c[_0x19132a(0x543)]);this[_0x19132a(0x2c1)][_0x1cd86e]={'direction':_0x2e4b0c['direction'](),'x':Math[_0x19132a(0x452)](_0x2e4b0c['x']),'y':Math['round'](_0x2e4b0c['y']),'pageIndex':_0x2e4b0c[_0x19132a(0x57d)],'moveRouteIndex':_0x2e4b0c[_0x19132a(0x1fc)]};},Game_System[_0x50f639(0x346)][_0x50f639(0x218)]=function(_0x3bb6ba){const _0x46b6ea=_0x50f639;if(this[_0x46b6ea(0x2c1)]===undefined)this[_0x46b6ea(0x219)]();if(!_0x3bb6ba)return;this[_0x46b6ea(0x24e)](_0x3bb6ba[_0x46b6ea(0x4c3)],_0x3bb6ba[_0x46b6ea(0x543)]);},Game_System['prototype'][_0x50f639(0x24e)]=function(_0x26c46f,_0x1670d2){if(this['_SavedEventLocations']===undefined)this['initEventsMoveCore']();const _0x486445='Map%1-Event%2'['format'](_0x26c46f,_0x1670d2);delete this['_SavedEventLocations'][_0x486445];},Game_System[_0x50f639(0x346)][_0x50f639(0x37f)]=function(_0x4ad941,_0x4473c6,_0x553897,_0x27175a,_0x245334,_0x459c17,_0x410cc1){const _0x25a692=_0x50f639;if(this[_0x25a692(0x2c1)]===undefined)this[_0x25a692(0x219)]();const _0xed93e='Map%1-Event%2'[_0x25a692(0x566)](_0x4ad941,_0x4473c6);this[_0x25a692(0x2c1)][_0xed93e]={'direction':_0x245334,'x':Math['round'](_0x553897),'y':Math[_0x25a692(0x452)](_0x27175a),'pageIndex':_0x459c17,'moveRouteIndex':_0x410cc1};},Game_System[_0x50f639(0x346)][_0x50f639(0x541)]=function(_0x46d3c6){const _0x282371=_0x50f639;if(this['_PreservedEventMorphData']===undefined)this[_0x282371(0x219)]();if(!_0x46d3c6)return;const _0x41627a=_0x282371(0x28e)['format'](_0x46d3c6[_0x282371(0x4c3)],_0x46d3c6['_eventId']);return this[_0x282371(0x415)][_0x41627a];},Game_System[_0x50f639(0x346)][_0x50f639(0x485)]=function(_0x234611,_0x2d3f63,_0x22202e,_0x333c50,_0x5125ae){const _0x1b9572=_0x50f639;if(this['_PreservedEventMorphData']===undefined)this[_0x1b9572(0x219)]();const _0x266369=_0x1b9572(0x28e)[_0x1b9572(0x566)](_0x234611,_0x2d3f63);this['_PreservedEventMorphData'][_0x266369]={'template':_0x22202e,'mapId':_0x333c50,'eventId':_0x5125ae};},Game_System['prototype'][_0x50f639(0x1de)]=function(_0x5ee871,_0x4cbd43){const _0x5086be=_0x50f639;if(this['_PreservedEventMorphData']===undefined)this[_0x5086be(0x219)]();const _0x473261=_0x5086be(0x28e)[_0x5086be(0x566)](_0x5ee871,_0x4cbd43);delete this['_PreservedEventMorphData'][_0x473261];},Game_System[_0x50f639(0x346)]['getMapSpawnedEventData']=function(_0x193c93){const _0x150a53=_0x50f639;if(this[_0x150a53(0x5ba)]===undefined)this[_0x150a53(0x219)]();return this[_0x150a53(0x5ba)][_0x193c93]=this[_0x150a53(0x5ba)][_0x193c93]||[],this[_0x150a53(0x5ba)][_0x193c93];},Game_System[_0x50f639(0x346)][_0x50f639(0x589)]=function(_0x598466){const _0x3a384a=_0x50f639,_0x595635=this[_0x3a384a(0x3d1)](_0x598466);for(const _0x1896f9 of _0x595635){if(!_0x1896f9)continue;if(_0x1896f9[_0x3a384a(0x56c)])continue;const _0x1c7733=_0x595635['indexOf'](_0x1896f9);_0x595635[_0x1c7733]=null;}},Game_System[_0x50f639(0x346)]['initFollowerController']=function(){const _0x14980a=_0x50f639;this[_0x14980a(0x33d)]=0x0,this[_0x14980a(0x4ea)]=![];},Game_System[_0x50f639(0x346)][_0x50f639(0x29e)]=function(){const _0x55f760=_0x50f639;if(this[_0x55f760(0x33d)]===undefined)this[_0x55f760(0x1d2)]();return this[_0x55f760(0x33d)];},Game_System[_0x50f639(0x346)]['setControlledFollowerID']=function(_0x2ad480){const _0x45aa9e=_0x50f639;if(this[_0x45aa9e(0x33d)]===undefined)this['initFollowerController']();this[_0x45aa9e(0x33d)]=_0x2ad480;;},VisuMZ[_0x50f639(0x380)]['Game_Interpreter_character']=Game_Interpreter[_0x50f639(0x346)]['character'],Game_Interpreter[_0x50f639(0x346)][_0x50f639(0x4f7)]=function(_0x2c483c){const _0x5b46bb=_0x50f639;if(!$gameParty[_0x5b46bb(0x3ae)]()&&_0x2c483c<0x0){let _0x1dc506=$gameSystem['getControlledFollowerID']();if(_0x1dc506>0x0)return $gamePlayer[_0x5b46bb(0x5d6)]()[_0x5b46bb(0x2bc)](_0x1dc506-0x1);}return VisuMZ['EventsMoveCore']['Game_Interpreter_character'][_0x5b46bb(0x673)](this,_0x2c483c);},Game_System['prototype'][_0x50f639(0x36b)]=function(){const _0xb7a229=_0x50f639;if(this['_followerChaseOff']===undefined)this[_0xb7a229(0x1d2)]();return this[_0xb7a229(0x4ea)];},Game_System[_0x50f639(0x346)][_0x50f639(0x550)]=function(_0x28eba0){const _0x54fad1=_0x50f639;if(this['_followerChaseOff']===undefined)this[_0x54fad1(0x1d2)]();this[_0x54fad1(0x4ea)]=_0x28eba0;;},VisuMZ[_0x50f639(0x380)]['Game_Followers_jumpAll']=Game_Followers[_0x50f639(0x346)][_0x50f639(0x34c)],Game_Followers[_0x50f639(0x346)][_0x50f639(0x34c)]=function(){const _0xe339dc=_0x50f639;if($gameSystem[_0xe339dc(0x36b)]())return;VisuMZ[_0xe339dc(0x380)]['Game_Followers_jumpAll'][_0xe339dc(0x673)](this);},VisuMZ['EventsMoveCore'][_0x50f639(0x1d7)]=Game_Timer[_0x50f639(0x346)][_0x50f639(0x378)],Game_Timer[_0x50f639(0x346)][_0x50f639(0x378)]=function(){const _0x79d70=_0x50f639;VisuMZ['EventsMoveCore'][_0x79d70(0x1d7)][_0x79d70(0x673)](this),this[_0x79d70(0x219)]();},Game_Timer[_0x50f639(0x346)]['initEventsMoveCore']=function(){const _0x57c3b6=_0x50f639;this['_paused']=![],this[_0x57c3b6(0x342)]=-0x1,this[_0x57c3b6(0x35f)]=0x0;},Game_Timer['prototype']['update']=function(_0x30386b){const _0x29008c=_0x50f639;if(!_0x30386b)return;if(!this[_0x29008c(0x3dc)])return;if(this[_0x29008c(0x3f0)])return;if(this[_0x29008c(0x400)]<=0x0)return;if(this[_0x29008c(0x342)]===undefined)this[_0x29008c(0x219)]();this[_0x29008c(0x400)]+=this[_0x29008c(0x342)],this[_0x29008c(0x400)]<=0x0&&this[_0x29008c(0x47d)]();},VisuMZ[_0x50f639(0x380)][_0x50f639(0x288)]=Game_Timer['prototype'][_0x50f639(0x4d0)],Game_Timer['prototype'][_0x50f639(0x4d0)]=function(_0x1997bd){const _0x4e6143=_0x50f639;VisuMZ[_0x4e6143(0x380)]['Game_Timer_start'][_0x4e6143(0x673)](this,_0x1997bd);if(this['_paused']===undefined)this[_0x4e6143(0x219)]();this['_paused']=![];},VisuMZ[_0x50f639(0x380)]['Game_Timer_stop']=Game_Timer[_0x50f639(0x346)][_0x50f639(0x430)],Game_Timer[_0x50f639(0x346)][_0x50f639(0x430)]=function(){const _0x251d01=_0x50f639;VisuMZ[_0x251d01(0x380)]['Game_Timer_stop'][_0x251d01(0x673)](this);if(this[_0x251d01(0x3f0)]===undefined)this[_0x251d01(0x219)]();this['_paused']=![];},Game_Timer[_0x50f639(0x346)][_0x50f639(0x3eb)]=function(){const _0xdacca8=_0x50f639;if(this[_0xdacca8(0x400)]<=0x0)return;this[_0xdacca8(0x3f0)]=!![],this[_0xdacca8(0x3dc)]=!![];},Game_Timer[_0x50f639(0x346)]['resume']=function(){const _0x1dd3f8=_0x50f639;if(this[_0x1dd3f8(0x400)]<=0x0)return;this[_0x1dd3f8(0x3f0)]=![],this['_working']=!![];},Game_Timer[_0x50f639(0x346)][_0x50f639(0x68a)]=function(_0x3414a4){const _0x3d9d2c=_0x50f639;this[_0x3d9d2c(0x400)]=this[_0x3d9d2c(0x400)]||0x0,this[_0x3d9d2c(0x400)]+=_0x3414a4,this[_0x3d9d2c(0x3dc)]=!![],this['_frames']=Math['max'](0x1,this[_0x3d9d2c(0x400)]);},Game_Timer[_0x50f639(0x346)][_0x50f639(0x442)]=function(_0x178c80){const _0x2fa792=_0x50f639;this[_0x2fa792(0x400)]=this[_0x2fa792(0x400)]||0x0,this[_0x2fa792(0x400)]=_0x178c80,this[_0x2fa792(0x3dc)]=!![],this[_0x2fa792(0x400)]=Math[_0x2fa792(0x244)](0x1,this[_0x2fa792(0x400)]);},Game_Timer['prototype'][_0x50f639(0x3ce)]=function(_0x18087d){const _0x446edc=_0x50f639;this['_speed']=_0x18087d,this[_0x446edc(0x3dc)]=!![],_0x18087d>0x0&&(this[_0x446edc(0x400)]=Math[_0x446edc(0x244)](this['_frames'],0x1));},Game_Timer[_0x50f639(0x346)][_0x50f639(0x463)]=function(_0x4f3915){const _0x136120=_0x50f639;if(this[_0x136120(0x35f)]===undefined)this[_0x136120(0x219)]();this[_0x136120(0x35f)]=_0x4f3915;},VisuMZ['EventsMoveCore'][_0x50f639(0x503)]=Game_Timer[_0x50f639(0x346)][_0x50f639(0x47d)],Game_Timer['prototype'][_0x50f639(0x47d)]=function(){const _0xa916f6=_0x50f639;if(this[_0xa916f6(0x35f)]===undefined)this[_0xa916f6(0x219)]();this[_0xa916f6(0x35f)]?$gameTemp[_0xa916f6(0x25e)](this[_0xa916f6(0x35f)]):VisuMZ[_0xa916f6(0x380)][_0xa916f6(0x503)][_0xa916f6(0x673)](this);},VisuMZ[_0x50f639(0x380)]['Game_Message_add']=Game_Message[_0x50f639(0x346)][_0x50f639(0x295)],Game_Message[_0x50f639(0x346)][_0x50f639(0x295)]=function(_0x56111e){const _0x408442=_0x50f639;VisuMZ['EventsMoveCore'][_0x408442(0x5d7)][_0x408442(0x673)](this,_0x56111e),this['_selfEvent']=$gameTemp[_0x408442(0x5d4)]();},Game_Message['prototype'][_0x50f639(0x5dd)]=function(){const _0x403389=_0x50f639;$gameTemp[_0x403389(0x5ca)](this['_selfEvent']);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x298)]=Game_Switches[_0x50f639(0x346)]['value'],Game_Switches['prototype'][_0x50f639(0x264)]=function(_0x2c8561){const _0x1afe0e=_0x50f639;if(DataManager['isAdvancedSwitch'](_0x2c8561))return!!this[_0x1afe0e(0x55a)](_0x2c8561);else{if(DataManager[_0x1afe0e(0x368)](_0x2c8561))return!!this[_0x1afe0e(0x385)](_0x2c8561);else return DataManager[_0x1afe0e(0x20f)](_0x2c8561)?!!this[_0x1afe0e(0x282)](_0x2c8561):VisuMZ[_0x1afe0e(0x380)]['Game_Switches_value'][_0x1afe0e(0x673)](this,_0x2c8561);}},Game_Switches['advancedFunc']={},Game_Switches[_0x50f639(0x346)][_0x50f639(0x55a)]=function(_0x4a61eb){const _0x40d3e3=_0x50f639;if(!Game_Switches[_0x40d3e3(0x571)][_0x4a61eb]){$dataSystem[_0x40d3e3(0x5cd)][_0x4a61eb][_0x40d3e3(0x1e7)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x23e77a=_0x40d3e3(0x4c0)['format'](String(RegExp['$1']));Game_Switches[_0x40d3e3(0x571)][_0x4a61eb]=new Function(_0x40d3e3(0x4dc),_0x23e77a);}const _0x9a5013=$gameTemp['getSelfTarget']()||this;return Game_Switches[_0x40d3e3(0x571)][_0x4a61eb][_0x40d3e3(0x673)](_0x9a5013,_0x4a61eb);},Game_Switches[_0x50f639(0x346)][_0x50f639(0x385)]=function(_0x57c55e){const _0x11a842=_0x50f639,_0x41aa71=$gameTemp['getSelfTarget']()||this;if(_0x41aa71[_0x11a842(0x381)]!==Game_Event)return VisuMZ[_0x11a842(0x380)][_0x11a842(0x298)][_0x11a842(0x673)](this,_0x57c55e);else{const _0x319540=[_0x41aa71[_0x11a842(0x4c3)],_0x41aa71['_eventId'],'Self\x20Switch\x20%1'[_0x11a842(0x566)](_0x57c55e)];return $gameSelfSwitches[_0x11a842(0x264)](_0x319540);}},Game_Switches[_0x50f639(0x346)][_0x50f639(0x282)]=function(_0x37ec35){const _0x2e7196=_0x50f639,_0x327178=$gameMap?$gameMap[_0x2e7196(0x336)]():0x0,_0x6a7015=[0x0,0x0,_0x2e7196(0x474)[_0x2e7196(0x566)](_0x327178,_0x37ec35)];return $gameSelfSwitches['value'](_0x6a7015);},VisuMZ['EventsMoveCore'][_0x50f639(0x1dd)]=Game_Switches['prototype'][_0x50f639(0x337)],Game_Switches['prototype'][_0x50f639(0x337)]=function(_0x2b5cc2,_0x5dbb12){const _0x21c83f=_0x50f639;if(DataManager[_0x21c83f(0x368)](_0x2b5cc2))this['setSelfValue'](_0x2b5cc2,_0x5dbb12);else DataManager[_0x21c83f(0x20f)](_0x2b5cc2)?this['setMapValue'](_0x2b5cc2,_0x5dbb12):VisuMZ['EventsMoveCore']['Game_Switches_setValue'][_0x21c83f(0x673)](this,_0x2b5cc2,_0x5dbb12);},Game_Switches[_0x50f639(0x346)]['setSelfValue']=function(_0x47c03c,_0x33b694){const _0x52e6dd=_0x50f639,_0x31b41a=$gameTemp[_0x52e6dd(0x5d4)]()||this;if(_0x31b41a[_0x52e6dd(0x381)]!==Game_Event)VisuMZ[_0x52e6dd(0x380)][_0x52e6dd(0x1dd)][_0x52e6dd(0x673)](this,_0x47c03c,_0x33b694);else{const _0x20f45b=[_0x31b41a[_0x52e6dd(0x4c3)],_0x31b41a[_0x52e6dd(0x543)],'Self\x20Switch\x20%1'[_0x52e6dd(0x566)](_0x47c03c)];$gameSelfSwitches[_0x52e6dd(0x337)](_0x20f45b,_0x33b694);}},Game_Switches[_0x50f639(0x346)]['setMapValue']=function(_0x142667,_0xe26189){const _0x2c023d=_0x50f639,_0x2b9188=$gameMap?$gameMap[_0x2c023d(0x336)]():0x0,_0x62933d=[0x0,0x0,_0x2c023d(0x474)['format'](_0x2b9188,_0x142667)];return $gameSelfSwitches[_0x2c023d(0x337)](_0x62933d,_0xe26189);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x331)]=Game_Variables[_0x50f639(0x346)][_0x50f639(0x264)],Game_Variables[_0x50f639(0x346)][_0x50f639(0x264)]=function(_0x3dd28b){const _0x21b6a1=_0x50f639;if(DataManager[_0x21b6a1(0x1f2)](_0x3dd28b))return this['advancedValue'](_0x3dd28b);else{if(DataManager[_0x21b6a1(0x426)](_0x3dd28b))return this['selfValue'](_0x3dd28b);else return DataManager['isMapVariable'](_0x3dd28b)?this[_0x21b6a1(0x282)](_0x3dd28b):VisuMZ['EventsMoveCore'][_0x21b6a1(0x331)]['call'](this,_0x3dd28b);}},Game_Variables[_0x50f639(0x571)]={},Game_Variables[_0x50f639(0x346)][_0x50f639(0x55a)]=function(_0x287239){const _0x39916e=_0x50f639;if(!Game_Variables[_0x39916e(0x571)][_0x287239]){$dataSystem[_0x39916e(0x255)][_0x287239][_0x39916e(0x1e7)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x112a0d=_0x39916e(0x4c0)[_0x39916e(0x566)](String(RegExp['$1']));Game_Variables[_0x39916e(0x571)][_0x287239]=new Function(_0x39916e(0x2d9),_0x112a0d);}const _0x44b0d0=$gameTemp['getSelfTarget']()||this;return Game_Variables['advancedFunc'][_0x287239][_0x39916e(0x673)](_0x44b0d0,_0x287239);},Game_Variables['prototype'][_0x50f639(0x385)]=function(_0x58460d){const _0xd534bf=_0x50f639,_0x5c25c7=$gameTemp[_0xd534bf(0x5d4)]()||this;if(_0x5c25c7[_0xd534bf(0x381)]!==Game_Event)return VisuMZ[_0xd534bf(0x380)][_0xd534bf(0x331)][_0xd534bf(0x673)](this,_0x58460d);else{const _0x1c7147=[_0x5c25c7[_0xd534bf(0x4c3)],_0x5c25c7['_eventId'],_0xd534bf(0x266)[_0xd534bf(0x566)](_0x58460d)];return $gameSelfSwitches['value'](_0x1c7147);}},Game_Variables['prototype']['mapValue']=function(_0x206151){const _0x16cb5f=_0x50f639,_0x355269=$gameMap?$gameMap[_0x16cb5f(0x336)]():0x0,_0x365e15=[0x0,0x0,_0x16cb5f(0x4ef)[_0x16cb5f(0x566)](_0x355269,_0x206151)];return $gameSelfSwitches['value'](_0x365e15)||0x0;},VisuMZ[_0x50f639(0x380)][_0x50f639(0x46c)]=Game_Variables[_0x50f639(0x346)][_0x50f639(0x337)],Game_Variables[_0x50f639(0x346)][_0x50f639(0x337)]=function(_0x5604ec,_0xe64f9d){const _0x22ed27=_0x50f639;if(DataManager[_0x22ed27(0x426)](_0x5604ec))this[_0x22ed27(0x567)](_0x5604ec,_0xe64f9d);else DataManager[_0x22ed27(0x386)](_0x5604ec)?this['setMapValue'](_0x5604ec,_0xe64f9d):VisuMZ['EventsMoveCore'][_0x22ed27(0x46c)][_0x22ed27(0x673)](this,_0x5604ec,_0xe64f9d);},Game_Variables[_0x50f639(0x346)][_0x50f639(0x567)]=function(_0x55022c,_0x5effa4){const _0x31fbb9=_0x50f639,_0x202550=$gameTemp[_0x31fbb9(0x5d4)]()||this;if(_0x202550['constructor']!==Game_Event)VisuMZ[_0x31fbb9(0x380)][_0x31fbb9(0x46c)]['call'](this,_0x55022c,_0x5effa4);else{const _0x3b8aaa=[_0x202550[_0x31fbb9(0x4c3)],_0x202550[_0x31fbb9(0x543)],_0x31fbb9(0x266)[_0x31fbb9(0x566)](_0x55022c)];$gameSelfSwitches[_0x31fbb9(0x337)](_0x3b8aaa,_0x5effa4);}},Game_Variables[_0x50f639(0x346)][_0x50f639(0x1da)]=function(_0x3f77b7,_0x9cf954){const _0xa12f4c=_0x50f639,_0x200dee=$gameMap?$gameMap['mapId']():0x0,_0x4967c4=[0x0,0x0,_0xa12f4c(0x4ef)[_0xa12f4c(0x566)](_0x200dee,_0x3f77b7)];$gameSelfSwitches[_0xa12f4c(0x337)](_0x4967c4,_0x9cf954);},VisuMZ['EventsMoveCore'][_0x50f639(0x359)]=Game_SelfSwitches['prototype'][_0x50f639(0x264)],Game_SelfSwitches[_0x50f639(0x346)][_0x50f639(0x264)]=function(_0x4c6d17){const _0x28a1b4=_0x50f639;if(_0x4c6d17[0x2]['match'](/(?:SELF|MAP)/i))return this[_0x28a1b4(0x385)](_0x4c6d17);else{return VisuMZ[_0x28a1b4(0x380)][_0x28a1b4(0x359)][_0x28a1b4(0x673)](this,_0x4c6d17);;}},Game_SelfSwitches[_0x50f639(0x346)][_0x50f639(0x385)]=function(_0x5d77c9){const _0x439c19=_0x50f639;return _0x5d77c9[0x2]['match'](/VAR/i)?this[_0x439c19(0x42f)][_0x5d77c9]||0x0:!!this[_0x439c19(0x42f)][_0x5d77c9];},VisuMZ[_0x50f639(0x380)][_0x50f639(0x4d7)]=Game_SelfSwitches[_0x50f639(0x346)][_0x50f639(0x337)],Game_SelfSwitches[_0x50f639(0x346)]['setValue']=function(_0x5714f1,_0x4778cf){const _0x5a17a3=_0x50f639;_0x5714f1[0x2][_0x5a17a3(0x1e7)](/(?:SELF|MAP)/i)?this[_0x5a17a3(0x567)](_0x5714f1,_0x4778cf):VisuMZ['EventsMoveCore'][_0x5a17a3(0x4d7)][_0x5a17a3(0x673)](this,_0x5714f1,_0x4778cf);},Game_SelfSwitches[_0x50f639(0x346)][_0x50f639(0x567)]=function(_0xa4baa,_0x3e9b7f){const _0x6fc1a1=_0x50f639;this[_0x6fc1a1(0x42f)][_0xa4baa]=_0xa4baa[0x2][_0x6fc1a1(0x1e7)](/VAR/i)?_0x3e9b7f:!!_0x3e9b7f,this[_0x6fc1a1(0x507)]();},VisuMZ['EventsMoveCore'][_0x50f639(0x2d3)]=Scene_Map['prototype'][_0x50f639(0x21e)],Scene_Map[_0x50f639(0x346)][_0x50f639(0x21e)]=function(){const _0x3fca57=_0x50f639;$gameMap[_0x3fca57(0x2aa)](),VisuMZ[_0x3fca57(0x380)][_0x3fca57(0x2d3)]['call'](this);},Game_Map['prototype'][_0x50f639(0x2aa)]=function(){const _0xb76abd=_0x50f639;if(this[_0xb76abd(0x4fa)]===this[_0xb76abd(0x336)]())return;this[_0xb76abd(0x4fa)]=this['mapId'](),this[_0xb76abd(0x297)]=undefined;const _0x4328c4=this[_0xb76abd(0x459)]();for(const _0x127b70 of _0x4328c4){if(_0x127b70)$gameSelfSwitches[_0xb76abd(0x2ff)](_0x127b70);}},Game_SelfSwitches[_0x50f639(0x346)]['resetSelfSwitchesForEvent']=function(_0x4a8348){const _0x34d595=_0x50f639;if(!_0x4a8348)return;if(!_0x4a8348['event']())return;const _0x355d53=_0x4a8348[_0x34d595(0x5bd)]()[_0x34d595(0x2c0)]||'';if(_0x355d53[_0x34d595(0x1e7)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x40ba0d=_0x34d595(0x446)[_0x34d595(0x566)]($gameMap['_mapId'],_0x4a8348[_0x34d595(0x543)]),_0x4a1c42=Object[_0x34d595(0x489)](this[_0x34d595(0x42f)])[_0x34d595(0x25a)](_0x111b7e=>_0x111b7e['startsWith'](_0x40ba0d));while(_0x4a1c42[_0x34d595(0x622)]>0x0){const _0x30fb7c=_0x4a1c42[_0x34d595(0x549)]();delete this['_data'][_0x30fb7c];}}},Game_SelfSwitches[_0x50f639(0x346)][_0x50f639(0x405)]=function(_0x8d3614){const _0x474ebd=_0x50f639,_0x4c8540=_0x474ebd(0x666)[_0x474ebd(0x566)]($gameMap[_0x474ebd(0x4c3)]),_0x15bf41=Object[_0x474ebd(0x489)](this[_0x474ebd(0x42f)])[_0x474ebd(0x25a)](_0x3e5d9d=>_0x3e5d9d[_0x474ebd(0x5e0)](_0x4c8540));while(_0x15bf41['length']>0x0){const _0x346ec4=_0x15bf41[_0x474ebd(0x549)]();delete this[_0x474ebd(0x42f)][_0x346ec4];}_0x8d3614===$gameMap[_0x474ebd(0x336)]()&&$gameMap[_0x474ebd(0x261)]();},VisuMZ[_0x50f639(0x380)][_0x50f639(0x202)]=Game_Enemy[_0x50f639(0x346)][_0x50f639(0x376)],Game_Enemy[_0x50f639(0x346)][_0x50f639(0x376)]=function(_0x4218eb){const _0x2e7079=_0x50f639;$gameTemp[_0x2e7079(0x5ca)](this);const _0x3c5294=VisuMZ[_0x2e7079(0x380)][_0x2e7079(0x202)][_0x2e7079(0x673)](this,_0x4218eb);return $gameTemp[_0x2e7079(0x58e)](),_0x3c5294;},VisuMZ['EventsMoveCore']['Game_Party_hasEncounterHalf']=Game_Party[_0x50f639(0x346)][_0x50f639(0x63d)],Game_Party[_0x50f639(0x346)][_0x50f639(0x63d)]=function(){const _0xfc0b0e=_0x50f639;if(this[_0xfc0b0e(0x5fe)]())return!![];return VisuMZ[_0xfc0b0e(0x380)][_0xfc0b0e(0x2ec)][_0xfc0b0e(0x673)](this);},Game_Party[_0x50f639(0x346)]['isPlayerWithinEncounterHalfEvents']=function(){const _0x29cde0=_0x50f639;if(this[_0x29cde0(0x65c)])return![];return $isTileEncounterHalf($gamePlayer['x'],$gamePlayer['y']);},VisuMZ[_0x50f639(0x380)]['Game_Party_hasEncounterNone']=Game_Party[_0x50f639(0x346)][_0x50f639(0x491)],Game_Party[_0x50f639(0x346)][_0x50f639(0x491)]=function(){const _0x2ed0b2=_0x50f639;if(this[_0x2ed0b2(0x3ba)]())return!![];return VisuMZ[_0x2ed0b2(0x380)][_0x2ed0b2(0x3e1)][_0x2ed0b2(0x673)](this);},Game_Party[_0x50f639(0x346)][_0x50f639(0x3ba)]=function(){const _0x62e9f6=_0x50f639;if(this[_0x62e9f6(0x65c)])return![];return $isTileEncounterNone($gamePlayer['x'],$gamePlayer['y']);};var $isTileEncounterHalf=function(_0x475bb8,_0xf9e706){const _0x242115=_0x50f639;if(!$gameMap)return![];_0x475bb8=Math['round'](_0x475bb8||0x0),_0xf9e706=Math[_0x242115(0x452)](_0xf9e706||0x0);const _0x3c91e6=$gameMap[_0x242115(0x459)]();for(const _0x52da38 of _0x3c91e6){if(!_0x52da38)continue;if(_0x52da38[_0x242115(0x4ac)])continue;const _0x4d09b4=_0x52da38[_0x242115(0x50c)](!![]),_0x40dab4=_0x52da38['encounterProximityDistance'](!![]);if($gameMap['checkEventProximity'](_0x475bb8,_0xf9e706,_0x52da38,_0x4d09b4,_0x40dab4))return!![];}return![];},$isTileEncounterNone=function(_0x1804a6,_0x181c7d){const _0x2944d0=_0x50f639;if(!$gameMap)return![];_0x1804a6=Math[_0x2944d0(0x452)](_0x1804a6||0x0),_0x181c7d=Math[_0x2944d0(0x452)](_0x181c7d||0x0);const _0x12aeaf=$gameMap['events']();for(const _0x12a42b of _0x12aeaf){if(!_0x12a42b)continue;if(_0x12a42b[_0x2944d0(0x4ac)])continue;const _0x37ef98=_0x12a42b['encounterProximityType'](![]),_0x10762b=_0x12a42b[_0x2944d0(0x5ea)](![]);if($gameMap[_0x2944d0(0x42b)](_0x1804a6,_0x181c7d,_0x12a42b,_0x37ef98,_0x10762b))return!![];}return![];};VisuMZ[_0x50f639(0x380)][_0x50f639(0x3c8)]=Game_Troop['prototype'][_0x50f639(0x211)],Game_Troop['prototype'][_0x50f639(0x211)]=function(_0x211529){const _0xf988f2=_0x50f639;$gameTemp[_0xf988f2(0x5ca)](this);const _0x2df042=VisuMZ[_0xf988f2(0x380)][_0xf988f2(0x3c8)][_0xf988f2(0x673)](this,_0x211529);return $gameTemp['clearSelfTarget'](),_0x2df042;},VisuMZ[_0x50f639(0x380)]['Game_Map_setup']=Game_Map[_0x50f639(0x346)][_0x50f639(0x68c)],Game_Map[_0x50f639(0x346)][_0x50f639(0x68c)]=function(_0xee89cb){const _0x58aaf1=_0x50f639;this[_0x58aaf1(0x589)](_0xee89cb),this[_0x58aaf1(0x6a2)](),VisuMZ['EventsMoveCore']['Game_Map_setup']['call'](this,_0xee89cb),this[_0x58aaf1(0x6a2)](),this['setupDiagonalSupport'](),this[_0x58aaf1(0x237)](),this[_0x58aaf1(0x38a)](),this[_0x58aaf1(0x3c2)](),this[_0x58aaf1(0x280)](),this[_0x58aaf1(0x256)](),this[_0x58aaf1(0x2ba)](),this[_0x58aaf1(0x213)](),this[_0x58aaf1(0x6a2)]();},VisuMZ['EventsMoveCore'][_0x50f639(0x551)]=Game_Map[_0x50f639(0x346)][_0x50f639(0x393)],Game_Map[_0x50f639(0x346)][_0x50f639(0x393)]=function(){const _0x551a0e=_0x50f639;VisuMZ[_0x551a0e(0x380)][_0x551a0e(0x551)][_0x551a0e(0x673)](this),this[_0x551a0e(0x332)]();},Game_Map['_eventOverloadThreshold']=0xc8,Game_Map['prototype'][_0x50f639(0x4d6)]=function(){const _0x53543e=_0x50f639,_0x3aaffe=Game_Map['_eventOverloadThreshold'];this['_eventOverload']=this[_0x53543e(0x459)]()[_0x53543e(0x622)]>_0x3aaffe;if(this['_eventOverload']&&$gameTemp[_0x53543e(0x38f)]()){}},Game_Map[_0x50f639(0x346)][_0x50f639(0x59b)]=function(){const _0x316451=_0x50f639;return this[_0x316451(0x406)];},Game_Map['prototype'][_0x50f639(0x6a2)]=function(){const _0x1734c3=_0x50f639;this[_0x1734c3(0x297)]=undefined;},Game_Map['prototype'][_0x50f639(0x501)]=function(){const _0xb62dfe=_0x50f639;this['_diagonalSupport']=VisuMZ[_0xb62dfe(0x380)][_0xb62dfe(0x55c)]['Movement'][_0xb62dfe(0x3e6)];const _0x3c485b=$dataMap[_0xb62dfe(0x2c0)]||'';if(_0x3c485b[_0xb62dfe(0x1e7)](/<DIAGONAL MOVEMENT: ON>/i))this['_diagonalSupport']=!![];else _0x3c485b[_0xb62dfe(0x1e7)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0xb62dfe(0x361)]=![]);},Game_Map[_0x50f639(0x27b)]=VisuMZ[_0x50f639(0x380)][_0x50f639(0x55c)][_0x50f639(0x57c)][_0x50f639(0x1fe)]??![],Game_Map['prototype'][_0x50f639(0x38e)]=function(){const _0x3fcf34=_0x50f639;if(Utils[_0x3fcf34(0x3c4)]()){if(!Game_Map[_0x3fcf34(0x27b)])return![];}const _0x259175=$gameSystem[_0x3fcf34(0x206)]();if(_0x259175==='enable')return!![];if(_0x259175===_0x3fcf34(0x391))return![];if(this[_0x3fcf34(0x361)]===undefined)this[_0x3fcf34(0x501)]();return this[_0x3fcf34(0x361)];},Game_Map['prototype'][_0x50f639(0x349)]=function(_0x4fb785,_0x39a9ca){const _0x411792=_0x50f639;if([0x1,0x4,0x7]['includes'](_0x39a9ca))_0x4fb785-=0x1;if([0x3,0x6,0x9][_0x411792(0x292)](_0x39a9ca))_0x4fb785+=0x1;return this[_0x411792(0x310)](_0x4fb785);},Game_Map[_0x50f639(0x346)][_0x50f639(0x1e3)]=function(_0x44e428,_0x6e0036){const _0x18d059=_0x50f639;if([0x1,0x2,0x3][_0x18d059(0x292)](_0x6e0036))_0x44e428+=0x1;if([0x7,0x8,0x9][_0x18d059(0x292)](_0x6e0036))_0x44e428-=0x1;return this[_0x18d059(0x2c7)](_0x44e428);},Game_Map['prototype']['absDistance']=function(_0x3076a9,_0x4162bd,_0x3cab79,_0x28f924){const _0x3f3083=_0x50f639;return Math[_0x3f3083(0x244)](Math[_0x3f3083(0x311)](this[_0x3f3083(0x619)](_0x3076a9,_0x3cab79)),Math[_0x3f3083(0x311)](this[_0x3f3083(0x64f)](_0x4162bd,_0x28f924)));},Game_Map['prototype'][_0x50f639(0x237)]=function(){const _0x2171b1=_0x50f639,_0x50f866=VisuMZ[_0x2171b1(0x380)][_0x2171b1(0x55c)][_0x2171b1(0x1f9)],_0x700b2={},_0x42d404=['Allow',_0x2171b1(0x41d),_0x2171b1(0x64c)],_0x3f6b87=[_0x2171b1(0x5e4),'Walk',_0x2171b1(0x64a),'Event',_0x2171b1(0x293),_0x2171b1(0x4ee),_0x2171b1(0x635),_0x2171b1(0x28c)];for(const _0x11d282 of _0x42d404){for(const _0x3f3c46 of _0x3f6b87){const _0x3635eb=_0x2171b1(0x597)['format'](_0x3f3c46,_0x11d282);_0x50f866[_0x3635eb]&&(_0x700b2[_0x3635eb]=_0x50f866[_0x3635eb][_0x2171b1(0x25c)](0x0));}}const _0x2eac32=$dataMap[_0x2171b1(0x2c0)]||'',_0x54753e=_0x2eac32[_0x2171b1(0x1e7)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x54753e)for(const _0x42ea0f of _0x54753e){_0x42ea0f[_0x2171b1(0x1e7)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x54e404=String(RegExp['$1'])['toLowerCase']()['trim'](),_0x210ea3=String(RegExp['$2'])[_0x2171b1(0x4ae)]()['trim']();const _0x409822=JSON[_0x2171b1(0x53e)]('['+RegExp['$3'][_0x2171b1(0x1e7)](/\d+/g)+']');_0x54e404=_0x54e404[_0x2171b1(0x4dd)](0x0)[_0x2171b1(0x4ab)]()+_0x54e404[_0x2171b1(0x25c)](0x1),_0x210ea3=_0x210ea3[_0x2171b1(0x4dd)](0x0)['toUpperCase']()+_0x210ea3[_0x2171b1(0x25c)](0x1);const _0x40227f='%1%2'[_0x2171b1(0x566)](_0x54e404,_0x210ea3);if(_0x700b2[_0x40227f])_0x700b2[_0x40227f]=_0x700b2[_0x40227f][_0x2171b1(0x688)](_0x409822);}this[_0x2171b1(0x3be)]=_0x700b2;},Game_Map[_0x50f639(0x346)][_0x50f639(0x2eb)]=function(_0x2fcc28,_0x54e4c2,_0x5ed313,_0x174ef){const _0x1d313b=_0x50f639,_0x400049=this['roundXWithDirection'](_0x2fcc28,_0x5ed313),_0x568d63=this[_0x1d313b(0x1e3)](_0x54e4c2,_0x5ed313),_0x59dd6b=this[_0x1d313b(0x27c)](_0x400049,_0x568d63),_0x5bde1e=this['_regionRules'];if(_0x5bde1e[_0x1d313b(0x54d)][_0x1d313b(0x292)](_0x59dd6b))return!![];else{if(_0x174ef===_0x1d313b(0x4de))return _0x5bde1e['PlayerAllow'][_0x1d313b(0x292)](_0x59dd6b)||_0x5bde1e[_0x1d313b(0x2f2)][_0x1d313b(0x292)](_0x59dd6b);else{if(_0x174ef==='event')return _0x5bde1e[_0x1d313b(0x5dc)][_0x1d313b(0x292)](_0x59dd6b)||_0x5bde1e[_0x1d313b(0x2f2)][_0x1d313b(0x292)](_0x59dd6b);else{if(_0x5bde1e[_0x1d313b(0x369)][_0x1d313b(0x292)](_0x59dd6b))return!![];else{const _0x286913=_0x1d313b(0x5af)['format'](_0x174ef[_0x1d313b(0x4dd)](0x0)[_0x1d313b(0x4ab)]()+_0x174ef[_0x1d313b(0x25c)](0x1));if(_0x5bde1e[_0x286913])return _0x5bde1e[_0x286913][_0x1d313b(0x292)](_0x59dd6b);}}}}return![];},Game_Map[_0x50f639(0x346)]['isRegionForbidPass']=function(_0x328c4a,_0x16f479,_0x2f1610,_0x60c3db){const _0x533c19=_0x50f639,_0x205888=this['roundXWithDirection'](_0x328c4a,_0x2f1610),_0x261107=this[_0x533c19(0x1e3)](_0x16f479,_0x2f1610),_0x358956=this[_0x533c19(0x27c)](_0x205888,_0x261107),_0xb7083=this['_regionRules'];if(_0xb7083[_0x533c19(0x2ac)][_0x533c19(0x292)](_0x358956))return!![];else{if(_0x60c3db===_0x533c19(0x4de))return _0xb7083[_0x533c19(0x4c4)]['includes'](_0x358956)||_0xb7083[_0x533c19(0x356)][_0x533c19(0x292)](_0x358956);else{if(_0x60c3db==='event')return _0xb7083[_0x533c19(0x4a9)][_0x533c19(0x292)](_0x358956)||_0xb7083[_0x533c19(0x356)][_0x533c19(0x292)](_0x358956);else{if(_0xb7083[_0x533c19(0x56d)][_0x533c19(0x292)](_0x358956))return!![];else{const _0x1da7c1=_0x533c19(0x53f)[_0x533c19(0x566)](_0x60c3db['charAt'](0x0)[_0x533c19(0x4ab)]()+_0x60c3db['slice'](0x1));if(_0xb7083[_0x1da7c1])return _0xb7083[_0x1da7c1][_0x533c19(0x292)](_0x358956);}}}}return![];},Game_Map['prototype'][_0x50f639(0x591)]=function(_0x2fc30f,_0xa8ca7e,_0x222e00,_0x13e7f1){const _0xca18b9=_0x50f639;_0x222e00=_0x13e7f1===_0xca18b9(0x445)?0x5:_0x222e00;const _0x3625fb=this[_0xca18b9(0x349)](_0x2fc30f,_0x222e00),_0x118dda=this[_0xca18b9(0x1e3)](_0xa8ca7e,_0x222e00),_0x901e4a=this['regionId'](_0x3625fb,_0x118dda),_0x4d93d7=this[_0xca18b9(0x3be)];if(_0x4d93d7['VehicleDock'][_0xca18b9(0x292)](_0x901e4a))return!![];else{const _0x100c6a=_0xca18b9(0x5e3)[_0xca18b9(0x566)](_0x13e7f1[_0xca18b9(0x4dd)](0x0)[_0xca18b9(0x4ab)]()+_0x13e7f1['slice'](0x1));if(_0x4d93d7[_0x100c6a])return _0x4d93d7[_0x100c6a][_0xca18b9(0x292)](_0x901e4a);}return![];},VisuMZ[_0x50f639(0x380)][_0x50f639(0x532)]=Game_Map[_0x50f639(0x346)][_0x50f639(0x377)],Game_Map[_0x50f639(0x346)][_0x50f639(0x377)]=function(){const _0x5c9633=_0x50f639;VisuMZ[_0x5c9633(0x380)][_0x5c9633(0x532)][_0x5c9633(0x673)](this),this[_0x5c9633(0x5be)]();},Game_Map[_0x50f639(0x346)][_0x50f639(0x5be)]=function(){const _0x5a5885=_0x50f639;this[_0x5a5885(0x5df)]=![];if(this[_0x5a5885(0x459)]()[_0x5a5885(0x5de)](_0x468c42=>_0x468c42[_0x5a5885(0x68f)]())){this[_0x5a5885(0x5df)]=!![];return;}if(this['events']()[_0x5a5885(0x5de)](_0x16f08c=>_0x16f08c[_0x5a5885(0x50a)]())){this[_0x5a5885(0x5df)]=!![];return;}if(this[_0x5a5885(0x38c)][_0x5a5885(0x5de)](_0x4bd696=>_0x4bd696[_0x5a5885(0x68f)]())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x5a5885(0x38c)][_0x5a5885(0x5de)](_0x4094be=>_0x4094be[_0x5a5885(0x50a)]())){this[_0x5a5885(0x5df)]=!![];return;}},VisuMZ['EventsMoveCore'][_0x50f639(0x41a)]=Game_Map['prototype'][_0x50f639(0x5c9)],Game_Map[_0x50f639(0x346)][_0x50f639(0x5c9)]=function(_0x5a77df){const _0x4b2b89=_0x50f639;this[_0x4b2b89(0x4e0)](),VisuMZ['EventsMoveCore'][_0x4b2b89(0x41a)][_0x4b2b89(0x673)](this,_0x5a77df);},Game_Map[_0x50f639(0x346)]['updatePeriodicRefresh']=function(){const _0x4d84b8=_0x50f639;if(!this[_0x4d84b8(0x5df)])return;this[_0x4d84b8(0x4cf)]=this['_periodicRefreshTimer']||0x3c,this[_0x4d84b8(0x4cf)]--,this['_periodicRefreshTimer']<=0x0&&(this[_0x4d84b8(0x261)](),this[_0x4d84b8(0x4cf)]=0x3c);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x306)]=Game_Map[_0x50f639(0x346)]['isDashDisabled'],Game_Map['prototype'][_0x50f639(0x560)]=function(){const _0x50fc66=_0x50f639;if(!$gameSystem[_0x50fc66(0x5b2)]())return!![];return VisuMZ[_0x50fc66(0x380)]['Game_Map_isDashDisabled'][_0x50fc66(0x673)](this);},Game_Map['prototype'][_0x50f639(0x38a)]=function(){const _0x35677f=_0x50f639;this[_0x35677f(0x636)]=![];const _0xe546cd=$dataMap[_0x35677f(0x2c0)]||'';_0xe546cd[_0x35677f(0x1e7)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);},Game_Map[_0x50f639(0x346)][_0x50f639(0x2ed)]=function(){const _0x2d925f=_0x50f639;if(this[_0x2d925f(0x636)]===undefined)this[_0x2d925f(0x38a)]();return this[_0x2d925f(0x636)];},Game_Map[_0x50f639(0x346)][_0x50f639(0x589)]=function(_0x4ac902){const _0x7ec518=_0x50f639;_0x4ac902!==this[_0x7ec518(0x336)]()&&$gamePlayer&&$gameSystem[_0x7ec518(0x589)](this[_0x7ec518(0x336)]());},Game_Map[_0x50f639(0x346)]['setupSpawnedEvents']=function(){const _0x50d2b3=_0x50f639;this[_0x50d2b3(0x69e)]=$gameSystem[_0x50d2b3(0x3d1)](this[_0x50d2b3(0x336)]()),this[_0x50d2b3(0x5c3)]=!![];},VisuMZ[_0x50f639(0x380)][_0x50f639(0x231)]=Game_Map[_0x50f639(0x346)][_0x50f639(0x459)],Game_Map[_0x50f639(0x346)][_0x50f639(0x459)]=function(){const _0x2a8b4a=_0x50f639;if(this[_0x2a8b4a(0x297)])return this['_eventCache'];const _0xf7e502=VisuMZ[_0x2a8b4a(0x380)][_0x2a8b4a(0x231)][_0x2a8b4a(0x673)](this),_0x933890=_0xf7e502[_0x2a8b4a(0x688)](this[_0x2a8b4a(0x69e)]||[]);return this[_0x2a8b4a(0x297)]=_0x933890['filter'](_0x464d4e=>!!_0x464d4e),this[_0x2a8b4a(0x297)];},VisuMZ[_0x50f639(0x380)][_0x50f639(0x2f3)]=Game_Map[_0x50f639(0x346)][_0x50f639(0x5bd)],Game_Map['prototype'][_0x50f639(0x5bd)]=function(_0x288b2b){const _0xf8b06b=_0x50f639;return _0x288b2b>=0x3e8?(_0x288b2b-=0x3e8,this[_0xf8b06b(0x69e)][_0x288b2b]):VisuMZ['EventsMoveCore'][_0xf8b06b(0x2f3)][_0xf8b06b(0x673)](this,_0x288b2b);},Game_Map[_0x50f639(0x346)][_0x50f639(0x58d)]=function(_0x3f8a2c){const _0x20e255=_0x50f639,_0xa7f502=this[_0x20e255(0x5bd)](_0x3f8a2c);if(_0xa7f502)_0xa7f502['erase']();},Game_Map[_0x50f639(0x346)]['setupSpawnTest']=function(){const _0x4f26b1=_0x50f639,_0x2198bf={'template':_0x4f26b1(0x22f),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this['_spawnedEvents'][_0x4f26b1(0x622)]+0x3e8};this[_0x4f26b1(0x4c1)](_0x2198bf);},Game_Map[_0x50f639(0x346)]['checkExistingEntitiesAt']=function(_0xb393af,_0xf8db84){const _0x5c4b57=_0x50f639;if(this['eventsXy'](_0xb393af,_0xf8db84)[_0x5c4b57(0x622)]>0x0)return!![];if($gamePlayer['x']===_0xb393af&&$gamePlayer['y']===_0xf8db84)return!![];if(this[_0x5c4b57(0x4a6)]()[_0x5c4b57(0x476)](_0xb393af,_0xf8db84))return!![];if(this[_0x5c4b57(0x457)]()[_0x5c4b57(0x476)](_0xb393af,_0xf8db84))return!![];return![];},Game_Map[_0x50f639(0x346)][_0x50f639(0x3cb)]=function(_0x1c1e95,_0x4c6bd8,_0x581f78){const _0x5d4ff4=_0x50f639;$gameTemp[_0x5d4ff4(0x253)]=_0x1c1e95;const _0x3c2316=new Game_Event(_0x1c1e95[_0x5d4ff4(0x336)],_0x1c1e95[_0x5d4ff4(0x353)]);$gameTemp[_0x5d4ff4(0x253)]=undefined,_0x3c2316[_0x5d4ff4(0x377)]();let _0x449a26=_0x4c6bd8-_0x3c2316[_0x5d4ff4(0x31f)][_0x5d4ff4(0x5fa)],_0x14fcae=_0x4c6bd8+_0x3c2316[_0x5d4ff4(0x31f)][_0x5d4ff4(0x45b)],_0x213700=_0x581f78-_0x3c2316[_0x5d4ff4(0x31f)]['up'],_0x5d6391=_0x581f78+_0x3c2316[_0x5d4ff4(0x31f)]['down'];for(let _0x101d1a=_0x449a26;_0x101d1a<=_0x14fcae;_0x101d1a++){for(let _0x149ce8=_0x213700;_0x149ce8<=_0x5d6391;_0x149ce8++){if(this[_0x5d4ff4(0x33e)](_0x101d1a,_0x149ce8))return![];}}return!![];},Game_Map['prototype'][_0x50f639(0x4c1)]=function(_0x4a14e8){const _0x108753=_0x50f639;$gameTemp[_0x108753(0x253)]=_0x4a14e8;const _0x4758c7=new Game_Event(_0x4a14e8[_0x108753(0x336)],_0x4a14e8['eventId']);$gameTemp[_0x108753(0x253)]=undefined,this[_0x108753(0x69e)][_0x108753(0x5d9)](_0x4758c7),_0x4758c7['setupSpawn'](_0x4a14e8),this['clearEventCache']();},Game_Map[_0x50f639(0x346)]['prepareSpawnedEventAtXY']=function(_0x8fd72d,_0x7b6a03,_0x4da5cb){const _0xc84ee1=_0x50f639,_0x920ed4=_0x8fd72d['template'][_0xc84ee1(0x4ab)]()[_0xc84ee1(0x334)]();if(_0x920ed4!==_0xc84ee1(0x3b9)){const _0x134eff=VisuMZ['EventTemplates'][_0x920ed4];_0x134eff&&(_0x8fd72d[_0xc84ee1(0x336)]=_0x134eff['MapID'],_0x8fd72d[_0xc84ee1(0x353)]=_0x134eff['EventID']);}const _0x2f4195=_0x8fd72d['x'],_0x2b42a2=_0x8fd72d['y'];if(!this[_0xc84ee1(0x624)](_0x2f4195,_0x2b42a2))return![];if(_0x7b6a03){if(this['checkExistingEntitiesAt'](_0x2f4195,_0x2b42a2))return![];if(!this[_0xc84ee1(0x3cb)](_0x8fd72d,_0x2f4195,_0x2b42a2))return![];}if(_0x4da5cb){if(!this[_0xc84ee1(0x54e)](_0x2f4195,_0x2b42a2))return![];}return this[_0xc84ee1(0x4c1)](_0x8fd72d),!![];},Game_Map['prototype']['prepareSpawnedEventAtRegion']=function(_0x2308e4,_0x3eaf05,_0x10e38b,_0x47ce39){const _0xc4a526=_0x50f639,_0x1f39c9=_0x2308e4[_0xc4a526(0x3ed)][_0xc4a526(0x4ab)]()[_0xc4a526(0x334)]();if(_0x1f39c9!==_0xc4a526(0x3b9)){const _0x7913b4=VisuMZ['EventTemplates'][_0x1f39c9];_0x7913b4&&(_0x2308e4[_0xc4a526(0x336)]=_0x7913b4[_0xc4a526(0x64b)],_0x2308e4['eventId']=_0x7913b4[_0xc4a526(0x1ca)]);}const _0x9b85ea=[],_0x55c87c=this[_0xc4a526(0x475)](),_0x3a9a88=this['height']();for(let _0x6e801c=0x0;_0x6e801c<_0x55c87c;_0x6e801c++){for(let _0x4d0736=0x0;_0x4d0736<_0x3a9a88;_0x4d0736++){if(!_0x3eaf05[_0xc4a526(0x292)](this[_0xc4a526(0x27c)](_0x6e801c,_0x4d0736)))continue;if(!this[_0xc4a526(0x624)](_0x6e801c,_0x4d0736))continue;if(_0x10e38b){if(this['checkExistingEntitiesAt'](_0x6e801c,_0x4d0736))continue;if(!this[_0xc4a526(0x3cb)](_0x2308e4,_0x6e801c,_0x4d0736))continue;}if(_0x47ce39){if(!this['isPassableByAnyDirection'](_0x6e801c,_0x4d0736))continue;}_0x9b85ea['push']([_0x6e801c,_0x4d0736]);}}if(_0x9b85ea[_0xc4a526(0x622)]>0x0){const _0x3723e9=_0x9b85ea[Math['randomInt'](_0x9b85ea['length'])];return _0x2308e4['x']=_0x3723e9[0x0],_0x2308e4['y']=_0x3723e9[0x1],this[_0xc4a526(0x4c1)](_0x2308e4),!![];}return![];},Game_Map['prototype']['prepareSpawnedEventAtTerrainTag']=function(_0x2dd91f,_0x3a5fa5,_0xa67525,_0x42c346){const _0x483990=_0x50f639,_0x5e4ea9=_0x2dd91f['template'][_0x483990(0x4ab)]()[_0x483990(0x334)]();if(_0x5e4ea9!==_0x483990(0x3b9)){const _0x341e55=VisuMZ[_0x483990(0x546)][_0x5e4ea9];_0x341e55&&(_0x2dd91f[_0x483990(0x336)]=_0x341e55[_0x483990(0x64b)],_0x2dd91f[_0x483990(0x353)]=_0x341e55[_0x483990(0x1ca)]);}const _0x163897=[],_0x56e99e=this[_0x483990(0x475)](),_0x209a73=this['height']();for(let _0x5eadbc=0x0;_0x5eadbc<_0x56e99e;_0x5eadbc++){for(let _0xe07c38=0x0;_0xe07c38<_0x209a73;_0xe07c38++){if(!_0x3a5fa5[_0x483990(0x292)](this[_0x483990(0x450)](_0x5eadbc,_0xe07c38)))continue;if(!this[_0x483990(0x624)](_0x5eadbc,_0xe07c38))continue;if(_0xa67525){if(this[_0x483990(0x33e)](_0x5eadbc,_0xe07c38))continue;if(!this[_0x483990(0x3cb)](_0x2dd91f,_0x5eadbc,_0xe07c38))continue;}if(_0x42c346){if(!this[_0x483990(0x54e)](_0x5eadbc,_0xe07c38))continue;}_0x163897[_0x483990(0x5d9)]([_0x5eadbc,_0xe07c38]);}}if(_0x163897[_0x483990(0x622)]>0x0){const _0x21fe0c=_0x163897[Math[_0x483990(0x4a4)](_0x163897[_0x483990(0x622)])];return _0x2dd91f['x']=_0x21fe0c[0x0],_0x2dd91f['y']=_0x21fe0c[0x1],this[_0x483990(0x4c1)](_0x2dd91f),!![];}return![];},Game_Map[_0x50f639(0x346)][_0x50f639(0x54e)]=function(_0x4efd98,_0x30ac4b){const _0x5983b3=_0x50f639;if(this['isPassable'](_0x4efd98,_0x30ac4b,0x2))return!![];if(this[_0x5983b3(0x1fb)](_0x4efd98,_0x30ac4b,0x4))return!![];if(this[_0x5983b3(0x1fb)](_0x4efd98,_0x30ac4b,0x6))return!![];if(this[_0x5983b3(0x1fb)](_0x4efd98,_0x30ac4b,0x8))return!![];return![];},Game_Map[_0x50f639(0x346)][_0x50f639(0x6a1)]=function(_0x568d34){const _0x2165ef=_0x50f639;if(_0x568d34<0x3e8)return;if(!this[_0x2165ef(0x69e)])return;const _0x3128ae=this[_0x2165ef(0x5bd)](_0x568d34);_0x3128ae[_0x2165ef(0x515)](-0x1,-0x1),_0x3128ae[_0x2165ef(0x1df)](),this[_0x2165ef(0x69e)][_0x568d34-0x3e8]=null,this[_0x2165ef(0x6a2)]();},Game_Map[_0x50f639(0x346)][_0x50f639(0x3c5)]=function(){for(const _0x520171 of this['_spawnedEvents']){if(_0x520171)return _0x520171;}return null;},Game_Map[_0x50f639(0x346)][_0x50f639(0x462)]=function(){const _0x4c3d4d=_0x50f639,_0x1a595b=this['firstSpawnedEvent']();return _0x1a595b?_0x1a595b[_0x4c3d4d(0x543)]:0x0;},Game_Map[_0x50f639(0x346)]['lastSpawnedEvent']=function(){const _0x486998=_0x50f639,_0x2139f1=this[_0x486998(0x69e)][_0x486998(0x25c)](0x0)['reverse']();for(const _0x5aef48 of _0x2139f1){if(_0x5aef48)return _0x5aef48;}return null;},Game_Map['prototype']['lastSpawnedEventID']=function(){const _0x4184f7=_0x50f639,_0x27638e=this[_0x4184f7(0x34f)]();return _0x27638e?_0x27638e[_0x4184f7(0x543)]:0x0;},Game_Map[_0x50f639(0x346)][_0x50f639(0x2f8)]=function(_0x4f9b5b,_0x2136e4){const _0x4e5402=_0x50f639,_0x4c38ee=this['eventsXy'](_0x4f9b5b,_0x2136e4);for(const _0x137099 of _0x4c38ee){if(!_0x137099)continue;if(_0x137099[_0x4e5402(0x4be)]())this['despawnEventId'](_0x137099[_0x4e5402(0x543)]);}},Game_Map['prototype']['despawnRegions']=function(_0xf4f8ed){const _0x10e959=_0x50f639;for(const _0x127d9c of this['_spawnedEvents']){if(!_0x127d9c)continue;_0xf4f8ed[_0x10e959(0x292)](_0x127d9c[_0x10e959(0x27c)]())&&this[_0x10e959(0x6a1)](_0x127d9c[_0x10e959(0x543)]);}},Game_Map[_0x50f639(0x346)]['despawnTerrainTags']=function(_0x3be35d){const _0x2ee7ae=_0x50f639;for(const _0x485c5f of this['_spawnedEvents']){if(!_0x485c5f)continue;_0x3be35d[_0x2ee7ae(0x292)](_0x485c5f[_0x2ee7ae(0x450)]())&&this[_0x2ee7ae(0x6a1)](_0x485c5f['_eventId']);}},Game_Map[_0x50f639(0x346)]['despawnEverything']=function(){const _0x3a2c2=_0x50f639;for(const _0x1e9f72 of this[_0x3a2c2(0x69e)]){if(!_0x1e9f72)continue;this[_0x3a2c2(0x6a1)](_0x1e9f72[_0x3a2c2(0x543)]);}},VisuMZ[_0x50f639(0x380)][_0x50f639(0x58f)]=Game_Map[_0x50f639(0x346)][_0x50f639(0x451)],Game_Map[_0x50f639(0x346)][_0x50f639(0x451)]=function(_0x38481e){const _0xc10640=_0x50f639;VisuMZ['EventsMoveCore'][_0xc10640(0x58f)]['call'](this,_0x38481e);if(_0x38481e>=0x3e8){const _0xef5e4e=this[_0xc10640(0x5bd)](_0x38481e);if(_0xef5e4e)_0xef5e4e['unlock']();}},Game_Map[_0x50f639(0x346)][_0x50f639(0x280)]=function(){const _0x2d625d=_0x50f639;this[_0x2d625d(0x43f)]=![],this['_forceHidePlayer']=![];if(!$dataMap)return;const _0x7dcf74=$dataMap[_0x2d625d(0x2c0)]||'';if(_0x7dcf74[_0x2d625d(0x1e7)](/<HIDE PLAYER>/i))this[_0x2d625d(0x43f)]=![],this[_0x2d625d(0x201)]=!![];else _0x7dcf74['match'](/<SHOW PLAYER>/i)&&(this['_forceShowPlayer']=!![],this[_0x2d625d(0x201)]=![]);},Game_Map['prototype'][_0x50f639(0x26c)]=function(){const _0x229313=_0x50f639;return this[_0x229313(0x43f)]===undefined&&this[_0x229313(0x280)](),this[_0x229313(0x43f)];},Game_Map[_0x50f639(0x346)][_0x50f639(0x55f)]=function(){const _0x1944b8=_0x50f639;return this[_0x1944b8(0x201)]===undefined&&this[_0x1944b8(0x280)](),this[_0x1944b8(0x201)];},VisuMZ[_0x50f639(0x380)][_0x50f639(0x2cb)]=Game_CharacterBase['prototype'][_0x50f639(0x428)],Game_CharacterBase['prototype'][_0x50f639(0x428)]=function(){const _0x20f7c1=_0x50f639;if(this===$gamePlayer){if($gameMap[_0x20f7c1(0x26c)]())return![];if($gameMap[_0x20f7c1(0x55f)]())return!![];}return VisuMZ['EventsMoveCore']['Game_CharacterBase_isTransparent'][_0x20f7c1(0x673)](this);},Game_Map['prototype'][_0x50f639(0x256)]=function(){const _0xb8dd3f=_0x50f639;this[_0xb8dd3f(0x291)]=![],this[_0xb8dd3f(0x680)]=![];if(!$dataMap)return;const _0x799866=$dataMap[_0xb8dd3f(0x2c0)]||'';if(_0x799866[_0xb8dd3f(0x1e7)](/<HIDE FOLLOWERS>/i))this['_forceShowFollower']=![],this[_0xb8dd3f(0x680)]=!![];else _0x799866[_0xb8dd3f(0x1e7)](/<SHOW FOLLOWERS>/i)&&(this[_0xb8dd3f(0x291)]=!![],this[_0xb8dd3f(0x680)]=![]);},Game_Map[_0x50f639(0x346)][_0x50f639(0x3b5)]=function(){const _0x2e0072=_0x50f639;return this[_0x2e0072(0x291)]===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x2e0072(0x291)];},Game_Map['prototype']['areFollowersForceHidden']=function(){const _0x5e272b=_0x50f639;return this['_forceHideFollower']===undefined&&this[_0x5e272b(0x256)](),this[_0x5e272b(0x680)];},VisuMZ[_0x50f639(0x380)][_0x50f639(0x5fc)]=Game_Followers[_0x50f639(0x346)]['isVisible'],Game_Followers[_0x50f639(0x346)]['isVisible']=function(){const _0x437f9f=_0x50f639;if($gameMap[_0x437f9f(0x3b5)]())return!![];if($gameMap[_0x437f9f(0x279)]())return![];return VisuMZ[_0x437f9f(0x380)][_0x437f9f(0x5fc)][_0x437f9f(0x673)](this);},Game_Map['prototype'][_0x50f639(0x2ba)]=function(){const _0x50633e=_0x50f639,_0x4c33cc=this['events'](),_0x17a8b8=[];$gameParty['_checkEncounterRaw']=!![];for(const _0x430290 of _0x4c33cc){if(!_0x430290)continue;if(_0x430290[_0x50633e(0x4ac)])continue;_0x430290['processEraseEncounterSpawn']()&&_0x17a8b8['push'](_0x430290);}$gameParty[_0x50633e(0x65c)]=undefined;for(const _0x17cd83 of _0x17a8b8){if(!_0x17cd83)continue;if(_0x17cd83[_0x50633e(0x4ac)])continue;this['eraseEvent'](_0x17cd83[_0x50633e(0x353)]());}},Game_Event[_0x50f639(0x346)][_0x50f639(0x278)]=function(){const _0x563bce=_0x50f639,_0x2ef5ca=this[_0x563bce(0x5bd)]()[_0x563bce(0x2c0)]||'';if(_0x2ef5ca[_0x563bce(0x1e7)](/<ERASE IF ENC(?:|OUNTER) HALF>/i)){if($gameParty[_0x563bce(0x63d)]())return!![];if($isTileEncounterHalf(this['x'],this['y']))return!![];}if(_0x2ef5ca[_0x563bce(0x1e7)](/<ERASE IF ENC(?:|OUNTER) NONE>/i)){if($gameParty[_0x563bce(0x491)]())return!![];if($isTileEncounterNone(this['x'],this['y']))return!![];}return![];},VisuMZ['EventsMoveCore'][_0x50f639(0x40b)]=Scene_Map[_0x50f639(0x346)][_0x50f639(0x31c)],Scene_Map[_0x50f639(0x346)]['onMapLoaded']=function(){const _0x2d4fad=_0x50f639;VisuMZ['EventsMoveCore']['Scene_Map_onMapLoadedEncErase'][_0x2d4fad(0x673)](this),$gameMap['processEraseEncounterEvents']();},Game_Map[_0x50f639(0x346)][_0x50f639(0x213)]=function(){const _0x1ad4e1=_0x50f639;if(!$dataMap)return;if(!$dataMap[_0x1ad4e1(0x2c0)])return;const _0x4d86e6=$dataMap['note'];if(_0x4d86e6['match'](/<MAP LOAD COMMON EVENT(?:|S):[ ](.*)>/i)){const _0x3b5aa6=String(RegExp['$1'])[_0x1ad4e1(0x5e7)](',')['map'](_0x5a6764=>Number(_0x5a6764));for(const _0x28ba76 of _0x3b5aa6){$gameTemp['reserveCommonEvent'](_0x28ba76);}}},Game_CommonEvent['prototype'][_0x50f639(0x68f)]=function(){const _0x6995f2=_0x50f639,_0x335e5a=this[_0x6995f2(0x5bd)]();return this[_0x6995f2(0x259)]()&&_0x335e5a[_0x6995f2(0x582)]>=0x1&&DataManager[_0x6995f2(0x596)](_0x335e5a[_0x6995f2(0x4dc)]);},Game_CommonEvent[_0x50f639(0x346)]['hasCPCs']=function(){const _0x518b67=_0x50f639;return VisuMZ[_0x518b67(0x380)]['CustomPageConditions']['_commonEvents'][_0x518b67(0x292)](this['_commonEventId']);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x520)]=Game_CommonEvent[_0x50f639(0x346)]['isActive'],Game_CommonEvent[_0x50f639(0x346)][_0x50f639(0x259)]=function(){const _0x1eb21b=_0x50f639;if(VisuMZ[_0x1eb21b(0x380)][_0x1eb21b(0x520)][_0x1eb21b(0x673)](this))return!![];else{const _0x10ca4f=this[_0x1eb21b(0x5bd)]();return VisuMZ['EventsMoveCore'][_0x1eb21b(0x60a)][_0x1eb21b(0x620)](this['event']()[_0x1eb21b(0x25b)],this[_0x1eb21b(0x214)],_0x10ca4f);}},VisuMZ[_0x50f639(0x380)][_0x50f639(0x4d3)]=Game_Map[_0x50f639(0x346)][_0x50f639(0x3b8)],Game_Map['prototype'][_0x50f639(0x3b8)]=function(){const _0xa90fd7=_0x50f639,_0x29e08b=VisuMZ['EventsMoveCore'][_0xa90fd7(0x4d3)][_0xa90fd7(0x673)](this),_0xff5821=VisuMZ['EventsMoveCore'][_0xa90fd7(0x60a)][_0xa90fd7(0x38c)][_0xa90fd7(0x479)](_0x50eac0=>$dataCommonEvents[_0x50eac0]);return _0x29e08b[_0xa90fd7(0x688)](_0xff5821)[_0xa90fd7(0x25a)]((_0x46c9d9,_0x43cedd,_0x4a16e4)=>_0x4a16e4[_0xa90fd7(0x320)](_0x46c9d9)===_0x43cedd);},Game_CharacterBase[_0x50f639(0x509)]=VisuMZ['EventsMoveCore'][_0x50f639(0x55c)]['Movement'][_0x50f639(0x21a)]??![],VisuMZ[_0x50f639(0x380)][_0x50f639(0x526)]=Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x2fc)],Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x2fc)]=function(){const _0x4f1bcb=_0x50f639;VisuMZ['EventsMoveCore']['Game_CharacterBase_initMembers']['call'](this),this[_0x4f1bcb(0x275)]();},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x275)]=function(){const _0x3828a9=_0x50f639;this[_0x3828a9(0x27d)]=0x1,this[_0x3828a9(0x418)]=0x1,this[_0x3828a9(0x4b2)]=![],this['clearPose'](),this[_0x3828a9(0x54c)](),this['clearSpriteOffsets'](),this[_0x3828a9(0x1d0)]();},VisuMZ[_0x50f639(0x380)]['Game_CharacterBase_opacity']=Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x484)],Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x484)]=function(){const _0xe7d6cb=_0x50f639;let _0x531978=VisuMZ[_0xe7d6cb(0x380)]['Game_CharacterBase_opacity'][_0xe7d6cb(0x673)](this);return _0x531978=this[_0xe7d6cb(0x2da)](_0x531978),_0x531978;},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x2da)]=function(_0x193733){return _0x193733;},Game_CharacterBase['prototype']['isSpriteVS8dir']=function(){const _0x2a6a28=_0x50f639;if(this[_0x2a6a28(0x381)]===Game_Player&&this[_0x2a6a28(0x4c2)]())return this[_0x2a6a28(0x495)]()[_0x2a6a28(0x447)]()[_0x2a6a28(0x1e7)](/\[VS8\]/i);else return Imported['VisuMZ_2_DragonbonesUnion']&&this[_0x2a6a28(0x5f2)]()?!![]:this['characterName']()[_0x2a6a28(0x1e7)](/\[VS8\]/i);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x254)]=Game_CharacterBase[_0x50f639(0x346)]['direction'],Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x284)]=function(){const _0x45359b=_0x50f639;if(!$dataMap)return this[_0x45359b(0x3a2)]||0x2;if(this[_0x45359b(0x665)]()&&!this[_0x45359b(0x694)]()&&this[_0x45359b(0x2fb)]())return this[_0x45359b(0x62e)]();else{if(this[_0x45359b(0x665)]()&&!this[_0x45359b(0x694)]())return 0x8;else return this[_0x45359b(0x637)]()&&this[_0x45359b(0x2fb)]()?this[_0x45359b(0x1ea)]():VisuMZ['EventsMoveCore']['Game_CharacterBase_direction'][_0x45359b(0x673)](this);}},VisuMZ[_0x50f639(0x380)][_0x50f639(0x4a3)]=Game_CharacterBase['prototype']['setDirection'],Game_CharacterBase[_0x50f639(0x346)]['setDirection']=function(_0xc805a6){const _0x10b758=_0x50f639;if(!this[_0x10b758(0x2fb)]())_0xc805a6=this[_0x10b758(0x47f)](_0xc805a6);VisuMZ[_0x10b758(0x380)][_0x10b758(0x4a3)][_0x10b758(0x673)](this,_0xc805a6),this['updateMoveSynchDirection']();},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x47f)]=function(_0x21b41a){const _0xbaeaba=_0x50f639;if(_0x21b41a===0x1)return this[_0xbaeaba(0x366)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x21b41a===0x3)return this[_0xbaeaba(0x366)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x21b41a===0x7)return this[_0xbaeaba(0x366)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x21b41a===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x21b41a;},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x610)]=function(_0x235f85){const _0x5d8e56=_0x50f639;return[0x1,0x3,0x5,0x7,0x9][_0x5d8e56(0x292)](_0x235f85);},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x1f0)]=function(){return this['_lastMovedDirection']||0x0;},VisuMZ[_0x50f639(0x380)][_0x50f639(0x30a)]=Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x2b8)],Game_CharacterBase['prototype'][_0x50f639(0x2b8)]=function(_0x4a8aff){const _0x4d36da=_0x50f639;this[_0x4d36da(0x482)]=_0x4a8aff,VisuMZ[_0x4d36da(0x380)]['Game_CharacterBase_moveStraight'][_0x4d36da(0x673)](this,_0x4a8aff);},Game_CharacterBase['prototype'][_0x50f639(0x5a0)]=function(_0x2ceb20){const _0x75226f=_0x50f639;if(!this[_0x75226f(0x610)](_0x2ceb20))return this['moveStraight'](_0x2ceb20);let _0x2f0838=0x0,_0x12397e=0x0;switch(_0x2ceb20){case 0x1:_0x2f0838=0x4,_0x12397e=0x2;break;case 0x3:_0x2f0838=0x6,_0x12397e=0x2;break;case 0x7:_0x2f0838=0x4,_0x12397e=0x8;break;case 0x9:_0x2f0838=0x6,_0x12397e=0x8;break;}if(VisuMZ[_0x75226f(0x380)]['Settings'][_0x75226f(0x57c)][_0x75226f(0x564)]){if(!this['canPass'](this['_x'],this['_y'],_0x2f0838))return this[_0x75226f(0x2b8)](_0x12397e);if(!this[_0x75226f(0x366)](this['_x'],this['_y'],_0x12397e))return this[_0x75226f(0x2b8)](_0x2f0838);if(!this[_0x75226f(0x497)](this['_x'],this['_y'],_0x2f0838,_0x12397e)){let _0x1b3a87=VisuMZ[_0x75226f(0x380)][_0x75226f(0x55c)][_0x75226f(0x57c)]['FavorHorz']?_0x2f0838:_0x12397e;return this[_0x75226f(0x2b8)](_0x1b3a87);}}this['_lastMovedDirection']=_0x2ceb20,this[_0x75226f(0x436)](_0x2f0838,_0x12397e);},VisuMZ['EventsMoveCore']['Game_CharacterBase_realMoveSpeed']=Game_CharacterBase[_0x50f639(0x346)]['realMoveSpeed'],Game_CharacterBase['prototype'][_0x50f639(0x534)]=function(){const _0x532669=_0x50f639;let _0x3e5f37=this['_moveSpeed'];return this[_0x532669(0x5c8)]()&&(_0x3e5f37+=this['dashSpeedModifier']()),this['adjustDir8MovementSpeed'](_0x3e5f37);},Game_CharacterBase[_0x50f639(0x346)]['dashSpeedModifier']=function(){const _0x3dfa4e=_0x50f639,_0x4d87d0=VisuMZ[_0x3dfa4e(0x380)]['Settings'][_0x3dfa4e(0x57c)];return _0x4d87d0[_0x3dfa4e(0x5f6)]!==undefined?_0x4d87d0[_0x3dfa4e(0x5f6)]:VisuMZ[_0x3dfa4e(0x380)]['Game_CharacterBase_realMoveSpeed'][_0x3dfa4e(0x673)](this)-this[_0x3dfa4e(0x3a8)];},Game_CharacterBase['prototype'][_0x50f639(0x45c)]=function(_0x1a8d4b){const _0x3dae75=_0x50f639,_0x341a07=VisuMZ['EventsMoveCore'][_0x3dae75(0x55c)][_0x3dae75(0x57c)];if(!_0x341a07[_0x3dae75(0x45f)])return _0x1a8d4b;return[0x1,0x3,0x7,0x9][_0x3dae75(0x292)](this[_0x3dae75(0x482)])&&(_0x1a8d4b*=_0x341a07[_0x3dae75(0x25f)]||0.01),_0x1a8d4b;},VisuMZ['EventsMoveCore'][_0x50f639(0x4fe)]=Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x5c8)],Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x5c8)]=function(){const _0x14d881=_0x50f639;if(!Game_CharacterBase['ALLOW_LADDER_DASH']&&this[_0x14d881(0x665)]())return![];if(this['_forceDashing'])return!![];return VisuMZ[_0x14d881(0x380)][_0x14d881(0x4fe)][_0x14d881(0x673)](this);},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x313)]=function(){const _0x51fae3=_0x50f639;return this[_0x51fae3(0x5c8)]()&&this[_0x51fae3(0x627)]===0x0;},VisuMZ[_0x50f639(0x380)]['Game_CharacterBase_pattern']=Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x4b5)],Game_CharacterBase[_0x50f639(0x346)]['pattern']=function(){const _0x50d733=_0x50f639;return this[_0x50d733(0x637)]()?this['getPosingCharacterPattern']():VisuMZ[_0x50d733(0x380)][_0x50d733(0x50d)][_0x50d733(0x673)](this);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x357)]=Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x57e)],Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x57e)]=function(){const _0x4ed460=_0x50f639;VisuMZ['EventsMoveCore'][_0x4ed460(0x357)][_0x4ed460(0x673)](this),this[_0x4ed460(0x67b)]();},VisuMZ['EventsMoveCore']['Game_CharacterBase_characterIndex']=Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x2b5)],Game_CharacterBase['prototype'][_0x50f639(0x2b5)]=function(){const _0x58fc45=_0x50f639;if(this['isSpriteVS8dir']())return this[_0x58fc45(0x62c)]();return VisuMZ[_0x58fc45(0x380)][_0x58fc45(0x2d2)][_0x58fc45(0x673)](this);},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x62c)]=function(){const _0x4f76ac=_0x50f639,_0x2ec6ae=this[_0x4f76ac(0x284)]();if(this[_0x4f76ac(0x694)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x2ec6ae))return 0x4;if([0x1,0x3,0x7,0x9][_0x4f76ac(0x292)](_0x2ec6ae))return 0x5;}else{if(this[_0x4f76ac(0x665)]())return 0x6;else{if(this[_0x4f76ac(0x637)]())return this[_0x4f76ac(0x490)]();else{if(this[_0x4f76ac(0x395)]){if([0x2,0x4,0x6,0x8][_0x4f76ac(0x292)](_0x2ec6ae))return 0x4;if([0x1,0x3,0x7,0x9][_0x4f76ac(0x292)](_0x2ec6ae))return 0x5;}else{if(this['hasEventIcon']()&&this[_0x4f76ac(0x616)]()){if([0x2,0x4,0x6,0x8][_0x4f76ac(0x292)](_0x2ec6ae))return 0x4;if([0x1,0x3,0x7,0x9][_0x4f76ac(0x292)](_0x2ec6ae))return 0x5;}else{if(this[_0x4f76ac(0x313)]()){if([0x2,0x4,0x6,0x8][_0x4f76ac(0x292)](_0x2ec6ae))return 0x2;if([0x1,0x3,0x7,0x9][_0x4f76ac(0x292)](_0x2ec6ae))return 0x3;}else{if([0x2,0x4,0x6,0x8]['includes'](_0x2ec6ae))return 0x0;if([0x1,0x3,0x7,0x9][_0x4f76ac(0x292)](_0x2ec6ae))return 0x1;}}}}}}},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x616)]=function(){const _0x42aa1d=_0x50f639;return VisuMZ[_0x42aa1d(0x380)][_0x42aa1d(0x55c)][_0x42aa1d(0x46f)]['CarryPose'];},Game_CharacterBase['prototype'][_0x50f639(0x52b)]=function(){const _0x53fc4f=_0x50f639;return this[_0x53fc4f(0x665)]()&&this[_0x53fc4f(0x450)]()===VisuMZ['EventsMoveCore'][_0x53fc4f(0x55c)][_0x53fc4f(0x5a1)][_0x53fc4f(0x604)];},Game_CharacterBase['prototype'][_0x50f639(0x62e)]=function(){const _0x414cc4=_0x50f639;return this[_0x414cc4(0x52b)]()?0x4:0x2;},VisuMZ[_0x50f639(0x380)][_0x50f639(0x527)]=Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x5c9)],Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x5c9)]=function(){const _0x44f4fa=_0x50f639;this[_0x44f4fa(0x53d)](),VisuMZ['EventsMoveCore'][_0x44f4fa(0x527)][_0x44f4fa(0x673)](this),this[_0x44f4fa(0x32d)]();},Game_CharacterBase[_0x50f639(0x346)]['updateScaleBase']=function(){const _0x4d90a9=_0x50f639;this[_0x4d90a9(0x1f7)]=this[_0x4d90a9(0x27d)]??0x1,this['_scaleY']=this[_0x4d90a9(0x418)]??0x1;},VisuMZ[_0x50f639(0x380)]['Game_CharacterBase_bushDepth']=Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x423)],Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x423)]=function(){const _0x316726=_0x50f639;let _0x24f724=VisuMZ[_0x316726(0x380)][_0x316726(0x642)]['call'](this);return this[_0x316726(0x260)]!==undefined&&(_0x24f724/=Math['max'](this[_0x316726(0x260)],0.00001)),Math[_0x316726(0x383)](_0x24f724);},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x32d)]=function(){const _0x4c1ce5=_0x50f639;this[_0x4c1ce5(0x691)]=this['_poseDuration']||0x0;if(this[_0x4c1ce5(0x691)]>0x0){this[_0x4c1ce5(0x691)]--;if(this[_0x4c1ce5(0x691)]<=0x0&&this['_pose']!==_0x4c1ce5(0x5e2))this[_0x4c1ce5(0x67b)]();}},VisuMZ[_0x50f639(0x380)][_0x50f639(0x542)]=Game_CharacterBase['prototype'][_0x50f639(0x436)],Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x436)]=function(_0x3bf97e,_0x16be9f){const _0x32d098=_0x50f639;VisuMZ[_0x32d098(0x380)]['Game_CharacterBase_moveDiagonally'][_0x32d098(0x673)](this,_0x3bf97e,_0x16be9f);if(this[_0x32d098(0x2fb)]())this['setDiagonalDirection'](_0x3bf97e,_0x16be9f);},Game_CharacterBase['prototype'][_0x50f639(0x3a6)]=function(_0x1d8679,_0x3e7e1d){const _0x263170=_0x50f639;if(_0x1d8679===0x4&&_0x3e7e1d===0x2)this[_0x263170(0x248)](0x1);if(_0x1d8679===0x6&&_0x3e7e1d===0x2)this['setDirection'](0x3);if(_0x1d8679===0x4&&_0x3e7e1d===0x8)this[_0x263170(0x248)](0x7);if(_0x1d8679===0x6&&_0x3e7e1d===0x8)this[_0x263170(0x248)](0x9);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x499)]=Game_CharacterBase[_0x50f639(0x346)]['hasStepAnime'],Game_CharacterBase[_0x50f639(0x346)]['hasStepAnime']=function(){const _0x367cdf=_0x50f639;if(this[_0x367cdf(0x637)]()&&this[_0x367cdf(0x552)]()==='ZZZ')return!![];return VisuMZ[_0x367cdf(0x380)][_0x367cdf(0x499)][_0x367cdf(0x673)](this);},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x6a4)]=function(_0x3b13bf,_0x461923){const _0x50d200=_0x50f639;if(_0x3b13bf[_0x50d200(0x1e7)](/Z/i))_0x3b13bf=_0x50d200(0x5e2);if(_0x3b13bf['match'](/SLEEP/i))_0x3b13bf='ZZZ';this[_0x50d200(0x2fb)]()&&(this[_0x50d200(0x449)]=_0x3b13bf[_0x50d200(0x4ab)]()[_0x50d200(0x334)](),this[_0x50d200(0x691)]=_0x461923||Infinity);},Game_CharacterBase[_0x50f639(0x346)]['getPose']=function(){const _0x425128=_0x50f639;return this[_0x425128(0x2fb)]()?(this['_pose']||'')[_0x425128(0x4ab)]()[_0x425128(0x334)]():''[_0x425128(0x4ab)]()[_0x425128(0x334)]();},Game_CharacterBase[_0x50f639(0x346)]['setBalloonPose']=function(_0xed63ba,_0x326352){const _0x5aa436=_0x50f639;if(this['isSpriteVS8dir']()){const _0x436b2a=['',_0x5aa436(0x262),_0x5aa436(0x599),_0x5aa436(0x678),'HEART',_0x5aa436(0x4c6),_0x5aa436(0x56f),'COBWEB',_0x5aa436(0x224),'LIGHT\x20BULB',_0x5aa436(0x5e2),'','','','',''][_0xed63ba];this['setPose'](_0x436b2a,_0x326352);}},Game_CharacterBase['prototype'][_0x50f639(0x67b)]=function(){const _0x4d430b=_0x50f639;this[_0x4d430b(0x449)]='',this[_0x4d430b(0x691)]=0x0;},Game_CharacterBase['prototype'][_0x50f639(0x637)]=function(){const _0x188f59=_0x50f639;return this[_0x188f59(0x2fb)]()&&!!this[_0x188f59(0x449)];},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x490)]=function(){const _0x2b232c=_0x50f639,_0x5788e6=this[_0x2b232c(0x449)]['toUpperCase']();switch(this['_pose'][_0x2b232c(0x4ab)]()[_0x2b232c(0x334)]()){case _0x2b232c(0x464):case'HMPH':case _0x2b232c(0x1f3):case _0x2b232c(0x31e):case _0x2b232c(0x5c7):case _0x2b232c(0x2a8):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype']['getPosingCharacterDirection']=function(){const _0x456e12=_0x50f639;switch(this['_pose'][_0x456e12(0x4ab)]()){case _0x456e12(0x262):case _0x456e12(0x599):case _0x456e12(0x678):case'!':case'?':return 0x2;break;case _0x456e12(0x3e0):case _0x456e12(0x4c6):case _0x456e12(0x56f):return 0x4;break;case'ITEM':case'HMPH':case _0x456e12(0x1f3):case'COBWEB':case _0x456e12(0x224):case _0x456e12(0x1cc):return 0x6;break;case _0x456e12(0x31e):case'KNEEL':case'COLLAPSE':case _0x456e12(0x5e2):case _0x456e12(0x664):return 0x8;break;default:return VisuMZ['EventsMoveCore'][_0x456e12(0x4a3)][_0x456e12(0x673)](this);break;}},Game_CharacterBase[_0x50f639(0x346)]['getPosingCharacterPattern']=function(){const _0x2adbd3=_0x50f639;switch(this[_0x2adbd3(0x449)][_0x2adbd3(0x4ab)]()){case'ITEM':case _0x2adbd3(0x31e):case _0x2adbd3(0x262):case'!':case'HEART':case _0x2adbd3(0x3e4):return 0x0;break;case _0x2adbd3(0x3ef):case _0x2adbd3(0x5c7):case _0x2adbd3(0x599):case'?':case'ANGER':case _0x2adbd3(0x224):return 0x1;break;case _0x2adbd3(0x1f3):case _0x2adbd3(0x2a8):case _0x2adbd3(0x678):case _0x2adbd3(0x56f):case _0x2adbd3(0x1cc):return 0x2;break;default:return VisuMZ[_0x2adbd3(0x380)][_0x2adbd3(0x50d)]['call'](this);break;}},Game_CharacterBase[_0x50f639(0x346)]['forceCarrying']=function(){this['_forceCarrying']=!![];},Game_CharacterBase[_0x50f639(0x346)]['clearCarrying']=function(){const _0x588196=_0x50f639;this[_0x588196(0x395)]=![];},Game_CharacterBase['prototype'][_0x50f639(0x40c)]=function(){const _0x1c0b44=_0x50f639;this[_0x1c0b44(0x51c)]=!![];},Game_CharacterBase[_0x50f639(0x346)]['clearDashing']=function(){const _0x2f72fc=_0x50f639;this[_0x2f72fc(0x51c)]=![];},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x403)]=function(){const _0x25266d=_0x50f639;if(this[_0x25266d(0x46a)]())return![];if(this[_0x25266d(0x28a)])return![];if(this['_characterName']==='')return![];if(this['constructor']===Game_Vehicle)return![];if(this['isTransparent']())return![];return!![];},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x58b)]=function(){const _0x5cc4a7=_0x50f639;if(this['isOnLadder']())return!![];if(this[_0x5cc4a7(0x381)]===Game_Player&&this[_0x5cc4a7(0x4c2)]())return!![];return![];},Game_CharacterBase[_0x50f639(0x346)]['shadowFilename']=function(){const _0x2197b0=_0x50f639;return VisuMZ['EventsMoveCore'][_0x2197b0(0x55c)]['Movement'][_0x2197b0(0x631)];},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x3c3)]=function(){const _0x447120=_0x50f639;return this[_0x447120(0x5c6)]();},Game_CharacterBase[_0x50f639(0x346)]['shadowY']=function(){const _0x5bf554=_0x50f639,_0xe617f8=$gameMap[_0x5bf554(0x2e6)]();return Math[_0x5bf554(0x383)](this[_0x5bf554(0x3b3)]()*_0xe617f8+_0xe617f8);},Game_CharacterBase[_0x50f639(0x2cd)]=0x64,Game_CharacterBase['prototype']['getDiagonalDestination']=function(_0x4f9faa,_0x3d6487){const _0x336235=_0x50f639;if(TouchInput['isPressed']())return![];if(!$gameMap[_0x336235(0x38e)]())return![];if($gameMap[_0x336235(0x477)](_0x4f9faa,_0x3d6487)['length']>0x0)return![];if(!$gameMap['isPassableByAnyDirection'](_0x4f9faa,_0x3d6487))return![];const _0x5ca66d=$gameMap[_0x336235(0x5b7)]['length'];if(_0x5ca66d>=Game_CharacterBase[_0x336235(0x2cd)])return![];return!![];},Game_Character[_0x50f639(0x346)]['findDiagonalDirectionTo']=function(_0x5ffa31,_0xc5577d){const _0x144f05=_0x50f639;let _0xfce0=this[_0x144f05(0x67f)](_0x5ffa31,_0xc5577d);if(!this['getDiagonalDestination'](_0x5ffa31,_0xc5577d))return _0xfce0;if(this[_0x144f05(0x3d4)](_0x5ffa31,_0xc5577d))return _0xfce0;const _0x337869=_0xfce0;if(_0xfce0===0x2){if(_0x5ffa31>this['x']&&this[_0x144f05(0x366)](this['x'],this['y'],0x6))_0xfce0=0x3;if(_0x5ffa31<this['x']&&this[_0x144f05(0x366)](this['x'],this['y'],0x4))_0xfce0=0x1;}else{if(_0xfce0===0x4){if(_0xc5577d>this['y']&&this['canPass'](this['x'],this['y'],0x4))_0xfce0=0x1;if(_0xc5577d<this['y']&&this[_0x144f05(0x366)](this['x'],this['y'],0x6))_0xfce0=0x7;}else{if(_0xfce0===0x6){if(_0xc5577d>this['y']&&this['canPass'](this['x'],this['y'],0x4))_0xfce0=0x3;if(_0xc5577d<this['y']&&this[_0x144f05(0x366)](this['x'],this['y'],0x6))_0xfce0=0x9;}else{if(_0xfce0===0x8){if(_0x5ffa31>this['x']&&this[_0x144f05(0x366)](this['x'],this['y'],0x6))_0xfce0=0x9;if(_0x5ffa31<this['x']&&this[_0x144f05(0x366)](this['x'],this['y'],0x4))_0xfce0=0x7;}}}}if(!this['canPass'](this['x'],this['y'],_0xfce0))return _0x337869;const _0x1e1809=$gameMap[_0x144f05(0x349)](this['x'],_0xfce0),_0xf94f14=$gameMap['roundYWithDirection'](this['y'],_0xfce0);if(this['isCollidedWithEvents'](_0x1e1809,_0xf94f14))_0xfce0=_0x337869;return _0xfce0;},VisuMZ[_0x50f639(0x380)][_0x50f639(0x31b)]=Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x366)],Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x366)]=function(_0x4984e7,_0x3833b7,_0x302a5d){const _0x40401c=_0x50f639;return this[_0x40401c(0x643)]===_0x40401c(0x445)?this['vehicle']()[_0x40401c(0x548)](_0x4984e7,_0x3833b7,_0x302a5d):VisuMZ['EventsMoveCore'][_0x40401c(0x31b)]['call'](this,_0x4984e7,_0x3833b7,_0x302a5d);},Game_CharacterBase['prototype'][_0x50f639(0x574)]=function(){const _0x22fb1f=_0x50f639;this['_spriteOffsetX']=0x0,this[_0x22fb1f(0x29b)]=0x0;},VisuMZ['EventsMoveCore'][_0x50f639(0x55d)]=Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x5c6)],Game_CharacterBase['prototype']['screenX']=function(){const _0x521901=_0x50f639;return VisuMZ[_0x521901(0x380)][_0x521901(0x55d)]['call'](this)+(this[_0x521901(0x417)]||0x0);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x268)]=Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x4c7)],Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x4c7)]=function(){const _0xa4fc62=_0x50f639;return VisuMZ[_0xa4fc62(0x380)][_0xa4fc62(0x268)]['call'](this)+(this[_0xa4fc62(0x29b)]||0x0);},Game_CharacterBase[_0x50f639(0x3d5)]=VisuMZ[_0x50f639(0x380)][_0x50f639(0x55c)][_0x50f639(0x57c)][_0x50f639(0x6a0)]??-0x6,Game_CharacterBase[_0x50f639(0x346)]['shiftY']=function(){const _0x20ba10=_0x50f639;let _0x30136f=this['isObjectCharacter']()?0x0:-Game_CharacterBase['DEFAULT_SHIFT_Y'];return this[_0x20ba10(0x260)]&&(_0x30136f*=this[_0x20ba10(0x260)]),Math['round'](_0x30136f);},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x1d0)]=function(){this['_stepPattern']='';},VisuMZ[_0x50f639(0x380)][_0x50f639(0x531)]=Game_CharacterBase['prototype'][_0x50f639(0x234)],Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x234)]=function(){const _0x3272cf=_0x50f639;if(this['_patternLocked'])return;if(this[_0x3272cf(0x365)]())return;VisuMZ[_0x3272cf(0x380)][_0x3272cf(0x531)][_0x3272cf(0x673)](this);},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x365)]=function(){const _0x533787=_0x50f639;if(!this['hasStepAnime']()&&this[_0x533787(0x627)]>0x0)return![];switch(String(this['_stepPattern'])[_0x533787(0x4ab)]()[_0x533787(0x334)]()){case _0x533787(0x687):this[_0x533787(0x21c)]+=0x1;if(this['_pattern']>0x2)this[_0x533787(0x389)](0x0);break;case'RIGHT\x20TO\x20LEFT':this[_0x533787(0x21c)]-=0x1;if(this[_0x533787(0x21c)]<0x0)this[_0x533787(0x389)](0x2);break;case _0x533787(0x59d):case'SPIN\x20CW':this[_0x533787(0x3bb)]();break;case _0x533787(0x498):case _0x533787(0x557):case _0x533787(0x2c3):case _0x533787(0x52f):this[_0x533787(0x4ca)]();break;default:return![];}return!![];},Game_CharacterBase['prototype'][_0x50f639(0x3f3)]=function(){const _0x1fc5ff=_0x50f639;return $gameSystem[_0x1fc5ff(0x3f3)](this);},Game_CharacterBase[_0x50f639(0x346)]['hasEventIcon']=function(){const _0xcec5b9=_0x50f639,_0x33a091=this['getEventIconData']();if(!_0x33a091)return![];return _0x33a091[_0xcec5b9(0x662)]>0x0;},Game_CharacterBase['prototype'][_0x50f639(0x67c)]=function(){const _0x3f0111=_0x50f639,_0x27f7c2=this[_0x3f0111(0x284)]();return $gameMap[_0x3f0111(0x349)](this['x'],_0x27f7c2);},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x1d6)]=function(){const _0x5da2f7=_0x50f639,_0x451f72=this[_0x5da2f7(0x284)]();return $gameMap[_0x5da2f7(0x1e3)](this['y'],_0x451f72);},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x438)]=function(){const _0x408deb=_0x50f639,_0xe1f8b2=this['reverseDir'](this[_0x408deb(0x284)]());return $gameMap[_0x408deb(0x349)](this['x'],_0xe1f8b2);},Game_CharacterBase[_0x50f639(0x346)]['backY']=function(){const _0x231724=_0x50f639,_0x3235b4=this[_0x231724(0x692)](this['direction']());return $gameMap[_0x231724(0x1e3)](this['y'],_0x3235b4);},Game_CharacterBase['prototype'][_0x50f639(0x5bb)]=function(){const _0x303be4=_0x50f639,_0x360961=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this['direction']()];return $gameMap[_0x303be4(0x349)](this['x'],_0x360961);},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x2c2)]=function(){const _0x1ee47b=_0x50f639,_0x106192=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x1ee47b(0x284)]()];return $gameMap[_0x1ee47b(0x1e3)](this['y'],_0x106192);},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x23e)]=function(){const _0xf01a94=_0x50f639,_0x9c491=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0xf01a94(0x284)]()];return $gameMap[_0xf01a94(0x349)](this['x'],_0x9c491);},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x4f4)]=function(){const _0x193d8c=_0x50f639,_0x47c258=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x193d8c(0x284)]()];return $gameMap[_0x193d8c(0x1e3)](this['y'],_0x47c258);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x4d2)]=Game_Character[_0x50f639(0x346)][_0x50f639(0x2ca)],Game_Character['prototype']['setMoveRoute']=function(_0x2e7993){const _0x394f78=_0x50f639;route=JsonEx[_0x394f78(0x49b)](_0x2e7993),VisuMZ[_0x394f78(0x380)][_0x394f78(0x4d2)][_0x394f78(0x673)](this,route);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x5cf)]=Game_Character[_0x50f639(0x346)]['forceMoveRoute'],Game_Character[_0x50f639(0x346)]['forceMoveRoute']=function(_0x454ef5){const _0x535088=_0x50f639;route=JsonEx[_0x535088(0x49b)](_0x454ef5),VisuMZ[_0x535088(0x380)][_0x535088(0x5cf)][_0x535088(0x673)](this,route);},VisuMZ[_0x50f639(0x380)]['Game_Character_processMoveCommand']=Game_Character[_0x50f639(0x346)][_0x50f639(0x62f)],Game_Character[_0x50f639(0x346)][_0x50f639(0x62f)]=function(_0x13ac38){const _0x3073af=_0x50f639,_0x2c2762=Game_Character,_0x231baf=_0x13ac38[_0x3073af(0x287)];if(_0x13ac38[_0x3073af(0x303)]===_0x2c2762[_0x3073af(0x238)]){let _0x5dbf77=_0x13ac38['parameters'][0x0];_0x5dbf77=this[_0x3073af(0x3a7)](_0x5dbf77),_0x5dbf77=this[_0x3073af(0x3e3)](_0x5dbf77),this['processMoveCommandEventsMoveCore'](_0x13ac38,_0x5dbf77);}else VisuMZ[_0x3073af(0x380)]['Game_Character_processMoveCommand']['call'](this,_0x13ac38);},Game_Character['prototype']['convertVariableValuesInScriptCall']=function(_0x114355){const _0x24f033=_0x50f639,_0x215ece=/\$gameVariables\.value\((\d+)\)/gi,_0x512a63=/\\V\[(\d+)\]/gi;while(_0x114355[_0x24f033(0x1e7)](_0x215ece)){_0x114355=_0x114355[_0x24f033(0x2fe)](_0x215ece,(_0x1ae8df,_0x380e6b)=>$gameVariables[_0x24f033(0x264)](parseInt(_0x380e6b)));}while(_0x114355[_0x24f033(0x1e7)](_0x512a63)){_0x114355=_0x114355['replace'](_0x512a63,(_0x57d3a4,_0x4ba0f8)=>$gameVariables[_0x24f033(0x264)](parseInt(_0x4ba0f8)));}return _0x114355;},Game_Character[_0x50f639(0x346)][_0x50f639(0x3e3)]=function(_0x21ba49){const _0x33b9bc=_0x50f639,_0x1d3f3c=/\\SELFVAR\[(\d+)\]/gi;while(_0x21ba49[_0x33b9bc(0x1e7)](_0x1d3f3c)){_0x21ba49=_0x21ba49['replace'](_0x1d3f3c,(_0x5cb9ee,_0x5a92cf)=>getSelfVariableValue(this[_0x33b9bc(0x4c3)],this[_0x33b9bc(0x543)],parseInt(_0x5a92cf)));}return _0x21ba49;},Game_Character[_0x50f639(0x346)][_0x50f639(0x487)]=function(_0x46a8e3,_0x20adf5){const _0x2dd10d=_0x50f639;if(_0x20adf5[_0x2dd10d(0x1e7)](/ANIMATION:[ ](\d+)/i))return this[_0x2dd10d(0x52e)](Number(RegExp['$1']));if(_0x20adf5[_0x2dd10d(0x1e7)](/BALLOON:[ ](.*)/i))return this[_0x2dd10d(0x64e)](String(RegExp['$1']));if(_0x20adf5[_0x2dd10d(0x1e7)](/FADE IN:[ ](\d+)/i))return this[_0x2dd10d(0x5ef)](Number(RegExp['$1']));if(_0x20adf5['match'](/FADE OUT:[ ](\d+)/i))return this[_0x2dd10d(0x236)](Number(RegExp['$1']));if(_0x20adf5[_0x2dd10d(0x1e7)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x2dd10d(0x62d)]();if(_0x20adf5[_0x2dd10d(0x1e7)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x2dd10d(0x227)]();if(_0x20adf5['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this['forceDashing']();if(_0x20adf5['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x2dd10d(0x54c)]();if(_0x20adf5[_0x2dd10d(0x1e7)](/HUG:[ ]LEFT/i))return this[_0x2dd10d(0x674)]('left');if(_0x20adf5['match'](/HUG:[ ]RIGHT/i))return this[_0x2dd10d(0x674)]('right');if(_0x20adf5[_0x2dd10d(0x1e7)](/INDEX:[ ](\d+)/i))return this[_0x2dd10d(0x53a)](Number(RegExp['$1']));if(_0x20adf5[_0x2dd10d(0x1e7)](/INDEX:[ ]([\+\-]\d+)/i)){const _0x30238c=this[_0x2dd10d(0x630)]+Number(RegExp['$1']);return this['processMoveRouteSetIndex'](_0x30238c);}if(_0x20adf5[_0x2dd10d(0x1e7)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x2dd10d(0x544)](Number(RegExp['$1']));if(_0x20adf5[_0x2dd10d(0x1e7)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['processMoveRouteJumpTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x20adf5[_0x2dd10d(0x1e7)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x3afa99=$gameMap[_0x2dd10d(0x5bd)](Number(RegExp['$1']));return this[_0x2dd10d(0x4d4)](_0x3afa99);}if(_0x20adf5[_0x2dd10d(0x1e7)](/JUMP TO PLAYER/i))return this['processMoveRouteJumpToCharacter']($gamePlayer);if(_0x20adf5[_0x2dd10d(0x1e7)](/JUMP TO HOME/i)&&this['eventId']){const _0x1128e7=this[_0x2dd10d(0x5e6)],_0x128890=this['_randomHomeY'];return this[_0x2dd10d(0x443)](_0x1128e7,_0x128890);}if(_0x20adf5[_0x2dd10d(0x1e7)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x4b144c=String(RegExp['$1']),_0x27192f=this[_0x2dd10d(0x5a5)](_0x20adf5);return this[_0x2dd10d(0x61d)](_0x4b144c,_0x27192f);}if(_0x20adf5[_0x2dd10d(0x1e7)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x3ba5cc=Number(RegExp['$1']),_0xcf13c3=Number(RegExp['$2']),_0x503d85=this[_0x2dd10d(0x5a5)](_0x20adf5);return this[_0x2dd10d(0x5ed)](_0x3ba5cc,_0xcf13c3,_0x503d85);}if(_0x20adf5['match'](/MOVE TO EVENT:[ ](\d+)/i)){const _0xb8b2bd=$gameMap[_0x2dd10d(0x5bd)](Number(RegExp['$1'])),_0x334057=this[_0x2dd10d(0x5a5)](_0x20adf5);return this[_0x2dd10d(0x671)](_0xb8b2bd,_0x334057);}if(_0x20adf5[_0x2dd10d(0x1e7)](/MOVE TO PLAYER/i)){const _0x3ef566=this[_0x2dd10d(0x5a5)](_0x20adf5);return this[_0x2dd10d(0x671)]($gamePlayer,_0x3ef566);}if(_0x20adf5[_0x2dd10d(0x1e7)](/MOVE TO HOME/i)&&this[_0x2dd10d(0x353)]){const _0x4f714d=this['_randomHomeX'],_0x2b1cbb=this[_0x2dd10d(0x2a2)],_0x34ac18=this[_0x2dd10d(0x5a5)](_0x20adf5);return this[_0x2dd10d(0x5ed)](_0x4f714d,_0x2b1cbb,_0x34ac18);}if(_0x20adf5[_0x2dd10d(0x1e7)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x2dd10d(0x24d)](0x1,Number(RegExp['$1']));if(_0x20adf5[_0x2dd10d(0x1e7)](/MOVE DOWN:[ ](\d+)/i))return this[_0x2dd10d(0x24d)](0x2,Number(RegExp['$1']));if(_0x20adf5[_0x2dd10d(0x1e7)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x2dd10d(0x24d)](0x3,Number(RegExp['$1']));if(_0x20adf5[_0x2dd10d(0x1e7)](/MOVE LEFT:[ ](\d+)/i))return this[_0x2dd10d(0x24d)](0x4,Number(RegExp['$1']));if(_0x20adf5['match'](/MOVE RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x6,Number(RegExp['$1']));if(_0x20adf5[_0x2dd10d(0x1e7)](/MOVE UPPER LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x7,Number(RegExp['$1']));if(_0x20adf5[_0x2dd10d(0x1e7)](/MOVE UP:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x8,Number(RegExp['$1']));if(_0x20adf5['match'](/MOVE UPPER RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x9,Number(RegExp['$1']));if(_0x20adf5[_0x2dd10d(0x1e7)](/OPACITY:[ ](\d+)([%％])/i)){const _0x1e8eef=Math[_0x2dd10d(0x452)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x1e8eef[_0x2dd10d(0x36d)](0x0,0xff));}if(_0x20adf5[_0x2dd10d(0x1e7)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x40a9ba=this[_0x2dd10d(0x468)]+Math['round'](Number(RegExp['$1'])/0x64*0xff);return this[_0x2dd10d(0x61a)](_0x40a9ba[_0x2dd10d(0x36d)](0x0,0xff));}if(_0x20adf5['match'](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x1db5fe=this[_0x2dd10d(0x468)]+Number(RegExp['$1']);return this[_0x2dd10d(0x61a)](_0x1db5fe['clamp'](0x0,0xff));}if(_0x20adf5['match'](/PATTERN LOCK:[ ](\d+)/i))return this['processMoveRoutePatternLock'](Number(RegExp['$1']));if(_0x20adf5[_0x2dd10d(0x1e7)](/PATTERN UNLOCK/i))return this[_0x2dd10d(0x4b2)]=![];if(_0x20adf5['match'](/POSE:[ ](.*)/i)){const _0x410634=String(RegExp['$1'])[_0x2dd10d(0x4ab)]()[_0x2dd10d(0x334)]();return this[_0x2dd10d(0x6a4)](_0x410634);}if(_0x20adf5[_0x2dd10d(0x1e7)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x49e108=Number(RegExp['$1']),_0x127f32=Number(RegExp['$2']);return this[_0x2dd10d(0x602)](_0x49e108,_0x127f32);}if(_0x20adf5[_0x2dd10d(0x1e7)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x246a48=$gameMap[_0x2dd10d(0x5bd)](Number(RegExp['$1']));return this[_0x2dd10d(0x32a)](_0x246a48);}if(_0x20adf5[_0x2dd10d(0x1e7)](/STEP TOWARD PLAYER/i))return this['processMoveRouteStepToCharacter']($gamePlayer);if(_0x20adf5[_0x2dd10d(0x1e7)](/STEP TOWARD HOME/i)&&this['eventId']){const _0x46ddcc=this[_0x2dd10d(0x5e6)],_0x50288e=this[_0x2dd10d(0x2a2)];return this[_0x2dd10d(0x602)](_0x46ddcc,_0x50288e);}if(_0x20adf5['match'](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x2dd10d(0x20c)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x20adf5[_0x2dd10d(0x1e7)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x1c5689=$gameMap[_0x2dd10d(0x5bd)](Number(RegExp['$1']));return this[_0x2dd10d(0x5a4)](_0x1c5689);}if(_0x20adf5[_0x2dd10d(0x1e7)](/STEP AWAY FROM PLAYER/i))return this['moveAwayFromCharacter']($gamePlayer);if(_0x20adf5[_0x2dd10d(0x1e7)](/STEP AWAY FROM HOME/i)&&this[_0x2dd10d(0x353)]){const _0xa907cc=this[_0x2dd10d(0x5e6)],_0x4a66cb=this[_0x2dd10d(0x2a2)];return this[_0x2dd10d(0x20c)](_0xa907cc,_0x4a66cb);}if(_0x20adf5[_0x2dd10d(0x1e7)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x2dd10d(0x41b)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x20adf5[_0x2dd10d(0x1e7)](/TURN TO EVENT:[ ](\d+)/i)){const _0x4cbaee=$gameMap['event'](Number(RegExp['$1']));return this[_0x2dd10d(0x51d)](_0x4cbaee);}if(_0x20adf5[_0x2dd10d(0x1e7)](/TURN TO PLAYER/i))return this[_0x2dd10d(0x51d)]($gamePlayer);if(_0x20adf5[_0x2dd10d(0x1e7)](/TURN TO HOME/i)&&this['eventId']){const _0x2d4c29=this['_randomHomeX'],_0x193314=this[_0x2dd10d(0x2a2)];return this['turnTowardPoint'](_0x2d4c29,_0x193314);}if(_0x20adf5[_0x2dd10d(0x1e7)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x2dd10d(0x2e0)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x20adf5['match'](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x3b0178=$gameMap[_0x2dd10d(0x5bd)](Number(RegExp['$1']));return this[_0x2dd10d(0x277)](_0x3b0178);}if(_0x20adf5[_0x2dd10d(0x1e7)](/TURN AWAY FROM PLAYER/i))return this[_0x2dd10d(0x277)]($gamePlayer);if(_0x20adf5[_0x2dd10d(0x1e7)](/TURN AWAY FROM HOME/i)&&this[_0x2dd10d(0x353)]){const _0x53140c=this[_0x2dd10d(0x5e6)],_0x45e18e=this[_0x2dd10d(0x2a2)];return this[_0x2dd10d(0x2e0)](_0x53140c,_0x45e18e);}if(_0x20adf5[_0x2dd10d(0x1e7)](/TURN LOWER LEFT/i))return this[_0x2dd10d(0x248)](0x1);if(_0x20adf5['match'](/TURN LOWER RIGHT/i))return this[_0x2dd10d(0x248)](0x3);if(_0x20adf5[_0x2dd10d(0x1e7)](/TURN UPPER LEFT/i))return this[_0x2dd10d(0x248)](0x7);if(_0x20adf5['match'](/TURN UPPER RIGHT/i))return this[_0x2dd10d(0x248)](0x9);if(_0x20adf5[_0x2dd10d(0x1e7)](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x2dd10d(0x659)](RegExp['$1'],RegExp['$2']);if(_0x20adf5['match'](/Self Variable[ ](.*):[ ](.*)/i))return this['processMoveRouteSelfVariable'](RegExp['$1'],RegExp['$2']);if(_0x20adf5[_0x2dd10d(0x1e7)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['processMoveRouteTeleportTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x20adf5['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x12bebd=$gameMap[_0x2dd10d(0x5bd)](Number(RegExp['$1']));return this[_0x2dd10d(0x4ed)](_0x12bebd);}if(_0x20adf5[_0x2dd10d(0x1e7)](/TELEPORT TO PLAYER/i))return this[_0x2dd10d(0x4ed)]($gamePlayer);if(_0x20adf5['match'](/TELEPORT TO HOME/i)&&this[_0x2dd10d(0x353)]){const _0x863dfc=this[_0x2dd10d(0x5e6)],_0x1ce2f0=this[_0x2dd10d(0x2a2)];return this[_0x2dd10d(0x3f4)](_0x863dfc,_0x1ce2f0);}try{VisuMZ[_0x2dd10d(0x380)]['Game_Character_processMoveCommand'][_0x2dd10d(0x673)](this,_0x46a8e3);}catch(_0x3973ea){if($gameTemp[_0x2dd10d(0x38f)]())console[_0x2dd10d(0x347)](_0x3973ea);}},Game_Character[_0x50f639(0x346)][_0x50f639(0x52e)]=function(_0x3003e5){$gameTemp['requestAnimation']([this],_0x3003e5);},Game_Character[_0x50f639(0x346)][_0x50f639(0x64e)]=function(_0x4e332c){const _0x38f6ee=_0x50f639;let _0x5e2a5f=0x0;switch(_0x4e332c[_0x38f6ee(0x4ab)]()[_0x38f6ee(0x334)]()){case'!':case _0x38f6ee(0x262):_0x5e2a5f=0x1;break;case'?':case _0x38f6ee(0x599):_0x5e2a5f=0x2;break;case _0x38f6ee(0x222):case _0x38f6ee(0x33b):case'MUSIC\x20NOTE':case'MUSIC-NOTE':case'MUSICNOTE':_0x5e2a5f=0x3;break;case _0x38f6ee(0x3e0):case'LOVE':_0x5e2a5f=0x4;break;case _0x38f6ee(0x4c6):_0x5e2a5f=0x5;break;case _0x38f6ee(0x56f):_0x5e2a5f=0x6;break;case _0x38f6ee(0x3e4):case _0x38f6ee(0x59c):case'FRUSTRATION':_0x5e2a5f=0x7;break;case _0x38f6ee(0x224):case _0x38f6ee(0x367):_0x5e2a5f=0x8;break;case'LIGHT':case'BULB':case _0x38f6ee(0x1cc):case'LIGHT-BULB':case _0x38f6ee(0x2ce):_0x5e2a5f=0x9;break;case'Z':case'ZZ':case _0x38f6ee(0x5e2):case'SLEEP':_0x5e2a5f=0xa;break;case _0x38f6ee(0x444):_0x5e2a5f=0xb;break;case _0x38f6ee(0x579):_0x5e2a5f=0xc;break;case _0x38f6ee(0x317):_0x5e2a5f=0xd;break;case _0x38f6ee(0x588):_0x5e2a5f=0xe;break;case'USER-DEFINED\x205':_0x5e2a5f=0xf;break;}$gameTemp[_0x38f6ee(0x21b)](this,_0x5e2a5f);},Game_Character[_0x50f639(0x346)][_0x50f639(0x5ef)]=function(_0x30ea78){const _0x51cf31=_0x50f639;_0x30ea78+=this[_0x51cf31(0x468)],this[_0x51cf31(0x61a)](_0x30ea78[_0x51cf31(0x36d)](0x0,0xff));if(this['_opacity']<0xff)this[_0x51cf31(0x1fc)]--;},Game_Character[_0x50f639(0x346)][_0x50f639(0x236)]=function(_0x2cc274){const _0x507cf4=_0x50f639;_0x2cc274=this[_0x507cf4(0x468)]-_0x2cc274,this[_0x507cf4(0x61a)](_0x2cc274[_0x507cf4(0x36d)](0x0,0xff));if(this['_opacity']>0x0)this['_moveRouteIndex']--;},Game_Character[_0x50f639(0x346)][_0x50f639(0x674)]=function(_0x2e27ca){const _0x3b5c93=_0x50f639,_0x49f89=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x461dd5=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x34e300=this['direction'](),_0x5460fe=(_0x2e27ca===_0x3b5c93(0x5fa)?_0x49f89:_0x461dd5)[_0x34e300],_0x1bb06c=(_0x2e27ca===_0x3b5c93(0x5fa)?_0x461dd5:_0x49f89)[_0x34e300];if(this['canPass'](this['x'],this['y'],_0x5460fe))_0x2e27ca==='left'?this[_0x3b5c93(0x4ca)]():this['turnRight90']();else!this[_0x3b5c93(0x366)](this['x'],this['y'],this[_0x3b5c93(0x284)]())&&(this[_0x3b5c93(0x366)](this['x'],this['y'],_0x1bb06c)?_0x2e27ca===_0x3b5c93(0x5fa)?this[_0x3b5c93(0x3bb)]():this[_0x3b5c93(0x4ca)]():this['turn180']());this[_0x3b5c93(0x366)](this['x'],this['y'],this[_0x3b5c93(0x284)]())&&this[_0x3b5c93(0x465)]();},Game_Character[_0x50f639(0x346)][_0x50f639(0x53a)]=function(_0x533add){const _0x41b0dc=_0x50f639;if(ImageManager[_0x41b0dc(0x33c)](this[_0x41b0dc(0x34e)]))return;_0x533add=_0x533add[_0x41b0dc(0x36d)](0x0,0x7),this[_0x41b0dc(0x5c5)](this[_0x41b0dc(0x34e)],_0x533add);},Game_Character['prototype'][_0x50f639(0x544)]=function(_0x114b15){const _0x5b32ad=_0x50f639;switch(this['direction']()){case 0x1:this['jump'](-_0x114b15,_0x114b15);break;case 0x2:this[_0x5b32ad(0x2f0)](0x0,_0x114b15);break;case 0x3:this[_0x5b32ad(0x2f0)](_0x114b15,_0x114b15);break;case 0x4:this[_0x5b32ad(0x2f0)](-_0x114b15,0x0);break;case 0x6:this[_0x5b32ad(0x2f0)](_0x114b15,0x0);break;case 0x7:this[_0x5b32ad(0x2f0)](-_0x114b15,-_0x114b15);break;case 0x8:this[_0x5b32ad(0x2f0)](0x0,-_0x114b15);break;case 0x9:this['jump'](_0x114b15,-_0x114b15);break;}},Game_Character[_0x50f639(0x346)][_0x50f639(0x443)]=function(_0x2aaf34,_0x83924){const _0x2f5094=_0x50f639,_0x3ecb06=Math[_0x2f5094(0x452)](_0x2aaf34-this['x']),_0xd27961=Math['round'](_0x83924-this['y']);this[_0x2f5094(0x2f0)](_0x3ecb06,_0xd27961);},Game_Character[_0x50f639(0x346)]['processMoveRouteJumpToCharacter']=function(_0x51c127){const _0x39390d=_0x50f639;if(_0x51c127)this[_0x39390d(0x443)](_0x51c127['x'],_0x51c127['y']);},Game_Character[_0x50f639(0x346)][_0x50f639(0x602)]=function(_0x360959,_0x2cf0d8,_0x3c8c55){const _0x3fa510=_0x50f639;let _0x50271d=0x0;if(_0x3c8c55)$gameTemp[_0x3fa510(0x454)]=!![];$gameMap['isSupportDiagonalMovement']()?_0x50271d=this[_0x3fa510(0x1d3)](_0x360959,_0x2cf0d8):_0x50271d=this[_0x3fa510(0x67f)](_0x360959,_0x2cf0d8);if(_0x3c8c55)$gameTemp[_0x3fa510(0x454)]=![];this[_0x3fa510(0x5a0)](_0x50271d),this[_0x3fa510(0x407)](!![]);},Game_Character[_0x50f639(0x346)][_0x50f639(0x32a)]=function(_0x207072){const _0xcff71d=_0x50f639;if(_0x207072)this[_0xcff71d(0x602)](_0x207072['x'],_0x207072['y']);},Game_Character[_0x50f639(0x346)][_0x50f639(0x5c4)]=function(_0x4a8ee8,_0x40c0dd){const _0x3ce671=_0x50f639,_0x50e491=this[_0x3ce671(0x240)](_0x4a8ee8),_0x1a9763=this['deltaYFrom'](_0x40c0dd);},Game_Character[_0x50f639(0x346)][_0x50f639(0x5a5)]=function(_0x383cf3){const _0x4be956=_0x50f639;if(_0x383cf3[_0x4be956(0x1e7)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x383cf3[_0x4be956(0x1e7)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0x50f639(0x380)][_0x50f639(0x578)]=Game_Event[_0x50f639(0x346)][_0x50f639(0x35b)],Game_Event[_0x50f639(0x346)][_0x50f639(0x35b)]=function(_0x385327,_0x4c121a){const _0x3b3e00=_0x50f639;if($gameTemp['_moveAllowPlayerCollision'])return![];return VisuMZ[_0x3b3e00(0x380)][_0x3b3e00(0x578)][_0x3b3e00(0x673)](this,_0x385327,_0x4c121a);},Game_Character[_0x50f639(0x346)][_0x50f639(0x61d)]=function(_0x5cb38e,_0x518977){const _0x41bcec=_0x50f639,_0x5dd763=['',_0x41bcec(0x3a5),_0x41bcec(0x1ec),_0x41bcec(0x471),_0x41bcec(0x663),'',_0x41bcec(0x39a),'UPPER\x20LEFT','UP',_0x41bcec(0x203)],_0x2e4996=_0x5dd763[_0x41bcec(0x320)](_0x5cb38e[_0x41bcec(0x4ab)]()['trim']());if(_0x2e4996<=0x0)return;_0x518977&&($gameTemp[_0x41bcec(0x454)]=!![]),this[_0x41bcec(0x366)](this['x'],this['y'],_0x2e4996)&&(_0x518977&&($gameTemp[_0x41bcec(0x454)]=![]),this[_0x41bcec(0x5a0)](_0x2e4996),this[_0x41bcec(0x1fc)]-=0x1),_0x518977&&($gameTemp[_0x41bcec(0x454)]=![]);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x3d7)]=Game_Event['prototype'][_0x50f639(0x411)],Game_Event[_0x50f639(0x346)][_0x50f639(0x411)]=function(_0x346feb,_0x2137f6){const _0x507805=_0x50f639;if(VisuMZ[_0x507805(0x380)]['Game_Event_checkEventTriggerTouch']['call'](this,_0x346feb,_0x2137f6))return!![];if($gameMap[_0x507805(0x26b)]())return![];for(let _0x36e6cc=-this[_0x507805(0x31f)][_0x507805(0x5fa)];_0x36e6cc<=this[_0x507805(0x31f)][_0x507805(0x45b)];_0x36e6cc++){for(let _0x40902e=-this['_addedHitbox']['up'];_0x40902e<=this[_0x507805(0x31f)][_0x507805(0x1db)];_0x40902e++){if(VisuMZ[_0x507805(0x380)][_0x507805(0x3d7)]['call'](this,_0x346feb+_0x36e6cc,_0x2137f6+_0x40902e))return!![];}}return![];},Game_Character[_0x50f639(0x346)][_0x50f639(0x5ed)]=function(_0x299987,_0xcca634,_0x2b0ecb){const _0x15f4eb=_0x50f639;this[_0x15f4eb(0x602)](_0x299987,_0xcca634,_0x2b0ecb);if(this['x']!==_0x299987||this['y']!==_0xcca634)this[_0x15f4eb(0x1fc)]--;},Game_Character['prototype'][_0x50f639(0x671)]=function(_0x35abd8,_0xcd2c11){const _0x4fef96=_0x50f639;if(_0x35abd8&&!_0x35abd8['_erased']){this[_0x4fef96(0x5ed)](_0x35abd8['x'],_0x35abd8['y'],_0xcd2c11);if(_0x35abd8['isNormalPriority']()&&this[_0x4fef96(0x5f7)]()){const _0x167558=$gameMap[_0x4fef96(0x29a)](this['x'],this['y'],_0x35abd8['x'],_0x35abd8['y']);if(_0x167558<=0x1)this['_moveRouteIndex']++;}}},Game_Character[_0x50f639(0x346)]['processMoveRouteMoveRepeat']=function(_0x4a263e,_0x283ad9){const _0x214fd1=_0x50f639;_0x283ad9=_0x283ad9||0x0;const _0x31dd47={'code':0x1,'indent':null,'parameters':[]};_0x31dd47[_0x214fd1(0x303)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x4a263e],this[_0x214fd1(0x372)]['list'][this[_0x214fd1(0x1fc)]][_0x214fd1(0x287)][0x0]='';while(_0x283ad9--){this[_0x214fd1(0x372)][_0x214fd1(0x1ed)][_0x214fd1(0x512)](this[_0x214fd1(0x1fc)]+0x1,0x0,_0x31dd47);}},Game_Character['prototype'][_0x50f639(0x5f3)]=function(_0x494adb){const _0x3ac3ed=_0x50f639;this[_0x3ac3ed(0x4b2)]=!![],this['setPattern'](_0x494adb);},Game_Character['prototype'][_0x50f639(0x659)]=function(_0x400f26,_0x4c3956){const _0x3ea402=_0x50f639;if(this===$gamePlayer)return;const _0x349c14=[this[_0x3ea402(0x4c3)],this['_eventId'],'A'];_0x400f26[_0x3ea402(0x1e7)](/\b[ABCD]\b/i)?_0x349c14[0x2]=String(_0x400f26)['charAt'](0x0)[_0x3ea402(0x4ab)]()[_0x3ea402(0x334)]():_0x349c14[0x2]=_0x3ea402(0x36f)[_0x3ea402(0x566)](_0x400f26);switch(_0x4c3956['toUpperCase']()['trim']()){case'ON':case _0x3ea402(0x537):$gameSelfSwitches[_0x3ea402(0x337)](_0x349c14,!![]);break;case _0x3ea402(0x5bc):case _0x3ea402(0x4f3):$gameSelfSwitches['setValue'](_0x349c14,![]);break;case'TOGGLE':$gameSelfSwitches['setValue'](_0x349c14,!$gameSelfSwitches['value'](_0x349c14));break;}},Game_Character['prototype'][_0x50f639(0x4df)]=function(_0x348fb0,_0x547783){const _0x16b0be=_0x50f639;if(this===$gamePlayer)return;const _0x4c4bff=[this['_mapId'],this['_eventId'],_0x16b0be(0x266)[_0x16b0be(0x566)](_0x348fb0)];$gameSelfSwitches[_0x16b0be(0x337)](_0x4c4bff,Number(_0x547783));},Game_Character['prototype'][_0x50f639(0x3f4)]=function(_0x311f8f,_0x528099){const _0x5f00df=_0x50f639;this[_0x5f00df(0x515)](_0x311f8f,_0x528099);},Game_Character[_0x50f639(0x346)][_0x50f639(0x4ed)]=function(_0x1d4d71){const _0x381554=_0x50f639;if(_0x1d4d71)this[_0x381554(0x3f4)](_0x1d4d71['x'],_0x1d4d71['y']);},Game_Character[_0x50f639(0x346)]['turnRight90']=function(){const _0xae74a6=_0x50f639;switch(this[_0xae74a6(0x284)]()){case 0x1:this[_0xae74a6(0x248)](0x7);break;case 0x2:this[_0xae74a6(0x248)](0x4);break;case 0x3:this[_0xae74a6(0x248)](0x1);break;case 0x4:this[_0xae74a6(0x248)](0x8);break;case 0x6:this[_0xae74a6(0x248)](0x2);break;case 0x7:this[_0xae74a6(0x248)](0x9);break;case 0x8:this[_0xae74a6(0x248)](0x6);break;case 0x9:this[_0xae74a6(0x248)](0x3);break;}},Game_Character['prototype'][_0x50f639(0x4ca)]=function(){const _0x440b78=_0x50f639;switch(this[_0x440b78(0x284)]()){case 0x1:this[_0x440b78(0x248)](0x3);break;case 0x2:this[_0x440b78(0x248)](0x6);break;case 0x3:this['setDirection'](0x9);break;case 0x4:this[_0x440b78(0x248)](0x2);break;case 0x6:this[_0x440b78(0x248)](0x8);break;case 0x7:this[_0x440b78(0x248)](0x1);break;case 0x8:this[_0x440b78(0x248)](0x4);break;case 0x9:this[_0x440b78(0x248)](0x7);break;}},Game_Character['prototype'][_0x50f639(0x43c)]=function(_0x849ff1,_0x192db3,_0x1d63ae){const _0x443c14=_0x50f639,_0x4a9bec=this[_0x443c14(0x240)](_0x849ff1),_0x22af82=this['deltaYFrom'](_0x192db3);if($gameMap[_0x443c14(0x38e)]()){if(_0x1d63ae||this['isSpriteVS8dir']()){if(_0x4a9bec>0x0&&_0x22af82<0x0)return 0x1;if(_0x4a9bec<0x0&&_0x22af82<0x0)return 0x3;if(_0x4a9bec>0x0&&_0x22af82>0x0)return 0x7;if(_0x4a9bec<0x0&&_0x22af82>0x0)return 0x9;}}if(Math['abs'](_0x4a9bec)>Math[_0x443c14(0x311)](_0x22af82))return _0x4a9bec>0x0?0x4:0x6;else{if(_0x22af82!==0x0)return _0x22af82>0x0?0x8:0x2;}return 0x0;},Game_Character['prototype'][_0x50f639(0x502)]=function(_0x5db75f,_0x29f9e2,_0x187d40){const _0x1a377d=_0x50f639,_0x21bf44=this['deltaXFrom'](_0x5db75f),_0x2f20b6=this[_0x1a377d(0x608)](_0x29f9e2);if($gameMap['isSupportDiagonalMovement']()){if(_0x187d40||this['isSpriteVS8dir']()){if(_0x21bf44>0x0&&_0x2f20b6<0x0)return 0x9;if(_0x21bf44<0x0&&_0x2f20b6<0x0)return 0x7;if(_0x21bf44>0x0&&_0x2f20b6>0x0)return 0x3;if(_0x21bf44<0x0&&_0x2f20b6>0x0)return 0x1;}}if(Math['abs'](_0x21bf44)>Math[_0x1a377d(0x311)](_0x2f20b6))return _0x21bf44>0x0?0x6:0x4;else{if(_0x2f20b6!==0x0)return _0x2f20b6>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x50f639(0x346)][_0x50f639(0x41b)]=function(_0x256da0,_0x215374){const _0x19d0ec=_0x50f639,_0x5a13f5=this[_0x19d0ec(0x43c)](_0x256da0,_0x215374,!![]);if(_0x5a13f5)this[_0x19d0ec(0x5a0)](_0x5a13f5);},Game_Character[_0x50f639(0x346)][_0x50f639(0x20c)]=function(_0x132387,_0x1b4bea){const _0x4c5cfc=_0x50f639,_0x4bf0a4=this[_0x4c5cfc(0x502)](_0x132387,_0x1b4bea,!![]);if(_0x4bf0a4)this['executeMoveDir8'](_0x4bf0a4);},Game_Character[_0x50f639(0x346)][_0x50f639(0x1d4)]=function(_0x1a64b2,_0x25a29e){const _0x4915da=_0x50f639,_0x533b92=this[_0x4915da(0x43c)](_0x1a64b2,_0x25a29e,![]);if(_0x533b92)this[_0x4915da(0x248)](_0x533b92);},Game_Character['prototype'][_0x50f639(0x2e0)]=function(_0x32fa32,_0x4a6921){const _0x4156fb=_0x50f639,_0x3a2d36=this[_0x4156fb(0x502)](_0x32fa32,_0x4a6921,![]);if(_0x3a2d36)this[_0x4156fb(0x248)](_0x3a2d36);},Game_Character[_0x50f639(0x346)][_0x50f639(0x328)]=function(_0x59c09a){if(_0x59c09a)this['moveTowardPoint'](_0x59c09a['x'],_0x59c09a['y']);},Game_Character[_0x50f639(0x346)][_0x50f639(0x5a4)]=function(_0x2d7219){if(_0x2d7219)this['moveAwayFromPoint'](_0x2d7219['x'],_0x2d7219['y']);},Game_Character[_0x50f639(0x346)][_0x50f639(0x51d)]=function(_0x6196fc){const _0x2f1743=_0x50f639;if(_0x6196fc)this[_0x2f1743(0x1d4)](_0x6196fc['x'],_0x6196fc['y']);},Game_Character[_0x50f639(0x346)][_0x50f639(0x277)]=function(_0x1a0dfc){const _0x1f9c15=_0x50f639;if(_0x1a0dfc)this[_0x1f9c15(0x2e0)](_0x1a0dfc['x'],_0x1a0dfc['y']);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x29c)]=Game_Player[_0x50f639(0x346)][_0x50f639(0x5c8)],Game_Player[_0x50f639(0x346)][_0x50f639(0x5c8)]=function(){const _0x45a578=_0x50f639;if(!Game_CharacterBase[_0x45a578(0x509)]&&this[_0x45a578(0x665)]())return![];if(this[_0x45a578(0x51c)])return!![];return VisuMZ['EventsMoveCore']['Game_Player_isDashing'][_0x45a578(0x673)](this);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x558)]=Game_Player['prototype'][_0x50f639(0x2de)],Game_Player['prototype'][_0x50f639(0x2de)]=function(){const _0x3a5bd3=_0x50f639;return $gameMap[_0x3a5bd3(0x38e)]()?this[_0x3a5bd3(0x2a1)]():VisuMZ['EventsMoveCore']['Game_Player_getInputDirection'][_0x3a5bd3(0x673)](this);},Game_Player[_0x50f639(0x346)][_0x50f639(0x2a1)]=function(){const _0x3eded8=_0x50f639;return Input[_0x3eded8(0x2a9)];},Game_Player['prototype']['moveByInput']=function(){const _0x539f2a=_0x50f639;if($gameSystem[_0x539f2a(0x425)]())return 0x0;if(!this[_0x539f2a(0x3b0)]()&&this['canMove']()){let _0x384abd=this['getInputDirection']();if(_0x384abd>0x0)$gameTemp[_0x539f2a(0x466)]();else{if($gameTemp[_0x539f2a(0x69d)]()){const _0x1893fe=$gameTemp['destinationX'](),_0x614b9b=$gameTemp['destinationY']();this[_0x539f2a(0x28f)](_0x1893fe,_0x614b9b)?_0x384abd=this[_0x539f2a(0x1d3)](_0x1893fe,_0x614b9b):_0x384abd=this[_0x539f2a(0x67f)](_0x1893fe,_0x614b9b);}}_0x384abd>0x0?(this[_0x539f2a(0x257)]=this['_inputTime']||0x0,this['isTurnInPlace']()?this[_0x539f2a(0x248)](_0x384abd):this['executeMove'](_0x384abd),this['_inputTime']++):this[_0x539f2a(0x257)]=0x0;}},Game_Player[_0x50f639(0x346)][_0x50f639(0x22d)]=function(){const _0xe3ed12=_0x50f639,_0x1740f3=VisuMZ['EventsMoveCore'][_0xe3ed12(0x55c)][_0xe3ed12(0x57c)];if(!_0x1740f3[_0xe3ed12(0x467)])return![];if($gameTemp[_0xe3ed12(0x69d)]())return![];if(this['isDashing']()||this['isMoving']()||this[_0xe3ed12(0x665)]())return![];return this['_inputTime']<_0x1740f3[_0xe3ed12(0x668)];},VisuMZ['EventsMoveCore'][_0x50f639(0x49e)]=Game_Player[_0x50f639(0x346)][_0x50f639(0x4e6)],Game_Player[_0x50f639(0x346)][_0x50f639(0x4e6)]=function(_0x43193d){const _0x22c0df=_0x50f639;$gameMap['isSupportDiagonalMovement']()?this[_0x22c0df(0x5a0)](_0x43193d):VisuMZ[_0x22c0df(0x380)][_0x22c0df(0x49e)][_0x22c0df(0x673)](this,_0x43193d);},VisuMZ['EventsMoveCore'][_0x50f639(0x327)]=Game_Player['prototype']['isMapPassable'],Game_Player['prototype'][_0x50f639(0x60b)]=function(_0x2c4e9e,_0x3b37d0,_0x2ea13c){const _0x56f512=_0x50f639;if($gameMap[_0x56f512(0x2eb)](_0x2c4e9e,_0x3b37d0,_0x2ea13c,_0x56f512(0x4de)))return this[_0x56f512(0x4c2)]()&&this[_0x56f512(0x495)]()?this[_0x56f512(0x495)]()['isMapPassable'](_0x2c4e9e,_0x3b37d0,_0x2ea13c):!![];if($gameMap[_0x56f512(0x30b)](_0x2c4e9e,_0x3b37d0,_0x2ea13c,_0x56f512(0x4de)))return![];return VisuMZ[_0x56f512(0x380)][_0x56f512(0x327)]['call'](this,_0x2c4e9e,_0x3b37d0,_0x2ea13c);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x285)]=Game_Player[_0x50f639(0x346)][_0x50f639(0x2bd)],Game_Player[_0x50f639(0x346)][_0x50f639(0x2bd)]=function(_0x7a7634){const _0x113a66=_0x50f639;VisuMZ['EventsMoveCore'][_0x113a66(0x285)][_0x113a66(0x673)](this,_0x7a7634);if(this[_0x113a66(0x658)]()){this[_0x113a66(0x4f2)](_0x7a7634);if(_0x7a7634['includes'](0x0)&&this[_0x113a66(0x47e)]()==='standing')this['startMapCommonEventOnOK'](this['x'],this['y']);else(_0x7a7634['includes'](0x1)||_0x7a7634[_0x113a66(0x292)](0x2))&&this[_0x113a66(0x27a)]();}},VisuMZ[_0x50f639(0x380)][_0x50f639(0x656)]=Game_Player[_0x50f639(0x346)][_0x50f639(0x54a)],Game_Player[_0x50f639(0x346)][_0x50f639(0x54a)]=function(_0x5745ca){const _0xe36bd7=_0x50f639;VisuMZ[_0xe36bd7(0x380)][_0xe36bd7(0x656)][_0xe36bd7(0x673)](this,_0x5745ca);if(this[_0xe36bd7(0x658)]()&&_0x5745ca[_0xe36bd7(0x292)](0x0)&&this[_0xe36bd7(0x47e)]()===_0xe36bd7(0x2bb)){const _0x3e1662=this[_0xe36bd7(0x284)](),_0x58adb8=$gameMap[_0xe36bd7(0x349)](this['x'],_0x3e1662),_0x418761=$gameMap[_0xe36bd7(0x1e3)](this['y'],_0x3e1662);this[_0xe36bd7(0x3aa)](_0x58adb8,_0x418761);}},Game_Player[_0x50f639(0x346)][_0x50f639(0x4f2)]=function(_0x540d20){const _0x3a0342=_0x50f639;if($gameMap[_0x3a0342(0x26b)]())return;if($gameMap[_0x3a0342(0x61b)]())return;const _0x4168bb=$gameMap[_0x3a0342(0x459)]();for(const _0x1ddea4 of _0x4168bb){if(!_0x1ddea4)continue;if(!_0x1ddea4[_0x3a0342(0x4ec)](_0x540d20))continue;if(this[_0x3a0342(0x325)](_0x1ddea4))return _0x1ddea4[_0x3a0342(0x4d0)]();if(this[_0x3a0342(0x685)](_0x1ddea4))return _0x1ddea4[_0x3a0342(0x4d0)]();}},Game_Player[_0x50f639(0x346)][_0x50f639(0x325)]=function(_0x55b7d9){const _0x22bff8=_0x50f639;if($gameMap[_0x22bff8(0x26b)]())return![];if($gameMap[_0x22bff8(0x61b)]())return![];return _0x55b7d9[_0x22bff8(0x302)]()['includes'](this['regionId']());},Game_Player[_0x50f639(0x346)][_0x50f639(0x685)]=function(_0x37769e){const _0x17e25c=_0x50f639;if($gameMap['isEventRunning']())return![];if($gameMap[_0x17e25c(0x61b)]())return![];if([_0x17e25c(0x2f1),'region'][_0x17e25c(0x292)](_0x37769e[_0x17e25c(0x460)]()))return![];const _0x2ab225=_0x37769e[_0x17e25c(0x460)](),_0x349390=_0x37769e[_0x17e25c(0x670)]();return this['checkEventProximity'](_0x37769e,_0x2ab225,_0x349390);},Game_Map[_0x50f639(0x346)]['checkEventProximity']=function(_0x2c95a4,_0x49853c,_0xed10f1,_0x495c9f,_0xa663d5){const _0x1309a6=_0x50f639;switch(_0x495c9f){case _0x1309a6(0x43e):return _0xa663d5>=Math[_0x1309a6(0x311)](_0xed10f1[_0x1309a6(0x240)](_0x2c95a4))&&_0xa663d5>=Math[_0x1309a6(0x311)](_0xed10f1[_0x1309a6(0x608)](_0x49853c));break;case'circle':const _0x2c9ef0=Math['pow'](_0xed10f1['x']-_0x2c95a4,0x2),_0x294c6d=Math['pow'](_0xed10f1['y']-_0x49853c,0x2);return _0xa663d5>=Math['round'](Math[_0x1309a6(0x653)](_0x2c9ef0+_0x294c6d));break;case'radius':case _0x1309a6(0x559):case _0x1309a6(0x2af):const _0x30b889=$gameMap[_0x1309a6(0x29a)](_0x2c95a4,_0x49853c,_0xed10f1['x'],_0xed10f1['y']);return _0xa663d5>=_0x30b889;break;case _0x1309a6(0x5d2):return _0xa663d5>=Math['abs'](_0xed10f1[_0x1309a6(0x608)](_0x49853c));break;case'column':return _0xa663d5>=Math[_0x1309a6(0x311)](_0xed10f1[_0x1309a6(0x240)](_0x2c95a4));break;}return![];},Game_Player[_0x50f639(0x346)]['checkEventProximity']=function(_0x35dd93,_0x2ec86c,_0x5a42c9){const _0x44475f=_0x50f639,_0x433313=this['x'],_0x18d824=this['y'];return $gameMap[_0x44475f(0x42b)](_0x433313,_0x18d824,_0x35dd93,_0x2ec86c,_0x5a42c9);},Game_Player[_0x50f639(0x346)]['startMapCommonEventOnOK']=function(_0x144dcf,_0x1d1e87){const _0x1fed57=_0x50f639;if($gameMap[_0x1fed57(0x26b)]())return;if($gameMap[_0x1fed57(0x61b)]())return;let _0x40d815=VisuMZ['EventsMoveCore'][_0x1fed57(0x55c)][_0x1fed57(0x4b9)],_0x45ccca=$gameMap[_0x1fed57(0x27c)](_0x144dcf,_0x1d1e87);const _0x2dcdf4=_0x1fed57(0x54b)['format'](_0x45ccca);_0x40d815[_0x2dcdf4]&&$gameTemp['reserveCommonEvent'](_0x40d815[_0x2dcdf4]);},Game_Player[_0x50f639(0x346)][_0x50f639(0x47e)]=function(){const _0x5bcd11=_0x50f639;return VisuMZ[_0x5bcd11(0x380)][_0x5bcd11(0x55c)][_0x5bcd11(0x33a)];},Game_Player[_0x50f639(0x346)][_0x50f639(0x27a)]=function(){const _0x85a620=_0x50f639;if($gameMap[_0x85a620(0x26b)]())return;if($gameMap[_0x85a620(0x61b)]())return;let _0x5015c3=VisuMZ[_0x85a620(0x380)][_0x85a620(0x55c)][_0x85a620(0x638)];const _0x122156=_0x85a620(0x54b)[_0x85a620(0x566)](this[_0x85a620(0x27c)]());_0x5015c3[_0x122156]&&$gameTemp[_0x85a620(0x25e)](_0x5015c3[_0x122156]);},VisuMZ[_0x50f639(0x380)]['Game_Player_increaseSteps']=Game_Player[_0x50f639(0x346)][_0x50f639(0x57e)],Game_Player[_0x50f639(0x346)]['increaseSteps']=function(){const _0x1e2ec6=_0x50f639;VisuMZ[_0x1e2ec6(0x380)][_0x1e2ec6(0x657)]['call'](this),VisuMZ[_0x1e2ec6(0x60f)](0x0);},Game_Player[_0x50f639(0x346)][_0x50f639(0x21d)]=function(){VisuMZ['FaceSynchAllSynchTargets'](0x0);},VisuMZ[_0x50f639(0x380)]['Game_Follower_initialize']=Game_Follower[_0x50f639(0x346)][_0x50f639(0x378)],Game_Follower['prototype']['initialize']=function(_0xe31e58){const _0x5f380=_0x50f639;VisuMZ[_0x5f380(0x380)][_0x5f380(0x518)][_0x5f380(0x673)](this,_0xe31e58),this[_0x5f380(0x305)]=![];},Game_Follower[_0x50f639(0x346)][_0x50f639(0x5c8)]=function(){const _0x2f2b72=_0x50f639;if(this[_0x2f2b72(0x305)])return Game_Character['prototype'][_0x2f2b72(0x5c8)]['call'](this);return $gamePlayer['isDashing']();},Game_Follower[_0x50f639(0x346)]['isDashingAndMoving']=function(){const _0x5a84da=_0x50f639;if(this['_chaseOff'])return Game_Character[_0x5a84da(0x346)][_0x5a84da(0x313)][_0x5a84da(0x673)](this);return $gamePlayer[_0x5a84da(0x313)]()&&this[_0x5a84da(0x4a1)];},Game_Follower['prototype']['realMoveSpeed']=function(){const _0x3dc148=_0x50f639;return $gamePlayer[_0x3dc148(0x534)]();},Game_Follower[_0x50f639(0x346)][_0x50f639(0x49c)]=function(){const _0x28550a=_0x50f639;Game_Character[_0x28550a(0x346)][_0x28550a(0x49c)]['call'](this),this[_0x28550a(0x627)]>0x0&&(this[_0x28550a(0x4a1)]=![]);},Game_Follower[_0x50f639(0x346)][_0x50f639(0x67d)]=function(_0x238c2d){const _0x192536=_0x50f639;this[_0x192536(0x305)]=_0x238c2d;},VisuMZ[_0x50f639(0x380)][_0x50f639(0x2ab)]=Game_Follower[_0x50f639(0x346)][_0x50f639(0x598)],Game_Follower[_0x50f639(0x346)][_0x50f639(0x598)]=function(_0x9f4f93){const _0x28e929=_0x50f639;if(this['_chaseOff'])return;if($gameSystem[_0x28e929(0x36b)]())return;VisuMZ[_0x28e929(0x380)][_0x28e929(0x2ab)][_0x28e929(0x673)](this,_0x9f4f93),this[_0x28e929(0x4a1)]=!![];},VisuMZ[_0x50f639(0x380)][_0x50f639(0x606)]=Game_Vehicle[_0x50f639(0x346)][_0x50f639(0x60b)],Game_Vehicle[_0x50f639(0x346)]['isMapPassable']=function(_0x2a3818,_0x2fffc4,_0xfabd69){const _0x2691e7=_0x50f639;if($gameMap['isRegionAllowPass'](_0x2a3818,_0x2fffc4,_0xfabd69,this[_0x2691e7(0x3db)]))return!![];if($gameMap[_0x2691e7(0x30b)](_0x2a3818,_0x2fffc4,_0xfabd69,this[_0x2691e7(0x3db)]))return![];return VisuMZ[_0x2691e7(0x380)]['Game_Vehicle_isMapPassable']['call'](this,_0x2a3818,_0x2fffc4,_0xfabd69);},Game_Vehicle['prototype'][_0x50f639(0x548)]=function(_0x35d0d4,_0x484993,_0x1c02df){const _0x162875=_0x50f639;if($gameMap[_0x162875(0x2eb)](_0x35d0d4,_0x484993,_0x1c02df,this[_0x162875(0x3db)]))return!![];if($gameMap[_0x162875(0x30b)](_0x35d0d4,_0x484993,_0x1c02df,this['_type']))return![];return VisuMZ[_0x162875(0x380)][_0x162875(0x31b)][_0x162875(0x673)]($gamePlayer,_0x35d0d4,_0x484993,_0x1c02df);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x34d)]=Game_Vehicle['prototype']['isLandOk'],Game_Vehicle[_0x50f639(0x346)][_0x50f639(0x273)]=function(_0x112a28,_0x23ef04,_0x107269){const _0x8daa49=_0x50f639;if($gameMap[_0x8daa49(0x591)](_0x112a28,_0x23ef04,_0x107269,this[_0x8daa49(0x3db)]))return!![];const _0x2fe7b5=this[_0x8daa49(0x3db)][_0x8daa49(0x4dd)](0x0)[_0x8daa49(0x4ab)]()+this[_0x8daa49(0x3db)][_0x8daa49(0x25c)](0x1),_0x43afbd=_0x8daa49(0x2f7)[_0x8daa49(0x566)](_0x2fe7b5);return VisuMZ[_0x8daa49(0x380)][_0x8daa49(0x55c)][_0x8daa49(0x1f9)][_0x43afbd]?![]:VisuMZ['EventsMoveCore'][_0x8daa49(0x34d)][_0x8daa49(0x673)](this,_0x112a28,_0x23ef04,_0x107269);},VisuMZ['EventsMoveCore'][_0x50f639(0x404)]=Game_Vehicle[_0x50f639(0x346)][_0x50f639(0x2b6)],Game_Vehicle[_0x50f639(0x346)][_0x50f639(0x2b6)]=function(){const _0x3b7d94=_0x50f639;VisuMZ[_0x3b7d94(0x380)][_0x3b7d94(0x404)][_0x3b7d94(0x673)](this);const _0x1eb79a=VisuMZ[_0x3b7d94(0x380)][_0x3b7d94(0x55c)]['Movement'];if(this[_0x3b7d94(0x4bc)]()){if(_0x1eb79a[_0x3b7d94(0x3c1)])this['setMoveSpeed'](_0x1eb79a[_0x3b7d94(0x3c1)]);}else{if(this[_0x3b7d94(0x289)]()){if(_0x1eb79a[_0x3b7d94(0x4db)])this[_0x3b7d94(0x581)](_0x1eb79a[_0x3b7d94(0x4db)]);}else{if(this[_0x3b7d94(0x38b)]()){if(_0x1eb79a['AirshipSpeed'])this[_0x3b7d94(0x581)](_0x1eb79a[_0x3b7d94(0x2a0)]);}}}},VisuMZ[_0x50f639(0x380)][_0x50f639(0x47c)]=Game_Event['prototype']['initialize'],Game_Event[_0x50f639(0x346)][_0x50f639(0x378)]=function(_0x585fb1,_0x16b4cc){const _0xc4d5e7=_0x50f639;this['_checkRelocateNotetag']=!![],VisuMZ[_0xc4d5e7(0x380)]['Game_Event_initialize'][_0xc4d5e7(0x673)](this,_0x585fb1,_0x16b4cc),this[_0xc4d5e7(0x43b)]=undefined,this[_0xc4d5e7(0x63f)](),this['setupMorphEvent'](),this[_0xc4d5e7(0x5cb)]();},Game_Map[_0x50f639(0x346)][_0x50f639(0x20a)]=function(_0x3c4152,_0x415a22){const _0x23b95f=_0x50f639;return _0x3c4152===$gameMap[_0x23b95f(0x336)]()?$dataMap[_0x23b95f(0x459)][_0x415a22]:VisuMZ['PreloadedMaps'][_0x3c4152][_0x23b95f(0x459)][_0x415a22];},VisuMZ[_0x50f639(0x380)][_0x50f639(0x4ba)]=Game_Event[_0x50f639(0x346)]['event'],Game_Event[_0x50f639(0x346)][_0x50f639(0x5bd)]=function(){const _0x12acad=_0x50f639;if(this[_0x12acad(0x693)]!==undefined){const _0x13d08b=this[_0x12acad(0x693)][_0x12acad(0x336)],_0x5c2748=this['_eventMorphData'][_0x12acad(0x353)];return $gameMap[_0x12acad(0x20a)](_0x13d08b,_0x5c2748);}if(this[_0x12acad(0x1ef)]!==undefined){const _0x35db19=this[_0x12acad(0x1ef)][_0x12acad(0x336)],_0x5878d2=this[_0x12acad(0x1ef)][_0x12acad(0x353)];return $gameMap[_0x12acad(0x20a)](_0x35db19,_0x5878d2);}if(this[_0x12acad(0x641)]!==undefined){const _0x206ac8=this[_0x12acad(0x641)][_0x12acad(0x336)],_0x5c82d4=this['_eventSpawnData']['eventId'];return $gameMap[_0x12acad(0x20a)](_0x206ac8,_0x5c82d4);}if($gameTemp['_spawnData']!==undefined){const _0x428bfd=$gameTemp[_0x12acad(0x253)]['mapId'],_0x2783ce=$gameTemp[_0x12acad(0x253)][_0x12acad(0x353)];return $gameMap['referEvent'](_0x428bfd,_0x2783ce);}return VisuMZ[_0x12acad(0x380)][_0x12acad(0x4ba)][_0x12acad(0x673)](this);},Game_Event[_0x50f639(0x346)][_0x50f639(0x3d0)]=function(_0x342f7b,_0x34a44f){const _0xf774a7=_0x50f639;if(_0x342f7b===0x0||_0x34a44f===0x0)return![];if(_0x342f7b===$gameMap['mapId']())return!![];if(!VisuMZ['PreloadedMaps'][_0x342f7b]&&_0x342f7b!==$gameMap[_0xf774a7(0x336)]())return $gameTemp['isPlaytest']()&&console[_0xf774a7(0x347)](_0xf774a7(0x36e)[_0xf774a7(0x566)](_0x342f7b)),![];return!![];},VisuMZ[_0x50f639(0x380)]['Game_Event_start']=Game_Event[_0x50f639(0x346)][_0x50f639(0x4d0)],Game_Event[_0x50f639(0x346)][_0x50f639(0x4d0)]=function(){const _0x5a8cd8=_0x50f639;VisuMZ['EventsMoveCore'][_0x5a8cd8(0x2a5)][_0x5a8cd8(0x673)](this),Imported[_0x5a8cd8(0x321)]&&Input[_0x5a8cd8(0x572)](VisuMZ['MessageCore'][_0x5a8cd8(0x55c)][_0x5a8cd8(0x41c)][_0x5a8cd8(0x59e)])&&Input[_0x5a8cd8(0x276)]();},Game_Event['prototype']['setupCopyEvent']=function(){const _0x22c0c6=_0x50f639,_0x3e3be8=this[_0x22c0c6(0x5bd)]()[_0x22c0c6(0x2c0)];if(_0x3e3be8==='')return;if(DataManager[_0x22c0c6(0x35d)]()||DataManager['isEventTest']())return;const _0x391fa7=VisuMZ[_0x22c0c6(0x380)]['Settings'][_0x22c0c6(0x2ea)];let _0x1db468=null,_0x29dceb=0x0,_0x4f045e=0x0;if(_0x3e3be8[_0x22c0c6(0x1e7)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x29dceb=Number(RegExp['$1']),_0x4f045e=Number(RegExp['$2']);if(_0x29dceb===0x0)_0x29dceb=$gameMap['mapId']();}else{if(_0x3e3be8[_0x22c0c6(0x1e7)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x29dceb=Number(RegExp['$1']),_0x4f045e=Number(RegExp['$2']);if(_0x29dceb===0x0)_0x29dceb=$gameMap[_0x22c0c6(0x336)]();}else{if(_0x3e3be8[_0x22c0c6(0x1e7)](/<COPY EVENT:[ ](.*?)>/i)){const _0x437137=String(RegExp['$1'])[_0x22c0c6(0x4ab)]()[_0x22c0c6(0x334)]();_0x1db468=VisuMZ['EventTemplates'][_0x437137];if(!_0x1db468)return;_0x29dceb=_0x1db468[_0x22c0c6(0x64b)],_0x4f045e=_0x1db468[_0x22c0c6(0x1ca)];}}}if(!this[_0x22c0c6(0x3d0)](_0x29dceb,_0x4f045e))return;_0x391fa7[_0x22c0c6(0x1ce)][_0x22c0c6(0x673)](this,_0x29dceb,_0x4f045e,this);if(_0x1db468)_0x1db468[_0x22c0c6(0x1ce)][_0x22c0c6(0x673)](this,_0x29dceb,_0x4f045e,this);this['_eventCopyData']={'mapId':_0x29dceb,'eventId':_0x4f045e},this[_0x22c0c6(0x57d)]=-0x2,this['refresh'](),_0x391fa7[_0x22c0c6(0x419)][_0x22c0c6(0x673)](this,_0x29dceb,_0x4f045e,this);if(_0x1db468)_0x1db468[_0x22c0c6(0x419)][_0x22c0c6(0x673)](this,_0x29dceb,_0x4f045e,this);$gameMap[_0x22c0c6(0x6a2)]();},Game_Event['prototype']['setupMorphEvent']=function(){const _0x4cd375=_0x50f639,_0x5aea52=$gameSystem[_0x4cd375(0x541)](this);if(!_0x5aea52)return;const _0x4b0e75=_0x5aea52[_0x4cd375(0x3ed)][_0x4cd375(0x4ab)]()[_0x4cd375(0x334)]();_0x4b0e75!==_0x4cd375(0x3b9)?this[_0x4cd375(0x5d8)](_0x4b0e75,!![]):this[_0x4cd375(0x646)](_0x5aea52[_0x4cd375(0x336)],_0x5aea52[_0x4cd375(0x353)],!![]);},Game_Event[_0x50f639(0x346)][_0x50f639(0x646)]=function(_0x100e9d,_0x1edd4f,_0x4f46d0){const _0x5c36d7=_0x50f639;if(!this[_0x5c36d7(0x3d0)](_0x100e9d,_0x1edd4f))return;const _0x459c20=VisuMZ[_0x5c36d7(0x380)]['Settings'][_0x5c36d7(0x2ea)];if(!_0x4f46d0)_0x459c20[_0x5c36d7(0x22b)]['call'](this,_0x100e9d,_0x1edd4f,this);this[_0x5c36d7(0x693)]={'mapId':_0x100e9d,'eventId':_0x1edd4f},this['_pageIndex']=-0x2,this[_0x5c36d7(0x377)]();if(!_0x4f46d0)_0x459c20[_0x5c36d7(0x3de)][_0x5c36d7(0x673)](this,_0x100e9d,_0x1edd4f,this);$gameMap[_0x5c36d7(0x6a2)]();},Game_Event[_0x50f639(0x346)][_0x50f639(0x5d8)]=function(_0x3dbc69,_0x4b87b7){const _0x20c98a=_0x50f639;_0x3dbc69=_0x3dbc69['toUpperCase']()[_0x20c98a(0x334)]();const _0x4615c4=VisuMZ[_0x20c98a(0x546)][_0x3dbc69];if(!_0x4615c4)return;const _0x558a1a=_0x4615c4[_0x20c98a(0x64b)],_0x25d7e7=_0x4615c4[_0x20c98a(0x1ca)];if(!this[_0x20c98a(0x3d0)](_0x558a1a,_0x25d7e7))return;if(!_0x4b87b7)_0x4615c4[_0x20c98a(0x22b)][_0x20c98a(0x673)](this,_0x558a1a,_0x25d7e7,this);this[_0x20c98a(0x646)](_0x558a1a,_0x25d7e7,_0x4b87b7);if(!_0x4b87b7)_0x4615c4[_0x20c98a(0x3de)][_0x20c98a(0x673)](this,_0x558a1a,_0x25d7e7,this);if($gameMap)$gameMap[_0x20c98a(0x6a2)]();},Game_Event[_0x50f639(0x346)][_0x50f639(0x299)]=function(){const _0x22fb06=_0x50f639;this[_0x22fb06(0x693)]=undefined,this[_0x22fb06(0x57d)]=-0x2,this[_0x22fb06(0x377)]();},Game_Event[_0x50f639(0x346)]['setupSpawn']=function(_0x55d93c){const _0x3af9d7=_0x50f639,_0x577cea=VisuMZ[_0x3af9d7(0x380)][_0x3af9d7(0x55c)][_0x3af9d7(0x2ea)],_0x57af6e=_0x55d93c['template']['toUpperCase']()[_0x3af9d7(0x334)](),_0x120312=!['',_0x3af9d7(0x3b9)][_0x3af9d7(0x292)](_0x57af6e);let _0x33975c=0x0,_0x211fc1=0x0;if(_0x120312){const _0x15f7b3=VisuMZ[_0x3af9d7(0x546)][_0x57af6e];if(!_0x15f7b3)return;_0x33975c=_0x15f7b3['MapID'],_0x211fc1=_0x15f7b3[_0x3af9d7(0x1ca)];}else _0x33975c=_0x55d93c[_0x3af9d7(0x336)],_0x211fc1=_0x55d93c[_0x3af9d7(0x353)];if(!this[_0x3af9d7(0x3d0)](_0x33975c,_0x211fc1))return;if(_0x120312){const _0x11d02a=VisuMZ[_0x3af9d7(0x546)][_0x57af6e];_0x11d02a[_0x3af9d7(0x22a)][_0x3af9d7(0x673)](this,_0x33975c,_0x211fc1,this);}_0x577cea[_0x3af9d7(0x22a)][_0x3af9d7(0x673)](this,_0x33975c,_0x211fc1,this),this[_0x3af9d7(0x641)]=_0x55d93c,this[_0x3af9d7(0x57d)]=-0x2,this[_0x3af9d7(0x4c3)]=$gameMap['mapId'](),this['_eventId']=_0x55d93c['spawnEventId'],this[_0x3af9d7(0x56c)]=_0x55d93c[_0x3af9d7(0x20b)],this[_0x3af9d7(0x515)](_0x55d93c['x'],_0x55d93c['y']),this[_0x3af9d7(0x248)](_0x55d93c[_0x3af9d7(0x284)]),this[_0x3af9d7(0x377)]();if(_0x120312){const _0xe0d58c=VisuMZ[_0x3af9d7(0x546)][_0x57af6e];if(!_0xe0d58c)return;_0xe0d58c[_0x3af9d7(0x4fc)][_0x3af9d7(0x673)](this,_0x33975c,_0x211fc1,this);}_0x577cea['PostSpawnJS']['call'](this,_0x33975c,_0x211fc1,this);const _0x31c39e=SceneManager[_0x3af9d7(0x58c)];if(_0x31c39e&&_0x31c39e[_0x3af9d7(0x62a)])_0x31c39e[_0x3af9d7(0x62a)][_0x3af9d7(0x633)](this);},Game_Event[_0x50f639(0x346)][_0x50f639(0x4be)]=function(){return!!this['_eventSpawnData'];},Game_Event['prototype'][_0x50f639(0x4d0)]=function(){const _0x348b1a=_0x50f639;if(!this[_0x348b1a(0x1ed)]())return;const _0x503943=this['list']()[_0x348b1a(0x25a)](_0x48285f=>_0x48285f[_0x348b1a(0x303)]!==0x6c&&_0x48285f['code']!==0x198);_0x503943['length']>0x1&&(this[_0x348b1a(0x3e8)]=!![],this[_0x348b1a(0x4ec)]([0x0,0x1,0x2])&&this[_0x348b1a(0x4d8)]());},VisuMZ['EventsMoveCore'][_0x50f639(0x22e)]=Game_Event[_0x50f639(0x346)][_0x50f639(0x5e8)],Game_Event[_0x50f639(0x346)][_0x50f639(0x5e8)]=function(){const _0x430562=_0x50f639;VisuMZ['EventsMoveCore'][_0x430562(0x22e)][_0x430562(0x673)](this),this[_0x430562(0x1e1)](),this[_0x430562(0x3c6)]();},VisuMZ['EventsMoveCore'][_0x50f639(0x59f)]=Game_Event[_0x50f639(0x346)][_0x50f639(0x594)],Game_Event[_0x50f639(0x346)][_0x50f639(0x594)]=function(){const _0x44e136=_0x50f639;this[_0x44e136(0x3e9)]=!![],VisuMZ[_0x44e136(0x380)][_0x44e136(0x59f)][_0x44e136(0x673)](this),this[_0x44e136(0x521)](),this[_0x44e136(0x3c6)](),this['_activationProximityAutoTriggerBypass']=![];},Game_Event[_0x50f639(0x346)]['setupEventsMoveCoreEffects']=function(){const _0x3330dd=_0x50f639;if(!this['event']())return;this[_0x3330dd(0x1e1)](),this['setupEventsMoveCoreNotetags'](),this[_0x3330dd(0x3c7)](),this[_0x3330dd(0x2e3)]();},Game_Event['prototype'][_0x50f639(0x4eb)]=function(){const _0x32e828=_0x50f639,_0x5c3af1=this['event']()[_0x32e828(0x2c0)];if(_0x5c3af1==='')return;this[_0x32e828(0x420)](_0x5c3af1);},Game_Event[_0x50f639(0x346)][_0x50f639(0x3c7)]=function(){const _0x17db90=_0x50f639;if(!this[_0x17db90(0x42a)]())return;const _0x23598d=this['list']();let _0x4c3d54='';for(const _0x2e41ed of _0x23598d){if([0x6c,0x198][_0x17db90(0x292)](_0x2e41ed[_0x17db90(0x303)])){if(_0x4c3d54!=='')_0x4c3d54+='\x0a';_0x4c3d54+=_0x2e41ed['parameters'][0x0];}}this[_0x17db90(0x420)](_0x4c3d54);},Game_Event[_0x50f639(0x346)][_0x50f639(0x1e1)]=function(){const _0x166d24=_0x50f639,_0x387e86=VisuMZ[_0x166d24(0x380)][_0x166d24(0x55c)];this[_0x166d24(0x26d)]={'type':_0x166d24(0x2f1),'distance':0x0,'regionList':[]},this[_0x166d24(0x625)]=![],this[_0x166d24(0x68b)](),this[_0x166d24(0x424)]=![],this['_customZ']=![],this[_0x166d24(0x31f)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x166d24(0x4b8)]={'type':'none','distance':0x0},this['_encounterNoneProximity']={'type':_0x166d24(0x2f1),'distance':0x0},$gameSystem[_0x166d24(0x252)](this),this[_0x166d24(0x330)]=$gameSystem[_0x166d24(0x3f3)](this),this['_labelWindow']={'originalText':'','text':'','visibleRange':_0x387e86['Label'][_0x166d24(0x481)],'rangeType':_0x387e86['Label']['RangeType'],'offsetX':_0x387e86['Label'][_0x166d24(0x410)],'offsetY':_0x387e86['Label'][_0x166d24(0x1d1)],'hueShift':0x0},this[_0x166d24(0x350)]=![],this[_0x166d24(0x510)]=[],this['_moveSynch']={'target':-0x1,'type':'random','delay':0x1,'opacityDelta':0x0},this[_0x166d24(0x683)]=_0x387e86[_0x166d24(0x57c)]['RandomMoveWeight']??0x0,this[_0x166d24(0x46d)]=![],this['_scaleBaseX']=0x1,this[_0x166d24(0x418)]=0x1,this[_0x166d24(0x607)]=![],this[_0x166d24(0x5b0)]=![],this[_0x166d24(0x615)]=![],this[_0x166d24(0x33f)]={'visible':!![],'filename':_0x387e86[_0x166d24(0x57c)][_0x166d24(0x631)]},this[_0x166d24(0x283)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x166d24(0x574)](),this['clearStepPattern']();},Game_Event[_0x50f639(0x346)][_0x50f639(0x420)]=function(_0x37a2dd){const _0x2fc281=_0x50f639;if(_0x37a2dd[_0x2fc281(0x1e7)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x2fc281(0x26d)]['regionList']=JSON['parse']('['+RegExp['$1'][_0x2fc281(0x1e7)](/\d+/g)+']'),this[_0x2fc281(0x26d)][_0x2fc281(0x392)]=_0x2fc281(0x3bc);else _0x37a2dd[_0x2fc281(0x1e7)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x2fc281(0x4ae)]()[_0x2fc281(0x334)](),this[_0x2fc281(0x26d)][_0x2fc281(0x392)]=type,this[_0x2fc281(0x26d)]['distance']=Number(RegExp['$2']));_0x37a2dd[_0x2fc281(0x1e7)](/<(?:ATTACH |)PICTURE FILENAME:[ ](.*?)>/i)&&(this[_0x2fc281(0x1cd)]['filename']=String(RegExp['$1']),this[_0x2fc281(0x1cd)][_0x2fc281(0x392)]=_0x2fc281(0x3e2));if(_0x37a2dd[_0x2fc281(0x1e7)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) BLEND MODE:[ ](.*?)>/i)){const _0x500473=String(RegExp['$1'])[_0x2fc281(0x4ab)]()[_0x2fc281(0x334)](),_0x3fb819=['NORMAL',_0x2fc281(0x69f),'MULTIPLY',_0x2fc281(0x4e8)];this[_0x2fc281(0x1cd)][_0x2fc281(0x65e)]=_0x3fb819['indexOf'](_0x500473)[_0x2fc281(0x36d)](0x0,0x3);}_0x37a2dd['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this[_0x2fc281(0x1cd)][_0x2fc281(0x47a)]=Number(RegExp['$1']));_0x37a2dd['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x2fc281(0x1cd)][_0x2fc281(0x3f1)]=Number(RegExp['$1']));_0x37a2dd['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x2fc281(0x1cd)][_0x2fc281(0x1e8)]=Number(RegExp['$1']));_0x37a2dd['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x2fc281(0x1cd)]['offsetX']=Number(RegExp['$1']),this[_0x2fc281(0x1cd)][_0x2fc281(0x1e8)]=Number(RegExp['$2']));_0x37a2dd[_0x2fc281(0x1e7)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) SCALE:[ ](\d+)([%％])>/i)&&(this[_0x2fc281(0x1cd)][_0x2fc281(0x3f9)]=Number(RegExp['$1'])*0.01);_0x37a2dd[_0x2fc281(0x1e7)](/<(?:ATTACH |)PICTURE TYPE:[ ](.*?)>/i)&&(this[_0x2fc281(0x1cd)][_0x2fc281(0x392)]=String(RegExp['$1'])[_0x2fc281(0x4ae)]()[_0x2fc281(0x334)]());_0x37a2dd[_0x2fc281(0x1e7)](/<(?:ATTACH |)ENEMY FILENAME:[ ](.*?)>/i)&&(this[_0x2fc281(0x1cd)][_0x2fc281(0x58a)]=String(RegExp['$1']),this[_0x2fc281(0x1cd)]['type']=_0x2fc281(0x50e));_0x37a2dd[_0x2fc281(0x1e7)](/<(?:ATTACH |)SV ENEMY FILENAME:[ ](.*?)>/i)&&(this[_0x2fc281(0x1cd)]['filename']=String(RegExp['$1']),this[_0x2fc281(0x1cd)][_0x2fc281(0x392)]=_0x2fc281(0x4a0));_0x37a2dd[_0x2fc281(0x1e7)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x2fc281(0x625)]=!![]);_0x37a2dd[_0x2fc281(0x1e7)](/<CLICK TRIGGER>/i)&&(this[_0x2fc281(0x424)]=!![]);_0x37a2dd['match'](/<CUSTOM Z:[ ](.*?)>/i)&&(this[_0x2fc281(0x483)]=Number(RegExp['$1'])||0x0);_0x37a2dd[_0x2fc281(0x1e7)](/<ENC(?:|OUNTER) HALF[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x2fc281(0x4ae)]()['trim'](),this[_0x2fc281(0x4b8)]['type']=type,this[_0x2fc281(0x4b8)][_0x2fc281(0x29a)]=Number(RegExp['$2']));_0x37a2dd[_0x2fc281(0x1e7)](/<ENC(?:|OUNTER) NONE[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x2fc281(0x4ae)]()['trim'](),this['_encounterNoneProximity'][_0x2fc281(0x392)]=type,this[_0x2fc281(0x569)]['distance']=Number(RegExp['$2']));const _0xdba480=_0x37a2dd[_0x2fc281(0x1e7)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0xdba480)for(const _0x33e5f9 of _0xdba480){if(_0x33e5f9['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x237528=String(RegExp['$1'])[_0x2fc281(0x4ae)]()['trim'](),_0x1f7e14=Number(RegExp['$2']);this[_0x2fc281(0x31f)][_0x237528]=_0x1f7e14;}}if(this[_0x2fc281(0x330)]['iconIndex']>=0x0&&!this[_0x2fc281(0x330)][_0x2fc281(0x4f8)]){_0x37a2dd['match'](/<ICON:[ ](\d+)>/i)&&(this[_0x2fc281(0x330)][_0x2fc281(0x662)]=Number(RegExp['$1']));_0x37a2dd[_0x2fc281(0x1e7)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x2fc281(0x330)][_0x2fc281(0x676)]=Number(RegExp['$1']));_0x37a2dd[_0x2fc281(0x1e7)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x2fc281(0x661)]=Number(RegExp['$1']));_0x37a2dd['match'](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x2fc281(0x676)]=Number(RegExp['$1']),this[_0x2fc281(0x330)]['bufferY']=Number(RegExp['$2']));if(_0x37a2dd[_0x2fc281(0x1e7)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x779b0e=String(RegExp['$1'])[_0x2fc281(0x4ab)]()['trim'](),_0x11c417=[_0x2fc281(0x239),'ADDITIVE','MULTIPLY',_0x2fc281(0x4e8)];this[_0x2fc281(0x330)][_0x2fc281(0x65e)]=_0x11c417['indexOf'](_0x779b0e)[_0x2fc281(0x36d)](0x0,0x3);}$gameSystem['setEventIconData'](this,this[_0x2fc281(0x330)][_0x2fc281(0x662)],this[_0x2fc281(0x330)][_0x2fc281(0x676)],this[_0x2fc281(0x330)][_0x2fc281(0x661)],this[_0x2fc281(0x330)][_0x2fc281(0x65e)]);}if(_0x37a2dd[_0x2fc281(0x1e7)](/<LABEL:[ ](.*?)>/i)){let _0x1f38b8=String(RegExp['$1'])[_0x2fc281(0x334)]();this['_labelWindow'][_0x2fc281(0x333)]=_0x1f38b8,this[_0x2fc281(0x379)][_0x2fc281(0x611)]=_0x1f38b8;}if(_0x37a2dd['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){let _0x2bb4c1=String(RegExp['$1'])['trim']();this[_0x2fc281(0x379)][_0x2fc281(0x333)]=_0x2bb4c1,this[_0x2fc281(0x379)][_0x2fc281(0x611)]=_0x2bb4c1;}_0x37a2dd[_0x2fc281(0x1e7)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow']['offsetX']=Number(RegExp['$1']));_0x37a2dd[_0x2fc281(0x1e7)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x2fc281(0x379)][_0x2fc281(0x1e8)]=Number(RegExp['$1']));_0x37a2dd['match'](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x2fc281(0x379)][_0x2fc281(0x3f1)]=Number(RegExp['$1']),this[_0x2fc281(0x379)][_0x2fc281(0x1e8)]=Number(RegExp['$2']));_0x37a2dd[_0x2fc281(0x1e7)](/<LABEL HUE SHIFT:[ ](.*?)>/i)&&(this['_labelWindow'][_0x2fc281(0x301)]=Number(RegExp['$1']));_0x37a2dd[_0x2fc281(0x1e7)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x2fc281(0x379)][_0x2fc281(0x45e)]=Number(RegExp['$1']));_0x37a2dd[_0x2fc281(0x1e7)](/<LABEL RANGE TYPE: SQUARE>/i)&&(this['_labelWindow'][_0x2fc281(0x652)]=_0x2fc281(0x43e));_0x37a2dd['match'](/<LABEL RANGE TYPE: (?:RADIUS|DELTA|DIAMOND)>/i)&&(this[_0x2fc281(0x379)][_0x2fc281(0x652)]=_0x2fc281(0x559));_0x37a2dd[_0x2fc281(0x1e7)](/<LABEL RANGE TYPE: CIRCLE>/i)&&(this[_0x2fc281(0x379)]['rangeType']=_0x2fc281(0x319));this['updateEventLabelText']();_0x37a2dd[_0x2fc281(0x1e7)](/<MIRROR SPRITE>/i)&&(this[_0x2fc281(0x350)]=!![]);if(_0x37a2dd[_0x2fc281(0x1e7)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x228507=JSON[_0x2fc281(0x53e)]('['+RegExp['$1'][_0x2fc281(0x1e7)](/\d+/g)+']');this['_moveOnlyRegions']=this['_moveOnlyRegions']['concat'](_0x228507),this['_moveOnlyRegions'][_0x2fc281(0x4b7)](0x0);}if(_0x37a2dd[_0x2fc281(0x1e7)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x12bcf9=String(RegExp['$1']);if(_0x12bcf9[_0x2fc281(0x1e7)](/PLAYER/i))this[_0x2fc281(0x230)][_0x2fc281(0x64d)]=0x0;else _0x12bcf9[_0x2fc281(0x1e7)](/EVENT[ ](\d+)/i)&&(this['_moveSynch']['target']=Number(RegExp['$1']));}_0x37a2dd[_0x2fc281(0x1e7)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x2fc281(0x230)][_0x2fc281(0x392)]=String(RegExp['$1'])[_0x2fc281(0x4ae)]()[_0x2fc281(0x334)]());_0x37a2dd[_0x2fc281(0x1e7)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x2fc281(0x230)]['delay']=Number(RegExp['$1']));_0x37a2dd[_0x2fc281(0x1e7)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this[_0x2fc281(0x230)]['opacityDelta']=Number(RegExp['$1']));if(_0x37a2dd['match'](/<TRUE RANDOM MOVE>/i))this[_0x2fc281(0x683)]=0x0;else _0x37a2dd[_0x2fc281(0x1e7)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x2fc281(0x683)]=Number(RegExp['$1'])||0x0);_0x37a2dd[_0x2fc281(0x1e7)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x2fc281(0x46d)]=!![]);_0x37a2dd[_0x2fc281(0x1e7)](/<SCALE X:[ ](\d+)([%％])>/i)&&(this['_scaleBaseX']=Number(RegExp['$1'])*0.01);_0x37a2dd[_0x2fc281(0x1e7)](/<SCALE Y:[ ](\d+)([%％])>/i)&&(this[_0x2fc281(0x418)]=Number(RegExp['$1'])*0.01);if(_0x37a2dd[_0x2fc281(0x1e7)](/<SCALE:[ ](\d+)([%％])>/i)){const _0x351995=Number(RegExp['$1'])*0.01;this[_0x2fc281(0x27d)]=_0x351995,this['_scaleBaseY']=_0x351995;}_0x37a2dd[_0x2fc281(0x1e7)](/<SCREEN ACTIVATION>/i)&&(this['_screenActivation']=!![],this[_0x2fc281(0x5b0)]=![],this[_0x2fc281(0x615)]=![]);if(_0x37a2dd[_0x2fc281(0x1e7)](/<SCREEN PARALLEL>/i))this['_screenActivation']=![],this[_0x2fc281(0x5b0)]=!![],this['_screenParallelOnce']=![];else _0x37a2dd[_0x2fc281(0x1e7)](/<SCREEN PARALLEL ONCE>/i)&&(this['_screenActivation']=![],this[_0x2fc281(0x5b0)]=!![],this[_0x2fc281(0x615)]=!![]);_0x37a2dd[_0x2fc281(0x1e7)](/<HIDE SHADOW>/i)&&(this[_0x2fc281(0x33f)]['visible']=![]),_0x37a2dd[_0x2fc281(0x1e7)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x2fc281(0x33f)][_0x2fc281(0x58a)]=String(RegExp['$1'])),_0x37a2dd[_0x2fc281(0x1e7)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x2fc281(0x417)]=Number(RegExp['$1'])),_0x37a2dd['match'](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x2fc281(0x29b)]=Number(RegExp['$1'])),_0x37a2dd[_0x2fc281(0x1e7)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x2fc281(0x417)]=Number(RegExp['$1']),this[_0x2fc281(0x29b)]=Number(RegExp['$2'])),_0x37a2dd[_0x2fc281(0x1e7)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x2fc281(0x63a)]=String(RegExp['$1'])[_0x2fc281(0x4ab)]()[_0x2fc281(0x334)]()),_0x37a2dd[_0x2fc281(0x1e7)](/<(?:TILE EXPAND|EXPAND TILE) UP:[ ](\d+)>/i)&&(this[_0x2fc281(0x283)]=this[_0x2fc281(0x283)]||{},this[_0x2fc281(0x283)]['up']=Number(RegExp['$1'])),_0x37a2dd[_0x2fc281(0x1e7)](/<(?:TILE EXPAND|EXPAND TILE) DOWN:[ ](\d+)>/i)&&(this['_tileExpand']=this[_0x2fc281(0x283)]||{},this[_0x2fc281(0x283)][_0x2fc281(0x1db)]=Number(RegExp['$1'])),_0x37a2dd[_0x2fc281(0x1e7)](/<(?:TILE EXPAND|EXPAND TILE) LEFT:[ ](\d+)>/i)&&(this[_0x2fc281(0x283)]=this[_0x2fc281(0x283)]||{},this[_0x2fc281(0x283)][_0x2fc281(0x5fa)]=Number(RegExp['$1'])),_0x37a2dd[_0x2fc281(0x1e7)](/<(?:TILE EXPAND|EXPAND TILE) RIGHT:[ ](\d+)>/i)&&(this[_0x2fc281(0x283)]=this[_0x2fc281(0x283)]||{},this[_0x2fc281(0x283)][_0x2fc281(0x45b)]=Number(RegExp['$1']));},Game_Event['prototype'][_0x50f639(0x50f)]=function(){const _0x4494a7=_0x50f639;$gameTemp[_0x4494a7(0x5ca)](this),this[_0x4494a7(0x379)][_0x4494a7(0x333)]=this[_0x4494a7(0x379)][_0x4494a7(0x611)];for(;;){if(this[_0x4494a7(0x379)][_0x4494a7(0x333)][_0x4494a7(0x1e7)](/\\V\[(\d+)\]/gi))this[_0x4494a7(0x379)]['text']=this[_0x4494a7(0x379)]['originalText'][_0x4494a7(0x2fe)](/\\V\[(\d+)\]/gi,(_0x4138ff,_0x2c0b14)=>$gameVariables[_0x4494a7(0x264)](parseInt(_0x2c0b14)));else break;}$gameTemp[_0x4494a7(0x58e)]();},Game_Event[_0x50f639(0x346)][_0x50f639(0x2e3)]=function(){const _0x20ec30=_0x50f639;this[_0x20ec30(0x555)]();},Game_Event['prototype'][_0x50f639(0x48a)]=function(){const _0x19c27f=_0x50f639;if(this[_0x19c27f(0x625)])return!![];return Game_Character['prototype'][_0x19c27f(0x48a)]['call'](this);},VisuMZ[_0x50f639(0x380)]['Game_Event_updateSelfMovement']=Game_Event[_0x50f639(0x346)]['updateSelfMovement'],Game_Event['prototype'][_0x50f639(0x44b)]=function(){const _0x5a1200=_0x50f639;if(this[_0x5a1200(0x547)]())return;VisuMZ['EventsMoveCore'][_0x5a1200(0x210)][_0x5a1200(0x673)](this),this['isMoving']()&&VisuMZ[_0x5a1200(0x60f)](this['_eventId']);},Game_Event['prototype'][_0x50f639(0x547)]=function(){const _0x11593f=_0x50f639,_0x430af2=VisuMZ[_0x11593f(0x380)][_0x11593f(0x55c)][_0x11593f(0x57c)];if($gameMap[_0x11593f(0x26b)]()&&_0x430af2[_0x11593f(0x432)])return!![];if($gameMessage[_0x11593f(0x46b)]()&&_0x430af2[_0x11593f(0x354)])return!![];if(!$gameSystem[_0x11593f(0x23c)]())return!![];if(this[_0x11593f(0x4f6)]()>=0x0)return!![];if(!SceneManager[_0x11593f(0x58c)][_0x11593f(0x34a)])return!![];return![];},Game_Event['prototype'][_0x50f639(0x555)]=function(){const _0x56a809=_0x50f639,_0x38214b=SceneManager[_0x56a809(0x58c)][_0x56a809(0x62a)];if(_0x38214b){const _0x39f779=_0x38214b[_0x56a809(0x561)](this);_0x39f779&&_0x39f779[_0x56a809(0x322)]&&_0x39f779[_0x56a809(0x322)][_0x56a809(0x61e)]!==this[_0x56a809(0x40e)]()&&(_0x39f779['_shadowSprite'][_0x56a809(0x61e)]=this[_0x56a809(0x40e)](),_0x39f779[_0x56a809(0x322)]['bitmap']=ImageManager['loadSystem'](_0x39f779[_0x56a809(0x322)]['_filename']));}},Game_Event[_0x50f639(0x346)]['shadowFilename']=function(){const _0x26e6e5=_0x50f639;return this[_0x26e6e5(0x33f)]['filename'];},Game_Event[_0x50f639(0x346)][_0x50f639(0x403)]=function(){const _0x105858=_0x50f639;if(!this[_0x105858(0x33f)]['visible'])return![];return Game_CharacterBase['prototype'][_0x105858(0x403)][_0x105858(0x673)](this);},Game_Event[_0x50f639(0x346)][_0x50f639(0x32c)]=function(){const _0x2892b3=_0x50f639;return this[_0x2892b3(0x379)]['text'];},Game_Event[_0x50f639(0x346)]['labelWindowRange']=function(){const _0x453161=_0x50f639;return this[_0x453161(0x379)][_0x453161(0x45e)]??VisuMZ[_0x453161(0x380)]['Settings']['Label'][_0x453161(0x481)];},Game_Event['prototype'][_0x50f639(0x3ea)]=function(){const _0x23ee52=_0x50f639;return this[_0x23ee52(0x379)][_0x23ee52(0x652)]??VisuMZ['EventsMoveCore'][_0x23ee52(0x55c)][_0x23ee52(0x69b)][_0x23ee52(0x30c)]??'square';},VisuMZ[_0x50f639(0x380)][_0x50f639(0x562)]=function(_0x5d30a3){const _0xbbe2b6=_0x50f639,_0x1ec5b5=_0x5d30a3['labelWindowRangeType'](),_0x5c8453=_0x5d30a3['labelWindowRange']();return $gameMap[_0xbbe2b6(0x42b)]($gamePlayer['x'],$gamePlayer['y'],_0x5d30a3,_0x1ec5b5,_0x5c8453);},Game_Event['prototype']['isMapPassable']=function(_0x344a78,_0x51c38b,_0x58fd8c){const _0x449e2a=_0x50f639;if(this[_0x449e2a(0x2c6)]())return this[_0x449e2a(0x39f)](_0x344a78,_0x51c38b,_0x58fd8c);if($gameMap[_0x449e2a(0x2eb)](_0x344a78,_0x51c38b,_0x58fd8c,_0x449e2a(0x5bd)))return!![];if($gameMap[_0x449e2a(0x30b)](_0x344a78,_0x51c38b,_0x58fd8c,_0x449e2a(0x5bd)))return![];return Game_Character[_0x449e2a(0x346)]['isMapPassable'][_0x449e2a(0x673)](this,_0x344a78,_0x51c38b,_0x58fd8c);},Game_Event[_0x50f639(0x346)][_0x50f639(0x2c6)]=function(){const _0x4b984e=_0x50f639;if(this[_0x4b984e(0x510)]===undefined)this[_0x4b984e(0x1e1)]();return this[_0x4b984e(0x510)][_0x4b984e(0x622)]>0x0;},Game_Event[_0x50f639(0x346)][_0x50f639(0x39f)]=function(_0x73fd7d,_0x1da331,_0x4183b5){const _0x270104=_0x50f639,_0x15c97a=$gameMap[_0x270104(0x349)](_0x73fd7d,_0x4183b5),_0xb64a85=$gameMap[_0x270104(0x1e3)](_0x1da331,_0x4183b5),_0xcf39ac=$gameMap[_0x270104(0x27c)](_0x15c97a,_0xb64a85);return this[_0x270104(0x510)][_0x270104(0x292)](_0xcf39ac);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x3fc)]=Game_Event['prototype'][_0x50f639(0x5c2)],Game_Event[_0x50f639(0x346)][_0x50f639(0x5c2)]=function(){const _0x2db022=_0x50f639;if(this[_0x2db022(0x5bd)]()&&!$gameTemp[_0x2db022(0x38f)]()){if(this['event']()[_0x2db022(0x2c0)][_0x2db022(0x1e7)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this[_0x2db022(0x5b6)]=![],this[_0x2db022(0x4aa)]=![],this['event']()?VisuMZ[_0x2db022(0x380)][_0x2db022(0x3fc)]['call'](this):-0x1;},VisuMZ[_0x50f639(0x380)]['Game_Event_meetsConditions']=Game_Event[_0x50f639(0x346)][_0x50f639(0x211)],Game_Event[_0x50f639(0x346)][_0x50f639(0x211)]=function(_0x5756e7){const _0x4f6e70=_0x50f639;this[_0x4f6e70(0x480)](_0x5756e7),$gameTemp[_0x4f6e70(0x5ca)](this);const _0x5af2e2=VisuMZ[_0x4f6e70(0x380)][_0x4f6e70(0x308)]['call'](this,_0x5756e7);return $gameTemp[_0x4f6e70(0x58e)](),_0x5af2e2;},Game_Event[_0x50f639(0x346)][_0x50f639(0x68f)]=function(){const _0x577823=_0x50f639;return this[_0x577823(0x5b6)];},Game_Event[_0x50f639(0x346)][_0x50f639(0x480)]=function(_0x2e572d){const _0x2054c5=_0x50f639,_0x164297=_0x2e572d[_0x2054c5(0x315)];if(_0x164297['switch1Valid']&&DataManager[_0x2054c5(0x596)](_0x164297[_0x2054c5(0x5f1)]))this[_0x2054c5(0x5b6)]=!![];else{if(_0x164297['switch2Valid']&&DataManager[_0x2054c5(0x596)](_0x164297[_0x2054c5(0x269)]))this[_0x2054c5(0x5b6)]=!![];else _0x164297[_0x2054c5(0x3b4)]&&DataManager[_0x2054c5(0x1f2)](_0x164297['variableId'])&&(this['_advancedSwitchVariable']=!![]);}},Game_Event[_0x50f639(0x346)]['hasClickTrigger']=function(){if(this['_erased'])return![];return this['_clickTrigger'];},Game_Event['prototype'][_0x50f639(0x31d)]=function(){const _0x183fd2=_0x50f639;$gameTemp[_0x183fd2(0x466)](),this[_0x183fd2(0x4d0)]();},Game_Event['prototype'][_0x50f639(0x290)]=function(_0x36efee,_0x45cbef){const _0x2e6355=_0x50f639;return this[_0x2e6355(0x31f)]?this[_0x2e6355(0x429)](_0x36efee,_0x45cbef):Game_Character[_0x2e6355(0x346)]['pos'][_0x2e6355(0x673)](this,_0x36efee,_0x45cbef);},Game_Event[_0x50f639(0x346)][_0x50f639(0x429)]=function(_0x21f79b,_0x5eac4a){const _0x1552f5=_0x50f639;var _0x56c956=this['x']-this[_0x1552f5(0x31f)][_0x1552f5(0x5fa)],_0xc93962=this['x']+this[_0x1552f5(0x31f)][_0x1552f5(0x45b)],_0x40b79d=this['y']-this[_0x1552f5(0x31f)]['up'],_0x10ea98=this['y']+this[_0x1552f5(0x31f)][_0x1552f5(0x1db)];return _0x56c956<=_0x21f79b&&_0x21f79b<=_0xc93962&&_0x40b79d<=_0x5eac4a&&_0x5eac4a<=_0x10ea98;},VisuMZ[_0x50f639(0x380)][_0x50f639(0x44a)]=Game_Event[_0x50f639(0x346)][_0x50f639(0x366)],Game_Event[_0x50f639(0x346)][_0x50f639(0x366)]=function(_0x742f95,_0x462788,_0x48b8cb){const _0x2d1e7b=_0x50f639;for(let _0x31d51d=-this[_0x2d1e7b(0x31f)][_0x2d1e7b(0x5fa)];_0x31d51d<=this['_addedHitbox'][_0x2d1e7b(0x45b)];_0x31d51d++){for(let _0x39d26f=-this[_0x2d1e7b(0x31f)]['up'];_0x39d26f<=this[_0x2d1e7b(0x31f)][_0x2d1e7b(0x1db)];_0x39d26f++){if(!Game_Character[_0x2d1e7b(0x346)][_0x2d1e7b(0x366)][_0x2d1e7b(0x673)](this,_0x742f95+_0x31d51d,_0x462788+_0x39d26f,_0x48b8cb))return![];}}return!![];},Game_Event[_0x50f639(0x346)][_0x50f639(0x3d4)]=function(_0x13e8f4,_0x457226){const _0x326790=_0x50f639;if(Imported['VisuMZ_0_CoreEngine']&&this[_0x326790(0x281)]())return this['checkSmartEventCollision'](_0x13e8f4,_0x457226);else{const _0x485516=$gameMap[_0x326790(0x477)](_0x13e8f4,_0x457226)[_0x326790(0x25a)](_0x231e88=>_0x231e88!==this);return _0x485516[_0x326790(0x622)]>0x0;}},Game_Event[_0x50f639(0x346)][_0x50f639(0x2ad)]=function(_0x24009e,_0x2572af){const _0x3c455c=_0x50f639;if(!this[_0x3c455c(0x5f7)]())return![];else{const _0x47b5b2=$gameMap[_0x3c455c(0x477)](_0x24009e,_0x2572af)['filter'](_0x6bc6e5=>_0x6bc6e5!==this&&_0x6bc6e5['isNormalPriority']());return _0x47b5b2[_0x3c455c(0x622)]>0x0;}},Game_Event[_0x50f639(0x346)][_0x50f639(0x460)]=function(){const _0x2c7ae3=_0x50f639;if(!this[_0x2c7ae3(0x26d)])return'none';return this[_0x2c7ae3(0x26d)][_0x2c7ae3(0x392)]||_0x2c7ae3(0x2f1);},Game_Event['prototype'][_0x50f639(0x670)]=function(){const _0x258c52=_0x50f639;if(!this[_0x258c52(0x26d)])return 0x0;return this[_0x258c52(0x26d)][_0x258c52(0x29a)]||0x0;},Game_Event[_0x50f639(0x346)]['activationRegionList']=function(){const _0xe57c6c=_0x50f639;if(!this[_0xe57c6c(0x26d)])return[];return this[_0xe57c6c(0x26d)][_0xe57c6c(0x448)]||[];},Game_Event['prototype'][_0x50f639(0x57e)]=function(){const _0x68ec32=_0x50f639;Game_Character[_0x68ec32(0x346)]['increaseSteps'][_0x68ec32(0x673)](this);if(['none',_0x68ec32(0x3bc)]['includes'](this['activationProximityType']()))return;$gamePlayer[_0x68ec32(0x4f2)]([0x2]);},Game_Event[_0x50f639(0x346)]['isOnScreen']=function(){const _0x58f1a1=_0x50f639,_0x3a1828=Math[_0x58f1a1(0x452)]($gameMap[_0x58f1a1(0x362)]),_0x38399a=_0x3a1828+Math['ceil']($gameMap['screenTileX']())-0x1,_0x50b699=Math[_0x58f1a1(0x452)]($gameMap[_0x58f1a1(0x645)]),_0x30492b=_0x50b699+Math['ceil']($gameMap[_0x58f1a1(0x37b)]())-0x1;return this['x']>=_0x3a1828&&this['x']<=_0x38399a&&this['y']>=_0x50b699&&this['y']<=_0x30492b;},VisuMZ[_0x50f639(0x380)][_0x50f639(0x228)]=Game_Event['prototype'][_0x50f639(0x1d8)],Game_Event[_0x50f639(0x346)][_0x50f639(0x1d8)]=function(){const _0x5f31fd=_0x50f639;if(this['_screenActivation']||this['_screenParallel']){if(this['isOnScreen']()){if(!this[_0x5f31fd(0x4b0)]){this[_0x5f31fd(0x4b0)]=!![];if(this[_0x5f31fd(0x607)])this[_0x5f31fd(0x4d0)]();else this[_0x5f31fd(0x5b0)]&&(!this['_interpreter']&&(this[_0x5f31fd(0x4bf)]=new Game_Interpreter()),this[_0x5f31fd(0x4bf)][_0x5f31fd(0x68c)](this[_0x5f31fd(0x1ed)](),this[_0x5f31fd(0x543)]));}return;}else{this[_0x5f31fd(0x4b0)]=![];return;}}if(this[_0x5f31fd(0x506)]!==0x3)return;if(this[_0x5f31fd(0x3e9)])return;if(!this[_0x5f31fd(0x563)](![]))return;if(!this[_0x5f31fd(0x45d)](![]))return;VisuMZ[_0x5f31fd(0x380)][_0x5f31fd(0x228)][_0x5f31fd(0x673)](this);},VisuMZ['EventsMoveCore'][_0x50f639(0x5b5)]=Game_Event[_0x50f639(0x346)][_0x50f639(0x3cd)],Game_Event[_0x50f639(0x346)][_0x50f639(0x3cd)]=function(){const _0x135598=_0x50f639;if(!this['_interpreter'])return;if(!this[_0x135598(0x563)](!![]))return;if(!this[_0x135598(0x45d)](!![]))return;if(this[_0x135598(0x4bf)]&&!this['_interpreter'][_0x135598(0x54f)]()&&this[_0x135598(0x5b0)]){!this[_0x135598(0x615)]&&(this[_0x135598(0x4b0)]=![]);return;}VisuMZ[_0x135598(0x380)][_0x135598(0x5b5)][_0x135598(0x673)](this);},Game_Event['prototype']['checkRegionEventTrigger']=function(_0xa3feb9){const _0x22931b=_0x50f639;if(!_0xa3feb9&&$gameMap['isEventRunning']())return![];if(!_0xa3feb9&&$gameMap[_0x22931b(0x61b)]())return![];if(this[_0x22931b(0x302)]()<=0x0)return!![];return $gamePlayer['meetActivationRegionConditions'](this);},Game_Event['prototype'][_0x50f639(0x45d)]=function(_0x354a59){const _0x5c42e9=_0x50f639;if(!_0x354a59&&$gameMap[_0x5c42e9(0x26b)]())return![];if(!_0x354a59&&$gameMap[_0x5c42e9(0x61b)]())return![];if([_0x5c42e9(0x2f1),_0x5c42e9(0x3bc)][_0x5c42e9(0x292)](this[_0x5c42e9(0x460)]()))return!![];return $gamePlayer['meetActivationProximityConditions'](this);},Game_Event['prototype']['encounterProximityType']=function(_0x1d9dc4){const _0x1d92ef=_0x50f639,_0x16427f=_0x1d9dc4?this[_0x1d92ef(0x4b8)]:this[_0x1d92ef(0x569)];return _0x16427f?_0x16427f[_0x1d92ef(0x392)]:_0x1d92ef(0x2f1);},Game_Event[_0x50f639(0x346)]['encounterProximityDistance']=function(_0xe1efc0){const _0x266fdc=_0x50f639,_0xc1fd5=_0xe1efc0?this[_0x266fdc(0x4b8)]:this[_0x266fdc(0x569)];return _0xc1fd5?_0xc1fd5[_0x266fdc(0x29a)]:0x0;},VisuMZ['MoveAllSynchTargets']=function(_0x450888){const _0x3a74a6=_0x50f639;for(const _0x408b74 of $gameMap['events']()){if(!_0x408b74)continue;_0x408b74[_0x3a74a6(0x4f6)]()===_0x450888&&_0x408b74[_0x3a74a6(0x5cc)]();}},VisuMZ[_0x50f639(0x2c4)]=function(_0x52fbc3){const _0x108e10=_0x50f639;if(_0x52fbc3===0x0)return $gamePlayer;return $gameMap[_0x108e10(0x5bd)](_0x52fbc3);},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x21d)]=function(){},Game_Event[_0x50f639(0x346)][_0x50f639(0x21d)]=function(){const _0x2468c2=_0x50f639;VisuMZ[_0x2468c2(0x2d4)](this['_eventId']);},VisuMZ['FaceSynchAllSynchTargets']=function(_0x49cb3a){const _0x106452=_0x50f639;for(const _0x561757 of $gameMap['events']()){if(!_0x561757)continue;_0x561757[_0x106452(0x4f6)]()===_0x49cb3a&&_0x561757['processMoveSynchDirection']();}},Game_Event[_0x50f639(0x346)][_0x50f639(0x4f6)]=function(){const _0x5050a0=_0x50f639;return this[_0x5050a0(0x230)][_0x5050a0(0x64d)];},Game_Event[_0x50f639(0x346)]['moveSynchType']=function(){const _0x42e8af=_0x50f639;return this[_0x42e8af(0x230)][_0x42e8af(0x392)];},Game_Event[_0x50f639(0x346)]['realMoveSpeed']=function(){const _0x236849=_0x50f639;if(this[_0x236849(0x4f6)]()>=0x0){const _0xf01e62=VisuMZ[_0x236849(0x2c4)](this['moveSynchTarget']());if(_0xf01e62)return _0xf01e62[_0x236849(0x534)]();}return Game_Character[_0x236849(0x346)][_0x236849(0x534)][_0x236849(0x673)](this);},Game_Event[_0x50f639(0x346)][_0x50f639(0x5cc)]=function(){const _0x1c9978=_0x50f639;this[_0x1c9978(0x230)][_0x1c9978(0x2ef)]=this[_0x1c9978(0x230)][_0x1c9978(0x2ef)]||0x0,this['_moveSynch'][_0x1c9978(0x2ef)]--;if(this[_0x1c9978(0x230)]['timer']>0x0)return;this[_0x1c9978(0x230)]['timer']=this[_0x1c9978(0x230)][_0x1c9978(0x3ff)],this[_0x1c9978(0x3ad)]();},Game_Event['prototype']['adjustMoveSynchOpacityDelta']=function(_0x182316){const _0x3bf5ed=_0x50f639;if(this[_0x3bf5ed(0x4f6)]()>=0x0){const _0x329a4f=VisuMZ[_0x3bf5ed(0x2c4)](this[_0x3bf5ed(0x4f6)]());if(_0x329a4f){const _0x2bd511=$gameMap['distance'](this[_0x3bf5ed(0x3cc)],this['_realY'],_0x329a4f[_0x3bf5ed(0x3cc)],_0x329a4f[_0x3bf5ed(0x1f6)])-0x1,_0x2657ff=Math[_0x3bf5ed(0x324)]($gameMap['tileWidth'](),$gameMap[_0x3bf5ed(0x2e6)]()),_0x44b8f8=this[_0x3bf5ed(0x230)][_0x3bf5ed(0x40d)]||0x0;_0x182316-=Math[_0x3bf5ed(0x244)](0x0,_0x2bd511)*_0x2657ff*_0x44b8f8;}}return _0x182316;},Game_Event[_0x50f639(0x346)][_0x50f639(0x3ad)]=function(){const _0x40654c=_0x50f639;switch(this[_0x40654c(0x513)]()){case _0x40654c(0x3ec):this['processMoveSynchRandom']();break;case _0x40654c(0x300):this['processMoveSynchApproach']();break;case _0x40654c(0x470):this[_0x40654c(0x343)]();break;case _0x40654c(0x335):this['processMoveSynchCustom']();break;case _0x40654c(0x1ff):case _0x40654c(0x4f1):this[_0x40654c(0x200)]();break;case _0x40654c(0x675):case _0x40654c(0x458):this[_0x40654c(0x49d)]();break;case'mirror\x20horizontal':case _0x40654c(0x3f8):case'mirror\x20horz':case _0x40654c(0x5ce):this[_0x40654c(0x3d2)]();break;case _0x40654c(0x22c):case _0x40654c(0x414):case'mirror\x20vert':case _0x40654c(0x2e9):this[_0x40654c(0x67a)]();break;default:this['processMoveSynchRandom']();break;}this[_0x40654c(0x5c9)]();},Game_Event['prototype'][_0x50f639(0x274)]=function(){const _0x5eb224=_0x50f639,_0x41ebde=[0x2,0x4,0x6,0x8];$gameMap[_0x5eb224(0x38e)]()&&_0x41ebde['push'](0x1,0x3,0x7,0x9);const _0x56c7fb=[];for(const _0x19e15a of _0x41ebde){if(this[_0x5eb224(0x366)](this['x'],this['y'],_0x19e15a))_0x56c7fb[_0x5eb224(0x5d9)](_0x19e15a);}if(_0x56c7fb[_0x5eb224(0x622)]>0x0){const _0x52f8e0=_0x56c7fb[Math[_0x5eb224(0x4a4)](_0x56c7fb[_0x5eb224(0x622)])];this[_0x5eb224(0x5a0)](_0x52f8e0);}},Game_Event['prototype'][_0x50f639(0x26e)]=function(){const _0x208066=_0x50f639,_0x5b87e9=VisuMZ['GetMoveSynchTarget'](this[_0x208066(0x4f6)]());this[_0x208066(0x328)](_0x5b87e9);},Game_Event[_0x50f639(0x346)][_0x50f639(0x343)]=function(){const _0x376c2c=_0x50f639,_0x36e2ef=VisuMZ['GetMoveSynchTarget'](this[_0x376c2c(0x4f6)]());this[_0x376c2c(0x5a4)](_0x36e2ef);},Game_Event['prototype'][_0x50f639(0x221)]=function(){const _0x18a523=_0x50f639;this[_0x18a523(0x63c)]();},Game_Event[_0x50f639(0x346)][_0x50f639(0x200)]=function(){const _0x495392=_0x50f639,_0x46a7fd=VisuMZ[_0x495392(0x2c4)](this[_0x495392(0x4f6)]());this[_0x495392(0x5a0)](_0x46a7fd['lastMovedDirection']());},Game_Event['prototype']['processMoveSynchReverseMimic']=function(){const _0x6d5e55=_0x50f639,_0x1914fe=VisuMZ[_0x6d5e55(0x2c4)](this['moveSynchTarget']());this[_0x6d5e55(0x5a0)](this[_0x6d5e55(0x692)](_0x1914fe['lastMovedDirection']()));},Game_Event[_0x50f639(0x346)][_0x50f639(0x3d2)]=function(){const _0x35d9c8=_0x50f639,_0xc09151=VisuMZ[_0x35d9c8(0x2c4)](this[_0x35d9c8(0x4f6)]()),_0x406484=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0xc09151[_0x35d9c8(0x1f0)]()];this[_0x35d9c8(0x5a0)](_0x406484);},Game_Event[_0x50f639(0x346)][_0x50f639(0x67a)]=function(){const _0x4da198=_0x50f639,_0x4ebfb7=VisuMZ[_0x4da198(0x2c4)](this['moveSynchTarget']()),_0x37956b=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x4ebfb7['lastMovedDirection']()];this[_0x4da198(0x5a0)](_0x37956b);},Game_Event[_0x50f639(0x346)][_0x50f639(0x31a)]=function(){const _0x26c5b7=_0x50f639,_0x2b9981=VisuMZ[_0x26c5b7(0x2c4)](this[_0x26c5b7(0x4f6)]()),_0x3c0e9e=_0x2b9981['direction']();switch(this[_0x26c5b7(0x513)]()){case'mimic':case _0x26c5b7(0x4f1):this[_0x26c5b7(0x248)](_0x3c0e9e);break;case _0x26c5b7(0x675):case _0x26c5b7(0x458):this['setDirection'](this[_0x26c5b7(0x692)](_0x3c0e9e));break;case _0x26c5b7(0x4a2):case _0x26c5b7(0x3f8):case _0x26c5b7(0x584):case _0x26c5b7(0x5ce):this[_0x26c5b7(0x248)]([0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x3c0e9e]);break;case _0x26c5b7(0x22c):case _0x26c5b7(0x414):case'mirror\x20vert':case _0x26c5b7(0x2e9):this[_0x26c5b7(0x248)]([0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x3c0e9e]);break;default:return;}this[_0x26c5b7(0x5c9)]();},Game_Event[_0x50f639(0x346)]['restoreSavedEventPosition']=function(){const _0x3a2259=_0x50f639,_0xc49b8c=$gameSystem[_0x3a2259(0x4e9)](this);if(!_0xc49b8c)return;this[_0x3a2259(0x4c9)](_0xc49b8c['x'],_0xc49b8c['y']),this[_0x3a2259(0x344)](),this['setDirection'](_0xc49b8c[_0x3a2259(0x284)]),this['_pageIndex']===_0xc49b8c['pageIndex']&&(this[_0x3a2259(0x1fc)]=_0xc49b8c['moveRouteIndex']);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x634)]=Game_Event[_0x50f639(0x346)]['update'],Game_Event['prototype'][_0x50f639(0x5c9)]=function(){const _0x5075c4=_0x50f639;VisuMZ[_0x5075c4(0x380)][_0x5075c4(0x634)][_0x5075c4(0x673)](this),!Utils[_0x5075c4(0x3c4)]()&&this[_0x5075c4(0x3f5)]();},Game_Event[_0x50f639(0x346)][_0x50f639(0x51f)]=function(){const _0x1acd67=_0x50f639;Game_Character[_0x1acd67(0x346)]['updateMove'][_0x1acd67(0x673)](this),this[_0x1acd67(0x3c6)]();},Game_Event['prototype'][_0x50f639(0x1f5)]=function(){const _0x2ed8a0=_0x50f639;if($gameMap[_0x2ed8a0(0x2ed)]())return!![];return this[_0x2ed8a0(0x46d)];},Game_Event[_0x50f639(0x346)][_0x50f639(0x3c6)]=function(){const _0x361176=_0x50f639;if(!this[_0x361176(0x1f5)]())return;this[_0x361176(0x697)]();},Game_Event[_0x50f639(0x346)][_0x50f639(0x697)]=function(){const _0x339438=_0x50f639;this[_0x339438(0x1f4)]=!![];},Game_Event[_0x50f639(0x346)][_0x50f639(0x3f5)]=function(){const _0x566955=_0x50f639;this[_0x566955(0x1f4)]&&this[_0x566955(0x42d)]();},Game_Event[_0x50f639(0x346)]['processSaveEventLocation']=function(){const _0x46e2f5=_0x50f639;this[_0x46e2f5(0x1f4)]=![],$gameSystem[_0x46e2f5(0x697)](this);},Game_Event['prototype'][_0x50f639(0x2dd)]=function(){const _0x31a391=_0x50f639;$gameSystem[_0x31a391(0x218)](this);},Game_Event[_0x50f639(0x346)][_0x50f639(0x3f3)]=function(){const _0x4d35aa=_0x50f639;return $gameSystem['getEventIconData'](this)?Game_Character[_0x4d35aa(0x346)][_0x4d35aa(0x3f3)][_0x4d35aa(0x673)](this):{'iconIndex':0x0,'bufferX':settings[_0x4d35aa(0x23d)][_0x4d35aa(0x5a2)],'bufferY':settings['Icon'][_0x4d35aa(0x24b)],'blendMode':settings[_0x4d35aa(0x23d)][_0x4d35aa(0x640)]};},Game_Event[_0x50f639(0x346)]['hasCPCs']=function(){const _0x34161b=_0x50f639;return this[_0x34161b(0x4aa)];},VisuMZ[_0x50f639(0x380)][_0x50f639(0x52d)]=Game_Event[_0x50f639(0x346)][_0x50f639(0x211)],Game_Event[_0x50f639(0x346)][_0x50f639(0x211)]=function(_0x2374cd){const _0x1f59ab=_0x50f639,_0x437821=VisuMZ[_0x1f59ab(0x380)]['Game_Event_meetsConditionsCPC']['call'](this,_0x2374cd);if(!_0x437821)return![];return this[_0x1f59ab(0x57b)](_0x2374cd);},Game_Event[_0x50f639(0x346)]['meetsCPC']=function(_0x1b6e4b){const _0x5ab332=_0x50f639;VisuMZ[_0x5ab332(0x380)][_0x5ab332(0x60a)]['loadCPC'](_0x1b6e4b),this[_0x5ab332(0x4aa)]=_0x1b6e4b[_0x5ab332(0x25b)][_0x5ab332(0x622)]>0x0;_0x1b6e4b[_0x5ab332(0x25b)]===undefined&&VisuMZ[_0x5ab332(0x380)]['CustomPageConditions'][_0x5ab332(0x648)](_0x1b6e4b);if(_0x1b6e4b[_0x5ab332(0x25b)]['length']>0x0)return $gameMap[_0x5ab332(0x5bd)](this[_0x5ab332(0x543)])&&VisuMZ[_0x5ab332(0x380)][_0x5ab332(0x60a)][_0x5ab332(0x620)](_0x1b6e4b['CPC'],this[_0x5ab332(0x543)]);return!![];},VisuMZ[_0x50f639(0x380)][_0x50f639(0x212)]=Game_Troop[_0x50f639(0x346)][_0x50f639(0x211)],Game_Troop['prototype'][_0x50f639(0x211)]=function(_0x59b54a){const _0x4dcc92=_0x50f639;var _0x7a56a2=VisuMZ[_0x4dcc92(0x380)][_0x4dcc92(0x212)][_0x4dcc92(0x673)](this,_0x59b54a);return _0x7a56a2&&this[_0x4dcc92(0x35e)](_0x59b54a);},Game_Troop[_0x50f639(0x346)]['CPCsMet']=function(_0x305819){const _0x13e632=_0x50f639;_0x305819[_0x13e632(0x25b)]===undefined&&VisuMZ[_0x13e632(0x380)][_0x13e632(0x60a)]['loadCPC'](_0x305819);if(_0x305819[_0x13e632(0x25b)]['length']>0x0)return VisuMZ[_0x13e632(0x380)][_0x13e632(0x60a)][_0x13e632(0x620)](_0x305819[_0x13e632(0x25b)],0x0);return!![];},VisuMZ['EventsMoveCore']['Game_Event_locate']=Game_Event['prototype'][_0x50f639(0x515)],Game_Event[_0x50f639(0x346)]['locate']=function(_0x7f128b,_0x36e737){const _0x4f850d=_0x50f639;if(this[_0x4f850d(0x43b)]){const _0x152551=this['event']()[_0x4f850d(0x2c0)]||'';if(_0x152551[_0x4f850d(0x1e7)](/<(?:LOCATION|START|START LOCATION):[ ](.*?)>/i)){const _0x1541d6=String(RegExp['$1'])[_0x4f850d(0x5e7)](',')[_0x4f850d(0x479)](_0x594c0c=>Number(_0x594c0c));_0x7f128b+=Number(_0x1541d6[0x0]||0x0)||0x0,_0x36e737+=Number(_0x1541d6[0x1]||0x0)||0x0;}_0x152551[_0x4f850d(0x1e7)](/<(?:LOCATION|START|START LOCATION) X:[ ](.*?)>/i)&&(_0x7f128b+=Number(RegExp['$1'])),_0x152551[_0x4f850d(0x1e7)](/<(?:LOCATION|START|START LOCATION) Y:[ ](.*?)>/i)&&(_0x36e737+=Number(RegExp['$1']));}VisuMZ[_0x4f850d(0x380)][_0x4f850d(0x514)][_0x4f850d(0x673)](this,_0x7f128b,_0x36e737),this[_0x4f850d(0x5e6)]=_0x7f128b,this[_0x4f850d(0x2a2)]=_0x36e737,this[_0x4f850d(0x3c6)]();},VisuMZ[_0x50f639(0x380)][_0x50f639(0x50b)]=Game_Event[_0x50f639(0x346)][_0x50f639(0x21f)],Game_Event[_0x50f639(0x346)][_0x50f639(0x21f)]=function(){const _0x47fe24=_0x50f639,_0x44f91f=$gameMap[_0x47fe24(0x29a)](this['x'],this['y'],this[_0x47fe24(0x5e6)],this[_0x47fe24(0x2a2)]),_0x18dc52=_0x44f91f*(this['_randomMoveWeight']||0x0);Math['random']()>=_0x18dc52?VisuMZ[_0x47fe24(0x380)]['Game_Event_moveTypeRandom'][_0x47fe24(0x673)](this):this[_0x47fe24(0x2cc)]();},Game_Event['prototype'][_0x50f639(0x2cc)]=function(){const _0xd41dc0=_0x50f639,_0x279be0=this['deltaXFrom'](this['_randomHomeX']),_0x2e95ef=this[_0xd41dc0(0x608)](this[_0xd41dc0(0x2a2)]);if(Math[_0xd41dc0(0x311)](_0x279be0)>Math[_0xd41dc0(0x311)](_0x2e95ef))this['moveStraight'](_0x279be0>0x0?0x4:0x6),!this[_0xd41dc0(0x511)]()&&_0x2e95ef!==0x0&&this[_0xd41dc0(0x2b8)](_0x2e95ef>0x0?0x8:0x2);else _0x2e95ef!==0x0&&(this[_0xd41dc0(0x2b8)](_0x2e95ef>0x0?0x8:0x2),!this[_0xd41dc0(0x511)]()&&_0x279be0!==0x0&&this[_0xd41dc0(0x2b8)](_0x279be0>0x0?0x4:0x6));},Game_CharacterBase[_0x50f639(0x346)]['clearAttachPictureSettings']=function(){const _0x3af4a1=_0x50f639;this[_0x3af4a1(0x1cd)]={'filename':'','type':_0x3af4a1(0x3e2),'blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase['prototype'][_0x50f639(0x46e)]=function(){const _0x41f445=_0x50f639;if(this[_0x41f445(0x1cd)]===undefined)this[_0x41f445(0x68b)]();return this[_0x41f445(0x1cd)];},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x617)]=function(){return this['attachPictureSettings']()['filename']??'';},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x1e6)]=function(){const _0x2f501e=_0x50f639;return this[_0x2f501e(0x46e)]()[_0x2f501e(0x3e2)]??_0x2f501e(0x3e2);},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x609)]=function(){const _0xde85b4=_0x50f639;return this[_0xde85b4(0x46e)]()[_0xde85b4(0x65e)]??0x0;},Game_CharacterBase['prototype'][_0x50f639(0x2e1)]=function(){return this['attachPictureSettings']()['maxSize']??0x0;},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x4b1)]=function(){const _0x3a73d7=_0x50f639;return this[_0x3a73d7(0x46e)]()[_0x3a73d7(0x3f1)]??0x0;},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x401)]=function(){const _0x229a53=_0x50f639;return this['attachPictureSettings']()[_0x229a53(0x1e8)]??0x0;},Game_CharacterBase[_0x50f639(0x346)][_0x50f639(0x5b3)]=function(){const _0x3722c4=_0x50f639;return this[_0x3722c4(0x46e)]()[_0x3722c4(0x3f9)]??0x1;},VisuMZ['EventsMoveCore'][_0x50f639(0x2d8)]=Game_Interpreter['prototype']['updateWaitMode'],Game_Interpreter[_0x50f639(0x346)][_0x50f639(0x5ad)]=function(){const _0x5382d6=_0x50f639;if(this[_0x5382d6(0x48e)]==='CallEvent'){if(window[this[_0x5382d6(0x57a)]])this[_0x5382d6(0x48e)]='',this[_0x5382d6(0x397)]();else return!![];}else return VisuMZ[_0x5382d6(0x380)]['Game_Interpreter_updateWaitMode']['call'](this);},VisuMZ[_0x50f639(0x380)]['Game_Interpreter_executeCommand']=Game_Interpreter['prototype'][_0x50f639(0x5ab)],Game_Interpreter[_0x50f639(0x346)]['executeCommand']=function(){const _0x256cb7=_0x50f639,_0x23c012=$gameMap&&this['_eventId']?$gameMap[_0x256cb7(0x5bd)](this[_0x256cb7(0x543)]):null;$gameTemp['registerSelfTarget'](_0x23c012);const _0x2cea0e=VisuMZ[_0x256cb7(0x380)][_0x256cb7(0x5a6)][_0x256cb7(0x673)](this);return $gameTemp['clearSelfTarget'](),_0x2cea0e;},VisuMZ[_0x50f639(0x380)][_0x50f639(0x217)]=Game_Interpreter['prototype']['command357'],Game_Interpreter[_0x50f639(0x346)]['command357']=function(_0x49e9a9){const _0x335187=_0x50f639;return $gameTemp[_0x335187(0x220)](this),VisuMZ[_0x335187(0x380)][_0x335187(0x217)][_0x335187(0x673)](this,_0x49e9a9);},Game_Interpreter['prototype'][_0x50f639(0x242)]=function(_0x3eeb4e){const _0x29fb5b=_0x50f639;this[_0x29fb5b(0x36a)]=_0x3eeb4e;const _0x557a8f=_0x29fb5b(0x363)[_0x29fb5b(0x566)](_0x3eeb4e[_0x29fb5b(0x336)][_0x29fb5b(0x677)](0x3));this['_callEventMap']=_0x29fb5b(0x60c)+Graphics[_0x29fb5b(0x2b2)]+'_'+this[_0x29fb5b(0x353)](),DataManager[_0x29fb5b(0x39e)](this['_callEventMap'],_0x557a8f),window[this[_0x29fb5b(0x57a)]]?this['startCallEvent']():this[_0x29fb5b(0x312)](_0x29fb5b(0x66b));},Game_Interpreter[_0x50f639(0x346)][_0x50f639(0x397)]=function(){const _0x1e7fa4=_0x50f639,_0x2e021b=this[_0x1e7fa4(0x36a)],_0x261f6f=window[this[_0x1e7fa4(0x57a)]],_0x209fac=_0x261f6f[_0x1e7fa4(0x459)][_0x2e021b[_0x1e7fa4(0x353)]];if(_0x209fac&&_0x209fac[_0x1e7fa4(0x437)][_0x2e021b['pageId']-0x1]){const _0x42dceb=_0x209fac[_0x1e7fa4(0x437)][_0x2e021b['pageId']-0x1][_0x1e7fa4(0x1ed)];this[_0x1e7fa4(0x60e)](_0x42dceb,this['eventId']());}window[this[_0x1e7fa4(0x57a)]]=undefined,this[_0x1e7fa4(0x57a)]=undefined,this[_0x1e7fa4(0x36a)]=undefined;};function Game_CPCInterpreter(){const _0x5ad692=_0x50f639;this[_0x5ad692(0x378)][_0x5ad692(0x473)](this,arguments);};function _0x26fc(){const _0x46470e=['event','checkNeedForPeriodicRefresh','Scene_Map_startEncounterEffect','setEventLabelsVisible','_targetY','findProperPageIndex','_needsRefresh','processMoveRouteStepFrom','setImage','screenX','KNEEL','isDashing','update','registerSelfTarget','restoreSavedEventPosition','updateMoveSynch','switches','horz\x20mirror','Game_Character_forceMoveRoute','endOffset','SelfVariableID','row','EnableDashTilt','getSelfTarget','isEventClickTriggered','followers','Game_Message_add','morphIntoTemplate','push','9MhYRpL','setDestination','EventAllow','registerSelfEvent','some','_needsPeriodicRefresh','startsWith','height','ZZZ','%1Dock','All','205rRooPU','_randomHomeX','split','clearPageSettings','_tileId','encounterProximityDistance','endAngle','BalloonOffsetY','processMoveRouteMoveTo','drawIcon','processMoveRouteFadeIn','startScaleX','switch1Id','hasDragonbones','processMoveRoutePatternLock','loadSystem','setCharacterSpriteSheetInvisible','DashModifier','isNormalPriority','_PlayerDiagonalSetting','SpawnEventDespawnEventID','left','_dragonbones','Game_Followers_isVisible','IconSet','isPlayerWithinEncounterHalfEvents','anchor','SwitchGetSelfSwitchID','createBitmap','processMoveRouteStepTo','bind','Rope','setupAttachPictureBitmap','Game_Vehicle_isMapPassable','_screenActivation','deltaYFrom','attachPictureBlendMode','CustomPageConditions','isMapPassable','$callEventMap','endOffsetX','setupChild','MoveAllSynchTargets','isDiagonalDirection','originalText','misc','createContents','startOffsetY','_screenParallelOnce','useCarryPoseForIcons','attachPictureFilename','createEventsMoveCoreTileMessagePopup','deltaX','setOpacity','isAnyEventStarting','MsgPopupEvent','processMoveRouteMoveUntilStop','_filename','16788726BpCtys','metCPC','_selfTargetItemChoice','length','determineCommonEventsWithCPC','isValid','_alwaysUpdateMove','updateSpritePosition','_stopCount','_visibleEventY','createLabelWindowForTarget','_spriteset','Visibility','characterIndexVS8','forceCarrying','directionOnLadderSpriteVS8dir','processMoveCommand','_characterIndex','DefaultShadow','createLabelWindows','createSpawnedEvent','Game_Event_update','Ship','_saveEventLocations','isPosing','RegionTouch','Game_System_initialize','_stepPattern','despawnTerrainTags','updateRoutineMove','hasEncounterHalf','hasClickTrigger','setupCopyEvent','BlendMode','_eventSpawnData','Game_CharacterBase_bushDepth','_vehicleType','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','_displayY','morphInto','Step1MapId','loadCPC','TiltVert','Player','MapID','Dock','target','processMoveRouteBalloon','deltaY','Sprite_Character_characterPatternY','resetFontSettings','rangeType','sqrt','ARRAYSTRUCT','_duration','Game_Player_checkEventTriggerThere','Game_Player_increaseSteps','canStartLocalEvents','processMoveRouteSelfSwitch','_lastAttachPictureType','Operation','_checkEncounterRaw','Stop','blendMode','PosY','Minutes','bufferY','iconIndex','LEFT','SLEEP','isOnLadder','%1,','createShadows','TurnInPlaceDelay','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','CallEvent','_startScaleY','patternHeight','initMembersEventsMoveCore','version','activationProximityDistance','processMoveRouteMoveToCharacter','Arc','call','processMoveRouteHugWall','reverse\x20mimic','bufferX','padZero','MUSIC\x20NOTE','refreshEventLabels','processMoveSynchMirrorVert','clearPose','frontX','setChaseOff','_lastAttachPictureMaxSize','findDirectionTo','_forceHideFollower','updateTextPosition','command108','_randomMoveWeight','resetIconsOnEventsDataKey','meetActivationProximityConditions','fontSize','LEFT\x20TO\x20RIGHT','concat','SwitchId','gainFrames','clearAttachPictureSettings','setup','visible','Step2EventId','hasAdvancedSwitchVariable','parent','_poseDuration','reverseDir','_eventMorphData','isJumping','EventTimerResume','startOffsetX','saveEventLocation','status','_visibleEventX','setBackgroundType','Label','MsgPopupTargetTile','isDestinationValid','_spawnedEvents','ADDITIVE','ShiftY','despawnEventId','clearEventCache','smooth','setPose','endScaleY','EventID','shadowY','LIGHT\x20BULB','_attachPicture','PreCopyJS','_hue','clearStepPattern','OffsetY','initFollowerController','findDiagonalDirectionTo','turnTowardPoint','_tilemap','frontY','Game_Timer_initialize','checkEventTriggerAuto','DashingEnable','setMapValue','down','zoomScale','Game_Switches_setValue','deletePreservedMorphEventDataKey','erase','MsgPopupPlayer','initEventsMoveCoreEffects','MOBILE_EVENT_LABELS','roundYWithDirection','PlayerMovementChange','Window_Message_startMessage','attachPictureType','match','offsetY','_counter','getPosingCharacterDirection','updateScale','DOWN','list','Name','_eventCopyData','lastMovedDirection','end','isAdvancedVariable','VICTORY','_requestSaveEventLocation','isSaveEventLocation','_realY','_scaleX','Chase','Region','Spriteset_Map_createShadow','isPassable','_moveRouteIndex','create','PathfindMobileEnabled','mimic','processMoveSynchMimic','_forceHidePlayer','Game_Enemy_meetsSwitchCondition','UPPER\x20RIGHT','tileCoordinates','isLongPressed','getPlayerDiagonalSetting','Step2MapId','autoEventIconBuffer','EventLocationCreate','referEvent','spawnPreserved','moveAwayFromPoint','4347762tXHCQh','updateEventsAndMovementCore','isMapSwitch','Game_Event_updateSelfMovement','meetsConditions','Game_Troop_meetsConditionsCPC','requestMapLoadCommonEvents','_commonEventId','TiltRight','drawing','Game_Interpreter_PluginCommand','deleteSavedEventLocation','initEventsMoveCore','DashOnLadder','requestBalloon','_pattern','updateMoveSynchDirection','createDisplayObjects','moveTypeRandom','setLastPluginCommandInterpreter','processMoveSynchCustom','MUSIC','isEventsMoveCoreInvisible','SILENCE','executeCommonEvent','SuccessSwitchId','clearCarrying','Game_Event_checkEventTriggerAuto','onAfterLoad','PreSpawnJS','PreMorphJS','mirror\x20vertical','isTurnInPlace','Game_Event_clearPageSettings','Button','_moveSynch','Game_Map_events','updateVS8BalloonOffsets','despawnEverything','updatePattern','_arcPeak','processMoveRouteFadeOut','setupRegionRestrictions','ROUTE_SCRIPT','NORMAL','characterPatternY','Game_Temp_setDestination','isAllowEventAutoMovement','Icon','cwX','getLastPluginCommandInterpreter','deltaXFrom','_visiblePlayerY','pluginCommandCallEvent','TiltLeft','max','setPlayerControlDisable','_lastAttachPictureScale','onCancel','setDirection','createIconSprite','updateFrame','BufferY','5509576uiuaDk','processMoveRouteMoveRepeat','deleteSavedEventLocationKey','updateFadeOut','PlayerIconDelete','List','resetIconsOnEventsData','_spawnData','Game_CharacterBase_direction','variables','setupFollowerVisibilityOverrides','_inputTime','IconBlendMode','isActive','filter','CPC','slice','OperateValues','reserveCommonEvent','DiagonalSpeedMultiplier','_scaleY','requestRefresh','EXCLAMATION','setFrame','value','_eventScreenX','Self\x20Variable\x20%1','createProxyWindow','Game_CharacterBase_screenY','switch2Id','fadeOut','isEventRunning','isPlayerForceShown','_activationProximity','processMoveSynchApproach','addChild','SpawnEventAtRegion','characterPatternYVS8','pow','isLandOk','processMoveSynchRandom','initEventsMoveCoreSettings','clear','turnAwayFromCharacter','processEraseEncounterSpawn','areFollowersForceHidden','startMapCommonEventOnTouch','MOBILE_DIAGONAL_PATHFINDING','regionId','_scaleBaseX','updateDuration','updateTilt','setupPlayerVisibilityOverrides','isSmartEventCollisionOn','mapValue','_tileExpand','direction','Game_Player_checkEventTriggerHere','Sprite_Character_initMembers','parameters','Game_Timer_start','isShip','_isObjectCharacter','%1:%2','Airship','VisibleEventLabels','Map%1-Event%2','getDiagonalDestination','pos','_forceShowFollower','includes','Vehicle','_proxyWindow','add','needsAttachPictureUpdate','_eventCache','Game_Switches_value','removeMorph','distance','_spriteOffsetY','Game_Player_isDashing','MoveRouteIndex','getControlledFollowerID','FUNC','AirshipSpeed','getInputDir8','_randomHomeY','windowPadding','createTextSprite','Game_Event_start','updateText','canUpdate','COLLAPSE','dir8','resetExitSelfSwitches','Game_Follower_chaseCharacter','AllForbid','checkSmartEventCollision','ApplyPopupExtraSettings','diamond','_cacheSystemVisible','Spriteset_Map_createLowerLayer','frameCount','_targetScaleY','updateEventIconSprite','characterIndex','initMoveSpeed','MsgDuration','moveStraight','startEncounterEffect','processEraseEncounterEvents','front','follower','checkEventTriggerHere','Scene_Boot_onDatabaseLoaded','PreloadedMaps','note','_SavedEventLocations','ccwY','SPIN\x20ANTICLOCKWISE','GetMoveSynchTarget','Passability','hasMoveOnlyRegions','roundY','setCharacterBitmap','PlayerIconChange','setMoveRoute','Game_CharacterBase_isTransparent','moveBackToRandomHome','DIAGONAL_PATHFINDING_EVENT_LIMIT','LIGHTBULB','_encounterEffectDuration','ARRAYSTR','fontFace','Game_CharacterBase_characterIndex','Scene_Map_createDisplayObjects','FaceSynchAllSynchTargets','_isCharacterSpriteSheetInvisible','_offsetX','_cpc','Game_Interpreter_updateWaitMode','variableId','adjustMoveSynchOpacityDelta','fittingHeight','isSceneMap','deleteEventLocation','getInputDirection','_eventLabelOffsetX','turnAwayFromPoint','attachPictureMaxSize','updateEventMirrorSprite','updateEventsMoveCoreTagChanges','_lastPluginCommandInterpreter','createEventsMoveCoreMessagePopup','tileHeight','11779656PCTnIK','defaultFontSize','vert\x20mirror','Template','isRegionAllowPass','Game_Party_hasEncounterHalf','isSaveEventLocations','processOk','timer','jump','none','WalkAllow','Game_Map_event','onDatabaseLoaded','147234omlMTL','PageId','%1DockRegionOnly','despawnAtXY','_cacheVisibility','MapId','isSpriteVS8dir','initMembers','setAllowEventAutoMovement','replace','resetSelfSwitchesForEvent','approach','hueShift','activationRegionList','code','isAllowCharacterTilt','_chaseOff','Game_Map_isDashDisabled','VariableGetSelfVariableID','Game_Event_meetsConditions','PreloadMaps','Game_CharacterBase_moveStraight','isRegionForbidPass','RangeType','Disable','setBalloonPose','IconBufferY','roundX','abs','setWaitMode','isDashingAndMoving','mainFontSize','conditions','duration','USER-DEFINED\x203','IconSize','circle','processMoveSynchDirection','Game_CharacterBase_canPass','onMapLoaded','onClickTrigger','HURT','_addedHitbox','indexOf','VisuMZ_1_MessageCore','_shadowSprite','_text','min','meetActivationRegionConditions','textSizeEx','Game_Player_isMapPassable','moveTowardCharacter','EVAL','processMoveRouteStepToCharacter','onOk','labelWindowText','updatePose','eventLabelsVisible','rotation','_eventIcon','Game_Variables_value','refreshIfNeeded','text','trim','custom','mapId','setValue','_wholeDuration','_eventLabelOffsetY','RegionOkTarget','NOTE','isBigCharacter','_followerControlID','checkExistingEntitiesAt','_shadowGraphic','setHue','restoreIconsOnEventsDataKey','_speed','processMoveSynchAway','refreshBushDepth','startOffset','prototype','log','startMessage','roundXWithDirection','_active','hideShadows','jumpAll','Game_Vehicle_isLandOk','_characterName','lastSpawnedEvent','_mirrorSprite','of\x20Preloaded\x20Maps.\x0a\x0a','VisuMZ_Setup_Preload_Map','eventId','StopAutoMoveMessages','isLabelVisible','WalkForbid','Game_CharacterBase_increaseSteps','destroy','Game_SelfSwitches_value','Letter','isCollidedWithPlayerCharacters','ARRAYNUM','isBattleTest','CPCsMet','_expireCommonEvent','updateFadeIn','_diagonalSupport','_displayX','Map%1.json','updateAttachPictureBitmap','updatePatternEventsMoveCore','canPass','...','isSelfSwitch','VehicleAllow','_callEventData','isStopFollowerChasing','_attachPictureSprite','clamp','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','Self\x20Switch\x20%1','Sprite_Balloon_updatePosition','_lastAttachPictureFilename','_moveRoute','FontSize','characterPatternYBasic','_selfTargetNumberInput','meetsSwitchCondition','refresh','initialize','_labelWindow','spriteId','screenTileY','MapVariables','EventIconDelete','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','createSaveEventLocationData','EventsMoveCore','constructor','onLoadSuccess','floor','isInvisibleCharacter','selfValue','isMapVariable','updateTextScale','setDashingEnabled','setPattern','setupSaveEventLocations','isAirship','_commonEvents','updateBitmapSmoothing','isSupportDiagonalMovement','isPlaytest','updateHueShift','disable','type','setupEvents','Step1EventId','_forceCarrying','SelfSwitchID','startCallEvent','PosX','BalloonOffsetX','RIGHT','createCharacterShadow','updateOpacity','_eventErased','loadDataFile','isMoveOnlyRegionPassable','_character','updateTextAngle','_direction','loadPicture','angle','LOWER\x20LEFT','setDiagonalDirection','convertVariableValuesInScriptCall','_moveSpeed','FollowerSetControl','startMapCommonEventOnOK','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_fadeOutStart','processMoveSynch','inBattle','EventLocationDelete','isMoving','\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!','SelfVariables','scrolledY','variableValid','areFollowersForceShown','_DisablePlayerControl','Sprite_Character_setTileBitmap','parallelCommonEvents','UNTITLED','isPlayerWithinEncounterNoneEvents','turnRight90','region','needsUpdate','_regionRules','prepareSpawnedEventAtXY','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','BoatSpeed','setupSpawnedEvents','shadowX','isMobileDevice','firstSpawnedEvent','autosaveEventLocation','setupEventsMoveCoreCommentTags','Game_Troop_meetsConditions','fadeDuration','timerText','isSpawnHitboxCollisionOk','_realX','updateParallel','changeSpeed','_fadeOutDuration','checkValidEventerMap','getMapSpawnedEventData','processMoveSynchMirrorHorz','FollowerIndex','isCollidedWithEvents','DEFAULT_SHIFT_Y','_hidden','Game_Event_checkEventTriggerTouch','_targetX','outlineColor','addLoadListener','_type','_working','updateAttachPictureSprite','PostMorphJS','EventIconChange','HEART','Game_Party_hasEncounterNone','picture','convertSelfVariableValuesInScriptCall','COBWEB','resetPattern','EnableDir8','_startAngle','_starting','_activationProximityAutoTriggerBypass','labelWindowRangeType','pause','random','template','deleteIconsOnEventsData','HMPH','_paused','offsetX','loadSvEnemy','getEventIconData','processMoveRouteTeleportTo','updateSaveEventLocation','_startScaleX','AdvancedVariables','horizontal\x20mirror','scale','Hours','EventTimerFramesGain','Game_Event_findProperPageIndex','Game_Message_setItemChoice','isEventTest','delay','_frames','attachPictureOffsetY','_event','isShadowVisible','Game_Vehicle_initMoveSpeed','resetSelfSwitchesForMap','_eventOverload','setMovementSuccess','resume','setItemChoice','DashEnableToggle','Scene_Map_onMapLoadedEncErase','forceDashing','opacityDelta','shadowFilename','_comments','OffsetX','checkEventTriggerTouch','OpacitySpeed','EventId','vertical\x20mirror','_PreservedEventMorphData','isEmptyCharacter','_spriteOffsetX','_scaleBaseY','PostCopyJS','Game_Map_update','moveTowardPoint','General','Forbid','_fadeInDuration','onLoadAttachPicture','checkEventsMoveCoreStringTags','EventTimerExpireEvent','name','bushDepth','_clickTrigger','isPlayerControlDisabled','isSelfVariable','createDummyWindow','isTransparent','posEventsMoveCore','page','checkEventProximity','_eventPageIndex','processSaveEventLocation','$preloadedMap_%1','_data','stop','Value','StopAutoMoveEvents','VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20','_EventIcons','_settings','moveDiagonally','pages','backX','loadEnemy','lineHeight','_checkRelocateNotetag','getDirectionToPoint','EventTimerFramesSet','square','_forceShowPlayer','iconWidth','process_VisuMZ_EventsMoveCore_Switches_Variables','setFrames','processMoveRouteJumpTo','USER-DEFINED\x201','airship','%1,%2,','characterName','regionList','_pose','Game_Event_canPass','updateSelfMovement','Frames','SpawnEventAtXY','endScale','EventLocationSave','terrainTag','unlockEvent','round','EventAutoMovement','_moveAllowPlayerCollision','Scene_Load_onLoadSuccess','isWorking','ship','reverse\x20copy','events','JSON','right','adjustDir8MovementSpeed','checkActivationProximity','visibleRange','SlowerSpeed','activationProximityType','Window_ScrollText_startMessage','firstSpawnedEventID','setCommonEvent','ITEM','moveForward','clearDestination','EnableTurnInPlace','_opacity','MorphEventTo','isTile','isBusy','Game_Variables_setValue','_saveEventLocation','attachPictureSettings','VS8','away','LOWER\x20RIGHT','Enable','apply','Map\x20%1\x20Switch\x20%2','width','posNt','eventsXyNt','_currentArc','map','maxSize','_textSprite','Game_Event_initialize','onExpire','startMapCommonEventOnOKTarget','correctFacingDirection','checkAdvancedSwitchVariablePresent','VisibleRange','_lastMovedDirection','_customZ','opacity','savePreservedMorphEventDataKey','ShowShadows','processMoveCommandEventsMoveCore','getEventIconIndex','keys','isNearTheScreen','TargetSwitchId','isTargetEventValidForLabelWindow','bitmap','_waitMode','startScale','getPosingCharacterIndex','hasEncounterNone','_visiblePlayerX','MorphEventRemove','CommonEventID','vehicle','SelfDataResetAll','canPassDiagonally','SPIN\x20COUNTERCLOCKWISE','Game_CharacterBase_hasStepAnime','setTileBitmap','makeDeepCopy','updateStop','processMoveSynchReverseMimic','Game_Player_executeMove','drawText','sv\x20enemy','_actuallyMoving','mirror\x20horizontal','Game_CharacterBase_setDirection','randomInt','Sprite_Character_setCharacterBitmap','boat','setEventIconData','Setting','EventForbid','_CPCs','toUpperCase','_erased','9188096RVrsjp','toLowerCase','fadeOutDuration','_screenActivated','attachPictureOffsetX','_patternLocked','opacitySpeed','_startX','pattern','_eventIconSprite','remove','_encounterHalfProximity','RegionOk','Game_Event_event','createShadow','isBoat','Collision','isSpawnedEvent','_interpreter','return\x20%1','createSpawnedEventWithData','isInVehicle','_mapId','PlayerForbid','setControlledFollowerID','ANGER','screenY','updateShadow','setPosition','turnLeft90','BitmapSmoothing','MsgPopupFollower','EventTimerSpeed','deleteIconsOnEventsDataKey','_periodicRefreshTimer','start','contents','Game_Character_setMoveRoute','Game_Map_parallelCommonEvents','processMoveRouteJumpToCharacter','itemPadding','determineEventOverload','Game_SelfSwitches_setValue','lock','padding','Window_EventItem_onCancel','ShipSpeed','switchId','charAt','player','processMoveRouteSelfVariable','updatePeriodicRefresh','Window_NumberInput_start','TemplateName','_shadowOpacity','updatePosition','endOffsetY','executeMove','_seconds','SCREEN','getSavedEventLocation','_followerChaseOff','setupEventsMoveCoreNotetags','isTriggerIn','processMoveRouteTeleportToCharacter','Boat','Map\x20%1\x20Variable\x20%2','PopupExtra','copy','checkEventTriggerEventsMoveCore','FALSE','cwY','FollowerID','moveSynchTarget','character','forced','ConvertParams','_lastSesetExitSelfSwitchesMapId','return\x200','PostSpawnJS','Speed','Game_CharacterBase_isDashing','Hidden','innerWidth','setupDiagonalSupport','getDirectionFromPoint','Game_Timer_onExpire','execute','MobileEnabled','_trigger','onChange','iconHeight','ALLOW_LADDER_DASH','hasCPCs','Game_Event_moveTypeRandom','encounterProximityType','Game_CharacterBase_pattern','enemy','updateEventLabelText','_moveOnlyRegions','isMovementSucceeded','splice','moveSynchType','Game_Event_locate','locate','boxWidth','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','Game_Follower_initialize','getAttachPictureBitmapWidth','MessageText','_selfTarget','_forceDashing','turnTowardCharacter','SpawnEventDespawnEverything','updateMove','Game_CommonEvent_isActive','setupEventsMoveCoreEffects','Game_Message_setNumberInput','Visible','Window_NumberInput_processOk','SelfSwitches','Game_CharacterBase_initMembers','Game_CharacterBase_update','registerCommand','_startY','RemovePreserve','isOnRope','IconIndex','Game_Event_meetsConditionsCPC','processMoveRouteAnimation','SPIN\x20ACW','_targetAngle','Game_CharacterBase_updatePattern','Game_Map_refresh','resizeWindow','realMoveSpeed','SpawnEventAtTerrainTag','TerrainTags','TRUE','getAttachPictureBitmapHeight','endScaleX','processMoveRouteSetIndex','contentsOpacity','TileY','updateScaleBase','parse','%1Forbid','_dummyWindow','getPreservedMorphEventData','Game_CharacterBase_moveDiagonally','_eventId','processMoveRouteJumpForward','removeChild','EventTemplates','isPreventSelfMovement','isAirshipPassable','shift','checkEventTriggerThere','Region%1','clearDashing','AllAllow','isPassableByAnyDirection','isRunning','setStopFollowerChasing','Game_Map_setupEvents','getPose','SpawnEventDespawnAtXY','fadeInDuration','updateShadowChanges','Window_EventItem_onOk','SPIN\x20CCW','Game_Player_getInputDirection','delta','advancedValue','drawTextEx','Settings','Game_CharacterBase_screenX','AutoBuffer','isPlayerForceHidden','isDashDisabled','findTargetSprite','isInsideLabelRange','checkRegionEventTrigger','StrictCollision','EventTimerPause','format','setSelfValue','iconSize','_encounterNoneProximity','_eventScreenY','IconBufferX','_spawnPreserved','VehicleForbid','Allow','SWEAT','Seconds','advancedFunc','isPressed','_screenZoomScale','clearSpriteOffsets','createAttachPictureSprite','ARRAYJSON','187314DfvNue','Game_Event_isCollidedWithPlayerCharacters','USER-DEFINED\x202','_callEventMap','meetsCPC','Movement','_pageIndex','increaseSteps','Sprite_Balloon_setup','updateVisibility','setMoveSpeed','trigger','processDrawIcon','mirror\x20horz','setNumberInput','_EventsMoveCoreSettings','_characterSprites','USER-DEFINED\x204','removeTemporaryMapSpawnedEvents','filename','isShadowShrink','_scene','eraseEvent','clearSelfTarget','Game_Map_unlockEvent','Game_System_onAfterLoad','isRegionDockable','EventIconRestore','prepareSpawnedEventAtRegion','setupPageSettings','_offsetY','isAdvancedSwitch','%1%2','chaseCharacter','QUESTION','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','isEventOverloaded','ANNOYED','SPIN\x20CLOCKWISE','FastForwardKey','Game_Event_setupPageSettings','executeMoveDir8','TerrainTag','BufferX','SelfSwitchABCD','moveAwayFromCharacter','checkCollisionKeywords','Game_Interpreter_executeCommand','setEventIconDataKey','EventIconChangeForced','isInstanceOfSceneMap','Toggle','executeCommand','getTileExpandData','updateWaitMode','MapSwitches','%1Allow','_screenParallel','string','isDashingEnabled','attachPictureScale','_labelWindows','Game_Event_updateParallel','_advancedSwitchVariable','_events','ARRAYFUNC','exit','_MapSpawnedEventData','ccwX','OFF'];_0x26fc=function(){return _0x46470e;};return _0x26fc();}Game_CPCInterpreter[_0x50f639(0x346)]=Object[_0x50f639(0x1fd)](Game_Interpreter[_0x50f639(0x346)]),Game_CPCInterpreter['prototype'][_0x50f639(0x381)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x50f639(0x346)]['clear']=function(){const _0x34107f=_0x50f639;Game_Interpreter[_0x34107f(0x346)]['clear'][_0x34107f(0x673)](this),this[_0x34107f(0x2d7)]=![];},Game_CPCInterpreter[_0x50f639(0x346)][_0x50f639(0x504)]=function(){const _0x4c48ec=_0x50f639;while(this[_0x4c48ec(0x54f)]()){this[_0x4c48ec(0x5ab)]();}},Game_CPCInterpreter['prototype'][_0x50f639(0x225)]=function(_0xe708d7){const _0x3ed696=_0x50f639;while(this[_0x3ed696(0x54f)]()){this['executeCommandCommonEvent'](_0xe708d7);}},Game_CPCInterpreter[_0x50f639(0x346)]['executeCommandCommonEvent']=function(_0x328878){const _0x4b599b=_0x50f639,_0x3b2aae=_0x328878;$gameTemp[_0x4b599b(0x5ca)](_0x3b2aae);const _0x399d10=VisuMZ[_0x4b599b(0x380)][_0x4b599b(0x5a6)][_0x4b599b(0x673)](this);return $gameTemp[_0x4b599b(0x58e)](),_0x399d10;},Game_CPCInterpreter[_0x50f639(0x346)][_0x50f639(0x682)]=function(_0x2a8aa4){const _0x525882=_0x50f639;return Game_Interpreter[_0x525882(0x346)]['command108'][_0x525882(0x673)](this,_0x2a8aa4),this[_0x525882(0x40f)][_0x525882(0x5de)](_0x5352bc=>_0x5352bc[_0x525882(0x1e7)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x525882(0x2d7)]=!![]),!![];},VisuMZ[_0x50f639(0x380)][_0x50f639(0x5bf)]=Scene_Map[_0x50f639(0x346)][_0x50f639(0x2b9)],Scene_Map[_0x50f639(0x346)][_0x50f639(0x2b9)]=function(){const _0x269a42=_0x50f639;VisuMZ['EventsMoveCore']['Scene_Map_startEncounterEffect'][_0x269a42(0x673)](this),this[_0x269a42(0x62a)]['hideShadows']();},VisuMZ[_0x50f639(0x380)][_0x50f639(0x455)]=Scene_Load['prototype'][_0x50f639(0x382)],Scene_Load[_0x50f639(0x346)][_0x50f639(0x382)]=function(){const _0x189daa=_0x50f639;if($gameMap)$gameMap['clearEventCache']();VisuMZ[_0x189daa(0x380)][_0x189daa(0x455)][_0x189daa(0x673)](this);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x590)]=Game_System[_0x50f639(0x346)][_0x50f639(0x229)],Game_System['prototype'][_0x50f639(0x229)]=function(){const _0x1cae81=_0x50f639;VisuMZ['EventsMoveCore'][_0x1cae81(0x590)][_0x1cae81(0x673)](this);if($gameMap)$gameMap[_0x1cae81(0x6a2)]();},VisuMZ['EventsMoveCore'][_0x50f639(0x286)]=Sprite_Character[_0x50f639(0x346)][_0x50f639(0x2fc)],Sprite_Character['prototype'][_0x50f639(0x2fc)]=function(){const _0x163630=_0x50f639;VisuMZ[_0x163630(0x380)][_0x163630(0x286)][_0x163630(0x673)](this),this[_0x163630(0x66e)](),this[_0x163630(0x575)](),this['createIconSprite']();},Sprite_Character['prototype'][_0x50f639(0x66e)]=function(){const _0x1282f7=_0x50f639;this[_0x1282f7(0x4e3)]=0xff,this[_0x1282f7(0x2d5)]=![];},Sprite_Character['prototype'][_0x50f639(0x2fb)]=function(){const _0x4eb78e=_0x50f639;return this[_0x4eb78e(0x34e)]&&this[_0x4eb78e(0x34e)]['match'](/\[VS8\]/i);},Sprite_Character['prototype']['isAutoBufferIcon']=function(){const _0x25a772=_0x50f639;return this[_0x25a772(0x2fb)]()&&VisuMZ[_0x25a772(0x380)][_0x25a772(0x55c)]['VS8'][_0x25a772(0x55e)];},Sprite_Character[_0x50f639(0x346)]['createAttachPictureSprite']=function(){const _0x177b0c=_0x50f639;this[_0x177b0c(0x36c)]=new Sprite(),this[_0x177b0c(0x36c)][_0x177b0c(0x5ff)]['x']=0.5,this[_0x177b0c(0x36c)][_0x177b0c(0x5ff)]['y']=0x1,this['addChild'](this['_attachPictureSprite']),this[_0x177b0c(0x3dd)]();},Sprite_Character[_0x50f639(0x346)][_0x50f639(0x249)]=function(){const _0x1c2da2=_0x50f639;this[_0x1c2da2(0x4b6)]=new Sprite(),this[_0x1c2da2(0x4b6)][_0x1c2da2(0x48d)]=ImageManager[_0x1c2da2(0x5f4)]('IconSet'),this['_eventIconSprite'][_0x1c2da2(0x48d)][_0x1c2da2(0x6a3)]=![],this[_0x1c2da2(0x4b6)][_0x1c2da2(0x263)](0x0,0x0,0x0,0x0),this[_0x1c2da2(0x4b6)][_0x1c2da2(0x5ff)]['x']=0.5,this[_0x1c2da2(0x4b6)][_0x1c2da2(0x5ff)]['y']=0x1,this[_0x1c2da2(0x26f)](this[_0x1c2da2(0x4b6)]);},VisuMZ[_0x50f639(0x380)]['Sprite_Character_update']=Sprite_Character['prototype'][_0x50f639(0x5c9)],Sprite_Character[_0x50f639(0x346)][_0x50f639(0x5c9)]=function(){const _0x39f4c3=_0x50f639;VisuMZ[_0x39f4c3(0x380)]['Sprite_Character_update'][_0x39f4c3(0x673)](this),this['updateEventsAndMovementCore']();},Sprite_Character[_0x50f639(0x346)]['updateVisibility']=function(){const _0x3fda26=_0x50f639;Sprite[_0x3fda26(0x346)][_0x3fda26(0x580)]['call'](this),this[_0x3fda26(0x223)]()&&(this['visible']=![]);},Sprite_Character[_0x50f639(0x346)]['isEventsMoveCoreInvisible']=function(){const _0x1b6fd1=_0x50f639;if(this[_0x1b6fd1(0x488)]()>0x0)return![];if(this[_0x1b6fd1(0x3a0)]){if(this[_0x1b6fd1(0x3a0)][_0x1b6fd1(0x617)]()!=='')return![];}return this[_0x1b6fd1(0x416)]()||this[_0x1b6fd1(0x3a0)]&&this['_character'][_0x1b6fd1(0x428)]();},Sprite_Character[_0x50f639(0x346)]['updateBitmapSmoothing']=function(){const _0x5555af=_0x50f639;if(!this[_0x5555af(0x48d)])return;this[_0x5555af(0x48d)][_0x5555af(0x6a3)]=!!VisuMZ['EventsMoveCore'][_0x5555af(0x55c)][_0x5555af(0x57c)][_0x5555af(0x4cb)];},Sprite_Character[_0x50f639(0x346)][_0x50f639(0x20e)]=function(){const _0xc9ed8a=_0x50f639;this[_0xc9ed8a(0x53d)](),this[_0xc9ed8a(0x27f)](),this[_0xc9ed8a(0x4c8)](),this[_0xc9ed8a(0x2b4)](),this['updateEventCustomZ'](),this[_0xc9ed8a(0x2e2)](),this[_0xc9ed8a(0x3dd)]();},VisuMZ[_0x50f639(0x380)][_0x50f639(0x3b7)]=Sprite_Character[_0x50f639(0x346)][_0x50f639(0x49a)],Sprite_Character[_0x50f639(0x346)]['setTileBitmap']=function(){const _0x287f46=_0x50f639;VisuMZ[_0x287f46(0x380)]['Sprite_Character_setTileBitmap'][_0x287f46(0x673)](this),this[_0x287f46(0x48d)][_0x287f46(0x3da)](this['updateBitmapSmoothing'][_0x287f46(0x603)](this));},Sprite_Character['prototype']['updateTileFrame']=function(){const _0x3ede64=_0x50f639,_0x4e891c=this[_0x3ede64(0x5e9)],_0xb535c=this['patternWidth'](),_0x5dfc1a=this[_0x3ede64(0x66d)](),_0x312d71=(Math['floor'](_0x4e891c/0x80)%0x2*0x8+_0x4e891c%0x8)*_0xb535c,_0x5d2577=Math[_0x3ede64(0x383)](_0x4e891c%0x100/0x8)%0x10*_0x5dfc1a,_0x71f462=this[_0x3ede64(0x5ac)]();let _0x577db8=_0x312d71,_0x3ff511=_0x5d2577,_0xb29379=_0xb535c,_0x192f73=_0x5dfc1a;_0x71f462['up']&&_0x71f462['up']>0x0&&(_0x3ff511-=_0x5dfc1a*_0x71f462['up'],_0x192f73+=_0x5dfc1a*_0x71f462['up']),_0x71f462[_0x3ede64(0x1db)]&&_0x71f462[_0x3ede64(0x1db)]>0x0&&(_0x192f73+=_0x5dfc1a*_0x71f462[_0x3ede64(0x1db)]),_0x71f462[_0x3ede64(0x5fa)]&&_0x71f462[_0x3ede64(0x5fa)]>0x0&&(_0x577db8-=_0xb535c*_0x71f462[_0x3ede64(0x5fa)],_0xb29379+=_0xb535c*_0x71f462['left']),_0x71f462[_0x3ede64(0x45b)]&&_0x71f462['right']>0x0&&(_0xb29379+=_0xb535c*_0x71f462[_0x3ede64(0x45b)]),this[_0x3ede64(0x263)](_0x577db8,_0x3ff511,_0xb29379,_0x192f73);},Sprite_Character['prototype'][_0x50f639(0x5ac)]=function(){const _0x4d1593=_0x50f639;return this[_0x4d1593(0x3a0)]?this[_0x4d1593(0x3a0)]['_tileExpand']||{}:{};},VisuMZ[_0x50f639(0x380)][_0x50f639(0x4a5)]=Sprite_Character['prototype'][_0x50f639(0x2c8)],Sprite_Character[_0x50f639(0x346)][_0x50f639(0x2c8)]=function(){const _0x813cd6=_0x50f639;VisuMZ[_0x813cd6(0x380)]['Sprite_Character_setCharacterBitmap'][_0x813cd6(0x673)](this),this[_0x813cd6(0x48d)][_0x813cd6(0x3da)](this[_0x813cd6(0x38d)][_0x813cd6(0x603)](this)),this[_0x813cd6(0x2d5)]=ImageManager['isInvisibleCharacter'](this['_characterName']),this[_0x813cd6(0x2d5)]&&this[_0x813cd6(0x48d)]['addLoadListener'](this[_0x813cd6(0x5f5)][_0x813cd6(0x603)](this));},Sprite_Character['prototype'][_0x50f639(0x5f5)]=function(){const _0x3c1754=_0x50f639;this['bitmap']=new Bitmap(this[_0x3c1754(0x48d)][_0x3c1754(0x475)],this[_0x3c1754(0x48d)][_0x3c1754(0x5e1)]);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x650)]=Sprite_Character[_0x50f639(0x346)][_0x50f639(0x23a)],Sprite_Character[_0x50f639(0x346)][_0x50f639(0x23a)]=function(){const _0x27d91d=_0x50f639;return this[_0x27d91d(0x2fb)]()?this[_0x27d91d(0x271)]():this[_0x27d91d(0x374)]();},Sprite_Character[_0x50f639(0x346)][_0x50f639(0x271)]=function(){const _0x537117=_0x50f639,_0x1bd4ad=this[_0x537117(0x3a0)][_0x537117(0x284)]();let _0x3ebf2a=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x537117(0x3a0)][_0x537117(0x350)]&&(_0x3ebf2a=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x3ebf2a[_0x1bd4ad]-0x2)/0x2;},Sprite_Character[_0x50f639(0x346)]['characterPatternYBasic']=function(){const _0xa45dc3=_0x50f639;let _0xe71901=this[_0xa45dc3(0x3a0)]['direction']();if(this[_0xa45dc3(0x3a0)][_0xa45dc3(0x350)]){if(_0xe71901===0x4)_0xe71901=0x6;else _0xe71901===0x6&&(_0xe71901=0x4);}return(_0xe71901-0x2)/0x2;},Sprite_Character[_0x50f639(0x346)]['updateScaleBase']=function(){const _0x1e3dfa=_0x50f639;this[_0x1e3dfa(0x3f9)]['x']=this[_0x1e3dfa(0x3a0)][_0x1e3dfa(0x1f7)]??0x1,this[_0x1e3dfa(0x3f9)]['y']=this[_0x1e3dfa(0x3a0)][_0x1e3dfa(0x260)]??0x1;},Sprite_Character[_0x50f639(0x346)]['updateTilt']=function(){const _0x1a7b04=_0x50f639;if(!VisuMZ['EventsMoveCore'][_0x1a7b04(0x55c)][_0x1a7b04(0x57c)][_0x1a7b04(0x5d3)])return;this[_0x1a7b04(0x32f)]=0x0;if(this[_0x1a7b04(0x304)]()){const _0x1d6b9f=VisuMZ[_0x1a7b04(0x380)][_0x1a7b04(0x55c)][_0x1a7b04(0x57c)],_0x252d27=this[_0x1a7b04(0x3a0)]['direction']();let _0x5d3c53=0x0;if([0x1,0x4,0x7][_0x1a7b04(0x292)](_0x252d27))_0x5d3c53=_0x1d6b9f[_0x1a7b04(0x243)];if([0x3,0x6,0x9][_0x1a7b04(0x292)](_0x252d27))_0x5d3c53=_0x1d6b9f[_0x1a7b04(0x215)];[0x2,0x8][_0x1a7b04(0x292)](_0x252d27)&&(_0x5d3c53=[-_0x1d6b9f[_0x1a7b04(0x649)],0x0,_0x1d6b9f['TiltVert']][this[_0x1a7b04(0x3a0)]['pattern']()]);if(this['_reflection'])_0x5d3c53*=-0x1;this[_0x1a7b04(0x32f)]=_0x5d3c53;}},Sprite_Character[_0x50f639(0x346)]['isAllowCharacterTilt']=function(){const _0x4dbefc=_0x50f639;if(this[_0x4dbefc(0x5fb)])return![];return this['_character'][_0x4dbefc(0x313)]()&&!this[_0x4dbefc(0x3a0)][_0x4dbefc(0x665)]()&&!this[_0x4dbefc(0x3a0)][_0x4dbefc(0x637)]()&&this['getEventIconIndex']()===0x0;},Sprite_Character[_0x50f639(0x346)][_0x50f639(0x4c8)]=function(){const _0x4b4884=_0x50f639;if(!this['_shadowSprite'])return;this[_0x4b4884(0x322)]['x']=this[_0x4b4884(0x3a0)][_0x4b4884(0x3c3)](),this[_0x4b4884(0x322)]['y']=this[_0x4b4884(0x3a0)][_0x4b4884(0x1cb)](),this[_0x4b4884(0x322)][_0x4b4884(0x484)]=this[_0x4b4884(0x484)],this[_0x4b4884(0x322)][_0x4b4884(0x68d)]=this[_0x4b4884(0x3a0)][_0x4b4884(0x403)](),this[_0x4b4884(0x322)][_0x4b4884(0x3d6)]=this[_0x4b4884(0x3d6)];if(this[_0x4b4884(0x3a0)][_0x4b4884(0x58b)]())this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['x']=Math['max'](0x0,this['_shadowSprite'][_0x4b4884(0x3f9)]['x']-0.1),this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['y']=Math[_0x4b4884(0x244)](0x0,this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['y']-0.1);else{if(this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['x']!==this[_0x4b4884(0x3f9)]['x']){if(this['_shadowSprite'][_0x4b4884(0x3f9)]['x']>this['scale']['x'])this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['x']=Math[_0x4b4884(0x324)](this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['x']+0.1,this[_0x4b4884(0x3f9)]['x']);if(this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['x']<this[_0x4b4884(0x3f9)]['x'])this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['x']=Math[_0x4b4884(0x244)](this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['x']-0.1,this['scale']['x']);}if(this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['y']!==this['scale']['y']){if(this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['y']>this[_0x4b4884(0x3f9)]['y'])this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['y']=Math[_0x4b4884(0x324)](this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['y']+0.1,this[_0x4b4884(0x3f9)]['y']);if(this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['y']<this[_0x4b4884(0x3f9)]['y'])this[_0x4b4884(0x322)][_0x4b4884(0x3f9)]['y']=Math[_0x4b4884(0x244)](this['_shadowSprite']['scale']['y']-0.1,this[_0x4b4884(0x3f9)]['y']);}}},Sprite_Character[_0x50f639(0x346)][_0x50f639(0x2b4)]=function(){const _0x4773a6=_0x50f639;if(!this[_0x4773a6(0x4b6)])return;const _0x3b4150=this[_0x4773a6(0x4b6)],_0x1ec32e=this[_0x4773a6(0x488)]();if(_0x1ec32e<=0x0)return _0x3b4150[_0x4773a6(0x263)](0x0,0x0,0x0,0x0);else{const _0x48949e=ImageManager[_0x4773a6(0x440)],_0x47dc4a=ImageManager[_0x4773a6(0x508)],_0x205cbc=_0x1ec32e%0x10*_0x48949e,_0x2a3b1c=Math[_0x4773a6(0x383)](_0x1ec32e/0x10)*_0x47dc4a;_0x3b4150[_0x4773a6(0x263)](_0x205cbc,_0x2a3b1c,_0x48949e,_0x47dc4a),this[_0x4773a6(0x68d)]=!![];}const _0x3877c6=this[_0x4773a6(0x3a0)][_0x4773a6(0x3f3)]();this['isAutoBufferIcon']()?this[_0x4773a6(0x208)](_0x3b4150):(_0x3b4150['x']=_0x3877c6?_0x3877c6['bufferX']:0x0,_0x3b4150['y']=_0x3877c6?-this[_0x4773a6(0x5e1)]+_0x3877c6[_0x4773a6(0x661)]:0x0),_0x3b4150['blendMode']=_0x3877c6?_0x3877c6[_0x4773a6(0x65e)]:0x0,this[_0x4773a6(0x545)](_0x3b4150),this[_0x4773a6(0x26f)](_0x3b4150),_0x3b4150[_0x4773a6(0x32f)]=-this['rotation'];},Sprite_Character[_0x50f639(0x346)][_0x50f639(0x208)]=function(_0x1bc515){const _0x3c6827=_0x50f639;_0x1bc515['x']=0x0,_0x1bc515['y']=-this[_0x3c6827(0x5e1)]+this[_0x3c6827(0x5e1)]*0x2/0x5,this[_0x3c6827(0x3a0)][_0x3c6827(0x4b5)]()!==0x1&&(_0x1bc515['y']+=0x1);},Sprite_Character['prototype'][_0x50f639(0x488)]=function(){const _0x32f457=_0x50f639;if(!this[_0x32f457(0x3a0)])return 0x0;if(this[_0x32f457(0x3a0)][_0x32f457(0x4ac)])return 0x0;const _0x5f3637=this[_0x32f457(0x3a0)][_0x32f457(0x3f3)]();return _0x5f3637?_0x5f3637[_0x32f457(0x662)]||0x0:0x0;},Sprite_Character[_0x50f639(0x346)]['updateEventCustomZ']=function(){const _0x42a82d=_0x50f639;if(!this[_0x42a82d(0x3a0)])return;if(this[_0x42a82d(0x3a0)][_0x42a82d(0x483)]===undefined)return;if(this[_0x42a82d(0x3a0)]['_customZ']===![])return;this['z']=this[_0x42a82d(0x3a0)][_0x42a82d(0x483)],this[_0x42a82d(0x322)]&&(this['z']<0x0?this['_shadowSprite']['z']=this['z']-0x1:this['_shadowSprite']['z']=0x0);},Sprite_Character['prototype'][_0x50f639(0x2e2)]=function(){const _0x134afd=_0x50f639;if(!this[_0x134afd(0x3a0)])return;let _0x509084=!!this[_0x134afd(0x3a0)][_0x134afd(0x350)];this[_0x134afd(0x3f9)]['x']=Math[_0x134afd(0x311)](this[_0x134afd(0x3f9)]['x'])*(_0x509084?-0x1:0x1);},Sprite_Character[_0x50f639(0x346)]['updateAttachPictureSprite']=function(){const _0x20d7d8=_0x50f639;if(!this['_attachPictureSprite'])return;if(!this['_character'])return;this[_0x20d7d8(0x605)](),this[_0x20d7d8(0x364)]();},Sprite_Character['prototype'][_0x50f639(0x605)]=function(){const _0xf8c13f=_0x50f639;if(!this[_0xf8c13f(0x296)]())return;const _0xfe3c8b=this[_0xf8c13f(0x3a0)][_0xf8c13f(0x46e)]();this['_lastAttachPictureFilename']=_0xfe3c8b[_0xf8c13f(0x58a)],this['_lastAttachPictureType']=_0xfe3c8b[_0xf8c13f(0x392)],this[_0xf8c13f(0x67e)]=_0xfe3c8b['maxSize'],this[_0xf8c13f(0x246)]=_0xfe3c8b[_0xf8c13f(0x3f9)];if(_0xfe3c8b[_0xf8c13f(0x58a)]!==''){if(_0xfe3c8b[_0xf8c13f(0x392)]===_0xf8c13f(0x50e)){const _0x26e917=ImageManager[_0xf8c13f(0x439)](_0xfe3c8b[_0xf8c13f(0x58a)]);_0x26e917[_0xf8c13f(0x3da)](this[_0xf8c13f(0x41f)][_0xf8c13f(0x603)](this,_0x26e917));}else{if(_0xfe3c8b[_0xf8c13f(0x392)]===_0xf8c13f(0x4a0)){const _0x566b82=ImageManager[_0xf8c13f(0x3f2)](_0xfe3c8b[_0xf8c13f(0x58a)]);_0x566b82[_0xf8c13f(0x3da)](this[_0xf8c13f(0x41f)]['bind'](this,_0x566b82));}else{const _0x2138c2=ImageManager[_0xf8c13f(0x3a3)](_0xfe3c8b[_0xf8c13f(0x58a)]);_0x2138c2['addLoadListener'](this['onLoadAttachPicture'][_0xf8c13f(0x603)](this,_0x2138c2));}}}else this[_0xf8c13f(0x36c)][_0xf8c13f(0x48d)]=new Bitmap(0x1,0x1);},Sprite_Character['prototype'][_0x50f639(0x364)]=function(){const _0x3ad34b=_0x50f639,_0x7e3f01=this[_0x3ad34b(0x36c)];_0x7e3f01['x']=this['_character'][_0x3ad34b(0x4b1)](),_0x7e3f01['y']=this[_0x3ad34b(0x3a0)][_0x3ad34b(0x401)](),_0x7e3f01[_0x3ad34b(0x65e)]=this[_0x3ad34b(0x3a0)][_0x3ad34b(0x609)]();},Sprite_Character['prototype'][_0x50f639(0x296)]=function(){const _0x24e3c5=_0x50f639,_0x18c69a=this[_0x24e3c5(0x3a0)][_0x24e3c5(0x46e)]();if(_0x18c69a){if(this['_lastAttachPictureFilename']!==_0x18c69a[_0x24e3c5(0x58a)])return!![];if(this[_0x24e3c5(0x65a)]!==_0x18c69a[_0x24e3c5(0x392)])return!![];if(this['_lastAttachPictureMaxSize']!==_0x18c69a[_0x24e3c5(0x47a)])return!![];if(this[_0x24e3c5(0x246)]!==_0x18c69a[_0x24e3c5(0x3f9)])return!![];}return![];},Sprite_Character[_0x50f639(0x346)][_0x50f639(0x41f)]=function(_0x178179){const _0x43d2a3=_0x50f639,_0x58d293=this[_0x43d2a3(0x36c)];_0x58d293[_0x43d2a3(0x48d)]=_0x178179;const _0x3d36c7=this['_character']['attachPictureSettings'](),_0xdb3118=_0x3d36c7[_0x43d2a3(0x47a)],_0x3ad3ac=_0x3d36c7['scale'];let _0x2adfd1=0x1;if(_0xdb3118>0x0){let _0x448d05=this[_0x43d2a3(0x519)]()||0x1,_0x495d50=this[_0x43d2a3(0x538)]()||0x1;const _0x59edcf=Math['max'](0x1,_0x448d05,_0x495d50);_0x2adfd1=_0xdb3118/_0x59edcf;}_0x2adfd1*=_0x3ad3ac,_0x2adfd1!==0x1&&(this[_0x43d2a3(0x36c)][_0x43d2a3(0x48d)][_0x43d2a3(0x6a3)]=!![]),_0x58d293['scale']['x']=_0x2adfd1,_0x58d293[_0x43d2a3(0x3f9)]['y']=_0x2adfd1,this['visible']=!![],this[_0x43d2a3(0x364)]();},Sprite_Character['prototype'][_0x50f639(0x519)]=function(){const _0x3fb7ae=this['_attachPictureSprite'];if(!_0x3fb7ae)return 0x0;return _0x3fb7ae['bitmap']['width'];},Sprite_Character[_0x50f639(0x346)]['getAttachPictureBitmapHeight']=function(){const _0x1c8b04=_0x50f639,_0x430520=this['_attachPictureSprite'];if(!_0x430520)return 0x0;return _0x430520[_0x1c8b04(0x48d)][_0x1c8b04(0x5e1)];},VisuMZ[_0x50f639(0x380)][_0x50f639(0x57f)]=Sprite_Balloon[_0x50f639(0x346)][_0x50f639(0x68c)],Sprite_Balloon[_0x50f639(0x346)][_0x50f639(0x68c)]=function(_0x469913,_0x38cb2a){const _0x29d413=_0x50f639;VisuMZ[_0x29d413(0x380)][_0x29d413(0x57f)]['call'](this,_0x469913,_0x38cb2a),VisuMZ[_0x29d413(0x380)][_0x29d413(0x55c)][_0x29d413(0x46f)]['AutoBalloon']&&this['_target'][_0x29d413(0x3a0)][_0x29d413(0x30e)](_0x38cb2a,this[_0x29d413(0x655)]);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x370)]=Sprite_Balloon[_0x50f639(0x346)][_0x50f639(0x4e4)],Sprite_Balloon[_0x50f639(0x346)][_0x50f639(0x4e4)]=function(){const _0x79ded7=_0x50f639;VisuMZ['EventsMoveCore'][_0x79ded7(0x370)][_0x79ded7(0x673)](this),this[_0x79ded7(0x232)]();},Sprite_Balloon['prototype'][_0x50f639(0x232)]=function(){const _0xdd73e4=_0x50f639;this['_target']['_character'][_0xdd73e4(0x2fb)]()&&(this['x']+=VisuMZ[_0xdd73e4(0x380)]['Settings'][_0xdd73e4(0x46f)][_0xdd73e4(0x399)],this['y']+=VisuMZ[_0xdd73e4(0x380)][_0xdd73e4(0x55c)][_0xdd73e4(0x46f)][_0xdd73e4(0x5ec)]);},Sprite_Timer[_0x50f639(0x346)][_0x50f639(0x601)]=function(){const _0x5c670c=_0x50f639;this[_0x5c670c(0x48d)]=new Bitmap(Math[_0x5c670c(0x452)](Graphics[_0x5c670c(0x516)]/0x2),0x30),this['bitmap'][_0x5c670c(0x2d1)]=this[_0x5c670c(0x2d1)](),this['bitmap']['fontSize']=this[_0x5c670c(0x686)](),this[_0x5c670c(0x48d)][_0x5c670c(0x3d9)]=ColorManager[_0x5c670c(0x3d9)]();},Sprite_Timer[_0x50f639(0x346)][_0x50f639(0x3ca)]=function(){const _0x2942fb=_0x50f639,_0x249833=Math[_0x2942fb(0x383)](this[_0x2942fb(0x4e7)]/0x3c/0x3c),_0x4ea0fa=Math[_0x2942fb(0x383)](this[_0x2942fb(0x4e7)]/0x3c)%0x3c,_0x559776=this['_seconds']%0x3c;let _0x311a57=_0x4ea0fa[_0x2942fb(0x677)](0x2)+':'+_0x559776[_0x2942fb(0x677)](0x2);if(_0x249833>0x0)_0x311a57=_0x2942fb(0x28b)['format'](_0x249833,_0x311a57);return _0x311a57;};function Sprite_EventLabel(){this['initialize'](...arguments);}function _0x1273(_0x283732,_0x26b968){const _0x26fcfd=_0x26fc();return _0x1273=function(_0x12735f,_0x54b8d2){_0x12735f=_0x12735f-0x1c9;let _0x529984=_0x26fcfd[_0x12735f];return _0x529984;},_0x1273(_0x283732,_0x26b968);}Sprite_EventLabel[_0x50f639(0x346)]=Object[_0x50f639(0x1fd)](Sprite[_0x50f639(0x346)]),Sprite_EventLabel[_0x50f639(0x346)][_0x50f639(0x381)]=Sprite_EventLabel,Sprite_EventLabel[_0x50f639(0x346)]['initialize']=function(_0x470af6){const _0x8873c6=_0x50f639;this[_0x8873c6(0x402)]=_0x470af6,Sprite[_0x8873c6(0x346)]['initialize'][_0x8873c6(0x673)](this),this[_0x8873c6(0x2fc)](),this[_0x8873c6(0x267)]();},Sprite_EventLabel[_0x50f639(0x346)][_0x50f639(0x2fc)]=function(){const _0x2825d7=_0x50f639;this['anchor']['x']=0.5,this[_0x2825d7(0x5ff)]['y']=0x1;},Sprite_EventLabel[_0x50f639(0x346)][_0x50f639(0x267)]=function(){const _0x251777=_0x50f639,_0xb709f9=new Rectangle(0x0,0x0,0x1,0x1);this['_proxyWindow']=new Window_Base(_0xb709f9),this[_0x251777(0x294)][_0x251777(0x4d9)]=0x0,this[_0x251777(0x484)]=this[_0x251777(0x355)]()?0xff:0x0;},Sprite_EventLabel[_0x50f639(0x346)][_0x50f639(0x5c9)]=function(){const _0x17825f=_0x50f639;Sprite[_0x17825f(0x346)]['update'][_0x17825f(0x673)](this),this[_0x17825f(0x2a6)](),this[_0x17825f(0x1eb)](),this[_0x17825f(0x4e4)](),this[_0x17825f(0x39c)](),this[_0x17825f(0x390)]();},Sprite_EventLabel[_0x50f639(0x346)]['updateText']=function(){const _0xedbdae=_0x50f639;this['_event'][_0xedbdae(0x32c)]()!==this['_text']&&(this[_0xedbdae(0x323)]=this[_0xedbdae(0x402)]['labelWindowText'](),this[_0xedbdae(0x377)]());},Sprite_EventLabel[_0x50f639(0x346)][_0x50f639(0x377)]=function(){const _0x3070a7=_0x50f639;if(!this[_0x3070a7(0x294)])return;this[_0x3070a7(0x533)](),this[_0x3070a7(0x49f)]();},Sprite_EventLabel[_0x50f639(0x346)][_0x50f639(0x533)]=function(){const _0x40c3a9=_0x50f639,_0x2f4efd=this[_0x40c3a9(0x294)][_0x40c3a9(0x326)](this['_text']),_0xa51f23=this['_proxyWindow'][_0x40c3a9(0x4d5)](),_0x3655a1=_0x2f4efd[_0x40c3a9(0x475)]+_0xa51f23*0x2,_0x53b417=_0x2f4efd[_0x40c3a9(0x5e1)];this['_proxyWindow']['move'](0x0,0x0,_0x3655a1,_0x53b417),this[_0x40c3a9(0x294)][_0x40c3a9(0x613)](),this['bitmap']=this[_0x40c3a9(0x294)][_0x40c3a9(0x4d1)];},Sprite_EventLabel[_0x50f639(0x346)]['drawText']=function(){const _0x1f3489=_0x50f639,_0x4157d7=this['_proxyWindow'][_0x1f3489(0x4d5)]();this['_proxyWindow']['drawTextEx'](this[_0x1f3489(0x323)],_0x4157d7,0x0);},Sprite_EventLabel[_0x50f639(0x346)][_0x50f639(0x1eb)]=function(){const _0x3505b4=_0x50f639,_0x1312d3=VisuMZ[_0x3505b4(0x380)][_0x3505b4(0x55c)]['Label'][_0x3505b4(0x373)],_0x107b7d=$gameSystem[_0x3505b4(0x314)]()||0x1;this[_0x3505b4(0x3f9)]['x']=this[_0x3505b4(0x3f9)]['y']=_0x1312d3/_0x107b7d;},Sprite_EventLabel[_0x50f639(0x346)][_0x50f639(0x4e4)]=function(){const _0x3fd328=_0x50f639;if(!SceneManager[_0x3fd328(0x58c)])return;if(!SceneManager[_0x3fd328(0x58c)]['_spriteset'])return;const _0x2be468=SceneManager['_scene']['_spriteset'][_0x3fd328(0x561)](this['_event']);if(!_0x2be468)return;this['x']=this[_0x3fd328(0x402)][_0x3fd328(0x5c6)](),this['x']+=this['_event'][_0x3fd328(0x379)][_0x3fd328(0x3f1)];if(_0x2be468[_0x3fd328(0x371)]){const _0x4f901a=_0x2be468['_attachPictureSprite'];this['y']=this[_0x3fd328(0x402)][_0x3fd328(0x4c7)]()-_0x4f901a[_0x3fd328(0x5e1)]*_0x4f901a['scale']['y'];}else this['y']=this[_0x3fd328(0x402)][_0x3fd328(0x4c7)]()-_0x2be468[_0x3fd328(0x5e1)]*_0x2be468['scale']['y'];this['y']+=$gameSystem[_0x3fd328(0x2a3)]()*-0.5,this['y']+=this['_event'][_0x3fd328(0x379)]['offsetY'];},Sprite_EventLabel[_0x50f639(0x346)][_0x50f639(0x39c)]=function(){const _0x4833f5=_0x50f639;if(this['isLabelVisible']())this['opacity']+=this['opacitySpeed']();else SceneManager[_0x4833f5(0x58c)][_0x4833f5(0x2cf)]>0x0?this[_0x4833f5(0x484)]=0x0:this[_0x4833f5(0x484)]-=this['opacitySpeed']();},Sprite_EventLabel[_0x50f639(0x346)][_0x50f639(0x390)]=function(){const _0x3ceed1=_0x50f639;if(this[_0x3ceed1(0x355)]()&&this['_event']&&this[_0x3ceed1(0x402)][_0x3ceed1(0x379)][_0x3ceed1(0x301)]){const _0x94a800=this[_0x3ceed1(0x1cf)]+(this[_0x3ceed1(0x402)]['_labelWindow'][_0x3ceed1(0x301)]||0x0);this[_0x3ceed1(0x340)](_0x94a800);}},Sprite_EventLabel[_0x50f639(0x346)][_0x50f639(0x355)]=function(){const _0x5cf87f=_0x50f639;if(!$gameSystem[_0x5cf87f(0x32e)]())return![];if(this[_0x5cf87f(0x402)]?.[_0x5cf87f(0x4ac)])return![];if(this[_0x5cf87f(0x402)]&&this['_event'][_0x5cf87f(0x57d)]<0x0)return![];if(SceneManager[_0x5cf87f(0x58c)][_0x5cf87f(0x2cf)]>0x0)return![];const _0x3d5643=$gamePlayer['x'],_0x321441=$gamePlayer['y'],_0x6a1f61=this['_event']['x'],_0x889ae3=this[_0x5cf87f(0x402)]['y'];if(this[_0x5cf87f(0x492)]===_0x3d5643&&this['_visiblePlayerY']===_0x321441&&this[_0x5cf87f(0x699)]===_0x6a1f61&&this[_0x5cf87f(0x628)]===_0x889ae3)return this[_0x5cf87f(0x2f9)];this[_0x5cf87f(0x492)]=$gamePlayer['x'],this[_0x5cf87f(0x241)]=$gamePlayer['y'],this[_0x5cf87f(0x699)]=this[_0x5cf87f(0x402)]['x'],this[_0x5cf87f(0x628)]=this[_0x5cf87f(0x402)]['y'];if(!VisuMZ[_0x5cf87f(0x380)]['isInsideLabelRange'](this[_0x5cf87f(0x402)]))return this[_0x5cf87f(0x2f9)]=![],![];return this[_0x5cf87f(0x2f9)]=!![],!![];},Sprite_EventLabel['prototype'][_0x50f639(0x4b3)]=function(){const _0x112325=_0x50f639;return VisuMZ[_0x112325(0x380)]['Settings'][_0x112325(0x69b)][_0x112325(0x412)];};function Sprite_VisuMz_MessagePopup(){const _0x17013a=_0x50f639;this[_0x17013a(0x378)](...arguments);}Sprite_VisuMz_MessagePopup[_0x50f639(0x346)]=Object['create'](Sprite[_0x50f639(0x346)]),Sprite_VisuMz_MessagePopup[_0x50f639(0x346)][_0x50f639(0x381)]=Sprite_VisuMz_MessagePopup,Sprite_VisuMz_MessagePopup[_0x50f639(0x346)][_0x50f639(0x378)]=function(_0x4eb4a3){const _0x49dd7a=_0x50f639;this[_0x49dd7a(0x435)]=_0x4eb4a3,Sprite[_0x49dd7a(0x346)]['initialize'][_0x49dd7a(0x673)](this),this['initMembers'](),this[_0x49dd7a(0x427)](),this[_0x49dd7a(0x2a4)](),this['update']();},Sprite_VisuMz_MessagePopup['prototype']['initMembers']=function(){const _0xf33d79=_0x50f639;this['_duration']=this[_0xf33d79(0x435)]['duration'],this[_0xf33d79(0x338)]=this[_0xf33d79(0x435)][_0xf33d79(0x316)],this['z']=0x6,this[_0xf33d79(0x41e)]=this[_0xf33d79(0x435)]['fadeDuration']['fadeIn'],this[_0xf33d79(0x41e)]>0x0&&this[_0xf33d79(0x41e)]>=Math[_0xf33d79(0x383)](this['_duration']*0.48)&&(this[_0xf33d79(0x41e)]=Math[_0xf33d79(0x383)](this[_0xf33d79(0x655)]*0.48)),this[_0xf33d79(0x484)]=this[_0xf33d79(0x41e)]>0x0?0x0:0xff,this[_0xf33d79(0x3cf)]=this[_0xf33d79(0x435)][_0xf33d79(0x3c9)][_0xf33d79(0x26a)],this[_0xf33d79(0x3cf)]>0x0&&this['_fadeOutDuration']>=Math[_0xf33d79(0x383)](this['_duration']*0.48)&&(this[_0xf33d79(0x3cf)]=Math[_0xf33d79(0x383)](this[_0xf33d79(0x655)]*0.48)),this[_0xf33d79(0x3ac)]=this[_0xf33d79(0x3cf)],this['_startX']=this['_settings'][_0xf33d79(0x345)]['x'],this[_0xf33d79(0x529)]=this[_0xf33d79(0x435)][_0xf33d79(0x345)]['y'],this[_0xf33d79(0x3d8)]=this[_0xf33d79(0x435)][_0xf33d79(0x5d0)]['x'],this['_targetY']=this[_0xf33d79(0x435)][_0xf33d79(0x5d0)]['y'],this['_offsetX']=this['_startX'],this['_offsetY']=this['_startY'],this[_0xf33d79(0x3f6)]=this[_0xf33d79(0x435)][_0xf33d79(0x48f)]['x'],this[_0xf33d79(0x66c)]=this[_0xf33d79(0x435)][_0xf33d79(0x48f)]['y'],this['_targetScaleX']=this[_0xf33d79(0x435)][_0xf33d79(0x44e)]['x'],this['_targetScaleY']=this['_settings'][_0xf33d79(0x44e)]['y'],this[_0xf33d79(0x3e7)]=-this[_0xf33d79(0x435)]['angle']['start'],this['_targetAngle']=-this[_0xf33d79(0x435)][_0xf33d79(0x3a4)][_0xf33d79(0x1f1)],this[_0xf33d79(0x235)]=-this['_settings'][_0xf33d79(0x612)]['arc'],this['_currentArc']=0x0;},Sprite_VisuMz_MessagePopup['prototype'][_0x50f639(0x427)]=function(){const _0x164971=_0x50f639,_0x2b950b=this[_0x164971(0x435)],_0x44c715=new Rectangle(0x0,0x0,Graphics['width'],Graphics[_0x164971(0x5e1)]);this[_0x164971(0x540)]=new Window_Base(_0x44c715);const _0x24eda6=this['_dummyWindow'][_0x164971(0x326)](_0x2b950b[_0x164971(0x333)]),_0x2ea059=_0x24eda6[_0x164971(0x475)],_0x45ad02=_0x24eda6[_0x164971(0x5e1)],_0x3e7643=_0x2ea059+$gameSystem[_0x164971(0x2a3)]()*0x2,_0x3eabd5=_0x45ad02+$gameSystem[_0x164971(0x2a3)]()*0x2;this[_0x164971(0x540)]['move'](0x0,0x0,_0x3e7643,_0x3eabd5),this['_dummyWindow'][_0x164971(0x613)](),this[_0x164971(0x540)][_0x164971(0x55b)](_0x2b950b[_0x164971(0x333)],0x0,0x0);},Sprite_VisuMz_MessagePopup[_0x50f639(0x346)][_0x50f639(0x2a4)]=function(){const _0x2846d0=_0x50f639;this['_textSprite']=new Sprite(),this[_0x2846d0(0x47b)][_0x2846d0(0x48d)]=this[_0x2846d0(0x540)][_0x2846d0(0x4d1)],this['_textSprite'][_0x2846d0(0x5ff)]['x']=0.5,this[_0x2846d0(0x47b)]['anchor']['y']=0.5,this[_0x2846d0(0x47b)]['x']=this[_0x2846d0(0x4b4)],this[_0x2846d0(0x47b)]['y']=this[_0x2846d0(0x529)],this[_0x2846d0(0x47b)]['scale']['x']=this[_0x2846d0(0x3f6)],this[_0x2846d0(0x47b)]['scale']['y']=this[_0x2846d0(0x66c)],this[_0x2846d0(0x47b)]['angle']=this[_0x2846d0(0x3e7)],this[_0x2846d0(0x26f)](this[_0x2846d0(0x47b)]);},Sprite_VisuMz_MessagePopup[_0x50f639(0x346)][_0x50f639(0x5c9)]=function(){const _0x2b61cf=_0x50f639;Sprite[_0x2b61cf(0x346)][_0x2b61cf(0x5c9)][_0x2b61cf(0x673)](this);if(!this[_0x2b61cf(0x2a7)]())return;this['updateSpritePosition'](),this[_0x2b61cf(0x681)](),this[_0x2b61cf(0x387)](),this[_0x2b61cf(0x3a1)](),this[_0x2b61cf(0x39c)](),this['updateDuration']();},Sprite_VisuMz_MessagePopup[_0x50f639(0x346)][_0x50f639(0x2a7)]=function(){const _0x27babb=_0x50f639;return!!this[_0x27babb(0x47b)];},Sprite_VisuMz_MessagePopup[_0x50f639(0x346)][_0x50f639(0x626)]=function(){const _0x124eeb=_0x50f639,_0x42b43f=this['_settings'];{const _0x27d6dd=$gameMap['tileWidth'](),_0x5879c9=_0x42b43f['tileCoordinates']['x'],_0x4f250b=$gameMap['adjustX'](_0x5879c9);this['x']=Math['floor'](_0x4f250b*_0x27d6dd+_0x27d6dd/0x2);}{const _0x21ba28=$gameMap['tileHeight'](),_0x1059f0=_0x42b43f[_0x124eeb(0x204)]['y'],_0x10fb4f=$gameMap['adjustY'](_0x1059f0);this['y']=Math[_0x124eeb(0x383)](_0x10fb4f*_0x21ba28+_0x21ba28);}},Sprite_VisuMz_MessagePopup[_0x50f639(0x346)]['updateTextPosition']=function(){const _0x3b9bb3=_0x50f639;if(this[_0x3b9bb3(0x655)]<=0x0)return;const _0x15d285=this['_duration'],_0x40d568=this[_0x3b9bb3(0x338)];{this[_0x3b9bb3(0x2d6)]=(this[_0x3b9bb3(0x2d6)]*(_0x15d285-0x1)+this[_0x3b9bb3(0x3d8)])/_0x15d285,this[_0x3b9bb3(0x595)]=(this['_offsetY']*(_0x15d285-0x1)+this[_0x3b9bb3(0x5c1)])/_0x15d285;}{const _0x193234=_0x40d568-_0x15d285,_0x55ae14=_0x40d568/0x2,_0x285f8e=this[_0x3b9bb3(0x235)],_0x75d7fd=-_0x285f8e/Math[_0x3b9bb3(0x272)](_0x55ae14,0x2);this[_0x3b9bb3(0x478)]=_0x75d7fd*Math[_0x3b9bb3(0x272)](_0x193234-_0x55ae14,0x2)+_0x285f8e;}this['_textSprite']['x']=this[_0x3b9bb3(0x2d6)],this['_textSprite']['y']=this['_offsetY']+this[_0x3b9bb3(0x478)];},Sprite_VisuMz_MessagePopup[_0x50f639(0x346)][_0x50f639(0x387)]=function(){const _0x6fe946=_0x50f639;if(this['_duration']<=0x0)return;const _0x27f661=this[_0x6fe946(0x655)];this['_textSprite'][_0x6fe946(0x3f9)]['x']=(this[_0x6fe946(0x47b)]['scale']['x']*(_0x27f661-0x1)+this['_targetScaleX'])/_0x27f661,this[_0x6fe946(0x47b)]['scale']['y']=(this['_textSprite'][_0x6fe946(0x3f9)]['y']*(_0x27f661-0x1)+this[_0x6fe946(0x2b3)])/_0x27f661;},Sprite_VisuMz_MessagePopup[_0x50f639(0x346)][_0x50f639(0x3a1)]=function(){const _0x341929=_0x50f639;if(this[_0x341929(0x655)]<=0x0)return;const _0x29d9be=this[_0x341929(0x655)];this[_0x341929(0x47b)][_0x341929(0x3a4)]=(this['_textSprite']['angle']*(_0x29d9be-0x1)+this[_0x341929(0x530)])/_0x29d9be;},Sprite_VisuMz_MessagePopup[_0x50f639(0x346)][_0x50f639(0x39c)]=function(){const _0x4b0d3d=_0x50f639;this[_0x4b0d3d(0x360)](),this[_0x4b0d3d(0x24f)]();},Sprite_VisuMz_MessagePopup[_0x50f639(0x346)][_0x50f639(0x360)]=function(){const _0x2e577e=_0x50f639;if(this[_0x2e577e(0x41e)]<=0x0)return;const _0x14baf2=this[_0x2e577e(0x41e)];this['opacity']=(this['opacity']*(_0x14baf2-0x1)+0xff)/_0x14baf2,this['_fadeInDuration']--,this['_fadeInDuration']<=0x0&&(this[_0x2e577e(0x484)]=0xff);},Sprite_VisuMz_MessagePopup[_0x50f639(0x346)]['updateFadeOut']=function(){const _0x26f70d=_0x50f639;if(this[_0x26f70d(0x3cf)]<=0x0)return;if(this['_duration']>this[_0x26f70d(0x3ac)])return;const _0x35fe34=this[_0x26f70d(0x3cf)];this[_0x26f70d(0x484)]=(this[_0x26f70d(0x484)]*(_0x35fe34-0x1)+0x0)/_0x35fe34,this[_0x26f70d(0x3cf)]--,this[_0x26f70d(0x3cf)]<=0x0&&(this[_0x26f70d(0x484)]=0x0);},Sprite_VisuMz_MessagePopup[_0x50f639(0x346)][_0x50f639(0x27e)]=function(){const _0x36cc47=_0x50f639;if(this[_0x36cc47(0x655)]<=0x0)return;this['_duration']--;if(this[_0x36cc47(0x655)]<=0x0){if(this[_0x36cc47(0x690)])this[_0x36cc47(0x690)]['removeChild'](this);this[_0x36cc47(0x47b)][_0x36cc47(0x48d)]&&this['_textSprite']['bitmap'][_0x36cc47(0x358)]();}},VisuMZ[_0x50f639(0x380)][_0x50f639(0x2b1)]=Spriteset_Map['prototype']['createLowerLayer'],Spriteset_Map[_0x50f639(0x346)]['createLowerLayer']=function(){const _0x29a718=_0x50f639;VisuMZ['EventsMoveCore'][_0x29a718(0x2b1)][_0x29a718(0x673)](this),this[_0x29a718(0x632)]();},VisuMZ[_0x50f639(0x380)][_0x50f639(0x1fa)]=Spriteset_Map[_0x50f639(0x346)][_0x50f639(0x4bb)],Spriteset_Map[_0x50f639(0x346)][_0x50f639(0x4bb)]=function(){const _0x1d1a37=_0x50f639;VisuMZ[_0x1d1a37(0x380)][_0x1d1a37(0x1fa)][_0x1d1a37(0x673)](this),this[_0x1d1a37(0x667)]();},Spriteset_Map['prototype'][_0x50f639(0x667)]=function(){const _0x71c34b=_0x50f639;if(!VisuMZ['EventsMoveCore'][_0x71c34b(0x55c)][_0x71c34b(0x57c)][_0x71c34b(0x486)])return;for(const _0x14069b of this[_0x71c34b(0x587)]){this[_0x71c34b(0x39b)](_0x14069b);}},Spriteset_Map[_0x50f639(0x346)][_0x50f639(0x39b)]=function(_0x3b353e){const _0x47c942=_0x50f639;_0x3b353e[_0x47c942(0x322)]=new Sprite(),_0x3b353e[_0x47c942(0x322)]['_filename']=_0x3b353e[_0x47c942(0x3a0)][_0x47c942(0x40e)](),_0x3b353e[_0x47c942(0x322)][_0x47c942(0x48d)]=ImageManager[_0x47c942(0x5f4)](_0x3b353e['_shadowSprite'][_0x47c942(0x61e)]),_0x3b353e[_0x47c942(0x322)][_0x47c942(0x5ff)]['x']=0.5,_0x3b353e[_0x47c942(0x322)][_0x47c942(0x5ff)]['y']=0x1,_0x3b353e[_0x47c942(0x322)]['z']=0x0,this[_0x47c942(0x1d5)]['addChild'](_0x3b353e[_0x47c942(0x322)]);},Spriteset_Map[_0x50f639(0x346)][_0x50f639(0x34b)]=function(){const _0x20aea4=_0x50f639;if(!VisuMZ[_0x20aea4(0x380)][_0x20aea4(0x55c)][_0x20aea4(0x57c)][_0x20aea4(0x486)])return;for(const _0x3cb71b of this[_0x20aea4(0x587)]){this[_0x20aea4(0x1d5)][_0x20aea4(0x545)](_0x3cb71b[_0x20aea4(0x322)]);}},Spriteset_Map[_0x50f639(0x346)][_0x50f639(0x632)]=function(){const _0x1ac422=_0x50f639;this[_0x1ac422(0x5b4)]=[];for(const _0x2a2539 of $gameMap['events']()){this[_0x1ac422(0x629)](_0x2a2539);}},Spriteset_Map['MOBILE_EVENT_LABELS']=VisuMZ[_0x50f639(0x380)][_0x50f639(0x55c)][_0x50f639(0x69b)][_0x50f639(0x505)]??!![],Spriteset_Map[_0x50f639(0x346)][_0x50f639(0x629)]=function(_0x45fb24){const _0x4b684c=_0x50f639;if(!this[_0x4b684c(0x48c)](_0x45fb24))return;if(Utils[_0x4b684c(0x3c4)]()){if(!Spriteset_Map[_0x4b684c(0x1e2)])return;}let _0x4a0710;const _0x3d2fbc=VisuMZ[_0x4b684c(0x380)][_0x4b684c(0x55c)]['Label']['SpriteBased']??!![];_0x4a0710=_0x3d2fbc?new Sprite_EventLabel(_0x45fb24):new Window_EventLabel(_0x45fb24),_0x4a0710['z']=0x8,_0x4a0710[_0x4b684c(0x37a)]=Sprite[_0x4b684c(0x1e9)]++,this[_0x4b684c(0x1d5)][_0x4b684c(0x26f)](_0x4a0710),this[_0x4b684c(0x5b4)][_0x4b684c(0x5d9)](_0x4a0710);},Spriteset_Map[_0x50f639(0x346)]['isTargetEventValidForLabelWindow']=function(_0x4560d7){const _0x6db84b=_0x50f639,_0x38c469=_0x4560d7[_0x6db84b(0x5bd)]();if(_0x38c469[_0x6db84b(0x2c0)][_0x6db84b(0x1e7)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x38c469[_0x6db84b(0x2c0)][_0x6db84b(0x1e7)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x151408 of _0x38c469[_0x6db84b(0x437)]){let _0x55ad5c='';for(const _0x2dea95 of _0x151408[_0x6db84b(0x1ed)]){[0x6c,0x198][_0x6db84b(0x292)](_0x2dea95['code'])&&(_0x55ad5c+=_0x2dea95['parameters'][0x0]);}if(_0x55ad5c[_0x6db84b(0x1e7)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x55ad5c[_0x6db84b(0x1e7)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x50f639(0x346)][_0x50f639(0x633)]=function(_0x389fe6){const _0x596d2d=_0x50f639;this[_0x596d2d(0x587)]=this['_characterSprites']||[];const _0x4fefc7=new Sprite_Character(_0x389fe6);this['_characterSprites'][_0x596d2d(0x5d9)](_0x4fefc7),this['_tilemap'][_0x596d2d(0x26f)](_0x4fefc7),this[_0x596d2d(0x39b)](_0x4fefc7),this[_0x596d2d(0x629)](_0x389fe6),_0x4fefc7[_0x596d2d(0x5c9)](),_0x389fe6[_0x596d2d(0x3e5)](),_0x4fefc7[_0x596d2d(0x24a)]();},Spriteset_Map['prototype'][_0x50f639(0x679)]=function(){const _0x412e6f=_0x50f639;if(!this[_0x412e6f(0x5b4)])return;for(const _0x2a1012 of this[_0x412e6f(0x5b4)]){_0x2a1012&&(_0x2a1012['_visiblePlayerX']=undefined,_0x2a1012[_0x412e6f(0x377)]());}},Spriteset_Map[_0x50f639(0x346)]['createEventsMoveCoreMessagePopup']=function(_0x7f6be0,_0x21b118){const _0x447d30=_0x50f639;if(!_0x7f6be0)return;_0x21b118[_0x447d30(0x204)]={'x':_0x7f6be0['x'],'y':_0x7f6be0['y']},this['createEventsMoveCoreTileMessagePopup'](_0x21b118);},Spriteset_Map['prototype']['createEventsMoveCoreTileMessagePopup']=function(_0x2fde26){const _0x2c96a3=_0x50f639;if(!this[_0x2c96a3(0x1d5)])return;const _0xd337da=new Sprite_VisuMz_MessagePopup(_0x2fde26);this[_0x2c96a3(0x1d5)][_0x2c96a3(0x26f)](_0xd337da);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x522)]=Game_Message['prototype']['setNumberInput'],Game_Message['prototype'][_0x50f639(0x585)]=function(_0xbfe702,_0x18619a){const _0x2dfe86=_0x50f639;this['_selfTargetNumberInput']=$gameTemp[_0x2dfe86(0x5d4)](),VisuMZ[_0x2dfe86(0x380)][_0x2dfe86(0x522)][_0x2dfe86(0x673)](this,_0xbfe702,_0x18619a);},VisuMZ['EventsMoveCore'][_0x50f639(0x4e1)]=Window_NumberInput[_0x50f639(0x346)][_0x50f639(0x4d0)],Window_NumberInput[_0x50f639(0x346)][_0x50f639(0x4d0)]=function(){const _0x2a9d6f=_0x50f639;$gameTemp[_0x2a9d6f(0x5ca)]($gameMessage[_0x2a9d6f(0x375)]),VisuMZ[_0x2a9d6f(0x380)][_0x2a9d6f(0x4e1)]['call'](this),$gameTemp[_0x2a9d6f(0x58e)]();},VisuMZ[_0x50f639(0x380)][_0x50f639(0x524)]=Window_NumberInput[_0x50f639(0x346)][_0x50f639(0x2ee)],Window_NumberInput[_0x50f639(0x346)][_0x50f639(0x2ee)]=function(){const _0x1b243f=_0x50f639;$gameTemp['registerSelfTarget']($gameMessage[_0x1b243f(0x375)]),VisuMZ[_0x1b243f(0x380)][_0x1b243f(0x524)][_0x1b243f(0x673)](this),$gameTemp[_0x1b243f(0x58e)](),$gameMessage[_0x1b243f(0x375)]=undefined;},VisuMZ[_0x50f639(0x380)][_0x50f639(0x3fd)]=Game_Message[_0x50f639(0x346)][_0x50f639(0x409)],Game_Message[_0x50f639(0x346)][_0x50f639(0x409)]=function(_0x38bb6a,_0x3da62f){const _0x2331fc=_0x50f639;this['_selfTargetItemChoice']=$gameTemp[_0x2331fc(0x5d4)](),VisuMZ[_0x2331fc(0x380)][_0x2331fc(0x3fd)][_0x2331fc(0x673)](this,_0x38bb6a,_0x3da62f);},VisuMZ[_0x50f639(0x380)][_0x50f639(0x556)]=Window_EventItem['prototype']['onOk'],Window_EventItem[_0x50f639(0x346)][_0x50f639(0x32b)]=function(){const _0x3165b8=_0x50f639;$gameTemp[_0x3165b8(0x5ca)]($gameMessage[_0x3165b8(0x621)]),VisuMZ['EventsMoveCore'][_0x3165b8(0x556)][_0x3165b8(0x673)](this),$gameTemp[_0x3165b8(0x58e)](),$gameMessage[_0x3165b8(0x621)]=undefined;},VisuMZ[_0x50f639(0x380)]['Window_EventItem_onCancel']=Window_EventItem[_0x50f639(0x346)][_0x50f639(0x247)],Window_EventItem[_0x50f639(0x346)][_0x50f639(0x247)]=function(){const _0x501faf=_0x50f639;$gameTemp[_0x501faf(0x5ca)]($gameMessage['_selfTargetItemChoice']),VisuMZ['EventsMoveCore'][_0x501faf(0x4da)]['call'](this),$gameTemp[_0x501faf(0x58e)](),$gameMessage[_0x501faf(0x621)]=undefined;},VisuMZ[_0x50f639(0x380)][_0x50f639(0x1e5)]=Window_Message[_0x50f639(0x346)][_0x50f639(0x348)],Window_Message['prototype'][_0x50f639(0x348)]=function(){const _0x15bada=_0x50f639;$gameMessage['registerSelfEvent'](),VisuMZ['EventsMoveCore'][_0x15bada(0x1e5)][_0x15bada(0x673)](this),$gameTemp[_0x15bada(0x58e)]();},VisuMZ['EventsMoveCore'][_0x50f639(0x461)]=Window_ScrollText['prototype'][_0x50f639(0x348)],Window_ScrollText['prototype'][_0x50f639(0x348)]=function(){const _0x449c99=_0x50f639;$gameMessage['registerSelfEvent'](),VisuMZ[_0x449c99(0x380)]['Window_ScrollText_startMessage'][_0x449c99(0x673)](this),$gameTemp['clearSelfTarget']();};function Window_EventLabel(){const _0x56796b=_0x50f639;this[_0x56796b(0x378)](...arguments);}Window_EventLabel['prototype']=Object['create'](Window_Base[_0x50f639(0x346)]),Window_EventLabel[_0x50f639(0x346)][_0x50f639(0x381)]=Window_EventLabel,Window_EventLabel[_0x50f639(0x346)][_0x50f639(0x378)]=function(_0x52461e){const _0x476ab3=_0x50f639;this[_0x476ab3(0x402)]=_0x52461e;const _0x55e390=new Rectangle(0x0,0x0,Graphics[_0x476ab3(0x516)]/0x4,this[_0x476ab3(0x2db)](0x1));this[_0x476ab3(0x2fc)](),Window_Base[_0x476ab3(0x346)][_0x476ab3(0x378)][_0x476ab3(0x673)](this,_0x55e390),this['contentsOpacity']=0x0,this[_0x476ab3(0x69a)](0x2),this[_0x476ab3(0x323)]='';},Window_EventLabel[_0x50f639(0x346)][_0x50f639(0x2fc)]=function(){const _0x4bd977=_0x50f639;this['_eventErased']=![],this[_0x4bd977(0x573)]=$gameScreen[_0x4bd977(0x1dc)](),this[_0x4bd977(0x265)]=this[_0x4bd977(0x402)]['screenX'](),this[_0x4bd977(0x56a)]=this[_0x4bd977(0x402)]['screenY'](),this[_0x4bd977(0x2df)]=this['_event'][_0x4bd977(0x379)]['offsetX'],this[_0x4bd977(0x339)]=this['_event'][_0x4bd977(0x379)][_0x4bd977(0x1e8)],this[_0x4bd977(0x42c)]=this[_0x4bd977(0x402)][_0x4bd977(0x57d)],this[_0x4bd977(0x2f9)]=this[_0x4bd977(0x355)](),this[_0x4bd977(0x2b0)]=$gameSystem[_0x4bd977(0x32e)](),this[_0x4bd977(0x492)]=$gamePlayer['x'],this[_0x4bd977(0x241)]=$gamePlayer['y'],this[_0x4bd977(0x699)]=this[_0x4bd977(0x402)]['x'],this[_0x4bd977(0x628)]=this['_event']['y'];},Window_EventLabel[_0x50f639(0x346)][_0x50f639(0x5c9)]=function(){const _0x4dc4af=_0x50f639;Window_Base[_0x4dc4af(0x346)]['update'][_0x4dc4af(0x673)](this);if(!this[_0x4dc4af(0x3bd)]())return;this[_0x4dc4af(0x2a6)](),this[_0x4dc4af(0x1eb)](),this[_0x4dc4af(0x4e4)](),this[_0x4dc4af(0x39c)]();},Window_EventLabel[_0x50f639(0x346)][_0x50f639(0x3bd)]=function(){const _0x4e5cd5=_0x50f639;if(!this[_0x4e5cd5(0x402)])return![];if(!this[_0x4e5cd5(0x402)]['_labelWindow'])return![];if(this[_0x4e5cd5(0x42c)]!==this[_0x4e5cd5(0x402)][_0x4e5cd5(0x57d)])return!![];if(this['_event'][_0x4e5cd5(0x4ac)]&&!this[_0x4e5cd5(0x39d)])return!![];if(this[_0x4e5cd5(0x402)][_0x4e5cd5(0x379)][_0x4e5cd5(0x333)]==='')return![];if(this[_0x4e5cd5(0x573)]!==$gameScreen[_0x4e5cd5(0x1dc)]())return!![];if(this['_eventScreenX']!==this[_0x4e5cd5(0x402)][_0x4e5cd5(0x5c6)]())return!![];if(this[_0x4e5cd5(0x56a)]!==this[_0x4e5cd5(0x402)][_0x4e5cd5(0x4c7)]())return!![];if(this[_0x4e5cd5(0x2df)]!==this['_event']['_labelWindow'][_0x4e5cd5(0x3f1)])return!![];if(this[_0x4e5cd5(0x339)]!==this[_0x4e5cd5(0x402)][_0x4e5cd5(0x379)][_0x4e5cd5(0x1e8)])return!![];if(this[_0x4e5cd5(0x492)]!==$gamePlayer['x'])return!![];if(this[_0x4e5cd5(0x241)]!==$gamePlayer['y'])return!![];if(this['_visibleEventX']!==this[_0x4e5cd5(0x402)]['x'])return!![];if(this[_0x4e5cd5(0x628)]!==this[_0x4e5cd5(0x402)]['y'])return!![];if(this[_0x4e5cd5(0x2b0)]!==$gameSystem[_0x4e5cd5(0x32e)]())return!![];if(this[_0x4e5cd5(0x2f9)]&&this[_0x4e5cd5(0x53b)]<0xff)return!![];if(!this[_0x4e5cd5(0x2f9)]&&this['contentsOpacity']>0x0)return!![];if(SceneManager['_scene'][_0x4e5cd5(0x2cf)]>0x0)return!![];return![];},Window_EventLabel['prototype'][_0x50f639(0x2a6)]=function(){const _0x465f59=_0x50f639;this[_0x465f59(0x402)][_0x465f59(0x32c)]()!==this[_0x465f59(0x323)]&&(this[_0x465f59(0x323)]=this[_0x465f59(0x402)][_0x465f59(0x32c)](),this[_0x465f59(0x377)]());},Window_EventLabel['prototype'][_0x50f639(0x1eb)]=function(){const _0x52287c=_0x50f639;this[_0x52287c(0x3f9)]['x']=0x1/$gameScreen['zoomScale'](),this['scale']['y']=0x1/$gameScreen[_0x52287c(0x1dc)](),this['_screenZoomScale']=$gameScreen[_0x52287c(0x1dc)]();},Window_EventLabel[_0x50f639(0x346)][_0x50f639(0x4e4)]=function(){const _0x48b650=_0x50f639;if(!SceneManager[_0x48b650(0x58c)])return;if(!SceneManager[_0x48b650(0x58c)][_0x48b650(0x62a)])return;const _0x3e9fe=SceneManager[_0x48b650(0x58c)][_0x48b650(0x62a)]['findTargetSprite'](this[_0x48b650(0x402)]);if(!_0x3e9fe)return;this['x']=Math[_0x48b650(0x452)](this[_0x48b650(0x402)][_0x48b650(0x5c6)]()-Math[_0x48b650(0x383)](this[_0x48b650(0x475)]*this[_0x48b650(0x3f9)]['x']/0x2)),this['x']+=this[_0x48b650(0x402)][_0x48b650(0x379)]['offsetX'],this['y']=this[_0x48b650(0x402)][_0x48b650(0x4c7)]()-_0x3e9fe['height'],this['y']+=Math['round']($gameSystem[_0x48b650(0x2a3)]()*0.5),this['y']-=Math[_0x48b650(0x452)](this[_0x48b650(0x5e1)]*this[_0x48b650(0x3f9)]['y']),this['y']+=this[_0x48b650(0x402)][_0x48b650(0x379)]['offsetY'],this[_0x48b650(0x39d)]=this['_event'][_0x48b650(0x4ac)],this[_0x48b650(0x265)]=this[_0x48b650(0x402)][_0x48b650(0x5c6)](),this[_0x48b650(0x56a)]=this[_0x48b650(0x402)]['screenY'](),this[_0x48b650(0x2df)]=this[_0x48b650(0x402)]['_labelWindow'][_0x48b650(0x3f1)],this[_0x48b650(0x339)]=this[_0x48b650(0x402)]['_labelWindow'][_0x48b650(0x1e8)],this[_0x48b650(0x42c)]=this['_event']['_pageIndex'],this['_eventErased']&&(this[_0x48b650(0x53b)]=0x0);},Window_EventLabel[_0x50f639(0x346)][_0x50f639(0x39c)]=function(){const _0x51d2b6=_0x50f639;if(this[_0x51d2b6(0x355)]())this[_0x51d2b6(0x53b)]+=this['opacitySpeed']();else SceneManager[_0x51d2b6(0x58c)][_0x51d2b6(0x2cf)]>0x0?this['contentsOpacity']=0x0:this[_0x51d2b6(0x53b)]-=this['opacitySpeed']();},Window_EventLabel['prototype'][_0x50f639(0x355)]=function(){const _0x13f33b=_0x50f639;if(!$gameSystem[_0x13f33b(0x32e)]())return![];if(this['_event']?.['_erased'])return![];if(SceneManager['_scene'][_0x13f33b(0x2cf)]>0x0)return![];const _0x4dafc6=$gamePlayer['x'],_0x1b3ec2=$gamePlayer['y'],_0xaef2e7=this[_0x13f33b(0x402)]['x'],_0x5cfe51=this[_0x13f33b(0x402)]['y'];if(this[_0x13f33b(0x492)]===_0x4dafc6&&this['_visiblePlayerY']===_0x1b3ec2&&this[_0x13f33b(0x699)]===_0xaef2e7&&this['_visibleEventY']===_0x5cfe51)return this[_0x13f33b(0x2f9)];this[_0x13f33b(0x492)]=$gamePlayer['x'],this[_0x13f33b(0x241)]=$gamePlayer['y'],this[_0x13f33b(0x699)]=this[_0x13f33b(0x402)]['x'],this[_0x13f33b(0x628)]=this[_0x13f33b(0x402)]['y'];if(!VisuMZ[_0x13f33b(0x380)][_0x13f33b(0x562)](this[_0x13f33b(0x402)]))return this[_0x13f33b(0x2f9)]=![],![];return this[_0x13f33b(0x2f9)]=!![],!![];},Window_EventLabel[_0x50f639(0x346)]['opacitySpeed']=function(){const _0x566714=_0x50f639;return VisuMZ['EventsMoveCore'][_0x566714(0x55c)][_0x566714(0x69b)][_0x566714(0x412)];},Window_EventLabel[_0x50f639(0x346)][_0x50f639(0x533)]=function(){const _0x37f190=_0x50f639,_0x3bf571=this[_0x37f190(0x326)](this[_0x37f190(0x323)]);this['width']=_0x3bf571[_0x37f190(0x475)]+($gameSystem[_0x37f190(0x2a3)]()+this[_0x37f190(0x4d5)]())*0x2,this[_0x37f190(0x5e1)]=Math[_0x37f190(0x244)](this[_0x37f190(0x43a)](),_0x3bf571['height'])+$gameSystem[_0x37f190(0x2a3)]()*0x2,this[_0x37f190(0x613)]();},Window_EventLabel['prototype'][_0x50f639(0x43a)]=function(){const _0x10adc8=_0x50f639;return VisuMZ[_0x10adc8(0x380)]['Settings'][_0x10adc8(0x69b)]['LineHeight'];},Window_EventLabel[_0x50f639(0x346)][_0x50f639(0x651)]=function(){const _0x3e0163=_0x50f639;Window_Base[_0x3e0163(0x346)][_0x3e0163(0x651)]['call'](this),this['contents']['fontSize']=this[_0x3e0163(0x2e8)]();},Window_EventLabel[_0x50f639(0x346)][_0x50f639(0x2e8)]=function(){const _0xc65851=_0x50f639;return VisuMZ[_0xc65851(0x380)]['Settings'][_0xc65851(0x69b)][_0xc65851(0x373)];},Window_EventLabel[_0x50f639(0x346)][_0x50f639(0x377)]=function(){const _0x4b7c78=_0x50f639;this[_0x4b7c78(0x533)](),this[_0x4b7c78(0x4d1)][_0x4b7c78(0x276)]();const _0x2fc705=this['_text']['split'](/[\r\n]+/);let _0x5d1c82=0x0;for(const _0x367ddb of _0x2fc705){const _0x5d3307=this[_0x4b7c78(0x326)](_0x367ddb),_0x1aa68d=Math[_0x4b7c78(0x383)]((this[_0x4b7c78(0x500)]-_0x5d3307[_0x4b7c78(0x475)])/0x2);this['drawTextEx'](_0x367ddb,_0x1aa68d,_0x5d1c82),_0x5d1c82+=_0x5d3307[_0x4b7c78(0x5e1)];}},Window_EventLabel['prototype'][_0x50f639(0x583)]=function(_0x26df0b,_0x54dfe0){const _0x548368=_0x50f639;_0x54dfe0[_0x548368(0x216)]&&this[_0x548368(0x5ee)](_0x26df0b,_0x54dfe0['x']+0x2,_0x54dfe0['y']),_0x54dfe0['x']+=Math[_0x548368(0x324)](this[_0x548368(0x568)](),ImageManager[_0x548368(0x440)])+0x4;},Window_EventLabel[_0x50f639(0x346)][_0x50f639(0x5ee)]=function(_0x647a6f,_0x14ba85,_0x1a9d40){const _0x421173=_0x50f639,_0x1b7bae=ImageManager['loadSystem'](_0x421173(0x5fd)),_0x19fda1=ImageManager[_0x421173(0x440)],_0x4c2dba=ImageManager[_0x421173(0x508)],_0x39df31=_0x647a6f%0x10*_0x19fda1,_0x332374=Math[_0x421173(0x383)](_0x647a6f/0x10)*_0x4c2dba,_0x2b80f3=Math[_0x421173(0x324)](this['iconSize']()),_0x4b1a71=Math['min'](this[_0x421173(0x568)]());this[_0x421173(0x4d1)]['blt'](_0x1b7bae,_0x39df31,_0x332374,_0x19fda1,_0x4c2dba,_0x14ba85,_0x1a9d40,_0x2b80f3,_0x4b1a71);},Window_EventLabel[_0x50f639(0x346)][_0x50f639(0x568)]=function(){const _0x2c2170=_0x50f639;return VisuMZ['EventsMoveCore'][_0x2c2170(0x55c)][_0x2c2170(0x69b)][_0x2c2170(0x318)];};