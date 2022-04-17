import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { FETCH_QQDATA } from "../redux/actions";
import { Alert, Skeleton, Input, Box } from '@mui/material'
import './search.css';


const InfoSkeleton = () => {
  return (
    <Box 
      sx={{
        display: 'flex',
        marginTop: '20px',
      }}
    >
      <Skeleton 
        variant="circular" 
        width={50}
        height={50}
        style={{ marginRight: '20px' }} 
      />
      <Box className='box'>
        <Skeleton variant="text" width={100} />
        <Skeleton variant="text" width={100} />
      </Box>
    </Box>
  )
}

const SearchResult = (props) => {
  const { qqData, errorMsg } = props;
  if (errorMsg) {
    return (
      <Alert sx={{ width: 200, marginTop: '20px' }} severity="error">{errorMsg}</Alert>
    );
  }
  if (qqData) {
    return (
      <Box 
        className="result"
      >
      <img
        alt='avatar'
        className="avatar"
        src={qqData.qlogo}
      />
      <Box className='box'>
        <span className="name" title={qqData.name}>
          {qqData && qqData.name}
        </span>
        <span className="number">
          {qqData && qqData.qq}
        </span>
      </Box>
    </Box>
    );
  }
}

const Search = () => {

  const dispatch = useDispatch();

  // 防抖。500毫秒后执行
  const delayedQuery = useMemo(() => {
    return debounce(function(v) {
      dispatch({
        type: FETCH_QQDATA,
        payload: v,
      });
    }, 500);
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (event) => {
    delayedQuery(event.target.value);
  }

  // 解构store里面的数据
  const { qqData, isFetching, errorMsg } = useSelector((state) => state.searchPage);
  return (
    <Box sx={{ marginLeft: '12px'}}>
      <h1>QQ号查询</h1>
      QQ <Input 
            onChange={handleInputChange} 
            placeholder="QQ号" 
            sx={{ paddingLeft: '4px' }}
          />
        <div>
        {
          isFetching ? <InfoSkeleton />: <SearchResult qqData={qqData} errorMsg={errorMsg} />
        }
        </div>
    </Box>
  );
};

export default Search;
