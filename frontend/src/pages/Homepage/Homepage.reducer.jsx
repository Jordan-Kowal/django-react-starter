import { now } from '@/services/dates';

const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_COURSES = 'SET_COURSES';
const UPDATE_FILTERS = 'UPDATE_FILTERS';

const actions = {
  setIsLoading: (isLoading) => ({
    type: SET_IS_LOADING,
    payload: { isLoading },
  }),
  updateCourses: (courses) => ({ type: SET_COURSES, payload: { courses } }),
  updateFilters: (filters) => ({
    type: UPDATE_FILTERS,
    payload: { filters },
  }),
};

const initialState = {
  isLoading: true,
  courses: [],
  filters: {
    date: now().startOf('week'),
  },
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: payload.isLoading };
    case SET_COURSES:
      return { ...state, isLoading: false, courses: payload.courses };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...payload.filters },
      };
    default:
      return state;
  }
};

export { actions, initialState, reducer };
