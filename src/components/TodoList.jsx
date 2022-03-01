import React, { useContext } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { TodoContext } from "../App";

// styled-components
const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px 48px;
  overflow-y: auto;
`;


// TODOLIST COMPONENT
function TodoList() {

  const {todos, loading, n} = useContext(TodoContext);

  let todoList = <div>Loading...</div>;

  if(!loading) todoList = todos.map(todo =>
    <TodoItem key={todo.id} todo={todo} />
  );

  return (
    <>
      <TodoListBlock>
        {todoList}

        {/* -------- 디버깅 --------*/}
        {/* <TodoItem /> */}
        <p>TodoList {n}</p>

      </TodoListBlock>
    </>
  );
}

export default TodoList;