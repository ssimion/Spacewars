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
 */
var TestDeckClass = function () {
	var TestDeck = new Deck();
	var array1 = TestDeck.GetCardList();
	TestStatement(!array1,"GetCardList()");
	TestDeck.Shuffle();
	var array2 = TestDeck.GetCardList();
	TestStatement(!IsShuffled(array1,array2),"Shuffle()");
	console.log(" All tests for the Deck class have passed ! :)");
}
/** Test if two decks are different (They should be the same size)
 * @param array1 : first array
 * @param array2 : second array
 * @return {boolean}: false if array is shuffled
 */
var IsShuffled = function (array1,array2) {
	// @failsafe Return the shortest length to prevent overflow anyways.
	var length = array1.length < array2.length ? array1.length : array2.length;  
	for(var i = 0 ;i < length; ++i) {
		if(array1[i] !== array2[i])
			return false;
	}
	return true;
}
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
	TestStatement(TestUnitCard.GetAttack() !== 1, "GetAttack()");
	TestStatement(TestUnitCard.GetNameOfCard() !== "Spaceship", "GetNameOfCard()");
	TestStatement(TestUnitCard.GetCardCost() !== 1, "GetCardCost()");
	TestStatement(TestUnitCard.GetCardDescription() !== "A little Spaceship", "GetCardDescription()");
	console.log(" All tests for the UnitCard class have passed ! :)");
	var TestTrapCard = new TrapCard();
	TestStatement(TestTrapCard.toString() !== '[TrapCard "' + TestTrapCard.health + '"]', "toString");
	TestStatement(TestTrapCard.GetType() !== "damage", "GetType()");
	TestStatement(TestTrapCard.GetDamage() !== 5, "GetDamage()");
	TestStatement(TestTrapCard.GetCardCost() !== 1, "GetCardCost()");
	TestStatement(TestTrapCard.GetCardDescription() !== "", "GetCardDescription()");
	TestStatement(TestTrapCard.GetNameOfCard() !== "", "GetNameOfCard()");
	console.log(" All tests for the TrapCard class have passed ! :)");
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
 */
TestPlayerClass();
TestDeckClass();
TestGameClass();
TestCardClass();
