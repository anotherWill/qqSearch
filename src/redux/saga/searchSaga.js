import { takeLatest, put, call } from "redux-saga/effects";
import { FETCH_QQDATA, FETCH_QQDATA_FAILURE, FETCH_QQDATA_SUCCESS } from "../actions";
import request from '../../utils/request';
import { API_BASE } from '../../utils/constants';

export function* fetchData({ payload }) {
  try {
    // const response = yield request(API_BASE, { data: { qq: payload }});
    const response = yield call(request, API_BASE, { data: { qq: payload }});
    if (response.data.code === 1) {
      yield put({
        type: FETCH_QQDATA_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: FETCH_QQDATA_FAILURE,
        payload: response.data.msg,
      });
    }
   
  } catch (error) {
      yield put({type: FETCH_QQDATA_FAILURE, error})
  }
}

function* qqSearch() {
  yield takeLatest(FETCH_QQDATA, fetchData);
}

export default qqSearch;