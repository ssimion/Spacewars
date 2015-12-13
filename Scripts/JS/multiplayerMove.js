"use strict";

/** Inits the Move Class that contains the data sent to the server at the end of each turn
 * @class Move
 * @param {int} damageDone: the damage done by this player to the receiving player
 * @param {Card array} boardCards: the state of the board for the player sending the data
 */
var Move = function () {
	this.damageDone = 0;
	this.boardCards = [];
};

Move.prototype.SetDamage = function(damageDoneThisTurn){
	this.damageDone += damageDoneThisTurn;
}

Move.prototype.SetBoardCards = function(){
	this.boardcards = currentGame.activePlayer.GetCardsOnBoard();
}