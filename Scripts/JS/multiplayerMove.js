"use strict";

/** Inits the Move Class that contains the data sent to the server at the end of each turn
 * @class Move
 * @param {int} newEnemyHealth: the health of the receiving player at the end of the current player's turn, after applying the damage
 * @param {Card array} boardCards: the state of the board for the player sending the data
 */
var Move = function () {
	this.newEnemyHealth = 0;
	this.boardCards = [];
};

Move.prototype.SetEnemyHealth = function(healthAtEndTurn){
	this.newEnemyHealth = healthAtEndTurn;
}

Move.prototype.SetBoardCards = function(){
	this.boardCards = currentGame.activePlayer.GetCardsOnBoard();
}