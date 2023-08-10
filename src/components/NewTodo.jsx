import React from 'react'
import { styled } from 'styled-components'

const NewTodo = () => {
  return (
    <NewTodoForm>
      <input type="text" placeholder="새로운 할 일을 입력해주세요" data-testid="new-todo-input" required />
      <button data-testid="new-todo-add-button">추가</button>
    </NewTodoForm>
  )
}

const NewTodoForm = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;

  input {
    width: 70%;
  }

  button {
    width: 80px;
    height: 40px;
  }
`

export default NewTodo
