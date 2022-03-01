import React, { useEffect, useState } from 'react';

// Custom Hook
const useFetch = (when, callback, url) => {
  // loading
  const [loading, setLoading] = useState(false);

  // ---- fetching Data X useEffect ---- //
  // todolist 초기 데이터를 가져오는 함
  const fetchInitialData = async () => {
    setLoading(true);
    const response = await fetch(url);
    const initialData = await response.json();
    callback(initialData);

    // console.log('useFetch', when); // 디버깅
    // console.log('useFetch', url); // 디버깅
    // console.log('useFetch', initialData); // 디버깅

    setLoading(false);
  }

  // - useEffect의 콜백함수에는 비동기 처리 로직을 직접 작성하면 X
  // - 빈 deps 배열 []은 useEffect가 componentDidMount()처럼 한 번만 실행되는 것을 의미
  useEffect(()=>{
    fetchInitialData();
  }, [when]);

  return loading;
}

export default useFetch;