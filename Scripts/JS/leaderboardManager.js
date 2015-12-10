"use strict";

/** Inits the leadManager Class
 * @class leadManager
 */
var leadManager = leadManager || {};
leadManager.preloaded = false;
leadManager.leaderboards = {};

/**
 * This function only loads up the leaderboard definitions. Not the scores
 * themselves
 * @memberOf leadManager
 * @public
 */
leadManager.preloadData = function () {
	var request = gapi.client.games.leaderboards.list();
	console.log("about to execute request");
	request.execute(function (response) {
		console.log('Leaderboard data', response);
		if (response.kind == 'games#leaderboardListResponse' &&
			response.hasOwnProperty('items')) {
			for (var i = 0; i < response.items.length; i++) {
				leadManager.leaderboards[response.items[i].id] = response.items[i];
			}
		}
		leadManager.preloaded = true;
		console.log("leadManager.preloaded true");
		//welcome.dataLoaded(welcome.ENUM_LEADERBOARDS);
	});
};
/**
 * This function clear the loads up the leaderboard definitions.
 * @memberOf leadManager
 * @public
 */
leadManager.clearData = function () {
	leadManager.leaderboards = {};
	leadManager.preloaded = false;
};
/**
 * This function clear the loads up the leaderboard definitions.
 * @memberOf leadManager
 * @param {integer} leadId : the Leaderboard Id
 * @return {object} LeaderBoard
 */
leadManager.getLeaderboardObject = function (leadId) {
	return leadManager.leaderboards[leadId];
};
/**
 * This function clear the loads up the leaderboard definitions.
 * @memberOf leadManager
 */
//leadManager.gotScore = function(receivedScore, difficulty, callback)
leadManager.gotScore = function () {
	var leaderboardId = 'CgkIup-kxJUFEAIQAQ';

	var request = gapi.client.games.scores.submit({
			leaderboardId : leaderboardId,
			score : 10
		});
	request.execute(function (response) {
		console.log('Data from submitting high score is ', response);
		var newWeeklyHighScore = false;
		if (response.hasOwnProperty('beatenScoreTimeSpans')) {
			for (var i = 0; i < response.beatenScoreTimeSpans.length; i++) {
				if (response.beatenScoreTimeSpans[i] == 'WEEKLY') {
					console.log('Hooray! New weekly high score!');
					newWeeklyHighScore = true;
					leaderboardWidget.show(leaderboardId);
				} else {}
			}
		}
		//callback(newWeeklyHighScore);
	});
};
