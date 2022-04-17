import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { searchReducer } from "./searchReducer";

export const initeState = {
  msg: "qq Search",
  isLoading: false,
};
const baseReducer = handleActions(
  {
    A: (state, action) => {
      return {
        ...state,
        msg: action.payload,
      };
    },
  },
  initeState
);

// 按照页面给定key值 方便不同页面单独调用
const rootReducer = combineReducers({
  base: baseReducer,
  searchPage: searchReducer,
});
export default rootReducer;