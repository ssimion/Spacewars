"use strict";
var g_types = ["damage","move","destroy"];

/** Inits the Deck Class
 */
var Deck = function () {
	this.cardList = new Array(20);
	this.cardList = [];
	for (var i = 0; i < 10; ++i)
	{
		this.cardList.push(new UnitCard(Math.floor(Math.random() * 7),Math.floor(Math.random() * 7)))
		this.cardList.push(new TrapCard(g_types[Math.floor(Math.random() * 3)],Math.floor(Math.random() * 7)))
	}
	this.Shuffle();
}
/** Mixes the cards contained in the deck.
 * Taken from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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
 */
Deck.prototype.TopCard = function () {
	return this.cardList.pop();
}
/** This function returns the cardlist
 * WARNING: This is a security breach, should 
 * be disabled on non-test environnements.
 */
Deck.prototype.GetCardList = function () {
	return this.cardList;
}
/** Returns the number of Cards remaining in the Deck.
 */
Deck.prototype.GetNumberOfCards = function () {
	return this.cardList.length;
}
