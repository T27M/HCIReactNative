import Db from './Db';
import AchievementManager from './AchievementManager';

import {
  AsyncStorage
} from 'react-native';

export default class Logger {
  static LOG_KEY            = "logs";

  static UNKNOWN_EVENT      = "unknown_event";
  static SCAN_EVENT         = "scan_event";
  static BUTTON_PRESS_EVENT = "button_press_event";
  static FOCUS_EVENT        = "focus_event";
  static DB_INSERT          = "db_insert";
  static DB_UPDATE          = "db_update";

  constructor() {
    throw new Error("Abstract class.");
  }

  static async logEvent(eventType, data, userId = undefined) {
    data.eventType = eventType;
    data.user_id   = userId === undefined ? Db.getCurrentUserId() : userId;
    data.created   = Date.now();

    let log = await Logger.getlog();

    if (log === null)
      log = [];

    log.push(data);

    await AsyncStorage.setItem(Logger.LOG_KEY, JSON.stringify(log)).then(() => {
      console.log("Event Logged: " + JSON.stringify(data));
    });
  }

  static async getlog() {
    return JSON.parse(await AsyncStorage.getItem(Logger.LOG_KEY));
  }

  static async clear() {
    await AsyncStorage.setItem(Logger.LOG_KEY, JSON.stringify([]));
    console.log("Log Cleared");
  }
}
