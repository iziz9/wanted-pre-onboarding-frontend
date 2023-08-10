import React from 'react'
import { styled } from 'styled-components'

const TodoItem = () => {
  return (
    <ItemContainer>
      <Inputs>
        <input type="checkbox" />
        <span>
          {
            '내용dsfadsfdasfadsfadsfnsdjlfndslfnldsknflkdsnflkdsnflkdsnflkdsnflkdsnflkdsnflkdsnglkfsbnglksdnflksdnmlknlknlknlk'
          }
        </span>
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
    margin: auto;
    transform: scale(1.2);
  }

  span {
    display: block;
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
