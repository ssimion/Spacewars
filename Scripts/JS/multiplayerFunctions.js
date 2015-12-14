"use strict";

/** Contains all the functions needed for multiplayer
 */

var listGamesInvitedTo = new Array();
var matchDataReceived = true;
var currentPlayer = "";
var opposingPlayer = "";
var opposingPlayerID = "";
var matchVersion = 0;
var matchID = 0;
var usersFriends = new Array();

/** Function responsible for creation of the game on the server
 * @param {string} httpRequest : request that will be sent
 * to the server by calling its execute function
 */
function createTurnBasedMatch() {
	currentPlayer = "p_1";
	opposingPlayer = "p_2";
	userMatchStatus = "working";

	var httpRequest = gapi.client.games.turnBasedMatches.create({
			"kind" : "games#turnBasedMatchCreateRequest",
			"invitedPlayerIds" : [opposingPlayerID],
			"requestID" : Math.round(Math.random() * 1000000000000) // a large, random, unsigned number
		});

	httpRequest.execute(function (matchCreationResponse) {
		console.log("Match created");
		console.log(matchCreationResponse);
		matchVersion = 1;
		matchID = matchCreationResponse.matchId;
		userMatchStatus = "USER_TURN";
	});
}
/** This function gets the list of the Active matches hosted
 * by the Google play Services.
 */
function listActiveMatches() {
	var httpRequest = gapi.client.games.turnBasedMatches.list();

	httpRequest.execute(function (matchListResponse) {
		var gamesCounter = 0;
		for (var i = 0; i < matchListResponse.items.length; i++) {
			if (matchListResponse.items[i].userMatchStatus == "USER_INVITED") {
				listGamesInvitedTo[gamesCounter] = matchListResponse.items[i];
				gamesCounter++;
			}
		}

	});
}
/** Join a turned base match via ID
 * @param {integer} id : id of the match
 */
function joinTurnBasedMatch(id) {
	currentPlayer = "p_2";
	opposingPlayer = "p_1";
	matchID = id;

	var httpRequest = gapi.client.games.turnBasedMatches.join({
			"matchId" : id
		});

	httpRequest.execute(function (matchJoinResponse) {
		console.log("Match joined");
		getMatchData();
	});
}
/** This function gets the data from the other player.
 */
function getMatchData() {
	console.log("Getting the match data");
	//userMatchStatus = "working";
	matchDataReceived = false;
	var httpRequest = gapi.client.games.turnBasedMatches.get({
			"matchId" : matchID,
			"includeMatchData" : true
		});

	httpRequest.execute(function (matchDataResponse) {
		console.log("Match status: ", matchDataResponse.userMatchStatus);
		if (matchDataResponse.userMatchStatus == "USER_TURN") {
			userMatchStatus = "USER_TURN";
			console.log("User took a turn");
			matchVersion = matchDataResponse.matchVersion;
			currentGame.SetGameData(atob(matchDataResponse.data.data));
			currentGame.DrawEnemySlots();
		}
		matchDataReceived = true;
	});
}
/** This function is called at each end of turn.
 */
function finishTurn(dataToSend) {
	// Keep Track of the game Advancement.
	currentGame.NextTurn();
	userMatchStatus = "working";
	var httpRequest = gapi.client.games.turnBasedMatches.takeTurn({
			"matchId" : matchID
		}, {
			"kind" : "games#turnBasedMatchTurn",
			"data" : {
				"kind" : "games#turnBasedMatchDataRequest",
				"data" : btoa(dataToSend)
			},
			"pendingParticipantId" : opposingPlayer,
			"matchVersion" : matchVersion,
		});

	httpRequest.execute(function (takeTurnResponse) {
		console.log("a turn was taken");
		userMatchStatus = "USER_AWAITING_TURN";
		console.log(takeTurnResponse);
		currentGame.turnNumber = takeTurnResponse.matchVersion;
	});
}
/** Quit a match via ID
 * @param {integer} id : id of the match
 */
function cancelMatch(id) {
	var httpRequest = gapi.client.games.turnBasedMatches.cancel({
			"matchId" : id
		});

	httpRequest.execute(function (cancelMatchResponse) {
		console.log(cancelMatchResponse);
		console.log("Match cancelled");
	});
}