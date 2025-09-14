

/*:
 * @target MZ
 * @plugindesc No party command (Fight, Escape) for TPB system.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/threads/176490/
 * @help Free to use and/or modify for any project, no credit required.
 */
// Patch - cycle actors, skipping party command.
void (alias => {
    BattleManager.selectPreviousCommand = function() {
        alias.apply(this, arguments);
        if (this._inputting && !this.actor())
            this.changeCurrentActor(true);
    };
})(BattleManager.selectPreviousCommand);

// Patch - reset flag to false to block turn-0 party command.
void (alias => {
    BattleManager.initMembers = function() {
        alias.apply(this, arguments);
        this._tpbNeedsPartyCommand = false;
    };
})(BattleManager.initMembers);

// Override - in TPB-Wait mode, allow multiple actors to be charged at once.
Game_Actor.prototype.shouldDelayTpbCharge = function() { return false; };

