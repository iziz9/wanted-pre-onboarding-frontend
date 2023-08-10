import React from 'react'
import TodoList from '../components/TodoList'
import NewTodo from '../components/NewTodo'
import { styled } from 'styled-components'

const Todo = () => {
  return (
    <Container>
      <h1>투두리스트</h1>
      <TodoList />
      <NewTodo />
    </Container>
  )
}
const Container = styled.main`
  position: relative;
  height: 600px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background-color: aliceblue;

  h1 {
    margin-top: 20px;
  }
`

export default Todo
