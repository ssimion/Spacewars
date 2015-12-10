"use strict";
/**
 * @class AchPopup
 * @public
 */
var AchPopup = AchPopup || {};
/**
 * @memberOf AchPopup
 * @public
 */
AchPopup.showAchievementWidget = function AchWidgetPopup(Achievementid)
{
  // Let's populate the little widget
  var PopupUnlock = $('#PopupUnlock');
  PopupUnlock.find('img').prop('src', achManager.achievements[Achievementid].unlockedIconUrl);
  PopupUnlock.find('#achName').text(achManager.achievements[Achievementid].name);
  PopupUnlock.find('#achDescrip').text(achManager.achievements[Achievementid].description);
  PopupUnlock.css({'top': '300px', 'opacity': '1.0'});
  PopupUnlock.show();
  PopupUnlock.delay(1000).animate({top: 60, opacity: 0.2}, 500, function() {
  PopupUnlock.hide();
  });
};