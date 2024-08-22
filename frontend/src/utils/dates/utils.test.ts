import dayjs from "dayjs";
import { describe, test } from "vitest";
import { date, dateFormatter, isDateObject, now } from "./utils";

describe.concurrent("services/dates/utils", () => {
  test("isDateObject", ({ expect }) => {
    expect(isDateObject(undefined)).toBe(false);
    expect(isDateObject({})).toBe(false);
    expect(isDateObject(dayjs())).toBe(true);
  });

  test("date", ({ expect }) => {
    const newDate = date("2021-01-01");
    expect(newDate).toBeInstanceOf(dayjs);
    expect(newDate.format("YYYY-MM-DD")).toBe("2021-01-01");
  });

  test("now", ({ expect }) => {
    expect(now()).toBeInstanceOf(dayjs);
  });

  test("dateFormatter.toIsoDate", ({ expect }) => {
    expect(dateFormatter.toIsoDate(undefined)).toBe("");
    expect(dateFormatter.toIsoDate({})).toBe("");
    expect(dateFormatter.toIsoDate(dayjs("2021-01-01"))).toBe("2021-01-01");
  });

  test("dateFormatter.toFrenchDate", ({ expect }) => {
    expect(dateFormatter.toFrenchDate(undefined)).toBe("");
    expect(dateFormatter.toFrenchDate({})).toBe("");
    expect(dateFormatter.toFrenchDate(dayjs("2021-01-01"))).toBe("01/01/2021");
  });

  test("dateFormatter.toIsoDateTime", ({ expect }) => {
    expect(dateFormatter.toIsoDateTime(undefined)).toBe("");
    expect(dateFormatter.toIsoDateTime({})).toBe("");
    expect(dateFormatter.toIsoDateTime(dayjs("2021-01-01T12:00:00.000Z"))).toBe(
      "2021-01-01T12:00:00.000Z",
    );
  });

  test("dateFormatter.toHourMinute", ({ expect }) => {
    expect(dateFormatter.toHourMinute(undefined)).toBe("");
    expect(dateFormatter.toHourMinute({})).toBe("");
    expect(dateFormatter.toHourMinute(dayjs("2021-01-01 12:34"))).toBe("12:34");
  });

  test("dateFormatter.toCalendar", ({ expect }) => {
    expect(dateFormatter.toCalendar(undefined)).toBe("");
    expect(dateFormatter.toCalendar({})).toBe("");
    expect(dateFormatter.toCalendar(dayjs("2021-01-01"))).toBe(
      "Le 01/01/2021 à 00:00",
    );
  });

  test("dateFormatter.toWeekRange", ({ expect }) => {
    expect(dateFormatter.toWeekRange(undefined)).toBe("");
    expect(dateFormatter.toWeekRange({})).toBe("");
    expect(dateFormatter.toWeekRange(dayjs("2021-01-01"))).toBe(
      "(S53) 28/12/2020 - 03/01/2021",
    );
  });
});
