import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import TodoItem from './TodoItem'

const TodoList = ({ data, getTodoData }) => {
  return (
    <ListContainer>
      {data &&
        data.map((item) => {
          return <TodoItem itemData={item} getTodoData={getTodoData} key={item.id} />
        })}
    </ListContainer>
  )
}

const ListContainer = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 420px;
  overflow-x: hidden;
  overflow-y: auto;
`

export default TodoList
