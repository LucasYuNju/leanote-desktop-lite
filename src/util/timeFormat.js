import moment from 'moment';

export function fromNow(startDate) {
	if (typeof startDate === 'string') {
		startDate = new Date(startDate);
	}
  const durationMillis = new Date().getTime() - startDate.getTime();
  const duration = moment.duration(durationMillis);
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
