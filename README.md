# 원티드 프리온보딩 인턴십 사전과제

## 지원자 성명

강현주

## 배포 링크

[배포 링크](https://iziz9-wanted-internship.netlify.app/)

## 설치 및 실행방법

```
$ git clone https://github.com/iziz9/wanted-pre-onboarding-frontend.git

$ npm install

$ npm start
```

---

## 설명

### 토큰 관리

```js
function App() {
  const [token, setToken] = useState('')
  useEffect(() => {
    setToken(localStorage.getItem('accessToken'))
  }, [])

  return (
    <>
      <Header token={token} setToken={setToken} />
      <Outlet context={{ setToken }} />
    </>
  )
}
```

- 로그인 시 로컬스토리지에 토큰을 저장하게 되는데, 토큰 여부에 따라 헤더와 outlet 안의 컴포넌트를 모두 변경해야 합니다.
- 하지만 로컬스토리지는 state처럼 변경사항을 감시할 수 없기 때문에 인증 상태의 즉각 반영이 어려웠습니다.
- 때문에 App.tsx에서 토큰을 state로 관리하고, `useOutletContext` 훅을 사용하여
  outlet 안의 컴포넌트(로그인 페이지)에서 변경된 토큰 상태를 outlet 밖인 header에서 즉시 확인할 수 있도록 작성했습니다.

### 로그인 & 회원가입

```js
// submit
const { setToken } = useOutletContext()

const handleSubmit = async (event) => {
  event.preventDefault()
  if (pathname === '/signup') {
    ;(await requestSignUp({ email, password })) && navigate('/signin')
  } else {
    ;(await requestSignIn({ email, password, setToken })) && navigate('/todo')
  }
}
```

- 로그인, 회원가입은 사용해야 할 input의 종류, 갯수, 유효성검사 내용이 동일하기 때문에 form.jsx 컴포넌트 하나를 재사용하는 방식으로 작성했습니다.
- submit 시 입력한 데이터는 현재 페이지의 pathname에 따라 로그인 또는 회원가입 api로 보내게 됩니다.
- 수행해야 할 동작이 로그인일 경우 useOutletContext 훅을 사용해 api응답값(토큰)을 setToken으로 상태에 저장합니다.

### todo list

```js
// todoItem 컴포넌트
 const [content, setContent] = useState('')
  const [isModifying, setIsModifying] = useState(false)

  useEffect(() => {
    setContent(itemData.todo || '')
  }, [itemData])

  const handleContentUpdate = async () => {
    await requestUpdateTodo({
      id: itemData.id,
      todo: content,
      userId: itemData.userId,
      isCompleted: itemData.isCompleted,
    })
    setIsModifying(false)
    await getTodoData()
  }

  const handleDelete = async () => {
    await requestDeleteTodo(itemData.id)
    await getTodoData()
  }

  const handleCheckComplete = async (e) => {
    await requestUpdateTodo({
      id: itemData.id,
      todo: content,
      userId: itemData.userId,
      isCompleted: e.target.checked,
    })
    await getTodoData()
  }

  return ( ...)

```

- Todo 페이지 / Todo list / Todo Item 컴포넌트로 구성되어 있습니다.
- 1. Todo 페이지 컴포넌트에서는 get api로 저장된 전체 리스트를 받고, 새로운 할 일을 추가할 수 있습니다.
- 2. Todo list 컴포넌트에서는 할 일 목록이 존재할 경우 todoItem 컴포넌트의 props로 각각의 할 일을 전달해줍니다.
- 3. Todo Item 컴포넌트에서는 전달받은 하나의 할 일 내용을 출력하고, 수정/삭제할 수 있습니다.
- 4. 할 일을 수정, 삭제한 후 화면에 변경된 상태를 반영하기 위해 api로 할일 목록을 다시 불러옵니다.

### 라우터 설정

```js
// private route - 1 (로그인 완료 상태)
export const MembersRoute = ({ children }) => {
  if (!localStorage.getItem('accessToken')) {
    alert('로그인 후 이용 가능합니다.')
    return <Navigate to="/signin" replace={true} />
  }
  return children
}
// private route - 2 (로그인 하지 않은 상태)
export const NonMembersRoute = ({ children }) => {
  if (localStorage.getItem('accessToken')) {
    return <Navigate to="/todo" replace={true} />
  }
  return children
}

// 라우터 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, path: '/', element: <Main /> },
      {
        path: '/signin',
        element: (
          <NonMembersRoute>
            <SignIn />
          </NonMembersRoute>
        ),
      },
      {
        path: '/signup',
        element: (
          <NonMembersRoute>
            <SignUp />
          </NonMembersRoute>
        ),
      },
      {
        path: '/todo',
        element: (
          <MembersRoute>
            <Todo />
          </MembersRoute>
        ),
      },
    ],
  },
])
```

- 지정 조건 충족시에만 경로에 접근할 수 있도록 private route 를 만들어 요소를 감싸주었습니다.
- 이번 과제에서 로그인/비로그인 사용자 양 쪽이 모두 접근할 수 있는 경로는 '/' 뿐이었기 때문에, 페이지별 접근 가능한 사용자를 router.js파일에서 바로 유추할 수 있도록 private route를 로그인 상태에 따라 두개로 나눴습니다. (Members, NonMembers)

### fetch

```js
// fetch instance
const fetchInstance = async ({ path, method, data = '', auth = '', id = '' }) => {
  try {
    const res = await fetch(baseURL + path + id, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
      body: data || null,
    })

    if (method === 'DELETE' && res.status === 204) {
      return 204
    }

    if (!res.ok) {
      const failResult = await res.json()
      alert(failResult.message)
      return false
    }

    if (method === 'GET' || path === '/auth/signin') {
      return await res.json()
    }

    return true
  } catch (err) {
    alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.')
  }
}

// request
export const requestUpdateTodo = async ({ id, todo, isCompleted }) => {
  const auth = 'Bearer ' + localStorage.getItem('accessToken')
  const res = await fetchInstance({
    path: '/todos/',
    id,
    method: 'PUT',
    data: JSON.stringify({ todo, isCompleted }),
    auth,
  })

  res && alert('할 일 수정이 완료되었습니다.')
  return res
}
```

- request.js 파일에 fetch instance를 만들어 api호출 시 실행할 기본 동작들을 지정하고, crud 기능별로 나눈 request 함수에서 instance를 호출하여 그 결과에 따라 에러 발생을 알리거나 값을 리턴합니다.
