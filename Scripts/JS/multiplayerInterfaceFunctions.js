
function onCreateMatchClicked(){
	opposingPlayerID = usersFriends[5].id;
	console.log(usersFriends);
	createTurnBasedMatch();
}	

function onJoinMatchClicked(){
	listActiveMatches();
	joinTurnBasedMatch(listGamesInvitedTo[0].matchId);
}

function onEndTurnClicked(){
	finishTurn(10); // TODO update this with the actual data on the board.
}
