import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { styled } from 'styled-components'

const Form = () => {
  const { pathname } = useLocation()
  const [isComplete, setIsComplete] = useState({
    id: false,
    password: false,
  })
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    setIsDisabled(isComplete.id && isComplete.password ? false : true)
  }, [isComplete])

  const emailCheck = (event) => {
    setIsComplete(event.target.value.includes('@') ? { id: true, password: isComplete.password } : { id: false, password: isComplete.password })
  }

  const passwordCheck = (event) => {
    setIsComplete(event.target.value.length >= 8 ? { password: true, id: isComplete.id } : { password: false, id: isComplete.id })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (pathname === '/signup') {
      //어쩌구
    } else {
      //어쩌구
    }
  }

  return (
    <FormContainer onSubmit={(event) => handleSubmit(event)}>
      <div className="column">
        <span>아이디</span>
        <input type="text" data-testid="email-input" placeholder='"@" 기호가 포함된 이메일을 입력해주세요' onChange={(event) => emailCheck(event)} required />
      </div>
      <div className="column">
        <span>비밀번호</span>
        <input
          type="password"
          data-testid="password-input"
          placeholder="8자 이상의 비밀번호를 입력해주세요"
          onChange={(event) => passwordCheck(event)}
          required
        />
      </div>
      {pathname === '/signup' ? (
        <button disabled={isDisabled} data-testid="signup-button">
          회원가입
        </button>
      ) : (
        <button disabled={isDisabled} data-testid="signin-button">
          로그인
        </button>
      )}
    </FormContainer>
  )
}

const FormContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  input {
    width: 300px;
    height: 30px;
  }

  button {
    width: 100px;
    height: 40px;
    background-color: royalblue;

    &:disabled {
      background-color: gray;
    }
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`

export default Form
