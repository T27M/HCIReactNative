import Db     from './Db';

import {
  AsyncStorage
} from 'react-native';

export default class Logger {
  static SCAN_EVENT_LOG       = "scan_event_log";
  static READ_MORE_EVENT_LOG  = "read_more_event_log";
  static HEAR_MORE_EVENT_LOG  = "hear_more_event_log";
  static SEE_MORE_EVENT_LOG   = "see_more_event_log";

  constructor() {
    throw new Error("Abstract class.");
  }

  static async logEvent(eventType, userId,  data) {
    data.user_id = userId;
    data.created = Date.now();

    let log = await Logger.getlog(eventType);

    if (log === null)
      log = [];
      
    log.push(data);

    console.log("Logging event " + JSON.stringify(data))

    await AsyncStorage.setItem(eventType, JSON.stringify(log)).then(() => {
      console.log("Event Logged");
    });
  }

  static async getlog(eventType) {
    return JSON.parse(await AsyncStorage.getItem(eventType));
  }
}
