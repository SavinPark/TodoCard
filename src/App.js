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

// ---- TodoData --- //
// const todos = require('./InitialTodoData.js');

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

// APP COMPONEMT
function App() {

  const [todos, setTodos] = useState([]);  // todos 
  const [n, setN] = useState(0);
  
  // onPrev
  const onPrev = () => {
    console.log('PREV : ', n-1);
    setN(n - 1);
  }
  
  // onNext
  const onNext = () => {
    console.log('NEXT : ', n+1);
    setN(n + 1);
  }
  
  let loading = useFetch(n, setTodos, `http://localhost:4000/todos`);

  return (
    <>
    <GlobalStyle />

    <div style={{display: 'flex'}}>
      <FaChevronLeft className='controlBtn prev' onClick={onPrev} />

      <Carousel className='carousel'>
        <Slider className='slider'>
          
          <TodoContext.Provider value={{n, todos, loading}} >
            <TodoTemplate>
              <TodoHead />
              <TodoList />
              <TodoForm />
            </TodoTemplate>
          </TodoContext.Provider>

        </Slider>
      </Carousel>
      {console.log('N : ',n)}

      <FaChevronRight className='controlBtn next' onClick={onNext} />
    </div>
    </>
  );
}

export default App;
