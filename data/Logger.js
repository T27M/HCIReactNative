import Db from './Db';

export default class Logger {
  static SCAN_EVENT_LOG = "scan_event_log.json";
  static READ_MORE_EVENT_LOG = "read_more_event_log.json";
  static HEAR_MORE_EVENT_LOG = "hear_more_event_log.json";
  static SEE_MORE_EVENT_LOG = "see_more_event_log.json";

  constructor() {
    throw new Error("Abstract class.");
  }

  async logEvent(eventType, userId, data) {
    data.user_id = userId; // User ID will always be 6
    data.created = Date.now();

    await Db.logEvent(eventType, data).then(() => {
      console.log("Event logged");
    }).catch((e) => {
      console.log(e)
    });
  }

  async getlog() {
    await Db.getlog().then((value) => {
      let _log = JSON.parse(value);

      // do something

    });
  }
}
