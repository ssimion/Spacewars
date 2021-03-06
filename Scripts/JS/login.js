"use strict";
/** Inits the login Class
 * @class login
 */
var login = login || {};

/**
 * This function allows us to load up the game service via the discovery doc
 * and makes calls directly through the client library instead of needing
 * to specify the REST endpoints.
 * @memberOf login
 * @public
 */
login.loadClient = function () {

	// Load up /games/v1
	gapi.client.load('games', 'v1', function (response) {
		leadManager.preloadData();
	});

	// Load up v1management
	gapi.client.load('gamesManagement', 'v1management', function (response) {
	});

	// Load up /plus/v1
	gapi.client.load('plus', 'v1', function (response) {
		console.log(response);
		var request = gapi.client.plus.people.list(
		{
			"collection": "visible",
			"userId": "me"
		});
		
		request.execute(function(response)
		{
			usersFriends = response.items
		});
	});

};
/**
 * @memberOf login
 * @public
 */
login.handleAuthResult = function (auth) {
	console.log('We are in handle auth result', auth);
	if (auth && auth.error == null) {
		console.log('Hooray! You\'re logged in! ', auth);
		$('#loginDiv').fadeOut();
		login.loadClient();
	} else {
		if (auth /*&& auth.hasOwnProperty('error')*/
		)
		{
			console.log('Login failed because: ', auth.error);
		}
		$('#loginDiv').fadeIn();
	}
};
/**
 * @memberOf login
 * @public
 */
login.showLoginDialog = function () {
	console.log('Trying not-so-silent auth');
	gapi.auth.signIn();
};
/**
 * @memberOf login
 * @public
 */
login.logout = function () {
	gapi.auth.signOut();
	achManager.clearData();
	friendsTable.clearData();
	leadManager.clearData();
	challenge.clearData();
	//player.clearData();
	//welcome.userSignOut();
	$('#loginDiv').fadeIn();
};
