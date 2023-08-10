import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import TodoItem from './TodoItem'

const TodoList = ({ data }) => {
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <ListContainer>
      {data.map((item) => {
        return <TodoItem itemData={item} key={item.id} />
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
