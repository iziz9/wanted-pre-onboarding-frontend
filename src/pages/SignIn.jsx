import React from 'react'
import { styled } from 'styled-components'

const SignIn = () => {
  return (
      <Form>
        <h1>로그인</h1>
        <div className='column'>
          <span>아이디</span>
          <input type='text' data-testid="email-input" required />
        </div>
        <div className='column'>
          <span>비밀번호</span>
          <input type='password' data-testid="password-input" required />
        </div>
        <button data-testid="signin-button">로그인</button>
      </Form>
  )
}

const Form = styled.form`
  max-width: 400px;
  height: 500px;
  background-color: aliceblue;
  margin: auto;
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
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`

export default SignIn