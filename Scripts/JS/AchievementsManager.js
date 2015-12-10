"use strict";
/**
 * @class AchievementLoad
 * @public
 */
var AchievementLoad = AchievementLoad || {};
/**
 * @memberOf AchievementLoad
 * @public
 */
AchievementLoad.achievements = {};
/**
 * @memberOf AchievementLoad
 * @public
 */
AchievementLoad.preloaded = false;

/**
 * @memberOf AchievementLoad
 * @public
 */
AchievementLoad.loadData = function() {
  var request = gapi.client.games.achievementDefinitions.list();
  request.execute(function(Info) {
    console.log('Achievement definitions', Info);
    if (Info.kind == 'games#achievementDefinitionsListResponse' &&
        Info.hasOwnProperty('items')) {
      for (var i =0; i<Info.items.length; i++) {
        AchievementLoad.achievements[Info.items[i].id] = Info.items[i];
        AchievementLoad.achievements[Info.items[i].id].achievementState = Info.items[i].initialState;
      }
      welcome.dataLoaded(welcome.ENUM_ACHIEVEMENT_DEFS);
      AchievementLoad.loadAchievementsEarnedByPlayer();

    }
  });
};
/**
 * @memberOf AchievementLoad
 * @public
 */
AchievementLoad.clearData = function() {
  AchievementLoad.achievements = {};
  AchievementLoad.preloaded = false;
};
/**
 * @memberOf AchievementLoad
 * @public
 */
AchievementLoad.loadAchievementsEarnedByPlayer = function() {
  var request = gapi.client.games.achievements.list({playerId: 'me'});
  request.execute(function(Info) {
    console.log('Your achievement data: ', Info);
    if (Info.kind == 'games#playerAchievementListResponse' &&
        Info.hasOwnProperty('items')) {
      for (var i=0; i<Info.items.length; i++) {
        var AchievementNext = Info.items[i];
        AchievementLoad.achievements[AchievementNext.id].achievementState = AchievementNext.achievementState;
        if (AchievementNext.hasOwnProperty('formattedCurrentStepsString')) {
          AchievementLoad.achievements[AchievementNext.id].formattedCurrentStepsString = AchievementNext.formattedCurrentStepsString;
        }
      }
      welcome.dataLoaded(welcome.ENUM_ACHIEVEMENT_PROGRESS);
    } else {
      console.log("**Unexpected response **", Info);
    }
  });

  AchievementLoad.preloaded = true;

};
/**
 * @memberOf AchievementLoad
 * @public
 */
AchievementLoad.getNameForId = function(Achievementid)
{
  return AchievementLoad.achievements[Achievementid].name;
};
/**
 * @memberOf AchievementLoad
 * @public
 */
AchievementLoad.submitProgress = function(Achievementid, amount)
{
  var request = gapi.client.games.achievements.increment(
      {achievementId: Achievementid,
      stepsToIncrement: amount}
  );
  request.execute(function(Info) {
    console.log('Data from incrementing achievement is ', Info);
    // Let's updated our locally cached version
    AchievementLoad.achievements[Achievementid].currentSteps = Info.currentSteps;
    AchievementLoad.achievements[Achievementid].formattedCurrentStepsString = String(Info.currentSteps);
    if (Info.newlyUnlocked ) {
      AchPopup.showAchievementWidget(Achievementid);
    } else {
      console.log('You either haven\'t unlocked ' + AchievementLoad.achievements[Achievementid].name
          + ' yet, or you unlocked it already.');
    }
  });
};
/**
 * @memberOf AchievementLoad
 * @public
 */
AchievementLoad.unlockAchievement = function(Achievementid)
{
  var request = gapi.client.games.achievements.unlock(
      {achievementId: Achievementid}
  );
  request.execute(function(Info) {
    console.log('Data from earning achievement is ', Info);
    if (Info.newlyUnlocked ) {
      AchPopup.showAchievementWidget(Achievementid);
      AchievementLoad.loadAchievementsEarnedByPlayer();
    } else {
      console.log('You unlocked ' + AchievementLoad.achievements[Achievementid].name + ' but you already unlocked it earlier.');
    }
  });

};
