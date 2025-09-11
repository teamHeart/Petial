//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.54;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.54] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Text Language Information
 * ============================================================================
 *
 * As of Message Core version 1.46, Text Language has been added. 
 * 
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * As of Message Core version 1.53, we've decided to add support for TSV.
 * 
 * This is because we have done our research and decided that CSV's are too
 * restricted to use due to their default nature of wanting to use commas as
 * separators. Thus, we've decided to switch to TSV where the default separator
 * is a tab space, something that is almost never used in RPG Maker text.
 *
 * ---
 * 
 * === How to Enable Switching ===
 * 
 * Text Language is NOT enabled by default. Here's what you have to do:
 * 
 * #1. Open up the Message Core's Plugin Parameters
 * #2. Plugin Parameters > Text Language Settings > Enable Switching?
 * #3. Change the "Enable Switching?" parameter setting to "true".
 * #4. Adjust any other settings as needed.
 * #5. Save the Plugin Parameter changes.
 * #6. Save your game.
 * 
 * Now, it's time to get the CSV/TSV file that will contain all of the text
 * used to translate your game's script.
 * 
 * #1. Play test your game. Make sure Play test mode is NOT disabled.
 * #2. A popup will appear asking to create a language CSV/TSV file.
 * #3. Click "OK" and let the plugin do its thing.
 * #4. The project's /data/ folder will appear with Language.csv/tsv made.
 * #5. The plugin will then ask you to restart your game.
 * 
 * '''IMPORTANT!''' The separator used for the CSV file must be a semicolon (;)
 * and not a comma (,) as to reduce the amount of punctuation conflicts. Keep
 * this in mind as most CSV editors will default to comma (,) instead of the
 * semicolon (;) for their separator.
 * 
 * ---
 * 
 * === How to Edit the Language CSV/TSV ===
 * 
 * The Language CSV/TSV is structured as a normal CSV/TSV file would be, which
 * also means it can be modified in programs like Microsoft Excel or Google
 * Sheets. We recommend using either of those programs to modify the text.
 * 
 * We do not recommend modifying the CSV/TSV file in programs like notepad
 * directly due to the way certain things like commas (,) and tabs are handled
 * and how easy it is to be error-prone.
 * 
 * The table will appear something like this at first:
 * 
 *     Key        English    Chinese    Japanese     Korean
 *     Greeting   Hello      你好       こんにちは    안녕하세요
 *     Farewell   Good-bye   再见       さようなら    안녕히
 *     Wow        Wow        哇         ワオ          와우
 * 
 * The "Key" column refers to the reference key used to determine which lines
 * will be inserted into the text. The columns with the languages will utilize
 * the respective phrases for that language.
 * 
 * You can remove columns containing languages that you aren't planning to
 * translate for your game.
 * 
 * ---
 * 
 * === Things to Keep in Mind ===
 * 
 * When adding text to the CSV/TSV file via the spreadsheet editor (Excel or
 * Google Sheets), there's a few things to keep in mind.
 * 
 * ---
 * 
 * ==== How to Load the CSV/TSV in Google Sheets ====
 * 
 * If you are using Google Sheets and wish to edit the CSV/TSV without it
 * converting all the separators into commas, here's what you do:
 * 
 * #1. Go to "https://sheets.google.com"
 * #2. Create a "Blank spreadsheet"
 * #3. File > Import > Upload > Select the CSV/TSV file that was created in
 *     your game project's /data/ folder. You may need to select "All Files"
 *     for file type if uploading a TSV.
 * #4. For "Separator Type", if you are using CSV, change it to "Custom" and
 *     insert the Semicolon ";". Otherwise, if you are using TSV, select "tab"
 *     as your separator type.
 * #5. Uncheck "Convert text to numbers, dates, and formulas"
 * 
 * ==== How to Load the CSV/TSV in VS Code ===
 * 
 * #1. Go to "https://code.visualstudio.com/"
 * #2. Download and install it
 * #3. Open up VS Code and go to View > Extensions
 * #4. Search for an extension called "Edit CSV"
 * #5. Load the CSV/TSV file into VS Code and view with the CSV Editor
 * #6. Click the button that says "Edit CSV" in the upper right
 * 
 * ==== Line Breaks ====
 * 
 * When you want to insert line breaks into the translated phrases, use the
 * <br> text code. This is best used for text that is to be transferred into
 * the message window or help window.
 * 
 * ==== Text Codes ====
 * 
 * Text codes like \C[2] can be inserted normally. However, they only work in
 * windows that support text codes, such as the message window or help window.
 * Otherwise, the text codes will not transfer over properly.
 * 
 * ==== Semicolons (CSV Only) ====
 * 
 * Due to the nature of the CSV file, we used the semicolon (;) as the
 * separator. As such, semicolons should not be used in the text entries.
 * Though some sentences will work with the semicolon, not all of them will. If
 * you do want to use a semicolon, use the text code <semicolon> instead.
 * 
 *   Example:
 * 
 *   "The pancakes were delicious<semicolon> they were fluffy and sweet."
 * 
 * Other variations of the semicolon text code are <semi> and <semi-colon>.
 * The <semicolon> text code and variants only work with the Language CSV and
 * are ignored otherwise when typed in a regular message box entry.
 * 
 * ---
 * 
 * ==== Macros and Language Switches ====
 * 
 * For those using both text macros and text language switches, macros will be
 * converted to text before language switches as it allows for better text
 * transitions that way.
 * 
 * ---
 * 
 * === How to Use the Reference Keys ===
 * 
 * Remember the "Key" column and the reference keys? Those are used to
 * determine which lines will be inserted into the text for the message window
 * and just about any other window. However, there's a specific way these keys
 * must be used in order for them to work.
 * 
 * The "text code" format works like this. Use any of the following:
 * 
 *   \tl{keyName}
 *   \translate{keyName}
 *   \loc{keyName}
 *   \locale{keyName}
 *   \localize{keyName}
 * 
 * or for those coming from different translation plugins but want to switch
 * over to the VisuStella MZ Message Core's translation system:
 * 
 *   ${keyName}
 * 
 * For example, to use one of the default keys made with the Language CSV/TSV:
 * 
 *   \tl{Greeting}
 * 
 * This will yield "Hello" in English, "你好" in Chinese, "こんにちは" in
 * Japanese, and "안녕하세요" in Korean.
 * 
 * Key names are not case sensitive and any trailing spaces will be removed
 * from them in order to make sure the CSV/TSV table is stable to reference any
 * translated text from.
 * 
 * You can insert these language "text codes" into item names, skill names,
 * etc. as well as system entries like for Attack, Defense, etc.
 * 
 * ---
 * 
 * === Naming Weapon Types, Armor Types, Equip Types, Item Categories ===
 * 
 * You might have noticed that if you've decided to use \tl{keyName} for weapon
 * or other database types, other parts of the game will error out. Don't
 * worry, for these, you don't have to change the currently used database name.
 * Go straight to the CSV/TSV and insert in a new key for that particular
 * database name. For example, the equip type "Accessory" will use "Accessory"
 * as the automatic key to look for a translated phrase. If there isn't any in
 * the CSV/TSV file, then the default database text entry will be used.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned. *Note1*
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned. *Note1*
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned. *Note1*
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start. Does not work with Word Wrap.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 * 
 * While these text codes are available globally, they are best suited for use
 * in the message window or any other window that does not change its contents.
 * The reason being is because the picture drawn is drawn into the background
 * of the window.
 * 
 * Therefore, we do not recommend using this in windows that change contents
 * often like Help Windows or Quest Descriptions. Instead, we recommend using
 * icons instead.
 * 
 * As of the version 1.53 update, the Help Window now supports both of these
 * text codes. However, we still recommend using icons over using pictures as
 * there will be loading delays.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Map Name)
 * ------------------   -------------------------------------------------------
 * <left>               Makes map name align to left side of screen.
 * <center>             Makes map name align to horizontally center of screen.
 * <right>              Makes map name align to right side of screen.
 * 
 * <top>                Makes map name align to top of screen.
 * <middle>             Makes map name align to vertically middle of screen.
 * <bottom>             Makes map name align to bottom of screen.
 * 
 * <X: +n>              Adjusts the horizontal position of map name by n.
 * <X: -n>              Adjusts the horizontal position of map name by n.
 * 
 * <Y: +n>              Adjusts the vertical position of map name by n.
 * <Y: -n>              Adjusts the vertical position of map name by n.
 * 
 * Note: All of these text codes require VisuMZ_0_CoreEngine installed and its
 * "Map Name Text Code" plugin parameter enabled.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <Caps>               Makes all text after this capitalized.
 *                      Turns off other auto-text case modes.
 *                      ie: "hello world" becomes "HELLO WORLD"
 * </Caps>              Turns off auto text-casing effects.
 * 
 * <Upper>              Makes the first letter of any word after a space to be
 *                      capitalized. Other letters are left alone.
 *                      Turns off other auto-text case modes.
 *                      ie. "old mcDonald" becomes "Old McDonald"
 * </Upper>             Turns off auto text-casing effects.
 * 
 * <Lower>              Makes all text after this lowercase.
 *                      Turns off other auto-text case modes.
 *                      ie: "THE QUICK BROWN FOX" becomes "the quick brown fox"
 * </Lower>             Turns off auto text-casing effects.
 * 
 * <Alt>                Makes all text after this alternate between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Hello" becomes "HeLlO"
 * </Alt>               Turns off auto text-casing effects.
 * 
 * <Chaos>              Makes all text after this randomize between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Wassup" becomes "waSsUP" or "WasSuP"
 * </Chaos>             Turns off auto text-casing effects.
 * 
 * **Clarity:** In case you're wondering, the text codes </Caps>, </Upper>,
 * </Lower>, </Alt>, and </Chaos> all do the same thing and can be used
 * interchangeably with each other. For example, you can do this:
 * <Caps>hello world</Lower> and it would still accomplish the same effect, but
 * you won't do that because you're not a monster of a developer.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 * 
 * <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' text color. This
 *                                will be combined with a fading
 * <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' to 'y' gradient
 *                                text color.
 * <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' color using
 *                                hex color values.
 * <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' gradient
 *                                using hex color values.
 * 
 * <Help> text </Help>            Makes a help window appear and have it show
 *                                'text' in its contents. The help window will
 *                                disappear if no text is displayed.
 * 
 * <Shuffle>                      Shuffles the order of all choices. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 * <Shuffle: x>                   Shuffles the order of all choices and only
 *                                x number of them will appear. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 *                                Hidden choices do not count towards x number.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Background Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <BgImg: filename>              Creates a background image from img/pictures/
 *                                stretched across the choice rectangle.
 * <BgImg LowerLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <BgImg LowerCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <BgImg LowerRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <BgImg MidLeft: filename>      Creates a background image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <BgImg Center: filename>       Creates a background image from img/pictures/
 *                                scaled to the center of choice rect.
 * <BgImg MidRight: filename>     Creates a background image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <BgImg UpperLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <BgImg UpperCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <BgImg UpperRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <BgImg: filename> text code variants, even if the background
 * image is smaller than the choice contents, it will overscale to match its
 * choice rectangle dimensions.
 * 
 * *Note:* Using a background image will clear the dimmed background rectangle
 * that is normally behind each selectable choice.
 * 
 * *Note:* Each choice can only have one background image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the background will appear behind the select cursor.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Foreground Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <FgImg: filename>              Creates a foreground image from img/pictures/
 *                                stretched across the choice rectangle.
 * <FgImg LowerLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <FgImg LowerCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <FgImg LowerRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <FgImg MidLeft: filename>      Creates a foreground image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <FgImg Center: filename>       Creates a foreground image from img/pictures/
 *                                scaled to the center of choice rect.
 * <FgImg MidRight: filename>     Creates a foreground image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <FgImg UpperLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <FgImg UpperCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <FgImg UpperRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <FgImg: filename> text code variants, unlike the background
 * variant, the foreground image will not overscale past its original size.
 * Instead, it will maintain its original size or be smaller, so long as it can
 * be scaled to exist within the choice rectangle unless it is intended to be
 * stretched by using the <FgImg: filename> variant.
 * 
 * *Note:* Text is then written on top of the foreground image.
 * 
 * *Note:* Each choice can only have one foreground image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the foreground will appear behind the select cursor.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 * 
 * === Random Text Pool ===
 * 
 * <RNG> text1 | text2 | text3 </RNG>
 * 
 * Using the above text code format in a Show Message entry, you can get a
 * random result out of the various inserted texts. Use "|" (without quotes) as
 * a separator between text entries. You can have unlimited entries. The result
 * will have any excess white space trimmed.
 * 
 * This text code cannot be inserted into a macro and parsed properly.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * Note: These text codes only work with the Message Window. Keep in mind that
 *   even if some windows might look like the Message Window, it may not
 *   necessarily be one.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 * 
 * Choices: Distance
 * - Change the distance from choice window to the message window.
 * 
 *   Distance:
 *   - Change distance between the choice and message windows.
 *   - Default distance is 0.
 *   - Use negative to center align with remaining space.
 * 
 * ---
 *
 * Choices: Properties
 * - Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 * 
 *   Minimum Choice Width:
 *   - What is the minimum width size for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Select Plugin Commands ===
 * 
 * ---
 * 
 * Select: Weapon
 * - Opens the Event Select Item Window to let the player pick a weapon to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected weapon.
 *   - It will result in 0 otherwise.
 * 
 *   Weapon Type ID:
 *   - Reduce all the weapons to a specific weapon type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Armor
 * - Opens the Event Select Item Window to let the player pick an armor to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected armor.
 *   - It will result in 0 otherwise.
 * 
 *   Armor Type ID:
 *   - Reduce all the armors to a specific armor type.
 *   - Leave at 0 to not use filters.
 * 
 *   Equip Type ID:
 *   - Reduce all the armors to a specific equip type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Skill
 * - Opens the Event Select Item Window to let the player pick a skill to
 *   choose from.
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Can be opened while the Message Window is open.
 * - Skills will not be listed if they are hidden by the actor.
 * - Skills will not be listed if the actor lacks access to their Skill Type.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected skill.
 *   - It will result in 0 otherwise.
 * 
 *   Actor ID:
 *   - Select an actor to get the skill list from.
 *   - Use 0 to select from the party leader.
 * 
 *   Skill Type ID:
 *   - Reduce all the skills to a specific skill type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 * 
 *   Each Message Start:
 *   Each Message End:
 *   - This is text that is added at the start/end of each message.
 *   - You may use text codes.
 *   - Keep in mind that if a message extends to a different page (due to word
 *     wrap, excess lines, etc), that does not mean the starting text will
 *     be added to where the next page begins or the ending text will be added
 *     where the previous page ends.
 *   - Can be used for things like adding "<center>" to the start of each 
 *     message without having to type it every time.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 * 
 *   Minimum Choice Width:
 *   - What is the minimum choice width for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Font Manager
 * ============================================================================
 *
 * Custom fonts that aren't the message or number fonts cannot be used without
 * registration. If you try to use custom fonts in RPG Maker MZ without
 * registering their font family first, you will find out that they will not
 * work. These plugin parameters allow you to register your game's custom fonts
 * here.
 * 
 * ---
 * 
 * Settings:
 * 
 *   Font Family:
 *   - This will be what's used by RPG Maker MZ and plugins to reference this
 *     specific font.
 *   - NO filename extensions!
 * 
 *   Filename:
 *   - What is the filename of the custom font you would like to use?
 *   - Located inside the project's "fonts" folder.
 * 
 * ---
 * 
 * Examples:
 * 
 *   Font Family: WildWords
 *   Filename: WildWords-Regular.ttf
 * 
 * How you would use this in other plugins as a preface to the font face or
 * font family would be to use "WildWords" as the font face/family name. Then
 * RPG Maker MZ will use its own innate FontManager to refer that to the
 * "WildWords-Regular.ttf" file found in the game's "fonts" folder.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Language Settings
 * ============================================================================
 *
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * See the "Text Language Information" for more information.
 *
 * ---
 * 
 * Main Settings:
 * 
 *   Enable Switching?:
 *   - Enable language switching settings for this plugin?
 * 
 *   File Type:
 *   - Which file type do you wish to use?
 *     - CSV (Legacy)
 *     - TSV (Recommended)
 * 
 *   CSV Filename:
 *   - What is the filename of the CSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 *   TSV Filename:
 *   - What is the filename of the TSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 * ---
 * 
 * Options:
 * 
 *   Add Option?:
 *   - Add the 'Text Language' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 * 
 * ---
 * 
 * Languages:
 * 
 *   Default Language:
 *   - What is the default language used for this game?
 * 
 *   Supported Languages:
 *   - What are all the supported languages supported by this game's
 *     script?
 *   - Remove any that aren't translated.
 * 
 * ---
 * 
 * Language Names:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - How does this language appear in the in-game options?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Language Fonts
 * ============================================================================
 *
 * Different default fonts used for different languages. This allows different
 * stylistic choices to be made for different languages in case the current
 * font you're using doesn't have support for other language types.
 * 
 * Keep in mind that players can override this with Options Core if they select
 * a text option other than 'Default' for the 'Text Font' option.
 * 
 * Make sure any new custom fonts used for different languages are registered
 * with the 'Custom Font Manager' found in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * Languages:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - What font face is used for this language?
 *   - Make sure it is registered under Custom Font Manager.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Language Images
 * ============================================================================
 *
 * Allows different images to be used when different languages are used. This
 * is for images that have text on it that you want to appear in different
 * languages based on the text language selected by the player.
 * 
 * There are two ways this works:
 * 
 *   #1: Folder Name
 *   - The name of the folder containing those images will be named something
 *     like "Scrolls[XX]"
 *   - When a different language is picked, like English, it can reference
 *     the 'Scrolls[EN]' folder instead. If Japanese is used, it can refer to
 *     the 'Scrolls[JP]' folder as well.
 *   - The text used to replace the [XX] in the folder name can be determined
 *     in the Plugin Parameters.
 *     - Make sure you change the settings for each language you wish to use to
 *       have translated images for.
 * 
 *   #2: Filename
 *   - The filename of the image to be translated can be named something like
 *     ReidProfile[XX].png
 *   - When a different language is picked, like English, it will reference the
 *     'ReidProfile[EN].png' image instead. For Japanese, it will reference the
 *     'ReidProfile[JP].png' as well.
 *   - The text used to replace the [XX] in the filename can be determined in
 *     the Plugin Parameters.
 *     - Make sure you change the settings for each language you wish to use to
 *       have translated images for.
 *
 * ---
 * 
 * Settings
 * 
 *   Convert Default?
 *   - ON: Default language uses converted marker.
 *   - OFF: Default languages uses [XX] as marker.
 * 
 * Here's an explanation of what this does:
 * 
 *   - The default language picked is English and the player has English picked
 *     as their desired language.
 *   - If the "Convert Default?" Plugin Parameter is ON, then 'ReidProfile[XX]'
 *     will reference and look for the 'ReidProfile[EN]' image.
 *   - If the "Convert Default?" Plugin Parameter is OFF, 'ReidProfile[XX]' is
 *     then used for the English language instead of 'ReidProfile[EN]'.
 *     - This is to avoid duplicate images and save on file space.
 *   - The reasoning behind the [XX] is that there needs to be an anchor image
 *     used for the RPG Maker MZ client in order to have something to reference
 *     before branching out to different languages.
 * 
 * ---
 * 
 * Languages 
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - This text will replace [XX] with in image folder names and filenames
 *     when this language is selected.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces.
 * 
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 * 
 * As of the v1.44 update, some Asian languages such as Chinese and Japanese
 * are now supported for word wrap. Korean language is only supported if spaces
 * are used.
 * 
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.54: May 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where the text width of translated text was not taken into
 *    account. Fix made by Arisu
 * 
 * Version 1.53: February 20, 2025, 2025
 * * Bug Fixes!
 * ** Fixed an error with text language translations not working properly for
 *    the last listed language in the translation sheet. Fix made by Irina.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Text Language Information section included for TSV.
 * ** Updated text code note for \picture<x> and \CenterPicture<x>
 * *** As of the version 1.53 update, the Help Window now supports both of
 *     these text codes. However, we still recommend using icons over using
 *     pictures as there will be loading delays.
 * * Plugin Parameters
 * ** New plugin parameters added by Irina:
 * *** Parameters > Text Language Settings > File Type:
 * **** Which file type do you wish to use?
 * ***** CSV (Legacy)
 * ***** TSV (Recommended)
 * *** Parameters > Text Language Settings > TSV Filename
 * **** What is the filename of the TSV file to read from?
 * **** Located within the project's /data/ folder.
 * * Feature Updates!
 * ** We have done our research and decided that CSV's are too restricted to
 *    use due to their default nature of wanting to use commas as separators.
 *    Thus, we've decided to switch to TSV where the default separator is a tab
 *    space, something that is almost never used in RPG Maker text.
 * ** CSV support will remain as a legacy option but TSV will be recommended as
 *    the main text languaging switching filetype.
 * ** When creating a new Language TSV, the plugin will check if a Language CSV
 *    exists and asks you if you wish to convert the existing CSV to TSV. The
 *    original CSV file will remain intact as a backup.
 * 
 * Version 1.52: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Arisu:
 * *** <left>
 * *** <center>
 * *** <right>
 * **** When used in the Map Name, instead of aligning the text which is
 *      centered by default, the text code will align the horizontal position
 *      of the name displayed on the screen.
 * *** <top>
 * *** <middle>
 * *** <bottom>
 * **** When used in the Map Name, the text code will align the vertical
 *      position of the name displayed on the screen.
 * *** <X: +n>
 * *** <X: -n>
 * *** <Y: +n>
 * *** <Y: -n>
 * **** Adjusts the horizontal/vertical position of map name by 'n' value.
 * *** All of these text codes require VisuMZ_0_CoreEngine installed and its
 *     "Map Name Text Code" plugin parameter enabled.
 * 
 * Version 1.51: October 17, 2024
 * * Bug Fixes!
 * ** Fixed a bug where \LastGainObj text code did not work with text language
 *    key codes. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added note to Text Language Information > How to Enable Switching
 * *** IMPORTANT! The separator used for the CSV file must be a semicolon (;)
 *     and not a comma (,) as to reduce the amount of punctuation conflicts.
 *     Keep this in mind as most CSV editors will default to comma (,) instead
 *     of the semicolon (;) for their separator.
 * ** Added note to Text Language Information > Naming Weapon Types, etc:
 * *** You might have noticed that if you've decided to use \tl{keyName} for
 *     weapon or other database types, other parts of the game will error out.
 *     Don't worry, for these, you don't have to change the currently used
 *     database name. Go straight to the CSV and insert in a new key for that
 *     particular database name. For example, the equip type "Accessory" will
 *     use "Accessory" as the automatic key to look for a translated phrase. If
 *     there isn't any in the CSV file, then the default database text entry
 *     will be used.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Parameters > Text Language Settings > Language Fonts
 * **** Different default fonts used for different languages. This allows
 *      different stylistic choices to be made for different languages in case
 *      the current font you're using doesn't have support for other language
 *      types.
 * **** Keep in mind that players can override this with Options Core if they
 *      select a text option other than 'Default' for the 'Text Font' option.
 * **** Make sure any new custom fonts used for different languages are
 *      registered with the 'Custom Font Manager' found in this plugin's Plugin
 *      Parameters.
 * *** Parameters > Text Language Settings > Language Images
 * **** Allows different images to be used when different languages are used.
 *      This is for images that have text on it that you want to appear in
 *      different languages based on the text language selected by the player.
 * 
 * Version 1.50: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina:
 * *** <Caps> </Caps>
 * *** <Upper> </Upper>
 * *** <Lower> </Lower>
 * **** Auto-text case textcodes will automatically adjust text inserted
 *      between them to respectively be completely capitalized, first-letter
 *      capitalized, or completely lowercase.
 * **** More information in the help file.
 * *** <Alt> </Alt>
 * **** Alternates between uppercase and lowercase for letters.
 * *** <Chaos> </Chaos>
 * **** Randomly uses uppercase and lowercase for letters.
 * 
 * 
 * Version 1.49: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem where using text codes to get database object names did
 *    not apply translated text.
 * * Documentation Update!
 * ** Added note for Message Window Only text code effects:
 * *** These text codes only work with the Message Window. Keep in mind that
 *     even if some windows might look like the Message Window, it may not
 *     necessarily be one.
 * * Feature Update!
 * ** Added a failsafe for when Choice List Window doesn't have any viable
 *    options (due to being hidden or disabled). Update made by Irina.
 * ** Added a failsafe for Language CSV when empty rows are added.
 * ** Updated some default Text Code actions in order to make sure they're only
 *    used by the Message Window and not anything else. Update made by Irina.
 * 
 * Version 1.48: April 18, 2024
 * * Bug Fixes!
 * ** Added fail safe for help description checks parsing from objects without
 *    help descriptions normally. Fix made by Irina.
 * 
 * Version 1.47: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Custom Font Manager
 * **** Register custom fonts here.
 * **** Custom fonts that aren't the message or number fonts cannot be used
 *      without registration.
 * **** See help file for more information.
 * 
 * Version 1.46: January 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where script calls used to create message choices would not
 *    work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Text Language Switching added by Irina:
 * *** Plugin Parameters > Text Language Settings
 * **** The "Text Language" feature allows your players to switch between
 *      different languages for your game to allow people from around the globe
 *      to enjoy what story you have to tell.
 * **** Disclaimers: This is not an automatic translation tool. Translations
 *      made through the "Text Language" feature of the VisuStella MZ Message
 *      Core will require manual input by the game developer.
 * **** Read more about it in detail within the "Text Language Information"
 *      section in the help file.
 * ** New Plugin Parameter added by Irina:
 * *** Choices: Distance
 * **** Change the distance from choice window to the message window.
 * ** New parameter added to Plugin Command "Choices: Properties" by Irina:
 * *** Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Plugin Parameter for "Message Window" added by Irina:
 * *** Parameters > Message Window: Choice List Window> Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Text Codes for Choice Window added by Irina:
 * *** <BgImg: filename> and variants
 * *** <FgImg: filename> and variants
 * **** These text codes allow adding a background or foreground image to a
 *      choice rectangle in stretched/scaled size.
 * 
 * Version 1.45: December 14, 2023
 * * Bug Fixes!
 * ** Punctuation was, for some reason, excluded when using Wordwrap with
 *    Japanese and Chinese languages. This should be fixed now. Fixed by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added clarity to the <left>, <center>, and <right> being unable to be
 *    used together with word wrap.
 * *** Word Wrap also cannot be used together with <left>, <center>, or <right>
 *     and will disable itself if text alignment text codes are detected.
 * * Feature Update!
 * ** Wordwrap <br> now works properly with Japanese and Chinese languages.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > General Settings > Each Message Start
 * *** Plugin Parameters > General Settings > Each Message End
 * **** This is text that is added at the start/end of each message.
 * **** Keep in mind that if a message extends to a different page (due to word
 *      wrap, excess lines, etc), that does not mean the starting text will
 *      be added to where the next page begins or the ending text will be added
 *      where the previous page ends.
 * **** Can be used for things like adding "<center>" to the start of each 
 *      message without having to type it every time.
 * 
 * Version 1.44: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "Plugin Parameters: Word Wrap Settings" section:
 * *** As of the v1.44 update, some Asian languages such as Chinese and
 *     Japanese are now supported for word wrap. Korean language is only
 *     supported if spaces are used.
 * * Feature Update!
 * ** Word Wrap is now supported for Japanese and Chinese languages.
 * ** Feature updated by Irina and sponsored by AndyL.
 * * New Features!
 * ** New text codes added by Irina for "Show Choices" event command.
 * *** <Shuffle>
 * **** Shuffles the order of all choices. Any cancel shortcuts other than
 *      "Branch" will be undone.
 * *** <Shuffle: x>
 * **** Shuffles the order of all choices and only x number of them appear. Any
 *      cancel shortcuts other than "Branch" will be undone. Hidden choices do
 *      not count towards x number.
 * 
 * Version 1.43: April 13, 2023
 * * Compatibility Update!
 * ** Fixed incompatibilities with auto message positioning with the Map Zoom
 *    plugin. Update made by Irina.
 * 
 * Version 1.42: March 16, 2023
 * * Bug Fixes!
 * ** Fixed some text codes that would capture way too much data than intended.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text code added by Irina for Show Choice Window only:
 * *** <Help> text </Help>
 * **** Makes a help window appear and have it show 'text' in its contents.
 * **** The help window will disappear if no text is displayed.
 * ** New Plugin Commands added by Arisu:
 * *** Select: Weapon
 * *** Select: Armor
 * *** Select: Skill
 * **** Opens the Event Select Item Window to let the player pick a weapon,
 *      armor, or skill to choose from. The selected object will have its ID
 *      recorded in a variable. These can be opened while the Message Window is
 *      opened just like the event "Select Item".
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina!
 * *** For the Choice Window Only text codes:
 * **** <BgColor: x>
 * **** <BgColor: x, y>
 * **** <BgColor: #rrggbb>
 * **** <BgColor: #rrggbb, #rrggbb>
 * ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
 *       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
 *       hex color values.
 * 
 * Version 1.40: November 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New text code added by Irina:
 * *** <RNG> text1 | text2 | text3 </RNG>
 * **** Using the above text code format in a Show Message entry, you can get a
 *      random result out of the various inserted texts. Use "|" (without
 *      quotes) as a separator between text entries. You can have unlimited
 *      entries. The result will have any excess white space trimmed.
 * **** This text code cannot be inserted into a macro and parsed properly.
 * 
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
 * 
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Choice
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowDistance
 * @text Choices: Distance
 * @desc Change the distance from choice window to the message window.
 *
 * @arg Distance:eval
 * @text Distance
 * @desc Change distance between the choice and message windows.
 * Default distance is 0. Use negative to center align.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Choice Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MinWidth:num
 * @text Minimum Choice Width
 * @type number
 * @min 0
 * @desc What is the minimum width size for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Select
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectWeapon
 * @text Select: Weapon
 * @desc Opens the Event Select Item Window to let the player
 * pick a weapon to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected weapon. It will result in 0 otherwise.
 * @default 1
 *
 * @arg WeaponTypeID:num
 * @text Weapon Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the weapons to a specific weapon type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectArmor
 * @text Select: Armor
 * @desc Opens the Event Select Item Window to let the player
 * pick an armor to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected armor. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ArmorTypeID:num
 * @text Armor Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific armor type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @arg EquipTypeID:num
 * @text Equip Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific equip type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectSkill
 * @text Select: Skill
 * @desc Opens the Event Select Item Window to let the player
 * pick a skill to choose from. Requires VisuMZ_1_SkillsStatesCore!
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected skill. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select an actor to get the skill list from.
 * Use 0 to select from the party leader.
 * @default 0
 *
 * @arg SkillTypeID:num
 * @text Skill Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the skills to a specific skill type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
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
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param CustomFonts:arraystruct
 * @text Custom Font Manager
 * @type struct<CustomFont>[]
 * @desc Register custom fonts here. Custom fonts that aren't the
 * message or number fonts cannot be used without this.
 * @default []
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = data[0].trim();\\\\n        const index = parseInt(data[1] || '0');\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = $gameMessage.faceName();\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing && this.constructor === Window_Message) {\\\\n        this.setTextDelay(delay);\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"heart\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"3\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjIcon\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectIcon();\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * Format style: [MacroName]
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param Localization:struct
 * @text Text Language Settings
 * @type struct<Localization>
 * @desc Text Language settings for this plugin.
 * @default {"Main":"","Enable:eval":"false","CsvFilename:str":"Languages.csv","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Language","Localized":"","DefaultLocale:str":"English","Languages:arraystr":"[\"Bengali\",\"Chinese(Simplified)\",\"Chinese(Traditional)\",\"Czech\",\"Danish\",\"Dutch\",\"English\",\"Finnish\",\"French\",\"German\",\"Greek\",\"Hindi\",\"Hungarian\",\"Indonesian\",\"Italian\",\"Japanese\",\"Korean\",\"Norwegian\",\"Polish\",\"Portuguese\",\"Romanian\",\"Russian\",\"Slovak\",\"Spanish\",\"Swedish\",\"Tamil\",\"Thai\",\"Turkish\"]","LangNames":"","Bengali:str":"বাংলা","Chinese(Simplified):str":"简体中文","Chinese(Traditional):str":"繁體中文","Czech:str":"Čeština","Danish:str":"Dansk","Dutch:str":"Nederlands","English:str":"English","Finnish:str":"Suomi","French:str":"Français","German:str":"Deutsch","Greek:str":"Ελληνικά","Hindi:str":"हिन्दी","Hungarian:str":"Magyar","Indonesian:str":"Bahasa Indo","Italian:str":"Italiano","Japanese:str":"日本語","Korean:str":"한국어","Norwegian:str":"Norsk","Polish:str":"Polski","Portuguese:str":"Português","Romanian:str":"Română","Russian:str":"Русский","Slovak:str":"Slovenčina","Spanish:str":"Español","Swedish:str":"Svenska","Tamil:str":"தமிழ்","Thai:str":"ไทย","Turkish:str":"Türkçe"}
 *
 * @param LanguageFonts:struct
 * @text Language Fonts
 * @parent Localization:struct
 * @type struct<LanguageFonts>
 * @desc Different default fonts used for different languages.
 * Players can override this with Options Core.
 * @default {"Bengali:str":"rmmz-mainfont","Chinese(Simplified):str":"rmmz-mainfont","Chinese(Traditional):str":"rmmz-mainfont","Czech:str":"rmmz-mainfont","Danish:str":"rmmz-mainfont","Dutch:str":"rmmz-mainfont","English:str":"rmmz-mainfont","Finnish:str":"rmmz-mainfont","French:str":"rmmz-mainfont","German:str":"rmmz-mainfont","Greek:str":"rmmz-mainfont","Hindi:str":"rmmz-mainfont","Hungarian:str":"rmmz-mainfont","Indonesian:str":"rmmz-mainfont","Italian:str":"rmmz-mainfont","Japanese:str":"rmmz-mainfont","Korean:str":"rmmz-mainfont","Norwegian:str":"rmmz-mainfont","Polish:str":"rmmz-mainfont","Portuguese:str":"rmmz-mainfont","Romanian:str":"rmmz-mainfont","Russian:str":"rmmz-mainfont","Slovak:str":"rmmz-mainfont","Spanish:str":"rmmz-mainfont","Swedish:str":"rmmz-mainfont","Tamil:str":"rmmz-mainfont","Thai:str":"rmmz-mainfont","Turkish:str":"rmmz-mainfont"}
 *
 * @param LanguageImages:struct
 * @text Language Images
 * @parent Localization:struct
 * @type struct<LanguageImages>
 * @desc Allows different images to be used when different
 * languages are used. See help for more information.
 * @default {"ConvertDefault:eval":"false","Languages":"","Bengali:str":"[XX]","Chinese(Simplified):str":"[XX]","Chinese(Traditional):str":"[XX]","Czech:str":"[XX]","Danish:str":"[XX]","Dutch:str":"[XX]","English:str":"[XX]","Finnish:str":"[XX]","French:str":"[XX]","German:str":"[XX]","Greek:str":"[XX]","Hindi:str":"[XX]","Hungarian:str":"[XX]","Indonesian:str":"[XX]","Italian:str":"[XX]","Japanese:str":"[XX]","Korean:str":"[XX]","Norwegian:str":"[XX]","Polish:str":"[XX]","Portuguese:str":"[XX]","Romanian:str":"[XX]","Russian:str":"[XX]","Slovak:str":"[XX]","Spanish:str":"[XX]","Swedish:str":"[XX]","Tamil:str":"[XX]","Thai:str":"[XX]","Turkish:str":"[XX]"}
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param EachMessageStart:json
 * @text Each Message Start
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the start of each message.
 * You may use text codes.
 * @default ""
 *
 * @param EachMessageEnd:json
 * @text Each Message End
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the end of each message.
 * You may use text codes.
 * @default ""
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMinWidth:num
 * @text Minimum Choice Width
 * @parent ChoiceListWindow
 * @type number
 * @min 0
 * @desc What is the minimum choice width for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default rmmz-mainfont
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Font Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomFont:
 *
 * @param FontFamily:str
 * @text Font Family
 * @desc This will be what's used by RPG Maker MZ and plugins to
 * reference this specific font. NO filename extensions!
 * @default Unnamed
 *
 * @param Filename:str
 * @text Filename
 * @desc What is the filename of the font you would like to use?
 * Located inside the project's "fonts" folder.
 * @default Unnamed.ttf
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Localization Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Localization:
 *
 * @param Main
 * @text Main Settings
 *
 * @param Enable:eval
 * @text Enable Switching?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable language switching settings for this plugin?
 * @default false
 *
 * @param LangFiletype:str
 * @text File Type
 * @parent Main
 * @type select
 * @option CSV (Legacy)
 * @value csv
 * @option TSV (Recommended)
 * @value tsv
 * @desc Which file type do you wish to use?
 * @default tsv
 *
 * @param CsvFilename:str
 * @text CSV Filename
 * @parent Main
 * @desc What is the filename of the CSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.csv
 *
 * @param TsvFilename:str
 * @text TSV Filename
 * @parent Main
 * @desc What is the filename of the TSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.tsv
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Language' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Text Language
 *
 * @param Localized
 * @text Languages
 *
 * @param DefaultLocale:str
 * @text Default Language
 * @parent Localized
 * @type select
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What is the default language used for this game?
 * @default English
 *
 * @param Languages:arraystr
 * @text Supported Languages
 * @parent Localized
 * @type select[]
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What are all the supported languages supported by this
 * game's script? Remove any that aren't translated.
 * @default ["Bengali","Chinese(Simplified)","Chinese(Traditional)","Czech","Danish","Dutch","English","Finnish","French","German","Greek","Hindi","Hungarian","Indonesian","Italian","Japanese","Korean","Norwegian","Polish","Portuguese","Romanian","Russian","Slovak","Spanish","Swedish","Tamil","Thai","Turkish"]
 *
 * @param LangNames
 * @text Language Names
 *
 * @param Bengali:str
 * @text Bengali
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default বাংলা
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 简体中文
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 繁體中文
 * 
 * @param Czech:str
 * @text Czech
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Čeština
 * 
 * @param Danish:str
 * @text Danish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Dansk
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Nederlands
 * 
 * @param English:str
 * @text English
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default English
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Suomi
 * 
 * @param French:str
 * @text French
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Français
 * 
 * @param German:str
 * @text German
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Deutsch
 * 
 * @param Greek:str
 * @text Greek
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Ελληνικά
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default हिन्दी
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Magyar
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Bahasa Indo
 * 
 * @param Italian:str
 * @text Italian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Italiano
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 日本語
 * 
 * @param Korean:str
 * @text Korean
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 한국어
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Norsk
 * 
 * @param Polish:str
 * @text Polish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Polski
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Português
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Română
 * 
 * @param Russian:str
 * @text Russian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Русский
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Slovenčina
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Español
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Svenska
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default தமிழ்
 * 
 * @param Thai:str
 * @text Thai
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default ไทย
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Türkçe
 *
 */
/* ----------------------------------------------------------------------------
 * Language Fonts Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LanguageFonts:
 *
 * @param Bengali:str
 * @text Bengali
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Czech:str
 * @text Czech
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Danish:str
 * @text Danish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Dutch:str
 * @text Dutch
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param English:str
 * @text English
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Finnish:str
 * @text Finnish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param French:str
 * @text French
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param German:str
 * @text German
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Greek:str
 * @text Greek
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Hindi:str
 * @text Hindi
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Italian:str
 * @text Italian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Japanese:str
 * @text Japanese
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Korean:str
 * @text Korean
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Polish:str
 * @text Polish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Romanian:str
 * @text Romanian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Russian:str
 * @text Russian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Slovak:str
 * @text Slovak
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Spanish:str
 * @text Spanish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Swedish:str
 * @text Swedish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Tamil:str
 * @text Tamil
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Thai:str
 * @text Thai
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Turkish:str
 * @text Turkish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 *
 */
/* ----------------------------------------------------------------------------
 * Language Images Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LanguageImages:
 *
 * @param ConvertDefault:eval
 * @text Convert Default?
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc ON: Default language uses converted marker.
 * OFF: Default languages uses [XX] as marker.
 * @default false
 *
 * @param Languages
 * @text Languages
 *
 * @param Bengali:str
 * @text Bengali
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Czech:str
 * @text Czech
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Danish:str
 * @text Danish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param English:str
 * @text English
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param French:str
 * @text French
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param German:str
 * @text German
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Greek:str
 * @text Greek
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Italian:str
 * @text Italian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Korean:str
 * @text Korean
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Polish:str
 * @text Polish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Russian:str
 * @text Russian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Thai:str
 * @text Thai
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x3fecc6=_0x12b6;(function(_0x48d3a1,_0x448652){const _0x3a4f05=_0x12b6,_0x5df32c=_0x48d3a1();while(!![]){try{const _0x4c7106=parseInt(_0x3a4f05(0x375))/0x1*(parseInt(_0x3a4f05(0x3b4))/0x2)+parseInt(_0x3a4f05(0x439))/0x3*(parseInt(_0x3a4f05(0x53c))/0x4)+parseInt(_0x3a4f05(0x304))/0x5+parseInt(_0x3a4f05(0x550))/0x6*(-parseInt(_0x3a4f05(0x393))/0x7)+parseInt(_0x3a4f05(0x3f7))/0x8+-parseInt(_0x3a4f05(0x186))/0x9+-parseInt(_0x3a4f05(0x4ce))/0xa*(parseInt(_0x3a4f05(0x196))/0xb);if(_0x4c7106===_0x448652)break;else _0x5df32c['push'](_0x5df32c['shift']());}catch(_0x2f6e8a){_0x5df32c['push'](_0x5df32c['shift']());}}}(_0x4335,0x4f1eb));var label='MessageCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3fecc6(0x3c1)](function(_0x15c70a){const _0x2b15f0=_0x3fecc6;return _0x15c70a[_0x2b15f0(0x3e8)]&&_0x15c70a[_0x2b15f0(0x318)]['includes']('['+label+']');})[0x0];function _0x4335(){const _0x5908fc=['</WORDWRAP>','convertCsvToTsvFile','_pictures','<B>','Window_Base_update','application/%1','\x1bi[%1]%2','(((','\x1bCOLORLOCK[0]','textColor','drawTextEx','\x1bWrapJpBreak[0]','processControlCharacter','वाह','_textDelayCount','MsgWindowOffsetY','prepareShowTextFollowups','Would\x20you\x20like\x20the\x20plugin\x20to\x20create\x20the\x20base\x20%1\x20file?\x0a\x0a','onChoice','yes','status','\x1bTEXTALIGNMENT','ChoiceWindowLineHeight','changeVisuMzTextLocale','PictureTextChange','_pictureTextBuffer','width','VisuMZ_3_ActSeqCamera','split','Turkish','battleActionName','addContinuousShowChoices','pagedown','makeSkillList','moveTo','1651176FwVUPb','down','Type','down-left','ParseSkillNotetags','\x1bWrapBreak[0]','isOpen','faceWidth','French','setupEvents','ParseStateNotetags','drawText','getColor','TextJS','MessageRows','isInputting','Farewell','Vay','moveBy','Guau','CommonEvent','</COLORLOCK>','General','onLocalizationXhrError','isRTL','battle\x20actor','itemRectWithPadding','Window_Base_textSizeEx','EndPadding','#6dcff6','databaseObjectName','fontSize','down\x20right','realPictureId','Japanese','partyMemberName','outlineColor','_lastPluginCommandInterpreter','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','middlecenter','isClosing','updateEvents','Window_Options_isVolumeSymbol','up-right','helpWordWrap','_choiceListWindow','follower','CheckCompatibility','remove','isPressed','autoPositionOffsetY','fontItalic','process_VisuMZ_MessageCore_TextCodes_Replace','Window_Message_updatePlacement','clearFlags','\x1bITALIC[1]','bind','processTextAlignmentChange','parse','COLORLOCK','obtainEscapeString','getPictureTextBuffer','toLowerCase','height','left','Window_Base_changeTextColor','374211XLyxWY','_moveTargetWidth','isSceneBattle','drawSkillCost','Window_ChoiceList_callCancelHandler','length','ARRAYSTRUCT','_autoPosRegExp','Game_Party_gainItem','center','_maxShuffleChoices','Window_Message_processEscapeCharacter','up-left','updateAutoSizePosition','maxLines','convertButtonAssistEscapeCharacters','setupShuffleChoices','Window_Base_initialize','upper\x20right','ওহে','Game_Map_updateEvents','GET','setWeaponChoice','getLocalizedText','_autoSizeRegexp','drawTextTopAligned','Wow','Press\x20Cancel\x20to\x20create\x20new\x20TSV.','scale','battleTargetName','CSV','changeTextSpeed','Bitmap_drawTextTopAligned','getChoiceListMaxColumns','Game_System_initialize','code','ChoiceWindowMaxRows','createLocalizationCsvFile','downcenter','updateBitmap','clearRect','Halo','getMessageWindowWidth','SkillTypeID','resetRect','CreateAutoColorRegExpListEntries','trim','Width','choiceListHelpWindowRect','%1\x20file\x20has\x20not\x20been\x20made.\x0a','MessageCore','loadCustomFontsMessageCore','paintOpacity','안녕히\x20가세요','_lastAltCase','convertNewPageTextStateMacros','index','clear','isVolumeSymbol','Hűha','itemChoiceEtypeId','members','_pictureTextWindow','writeFileSync','German','Game_Interpreter_PluginCommand','setLastPluginCommandInterpreter','setBackground','_texts','calcWindowHeight','isWeapon','choiceDistance','equipSlots','textSpeed','_choiceIndexArray','erasePictureTextBuffer','Hello','checkConvertCsvToTsv','Adiós','\x1bCASING[0]','_choices','push','NUM','updateTransform','Window_Options_changeVolume','Hallo','_forcedPosition','_textCasing','processCharacter','</LEFT>','startX','applyMoveEasing','requestPictureTextRefresh','replace','setChoiceListTextAlign','match','ARRAYEVAL','clearPictureTextRefresh','Hei','setMessageWindowWidth','processTextAlignmentX','right','setupChoices','statusText','clearPictures','drawBackground','TSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.','getMessageWindowXyOffsets','VisuMZ_1_SkillsStatesCore','_textColorStack','isRunning','#f26c4f','maxCommands','Ha\x20det','loadMessageFace','parameters','textWidth','lowerleft','data/','obtainEscapeParam','fontFace','_centerMessageWindow','AdjustRect','maxFontSizeInLine','MessageTextDelay','processCustomWait','updateDimensions','ParseLocalizationCsv','_moveDuration','setupNumInput','Spanish','windowX','choice','VisuMZ_4_ExtraEnemyDrops','drawPictureTextZone','MessageWidth','lastGainedObjectIcon','textSpeedStatusText','fontBold','setMessageWindowXyOffsets','down-center','newPage','Window_Message_isTriggered','ARRAYSTR','adjustShowChoiceExtension','Languages','NameBoxWindowOffsetX','</B>','unnamed','130wOhxxe','Chinese(Simplified)','filename','AddAutoColor','addMessageCoreTextSpeedCommand','_messageOffsetY','drawPictureText','_textMacroFound','requestChoiceBackgroundImage','setup','_currentAutoSize','onProcessCharacter','ANY','clearChoiceHelpDescriptions','addedHeight','itemChoiceStypeId','नमस्ते','Armors','convertLockColorsEscapeCharacters','AddOption','ParseClassNotetags','HIDE','_textCasingUpperState','currentCommand','NameBoxWindowOffsetY','SWITCH','#c69c6d','Window_Help_refresh','Press\x20OK\x20to\x20convert\x20to\x20TSV.\x0a','createTsvFile','dimColor2','blue','equipTypes','WORD_WRAP_PADDING','<LEFT>','choiceCancelType','placeCancelButton','setMessageWindowRows','slice','Window_EventItem_includes','WeaponTypeID','convertMessageCoreEscapeReplacements','adjustShowChoiceCancel','isTriggered','TextSpeed','SelectSkill','activate','initTextAlignement','updatePlacement','isSkill','ConfigManager_makeData','itemChoiceAtypeId','join','anchorPictureText','Cześć','fallbackFonts','maxShuffleChoices','isColorLocked','textSizeExRaw','convertShowChoiceEscapeCodes','mainModule','Russian','_indent','_itemChoiceWtypeId','Hej','setWaitMode','getTextAlignment','STRUCT','ALL','AutoColorRegExp','addWrapBreakAfterPunctuation','_helpWindow','shift','Romanian','You\x20do\x20not\x20have\x20a\x20language\x20%1\x20set\x20up.\x0a','isOptionValid','changeOutlineColor','anyPictureTextChanges','\x1bTEXTALIGNMENT[0]','Wauw','resetFontSettings','Finnish','EachMessageEnd','lower\x20right','OffsetY','WordWrap','_eventId','updateHelp','setChoices','lower\x20center','resizePictureText','Window_NameBox_refresh','bitmap','map\x20actor','DataManager_loadDatabase','getLastPluginCommandInterpreter','LineHeight','setWordWrap','textSizeExTextAlignment','armor','updatePictureText','Match','Scene_Options_maxCommands','numVisibleRows','choiceTextAlign','convertButtonAssistText','setChoiceMessageDistance','addMessageCommonEvent','Bitmap_drawText','SelectWeapon','20PgmWbk','clearCommandList','%1\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.\x0a','updateNameBoxMove','attachPictureText','Tot\x20ziens','setPictureTextBuffer','#fff799','inBattle','MaxCols','convertBaseEscapeCharacters','onLocalizationXhrLoad','#7cc576','Portuguese','Ciao','itemBackColor2','windowPadding','Scene_Message_createChoiceListWindow','Korean','</I>','33546LbZGEW','getRandomTextFromPool','getLastGainedItemData','OffsetX','createPictureText','commandSymbol','ParseEnemyNotetags','refreshWithTextCodeSupport','LineBreakSpace','upper-center','_textAlignment','வணக்கம்','pageup','SortObjectByKeyLength','Padding','TextColor%1','getCurrentLanguage','addChoiceDistance','drawBackCenteredPicture','outputHeight','upperleft','\x1bCOLORLOCK[1]','start','isChoiceWindow','setMessageWindowWordWrap','open','Hungarian','onDatabaseLoaded','Adeus','setFaceImage','advanced','itemChoiceActorId','downleft','startWait','charAt','_relativePosition','\x5c%1','postConvertEscapeCharacters','surprise','_itemChoiceEtypeId','processStoredAutoColorChanges','measureTextWidth','VisuMZ_1_EventsMoveCore','purple','919431XqkdAh','Scene_Boot_onDatabaseLoaded','FUNC','SHOW','updateChoiceListHelpWindowPlacement','loadPicture','makeFontBigger','hasPictureText','convertHardcodedEscapeReplacements','PREVCOLOR','format','LanguageFonts','random','setPositionType','instantTextSpeed','rtl','446721LBnlnE','Farvel','textCodeCheck','exec','drawChoiceLocationImage','map\x20player','close','convertCasingEscapeCharacters','ParseWeaponNotetags','_action','ว้าว','setHelpWindow','currencyUnit','processTextCasing','Items','makeItemList','mainFontFace','message','convertTextMacros','_moveTargetHeight','preFlushTextState','BOLD','padding','processDrawCenteredPicture','isSkillHidden','FastForwardKey','processFontChangeItalic','addExtraShowChoices','getChoiceListMinChoiceWidth','upper\x20center','colSpacing','\x1bC[%1]%2\x1bPREVCOLOR[0]','CsvFilename','postFlushTextState','upperright','makeCommandList','preConvertEscapeCharacters','addWindow','CreateAutoColorFor','#ffc8e0','_dimmerSprite','menu','none','Αντίο','getPreservedFontSettings','contentsHeight','lastGainedObjectName','FontSmallerCap','registerResetRect','_target','String_format','textSizeExWordWrap','terminateMessage','Name','Game_Map_refresh','getInputButtonString','blt','preemptive','DefaultOutlineWidth','Viszontlátásra','obtainGold','Game_Screen_erasePicture','MESSAGE_CORE_PLUGIN_NAME','Window_Options_addGeneralOptions','prototype','_messagePositionReset','messageCoreWindowX','%1\x20file\x20cannot\x20be\x20created.\x0aPlease\x20enter\x20Playtest\x20mode.\x0a','processFailsafeChoice','commandName','STR','some','getChoiceListTextAlign','makeCommandListScriptCall','clamp','resetPositionX','child_process','followers','skill','levelUp','Ahoj','violet','processFsTextCode','convertChoiceMacros','_moveTargetX','confirmConvertCsvToTsv','pink','Settings','upper-left','Window_Message_synchronizeNameBox','अलविदा','_pictureTextRefresh','processDrawPicture','Good-bye','prepareShowTextPluginCommandFollowups','makeDeepCopy','choices','Window_Base_processControlCharacter','event','_itemChoiceAtypeId','ஆஹா','outputWidth','messageCoreTextSpeed','MsgWindowOffsetX','updateOverlappingY','_choiceListHelpWindow','NameBoxWindowDefaultColor','textFont','Waouh','JSON','_interpreter','middleleft','upright','lower-right','processActorNameAutoColorChanges','itemChoiceActor','getSkillTypes','Auf\x20Wiedersehen','_scene','EachMessageStart','<I>','AutoColor','Window_Message_newPage','ParseArmorNotetags','Weapons','anchor','drawItemNumber','<LINE\x20BREAK>','open\x20.\x5cdata','setChoiceListMaxRows','deactivate','Merhaba','lower\x20left','updateForcedPlacement','obtainItem','Game_Party_initialize','processEscapeCharacter','currentExt','synchronizeNameBox','isBreakShowTextCommands','Polish','drawItemContents','Thai','LangFiletype','ArmorTypeID','splice','type','_messageOffsetX','isArmor','changeVolume','Filename','floor','actorSlotName','#acacac','Uau','Chinese(Traditional)','Localization','_scriptCall','getChoiceListLineHeight','gainItem','update','Ουάου','ChoiceWindowTextAlign','value','in\x20order\x20for\x20VisuMZ_1_MessageCore\x20to\x20work.','getLanguageName','onerror','up\x20left','requestPictureTextRefreshAll','Dutch','weapon','TextStr','Unnamed.ttf','defaultColor','processAutoPosition','parseChoiceText','TextAlign','PictureTextErase','changeTextColor','returnPreservedFontSettings','getPictureTextData','battle\x20party','Window_Message_terminateMessage','AutoColorBypassList','prepareAutoSizeEscapeCharacters','isAutoColorAffected','ConvertDefault','registerCommand','getConfigValue','PICTURE','middleright','startPause','etypeId','ARRAYNUM','isMessageWindowWordWrap','%1\x20file\x20detected.\x0a','Please\x20restart\x20the\x20game.','battleUserName','down-right','textSizeEx','_itemChoiceActorId','adjustShowChoiceDefault','powerUpColor','_moveEasingType','unshift','<%1>','FontBiggerCap','itemRect','upper-right','Skills','setColorLock','La\x20revedere','load','openLocalizationFolder','CreateAutoColorRegExpLists','Szia','_itemChoiceVariableId','processPreviousColor','calcMoveEasing','ITALIC','windowWidth','map\x20party','loadBitmap','lowerright','[XX]','addLoadListener','round','quantity','canMove','callOkHandler','textCodeResult','textLocale','updateOffsetPosition','_wholeMoveDuration','_messageCommonEvents','ShuffleArray','สวัสดี','drawMessageFace','drawCustomBackgroundColor','overrideMimeType','requestChoiceForegroundImage','command357','Danish','isBusy','_lastGainedItemData','processWrapBreak','min','choiceMinWidth','item','choiceLineHeight','_autoPositionTarget','innerHeight','return\x20\x27','WRAPBREAK','CENTERPICTURE','initMessageCore','StretchDimmedBg','<CENTER>','resetWordWrap','prepareForcedPositionEscapeCharacters','clearAllPictureTexts','_pictureTextHeight','actorName','DefaultLocale','erasePicture','return\x200','PictureTextRefresh','refresh','Window_Message_needsNewPage','name','ChoiceWindowDistance','processNewLine','clampPlacementPosition','version','_choiceCancelType','_index','false','isVisuMzLocalizationEnabled','createTextState','test','setChoiceListHelpWindow','applyData','</CENTER>','Undefined','VisuMZ_4_ExtraEnemyDrops\x20needs\x20to\x20be\x20updated\x20',')))','maxChoiceWidth','up\x20right','setHelpWindowWordWrap','ChoiceWindowMinWidth','emerge','processPxTextCode','process_VisuMZ_MessageCore_TextMacros','Window_ChoiceList_windowX','every','gradientFillRect','isPlaytest','drawing','loadDatabase','iconIndex','convertMessageCoreEscapeActions','_itemChoiceItypeId','ConfigManager_applyData','processAllText','getChoiceIndent','updateXyOffsets','RelativePXPY','\x1bCASING[3]','DISABLE','_choiceHelpDescriptions','leader','prepareWordWrapEscapeCharacters','createContents','Zbohom','isWordWrapEnabled','powerDownColor','setLastGainedItemData','Sprite_Picture_update','<COLORLOCK>','Enable','_spriteset','Window_Base_processNewLine','_textDelay','isCommandEnabled','white','makeFontSmaller','Actors','MessageWindow','messageCoreLocalization','ceil','centered','text','contents','Salut','drawBackPicture','buffer','\x1bTEXTALIGNMENT[1]','setChoiceListMaxColumns','processFontChangeBold','VariableID','setRelativePosition','addMessageCoreLocalizationCommand','prepareShowTextCommand','lower-left','processAutoColorWords','visuMzTextLocaleStatusText','_messageWindow','launchMessageCommonEvent','Game_Map_initialize','constructor','_wordWrap','ParseItemNotetags','こんにちは','processColorLock','さようなら','NonSupportedTextCodes','resetTextColor','_autoSizeCheck','MaxRows','VisuMZ_0_CoreEngine','<WORDWRAP>','updateRelativePosition','messageRows','itemHeight','UNDEFINED!','ChoiceWindowProperties','1792140DcBLWC','Bitmap_measureTextWidth','choiceAlignText','isChoiceEnabled','setChoiceListLineHeight','substring','Näkemiin','Привет','Languages.tsv','Enemies','TextManager_message','Window_ItemList_drawItemNumber','messageWordWrap','convertFontSettingsEscapeCharacters','Window_Base_processAllText','processMessageCoreEscapeActions','বিদায়','getChoiceListMaxRows','Window_NameBox_updatePlacement','setTextDelay','description','States','\x1bCASING[5]','_colorLock','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','log','reduce','getPictureText','Вау','messageWidth','Swedish','updateAutoPosition','registerSelfEvent','isHelpWindowWordWrap','getMessageWindowRows','হ্যালো','toUpperCase','<RIGHT>','applyDatabaseAutoColor','itemChoiceWtypeId','setPictureText','faceName','_pictureTextCache','stringify','startY','Hola','choicePositionType','setSkillChoice','_pictureText','list','registerActorNameAutoColorChanges','Window_Command_addCommand','getStartingChoiceWidth','_list','loadLocalization','wtypeId','onload','addedWidth','Default','onNewPageMessageCore','innerWidth','actor','_pictureTextWidth','CustomFonts','lineHeight','Game_Map_setupEvents','choiceRows','TextCodeReplace','Sprite_Picture_updateBitmap','TextMacros','TsvFilename','autoPositionOffsetX','_autoColorActorNames','Arrivederci','setTextAlignment','addCommand','ActorID','choiceIndexArray','_MessageCoreSettings','path','setChoiceListMinChoiceWidth','exit','Window_Base_processEscapeCharacter','midright','call','getChoiceMessageDistance','visible','nextEventCode','Window_ChoiceList_updatePlacement','createChoiceListWindow','Bonjour','Selamat\x20tinggal','Do\x20widzenia','gray','max','switchOutTextForLocalization','_cancelButton','indexOf','Hejdå','substr','பிரியாவிடை','crisis','isChoiceVisible','makeCommandListShuffle','convertBackslashCharacters','\x1bTEXTALIGNMENT[3]','TextCodeActions','LocalizationType','upcenter','Distance','_moveTargetY','hide','maxCols','375086LgaLwi','messageWindowRect','easeIn','processPyTextCode','applyChoiceHelpDescriptions','<BR>','normalColor','isContinuePrepareShowTextCommands','Game_System_mainFontFace','Languages.csv','lastGainedObjectQuantity','boxHeight','_macroBypassWordWrap','Scene_Boot_loadGameFonts','eraseAllPictureTexts','_nameBoxWindow','contentsBack','itemChoiceItypeId','clearActorNameAutoColor','SelectArmor','map\x20event','tsv','_pictureTextSprite','#a186be','\x1bi[%1]','makeData','convertTextAlignmentEscapeCharacters','process_VisuMZ_MessageCore_AutoColor','changeValue','[0]','763mUfSEK','csv','parseLocalizedText','SplitJpCnCharacters','processAutoSize','itemBackColor1','apply','lowercenter','ConvertTextAutoColorRegExpFriendly','changeChoiceBackgroundColor','Classes','ImageManager_loadBitmap','ConvertParams','boxWidth','convertVariableEscapeCharacters','_resetRect','isSceneMap','map','updateMove','process_VisuMZ_MessageCore_TextCodes_Action','zoomScale','systemColor','Window_ChoiceList','skills','indent','down\x20left','refreshDimmerBitmap','English','Au\x20revoir','flushTextState','send','_pictureId','addContinuousShowTextCommands','2luxzaD','initialize','openness','randomInt','orange','TEXTALIGNMENT','updateMessageCommonEvents','choiceCols','victory','default','addMessageCoreCommands','loadGameFonts','EquipTypeID','filter','red','TightWrap','battle\x20enemy','MessageWindowXyOffsets','includes','setupItemChoice','stretchDimmerSprite','WAIT','ParseAddedText','mainFontSize','_itemChoiceStypeId','\x1bTEXTALIGNMENT[2]','setText','setArmorChoice','displayName','processCommonEvent','_commonEventId','Greek'];_0x4335=function(){return _0x5908fc;};return _0x4335();}function _0x12b6(_0x2351c4,_0x577681){const _0x4335ca=_0x4335();return _0x12b6=function(_0x12b676,_0x5b0051){_0x12b676=_0x12b676-0x184;let _0x99bc65=_0x4335ca[_0x12b676];return _0x99bc65;},_0x12b6(_0x2351c4,_0x577681);}VisuMZ[label]['Settings']=VisuMZ[label][_0x3fecc6(0x1ed)]||{},VisuMZ[_0x3fecc6(0x39f)]=function(_0x574053,_0x58ada5){const _0x402991=_0x3fecc6;for(const _0x4cee77 in _0x58ada5){if(_0x4cee77[_0x402991(0x498)](/(.*):(.*)/i)){const _0x43fad6=String(RegExp['$1']),_0x2f09f8=String(RegExp['$2'])['toUpperCase']()[_0x402991(0x467)]();let _0x1747ec,_0x5c7c94,_0x3caddc;switch(_0x2f09f8){case _0x402991(0x48b):_0x1747ec=_0x58ada5[_0x4cee77]!==''?Number(_0x58ada5[_0x4cee77]):0x0;break;case _0x402991(0x257):_0x5c7c94=_0x58ada5[_0x4cee77]!==''?JSON[_0x402991(0x431)](_0x58ada5[_0x4cee77]):[],_0x1747ec=_0x5c7c94[_0x402991(0x3a4)](_0x3f55cf=>Number(_0x3f55cf));break;case'EVAL':_0x1747ec=_0x58ada5[_0x4cee77]!==''?eval(_0x58ada5[_0x4cee77]):null;break;case _0x402991(0x499):_0x5c7c94=_0x58ada5[_0x4cee77]!==''?JSON[_0x402991(0x431)](_0x58ada5[_0x4cee77]):[],_0x1747ec=_0x5c7c94[_0x402991(0x3a4)](_0x3092d6=>eval(_0x3092d6));break;case _0x402991(0x203):_0x1747ec=_0x58ada5[_0x4cee77]!==''?JSON[_0x402991(0x431)](_0x58ada5[_0x4cee77]):'';break;case'ARRAYJSON':_0x5c7c94=_0x58ada5[_0x4cee77]!==''?JSON[_0x402991(0x431)](_0x58ada5[_0x4cee77]):[],_0x1747ec=_0x5c7c94[_0x402991(0x3a4)](_0x56b43c=>JSON['parse'](_0x56b43c));break;case _0x402991(0x188):_0x1747ec=_0x58ada5[_0x4cee77]!==''?new Function(JSON[_0x402991(0x431)](_0x58ada5[_0x4cee77])):new Function(_0x402991(0x29f));break;case'ARRAYFUNC':_0x5c7c94=_0x58ada5[_0x4cee77]!==''?JSON[_0x402991(0x431)](_0x58ada5[_0x4cee77]):[],_0x1747ec=_0x5c7c94[_0x402991(0x3a4)](_0x387fa2=>new Function(JSON[_0x402991(0x431)](_0x387fa2)));break;case _0x402991(0x1dc):_0x1747ec=_0x58ada5[_0x4cee77]!==''?String(_0x58ada5[_0x4cee77]):'';break;case _0x402991(0x4c8):_0x5c7c94=_0x58ada5[_0x4cee77]!==''?JSON['parse'](_0x58ada5[_0x4cee77]):[],_0x1747ec=_0x5c7c94['map'](_0x338ced=>String(_0x338ced));break;case _0x402991(0x511):_0x3caddc=_0x58ada5[_0x4cee77]!==''?JSON[_0x402991(0x431)](_0x58ada5[_0x4cee77]):{},_0x574053[_0x43fad6]={},VisuMZ[_0x402991(0x39f)](_0x574053[_0x43fad6],_0x3caddc);continue;case _0x402991(0x43f):_0x5c7c94=_0x58ada5[_0x4cee77]!==''?JSON['parse'](_0x58ada5[_0x4cee77]):[],_0x1747ec=_0x5c7c94['map'](_0x49bad2=>VisuMZ[_0x402991(0x39f)]({},JSON[_0x402991(0x431)](_0x49bad2)));break;default:continue;}_0x574053[_0x43fad6]=_0x1747ec;}}return _0x574053;},(_0x40af70=>{const _0x7fc7ac=_0x3fecc6,_0x4e16b1=_0x40af70[_0x7fc7ac(0x2a3)];for(const _0x143950 of dependencies){if(!Imported[_0x143950]){alert(_0x7fc7ac(0x41d)[_0x7fc7ac(0x190)](_0x4e16b1,_0x143950)),SceneManager[_0x7fc7ac(0x355)]();break;}}const _0x409244=_0x40af70[_0x7fc7ac(0x318)];if(_0x409244[_0x7fc7ac(0x498)](/\[Version[ ](.*?)\]/i)){const _0x75e951=Number(RegExp['$1']);_0x75e951!==VisuMZ[label][_0x7fc7ac(0x2a7)]&&(alert(_0x7fc7ac(0x31c)[_0x7fc7ac(0x190)](_0x4e16b1,_0x75e951)),SceneManager[_0x7fc7ac(0x355)]());}if(_0x409244[_0x7fc7ac(0x498)](/\[Tier[ ](\d+)\]/i)){const _0x1a9375=Number(RegExp['$1']);_0x1a9375<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x7fc7ac(0x190)](_0x4e16b1,_0x1a9375,tier)),SceneManager[_0x7fc7ac(0x355)]()):tier=Math[_0x7fc7ac(0x362)](_0x1a9375,tier);}VisuMZ[_0x7fc7ac(0x39f)](VisuMZ[label][_0x7fc7ac(0x1ed)],_0x40af70[_0x7fc7ac(0x4ac)]);})(pluginData),PluginManager[_0x3fecc6(0x251)](pluginData[_0x3fecc6(0x2a3)],_0x3fecc6(0x2a4),_0x1fb20a=>{const _0x43b8a7=_0x3fecc6;VisuMZ[_0x43b8a7(0x39f)](_0x1fb20a,_0x1fb20a);const _0x105ed7=Number(_0x1fb20a[_0x43b8a7(0x371)])||0x0;$gameSystem[_0x43b8a7(0x538)](_0x105ed7);}),PluginManager['registerCommand'](pluginData['name'],_0x3fecc6(0x303),_0x3d6e0f=>{const _0x2d6f2f=_0x3fecc6;VisuMZ[_0x2d6f2f(0x39f)](_0x3d6e0f,_0x3d6e0f);const _0x3f0d69=_0x3d6e0f[_0x2d6f2f(0x52e)]||$gameSystem[_0x2d6f2f(0x234)]()||0x1,_0x46806a=_0x3d6e0f['MinWidth']??0x60,_0x24a999=_0x3d6e0f[_0x2d6f2f(0x2fc)]||$gameSystem[_0x2d6f2f(0x315)]()||0x1,_0x286f76=_0x3d6e0f[_0x2d6f2f(0x545)]||$gameSystem['getChoiceListMaxColumns']()||0x1,_0x3c2582=_0x3d6e0f[_0x2d6f2f(0x246)][_0x2d6f2f(0x435)]()||_0x2d6f2f(0x3bd);$gameSystem[_0x2d6f2f(0x308)](_0x3f0d69),$gameSystem[_0x2d6f2f(0x354)](_0x46806a),$gameSystem['setChoiceListMaxRows'](_0x24a999),$gameSystem[_0x2d6f2f(0x2e7)](_0x286f76),$gameSystem[_0x2d6f2f(0x497)](_0x3c2582);}),PluginManager[_0x3fecc6(0x251)](pluginData[_0x3fecc6(0x2a3)],'MessageWindowProperties',_0x50e54a=>{const _0x570d99=_0x3fecc6;VisuMZ['ConvertParams'](_0x50e54a,_0x50e54a);const _0x3d66cd=_0x50e54a['Rows']||$gameSystem[_0x570d99(0x326)]()||0x1,_0x28566a=_0x50e54a[_0x570d99(0x468)]||$gameSystem[_0x570d99(0x463)]()||0x1;$gameTemp[_0x570d99(0x4b2)]=!![];const _0x36488c=_0x50e54a['WordWrap'][_0x570d99(0x435)]();$gameSystem[_0x570d99(0x4f3)](_0x3d66cd),$gameSystem[_0x570d99(0x49c)](_0x28566a);['true',_0x570d99(0x2aa)][_0x570d99(0x3c6)](_0x36488c)&&$gameSystem['setMessageWindowWordWrap'](eval(_0x36488c));const _0x2c5fec=SceneManager[_0x570d99(0x20c)]['_messageWindow'];_0x2c5fec&&(_0x2c5fec[_0x570d99(0x298)](),_0x2c5fec[_0x570d99(0x4b7)](),_0x2c5fec['createContents']());}),PluginManager[_0x3fecc6(0x251)](pluginData[_0x3fecc6(0x2a3)],_0x3fecc6(0x3c5),_0x448117=>{const _0x550ff9=_0x3fecc6;VisuMZ[_0x550ff9(0x39f)](_0x448117,_0x448117),$gameSystem['setMessageWindowXyOffsets'](_0x448117[_0x550ff9(0x553)],_0x448117[_0x550ff9(0x522)]);const _0x4fb4ff=SceneManager[_0x550ff9(0x20c)][_0x550ff9(0x2f0)];_0x4fb4ff&&(_0x4fb4ff[_0x550ff9(0x298)](),_0x4fb4ff[_0x550ff9(0x4b7)](),_0x4fb4ff[_0x550ff9(0x2ce)]());}),PluginManager['registerCommand'](pluginData[_0x3fecc6(0x2a3)],_0x3fecc6(0x53b),_0x4542e9=>{const _0x32d2fc=_0x3fecc6;VisuMZ[_0x32d2fc(0x39f)](_0x4542e9,_0x4542e9),$gameMessage[_0x32d2fc(0x44f)](_0x4542e9[_0x32d2fc(0x2e9)]||0x0,_0x4542e9[_0x32d2fc(0x4f6)]||0x0);const _0x3985aa=$gameTemp[_0x32d2fc(0x52d)]();if(_0x3985aa)_0x3985aa[_0x32d2fc(0x50f)](_0x32d2fc(0x1a7));}),PluginManager[_0x3fecc6(0x251)](pluginData['name'],_0x3fecc6(0x388),_0x33e2cd=>{const _0x2b1390=_0x3fecc6;VisuMZ[_0x2b1390(0x39f)](_0x33e2cd,_0x33e2cd),$gameMessage['setArmorChoice'](_0x33e2cd[_0x2b1390(0x2e9)]||0x0,_0x33e2cd[_0x2b1390(0x226)]||0x0,_0x33e2cd[_0x2b1390(0x3c0)]||0x0);const _0x9dff9c=$gameTemp['getLastPluginCommandInterpreter']();if(_0x9dff9c)_0x9dff9c[_0x2b1390(0x50f)](_0x2b1390(0x1a7));}),PluginManager[_0x3fecc6(0x251)](pluginData[_0x3fecc6(0x2a3)],'SelectSkill',_0x4ef5f=>{const _0x5a82b9=_0x3fecc6;VisuMZ[_0x5a82b9(0x39f)](_0x4ef5f,_0x4ef5f),$gameMessage[_0x5a82b9(0x333)](_0x4ef5f[_0x5a82b9(0x2e9)]||0x0,_0x4ef5f[_0x5a82b9(0x350)]||0x0,_0x4ef5f[_0x5a82b9(0x464)]||0x0);const _0x5619b8=$gameTemp[_0x5a82b9(0x52d)]();if(_0x5619b8)_0x5619b8[_0x5a82b9(0x50f)](_0x5a82b9(0x1a7));}),PluginManager[_0x3fecc6(0x251)](pluginData[_0x3fecc6(0x2a3)],_0x3fecc6(0x3ec),_0xe0228f=>{const _0x598b5b=_0x3fecc6;VisuMZ[_0x598b5b(0x39f)](_0xe0228f,_0xe0228f);const _0x4ceb36=_0xe0228f['PictureIDs']||[],_0x435073=_0xe0228f[_0x598b5b(0x55e)]||0x0,_0x2b2371=[_0x598b5b(0x564),'up','upperright','left',_0x598b5b(0x442),_0x598b5b(0x49e),_0x598b5b(0x4ae),'down',_0x598b5b(0x275)];for(const _0x3d1c8d of _0x4ceb36){$gameScreen[_0x598b5b(0x542)](_0x3d1c8d,_0x435073);for(const _0x580d94 of _0x2b2371){if(_0xe0228f[_0x580d94]===undefined)continue;$gameScreen[_0x598b5b(0x32c)](_0x3d1c8d,_0xe0228f[_0x580d94],_0x580d94);}}}),PluginManager['registerCommand'](pluginData[_0x3fecc6(0x2a3)],_0x3fecc6(0x247),_0x40e1dd=>{const _0x167dcb=_0x3fecc6;VisuMZ[_0x167dcb(0x39f)](_0x40e1dd,_0x40e1dd);const _0x491d63=_0x40e1dd['PictureIDs']||[];for(const _0x396cee of _0x491d63){$gameScreen['eraseAllPictureTexts'](_0x396cee),$gameScreen['erasePictureTextBuffer'](_0x396cee);}}),PluginManager['registerCommand'](pluginData[_0x3fecc6(0x2a3)],_0x3fecc6(0x2a0),_0x28d94f=>{$gameScreen['requestPictureTextRefreshAll']();}),VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x187)]=Scene_Boot[_0x3fecc6(0x1d6)][_0x3fecc6(0x56b)],Scene_Boot[_0x3fecc6(0x1d6)][_0x3fecc6(0x56b)]=function(){const _0x48e262=_0x3fecc6;VisuMZ[_0x48e262(0x46b)][_0x48e262(0x187)]['call'](this),VisuMZ[_0x48e262(0x46b)][_0x48e262(0x426)](),this[_0x48e262(0x3a6)](),this[_0x48e262(0x42b)](),this[_0x48e262(0x2ba)](),this[_0x48e262(0x390)]();},VisuMZ['MessageCore']['CheckCompatibility']=function(){const _0x5a9173=_0x3fecc6;if(Imported[_0x5a9173(0x4be)]&&VisuMZ['ExtraEnemyDrops'][_0x5a9173(0x2a7)]<1.09){let _0x24e5ba='';_0x24e5ba+=_0x5a9173(0x2b2),_0x24e5ba+=_0x5a9173(0x23a),alert(_0x24e5ba),SceneManager['exit']();}},VisuMZ['MessageCore']['SortObjectByKeyLength']=function(_0xae1820){const _0xdfbe3a=_0x3fecc6,_0x4fd674=VisuMZ[_0xdfbe3a(0x46b)][_0xdfbe3a(0x1ed)][_0xae1820];_0x4fd674['sort']((_0x16f2ef,_0x4ddae)=>{const _0x196944=_0xdfbe3a;if(!_0x16f2ef||!_0x4ddae)return-0x1;return _0x4ddae[_0x196944(0x533)][_0x196944(0x43e)]-_0x16f2ef['Match'][_0x196944(0x43e)];});},Scene_Boot[_0x3fecc6(0x1d6)][_0x3fecc6(0x3a6)]=function(){const _0x2a7d03=_0x3fecc6;VisuMZ['MessageCore']['SortObjectByKeyLength'](_0x2a7d03(0x36e));for(const _0x566bc1 of VisuMZ[_0x2a7d03(0x46b)][_0x2a7d03(0x1ed)][_0x2a7d03(0x36e)]){_0x566bc1[_0x2a7d03(0x533)]=_0x566bc1['Match']['toUpperCase'](),_0x566bc1[_0x2a7d03(0x198)]=new RegExp('\x1b'+_0x566bc1[_0x2a7d03(0x533)],'gi'),_0x566bc1['textCodeResult']='\x1b'+_0x566bc1[_0x2a7d03(0x533)];if(_0x566bc1[_0x2a7d03(0x3f9)]==='')_0x566bc1['textCodeResult']+=_0x2a7d03(0x392);}},Scene_Boot[_0x3fecc6(0x1d6)][_0x3fecc6(0x42b)]=function(){const _0x4378c1=_0x3fecc6;VisuMZ[_0x4378c1(0x46b)][_0x4378c1(0x55d)](_0x4378c1(0x347));for(const _0x1a48a5 of VisuMZ[_0x4378c1(0x46b)][_0x4378c1(0x1ed)][_0x4378c1(0x347)]){_0x1a48a5[_0x4378c1(0x198)]=new RegExp('\x1b'+_0x1a48a5[_0x4378c1(0x533)]+_0x1a48a5[_0x4378c1(0x3f9)],'gi'),_0x1a48a5['TextStr']!==''&&_0x1a48a5[_0x4378c1(0x241)]!==_0x4378c1(0x2b1)?_0x1a48a5[_0x4378c1(0x27c)]=new Function(_0x4378c1(0x292)+_0x1a48a5[_0x4378c1(0x241)][_0x4378c1(0x496)](/\\/g,'\x1b')+'\x27'):_0x1a48a5[_0x4378c1(0x27c)]=_0x1a48a5[_0x4378c1(0x404)];}},Scene_Boot[_0x3fecc6(0x1d6)][_0x3fecc6(0x2ba)]=function(){const _0x14b346=_0x3fecc6;for(const _0x3b2949 of VisuMZ['MessageCore'][_0x14b346(0x1ed)][_0x14b346(0x349)]){_0x3b2949[_0x14b346(0x198)]=new RegExp('\x5c['+_0x3b2949[_0x14b346(0x533)]+'\x5c]','gi');if(_0x3b2949['TextStr']!==''&&_0x3b2949[_0x14b346(0x241)]!==_0x14b346(0x2b1)){let _0x4a51b2=_0x3b2949['TextStr'];_0x4a51b2=_0x4a51b2[_0x14b346(0x496)](/\\/g,'\x1b'),_0x4a51b2=_0x4a51b2[_0x14b346(0x496)]('\x27','\x5c\x27'),_0x4a51b2=_0x4a51b2['replace']('\x22','\x5c\x22'),_0x3b2949['textCodeResult']=new Function(_0x14b346(0x292)+_0x4a51b2+'\x27');}else _0x3b2949[_0x14b346(0x27c)]=_0x3b2949[_0x14b346(0x404)];}},Scene_Boot[_0x3fecc6(0x1d6)][_0x3fecc6(0x390)]=function(){const _0x51042a=_0x3fecc6,_0x56f343=VisuMZ['MessageCore']['Settings']['AutoColor'];!VisuMZ['ParseAllNotetags']&&(VisuMZ[_0x51042a(0x46b)]['AddAutoColor']($dataClasses,_0x56f343[_0x51042a(0x39d)]),VisuMZ[_0x51042a(0x46b)]['AddAutoColor']($dataSkills,_0x56f343[_0x51042a(0x267)]),VisuMZ[_0x51042a(0x46b)]['AddAutoColor']($dataItems,_0x56f343[_0x51042a(0x1a4)]),VisuMZ['MessageCore'][_0x51042a(0x4d1)]($dataWeapons,_0x56f343[_0x51042a(0x212)]),VisuMZ[_0x51042a(0x46b)][_0x51042a(0x4d1)]($dataArmors,_0x56f343[_0x51042a(0x4df)]),VisuMZ[_0x51042a(0x46b)][_0x51042a(0x4d1)]($dataEnemies,_0x56f343['Enemies']),VisuMZ['MessageCore'][_0x51042a(0x4d1)]($dataStates,_0x56f343[_0x51042a(0x319)])),VisuMZ[_0x51042a(0x46b)][_0x51042a(0x26c)]();},VisuMZ['MessageCore'][_0x3fecc6(0x24d)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x3fecc6(0x3d7),_0x3fecc6(0x4cc),_0x3fecc6(0x20e),_0x3fecc6(0x54f),_0x3fecc6(0x4f0),_0x3fecc6(0x492),_0x3fecc6(0x297),_0x3fecc6(0x2b0),_0x3fecc6(0x329),'</RIGHT>',_0x3fecc6(0x2d4),_0x3fecc6(0x40c),_0x3fecc6(0x3db),_0x3fecc6(0x2b3),_0x3fecc6(0x2fe),_0x3fecc6(0x3d4),_0x3fecc6(0x37a),_0x3fecc6(0x215),'PICTURE',_0x3fecc6(0x294),'COMMONEVENT',_0x3fecc6(0x3c9),_0x3fecc6(0x189),_0x3fecc6(0x4e3),'ENABLE',_0x3fecc6(0x2ca),_0x3fecc6(0x4e7),'SWITCHES',_0x3fecc6(0x512),_0x3fecc6(0x4da)],VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x4d1)]=function(_0x483f38,_0x5dceeb){const _0x4adcd4=_0x3fecc6;if(_0x5dceeb<=0x0)return;const _0x581da3=_0x483f38;for(const _0x376422 of _0x581da3){if(!_0x376422)continue;VisuMZ[_0x4adcd4(0x46b)][_0x4adcd4(0x1bc)](_0x376422,_0x5dceeb);}},VisuMZ['MessageCore'][_0x3fecc6(0x26c)]=function(){const _0x4c6324=_0x3fecc6;VisuMZ[_0x4c6324(0x46b)]['AutoColorRegExp']=[];for(let _0xc106c3=0x1;_0xc106c3<=0x1f;_0xc106c3++){const _0x133557=_0x4c6324(0x55f)[_0x4c6324(0x190)](_0xc106c3),_0x1afb3b=VisuMZ[_0x4c6324(0x46b)][_0x4c6324(0x1ed)][_0x4c6324(0x20f)][_0x133557];_0x1afb3b['sort']((_0x4a7476,_0x45dcf0)=>{const _0x4e4da7=_0x4c6324;if(!_0x4a7476||!_0x45dcf0)return-0x1;return _0x45dcf0[_0x4e4da7(0x43e)]-_0x4a7476['length'];}),this[_0x4c6324(0x466)](_0x1afb3b,_0xc106c3);}},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x466)]=function(_0x1ba64e,_0x59ce24){const _0x583442=_0x3fecc6;for(const _0x4f9279 of _0x1ba64e){if(_0x4f9279['length']<=0x0)continue;if(/^\d+$/[_0x583442(0x2ad)](_0x4f9279))continue;let _0x58b3d1=VisuMZ[_0x583442(0x46b)][_0x583442(0x39b)](_0x4f9279);if(_0x4f9279['match'](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0xfde026=new RegExp(_0x58b3d1,'i');else var _0xfde026=new RegExp('\x5cb'+_0x58b3d1+'\x5cb','g');VisuMZ['MessageCore'][_0x583442(0x513)][_0x583442(0x48a)]([_0xfde026,'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x583442(0x190)](_0x59ce24,_0x4f9279)]);}},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x39b)]=function(_0x9fc37b){const _0x4db175=_0x3fecc6;return _0x9fc37b=_0x9fc37b['replace'](/(\W)/gi,(_0x359d6a,_0x48da99)=>_0x4db175(0x574)[_0x4db175(0x190)](_0x48da99)),_0x9fc37b;},VisuMZ[_0x3fecc6(0x46b)]['ParseClassNotetags']=VisuMZ['ParseClassNotetags'],VisuMZ[_0x3fecc6(0x4e2)]=function(_0x56e7e6){const _0x2ed2c8=_0x3fecc6;VisuMZ[_0x2ed2c8(0x46b)]['ParseClassNotetags'][_0x2ed2c8(0x358)](this,_0x56e7e6);const _0x1ea3d7=VisuMZ[_0x2ed2c8(0x46b)][_0x2ed2c8(0x1ed)]['AutoColor'];VisuMZ[_0x2ed2c8(0x46b)][_0x2ed2c8(0x1bc)](_0x56e7e6,_0x1ea3d7['Classes']);},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x3fb)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x3fecc6(0x3fb)]=function(_0x285d69){const _0xcb5c0a=_0x3fecc6;VisuMZ[_0xcb5c0a(0x46b)][_0xcb5c0a(0x3fb)][_0xcb5c0a(0x358)](this,_0x285d69);const _0x926c0d=VisuMZ[_0xcb5c0a(0x46b)]['Settings']['AutoColor'];VisuMZ[_0xcb5c0a(0x46b)]['CreateAutoColorFor'](_0x285d69,_0x926c0d['Skills']);},0x7,VisuMZ['MessageCore'][_0x3fecc6(0x2f5)]=VisuMZ[_0x3fecc6(0x2f5)],VisuMZ['ParseItemNotetags']=function(_0x23af6f){const _0x4417f0=_0x3fecc6;VisuMZ[_0x4417f0(0x46b)][_0x4417f0(0x2f5)][_0x4417f0(0x358)](this,_0x23af6f);const _0x4c3600=VisuMZ[_0x4417f0(0x46b)][_0x4417f0(0x1ed)][_0x4417f0(0x20f)];VisuMZ[_0x4417f0(0x46b)][_0x4417f0(0x1bc)](_0x23af6f,_0x4c3600[_0x4417f0(0x1a4)]);},VisuMZ['MessageCore'][_0x3fecc6(0x19e)]=VisuMZ[_0x3fecc6(0x19e)],VisuMZ[_0x3fecc6(0x19e)]=function(_0x1e3b2a){const _0x334fe3=_0x3fecc6;VisuMZ['MessageCore']['ParseWeaponNotetags'][_0x334fe3(0x358)](this,_0x1e3b2a);const _0x59ed39=VisuMZ['MessageCore'][_0x334fe3(0x1ed)][_0x334fe3(0x20f)];VisuMZ[_0x334fe3(0x46b)][_0x334fe3(0x1bc)](_0x1e3b2a,_0x59ed39[_0x334fe3(0x212)]);},VisuMZ['MessageCore'][_0x3fecc6(0x211)]=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x3fecc6(0x211)]=function(_0x3cf7c3){const _0x4d08bc=_0x3fecc6;VisuMZ[_0x4d08bc(0x46b)][_0x4d08bc(0x211)]['call'](this,_0x3cf7c3);const _0xdaec07=VisuMZ[_0x4d08bc(0x46b)][_0x4d08bc(0x1ed)][_0x4d08bc(0x20f)];VisuMZ[_0x4d08bc(0x46b)][_0x4d08bc(0x1bc)](_0x3cf7c3,_0xdaec07[_0x4d08bc(0x4df)]);},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x556)]=VisuMZ[_0x3fecc6(0x556)],VisuMZ[_0x3fecc6(0x556)]=function(_0x4f19c9){const _0x4ca204=_0x3fecc6;VisuMZ[_0x4ca204(0x46b)][_0x4ca204(0x556)][_0x4ca204(0x358)](this,_0x4f19c9);const _0x1367de=VisuMZ[_0x4ca204(0x46b)][_0x4ca204(0x1ed)][_0x4ca204(0x20f)];VisuMZ[_0x4ca204(0x46b)][_0x4ca204(0x1bc)](_0x4f19c9,_0x1367de[_0x4ca204(0x30d)]);},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x401)]=VisuMZ['ParseStateNotetags'],VisuMZ['ParseStateNotetags']=function(_0x51cb94){const _0x43fc15=_0x3fecc6;VisuMZ[_0x43fc15(0x46b)][_0x43fc15(0x401)][_0x43fc15(0x358)](this,_0x51cb94);const _0x5ca008=VisuMZ[_0x43fc15(0x46b)][_0x43fc15(0x1ed)]['AutoColor'];VisuMZ['MessageCore'][_0x43fc15(0x1bc)](_0x51cb94,_0x5ca008[_0x43fc15(0x319)]);},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x1bc)]=function(_0x2dba28,_0x437970){const _0xa3ba0c=_0x3fecc6;if(_0x437970<=0x0)return;const _0x1ea037=VisuMZ[_0xa3ba0c(0x46b)][_0xa3ba0c(0x1ed)][_0xa3ba0c(0x20f)]['TextColor'+_0x437970];let _0x53e68c=_0x2dba28['name'][_0xa3ba0c(0x467)]();if(/^\d+$/[_0xa3ba0c(0x2ad)](_0x53e68c))return;if(VisuMZ[_0xa3ba0c(0x46b)][_0xa3ba0c(0x24d)]['includes'](_0x53e68c['toUpperCase']()))return;_0x53e68c=_0x53e68c[_0xa3ba0c(0x496)](/\\I\[(\d+)\]/gi,''),_0x53e68c=_0x53e68c['replace'](/\x1bI\[(\d+)\]/gi,'');if(_0x53e68c[_0xa3ba0c(0x43e)]<=0x0)return;if(_0x53e68c[_0xa3ba0c(0x498)](/-----/i))return;_0x1ea037[_0xa3ba0c(0x48a)](_0x53e68c);},VisuMZ['MessageCore'][_0x3fecc6(0x382)]=Scene_Boot['prototype'][_0x3fecc6(0x3bf)],Scene_Boot[_0x3fecc6(0x1d6)][_0x3fecc6(0x3bf)]=function(){const _0x4b444e=_0x3fecc6;VisuMZ['MessageCore'][_0x4b444e(0x382)]['call'](this),this[_0x4b444e(0x46c)]();},Scene_Boot[_0x3fecc6(0x1d6)][_0x3fecc6(0x46c)]=function(){const _0x442d21=_0x3fecc6,_0x6cfb0f=VisuMZ[_0x442d21(0x46b)][_0x442d21(0x1ed)][_0x442d21(0x343)]||[];for(const _0x17caab of _0x6cfb0f){if(!_0x17caab)continue;const _0x28ebe1=_0x17caab['FontFamily'];if(_0x28ebe1['trim']()==='')continue;if(_0x28ebe1[_0x442d21(0x435)]()[_0x442d21(0x467)]()===_0x442d21(0x4cd))continue;const _0x4c82b5=_0x17caab[_0x442d21(0x22c)];if(_0x4c82b5===_0x442d21(0x242))continue;FontManager[_0x442d21(0x26a)](_0x28ebe1,_0x4c82b5);}},VisuMZ['MessageCore'][_0x3fecc6(0x36f)]=VisuMZ[_0x3fecc6(0x46b)]['Settings'][_0x3fecc6(0x232)][_0x3fecc6(0x225)]??_0x3fecc6(0x38a),VisuMZ['MessageCore']['DataManager_loadDatabase']=DataManager[_0x3fecc6(0x2c0)],DataManager[_0x3fecc6(0x2c0)]=function(){const _0x500cc9=_0x3fecc6;VisuMZ['MessageCore'][_0x500cc9(0x52c)][_0x500cc9(0x358)](this),this[_0x500cc9(0x33a)]();},DataManager[_0x3fecc6(0x33a)]=function(){const _0x1f5d4d=_0x3fecc6;if(!TextManager[_0x1f5d4d(0x2ab)]())return;const _0x49ce7b=VisuMZ[_0x1f5d4d(0x46b)]['Settings'][_0x1f5d4d(0x232)];let _0x5afcdd='';const _0x3624ed=VisuMZ[_0x1f5d4d(0x46b)][_0x1f5d4d(0x36f)]??_0x1f5d4d(0x38a);if(_0x3624ed===_0x1f5d4d(0x394))_0x5afcdd=(_0x49ce7b[_0x1f5d4d(0x1b6)]??_0x1f5d4d(0x37e))||'';if(_0x3624ed===_0x1f5d4d(0x38a))_0x5afcdd=(_0x49ce7b[_0x1f5d4d(0x34a)]??_0x1f5d4d(0x30c))||'';if(!_0x5afcdd)return;const _0x6f9489='$dataLocalization',_0x2f0110=new XMLHttpRequest(),_0x2048bc=_0x1f5d4d(0x4af)+_0x5afcdd;window[_0x6f9489]=null,_0x2f0110[_0x1f5d4d(0x569)](_0x1f5d4d(0x44e),_0x2048bc),_0x2f0110[_0x1f5d4d(0x285)](_0x1f5d4d(0x3d9)[_0x1f5d4d(0x190)](_0x3624ed['toLowerCase']())),_0x2f0110['onload']=()=>this[_0x1f5d4d(0x547)](_0x2f0110,_0x6f9489),_0x2f0110[_0x1f5d4d(0x23c)]=()=>this[_0x1f5d4d(0x40e)](),_0x2f0110[_0x1f5d4d(0x3b1)]();},DataManager[_0x3fecc6(0x547)]=function(_0x4fd452,_0xcda99d){const _0x143a16=_0x3fecc6;if(_0x4fd452[_0x143a16(0x3e8)]>=0x190)return;const _0x1e30e0=_0x4fd452['responseText'];window[_0xcda99d]=VisuMZ['MessageCore']['ParseLocalizationCsv'](_0x1e30e0);},VisuMZ['MessageCore'][_0x3fecc6(0x4b8)]=function(_0x408c04){const _0x253c4b=_0x3fecc6,_0x1238f=VisuMZ[_0x253c4b(0x46b)]['LocalizationType']??_0x253c4b(0x38a),_0x5ebf8e=_0x1238f===_0x253c4b(0x394)?';':'\x09',_0x143eb7=_0x408c04[_0x253c4b(0x3f0)]('\x0a'),_0x3e8164=_0x143eb7[0x0][_0x253c4b(0x3f0)](_0x5ebf8e),_0x28ede9={};return _0x143eb7[_0x253c4b(0x4f4)](0x1)['forEach'](_0x140e36=>{const _0x3171aa=_0x253c4b;let _0x1339de=[],_0x425a35='',_0x8fe7e4=![];for(let _0x196d26=0x0;_0x196d26<_0x140e36[_0x3171aa(0x43e)];_0x196d26++){let _0x5a4875=_0x140e36[_0x196d26];if(_0x5a4875==='\x22')_0x8fe7e4&&_0x140e36[_0x196d26+0x1]==='\x22'?(_0x425a35+=_0x5a4875,_0x196d26++):_0x8fe7e4=!_0x8fe7e4;else _0x5a4875===_0x5ebf8e&&!_0x8fe7e4?(_0x1339de[_0x3171aa(0x48a)](_0x425a35),_0x425a35=''):_0x425a35+=_0x5a4875;}if(_0x425a35)_0x1339de[_0x3171aa(0x48a)](_0x425a35);if(!_0x1339de[0x0])_0x1339de[0x0]='';const _0x9d907b=_0x1339de[0x0]['replace'](/^"|"$/g,'')['toLowerCase']()[_0x3171aa(0x467)]();_0x28ede9[_0x9d907b]=_0x3e8164[_0x3171aa(0x4f4)](0x1)[_0x3171aa(0x31e)]((_0x541bc9,_0x198c23,_0x5cce9d)=>{const _0x2cc58e=_0x3171aa;return _0x541bc9[_0x198c23[_0x2cc58e(0x467)]()]=(_0x1339de[_0x5cce9d+0x1]||'')['replace'](/^"|"$/g,''),_0x541bc9;},{});}),_0x28ede9;},DataManager[_0x3fecc6(0x40e)]=function(){const _0x14b8eb=_0x3fecc6,_0x4df940=(VisuMZ[_0x14b8eb(0x46b)][_0x14b8eb(0x36f)]??_0x14b8eb(0x38a))[_0x14b8eb(0x328)]();let _0x50e27e='';_0x50e27e+=_0x14b8eb(0x518),_0x50e27e+=_0x14b8eb(0x3e5),_0x50e27e=_0x50e27e['format'](_0x4df940);if(confirm(_0x50e27e)){if(Utils[_0x14b8eb(0x519)](_0x14b8eb(0x2ad))){if(_0x4df940===_0x14b8eb(0x457))_0x50e27e=_0x14b8eb(0x53e),_0x50e27e=_0x50e27e[_0x14b8eb(0x190)](_0x4df940),alert(_0x50e27e),this[_0x14b8eb(0x45e)](),this[_0x14b8eb(0x26b)]();else return this[_0x14b8eb(0x486)]();_0x50e27e='';}else _0x50e27e=_0x14b8eb(0x1d9);}else _0x50e27e=_0x14b8eb(0x46a);_0x50e27e+=_0x14b8eb(0x25a),_0x50e27e=_0x50e27e[_0x14b8eb(0x190)](_0x4df940),alert(_0x50e27e),SceneManager[_0x14b8eb(0x355)]();},DataManager[_0x3fecc6(0x486)]=function(){const _0x274a6b=_0x3fecc6,_0x2e5b3e=VisuMZ[_0x274a6b(0x46b)]['Settings'][_0x274a6b(0x232)],_0x1985fc=_0x2e5b3e[_0x274a6b(0x1b6)]??_0x274a6b(0x37e),_0x4119e4=new XMLHttpRequest(),_0x51fc26=_0x274a6b(0x4af)+_0x1985fc;_0x4119e4[_0x274a6b(0x569)](_0x274a6b(0x44e),_0x51fc26),_0x4119e4[_0x274a6b(0x285)]('application/csv'),_0x4119e4[_0x274a6b(0x33c)]=()=>this[_0x274a6b(0x1eb)](_0x4119e4),_0x4119e4[_0x274a6b(0x23c)]=()=>this[_0x274a6b(0x4eb)](),_0x4119e4[_0x274a6b(0x3b1)]();},DataManager[_0x3fecc6(0x1eb)]=function(_0x2d4990){const _0x31e189=_0x3fecc6,_0x35dcc3=VisuMZ[_0x31e189(0x46b)]['Settings'][_0x31e189(0x232)],_0x43fc01=_0x35dcc3['CsvFilename']??_0x31e189(0x37e);let _0x360521=_0x31e189(0x259)['format'](_0x43fc01);_0x360521+=_0x31e189(0x4ea),_0x360521+=_0x31e189(0x454),confirm(_0x360521)?this[_0x31e189(0x3d5)](_0x2d4990):this[_0x31e189(0x4eb)]();},DataManager['convertCsvToTsvFile']=function(_0x15adfb){const _0x28041b=_0x3fecc6;if(_0x15adfb[_0x28041b(0x3e8)]>=0x190)return;const _0x3b759b=_0x15adfb['responseText'],_0x4d7a1e=_0x3b759b['replace'](/\;/gi,'\x09'),_0x20380c=VisuMZ[_0x28041b(0x46b)][_0x28041b(0x1ed)]['Localization'],_0x44286b=_0x20380c[_0x28041b(0x34a)]||_0x28041b(0x30c),_0x51ab60=require(_0x28041b(0x353)),_0x418e84=_0x51ab60['dirname'](process[_0x28041b(0x50a)][_0x28041b(0x4d0)]),_0x57e6e4=_0x51ab60['join'](_0x418e84,_0x28041b(0x4af)),_0x24a2ec=_0x57e6e4+_0x44286b,_0x4eaf8e=require('fs');_0x4eaf8e[_0x28041b(0x478)](_0x24a2ec,_0x4d7a1e);let _0x5ea343=_0x28041b(0x4a3);alert(_0x5ea343),_0x5ea343=_0x28041b(0x25a),alert(_0x5ea343),SceneManager[_0x28041b(0x355)]();},DataManager[_0x3fecc6(0x4eb)]=function(){const _0x417c24=_0x3fecc6;let _0x1a18c9='TSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.';alert(_0x1a18c9),this[_0x417c24(0x45e)](),this['openLocalizationFolder'](),_0x1a18c9=_0x417c24(0x25a),alert(_0x1a18c9),SceneManager[_0x417c24(0x355)]();},DataManager[_0x3fecc6(0x45e)]=function(){const _0x30344a=_0x3fecc6,_0x2172ec=['Key','English','Bengali',_0x30344a(0x4cf),_0x30344a(0x231),'Czech',_0x30344a(0x288),_0x30344a(0x23f),_0x30344a(0x51f),_0x30344a(0x3ff),_0x30344a(0x479),_0x30344a(0x3d3),'Hindi',_0x30344a(0x56a),'Indonesian','Italian',_0x30344a(0x419),_0x30344a(0x54e),'Norwegian',_0x30344a(0x222),_0x30344a(0x549),_0x30344a(0x517),_0x30344a(0x50b),'Slovak',_0x30344a(0x4bb),_0x30344a(0x322),'Tamil',_0x30344a(0x224),_0x30344a(0x3f1)],_0x3b1de7=['Greeting',_0x30344a(0x485),_0x30344a(0x327),'你好','你好','Ahoj',_0x30344a(0x50e),'Hallo','Hei',_0x30344a(0x35e),_0x30344a(0x48e),'Γειά\x20σου',_0x30344a(0x4de),_0x30344a(0x26d),_0x30344a(0x462),_0x30344a(0x54a),_0x30344a(0x2f6),'안녕하세요',_0x30344a(0x49b),_0x30344a(0x504),'Olá',_0x30344a(0x2e3),_0x30344a(0x30b),_0x30344a(0x1e6),_0x30344a(0x331),_0x30344a(0x50e),_0x30344a(0x55b),_0x30344a(0x282),_0x30344a(0x219)],_0x11551a=[_0x30344a(0x407),_0x30344a(0x1f3),_0x30344a(0x314),'再见','再見','Sbohem',_0x30344a(0x197),_0x30344a(0x541),_0x30344a(0x30a),_0x30344a(0x3af),_0x30344a(0x20b),_0x30344a(0x1c1),_0x30344a(0x1f0),_0x30344a(0x1d1),_0x30344a(0x35f),_0x30344a(0x34d),_0x30344a(0x2f8),_0x30344a(0x46e),_0x30344a(0x4aa),_0x30344a(0x360),_0x30344a(0x56c),_0x30344a(0x269),'До\x20свидания',_0x30344a(0x2cf),_0x30344a(0x487),_0x30344a(0x366),_0x30344a(0x368),'ลาก่อน','Hoşça\x20kal'],_0x25b183=[_0x30344a(0x453),_0x30344a(0x453),_0x30344a(0x44c),'哇','哇','Ó',_0x30344a(0x453),_0x30344a(0x51d),'Vau',_0x30344a(0x202),_0x30344a(0x453),_0x30344a(0x237),_0x30344a(0x3e1),_0x30344a(0x474),'Wah',_0x30344a(0x453),'ワオ','와우','Oi','O','Uau',_0x30344a(0x230),_0x30344a(0x320),'Ó',_0x30344a(0x40a),'Oj',_0x30344a(0x1fa),_0x30344a(0x1a0),_0x30344a(0x408)],_0x1ff4af=[_0x2172ec,_0x3b1de7,_0x11551a,_0x25b183],_0x290548=VisuMZ[_0x30344a(0x46b)][_0x30344a(0x36f)]??_0x30344a(0x38a),_0x277c2d=_0x290548===_0x30344a(0x394)?';':'\x09',_0x9a9ee2=_0x1ff4af[_0x30344a(0x3a4)](_0xa05561=>_0xa05561[_0x30344a(0x502)](_0x277c2d))[_0x30344a(0x502)]('\x0a'),_0x2b8235=VisuMZ[_0x30344a(0x46b)][_0x30344a(0x1ed)][_0x30344a(0x232)];let _0xed5ca2='';if(_0x290548===_0x30344a(0x394))_0xed5ca2=_0x2b8235[_0x30344a(0x1b6)]||_0x30344a(0x37e);if(_0x290548===_0x30344a(0x38a))_0xed5ca2=_0x2b8235[_0x30344a(0x34a)]||'Languages.tsv';const _0x2811bd=require(_0x30344a(0x353)),_0x1c4b2b=_0x2811bd['dirname'](process[_0x30344a(0x50a)]['filename']),_0x2ba5cb=_0x2811bd[_0x30344a(0x502)](_0x1c4b2b,'data/'),_0x74ba4d=_0x2ba5cb+_0xed5ca2,_0x300644=require('fs');return _0x300644[_0x30344a(0x478)](_0x74ba4d,_0x9a9ee2),_0x74ba4d;},DataManager[_0x3fecc6(0x26b)]=function(){const _0x42f156=_0x3fecc6,{exec:_0x248001}=require(_0x42f156(0x1e2));_0x248001('start\x20.\x5cdata'),_0x248001(_0x42f156(0x216));},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x39e)]=ImageManager[_0x3fecc6(0x274)],ImageManager['loadBitmap']=function(_0x56990a,_0x4d8983){const _0x432b7b=_0x3fecc6;if(ConfigManager[_0x432b7b(0x27d)]!==undefined){const _0x49a876=VisuMZ[_0x432b7b(0x46b)][_0x432b7b(0x1ed)]['Localization']||{},_0x3e6c0c=_0x49a876[_0x432b7b(0x29d)]||_0x432b7b(0x3ae),_0x3c42c1=VisuMZ['MessageCore']['Settings']['LanguageImages']||{},_0x150a1c=ConfigManager[_0x432b7b(0x27d)]||_0x3e6c0c;if(_0x150a1c===_0x3e6c0c&&!_0x3c42c1[_0x432b7b(0x250)]){}else{const _0x3004cf=_0x3c42c1[_0x150a1c]||_0x432b7b(0x276);_0x56990a&&_0x56990a[_0x432b7b(0x498)](/\[XX\]/g)&&console[_0x432b7b(0x31d)](_0x56990a,_0x4d8983),_0x4d8983&&_0x4d8983[_0x432b7b(0x498)](/\[XX\]/g)&&(_0x4d8983=_0x4d8983[_0x432b7b(0x496)](/\[XX\]/g,_0x3004cf));}}return VisuMZ['MessageCore']['ImageManager_loadBitmap'][_0x432b7b(0x358)](this,_0x56990a,_0x4d8983);},SceneManager[_0x3fecc6(0x43b)]=function(){const _0x109e0f=_0x3fecc6;return this[_0x109e0f(0x20c)]&&this[_0x109e0f(0x20c)][_0x109e0f(0x2f3)]===Scene_Battle;},SceneManager[_0x3fecc6(0x3a3)]=function(){const _0x4de9ba=_0x3fecc6;return this[_0x4de9ba(0x20c)]&&this[_0x4de9ba(0x20c)][_0x4de9ba(0x2f3)]===Scene_Map;},ConfigManager[_0x3fecc6(0x27d)]=VisuMZ['MessageCore'][_0x3fecc6(0x1ed)]['Localization'][_0x3fecc6(0x29d)]||_0x3fecc6(0x3ae),ConfigManager[_0x3fecc6(0x482)]=VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x1ed)][_0x3fecc6(0x4fa)][_0x3fecc6(0x33e)],VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x500)]=ConfigManager['makeData'],ConfigManager[_0x3fecc6(0x38e)]=function(){const _0x6340b9=_0x3fecc6,_0x34cb45=VisuMZ[_0x6340b9(0x46b)]['ConfigManager_makeData'][_0x6340b9(0x358)](this);return TextManager['isVisuMzLocalizationEnabled']()&&(_0x34cb45[_0x6340b9(0x27d)]=this[_0x6340b9(0x27d)]),_0x34cb45[_0x6340b9(0x482)]=this['textSpeed'],_0x34cb45;},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x2c4)]=ConfigManager['applyData'],ConfigManager[_0x3fecc6(0x2af)]=function(_0x5bc150){const _0x17f745=_0x3fecc6;VisuMZ[_0x17f745(0x46b)][_0x17f745(0x2c4)][_0x17f745(0x358)](this,_0x5bc150),TextManager[_0x17f745(0x2ab)]()&&(_0x17f745(0x27d)in _0x5bc150?this[_0x17f745(0x27d)]=String(_0x5bc150[_0x17f745(0x27d)]):this['textLocale']=VisuMZ['MessageCore'][_0x17f745(0x1ed)][_0x17f745(0x232)][_0x17f745(0x29d)]||_0x17f745(0x3ae)),_0x17f745(0x482)in _0x5bc150?this[_0x17f745(0x482)]=Number(_0x5bc150[_0x17f745(0x482)])[_0x17f745(0x1e0)](0x1,0xb):this['textSpeed']=VisuMZ[_0x17f745(0x46b)][_0x17f745(0x1ed)][_0x17f745(0x4fa)][_0x17f745(0x33e)];},TextManager[_0x3fecc6(0x2de)]=VisuMZ['MessageCore']['Settings']['Localization'][_0x3fecc6(0x1cb)],TextManager[_0x3fecc6(0x1fc)]=VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x1ed)][_0x3fecc6(0x4fa)][_0x3fecc6(0x1cb)],TextManager['instantTextSpeed']=VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x1ed)][_0x3fecc6(0x4fa)]['Instant'],VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x30e)]=TextManager['message'],TextManager[_0x3fecc6(0x1a7)]=function(_0xa4e5c0){const _0x1d6f89=_0x3fecc6,_0x268e1b=[_0x1d6f89(0x1e5),_0x1d6f89(0x2b8),_0x1d6f89(0x1cf),_0x1d6f89(0x576),_0x1d6f89(0x3bc),'defeat','escapeStart','obtainExp',_0x1d6f89(0x1d2),_0x1d6f89(0x21c)];let _0x4d2dd6=VisuMZ[_0x1d6f89(0x46b)][_0x1d6f89(0x30e)][_0x1d6f89(0x358)](this,_0xa4e5c0);return _0x268e1b[_0x1d6f89(0x3c6)](_0xa4e5c0)&&(_0x4d2dd6=_0x1d6f89(0x3d4)+_0x4d2dd6),_0x4d2dd6;},TextManager[_0x3fecc6(0x2ab)]=function(){const _0x1d1614=_0x3fecc6;return VisuMZ[_0x1d1614(0x46b)][_0x1d1614(0x1ed)][_0x1d1614(0x232)][_0x1d1614(0x2d5)];},TextManager[_0x3fecc6(0x395)]=function(_0x4ee586){const _0x393b21=_0x3fecc6;if(!this['isVisuMzLocalizationEnabled']())return _0x4ee586;return _0x4ee586=String(_0x4ee586)[_0x393b21(0x496)](/\$(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x5989f1,_0x207f1d)=>this['getLocalizedText'](String(_0x207f1d))),_0x4ee586=String(_0x4ee586)[_0x393b21(0x496)](/\\(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x47c476,_0x73ab08)=>this[_0x393b21(0x450)](String(_0x73ab08))),_0x4ee586=String(_0x4ee586)[_0x393b21(0x496)](/\x1b(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x34a035,_0x358956)=>this['getLocalizedText'](String(_0x358956))),_0x4ee586;},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x305)]=Bitmap[_0x3fecc6(0x1d6)][_0x3fecc6(0x579)],Bitmap[_0x3fecc6(0x1d6)][_0x3fecc6(0x579)]=function(_0x46a76d){const _0x296c83=_0x3fecc6;return _0x46a76d=TextManager[_0x296c83(0x395)](_0x46a76d),VisuMZ[_0x296c83(0x46b)][_0x296c83(0x305)][_0x296c83(0x358)](this,_0x46a76d);},TextManager[_0x3fecc6(0x450)]=function(_0x2e72c1){const _0x27a8ca=_0x3fecc6;if(!$dataLocalization)return'';const _0x4fb82a=$dataLocalization[_0x2e72c1[_0x27a8ca(0x435)]()[_0x27a8ca(0x467)]()];if(!_0x4fb82a)return;const _0x32ad1f=ConfigManager[_0x27a8ca(0x27d)]||_0x27a8ca(0x3ae);let _0x3d0ff8=_0x4fb82a[_0x32ad1f]||'UNDEFINED!';return _0x3d0ff8=_0x3d0ff8[_0x27a8ca(0x496)](/\\/g,'\x1b'),_0x3d0ff8=_0x3d0ff8[_0x27a8ca(0x496)](/<SEMI(?:|-COLON|COLON)>/gi,';'),_0x3d0ff8;},TextManager[_0x3fecc6(0x23b)]=function(_0x50c3f2){const _0x5e8ecf=_0x3fecc6;return VisuMZ[_0x5e8ecf(0x46b)][_0x5e8ecf(0x1ed)][_0x5e8ecf(0x232)][_0x50c3f2]||'';},TextManager[_0x3fecc6(0x560)]=function(){const _0x12b381=_0x3fecc6,_0xbfeec0=ConfigManager['textLocale']||_0x12b381(0x3ae);return this[_0x12b381(0x23b)](_0xbfeec0);},TextManager['getLanguageAt']=function(_0x83831b){const _0x287bff=_0x3fecc6,_0x5058fc=VisuMZ[_0x287bff(0x46b)][_0x287bff(0x1ed)]['Localization'][_0x287bff(0x4ca)]||[];let _0x464721=_0x5058fc[_0x287bff(0x365)](ConfigManager[_0x287bff(0x27d)]||_0x287bff(0x3ae));_0x464721+=_0x83831b;const _0x4c889a=_0x5058fc[_0x464721]||'';return this[_0x287bff(0x23b)](_0x4c889a);},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x37d)]=Game_System[_0x3fecc6(0x1d6)][_0x3fecc6(0x1a6)],Game_System[_0x3fecc6(0x1d6)][_0x3fecc6(0x1a6)]=function(){const _0x5c83fe=_0x3fecc6;let _0x3f85ba=VisuMZ[_0x5c83fe(0x46b)][_0x5c83fe(0x37d)]['call'](this);if(ConfigManager&&ConfigManager[_0x5c83fe(0x201)]!==undefined&&ConfigManager[_0x5c83fe(0x201)]>0x0)return _0x3f85ba;else{const _0xa4e39f=ConfigManager['textLocale']||_0x5c83fe(0x3ae),_0x4f0db2=VisuMZ['MessageCore']['Settings'][_0x5c83fe(0x191)];return _0x4f0db2[_0xa4e39f]!==undefined&&(_0x3f85ba=_0x4f0db2[_0xa4e39f]+',\x20'+$dataSystem[_0x5c83fe(0x56e)][_0x5c83fe(0x505)]),_0x3f85ba;}},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x337)]=Window_Command[_0x3fecc6(0x1d6)][_0x3fecc6(0x34f)],Window_Command[_0x3fecc6(0x1d6)][_0x3fecc6(0x34f)]=function(_0x27c070,_0x30ae25,_0x1a65c2,_0x492e1d){const _0x3ab1e7=_0x3fecc6;if(TextManager[_0x3ab1e7(0x395)]&&TextManager[_0x3ab1e7(0x2ab)]()){const _0x11f255=String(_0x27c070)[_0x3ab1e7(0x435)]()[_0x3ab1e7(0x467)]();if($dataLocalization[_0x11f255]&&_0x11f255[_0x3ab1e7(0x43e)]>0x0){const _0x1784b3=ConfigManager[_0x3ab1e7(0x27d)]||_0x3ab1e7(0x3ae);_0x27c070=$dataLocalization[_0x11f255][_0x1784b3]||'UNDEFINED!';}}VisuMZ['MessageCore'][_0x3ab1e7(0x337)][_0x3ab1e7(0x358)](this,_0x27c070,_0x30ae25,_0x1a65c2,_0x492e1d);},Window_StatusBase[_0x3fecc6(0x1d6)][_0x3fecc6(0x22e)]=function(_0x25fd92,_0x19e6bc){const _0x33550b=_0x3fecc6,_0x4e824a=_0x25fd92[_0x33550b(0x481)]();let _0x3eeab1=$dataSystem[_0x33550b(0x4ee)][_0x4e824a[_0x19e6bc]];if(TextManager[_0x33550b(0x395)]){const _0xd647fc=String(_0x3eeab1)[_0x33550b(0x435)]()[_0x33550b(0x467)]();if(TextManager[_0x33550b(0x2ab)]()&&$dataLocalization[_0xd647fc]){const _0x16e9bd=ConfigManager[_0x33550b(0x27d)]||_0x33550b(0x3ae);_0x3eeab1=$dataLocalization[_0xd647fc][_0x16e9bd]||_0x33550b(0x302);}}return _0x3eeab1;},Game_Temp[_0x3fecc6(0x1d6)][_0x3fecc6(0x47b)]=function(_0x3e7578){const _0x2d47b7=_0x3fecc6;this[_0x2d47b7(0x41c)]=_0x3e7578;},Game_Temp[_0x3fecc6(0x1d6)]['getLastPluginCommandInterpreter']=function(){return this['_lastPluginCommandInterpreter'];},VisuMZ[_0x3fecc6(0x46b)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x3fecc6(0x1d6)][_0x3fecc6(0x287)],Game_Interpreter[_0x3fecc6(0x1d6)][_0x3fecc6(0x287)]=function(_0x219953){const _0xfb12bd=_0x3fecc6;return $gameTemp[_0xfb12bd(0x47b)](this),VisuMZ[_0xfb12bd(0x46b)][_0xfb12bd(0x47a)]['call'](this,_0x219953);},VisuMZ['MessageCore'][_0x3fecc6(0x45b)]=Game_System[_0x3fecc6(0x1d6)]['initialize'],Game_System[_0x3fecc6(0x1d6)][_0x3fecc6(0x3b5)]=function(){const _0x285c7e=_0x3fecc6;VisuMZ[_0x285c7e(0x46b)][_0x285c7e(0x45b)]['call'](this),this[_0x285c7e(0x295)]();},Game_System['prototype'][_0x3fecc6(0x295)]=function(){const _0x167886=_0x3fecc6,_0x1c93da=VisuMZ[_0x167886(0x46b)][_0x167886(0x1ed)][_0x167886(0x40d)],_0x40c55b=VisuMZ[_0x167886(0x46b)][_0x167886(0x1ed)]['WordWrap'];this[_0x167886(0x352)]={'messageRows':_0x1c93da[_0x167886(0x405)],'messageWidth':_0x1c93da[_0x167886(0x4c0)],'messageWordWrap':_0x40c55b[_0x167886(0x2dd)],'helpWordWrap':_0x40c55b['HelpWindow'],'choiceLineHeight':_0x1c93da[_0x167886(0x3ea)],'choiceMinWidth':_0x1c93da[_0x167886(0x2b7)]??0x60,'choiceRows':_0x1c93da[_0x167886(0x45d)],'choiceCols':_0x1c93da['ChoiceWindowMaxCols'],'choiceTextAlign':_0x1c93da[_0x167886(0x238)],'choiceDistance':0x0},this[_0x167886(0x229)]===undefined&&(this[_0x167886(0x229)]=_0x1c93da[_0x167886(0x1fd)],this[_0x167886(0x4d3)]=_0x1c93da[_0x167886(0x3e3)]);},Game_System['prototype'][_0x3fecc6(0x326)]=function(){const _0x56156f=_0x3fecc6;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x56156f(0x352)][_0x56156f(0x300)]===undefined)this[_0x56156f(0x295)]();return this['_MessageCoreSettings']['messageRows'];},Game_System[_0x3fecc6(0x1d6)]['setMessageWindowRows']=function(_0x35059b){const _0x2b6895=_0x3fecc6;if(this['_MessageCoreSettings']===undefined)this[_0x2b6895(0x295)]();if(this[_0x2b6895(0x352)][_0x2b6895(0x300)]===undefined)this['initMessageCore']();this[_0x2b6895(0x352)][_0x2b6895(0x300)]=_0x35059b||0x1;},Game_System[_0x3fecc6(0x1d6)]['getMessageWindowWidth']=function(){const _0x1ee88b=_0x3fecc6;if(this[_0x1ee88b(0x352)]===undefined)this[_0x1ee88b(0x295)]();if(this['_MessageCoreSettings'][_0x1ee88b(0x321)]===undefined)this[_0x1ee88b(0x295)]();return this[_0x1ee88b(0x352)][_0x1ee88b(0x321)];},Game_System[_0x3fecc6(0x1d6)]['setMessageWindowWidth']=function(_0x2da275){const _0x42d0bf=_0x3fecc6;if(this['_MessageCoreSettings']===undefined)this[_0x42d0bf(0x295)]();if(this[_0x42d0bf(0x352)][_0x42d0bf(0x321)]===undefined)this[_0x42d0bf(0x295)]();_0x2da275=Math['ceil'](_0x2da275);if(_0x2da275%0x2!==0x0)_0x2da275+=0x1;this[_0x42d0bf(0x352)]['messageWidth']=_0x2da275||0x2;},Game_System[_0x3fecc6(0x1d6)][_0x3fecc6(0x258)]=function(){const _0xfe6d8f=_0x3fecc6;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0xfe6d8f(0x352)]['messageWordWrap']===undefined)this[_0xfe6d8f(0x295)]();return this[_0xfe6d8f(0x352)][_0xfe6d8f(0x310)];},Game_System[_0x3fecc6(0x1d6)][_0x3fecc6(0x568)]=function(_0x4ee4b2){const _0x49c8fd=_0x3fecc6;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x49c8fd(0x352)][_0x49c8fd(0x310)]===undefined)this[_0x49c8fd(0x295)]();this['_MessageCoreSettings']['messageWordWrap']=_0x4ee4b2;},Game_System[_0x3fecc6(0x1d6)][_0x3fecc6(0x4a4)]=function(){const _0x245e63=_0x3fecc6;if(this[_0x245e63(0x229)]===undefined){const _0x504781=VisuMZ[_0x245e63(0x46b)][_0x245e63(0x1ed)][_0x245e63(0x40d)];this[_0x245e63(0x229)]=_0x504781[_0x245e63(0x1fd)],this['_messageOffsetY']=_0x504781[_0x245e63(0x3e3)];}return{'x':this[_0x245e63(0x229)]||0x0,'y':this[_0x245e63(0x4d3)]||0x0};},Game_System['prototype'][_0x3fecc6(0x4c4)]=function(_0x2831b5,_0x15d8f9){const _0x25e907=_0x3fecc6;if(this[_0x25e907(0x352)]===undefined)this[_0x25e907(0x295)]();this[_0x25e907(0x229)]=_0x2831b5,this['_messageOffsetY']=_0x15d8f9;},Game_System[_0x3fecc6(0x1d6)][_0x3fecc6(0x325)]=function(){const _0x4ae4db=_0x3fecc6;if(this['_MessageCoreSettings']===undefined)this[_0x4ae4db(0x295)]();if(this[_0x4ae4db(0x352)]['helpWordWrap']===undefined)this['initMessageCore']();return this[_0x4ae4db(0x352)]['helpWordWrap'];},Game_System[_0x3fecc6(0x1d6)][_0x3fecc6(0x2b6)]=function(_0xc2de7b){const _0x50375c=_0x3fecc6;if(this['_MessageCoreSettings']===undefined)this[_0x50375c(0x295)]();if(this['_MessageCoreSettings']['helpWordWrap']===undefined)this['initMessageCore']();this[_0x50375c(0x352)][_0x50375c(0x423)]=_0xc2de7b;},Game_System[_0x3fecc6(0x1d6)][_0x3fecc6(0x234)]=function(){const _0x2e6178=_0x3fecc6;if(this[_0x2e6178(0x352)]===undefined)this[_0x2e6178(0x295)]();if(this[_0x2e6178(0x352)]['choiceLineHeight']===undefined)this[_0x2e6178(0x295)]();return this[_0x2e6178(0x352)][_0x2e6178(0x28f)];},Game_System[_0x3fecc6(0x1d6)][_0x3fecc6(0x308)]=function(_0x4885a3){const _0x40bd87=_0x3fecc6;if(this[_0x40bd87(0x352)]===undefined)this['initMessageCore']();if(this[_0x40bd87(0x352)][_0x40bd87(0x28f)]===undefined)this[_0x40bd87(0x295)]();this[_0x40bd87(0x352)]['choiceLineHeight']=_0x4885a3||0x1;},Game_System[_0x3fecc6(0x1d6)]['getChoiceListMinChoiceWidth']=function(){const _0x4d040e=_0x3fecc6;if(this[_0x4d040e(0x352)]===undefined)this[_0x4d040e(0x295)]();return this[_0x4d040e(0x352)]['choiceMinWidth']??0x60;},Game_System[_0x3fecc6(0x1d6)]['setChoiceListMinChoiceWidth']=function(_0x55893d){const _0x167512=_0x3fecc6;if(this[_0x167512(0x352)]===undefined)this[_0x167512(0x295)]();this['_MessageCoreSettings'][_0x167512(0x28d)]=_0x55893d||0x0;},Game_System[_0x3fecc6(0x1d6)]['getChoiceListMaxRows']=function(){const _0x55152f=_0x3fecc6;if(this[_0x55152f(0x352)]===undefined)this[_0x55152f(0x295)]();if(this[_0x55152f(0x352)][_0x55152f(0x346)]===undefined)this['initMessageCore']();return this[_0x55152f(0x352)][_0x55152f(0x346)];},Game_System[_0x3fecc6(0x1d6)][_0x3fecc6(0x217)]=function(_0x222e17){const _0x430ac4=_0x3fecc6;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x430ac4(0x352)][_0x430ac4(0x346)]===undefined)this[_0x430ac4(0x295)]();this[_0x430ac4(0x352)][_0x430ac4(0x346)]=_0x222e17||0x1;},Game_System['prototype'][_0x3fecc6(0x45a)]=function(){const _0x321cbc=_0x3fecc6;if(this[_0x321cbc(0x352)]===undefined)this[_0x321cbc(0x295)]();if(this[_0x321cbc(0x352)][_0x321cbc(0x3bb)]===undefined)this[_0x321cbc(0x295)]();return this[_0x321cbc(0x352)]['choiceCols'];},Game_System['prototype']['setChoiceListMaxColumns']=function(_0x5ab379){const _0x5c6633=_0x3fecc6;if(this[_0x5c6633(0x352)]===undefined)this[_0x5c6633(0x295)]();if(this[_0x5c6633(0x352)]['choiceCols']===undefined)this['initMessageCore']();this[_0x5c6633(0x352)][_0x5c6633(0x3bb)]=_0x5ab379||0x1;},Game_System[_0x3fecc6(0x1d6)][_0x3fecc6(0x1de)]=function(){const _0x49df56=_0x3fecc6;if(this[_0x49df56(0x352)]===undefined)this[_0x49df56(0x295)]();if(this[_0x49df56(0x352)][_0x49df56(0x536)]===undefined)this[_0x49df56(0x295)]();return this[_0x49df56(0x352)]['choiceTextAlign'];},Game_System[_0x3fecc6(0x1d6)][_0x3fecc6(0x497)]=function(_0x3d18b2){const _0x2ae9dc=_0x3fecc6;if(this['_MessageCoreSettings']===undefined)this[_0x2ae9dc(0x295)]();if(this[_0x2ae9dc(0x352)][_0x2ae9dc(0x536)]===undefined)this[_0x2ae9dc(0x295)]();this['_MessageCoreSettings'][_0x2ae9dc(0x536)]=_0x3d18b2[_0x2ae9dc(0x435)]();},Game_System[_0x3fecc6(0x1d6)][_0x3fecc6(0x359)]=function(){const _0x9b4e11=_0x3fecc6;if(this[_0x9b4e11(0x352)]===undefined)this[_0x9b4e11(0x295)]();return this[_0x9b4e11(0x352)][_0x9b4e11(0x480)]||0x0;},Game_System['prototype']['setChoiceMessageDistance']=function(_0x1965e3){const _0x3c243b=_0x3fecc6;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x3c243b(0x480)]=_0x1965e3||0x0;},Game_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x44f)]=function(_0x292bbd,_0x51f61e){const _0x297d1f=_0x3fecc6;this[_0x297d1f(0x26e)]=_0x292bbd,this[_0x297d1f(0x2c3)]=_0x297d1f(0x240),this['_itemChoiceWtypeId']=_0x51f61e,this[_0x297d1f(0x577)]=0x0;},Game_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x32b)]=function(){const _0x18d607=_0x3fecc6;return this[_0x18d607(0x50d)]||0x0;},Game_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x3cf)]=function(_0x4c8459,_0xcb5d97,_0x5eef61){const _0x50cfac=_0x3fecc6;this[_0x50cfac(0x26e)]=_0x4c8459,this[_0x50cfac(0x2c3)]=_0x50cfac(0x531),this[_0x50cfac(0x1f9)]=_0xcb5d97,this[_0x50cfac(0x577)]=_0x5eef61;},Game_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x501)]=function(){return this['_itemChoiceAtypeId']||0x0;},Game_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x475)]=function(){const _0x4c2d9f=_0x3fecc6;return this[_0x4c2d9f(0x577)]||0x0;},Game_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x333)]=function(_0x56c640,_0x4a3a31,_0x57fb62){const _0xa8b393=_0x3fecc6;this[_0xa8b393(0x26e)]=_0x56c640,this[_0xa8b393(0x2c3)]=_0xa8b393(0x1e4),this[_0xa8b393(0x25e)]=_0x4a3a31,this[_0xa8b393(0x3cc)]=_0x57fb62;},Game_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x56f)]=function(){return this['_itemChoiceActorId']||0x0;},Game_Message['prototype']['itemChoiceActor']=function(){const _0x14856e=_0x3fecc6;return $gameActors[_0x14856e(0x341)](this[_0x14856e(0x56f)]())||$gameParty[_0x14856e(0x2cc)]()||null;},Game_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x4dd)]=function(){const _0x2f66f9=_0x3fecc6;return this[_0x2f66f9(0x3cc)]||0x0;},VisuMZ['MessageCore']['Game_Message_setChoices']=Game_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x526)],Game_Message['prototype'][_0x3fecc6(0x526)]=function(_0x5e0f22,_0x3596ee,_0x134ef6){const _0x35da38=_0x3fecc6;this[_0x35da38(0x233)]=!![],VisuMZ[_0x35da38(0x46b)]['Game_Message_setChoices'][_0x35da38(0x358)](this,_0x5e0f22,_0x3596ee,_0x134ef6);},Game_Message[_0x3fecc6(0x1d6)]['setupShuffleChoices']=function(){const _0x4deb4e=_0x3fecc6;this['_scriptCall']=![],this['_choiceIndexArray']=[];const _0xf104bc=this[_0x4deb4e(0x489)]['length'];this[_0x4deb4e(0x443)]=_0xf104bc;let _0x575478=![];for(let _0x4975a5=0x0;_0x4975a5<_0xf104bc;_0x4975a5++){let _0x18ebe6=this[_0x4deb4e(0x489)][_0x4975a5];_0x18ebe6[_0x4deb4e(0x498)](/<SHUFFLE>/gi)&&(_0x575478=!![],_0x18ebe6=_0x18ebe6['replace'](/<SHUFFLE>/gi,'')),_0x18ebe6[_0x4deb4e(0x498)](/<SHUFFLE:[ ](\d+)>/gi)&&(_0x575478=!![],this[_0x4deb4e(0x443)]=Math['min'](Number(RegExp['$1']),this[_0x4deb4e(0x443)]),_0x18ebe6=_0x18ebe6['replace'](/<SHUFFLE:[ ](\d+)>/gi,'')),_0x18ebe6[_0x4deb4e(0x498)](/<SHUFFLE: VAR[ ](\d+)>/gi)&&(_0x575478=!![],this['_maxShuffleChoices']=Math['min']($gameVariables['value'](Number(RegExp['$1']))||0x1,this[_0x4deb4e(0x443)]),_0x18ebe6=_0x18ebe6[_0x4deb4e(0x496)](/<SHUFFLE:[ ]VAR (\d+)>/gi,'')),this[_0x4deb4e(0x483)][_0x4deb4e(0x48a)](_0x4975a5),this[_0x4deb4e(0x489)][_0x4975a5]=_0x18ebe6;}if(_0x575478){this[_0x4deb4e(0x483)]=VisuMZ[_0x4deb4e(0x46b)][_0x4deb4e(0x281)](this[_0x4deb4e(0x483)]);if(this[_0x4deb4e(0x4f1)]()!==-0x2)this[_0x4deb4e(0x2a8)]=-0x1;}},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x281)]=function(_0x258c40){const _0xed48d2=_0x3fecc6;var _0x3ad264,_0xd667a3,_0x26cb0c;for(_0x26cb0c=_0x258c40[_0xed48d2(0x43e)]-0x1;_0x26cb0c>0x0;_0x26cb0c--){_0x3ad264=Math['floor'](Math[_0xed48d2(0x192)]()*(_0x26cb0c+0x1)),_0xd667a3=_0x258c40[_0x26cb0c],_0x258c40[_0x26cb0c]=_0x258c40[_0x3ad264],_0x258c40[_0x3ad264]=_0xd667a3;}return _0x258c40;},Game_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x351)]=function(){const _0x232f60=_0x3fecc6;if(!this[_0x232f60(0x483)])this['setupShuffleChoices']();return this[_0x232f60(0x483)];},Game_Message[_0x3fecc6(0x1d6)]['maxShuffleChoices']=function(){const _0x50768d=_0x3fecc6;if(this['_maxShuffleChoices']===undefined)this[_0x50768d(0x449)]();return this['_maxShuffleChoices'];},VisuMZ[_0x3fecc6(0x46b)]['Game_Screen_clearPictures']=Game_Screen[_0x3fecc6(0x1d6)][_0x3fecc6(0x4a1)],Game_Screen['prototype'][_0x3fecc6(0x4a1)]=function(){const _0x5a572f=_0x3fecc6;VisuMZ[_0x5a572f(0x46b)]['Game_Screen_clearPictures'][_0x5a572f(0x358)](this),this['clearAllPictureTexts']();},Game_Screen[_0x3fecc6(0x1d6)][_0x3fecc6(0x29a)]=function(){const _0x52ec8c=_0x3fecc6;this[_0x52ec8c(0x334)]=[],this[_0x52ec8c(0x3ed)]=[],this[_0x52ec8c(0x1f1)]=[];},Game_Screen[_0x3fecc6(0x1d6)][_0x3fecc6(0x24a)]=function(_0x2038b3){const _0x457799=_0x3fecc6;if(this[_0x457799(0x334)]===undefined)this['clearAllPictureTexts']();const _0x48577a=this[_0x457799(0x418)](_0x2038b3);return this[_0x457799(0x334)][_0x48577a]=this[_0x457799(0x334)][_0x48577a]||{},this[_0x457799(0x334)][_0x48577a];},Game_Screen[_0x3fecc6(0x1d6)][_0x3fecc6(0x31f)]=function(_0x366ef7,_0x2804b9){const _0x356810=_0x3fecc6;return _0x2804b9=_0x2804b9[_0x356810(0x435)]()[_0x356810(0x467)](),this[_0x356810(0x24a)](_0x366ef7)[_0x2804b9]||'';},Game_Screen[_0x3fecc6(0x1d6)][_0x3fecc6(0x32c)]=function(_0x2d4e67,_0x162ce7,_0x12de29){const _0x57b6a7=_0x3fecc6;_0x12de29=_0x12de29[_0x57b6a7(0x435)]()[_0x57b6a7(0x467)](),this['getPictureTextData'](_0x2d4e67)[_0x12de29]=_0x162ce7||'',this[_0x57b6a7(0x495)](_0x2d4e67,!![]);},Game_Screen[_0x3fecc6(0x1d6)][_0x3fecc6(0x383)]=function(_0x4d37db){const _0x545aa5=_0x3fecc6;if(this['_pictureText']===undefined)this[_0x545aa5(0x29a)]();const _0x5c6147=this[_0x545aa5(0x418)](_0x4d37db);this[_0x545aa5(0x334)][_0x5c6147]=null,this[_0x545aa5(0x495)](_0x4d37db,!![]);},Game_Screen[_0x3fecc6(0x1d6)][_0x3fecc6(0x434)]=function(_0xfc31fb){const _0x2a7248=_0x3fecc6;if(this['_pictureText']===undefined)this[_0x2a7248(0x29a)]();const _0xf9ac9=this['realPictureId'](_0xfc31fb);return this[_0x2a7248(0x3ed)][_0xf9ac9]||0x0;},Game_Screen[_0x3fecc6(0x1d6)][_0x3fecc6(0x542)]=function(_0x3593a4,_0x5ecb21){const _0x3967d8=_0x3fecc6;if(this['_pictureText']===undefined)this[_0x3967d8(0x29a)]();const _0x35d6d2=this[_0x3967d8(0x418)](_0x3593a4);this[_0x3967d8(0x3ed)][_0x35d6d2]=Math[_0x3967d8(0x362)](0x0,_0x5ecb21);},Game_Screen[_0x3fecc6(0x1d6)][_0x3fecc6(0x484)]=function(_0x16fdc0){const _0x325150=_0x3fecc6;if(this[_0x325150(0x334)]===undefined)this[_0x325150(0x29a)]();const _0x34eeb2=this[_0x325150(0x418)](_0x16fdc0);this['_pictureTextBuffer'][_0x34eeb2]=undefined;},VisuMZ['MessageCore']['Game_Screen_erasePicture']=Game_Screen[_0x3fecc6(0x1d6)][_0x3fecc6(0x29e)],Game_Screen[_0x3fecc6(0x1d6)][_0x3fecc6(0x29e)]=function(_0x290ad1){const _0x4cc66b=_0x3fecc6;VisuMZ[_0x4cc66b(0x46b)][_0x4cc66b(0x1d3)][_0x4cc66b(0x358)](this,_0x290ad1),this[_0x4cc66b(0x383)](_0x290ad1),this[_0x4cc66b(0x484)](_0x290ad1),this[_0x4cc66b(0x495)](_0x290ad1,!![]);},Game_Screen[_0x3fecc6(0x1d6)][_0x3fecc6(0x23e)]=function(){const _0x58ba2e=_0x3fecc6;for(const _0x36fecf of this[_0x58ba2e(0x3d6)]){if(_0x36fecf){let _0x10eebc=this[_0x58ba2e(0x3d6)][_0x58ba2e(0x365)](_0x36fecf);this['requestPictureTextRefresh'](_0x10eebc);}}},Game_Screen[_0x3fecc6(0x1d6)][_0x3fecc6(0x495)]=function(_0x410052,_0x1f3ccc){const _0x246d27=_0x3fecc6;this[_0x246d27(0x1f1)]=this[_0x246d27(0x1f1)]||[],(this[_0x246d27(0x18d)](_0x410052)||_0x1f3ccc)&&this['_pictureTextRefresh'][_0x246d27(0x48a)](_0x410052);},Game_Screen['prototype']['needsPictureTextRefresh']=function(_0x37855b){const _0x5e6be8=_0x3fecc6;return this[_0x5e6be8(0x1f1)]=this['_pictureTextRefresh']||[],this[_0x5e6be8(0x1f1)][_0x5e6be8(0x3c6)](_0x37855b);},Game_Screen[_0x3fecc6(0x1d6)][_0x3fecc6(0x49a)]=function(_0x213a34){const _0x2af18a=_0x3fecc6;this['_pictureTextRefresh']=this['_pictureTextRefresh']||[],this[_0x2af18a(0x1f1)][_0x2af18a(0x427)](_0x213a34);},Game_Screen['prototype'][_0x3fecc6(0x18d)]=function(_0x2ad136){const _0x2b9250=_0x3fecc6,_0x7ab23c=[_0x2b9250(0x564),'up','upperright',_0x2b9250(0x437),'center',_0x2b9250(0x49e),_0x2b9250(0x4ae),_0x2b9250(0x3f8),_0x2b9250(0x275)];return _0x7ab23c[_0x2b9250(0x1dd)](_0x5abc57=>this[_0x2b9250(0x31f)](_0x2ad136,_0x5abc57)!=='');},VisuMZ['MessageCore'][_0x3fecc6(0x21d)]=Game_Party[_0x3fecc6(0x1d6)][_0x3fecc6(0x3b5)],Game_Party[_0x3fecc6(0x1d6)]['initialize']=function(){const _0x21d88c=_0x3fecc6;VisuMZ[_0x21d88c(0x46b)][_0x21d88c(0x21d)][_0x21d88c(0x358)](this),this[_0x21d88c(0x295)]();},Game_Party['prototype'][_0x3fecc6(0x295)]=function(){const _0x2a2221=_0x3fecc6;this[_0x2a2221(0x28a)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x3fecc6(0x1d6)][_0x3fecc6(0x552)]=function(){const _0x2cad40=_0x3fecc6;if(this[_0x2cad40(0x28a)]===undefined)this[_0x2cad40(0x295)]();return this[_0x2cad40(0x28a)];},Game_Party['prototype']['setLastGainedItemData']=function(_0x4df550,_0x369b5b){const _0x4893db=_0x3fecc6;if(this['_lastGainedItemData']===undefined)this['initMessageCore']();if(!_0x4df550)return;if(DataManager['isItem'](_0x4df550))this[_0x4893db(0x28a)][_0x4893db(0x228)]=0x0;else{if(DataManager[_0x4893db(0x47f)](_0x4df550))this['_lastGainedItemData'][_0x4893db(0x228)]=0x1;else DataManager[_0x4893db(0x22a)](_0x4df550)&&(this[_0x4893db(0x28a)][_0x4893db(0x228)]=0x2);}this[_0x4893db(0x28a)]['id']=_0x4df550['id'],this[_0x4893db(0x28a)][_0x4893db(0x279)]=_0x369b5b;},VisuMZ['MessageCore']['Game_Party_gainItem']=Game_Party[_0x3fecc6(0x1d6)][_0x3fecc6(0x235)],Game_Party['prototype'][_0x3fecc6(0x235)]=function(_0x13ed88,_0x24720c,_0xb576d0){const _0x50c8b8=_0x3fecc6;VisuMZ[_0x50c8b8(0x46b)][_0x50c8b8(0x441)][_0x50c8b8(0x358)](this,_0x13ed88,_0x24720c,_0xb576d0),_0x24720c>0x0&&this[_0x50c8b8(0x2d2)](_0x13ed88,_0x24720c);},VisuMZ['MessageCore'][_0x3fecc6(0x2f2)]=Game_Map[_0x3fecc6(0x1d6)][_0x3fecc6(0x3b5)],Game_Map[_0x3fecc6(0x1d6)][_0x3fecc6(0x3b5)]=function(){const _0x5b1449=_0x3fecc6;VisuMZ[_0x5b1449(0x46b)][_0x5b1449(0x2f2)][_0x5b1449(0x358)](this),this[_0x5b1449(0x280)]=[];},VisuMZ[_0x3fecc6(0x46b)]['Game_Map_setupEvents']=Game_Map[_0x3fecc6(0x1d6)][_0x3fecc6(0x400)],Game_Map[_0x3fecc6(0x1d6)][_0x3fecc6(0x400)]=function(){const _0xef405e=_0x3fecc6;VisuMZ[_0xef405e(0x46b)][_0xef405e(0x345)][_0xef405e(0x358)](this),this['_messageCommonEvents']=[];},VisuMZ['MessageCore'][_0x3fecc6(0x44d)]=Game_Map[_0x3fecc6(0x1d6)][_0x3fecc6(0x420)],Game_Map[_0x3fecc6(0x1d6)][_0x3fecc6(0x420)]=function(){const _0x442536=_0x3fecc6;VisuMZ[_0x442536(0x46b)][_0x442536(0x44d)][_0x442536(0x358)](this),this[_0x442536(0x3ba)]();},Game_Map[_0x3fecc6(0x1d6)][_0x3fecc6(0x539)]=function(_0x45a822){const _0x1600f8=_0x3fecc6;if(!$dataCommonEvents[_0x45a822])return;this[_0x1600f8(0x280)]=this[_0x1600f8(0x280)]||[];const _0x1cf82f=this[_0x1600f8(0x204)][_0x1600f8(0x524)],_0x28def6=new Game_MessageCommonEvent(_0x45a822,_0x1cf82f);this[_0x1600f8(0x280)][_0x1600f8(0x48a)](_0x28def6);},Game_Map['prototype'][_0x3fecc6(0x3ba)]=function(){const _0x3d9f16=_0x3fecc6;this[_0x3d9f16(0x280)]=this[_0x3d9f16(0x280)]||[];for(const _0x41538f of this[_0x3d9f16(0x280)]){!_0x41538f[_0x3d9f16(0x204)]?this[_0x3d9f16(0x280)][_0x3d9f16(0x427)](_0x41538f):_0x41538f[_0x3d9f16(0x236)]();}},VisuMZ[_0x3fecc6(0x46b)]['Game_Map_refresh']=Game_Map[_0x3fecc6(0x1d6)][_0x3fecc6(0x2a1)],Game_Map[_0x3fecc6(0x1d6)][_0x3fecc6(0x2a1)]=function(){const _0x13c2d3=_0x3fecc6;VisuMZ['MessageCore'][_0x13c2d3(0x1cc)][_0x13c2d3(0x358)](this),$gameScreen[_0x13c2d3(0x23e)]();},Game_Interpreter[_0x3fecc6(0x1d4)]=pluginData['name'],Game_Interpreter[_0x3fecc6(0x1d6)]['command101']=function(_0x4b1551){const _0x5546a6=_0x3fecc6;if($gameMessage[_0x5546a6(0x289)]())return![];return this['prepareShowTextCommand'](_0x4b1551),this[_0x5546a6(0x3b3)](_0x4b1551),this[_0x5546a6(0x3e4)](_0x4b1551),this[_0x5546a6(0x50f)](_0x5546a6(0x1a7)),!![];},Game_Interpreter[_0x3fecc6(0x1d6)][_0x3fecc6(0x2ec)]=function(_0x4f9e2a){const _0x2b70aa=_0x3fecc6;$gameMessage[_0x2b70aa(0x56d)](_0x4f9e2a[0x0],_0x4f9e2a[0x1]),$gameMessage[_0x2b70aa(0x47c)](_0x4f9e2a[0x2]),$gameMessage[_0x2b70aa(0x193)](_0x4f9e2a[0x3]),$gameMessage['setSpeakerName'](_0x4f9e2a[0x4]);},Game_Interpreter[_0x3fecc6(0x1d6)]['addContinuousShowTextCommands']=function(_0x234ccb){const _0x2ea60f=_0x3fecc6;while(this[_0x2ea60f(0x37c)]()){this[_0x2ea60f(0x2a9)]++;if(this[_0x2ea60f(0x4e5)]()[_0x2ea60f(0x45c)]===0x191){let _0x47df7c=this['currentCommand']()['parameters'][0x0];_0x47df7c=VisuMZ[_0x2ea60f(0x46b)][_0x2ea60f(0x3ca)](_0x47df7c),$gameMessage['add'](_0x47df7c);}if(this[_0x2ea60f(0x221)]())break;}},Game_Interpreter[_0x3fecc6(0x1d6)][_0x3fecc6(0x37c)]=function(){const _0x346506=_0x3fecc6;return this[_0x346506(0x35b)]()===0x65&&$gameSystem['getMessageWindowRows']()>0x4?!![]:this['nextEventCode']()===0x191;},VisuMZ['MessageCore']['ParseAddedText']=function(_0x115a34){const _0xfa7265=_0x3fecc6,_0x59cef4=VisuMZ[_0xfa7265(0x46b)]['Settings'][_0xfa7265(0x40d)];return _0x115a34=(_0x59cef4[_0xfa7265(0x20d)]||'')+_0x115a34+(_0x59cef4[_0xfa7265(0x520)]||''),_0x115a34=_0x115a34[_0xfa7265(0x496)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x115a34=_0x115a34[_0xfa7265(0x496)](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x110def,_0xd896b6)=>this['getRandomTextFromPool'](_0xd896b6)),_0x115a34;},VisuMZ['MessageCore'][_0x3fecc6(0x551)]=function(_0x166586){const _0x127afb=_0x3fecc6,_0x47e423=_0x166586['split']('|')['map'](_0x4f78f0=>_0x4f78f0['trim']())[_0x127afb(0x427)]('')[_0x127afb(0x427)](null);return _0x47e423[Math[_0x127afb(0x3b7)](_0x47e423['length'])];},Game_Interpreter[_0x3fecc6(0x1d6)]['isBreakShowTextCommands']=function(){const _0x202adc=_0x3fecc6;if(this[_0x202adc(0x4e5)]()&&this[_0x202adc(0x4e5)]()[_0x202adc(0x4ac)][0x0][_0x202adc(0x498)](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage[_0x202adc(0x47d)][_0x202adc(0x43e)]>=$gameSystem[_0x202adc(0x326)]()&&this[_0x202adc(0x35b)]()!==0x191;},Game_Interpreter[_0x3fecc6(0x1d6)]['prepareShowTextFollowups']=function(_0x4b1fbd){const _0x1ad632=_0x3fecc6;switch(this['nextEventCode']()){case 0x66:this['_index']++,this[_0x1ad632(0x49f)](this['currentCommand']()[_0x1ad632(0x4ac)]);break;case 0x67:this[_0x1ad632(0x2a9)]++,this[_0x1ad632(0x4ba)](this['currentCommand']()[_0x1ad632(0x4ac)]);break;case 0x68:this[_0x1ad632(0x2a9)]++,this[_0x1ad632(0x3c7)](this[_0x1ad632(0x4e5)]()[_0x1ad632(0x4ac)]);break;case 0x165:const _0x246a30=this['_list'][this[_0x1ad632(0x2a9)]+0x1],_0x240bc2=_0x246a30['parameters'];_0x240bc2[0x0]===Game_Interpreter[_0x1ad632(0x1d4)]&&this[_0x1ad632(0x1f4)](_0x240bc2);break;}},VisuMZ['MessageCore']['Game_Interpreter_setupChoices']=Game_Interpreter[_0x3fecc6(0x1d6)][_0x3fecc6(0x49f)],Game_Interpreter['prototype'][_0x3fecc6(0x49f)]=function(_0xeb7684){const _0x335fed=_0x3fecc6;_0xeb7684=this[_0x335fed(0x3f3)](),VisuMZ[_0x335fed(0x46b)]['Game_Interpreter_setupChoices'][_0x335fed(0x358)](this,_0xeb7684),$gameMessage[_0x335fed(0x449)]();},Game_Interpreter['prototype']['addContinuousShowChoices']=function(){const _0xfb8906=_0x3fecc6,_0x3fdc47=this[_0xfb8906(0x2a9)],_0x4a6787=[];let _0x1c2271=0x0;this[_0xfb8906(0x2a9)]++;while(this[_0xfb8906(0x2a9)]<this[_0xfb8906(0x339)][_0xfb8906(0x43e)]){if(this['currentCommand']()[_0xfb8906(0x3ab)]===this[_0xfb8906(0x50c)]){if(this['currentCommand']()[_0xfb8906(0x45c)]===0x194&&this[_0xfb8906(0x35b)]()!==0x66)break;else{if(this['currentCommand']()[_0xfb8906(0x45c)]===0x66)this[_0xfb8906(0x4c9)](_0x1c2271,this['currentCommand'](),_0x3fdc47),this[_0xfb8906(0x2a9)]-=0x2;else this[_0xfb8906(0x4e5)]()[_0xfb8906(0x45c)]===0x192&&(this[_0xfb8906(0x4e5)]()[_0xfb8906(0x4ac)][0x0]=_0x1c2271,_0x1c2271++);}}this[_0xfb8906(0x2a9)]++;}return this['_index']=_0x3fdc47,this[_0xfb8906(0x4e5)]()[_0xfb8906(0x4ac)];},Game_Interpreter[_0x3fecc6(0x1d6)][_0x3fecc6(0x4c9)]=function(_0x134bcb,_0x57e0b3,_0x4740dd){const _0x5f31ae=_0x3fecc6;this['adjustShowChoiceDefault'](_0x134bcb,_0x57e0b3,_0x4740dd),this[_0x5f31ae(0x4f8)](_0x134bcb,_0x57e0b3,_0x4740dd),this[_0x5f31ae(0x1b1)](_0x57e0b3,_0x4740dd);},Game_Interpreter[_0x3fecc6(0x1d6)][_0x3fecc6(0x25f)]=function(_0x13f539,_0x54dd77,_0x52a084){const _0x1beb0c=_0x3fecc6;if(_0x54dd77[_0x1beb0c(0x4ac)][0x2]<0x0)return;const _0x3211a4=_0x54dd77[_0x1beb0c(0x4ac)][0x2]+_0x13f539;this[_0x1beb0c(0x339)][_0x52a084][_0x1beb0c(0x4ac)][0x2]=_0x3211a4;},Game_Interpreter['prototype']['adjustShowChoiceCancel']=function(_0x3d4e54,_0xf2d551,_0x5ba586){const _0x5d35f8=_0x3fecc6;if(_0xf2d551[_0x5d35f8(0x4ac)][0x1]>=0x0){var _0x555c23=_0xf2d551[_0x5d35f8(0x4ac)][0x1]+_0x3d4e54;this[_0x5d35f8(0x339)][_0x5ba586]['parameters'][0x1]=_0x555c23;}else _0xf2d551[_0x5d35f8(0x4ac)][0x1]===-0x2&&(this[_0x5d35f8(0x339)][_0x5ba586]['parameters'][0x1]=_0xf2d551[_0x5d35f8(0x4ac)][0x1]);},Game_Interpreter[_0x3fecc6(0x1d6)][_0x3fecc6(0x1b1)]=function(_0x4687b4,_0x71e39a){const _0x402dd9=_0x3fecc6;for(const _0x2e6e84 of _0x4687b4[_0x402dd9(0x4ac)][0x0]){this[_0x402dd9(0x339)][_0x71e39a][_0x402dd9(0x4ac)][0x0][_0x402dd9(0x48a)](_0x2e6e84);}this['_list'][_0x402dd9(0x227)](this[_0x402dd9(0x2a9)]-0x1,0x2);},Game_Interpreter[_0x3fecc6(0x1d6)][_0x3fecc6(0x1f4)]=function(_0x2e54c0){const _0x31c901=_0x3fecc6,_0x54c304=_0x2e54c0[0x1];if(_0x54c304===_0x31c901(0x53b))this[_0x31c901(0x2a9)]++,this[_0x31c901(0x44f)](_0x2e54c0);else{if(_0x54c304===_0x31c901(0x388))this['_index']++,this['setArmorChoice'](_0x2e54c0);else _0x54c304===_0x31c901(0x4fb)&&Imported[_0x31c901(0x4a5)]&&(this['_index']++,this[_0x31c901(0x333)](_0x2e54c0));}},Game_Interpreter[_0x3fecc6(0x1d6)][_0x3fecc6(0x44f)]=function(_0x4ffd87){const _0x2674d0=_0x3fecc6,_0x49bab6=JSON['parse'](JSON['stringify'](_0x4ffd87[0x3]));VisuMZ[_0x2674d0(0x39f)](_0x49bab6,_0x49bab6),$gameMessage[_0x2674d0(0x44f)](_0x49bab6[_0x2674d0(0x2e9)]||0x0,_0x49bab6[_0x2674d0(0x4f6)]||0x0);},Game_Interpreter[_0x3fecc6(0x1d6)][_0x3fecc6(0x3cf)]=function(_0x560364){const _0x145b1c=_0x3fecc6,_0x2b8cd9=JSON[_0x145b1c(0x431)](JSON['stringify'](_0x560364[0x3]));VisuMZ['ConvertParams'](_0x2b8cd9,_0x2b8cd9),$gameMessage[_0x145b1c(0x3cf)](_0x2b8cd9['VariableID']||0x0,_0x2b8cd9[_0x145b1c(0x226)]||0x0,_0x2b8cd9[_0x145b1c(0x3c0)]||0x0);},Game_Interpreter[_0x3fecc6(0x1d6)][_0x3fecc6(0x333)]=function(_0x1e8d50){const _0x5c90a0=_0x3fecc6,_0x255511=JSON[_0x5c90a0(0x431)](JSON[_0x5c90a0(0x32f)](_0x1e8d50[0x3]));VisuMZ[_0x5c90a0(0x39f)](_0x255511,_0x255511),$gameMessage['setSkillChoice'](_0x255511[_0x5c90a0(0x2e9)]||0x0,_0x255511[_0x5c90a0(0x350)]||0x0,_0x255511[_0x5c90a0(0x464)]||0x0);};function Game_MessageCommonEvent(){const _0x1569de=_0x3fecc6;this[_0x1569de(0x3b5)](...arguments);}Game_MessageCommonEvent[_0x3fecc6(0x1d6)][_0x3fecc6(0x3b5)]=function(_0xf95a6c,_0x15543f){const _0x1efc65=_0x3fecc6;this[_0x1efc65(0x3d2)]=_0xf95a6c,this[_0x1efc65(0x524)]=_0x15543f||0x0,this['refresh']();},Game_MessageCommonEvent[_0x3fecc6(0x1d6)][_0x3fecc6(0x1f8)]=function(){const _0x5ce0d8=_0x3fecc6;return $dataCommonEvents[this[_0x5ce0d8(0x3d2)]];},Game_MessageCommonEvent[_0x3fecc6(0x1d6)]['list']=function(){const _0x93b6b=_0x3fecc6;return this[_0x93b6b(0x1f8)]()[_0x93b6b(0x335)];},Game_MessageCommonEvent['prototype'][_0x3fecc6(0x2a1)]=function(){const _0xa50f63=_0x3fecc6;this[_0xa50f63(0x204)]=new Game_Interpreter(),this['_interpreter'][_0xa50f63(0x4d7)](this[_0xa50f63(0x335)](),this[_0xa50f63(0x524)]);},Game_MessageCommonEvent['prototype'][_0x3fecc6(0x236)]=function(){const _0x494c5f=_0x3fecc6;this[_0x494c5f(0x204)]&&(this[_0x494c5f(0x204)][_0x494c5f(0x4a7)]()?this[_0x494c5f(0x204)][_0x494c5f(0x236)]():this['clear']());},Game_MessageCommonEvent[_0x3fecc6(0x1d6)][_0x3fecc6(0x472)]=function(){const _0x1cc8aa=_0x3fecc6;this[_0x1cc8aa(0x204)]=null;},Scene_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x376)]=function(){const _0x3dbbbb=_0x3fecc6,_0x2f3c9a=Math[_0x3dbbbb(0x28c)](Graphics['width'],$gameSystem[_0x3dbbbb(0x463)]()),_0x520d16=$gameSystem[_0x3dbbbb(0x326)](),_0x4c6904=this[_0x3dbbbb(0x47e)](_0x520d16,![]),_0x5b42e5=(Graphics['boxWidth']-_0x2f3c9a)/0x2,_0x1daf3b=0x0;return new Rectangle(_0x5b42e5,_0x1daf3b,_0x2f3c9a,_0x4c6904);},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x54d)]=Scene_Message['prototype'][_0x3fecc6(0x35d)],Scene_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x35d)]=function(){const _0x3362b9=_0x3fecc6;VisuMZ[_0x3362b9(0x46b)][_0x3362b9(0x54d)]['call'](this),this['createChoiceListHelpWindow']();},Scene_Message[_0x3fecc6(0x1d6)]['createChoiceListHelpWindow']=function(){const _0x2e24a4=_0x3fecc6,_0x11da6e=this[_0x2e24a4(0x469)](),_0x480bf7=new Window_Help(_0x11da6e);_0x480bf7['hide'](),this[_0x2e24a4(0x424)][_0x2e24a4(0x1a1)](_0x480bf7),this['_messageWindow'][_0x2e24a4(0x2ae)](_0x480bf7),this[_0x2e24a4(0x1bb)](_0x480bf7),this['_choiceListHelpWindow']=_0x480bf7;},Scene_Message[_0x3fecc6(0x1d6)]['choiceListHelpWindowRect']=function(){const _0x36da74=_0x3fecc6,_0x28d08c=0x0,_0x4313bd=0x0,_0x5dd998=Graphics['boxWidth'],_0x16affd=this[_0x36da74(0x47e)](0x2,![]);return new Rectangle(_0x28d08c,_0x4313bd,_0x5dd998,_0x16affd);},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x2ae)]=function(_0x5e2664){this['_choiceListHelpWindow']=_0x5e2664;},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x18a)]=function(){const _0x7ae11d=_0x3fecc6;if(!this['_choiceListHelpWindow'])return;const _0x214fa7=this[_0x7ae11d(0x1ff)];_0x214fa7&&(_0x214fa7['y']=this['y']>0x0?0x0:Graphics['boxHeight']-_0x214fa7['height']);},VisuMZ['MessageCore'][_0x3fecc6(0x534)]=Scene_Options[_0x3fecc6(0x1d6)][_0x3fecc6(0x4a9)],Scene_Options[_0x3fecc6(0x1d6)][_0x3fecc6(0x4a9)]=function(){const _0x34982c=_0x3fecc6;let _0x200136=VisuMZ[_0x34982c(0x46b)][_0x34982c(0x534)]['call'](this);const _0x19f132=VisuMZ[_0x34982c(0x46b)][_0x34982c(0x1ed)];if(_0x19f132[_0x34982c(0x4fa)][_0x34982c(0x4b3)]){_0x19f132['Localization'][_0x34982c(0x4e1)]&&TextManager[_0x34982c(0x2ab)]()&&_0x200136++;if(_0x19f132['TextSpeed'][_0x34982c(0x4e1)])_0x200136++;}return _0x200136;},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x348)]=Sprite_Picture[_0x3fecc6(0x1d6)][_0x3fecc6(0x460)],Sprite_Picture[_0x3fecc6(0x1d6)][_0x3fecc6(0x460)]=function(){const _0x52b409=_0x3fecc6;VisuMZ['MessageCore']['Sprite_Picture_updateBitmap'][_0x52b409(0x358)](this),this[_0x52b409(0x554)]();},VisuMZ[_0x3fecc6(0x46b)]['Sprite_Picture_update']=Sprite_Picture[_0x3fecc6(0x1d6)][_0x3fecc6(0x236)],Sprite_Picture[_0x3fecc6(0x1d6)][_0x3fecc6(0x236)]=function(){const _0x470293=_0x3fecc6;VisuMZ[_0x470293(0x46b)][_0x470293(0x2d3)][_0x470293(0x358)](this),this[_0x470293(0x532)]();},Sprite_Picture['prototype'][_0x3fecc6(0x532)]=function(){const _0x3e87cf=_0x3fecc6;if(!this[_0x3e87cf(0x35a)])return;this[_0x3e87cf(0x528)](),this[_0x3e87cf(0x503)](),this[_0x3e87cf(0x4d4)](),this[_0x3e87cf(0x540)]();},Sprite_Picture['prototype'][_0x3fecc6(0x554)]=function(){const _0x171c21=_0x3fecc6;if(this[_0x171c21(0x477)])return;if(this['_pictureTextSprite'])return;const _0xc3ff20=new Rectangle(0x0,0x0,0x0,0x0);this[_0x171c21(0x477)]=new Window_Base(_0xc3ff20),this[_0x171c21(0x477)][_0x171c21(0x1ac)]=0x0,this['_pictureTextSprite']=new Sprite(),this['addChildAt'](this[_0x171c21(0x38b)],0x0),this[_0x171c21(0x342)]=0x0,this[_0x171c21(0x29b)]=0x0,this['_pictureTextCache']={};},Sprite_Picture['prototype'][_0x3fecc6(0x528)]=function(){const _0x42087d=_0x3fecc6;if(!this[_0x42087d(0x477)])return;if(this['_pictureTextWidth']===this[_0x42087d(0x3ee)]&&this[_0x42087d(0x29b)]===this[_0x42087d(0x436)])return;this[_0x42087d(0x342)]=this[_0x42087d(0x3ee)],this['_pictureTextHeight']=this[_0x42087d(0x436)],this['_pictureTextCache']={},this['_pictureTextWindow']['move'](0x0,0x0,this[_0x42087d(0x3ee)],this[_0x42087d(0x436)]);},Sprite_Picture[_0x3fecc6(0x1d6)]['anchorPictureText']=function(){const _0x33c2a8=_0x3fecc6;if(!this[_0x33c2a8(0x38b)])return;this[_0x33c2a8(0x38b)]['anchor']['x']=this[_0x33c2a8(0x213)]['x'],this[_0x33c2a8(0x38b)][_0x33c2a8(0x213)]['y']=this[_0x33c2a8(0x213)]['y'];},Sprite_Picture[_0x3fecc6(0x1d6)][_0x3fecc6(0x4d4)]=function(){const _0x9a272e=_0x3fecc6;if(!this[_0x9a272e(0x477)])return;if(!this[_0x9a272e(0x51b)]())return;const _0xcba484=['upperleft','up','upperright',_0x9a272e(0x437),_0x9a272e(0x442),_0x9a272e(0x49e),_0x9a272e(0x4ae),_0x9a272e(0x3f8),_0x9a272e(0x275)];this['_pictureTextWindow'][_0x9a272e(0x2ce)]();for(const _0x529677 of _0xcba484){this[_0x9a272e(0x4bf)](_0x529677);}},Sprite_Picture[_0x3fecc6(0x1d6)][_0x3fecc6(0x51b)]=function(){const _0x234f73=_0x3fecc6;if($gameScreen['needsPictureTextRefresh'](this[_0x234f73(0x3b2)]))return!![];const _0x432def=[_0x234f73(0x564),'up',_0x234f73(0x1b8),_0x234f73(0x437),'center',_0x234f73(0x49e),_0x234f73(0x4ae),_0x234f73(0x3f8),'lowerright'];for(const _0x4285e5 of _0x432def){const _0x1c9fd4=$gameScreen[_0x234f73(0x31f)](this[_0x234f73(0x3b2)],_0x4285e5);if(this[_0x234f73(0x32e)][_0x4285e5]===_0x1c9fd4)continue;return!![];}return![];},Sprite_Picture[_0x3fecc6(0x1d6)]['drawPictureTextZone']=function(_0x4fa0ad){const _0x5d646c=_0x3fecc6;$gameScreen['clearPictureTextRefresh'](this[_0x5d646c(0x3b2)]);const _0xafdb29=$gameScreen[_0x5d646c(0x31f)](this[_0x5d646c(0x3b2)],_0x4fa0ad);this[_0x5d646c(0x32e)][_0x4fa0ad]=_0xafdb29;const _0x5803b1=this[_0x5d646c(0x477)][_0x5d646c(0x25d)](_0xafdb29);let _0x2388fc=$gameScreen['getPictureTextBuffer'](this[_0x5d646c(0x3b2)]),_0x447112=_0x2388fc,_0x3e9dc3=_0x2388fc;if(['up',_0x5d646c(0x442),_0x5d646c(0x3f8)][_0x5d646c(0x3c6)](_0x4fa0ad))_0x447112=Math[_0x5d646c(0x22d)]((this[_0x5d646c(0x3ee)]-_0x5803b1['width'])/0x2);else[_0x5d646c(0x1b8),_0x5d646c(0x49e),_0x5d646c(0x275)][_0x5d646c(0x3c6)](_0x4fa0ad)&&(_0x447112=Math[_0x5d646c(0x22d)](this['width']-_0x5803b1[_0x5d646c(0x3ee)]-_0x2388fc));if([_0x5d646c(0x437),_0x5d646c(0x442),_0x5d646c(0x49e)][_0x5d646c(0x3c6)](_0x4fa0ad))_0x3e9dc3=Math[_0x5d646c(0x22d)]((this[_0x5d646c(0x436)]-_0x5803b1[_0x5d646c(0x436)])/0x2);else[_0x5d646c(0x4ae),'down',_0x5d646c(0x275)][_0x5d646c(0x3c6)](_0x4fa0ad)&&(_0x3e9dc3=Math['floor'](this['height']-_0x5803b1[_0x5d646c(0x436)]-_0x2388fc));this[_0x5d646c(0x477)][_0x5d646c(0x3de)](_0xafdb29,_0x447112,_0x3e9dc3);},Sprite_Picture[_0x3fecc6(0x1d6)][_0x3fecc6(0x540)]=function(){const _0x3d1f57=_0x3fecc6;if(!this[_0x3d1f57(0x477)])return;if(!this['_pictureTextSprite'])return;this[_0x3d1f57(0x38b)][_0x3d1f57(0x52a)]=this['_pictureTextWindow'][_0x3d1f57(0x2e2)];},VisuMZ['MessageCore']['Window_Base_initialize']=Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x3b5)],Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x3b5)]=function(_0x490e3c){const _0x4de8fc=_0x3fecc6;this['initMessageCore'](_0x490e3c),VisuMZ[_0x4de8fc(0x46b)][_0x4de8fc(0x44a)]['call'](this,_0x490e3c);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x295)]=function(_0xf217c3){const _0x136b9d=_0x3fecc6;this[_0x136b9d(0x4fd)](),this[_0x136b9d(0x298)](),this[_0x136b9d(0x1c6)](_0xf217c3);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x4fd)]=function(){const _0x2542c0=_0x3fecc6;this[_0x2542c0(0x34e)](_0x2542c0(0x3bd));},Window_Base[_0x3fecc6(0x1d6)]['setTextAlignment']=function(_0x41aa11){this['_textAlignment']=_0x41aa11;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x510)]=function(){const _0x3c0d7b=_0x3fecc6;return this[_0x3c0d7b(0x55a)];},VisuMZ['MessageCore'][_0x3fecc6(0x412)]=Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x25d)],Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x25d)]=function(_0x9e4181){const _0x170813=_0x3fecc6;return this['resetWordWrap'](),VisuMZ[_0x170813(0x46b)][_0x170813(0x412)]['call'](this,_0x9e4181);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x508)]=function(_0x2f7502){const _0x335071=_0x3fecc6;return VisuMZ[_0x335071(0x46b)][_0x335071(0x412)][_0x335071(0x358)](this,_0x2f7502);},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x312)]=Window_Base['prototype'][_0x3fecc6(0x2c5)],Window_Base['prototype'][_0x3fecc6(0x2c5)]=function(_0x52fc0d){const _0x4fb62c=_0x3fecc6;VisuMZ[_0x4fb62c(0x46b)]['Window_Base_processAllText'][_0x4fb62c(0x358)](this,_0x52fc0d);if(_0x52fc0d[_0x4fb62c(0x2bf)])this['setTextAlignment']('default');},Window_Base['prototype']['resetWordWrap']=function(){const _0x2362ec=_0x3fecc6;this[_0x2362ec(0x52f)](![]);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x2d0)]=function(){const _0x14960d=_0x3fecc6;return this[_0x14960d(0x2f4)];},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x52f)]=function(_0x34a23e){const _0x3122db=_0x3fecc6;return this[_0x3122db(0x2f4)]=_0x34a23e,'';},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x1c6)]=function(_0x1a068f){const _0x43d90b=_0x3fecc6;this['_resetRect']=JsonEx[_0x43d90b(0x1f5)](_0x1a068f);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x51e)]=function(){const _0x39693b=_0x3fecc6;this[_0x39693b(0x2e2)]['fontFace']=$gameSystem[_0x39693b(0x1a6)](),this['contents'][_0x39693b(0x416)]=$gameSystem[_0x39693b(0x3cb)](),this[_0x39693b(0x2e2)][_0x39693b(0x4c3)]=![],this[_0x39693b(0x2e2)][_0x39693b(0x42a)]=![],this['_textCasing']=0x0,this[_0x39693b(0x4e4)]=!![],this[_0x39693b(0x2fa)]();},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x2fa)]=function(){const _0x16bf00=_0x3fecc6;this[_0x16bf00(0x248)](ColorManager[_0x16bf00(0x37b)]()),this[_0x16bf00(0x51a)](ColorManager[_0x16bf00(0x41b)]());const _0x1bf2f9=VisuMZ[_0x16bf00(0x46b)]['Settings']['General'];_0x1bf2f9[_0x16bf00(0x1d0)]===undefined&&(_0x1bf2f9[_0x16bf00(0x1d0)]=0x3),this[_0x16bf00(0x2e2)]['outlineWidth']=_0x1bf2f9[_0x16bf00(0x1d0)],this[_0x16bf00(0x268)](![]);},Window_Base['prototype'][_0x3fecc6(0x268)]=function(_0x354725){const _0x16b279=_0x3fecc6;this[_0x16b279(0x31b)]=_0x354725;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x507)]=function(){const _0x193444=_0x3fecc6;return this[_0x193444(0x31b)];},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x24f)]=function(){return![];},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x1c2)]=function(){const _0xd83ee5=_0x3fecc6,_0x260b98=[_0xd83ee5(0x4b1),_0xd83ee5(0x416),_0xd83ee5(0x4c3),_0xd83ee5(0x42a),_0xd83ee5(0x3dd),'outLineColor','outlineWidth',_0xd83ee5(0x46d)];let _0x287e9c={};for(const _0x4435d7 of _0x260b98){_0x287e9c[_0x4435d7]=this['contents'][_0x4435d7];}return _0x287e9c;},Window_Base[_0x3fecc6(0x1d6)]['returnPreservedFontSettings']=function(_0x407b22){const _0x4232f1=_0x3fecc6;for(const _0x2a8c2d in _0x407b22){this[_0x4232f1(0x2e2)][_0x2a8c2d]=_0x407b22[_0x2a8c2d];}},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x3d8)]=Window_Base['prototype']['update'],Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x236)]=function(){const _0x107481=_0x3fecc6;VisuMZ[_0x107481(0x46b)]['Window_Base_update'][_0x107481(0x358)](this),this['updateMove']();},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x27a)]=function(){return![];},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x3a5)]=function(){const _0x63be6c=_0x3fecc6;this['_moveDuration']>0x0&&(this[_0x63be6c(0x27a)]()&&(this['x']=this['applyMoveEasing'](this['x'],this['_moveTargetX']),this['y']=this[_0x63be6c(0x494)](this['y'],this[_0x63be6c(0x372)]),this[_0x63be6c(0x3ee)]=this[_0x63be6c(0x494)](this[_0x63be6c(0x3ee)],this['_moveTargetWidth']),this[_0x63be6c(0x436)]=this[_0x63be6c(0x494)](this[_0x63be6c(0x436)],this[_0x63be6c(0x1a9)]),this[_0x63be6c(0x2a6)]()),this['_moveDuration']--);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x2a6)]=function(_0x20311d,_0x743a7f){const _0x3c5e60=_0x3fecc6;!_0x20311d&&(this[_0x3c5e60(0x3ee)]=Math[_0x3c5e60(0x28c)](this[_0x3c5e60(0x3ee)],Graphics[_0x3c5e60(0x3ee)]),this[_0x3c5e60(0x436)]=Math[_0x3c5e60(0x28c)](this[_0x3c5e60(0x436)],Graphics[_0x3c5e60(0x436)]));if(!_0x743a7f){const _0x42da0d=-(Math[_0x3c5e60(0x22d)](Graphics['width']-Graphics[_0x3c5e60(0x3a0)])/0x2),_0x48a29f=_0x42da0d+Graphics['width']-this[_0x3c5e60(0x3ee)],_0x26a22c=-(Math[_0x3c5e60(0x22d)](Graphics[_0x3c5e60(0x436)]-Graphics[_0x3c5e60(0x380)])/0x2),_0x5cad9d=_0x26a22c+Graphics[_0x3c5e60(0x436)]-this[_0x3c5e60(0x436)];this['x']=this['x']['clamp'](_0x42da0d,_0x48a29f),this['y']=this['y'][_0x3c5e60(0x1e0)](_0x26a22c,_0x5cad9d);}},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x494)]=function(_0xd726f6,_0x3e0d6e){const _0x3aae6c=_0x3fecc6,_0x29444d=this[_0x3aae6c(0x4b9)],_0x681852=this[_0x3aae6c(0x27f)],_0x89099a=this['calcMoveEasing']((_0x681852-_0x29444d)/_0x681852),_0x7a8b6e=this[_0x3aae6c(0x270)]((_0x681852-_0x29444d+0x1)/_0x681852),_0x78be58=(_0xd726f6-_0x3e0d6e*_0x89099a)/(0x1-_0x89099a);return _0x78be58+(_0x3e0d6e-_0x78be58)*_0x7a8b6e;},Window_Base[_0x3fecc6(0x1d6)]['calcMoveEasing']=function(_0x3da18f){const _0x3f373d=_0x3fecc6,_0x5ba22e=0x2;switch(this[_0x3f373d(0x261)]){case 0x0:return _0x3da18f;case 0x1:return this[_0x3f373d(0x377)](_0x3da18f,_0x5ba22e);case 0x2:return this['easeOut'](_0x3da18f,_0x5ba22e);case 0x3:return this['easeInOut'](_0x3da18f,_0x5ba22e);default:return Imported[_0x3f373d(0x2fd)]?VisuMZ['applyMoveEasing'](_0x3da18f,this['_moveEasingType']):_0x3da18f;}},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x3f6)]=function(_0x471789,_0x7be898,_0x5c17bc,_0x15eb4a,_0x3cdd2c,_0x51f8e9){const _0x186e28=_0x3fecc6;this[_0x186e28(0x1ea)]=_0x471789,this[_0x186e28(0x372)]=_0x7be898,this[_0x186e28(0x43a)]=_0x5c17bc||this['width'],this[_0x186e28(0x1a9)]=_0x15eb4a||this['height'],this[_0x186e28(0x4b9)]=_0x3cdd2c||0x1;if(this[_0x186e28(0x4b9)]<=0x0)this[_0x186e28(0x4b9)]=0x1;this[_0x186e28(0x27f)]=this[_0x186e28(0x4b9)],this['_moveEasingType']=_0x51f8e9||0x0;if(_0x3cdd2c<=0x0)this[_0x186e28(0x3a5)]();},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x409)]=function(_0x5211dd,_0x7b127,_0x2a1764,_0x429b1d,_0x35ade4,_0x3bf7d2){const _0x235da0=_0x3fecc6;this['_moveTargetX']=this['x']+_0x5211dd,this[_0x235da0(0x372)]=this['y']+_0x7b127,this[_0x235da0(0x43a)]=this[_0x235da0(0x3ee)]+(_0x2a1764||0x0),this[_0x235da0(0x1a9)]=this['height']+(_0x429b1d||0x0),this[_0x235da0(0x4b9)]=_0x35ade4||0x1;if(this[_0x235da0(0x4b9)]<=0x0)this['_moveDuration']=0x1;this[_0x235da0(0x27f)]=this['_moveDuration'],this[_0x235da0(0x261)]=_0x3bf7d2||0x0;if(_0x35ade4<=0x0)this[_0x235da0(0x3a5)]();},Window_Base['prototype'][_0x3fecc6(0x465)]=function(_0x4c5f60,_0x3a91b7){const _0xe8f9c7=_0x3fecc6;this['moveTo'](this[_0xe8f9c7(0x3a2)]['x'],this[_0xe8f9c7(0x3a2)]['y'],this[_0xe8f9c7(0x3a2)][_0xe8f9c7(0x3ee)],this[_0xe8f9c7(0x3a2)][_0xe8f9c7(0x436)],_0x4c5f60,_0x3a91b7);},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x438)]=Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x248)],Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x248)]=function(_0x3bf0cb){const _0x32382a=_0x3fecc6;if(this[_0x32382a(0x507)]())return;_0x3bf0cb=_0x3bf0cb[_0x32382a(0x496)](/\,/g,''),this[_0x32382a(0x4a6)]=this[_0x32382a(0x4a6)]||[],this['_textColorStack'][_0x32382a(0x262)](this[_0x32382a(0x2e2)][_0x32382a(0x3dd)]),VisuMZ[_0x32382a(0x46b)][_0x32382a(0x438)][_0x32382a(0x358)](this,_0x3bf0cb);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x26f)]=function(_0x3cd6d9){const _0x5e3724=_0x3fecc6;this[_0x5e3724(0x4b0)](_0x3cd6d9);if(this['isColorLocked']())return;_0x3cd6d9[_0x5e3724(0x2bf)]&&(this[_0x5e3724(0x4a6)]=this['_textColorStack']||[],this[_0x5e3724(0x2e2)][_0x5e3724(0x3dd)]=this[_0x5e3724(0x4a6)][_0x5e3724(0x516)]()||ColorManager[_0x5e3724(0x37b)]());},Window_Base['prototype']['convertEscapeCharacters']=function(_0x261929){const _0x27f265=_0x3fecc6;return _0x261929=this[_0x27f265(0x1a8)](_0x261929),_0x261929=this[_0x27f265(0x36c)](_0x261929),_0x261929=this[_0x27f265(0x3a1)](_0x261929),_0x261929=this[_0x27f265(0x448)](_0x261929),_0x261929=this[_0x27f265(0x1ba)](_0x261929),_0x261929=this[_0x27f265(0x509)](_0x261929),_0x261929=this[_0x27f265(0x311)](_0x261929),_0x261929=this[_0x27f265(0x38f)](_0x261929),_0x261929=this[_0x27f265(0x4e0)](_0x261929),_0x261929=this[_0x27f265(0x19d)](_0x261929),_0x261929=this[_0x27f265(0x546)](_0x261929),_0x261929=this[_0x27f265(0x18e)](_0x261929),_0x261929=this['convertMessageCoreEscapeActions'](_0x261929),_0x261929=this[_0x27f265(0x4f7)](_0x261929),_0x261929=this[_0x27f265(0x575)](_0x261929),_0x261929=this[_0x27f265(0x3a1)](_0x261929),_0x261929=this[_0x27f265(0x2ee)](_0x261929),_0x261929=this[_0x27f265(0x2cd)](_0x261929),_0x261929;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x1a8)]=function(_0x51003e){const _0x14414f=_0x3fecc6;this[_0x14414f(0x4d5)]=![];for(const _0xf5595f of VisuMZ[_0x14414f(0x46b)][_0x14414f(0x1ed)][_0x14414f(0x349)]){_0x51003e&&_0x51003e[_0x14414f(0x498)](_0xf5595f[_0x14414f(0x198)])&&(this[_0x14414f(0x4d5)]=!![],_0x51003e=_0x51003e['replace'](_0xf5595f[_0x14414f(0x198)],_0xf5595f['textCodeResult']['bind'](this)));}return _0x51003e||'';},Window_Base[_0x3fecc6(0x1d6)]['convertBackslashCharacters']=function(_0x3419e8){const _0x5edf29=_0x3fecc6;return _0x3419e8=_0x3419e8[_0x5edf29(0x496)](/\\/g,'\x1b'),_0x3419e8=_0x3419e8[_0x5edf29(0x496)](/\x1b\x1b/g,'\x5c'),_0x3419e8;},Window_Base[_0x3fecc6(0x1d6)]['convertVariableEscapeCharacters']=function(_0x45b632){const _0x52afc5=_0x3fecc6;for(;;){if(_0x45b632[_0x52afc5(0x498)](/\\V\[(\d+)\]/gi))_0x45b632=_0x45b632[_0x52afc5(0x496)](/\\V\[(\d+)\]/gi,(_0x1a8d7a,_0x16e320)=>this[_0x52afc5(0x36c)](String($gameVariables[_0x52afc5(0x239)](parseInt(_0x16e320)))));else{if(_0x45b632['match'](/\x1bV\[(\d+)\]/gi))_0x45b632=_0x45b632['replace'](/\x1bV\[(\d+)\]/gi,(_0x20a3d2,_0x1576fd)=>this[_0x52afc5(0x36c)](String($gameVariables[_0x52afc5(0x239)](parseInt(_0x1576fd)))));else break;}}return _0x45b632;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x448)]=function(_0x2be29){const _0x1d1942=_0x3fecc6;return Imported[_0x1d1942(0x2fd)]&&(_0x2be29=_0x2be29[_0x1d1942(0x496)](/<Up (?:KEY|BUTTON)>/gi,this[_0x1d1942(0x537)]('up')),_0x2be29=_0x2be29[_0x1d1942(0x496)](/<Left (?:KEY|BUTTON)>/gi,this[_0x1d1942(0x537)](_0x1d1942(0x437))),_0x2be29=_0x2be29[_0x1d1942(0x496)](/<Right (?:KEY|BUTTON)>/gi,this[_0x1d1942(0x537)](_0x1d1942(0x49e))),_0x2be29=_0x2be29[_0x1d1942(0x496)](/<Down (?:KEY|BUTTON)>/gi,this[_0x1d1942(0x537)]('down')),_0x2be29=_0x2be29[_0x1d1942(0x496)](/<Ok (?:KEY|BUTTON)>/gi,this[_0x1d1942(0x537)]('ok')),_0x2be29=_0x2be29['replace'](/<Cancel (?:KEY|BUTTON)>/gi,this[_0x1d1942(0x537)]('cancel')),_0x2be29=_0x2be29[_0x1d1942(0x496)](/<Menu (?:KEY|BUTTON)>/gi,this[_0x1d1942(0x537)](_0x1d1942(0x1bf))),_0x2be29=_0x2be29['replace'](/<Shift (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x1d1942(0x516))),_0x2be29=_0x2be29[_0x1d1942(0x496)](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x1d1942(0x55c))),_0x2be29=_0x2be29['replace'](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this[_0x1d1942(0x537)](_0x1d1942(0x3f4)))),_0x2be29;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x537)]=function(_0x15cb8e){const _0x51a3e9=_0x3fecc6;let _0x9cbeaa=TextManager[_0x51a3e9(0x1cd)](_0x15cb8e)||'';return _0x9cbeaa=this[_0x51a3e9(0x36c)](_0x9cbeaa),_0x9cbeaa=this[_0x51a3e9(0x3a1)](_0x9cbeaa),_0x9cbeaa[_0x51a3e9(0x467)]();},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x1ba)]=function(_0x5a4d67){const _0x5c9d2a=_0x3fecc6;return _0x5a4d67=this[_0x5c9d2a(0x363)](_0x5a4d67),this[_0x5c9d2a(0x336)](),_0x5a4d67;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x363)]=function(_0x393333){const _0x1435e0=_0x3fecc6;return _0x393333=TextManager[_0x1435e0(0x395)](_0x393333),_0x393333;},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x1c8)]=String[_0x3fecc6(0x1d6)][_0x3fecc6(0x190)],String[_0x3fecc6(0x1d6)]['format']=function(){const _0x201345=_0x3fecc6;let _0x35c601=this;return _0x35c601=TextManager[_0x201345(0x395)](_0x35c601),VisuMZ[_0x201345(0x46b)][_0x201345(0x1c8)][_0x201345(0x399)](_0x35c601,arguments);},VisuMZ['MessageCore'][_0x3fecc6(0x53a)]=Bitmap[_0x3fecc6(0x1d6)][_0x3fecc6(0x402)],Bitmap[_0x3fecc6(0x1d6)][_0x3fecc6(0x402)]=function(_0xdecfef,_0x2fc2c8,_0x2d9741,_0x296bc1,_0x5f4ca6,_0x6d89e9){const _0x4d31e6=_0x3fecc6;_0xdecfef=TextManager['parseLocalizedText'](_0xdecfef),VisuMZ[_0x4d31e6(0x46b)][_0x4d31e6(0x53a)][_0x4d31e6(0x358)](this,_0xdecfef,_0x2fc2c8,_0x2d9741,_0x296bc1,_0x5f4ca6,_0x6d89e9);},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x459)]=Bitmap[_0x3fecc6(0x1d6)][_0x3fecc6(0x452)],Bitmap[_0x3fecc6(0x1d6)][_0x3fecc6(0x452)]=function(_0x491a22,_0x17eb06,_0x1cc60e,_0x92290b,_0x134c90,_0xd7f685){const _0x5f1458=_0x3fecc6;_0x491a22=TextManager[_0x5f1458(0x395)](_0x491a22),VisuMZ[_0x5f1458(0x46b)]['Bitmap_drawTextTopAligned'][_0x5f1458(0x358)](this,_0x491a22,_0x17eb06,_0x1cc60e,_0x92290b,_0x134c90,_0xd7f685);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x575)]=function(_0x38c692){return _0x38c692;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x509)]=function(_0x2a0cbc){const _0x5f0ddd=_0x3fecc6;return this[_0x5f0ddd(0x567)]()&&(_0x2a0cbc=_0x2a0cbc[_0x5f0ddd(0x496)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x2a0cbc=_0x2a0cbc[_0x5f0ddd(0x496)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x2a0cbc=_0x2a0cbc['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x2a0cbc=_0x2a0cbc[_0x5f0ddd(0x496)](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x2a0cbc=_0x2a0cbc[_0x5f0ddd(0x496)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x2a0cbc=_0x2a0cbc[_0x5f0ddd(0x496)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,''),_0x2a0cbc=_0x2a0cbc[_0x5f0ddd(0x496)](/<(?:FG|BG)(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/gi,''),_0x2a0cbc=_0x2a0cbc[_0x5f0ddd(0x496)](/<(?:FG|BG)(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/gi,'')),_0x2a0cbc;},Window_Base[_0x3fecc6(0x1d6)]['isChoiceWindow']=function(){const _0x2581ee=_0x3fecc6,_0x148e7d=[_0x2581ee(0x3a9),'Window_MessageLog'];return _0x148e7d[_0x2581ee(0x3c6)](this[_0x2581ee(0x2f3)]['name']);},Window_Base[_0x3fecc6(0x1d6)]['convertFontSettingsEscapeCharacters']=function(_0x2cd842){const _0xb9abeb=_0x3fecc6;return _0x2cd842=_0x2cd842[_0xb9abeb(0x496)](/<B>/gi,'\x1bBOLD[1]'),_0x2cd842=_0x2cd842[_0xb9abeb(0x496)](/<\/B>/gi,'\x1bBOLD[0]'),_0x2cd842=_0x2cd842[_0xb9abeb(0x496)](/<I>/gi,_0xb9abeb(0x42e)),_0x2cd842=_0x2cd842[_0xb9abeb(0x496)](/<\/I>/gi,'\x1bITALIC[0]'),_0x2cd842;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x38f)]=function(_0x2f1aa3){const _0x53c35f=_0x3fecc6;return _0x2f1aa3=_0x2f1aa3['replace'](/<LEFT>/gi,_0x53c35f(0x2e6)),_0x2f1aa3=_0x2f1aa3[_0x53c35f(0x496)](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x2f1aa3=_0x2f1aa3[_0x53c35f(0x496)](/<CENTER>/gi,_0x53c35f(0x3cd)),_0x2f1aa3=_0x2f1aa3[_0x53c35f(0x496)](/<\/CENTER>/gi,_0x53c35f(0x51c)),_0x2f1aa3=_0x2f1aa3[_0x53c35f(0x496)](/<RIGHT>/gi,_0x53c35f(0x36d)),_0x2f1aa3=_0x2f1aa3[_0x53c35f(0x496)](/<\/RIGHT>/gi,_0x53c35f(0x51c)),_0x2f1aa3;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x4e0)]=function(_0x4c0c34){const _0x3b602d=_0x3fecc6;return _0x4c0c34=_0x4c0c34['replace'](/<COLORLOCK>/gi,_0x3b602d(0x565)),_0x4c0c34=_0x4c0c34[_0x3b602d(0x496)](/<\/COLORLOCK>/gi,_0x3b602d(0x3dc)),_0x4c0c34=_0x4c0c34[_0x3b602d(0x496)](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0x4c0c34=_0x4c0c34[_0x3b602d(0x496)](/\)\)\)/gi,_0x3b602d(0x3dc)),_0x4c0c34;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x19d)]=function(_0x5aa68e){const _0x4cd62a=_0x3fecc6;return _0x5aa68e=_0x5aa68e[_0x4cd62a(0x496)](/<(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,'\x1bCASING[1]'),_0x5aa68e=_0x5aa68e[_0x4cd62a(0x496)](/<\/(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,_0x4cd62a(0x488)),_0x5aa68e=_0x5aa68e[_0x4cd62a(0x496)](/<(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,'\x1bCASING[2]'),_0x5aa68e=_0x5aa68e['replace'](/<\/(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,_0x4cd62a(0x488)),_0x5aa68e=_0x5aa68e[_0x4cd62a(0x496)](/<(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,_0x4cd62a(0x2c9)),_0x5aa68e=_0x5aa68e[_0x4cd62a(0x496)](/<\/(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,_0x4cd62a(0x488)),_0x5aa68e=_0x5aa68e[_0x4cd62a(0x496)](/<(?:ALT|ALTERNATE|ALT CASE)>/gi,'\x1bCASING[4]'),_0x5aa68e=_0x5aa68e['replace'](/<\/(?:ALT|ALTERNATE|ALT CASE)>/gi,_0x4cd62a(0x488)),_0x5aa68e=_0x5aa68e[_0x4cd62a(0x496)](/<(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,_0x4cd62a(0x31a)),_0x5aa68e=_0x5aa68e[_0x4cd62a(0x496)](/<\/(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,_0x4cd62a(0x488)),_0x5aa68e;},Window_Base['prototype'][_0x3fecc6(0x546)]=function(_0x5c04aa){const _0x3cef90=_0x3fecc6;return _0x5c04aa=_0x5c04aa['replace'](/\x1bN\[(\d+)\]/gi,(_0x30a148,_0x50d7bd)=>this[_0x3cef90(0x29c)](parseInt(_0x50d7bd))),_0x5c04aa=_0x5c04aa[_0x3cef90(0x496)](/\x1bP\[(\d+)\]/gi,(_0x4a05be,_0x59fe34)=>this[_0x3cef90(0x41a)](parseInt(_0x59fe34))),_0x5c04aa=_0x5c04aa[_0x3cef90(0x496)](/\x1bG/gi,TextManager[_0x3cef90(0x1a2)]),_0x5c04aa;},Window_Base[_0x3fecc6(0x1d6)]['convertHardcodedEscapeReplacements']=function(_0x48af2c){const _0x55b3ef=_0x3fecc6;return _0x48af2c=_0x48af2c[_0x55b3ef(0x496)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x55b3ef(0x456)]()),_0x48af2c=_0x48af2c[_0x55b3ef(0x496)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x55b3ef(0x25b)]()),_0x48af2c=_0x48af2c[_0x55b3ef(0x496)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x55b3ef(0x3f2)](!![])),_0x48af2c=_0x48af2c[_0x55b3ef(0x496)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x55b3ef(0x3f2)](![])),_0x48af2c;},Window_Base[_0x3fecc6(0x1d6)]['battleTargetName']=function(){const _0x2e4908=_0x3fecc6;if(!SceneManager[_0x2e4908(0x43b)]())return'';if(BattleManager[_0x2e4908(0x1c7)])return BattleManager[_0x2e4908(0x1c7)][_0x2e4908(0x2a3)]();if(BattleManager['_targets'][0x0])return BattleManager['_targets'][0x0][_0x2e4908(0x2a3)]();return'';},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x25b)]=function(){const _0x2b2a68=_0x3fecc6;if(!SceneManager[_0x2b2a68(0x43b)]())return'';let _0x25bddc=null;return _0x25bddc=BattleManager['_subject'],!_0x25bddc&&BattleManager[_0x2b2a68(0x406)]()&&(_0x25bddc=BattleManager[_0x2b2a68(0x341)]()),_0x25bddc?_0x25bddc[_0x2b2a68(0x2a3)]():'';},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x3f2)]=function(_0x59d4dd){const _0x4521b2=_0x3fecc6;if(!SceneManager[_0x4521b2(0x43b)]())return'';let _0x41aa7a=BattleManager[_0x4521b2(0x19f)]||null;!_0x41aa7a&&BattleManager['isInputting']()&&(_0x41aa7a=BattleManager['inputtingAction']());if(_0x41aa7a&&_0x41aa7a[_0x4521b2(0x28e)]()){let _0x2d2484='';if(_0x59d4dd)_0x2d2484+='\x1bI[%1]'['format'](_0x41aa7a['item']()[_0x4521b2(0x2c1)]);return _0x2d2484+=_0x41aa7a['item']()[_0x4521b2(0x2a3)],_0x2d2484;}return'';},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x2c2)]=function(_0x2a433a){const _0x33efa1=_0x3fecc6;for(const _0x2d2ff1 of VisuMZ[_0x33efa1(0x46b)][_0x33efa1(0x1ed)][_0x33efa1(0x36e)]){_0x2a433a[_0x33efa1(0x498)](_0x2d2ff1[_0x33efa1(0x198)])&&(_0x2a433a=_0x2a433a[_0x33efa1(0x496)](_0x2d2ff1[_0x33efa1(0x198)],_0x2d2ff1['textCodeResult']),_0x2a433a=this[_0x33efa1(0x3a1)](_0x2a433a));}return _0x2a433a;},Window_Base['prototype'][_0x3fecc6(0x4f7)]=function(_0x252b4e){const _0xa352cc=_0x3fecc6;for(const _0x33738e of VisuMZ[_0xa352cc(0x46b)]['Settings'][_0xa352cc(0x347)]){_0x252b4e[_0xa352cc(0x498)](_0x33738e['textCodeCheck'])&&(_0x252b4e=_0x252b4e[_0xa352cc(0x496)](_0x33738e['textCodeCheck'],_0x33738e['textCodeResult']['bind'](this)),_0x252b4e=this[_0xa352cc(0x3a1)](_0x252b4e));}return _0x252b4e;},Window_Base['prototype'][_0x3fecc6(0x29c)]=function(_0xaf42a7){const _0x43db1d=_0x3fecc6,_0x56c884=_0xaf42a7>=0x1?$gameActors[_0x43db1d(0x341)](_0xaf42a7):null,_0x234b1a=_0x56c884?_0x56c884['name']():'',_0x2c36ad=Number(VisuMZ[_0x43db1d(0x46b)][_0x43db1d(0x1ed)][_0x43db1d(0x20f)][_0x43db1d(0x2dc)]);return this['isAutoColorAffected']()&&_0x2c36ad!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x2c36ad,_0x234b1a):_0x234b1a;},Window_Base['prototype']['partyMemberName']=function(_0x1f0cc4){const _0x2d5624=_0x3fecc6,_0x238792=_0x1f0cc4>=0x1?$gameParty[_0x2d5624(0x476)]()[_0x1f0cc4-0x1]:null,_0x3d6520=_0x238792?_0x238792['name']():'',_0x17768b=Number(VisuMZ[_0x2d5624(0x46b)][_0x2d5624(0x1ed)][_0x2d5624(0x20f)][_0x2d5624(0x2dc)]);return this['isAutoColorAffected']()&&_0x17768b!==0x0?_0x2d5624(0x1b5)[_0x2d5624(0x190)](_0x17768b,_0x3d6520):_0x3d6520;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x2ee)]=function(_0x3f324f){const _0x259b91=_0x3fecc6;return this[_0x259b91(0x24f)]()&&(_0x3f324f=this['processStoredAutoColorChanges'](_0x3f324f),_0x3f324f=this[_0x259b91(0x208)](_0x3f324f)),_0x3f324f;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x578)]=function(_0x4246b0){const _0x390378=_0x3fecc6;for(autoColor of VisuMZ[_0x390378(0x46b)][_0x390378(0x513)]){_0x4246b0=_0x4246b0[_0x390378(0x496)](autoColor[0x0],autoColor[0x1]);}return _0x4246b0;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x387)]=function(){const _0x229fef=_0x3fecc6;this[_0x229fef(0x34c)]=[];},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x336)]=function(){const _0x3d66b8=_0x3fecc6;this[_0x3d66b8(0x387)]();const _0x5a06b3=VisuMZ['MessageCore'][_0x3d66b8(0x1ed)][_0x3d66b8(0x20f)],_0x30be99=_0x5a06b3[_0x3d66b8(0x2dc)];if(_0x30be99<=0x0)return;for(const _0x149c86 of $gameActors['_data']){if(!_0x149c86)continue;const _0x3a2016=_0x149c86[_0x3d66b8(0x2a3)]();if(_0x3a2016['trim']()[_0x3d66b8(0x43e)]<=0x0)continue;if(/^\d+$/[_0x3d66b8(0x2ad)](_0x3a2016))continue;if(_0x3a2016[_0x3d66b8(0x498)](/-----/i))continue;let _0x434cd1=VisuMZ[_0x3d66b8(0x46b)][_0x3d66b8(0x39b)](_0x3a2016);const _0x159b12=new RegExp('\x5cb'+_0x434cd1+'\x5cb','g'),_0x5129a5=_0x3d66b8(0x1b5)[_0x3d66b8(0x190)](_0x30be99,_0x3a2016);this[_0x3d66b8(0x34c)][_0x3d66b8(0x48a)]([_0x159b12,_0x5129a5]);}},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x208)]=function(_0x2b3914){const _0x114985=_0x3fecc6;this['_autoColorActorNames']===undefined&&this[_0x114985(0x336)]();for(autoColor of this[_0x114985(0x34c)]){_0x2b3914=_0x2b3914[_0x114985(0x496)](autoColor[0x0],autoColor[0x1]);}return _0x2b3914;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x415)]=function(_0x1b0522,_0x4b1f8c,_0x409b32){const _0x53e838=_0x3fecc6;if(!_0x1b0522)return'';const _0x4ba770=_0x1b0522[_0x4b1f8c];let _0x5f0a83='';if(_0x4ba770&&_0x409b32&&_0x4ba770['iconIndex']){const _0x19c3e0=_0x53e838(0x3da);_0x5f0a83=_0x19c3e0[_0x53e838(0x190)](_0x4ba770[_0x53e838(0x2c1)],_0x4ba770[_0x53e838(0x2a3)]);}else _0x4ba770?_0x5f0a83=_0x4ba770[_0x53e838(0x2a3)]:_0x5f0a83='';return _0x5f0a83=TextManager[_0x53e838(0x395)](_0x5f0a83),this['isAutoColorAffected']()&&(_0x5f0a83=this[_0x53e838(0x32a)](_0x5f0a83,_0x1b0522)),_0x5f0a83;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x4c1)]=function(){const _0x19ff35=_0x3fecc6,_0x159643=$gameParty[_0x19ff35(0x552)]();if(_0x159643['id']<0x0)return'';let _0x4ed253=null;if(_0x159643['type']===0x0)_0x4ed253=$dataItems[_0x159643['id']];if(_0x159643[_0x19ff35(0x228)]===0x1)_0x4ed253=$dataWeapons[_0x159643['id']];if(_0x159643[_0x19ff35(0x228)]===0x2)_0x4ed253=$dataArmors[_0x159643['id']];if(!_0x4ed253)return'';return _0x19ff35(0x38d)[_0x19ff35(0x190)](_0x4ed253['iconIndex']);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x1c4)]=function(_0xe0bab8){const _0x68d8ef=_0x3fecc6,_0x6b4852=$gameParty[_0x68d8ef(0x552)]();if(_0x6b4852['id']<0x0)return'';let _0x5b1b3a=null;if(_0x6b4852[_0x68d8ef(0x228)]===0x0)_0x5b1b3a=$dataItems[_0x6b4852['id']];if(_0x6b4852['type']===0x1)_0x5b1b3a=$dataWeapons[_0x6b4852['id']];if(_0x6b4852[_0x68d8ef(0x228)]===0x2)_0x5b1b3a=$dataArmors[_0x6b4852['id']];if(!_0x5b1b3a)return'';let _0x43cc86=_0x5b1b3a[_0x68d8ef(0x2a3)]||'';return TextManager['isVisuMzLocalizationEnabled']()&&(_0x43cc86=TextManager[_0x68d8ef(0x395)](_0x43cc86)),_0xe0bab8?_0x68d8ef(0x3da)[_0x68d8ef(0x190)](_0x5b1b3a[_0x68d8ef(0x2c1)],_0x43cc86):_0x43cc86;},Window_Base['prototype'][_0x3fecc6(0x37f)]=function(){const _0x3a5720=_0x3fecc6,_0x6907c=$gameParty[_0x3a5720(0x552)]();if(_0x6907c['id']<=0x0)return'';return _0x6907c[_0x3a5720(0x279)];},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x32a)]=function(_0x538c2e,_0x3b4791){const _0x26d410=_0x3fecc6,_0x5aefae=VisuMZ['MessageCore'][_0x26d410(0x1ed)][_0x26d410(0x20f)];let _0x19e9cd=0x0;if(_0x3b4791===$dataActors)_0x19e9cd=_0x5aefae[_0x26d410(0x2dc)];if(_0x3b4791===$dataClasses)_0x19e9cd=_0x5aefae[_0x26d410(0x39d)];if(_0x3b4791===$dataSkills)_0x19e9cd=_0x5aefae['Skills'];if(_0x3b4791===$dataItems)_0x19e9cd=_0x5aefae[_0x26d410(0x1a4)];if(_0x3b4791===$dataWeapons)_0x19e9cd=_0x5aefae[_0x26d410(0x212)];if(_0x3b4791===$dataArmors)_0x19e9cd=_0x5aefae[_0x26d410(0x4df)];if(_0x3b4791===$dataEnemies)_0x19e9cd=_0x5aefae[_0x26d410(0x30d)];if(_0x3b4791===$dataStates)_0x19e9cd=_0x5aefae['States'];return _0x19e9cd>0x0&&(_0x538c2e=_0x26d410(0x1b5)[_0x26d410(0x190)](_0x19e9cd,_0x538c2e)),_0x538c2e;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x2cd)]=function(_0x648213){const _0x4fd3ea=_0x3fecc6;if(_0x648213[_0x4fd3ea(0x3c6)]('\x1bTEXTALIGNMENT'))return this[_0x4fd3ea(0x52f)](![]),_0x648213=_0x648213[_0x4fd3ea(0x496)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x648213=_0x648213[_0x4fd3ea(0x496)](/<(?:WORDWRAP|WORD WRAP)>/gi,''),_0x648213=_0x648213[_0x4fd3ea(0x496)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,''),_0x648213=_0x648213['replace'](/<\/(?:NOWORDWRAP|NO WORD WRAP)>/gi,''),_0x648213;_0x648213=_0x648213[_0x4fd3ea(0x496)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x3764c0,_0x18f074)=>this['setWordWrap'](!![])),_0x648213=_0x648213[_0x4fd3ea(0x496)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x2d52d8,_0x9f5b5b)=>this[_0x4fd3ea(0x52f)](![])),_0x648213=_0x648213['replace'](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x3e8943,_0x4f6685)=>this[_0x4fd3ea(0x52f)](![]));if(_0x648213[_0x4fd3ea(0x498)](Window_Message[_0x4fd3ea(0x451)]))this[_0x4fd3ea(0x52f)](![]);else _0x648213[_0x4fd3ea(0x498)](Window_Message['_autoPosRegExp'])&&this['setWordWrap'](![]);if(!this['isWordWrapEnabled']())return _0x648213=_0x648213[_0x4fd3ea(0x496)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x648213;if(_0x648213[_0x4fd3ea(0x43e)]<=0x0)return _0x648213;return _0x648213[_0x4fd3ea(0x498)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)&&(_0x648213=VisuMZ[_0x4fd3ea(0x46b)][_0x4fd3ea(0x396)](_0x648213)['join']('')),VisuMZ[_0x4fd3ea(0x46b)][_0x4fd3ea(0x1ed)][_0x4fd3ea(0x523)][_0x4fd3ea(0x558)]?(_0x648213=_0x648213['replace'](/[\n\r]+/g,'\x20'),_0x648213=_0x648213['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x648213=_0x648213[_0x4fd3ea(0x496)](/[\n\r]+/g,''),_0x648213=_0x648213[_0x4fd3ea(0x496)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x648213=this[_0x4fd3ea(0x514)](_0x648213),_0x648213=_0x648213['split']('\x20')['join']('\x1bWrapBreak[0]'),_0x648213=_0x648213[_0x4fd3ea(0x496)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x648213=_0x648213[_0x4fd3ea(0x496)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x648213;},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x396)]=function(_0x419d1d){const _0x27109f=_0x3fecc6;let _0x5ee851=[],_0x555e8f='';while(_0x419d1d['length']>0x0){const _0x2d7214=_0x419d1d[_0x27109f(0x572)](0x0);_0x419d1d=_0x419d1d[_0x27109f(0x4f4)](0x1),_0x2d7214[_0x27109f(0x498)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)?(_0x555e8f['length']>0x0&&(_0x5ee851[_0x27109f(0x48a)](_0x555e8f),_0x555e8f=''),_0x5ee851[_0x27109f(0x48a)](_0x2d7214+'\x1bWrapJpBreak[0]')):_0x555e8f+=_0x2d7214;}return _0x555e8f['length']>0x0&&(_0x5ee851['push'](_0x555e8f),_0x555e8f=''),_0x5ee851;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x514)]=function(_0x4ef9b7){return _0x4ef9b7;},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x2d7)]=Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x2a5)],Window_Base[_0x3fecc6(0x1d6)]['processNewLine']=function(_0x4bf4d0){const _0x16330f=_0x3fecc6;VisuMZ[_0x16330f(0x46b)][_0x16330f(0x2d7)][_0x16330f(0x358)](this,_0x4bf4d0),this[_0x16330f(0x49d)](_0x4bf4d0);},Window_Base['prototype'][_0x3fecc6(0x491)]=function(_0x5cf8fa){const _0x56f781=_0x3fecc6;let _0x2670b8=_0x5cf8fa[_0x56f781(0x2e1)][_0x5cf8fa[_0x56f781(0x471)]++];if(_0x2670b8['charCodeAt'](0x0)<0x20)this['flushTextState'](_0x5cf8fa),this[_0x56f781(0x3e0)](_0x5cf8fa,_0x2670b8);else{if(this[_0x56f781(0x490)]===0x1)_0x2670b8=_0x2670b8[_0x56f781(0x435)]();if(this['_textCasing']===0x2){if(this[_0x56f781(0x4e4)])_0x2670b8=_0x2670b8[_0x56f781(0x328)]();this[_0x56f781(0x4e4)]=/\s/[_0x56f781(0x2ad)](_0x2670b8);}if(this['_textCasing']===0x3)_0x2670b8=_0x2670b8[_0x56f781(0x328)]();this[_0x56f781(0x490)]===0x4&&(_0x2670b8=this['_lastAltCase']?_0x2670b8[_0x56f781(0x328)]():_0x2670b8['toLowerCase'](),this[_0x56f781(0x46f)]=!this[_0x56f781(0x46f)]),this[_0x56f781(0x490)]===0x5&&(_0x2670b8=Math[_0x56f781(0x192)]()<0.5?_0x2670b8[_0x56f781(0x328)]():_0x2670b8[_0x56f781(0x435)]()),_0x5cf8fa[_0x56f781(0x2e5)]+=_0x2670b8;}},VisuMZ['MessageCore']['Window_Base_processControlCharacter']=Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x3e0)],Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x3e0)]=function(_0x3c2439,_0xd97e11){const _0x2b33d5=_0x3fecc6;VisuMZ[_0x2b33d5(0x46b)][_0x2b33d5(0x1f7)][_0x2b33d5(0x358)](this,_0x3c2439,_0xd97e11);if(_0xd97e11===_0x2b33d5(0x3fc))this[_0x2b33d5(0x28b)](_0x3c2439);else _0xd97e11===_0x2b33d5(0x3df)&&this['processWrapBreak'](_0x3c2439,!![]);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x433)]=function(_0x4e3013){const _0x4a9c70=_0x3fecc6;var _0x7a8c81=/^\<(.*?)\>/[_0x4a9c70(0x199)](_0x4e3013['text'][_0x4a9c70(0x4f4)](_0x4e3013['index']));return _0x7a8c81?(_0x4e3013[_0x4a9c70(0x471)]+=_0x7a8c81[0x0][_0x4a9c70(0x43e)],String(_0x7a8c81[0x0][_0x4a9c70(0x4f4)](0x1,_0x7a8c81[0x0]['length']-0x1))):'';},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x356)]=Window_Base['prototype'][_0x3fecc6(0x21e)],Window_Base[_0x3fecc6(0x1d6)]['processEscapeCharacter']=function(_0xbc8d14,_0x34e2f6){const _0x430b78=_0x3fecc6;switch(_0xbc8d14){case'C':_0x34e2f6[_0x430b78(0x2bf)]?VisuMZ['MessageCore'][_0x430b78(0x356)][_0x430b78(0x358)](this,_0xbc8d14,_0x34e2f6):this[_0x430b78(0x4b0)](_0x34e2f6);break;case'I':case'{':case'}':VisuMZ['MessageCore'][_0x430b78(0x356)]['call'](this,_0xbc8d14,_0x34e2f6);break;case'FS':this[_0x430b78(0x1e8)](_0x34e2f6);break;case'PX':this[_0x430b78(0x2b9)](_0x34e2f6);break;case'PY':this[_0x430b78(0x378)](_0x34e2f6);break;case _0x430b78(0x1ab):this[_0x430b78(0x2e8)](this['obtainEscapeParam'](_0x34e2f6));break;case'CASING':this['processTextCasing'](_0x34e2f6);break;case'CENTERPICTURE':this[_0x430b78(0x1ad)](_0x34e2f6);break;case _0x430b78(0x432):this[_0x430b78(0x2f7)](_0x34e2f6);break;case'COMMONEVENT':this['processCommonEvent'](_0x34e2f6);break;case _0x430b78(0x271):this['processFontChangeItalic'](this[_0x430b78(0x4b0)](_0x34e2f6));break;case _0x430b78(0x253):this[_0x430b78(0x1f2)](_0x34e2f6);break;case _0x430b78(0x18f):this[_0x430b78(0x26f)](_0x34e2f6);break;case _0x430b78(0x3b9):this['processTextAlignmentChange'](_0x34e2f6);break;case'WAIT':this[_0x430b78(0x4b6)](_0x34e2f6);break;case _0x430b78(0x293):this[_0x430b78(0x28b)](_0x34e2f6);break;case'WRAPJPBREAK':this[_0x430b78(0x28b)](_0x34e2f6,!![]);break;default:this[_0x430b78(0x313)](_0xbc8d14,_0x34e2f6);}},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x313)]=function(_0x3573b4,_0x4d180d){const _0xae2f48=_0x3fecc6;for(const _0xdf3b0c of VisuMZ[_0xae2f48(0x46b)]['Settings'][_0xae2f48(0x36e)]){if(_0xdf3b0c[_0xae2f48(0x533)]===_0x3573b4){if(_0xdf3b0c['Type']==='')this[_0xae2f48(0x4b0)](_0x4d180d);_0xdf3b0c['ActionJS'][_0xae2f48(0x358)](this,_0x4d180d);if(this[_0xae2f48(0x2f3)]===Window_Message){const _0x147fb6=_0xdf3b0c[_0xae2f48(0x40b)]||0x0;if(_0x147fb6>0x0)this[_0xae2f48(0x2f1)](_0x147fb6);}}}},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x18c)]=function(){const _0x29901b=_0x3fecc6;this[_0x29901b(0x2e2)]['fontSize']+=VisuMZ['MessageCore'][_0x29901b(0x1ed)]['General']['FontChangeValue'],this['contents'][_0x29901b(0x416)]=Math[_0x29901b(0x28c)](this[_0x29901b(0x2e2)][_0x29901b(0x416)],VisuMZ[_0x29901b(0x46b)][_0x29901b(0x1ed)][_0x29901b(0x40d)][_0x29901b(0x264)]);},Window_Base['prototype'][_0x3fecc6(0x2db)]=function(){const _0x452c0e=_0x3fecc6;this[_0x452c0e(0x2e2)][_0x452c0e(0x416)]-=VisuMZ[_0x452c0e(0x46b)][_0x452c0e(0x1ed)][_0x452c0e(0x40d)]['FontChangeValue'],this['contents']['fontSize']=Math['max'](this[_0x452c0e(0x2e2)][_0x452c0e(0x416)],VisuMZ[_0x452c0e(0x46b)][_0x452c0e(0x1ed)][_0x452c0e(0x40d)]['FontSmallerCap']);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x1e8)]=function(_0x5bf7a8){const _0x27bbf7=_0x3fecc6,_0x1d3a94=this[_0x27bbf7(0x4b0)](_0x5bf7a8);this[_0x27bbf7(0x2e2)]['fontSize']=_0x1d3a94['clamp'](VisuMZ['MessageCore']['Settings'][_0x27bbf7(0x40d)][_0x27bbf7(0x1c5)],VisuMZ[_0x27bbf7(0x46b)][_0x27bbf7(0x1ed)][_0x27bbf7(0x40d)]['FontBiggerCap']);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x4b4)]=function(_0x3db72d){const _0x1598d4=_0x3fecc6;let _0x40a025=this[_0x1598d4(0x2e2)]['fontSize'];const _0x432743=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0xa6b969=_0x432743[_0x1598d4(0x199)](_0x3db72d);if(!_0xa6b969)break;const _0x52000b=String(_0xa6b969[0x1])['toUpperCase']();if(_0x52000b==='{')this[_0x1598d4(0x18c)]();else{if(_0x52000b==='}')this['makeFontSmaller']();else _0x52000b==='FS'&&(this[_0x1598d4(0x2e2)][_0x1598d4(0x416)]=parseInt(_0xa6b969[0x3])['clamp'](VisuMZ[_0x1598d4(0x46b)][_0x1598d4(0x1ed)][_0x1598d4(0x40d)][_0x1598d4(0x1c5)],VisuMZ[_0x1598d4(0x46b)][_0x1598d4(0x1ed)][_0x1598d4(0x40d)][_0x1598d4(0x264)]));}this[_0x1598d4(0x2e2)][_0x1598d4(0x416)]>_0x40a025&&(_0x40a025=this[_0x1598d4(0x2e2)][_0x1598d4(0x416)]);}return _0x40a025;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x2b9)]=function(_0xf3bf1a){const _0x480341=_0x3fecc6;_0xf3bf1a['x']=this[_0x480341(0x4b0)](_0xf3bf1a),VisuMZ['MessageCore']['Settings'][_0x480341(0x40d)][_0x480341(0x2c8)]&&(_0xf3bf1a['x']+=_0xf3bf1a[_0x480341(0x493)]);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x378)]=function(_0x4ea7c6){const _0x1b32e2=_0x3fecc6;_0x4ea7c6['y']=this[_0x1b32e2(0x4b0)](_0x4ea7c6),VisuMZ['MessageCore']['Settings'][_0x1b32e2(0x40d)]['RelativePXPY']&&(_0x4ea7c6['y']+=_0x4ea7c6[_0x1b32e2(0x330)]);},Window_Base['prototype'][_0x3fecc6(0x2e8)]=function(_0x25b936){const _0x164ac6=_0x3fecc6;this[_0x164ac6(0x2e2)][_0x164ac6(0x4c3)]=!!_0x25b936;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x1b0)]=function(_0x37fbf9){const _0x46ca30=_0x3fecc6;this['contents'][_0x46ca30(0x42a)]=!!_0x37fbf9;},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x430)]=function(_0x3cbe2d){const _0xe983db=_0x3fecc6,_0x14a72d=this[_0xe983db(0x4b0)](_0x3cbe2d);if(!_0x3cbe2d['drawing'])return;switch(_0x14a72d){case 0x0:this['setTextAlignment'](_0xe983db(0x3bd));return;case 0x1:this['setTextAlignment'](_0xe983db(0x437));break;case 0x2:this[_0xe983db(0x34e)](_0xe983db(0x442));break;case 0x3:this[_0xe983db(0x34e)]('right');break;}this[_0xe983db(0x49d)](_0x3cbe2d);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x49d)]=function(_0x1f827f){const _0x39379e=_0x3fecc6;if(!_0x1f827f[_0x39379e(0x2bf)])return;if(_0x1f827f[_0x39379e(0x195)])return;if(this[_0x39379e(0x510)]()==='default')return;let _0x91d12e=_0x1f827f[_0x39379e(0x2e1)]['indexOf'](_0x39379e(0x3e9),_0x1f827f[_0x39379e(0x471)]+0x1),_0x5b3a76=_0x1f827f['text'][_0x39379e(0x365)]('\x0a',_0x1f827f[_0x39379e(0x471)]+0x1);if(_0x91d12e<0x0)_0x91d12e=_0x1f827f[_0x39379e(0x2e1)]['length']+0x1;if(_0x5b3a76>0x0)_0x91d12e=Math[_0x39379e(0x28c)](_0x91d12e,_0x5b3a76);const _0x391d6c=_0x1f827f[_0x39379e(0x2e1)][_0x39379e(0x309)](_0x1f827f[_0x39379e(0x471)],_0x91d12e),_0xcbf1d6=this['textSizeExTextAlignment'](_0x391d6c)['width'],_0x493b88=_0x1f827f[_0x39379e(0x3ee)]||this[_0x39379e(0x340)]-0x8,_0xdaa4d2=this[_0x39379e(0x2f3)]===Window_Message&&$gameMessage[_0x39379e(0x32d)]()!=='';switch(this[_0x39379e(0x510)]()){case _0x39379e(0x437):_0x1f827f['x']=_0x1f827f[_0x39379e(0x493)];break;case _0x39379e(0x442):_0x1f827f['x']=_0x1f827f[_0x39379e(0x493)],_0x1f827f['x']+=Math['floor']((_0x493b88-_0xcbf1d6)/0x2);_0xdaa4d2&&(_0x1f827f['x']-=_0x1f827f['startX']/0x2);break;case'right':_0x1f827f['x']=_0x493b88-_0xcbf1d6+_0x1f827f[_0x39379e(0x493)];_0xdaa4d2&&(_0x1f827f['x']-=_0x1f827f[_0x39379e(0x493)]);break;}},Window_Base['prototype'][_0x3fecc6(0x530)]=function(_0x5f2a9d){const _0x1dec7a=_0x3fecc6;_0x5f2a9d=_0x5f2a9d[_0x1dec7a(0x496)](/\x1b!/g,''),_0x5f2a9d=_0x5f2a9d[_0x1dec7a(0x496)](/\x1b\|/g,''),_0x5f2a9d=_0x5f2a9d['replace'](/\x1b\./g,'');const _0xf4dc68=this[_0x1dec7a(0x2ac)](_0x5f2a9d,0x0,0x0,0x0),_0x392c70=this[_0x1dec7a(0x1c2)]();return _0xf4dc68[_0x1dec7a(0x2bf)]=![],this[_0x1dec7a(0x2c5)](_0xf4dc68),this[_0x1dec7a(0x249)](_0x392c70),{'width':_0xf4dc68[_0x1dec7a(0x1fb)],'height':_0xf4dc68[_0x1dec7a(0x563)]};},Window_Base[_0x3fecc6(0x4ef)]=VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x1ed)]['WordWrap'][_0x3fecc6(0x413)]||0x0,Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x28b)]=function(_0x362622,_0x5d2d8f){const _0x1e34a1=_0x3fecc6,_0x5aa37e=(_0x362622['rtl']?-0x1:0x1)*this[_0x1e34a1(0x4ad)]('\x20');if(!_0x5d2d8f)_0x362622['x']+=_0x5aa37e;if(this['obtainEscapeParam'](_0x362622)>0x0&&!_0x5d2d8f)_0x362622['x']+=_0x5aa37e;if(_0x362622[_0x1e34a1(0x195)])return;let _0x531ddd;_0x5d2d8f?_0x531ddd=_0x362622[_0x1e34a1(0x2e1)][_0x1e34a1(0x365)](_0x1e34a1(0x3df),_0x362622[_0x1e34a1(0x471)]+0x1):_0x531ddd=_0x362622[_0x1e34a1(0x2e1)][_0x1e34a1(0x365)](_0x1e34a1(0x3fc),_0x362622[_0x1e34a1(0x471)]+0x1);let _0xfc0fd8=_0x362622[_0x1e34a1(0x2e1)][_0x1e34a1(0x365)]('\x0a',_0x362622[_0x1e34a1(0x471)]+0x1);if(_0x531ddd<0x0)_0x531ddd=_0x362622['text'][_0x1e34a1(0x43e)]+0x1;if(_0xfc0fd8>0x0)_0x531ddd=Math[_0x1e34a1(0x28c)](_0x531ddd,_0xfc0fd8);const _0x616cdb=_0x362622['text'][_0x1e34a1(0x309)](_0x362622[_0x1e34a1(0x471)],_0x531ddd),_0x4eb17d=this[_0x1e34a1(0x1c9)](_0x616cdb)[_0x1e34a1(0x3ee)];let _0xb7d6f5=_0x362622[_0x1e34a1(0x3ee)]||this[_0x1e34a1(0x340)];_0xb7d6f5-=Window_Base[_0x1e34a1(0x4ef)];if(this[_0x1e34a1(0x2f3)]===Window_Message){const _0x526c47=$gameMessage[_0x1e34a1(0x32d)]()===''?0x0:ImageManager[_0x1e34a1(0x3fe)]+0x14;_0xb7d6f5-=_0x526c47,VisuMZ[_0x1e34a1(0x46b)]['Settings'][_0x1e34a1(0x523)][_0x1e34a1(0x3c3)]&&(_0xb7d6f5-=_0x526c47);}let _0x447ee9=![];_0x362622['x']+_0x4eb17d>_0x362622[_0x1e34a1(0x493)]+_0xb7d6f5&&(_0x447ee9=!![]),_0x4eb17d===0x0&&(_0x447ee9=![]),_0x447ee9&&(_0x362622[_0x1e34a1(0x2e1)]=_0x362622['text'][_0x1e34a1(0x4f4)](0x0,_0x362622[_0x1e34a1(0x471)])+'\x0a'+_0x362622[_0x1e34a1(0x2e1)][_0x1e34a1(0x367)](_0x362622[_0x1e34a1(0x471)]));},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x1c9)]=function(_0xd5314a){const _0x506a3d=_0x3fecc6,_0x403563=this['createTextState'](_0xd5314a,0x0,0x0,0x0),_0x3e8a95=this[_0x506a3d(0x1c2)]();return _0x403563[_0x506a3d(0x2bf)]=![],this[_0x506a3d(0x52f)](![]),this['processAllText'](_0x403563),this[_0x506a3d(0x52f)](!![]),this['returnPreservedFontSettings'](_0x3e8a95),{'width':_0x403563['outputWidth'],'height':_0x403563[_0x506a3d(0x563)]};},Window_Base[_0x3fecc6(0x1d6)]['processCommonEvent']=function(_0xc5c3c6){const _0x2e42e1=_0x3fecc6;return this[_0x2e42e1(0x4b0)](_0xc5c3c6);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x1f2)]=function(_0x6559ab){const _0x43ad36=_0x3fecc6,_0x14c751=this[_0x43ad36(0x433)](_0x6559ab)[_0x43ad36(0x3f0)](',');if(!_0x6559ab[_0x43ad36(0x2bf)])return;const _0x1f2937=_0x14c751[0x0][_0x43ad36(0x467)](),_0x5b7088=_0x14c751[0x1]||0x0,_0x4509b7=_0x14c751[0x2]||0x0,_0xa518cd=ImageManager[_0x43ad36(0x18b)](_0x1f2937),_0x8965f1=this['contents'][_0x43ad36(0x46d)];_0xa518cd['addLoadListener'](this[_0x43ad36(0x2e4)][_0x43ad36(0x42f)](this,_0xa518cd,_0x6559ab['x'],_0x6559ab['y'],_0x5b7088,_0x4509b7,_0x8965f1));},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x2e4)]=function(_0x464c6c,_0x2af365,_0xbc23ad,_0x5c095b,_0x2c0ccb,_0x46cc50){const _0x238a01=_0x3fecc6;_0x5c095b=_0x5c095b||_0x464c6c[_0x238a01(0x3ee)],_0x2c0ccb=_0x2c0ccb||_0x464c6c[_0x238a01(0x436)],this[_0x238a01(0x385)][_0x238a01(0x46d)]=_0x46cc50,this['contentsBack'][_0x238a01(0x1ce)](_0x464c6c,0x0,0x0,_0x464c6c[_0x238a01(0x3ee)],_0x464c6c[_0x238a01(0x436)],_0x2af365,_0xbc23ad,_0x5c095b,_0x2c0ccb),this[_0x238a01(0x385)][_0x238a01(0x46d)]=0xff;},Window_Base[_0x3fecc6(0x1d6)]['processDrawCenteredPicture']=function(_0x152f7d){const _0x39bcb1=_0x3fecc6,_0x1ff05f=this['obtainEscapeString'](_0x152f7d)['split'](',');if(!_0x152f7d['drawing'])return;const _0x5c92ce=_0x1ff05f[0x0][_0x39bcb1(0x467)](),_0x4f4b2a=ImageManager[_0x39bcb1(0x18b)](_0x5c92ce),_0x33b480=JsonEx[_0x39bcb1(0x1f5)](_0x152f7d),_0x3f1809=this['contents'][_0x39bcb1(0x46d)];_0x4f4b2a['addLoadListener'](this[_0x39bcb1(0x562)][_0x39bcb1(0x42f)](this,_0x4f4b2a,_0x33b480,_0x3f1809));},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x562)]=function(_0x368bee,_0x27fa0e,_0x4eb7c){const _0x5b1521=_0x3fecc6,_0x40f739=_0x27fa0e[_0x5b1521(0x3ee)]||this['innerWidth'],_0x29f594=this['_index']!==undefined?this[_0x5b1521(0x301)]():this[_0x5b1521(0x291)],_0x5152d8=_0x40f739/_0x368bee[_0x5b1521(0x3ee)],_0x12a06e=_0x29f594/_0x368bee[_0x5b1521(0x436)],_0x38975e=Math[_0x5b1521(0x28c)](_0x5152d8,_0x12a06e,0x1),_0x1bd9d7=this[_0x5b1521(0x2a9)]!==undefined?(this[_0x5b1521(0x411)](0x0)[_0x5b1521(0x436)]-this['lineHeight']())/0x2:0x0,_0x1c9766=_0x368bee['width']*_0x38975e,_0x17820c=_0x368bee[_0x5b1521(0x436)]*_0x38975e,_0x496738=Math['floor']((_0x40f739-_0x1c9766)/0x2)+_0x27fa0e['startX'],_0x58d26b=Math[_0x5b1521(0x22d)]((_0x29f594-_0x17820c)/0x2)+_0x27fa0e[_0x5b1521(0x330)]-_0x1bd9d7*0x2;this[_0x5b1521(0x385)][_0x5b1521(0x46d)]=_0x4eb7c,this[_0x5b1521(0x385)][_0x5b1521(0x1ce)](_0x368bee,0x0,0x0,_0x368bee[_0x5b1521(0x3ee)],_0x368bee['height'],_0x496738,_0x58d26b,_0x1c9766,_0x17820c),this[_0x5b1521(0x385)][_0x5b1521(0x46d)]=0xff;},Window_Base['prototype'][_0x3fecc6(0x2f7)]=function(_0xa7051a){const _0xfccbd2=_0x3fecc6,_0x489845=this[_0xfccbd2(0x4b0)](_0xa7051a);if(_0xa7051a[_0xfccbd2(0x2bf)])this['setColorLock'](_0x489845>0x0);},Window_Base[_0x3fecc6(0x1d6)]['processCustomWait']=function(_0x1cc2b3){const _0x12ea06=_0x3fecc6,_0x20b359=this[_0x12ea06(0x4b0)](_0x1cc2b3);this[_0x12ea06(0x2f3)]===Window_Message&&_0x1cc2b3[_0x12ea06(0x2bf)]&&this[_0x12ea06(0x571)](_0x20b359);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x1a3)]=function(_0x1d3e87){const _0x1ab61a=_0x3fecc6;this[_0x1ab61a(0x490)]=this[_0x1ab61a(0x4b0)](_0x1d3e87),this[_0x1ab61a(0x4e4)]=!![],this[_0x1ab61a(0x46f)]=!![];},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x2f9)]=function(_0x3a1b89){const _0x2b0cc3=_0x3fecc6;if($gameTemp[_0x2b0cc3(0x2be)]()){let _0xe86302='%1,\x20does\x20not\x20support\x20attempted\x20text\x20code\x20usage.'[_0x2b0cc3(0x190)](_0x3a1b89[_0x2b0cc3(0x2f3)][_0x2b0cc3(0x2a3)]);alert(_0xe86302),SceneManager[_0x2b0cc3(0x355)]();}},Window_Base['prototype'][_0x3fecc6(0x4ab)]=function(){const _0x18136a=_0x3fecc6;VisuMZ['MessageCore'][_0x18136a(0x2f9)](this);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x283)]=function(){const _0x31ff66=_0x3fecc6;VisuMZ[_0x31ff66(0x46b)][_0x31ff66(0x2f9)](this);},Window_Base[_0x3fecc6(0x1d6)][_0x3fecc6(0x317)]=function(){const _0x4fc40a=_0x3fecc6;VisuMZ['MessageCore'][_0x4fc40a(0x2f9)](this);},Window_Help[_0x3fecc6(0x1d6)][_0x3fecc6(0x298)]=function(){const _0x264a39=_0x3fecc6;this[_0x264a39(0x52f)]($gameSystem['isHelpWindowWordWrap']());},Window_Help['prototype'][_0x3fecc6(0x24f)]=function(){return!![];},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x4e9)]=Window_Help[_0x3fecc6(0x1d6)]['refresh'],Window_Help['prototype'][_0x3fecc6(0x2a1)]=function(){const _0x316dc9=_0x3fecc6;this['clearActorNameAutoColor']();if(this[_0x316dc9(0x385)])this[_0x316dc9(0x385)][_0x316dc9(0x472)]();VisuMZ[_0x316dc9(0x46b)][_0x316dc9(0x4e9)]['call'](this),this[_0x316dc9(0x298)]();},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x1d5)]=Window_Options['prototype']['addGeneralOptions'],Window_Options[_0x3fecc6(0x1d6)]['addGeneralOptions']=function(){const _0x1a6b50=_0x3fecc6;VisuMZ[_0x1a6b50(0x46b)][_0x1a6b50(0x1d5)][_0x1a6b50(0x358)](this),this[_0x1a6b50(0x3be)]();},Window_Options[_0x3fecc6(0x1d6)]['addMessageCoreCommands']=function(){const _0x55bc14=_0x3fecc6;VisuMZ[_0x55bc14(0x46b)][_0x55bc14(0x1ed)][_0x55bc14(0x232)]['AddOption']&&TextManager['isVisuMzLocalizationEnabled']()&&this[_0x55bc14(0x2eb)](),VisuMZ['MessageCore'][_0x55bc14(0x1ed)]['TextSpeed'][_0x55bc14(0x4e1)]&&this[_0x55bc14(0x4d2)]();},Window_Options['prototype'][_0x3fecc6(0x2eb)]=function(){const _0x5794b2=_0x3fecc6,_0x432583=TextManager[_0x5794b2(0x2de)],_0x2750a9=_0x5794b2(0x27d);this['addCommand'](_0x432583,_0x2750a9);},Window_Options[_0x3fecc6(0x1d6)][_0x3fecc6(0x4d2)]=function(){const _0x431db3=_0x3fecc6,_0x75c927=TextManager[_0x431db3(0x1fc)],_0x2f531f=_0x431db3(0x482);this['addCommand'](_0x75c927,_0x2f531f);},VisuMZ[_0x3fecc6(0x46b)]['Window_Options_statusText']=Window_Options[_0x3fecc6(0x1d6)][_0x3fecc6(0x4a0)],Window_Options[_0x3fecc6(0x1d6)][_0x3fecc6(0x4a0)]=function(_0x302119){const _0xab20b7=_0x3fecc6,_0x3df570=this[_0xab20b7(0x555)](_0x302119);if(_0x3df570===_0xab20b7(0x27d))return this['visuMzTextLocaleStatusText']();if(_0x3df570==='textSpeed')return this['textSpeedStatusText']();return VisuMZ[_0xab20b7(0x46b)]['Window_Options_statusText'][_0xab20b7(0x358)](this,_0x302119);},Window_Options[_0x3fecc6(0x1d6)][_0x3fecc6(0x2ef)]=function(){const _0x18cca7=_0x3fecc6,_0x47ba5b=ConfigManager[_0x18cca7(0x27d)];return TextManager[_0x18cca7(0x23b)](_0x47ba5b);},Window_Options[_0x3fecc6(0x1d6)][_0x3fecc6(0x4c2)]=function(){const _0x330c9a=_0x3fecc6,_0x59471b=this[_0x330c9a(0x252)](_0x330c9a(0x482));return _0x59471b>0xa?TextManager[_0x330c9a(0x194)]:_0x59471b;},VisuMZ['MessageCore'][_0x3fecc6(0x421)]=Window_Options[_0x3fecc6(0x1d6)][_0x3fecc6(0x473)],Window_Options['prototype']['isVolumeSymbol']=function(_0x3cae87){const _0x252147=_0x3fecc6;if(_0x3cae87===_0x252147(0x27d))return!![];if(_0x3cae87==='textSpeed')return!![];return VisuMZ[_0x252147(0x46b)][_0x252147(0x421)][_0x252147(0x358)](this,_0x3cae87);},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x48d)]=Window_Options[_0x3fecc6(0x1d6)][_0x3fecc6(0x22b)],Window_Options[_0x3fecc6(0x1d6)][_0x3fecc6(0x22b)]=function(_0x14d3a2,_0x5a9726,_0x207e5e){const _0x874346=_0x3fecc6;if(_0x14d3a2===_0x874346(0x27d))return this[_0x874346(0x3eb)](_0x5a9726,_0x207e5e);if(_0x14d3a2===_0x874346(0x482))return this[_0x874346(0x458)](_0x14d3a2,_0x5a9726,_0x207e5e);VisuMZ[_0x874346(0x46b)][_0x874346(0x48d)][_0x874346(0x358)](this,_0x14d3a2,_0x5a9726,_0x207e5e);},Window_Options[_0x3fecc6(0x1d6)][_0x3fecc6(0x3eb)]=function(_0x48eecf,_0x14556e){const _0x40d230=_0x3fecc6,_0x36093a=VisuMZ['MessageCore'][_0x40d230(0x1ed)]['Localization']['Languages']||[],_0x524476=ConfigManager[_0x40d230(0x27d)];let _0x19ed9d=_0x36093a[_0x40d230(0x365)](_0x524476);_0x19ed9d+=_0x48eecf?0x1:-0x1;if(_0x19ed9d>=_0x36093a[_0x40d230(0x43e)])_0x19ed9d=_0x14556e?0x0:_0x36093a[_0x40d230(0x43e)]-0x1;if(_0x19ed9d<0x0)_0x19ed9d=_0x14556e?_0x36093a['length']-0x1:0x0;this[_0x40d230(0x391)](_0x40d230(0x27d),_0x36093a[_0x19ed9d]);},Window_Options[_0x3fecc6(0x1d6)][_0x3fecc6(0x458)]=function(_0xd9fc3b,_0x18b5af,_0x5906e7){const _0x4c7e86=_0x3fecc6,_0x40b7b2=this[_0x4c7e86(0x252)](_0xd9fc3b),_0x393791=0x1,_0x59ecb0=_0x40b7b2+(_0x18b5af?_0x393791:-_0x393791);_0x59ecb0>0xb&&_0x5906e7?this[_0x4c7e86(0x391)](_0xd9fc3b,0x1):this[_0x4c7e86(0x391)](_0xd9fc3b,_0x59ecb0['clamp'](0x1,0xb));},Window_Message[_0x3fecc6(0x1d6)]['contentsHeight']=function(){const _0x5434fb=_0x3fecc6;let _0x2cbe23=Window_Base[_0x5434fb(0x1d6)][_0x5434fb(0x1c3)]['call'](this);return _0x2cbe23-=this['addedHeight'](),_0x2cbe23;},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x3ad)]=function(){const _0x18637b=_0x3fecc6;Window_Base[_0x18637b(0x1d6)][_0x18637b(0x3ad)]['call'](this),VisuMZ['MessageCore'][_0x18637b(0x1ed)][_0x18637b(0x40d)][_0x18637b(0x296)]&&this[_0x18637b(0x3c8)]();},Window_Message[_0x3fecc6(0x1d6)]['stretchDimmerSprite']=function(){const _0x1d046c=_0x3fecc6;this[_0x1d046c(0x1be)]['x']=Math[_0x1d046c(0x278)](this[_0x1d046c(0x3ee)]/0x2),this[_0x1d046c(0x1be)][_0x1d046c(0x213)]['x']=0.5,this[_0x1d046c(0x1be)][_0x1d046c(0x455)]['x']=Graphics[_0x1d046c(0x3ee)];},VisuMZ[_0x3fecc6(0x46b)]['Window_Message_clearFlags']=Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x42d)],Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x42d)]=function(){const _0x24fed3=_0x3fecc6;VisuMZ[_0x24fed3(0x46b)]['Window_Message_clearFlags'][_0x24fed3(0x358)](this),this[_0x24fed3(0x387)](),this['resetWordWrap'](),this[_0x24fed3(0x268)](![]),this['setTextAlignment'](_0x24fed3(0x3bd)),this[_0x24fed3(0x317)](VisuMZ[_0x24fed3(0x46b)][_0x24fed3(0x1ed)][_0x24fed3(0x40d)][_0x24fed3(0x4b5)]);},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x298)]=function(){const _0x31a5d0=_0x3fecc6;this[_0x31a5d0(0x52f)]($gameSystem[_0x31a5d0(0x258)]());},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x24f)]=function(){return!![];},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x317)]=function(_0x34463a){const _0xeb1906=_0x3fecc6,_0x581a3b=0xb-ConfigManager[_0xeb1906(0x482)];_0x34463a=Math['round'](_0x34463a*_0x581a3b),this[_0xeb1906(0x3e2)]=_0x34463a,this[_0xeb1906(0x2d8)]=_0x34463a;},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x4c7)]=Window_Message[_0x3fecc6(0x1d6)]['isTriggered'],Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x4f9)]=function(){const _0x44d455=_0x3fecc6;return VisuMZ['MessageCore'][_0x44d455(0x4c7)]['call'](this)||Input[_0x44d455(0x428)](VisuMZ[_0x44d455(0x46b)]['Settings'][_0x44d455(0x40d)][_0x44d455(0x1af)]);},VisuMZ['MessageCore'][_0x3fecc6(0x42c)]=Window_Message['prototype'][_0x3fecc6(0x4fe)],Window_Message[_0x3fecc6(0x1d6)]['updatePlacement']=function(){const _0x195db0=_0x3fecc6;let _0x13f9a1=this['y'];this['x']=Math[_0x195db0(0x278)]((Graphics[_0x195db0(0x3a0)]-this[_0x195db0(0x3ee)])/0x2),VisuMZ[_0x195db0(0x46b)][_0x195db0(0x42c)][_0x195db0(0x358)](this);if(this[_0x195db0(0x290)])this['y']=_0x13f9a1;this[_0x195db0(0x2c7)](),this[_0x195db0(0x21b)](),this[_0x195db0(0x2a6)](),this['updateChoiceListHelpWindowPlacement']();},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x210)]=Window_Message['prototype'][_0x3fecc6(0x4c6)],Window_Message['prototype'][_0x3fecc6(0x4c6)]=function(_0x2ca636){const _0x55f3a6=_0x3fecc6;this[_0x55f3a6(0x470)](_0x2ca636),this[_0x55f3a6(0x33f)](_0x2ca636),VisuMZ[_0x55f3a6(0x46b)][_0x55f3a6(0x210)]['call'](this,_0x2ca636),this[_0x55f3a6(0x2ce)]();},Window_Message[_0x3fecc6(0x1d6)]['convertNewPageTextStateMacros']=function(_0x2fe56c){const _0x4325be=_0x3fecc6;if(!_0x2fe56c)return;this[_0x4325be(0x381)]=![],_0x2fe56c['text']=this[_0x4325be(0x1a8)](_0x2fe56c['text']),this[_0x4325be(0x4d5)]&&(_0x2fe56c[_0x4325be(0x2e1)]=this[_0x4325be(0x2cd)](_0x2fe56c[_0x4325be(0x2e1)]),this[_0x4325be(0x381)]=!![]);},Window_Message[_0x3fecc6(0x1d6)]['prepareWordWrapEscapeCharacters']=function(_0x332b63){const _0x35f6bb=_0x3fecc6;if(this['_macroBypassWordWrap'])return _0x332b63;return Window_Base[_0x35f6bb(0x1d6)][_0x35f6bb(0x2cd)]['call'](this,_0x332b63);},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x33f)]=function(_0x1f9791){const _0x47a549=_0x3fecc6;this[_0x47a549(0x299)](_0x1f9791),this[_0x47a549(0x24e)](_0x1f9791),this['updateDimensions']();},VisuMZ['MessageCore'][_0x3fecc6(0x24c)]=Window_Message['prototype'][_0x3fecc6(0x1ca)],Window_Message[_0x3fecc6(0x1d6)]['terminateMessage']=function(){const _0xc30c36=_0x3fecc6;VisuMZ[_0xc30c36(0x46b)][_0xc30c36(0x24c)]['call'](this),this[_0xc30c36(0x42d)]();if(this[_0xc30c36(0x1d7)])this['messagePositionReset']();},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x4b7)]=function(){const _0x3c1a03=_0x3fecc6;this['width']=$gameSystem[_0x3c1a03(0x463)]()+this[_0x3c1a03(0x33d)]();;this[_0x3c1a03(0x3ee)]=Math[_0x3c1a03(0x28c)](Graphics[_0x3c1a03(0x3ee)],this[_0x3c1a03(0x3ee)]);const _0x199fee=$gameSystem[_0x3c1a03(0x326)]();this[_0x3c1a03(0x436)]=SceneManager[_0x3c1a03(0x20c)][_0x3c1a03(0x47e)](_0x199fee,![])+this[_0x3c1a03(0x4dc)](),this[_0x3c1a03(0x436)]=Math['min'](Graphics[_0x3c1a03(0x436)],this[_0x3c1a03(0x436)]);if($gameTemp[_0x3c1a03(0x4b2)])this['resetPositionX']();},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x33d)]=function(){return 0x0;},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x4dc)]=function(){return 0x0;},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x1e1)]=function(){const _0x3078ff=_0x3fecc6;this['x']=(Graphics[_0x3078ff(0x3a0)]-this['width'])/0x2,$gameTemp[_0x3078ff(0x4b2)]=undefined,this[_0x3078ff(0x2a6)]();},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x3a5)]=function(){const _0x2a2132=_0x3fecc6,_0x535ee7={'x':this['x'],'y':this['y']};Window_Base[_0x2a2132(0x1d6)]['updateMove'][_0x2a2132(0x358)](this),this[_0x2a2132(0x53f)](_0x535ee7);},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x27a)]=function(){return!![];},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x53f)]=function(_0x283709){const _0x8091a5=_0x3fecc6;this[_0x8091a5(0x384)]&&(this[_0x8091a5(0x384)]['x']+=this['x']-_0x283709['x'],this['_nameBoxWindow']['y']+=this['y']-_0x283709['y']);},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x465)]=function(_0x3fc29c,_0x48cca5){const _0x194c26=_0x3fecc6;this[_0x194c26(0x3f6)](this[_0x194c26(0x3a2)]['x'],this['_positionType']*(Graphics['boxHeight']-this['height'])/0x2,this[_0x194c26(0x3a2)][_0x194c26(0x3ee)],this[_0x194c26(0x3a2)][_0x194c26(0x436)],_0x3fc29c,_0x48cca5);},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x3d1)]=function(_0x786666){const _0x83c537=_0x3fecc6,_0x90c4cb=Window_Base[_0x83c537(0x1d6)][_0x83c537(0x3d1)][_0x83c537(0x358)](this,_0x786666);_0x786666['drawing']&&this['launchMessageCommonEvent'](_0x90c4cb);},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x2f1)]=function(_0x20691b){const _0x16d8ab=_0x3fecc6;if($gameParty[_0x16d8ab(0x544)]()){}else $gameMap[_0x16d8ab(0x539)](_0x20691b);},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x491)]=function(_0x5c9220){const _0x40ca0c=_0x3fecc6;this['_textDelayCount']--,this[_0x40ca0c(0x3e2)]<=0x0&&(this[_0x40ca0c(0x4d9)](_0x5c9220),Window_Base[_0x40ca0c(0x1d6)][_0x40ca0c(0x491)][_0x40ca0c(0x358)](this,_0x5c9220));},Window_Message[_0x3fecc6(0x1d6)]['onProcessCharacter']=function(_0x204524){const _0x3e0850=_0x3fecc6;this['_textDelayCount']=this['_textDelay'];if(this[_0x3e0850(0x2d8)]<=0x0)this['_showFast']=!![];},VisuMZ['MessageCore']['Window_Message_processEscapeCharacter']=Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x21e)],Window_Message['prototype'][_0x3fecc6(0x21e)]=function(_0x552942,_0x95e9ee){const _0x9d6314=_0x3fecc6;!_0x95e9ee['drawing']?Window_Base[_0x9d6314(0x1d6)][_0x9d6314(0x21e)][_0x9d6314(0x358)](this,_0x552942,_0x95e9ee):VisuMZ[_0x9d6314(0x46b)][_0x9d6314(0x444)][_0x9d6314(0x358)](this,_0x552942,_0x95e9ee);},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x2a2)]=Window_Message['prototype']['needsNewPage'],Window_Message[_0x3fecc6(0x1d6)]['needsNewPage']=function(_0x4454cb){const _0x1d9686=_0x3fecc6;if(this[_0x1d9686(0x4d8)])return![];return VisuMZ[_0x1d9686(0x46b)][_0x1d9686(0x2a2)][_0x1d9686(0x358)](this,_0x4454cb);},Window_Message['prototype'][_0x3fecc6(0x299)]=function(_0x599496){const _0x543b2a=_0x3fecc6;let _0x352068=_0x599496[_0x543b2a(0x2e1)];this[_0x543b2a(0x48f)]={};if(this[_0x543b2a(0x2d0)]())return _0x352068;_0x352068=_0x352068['replace'](/<POSITION:[ ]*(.*?)>/gi,(_0x1b2b6b,_0x3e0bdc)=>{const _0x5cab1a=_0x543b2a,_0xa84d03=_0x3e0bdc[_0x5cab1a(0x3f0)](',')[_0x5cab1a(0x3a4)](_0x266111=>Number(_0x266111)||0x0);if(_0xa84d03[0x0]!==undefined)this[_0x5cab1a(0x48f)]['x']=Number(_0xa84d03[0x0]);if(_0xa84d03[0x1]!==undefined)this[_0x5cab1a(0x48f)]['y']=Number(_0xa84d03[0x1]);if(_0xa84d03[0x2]!==undefined)this[_0x5cab1a(0x48f)][_0x5cab1a(0x3ee)]=Number(_0xa84d03[0x2]);if(_0xa84d03[0x3]!==undefined)this[_0x5cab1a(0x48f)]['height']=Number(_0xa84d03[0x3]);return'';}),_0x352068=_0x352068[_0x543b2a(0x496)](/<COORDINATES:[ ]*(.*?)>/gi,(_0x57d998,_0x1a6248)=>{const _0x388a63=_0x543b2a,_0x43cb05=_0x1a6248[_0x388a63(0x3f0)](',')[_0x388a63(0x3a4)](_0x4b7b6a=>Number(_0x4b7b6a)||0x0);if(_0x43cb05[0x0]!==undefined)this[_0x388a63(0x48f)]['x']=Number(_0x43cb05[0x0]);if(_0x43cb05[0x1]!==undefined)this[_0x388a63(0x48f)]['y']=Number(_0x43cb05[0x1]);return'';}),_0x352068=_0x352068[_0x543b2a(0x496)](/<DIMENSIONS:[ ]*(.*?)>/gi,(_0x3a4431,_0x375aaa)=>{const _0x4b7211=_0x543b2a,_0x1a3e03=_0x375aaa[_0x4b7211(0x3f0)](',')[_0x4b7211(0x3a4)](_0x168001=>Number(_0x168001)||0x0);if(_0x1a3e03[0x0]!==undefined)this[_0x4b7211(0x48f)][_0x4b7211(0x3ee)]=Number(_0x1a3e03[0x2]);if(_0x1a3e03[0x1]!==undefined)this[_0x4b7211(0x48f)]['height']=Number(_0x1a3e03[0x3]);return'';}),_0x352068=_0x352068[_0x543b2a(0x496)](/<OFFSET:[ ]*(.*?)>/gi,(_0x2b3597,_0x3b6a30)=>{const _0x160e8c=_0x543b2a,_0x114673=_0x3b6a30[_0x160e8c(0x3f0)](',')[_0x160e8c(0x3a4)](_0x3980af=>Number(_0x3980af)||0x0);let _0xd59403=_0x114673[0x0]||0x0,_0x50c3d2=_0x114673[0x1]||0x0;return $gameSystem[_0x160e8c(0x4c4)](_0xd59403,_0x50c3d2),'';}),_0x599496['text']=_0x352068;},Window_Message[_0x3fecc6(0x1d6)]['updateXyOffsets']=function(){const _0x1078d2=$gameSystem['getMessageWindowXyOffsets']();this['x']+=_0x1078d2['x'],this['y']+=_0x1078d2['y'];},Window_Message[_0x3fecc6(0x1d6)]['updateForcedPlacement']=function(){const _0x38a8c1=_0x3fecc6;this[_0x38a8c1(0x48f)]=this[_0x38a8c1(0x48f)]||{};const _0x56655c=['x','y',_0x38a8c1(0x3ee),_0x38a8c1(0x436)];for(const _0x477fc8 of _0x56655c){this[_0x38a8c1(0x48f)][_0x477fc8]!==undefined&&(this[_0x477fc8]=Number(this[_0x38a8c1(0x48f)][_0x477fc8]));}},Window_Message[_0x3fecc6(0x1d6)]['prepareAutoSizeEscapeCharacters']=function(_0x1a83ca){const _0x59205a=_0x3fecc6;this[_0x59205a(0x4d8)]=![];let _0xbd9153=_0x1a83ca['text'];_0xbd9153=_0xbd9153[_0x59205a(0x496)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0xc2edc8=_0x59205a;return this[_0xc2edc8(0x397)](_0xbd9153,!![],!![]),this[_0xc2edc8(0x244)](_0xc2edc8(0x1c0)),'';}),_0xbd9153=_0xbd9153[_0x59205a(0x496)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x13b3a9=_0x59205a;return this['processAutoSize'](_0xbd9153,!![],![]),this[_0x13b3a9(0x244)](_0x13b3a9(0x1c0)),'';}),_0xbd9153=_0xbd9153[_0x59205a(0x496)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x49a833=_0x59205a;return this[_0x49a833(0x397)](_0xbd9153,![],!![]),this[_0x49a833(0x244)](_0x49a833(0x1c0)),'';});if(SceneManager[_0x59205a(0x43b)]())_0xbd9153=_0xbd9153[_0x59205a(0x496)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x53c414,_0x111d0a)=>{const _0x481756=_0x59205a;return this['processAutoSize'](_0xbd9153,!![],!![]),this[_0x481756(0x244)](_0x481756(0x410),Number(_0x111d0a)||0x1),'';}),_0xbd9153=_0xbd9153[_0x59205a(0x496)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x334f38,_0x431610)=>{const _0x14e155=_0x59205a;return this[_0x14e155(0x397)](_0xbd9153,!![],!![]),this[_0x14e155(0x244)](_0x14e155(0x24b),Number(_0x431610)||0x0),'';}),_0xbd9153=_0xbd9153[_0x59205a(0x496)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x4ea1ea,_0x2a27c9)=>{const _0xed2539=_0x59205a;return this[_0xed2539(0x397)](_0xbd9153,!![],!![]),this[_0xed2539(0x244)](_0xed2539(0x3c4),Number(_0x2a27c9)||0x0),'';});else SceneManager[_0x59205a(0x3a3)]()&&(_0xbd9153=_0xbd9153[_0x59205a(0x496)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x384752,_0x184e64)=>{const _0x3a5838=_0x59205a;return this['processAutoSize'](_0xbd9153,!![],!![]),this[_0x3a5838(0x244)](_0x3a5838(0x19b),0x0),'';}),_0xbd9153=_0xbd9153['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x27936b,_0x46dea5)=>{const _0x2088bf=_0x59205a;return this[_0x2088bf(0x397)](_0xbd9153,!![],!![]),this[_0x2088bf(0x244)](_0x2088bf(0x52b),Number(_0x46dea5)||0x1),'';}),_0xbd9153=_0xbd9153['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x4684f9,_0x1422bc)=>{const _0x38f6e2=_0x59205a;return this[_0x38f6e2(0x397)](_0xbd9153,!![],!![]),this[_0x38f6e2(0x244)]('map\x20party',Number(_0x1422bc)||0x0),'';}),_0xbd9153=_0xbd9153['replace'](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x2e79ca,_0x2232f5)=>{const _0x3d608d=_0x59205a;return this['processAutoSize'](_0xbd9153,!![],!![]),this[_0x3d608d(0x244)](_0x3d608d(0x389),Number(_0x2232f5)||0x0),'';}));_0x1a83ca[_0x59205a(0x2e1)]=_0xbd9153;},Window_Message[_0x3fecc6(0x451)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x3fecc6(0x440)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x397)]=function(_0x4b7876,_0x59aa4a,_0x3d0b65){const _0x49ef97=_0x3fecc6;_0x4b7876=_0x4b7876[_0x49ef97(0x496)](Window_Message[_0x49ef97(0x451)],''),_0x4b7876=_0x4b7876[_0x49ef97(0x496)](Window_Message[_0x49ef97(0x440)],''),this[_0x49ef97(0x2fb)]=!![],this[_0x49ef97(0x4d8)]=!![],this[_0x49ef97(0x52f)](![]);const _0x33e5e1=this[_0x49ef97(0x508)](_0x4b7876);if(_0x59aa4a){let _0x5d9c73=_0x33e5e1[_0x49ef97(0x3ee)]+$gameSystem[_0x49ef97(0x54c)]()*0x2+0x6;const _0x3e016a=$gameMessage[_0x49ef97(0x32d)]()!=='',_0x25dfca=ImageManager[_0x49ef97(0x3fe)],_0x45f945=0x14;_0x5d9c73+=_0x3e016a?_0x25dfca+_0x45f945:0x4;if(_0x5d9c73%0x2!==0x0)_0x5d9c73+=0x1;$gameSystem[_0x49ef97(0x49c)](_0x5d9c73);}if(_0x3d0b65){let _0x4e2a9a=Math[_0x49ef97(0x2df)](_0x33e5e1[_0x49ef97(0x436)]/this[_0x49ef97(0x344)]());$gameSystem[_0x49ef97(0x4f3)](_0x4e2a9a);}this['updateAutoSizePosition'](),this['_refreshPauseSign'](),this[_0x49ef97(0x2fb)]=![],this['_messagePositionReset']=!![];},Window_Message['prototype'][_0x3fecc6(0x446)]=function(){const _0x537013=_0x3fecc6;this[_0x537013(0x4b7)](),this['updatePlacement'](),this['resetPositionX'](),this[_0x537013(0x48c)](),this[_0x537013(0x2e2)][_0x537013(0x472)](),this['createContents']();},Window_Message['prototype'][_0x3fecc6(0x244)]=function(_0xe835e2,_0x59999a){const _0x2a8ab9=_0x3fecc6;switch(_0xe835e2[_0x2a8ab9(0x435)]()[_0x2a8ab9(0x467)]()){case'battle\x20actor':this['_autoPositionTarget']=$gameActors[_0x2a8ab9(0x341)](_0x59999a);break;case _0x2a8ab9(0x24b):this[_0x2a8ab9(0x290)]=$gameParty['members']()[_0x59999a-0x1];break;case'battle\x20enemy':this['_autoPositionTarget']=$gameTroop[_0x2a8ab9(0x476)]()[_0x59999a-0x1];break;case _0x2a8ab9(0x19b):this[_0x2a8ab9(0x290)]=$gamePlayer;break;case'map\x20actor':const _0x22a13f=$gameActors[_0x2a8ab9(0x341)](_0x59999a)[_0x2a8ab9(0x471)]();_0x22a13f===0x0?this[_0x2a8ab9(0x290)]=$gamePlayer:this[_0x2a8ab9(0x290)]=$gamePlayer[_0x2a8ab9(0x1e3)]()[_0x2a8ab9(0x425)](_0x22a13f-0x1);break;case _0x2a8ab9(0x273):_0x59999a===0x1?this[_0x2a8ab9(0x290)]=$gamePlayer:this[_0x2a8ab9(0x290)]=$gamePlayer['followers']()[_0x2a8ab9(0x425)](_0x59999a-0x2);break;case _0x2a8ab9(0x389):this[_0x2a8ab9(0x290)]=$gameMap['event'](_0x59999a);break;}this[_0x2a8ab9(0x290)]&&this[_0x2a8ab9(0x323)]();},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x1ef)]=Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x220)],Window_Message['prototype'][_0x3fecc6(0x220)]=function(){const _0x18fa24=_0x3fecc6;this[_0x18fa24(0x323)](),VisuMZ['MessageCore']['Window_Message_synchronizeNameBox'][_0x18fa24(0x358)](this);},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x323)]=function(){const _0x5d046a=_0x3fecc6;if(!this[_0x5d046a(0x290)])return;const _0x562539=SceneManager[_0x5d046a(0x20c)];if(!_0x562539)return;const _0xec9c89=_0x562539[_0x5d046a(0x2d6)];if(!_0xec9c89)return;const _0x13ed22=_0xec9c89['findTargetSprite'](this[_0x5d046a(0x290)]);if(!_0x13ed22)return;let _0x590c6d=_0x13ed22['x'];if(SceneManager[_0x5d046a(0x3a3)]())_0x590c6d*=$gameScreen[_0x5d046a(0x3a7)]();else{if(SceneManager[_0x5d046a(0x43b)]()&&Imported[_0x5d046a(0x3ef)]){let _0x156bc3=_0x13ed22['x']-Graphics['boxWidth']*_0xec9c89[_0x5d046a(0x213)]['x'];_0x590c6d+=_0x156bc3*(_0xec9c89[_0x5d046a(0x455)]['x']-0x1);}}_0x590c6d-=this[_0x5d046a(0x3ee)]/0x2,_0x590c6d-=(Graphics[_0x5d046a(0x3ee)]-Graphics['boxWidth'])/0x2,_0x590c6d+=this[_0x5d046a(0x34b)]();let _0x4651e2=_0x13ed22['y'];if(SceneManager[_0x5d046a(0x3a3)]())_0x4651e2-=_0x13ed22[_0x5d046a(0x436)]+0x8,_0x4651e2*=$gameScreen[_0x5d046a(0x3a7)](),_0x4651e2-=this[_0x5d046a(0x436)]*$gameScreen[_0x5d046a(0x3a7)]();else{if(SceneManager[_0x5d046a(0x43b)]()&&Imported[_0x5d046a(0x3ef)]){let _0x244af6=_0x13ed22['height']*_0xec9c89[_0x5d046a(0x455)]['y'];_0x4651e2-=this['height']*_0xec9c89[_0x5d046a(0x455)]['y']+_0x244af6+0x8;let _0x447ba2=_0x13ed22['y']-Graphics[_0x5d046a(0x380)]*_0xec9c89['anchor']['y'];_0x4651e2+=_0x447ba2*(_0xec9c89[_0x5d046a(0x455)]['y']-0x1);}else _0x4651e2-=_0x13ed22[_0x5d046a(0x436)]+0x8,_0x4651e2-=this[_0x5d046a(0x436)];}_0x4651e2-=(Graphics[_0x5d046a(0x436)]-Graphics[_0x5d046a(0x380)])/0x2,_0x4651e2+=this[_0x5d046a(0x429)]();const _0x471aec=$gameSystem['getMessageWindowXyOffsets']();_0x590c6d+=_0x471aec['x'],_0x4651e2+=_0x471aec['y'],this['x']=Math[_0x5d046a(0x278)](_0x590c6d),this['y']=Math['round'](_0x4651e2),this['clampPlacementPosition'](!![],![]),this['_forcedPosition']=this[_0x5d046a(0x48f)]||{},this[_0x5d046a(0x48f)]['x']=this['x'],this[_0x5d046a(0x48f)]['y']=this['y'],this[_0x5d046a(0x48f)][_0x5d046a(0x3ee)]=this[_0x5d046a(0x3ee)],this[_0x5d046a(0x48f)]['height']=this[_0x5d046a(0x436)],this[_0x5d046a(0x384)]['updatePlacement']();},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x34b)]=function(){return 0x0;},Window_Message['prototype'][_0x3fecc6(0x429)]=function(){return 0x0;},Window_Message[_0x3fecc6(0x1d6)]['messagePositionReset']=function(){const _0x3f3ca5=_0x3fecc6;this[_0x3f3ca5(0x1d7)]=![],this[_0x3f3ca5(0x290)]=undefined,$gameSystem[_0x3f3ca5(0x295)](),this[_0x3f3ca5(0x446)](),this['openness']=0x0;},Window_Message[_0x3fecc6(0x1d6)][_0x3fecc6(0x1ba)]=function(_0x232a99){const _0x585720=_0x3fecc6;return Window_Base[_0x585720(0x1d6)][_0x585720(0x1ba)]['call'](this,_0x232a99);},Window_Message['prototype'][_0x3fecc6(0x575)]=function(_0x28c495){const _0x42d7a0=_0x3fecc6;return Window_Base[_0x42d7a0(0x1d6)][_0x42d7a0(0x575)][_0x42d7a0(0x358)](this,_0x28c495);},Window_Message[_0x3fecc6(0x1d6)]['flushTextState']=function(_0x3245c2){const _0x3de968=_0x3fecc6;this['preFlushTextState'](_0x3245c2),Window_Base[_0x3de968(0x1d6)][_0x3de968(0x3b0)]['call'](this,_0x3245c2),this[_0x3de968(0x1b7)](_0x3245c2);},Window_Message['prototype'][_0x3fecc6(0x1aa)]=function(_0x28888c){},Window_Message['prototype'][_0x3fecc6(0x1b7)]=function(_0x177bd8){},Window_NameBox[_0x3fecc6(0x1d6)][_0x3fecc6(0x24f)]=function(){return![];},Window_NameBox['prototype'][_0x3fecc6(0x2fa)]=function(){const _0x21e519=_0x3fecc6;Window_Base['prototype'][_0x21e519(0x2fa)][_0x21e519(0x358)](this),this[_0x21e519(0x248)](this[_0x21e519(0x243)]());},Window_NameBox[_0x3fecc6(0x1d6)][_0x3fecc6(0x243)]=function(){const _0x2b91d4=_0x3fecc6,_0x2e95e5=VisuMZ[_0x2b91d4(0x46b)][_0x2b91d4(0x1ed)]['General'][_0x2b91d4(0x200)];return ColorManager['textColor'](_0x2e95e5);},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x316)]=Window_NameBox[_0x3fecc6(0x1d6)][_0x3fecc6(0x4fe)],Window_NameBox[_0x3fecc6(0x1d6)][_0x3fecc6(0x4fe)]=function(){const _0x487a8a=_0x3fecc6;VisuMZ['MessageCore'][_0x487a8a(0x316)][_0x487a8a(0x358)](this),this[_0x487a8a(0x2ff)](),this[_0x487a8a(0x27e)](),this[_0x487a8a(0x2a6)](),this[_0x487a8a(0x1fe)]();},Window_NameBox[_0x3fecc6(0x1d6)][_0x3fecc6(0x1ba)]=function(_0x3c0548){const _0x1d39a6=_0x3fecc6;return _0x3c0548=_0x3c0548[_0x1d39a6(0x496)](/<LEFT>/gi,this['setRelativePosition']['bind'](this,0x0)),_0x3c0548=_0x3c0548[_0x1d39a6(0x496)](/<CENTER>/gi,this[_0x1d39a6(0x2ea)][_0x1d39a6(0x42f)](this,0x5)),_0x3c0548=_0x3c0548[_0x1d39a6(0x496)](/<RIGHT>/gi,this[_0x1d39a6(0x2ea)][_0x1d39a6(0x42f)](this,0xa)),_0x3c0548=_0x3c0548[_0x1d39a6(0x496)](/<POSITION:[ ](\d+)>/gi,(_0x46897a,_0x3a016b)=>this[_0x1d39a6(0x2ea)](parseInt(_0x3a016b))),_0x3c0548=_0x3c0548[_0x1d39a6(0x496)](/<\/LEFT>/gi,''),_0x3c0548=_0x3c0548[_0x1d39a6(0x496)](/<\/CENTER>/gi,''),_0x3c0548=_0x3c0548[_0x1d39a6(0x496)](/<\/RIGHT>/gi,''),_0x3c0548=_0x3c0548[_0x1d39a6(0x467)](),Window_Base['prototype']['preConvertEscapeCharacters']['call'](this,_0x3c0548);},Window_NameBox['prototype'][_0x3fecc6(0x2ea)]=function(_0x27ffbf){return this['_relativePosition']=_0x27ffbf,'';},Window_NameBox[_0x3fecc6(0x1d6)][_0x3fecc6(0x2ff)]=function(){const _0x20f671=_0x3fecc6;if($gameMessage[_0x20f671(0x40f)]())return;this[_0x20f671(0x573)]=this[_0x20f671(0x573)]||0x0;const _0xf90e4a=this[_0x20f671(0x2f0)],_0x31f245=Math['floor'](_0xf90e4a['width']*this[_0x20f671(0x573)]/0xa);this['x']=_0xf90e4a['x']+_0x31f245-Math[_0x20f671(0x22d)](this[_0x20f671(0x3ee)]/0x2),this['x']=this['x'][_0x20f671(0x1e0)](_0xf90e4a['x'],_0xf90e4a['x']+_0xf90e4a['width']-this[_0x20f671(0x3ee)]);},Window_NameBox[_0x3fecc6(0x1d6)]['updateOffsetPosition']=function(){const _0x18cc89=_0x3fecc6;if($gameMessage[_0x18cc89(0x40f)]())return;this[_0x18cc89(0x573)]=this[_0x18cc89(0x573)]||0x0;const _0x36c91c=VisuMZ[_0x18cc89(0x46b)][_0x18cc89(0x1ed)]['General'][_0x18cc89(0x4cb)],_0x2fcb8d=VisuMZ['MessageCore'][_0x18cc89(0x1ed)]['General'][_0x18cc89(0x4e6)],_0x427b01=(0x5-this[_0x18cc89(0x573)])/0x5;this['x']+=Math[_0x18cc89(0x22d)](_0x36c91c*_0x427b01),this['y']+=_0x2fcb8d;},Window_NameBox[_0x3fecc6(0x1d6)][_0x3fecc6(0x1fe)]=function(){const _0x1e679d=_0x3fecc6,_0x1774c2=this[_0x1e679d(0x2f0)],_0x356934=_0x1774c2['y'],_0x4badbf=VisuMZ[_0x1e679d(0x46b)][_0x1e679d(0x1ed)]['General'][_0x1e679d(0x4e6)];_0x356934>this['y']&&_0x356934<this['y']+this[_0x1e679d(0x436)]-_0x4badbf&&(this['y']=_0x1774c2['y']+_0x1774c2[_0x1e679d(0x436)]);},VisuMZ[_0x3fecc6(0x46b)]['Window_NameBox_refresh']=Window_NameBox[_0x3fecc6(0x1d6)][_0x3fecc6(0x2a1)],Window_NameBox[_0x3fecc6(0x1d6)][_0x3fecc6(0x2a1)]=function(){const _0x2418b0=_0x3fecc6;this['_relativePosition']=0x0,VisuMZ[_0x2418b0(0x46b)][_0x2418b0(0x529)][_0x2418b0(0x358)](this);},Window_ChoiceList['prototype'][_0x3fecc6(0x2d0)]=function(){return![];},Window_ChoiceList['prototype'][_0x3fecc6(0x24f)]=function(){return!![];},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x301)]=function(){return $gameSystem['getChoiceListLineHeight']()+0x8;},Window_ChoiceList['prototype'][_0x3fecc6(0x374)]=function(){const _0x1c4c51=_0x3fecc6;return $gameSystem[_0x1c4c51(0x45a)]();},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x566)]=function(){const _0x3f2136=_0x3fecc6;this['refresh'](),this['selectDefault'](),this['open'](),this[_0x3f2136(0x4fc)](),this[_0x3f2136(0x1da)]();},Window_ChoiceList['prototype'][_0x3fecc6(0x27b)]=function(){const _0x43055a=_0x3fecc6;$gameMessage[_0x43055a(0x3e6)](this[_0x43055a(0x21f)]()),this[_0x43055a(0x2f0)][_0x43055a(0x1ca)](),this[_0x43055a(0x19c)](),this[_0x43055a(0x515)]&&(this[_0x43055a(0x515)][_0x43055a(0x472)](),this[_0x43055a(0x515)]['hide']());},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x43d)]=Window_ChoiceList[_0x3fecc6(0x1d6)]['callCancelHandler'],Window_ChoiceList[_0x3fecc6(0x1d6)]['callCancelHandler']=function(){const _0x729bca=_0x3fecc6;VisuMZ['MessageCore'][_0x729bca(0x43d)]['call'](this),this['_helpWindow']&&(this[_0x729bca(0x515)][_0x729bca(0x472)](),this['_helpWindow'][_0x729bca(0x373)]());},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x2a1)]=function(){const _0x46aeda=_0x3fecc6;this[_0x46aeda(0x53d)](),this[_0x46aeda(0x1b9)](),this[_0x46aeda(0x2f0)]&&(this[_0x46aeda(0x4fe)](),this[_0x46aeda(0x4f2)]()),this['createContents'](),this['updateBackground'](),this[_0x46aeda(0x3ad)](),Window_Selectable['prototype'][_0x46aeda(0x2a1)][_0x46aeda(0x358)](this);},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x1b9)]=function(){const _0x24c163=_0x3fecc6;$gameMessage[_0x24c163(0x233)]?this[_0x24c163(0x1df)]():this[_0x24c163(0x36b)](),this[_0x24c163(0x4db)](),this[_0x24c163(0x379)]();},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x1df)]=function(){const _0x59cdab=_0x3fecc6,_0x88fef2=$gameMessage[_0x59cdab(0x1f6)]();let _0x62dbb4=0x0;for(let _0x357be0 of _0x88fef2){_0x357be0=this[_0x59cdab(0x1e9)](_0x357be0);if(this[_0x59cdab(0x36a)](_0x357be0)){const _0x169130=this[_0x59cdab(0x245)](_0x357be0),_0x377b93=this[_0x59cdab(0x307)](_0x357be0);this['addCommand'](_0x169130,_0x59cdab(0x4bd),_0x377b93,_0x62dbb4);}_0x62dbb4++;}},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x36b)]=function(){const _0x288d78=_0x3fecc6,_0x4d6e97=$gameMessage[_0x288d78(0x1f6)](),_0x203772=$gameMessage[_0x288d78(0x351)](),_0x39c008=$gameMessage['maxShuffleChoices'](),_0x175b88=_0x4d6e97[_0x288d78(0x43e)];let _0x304760=0x0;for(let _0x2a84f2=0x0;_0x2a84f2<_0x175b88;_0x2a84f2++){if(this[_0x288d78(0x339)][_0x288d78(0x43e)]>=_0x39c008)break;const _0x370fbb=_0x203772[_0x2a84f2];let _0x25e624=_0x4d6e97[_0x370fbb];if(_0x25e624===undefined)continue;_0x25e624=this[_0x288d78(0x1e9)](_0x25e624);if(this[_0x288d78(0x36a)](_0x25e624)){const _0xd82255=this[_0x288d78(0x245)](_0x25e624),_0x4ec6a0=this[_0x288d78(0x307)](_0x25e624);this[_0x288d78(0x34f)](_0xd82255,'choice',_0x4ec6a0,_0x370fbb);}_0x304760++;}},Window_ChoiceList[_0x3fecc6(0x1d6)]['convertChoiceMacros']=function(_0x2821e8){const _0x3493db=_0x3fecc6;return Window_Base[_0x3493db(0x1d6)]['convertTextMacros']['call'](this,_0x2821e8);},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x36a)]=function(_0x357fe0){const _0x2fb52f=_0x3fecc6;if(Imported[_0x2fb52f(0x184)])$gameMessage[_0x2fb52f(0x324)]();if(_0x357fe0[_0x2fb52f(0x498)](/<HIDE>/i))return![];if(_0x357fe0[_0x2fb52f(0x498)](/<SHOW>/i))return!![];if(_0x357fe0['match'](/<SHOW[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x148b8a=RegExp['$1']['split'](',')[_0x2fb52f(0x3a4)](_0x3b7c18=>Number(_0x3b7c18)||0x0);if(_0x148b8a[_0x2fb52f(0x1dd)](_0x517016=>!$gameSwitches[_0x2fb52f(0x239)](_0x517016)))return![];}if(_0x357fe0[_0x2fb52f(0x498)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x426976=RegExp['$1']['split'](',')[_0x2fb52f(0x3a4)](_0x3fed25=>Number(_0x3fed25)||0x0);if(_0x426976[_0x2fb52f(0x2bc)](_0x1d8a69=>!$gameSwitches[_0x2fb52f(0x239)](_0x1d8a69)))return![];}if(_0x357fe0[_0x2fb52f(0x498)](/<HIDE[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x24a4c7=RegExp['$1'][_0x2fb52f(0x3f0)](',')[_0x2fb52f(0x3a4)](_0x2c1381=>Number(_0x2c1381)||0x0);if(_0x24a4c7[_0x2fb52f(0x2bc)](_0x392547=>$gameSwitches[_0x2fb52f(0x239)](_0x392547)))return![];}if(_0x357fe0[_0x2fb52f(0x498)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x4ea7c5=RegExp['$1']['split'](',')['map'](_0x325680=>Number(_0x325680)||0x0);if(_0x4ea7c5[_0x2fb52f(0x1dd)](_0x232bb8=>$gameSwitches['value'](_0x232bb8)))return![];}return!![];},Window_ChoiceList[_0x3fecc6(0x1d6)]['parseChoiceText']=function(_0x491713){const _0x17d274=_0x3fecc6;let _0x1e3c65=_0x491713;return _0x1e3c65=_0x1e3c65[_0x17d274(0x496)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x1e3c65=_0x1e3c65['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x1e3c65;},Window_ChoiceList[_0x3fecc6(0x1d6)]['isChoiceEnabled']=function(_0x1b5c5f){const _0x54236a=_0x3fecc6;if(Imported['VisuMZ_1_EventsMoveCore'])$gameMessage[_0x54236a(0x324)]();if(_0x1b5c5f[_0x54236a(0x498)](/<DISABLE>/i))return![];if(_0x1b5c5f[_0x54236a(0x498)](/<ENABLE>/i))return!![];if(_0x1b5c5f[_0x54236a(0x498)](/<ENABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x22c11c=RegExp['$1'][_0x54236a(0x3f0)](',')['map'](_0x99ae33=>Number(_0x99ae33)||0x0);if(_0x22c11c['some'](_0x32d96e=>!$gameSwitches['value'](_0x32d96e)))return![];}if(_0x1b5c5f['match'](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3cfc92=RegExp['$1'][_0x54236a(0x3f0)](',')['map'](_0x36438b=>Number(_0x36438b)||0x0);if(_0x3cfc92['every'](_0x3e476c=>!$gameSwitches[_0x54236a(0x239)](_0x3e476c)))return![];}if(_0x1b5c5f[_0x54236a(0x498)](/<DISABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5f2e42=RegExp['$1'][_0x54236a(0x3f0)](',')[_0x54236a(0x3a4)](_0x36fcbd=>Number(_0x36fcbd)||0x0);if(_0x5f2e42['every'](_0x2a23a6=>$gameSwitches[_0x54236a(0x239)](_0x2a23a6)))return![];}if(_0x1b5c5f['match'](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x26ffb0=RegExp['$1'][_0x54236a(0x3f0)](',')[_0x54236a(0x3a4)](_0x539005=>Number(_0x539005)||0x0);if(_0x26ffb0[_0x54236a(0x1dd)](_0x10c02=>$gameSwitches[_0x54236a(0x239)](_0x10c02)))return![];}return!![];},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x4db)]=function(){const _0x8464b4=_0x3fecc6;this[_0x8464b4(0x2cb)]={},this[_0x8464b4(0x515)]&&(this[_0x8464b4(0x515)][_0x8464b4(0x472)](),this[_0x8464b4(0x515)][_0x8464b4(0x373)]());},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x379)]=function(){const _0xd46eee=_0x3fecc6,_0x4c22c4=/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;for(const _0x5e3280 of this[_0xd46eee(0x339)]){if(!_0x5e3280)continue;const _0x2457ec=this[_0xd46eee(0x339)][_0xd46eee(0x365)](_0x5e3280);if(_0x5e3280[_0xd46eee(0x2a3)][_0xd46eee(0x498)](_0x4c22c4)){const _0x318299=String(RegExp['$1']);this[_0xd46eee(0x2cb)][_0x2457ec]=_0x318299[_0xd46eee(0x467)](),_0x5e3280[_0xd46eee(0x2a3)]=_0x5e3280[_0xd46eee(0x2a3)][_0xd46eee(0x496)](_0x4c22c4,'')[_0xd46eee(0x467)]();}else this['_choiceHelpDescriptions'][_0x2457ec]='';}},Window_ChoiceList['prototype'][_0x3fecc6(0x1da)]=function(){const _0x3d4a2a=_0x3fecc6;if(this[_0x3d4a2a(0x339)][_0x3d4a2a(0x1dd)](_0x4e734c=>_0x4e734c['enabled']))return;this[_0x3d4a2a(0x218)](),this['close'](),$gameMessage['_choices']=[],this[_0x3d4a2a(0x2f0)][_0x3d4a2a(0x3fd)]()&&this[_0x3d4a2a(0x2f0)][_0x3d4a2a(0x255)]();},VisuMZ['MessageCore'][_0x3fecc6(0x35c)]=Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x4fe)],Window_ChoiceList['prototype'][_0x3fecc6(0x4fe)]=function(){const _0x2d9d09=_0x3fecc6;VisuMZ[_0x2d9d09(0x46b)][_0x2d9d09(0x35c)][_0x2d9d09(0x358)](this),this[_0x2d9d09(0x561)](),this[_0x2d9d09(0x2a6)]();},Window_ChoiceList['prototype']['placeCancelButton']=function(){const _0x284d1b=_0x3fecc6;if(!this['_cancelButton'])return;const _0x37aa24=0x8,_0x41e302=this[_0x284d1b(0x364)],_0x38b5fb=this['x']+this[_0x284d1b(0x3ee)],_0x1f4453=Math[_0x284d1b(0x22d)]((Graphics[_0x284d1b(0x3ee)]-Graphics[_0x284d1b(0x3a0)])/0x2);_0x38b5fb>=Graphics[_0x284d1b(0x3a0)]+_0x1f4453-_0x41e302[_0x284d1b(0x3ee)]+_0x37aa24?_0x41e302['x']=-_0x41e302[_0x284d1b(0x3ee)]-_0x37aa24:_0x41e302['x']=this[_0x284d1b(0x3ee)]+_0x37aa24,_0x41e302['y']=this[_0x284d1b(0x436)]/0x2-_0x41e302[_0x284d1b(0x436)]/0x2;},VisuMZ[_0x3fecc6(0x46b)]['Window_ChoiceList_windowX']=Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x4bc)],Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x4bc)]=function(){const _0x4c2704=_0x3fecc6;return this[_0x4c2704(0x2f0)]?this[_0x4c2704(0x1d8)]():VisuMZ[_0x4c2704(0x46b)][_0x4c2704(0x2bb)]['call'](this);},Window_ChoiceList['prototype'][_0x3fecc6(0x1d8)]=function(){const _0x5b7e84=_0x3fecc6,_0x206bc0=$gameMessage[_0x5b7e84(0x332)]();if(_0x206bc0===0x1)return(Graphics[_0x5b7e84(0x3a0)]-this[_0x5b7e84(0x272)]())/0x2;else return _0x206bc0===0x2?this['_messageWindow']['x']+this[_0x5b7e84(0x2f0)][_0x5b7e84(0x3ee)]-this[_0x5b7e84(0x272)]():this[_0x5b7e84(0x2f0)]['x'];},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x272)]=function(){const _0x37965b=_0x3fecc6,_0x162054=(this[_0x37965b(0x2b4)]()+this[_0x37965b(0x1b4)]())*this[_0x37965b(0x374)]()+this[_0x37965b(0x1ac)]*0x2;return Math[_0x37965b(0x28c)](_0x162054,Graphics[_0x37965b(0x3ee)]);},Window_ChoiceList['prototype'][_0x3fecc6(0x535)]=function(){const _0x8fb24=_0x3fecc6,_0x463ea6=$gameMessage['choices']()[_0x8fb24(0x3a4)](_0x120996=>this['convertChoiceMacros'](_0x120996))[_0x8fb24(0x3c1)](_0x49a4f6=>this[_0x8fb24(0x36a)](_0x49a4f6));let _0x53cd33=Math[_0x8fb24(0x2df)](_0x463ea6[_0x8fb24(0x43e)]/this['maxCols']());if(!$gameMessage[_0x8fb24(0x233)]){const _0x48ebe4=$gameMessage[_0x8fb24(0x506)]();_0x53cd33=Math['ceil'](Math[_0x8fb24(0x28c)](_0x48ebe4,_0x463ea6['length'])/this['maxCols']());}return Math[_0x8fb24(0x362)](0x1,Math[_0x8fb24(0x28c)](_0x53cd33,this[_0x8fb24(0x447)]()));},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x447)]=function(){const _0x2fb7a8=_0x3fecc6,_0x186f7e=this[_0x2fb7a8(0x2f0)],_0x179e64=_0x186f7e?_0x186f7e['y']:0x0,_0x329746=_0x186f7e?_0x186f7e['height']:0x0,_0x574e29=Graphics[_0x2fb7a8(0x380)]/0x2;return _0x179e64<_0x574e29&&_0x179e64+_0x329746>_0x574e29?0x4:$gameSystem[_0x2fb7a8(0x315)]();},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x2b4)]=function(){const _0x492407=_0x3fecc6;let _0x3968a3=this[_0x492407(0x338)]();for(const _0x39dfc1 of this[_0x492407(0x339)]){const _0x2d9cae=_0x39dfc1[_0x492407(0x2a3)],_0x416b34=this[_0x492407(0x2c6)](_0x2d9cae),_0x39b741=this[_0x492407(0x25d)](_0x2d9cae)[_0x492407(0x3ee)]+_0x416b34,_0x447dc8=Math[_0x492407(0x2df)](_0x39b741)+this['itemPadding']()*0x2;_0x3968a3=Math[_0x492407(0x362)](_0x3968a3,_0x447dc8);}return _0x3968a3;},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x338)]=function(){const _0x2abdd5=_0x3fecc6;let _0x4fdbd1=$gameSystem[_0x2abdd5(0x1b2)]();const _0x246d14=$gameMessage[_0x2abdd5(0x1f6)]();for(const _0x1b0e8c of _0x246d14){_0x1b0e8c['match'](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x4fdbd1=Math[_0x2abdd5(0x362)](_0x4fdbd1,Number(RegExp['$1'])));}return Math[_0x2abdd5(0x362)](_0x4fdbd1,0x1);},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x561)]=function(){const _0x5d0f92=_0x3fecc6,_0x43df2f=$gameSystem['getChoiceMessageDistance']()||0x0,_0x794a6d=this['_messageWindow']['y'],_0x6b2ffa=this[_0x5d0f92(0x2f0)][_0x5d0f92(0x436)],_0x512f36=this['_messageWindow']['_nameBoxWindow'],_0x555b58=_0x512f36[_0x5d0f92(0x3b6)]>0x0&&_0x512f36['width']>0x0,_0x5b00b0=_0x555b58?_0x512f36[_0x5d0f92(0x436)]:0x0;if(_0x43df2f<0x0&&(this[_0x5d0f92(0x2f0)]['isClosed']()||this[_0x5d0f92(0x2f0)][_0x5d0f92(0x41f)]()))this['y']=Math[_0x5d0f92(0x278)]((Graphics[_0x5d0f92(0x380)]-this['height'])/0x2);else{if(_0x794a6d>=Graphics[_0x5d0f92(0x380)]/0x2)_0x43df2f>=0x0?this['y']-=_0x43df2f:this['y']=Math[_0x5d0f92(0x22d)]((_0x794a6d-this[_0x5d0f92(0x436)]-_0x5b00b0)/0x2);else{if(_0x43df2f>=0x0)this['y']+=_0x43df2f;else{const _0x4790e9=Graphics['boxHeight']-(_0x794a6d+_0x6b2ffa+_0x5b00b0);this['y']+=Math[_0x5d0f92(0x22d)]((_0x4790e9-this['height'])/0x2)+_0x5b00b0;}}}},Window_ChoiceList['prototype']['drawItem']=function(_0x5619ae){const _0x89375e=_0x3fecc6,_0x3c84de=this[_0x89375e(0x286)](_0x5619ae);if(_0x3c84de){const _0x3c327d=ImageManager[_0x89375e(0x18b)](_0x3c84de),_0x52d7a9=this['choiceAlignText'](),_0x4954c6=_0x52d7a9+this[_0x89375e(0x1db)](_0x5619ae),_0x36310b=this[_0x89375e(0x411)](_0x5619ae);_0x3c327d[_0x89375e(0x277)](this[_0x89375e(0x19a)][_0x89375e(0x42f)](this,_0x5619ae,!![],_0x4954c6,_0x36310b,_0x3c327d));return;}this[_0x89375e(0x223)](_0x5619ae);},Window_ChoiceList['prototype'][_0x3fecc6(0x223)]=function(_0x754bfc){const _0x30f7f1=_0x3fecc6,_0x71fe83=this['itemRectWithPadding'](_0x754bfc),_0x317a8a=this[_0x30f7f1(0x306)](),_0x843ab5=_0x317a8a+this[_0x30f7f1(0x1db)](_0x754bfc);this['changePaintOpacity'](this[_0x30f7f1(0x2d9)](_0x754bfc));const _0x27f70c=this[_0x30f7f1(0x25d)](_0x843ab5)['height'],_0x55aad0=_0x71fe83['x']+this[_0x30f7f1(0x2c6)](_0x843ab5),_0x424a8e=Math['max'](_0x71fe83['y'],_0x71fe83['y']+Math[_0x30f7f1(0x278)]((_0x71fe83['height']-_0x27f70c)/0x2));this[_0x30f7f1(0x3de)](_0x843ab5,_0x55aad0,_0x424a8e,_0x71fe83['width']),this[_0x30f7f1(0x39c)](_0x754bfc),this['requestChoiceBackgroundImage'](_0x754bfc,_0x843ab5,_0x71fe83);},Window_ChoiceList[_0x3fecc6(0x1d6)]['choiceAlignText']=function(){const _0xe42a9a=_0x3fecc6;return $gameSystem[_0xe42a9a(0x1de)]()!==_0xe42a9a(0x3bd)?_0xe42a9a(0x263)['format']($gameSystem[_0xe42a9a(0x1de)]()):'';},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x2c6)]=function(_0x43aa87){const _0x116ddc=_0x3fecc6;let _0x5cc87c=0x0;return _0x43aa87[_0x116ddc(0x498)](/<(?:CHOICE|CHOICE |)INDENT:[ ](\d+)>/gi)&&(_0x5cc87c=Number(RegExp['$1'])),_0x5cc87c;},Window_ChoiceList['prototype'][_0x3fecc6(0x39c)]=function(_0x2fb013){const _0xe61317=_0x3fecc6;if(!Imported[_0xe61317(0x2fd)])return;const _0x48c8a9=this['commandName'](_0x2fb013);let _0x3e10ba=![],_0x49a2ad=![],_0x5eb736=ColorManager['itemBackColor1'](),_0x161f37=ColorManager[_0xe61317(0x54b)]();if(_0x48c8a9[_0xe61317(0x498)](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi))_0x5eb736=ColorManager[_0xe61317(0x403)](RegExp['$1'])[_0xe61317(0x467)](),_0x161f37=ColorManager[_0xe61317(0x403)](RegExp['$2'])[_0xe61317(0x467)](),_0x3e10ba=!![];else{if(_0x48c8a9[_0xe61317(0x498)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){let _0x441b36=String(RegExp['$1'])['toLowerCase']()[_0xe61317(0x467)]();switch(_0x441b36){case _0xe61317(0x3c2):_0x5eb736=_0x161f37=_0xe61317(0x4a8),_0x49a2ad=!![];break;case _0xe61317(0x3b8):_0x5eb736=_0x161f37='#fbaf5d',_0x49a2ad=!![];break;case'yellow':_0x5eb736=_0x161f37=_0xe61317(0x543),_0x49a2ad=!![];break;case'green':_0x5eb736=_0x161f37=_0xe61317(0x548),_0x49a2ad=!![];break;case _0xe61317(0x4ed):_0x5eb736=_0x161f37=_0xe61317(0x414),_0x49a2ad=!![];break;case _0xe61317(0x185):case _0xe61317(0x1e7):_0x5eb736=_0x161f37=_0xe61317(0x38c),_0x49a2ad=!![];break;case'brown':_0x5eb736=_0x161f37=_0xe61317(0x4e8),_0x49a2ad=!![];break;case _0xe61317(0x1ec):_0x5eb736=_0x161f37=_0xe61317(0x1bd),_0x49a2ad=!![];break;case _0xe61317(0x2da):_0x5eb736=_0x161f37='#ffffff',_0x49a2ad=!![];break;case _0xe61317(0x361):case'grey':_0x5eb736=_0x161f37=_0xe61317(0x22f),_0x49a2ad=!![];break;case'black':_0x5eb736=_0x161f37='#707070',_0x49a2ad=!![];break;case _0xe61317(0x3e7):_0x5eb736=_0x161f37=ColorManager[_0xe61317(0x260)](),_0x49a2ad=!![];break;case'no':_0x5eb736=_0x161f37=ColorManager[_0xe61317(0x2d1)](),_0x49a2ad=!![];break;case'system':_0x5eb736=_0x161f37=ColorManager[_0xe61317(0x3a8)](),_0x49a2ad=!![];break;case _0xe61317(0x369):_0x5eb736=_0x161f37=ColorManager['crisisColor'](),_0x49a2ad=!![];break;default:_0x5eb736=_0x161f37=ColorManager[_0xe61317(0x403)](_0x441b36),_0x49a2ad=!![];break;}_0x3e10ba=!![];}}if(!_0x3e10ba)return;const _0x41619b=this[_0xe61317(0x265)](_0x2fb013);this[_0xe61317(0x385)][_0xe61317(0x461)](_0x41619b['x'],_0x41619b['y'],_0x41619b[_0xe61317(0x3ee)],_0x41619b['height']),this[_0xe61317(0x284)](_0x41619b,_0x5eb736,_0x161f37,_0x49a2ad);},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x284)]=function(_0x48a2cf,_0x1c709b,_0x5abf50,_0x2da5c3){const _0x4d84dd=_0x3fecc6,_0x488403=ColorManager[_0x4d84dd(0x398)](),_0x2b4daa=ColorManager[_0x4d84dd(0x4ec)](),_0x212f0c=_0x1c709b??ColorManager[_0x4d84dd(0x398)](),_0x1a0967=_0x5abf50??_0x1c709b,_0x12bce3=_0x48a2cf['x'],_0x11f33e=_0x48a2cf['y'],_0x3cc440=_0x48a2cf[_0x4d84dd(0x3ee)],_0x55b28e=_0x48a2cf[_0x4d84dd(0x436)];this[_0x4d84dd(0x385)][_0x4d84dd(0x2bd)](_0x12bce3,_0x11f33e,_0x3cc440,_0x55b28e,_0x212f0c,_0x1a0967,!![]),_0x2da5c3&&this[_0x4d84dd(0x385)][_0x4d84dd(0x2bd)](_0x12bce3,_0x11f33e,_0x3cc440,_0x55b28e,_0x488403,_0x1a0967,!![]),this[_0x4d84dd(0x385)]['strokeRect'](_0x12bce3,_0x11f33e,_0x3cc440,_0x55b28e,_0x488403);},Window_ChoiceList['prototype'][_0x3fecc6(0x286)]=function(_0x397d25){const _0x2771ff=_0x3fecc6,_0x34c976=this[_0x2771ff(0x306)](),_0x13aeff=_0x34c976+this[_0x2771ff(0x1db)](_0x397d25);let _0x2d9cab='';if(_0x13aeff['match'](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x2d9cab=String(RegExp['$1'])['trim']();else _0x13aeff['match'](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x2d9cab=String(RegExp['$2'])[_0x2771ff(0x467)]());return _0x2d9cab;},Window_ChoiceList['prototype'][_0x3fecc6(0x4d6)]=function(_0x4e9274,_0x2e3df9,_0x433779){const _0x28625c=_0x3fecc6;let _0x419170='';if(_0x2e3df9[_0x28625c(0x498)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x419170=String(RegExp['$1'])[_0x28625c(0x467)]();else _0x2e3df9[_0x28625c(0x498)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x419170=String(RegExp['$2'])['trim']());if(_0x419170){const _0xaac831=ImageManager[_0x28625c(0x18b)](_0x419170);_0xaac831[_0x28625c(0x277)](this[_0x28625c(0x19a)][_0x28625c(0x42f)](this,_0x4e9274,![],_0x2e3df9,_0x433779,_0xaac831));}},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x19a)]=function(_0x5a3cb3,_0x3f82b4,_0x459b7d,_0x5d150f,_0x1042d2){const _0x48b301=_0x3fecc6,_0x3f7edf=this[_0x48b301(0x306)](),_0x5929b3=_0x3f7edf+this[_0x48b301(0x1db)](_0x5a3cb3);if(_0x459b7d!==_0x5929b3)return;const _0x1ac458=this[_0x48b301(0x411)](_0x5a3cb3);if(['x','y',_0x48b301(0x3ee),'height'][_0x48b301(0x1dd)](_0x4f6d21=>_0x1ac458[_0x4f6d21]!==_0x5d150f[_0x4f6d21]))return;let _0xa03c8d=0x0,_0x1da514='';if(_0x3f82b4&&_0x5929b3[_0x48b301(0x498)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i)){}else{if(_0x3f82b4&&_0x5929b3['match'](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i))_0x1da514=String(RegExp['$1'])[_0x48b301(0x435)]()[_0x48b301(0x467)]();else!_0x3f82b4&&_0x5929b3[_0x48b301(0x498)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x1da514=String(RegExp['$1'])[_0x48b301(0x435)]()[_0x48b301(0x467)]());}switch(_0x1da514){case _0x48b301(0x4ae):case _0x48b301(0x2ed):case _0x48b301(0x21a):case _0x48b301(0x570):case _0x48b301(0x3fa):case _0x48b301(0x3ac):case'1':_0xa03c8d=0x1;break;case _0x48b301(0x39a):case'lower-center':case _0x48b301(0x527):case _0x48b301(0x45f):case _0x48b301(0x4c5):case'down\x20center':case'down':case'2':_0xa03c8d=0x2;break;case _0x48b301(0x275):case _0x48b301(0x207):case _0x48b301(0x521):case'downright':case _0x48b301(0x25c):case _0x48b301(0x417):case'3':_0xa03c8d=0x3;break;case'midleft':case _0x48b301(0x205):case'left':case'4':_0xa03c8d=0x4;break;case'midcenter':case _0x48b301(0x41e):case _0x48b301(0x442):case _0x48b301(0x2e0):case'5':_0xa03c8d=0x5;break;case _0x48b301(0x357):case _0x48b301(0x254):case _0x48b301(0x49e):case'6':_0xa03c8d=0x6;break;case _0x48b301(0x564):case _0x48b301(0x1ee):case'upper\x20left':case'upleft':case _0x48b301(0x445):case _0x48b301(0x23d):case'7':_0xa03c8d=0x7;break;case'uppercenter':case _0x48b301(0x559):case _0x48b301(0x1b3):case _0x48b301(0x370):case'up-center':case'up\x20center':case'up':case'8':_0xa03c8d=0x8;break;case _0x48b301(0x1b8):case _0x48b301(0x266):case _0x48b301(0x44b):case _0x48b301(0x206):case _0x48b301(0x422):case _0x48b301(0x2b5):case'9':_0xa03c8d=0x9;break;}const _0x8a9f1d=_0x3f82b4?this[_0x48b301(0x2e2)]:this[_0x48b301(0x385)],_0x41e984=this['itemRect'](_0x5a3cb3);!_0x3f82b4&&_0x8a9f1d[_0x48b301(0x461)](_0x41e984['x']-0x1,_0x41e984['y']-0x1,_0x41e984[_0x48b301(0x3ee)]+0x2,_0x41e984['height']+0x2);const _0x1a226b=_0x41e984['x']+0x2,_0x491532=_0x41e984['y']+0x2,_0x14bebf=_0x41e984[_0x48b301(0x3ee)]-0x4,_0x2b6dbd=_0x41e984['height']-0x4,_0x32b942=_0x1042d2[_0x48b301(0x3ee)],_0x39f05f=_0x1042d2[_0x48b301(0x436)];let _0x1c3796=_0x1a226b,_0x54cbc9=_0x491532,_0x46c082=_0x14bebf,_0x112614=_0x2b6dbd;const _0x4eb09b=_0x14bebf/_0x32b942,_0xb849be=_0x2b6dbd/_0x39f05f;let _0x4d37b5=Math['min'](_0x4eb09b,_0xb849be);if(_0x3f82b4)_0x4d37b5=Math[_0x48b301(0x28c)](_0x4d37b5,0x1);_0xa03c8d!==0x0&&(_0x46c082=Math['round'](_0x32b942*_0x4d37b5),_0x112614=Math['round'](_0x39f05f*_0x4d37b5));switch(_0xa03c8d){case 0x1:case 0x4:case 0x7:_0x1c3796=_0x1a226b;break;case 0x2:case 0x5:case 0x8:_0x1c3796+=Math[_0x48b301(0x278)]((_0x14bebf-_0x46c082)/0x2);break;case 0x3:case 0x6:case 0x9:_0x1c3796+=_0x14bebf-_0x46c082;break;}switch(_0xa03c8d){case 0x7:case 0x8:case 0x9:_0x54cbc9=_0x491532;break;case 0x4:case 0x5:case 0x6:_0x54cbc9+=Math[_0x48b301(0x278)]((_0x2b6dbd-_0x112614)/0x2);break;case 0x1:case 0x2:case 0x3:_0x54cbc9+=_0x2b6dbd-_0x112614;break;}_0x8a9f1d[_0x48b301(0x1ce)](_0x1042d2,0x0,0x0,_0x32b942,_0x39f05f,_0x1c3796,_0x54cbc9,_0x46c082,_0x112614),_0x3f82b4&&this[_0x48b301(0x223)](_0x5a3cb3);},Window_ChoiceList[_0x3fecc6(0x1d6)][_0x3fecc6(0x525)]=function(){const _0x3b5af7=_0x3fecc6;this[_0x3b5af7(0x515)][_0x3b5af7(0x472)]();if(!this[_0x3b5af7(0x2cb)])return;const _0x39d5c0=this[_0x3b5af7(0x471)]();this[_0x3b5af7(0x2cb)][_0x39d5c0]?(this[_0x3b5af7(0x515)][_0x3b5af7(0x3ce)](this[_0x3b5af7(0x2cb)][_0x39d5c0]),this[_0x3b5af7(0x515)]['show']()):(this[_0x3b5af7(0x515)][_0x3b5af7(0x472)](),this['_helpWindow'][_0x3b5af7(0x373)]());},Window_EventItem[_0x3fecc6(0x1d6)][_0x3fecc6(0x1a5)]=function(){const _0x40e16d=_0x3fecc6,_0xa5506a=$gameMessage[_0x40e16d(0x386)]();_0xa5506a===_0x40e16d(0x1e4)&&Imported['VisuMZ_1_SkillsStatesCore']?this[_0x40e16d(0x3f5)]():Window_ItemList[_0x40e16d(0x1d6)]['makeItemList'][_0x40e16d(0x358)](this);},Window_EventItem[_0x3fecc6(0x1d6)]['makeSkillList']=function(){const _0x22b662=_0x3fecc6,_0x5316f5=$gameMessage[_0x22b662(0x209)]();this['_data']=_0x5316f5?_0x5316f5[_0x22b662(0x3aa)]()['filter'](_0x1c8bb1=>this[_0x22b662(0x3c6)](_0x1c8bb1)):[],this['includes'](null)&&this['_data']['push'](null);},VisuMZ[_0x3fecc6(0x46b)][_0x3fecc6(0x4f5)]=Window_EventItem['prototype'][_0x3fecc6(0x3c6)],Window_EventItem[_0x3fecc6(0x1d6)][_0x3fecc6(0x3c6)]=function(_0x5c89e0){const _0x57c19b=_0x3fecc6,_0x2e8043=$gameMessage[_0x57c19b(0x386)]();if(_0x2e8043===_0x57c19b(0x240)){if(!DataManager['isWeapon'](_0x5c89e0))return![];const _0x3b89d9=$gameMessage[_0x57c19b(0x32b)]();if(_0x3b89d9>0x0){if(_0x5c89e0[_0x57c19b(0x33b)]!==_0x3b89d9)return![];}return!![];}else{if(_0x2e8043===_0x57c19b(0x531)){if(!DataManager['isArmor'](_0x5c89e0))return![];const _0x7eafe0=$gameMessage[_0x57c19b(0x501)]();if(_0x7eafe0>0x0){if(_0x5c89e0['atypeId']!==_0x7eafe0)return![];}const _0xc294dd=$gameMessage['itemChoiceEtypeId']();if(_0xc294dd>0x0){if(_0x5c89e0[_0x57c19b(0x256)]!==_0xc294dd)return![];}return!![];}else{if(_0x2e8043===_0x57c19b(0x1e4)){if(!DataManager[_0x57c19b(0x4ff)](_0x5c89e0))return![];const _0x97e162=$gameMessage['itemChoiceActor']();if(_0x97e162[_0x57c19b(0x1ae)](_0x5c89e0))return![];if(!_0x97e162['isSkillTypeMatchForUse'](_0x5c89e0))return![];const _0x185f47=$gameMessage[_0x57c19b(0x4dd)]();if(_0x185f47>0x0){const _0xe4a7e2=DataManager[_0x57c19b(0x20a)](_0x5c89e0);if(!_0xe4a7e2[_0x57c19b(0x3c6)](_0x185f47))return![];}return!![];}else return VisuMZ[_0x57c19b(0x46b)][_0x57c19b(0x4f5)][_0x57c19b(0x358)](this,_0x5c89e0);}}},VisuMZ[_0x3fecc6(0x46b)]['Window_ItemList_drawItemNumber']=Window_ItemList[_0x3fecc6(0x1d6)][_0x3fecc6(0x214)],Window_ItemList[_0x3fecc6(0x1d6)]['drawItemNumber']=function(_0x19f0c7,_0xdc9f98,_0x390555,_0x4eeef5){const _0x2e0918=_0x3fecc6,_0x52673b=$gameMessage['itemChoiceItypeId']();if(_0x52673b===_0x2e0918(0x1e4)){const _0x1b84be=$gameMessage[_0x2e0918(0x209)]();this[_0x2e0918(0x43c)](_0x1b84be,_0x19f0c7,_0xdc9f98,_0x390555,_0x4eeef5);}else VisuMZ['MessageCore'][_0x2e0918(0x30f)][_0x2e0918(0x358)](this,_0x19f0c7,_0xdc9f98,_0x390555,_0x4eeef5);},Window_MapName[_0x3fecc6(0x1d6)][_0x3fecc6(0x557)]=function(){const _0x57ad87=_0x3fecc6;this[_0x57ad87(0x2e2)]['clear']();let _0x5cbdd6=$gameMap[_0x57ad87(0x3d0)]();if(_0x5cbdd6){const _0x49fa51=this['innerWidth'];this[_0x57ad87(0x4a2)](0x0,0x0,_0x49fa51,this['lineHeight']()),_0x5cbdd6=this['realignMapName'](_0x5cbdd6);const _0x5effd6=this['textSizeEx'](_0x5cbdd6)[_0x57ad87(0x3ee)];this['drawTextEx'](_0x5cbdd6,Math[_0x57ad87(0x22d)]((_0x49fa51-_0x5effd6)/0x2),0x0);}},Window_MapName[_0x3fecc6(0x1d6)]['realignMapName']=function(_0x2ea684){const _0x508330=_0x3fecc6;if(_0x2ea684['match'](/<LEFT>/gi))this['x']=0x0;else{if(_0x2ea684[_0x508330(0x498)](/<CENTER>/gi))this['x']=Math[_0x508330(0x22d)]((Graphics[_0x508330(0x3a0)]-this[_0x508330(0x3ee)])/0x2);else _0x2ea684['match'](/<RIGHT>/gi)&&(this['x']=Graphics[_0x508330(0x3a0)]-this[_0x508330(0x3ee)]);}_0x2ea684=_0x2ea684[_0x508330(0x496)](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x2ea684=_0x2ea684['replace'](/<\/(?:LEFT|CENTER|RIGHT)>/gi,'');if(_0x2ea684[_0x508330(0x498)](/<TOP>/gi))this['y']=0x0;else{if(_0x2ea684[_0x508330(0x498)](/<MIDDLE>/gi))this['y']=Math[_0x508330(0x22d)]((Graphics[_0x508330(0x380)]-this[_0x508330(0x436)])/0x2);else _0x2ea684['match'](/<BOTTOM>/gi)&&(this['y']=Graphics[_0x508330(0x380)]-this[_0x508330(0x436)]);}return _0x2ea684=_0x2ea684['replace'](/<(?:TOP|MIDDLE|BOTTOM)>/gi,''),_0x2ea684=_0x2ea684[_0x508330(0x496)](/<\/(?:TOP|MIDDLE|BOTTOM)>/gi,''),_0x2ea684[_0x508330(0x498)](/<X:[ ]([\+\-]\d+)>/gi)&&(this['x']+=Number(RegExp['$1']),_0x2ea684=_0x2ea684[_0x508330(0x496)](/<X:[ ]([\+\-]\d+)>/gi,'')),_0x2ea684['match'](/<Y:[ ]([\+\-]\d+)>/gi)&&(this['y']+=Number(RegExp['$1']),_0x2ea684=_0x2ea684[_0x508330(0x496)](/<Y:[ ]([\+\-]\d+)>/gi,'')),_0x2ea684;};