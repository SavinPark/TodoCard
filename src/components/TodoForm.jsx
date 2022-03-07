import React, { useState, useContext, useRef } from "react";
import styled, {css} from "styled-components";
import { MdAdd } from "react-icons/md";
import { TodoContext, PageContext } from "../App";

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  dusplay: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 50%;
  bottom 0px;
  transform: translate(-50%, 50%);

  font-size: 60px;
  color: #fff;
  border-radius: 40px;
  
  border: none;
  outline: none;

  // circel버튼을 누르면 색이 변하면서 45도 회전하는 효과
  transition: 0.125s all ease-in;
  ${props => props.open && css`
    background: #ff6b6b;
    &:hover {
      background: #ff8787;
    }
    &:active {
      background: #fa5252;
    }
    transform: translate(-50%, 50%) rotate(45deg);
  `}
`;
// circle 버튼을 누르면 입력폼 나타남
const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;
// form 태그X
// const InsertForm = styled.div` 
// form 태그O
const InsertForm = styled.form` 
  background: #f8f9fa;
  padding: 32px;
  padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;
const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  &::placeholder {
    color: #999;
  }
`;
const Textarea = styled.textarea`
  height: 400px;
  padding: 12px;
  margin-top: 16px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  resize: none;
  &::placeholder {
    font-weight: 600;
    color: #999;
  }
`
const SaveBtn = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 16px;
  padding-top: 8px;
  box-sizing: border-box;
  background: #6666ff;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: ;
  text-align: center;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    background: #8080ff;
  }
`

function TodoForm({todo, editOn}) {

  // const {n, todos, addTodo, editTodo} = useContext(TodoContext); // TodoContext
  const {addTodo, editTodo} = useContext(TodoContext); // TodoContext
  const {p} = useContext(PageContext); // PageContext
  
  const titleRef = useRef(false);
  const contentsRef = useRef(false);
  
  const [open, setOpen] = useState(false);
  const onFormToggle = () => setOpen(!open);

  const onSubmit = (e) => {
    // console.log('Save', n); // 디버깅
    // console.log('Page : ', p); // 디버깅
    // console.log('todos : ', todos);
    e.preventDefault();
    if (todo) {  // edit 기능
      console.log('edit save', todo.id); // 디버깅
      editTodo(todo.id, titleRef.current.value, contentsRef.current.value);
    } else {  // add 기능
      console.log('add save'); // 디버깅
      const now = new Date();
      const newTodoDate = Number(new Date(now.setDate(now.getDate()+p)).toISOString().substring(0,10).replace(/-/g,''))
      addTodo(newTodoDate, titleRef.current.value, contentsRef.current.value); 
    }
  }

  return (
    <>
      {(open || editOn) && (
        <InsertFormPositioner>
          <InsertForm>
            <Input
              placeholder="Title" 
              autoFocus
              ref={titleRef}
            />
            <Textarea
              id='nextFocus'
              placeholder="Contents" 
              ref={contentsRef}
            />
            <SaveBtn onClick={onSubmit}>Save</SaveBtn>
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onFormToggle} open={open} editOn={editOn}>
       <MdAdd style={{width: '70px', height: '70px', position: 'relative', right:'1px', top: '4px'}} />
      </CircleButton>
      {/* --------- 디버깅 ---------- */}
      {/* <p>TodoForm</p> */}
      {/* {console.log(editOn)} */}
    </>
  );
}

export default TodoForm;