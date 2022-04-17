import expect from 'expect';
import { FETCH_QQDATA, FETCH_QQDATA_FAILURE, FETCH_QQDATA_SUCCESS } from '../../../redux/actions';
import { searchReducer, initState } from '../../../redux/reducers/searchReducer';

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(searchReducer(undefined, { type: 'A' })).toEqual(initState);
  })

  test('should start fetch data', () => {
    const expectedState = {
      errorMsg: '',
      isFetching: true,
      qqData: null,
    }
    expect(
      searchReducer(initState, {
        type: FETCH_QQDATA,
      })
    ).toEqual(expectedState);
  });

  test('should handle successful data response', () => {
    const payload = { "code": 1, "qq": "123123", "name": "ken", "qlogo": "https:\/\/q2.qlogo.cn\/headimg_dl?spec=100&dst_uin=123123", "lvzuan": { "code": 0, "subcode": 0, "level": 6, "vip": 1, "score": 19416, "place": 0, "payway": 0, "isyear": 1, "vendor": 0 } };
    const expectedState = {
      errorMsg: '',
      isFetching: false,
      qqData: payload,
    }
    expect(
      searchReducer(initState, {
        type: FETCH_QQDATA_SUCCESS,
        payload
      })
    ).toEqual(expectedState);
  });

  test('should handle failure data response', () => {
    const payload = "服务器异常！";
    const expectedState = {
      errorMsg: payload,
      isFetching: false,
      qqData: null,
    }
    expect(
      searchReducer(initState, {
        type: FETCH_QQDATA_FAILURE,
        payload
      })
    ).toEqual(expectedState);
  });
})