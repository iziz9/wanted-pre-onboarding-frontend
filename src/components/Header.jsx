import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'


const Header = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Inner>
        <button className='home' onClick={()=>navigate('/')}>
          메인
        </button>
        <div className='menu'>
          <button onClick={()=>navigate('/signin')}>로그인</button>
          <button onClick={() => navigate('/signup')}>회원가입</button>
        </div>
      </Inner>
    </Container>
  )
}

const Container = styled.header`
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #ccc;
`
const Inner = styled.div`
  width: 90%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    width: 100px;
    height: 30px;
  }

  .home {
    width: 48px;
    height: 48px;
    background-color: black;
  }

  .menu {
    display: flex;
    gap: 20px;
  }
`

export default Header