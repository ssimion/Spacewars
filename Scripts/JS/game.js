"use strict";

/** Global Variables.
 */
var userMatchStatus = "";
var g_NumberofCardsAtStart = 5;
var g_oldPlayerData = {};
/** Inits the Game Class
 * TODO: The names should be taken from the google accounts.
 * @class Game
 */ 
function Game() {
	this.PlayerArray = [new Player("Stan"),new Player("Stef")]
	this.turnNumber = 0;
	this.activePlayer = this.PlayerArray[0];
}
/** Init function
 * @memberOf Game
 * @public
 */
Game.prototype.Init =  function (){
	//DrawFiveCards for each player
	for (var i = 0; i < g_NumberofCardsAtStart; ++i){
		for(var j = 0; j < this.PlayerArray.length ; j ++)
			this.PlayerArray[j].DrawCardFromDeck();
	}
	for (var i = 0; i < this.activePlayer.GetNumberOfCardsInHand();++i){
		DrawCardInHand(this.activePlayer.GetCardsInHand()[i],i);
	}
}
/** This function switch between the players.
 * @memberOf Game
 * @public
 */
Game.prototype.NextTurn = function () {
	this.turnNumber++;
}
/** This function returns the active player.
 * @memberOf Game
 * @public
 */
Game.prototype.GetActivePlayer = function () {
	return this.activePlayer;
}
/** This function returns the other player.
 * @memberOf Game
 * @public
 */
Game.prototype.GetInactivePlayer = function(){
	for (var i = 0;i < this.PlayerArray.length; ++i)
		if (this.PlayerArray[i].GetName() != this.activePlayer.GetName())
			return this.PlayerArray[i];
}
/** This function returns the number of the current turn for the player.
 * @memberOf Game
 * @public
 */
Game.prototype.GetCurrentTurn = function () {
	return this.turnNumber;
}
Game.prototype.PlayerDataChanged = function (){

	if(!g_oldPlayerData)
		g_oldPlayerData = this.PlayerArray;
	if (g_oldPlayerData != currentGame.PlayerArray)
		return true;
	return false;	
}
/** That function is constantly called and updates the game state.
 * @memberOf Game
 * @public
 */
function Update(){
	if(currentGame.PlayerDataChanged())
		DrawPlayerData();
	if (userMatchStatus == "USER_AWAITING_TURN" && matchDataReceived){
		getMatchData(); 
	}
	// CallBack
	requestAnimationFrame(Update);
}



var currentGame = new Game();
currentGame.Init();
console.log(currentGame);
Update();