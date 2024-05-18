import dayjs from "dayjs";

export const date = (str) => dayjs(str);
export const now = () => dayjs();

export const dateFormatter = {
  toIsoDate: (dateObject) =>
    dateObject ? dateObject.format("YYYY-MM-DD") : "",
  toFrenchDate: (dateObject) =>
    dateObject ? dateObject.format("DD/MM/YYYY") : "",
  toIsoDateTime: (dateObject) => (dateObject ? dateObject.toISOString() : ""),
  toHourMinute: (dateObject) => (dateObject ? dateObject.format("HH:mm") : ""),
  toCalendar: (dateObject) => (dateObject ? dateObject.calendar() : ""),
  toWeekRange: (dateObject) => {
    if (!dateObject) return "";
    const start = dateObject.startOf("week");
    const end = dateObject.endOf("week");
    return `(S${dateObject.week()}) ${start.format(
      "DD/MM/YYYY",
    )} - ${end.format("DD/MM/YYYY")}`;
  },
};
