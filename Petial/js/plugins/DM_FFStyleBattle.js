//-----------------------------------------------------------------------------
// Dungeonmind - FF Style Battle Scene
// DM_FFStyleBattle.js
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.DM_FFStyleBattle = true;

var Dungeonmind = Dungeonmind || {};
Dungeonmind.FFSB = Dungeonmind.FFSB || {};
Dungeonmind.FFSB.version = 1.06;

/*:
 * DM_FFStyleBattle.js
 * Version 1.06
 *
 * @plugindesc [Rpg Maker MZ] [Tier 1] [Version 1.06] - This plugin will help you create
 * a more retro-style battle system UI for your games.
 *
 * @url https://www.dmplugins.com
 * @target MZ
 * @author Dungeonmind
 *
 * @param Battle Layout Settings
 * @type struct<battleLayoutSettings>
 * @desc Change how the windows in Scene_Battle are displayed.
 * @default {"partyCommandWindow":"","partyCommandBgType":"0","partyCommandRectangle:function":"\"const Width = 192;\\nconst Height = this.windowAreaHeight();\\nconst X = Width;\\nconst Y = Graphics.boxHeight - Height;\\nreturn new Rectangle(X, Y, Width, Height);\"","partyCommandWindowFontSize":"18","partyStatusWindow":"","partyStatusBgType":"0","partyStatusRectangle:function":"\"const Width = (Graphics.boxWidth / 3) * 2;\\nconst Height = this.windowAreaHeight();\\nconst X = Graphics.boxWidth - Width;\\nconst Y = Graphics.boxHeight - Height;\\nreturn new Rectangle(X, Y, Width, Height);\"","partyStatusWindowFontSize":"18","ffStyleStats":"","hpStats":"true","hpLabelText":"\\c[16]HP","hpLabelX":"this.getLongestActorName() + rect.x + 6;","hpLabelY":"rect.y + 7;","hpValuesFormat":"'\\c[0]' + actor._hp + '/' + actor.mhp;","hpValuesX":"this.getLongestActorName() + rect.x + 6 + hpLabelSize;","hpValuesY":"rect.y + 7;","mpStats":"true","mpLabelText":"\\c[16]MP","mpLabelX":"this.getLongestActorName() + rect.x + 12 + hpLabelSize + hpValuesTextSize;","mpLabelY":"rect.y + 7;","mpValuesFormat":"'\\c[0]' + actor._mp + '/' + actor.mmp;","mpValuesX":"this.getLongestActorName() + rect.x + 12 + hpLabelSize + hpValuesTextSize + mpLabelSize;","mpValuesY":"rect.y + 7;","tpStats":"true","tpLabelText":"\\c[16]TP","tpLabelX":"this.getLongestActorName() + rect.x + 18 + hpLabelSize + hpValuesTextSize + mpLabelSize + mpValuesTextSize;","tpLabelY":"rect.y + 7;","tpValuesFormat":"'\\c[0]' + actor._tp + '/' + actor.maxTp();","tpValuesX":"this.getLongestActorName() + rect.x + 18 + hpLabelSize + hpValuesTextSize + mpLabelSize + mpValuesTextSize + tpLabelSize;","tpValuesY":"rect.y + 7;","actorSpriteGauges":"","hpGauge":"false","hpGaugeX":"rect.x + 120;","hpGaugeY":"rect.y + 4;","hpGaugeWidth":"82","hpGaugeHeight":"12","hpGaugeColor1":"20","hpGaugeColor2":"21","hpGaugeBGColor":"19","hpGaugeLabelText":"HP","hpGaugeLabelX":"this.labelOutlineWidth() / 2;","hpGaugeLabelY":"5","mpGauge":"false","mpGaugeX":"rect.x + 206;","mpGaugeY":"rect.y + 4;","mpGaugeWidth":"82","mpGaugeHeight":"12","mpGaugeColor1":"22","mpGaugeColor2":"23","mpGaugeBGColor":"19","mpGaugeLabelText":"MP","mpGaugeLabelX":"this.labelOutlineWidth() / 2;","mpGaugeLabelY":"5","tpGauge":"false","tpGaugeX":"rect.x + 292;","tpGaugeY":"rect.y + 4;","tpGaugeWidth":"82","tpGaugeHeight":"12","tpGaugeColor1":"28","tpGaugeColor2":"29","tpGaugeBGColor":"19","tpGaugeLabelText":"TP","tpGaugeLabelX":"this.labelOutlineWidth() / 2;","tpGaugeLabelY":"5","tpbGauge":"false","tpbGaugeX":"rect.x + 392;","tpbGaugeY":"rect.y + 4;","tpbGaugeWidth":"82 - this.bitmap.measureTextWidth('HP');","tpbGaugeHeight":"12","tpbGaugeColor1":"26","tpbGaugeColor2":"27","tpbGaugeBGColor":"19","states":"","statesX":"rect.x + rect.width - ImageManager.iconWidth / 2 + 4;","statesY":"rect.y + ImageManager.iconHeight / 2 + 4;","enemyStatusWindow":"","enemyStatusBgType":"0","enemyStatusRectangle:function":"\"const X = 0;\\nconst Width = Graphics.boxWidth / 3;\\nconst Height = this.windowAreaHeight();\\nconst Y = Graphics.boxHeight - Height;\\nreturn new Rectangle(X, Y, Width, Height);\"","enemyStatusWindowFontSize":"18","actorCommandWindow":"","actorCommandBgType":"0","actorCommandRectangle:function":"\"const Width = 192;\\nconst Height = this.windowAreaHeight();\\nconst X = Width;\\nconst Y = Graphics.boxHeight - Height;\\nreturn new Rectangle(X, Y, Width, Height);\"","Hide Actor Command Window For Atk Select":"true","actorCommandWindowFontSize":"18","skillWindow":"","skillWindowBgType":"0","skillWindowRectangle:function":"\"const Width = Graphics.boxWidth;\\nconst Height = this.windowAreaHeight();\\nconst X = 0;\\nconst Y = Graphics.boxHeight - Height;\\nreturn new Rectangle(X, Y, Width, Height);\"","skillWindowFontSize":"18","skillWindowColumns":"2","itemWindow":"","itemWindowBgType":"0","itemWindowRectangle:function":"\"return this.skillWindowRect();\"","itemWindowFontSize":"18","itemWindowColumns":"2"}
 *
 * @help
 *
 *
 * ===========================================================================
 * Terms of use
 * ===========================================================================
 *  1. This plugin is free for non-commercial use.
 *  2. Do not sell the plugin/code by itself or claim that you wrote it.
 *  3. Do not take the code or parts of the code for your own plugins.
 *  4. You can edit the plugin/code for your own project(s) only.
 *  5. Do not share the code with anyone without express permission from the
 *     author (Dungeonmind).
 *  6. Credit is not required but appreciated.
 *  7. You must buy a commercial licence before using this in a commercial
 *  game.
 *
 * ===========================================================================
 * Plugin Parameters
 * ===========================================================================
 * 
 * ===========================================================================
 * Party Command Window
 * ===========================================================================
 *
 * ---------------------------------------------------------------------------
 * Background Type
 * ---------------------------------------------------------------------------
 * ➔ It's a number between 0-2.
 * You have 3 options here.
 *
 * 0 : Window
 * 1 : Dim
 * 2 : Transparent 
 *
 * ---------------------------------------------------------------------------
 * JS: X,Y,Width,Height - Window Rectangle
 * ---------------------------------------------------------------------------
 * ➔ It's a window rectangle. JavaScript is allowed.
 * Code used to determine the dimensions for this window.
 *
 * ---------------------------------------------------------------------------
 * Font Size
 * ---------------------------------------------------------------------------
 * ➔ It's a number.
 * This changes the font size for the window.
 *
 * ===========================================================================
 * Party Status Window
 * ===========================================================================
 *
 * ---------------------------------------------------------------------------
 * Background Type
 * ---------------------------------------------------------------------------
 * ➔ It's a number between 0-2.
 * You have 3 options here.
 *
 * 0 : Window
 * 1 : Dim
 * 2 : Transparent 
 *
 * ---------------------------------------------------------------------------
 * JS: X,Y,Width,Height - Window Rectangle
 * ---------------------------------------------------------------------------
 * ➔ It's a window rectangle. JavaScript is allowed.
 * Code used to determine the dimensions for this window.
 *
 * ---------------------------------------------------------------------------
 * Font Size
 * ---------------------------------------------------------------------------
 * ➔ It's a number.
 * This changes the font size for the window.
 *
 * ===========================================================================
 * FF Style Stats
 * ===========================================================================
 *
 * ---------------------------------------------------------------------------
 * HP Stats
 * ---------------------------------------------------------------------------
 * ➔ It's a boolean (true or false).
 * This will enable or disable the HP Stats in the window.
 *
 * ---------------------------------------------------------------------------
 * HP Label Text
 * ---------------------------------------------------------------------------
 * ➔ It's a string.
 * Sets the text for the label. Color text codes are allowed.
 *
 * ---------------------------------------------------------------------------
 * HP Label X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the X element for the label.
 *
 * ---------------------------------------------------------------------------
 * HP Label Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the Y element for the label.
 *
 * ---------------------------------------------------------------------------
 * HP Values Format
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * You can use the following variables to display actor information:
 * 
 * actor._hp : will display the actors current HP.
 * actor.mhp : will display the actors current maximum HP.
 * '\c[16]' : will change the colour of the following text to color 16.
 * 
 * Please keep in mind to put the color text codes and symbols into string
 * format using either "" or ''.
 *
 * ---------------------------------------------------------------------------
 * HP Values X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the X element for the actor HP values.
 *
 * ---------------------------------------------------------------------------
 * HP Values Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the Y element for the actor HP values.
 *
 * ---------------------------------------------------------------------------
 * MP Stats
 * ---------------------------------------------------------------------------
 * ➔ It's a boolean (true or false).
 * This will enable or disable the MP Stats in the window.
 *
 * ---------------------------------------------------------------------------
 * MP Label Text
 * ---------------------------------------------------------------------------
 * ➔ It's a string.
 * Sets the text for the label. Color text codes are allowed.
 *
 * ---------------------------------------------------------------------------
 * MP Label X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the X element for the label.
 *
 * ---------------------------------------------------------------------------
 * MP Label Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the Y element for the label.
 *
 * ---------------------------------------------------------------------------
 * MP Values Format
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * You can use the following variables to display actor information:
 * 
 * actor._mp : will display the actors current MP.
 * actor.mmp : will display the actors current maximum MP.
 * '\c[16]' : will change the colour of the following text to color 16.
 * 
 * Please keep in mind to put the color text codes and symbols into string
 * format using either "" or ''.
 *
 * ---------------------------------------------------------------------------
 * MP Values X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the X element for the actor HP values.
 *
 * ---------------------------------------------------------------------------
 * MP Values Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the Y element for the actor MP values.
 *
 * ---------------------------------------------------------------------------
 * TP Stats
 * ---------------------------------------------------------------------------
 * ➔ It's a boolean (true or false).
 * This will enable or disable the TP Stats in the window.
 *
 * ---------------------------------------------------------------------------
 * TP Label Text
 * ---------------------------------------------------------------------------
 * ➔ It's a string.
 * Sets the text for the label. Color text codes are allowed.
 *
 * ---------------------------------------------------------------------------
 * TP Label X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the X element for the label.
 *
 * ---------------------------------------------------------------------------
 * TP Label Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the Y element for the label.
 *
 * ---------------------------------------------------------------------------
 * TP Values Format
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * You can use the following variables to display actor information:
 * 
 * actor._tp : will display the actors current TP.
 * actor.maxTp() : will display the actors current maximum TP.
 * '\c[16]' : will change the colour of the following text to color 16.
 * 
 * Please keep in mind to put the color text codes and symbols into string
 * format using either "" or ''.
 *
 * ---------------------------------------------------------------------------
 * TP Values X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the X element for the actor TP values.
 *
 * ---------------------------------------------------------------------------
 * TP Values Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the Y element for the actor TP values.
 *
 * ===========================================================================
 * Actor Sprite Gauges
 * ===========================================================================
 *
 * ---------------------------------------------------------------------------
 * HP Gauge
 * ---------------------------------------------------------------------------
 * ➔ It's a boolean (true or false).
 * This will enable or disable the HP Gauge in the window.
 *
 * ---------------------------------------------------------------------------
 * HP Gauge X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the X element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * HP Gauge Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the Y element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * HP Gauge Width
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Set the Width element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * HP Gauge Height
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the Height element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * HP Gauge Color 1
 * ---------------------------------------------------------------------------
 * ➔ It's a number from 0-31.
 * This changes color 1 for the gauge.
 *
 * ---------------------------------------------------------------------------
 * HP Gauge Color 2
 * ---------------------------------------------------------------------------
 * ➔ It's a number from 0-31.
 * This changes color 2 for the gauge.
 *
 * ---------------------------------------------------------------------------
 * HP Gauge BG Color
 * ---------------------------------------------------------------------------
 * ➔ It's a number from 0-31.
 * This changes the BG Color for the gauge.
 *
 * ---------------------------------------------------------------------------
 * HP Gauge Label Text
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will NOT be evaluated as JavaScript code.
 * Sets the label text element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * HP Gauge Label X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the label X element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * HP Gauge Label Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the label Y element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * MP Gauge
 * ---------------------------------------------------------------------------
 * ➔ It's a boolean (true or false).
 * This will enable or disable the MP Gauge in the window.
 *
 * ---------------------------------------------------------------------------
 * MP Gauge X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the X element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * MP Gauge Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the Y element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * MP Gauge Width
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Set the Width element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * MP Gauge Height
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the Height element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * MP Gauge Color 1
 * ---------------------------------------------------------------------------
 * ➔ It's a number from 0-31.
 * This changes color 1 for the gauge.
 *
 * ---------------------------------------------------------------------------
 * MP Gauge Color 2
 * ---------------------------------------------------------------------------
 * ➔ It's a number from 0-31.
 * This changes color 2 for the gauge.
 *
 * ---------------------------------------------------------------------------
 * MP Gauge BG Color
 * ---------------------------------------------------------------------------
 * ➔ It's a number from 0-31.
 * This changes the BG Color for the gauge.
 *
 * ---------------------------------------------------------------------------
 * MP Gauge Label Text
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will NOT be evaluated as JavaScript code.
 * Sets the label text element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * MP Gauge Label X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the label X element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * MP Gauge Label Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the label Y element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TP Gauge
 * ---------------------------------------------------------------------------
 * ➔ It's a boolean (true or false).
 * This will enable or disable the TP Gauge in the window.
 *
 * ---------------------------------------------------------------------------
 * TP Gauge X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the X element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TP Gauge Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the Y element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TP Gauge Width
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Set the Width element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TP Gauge Height
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the Height element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TP Gauge Color 1
 * ---------------------------------------------------------------------------
 * ➔ It's a number from 0-31.
 * This changes color 1 for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TP Gauge Color 2
 * ---------------------------------------------------------------------------
 * ➔ It's a number from 0-31.
 * This changes color 2 for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TP Gauge BG Color
 * ---------------------------------------------------------------------------
 * ➔ It's a number from 0-31.
 * This changes the BG Color for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TP Gauge Label Text
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will NOT be evaluated as JavaScript code.
 * Sets the label text element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TP Gauge Label X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the label X element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TP Gauge Label Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the label Y element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TPB Gauge
 * ---------------------------------------------------------------------------
 * ➔ It's a boolean (true or false).
 * This will enable or disable the TPB Gauge in the window.
 *
 * ---------------------------------------------------------------------------
 * TPB Gauge X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the X element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TPB Gauge Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the Y element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TPB Gauge Width
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Set the Width element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TPB Gauge Height
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the Height element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TPB Gauge Color 1
 * ---------------------------------------------------------------------------
 * ➔ It's a number from 0-31.
 * This changes color 1 for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TPB Gauge Color 2
 * ---------------------------------------------------------------------------
 * ➔ It's a number from 0-31.
 * This changes color 2 for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TPB Gauge BG Color
 * ---------------------------------------------------------------------------
 * ➔ It's a number from 0-31.
 * This changes the BG Color for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TPB Gauge Label Text
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will NOT be evaluated as JavaScript code.
 * Sets the label text element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TPB Gauge Label X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the label X element for the gauge.
 *
 * ---------------------------------------------------------------------------
 * TPB Gauge Label Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the label Y element for the gauge.
 *
 * ===========================================================================
 * Actor States
 * ===========================================================================
 *
 * ---------------------------------------------------------------------------
 * States X
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the state icon's X element for the window.
 *
 * ---------------------------------------------------------------------------
 * States Y
 * ---------------------------------------------------------------------------
 * ➔ It's a string that will be evaluated as JavaScript code.
 * Sets the state icon's Y element for the window.
 *
 * ===========================================================================
 * Enemy Status Window
 * ===========================================================================
 *
 * ---------------------------------------------------------------------------
 * Background Type
 * ---------------------------------------------------------------------------
 * ➔ It's a number between 0-2.
 * You have 3 options here.
 *
 * 0 : Window
 * 1 : Dim
 * 2 : Transparent 
 *
 * ---------------------------------------------------------------------------
 * JS: X,Y,Width,Height - Window Rectangle
 * ---------------------------------------------------------------------------
 * ➔ It's a window rectangle. JavaScript is allowed.
 * Code used to determine the dimensions for this window.
 *
 * ---------------------------------------------------------------------------
 * Font Size
 * ---------------------------------------------------------------------------
 * ➔ It's a number.
 * This changes the font size for the window.
 *
 * ===========================================================================
 * Actor Command Window
 * ===========================================================================
 *
 * ---------------------------------------------------------------------------
 * Background Type
 * ---------------------------------------------------------------------------
 * ➔ It's a number between 0-2.
 * You have 3 options here.
 *
 * 0 : Window
 * 1 : Dim
 * 2 : Transparent 
 *
 * ---------------------------------------------------------------------------
 * JS: X,Y,Width,Height - Window Rectangle
 * ---------------------------------------------------------------------------
 * ➔ It's a window rectangle. JavaScript is allowed.
 * Code used to determine the dimensions for this window.
 *
 * ---------------------------------------------------------------------------
 * Hide Actor Commands
 * ---------------------------------------------------------------------------
 * ➔ It's a boolean (true or false).
 * Hides the actor command window after selecting an attack, skill or item
 * to use.
 *
 * ---------------------------------------------------------------------------
 * Font Size
 * ---------------------------------------------------------------------------
 * ➔ It's a number.
 * This changes the font size for the window.
 *
 * ===========================================================================
 * Skill Window
 * ===========================================================================
 *
 * ---------------------------------------------------------------------------
 * Background Type
 * ---------------------------------------------------------------------------
 * ➔ It's a number between 0-2.
 * You have 3 options here.
 *
 * 0 : Window
 * 1 : Dim
 * 2 : Transparent 
 *
 * ---------------------------------------------------------------------------
 * JS: X,Y,Width,Height - Window Rectangle
 * ---------------------------------------------------------------------------
 * ➔ It's a window rectangle. JavaScript is allowed.
 * Code used to determine the dimensions for this window.
 *
 * ---------------------------------------------------------------------------
 * Font Size
 * ---------------------------------------------------------------------------
 * ➔ It's a number.
 * This changes the font size for the window.
 *
 * ---------------------------------------------------------------------------
 * Columns
 * ---------------------------------------------------------------------------
 * ➔ It's a number.
 * Sets the amount of colums displayed in the window.
 *
 * ===========================================================================
 * Item Window
 * ===========================================================================
 *
 * ---------------------------------------------------------------------------
 * Background Type
 * ---------------------------------------------------------------------------
 * ➔ It's a number between 0-2.
 * You have 3 options here.
 *
 * 0 : Window
 * 1 : Dim
 * 2 : Transparent 
 *
 * ---------------------------------------------------------------------------
 * JS: X,Y,Width,Height - Window Rectangle
 * ---------------------------------------------------------------------------
 * ➔ It's a window rectangle. JavaScript is allowed.
 * Code used to determine the dimensions for this window.
 *
 * ---------------------------------------------------------------------------
 * Font Size
 * ---------------------------------------------------------------------------
 * ➔ It's a number.
 * This changes the font size for the window.
 *
 * ---------------------------------------------------------------------------
 * Columns
 * ---------------------------------------------------------------------------
 * ➔ It's a number.
 * Sets the amount of colums displayed in the window.
 *
 */

  /*~struct~battleLayoutSettings:
    @param partyCommandWindow
    @text Party Command Window

    @param partyCommandBgType
    @text Background Type
    @parent partyCommandWindow
    @type select
    @option Window
    @value 0
    @option Dim
    @value 1
    @option Transparent
    @value 2
    @desc Select the background type you want to use for this window.
    @default 0

    @param partyCommandRectangle:function
    @parent partyCommandWindow
    @text JS: X,Y,Width,Height
    @type note
    @desc This function must return a Rectangle for the Party 
    Command Window.
    @default "const Width = 192;\nconst Height = this.windowAreaHeight();\nconst X = Width;\nconst Y = Graphics.boxHeight - Height;\nreturn new Rectangle(X, Y, Width, Height);"

    @param partyCommandWindowFontSize
    @parent partyCommandWindow
    @text Font Size
    @type number
    @desc Set the font size for this window.
    @default 18

    @param partyStatusWindow
    @text Party Status Window

    @param partyStatusBgType
    @text Background Type
    @parent partyStatusWindow
    @type select
    @option Window
    @value 0
    @option Dim
    @value 1
    @option Transparent
    @value 2
    @desc Select the background type you want to use for this window.
    @default 0

    @param partyStatusRectangle:function
    @parent partyStatusWindow
    @text JS: X,Y,Width,Height
    @type note
    @desc This function must return a Rectangle for the Party 
    Status Window.
    @default "const Width = (Graphics.boxWidth / 3) * 2;\nconst Height = this.windowAreaHeight();\nconst X = Graphics.boxWidth - Width;\nconst Y = Graphics.boxHeight - Height;\nreturn new Rectangle(X, Y, Width, Height);"

    @param partyStatusWindowFontSize
    @parent partyStatusWindow
    @text Font Size
    @type number
    @desc Set the font size for this window.
    Default: 18
    @default 18

    @param ffStyleStats
    @parent partyStatusWindow
    @text FF Style Stats
    @desc Settings for the FF Style Stats.

    @param hpStats
    @parent ffStyleStats
    @text HP Stats
    @type boolean
    @on Enable
    @off Disable
    @desc Show FF Style HP Stats?
    Default: true
    @default true

    @param hpLabelText
    @parent hpStats
    @text HP Label Text
    @default \c[16]HP
    @desc Set the text for the HP Label.
    Default: \c[1]HP

    @param hpLabelX
    @parent hpStats
    @text HP Label X
    @default this.getLongestActorName() + rect.x + 6;
    @desc Set the X element for this label.
    JavaScript Allowed.

    @param hpLabelY
    @parent hpStats
    @text HP Label Y
    @default rect.y + 7;
    @desc Set the Y element for this label.
    JavaScript Allowed.

    @param hpValuesFormat
    @parent hpStats
    @text HP Values Format
    @default '\c[0]' + actor._hp + '/' + actor.mhp;
    @desc Set the format for the HP Values.
    Default: '\c[0]' + actor._hp + '/' + actor.mhp;

    @param hpValuesX
    @parent hpStats
    @text HP Values X
    @default this.getLongestActorName() + rect.x + 6 + hpLabelSize;
    @desc Set the X element for the HP Values.
    JavaScript Allowed.

    @param hpValuesY
    @parent hpStats
    @text HP Values Y
    @default rect.y + 7;
    @desc Set the Y element for the HP Values.
    JavaScript Allowed.

    @param mpStats
    @parent ffStyleStats
    @text MP Stats
    @type boolean
    @on Enable
    @off Disable
    @desc Show FF Style MP Stats?
    Default: true
    @default true

    @param mpLabelText
    @parent mpStats
    @text MP Label Text
    @default \c[16]MP
    @desc Set the text for the MP Label.
    Default: \c[1]MP

    @param mpLabelX
    @parent mpStats
    @text MP Label X
    @default this.getLongestActorName() + rect.x + 12 + hpLabelSize + hpValuesTextSize;
    @desc Set the X element.
    JavaScript Allowed.

    @param mpLabelY
    @parent mpStats
    @text MP Label Y
    @default rect.y + 7;
    @desc Set the Y element for this label.
    JavaScript Allowed.

    @param mpValuesFormat
    @parent mpStats
    @text MP Values Format
    @default '\c[0]' + actor._mp + '/' + actor.mmp;
    @desc Set the format for the MP Values.
    Default: '\c[0]' + actor._mp + '/' + actor.mmp;

    @param mpValuesX
    @parent mpStats
    @text MP Values X
    @default this.getLongestActorName() + rect.x + 12 + hpLabelSize + hpValuesTextSize + mpLabelSize;
    @desc Set the X element for the MP Values.
    JavaScript Allowed.

    @param mpValuesY
    @parent mpStats
    @text MP Values Y
    @default rect.y + 7;
    @desc Set the Y element for the MP Values.
    JavaScript Allowed.

    @param tpStats
    @parent ffStyleStats
    @text TP Stats
    @type boolean
    @on Enable
    @off Disable
    @desc Show FF Style TP Stats?
    Default: true
    @default true

    @param tpLabelText
    @parent tpStats
    @text TP Label Text
    @default \c[16]TP
    @desc Set the text for the TP Label.
    Default: \c[1]TP

    @param tpLabelX
    @parent tpStats
    @text TP Label X
    @default this.getLongestActorName() + rect.x + 18 + hpLabelSize + hpValuesTextSize + mpLabelSize + mpValuesTextSize;
    @desc Set the X element for this label.
    JavaScript Allowed.

    @param tpLabelY
    @parent tpStats
    @text TP Label Y
    @default rect.y + 7;
    @desc Set the Y element for this label.
    JavaScript Allowed.

    @param tpValuesFormat
    @parent tpStats
    @text TP Values Format
    @default '\c[0]' + actor._tp + '/' + actor.maxTp();
    @desc Set the format for the TP Values.
    Default: '\c[0]' + actor._tp + '/' + actor.maxTp();

    @param tpValuesX
    @parent tpStats
    @text TP Values X
    @default this.getLongestActorName() + rect.x + 18 + hpLabelSize + hpValuesTextSize + mpLabelSize + mpValuesTextSize + tpLabelSize;
    @desc Set the X element for the TP Values.
    JavaScript Allowed.

    @param tpValuesY
    @parent tpStats
    @text TP Values Y
    @default rect.y + 7;
    @desc Set the Y element for the TP Values.
    JavaScript Allowed.

    @param actorSpriteGauges
    @parent partyStatusWindow
    @text Actor Sprite Gauges
    @desc Settings for Actor Sprite Gauges.

    @param hpGauge
    @text HP Gauge
    @parent actorSpriteGauges
    @type boolean
    @on Enable
    @off Disable
    @desc Show the HP Gauge?
    Default: false
    @default false

    @param hpGaugeX
    @parent hpGauge
    @text HP Gauge X
    @default rect.x + 120;
    @desc Set the X element for the HP Gauge.
    JavaScript Allowed.

    @param hpGaugeY
    @parent hpGauge
    @text HP Gauge Y
    @default rect.y + 4;
    @desc Set the Y element for the HP Gauge.
    JavaScript Allowed.

    @param hpGaugeWidth
    @parent hpGauge
    @text HP Gauge Width
    @default 82
    @desc Set the Width element for the HP Gauge.
    JavaScript Allowed.

    @param hpGaugeHeight
    @parent hpGauge
    @text HP Gauge Height
    @default 12
    @desc Set the Height element for the HP Gauge.
    JavaScript Allowed.

    @param hpGaugeColor1
    @parent hpGauge
    @text HP Gauge Color 1
    @type number
    @max 31
    @default 20
    @desc Set Color 1 for the HP Gauge.
    It's a number from 0-31.

    @param hpGaugeColor2
    @parent hpGauge
    @text HP Gauge Color 2
    @type number
    @max 31
    @default 21
    @desc Set Color 2 for the HP Gauge.
    It's a number from 0-31.

    @param hpGaugeBGColor
    @parent hpGauge
    @text HP Gauge BG Color
    @type number
    @max 31
    @default 19
    @desc Set the BG Color for the HP Gauge.
    It's a number from 0-31.

    @param hpGaugeLabelText
    @parent hpGauge
    @text HP Gauge Label Text
    @default HP
    @desc Set the Label Text for the HP Gauge.
    It's a string.

    @param hpGaugeLabelX
    @parent hpGauge
    @text HP Gauge Label X
    @default this.labelOutlineWidth() / 2;
    @desc Set the Label X Offset element for the HP Gauge.
    JavaScript Allowed.

    @param hpGaugeLabelY
    @parent hpGauge
    @text HP Gauge Label Y
    @default 5
    @desc Set the Label Y Offset element for the HP Gauge.
    JavaScript Allowed.

    @param mpGauge
    @text MP Gauge
    @parent actorSpriteGauges
    @type boolean
    @on Enable
    @off Disable
    @desc Show the MP Gauge?
    Default: false
    @default false

    @param mpGaugeX
    @parent mpGauge
    @text MP Gauge X
    @default rect.x + 206;
    @desc Set the X element for the MP Gauge.
    JavaScript Allowed.

    @param mpGaugeY
    @parent mpGauge
    @text MP Gauge Y
    @default rect.y + 4;
    @desc Set the Y element for the MP Gauge.
    JavaScript Allowed.

    @param mpGaugeWidth
    @parent mpGauge
    @text MP Gauge Width
    @default 82
    @desc Set the Width element for the MP Gauge.
    JavaScript Allowed.

    @param mpGaugeHeight
    @parent mpGauge
    @text MP Gauge Height
    @default 12
    @desc Set the Height element for the MP Gauge.
    JavaScript Allowed.

    @param mpGaugeColor1
    @parent mpGauge
    @text MP Gauge Color 1
    @type number
    @max 31
    @default 22
    @desc Set Color 1 for the MP Gauge.
    It's a number from 0-31.

    @param mpGaugeColor2
    @parent mpGauge
    @text MP Gauge Color 2
    @type number
    @max 31
    @default 23
    @desc Set Color 2 for the MP Gauge.
    It's a number from 0-31.

    @param mpGaugeBGColor
    @parent mpGauge
    @text MP Gauge BG Color
    @type number
    @max 31
    @default 19
    @desc Set the BG Color for the MP Gauge.
    It's a number from 0-31.

    @param mpGaugeLabelText
    @parent mpGauge
    @text MP Gauge Label Text
    @default MP
    @desc Set the Label Text for the MP Gauge.
    It's a string.

    @param mpGaugeLabelX
    @parent mpGauge
    @text MP Gauge Label X
    @default this.labelOutlineWidth() / 2;
    @desc Set the Label X Offset element for the MP Gauge.
    JavaScript Allowed.

    @param mpGaugeLabelY
    @parent mpGauge
    @text MP Gauge Label Y
    @default 5
    @desc Set the Label Y Offset element for the MP Gauge.
    JavaScript Allowed.

    @param tpGauge
    @text TP Gauge
    @parent actorSpriteGauges
    @type boolean
    @on Enable
    @off Disable
    @desc Show the TP Gauge?
    Default: false
    @default false

    @param tpGaugeX
    @parent tpGauge
    @text TP Gauge X
    @default rect.x + 292;
    @desc Set the X element for the TP Gauge.
    JavaScript Allowed.

    @param tpGaugeY
    @parent tpGauge
    @text TP Gauge Y
    @default rect.y + 4;
    @desc Set the Y element for the TP Gauge.
    JavaScript Allowed.

    @param tpGaugeWidth
    @parent tpGauge
    @text TP Gauge Width
    @default 82
    @desc Set the Width element for the TP Gauge.
    JavaScript Allowed.

    @param tpGaugeHeight
    @parent tpGauge
    @text TP Gauge Height
    @default 12
    @desc Set the Height element for the TP Gauge.
    JavaScript Allowed.

    @param tpGaugeColor1
    @parent tpGauge
    @text TP Gauge Color 1
    @type number
    @max 31
    @default 28
    @desc Set Color 1 for the TP Gauge.
    It's a number from 0-31.

    @param tpGaugeColor2
    @parent tpGauge
    @text TP Gauge Color 2
    @type number
    @max 31
    @default 29
    @desc Set Color 2 for the TP Gauge.
    It's a number from 0-31.

    @param tpGaugeBGColor
    @parent tpGauge
    @text TP Gauge BG Color
    @type number
    @max 31
    @default 19
    @desc Set the BG Color for the TP Gauge.
    It's a number from 0-31.

    @param tpGaugeLabelText
    @parent tpGauge
    @text TP Gauge Label Text
    @default TP
    @desc Set the Label Text for the TP Gauge.
    It's a string.

    @param tpGaugeLabelX
    @parent tpGauge
    @text TP Gauge Label X
    @default this.labelOutlineWidth() / 2;
    @desc Set the Label X Offset element for the TP Gauge.
    JavaScript Allowed.

    @param tpGaugeLabelY
    @parent tpGauge
    @text TP Gauge Label Y
    @default 5
    @desc Set the Label Y Offset element for the TP Gauge.
    JavaScript Allowed.

    @param tpbGauge
    @text TPB Gauge
    @parent actorSpriteGauges
    @type boolean
    @on Enable
    @off Disable
    @desc Show the TPB Gauge?
    Default: false
    @default false

    @param tpbGaugeX
    @parent tpbGauge
    @text TPB Gauge X
    @default rect.x + 392;
    @desc Set the X element for the TPB Gauge.
    JavaScript Allowed.

    @param tpbGaugeY
    @parent tpbGauge
    @text TPB Gauge Y
    @default rect.y + 4;
    @desc Set the Y element for the TPB Gauge.
    JavaScript Allowed.

    @param tpbGaugeWidth
    @parent tpbGauge
    @text TPB Gauge Width
    @default 82 - this.bitmap.measureTextWidth('HP');
    @desc Set the Width element for the TPB Gauge.
    JavaScript Allowed.

    @param tpbGaugeHeight
    @parent tpbGauge
    @text TPB Gauge Height
    @default 12
    @desc Set the Height element for the TPB Gauge.
    JavaScript Allowed.

    @param tpbGaugeColor1
    @parent tpbGauge
    @text TPB Gauge Color 1
    @type number
    @max 31
    @default 26
    @desc Set Color 1 for the TPB Gauge.
    It's a number from 0-31.

    @param tpbGaugeColor2
    @parent tpbGauge
    @text TPB Gauge Color 2
    @type number
    @max 31
    @default 27
    @desc Set Color 2 for the TPB Gauge.
    It's a number from 0-31.

    @param tpbGaugeBGColor
    @parent tpbGauge
    @text TPB Gauge BG Color
    @type number
    @max 31
    @default 19
    @desc Set the BG Color for the TPB Gauge.
    It's a number from 0-31.

    @param states
    @parent partyStatusWindow
    @text Actor States
    @text States

    @param statesX
    @parent states
    @text States X
    @default rect.x + rect.width - ImageManager.iconWidth / 2 + 4;
    @desc Set the X value for the actor states. Default JS:
    rect.x + rect.width - ImageManager.iconWidth / 2 + 4;

    @param statesY
    @parent states
    @text States Y
    @default rect.y + ImageManager.iconHeight / 2 + 4;
    @desc Set the Y value for the actor states. Default JS:
    rect.y + ImageManager.iconHeight / 2 + 4;

    @param enemyStatusWindow
    @text Enemy Status Window

    @param enemyStatusBgType
    @text Background Type
    @parent enemyStatusWindow
    @type select
    @option Window
    @value 0
    @option Dim
    @value 1
    @option Transparent
    @value 2
    @desc Select the background type you want to use for this window.
    @default 0

    @param enemyStatusRectangle:function
    @parent enemyStatusWindow
    @text JS: X,Y,Width,Height
    @type note
    @desc This function must return a Rectangle for the Enemy 
    Status Window.
    @default "const X = 0;\nconst Width = Graphics.boxWidth / 3;\nconst Height = this.windowAreaHeight();\nconst Y = Graphics.boxHeight - Height;\nreturn new Rectangle(X, Y, Width, Height);"

    @param enemyStatusWindowFontSize
    @parent enemyStatusWindow
    @text Font Size
    @type number
    @desc Set the font size for this window.
    @default 18

    @param actorCommandWindow
    @text Actor Command Window

    @param actorCommandBgType
    @text Background Type
    @parent actorCommandWindow
    @type select
    @option Window
    @value 0
    @option Dim
    @value 1
    @option Transparent
    @value 2
    @desc Select the background type you want to use for this window.
    @default 0

    @param actorCommandRectangle:function
    @parent actorCommandWindow
    @text JS: X,Y,Width,Height
    @type note
    @desc This function must return a Rectangle for the Actor 
    Command Window.
    @default "const Width = 192;\nconst Height = this.windowAreaHeight();\nconst X = Width;\nconst Y = Graphics.boxHeight - Height;\nreturn new Rectangle(X, Y, Width, Height);"

    @param Hide Actor Command Window For Atk Select
    @text Hide Actor Commands
    @parent actorCommandWindow
    @type boolean
    @on Enable
    @off Disable
    @desc Hides the Actor Command Window after selecting 'Attack' command.
    @default true

    @param actorCommandWindowFontSize
    @parent actorCommandWindow
    @text Font Size
    @type number
    @desc Set the font size for this window.
    @default 18

    @param skillWindow
    @text Skill Window

    @param skillWindowBgType
    @text Background Type
    @parent skillWindow
    @type select
    @option Window
    @value 0
    @option Dim
    @value 1
    @option Transparent
    @value 2
    @desc Select the background type you want to use for this window.
    @default 0

    @param skillWindowRectangle:function
    @parent skillWindow
    @text JS: X,Y,Width,Height
    @type note
    @desc This function must return a Rectangle for the Skill 
    Window.
    @default "const Width = Graphics.boxWidth;\nconst Height = this.windowAreaHeight();\nconst X = 0;\nconst Y = Graphics.boxHeight - Height;\nreturn new Rectangle(X, Y, Width, Height);"

    @param skillWindowFontSize
    @parent skillWindow
    @text Font Size
    @type number
    @desc Set the font size for this window.
    @default 18

    @param skillWindowColumns
    @parent skillWindow
    @text Columns
    @type number
    @desc Set the columns for this window.
    @default 2

    @param itemWindow
    @text Item Window

    @param itemWindowBgType
    @text Background Type
    @parent itemWindow
    @type select
    @option Window
    @value 0
    @option Dim
    @value 1
    @option Transparent
    @value 2
    @desc Select the background type you want to use for this window.
    @default 0

    @param itemWindowRectangle:function
    @parent itemWindow
    @text JS: X,Y,Width,Height
    @type note
    @desc This function must return a Rectangle for the Item 
    Window.
    @default "return this.skillWindowRect();"

    @param itemWindowFontSize
    @parent itemWindow
    @text Font Size
    @type number
    @desc Set the font size for this window.
    @default 18

    @param itemWindowColumns
    @parent itemWindow
    @text Columns
    @type number
    @desc Set the columns for this window.
    @default 2
 */

