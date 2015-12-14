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
	this.PlayerArray = [new Player("Player1"),new Player("Player2")]
	this.turnNumber = 0;
	this.activePlayer = this.PlayerArray[0];
	this.activePlayerMove = new Move();
	// hardcoding for testing purposes
	this.previousPlayerMoveString = '[{"nameOfCard":"Spaceship","descriptionOfCard":"A little Spaceship","uniqueID":620911287609,"health":4,"attack":4},{"nameOfCard":"Spaceship","descriptionOfCard":"A little Spaceship","uniqueID":460978094023,"health":6,"attack":6}]';
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
	this.activePlayerMove.SetEnemyHealth(this.GetInactivePlayer().GetHealth());
	this.activePlayerMove.SetBoardCards(this.activePlayer.GetCardsOnBoard());
	console.log(this.activePlayerMove);
}

Game.prototype.GetActivePlayerMove = function() {
	return this.activePlayerMove;
}

Game.prototype.GetActivePlayerMoveString = function() {
	var activePlayerMoveString = "[";
	for(var i = 0; i < this.activePlayer.GetCardsOnBoard().length; i++)
	{
		var jsonFormatObj = JSON.stringify(this.activePlayer.GetCardsOnBoard()[i].GetJSONObject());
		
		activePlayerMoveString += jsonFormatObj;
		if(i != this.activePlayer.GetCardsOnBoard().length - 1)
		{
			activePlayerMoveString += ",";
		}
		else
		{
			activePlayerMoveString += "]";
		}
	}
	return activePlayerMoveString;
}

Game.prototype.SetGameData = function(data) {
	this.previousPlayerMoveString = data;
}

Game.prototype.GetOpposingPlayerBoard = function(){
	var previousPlayerMoveJSONformat = JSON.parse(this.previousPlayerMoveString);
	var opposingPlayerBoard = [];
	var opPlayerCard;
	
	// check whether this is a unitCard
	var isUnitCard = false; 
	
	for(var i = 0; i < previousPlayerMoveJSONformat.length; i++)
	{
		isUnitcard = previousPlayerMoveJSONformat[i].hasOwnProperty("health") ? true : false;
		
		if(isUnitCard){
			opPlayerCard = new UnitCard();
		} else {
			opPlayerCard = new TrapCard();
		}
	
		opPlayerCard.nameOfCard = previousPlayerMoveJSONformat[i].nameOfCard;
		opPlayerCard.descriptionOfCard = previousPlayerMoveJSONformat[i].descriptionOfCard;
		opPlayerCard.uniqueID = previousPlayerMoveJSONformat[i].uniqueID;

		if(isUnitCard) {
			opPlayerCard.health = previousPlayerMoveJSONformat[i].health;
			opPlayerCard.attack = previousPlayerMoveJSONformat[i].attack;
		} else {
			opPlayerCard.type = previousPlayerMoveJSONformat[i].type;
			opPlayerCard.effect = previousPlayerMoveJSONformat[i].effect;
		}
		
		opposingPlayerBoard.push(opPlayerCard);
	}
	
	return opposingPlayerBoard;
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
	currentGame.GetOpposingPlayerBoard();
	// CallBack
	requestAnimationFrame(Update);
}



var currentGame = new Game();
currentGame.Init();
console.log(currentGame);
Update();