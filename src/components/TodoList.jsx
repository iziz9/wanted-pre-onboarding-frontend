import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import TodoItem from './TodoItem'

const TodoList = () => {
  useEffect(() => {
    console.log('투두')
  }, [])

  return (
    <ListContainer>
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </ListContainer>
  )
}

const ListContainer = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 420px;
  overflow-x: hidden;
  overflow-y: auto;
`

export default TodoList
