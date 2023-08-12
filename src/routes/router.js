import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Error from '../pages/Error'
import Main from '../pages/Main'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Todo from '../pages/Todo'
import { NonMembersRoute, MembersRoute } from './PrivateRoute'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, path: '/', element: <Main /> },
      { path: '/signin', element: (<NonMembersRoute ><SignIn /></NonMembersRoute>) },
      { path: '/signup', element: (<NonMembersRoute ><SignUp /></NonMembersRoute>) },
      { path: '/todo', element: (<MembersRoute><Todo /></MembersRoute>) },
    ]
  }
])

export default router;