/*
* Angular Filter for displaying the Time of the Chat in a more beautiful way
* Created by Rosel
* */
import Moment from 'moment';
import 'moment/locale/de-at';
import { Filter } from 'angular-ecmascript/module-helpers';

export default class CalendarFilter extends Filter {
  filter(time) {
    if (!time) return;

    return Moment(time).locale('de-AT').calendar(null, {
      lastDay : '[Gestern]',
      sameDay : 'LT',
      lastWeek : 'dddd',
      sameElse : 'DD/MM/YY'
    });
  }
}

CalendarFilter.$name = 'calendar';