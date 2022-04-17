import { handleActions } from "redux-actions";
import { FETCH_QQDATA, FETCH_QQDATA_FAILURE, FETCH_QQDATA_SUCCESS } from "../actions";

export const initState = {
  qqData: null,
  isFetching: false,
  errorMsg: '',
}
export const searchReducer = handleActions(
  {
    [FETCH_QQDATA]: (state, {payload}) => {
      return {
        ...state,
        isFetching: true,
        errorMsg: '',
        qqData: null
      }
    },
    [FETCH_QQDATA_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        errorMsg: '',
        isFetching: false,
        qqData: payload,
      }
    },
    [FETCH_QQDATA_FAILURE]: (state, {payload}) => {
      return {
        ...state,
        isFetching: false,
        errorMsg: payload
      }
    },
  },
  initState
);
