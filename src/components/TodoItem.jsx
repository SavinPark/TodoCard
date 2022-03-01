import React, { useContext } from "react";
import styled, {css} from "styled-components";
import { MdDone, MdDelete, MdAdd } from "react-icons/md";
import { TodoContext } from "../App";

// styled-components
const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #ff6b6b;
  }
`;
const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
`;
const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 20px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>props.done && css`
    border: 1px solid #38d9a9;
    color: #38d9a9;
  `}
`;
// const Text = styled.div`
const Text = styled.li`
  list-style: none;
  flex: 1;
  font-size: 21px;
  color: #495057;
  &:hover {
    cursor: pointer;
  }
  ${props => props.done && css`
    color: #ced4da;
  `}
`;

// TODOITEM COMPONENT
function TodoItem({todo}) {

  const {n} = useContext(TodoContext);

  // onDone
  const onDone = () => {
    console.log('Done / Undone')
  }

  // onEdit
  const onEdit = () => {
    console.log('Edit');
  }

  // onRemove
  const onRemove = () => {
    console.log('Remove');
  }

  // todo의 done 속성값이 true(완료)이면 'done', false(미완료)이면 ''
  // const ItemClassName = todo.done === "1" ? 'done' : '';

  return (
    <>
      <TodoItemBlock>
        <CheckCircle onClick={onDone}>{<MdDone />}</CheckCircle>
        {/* <Text onClick={onEdit} className={ItemClassName}>{todo.title}</Text> */}
        <Text onClick={onEdit}>{todo.title}</Text>
        <Remove onClick={onRemove}>
          <MdDelete />
        </Remove>
      </TodoItemBlock>
      {/* -------- 디버깅 --------*/}
      {/* {console.log(todo)}
      <p>TodoItem {n}</p> */}
    </>
  );
}

export default TodoItem;