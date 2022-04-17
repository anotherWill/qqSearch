import { all } from "redux-saga/effects";
import qqSearch from "./searchSaga";

// eslint-disable-next-line
export default function*() {
  yield all([qqSearch()]);
}