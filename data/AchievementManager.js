import Logger from './Logger';
import Db     from './Db';
import {
  ToastAndroid
} from 'react-native';

export default class AchievementManager {
  constructor() {
    throw new Error("Abstract class.");
  }

  static async logEvent(userId, locationId, eventType) {
    let data = {
      locationId: locationId
    };

    await Logger.logEvent(eventType, userId, data);
  }

  static async hasUserAchievedAchievement(userId, achievementId) {
    let userAchievements = await Db.getUserAchievements();

    let achieved = false;
    userAchievements.forEach((userAchievement) => {
      if (userAchievement.user_id === userId && userAchievement === achievementId) {
        achieved = true;
      }
    });

    return achieved;
  }

  static async markUserAchievedAchievement(userId, achievement) {
    let userAchievement = {
      user_id: userId,
      achievement_id: achievement.id
    };

    await Db.addUserAchievement(userAchievement);

    await Db.addPointsToUser(userId, achievement.difficulty).then(() => {
      ToastAndroid.show('Points added...', ToastAndroid.SHORT);
    });
  }

  static async checkForAchievement(userId, eventType, achievementType) {
    let locations             = Db.getLocations();
    let achievements          = await Db.getAchievements();
    let log                   = await Logger.getlog(eventType);
    let achievedAchievements  = [];

    for (key in achievements) {
      let achievement       = achievements[key];
      let required_loc      = achievement.count_required == "all"
                                          ? locations.length
                                          : achievement.count_required;

      let eventLocations    = [];

      if (achievement.type === achievementType && !(await AchievementManager.hasUserAchievedAchievement(userId, achievement.id))) {
        log.forEach((event) => {
          let condition =    event.user_id === userId
                          && (
                                achievement.allowed_locations === "any"
                            ||  achievement.allowed_locations.includes(event.locationId)
                          )
                          && !eventLocations.includes(event.locationId);

          if (condition) {
            eventLocations.push(event.locationId);
          }
        });

        if (eventLocations.length >= required_loc) {
          AchievementManager.markUserAchievedAchievement(userId, achievement)
          achievedAchievements.push(achievement.id);
        }
      }
    };

    return achievedAchievements.length > 0 ? achievedAchievements : false;
  }

  static async checkForScanAchievement(userId, locationId) {
    await AchievementManager.logEvent(userId, locationId, Logger.SCAN_EVENT_LOG);

    return await AchievementManager.checkForAchievement(userId, Logger.SCAN_EVENT_LOG, "scan");
  }

  static async checkForReadMoreAchievement(userId, locationId) {
    await AchievementManager.logEvent(userId, locationId, Logger.READ_MORE_EVENT_LOG);

    return await AchievementManager.checkForAchievement(userId, Logger.SCAN_EVENT_LOG, "read_more");
  }

  static async checkForHearMoreAchievement(userId, locationId) {
    await AchievementManager.logEvent(userId, locationId, Logger.HEAR_MORE_EVENT_LOG);

    return await AchievementManager.checkForAchievement(userId, Logger.SCAN_EVENT_LOG, "hear_more");
  }

  static async checkForSeeMoreAchievement(userId, locationId) {
    await AchievementManager.logEvent(userId, locationId, Logger.SEE_MORE_EVENT_LOG);

    return await AchievementManager.checkForAchievement(userId, Logger.SCAN_EVENT_LOG, "see_more");
  }
}
