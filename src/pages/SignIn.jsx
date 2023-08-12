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
  height: 500px;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`

export default SignIn
