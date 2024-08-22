import type { SelectOption } from "@/types";
import { useMemo } from "react";

type UseSelectOptions = (
  items: any[] | undefined,
  valueKey?: string,
  labelKey?: string,
) => SelectOption[];

export const useSelectOptions: UseSelectOptions = (
  items,
  valueKey = "value",
  labelKey = "label",
) => {
  return useMemo(() => {
    const safeItems = items || [];
    return safeItems.map((item) => ({
      value: item[valueKey],
      label: item[labelKey],
    }));
  }, [items, valueKey, labelKey]);
};
