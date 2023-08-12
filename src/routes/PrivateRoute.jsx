import { Navigate } from 'react-router-dom'

export const MembersRoute = ({ children }) => {
  if (!localStorage.getItem('accessToken')) {
    alert('로그인 후 이용 가능합니다.')
    return <Navigate to="/signin" replace={true} />
  }
  return children
}

export const NonMembersRoute = ({ children }) => {
  if (localStorage.getItem('accessToken')) {
    return <Navigate to="/todo" replace={true} />
  }
  return children
}
