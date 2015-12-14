"use strict";
/** Handle the event when pressing the "Create Match" button
 * and sends the turn data.
 */
function onCreateMatchClicked(){
	DisplayFriendList();
	console.log(usersFriends);
}	
/** Handle the event when pressing the "Join Match" button
 * and sends the turn data.
 */
function onJoinMatchClicked(){
	listActiveMatches();
	console.log(listGamesInvitedTo[0]);
	console.log(listGamesInvitedTo.matchId);
	joinTurnBasedMatch(listGamesInvitedTo[0].matchId);
}
/** Handle the event when pressing the "End Turn" button
 * and sends the turn data.
 * @todo  update this with the actual data on the board.
 */
function onEndTurnClicked(){
	finishTurn(currentGame.GetActivePlayerMoveString());
}
