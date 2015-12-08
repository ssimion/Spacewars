"use strict";

/** Trap card class after being dropped they disappear.
 * @param {string} type: the type ["damage","move","destroy"]
 * @param {integer }effect: the effect amount or if "destroy" just don't add it.
 */
var TrapCard = function(type,effect) {
	this.type = type || "damage";
	if (this.type == "destroy"){
		this.effect = "destroy";
	}
	else if (this.type == "move"){
		this.effect = effect || 1;
	}
	else {
		this.effect = effect || 5;
	}
};

TrapCard.prototype = new Card();
// Types can be DirectDamage, Move, Destroy Card.
/** Returns the health of the unit card
 */
TrapCard.prototype.GetType = function()
{
	return this.type;
}
TrapCard.prototype.GetDamage = function()
{
	if (this.type == "damage")
		return this.effect;
	else
		console.log("This is not a Move Bonus Card");
}
TrapCard.prototype.GetMoveBonus = function()
{
	if (this.type == "Move")
		return this.effect;
	else
		console.log("This is not a Move Bonus Card");
}
/**
 * Override the to String Function
 */
TrapCard.prototype.toString = function(){ 
	return '[TrapCard "' + this.health + '"]';
}
