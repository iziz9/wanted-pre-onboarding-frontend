import React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

const Main = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <button className='link-todo' onClick={()=>navigate('/todo')}>투두리스트</button>
    </Container>
  )
}

const Container = styled.main`
  .link-todo {
    width: 200px;
    height: 100px;  
    display: block;
    background-color: royalblue;
    margin: 100px auto;
    font-size: 20px;
  }
`

export default Main