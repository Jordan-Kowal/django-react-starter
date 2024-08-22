import "./config";
import dayjs, { type Dayjs } from "dayjs";

type DateFormatter = {
  toIsoDate: (dateObject: unknown) => string;
  toFrenchDate: (dateObject: unknown) => string;
  toIsoDateTime: (dateObject: unknown) => string;
  toHourMinute: (dateObject: unknown) => string;
  toCalendar: (dateObject: unknown) => string;
  toWeekRange: (dateObject: unknown) => string;
};

export const isDateObject = (date: unknown): date is Dayjs => {
  return dayjs.isDayjs(date);
};

export const date = (str: string): Dayjs => dayjs(str);

export const now = (): Dayjs => dayjs();

export const dateFormatter: DateFormatter = {
  toIsoDate: (dateObject) =>
    isDateObject(dateObject) ? dateObject.format("YYYY-MM-DD") : "",
  toFrenchDate: (dateObject) =>
    isDateObject(dateObject) ? dateObject.format("DD/MM/YYYY") : "",
  toIsoDateTime: (dateObject) =>
    isDateObject(dateObject) ? dateObject.toISOString() : "",
  toHourMinute: (dateObject) =>
    isDateObject(dateObject) ? dateObject.format("HH:mm") : "",
  toCalendar: (dateObject) =>
    isDateObject(dateObject) ? dateObject.calendar() : "",
  toWeekRange: (dateObject) => {
    if (!isDateObject(dateObject)) return "";
    const start = dateObject.startOf("week");
    const end = dateObject.endOf("week");
    return `(S${dateObject.week()}) ${start.format(
      "DD/MM/YYYY",
    )} - ${end.format("DD/MM/YYYY")}`;
  },
};
