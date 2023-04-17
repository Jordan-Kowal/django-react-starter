import { useCallback } from 'react';
import { Grid } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routeConfig } from '@/routes';
import { useLayoutStore } from '@/stores';

const { useBreakpoint } = Grid;

const useNav = () => {
  const { lg } = useBreakpoint();
  const collapseSider = useLayoutStore((state) => state.collapseSider);
  const navigate = useNavigate();

  const maybeCollapseSider = useCallback(() => {
    if (!lg) collapseSider();
  }, [collapseSider, lg]);

  const navigateToHome = useCallback(() => {
    navigate(routeConfig.home.path);
    maybeCollapseSider();
  }, [maybeCollapseSider, navigate]);

  const navigateToProfile = useCallback(() => {
    navigate(routeConfig.profile.path);
    maybeCollapseSider();
  }, [maybeCollapseSider, navigate]);

  return {
    navigateToHome,
    navigateToProfile,
  };
};

export default useNav;
