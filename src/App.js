import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";

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
  );
}

export default App;
