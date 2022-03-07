import React, { useContext } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { TodoContext, PageContext } from "../App";

// styled-components
// const TodoListBlock = styled.div`
const TodoListBlock = styled.ul`
  flex: 1;
  padding: 20px 32px 48px;
  overflow-y: auto;
`;


// TODOLIST COMPONENT
function TodoList() {

  const {todos, loading, n} = useContext(TodoContext);
  const {p} = useContext(PageContext);

  const now = new Date(); 
  const dailyKey = Number(new Date(now.setDate(now.getDate() + p)).toISOString().substring(0,10).replace(/-/g,'')); 

  let todoList = <div>Loading...</div>;

  // 전체 todos (오늘의 todo 골라내지 않은..code)
  // if(!loading) todoList = todos.map(todo => <TodoItem key={todo.id} todo={todo} />);

  // todos 중에서 오늘의 todo만 골라내기
  const todayTodos = [];
  todos.map(todo => {
    if (todo.date === dailyKey) todayTodos.push(todo);
  });
  // loading 중 아니면 TodoItem 컴포넌트에 todo 전달
  if(!loading) todoList = todayTodos.map(todo => <TodoItem key={todo.id} todo={todo} />);

  return (
    <>
      <TodoListBlock>
      
        {todoList}

        {/* -------- *** --------*/}
        {/* <TodoItem /> */}
        {/* <p>TodoList {n}</p>
        {console.log(loading)}
        {console.log(todoList)} */}

      </TodoListBlock>
    </>
  );
}

export default TodoList;