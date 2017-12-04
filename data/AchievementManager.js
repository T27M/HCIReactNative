import Logger from './Logger';
import Db     from './Db';

export default class AchievementManager {
  constructor() {
    throw new Error("Abstract class.");
  }

  static logEvent(userId, locationId, eventType) {
    let data = {
      locationId: locationId
    };
    Logger.logEvent(eventType, userId, data);
  }

  static hasUserAchievedAchievement(userId, achievementId) {
    let userAchievements = Db.getUserAchievements();

    let achieved = false;
    userAchievements.forEach((userAchievement) => {
      if (userAchievement.user_id === userId && userAchievement === achievementId) {
        achieved = true;
      }
    });

    return achieved;
  }

  static markUserAchievedAchievement(userId, achievementId) {
    let userAchievement = {
      user_id: userId,
      achievement_id: achievementId
    };

    Db.addUserAchievement(userAchievement);
  }

  static checkForAchievement(eventType, achievementType) {
    let locations             = Db.getLocations();
    let achievements          = Db.getAchievements();
    let achievedAchievements  = [];

    achievements.forEach((achievement) => {
      let required_loc      = achievement.count_required == "all"
                                          ? locations.length
                                          : achievement.count_required;


      let log               = Logger.getlog(eventType);
      let locations = [];

      if (achievement.type === achievementType && !AchievementManager.hasUserAchievedAchievement(userId, achievement.id)) {
        log.forEach((event) => {
          let condition =    event.user_id === userId
                          && (
                                achievement.allowed_locations === "any"
                            ||  achievement.allowed_locations.includes(event.locationId)
                          )
                          && !locations.includes(event.locationId);

          if (condition) {
            locations.push(event.locationId);
          }
        });

        if (locations.length >= required_loc) {
          AchievementManager.markUserAchievedAchievement(userId, achievement.id)
          achievedAchievements.push(achievement.id);
        }
      }
    });

    return achievedAchievements.length > 0 ? achievedAchievements : false;
  }

  static checkForScanAchievement(userId, locationId) {
    AchievementManager.logEvent(userId, locationId, Logger.SCAN_EVENT_LOG);

    return AchievementManager.checkForAchievement(Logger.SCAN_EVENT_LOG, "scan");
  }

  static checkForReadMoreAchievement(userId, locationId) {
    AchievementManager.logEvent(userId, locationId, Logger.READ_MORE_EVENT_LOG);

    return AchievementManager.checkForAchievement(Logger.SCAN_EVENT_LOG, "read_more");
  }

  static checkForHearMoreAchievement(userId, locationId) {
    AchievementManager.logEvent(userId, locationId, Logger.HEAR_MORE_EVENT_LOG);

    return AchievementManager.checkForAchievement(Logger.SCAN_EVENT_LOG, "hear_more");
  }

  static checkForSeeMoreAchievement(userId, locationId) {
    AchievementManager.logEvent(userId, locationId, Logger.SEE_MORE_EVENT_LOG);

    return AchievementManager.checkForAchievement(Logger.SCAN_EVENT_LOG, "see_more");
  }
}
