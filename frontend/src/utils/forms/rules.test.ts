import { describe, test } from "vitest";
import {
  validateItems,
  validateItemsCount,
  validateMaxLength,
  validateValueBetween,
} from "./rules";

describe.concurrent("forms/rules", () => {
  test("validateMaxLength", ({ expect }) => {
    const rules = { max: 5 };
    // Not applicable
    expect(validateMaxLength(rules, "")).resolves.toBe(undefined);
    expect(validateMaxLength(rules, 33)).resolves.toBe(undefined);
    expect(validateMaxLength(rules, undefined)).resolves.toBe(undefined);
    // Invalid string
    expect(validateMaxLength(rules, " ")).rejects.toBeInstanceOf(Error);
    expect(validateMaxLength(rules, "too long")).rejects.toBeInstanceOf(Error);
    // Valid string
    expect(validateMaxLength(rules, "12345")).resolves.toBe(undefined);
  });

  test("validateValueBetween", ({ expect }) => {
    const rules = { min: 1, max: 5 };
    // Not applicable
    expect(validateValueBetween(rules, "")).resolves.toBe(undefined);
    expect(validateValueBetween(rules, undefined)).resolves.toBe(undefined);
    // Invalid number
    expect(validateValueBetween(rules, 0)).rejects.toBeInstanceOf(Error);
    expect(validateValueBetween(rules, 6)).rejects.toBeInstanceOf(Error);
    // Valid number
    expect(validateValueBetween(rules, 3)).resolves.toBe(undefined);
  });

  test("validateItemsCount", ({ expect }) => {
    const rules = { min: 2, max: 5 };
    // Invalid array
    expect(validateItemsCount(rules, undefined)).rejects.toBeInstanceOf(Error);
    expect(validateItemsCount(rules, [])).rejects.toBeInstanceOf(Error);
    expect(
      validateItemsCount(rules, [1, 2, 3, 4, 5, 6]),
    ).rejects.toBeInstanceOf(Error);
    // Valid array
    expect(validateItemsCount(rules, [1, 2, 3])).resolves.toBe(undefined);
  });

  test("validateItems", ({ expect }) => {
    const itemValidator = (item: any) => item > 0;
    const rules = { itemValidator, baseMessage: "Invalid items" };
    // Invalid array
    expect(validateItems(rules, [0, 1, 2])).rejects.toBeInstanceOf(Error);
    // Valid array
    expect(validateItems(rules, undefined)).resolves.toBe(undefined);
    expect(validateItems(rules, [])).resolves.toBe(undefined);
    expect(validateItems(rules, [1, 2, 3])).resolves.toBe(undefined);
  });
});
