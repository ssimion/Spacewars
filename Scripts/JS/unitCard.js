"use strict";

/** Unit card class
 * @param {integer} health: the health of the card
 * @param {integer} attack: the attack of the card
 */
var UnitCard = function(health,attack) {
	this.nameOfCard = "Spaceship";
	this.descriptionOfCard = "A little Spaceship";
	this.health = health || 0;
	this.attack = attack || 1;
};
UnitCard.prototype = new Card();

/** Returns the health of the unit card
 */
UnitCard.prototype.GetHealth = function()
{
	return this.health;
}
/** Returns the attack of the unit card
 */
UnitCard.prototype.GetAttack = function()
{
	return this.attack;
}

/**
 * Override the to String Function
 */
UnitCard.prototype.toString = function(){ 
	return '[UnitCard "' + this.health + '"]';
}