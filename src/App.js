import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [token, setToken] = useState('')

  return (
    <>
      <Header token={token} setToken={setToken} />
      <Outlet context={{ setToken }} />
    </>
  );
}

export default App;
