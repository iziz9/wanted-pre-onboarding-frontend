const baseURL = 'https://www.pre-onboarding-selection-task.shop'

const fetchInstance = async (
  { path, method, data = '', auth = '', id = '' }
) => {
  try {
    const res = await fetch(baseURL + path + id,
      {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth,
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

export const requestSignUp = async (data) => {
  const res = await fetchInstance({ path: '/auth/signup', method: 'POST', data: JSON.stringify(data) })
  res && alert('회원가입이 완료되었습니다.')
  return true
}

export const requestSignIn = async ({ email, password, setToken }) => {
  const res = await fetchInstance({ path: '/auth/signin', method: 'POST', data: JSON.stringify({ email, password }) })

  const result = await res
  localStorage.setItem('accessToken', result.access_token)
  setToken(result.access_token)
  alert('로그인이 완료되었습니다.')
  return true
}

export const requestCreateTodo = async (todo) => {
  const auth = 'Bearer ' + localStorage.getItem('accessToken')
  const res = await fetchInstance({ path: '/todos', method: 'POST', data: JSON.stringify(todo), auth })

  res && alert('할 일 추가가 완료되었습니다.')
  return res
}

export const requestGetTodo = async () => {
  const auth = 'Bearer ' + localStorage.getItem('accessToken')
  const res = await fetchInstance({ path: '/todos', method: 'GET', auth })
  return await res
}

export const requestUpdateTodo = async ({ id, todo, isCompleted }) => {
  const auth = 'Bearer ' + localStorage.getItem('accessToken')
  const res = await fetchInstance({ path: '/todos/', id, method: 'PUT', data: JSON.stringify({ todo, isCompleted }), auth })

  res && alert('할 일 수정이 완료되었습니다.')
  return res
}

export const requestDeleteTodo = async (id) => {
  const auth = 'Bearer ' + localStorage.getItem('accessToken')
  const res = await fetchInstance({ path: '/todos/', id, method: 'DELETE', auth })

  res === 204 && alert('할 일 삭제가 완료되었습니다.')
  return res
}