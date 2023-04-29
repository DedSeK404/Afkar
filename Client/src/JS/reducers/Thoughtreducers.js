import {
  FAILED,
  GETALLTHOUGHTS,
  LOADING,
  THOUGHTADDEDSUCCESSFULLY,
} from "../actiontypes/Thoughttypes";

const initialState = {
  loading: true,
  thoughts: [],
  error: null,
  Alert: null,
};

export const thoughtreducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return { ...state, loading: true };

    case GETALLTHOUGHTS:
      return { ...state, thoughts: payload.thoughts, loading: false };

    case THOUGHTADDEDSUCCESSFULLY:
      return { ...state, loading: false };

    case FAILED:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};
