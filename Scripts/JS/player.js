/** Inits the Player Class
 * @param {string} playerName: name of the Player
 */
var Player = function (playerName) {
	this.name = playerName;
	this.health = 100;
	this.money = 0;
	this.numberOfCardsInHand = 0;
	this.deck = new Deck();
};

/** Returns the name of the player
 */
Player.prototype.GetName = function () {
	return this.name;
}
/** Returns the health of the player
 */
Player.prototype.GetHealth = function () {
	return this.health;
}
/** Set the health of the player.
 * @param {int} newHealth: the new healthState
 */
Player.prototype.SetHealth = function (newHealth) {
	this.health = newHealth;
}
/** Add a certain amount of health to the player.
 * @param {int} amount: amount to add
 */
Player.prototype.AddHealth = function (amount) {
	this.health += amount;
}
/** Remove a certain amount of health to the player.
 * @param {int} amount: amount to add
 */
Player.prototype.RemoveHealth = function (amount) {
	this.health -= amount;
}
/** Returns the Number of cards in the player's hand
 */
Player.prototype.GetNumberOfCardsInHand = function () {
	return this.numberOfCardsInHand;
}
/** Remove one card from the player's hand
 */
Player.prototype.RemoveCardsFromHand = function (amount) {
	if (this.numberOfCardsInHand > 0) {
		this.numberOfCardsInHand -= amount;
	}
}
/** Add one card from the player's hand
 */
Player.prototype.AddCardsToHand = function (amount) {
	this.numberOfCardsInHand += amount;
}
