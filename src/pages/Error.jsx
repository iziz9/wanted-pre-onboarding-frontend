import React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

const Error = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <h1>Error</h1>
      <h2>접근할 수 없는 페이지입니다.</h2>
      <button onClick={() => navigate(-1)}>이전 페이지로</button>
    </Container>
  )
}

const Container = styled.main`
  position: relative;

  h2 {
    margin: 30px auto;
  }

  button {
    width: 120px;
    height: 40px;
  }
`

export default Error