//-----------------------------------------------------------------------------
// Parameters
//-----------------------------------------------------------------------------

 Dungeonmind.FFSB.parameters = PluginManager.parameters('DM_FFStyleBattle');

//-----------------------------------------------------------------------------
// Game_FFStyleBattle
//
// The game object class for handling FF Battle Stuff.

function Game_FFStyleBattle() {
    this.initialize(...arguments);
}

Game_FFStyleBattle.prototype.initialize = function() {
  this.initPartyCommandCoordinates();
  this.initPartyCommandBackgroundType();
  this.initPartyCommandWindowFontSize();

  this.initPartyStatusCoordinates();
  this.initPartyStatusBackgroundType();
  this.initPartyStatusWindowFontSize();
  this.initPartyStatusWindowHPStats();
  this.initPartyStatusWindowMPStats();
  this.initPartyStatusWindowTPStats();

  this.initPartyStatusWindowHPGauge();
  this.initPartyStatusWindowMPGauge();
  this.initPartyStatusWindowTPGauge();
  this.initPartyStatusWindowTPBGauge();

  this.initPartyStatusStatesX();
  this.initPartyStatusStatesY();

  this.initEnemyStatusCoordinates();
  this.initEnemyStatusBackgroundType();
  this.initEnemyStatusWindowFontSize();

  this.initActorCommandWindowCoordinates();
  this.initActorCommandWindowBackgroundType();
  this.initActorCommandWindowFontSize();
  this.initActorCommandWindowHideForAtk();

  this.initSkillWindowCoordinates();
  this.initSkillWindowBackgroundType();
  this.initSkillWindowFontSize();
  this.initSkillWindowColumns();

  this.initItemWindowCoordinates();
  this.initItemWindowBackgroundType();
  this.initItemWindowFontSize();
  this.initItemWindowColumns();
};

