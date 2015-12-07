/** Global Variables.
 */
var userMatchStatus = "";

/** Inits the Game Class
 * TODO: The names should be taken from the google accounts.
 */ 
function Game() {
	this.Player1 = new Player("Stan");
	this.Player2 = new Player("Stef");
	this.turnNumber = 0;
	this.activePlayer = this.Player1.name;
}
/** This function switch between the players.
 */
Game.prototype.NextTurn = function () {
	this.turnNumber++;
}
/** This function returns the active player.
 */
Game.prototype.GetActivePlayer = function () {
	return this.activePlayer;
}
/** This function returns the number of the current turn for the player.
 */
Game.prototype.GetCurrentTurn = function () {
	return this.turnNumber;
}

/** That function is constantly called and updates the game state.
 */
function Update(){
	if (userMatchStatus == "USER_AWAITING_TURN" && matchDataReceived){
		getMatchData(); 
	}
	else {
		console.log("userMatchStatus = "  + userMatchStatus == "USER_AWAITING_TURN" + "matchDataReceived = " + matchDataReceived);
	}
	// CallBack
	requestAnimationFrame(Update);
}

currentGame = new Game();
console.log(currentGame);
Update();