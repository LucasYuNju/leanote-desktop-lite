import moment from 'moment';

class TimeFormatUtil {
  static fromNow(startDate) {
    const durationMillis = new Date().getTime() - startDate.getTime();
    const duration = moment.duration(durationMillis);
    console.log(typeof duration.days(), duration.days());
    if (duration.days() === 0) {
      return 'today';
    }
    else if (duration.days() === 1) {
      return 'yesterday';
    }
    else {
      return moment(startDate).format('MM/DD/YY');
    }
  }
}

export default TimeFormatUtil;
