import Db     from '../Db';

export default class Logger {
  static SCAN_EVENT_LOG       = "scan_event_log.json";
  static READ_MORE_EVENT_LOG  = "read_more_event_log.json";
  static HEAR_MORE_EVENT_LOG  = "hear_more_event_log.json";
  static SEE_MORE_EVENT_LOG   = "see_more_event_log.json";

  constructor() {
    throw new Error("Abstract class.");
  }

  logEvent(eventType, userId,  data) {
    data.user_id = userId;
    data.created = Date.now();

    // TODO make use Toms local storage
    // let log = Logger.getlog(eventType);
    // log.push(data);
    //fs.writeFileSync(eventType, JSON.stringify(log));

    console.log("Logging event " + JSON.stringify(data))
  }

  getlog(eventType) {
    // TODO make use Toms local storage
    // return JSON.parse(fs.readFileSync("./" + eventType));

    return [];
  }
}
