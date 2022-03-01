import React, { useContext } from "react";
import styled from "styled-components";
import { TodoContext, PageContext } from "../App";

// styled-components
const TodoHeadBlock = styled.div`
  padding: 48px 32px 24px;
  border-bottom: 1px solid #e9ecef;

  h1{
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }

  .day{
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left{
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

// TODOHEAD COMPONENT
function TodoHead() {

  const {n} = useContext(TodoContext);
  const {p} = useContext(PageContext);

  // 날짜, 요일
  const now = new Date();
  const today = new Date(now.setDate(now.getDate() + p));
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayName = today.toLocaleDateString('ko-KR', {
    weekday: 'long',
  });

  return (
    <>
      <TodoHeadBlock>
        <h1>{dateString}</h1>
        <div className='day'>{dayName}</div>
        {/* <div className='tasks-left'>할 일 {undoneTasks.length}개 남음</div> */}
        <div className='tasks-left'>할 일 0개 남음</div>

        {/* -------- 디버깅 --------*/}
        {/* <p>TodoHead  {n}</p> */}

      </TodoHeadBlock>
    </>
  );
}

export default TodoHead;