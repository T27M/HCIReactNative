import Db     from './Db';
import {
  ToastAndroid
} from 'react-native';

export default class AchievementManager {
  static SCAN_EVENT            = "scan_event";
  static SCAN_ACHIEVEMENT      = "scan";

  static READ_MORE_EVENT       = "read_more_event";
  static READ_MORE_ACHIEVEMENT = "read_more";

  static HEAR_MORE_EVENT       = "hear_more_event";
  static HEAR_MORE_ACHIEVEMENT = "hear_more";

  static SEE_MORE_EVENT        = "see_more_event";
  static SEE_MORE_ACHIEVEMENT  = "see_more";

  constructor() {
    throw new Error("Abstract class.");
  }

  static async logEvent(userId, locationId, eventType) {
    let data = {
      locationId: locationId
    };

    await Db.logUserAchievementEvent(eventType, userId, data);
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
    let log                   = await Db.getUserAchievementEventLog();

    log = log.filter(event => event.event_type === eventType);

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
          achievedAchievements.push(achievement);
        }
      }
    };

    return achievedAchievements.length > 0 ? achievedAchievements : false;
  }

  static async checkForScanAchievement(userId, locationId) {
    await AchievementManager.logEvent(userId, locationId, AchievementManager.SCAN_EVENT);

    return await AchievementManager.checkForAchievement(userId, AchievementManager.SCAN_EVENT, AchievementManager.SCAN_ACHIEVEMENT);
  }

  static async checkForReadMoreAchievement(userId, locationId) {
    await AchievementManager.logEvent(userId, locationId, AchievementManager.READ_MORE_EVENT);

    return await AchievementManager.checkForAchievement(userId, AchievementManager.READ_MORE_EVENT, AchievementManager.READ_MORE_ACHIEVEMENT);
  }

  static async checkForHearMoreAchievement(userId, locationId) {
    await AchievementManager.logEvent(userId, locationId, AchievementManager.HEAR_MORE_EVENT);

    return await AchievementManager.checkForAchievement(userId, AchievementManager.HEAR_MORE_EVENT, AchievementManager.HEAR_MORE_ACHIEVEMENT);
  }

  static async checkForSeeMoreAchievement(userId, locationId) {
    await AchievementManager.logEvent(userId, locationId, AchievementManager.SEE_MORE_EVENT);

    return await AchievementManager.checkForAchievement(userId, AchievementManager.SEE_MORE_EVENT, AchievementManager.SEE_MORE_ACHIEVEMENT);
  }
}
