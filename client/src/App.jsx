import Header from "./components/Header";
import { Outlet } from 'react-router-dom';
import { UserContextProvider } from "./contexts/UserContext";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [theme, setTheme] = useState("light");

  return (
    <UserContextProvider value={{user, setUser, isUpdate, setIsUpdate, theme, setTheme}}>
      <Header />
      <Outlet />
    </UserContextProvider>
  )
}

export default App
