"use strict";
var g_types = ["damage","move","destroy"];

/** Inits the Deck Class
 * @class Deck
 */
var Deck = function () {
	this.cardList = [];
	for (var i = 0; i < 10; ++i)
	{
		this.cardList.push(new UnitCard(Math.floor(Math.random() * 7),Math.floor(Math.random() * 7)))
		this.cardList.push(new TrapCard(g_types[Math.floor(Math.random() * 3)],Math.floor(Math.random() * 5)))
	}
	this.Shuffle();
}
/** Mixes the cards contained in the deck.
 * Taken from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @memberOf Deck
 * @public
 */
Deck.prototype.Shuffle = function () {
	var array = this.cardList;
	var currentIndex = array.length,
	temporaryValue,
	randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	this.cardList = array;
}
/** This function returns the top card of the deck, and removes it from it.
 * @memberOf Deck
 * @public
 */
Deck.prototype.TopCard = function () {
	return this.cardList.pop();
}
/** This function returns the cardlist
 * @memberOf Deck
 * @public
 */
Deck.prototype.GetCardList = function () {
	return this.cardList;
}
/** Returns the number of Cards remaining in the Deck.
 * @memberOf Deck
 * @public
 */
Deck.prototype.GetNumberOfCards = function () {
	return this.cardList.length;
}
