import type { RouteConfigProps } from "@/routes";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

type UseGoTo = (route: RouteConfigProps) => () => void;

export const useGoTo: UseGoTo = (route) => {
  const navigate = useNavigate();
  return useCallback(() => navigate(route.path), [navigate, route]);
};
