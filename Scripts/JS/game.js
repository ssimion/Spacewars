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
	this.hasChosenAnOpponent = false;
	this.activePlayer = this.PlayerArray[0];
	this.activePlayerMove = new Move();
	// hardcoding for testing purposes
    this.previousPlayerMoveString = '';

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
		DrawCardInHand(this.activePlayer.GetCardsInHand()[i],i,"#HandCards",true);
	}
}
/** Return true if the player has chosen an opponent.
 * @memberOf Game
 * @public
 */
Game.prototype.HasChosenAnOpponent = function() {
	return this.hasChosenAnOpponent;
}
/** Return true if the player has chosen an opponent.
 * @memberOf Game
 * @public
 */
Game.prototype.ChoosedAnOpponent = function(value) {
	this.hasChosenAnOpponent = value;
}
/** This function switch between the players.
 * @memberOf Game
 * @public
 */
Game.prototype.NextTurn = function () {
	if (this.turnNumber % 2 == 0)
	{
		this.activePlayer.moves = 1;
	}
	this.activePlayerMove.SetEnemyHealth(this.GetInactivePlayer().GetHealth());
	this.activePlayerMove.SetBoardCards(this.activePlayer.GetCardsOnBoard());
	this.DrawEnemySlots();
	console.log(this.activePlayerMove);
	
}
/** This function returns what happened during the turn
 * @memberOf Game
 * @public
 */
Game.prototype.GetActivePlayerMove = function() {
	return this.activePlayerMove;
}
/** This function draws the enemy cards
 * @memberOf Game
 * @public
 */
Game.prototype.DrawEnemySlots = function(){	
	$(document).ready(function () {
		$("#EnemyCards").empty();
	});
	if (this.GetOpposingPlayerBoard().length != null && this.GetOpposingPlayerBoard().length > 0){
		for (var i = 0; i < this.GetOpposingPlayerBoard().length;++i){
			DrawCardInHand( this.GetOpposingPlayerBoard()[i],i,"#EnemyCards",false);
		}		
		for (var i = 0; i < 3 - this.GetOpposingPlayerBoard().length;++i){
			$(document).ready(function () {
				$("#EnemyCards").append(
					"<div id='EnemySlot3' class='ui-widget-header'>" +
					"	<p>&nbsp;</p>" +
					"</div>" 
				);
			});
		}
	}else{
		for (var i = 0; i < 3;++i){
			$(document).ready(function () {
				$("#EnemyCards").append(
					"<div id='EnemySlot3' class='ui-widget-header'>" +
					"	<p>&nbsp;</p>" +
					"</div>" 
				);
			});
		}
	}
}	
/** This function returns the active player's action
 * @memberOf Game
 * @public
 */
Game.prototype.GetActivePlayerMoveString = function() {
	var healthString = "{\"health\":" + currentGame.GetInactivePlayer().GetHealth() + ", \"cards\":";
	var activePlayerMoveString = healthString + "[";
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
			activePlayerMoveString += "]}";
		}
	}
	return activePlayerMoveString;
}
/** This function sets the game data
 * @memberOf Game
 * @public
 */
Game.prototype.SetGameData = function(data) {
	this.previousPlayerMoveString = data;
}
/** This function creates a Card Array that contains the enemy cards 
 * @memberOf Game
 * @public
 */
Game.prototype.GetOpposingPlayerBoard = function(){
	if (this.previousPlayerMoveString == ""){
		return;
	}else{
		var previousPlayerMoveJSONformat = JSON.parse(this.previousPlayerMoveString);
		currentGame.activePlayer.SetHealth(previousPlayerMoveJSONformat.health);
		var opposingPlayerBoard = [];
		var opPlayerCard;

		// check whether this is a unitCard
		var isUnitCard = false; 
		
		for(var i = 0; i < previousPlayerMoveJSONformat.cards.length; i++)
		{
			isUnitCard = previousPlayerMoveJSONformat.cards[i].hasOwnProperty("health") ? true : false;
			
			if(isUnitCard){
				opPlayerCard = new UnitCard();
			} else {
				opPlayerCard = new TrapCard();
			}
		
			opPlayerCard.nameOfCard = previousPlayerMoveJSONformat.cards[i].nameOfCard;
			opPlayerCard.descriptionOfCard = previousPlayerMoveJSONformat.cards[i].descriptionOfCard;
			opPlayerCard.uniqueID = previousPlayerMoveJSONformat.cards[i].uniqueID;

			if(isUnitCard) {
				opPlayerCard.health = previousPlayerMoveJSONformat.cards[i].health;
				opPlayerCard.attack = previousPlayerMoveJSONformat.cards[i].attack;
			} else {
				opPlayerCard.type = previousPlayerMoveJSONformat.cards[i].type;
				opPlayerCard.effect = previousPlayerMoveJSONformat.cards[i].effect;
			}
			
			opposingPlayerBoard.push(opPlayerCard);
		}
		
		return opposingPlayerBoard;
	}
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
/** This function stores the old data to prevent useless refresh.
 * @memberOf Game
 * @public
 */
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
	
	//setTimeout(getMatchData, 5000);
	
	if ((userMatchStatus == "USER_AWAITING_TURN" /*|| userMatchStatus == "working")*/) && matchDataReceived){
		getMatchData(); 
	}
	// CallBack
	requestAnimationFrame(Update);
}

var currentGame = new Game();
currentGame.Init();
console.log(currentGame);
Update();