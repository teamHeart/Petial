/*:
 * @target MZ
 * @plugindesc Offers an improved debug menu to quickly change variables & switches
 * @author Dustb0
 * @help Version 1.2 by Dustb0
 * Offers an improved debug menu to quickly change variables & switches.
 * Press F10 or F9 to open it
 * 
 * Version History
 * ---------------
 * 1.2 Added eval script box
 * 1.1 Added option to enable menu in deployed game
 * 1.0 Release
 * 
 * @param replaceDefaultDebugMenu
 * @text Replace Default Debug Menu
 * @type boolean
 * @desc Replaces the menu that shows up when pressing F9
 * @default true
 * 
 * @param enableInDeployedGame
 * @text Enable in Deployed Game
 * @type boolean
 * @desc If TRUE the debug menu will be callable in the deployed game
 * @default false
 * 
 */
(() => {

    const pluginName = "SDE_DebugMenu";
    const parameters = PluginManager.parameters(pluginName);
    const replaceDefaultDebugMenu = parameters["replaceDefaultDebugMenu"] == "true";
    const enableInDeployedGame = parameters["enableInDeployedGame"] == "true";

    if (replaceDefaultDebugMenu) {
        Scene_Map.prototype.updateCallDebug = function() {
            // Do nothing
        };
    }

    const _plugin_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _plugin_start.call(this);
        if (DebugMenu.isEnabled()) {
            DebugMenu.makeDebugMenu();
        }
    };

    const _plugin_onKeyDown = SceneManager.onKeyDown;
    SceneManager.onKeyDown = function(event) {
        _plugin_onKeyDown.call(this, event);

        if (!event.ctrlKey && !event.altKey) {
            switch (event.keyCode) {
                case 120: // F9
                case 121: // F10
                    if (DebugMenu.isEnabled()) DebugMenu.toggleVisibility();
                    break;
            }
        }
    };

    Input._shouldPreventDefault = function(keyCode) {
        switch (keyCode) {
            case 8: // backspace
            case 9: // tab
            case 33: // pageup
            case 34: // pagedown
            case 37: // left arrow
            case 38: // up arrow
            case 39: // right arrow
            case 40: // down arrow
                return !DebugMenu.isVisible(); // Allow all the keys in the debug menu
        }
        return false;
    };

    // ---------------------------------------------------------------------

    function DebugMenu() {
        throw new Error("This is a static class");
    }

    DebugMenu.isEnabled = function () {
        return Utils.isOptionValid("test") || enableInDeployedGame;
    }

    DebugMenu.makeDebugMenu = function () {
        this.width = Graphics.width * 0.8 * Graphics._realScale;
        this.height = Graphics.height * 0.8 * Graphics._realScale;

        this._makeLayout();
        this._makeQuickAccessMenu();
        this._makeVariableList();
        this._makeSwitchList();
        this._makeEvalBox();

        this.toggleVisibility();
    };

    DebugMenu.isVisible = function () {
        return this.layout.style.visibility != "hidden";
    }

    DebugMenu.toggleVisibility = function () {
        this.layout.style.visibility = this.layout.style.visibility === "hidden" ? "unset" : "hidden";
    }

    DebugMenu._makeLayout = function () {
        this.layout = document.createElement("div");
        this.layout.style.zIndex = 999;
        this.layout.style.display = "flex";
        this.layout.style.alignItems = "flex-start";
        this.layout.style.columnGap = "10px";
        this.layout.style.maxHeight = this.height + "px";
        this.layout.style.maxWidth = this.width + "px";
        document.body.appendChild(this.layout);
    }

    DebugMenu._makeQuickAccessMenu = function () {
        const devToolsButton = this._createDebugButton("DevTools");
        devToolsButton.onclick = () => {
            SceneManager.showDevTools();
        };

        const healButton = this._createDebugButton("Heal All");
        healButton.onclick = () => {
            for (const actor of $gameParty.members()) {
                actor.recoverAll();
            }
        };

        const addGoldButton = this._createDebugButton("+100 G");
        addGoldButton.onclick = () => {
            $gameParty.gainGold(100);
        };

        const reloadButton = this._createDebugButton("Reload");
        reloadButton.onclick = () => {
            SceneManager.reloadGame();
        };

        const optionsPanel = this._createDebugPanel("Quick Access");
        optionsPanel.contentElement.style.display = "flex";
        optionsPanel.contentElement.style.flexDirection = "column";
        optionsPanel.contentElement.style.rowGap = "5px";
        

        optionsPanel.contentElement.appendChild(healButton);
        optionsPanel.contentElement.appendChild(addGoldButton);

        const separator = document.createElement("span");
        separator.textContent = "---"
        separator.style.color = "#aaa";
        separator.style.textAlign = "center";
        separator.style.margin = "-5px 0 -5px 0";
        optionsPanel.contentElement.appendChild(separator);

        optionsPanel.contentElement.appendChild(devToolsButton);
        optionsPanel.contentElement.appendChild(reloadButton);
        this.layout.appendChild(optionsPanel);
    }

    DebugMenu._makeVariableList = function () {
        this.variablesTable = this._createDebugTable();

        $dataSystem.variables.forEach((variableName, index) => {
            if (index > 0) {
                const row = this._createDebugTableRow(index, variableName);

                const editData = this._createDebugTableData("");
                const variableInput = document.createElement("input");
                variableInput.type = "number";
                variableInput.value = $gameVariables.value(index);
                variableInput.style.width = "40px";
                variableInput.oninput = (event) => {
                    $gameVariables.setValue(index, Number(event.target.value, true));
                };

                editData.appendChild(variableInput)
                row.append(editData);
                this.variablesTable.appendChild(row);
            }
        });

        const variablesPanel = this._createDebugPanel("Variables");
        variablesPanel.contentElement.appendChild(this.variablesTable);
        this.layout.appendChild(variablesPanel);
    }

    DebugMenu._makeSwitchList = function () {
        this.switchesTable = this._createDebugTable();

        $dataSystem.switches.forEach((switchName, index) => {
            if (index > 0) {
                const row = this._createDebugTableRow(index, switchName);

                const editData = this._createDebugTableData("");
                const switchInput = document.createElement("input");
                switchInput.type = "checkbox";
                switchInput.value = $gameSwitches.value(index);
                switchInput.style.width = "40px";
                switchInput.onchange = (event) => {
                    $gameSwitches.setValue(index, event.target.checked, true);
                };

                editData.appendChild(switchInput)
                row.append(editData);
                this.switchesTable.appendChild(row);
            }
        });

        const switchesPanel = this._createDebugPanel("Switches");
        switchesPanel.contentElement.appendChild(this.switchesTable);
        this.layout.appendChild(switchesPanel);
    }

    DebugMenu._makeEvalBox = function () {
        const evalPanel = this._createDebugPanel("Eval");
        evalPanel.contentElement.style.display = "flex";
        evalPanel.contentElement.style.flexDirection = "column";
        evalPanel.contentElement.style.alignItems = "flex-end";

        const scriptInput = document.createElement("textarea");
        scriptInput.style.minHeight = "75px";
        scriptInput.style.minWidth = "250px";
        evalPanel.contentElement.appendChild(scriptInput);

        const runButton = this._createDebugButton("Run");
        runButton.onclick = () => {
            eval(scriptInput.value);
        };
        evalPanel.contentElement.appendChild(runButton);

        this.layout.appendChild(evalPanel);
    }

    // ---------------------------------------------------------------------

    DebugMenu._createDebugTable = function () {
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        return table;
    }

    DebugMenu._createDebugTableRow = function () {
        const row = document.createElement("tr");

        [...arguments].forEach(arg => {
            row.append(this._createDebugTableData(arg));
        })

        return row;
    }

    DebugMenu._createDebugTableData = function(text) {
        const data = document.createElement("td");
        data.textContent = text;
        data.style.borderBottom = "1px solid";
        data.style.color = "white";
        data.style.fontFamily = "monospace";
        data.style.fontSize = "14px";
        return data;
    }

    DebugMenu._createDebugButton = function (text, altText) {
        const button = document.createElement("button");
        button.style.backgroundColor = "black";
        button.style.color = "white";
        button.style.padding = "10px";
        button.style.textAlign = "center";
        button.style.borderRadius = "10px";
        button.textContent = text;

        if (altText) button.title = altText;
        return button;
    }

    DebugMenu._createDebugPanel = function (title) {
        const div = document.createElement("div");
        div.style.background = "rgba(0,0,0,0.75)";
        div.style.borderRadius = "10px";
        div.style.zIndex = 999;
        div.style.padding = "12px";

        const titleElem = document.createElement("p");
        titleElem.textContent = title;
        titleElem.style.margin = "0 0 5px 0"
        titleElem.style.color = "#aaa";
        titleElem.style.fontSize = "12px";
        titleElem.style.fontWeight = "bold";
        titleElem.style.fontFamily = "monospace";
        div.appendChild(titleElem);

        const contents = document.createElement("div");
        contents.style.overflow = "auto";
        contents.style.maxHeight = this.layout.style.maxHeight;
        div.appendChild(contents);
        div.contentElement = contents;
        contents.onwheel = (event) => {
            contents.scrollBy(event.deltaX, event.deltaY);
        };

        return div;
    }

    // ---------------------------------------------------------------------

    const _plugin_Switches_setValue = Game_Switches.prototype.setValue;
    Game_Switches.prototype.setValue = function(switchId, value, debugOperation) {
        _plugin_Switches_setValue.call(this, switchId, value);
        if (debugOperation) return;
        DebugMenu.updateSwitchDisplay(switchId, value);
        
    };

    DebugMenu.updateSwitchDisplay = function (switchId, value) {
        this.switchesTable.rows[switchId - 1].cells[2].children[0].checked = value;
    }

    const _plugin_Variables_setValue = Game_Variables.prototype.setValue;
    Game_Variables.prototype.setValue = function(variableId, value, debugOperation) {
        _plugin_Variables_setValue.call(this, variableId, value);
        if (debugOperation) return;
        DebugMenu.updateVariableDisplay(variableId, value);
    };

    DebugMenu.updateVariableDisplay = function (variableId, value) {
        this.variablesTable.rows[variableId - 1].cells[2].children[0].value = value;
    }

})();