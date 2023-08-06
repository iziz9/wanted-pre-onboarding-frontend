import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Form from '../components/Form'

const SignIn = () => {

  return (
      <Container>
        <h1>로그인</h1>
        <Form />
      </Container>
  )
}

const Container = styled.main`
  max-width: 400px;
  height: 500px;
  background-color: aliceblue;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`

export default SignIn