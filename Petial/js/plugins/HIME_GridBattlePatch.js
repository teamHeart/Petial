// patch for yanfly skill cooldown
Game_TileBattler.prototype.skills = function() { return []; }

// patch for adding too many actors to the battle
GridManager.prototype.setupGrid = function(grid, data) {        
  grid._actorPositions = data._actorPositions;
  grid._partyPositions = data._partyPositions;
  grid._enemyPositions = data._enemyPositions;
  grid.setActors($gameParty.battleMembers());
  grid.setEnemies($gameTroop.members());
  grid.setHighlightTints(data._highlightTints);
}

// Victor Engine Basic module. Each sprite is identified by a unique ID
Game_TileBattler.prototype.spriteId = function() {
  return 'tile ' + String(this.getBattleNode().id);
};