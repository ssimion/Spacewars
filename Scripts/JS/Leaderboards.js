$(function() {
    function DisplayLeaderboards() {
       startActivityForResult(getGamesClient().getLeaderboardIntent(leaderboard_wins), 1001);
    }
});