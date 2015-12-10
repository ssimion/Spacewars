"use strict";

/** Base card class that UnitCard and TrapCard inherit from 
 * @class Card
 */
var Card = function()
{
	this.uniqueID = 42;
	this.positionOnBoard = 0;
	// All the Cards cost 1
	this.costOfCard = 1;
	this.nameOfCard = "";
	this.descriptionOfCard = "";
}

/** Returns the card ID
 * @memberOf Card
 * @public
 */
Card.prototype.GetID = function(){
	return this.uniqueID;
}
/** Returns the card description
 * @memberOf Card
 * @public
 */
Card.prototype.GetCardDescription = function(){
	return this.descriptionOfCard;
}
/** Return the card cost.
 * @memberOf Card
 * @public
 */
Card.prototype.GetCardCost = function(){
	return this.costOfCard;
}
/** Return the card name.
 * @memberOf Card
 * @public
 */
Card.prototype.GetNameOfCard = function(){
	return this.nameOfCard;
}
