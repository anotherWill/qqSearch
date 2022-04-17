import request, { checkStatus } from '../../utils/request';
import { API_BASE } from '../../utils/constants';
require("jest-fetch-mock");


describe('fetchData()', () => {

  it('should run request function', async () => {
    const res = await request(API_BASE, { data: { qq: '123123' } });
    expect(res.data.code).toEqual(1);

    const res2 = await request(API_BASE, { data: { qq: '123123' }, method: 'POST' });
    expect(res2.data.code).toEqual(1);

    const res3 = await request('http://www.noexistsweb44.com', { data: { qq: '123123' } });
    expect(res3.code).toEqual('ENOTFOUND');

    // const res4 = await request(API_BASE, { headers: {'Content-Type': 'application/json;charset=UTF-8'}});
    // expect(res4.data.code).toEqual(201701);

  });

  it('should run request error function', async () => {
    try {
      const res = checkStatus({status: 400});
    } catch (error) {
      expect(error.response.status).toEqual(400);
    }
  });

});