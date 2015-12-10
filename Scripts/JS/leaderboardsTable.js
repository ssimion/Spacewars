"use strict";
/** Inits the leadManager Class
 * @class leaderboardsTable
 */
var leaderboardsTable = leaderboardsTable || {};
/**
 * @memberOf leaderboardsTable
 * @public 
 */
leaderboardsTable.showAllLeaderboards = function () {
	console.log("inside showAllLeaderboards");
	leaderboardsTable.clearOut();
	if (leadManager.preloaded) {
		console.log("leadManager.preloaded true");
		$.each(leadManager.leaderboards, function (id, leadObject) {
			var $leaderboardRow = leaderboardsTable.buildLeaderboardsRowFromData(leadObject);
			console.log("built leaderboard from data");
			$leaderboardRow.appendTo($('#leaderboardsTable tbody'));
		});
		$('#leaderboards').fadeIn();
	}
	$('#pageHeader').text('Leaderboards');
};
/**
 * @memberOf leaderboardsTable
 * @public 
 */
leaderboardsTable.buildLeaderboardsRowFromData = function (leadObj) {
	var $tableRow = $('<tr></tr>');
	var leaderboardIcon = (leadObj.iconUrl) ? leadObj.iconUrl : 'img/genericLeaderboard.png';
	var $iconCell = $('<td></td>')
		.append($('<img />')
			.prop('src', leaderboardIcon).addClass('medIcon'));
	var $nameCell = $('<td></td>').text(leadObj.name);
	var $viewButtonCell = $('<td></td>')
		.append($('<input type="button" />')
			.prop('value', 'View')
			.click(function () {
				leaderboardsTable.selectLeaderboard(leadObj.id)
			}));
	$tableRow.append($iconCell).append($nameCell).append($viewButtonCell);

	return $tableRow;
};
/**
 * @memberOf leaderboardsTable
 * @public 
 */
leaderboardsTable.selectLeaderboard = function (leaderboardId) {
	$('#leaderboards').hide();
	leaderboardTable.showLeaderboard(leaderboardId, leaderboardTable.BACK_TO_ALL_LEADERBOARDS);

};
/**
 * @memberOf leaderboardsTable
 * @public 
 */
leaderboardsTable.clearOut = function () {
	$('#leaderboardsTable tbody').html('');
};
/**
 * @memberOf leaderboardsTable
 * @public 
 */
leaderboardsTable.goBack = function () {
	$('#leaderboards').fadeOut();
	//welcome.loadUp();
};
