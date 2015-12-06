/** Base card class that UnitCard and PowerUpCard inherit from 
 */
var Card = function()
{
	this.positionOnBoard = 0;
	this.nameOfCard = '';
}
/** Unit card class
 */
var UnitCard = function() {};
UnitCard.prototype = new Card();
UnitCard.prototype.health = 0;
/** Returns the health of the unit card
 */
UnitCard.prototype.GetHealth = function()
{
	return this.health;
}
/**
 * Override the to String Function
 */
UnitCard.prototype.toString = function(){ 
	return '[UnitCard "' + this.health + '"]';
}
