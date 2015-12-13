"use strict";

/** Trap card class after being dropped they disappear.
 * @class TrapCard
 * @extend Card
 * @param {string} type: the type ["damage","move","destroy"]
 * @param {integer }effect: the effect amount or if "destroy" just don't add it.
 */
var TrapCard = function(type,effect) {
	this.nameOfCard = "Trap Card";
	this.type = type || "damage";
	this.uniqueID = Math.round(Math.random() * 1000000000000);
	if (this.type == "destroy"){
		this.effect = "destroy";
		this.descriptionOfCard = "Destroys A Card";
	}
	else if (this.type == "move"){
		this.effect = 2;
		this.descriptionOfCard = "Adds one move for this turn";
	}
	else {
		this.effect = effect || 5;
		this.descriptionOfCard = "Deals "+this.effect+" points of damage";
	}
};

TrapCard.prototype = new Card();
/** Types can be DirectDamage, Move, Destroy Card. */
/** Returns the health of the unit card
 * @memberOf TrapCard
 * @public
 */
TrapCard.prototype.GetType = function()
{
	return this.type;
}
/** Returns the damage dealt by the card if applicable.
 * @memberOf TrapCard
 * @public
 */
TrapCard.prototype.GetDamage = function()
{
	if (this.type == "damage")
		return this.effect;
	else
		console.log("This is not a Move Bonus Card");
}
/** Returns the extra number of moves granted by the card if applicable
 * @memberOf TrapCard
 * @public
 */
TrapCard.prototype.GetMoveBonus = function()
{
	if (this.type == "Move")
		return this.effect;
	else
		console.log("This is not a Move Bonus Card");
}
/** Override the to String Function
 * @memberOf TrapCard
 * @public
 */
TrapCard.prototype.toString = function(){ 
	return '[TrapCard "' + this.health + '"]';
}
