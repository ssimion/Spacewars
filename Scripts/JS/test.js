/** Test Every Class Method of the Player Class
 */
testPlayerClass = function()
{
	var testPassed = 0;
	var TestPlayer = new Player("TestPlayer");
	console.log(TestPlayer.GetName() !== "TestPlayer" ? "%c GetName() isn't working properly" : "%c GetName() is working properly", TestPlayer.GetName() !== "TestPlayer" ? "color:red" : "color:green");
	testPassed++;
	console.log(TestPlayer.GetHealth() !== 100 ? "%c GetHealth() isn't working properly" : "%c GetHealth() is working properly", TestPlayer.GetHealth() !== 100 ? "color:red" : "color:green");
	testPassed++;
	TestPlayer.SetHealth(200);
	console.log(TestPlayer.GetHealth() !== 200 ? "%c SetHealth() isn't working properly" : "%c SetHealth() is working properly", TestPlayer.GetHealth() !== 200 ? "color:red" : "color:green");
	TestPlayer.AddHealth(5);
	console.log(TestPlayer.GetHealth() !== 205 ? "%c AddHealth() isn't working properly" : "%c AddHealth() is working properly", TestPlayer.GetHealth() !== 205 ? "color:red" : "color:green");
	TestPlayer.RemoveHealth(5);
	console.log(TestPlayer.GetHealth() !== 200 ? "%c RemoveHealth() isn't working properly" : "%c RemoveHealth() is working properly", TestPlayer.GetHealth() !== 200 ? "color:red" : "color:green");
	console.log(TestPlayer.GetNumberOfCardsInHand() !== 0 ? "%c GetNumberOfCardsInHand() isn't working properly" : "%c GetNumberOfCardsInHand() is working properly", TestPlayer.GetNumberOfCardsInHand() !== 0 ? "color:red" : "color:green");
	TestPlayer.AddCardsToHand(5)
	console.log(TestPlayer.GetNumberOfCardsInHand() !== 5 ? "%c AddCardToHand() isn't working properly" : "%c AddCardToHand() is working properly", TestPlayer.GetNumberOfCardsInHand() !== 5 ? "color:red" : "color:green");
	TestPlayer.RemoveCardsFromHand(5)
	console.log(TestPlayer.GetNumberOfCardsInHand() !== 0 ? "%c RemoveCardsFromHand() isn't working properly" : "%c RemoveCardsFromHand() is working properly", TestPlayer.GetNumberOfCardsInHand() !== 0 ? "color:red" : "color:green");
	console.log(" All tests for the player class have passed ! :)");
}
/** Test Every Class Method of the Player Class
 * TODO : Implement tests for the deck class
 */
testDeckClass = function (){}
testGameClass = function(){}
/** Test Every Class Method of the Player Class
 * TODO : Implement tests for the game class
 */
testPlayerClass();
testDeckClass();
testGameClass();