import React, { useEffect, useState } from 'react'
import TodoList from '../components/TodoList'
import { styled } from 'styled-components'
import { requestCreateTodo, requestGetTodo } from '../api/request'

const Todo = () => {
  const [inputValue, setInputValue] = useState('')
  const [todoData, setTodoData] = useState([])

  const getTodoData = async () => {
    setTodoData(await requestGetTodo())
  }

  useEffect(() => {
    getTodoData()
  }, [])

  const handleSubmit = async () => {
    await requestCreateTodo(inputValue)
    await getTodoData()
    setInputValue('')
  }
  return (
    <Container>
      <h1>투두리스트</h1>
      <TodoList data={todoData} getTodoData={getTodoData} />
      <NewTodoForm
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <input
          type="text"
          placeholder="새로운 할 일을 입력해주세요"
          data-testid="new-todo-input"
          required
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          value={inputValue}
        />
        <button data-testid="new-todo-add-button">추가</button>
      </NewTodoForm>
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

export default Todo
