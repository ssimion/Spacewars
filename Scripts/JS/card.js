"use strict";

/** Base card class that UnitCard and PowerUpCard inherit from 
 */
var Card = function()
{
	this.positionOnBoard = 0;
	// All the Cards cost 1
	this.costOfCard = 1;
	this.nameOfCard = "";
	this.descriptionOfCard = "";
}

/** Returns the card description
 */
Card.prototype.GetCardDescription = function(){
	return this.descriptionOfCard;
}
/** Return the card cost.
 */
Card.prototype.GetCardCost = function(){
	return this.costOfCard;
}
/** Return the card name.
 */
Card.prototype.GetNameOfCard = function(){
	return this.nameOfCard;
}
