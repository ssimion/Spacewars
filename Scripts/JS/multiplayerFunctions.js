/** Contains all the functions needed for multiplayer
 */

 var listGamesInvitedTo = new Array();

 
 
 /** Function responsible for creation of the game on the server
  * @param {string} httpRequest : request that will be sent 
  * to the server by calling its execute function
  */
function createTurnBasedMatch() {
	currentPlayer = "p_1";
	opposingPlayer = "p_2";
	userMatchStatus = "working";

	var httpRequest = gapi.client.games.turnBasedMatches.create({
		"kind": "games#turnBasedMatchCreateRequest",
		"invitedPlayerIds": [opposingPlayerID],
		"requestID": Math.round(Math.random()) * 1000000000000 // a large, random, unsigned number
	});

	httpRequest.execute(function (matchCreationResponse) {
		console.log("Match created");
		console.log(matchCreationResponse);
		matchVersion = 1;
		matchID = matchCreationResponse.matchId;
		userMatchStatus = "USER_TURN";
	});
}

function listActiveMatches() {
	var httpRequest = gapi.client.games.turnBasedMatches.list();
	
	httpRequest.execute(function (matchListResponse) {
		var gamesCounter = 0;
		for (var i = 0; i < matchListResponse.items.length; i++){
			if (matchListResponse.items[i].userMatchStatus == "USER_INVITED"){
				listGamesInvitedTo[gamesCounter] = matchListResponse.items[i];
				gamesCounter++;
			}
		}
		
	});
}

function joinTurnBasedMatch(id) {
	currentPlayer = "p_2";
	opposingPlayer = "p_1";
	matchID = id;
	
	var httpRequest = gapi.client.games.turnBasedMatches.join({
		"matchId": id
	});

	httpRequest.execute(function (matchJoinResponse){
		console.log("Match joined");
		getMatchData();
	});
}

function getMatchData() {
	console.log("Getting the match data");
	userMatchStatus = "working";
	matchDataReceived = false;
	var httpRequest = gapi.client.games.turnBasedMatches.get(
	{
		"matchId": matchID,
		"includeMatchData": true
	});

	httpRequest.execute(function (matchDataResponse) {
		console.log("Match status: ", matchDataResponse.userMatchStatus);
		if (matchDataResponse.userMatchStatus == "USER_TURN") {
			userMatchStatus = "USER_TURN";
			console.log("User took a turn");
			matchVersion = matchDataResponse.matchVersion;
		}
		matchDataReceived = true;
	});
}

function finishTurn(dataToSend) {
	userMatchStatus = "working";
	var httpRequest = gapi.client.games.turnBasedMatches.takeTurn(
	{ 
		"matchId": matchID 
	},
	{
		"kind": "games#turnBasedMatchTurn",
		"data":
		{
			"kind": "games#turnBasedMatchDataRequest",
			"data": btoa(dataToSend)
		},
		"pendingParticipantId": opposingPlayer,
		"matchVersion": matchVersion,
	});
		
	httpRequest.execute(function (takeTurnResponse) {
		console.log("a turn was taken");
		userMatchStatus = "USER_AWAITING_TURN";
		console.log(takeTurnResponse);
	});
}

function cancelMatch(id) {
	var httpRequest = gapi.client.games.turnBasedMatches.cancel(
	{
		"matchId": id
	});

	httpRequest.execute(function (cancelMatchResponse) {
		console.log(cancelMatchResponse);
		console.log("Match cancelled");
	});
}