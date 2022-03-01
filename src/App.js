import React, { useState } from 'react';
import './App.css';
import styled, {createGlobalStyle} from "styled-components";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Custom Hook
import useFetch from './useFetch.js';
// Components
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';


// styled-components
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;
const Carousel = styled.div`
  width: 1656px;
  margin: 0 auto;

  display: flex;
  // overflow: hidden;
  justify-content: space-around;  // 카드 사이에 균등한 여백을 두고 정렬

  border: 4px solid red;
  // width:500px;
  // height: 1000px;
  // background: pink;
`;
const Slider = styled.div`
  width: 2760px; 
  display: flex;
  
  // position: relative;
  // height: 900px;
  // margin: auto 0;
  // background: powderblue;
`;

// Context API
export const TodoContext = React.createContext();
export const PageContext = React.createContext();

// APP COMPONEMT
function App() {

  const [todos, setTodos] = useState([]);  // todos 
  const [n, setN] = useState(0);  // 날짜에 맞는 todos 찾기 위한 변수
  const [page, setPage] = useState([-2, -1, 0, 1, 2]);  // 페이지 배열 (카드 구분)
  
  // onPrev
  const onPrev = () => {
    console.log('PREV : ', n-1); // 디버깅
    setN(n - 1);
    setPage([page[0] - 1, ...page].filter(p => p !== [page[0] - 1, ...page][[page[0] - 1, ...page].length - 1]));

    // Slide Effect
    const slider = document.querySelector('.slider');
    slider.style.transform = `translate(${552}px)`;
    slider.style.transition = `${0.5}s ease-out`;
    setTimeout(function(){ // 0.5초 뒤 slider 원위치
      slider.style.transform = `translate(${0}px)`;  
      slider.style.transition = `${0}s ease-out`; 
    }, 500);
  }
  
  // onNext
  const onNext = () => {
    console.log('NEXT : ', n+1); // 디버깅
    setN(n + 1);
    setPage([...page, page[page.length-1] + 1].filter(p => p !== page[0]));

    // Slide Effect
    const slider = document.querySelector('.slider');
    slider.style.transform = `translate(${-552}px)`; 
    slider.style.transition = `${0.5}s ease-out`; 
    setTimeout(function(){  // 0.5초 뒤 slider 원위치
      slider.style.transform = `translate(${0}px)`; 
      slider.style.transition = `${0}s ease-out`; 
    }, 500);
  }
  
  let loading = useFetch(n, setTodos, `http://localhost:4000/todos`);

  // 카드를 동적으로 렌더링하는 함수
  const renderCards = (p) => {
    return (
      // <div>
      <PageContext.Provider value={{p}}>
        <TodoTemplate>
          <TodoHead />
          <TodoList />
          <TodoForm />
        </TodoTemplate>
      </PageContext.Provider>
      // {/* </div> */}
    );
  }

  return (
    <>
    <GlobalStyle />

    <div style={{display: 'flex'}}>
      <FaChevronLeft className='controlBtn prev' onClick={onPrev} />

      <Carousel className='carousel'>
        <Slider className='slider'>
          
          <TodoContext.Provider value={{n, todos, loading}} >
            {/* <TodoTemplate>
              <TodoHead />
              <TodoList />
              <TodoForm />
            </TodoTemplate> */}
            {page.map(p => renderCards(p))}
          </TodoContext.Provider>

        </Slider>
      </Carousel>

      <FaChevronRight className='controlBtn next' onClick={onNext} />
    </div>

    {/* ------------ 디버깅 -------------- */}
    {setTimeout(function(){console.log('PAGE : ', page)})}
    </>
  );
}

export default App;
