const baseURL = 'https://www.pre-onboarding-selection-task.shop'

export const requestSignUp = async (data) => {
  try {
    const res = await fetch(baseURL + '/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      alert('회원가입이 완료되었습니다.')
      return true
    } else {
      const failResult = await res.json()
      alert(failResult.message)
      return false
    }
  } catch (err) {
    alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.')
  }
}

export const requestSignIn = async (data) => {
  try {
    const res = await fetch(baseURL + '/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      const result = await res.json()
      localStorage.setItem('accessToken', result.access_token)
      alert('로그인이 완료되었습니다.')
      return true
    } else {
      const failResult = await res.json()
      alert(failResult.message)
      return false
    }
  } catch (err) {
    alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.')
  }
  // response body의 jwt 로컬스토리지에 저장
}

//로컬 스토리지에 토큰이 있는 상태로 /signin 또는 /signup 페이지에 접속한다면 /todo 경로로 리다이렉트 시켜주세요
//로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트 시켜주세요

export const requestCreateTodo = async (data) => {
  try {
    const res = await fetch(baseURL + '/auth/signin', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      const result = await res.json()
      console.log(result)
      // alert('할 일 추가가 완료되었습니다.')
      return true
    } else {
      const failResult = await res.json()
      alert(failResult.message)
      return false
    }
  } catch (err) {
    alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.')
  }
}