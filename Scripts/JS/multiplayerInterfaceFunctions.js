
function onCreateMatchClicked(){
	opposingPlayerID = usersFriends[0].id;
	createTurnBasedMatch();
}	

function onJoinMatchClicked(){
	joinTurnBasedMatch(listGamesInvitedTo[0].matchId);
}

function onEndTurnClicked(){
	finishTurn(10); // TODO update this with the actual data on the board.
}
