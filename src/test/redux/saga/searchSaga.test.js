import { put, call } from 'redux-saga/effects';
import qqSearch, { fetchData } from '../../../redux/saga/searchSaga';
import { FETCH_QQDATA, FETCH_QQDATA_FAILURE, FETCH_QQDATA_SUCCESS } from '../../../redux/actions';

describe('fetchData()', () => {
  it('should run qqSearch function', () => {
    const gen = qqSearch();
    gen.next();
    expect(gen.next().done).toEqual(true)
  });

  it('should run fetchData success', () => {
    const gen = fetchData({ payload: '123123' });
    const response = {data: { "code": 1, "qq": "123123", "name": "ken", "qlogo": "https:\/\/q2.qlogo.cn\/headimg_dl?spec=100&dst_uin=123123", "lvzuan": { "code": 0, "subcode": 0, "level": 6, "vip": 1, "score": 19416, "place": 0, "payway": 0, "isyear": 1, "vendor": 0 } }};
    const a = gen.next();
    const b = gen.next(response);
    expect(b.value.payload.action.payload.code).toEqual(1);
    const c = gen.next()
    expect(c.done).toEqual(true)
  });

  it('should run fetchData failure', () => {
    const gen = fetchData({ payload: '1' });
    const response = {data: {"code":201702,"msg":"服务器异常！"}};
    const a = gen.next();
    const b = gen.next(response);
    expect(b.value.payload.action.type).toEqual(FETCH_QQDATA_FAILURE);
    const c = gen.next()
    expect(c.done).toEqual(true)
  });

  it('should run catch code', () => {
    const gen = fetchData({ payload: '1' });
    const response = null;
    const a = gen.next();
    const b = gen.next(response);
    expect(b.value.payload.action.type).toEqual(FETCH_QQDATA_FAILURE);
    expect(gen.next().done).toEqual(true);
  });

});