import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { requestUpdateTodo } from '../api/request'

const TodoItem = ({ itemData }) => {
  const [checked, setChecked] = useState(false)
  const [content, setContent] = useState('')

  useEffect(() => {
    setChecked(itemData.isCompleted)
    setContent(itemData.todo)
  }, [itemData])

  const handleCheckbox = (e) => {
    console.log(checked) //안됨...
    requestUpdateTodo({ id: itemData.id, todo: content, userId: itemData.userId, isCompleted: checked })
  }

  return (
    <ItemContainer>
      <Inputs>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked)
            handleCheckbox(e)
          }}
        />
        <span>{itemData.todo}</span>
      </Inputs>
      <Buttons>
        <button data-testid="modify-button">수정</button>
        <button data-testid="delete-button">삭제</button>
      </Buttons>
    </ItemContainer>
  )
}
const ItemContainer = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const Inputs = styled.label`
  display: flex;
  width: 260px;
  padding: 0 3px;
  gap: 10px;

  input[type='checkbox'] {
    position: relative;
    transform: scale(1.2);
  }

  span {
    display: block;
    margin: auto 0;
    padding: 10px 0;
    white-space: normal;
    overflow: scroll;
    overflow-wrap: break-word;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const Buttons = styled.div`
  position: relative;
  display: flex;
  gap: 5px;
  align-items: center;
  height: 100%;

  button {
    width: 40px;
    height: 30px;
  }
`

export default TodoItem
