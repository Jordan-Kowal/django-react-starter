import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.extend(weekOfYear);
dayjs.locale('fr');

dayjs.updateLocale('fr', {
  calendar: {
    sameDay: "[Aujourd'hui à] HH:mm",
    nextDay: '[Demain à] HH:mm',
    nextWeek: 'dddd [prochain à] HH:mm',
    lastDay: '[Hier à] HH:mm',
    lastWeek: 'dddd [dernier à] HH:mm',
    sameElse: '[Le] DD/MM/YYYY [à] HH:mm',
  },
});