//* Party Command Window Plugin Parameters Initialization

Game_FFStyleBattle.prototype.initPartyCommandCoordinates = function() {
    this._partyCommandWindowCoordinates = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._partyCommandWindowCoordinates = this._partyCommandWindowCoordinates[3].replaceAll('\\n','');
    this._partyCommandWindowCoordinates = this._partyCommandWindowCoordinates.replaceAll('\\','');
    this._partyCommandWindowCoordinates = this._partyCommandWindowCoordinates.replaceAll(/["']/g,'');
    this._partyCommandWindowCoordinates = this._partyCommandWindowCoordinates.replaceAll(',partyCommandWindowFontSize','');
};

Game_FFStyleBattle.prototype.initPartyCommandBackgroundType = function() {
    this._partyCommandWindowBackgroundType = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._partyCommandWindowBackgroundType = this._partyCommandWindowBackgroundType[2].split('","');
    this._partyCommandWindowBackgroundType = Number(this._partyCommandWindowBackgroundType[0].replaceAll(/["']/g,''));
};

Game_FFStyleBattle.prototype.initPartyCommandWindowFontSize = function() {
    this._partyCommandWindowFontSize = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._partyCommandWindowFontSize = this._partyCommandWindowFontSize[4].split('","');
    this._partyCommandWindowFontSize = Number(this._partyCommandWindowFontSize[0].replaceAll(/["']/g,''));
};

//* Party Status Window Plugin Parameters Initialization

Game_FFStyleBattle.prototype.initPartyStatusCoordinates = function() {
    this._partyStatusWindowCoordinates = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._partyStatusWindowCoordinates = this._partyStatusWindowCoordinates[7].replaceAll('\\n','');
    this._partyStatusWindowCoordinates = this._partyStatusWindowCoordinates.replaceAll('\\','');
    this._partyStatusWindowCoordinates = this._partyStatusWindowCoordinates.replaceAll(/["']/g,'');
    this._partyStatusWindowCoordinates = this._partyStatusWindowCoordinates.replaceAll(',partyStatusWindowFontSize','');
};

Game_FFStyleBattle.prototype.initPartyStatusBackgroundType = function() {
    this._partyStatusWindowBackgroundType = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._partyStatusWindowBackgroundType = this._partyStatusWindowBackgroundType[6].split('","'); //Bug fix 5 -> 6
    this._partyStatusWindowBackgroundType = Number(this._partyStatusWindowBackgroundType[0].replaceAll(/["']/g,''));
};

Game_FFStyleBattle.prototype.initPartyStatusWindowFontSize = function() {
    this._partyStatusWindowFontSize = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._partyStatusWindowFontSize = this._partyStatusWindowFontSize[8].split('","');
    this._partyStatusWindowFontSize = Number(this._partyStatusWindowFontSize[0].replaceAll(/["']/g,''));
};

Game_FFStyleBattle.prototype.initPartyStatusWindowHPStats = function() {
  //*~ HP Stats
  this._partyStatusWindowHPStatsBoolean = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPStatsBoolean = this._partyStatusWindowHPStatsBoolean[10].replaceAll('\\','');
  this._partyStatusWindowHPStatsBoolean = this._partyStatusWindowHPStatsBoolean.split('","');
  this._partyStatusWindowHPStatsBoolean = eval(this._partyStatusWindowHPStatsBoolean[0].replaceAll(/["']/g,''));
  //*~
  this._partyStatusWindowHPStatsLabelText = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPStatsLabelText = this._partyStatusWindowHPStatsLabelText[11].split('","');
  this._partyStatusWindowHPStatsLabelText = this._partyStatusWindowHPStatsLabelText[0].replaceAll(/["']/g,'');
  this._partyStatusWindowHPStatsLabelText = this._partyStatusWindowHPStatsLabelText.replace("\\\\","\\");
  //*~
  this._partyStatusWindowHPStatsLabelX = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPStatsLabelX = this._partyStatusWindowHPStatsLabelX[12].split('","');
  this._partyStatusWindowHPStatsLabelX = this._partyStatusWindowHPStatsLabelX[0].replaceAll(/["']/g,'');
  //*~
  this._partyStatusWindowHPStatsLabelY = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPStatsLabelY = this._partyStatusWindowHPStatsLabelY[13].split('","');
  this._partyStatusWindowHPStatsLabelY = this._partyStatusWindowHPStatsLabelY[0].replaceAll(/["']/g,'');
  //*~
  this._partyStatusWindowHPValuesFormat = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPValuesFormat = this._partyStatusWindowHPValuesFormat[14].split('","');
  this._partyStatusWindowHPValuesFormat = this._partyStatusWindowHPValuesFormat[0];
  //*~
  this._partyStatusWindowHPValuesX = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPValuesX = this._partyStatusWindowHPValuesX[15].split('","');
  this._partyStatusWindowHPValuesX = this._partyStatusWindowHPValuesX[0].replaceAll(/["']/g,'');
  //*~
  this._partyStatusWindowHPValuesY = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPValuesY = this._partyStatusWindowHPValuesY[16].split('","');
  this._partyStatusWindowHPValuesY = this._partyStatusWindowHPValuesY[0].replaceAll(/["']/g,'');
};

Game_FFStyleBattle.prototype.initPartyStatusWindowMPStats = function() {
  //*~ MP Stats
  this._partyStatusWindowMPStatsBoolean = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPStatsBoolean = this._partyStatusWindowMPStatsBoolean[17].replaceAll('\\','');
  this._partyStatusWindowMPStatsBoolean = this._partyStatusWindowMPStatsBoolean.split('","');
  this._partyStatusWindowMPStatsBoolean = eval(this._partyStatusWindowMPStatsBoolean[0].replaceAll(/["']/g,''));
  //*~
  this._partyStatusWindowMPStatsLabelText = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPStatsLabelText = this._partyStatusWindowMPStatsLabelText[18].split('","');
  this._partyStatusWindowMPStatsLabelText = this._partyStatusWindowMPStatsLabelText[0].replaceAll(/["']/g,'');
  this._partyStatusWindowMPStatsLabelText = this._partyStatusWindowMPStatsLabelText.replace("\\\\","\\");
  //*~
  this._partyStatusWindowMPStatsLabelX = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPStatsLabelX = this._partyStatusWindowMPStatsLabelX[19].split('","');
  this._partyStatusWindowMPStatsLabelX = this._partyStatusWindowMPStatsLabelX[0].replaceAll(/["']/g,'');
  //*~
  this._partyStatusWindowMPStatsLabelY = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPStatsLabelY = this._partyStatusWindowMPStatsLabelY[20].split('","');
  this._partyStatusWindowMPStatsLabelY = this._partyStatusWindowMPStatsLabelY[0].replaceAll(/["']/g,'');
  //*~
  this._partyStatusWindowMPValuesFormat = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPValuesFormat = this._partyStatusWindowMPValuesFormat[21].split('","');
  this._partyStatusWindowMPValuesFormat = this._partyStatusWindowMPValuesFormat[0];
  //*~
  this._partyStatusWindowMPValuesX = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPValuesX = this._partyStatusWindowMPValuesX[22].split('","');
  this._partyStatusWindowMPValuesX = this._partyStatusWindowMPValuesX[0].replaceAll(/["']/g,'');
  //*~
  this._partyStatusWindowMPValuesY = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPValuesY = this._partyStatusWindowMPValuesY[23].split('","');
  this._partyStatusWindowMPValuesY = this._partyStatusWindowMPValuesY[0].replaceAll(/["']/g,'');
};

Game_FFStyleBattle.prototype.initPartyStatusWindowTPStats = function() {
  //*~ TP Stats
  this._partyStatusWindowTPStatsBoolean = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPStatsBoolean = this._partyStatusWindowTPStatsBoolean[24].replaceAll('\\','');
  this._partyStatusWindowTPStatsBoolean = this._partyStatusWindowTPStatsBoolean.split('","');
  this._partyStatusWindowTPStatsBoolean = eval(this._partyStatusWindowTPStatsBoolean[0].replaceAll(/["']/g,''));
  //*~
  this._partyStatusWindowTPStatsLabelText = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPStatsLabelText = this._partyStatusWindowTPStatsLabelText[25].split('","');
  this._partyStatusWindowTPStatsLabelText = this._partyStatusWindowTPStatsLabelText[0].replaceAll(/["']/g,'');
  this._partyStatusWindowTPStatsLabelText = this._partyStatusWindowTPStatsLabelText.replace("\\\\","\\");
  //*~
  this._partyStatusWindowTPStatsLabelX = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPStatsLabelX = this._partyStatusWindowTPStatsLabelX[26].split('","');
  this._partyStatusWindowTPStatsLabelX = this._partyStatusWindowTPStatsLabelX[0].replaceAll(/["']/g,'');
  //*~
  this._partyStatusWindowTPStatsLabelY = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPStatsLabelY = this._partyStatusWindowTPStatsLabelY[27].split('","');
  this._partyStatusWindowTPStatsLabelY = this._partyStatusWindowTPStatsLabelY[0].replaceAll(/["']/g,'');
  //*~
  this._partyStatusWindowTPValuesFormat = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPValuesFormat = this._partyStatusWindowTPValuesFormat[28].split('","');
  this._partyStatusWindowTPValuesFormat = this._partyStatusWindowTPValuesFormat[0];
  //*~
  this._partyStatusWindowTPValuesX = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPValuesX = this._partyStatusWindowTPValuesX[29].split('","');
  this._partyStatusWindowTPValuesX = this._partyStatusWindowTPValuesX[0].replaceAll(/["']/g,'');
  //*~
  this._partyStatusWindowTPValuesY = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPValuesY = this._partyStatusWindowTPValuesY[30].split('","');
  this._partyStatusWindowTPValuesY = this._partyStatusWindowTPValuesY[0].replaceAll(/["']/g,'');
};

Game_FFStyleBattle.prototype.initPartyStatusWindowHPGauge = function() {
  //*~ HP Gauge
  this._partyStatusWindowHPGaugeBoolean = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPGaugeBoolean = this._partyStatusWindowHPGaugeBoolean[32].split('","');
  this._partyStatusWindowHPGaugeBoolean = eval(this._partyStatusWindowHPGaugeBoolean[0]);
  //*~
  this._partyStatusWindowHPGaugeX = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPGaugeX = this._partyStatusWindowHPGaugeX[33].split('","');
  this._partyStatusWindowHPGaugeX = this._partyStatusWindowHPGaugeX[0];
  //*~
  this._partyStatusWindowHPGaugeY = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPGaugeY = this._partyStatusWindowHPGaugeY[34].split('","');
  this._partyStatusWindowHPGaugeY = this._partyStatusWindowHPGaugeY[0];
  //*~
  this._partyStatusWindowHPGaugeWidth = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPGaugeWidth = this._partyStatusWindowHPGaugeWidth[35].split('","');
  this._partyStatusWindowHPGaugeWidth = this._partyStatusWindowHPGaugeWidth[0];
  //*~
  this._partyStatusWindowHPGaugeHeight = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPGaugeHeight = this._partyStatusWindowHPGaugeHeight[36].split('","');
  this._partyStatusWindowHPGaugeHeight = this._partyStatusWindowHPGaugeHeight[0];
  //*~
  this._partyStatusWindowHPGaugeColor1 = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPGaugeColor1 = this._partyStatusWindowHPGaugeColor1[37].split('","');
  this._partyStatusWindowHPGaugeColor1 = Number(this._partyStatusWindowHPGaugeColor1[0]);
  //*~
  this._partyStatusWindowHPGaugeColor2 = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPGaugeColor2 = this._partyStatusWindowHPGaugeColor2[38].split('","');
  this._partyStatusWindowHPGaugeColor2 = Number(this._partyStatusWindowHPGaugeColor2[0]);
  //*~
  this._partyStatusWindowHPGaugeBGColor = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPGaugeBGColor = this._partyStatusWindowHPGaugeBGColor[39].split('","');
  this._partyStatusWindowHPGaugeBGColor = Number(this._partyStatusWindowHPGaugeBGColor[0]);
  //*~
  this._partyStatusWindowHPGaugeLabelText = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPGaugeLabelText = this._partyStatusWindowHPGaugeLabelText[40].split('","');
  this._partyStatusWindowHPGaugeLabelText = this._partyStatusWindowHPGaugeLabelText[0];
  //*~
  this._partyStatusWindowHPGaugeLabelX = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPGaugeLabelX = this._partyStatusWindowHPGaugeLabelX[41].split('","');
  this._partyStatusWindowHPGaugeLabelX = this._partyStatusWindowHPGaugeLabelX[0];
  //*~
  this._partyStatusWindowHPGaugeLabelY = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowHPGaugeLabelY = this._partyStatusWindowHPGaugeLabelY[42].split('","');
  this._partyStatusWindowHPGaugeLabelY = this._partyStatusWindowHPGaugeLabelY[0];
};

Game_FFStyleBattle.prototype.initPartyStatusWindowMPGauge = function() {
  //*~ MP Gauge
  this._partyStatusWindowMPGaugeBoolean = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPGaugeBoolean = this._partyStatusWindowMPGaugeBoolean[43].split('","');
  this._partyStatusWindowMPGaugeBoolean = eval(this._partyStatusWindowMPGaugeBoolean[0]);
  //*~
  this._partyStatusWindowMPGaugeX = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPGaugeX = this._partyStatusWindowMPGaugeX[44].split('","');
  this._partyStatusWindowMPGaugeX = this._partyStatusWindowMPGaugeX[0];
  //*~
  this._partyStatusWindowMPGaugeY = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPGaugeY = this._partyStatusWindowMPGaugeY[45].split('","');
  this._partyStatusWindowMPGaugeY = this._partyStatusWindowMPGaugeY[0];
  //*~
  this._partyStatusWindowMPGaugeWidth = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPGaugeWidth = this._partyStatusWindowMPGaugeWidth[46].split('","');
  this._partyStatusWindowMPGaugeWidth = this._partyStatusWindowMPGaugeWidth[0];
  //*~
  this._partyStatusWindowMPGaugeHeight = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPGaugeHeight = this._partyStatusWindowMPGaugeHeight[47].split('","');
  this._partyStatusWindowMPGaugeHeight = this._partyStatusWindowMPGaugeHeight[0];
  //*~
  this._partyStatusWindowMPGaugeColor1 = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPGaugeColor1 = this._partyStatusWindowMPGaugeColor1[48].split('","');
  this._partyStatusWindowMPGaugeColor1 = Number(this._partyStatusWindowMPGaugeColor1[0]);
  //*~
  this._partyStatusWindowMPGaugeColor2 = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPGaugeColor2 = this._partyStatusWindowMPGaugeColor2[49].split('","');
  this._partyStatusWindowMPGaugeColor2 = Number(this._partyStatusWindowMPGaugeColor2[0]);
  //*~
  this._partyStatusWindowMPGaugeBGColor = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPGaugeBGColor = this._partyStatusWindowMPGaugeBGColor[50].split('","');
  this._partyStatusWindowMPGaugeBGColor = Number(this._partyStatusWindowMPGaugeBGColor[0]);
  //*~
  this._partyStatusWindowMPGaugeLabelText = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPGaugeLabelText = this._partyStatusWindowMPGaugeLabelText[51].split('","');
  this._partyStatusWindowMPGaugeLabelText = this._partyStatusWindowMPGaugeLabelText[0];
  //*~
  this._partyStatusWindowMPGaugeLabelX = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPGaugeLabelX = this._partyStatusWindowMPGaugeLabelX[52].split('","');
  this._partyStatusWindowMPGaugeLabelX = this._partyStatusWindowMPGaugeLabelX[0];
  //*~
  this._partyStatusWindowMPGaugeLabelY = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowMPGaugeLabelY = this._partyStatusWindowMPGaugeLabelY[53].split('","');
  this._partyStatusWindowMPGaugeLabelY = this._partyStatusWindowMPGaugeLabelY[0];
};

Game_FFStyleBattle.prototype.initPartyStatusWindowTPGauge = function() {
  //*~ TP Gauge
  this._partyStatusWindowTPGaugeBoolean = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPGaugeBoolean = this._partyStatusWindowTPGaugeBoolean[54].split('","');
  this._partyStatusWindowTPGaugeBoolean = eval(this._partyStatusWindowTPGaugeBoolean[0]);
  //*~
  this._partyStatusWindowTPGaugeX = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPGaugeX = this._partyStatusWindowTPGaugeX[55].split('","');
  this._partyStatusWindowTPGaugeX = this._partyStatusWindowTPGaugeX[0];
  //*~
  this._partyStatusWindowTPGaugeY = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPGaugeY = this._partyStatusWindowTPGaugeY[56].split('","');
  this._partyStatusWindowTPGaugeY = this._partyStatusWindowTPGaugeY[0];
  //*~
  this._partyStatusWindowTPGaugeWidth = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPGaugeWidth = this._partyStatusWindowTPGaugeWidth[57].split('","');
  this._partyStatusWindowTPGaugeWidth = this._partyStatusWindowTPGaugeWidth[0];
  //*~
  this._partyStatusWindowTPGaugeHeight = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPGaugeHeight = this._partyStatusWindowTPGaugeHeight[58].split('","');
  this._partyStatusWindowTPGaugeHeight = this._partyStatusWindowTPGaugeHeight[0];
  //*~
  this._partyStatusWindowTPGaugeColor1 = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPGaugeColor1 = this._partyStatusWindowTPGaugeColor1[59].split('","');
  this._partyStatusWindowTPGaugeColor1 = Number(this._partyStatusWindowTPGaugeColor1[0]);
  //*~
  this._partyStatusWindowTPGaugeColor2 = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPGaugeColor2 = this._partyStatusWindowTPGaugeColor2[60].split('","');
  this._partyStatusWindowTPGaugeColor2 = Number(this._partyStatusWindowTPGaugeColor2[0]);
  //*~
  this._partyStatusWindowTPGaugeBGColor = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPGaugeBGColor = this._partyStatusWindowTPGaugeBGColor[61].split('","');
  this._partyStatusWindowTPGaugeBGColor = Number(this._partyStatusWindowTPGaugeBGColor[0]);
  //*~
  this._partyStatusWindowTPGaugeLabelText = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPGaugeLabelText = this._partyStatusWindowTPGaugeLabelText[62].split('","');
  this._partyStatusWindowTPGaugeLabelText = this._partyStatusWindowTPGaugeLabelText[0];
  //*~
  this._partyStatusWindowTPGaugeLabelX = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPGaugeLabelX = this._partyStatusWindowTPGaugeLabelX[63].split('","');
  this._partyStatusWindowTPGaugeLabelX = this._partyStatusWindowTPGaugeLabelX[0];
  //*~
  this._partyStatusWindowTPGaugeLabelY = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPGaugeLabelY = this._partyStatusWindowTPGaugeLabelY[64].split('","');
  this._partyStatusWindowTPGaugeLabelY = this._partyStatusWindowTPGaugeLabelY[0];
};

Game_FFStyleBattle.prototype.initPartyStatusWindowTPBGauge = function() {
  //*~ TPB Gauge
  this._partyStatusWindowTPBGaugeBoolean = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPBGaugeBoolean = this._partyStatusWindowTPBGaugeBoolean[65].split('","');
  this._partyStatusWindowTPBGaugeBoolean = eval(this._partyStatusWindowTPBGaugeBoolean[0]);
  //*~
  this._partyStatusWindowTPBGaugeX = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPBGaugeX = this._partyStatusWindowTPBGaugeX[66].split('","');
  this._partyStatusWindowTPBGaugeX = this._partyStatusWindowTPBGaugeX[0];
  //*~
  this._partyStatusWindowTPBGaugeY = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPBGaugeY = this._partyStatusWindowTPBGaugeY[67].split('","');
  this._partyStatusWindowTPBGaugeY = this._partyStatusWindowTPBGaugeY[0];
  //*~
  this._partyStatusWindowTPBGaugeWidth = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPBGaugeWidth = this._partyStatusWindowTPBGaugeWidth[68].split('","');
  this._partyStatusWindowTPBGaugeWidth = this._partyStatusWindowTPBGaugeWidth[0];
  //*~
  this._partyStatusWindowTPBGaugeHeight = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPBGaugeHeight = this._partyStatusWindowTPBGaugeHeight[69].split('","');
  this._partyStatusWindowTPBGaugeHeight = this._partyStatusWindowTPBGaugeHeight[0];
  //*~
  this._partyStatusWindowTPBGaugeColor1 = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPBGaugeColor1 = this._partyStatusWindowTPBGaugeColor1[70].split('","');
  this._partyStatusWindowTPBGaugeColor1 = Number(this._partyStatusWindowTPBGaugeColor1[0]);
  //*~
  this._partyStatusWindowTPBGaugeColor2 = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPBGaugeColor2 = this._partyStatusWindowTPBGaugeColor2[71].split('","');
  this._partyStatusWindowTPBGaugeColor2 = Number(this._partyStatusWindowTPBGaugeColor2[0]);
  //*~
  this._partyStatusWindowTPBGaugeBGColor = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusWindowTPBGaugeBGColor = this._partyStatusWindowTPBGaugeBGColor[72].split('","');
  this._partyStatusWindowTPBGaugeBGColor = Number(this._partyStatusWindowTPBGaugeBGColor[0]);
};

Game_FFStyleBattle.prototype.initPartyStatusStatesX = function() {
  this._partyStatusStatesX = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusStatesX = this._partyStatusStatesX[74].split('","');
  this._partyStatusStatesX = this._partyStatusStatesX[0].replaceAll(/["']/g,'');
};

Game_FFStyleBattle.prototype.initPartyStatusStatesY = function() {
  this._partyStatusStatesY = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
  this._partyStatusStatesY = this._partyStatusStatesY[75].split('","');
  this._partyStatusStatesY = this._partyStatusStatesY[0].replaceAll(/["']/g,'');
};

//* Enemy Status Window Plugin Parameters Initialization

Game_FFStyleBattle.prototype.initEnemyStatusCoordinates = function() {
    this._enemyStatusWindowCoordinates = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._enemyStatusWindowCoordinates = this._enemyStatusWindowCoordinates[78].replaceAll('\\n','');
    this._enemyStatusWindowCoordinates = this._enemyStatusWindowCoordinates.replaceAll('\\','');
    this._enemyStatusWindowCoordinates = this._enemyStatusWindowCoordinates.replaceAll(/["']/g,'');
    this._enemyStatusWindowCoordinates = this._enemyStatusWindowCoordinates.replaceAll(',enemyStatusWindowFontSize','');
};

Game_FFStyleBattle.prototype.initEnemyStatusBackgroundType = function() {
    this._enemyStatusWindowBackgroundType = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._enemyStatusWindowBackgroundType  = this._enemyStatusWindowBackgroundType[77].split(',');
    this._enemyStatusWindowBackgroundType  = Number(this._enemyStatusWindowBackgroundType[0].replaceAll(/["']/g,''));
};

Game_FFStyleBattle.prototype.initEnemyStatusWindowFontSize = function() {
    this._enemyStatusWindowFontSize = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._enemyStatusWindowFontSize = this._enemyStatusWindowFontSize[79].split('","');
    this._enemyStatusWindowFontSize = Number(this._enemyStatusWindowFontSize[0].replaceAll(/["']/g,''));
};

//* Actor Command Window Plugin Parameters Initialization

Game_FFStyleBattle.prototype.initActorCommandWindowCoordinates = function() {
    this._actorCommandWindowCoordinates = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._actorCommandWindowCoordinates = this._actorCommandWindowCoordinates[82].replaceAll('\\n','');
    this._actorCommandWindowCoordinates = this._actorCommandWindowCoordinates.replaceAll('\\','');
    this._actorCommandWindowCoordinates = this._actorCommandWindowCoordinates.replaceAll(/["']/g,'');
    this._actorCommandWindowCoordinates = this._actorCommandWindowCoordinates.replaceAll(',Hide Actor Command Window For Atk Select','');
};

Game_FFStyleBattle.prototype.initActorCommandWindowBackgroundType = function() {
    this._actorCommandWindowBackgroundType = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._actorCommandWindowBackgroundType  = this._actorCommandWindowBackgroundType[81].split('","');
    this._actorCommandWindowBackgroundType  = Number(this._actorCommandWindowBackgroundType[0].replaceAll(/["']/g,''));
};

Game_FFStyleBattle.prototype.initActorCommandWindowFontSize = function() {
    this._actorCommandWindowFontSize = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._actorCommandWindowFontSize = this._actorCommandWindowFontSize[84].split('","');
    this._actorCommandWindowFontSize = Number(this._actorCommandWindowFontSize[0].replaceAll(/["']/g,''));
};

Game_FFStyleBattle.prototype.initActorCommandWindowHideForAtk = function() {
    this._actorCommandWindowHideForAtk = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._actorCommandWindowHideForAtk = this._actorCommandWindowHideForAtk[83].replaceAll('actorCommandWindowFontSize','');
    this._actorCommandWindowHideForAtk = eval(this._actorCommandWindowHideForAtk.replace(/['",]+/g, ''));
};

//* Skill Window Plugin Parameters Initialization

Game_FFStyleBattle.prototype.initSkillWindowCoordinates = function() {
    this._skillWindowCoordinates = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._skillWindowCoordinates = this._skillWindowCoordinates[87].replaceAll('\\n','');
    this._skillWindowCoordinates = this._skillWindowCoordinates.replaceAll('\\','');
    this._skillWindowCoordinates = this._skillWindowCoordinates.replaceAll(/["']/g,'');
    this._skillWindowCoordinates = this._skillWindowCoordinates.replaceAll(',skillWindowFontSize','');
};

Game_FFStyleBattle.prototype.initSkillWindowBackgroundType = function() {
    this._skillWindowBackgroundType = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._skillWindowBackgroundType  = this._skillWindowBackgroundType[86].split('","');
    this._skillWindowBackgroundType  = Number(this._skillWindowBackgroundType[0].replaceAll(/["']/g,''));
};

Game_FFStyleBattle.prototype.initSkillWindowFontSize = function() {
    this._skillWindowFontSize = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._skillWindowFontSize = this._skillWindowFontSize[88].split('","');
    this._skillWindowFontSize = Number(this._skillWindowFontSize[0].replaceAll(/["']/g,''));
};

Game_FFStyleBattle.prototype.initSkillWindowColumns = function() {
    this._skillWindowColumns = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._skillWindowColumns = this._skillWindowColumns[89].split('","');
    this._skillWindowColumns = Number(this._skillWindowColumns[0].replaceAll(/["']/g,''));
};

//* Item Window Plugin Parameters Initialization

Game_FFStyleBattle.prototype.initItemWindowCoordinates = function() {
    this._itemWindowCoordinates = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._itemWindowCoordinates = this._itemWindowCoordinates[92].replaceAll('\\n','');
    this._itemWindowCoordinates = this._itemWindowCoordinates.replaceAll('\\','');
    this._itemWindowCoordinates = this._itemWindowCoordinates.replaceAll(/["']/g,'');
    this._itemWindowCoordinates = this._itemWindowCoordinates.replaceAll(',itemWindowFontSize','');
};

Game_FFStyleBattle.prototype.initItemWindowBackgroundType = function() {
    this._itemWindowBackgroundType = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._itemWindowBackgroundType  = this._itemWindowBackgroundType[91].split(',');
    this._itemWindowBackgroundType  = Number(this._itemWindowBackgroundType[0].replaceAll(/["']/g,''));
};

Game_FFStyleBattle.prototype.initItemWindowFontSize = function() {
    this._itemWindowFontSize = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._itemWindowFontSize = this._itemWindowFontSize[93].split(',');
    this._itemWindowFontSize = Number(this._itemWindowFontSize[0].replaceAll(/["']/g,''));
};

Game_FFStyleBattle.prototype.initItemWindowColumns = function() {
    this._itemWindowColumns = Dungeonmind.FFSB.parameters['Battle Layout Settings'].split('":"');
    this._itemWindowColumns = this._itemWindowColumns[94].split('","');
    this._itemWindowColumns = this._itemWindowColumns[0].replaceAll('}','');
    this._itemWindowColumns = Number(this._itemWindowColumns.replaceAll(/["']/g,''));
};

//* Other

Game_FFStyleBattle.prototype.getEnemyWindowFontSize = function() {
    return this._enemyStatusWindowFontSize;
};

Game_FFStyleBattle.prototype.getPartyStatusWindowFontSize = function() {
    return this._partyStatusWindowFontSize;
};

Game_FFStyleBattle.prototype.getActorCommandWindowFontSize = function() {
    return this._actorCommandWindowFontSize;
};

Game_FFStyleBattle.prototype.getPartyCommandWindowFontSize = function() {
    return this._partyCommandWindowFontSize;
};

Game_FFStyleBattle.prototype.getSkillWindowFontSize = function() {
    return this._skillWindowFontSize;
};

Game_FFStyleBattle.prototype.getItemWindowFontSize = function() {
    return this._itemWindowFontSize;
};

//--------------------------------------------------------------------------------------
// DataManager
//--------------------------------------------------------------------------------------

Dungeonmind.FFSB.ALIAS_DataManager_createGameObjects = DataManager.createGameObjects;

DataManager.createGameObjects = function() {
    Dungeonmind.FFSB.ALIAS_DataManager_createGameObjects.call(this);
    $gameFFStyleBattle = new Game_FFStyleBattle();
};

Dungeonmind.FFSB.ALIAS_DataManager_makeSaveContents = DataManager.makeSaveContents;

DataManager.makeSaveContents = function() {
    const contents = Dungeonmind.FFSB.ALIAS_DataManager_makeSaveContents.call(this);
    contents.ffStyleBattle = $gameFFStyleBattle;
    return contents;
};

Dungeonmind.FFSB.ALIAS_DataManager_extractSaveContents = DataManager.extractSaveContents;

DataManager.extractSaveContents = function(contents) {
    Dungeonmind.FFSB.ALIAS_DataManager_extractSaveContents.call(this, contents);
    $gameFFStyleBattle = contents.ffStyleBattle;
};

//-----------------------------------------------------------------------------
// ColorManager
//
// *Added Color Functions

ColorManager.ffHPGaugeColor1 = function() {
    return this.textColor($gameFFStyleBattle._partyStatusWindowHPGaugeColor1);
};

ColorManager.ffHPGaugeColor2 = function() {
    return this.textColor($gameFFStyleBattle._partyStatusWindowHPGaugeColor2);
};

ColorManager.ffMPGaugeColor1 = function() {
    return this.textColor($gameFFStyleBattle._partyStatusWindowMPGaugeColor1);
};

ColorManager.ffMPGaugeColor2 = function() {
    return this.textColor($gameFFStyleBattle._partyStatusWindowMPGaugeColor2);
};

ColorManager.ffTPGaugeColor1 = function() {
    return this.textColor($gameFFStyleBattle._partyStatusWindowTPGaugeColor1);
};

ColorManager.ffTPGaugeColor2 = function() {
    return this.textColor($gameFFStyleBattle._partyStatusWindowTPGaugeColor2);
};

ColorManager.ffCTGaugeColor1 = function() {
    return this.textColor($gameFFStyleBattle._partyStatusWindowTPBGaugeColor1);
};

ColorManager.ffCTGaugeColor2 = function() {
    return this.textColor($gameFFStyleBattle._partyStatusWindowTPBGaugeColor2);
};

ColorManager.ffHPgaugeBackColor = function() {
    return this.textColor($gameFFStyleBattle._partyStatusWindowHPGaugeBGColor);
};

ColorManager.ffMPgaugeBackColor = function() {
    return this.textColor($gameFFStyleBattle._partyStatusWindowMPGaugeBGColor);
};

ColorManager.ffTPgaugeBackColor = function() {
    return this.textColor($gameFFStyleBattle._partyStatusWindowTPGaugeBGColor);
};

ColorManager.ffCTgaugeBackColor = function() {
    return this.textColor($gameFFStyleBattle._partyStatusWindowTPBGaugeBGColor);
};

//-----------------------------------------------------------------------------
// Game_Battler
//
// *Aliased Function

Dungeonmind.FFSB.ALIAS_GameBattler_gainTp = Game_Battler.prototype.gainTp;

Game_Battler.prototype.gainTp = function(value) {
    Dungeonmind.FFSB.ALIAS_GameBattler_gainTp.call(this, value);
    if(SceneManager._scene instanceof Scene_Battle) {
        SceneManager._scene._statusWindow.refresh();
    };
};

Dungeonmind.FFSB.ALIAS_GameActor_performDamage = Game_Battler.prototype.performDamage;

Game_Battler.prototype.performDamage = function() {
    Dungeonmind.FFSB.ALIAS_GameActor_performDamage.call(this);
    SceneManager._scene._statusWindow.refresh();
};

Dungeonmind.FFSB.ALIAS_GameActor_performAction = Game_Battler.prototype.performAction;

Game_Battler.prototype.performAction = function(action) {
    Dungeonmind.FFSB.ALIAS_GameActor_performAction.call(this, action);
    SceneManager._scene._statusWindow.refresh();
};

Dungeonmind.FFSB.ALIAS_GameActor_performActionStart = Game_Battler.prototype.performActionStart;

Game_Battler.prototype.performActionStart = function(action) {
    Dungeonmind.FFSB.ALIAS_GameActor_performActionStart.call(this, action);
    SceneManager._scene._statusWindow.refresh();
};

Dungeonmind.FFSB.ALIAS_GameActor_performActionEnd = Game_Battler.prototype.performActionEnd;

Game_Battler.prototype.performActionEnd = function() {
    Dungeonmind.FFSB.ALIAS_GameActor_performActionEnd.call(this);
    SceneManager._scene._statusWindow.refresh();
};

//-----------------------------------------------------------------------------
// BattleManager
//
// *Aliased function

Dungeonmind.FFSB.ALIAS_BattleManager_updateTurnEnd = BattleManager.updateTurnEnd;

BattleManager.updateTurnEnd = function() {
  Dungeonmind.FFSB.ALIAS_BattleManager_updateTurnEnd.call(this);
    SceneManager._scene._statusWindow.refresh();
};

//-----------------------------------------------------------------------------
// Scene_Battle
//
// *Overwritten Scene_Battle functions.

Scene_Battle.prototype.createAllWindows = function() {
    this.createLogWindow();
    this.createStatusWindow();
    this.createHelpWindow();
    this.createActorWindow();
    this.createEnemyWindow();
    this.createItemWindow();
    this.createSkillWindow();
    this.createActorCommandWindow();
    this.createPartyCommandWindow();
    Scene_Message.prototype.createAllWindows.call(this);
};

Scene_Battle.prototype.partyCommandWindowRect = function() {
    rectangle = $gameFFStyleBattle._partyCommandWindowCoordinates;
    rectangle = rectangle.replaceAll('this','SceneManager._scene');
    rectangle = rectangle.replaceAll('return','');
    rectangle = eval(rectangle);
    return rectangle;
};

Scene_Battle.prototype.statusWindowRect = function() {
    rectangle = $gameFFStyleBattle._partyStatusWindowCoordinates;
    rectangle = rectangle.replaceAll('this','SceneManager._scene');
    rectangle = rectangle.replaceAll('return','');
    rectangle = eval(rectangle);
    return rectangle;
};

Scene_Battle.prototype.enemyWindowRect = function() {
    rectangle = $gameFFStyleBattle._enemyStatusWindowCoordinates;
    rectangle = rectangle.replaceAll('this','SceneManager._scene');
    rectangle = rectangle.replaceAll('return','');
    rectangle = eval(rectangle);
    return rectangle;
};

Scene_Battle.prototype.actorCommandWindowRect = function() {
    rectangle = $gameFFStyleBattle._actorCommandWindowCoordinates;
    rectangle = rectangle.replaceAll('this','SceneManager._scene');
    rectangle = rectangle.replaceAll('return','');
    rectangle = eval(rectangle);
    return rectangle;
};

Scene_Battle.prototype.skillWindowRect = function() {
    rectangle = $gameFFStyleBattle._skillWindowCoordinates;
    rectangle = rectangle.replaceAll('this','SceneManager._scene');
    rectangle = rectangle.replaceAll('return','');
    rectangle = eval(rectangle);
    return rectangle;
};

Scene_Battle.prototype.itemWindowRect = function() {
    rectangle = $gameFFStyleBattle._itemWindowCoordinates;
    rectangle = rectangle.replaceAll('this','SceneManager._scene');
    rectangle = rectangle.replaceAll('return','');
    rectangle = eval(rectangle);
    return rectangle;
};

Scene_Battle.prototype.updateStatusWindowVisibility = function() {
    if ($gameMessage.isBusy()) {
        this._statusWindow.close();
    } else {
        this._statusWindow.open();
    }
    //this.updateStatusWindowPosition(); // *Stops window from sliding
};

//-----------------------------------------------------------------------------
// Scene_Battle
//
// *Aliased Scene_Battle functions.

Dungeonmind.FFSB.ALIAS_SceneBattle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;

Scene_Battle.prototype.startPartyCommandSelection = function() {
    Dungeonmind.FFSB.ALIAS_SceneBattle_startPartyCommandSelection.call(this);
    this._enemyWindow.show();
    this._enemyWindow.select(-1);
    if(Dungeonmind.FFSB.skipFightMenu && !this._battleStarted) {
      BattleManager.selectNextCommand();
      this._partyCommandWindow.hide();
      this._partyCommandWindow.deactivate();
      this._statusWindow.selectActor(BattleManager.actor());
      this._actorCommandWindow.setup(BattleManager.actor());
      this._actorCommandWindow.show();
      this._actorCommandWindow.activate();
    } else {
      this._partyCommandWindow.show();
      this._partyCommandWindow.activate();
      this._partyCommandWindow.select(0);
    }
};

Dungeonmind.FFSB.ALIAS_SceneBattle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;

Scene_Battle.prototype.onEnemyCancel = function() {
    Dungeonmind.FFSB.ALIAS_SceneBattle_onEnemyCancel.call(this);
    this._enemyWindow.show();
    this._enemyWindow.select(-1);
    if($gameFFStyleBattle._actorCommandWindowHideForAtk) {
        this._actorCommandWindow.show();
    }
    if(this._actorCommandWindow.currentSymbol() === 'skill') {
        this._actorCommandWindow.deactivate();
        this._actorCommandWindow.hide();
    }
};

Dungeonmind.FFSB.ALIAS_SceneBattle_hideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows;

Scene_Battle.prototype.hideSubInputWindows = function() { 
    Dungeonmind.FFSB.ALIAS_SceneBattle_hideSubInputWindows.call(this);
    if (!$gameMessage.isBusy()) {
        this._enemyWindow.show();
    }
};

Dungeonmind.FFSB.ALIAS_SceneBattle_updateInputWindowVisibility = Scene_Battle.prototype.updateInputWindowVisibility;

Scene_Battle.prototype.updateInputWindowVisibility = function() {
    Dungeonmind.FFSB.ALIAS_SceneBattle_updateInputWindowVisibility.call(this);
    if (!$gameMessage.isBusy()) {
        this._enemyWindow.show();
    }
};

Dungeonmind.FFSB.ALIAS_SceneBattle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;

Scene_Battle.prototype.startEnemySelection = function() {
    Dungeonmind.FFSB.ALIAS_SceneBattle_startEnemySelection.call(this);
    this._statusWindow.show();
    this._enemyWindow.select(0);
};

Dungeonmind.FFSB.ALIAS_SceneBattle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;

Scene_Battle.prototype.onEnemyOk = function() {
    Dungeonmind.FFSB.ALIAS_SceneBattle_onEnemyOk.call(this);
    this._enemyWindow.select(-1);
};

Dungeonmind.FFSB.ALIAS_SceneBattle_onSkillOk = Scene_Battle.prototype.onSkillOk;

Scene_Battle.prototype.onSkillOk = function() {
    Dungeonmind.FFSB.ALIAS_SceneBattle_onSkillOk.call(this);
    this._skillWindow.hide();
    //this._enemyWindow.select(-1);
};

Dungeonmind.FFSB.ALIAS_SceneBattle_onSKillCancel = Scene_Battle.prototype.onSkillCancel;

Scene_Battle.prototype.onSkillCancel = function() {
    Dungeonmind.FFSB.ALIAS_SceneBattle_onSKillCancel.call(this);
    this._enemyWindow.select(-1);
};

Dungeonmind.FFSB.ALIAS_SceneBattle_onItemOk = Scene_Battle.prototype.onItemOk;

Scene_Battle.prototype.onItemOk = function() {
    Dungeonmind.FFSB.ALIAS_SceneBattle_onItemOk.call(this);
    this._itemWindow.hide();
};

Dungeonmind.FFSB.ALIAS_SceneBattle_commandFight = Scene_Battle.prototype.commandFight;

Scene_Battle.prototype.commandFight = function() {
    Dungeonmind.FFSB.ALIAS_SceneBattle_commandFight.call(this);
    this._enemyWindow.select(-1);
};

Dungeonmind.FFSB.ALIAS_SceneBattle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;

Scene_Battle.prototype.changeInputWindow = function() {
    Dungeonmind.FFSB.ALIAS_SceneBattle_changeInputWindow.call(this);
    this._enemyWindow.select(-1);
};

Dungeonmind.FFSB.ALIAS_SceneBattle_commandAttack = Scene_Battle.prototype.commandAttack;

Scene_Battle.prototype.commandAttack = function() {
    Dungeonmind.FFSB.ALIAS_SceneBattle_commandAttack.call(this);
    if($gameFFStyleBattle._actorCommandWindowHideForAtk) {
        this._actorCommandWindow.hide();
    }
};

Scene_Battle.prototype.commandCancel = function() {
    this._battleStarted = true;
    this.selectPreviousCommand();
};

//-----------------------------------------------------------------------------
// Window_BattleStatus
//
// The window for displaying the status of party members on the battle screen.

Dungeonmind.FFSB.ALIAS_WindowBattleStatus_init = Window_BattleStatus.prototype.initialize;

Window_BattleStatus.prototype.initialize = function(rect) {
    Dungeonmind.FFSB.ALIAS_WindowBattleStatus_init.call(this, rect);
    this.frameVisible = true;
};

Window_BattleStatus.prototype.updatePadding = function() {
    this.padding = 12;
};

Window_BattleStatus.prototype.numVisibleRows = function() {
    return 4;
};

Window_BattleStatus.prototype.rowSpacing = function() {
    return 4;
};

Window_BattleStatus.prototype.itemHeight = function() {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};

Window_BattleStatus.prototype.maxCols = function() {
    return 1;
};

Window_BattleStatus.prototype.drawItem = function(index) {
    //this.drawItemImage(index);
    this.drawItemStatus(index);
};

Window_BattleStatus.prototype.getLongestActorName = function() {
    const actors = $gameActors._data;
    var count = 0;
    for(let i = 0; i < actors.length; i++) {
        if(actors[i] && this.contents.measureTextWidth(actors[i]._name) > count) {
            count = this.contents.measureTextWidth(actors[i]._name);
        }
    }
    return count;
};

Window_BattleStatus.prototype.removeTextCodes = function(text) {
    text = text.replaceAll(/([0-9]+)(?=\])+/g,'');
    text = text.replaceAll('\\C[]','');
    text = text.replaceAll('\\c[]','');
    text = text.replaceAll('\\V[]','');
    text = text.replaceAll('\\v[]','');
    return text;
};

Window_BattleStatus.prototype.drawItemStatus = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRectWithPadding(index);
    const nameX = this.nameX(rect);
    const nameY = this.actorNameY(rect);
    const stateIconX = this.stateIconX(rect);
    const stateIconY = this.stateIconY(rect);
    this.drawActorName(actor, nameX, nameY);
    this.placeStateIcon(actor, stateIconX, stateIconY);
    
    if($gameFFStyleBattle._partyStatusWindowHPGaugeBoolean) {
      this.placeBasicHpGauge(actor, index);
    }
    if($gameFFStyleBattle._partyStatusWindowMPGaugeBoolean) {
      this.placeBasicMpGauge(actor, index);
    }
    if($gameFFStyleBattle._partyStatusWindowTPGaugeBoolean) {
      this.placeBasicTpGauge(actor, index);
    }
    if($gameFFStyleBattle._partyStatusWindowTPBGaugeBoolean) {
      this.placeTimeGauge(actor, index);
    }
    
    const nameSpacing = this.getLongestActorName();

    const hpLabel = $gameFFStyleBattle._partyStatusWindowHPStatsLabelText;
    const hpLabelSize = this.contents.measureTextWidth(this.removeTextCodes(hpLabel));
    const hpLabelX = eval($gameFFStyleBattle._partyStatusWindowHPStatsLabelX);
    const hpLabelY = eval($gameFFStyleBattle._partyStatusWindowHPStatsLabelY);
    const hpValuesText = eval($gameFFStyleBattle._partyStatusWindowHPValuesFormat);
    const hpValuesTextSize = this.contents.measureTextWidth(this.removeTextCodes(hpValuesText));
    const hpValuesX = eval($gameFFStyleBattle._partyStatusWindowHPValuesX);
    const hpValuesY = eval($gameFFStyleBattle._partyStatusWindowHPValuesY);

    if($gameFFStyleBattle._partyStatusWindowHPStatsBoolean) {
      this.drawActorLabel(hpLabelX, hpLabelY, hpLabelSize, hpLabel, this.getFontSize());
      this.drawActorValues(hpValuesX, hpValuesY, hpValuesTextSize, hpValuesText, this.getFontSize());
    }

    const mpLabel = $gameFFStyleBattle._partyStatusWindowMPStatsLabelText;
    const mpLabelSize = this.contents.measureTextWidth(this.removeTextCodes(mpLabel));
    const mpLabelX = eval($gameFFStyleBattle._partyStatusWindowMPStatsLabelX);
    const mpLabelY = eval($gameFFStyleBattle._partyStatusWindowMPStatsLabelY);
    const mpValuesText = eval($gameFFStyleBattle._partyStatusWindowMPValuesFormat);
    const mpValuesTextSize = this.contents.measureTextWidth(this.removeTextCodes(mpValuesText));
    const mpValuesX = eval($gameFFStyleBattle._partyStatusWindowMPValuesX);
    const mpValuesY = eval($gameFFStyleBattle._partyStatusWindowMPValuesY);

    if($gameFFStyleBattle._partyStatusWindowMPStatsBoolean) {
      this.drawActorLabel(mpLabelX, mpLabelY, mpLabelSize, mpLabel, this.getFontSize());
      this.drawActorValues(mpValuesX, mpValuesY, mpValuesTextSize, mpValuesText, this.getFontSize());
    }

    const tpLabel = $gameFFStyleBattle._partyStatusWindowTPStatsLabelText;
    const tpLabelSize = this.contents.measureTextWidth(this.removeTextCodes(tpLabel));
    const tpLabelX = eval($gameFFStyleBattle._partyStatusWindowTPStatsLabelX);
    const tpLabelY = eval($gameFFStyleBattle._partyStatusWindowTPStatsLabelY);
    const tpValuesText = eval($gameFFStyleBattle._partyStatusWindowTPValuesFormat);
    const tpValuesTextSize = this.contents.measureTextWidth(this.removeTextCodes(tpValuesText));
    const tpValuesX = eval($gameFFStyleBattle._partyStatusWindowTPValuesX);
    const tpValuesY = eval($gameFFStyleBattle._partyStatusWindowTPValuesY);

    if($gameFFStyleBattle._partyStatusWindowTPStatsBoolean) {
      this.drawActorLabel(tpLabelX, tpLabelY, tpLabelSize, tpLabel, this.getFontSize());
      this.drawActorValues(tpValuesX, tpValuesY, tpValuesTextSize, tpValuesText, this.getFontSize());
    }
};

Window_BattleStatus.prototype.stateIconX = function(rect) {
    return eval($gameFFStyleBattle._partyStatusStatesX);
};

Window_BattleStatus.prototype.stateIconY = function(rect) {
    return eval($gameFFStyleBattle._partyStatusStatesY);
};

Window_BattleStatus.prototype.drawTextEx = function(text, x, y, width) {
    const textState = this.createTextState(text, x, y, width);
    this.processAllText(textState);
    return textState.outputWidth;
};

Window_BattleStatus.prototype.actorNameY = function(rect) {
    return rect.y + 3;
};

Window_BattleStatus.prototype.drawActorName = function(actor, nameX, nameY) {
    const index = this.index();
    const rect = this.itemRectWithPadding(index);
    this.drawText(actor._name, nameX, nameY, rect.width, this.lineHeight(), 'left');
};

Window_BattleStatus.prototype.drawActorLabel = function(x, y, maxWidth, text, fontSize) {
    this.contents.fontSize = fontSize;
    this.drawTextEx(text, x, y, maxWidth);
    this.changeTextColor(ColorManager.normalColor());
    this.contents.fontSize = this.getFontSize();
};

Window_BattleStatus.prototype.drawActorValues = function(x, y, maxWidth, text, fontSize,) {
    //let text = currentValue + '/' + currentMaxValue;
    this.contents.fontSize = fontSize;
    this.drawTextEx(text, x, y, maxWidth);
    this.changeTextColor(ColorManager.normalColor());
    this.contents.fontSize = this.getFontSize();
};

Window_BattleStatus.prototype.placeBasicHpGauge = function(actor, index) {
    const rect = this.itemRectWithPadding(index);
    const gaugeX = eval($gameFFStyleBattle._partyStatusWindowHPGaugeX);
    const gaugeY = eval($gameFFStyleBattle._partyStatusWindowHPGaugeY);
    this.placeGauge(actor, "hp", gaugeX, gaugeY);
};

Window_BattleStatus.prototype.placeBasicMpGauge = function(actor, index) {
    const rect = this.itemRectWithPadding(index);
    const gaugeX = eval($gameFFStyleBattle._partyStatusWindowMPGaugeX);
    const gaugeY = eval($gameFFStyleBattle._partyStatusWindowMPGaugeY);
    this.placeGauge(actor, "mp", gaugeX, gaugeY);
};

Window_BattleStatus.prototype.placeBasicTpGauge = function(actor, index) {
    const rect = this.itemRectWithPadding(index);
    const gaugeX = eval($gameFFStyleBattle._partyStatusWindowTPGaugeX);
    const gaugeY = eval($gameFFStyleBattle._partyStatusWindowTPGaugeY);
    if ($dataSystem.optDisplayTp) {
        this.placeGauge(actor, "tp", gaugeX, gaugeY);
    }
};

Window_BattleStatus.prototype.placeTimeGauge = function(actor, index) {
    const rect = this.itemRectWithPadding(index);
    const gaugeX = eval($gameFFStyleBattle._partyStatusWindowTPBGaugeX);
    const gaugeY = eval($gameFFStyleBattle._partyStatusWindowTPBGaugeY);
    if (BattleManager.isTpb()) {
        //width = width-=this.contents.measureTextWidth('HP'); // also 26
        this.placeGauge(actor, "time", gaugeX, gaugeY);
    }
};

Window_BattleStatus.prototype.placeGauge = function(actor, type, x, y) {
    const key = "actor%1-gauge-%2".format(actor.actorId(), type);
    const sprite = this.createInnerSprite(key, Sprite_FFGauge);
    sprite.setup(actor, type);
    sprite.move(x, y);
    sprite.show();
};

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//
// *Overwritten functions.

Window_BattleEnemy.prototype.maxCols = function() {
    return 1;
};

Window_BattleEnemy.prototype.show = function() {
    this.refresh();
    //this.forceSelect(0);
    $gameTemp.clearTouchState();
    Window_Selectable.prototype.show.call(this);
};

//-----------------------------------------------------------------------------
// Window_PartyCommand
//
// *Aliased function

Dungeonmind.FFSB.ALIAS_WindowPartyCommand_init = Window_PartyCommand.prototype.initialize;

Window_PartyCommand.prototype.initialize = function(rect) {
    Dungeonmind.FFSB.ALIAS_WindowPartyCommand_init.call(this, rect);
    this.setWindowBackground();
    this.contents.fontSize = this.getFontSize();
};

Window_PartyCommand.prototype.setWindowBackground = function() {
    this.setBackgroundType($gameFFStyleBattle._partyCommandWindowBackgroundType);
};

Window_PartyCommand.prototype.getFontSize = function() {
    return $gameFFStyleBattle.getPartyCommandWindowFontSize();
};

//-----------------------------------------------------------------------------
// Window_BattleStatus
//
// *Aliased function

Dungeonmind.FFSB.ALIAS_Window_BattleStatus_init = Window_BattleStatus.prototype.initialize;

Window_BattleStatus.prototype.initialize = function(rect) {
    Dungeonmind.FFSB.ALIAS_Window_BattleStatus_init.call(this, rect);
    this.setWindowBackground();
    this.contents.fontSize = this.getFontSize();
};

Window_BattleStatus.prototype.setWindowBackground = function() {
    this.setBackgroundType($gameFFStyleBattle._partyStatusWindowBackgroundType);
};

Window_BattleStatus.prototype.getFontSize = function() {
    return $gameFFStyleBattle.getPartyStatusWindowFontSize();
};

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//
// *Aliased function

Dungeonmind.FFSB.ALIAS_Window_BattleEnemy_init = Window_BattleEnemy.prototype.initialize;

Window_BattleEnemy.prototype.initialize = function(rect) {
    Dungeonmind.FFSB.ALIAS_Window_BattleEnemy_init.call(this, rect);
    this.setWindowBackground();
    this.contents.fontSize = this.getFontSize();
};

Window_BattleEnemy.prototype.setWindowBackground = function() {
    this.setBackgroundType($gameFFStyleBattle._enemyStatusWindowBackgroundType);
};

Window_BattleEnemy.prototype.getFontSize = function() {
    return $gameFFStyleBattle.getEnemyWindowFontSize();
};

//-----------------------------------------------------------------------------
// Window_ActorCommand
//
// *Aliased function

Dungeonmind.FFSB.ALIAS_WindowActorCommand_init = Window_ActorCommand.prototype.initialize;

Window_ActorCommand.prototype.initialize = function(rect) {
    Dungeonmind.FFSB.ALIAS_WindowActorCommand_init.call(this, rect);
    this.setWindowBackground();
    this.contents.fontSize = this.getFontSize();
};

Window_ActorCommand.prototype.setWindowBackground = function() {
    this.setBackgroundType($gameFFStyleBattle._actorCommandWindowBackgroundType);
};

Window_ActorCommand.prototype.getFontSize = function() {
    return $gameFFStyleBattle.getActorCommandWindowFontSize();
};

//-----------------------------------------------------------------------------
// Window_BattleSkill
//
// *Aliased function

Dungeonmind.FFSB.ALIAS_WindowBattleSkill_init = Window_BattleSkill.prototype.initialize;

Window_BattleSkill.prototype.initialize = function(rect) {
    Dungeonmind.FFSB.ALIAS_WindowBattleSkill_init.call(this, rect);
    this.setWindowBackground();
    this.contents.fontSize = this.getFontSize();
};

Window_BattleSkill.prototype.maxCols = function() {
    return $gameFFStyleBattle._skillWindowColumns;
};

Window_BattleSkill.prototype.setWindowBackground = function() {
    this.setBackgroundType($gameFFStyleBattle._skillWindowBackgroundType);
};

Window_BattleSkill.prototype.getFontSize = function() {
    return $gameFFStyleBattle.getSkillWindowFontSize();
};

//-----------------------------------------------------------------------------
// Window_BattleItem
//
// *Aliased function

Dungeonmind.FFSB.ALIAS_WindowBattleItem_init = Window_BattleItem.prototype.initialize;

Window_BattleItem.prototype.initialize = function(rect) {
    Dungeonmind.FFSB.ALIAS_WindowBattleItem_init.call(this, rect);
    this.setWindowBackground();
    this.contents.fontSize = this.getFontSize();
};

Window_BattleItem.prototype.maxCols = function() {
    return $gameFFStyleBattle._itemWindowColumns;
};

Window_BattleItem.prototype.setWindowBackground = function() {
    this.setBackgroundType($gameFFStyleBattle._itemWindowBackgroundType);
};

Window_BattleItem.prototype.getFontSize = function() {
    return $gameFFStyleBattle.getItemWindowFontSize();
};

//-----------------------------------------------------------------------------
// Sprite_FFGauge
//
// The sprite for displaying a status gauge.

function Sprite_FFGauge() {
    this.initialize(...arguments);
}

Sprite_FFGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_FFGauge.prototype.constructor = Sprite_FFGauge;

Sprite_FFGauge.prototype.initialize = function() {
    Sprite_Gauge.prototype.initialize.call(this);
    this.initMembers();
    this.createBitmap();
};

Sprite_FFGauge.prototype.setup = function(battler, statusType) {
    this._battler = battler;
    this._statusType = statusType;
    this._value = this.currentValue();
    this._maxValue = this.currentMaxValue();
    this.updateBitmap();
};

Sprite_FFGauge.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateBitmap();
};

Sprite_FFGauge.prototype.labelFontSize = function() {
    return $gameFFStyleBattle.getPartyStatusWindowFontSize();
};

Sprite_FFGauge.prototype.valueFontSize = function() {
    return $gameFFStyleBattle.getPartyStatusWindowFontSize();
};

Sprite_FFGauge.prototype.gaugeRate = function() {
    const value = this._value;
    const maxValue = this._maxValue;
    return maxValue > 0 ? value / maxValue : 0;
};

Sprite_FFGauge.prototype.bitmapWidth = function() {
    switch (this._statusType) {
        case "hp":
            return eval($gameFFStyleBattle._partyStatusWindowHPGaugeWidth);
        case "mp":
            return eval($gameFFStyleBattle._partyStatusWindowMPGaugeWidth);
        case "tp":
            return eval($gameFFStyleBattle._partyStatusWindowTPGaugeWidth);
        case "time":
            return eval($gameFFStyleBattle._partyStatusWindowTPBGaugeWidth);
        default:
            return 128;
    }
};

Sprite_FFGauge.prototype.bitmapHeight = function() {
    return 32;
};

Sprite_FFGauge.prototype.textHeight = function() {
    return 24;
};

Sprite_FFGauge.prototype.gaugeHeight = function() {
    switch (this._statusType) {
        case "hp":
            return eval($gameFFStyleBattle._partyStatusWindowHPGaugeHeight);
        case "mp":
            return eval($gameFFStyleBattle._partyStatusWindowMPGaugeHeight);
        case "tp":
            return eval($gameFFStyleBattle._partyStatusWindowTPGaugeHeight);
        case "time":
            return eval($gameFFStyleBattle._partyStatusWindowTPBGaugeHeight);
        default:
            return 12;
    }
};

Sprite_FFGauge.prototype.labelX = function() {
    switch (this._statusType) {
        case "hp":
            return eval($gameFFStyleBattle._partyStatusWindowHPGaugeLabelX);
        case "mp":
            return eval($gameFFStyleBattle._partyStatusWindowMPGaugeLabelX);
        case "tp":
            return eval($gameFFStyleBattle._partyStatusWindowTPGaugeLabelX);
        case "time":
            return eval($gameFFStyleBattle._partyStatusWindowTPBGaugeLabelX);
        default:
            return this.labelOutlineWidth() / 2;
    }
};

Sprite_FFGauge.prototype.labelY = function() {
    switch (this._statusType) {
        case "hp":
            return eval($gameFFStyleBattle._partyStatusWindowHPGaugeLabelY);
        case "mp":
            return eval($gameFFStyleBattle._partyStatusWindowMPGaugeLabelY);
        case "tp":
            return eval($gameFFStyleBattle._partyStatusWindowTPGaugeLabelY);
        case "time":
            return eval($gameFFStyleBattle._partyStatusWindowTPBGaugeLabelY);
        default:
            return 5;
    }
};

Sprite_FFGauge.prototype.gaugeBackColor = function() {
    switch (this._statusType) {
        case "hp":
            return ColorManager.ffHPgaugeBackColor();
        case "mp":
            return ColorManager.ffMPgaugeBackColor();
        case "tp":
            return ColorManager.ffTPgaugeBackColor();
        case "time":
            return ColorManager.ffCTgaugeBackColor();
        default:
            return ColorManager.normalColor();
    }
};

Sprite_FFGauge.prototype.gaugeColor1 = function() {
    switch (this._statusType) {
        case "hp":
            return ColorManager.ffHPGaugeColor1();
        case "mp":
            return ColorManager.ffMPGaugeColor1();
        case "tp":
            return ColorManager.ffTPGaugeColor1();
        case "time":
            return ColorManager.ffCTGaugeColor1();
        default:
            return ColorManager.normalColor();
    }
};

Sprite_FFGauge.prototype.gaugeColor2 = function() {
    switch (this._statusType) {
        case "hp":
            return ColorManager.ffHPGaugeColor2();
        case "mp":
            return ColorManager.ffMPGaugeColor2();
        case "tp":
            return ColorManager.ffTPGaugeColor2();
        case "time":
            return ColorManager.ffCTGaugeColor2();
        default:
            return ColorManager.normalColor();
    }
};

Sprite_FFGauge.prototype.label = function() {
    switch (this._statusType) {
        case "hp":
            return $gameFFStyleBattle._partyStatusWindowHPGaugeLabelText;
        case "mp":
            return $gameFFStyleBattle._partyStatusWindowMPGaugeLabelText;
        case "tp":
            return $gameFFStyleBattle._partyStatusWindowTPGaugeLabelText;
        default:
            return "";
    }
};

Sprite_FFGauge.prototype.drawLabel = function() {
    const label = this.label();
    const x = this.labelX();
    const y = this.labelY();
    const width = this.bitmapWidth();
    const height = this.textHeight();
    this.setupLabelFont();
    this.bitmap.paintOpacity = this.labelOpacity();
    this.bitmap.drawText(label, x, y, width, height, "left");
    this.bitmap.paintOpacity = 255;
};