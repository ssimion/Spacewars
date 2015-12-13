"use strict";

/** Unit card class
 * @class UnitCard
 * @extend Card
 * @param {integer} health: the health of the card
 * @param {integer} attack: the attack of the card
 */
var UnitCard = function(health,attack) {
	this.nameOfCard = "Spaceship";
	this.descriptionOfCard = "A little Spaceship";
	this.uniqueID = Math.round(Math.random() * 1000000000000);
	this.health = health || 0;
	this.attack = attack || 1;
};
UnitCard.prototype = new Card();

/** Returns the health of the unit card
 * @memberOf UnitCard
 * @public
 */
UnitCard.prototype.GetHealth = function()
{
	return this.health;
}
/** Returns the attack of the unit card
 * @memberOf UnitCard
 * @public
 */
UnitCard.prototype.GetAttack = function()
{
	return this.attack;
}
/** Override the to String Function
 * @memberOf UnitCard
 * @public
 */
UnitCard.prototype.toString = function(){ 
	return '[UnitCard "' + this.health + '"]';
}

UnitCard.prototype.GetJSONObject = function(){
	var cardJSONObject = {
		"nameOfCard":this.nameOfCard,
		"descriptionOfCard":this.descriptionOfCard,
		"uniqueID":this.uniqueID,
		"health":this.health,
		"attack":this.attack
	}
}
