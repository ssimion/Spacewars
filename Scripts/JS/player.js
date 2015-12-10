"use strict";

/** Inits the Player Class
 * @class Player
 * @param {string} playerName: name of the Player
 */
var Player = function (playerName) {
	this.name = playerName;
	this.health = 20;
	//This is one move this leads to the number being -1 at the end,
	// but anything else than this breaks;
	this.moves = 1;
	this.numberOfCardsInHand = 0;
	this.deck = new Deck();
	this.boardCards = [];
	this.handCards = [];
};
/** Returns the name of the player
 * @memberOf Player
 * @public
 */
Player.prototype.GetName = function () {
	return this.name;
}
/** Returns the health of the player
 * @memberOf Player
 * @public
 */
Player.prototype.GetHealth = function () {
	return this.health;
}
/** Set the health of the player.
 * @param {int} newHealth: the new healthState
 * @memberOf Player
 * @public
 */
Player.prototype.SetHealth = function (newHealth) {
	this.health = newHealth;
}
/** Add a certain amount of health to the player.
 * @param {int} amount: amount to add
 * @memberOf Player
 * @public
 */
Player.prototype.AddHealth = function (amount) {
	this.health += amount;
}
/** Remove a certain amount of health to the player.
 * @param {int} amount: amount to add
 * @todo check if smaller than minimum
 * @memberOf Player
 * @public
 */
Player.prototype.RemoveHealth = function (amount) {
	if (this.health - amount >= 0) {
		this.health -= amount;
	} else {
		this.health = 0;
	}
}
/** Returns the Number of cards in the player's hand
 * @memberOf Player
 * @public
 */
Player.prototype.GetNumberOfCardsInHand = function () {
	return this.handCards.length;
}
/** Returns the cards in the player's hand
 * @memberOf Player
 * @public
 */
Player.prototype.GetCardsInHand = function () {
	return this.handCards;
}
/** Returns the cards in the player's hand
 * @memberOf Player
 * @public
 */
Player.prototype.GetCardsOnBoard = function () {
	return this.boardCards;
}
/** Returns the remaining number of moves of the player.
 * @memberOf Player
 * @public
 */
Player.prototype.GetRemainingNumberOfMoves = function () {
	return this.moves;
}
/** Add move action to the player
 * Adding only one would not make sense because
 * it would just compensate the card's cost.
 * @memberOf Player
 * @public
 */
Player.prototype.AddMove = function () {
	this.moves += 2;
}
/** Remove one move action to the player
 * @memberOf Player
 * @public
 */
Player.prototype.RemoveOneMove = function () {
	this.moves--;
}
/** Remove one card from the player's hand
 * @memberOf Player
 * @public
 */
Player.prototype.RemoveCardsFromHand = function (cardToRemove) {
	if (this.handCards.length > 0) {
		var index = this.handCards.indexOf(cardToRemove);
		this.handCards.splice(index, 1);
	}
	this.numberOfCardsInHand--;
}
/** Add one card to the player's hand
 * @memberOf Player
 * @public
 */
Player.prototype.AddCardsToHand = function (cardToAdd) {
	this.handCards.push(cardToAdd);
	this.numberOfCardsInHand++;
}
/** Add one card to the player's board
 * @memberOf Player
 * @public
 */
Player.prototype.AddCardsToBoard = function (cardToAdd) {
	this.boardCards.push(cardToAdd);
}
/** Draws a card from the deck and add it to the player hand
 * @memberOf Player
 * @public
 */
Player.prototype.DrawCardFromDeck = function () {
	if (this.deck.GetNumberOfCards() > 0)
		this.AddCardsToHand(this.deck.TopCard());
	this.numberOfCardsInHand++;
}
