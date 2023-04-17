import React, { memo, useCallback, useEffect, useReducer } from 'react';
import { Col, Row, message } from 'antd';
import {
  PageBanner,
  RefreshButton,
  Space,
  Spin,
  WeekPicker,
  WeeklyCalendar,
} from '@/components';
import '@/components/features/calendar';
import { apiCall } from '@/services/api';
import { useAuthStore, useNotificationStore } from '@/stores';
import styles from './Homepage.module.less';
import { actions, initialState, reducer } from './Homepage.reducer';

const Homepage = () => {
  const [{ isLoading, courses, filters }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications
  );
  const fetchUser = useAuthStore((state) => state.fetchUser);

  const onDateChange = useCallback(
    (value) => {
      if (!value) return;
      if (value.isSame(filters.date, 'week')) return;
      dispatch(actions.updateFilters({ date: value }));
    },
    [filters.date]
  );

  const fetchCourses = useCallback(async () => {
    dispatch(actions.setIsLoading(true));
    const response = await apiCall('courses', 'listCourses', {
      startDate: filters.date.startOf('week'),
      endDate: filters.date.endOf('week'),
    });
    dispatch(actions.updateCourses(response));
  }, [filters.date]);

  const refreshSchedule = useCallback(async () => {
    dispatch(actions.setIsLoading(true));
    try {
      await apiCall('currentUser', 'refreshSchedule');
      await Promise.all([fetchUser(), fetchCourses(), fetchNotifications()]);
      message.success('Emploi du temps mis à jour');
    } catch {
      message.error("Impossible de mettre à jour l'emploi du temps");
    }
    dispatch(actions.setIsLoading(false));
  }, [fetchUser, fetchCourses, fetchNotifications]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <Space block vertical className={styles.homepage} size={20}>
      <PageBanner
        label="Planning"
        description="Votre planning de cours hebdomadaire"
      />
      <Row className={styles.content}>
        <Col className={styles.filtersRow} span={24}>
          <RefreshButton onClick={refreshSchedule} />
        </Col>
        <Col className={styles.filtersRow} span={24}>
          <WeekPicker onChange={onDateChange} value={filters.date} />
        </Col>
        <Col span={24}>
          <Spin text="Chargement des cours..." spinning={isLoading}>
            <WeeklyCalendar courses={courses} date={filters.date} />
          </Spin>
        </Col>
      </Row>
    </Space>
  );
};

Homepage.propTypes = {};

export default memo(Homepage);
