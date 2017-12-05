import Db from './Db';
import AchievementManager from './AchievementManager';

import {
  AsyncStorage
} from 'react-native';

export default class Logger {
  static LOG_KEY          = "logs";

  static SCAN_EVENT            = "scan_event";
  static READ_MORE_EVENT       = "read_more_event";
  static HEAR_MORE_EVENT       = "hear_more_event";
  static SEE_MORE_EVENT        = "see_more_event";

  constructor() {
    throw new Error("Abstract class.");
  }

  static async logEvent(eventType, userId,  data) {
    data.user_id = userId;
    data.created = Date.now();

    let log = await Logger.getlog();

    if (log === null)
      log = [];

    log.push(data);

    console.log("Logging event " + JSON.stringify(data))

    await AsyncStorage.setItem(Logger.LOG_KEY, JSON.stringify(log)).then(() => {
      console.log("Event Logged");
    });
  }

  static async getlog() {
    return JSON.parse(await AsyncStorage.getItem(Logger.LOG_KEY));
  }
}
