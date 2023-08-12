import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { requestDeleteTodo, requestUpdateTodo } from '../api/request'

const TodoItem = ({ itemData, getTodoData }) => {
  const [content, setContent] = useState('')
  const [isModifying, setIsModifying] = useState(false)

  useEffect(() => {
    setContent(itemData.todo || '')
  }, [itemData])

  const handleContentUpdate = async () => {
    await requestUpdateTodo({
      id: itemData.id,
      todo: content,
      userId: itemData.userId,
      isCompleted: itemData.isCompleted,
    })
    setIsModifying(false)
    await getTodoData()
  }

  const handleDelete = async () => {
    await requestDeleteTodo(itemData.id)
    await getTodoData()
  }

  const handleCheckComplete = async (e) => {
    await requestUpdateTodo({
      id: itemData.id,
      todo: content,
      userId: itemData.userId,
      isCompleted: e.target.checked,
    })
    await getTodoData()
  }

  return (
    <ItemContainer>
      {isModifying ? (
        <>
          <Inputs name="edit">
            <input
              type="text"
              id="edit"
              value={content || ''}
              data-testid="modify-input"
              onChange={(e) => setContent(e.target.value)}
            />
          </Inputs>
          <Buttons>
            <button
              data-testid="submit-button"
              onClick={() => {
                handleContentUpdate()
              }}
            >
              제출
            </button>
            <button
              data-testid="cancel-button"
              onClick={() => {
                setIsModifying(false)
              }}
            >
              취소
            </button>
          </Buttons>
        </>
      ) : (
        <>
          <Inputs name="check">
            <input
              type="checkbox"
              id="check"
              checked={itemData.isCompleted}
              onChange={(e) => {
                handleCheckComplete(e)
              }}
            />
            <span>{itemData.todo}</span>
          </Inputs>
          <Buttons>
            <button data-testid="modify-button" onClick={() => setIsModifying(true)}>
              수정
            </button>
            <button data-testid="delete-button" onClick={() => handleDelete()}>
              삭제
            </button>
          </Buttons>
        </>
      )}
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

  input[type='text'] {
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
