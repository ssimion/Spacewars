"use strict";

function onCreateMatchClicked(){
	opposingPlayerID = usersFriends[5].id;
	console.log(usersFriends);
	createTurnBasedMatch();
}	

function onJoinMatchClicked(){
	listActiveMatches();
	console.log(listGamesInvitedTo[0]);
	console.log(listGamesInvitedTo.matchId);
	joinTurnBasedMatch(listGamesInvitedTo[0].matchId);
}

function onEndTurnClicked(){
	finishTurn(10); // TODO update this with the actual data on the board.
}
