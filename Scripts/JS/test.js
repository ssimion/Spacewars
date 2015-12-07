"use strict";

/** Test Every Class Method of the Player Class
 */
var TestPlayerClass = function () {
	var TestPlayer = new Player("TestPlayer");
	console.log(TestPlayer.GetName() !== "TestPlayer" ? "%c GetName() isn't working properly" : "%c GetName() is working properly", TestPlayer.GetName() !== "TestPlayer" ? "color:red" : "color:green");
	TestStatement(TestPlayer.GetHealth() !== 100, "GetHealth()");
	TestPlayer.SetHealth(200);
	TestStatement(TestPlayer.GetHealth() !== 200, "SetHealth()");
	TestPlayer.AddHealth(5);
	TestStatement(TestPlayer.GetHealth() !== 205, "AddHealth()");
	TestPlayer.RemoveHealth(5);
	TestStatement(TestPlayer.GetHealth() !== 200, "RemoveHealth()");
	TestStatement(TestPlayer.GetNumberOfCardsInHand() !== 0, "GetNumberOfCardsInHand()");
	var TestUnitCard = new UnitCard();
	TestPlayer.AddCardsToHand(TestUnitCard)
	TestStatement(TestPlayer.GetNumberOfCardsInHand() !== 1, "AddCardToHand()");
	TestPlayer.RemoveCardsFromHand(TestUnitCard)
	TestStatement(TestPlayer.GetNumberOfCardsInHand() !== 0, "RemoveCardsFromHand()");
	console.log(" All tests for the player class have passed ! :)");
}
/** Test Every Class Method of the Player Class
 * @TODO : Implement tests for the deck class
 */
var TestDeckClass = function () {
	var TestDeck = new Deck();
}
var IsShuffled = function (array1,array2) {}
var TestGameClass = function () {
	var TestGame = new Game();
	TestStatement(TestGame.GetCurrentTurn()  !== 0, "GetCurrentTurn()");
	TestGame.NextTurn()
	TestStatement(TestGame.GetCurrentTurn()  !== 1, "NextTurn()");
	console.log(" All tests for the Game class have passed ! :)");
}

/** Test Every Class Method of the Card Class
 */
var TestCardClass = function () {
	var TestUnitCard = new UnitCard();
	TestStatement(TestUnitCard.toString() !== '[UnitCard "' + TestUnitCard.health + '"]', "toString");
	TestStatement(TestUnitCard.GetHealth() !== 0, "GetHealth()");
	console.log(" All tests for the Unit class have passed ! :)");
}

/** Test if a specific statement is true
 * @return {boolean} statement : The statement to check
 */
var TestStatement = function(statement, functionName)
{
	console.log(statement ? "%c "+ functionName +" isn't working properly" : "%c "+ functionName +" is working properly", statement ? "color:red" : "color:green");
	return statement;
}
/** Test Every Class Method of the Player Class
 * @TODO : Implement tests for the game class
 */
TestPlayerClass();
TestDeckClass();
TestGameClass();
TestCardClass();
