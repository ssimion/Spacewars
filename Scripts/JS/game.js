/** Inits the Game Class
 * TODO: The names should be taken from the google accounts.
 */
function Game() {
	this.Player1 = new Player("Stan");
	this.Player2 = new Player("Stef");
	this.activePlayer = Player1.name;

	//Init
	Player1.Init();
	Player2.Init();
}
/** This function switch between the players.
 */
Game.prototype.NextTurn = function () {}
/** This function returns the active player.
 */
Game.prototype.GetActivePlayer = function () {
	return this.activePlayer;
}