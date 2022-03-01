import React, { useContext } from "react";
import styled from 'styled-components';
import { TodoContext } from "../App";

// styled-components
const TodoTemplateBlock = styled.div `
  width: 512px;
  min-width: 512px;
  height: 768px;
  margin: 70px 20px 60px ;

  position: relative;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);

  display: flex;
  flex-direction: column;
`;

function TodoTemplate({children}) {

  const {n} = useContext(TodoContext);

  return (
    <TodoTemplateBlock>
      {children}

      {/* -------- 디버깅 --------*/}
      <h2 style={{color:'red'}}>{n}</h2>
      
    </TodoTemplateBlock>
  );
}

export default TodoTemplate;