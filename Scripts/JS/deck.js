"use strict";

/** Inits the Deck Class
 */
var Deck = function () {
	this.cardList = new Array(20);
	this.cardList = [[], []];
}
/** Mixes the cards contained in the deck.
 * Taken from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
Deck.prototype.Shuffle = function () {
	var currentIndex = this.cardList.length,
	temporaryValue,
	randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = this.cardList[currentIndex];
		this.cardList[currentIndex] = this.cardList[randomIndex];
		this.cardList[randomIndex] = temporaryValue;
	}
	return this.cardList;
}
/** This function returns the top card of the deck, and removes it from it.
 */
Deck.prototype.TopCard = function () {
	return this.cardList.pop();
}
/** Returns the number of Cards remaining in the Deck.
 */
Deck.prototype.GetNumberOfCards = function () {
	return this.cardList.length;
}
