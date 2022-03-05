import React, { useState } from 'react';
import './App.css';
import styled, {createGlobalStyle} from "styled-components";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

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

  const [open, setOpen] = useState(false);
  const onFormToggle = () => setOpen(!open);

  const [todos, setTodos] = useState([]);  // todos 
  const [n, setN] = useState(0);  // 날짜에 맞는 todos 찾기 위한 변수
  const [page, setPage] = useState([-2, -1, 0, 1, 2]);  // 페이지 배열 (카드 구분)

  // // dailyKey
  // const now = new Date();
  // const [dailyKey, setDaliyKey] = useState(Number(new Date(now.setDate(now.getDate())).toISOString().substring(0,10).replace(/-/g,'')));

  // ------------------------------------------------------------------------------- //
  
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

  // ----------------------------------------------------------- //
  
  // addTodo : ----------------------------------- 추가
  const addTodo = async (newTodoDate, newTodoTitle, newTodoContents) => { 
    console.log('ADD NEW TODO : ', newTodoTitle, newTodoContents); // 디버깅
    setTodos([...todos, {date: newTodoDate, title: newTodoTitle, contents: newTodoContents, done: "0", edit: "0", delete: "0"}]);
    // 업데이트된 todo를 post로 server에 보냄
    const res = await axios(`http://localhost:4000/add/todo`, {
      method: 'POST',
      data : {
        'date' : newTodoDate,
        'title' : newTodoTitle,
        'contents' : newTodoContents,
        'done' : "0",
        'edit' : "0",
        'delete' : "0"
      },
      // headers: new Headers()
    });
    alert('Todo 등록 완료');
    return window.location.reload();
  }

  // editTodo ------------------------------------- 수정 (TodoForm)
  const editTodo = async (todoId, newTitle, newContents) => {  // Todo의 변경사항을 반영 (Todo 수정)
    const newTodos = [];
    todos.map(todo => {
      if (todo.id === todoId) {
        const updateTodo = {id: todoId, date: todo.date, title: newTitle, contents: newContents, done: "0", edit: "0", delete: "0"}
        newTodos.push(updateTodo);
      } else {
        newTodos.push(todo);
      }
    })
    setTodos(newTodos);
    // 업데이트된 todo를 post로 server에 보냄
    const res = await axios(`http://localhost:4000/update/todo/${todoId}`, {
      method: 'PUT',
      data : {
        'title' : newTitle,
        'contents' : newContents,
        'edit': '0',
      },
      // headers: new Headers()
    });
    if(res.data) {
      alert('Todo 수정 완료');
      return window.location.reload();
    }
  }
  // changeTodoEdit ------------------------- 수정 (TodoItem)
    const changeTodoEdit = async (TODO) => {
      const updateTodos = todos.map(todo => {
        if(todo.id === TODO.id) {
          if(todo.edit === "1") todo.edit = "0";
          else todo.edit = "1";
        }
        return todo;
      });
      setTodos(updateTodos);
      // console.log(TODO.id); //디버깅
      // 업데이트된 todo를 put로 server에 보냄
      await axios(`http://localhost:4000/update/todo/edit/${TODO.id}`, {
        method: 'PUT',
        data : {
          // ...TODO,
          'edit' : TODO.edit==="1" ? "1" : "0" 
        },
      });
      alert('Todo EDIT ON');
      // return window.location.reload();
    }

  // changeTodoDone ------------------------- 완료 / 미완료
  // const changeTodoDone = async (todoCode, todo) => {
  const changeTodoDone = async (TODO) => {
    const updateTodos = todos.map(todo => {
      if(todo.id === TODO.id) {
        if(todo.done === "1") todo.done = "0";
        else todo.done = "1";
      }
      return todo;
    });
    setTodos(updateTodos);
    // console.log(TODO.id); //디버깅
    // 업데이트된 todo를 put로 server에 보냄
    await axios(`http://localhost:4000/update/todo/done/${TODO.id}`, {
      method: 'PUT',
      data : {
        ...TODO,
        'done' : TODO.done==="1" ? "1" : "0" 
      },
      // headers: new Headers()
    });
    alert('Todo 완료/미완료');
    return window.location.reload();
  }

  // changeTodoDelete --------------------------- 삭제
  const changeTodoDelete = async (todoId) => {
    const updateTodos = todos.map(todo => {
      if(todo.id === todoId) {
        if(todo.delete === "1") todo.delete = "0";
        else todo.delete = "1";
      }
      return todo;
    })
    // console.log(updateTodos); // 디버깅
    setTodos(updateTodos);
    // 업데이트된 todo를 delete로 server에 보냄
    // const res = await axios(`http://localhost:4000/delete/todo/${todoCode}`, {
    await axios(`http://localhost:4000/delete/todo/${todoId}`, {
      method: 'DELETE',
      // headers: new Headers()
    });
    alert('Todo 삭제 완료');
    return window.location.reload();
  }
  
  // ----------------------------------------------------------- //
  
  // 카드를 동적으로 렌더링하는 함수
  const renderCards = (p) => {
    return (
      // <div>
      // [주의!] 여기는 PageContext !!!
      <PageContext.Provider value={{p}} key={p}>
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
          
          {/* [주의!] 여기는 TodoContext */}
          <TodoContext.Provider value={{n, todos, loading, addTodo, editTodo, changeTodoDone, changeTodoDelete, changeTodoEdit}} >
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
